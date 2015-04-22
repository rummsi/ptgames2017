<?php

/**
 * This file is part of XNova:Legacies
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt
 * @see http://www.xnova-ng.org/
 *
 * Copyright (c) 2009-Present, XNova Support Team <http://www.xnova-ng.org>
 * All rights reserved.
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
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *                                --> NOTICE <--
 *  This file is part of the core development branch, changing its contents will
 * make you unable to use the automatic updates manager. Please refer to the
 * documentation for further information about customizing XNova.
 *
 */
class ShowResearchPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'research';
    }

    function show() {
        global $planetrow, $user, $InResearch, $ThePlanet, $lang, $resource, $reslist, $game_config, $dpath;
        includeLang('buildings');

        // Mise a jour de la liste de construction si necessaire
        UpdatePlanetBatimentQueueList($planetrow, $user);
        $IsWorking = HandleTechnologieBuild($planetrow, $user);

        $NoResearchMessage = "";
        $bContinue = true;
        // Deja est qu'il y a un laboratoire sur la planete ???
        if ($planetrow[$resource[31]] == 0) {
            message($lang['no_laboratory'], $lang['Research']);
        }
        // Ensuite ... Est ce que la labo est en cours d'upgrade ?
        if (!CheckLabSettingsInQueue($planetrow)) {
            $NoResearchMessage = $lang['labo_on_update'];
            $bContinue = false;
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
                        $WorkingPlanet = $planetrow;
                    }
                    switch ($TheCommand) {
                        case 'cancel':
                            if ($ThePlanet['b_tech_id'] == $Techno) {
                                $costs = GetBuildingPrice($user, $WorkingPlanet, $Techno);
                                $WorkingPlanet['metal'] += $costs['metal'];
                                $WorkingPlanet['crystal'] += $costs['crystal'];
                                $WorkingPlanet['deuterium'] += $costs['deuterium'];
                                $WorkingPlanet['b_tech_id'] = 0;
                                $WorkingPlanet["b_tech"] = 0;
                                $user['b_tech_planet'] = 0;
                                $UpdateData = true;
                                $InResearch = false;
                            }
                            break;
                        case 'search':
                            if (IsTechnologieAccessible($user, $WorkingPlanet, $Techno) &&
                                    IsElementBuyable($user, $WorkingPlanet, $Techno)) {
                                $costs = GetBuildingPrice($user, $WorkingPlanet, $Techno);
                                $WorkingPlanet['metal'] -= $costs['metal'];
                                $WorkingPlanet['crystal'] -= $costs['crystal'];
                                $WorkingPlanet['deuterium'] -= $costs['deuterium'];
                                $WorkingPlanet["b_tech_id"] = $Techno;
                                $WorkingPlanet["b_tech"] = time() + GetBuildingTime($user, $WorkingPlanet, $Techno);
                                $user["b_tech_planet"] = $WorkingPlanet["id"];
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
                        $QryUpdateUser .= "`b_tech_planet` = '" . $user['b_tech_planet'] . "' ";
                        $QryUpdateUser .= "WHERE ";
                        $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                        doquery($QryUpdateUser, 'users');
                    }
                    if (is_array($ThePlanet)) {
                        $ThePlanet = $WorkingPlanet;
                    } else {
                        $planetrow = $WorkingPlanet;
                        if ($TheCommand == 'search') {
                            $ThePlanet = $planetrow;
                        }
                    }
                }
            } else {
                $bContinue = false;
            }
        }

        foreach ($lang['tech'] as $Tech => $TechName) {
            if ($Tech > 105 && $Tech <= 199) {
                if (IsTechnologieAccessible($user, $planetrow, $Tech)) {
                    $this->tplObj->assign(array(
                        'dpath' => $dpath,
                        'tech_id' => $Tech,
                    ));
                    $building_level = $user[$resource[$Tech]];
                    $this->tplObj->assign(array(
                        'tech_level' => ($building_level == 0) ? "" : "( " . $lang['level'] . " " . $building_level . " )",
                        'tech_name' => $TechName,
                        'tech_descr' => $lang['res']['descriptions'][$Tech],
                        'tech_price' => GetElementPrice($user, $planetrow, $Tech),
                    ));
                    $SearchTime = GetBuildingTime($user, $planetrow, $Tech);
                    $this->tplObj->assign(array(
                        'search_time' => ShowBuildTime($SearchTime),
                        'tech_restp' => $lang['Rest_ress'] . " " . GetRestPrice($user, $planetrow, $Tech, true),
                    ));
                    $CanBeDone = IsElementBuyable($user, $planetrow, $Tech);

                    // Arbre de decision de ce que l'on met dans la derniere case de la ligne
                    if (!$InResearch) {
                        $LevelToDo = 1 + $user[$resource[$Tech]];
                        if ($CanBeDone) {
                            if (!CheckLabSettingsInQueue($planetrow)) {
                                // Le laboratoire est cours de construction ou d'evolution
                                // Et dans la config du systeme, on ne permet pas la recherche pendant
                                // que le labo est en construction ou evolution !
                                if ($LevelToDo == 1) {
                                    $TechnoLink = "<font color=#FF0000>" . $lang['Rechercher'] . "</font>";
                                } else {
                                    $TechnoLink = "<font color=#FF0000>" . $lang['Rechercher'] . "<br>" . $lang['level'] . " " . $LevelToDo . "</font>";
                                }
                            } else {
                                $TechnoLink = "<a href=\"game.php?page=research&cmd=search&tech=" . $Tech . "\">";
                                if ($LevelToDo == 1) {
                                    $TechnoLink .= "<font color=#00FF00>" . $lang['Rechercher'] . "</font>";
                                } else {
                                    $TechnoLink .= "<font color=#00FF00>" . $lang['Rechercher'] . "<br>" . $lang['level'] . " " . $LevelToDo . "</font>";
                                }
                                $TechnoLink .= "</a>";
                            }
                        } else {
                            if ($LevelToDo == 1) {
                                $TechnoLink = "<font color=#FF0000>" . $lang['Rechercher'] . "</font>";
                            } else {
                                $TechnoLink = "<font color=#FF0000>" . $lang['Rechercher'] . "<br>" . $lang['level'] . " " . $LevelToDo . "</font>";
                            }
                        }
                    } else {
                        // Y a une construction en cours
                        if ($ThePlanet["b_tech_id"] == $Tech) {
                            // C'est le technologie en cours de recherche
                            if ($ThePlanet['id'] != $planetrow['id']) {
                                // Ca se passe sur une autre planete
                                $this->tplObj->assign(array(
                                    'tech_time' => $ThePlanet["b_tech"] - time(),
                                    'tech_name' => $lang['on'] . "<br>" . $ThePlanet["name"],
                                    'tech_home' => $ThePlanet["id"],
                                    'tech_id' => $ThePlanet["b_tech_id"],
                                ));
                            } else {
                                // Ca se passe sur la planete actuelle
                                $this->tplObj->assign(array(
                                    'tech_time' => $planetrow["b_tech"] - time(),
                                    'tech_name' => "",
                                    'tech_home' => $planetrow["id"],
                                    'tech_id' => $planetrow["b_tech_id"],
                                ));
                            }
                            $TechnoLink = $this->tplObj->fetch('buildings_research_script.tpl');
                        } else {
                            // Technologie pas en cours recherche
                            $TechnoLink = "<center>-</center>";
                        }
                    }
                    $this->tplObj->assign('tech_link', $TechnoLink);
                    @$TechnoList .= $this->tplObj->fetch('buildings_research_row.tpl');
                }
            }
        }

        $this->tplObj->assign(array(
            'title' => $lang['Research'],
            'noresearch' => $NoResearchMessage,
            'technolist' => $TechnoList,
            'Construire' => $lang['Construire'],
        ));

        $this->render('buildings_research.tpl');
    }

}
