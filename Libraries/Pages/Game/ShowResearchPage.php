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
 * @ShowResearchPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 12:08:31
 */

/**
 * Description of ShowResearchPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowResearchPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'research';
    }

    function show() {
        global $planetrow, $user, $InResearch, $ThePlanet, $lang, $resource, $reslist, $game_config, $dpath;

        // Mise a jour de la liste de construction si necessaire
        UpdatePlanetBatimentQueueList($planetrow, $user);
        $IsWorking = HandleTechnologieBuild($planetrow, $user);
        $CurrentPlanet = $planetrow;
        $CurrentUser = $user;
        $InResearch = $IsWorking['OnWork'];
        $ThePlanet = $IsWorking['WorkOn'];

        includeLang('buildings');

        $bContinue = true;
        // Deja est qu'il y a un laboratoire sur la planete ???
        if ($CurrentPlanet[$resource[31]] == 0) {
            message($lang['no_laboratory'], $lang['Research']);
        }

        // Boucle d'interpretation des eventuelles commandes
        if (isset($_GET['cmd'])) {
            $TheCommand = $_GET['cmd'];
            $Techno = $_GET['tech'];
            if (is_numeric($Techno)) {
                if (in_array($Techno, $reslist['tech'])) {
                    // Bon quand on arrive ici ... On sait deja qu'on a une technologie valide
                    if (is_array($ThePlanet)) {
                        $WorkingPlanet = $ThePlanet;
                    } else {
                        $WorkingPlanet = $CurrentPlanet;
                    }
                    switch ($TheCommand) {
                        case 'cancel':
                            if ($ThePlanet['b_tech_id'] == $Techno) {
                                $costs = GetBuildingPrice($CurrentUser, $WorkingPlanet, $Techno);
                                $WorkingPlanet['metal'] += $costs['metal'];
                                $WorkingPlanet['crystal'] += $costs['crystal'];
                                $WorkingPlanet['deuterium'] += $costs['deuterium'];
                                $WorkingPlanet['b_tech_id'] = 0;
                                $WorkingPlanet["b_tech"] = 0;
                                $CurrentUser['b_tech_planet'] = 0;
                                $UpdateData = true;
                                $InResearch = false;
                            }
                            break;
                        case 'search':
                            if (IsTechnologieAccessible($CurrentUser, $WorkingPlanet, $Techno) &&
                                    IsElementBuyable($CurrentUser, $WorkingPlanet, $Techno)) {
                                $costs = GetBuildingPrice($CurrentUser, $WorkingPlanet, $Techno);
                                $WorkingPlanet['metal'] -= $costs['metal'];
                                $WorkingPlanet['crystal'] -= $costs['crystal'];
                                $WorkingPlanet['deuterium'] -= $costs['deuterium'];
                                $WorkingPlanet["b_tech_id"] = $Techno;
                                $WorkingPlanet["b_tech"] = time() + GetBuildingTime($CurrentUser, $WorkingPlanet, $Techno);
                                $CurrentUser["b_tech_planet"] = $WorkingPlanet["id"];
                                $UpdateData = true;
                                $InResearch = true;
                            }
                            break;
                    }
                    if ($UpdateData == true) {
                        $QryUpdatePlanet = "UPDATE {{table}} SET ";
                        $QryUpdatePlanet .= "`b_tech_id` = '" . $WorkingPlanet['b_tech_id'] . "', ";
                        $QryUpdatePlanet .= "`b_tech` = '" . $WorkingPlanet['b_tech'] . "', ";
                        $QryUpdatePlanet .= "`metal` = '" . $WorkingPlanet['metal'] . "', ";
                        $QryUpdatePlanet .= "`crystal` = '" . $WorkingPlanet['crystal'] . "', ";
                        $QryUpdatePlanet .= "`deuterium` = '" . $WorkingPlanet['deuterium'] . "' ";
                        $QryUpdatePlanet .= "WHERE ";
                        $QryUpdatePlanet .= "`id` = '" . $WorkingPlanet['id'] . "';";
                        doquery($QryUpdatePlanet, 'planets');

                        $QryUpdateUser = "UPDATE {{table}} SET ";
                        $QryUpdateUser .= "`b_tech_planet` = '" . $CurrentUser['b_tech_planet'] . "' ";
                        $QryUpdateUser .= "WHERE ";
                        $QryUpdateUser .= "`id` = '" . $CurrentUser['id'] . "';";
                        doquery($QryUpdateUser, 'users');
                    }
                    if (is_array($ThePlanet)) {
                        $ThePlanet = $WorkingPlanet;
                    } else {
                        $CurrentPlanet = $WorkingPlanet;
                        if ($TheCommand == 'search') {
                            $ThePlanet = $CurrentPlanet;
                        }
                    }

                    $this->tplObj->assign('ThePlanet', $ThePlanet);
                }
            } else {
                $bContinue = false;
            }
        }

        $this->tplObj->assign(array(
            'title' => "Research",
            'CurrentPlanet' => $planetrow,
            'labo_on_update' => $lang['labo_on_update'],
            'lang_tech' => $lang['tech'],
            'CurrentPlanet' => $planetrow,
            'CurrentUser' => $user,
            'resource' => $resource,
            'lang_level' => $lang['level'],
            'res_descriptions' => $lang['res']['descriptions'],
            'Rest_ress' => $lang['Rest_ress'],
            'InResearch' => $InResearch,
            'Rechercher' => $lang['Rechercher'],
            'lang_on' => $lang['on'],
            'continue' => $lang['continue'],
            'cancel' => $lang['cancel'],
            'ready' => $lang['ready'],
            'ThePlanet' => $ThePlanet,
        ));
        $this->render('buildings_research.tpl');
    }

}
