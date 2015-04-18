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
 * @AbstractGamePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  15/abr/2015 21:02:12
 */

/**
 * Description of AbstractGamePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
abstract class AbstractGamePage {

    protected $tplObj;
    protected $window;
    public $defaultWindow = 'full';

    function __construct() {
        $this->setWindow($this->defaultWindow);
        $this->initTemplate();
    }

    protected function setWindow($window) {
        $this->window = $window;
    }

    protected function initTemplate() {
        if (isset($this->tplObj)) {
            return true;
        }
        $this->tplObj = new template;
        list($tplDir) = $this->tplObj->getTemplateDir();
        $this->tplObj->setTemplateDir($tplDir . 'game/');
        return true;
    }

    protected function render($file) {
        global $langInfos, $user, $planetrow;

        if ($this->getWindow() !== 'ajax') {
            $this->ShowNavigationMenus($user, $planetrow);
        }

        $this->tplObj->assign(array(
            'dpath' => DEFAULT_SKINPATH,
            'encoding' => $langInfos['ENCODING'],
        ));

        $this->tplObj->display('extends:layout.' . $this->getWindow() . '.tpl|' . $file);
        exit;
    }

    protected function getWindow() {
        return $this->window;
    }

    protected function getQueryString() {
        $queryString = array();
        $page = HTTP::_GP('page', '');
        if (!empty($page)) {
            $queryString['page'] = $page;
        }
        $mode = HTTP::_GP('mode', '');
        if (!empty($mode)) {
            $queryString['mode'] = $mode;
        }
        return http_build_query($queryString);
    }

    function ShowNavigationMenus() {
        global $lang, $user, $game_config, $planetrow, $flotten;

        includeLang('leftmenu');
//        includeLang('topnav');
        includeLang('overview');

        $rank = doquery("SELECT `total_rank` FROM {{table}} WHERE `stat_code` = '1' AND `stat_type` = '1' AND `id_owner` = '" . $user['id'] . "';", 'statpoints', true);
        $this->tplObj->assign(array(
            'XNovaRelease' => VERSION,
            'user_rank' => $rank['total_rank'],
            'lm_tx_game' => $game_config['game_speed'] / 2500,
            'lm_tx_fleet' => $game_config['fleet_speed'] / 2500,
            'lm_tx_queue' => MAX_FLEET_OR_DEFS_PER_ROW,
            'Level' => $user['authlevel'],
            'devlp' => $lang['devlp'],
            'Overview' => $lang['Overview'],
            'Buildings' => $lang['Buildings'],
            'Research' => $lang['Research'],
            'Shipyard' => $lang['Shipyard'],
            'Defense' => $lang['Defense'],
            'Officiers' => $lang['Officiers'],
            'Marchand' => $lang['Marchand'],
            'navig' => $lang['navig'],
            'Alliance' => $lang['Alliance'],
            'Fleet' => $lang['Fleet'],
            'Messages' => $lang['Messages'],
            'observ' => $lang['observ'],
            'Galaxy' => $lang['Galaxy'],
            'Imperium' => $lang['Imperium'],
            'Resources' => $lang['Resources'],
            'Technology' => $lang['Technology'],
            'Records' => $lang['Records'],
            'Statistics' => $lang['Statistics'],
            'Search' => $lang['Search'],
            'blocked' => $lang['blocked'],
            'Annonces' => $lang['Annonces'],
            'commun' => $lang['commun'],
            'Buddylist' => $lang['Buddylist'],
            'Notes' => $lang['Notes'],
            'Chat' => $lang['Chat'],
            'Board' => $lang['Board'],
            'multi' => $lang['multi'],
            'Rules' => $lang['Rules'],
            'Contact' => $lang['Contact'],
            'Options' => $lang['Options'],
            'user_level' => $lang['user_level'],
            'Logout' => $lang['Logout'],
            'infog' => $lang['infog'],
            'lm_ifo_game' => $lang['lm_ifo_game'],
            'lm_ifo_fleet' => $lang['lm_ifo_fleet'],
            'lm_ifo_serv' => $lang['lm_ifo_serv'],
            'lm_ifo_queue' => $lang['lm_ifo_queue'],
            'servername' => $game_config['game_name'],
            'enable_marchand' => $game_config['enable_marchand'],
            'enable_announces' => $game_config['enable_announces'],
            'enable_notes' => $game_config['enable_notes'],
            'forum_url' => $game_config['forum_url'],
            'link_enable' => $game_config['link_enable'],
            'link_url' => $game_config['link_url'],
            'link_name' => $game_config['link_name'],
            'game_speed' => $game_config['game_speed'],
            'fleet_speed' => $game_config['fleet_speed'],
            'resource_multiplier' => $game_config['resource_multiplier'],
            'lm_tx_queue' => MAX_FLEET_OR_DEFS_PER_ROW,
            'energy_available' => $planetrow["energy_max"] + $planetrow["energy_used"],
        ));

        if ($user) {
            if (!$planetrow) {
                $planetrow = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $user['current_planet'] . "';", 'planets', true);
            }

            $this->tplObj->assign(array(
                'image' => $planetrow['image'],
                'destruyed' => $planetrow['destruyed'],
                'metal' => $planetrow['metal'],
                'metal_max' => $planetrow['metal_max'],
                'crystal' => $planetrow['crystal'],
                'crystal_max' => $planetrow['crystal_max'],
                'deuterium' => $planetrow['deuterium'],
                'deuterium_max' => $planetrow['deuterium_max'],
                'energy_max' => $planetrow['energy_max'],
                'energy_used' => $planetrow['energy_used'],
                'new_message' => $user['new_message'],
                'current_planet' => $user['current_planet'],
                'Metal' => $lang['Metal'],
                'Crystal' => $lang['Crystal'],
                'Deuterium' => $lang['Deuterium'],
                'Energy' => $lang['Energy'],
                'Message' => $lang['Message'],
                'ThisUsersPlanets' => SortUserPlanets($user),
                'page' => filter_input(INPUT_GET, 'page'),
                'mode' => HTTP::_GP('mode', ''),
            ));
        }

        if ($user['id'] != '') {
            // -----------------------------------------------------------------------------------------------
            // --- Gestion Officiers -------------------------------------------------------------------------
            // Passage au niveau suivant, ajout du point de compétence et affichage du passage au nouveau level
            $XpMinierUp = $user['lvl_minier'] * 5000;
            $XpRaidUp = $user['lvl_raid'] * 10;
            $XpMinier = $user['xpminier'];
            $XPRaid = $user['xpraid'];
            $LvlUpMinier = $user['lvl_minier'] + 1;
            $LvlUpRaid = $user['lvl_raid'] + 1;

            if (($LvlUpMinier + $LvlUpRaid) <= 100) {
                if ($XpMinier >= $XpMinierUp) {
                    $QryUpdateUser = "UPDATE {{table}} SET ";
                    $QryUpdateUser .= "`lvl_minier` = '" . $LvlUpMinier . "', ";
                    $QryUpdateUser .= "`rpg_points` = `rpg_points` + 1 ";
                    $QryUpdateUser .= "WHERE ";
                    $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                    doquery($QryUpdateUser, 'users');
                }
                if ($XPRaid >= $XpRaidUp) {
                    $QryUpdateUser = "UPDATE {{table}} SET ";
                    $QryUpdateUser .= "`lvl_raid` = '" . $LvlUpRaid . "', ";
                    $QryUpdateUser .= "`rpg_points` = `rpg_points` + 1 ";
                    $QryUpdateUser .= "WHERE ";
                    $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                    doquery($QryUpdateUser, 'users');
                }
            }
            // -----------------------------------------------------------------------------------------------
            // --- Gestion de la liste des planetes ----------------------------------------------------------
            // Planetes ...
            $Order = ($user['planet_sort_order'] == 1) ? "DESC" : "ASC";
            $Sort = $user['planet_sort'];
            $QryPlanets = "SELECT * FROM {{table}} WHERE `id_owner` = '" . $user['id'] . "' ORDER BY ";
            if ($Sort == 0) {
                $QryPlanets .= "`id` " . $Order;
            } elseif ($Sort == 1) {
                $QryPlanets .= "`galaxy`, `system`, `planet`, `planet_type` " . $Order;
            } elseif ($Sort == 2) {
                $QryPlanets .= "`name` " . $Order;
            }
            $planets_query = doquery($QryPlanets, 'planets');
            $Colone = 1;
            $AllPlanets = "<tr>";
            while ($UserPlanet = mysql_fetch_array($planets_query)) {
                PlanetResourceUpdate($user, $UserPlanet, time());
                if ($UserPlanet["id"] != $user["current_planet"] && $UserPlanet['planet_type'] != 3) {
                    $AllPlanets .= "<th>" . $UserPlanet['name'] . "<br>";
                    @$AllPlanets .= "<a href=\"?page=overview&cp=" . $UserPlanet['id'] . "&re=0\" title=\"" . $UserPlanet['name'] . "\"><img src=\"" . $dpath . "planeten/small/s_" . $UserPlanet['image'] . ".jpg\" height=\"50\" width=\"50\"></a><br>";
                    $AllPlanets .= "<center>";
                    if ($UserPlanet['b_building'] != 0) {
                        UpdatePlanetBatimentQueueList($UserPlanet, $user);
                        if ($UserPlanet['b_building'] != 0) {
                            $BuildQueue = $UserPlanet['b_building_id'];
                            $QueueArray = explode(";", $BuildQueue);
                            $CurrentBuild = explode(",", $QueueArray[0]);
                            $BuildElement = $CurrentBuild[0];
                            $BuildLevel = $CurrentBuild[1];
                            $BuildRestTime = pretty_time($CurrentBuild[3] - time());
                            $AllPlanets .= '' . $lang['tech'][$BuildElement] . ' (' . $BuildLevel . ')';
                            $AllPlanets .= "<br><font color=\"#7f7f7f\">(" . $BuildRestTime . ")</font>";
                        } else {
                            CheckPlanetUsedFields($UserPlanet);
                            $AllPlanets .= $lang['Free'];
                        }
                    } else {
                        $AllPlanets .= $lang['Free'];
                    }
                    $AllPlanets .= "</center></th>";
                    if ($Colone <= 1) {
                        $Colone++;
                    } else {
                        $AllPlanets .= "</tr><tr>";
                        $Colone = 1;
                    }
                }
            }
            $getcoords = ($UserPlanet['galaxy'] && $UserPlanet['system'] && $UserPlanet['planet']);
            // -----------------------------------------------------------------------------------------------
            // --- Gestion des flottes personnelles ---------------------------------------------------------
            // Toutes de vert vetues
            $OwnFleets = doquery("SELECT * FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets');
            $Record = 0;
            while ($FleetRow = mysql_fetch_array($OwnFleets)) {
                $Record++;
                $StartTime = $FleetRow['fleet_start_time'];
                $StayTime = $FleetRow['fleet_end_stay'];
                $EndTime = $FleetRow['fleet_end_time'];
                // Flotte a l'aller
                $Label = "fs";
                if ($StartTime > time()) {
                    $fpage[$StartTime] = self::BuildFleetEventTable($FleetRow, 0, true, $Label, $Record);
                }
                if ($FleetRow['fleet_mission'] <> 4) {
                    // Flotte en stationnement
                    $Label = "ft";
                    if ($StayTime > time()) {
                        $fpage[$StayTime] = self::BuildFleetEventTable($FleetRow, 1, true, $Label, $Record);
                    }
                    // Flotte au retour
                    $Label = "fe";
                    if ($EndTime > time()) {
                        $fpage[$EndTime] = self::BuildFleetEventTable($FleetRow, 2, true, $Label, $Record);
                    }
                }
            } // End While
            // -----------------------------------------------------------------------------------------------
            // --- Gestion des flottes autres que personnelles ----------------------------------------------
            // Flotte ennemies (ou amie) mais non personnelles
            $OtherFleets = doquery("SELECT * FROM {{table}} WHERE `fleet_target_owner` = '" . $user['id'] . "';", 'fleets');
            $Record = 2000;
            while ($FleetRow = mysql_fetch_array($OtherFleets)) {
                if ($FleetRow['fleet_owner'] != $user['id']) {
                    if ($FleetRow['fleet_mission'] != 8) {
                        $Record++;
                        $StartTime = $FleetRow['fleet_start_time'];
                        $StayTime = $FleetRow['fleet_end_stay'];
                        if ($StartTime > time()) {
                            $Label = "ofs";
                            $fpage[$StartTime] = self::BuildFleetEventTable($FleetRow, 0, false, $Label, $Record);
                        }
                        if ($FleetRow['fleet_mission'] == 5) {
                            // Flotte en stationnement
                            $Label = "oft";
                            if ($StayTime > time()) {
                                $fpage[$StayTime] = self::BuildFleetEventTable($FleetRow, 1, false, $Label, $Record);
                            }
                        }
                    }
                }
            }
            // -----------------------------------------------------------------------------------------------
            // --- Gestion des attaques missiles -------------------------------------------------------------
            $iraks_query = doquery("SELECT * FROM {{table}} WHERE owner = '" . $user['id'] . "'", 'iraks');
            $Record = 4000;
            while ($irak = mysql_fetch_array($iraks_query)) {
                $Record++;
                $fpage[$irak['zeit']] = '';
                if ($irak['zeit'] > time()) {
                    $time = $irak['zeit'] - time();
                    $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, true);
                    $planet_start = doquery("SELECT * FROM {{table}} WHERE
						galaxy = '" . $irak['galaxy'] . "' AND
						system = '" . $irak['system'] . "' AND
						planet = '" . $irak['planet'] . "' AND
						planet_type = '1'", 'planets');
                    $user_planet = doquery("SELECT * FROM {{table}} WHERE
						galaxy = '" . $irak['galaxy_angreifer'] . "' AND
						system = '" . $irak['system_angreifer'] . "' AND
						planet = '" . $irak['planet_angreifer'] . "' AND
						planet_type = '1'", 'planets', true);
                    if (mysql_num_rows($planet_start) == 1) {
                        $planet = mysql_fetch_array($planet_start);
                    }
                    $fpage[$irak['zeit']] .= "<tr><th><div id=\"bxxfs$i\" class=\"z\"></div><font color=\"lime\">" . gmdate("H:i:s", $irak['zeit'] + 1 * 60 * 60) . "</font> </th><th colspan=\"3\"><font color=\"#0099FF\">Une attaque de missiles (" . $irak['anzahl'] . ") de " . $user_planet['name'] . " ";
                    $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&action=3&galaxy=' . $irak["galaxy_angreifer"] . '&system=' . $irak["system_angreifer"] . '&planet=' . $irak["planet_angreifer"] . '">[' . $irak["galaxy_angreifer"] . ':' . $irak["system_angreifer"] . ':' . $irak["planet_angreifer"] . ']</a>';
                    $fpage[$irak['zeit']] .= ' arrive sur la plan&egrave;te' . $planet["name"] . ' ';
                    $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&action=3&galaxy=' . $irak["galaxy"] . '&system=' . $irak["system"] . '&planet=' . $irak["planet"] . '">[' . $irak["galaxy"] . ':' . $irak["system"] . ':' . $irak["planet"] . ']</a>';
                    $fpage[$irak['zeit']] .= '</font>';
                    $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, false);
                    $fpage[$irak['zeit']] .= "</th>";
                }
            }
            // -----------------------------------------------------------------------------------------------
            // --- Gestion des attaques missiles -------------------------------------------------------------
            $iraks_query = doquery("SELECT * FROM {{table}} WHERE owner = '" . $user['id'] . "'", 'iraks');
            $Record = 4000;
            while ($irak = mysql_fetch_array($iraks_query)) {
                $Record++;
                $fpage[$irak['zeit']] = '';
                if ($irak['zeit'] > time()) {
                    $time = $irak['zeit'] - time();
                    $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, true);
                    $planet_start = doquery("SELECT * FROM {{table}} WHERE
						galaxy = '" . $irak['galaxy'] . "' AND
						system = '" . $irak['system'] . "' AND
						planet = '" . $irak['planet'] . "' AND
						planet_type = '1'", 'planets');
                    $user_planet = doquery("SELECT * FROM {{table}} WHERE
						galaxy = '" . $irak['galaxy_angreifer'] . "' AND
						system = '" . $irak['system_angreifer'] . "' AND
						planet = '" . $irak['planet_angreifer'] . "' AND
						planet_type = '1'", 'planets', true);
                    if (mysql_num_rows($planet_start) == 1) {
                        $planet = mysql_fetch_array($planet_start);
                    }
                    $fpage[$irak['zeit']] .= "<tr><th><div id=\"bxxfs$i\" class=\"z\"></div><font color=\"lime\">" . gmdate("H:i:s", $irak['zeit'] + 1 * 60 * 60) . "</font> </th><th colspan=\"3\"><font color=\"#0099FF\">Une attaque de missiles (" . $irak['anzahl'] . ") de " . $user_planet['name'] . " ";
                    $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&action=3&galaxy=' . $irak["galaxy_angreifer"] . '&system=' . $irak["system_angreifer"] . '&planet=' . $irak["planet_angreifer"] . '">[' . $irak["galaxy_angreifer"] . ':' . $irak["system_angreifer"] . ':' . $irak["planet_angreifer"] . ']</a>';
                    $fpage[$irak['zeit']] .= ' arrive sur la plan&egrave;te' . $planet["name"] . ' ';
                    $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&action=3&galaxy=' . $irak["galaxy"] . '&system=' . $irak["system"] . '&planet=' . $irak["planet"] . '">[' . $irak["galaxy"] . ':' . $irak["system"] . ':' . $irak["planet"] . ']</a>';
                    $fpage[$irak['zeit']] .= '</font>';
                    $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, false);
                    $fpage[$irak['zeit']] .= "</th>";
                }
            }

            $StatRecord = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $user['id'] . "';", 'statpoints', true);
            $ile = $StatRecord['total_old_rank'] - $StatRecord['total_rank'];
            if ($ile >= 1) {
                $parse['ile'] = "<font color=lime>+" . $ile . "</font>";
            } elseif ($ile < 0) {
                $parse['ile'] = "<font color=red>-" . $ile . "</font>";
            } elseif ($ile == 0) {
                $parse['ile'] = "<font color=lightblue>" . $ile . "</font>";
            }
            if (isset($fpage)) {
                if (count($fpage) > 0) {
                    ksort($fpage);
                    foreach ($fpage as $time => $content) {
                        $flotten .= $content . "\n";
                    }
                }
            }
            $this->tplObj->assign(array(
                'planets_query' => doquery($QryPlanets, 'planets'),
                'getcoords' => $getcoords,
                'fleet_list' => $flotten,
                'LvlUpMinier' => $LvlUpMinier,
                'LvlUpRaid' => $LvlUpRaid,
                'XpMinier' => $XpMinier,
                'XpMinierUp' => $XpMinierUp,
                'XPRaid' => $XPRaid,
                'XpRaidUp' => $XpRaidUp,
            ));
        }
    }

    function getTemplate($templateName) {
        $filename = realpath(ROOT_PATH . '/Libraries/App/templates/Game') . "/{$templateName}";
        return ReadFromFile($filename);
    }

    function BuildFleetEventTable($FleetRow, $Status, $Owner, $Label, $Record) {
        global $lang, $_fleets;

        $FleetStyle = array(
            1 => 'attack',
            2 => 'federation',
            3 => 'transport',
            4 => 'deploy',
            5 => 'hold',
            6 => 'espionage',
            7 => 'colony',
            8 => 'harvest',
            9 => 'destroy',
            10 => 'missile',
            15 => 'transport',
        );
        $FleetStatus = array(0 => 'flight', 1 => 'holding', 2 => 'return');
        if ($Owner == true) {
            $FleetPrefix = 'own';
        } else {
            $FleetPrefix = '';
        }

        $MissionType = $FleetRow['fleet_mission'];
        $FleetContent = CreateFleetPopupedFleetLink($FleetRow, $lang['ov_fleet'], $FleetPrefix . $FleetStyle[$MissionType]);
        $FleetCapacity = CreateFleetPopupedMissionLink($FleetRow, $lang['type_mission'][$MissionType], $FleetPrefix . $FleetStyle[$MissionType]);

        $StartPlanet = doquery("SELECT `name` FROM {{table}} WHERE `galaxy` = '" . $FleetRow['fleet_start_galaxy'] . "' AND `system` = '" . $FleetRow['fleet_start_system'] . "' AND `planet` = '" . $FleetRow['fleet_start_planet'] . "' AND `planet_type` = '" . $FleetRow['fleet_start_type'] . "';", 'planets', true);
        $StartType = $FleetRow['fleet_start_type'];
        $TargetPlanet = doquery("SELECT `name` FROM {{table}} WHERE `galaxy` = '" . $FleetRow['fleet_end_galaxy'] . "' AND `system` = '" . $FleetRow['fleet_end_system'] . "' AND `planet` = '" . $FleetRow['fleet_end_planet'] . "' AND `planet_type` = '" . $FleetRow['fleet_end_type'] . "';", 'planets', true);
        $TargetType = $FleetRow['fleet_end_type'];

        if ($Status != 2) {
            if ($StartType == 1) {
                $StartID = $lang['ov_planet_to'];
            } elseif ($StartType == 3) {
                $StartID = $lang['ov_moon_to'];
            }
            $StartID .= $StartPlanet['name'] . " ";
            $StartID .= GetStartAdressLink($FleetRow, $FleetPrefix . $FleetStyle[$MissionType]);

            if ($MissionType != 15) {
                if ($TargetType == 1) {
                    $TargetID = $lang['ov_planet_to_target'];
                } elseif ($TargetType == 2) {
                    $TargetID = $lang['ov_debris_to_target'];
                } elseif ($TargetType == 3) {
                    $TargetID = $lang['ov_moon_to_target'];
                }
            } else {
                $TargetID = $lang['ov_explo_to_target'];
            }
            $TargetID .= $TargetPlanet['name'] . " ";
            $TargetID .= GetTargetAdressLink($FleetRow, $FleetPrefix . $FleetStyle[$MissionType]);
        } else {
            if ($StartType == 1) {
                $StartID = $lang['ov_back_planet'];
            } elseif ($StartType == 3) {
                $StartID = $lang['ov_back_moon'];
            }
            $StartID .= $StartPlanet['name'] . " ";
            $StartID .= GetStartAdressLink($FleetRow, $FleetPrefix . $FleetStyle[$MissionType]);

            if ($MissionType != 15) {
                if ($TargetType == 1) {
                    $TargetID = $lang['ov_planet_from'];
                } elseif ($TargetType == 2) {
                    $TargetID = $lang['ov_debris_from'];
                } elseif ($TargetType == 3) {
                    $TargetID = $lang['ov_moon_from'];
                }
            } else {
                $TargetID = $lang['ov_explo_from'];
            }
            $TargetID .= $TargetPlanet['name'] . " ";
            $TargetID .= GetTargetAdressLink($FleetRow, $FleetPrefix . $FleetStyle[$MissionType]);
        }

        if ($Owner == true) {
            $EventString = $lang['ov_une'];     // 'Une de tes '
            $EventString .= $FleetContent;
        } else {
            $EventString = $lang['ov_une_hostile']; // 'Une '
            $EventString .= $FleetContent;
            $EventString .= $lang['ov_hostile']; // ' hostile de '
            $EventString .= BuildHostileFleetPlayerLink($FleetRow);
        }

        if ($Status == 0) {
            $Time = $FleetRow['fleet_start_time'];
            $Rest = $Time - time();
            $EventString .= $lang['ov_vennant']; // ' venant '
            $EventString .= $StartID;
            $EventString .= $lang['ov_atteint']; // ' atteint '
            $EventString .= $TargetID;
            $EventString .= $lang['ov_mission']; // '. Elle avait pour mission: '
        } elseif ($Status == 1) {
            $Time = $FleetRow['fleet_end_stay'];
            $Rest = $Time - time();
            $EventString .= $lang['ov_vennant']; // ' venant '
            $EventString .= $StartID;
            $EventString .= $lang['ov_explo_stay']; // ' explore '
            $EventString .= $TargetID;
            $EventString .= $lang['ov_explo_mission']; // '. Elle a pour mission: '
        } elseif ($Status == 2) {
            $Time = $FleetRow['fleet_end_time'];
            $Rest = $Time - time();
            $EventString .= $lang['ov_rentrant']; // ' rentrant '
            $EventString .= $TargetID;
            $EventString .= $StartID;
            $EventString .= $lang['ov_mission']; // '. Elle avait pour mission: '
        }
        $EventString .= $FleetCapacity;

        $this->tplObj->assign(array(
            'fleet_status' => $FleetStatus[$Status],
            'fleet_prefix' => $FleetPrefix,
            'fleet_style' => $FleetStyle[$MissionType],
            'fleet_javai' => InsertJavaScriptChronoApplet($Label, $Record, $Rest, true),
            'fleet_order' => $Label . $Record,
            'fleet_time' => date("H:i:s", $Time),
            'fleet_descr' => $EventString,
            'fleet_javas' => InsertJavaScriptChronoApplet($Label, $Record, $Rest, false),
            'fleets' => $_fleets,
            'MissionType' => $MissionType,
            'FleetStyle' => $FleetStyle,
            'StartType' => $StartType,
            'TargetType' => $TargetType,
            'StartPlanet' => $StartPlanet,
            'TargetPlanet' => $TargetPlanet,
            'FleetRow' => $FleetRow,
            'Status' => $Status,
            'FleetContent' => $FleetContent,
            'FleetCapacity' => $FleetCapacity,
        ));

        return $this->tplObj->fetch('overview_fleet_event.tpl');
    }

}
