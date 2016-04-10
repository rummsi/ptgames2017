<?php

/*
 * PTGamesPT
 * Copyright (C) 2012
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should read the GNU General Public License, see <http://www.gnu.org/licenses/>.
 * 
 * PTGamesPT
 * @author XNovaPT Team <xnovaptteam@gmail.com>
 * @ShowBuildingsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 11:31:31
 */

/**
 * Description of ShowBuildingsPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowBuildingsPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'buildings';
    }

    function show() {
        global $lang, $resource, $reslist, $dpath, $game_config, $_GET, $planetrow, $user;

        // Mise a jour de la liste de construction si necessaire
        UpdatePlanetBatimentQueueList($planetrow, $user);
        $IsWorking = HandleTechnologieBuild($planetrow, $user);
        $CurrentPlanet = $planetrow;
        $CurrentUser = $user;

	includeLang('buildings');
        
        CheckPlanetUsedFields($CurrentPlanet);

        // Tables des batiments possibles par type de planete
        $Allowed['1'] = array(1, 2, 3, 4, 12, 14, 15, 21, 22, 23, 24, 31, 33, 34, 44);
        $Allowed['3'] = array(12, 14, 21, 22, 23, 24, 34, 41, 42, 43);

        // Boucle d'interpretation des eventuelles commandes
        if (isset($_GET['cmd'])) {
            // On passe une commande
            $bThisIsCheated = false;
            $bDoItNow = false;
            $TheCommand = $_GET['cmd'];
            $Element = $_GET['building'];
            $ListID = $_GET['listid'];
            if (isset($Element)) {
                if (!strchr($Element, " ")) {
                    if (!strchr($Element, ",")) {
                        if (!strchr($Element, ";")) {
                            if (in_array(trim($Element), $Allowed[$CurrentPlanet['planet_type']])) {
                                $bDoItNow = true;
                            } else {
                                $bThisIsCheated = true;
                            }
                        } else {
                            $bThisIsCheated = true;
                        }
                    } else {
                        $bThisIsCheated = true;
                    }
                } else {
                    $bThisIsCheated = true;
                }
            } elseif (isset($ListID)) {
                $bDoItNow = true;
            }
            if ($bDoItNow == true) {
                switch ($TheCommand) {
                    case 'cancel':
                        // Interrompre le premier batiment de la queue
                        CancelBuildingFromQueue($CurrentPlanet, $CurrentUser);
                        break;
                    case 'remove':
                        // Supprimer un element de la queue (mais pas le premier)
                        // $RemID -> element de la liste a supprimer
                        RemoveBuildingFromQueue($CurrentPlanet, $CurrentUser, $ListID);
                        break;
                    case 'insert':
                        // Insere un element dans la queue
                        AddBuildingToQueue($CurrentPlanet, $CurrentUser, $Element, true);
                        break;
                    case 'destroy':
                        // Detruit un batiment deja construit sur la planete !
                        AddBuildingToQueue($CurrentPlanet, $CurrentUser, $Element, false);
                        break;
                    default:
                        break;
                } // switch
            } elseif ($bThisIsCheated == true) {
                ResetThisFuckingCheater($CurrentUser['id']);
            }
        }

        SetNextQueueElementOnTop($CurrentPlanet, $CurrentUser);

        $Queue = ShowBuildingQueue($CurrentPlanet, $CurrentUser);

        // On enregistre ce que l'on a modifi� dans planet !
        BuildingSavePlanetRecord($CurrentPlanet);
        // On enregistre ce que l'on a eventuellement modifi� dans users
        BuildingSaveUserRecord($CurrentUser);

        if ($Queue['lenght'] < MAX_BUILDING_QUEUE_SIZE) {
            $CanBuildElement = true;
        } else {
            $CanBuildElement = false;
        }

        $SubTemplate = gettemplate('buildings_builds_row');
        $BuildingPage = "";
        foreach ($lang['tech'] as $Element => $ElementName) {
            if (in_array($Element, $Allowed[$CurrentPlanet['planet_type']])) {
                $CurrentMaxFields = CalculateMaxPlanetFields($CurrentPlanet);
                if ($CurrentPlanet["field_current"] < ($CurrentMaxFields - $Queue['lenght'])) {
                    $RoomIsOk = true;
                } else {
                    $RoomIsOk = false;
                }

                if (IsTechnologieAccessible($CurrentUser, $CurrentPlanet, $Element)) {
                    $HaveRessources = IsElementBuyable($CurrentUser, $CurrentPlanet, $Element, true, false);
                    $parse = array();
                    $parse['dpath'] = $dpath;
                    $parse['i'] = $Element;
                    $BuildingLevel = $CurrentPlanet[$resource[$Element]];
                    $parse['nivel'] = ($BuildingLevel == 0) ? "" : " (" . $lang['level'] . " " . $BuildingLevel . ")";
                    $parse['n'] = $ElementName;
                    $parse['descriptions'] = $lang['res']['descriptions'][$Element];
                    $ElementBuildTime = GetBuildingTime($CurrentUser, $CurrentPlanet, $Element);
                    $parse['time'] = ShowBuildTime($ElementBuildTime);
                    $parse['price'] = GetElementPrice($CurrentUser, $CurrentPlanet, $Element);
                    $parse['rest_price'] = GetRestPrice($CurrentUser, $CurrentPlanet, $Element);
                    $parse['click'] = '';
                    $NextBuildLevel = $CurrentPlanet[$resource[$Element]] + 1;

                    if ($Element == 31) {
                        // Sp�cial Laboratoire
                        if ($CurrentUser["b_tech_planet"] != 0 && // Si pas 0 y a une recherche en cours
                                $game_config['BuildLabWhileRun'] != 1) {  // Variable qui contient le parametre
                            // On verifie si on a le droit d'evoluer pendant les recherches (Setting dans config)
                            $parse['click'] = "<font color=#FF0000>" . $lang['in_working'] . "</font>";
                        }
                    }
                    if ($parse['click'] != '') {
                        // Bin on ne fait rien, vu que l'on l'a deja fait au dessus !!
                    } elseif ($RoomIsOk && $CanBuildElement) {
                        if ($Queue['lenght'] == 0) {
                            if ($NextBuildLevel == 1) {
                                if ($HaveRessources == true) {
                                    $parse['click'] = "<a href=\"game.php?page=buildings&cmd=insert&building=" . $Element . "\"><font color=#00FF00>" . $lang['BuildFirstLevel'] . "</font></a>";
                                } else {
                                    $parse['click'] = "<font color=#FF0000>" . $lang['BuildFirstLevel'] . "</font>";
                                }
                            } else {
                                if ($HaveRessources == true) {
                                    $parse['click'] = "<a href=\"game.php?page=buildings&cmd=insert&building=" . $Element . "\"><font color=#00FF00>" . $lang['BuildNextLevel'] . " " . $NextBuildLevel . "</font></a>";
                                } else {
                                    $parse['click'] = "<font color=#FF0000>" . $lang['BuildNextLevel'] . " " . $NextBuildLevel . "</font>";
                                }
                            }
                        } else {
                            $parse['click'] = "<a href=\"game.php?page=buildings&cmd=insert&building=" . $Element . "\"><font color=#00FF00>" . $lang['InBuildQueue'] . "</font></a>";
                        }
                    } elseif ($RoomIsOk && !$CanBuildElement) {
                        if ($NextBuildLevel == 1) {
                            $parse['click'] = "<font color=#FF0000>" . $lang['BuildFirstLevel'] . "</font>";
                        } else {
                            $parse['click'] = "<font color=#FF0000>" . $lang['BuildNextLevel'] . " " . $NextBuildLevel . "</font>";
                        }
                    } else {
                        $parse['click'] = "<font color=#FF0000>" . $lang['NoMoreSpace'] . "</font>";
                    }

                    $BuildingPage .= parsetemplate($SubTemplate, $parse);
                }
            }
        }

        $parse = $lang;

        // Faut il afficher la liste de construction ??
        if ($Queue['lenght'] > 0) {
            $parse['BuildListScript'] = InsertBuildListScript("game.php?page=buildings&");
            $parse['BuildList'] = $Queue['buildlist'];
        } else {
            $parse['BuildListScript'] = "";
            $parse['BuildList'] = "";
        }

        $parse['planet_field_current'] = $CurrentPlanet["field_current"];
        $parse['planet_field_max'] = $CurrentPlanet['field_max'] + ($CurrentPlanet[$resource[33]] * 5);
        $parse['field_libre'] = $parse['planet_field_max'] - $CurrentPlanet['field_current'];

        $parse['BuildingsList'] = $BuildingPage;

        $page .= parsetemplate(gettemplate('buildings_builds'), $parse);

        display($page, $lang['Builds']);
    }

}
