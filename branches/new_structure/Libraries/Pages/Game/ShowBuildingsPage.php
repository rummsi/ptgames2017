<?php

/*
 * XNovaPT
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
 * XNovaPT
 * @author XNovaPT Team <xnovaptteam@gmail.com>
 * @ShowBuildingsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  22/abr/2015 17:57:05
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
        global $lang, $resource, $reslist, $dpath, $game_config, $planetrow, $user, $_GET;
        includeLang('buildings');

        // Mise a jour de la liste de construction si necessaire
        UpdatePlanetBatimentQueueList($planetrow, $user);
        $IsWorking = HandleTechnologieBuild($planetrow, $user);

        CheckPlanetUsedFields($planetrow);

        // Tables des batiments possibles par type de planete
        $Allowed['1'] = array(1, 2, 3, 4, 12, 14, 15, 21, 22, 23, 24, 31, 33, 34, 44);
        $Allowed['3'] = array(12, 14, 21, 22, 23, 24, 34, 41, 42, 43);

        // Boucle d'interpretation des eventuelles commandes
        if (isset($_GET['cmd'])) {
            // On passe une commande
            $bThisIsCheated = false;
            $bDoItNow = false;
            $TheCommand = $_GET['cmd'];
            $Element = filter_input(INPUT_GET, 'building');
            $ListID = filter_input(INPUT_GET, 'listid');
            if (isset($Element)) {
                if (!strchr($Element, " ")) {
                    if (!strchr($Element, ",")) {
                        if (!strchr($Element, ";")) {
                            if (in_array(trim($Element), $Allowed[$planetrow['planet_type']])) {
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
                        CancelBuildingFromQueue($planetrow, $user);
                        break;
                    case 'remove':
                        // Supprimer un element de la queue (mais pas le premier)
                        // $RemID -> element de la liste a supprimer
                        RemoveBuildingFromQueue($planetrow, $user, $ListID);
                        break;
                    case 'insert':
                        // Insere un element dans la queue
                        AddBuildingToQueue($planetrow, $user, $Element, true);
                        break;
                    case 'destroy':
                        // Detruit un batiment deja construit sur la planete !
                        AddBuildingToQueue($planetrow, $user, $Element, false);
                        break;
                    default:
                        break;
                } // switch
            } elseif ($bThisIsCheated == true) {
                ResetThisFuckingCheater($user['id']);
            }
        }

        SetNextQueueElementOnTop($planetrow, $user);
        $Queue = ShowBuildingQueue($planetrow, $user);

        // On enregistre ce que l'on a modifi� dans planet !
        BuildingSavePlanetRecord($planetrow);
        // On enregistre ce que l'on a eventuellement modifi� dans users
        BuildingSaveUserRecord($user);

        if ($Queue['lenght'] < MAX_BUILDING_QUEUE_SIZE) {
            $CanBuildElement = true;
        } else {
            $CanBuildElement = false;
        }

        $BuildingPage = "";
        foreach ($lang['tech'] as $Element => $ElementName) {
            if (in_array($Element, $Allowed[$planetrow['planet_type']])) {
                $CurrentMaxFields = CalculateMaxPlanetFields($planetrow);
                if ($planetrow["field_current"] < ($CurrentMaxFields - $Queue['lenght'])) {
                    $RoomIsOk = true;
                } else {
                    $RoomIsOk = false;
                }

                if (IsTechnologieAccessible($user, $planetrow, $Element)) {
                    $HaveRessources = IsElementBuyable($user, $planetrow, $Element, true, false);
                    $parse = array();
                    $this->tplObj->assign(array(
                        'dpath' => $dpath,
                        'i' => $Element,
                    ));
                    $BuildingLevel = $planetrow[$resource[$Element]];
                    $this->tplObj->assign(array(
                        'nivel' => ($BuildingLevel == 0) ? "" : " (" . $lang['level'] . " " . $BuildingLevel . ")",
                        'n' => $ElementName,
                        'descriptions' => $lang['res']['descriptions'][$Element],
                    ));
                    $ElementBuildTime = GetBuildingTime($user, $planetrow, $Element);
                    $this->tplObj->assign(array(
                        'time' => ShowBuildTime($ElementBuildTime),
                        'price' => GetElementPrice($user, $planetrow, $Element),
                        'rest_price' => GetRestPrice($user, $planetrow, $Element),
                    ));
                    $click = '';
                    $NextBuildLevel = $planetrow[$resource[$Element]] + 1;

                    if ($Element == 31) {
                        // Sp�cial Laboratoire
                        if ($user["b_tech_planet"] != 0 && // Si pas 0 y a une recherche en cours
                                $game_config['BuildLabWhileRun'] != 1) {  // Variable qui contient le parametre
                            // On verifie si on a le droit d'evoluer pendant les recherches (Setting dans config)
                            $this->tplObj->assign('click', "<font color=#FF0000>" . $lang['in_working'] . "</font>");
                        }
                    }
                    if ($click != '') {
                        // Bin on ne fait rien, vu que l'on l'a deja fait au dessus !!
                    } elseif ($RoomIsOk && $CanBuildElement) {
                        if ($Queue['lenght'] == 0) {
                            if ($NextBuildLevel == 1) {
                                if ($HaveRessources == true) {
                                    $this->tplObj->assign('click', "<a href=\"game.php?page=buildings&cmd=insert&building=" . $Element . "\"><font color=#00FF00>" . $lang['BuildFirstLevel'] . "</font></a>");
                                } else {
                                    $this->tplObj->assign('click', "<font color=#FF0000>" . $lang['BuildFirstLevel'] . "</font>");
                                }
                            } else {
                                if ($HaveRessources == true) {
                                    $this->tplObj->assign('click', "<a href=\"game.php?page=buildings&cmd=insert&building=" . $Element . "\"><font color=#00FF00>" . $lang['BuildNextLevel'] . " " . $NextBuildLevel . "</font></a>");
                                } else {
                                    $this->tplObj->assign('click', "<font color=#FF0000>" . $lang['BuildNextLevel'] . " " . $NextBuildLevel . "</font>");
                                }
                            }
                        } else {
                            $this->tplObj->assign('click', "<a href=\"game.php?page=buildings&cmd=insert&building=" . $Element . "\"><font color=#00FF00>" . $lang['InBuildQueue'] . "</font></a>");
                        }
                    } elseif ($RoomIsOk && !$CanBuildElement) {
                        if ($NextBuildLevel == 1) {
                            $this->tplObj->assign('click', "<font color=#FF0000>" . $lang['BuildFirstLevel'] . "</font>");
                        } else {
                            $this->tplObj->assign('click', "<font color=#FF0000>" . $lang['BuildNextLevel'] . " " . $NextBuildLevel . "</font>");
                        }
                    } else {
                        $this->tplObj->assign('click', "<font color=#FF0000>" . $lang['NoMoreSpace'] . "</font>");
                    }

                    $BuildingPage .= $this->tplObj->fetch('buildings_builds_row.tpl');
                    //    $BuildingPage .= parsetemplate(gettemplate('buildings_builds_row'), $parse);
                }
            }
        }

        // Faut il afficher la liste de construction ??
        if ($Queue['lenght'] > 0) {
            $this->tplObj->assign(array(
                'BuildListScript' => InsertBuildListScript("buildings"),
                'BuildList' => $Queue['buildlist'],
            ));
        } else {
            $this->tplObj->assign(array(
                'BuildListScript' => "",
                'BuildList' => "",
            ));
        }

        $planet_field_max = $planetrow['field_max'] + ($planetrow[$resource[33]] * 5);

        $this->tplObj->assign(array(
            'title' => $lang['Builds'],
            'planet_field_current' => $planetrow["field_current"],
            'planet_field_max' => $planetrow['field_max'] + ($planetrow[$resource[33]] * 5),
            'field_libre' => $planet_field_max - $planetrow['field_current'],
            'BuildingsList' => $BuildingPage,
            'bld_usedcells' => $lang['bld_usedcells'],
            'bld_theyare' => $lang['bld_theyare'],
            'bld_cellfree' => $lang['bld_cellfree'],
        ));

        $this->render('buildings_builds.tpl');
    }

}
