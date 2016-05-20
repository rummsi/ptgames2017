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
            $Element = @$_GET['building'];
            $ListID = @$_GET['listid'];
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

        // On enregistre ce que l'on a modifi� dans planet !
        BuildingSavePlanetRecord($CurrentPlanet);
        // On enregistre ce que l'on a eventuellement modifi� dans users
        BuildingSaveUserRecord($CurrentUser);

        $this->tplObj->assign(array(
            'title' => $lang['Builds'],
            'Queue' => ShowBuildingQueue($CurrentPlanet, $CurrentUser),
            'bld_usedcells' => $lang['bld_usedcells'],
            'planet_field_current' => $CurrentPlanet["field_current"],
            'planet_field_max' => $CurrentPlanet['field_max'] + ($CurrentPlanet[$resource[33]] * 5),
            'field_libre' => ($CurrentPlanet['field_max'] + ($CurrentPlanet[$resource[33]] * 5)) - $CurrentPlanet['field_current'],
            'bld_theyare' => $lang['bld_theyare'],
            'bld_cellfree' => $lang['bld_cellfree'],
            'tech' => $lang['tech'],
            'CurrentPlanet' => $planetrow,
            'CurrentUser' => $user,
            'Allowed' => $Allowed,
            'resource' => $resource,
            'level' => $lang['level'],
            'res_descriptions' => $lang['res']['descriptions'],
            'BuildLabWhileRun' => $game_config['BuildLabWhileRun'],
            'in_working' => $lang['in_working'],
            'InBuildQueue'=>$lang['InBuildQueue'],
            'BuildFirstLevel'=>$lang['BuildFirstLevel'],
            'BuildNextLevel'=>$lang['BuildNextLevel'],
            'NoMoreSpace'=>$lang['NoMoreSpace'],
        ));
        $this->render('buildings_builds.tpl');
    }

}
