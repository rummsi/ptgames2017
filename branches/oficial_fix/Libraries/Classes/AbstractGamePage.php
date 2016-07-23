<?php

/*
 * Expression package is undefined on line 4, column 19 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.
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
 * Expression package is undefined on line 19, column 19 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.
 * @Rui Silva
 * @AbstractGamePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @Expression version is undefined on line 23, column 20 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.  10/abr/2016 11:39:31
 */

/**
 * Description of AbstractGamePage
 *
 * @author Rui Silva
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
            $this->ShowFleetDisplay();
            $this->ShowLeftMenu();
            $this->ShowTopNavigationBar($user, $planetrow);
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

    function ShowFleetDisplay() {
        global $lang, $user, $flotten;

        includeLang('overview');
        
        // ----------------------------------------------------------------------------------------------
        // --- Gestion des flottes personnelles ---------------------------------------------------------
        // Toutes de vert vetues
        $OwnFleets = doquery("SELECT * FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets');
        $Record = 0;
        while ($FleetRow = mysqli_fetch_array($OwnFleets)) {
            $Record++;

            $StartTime = $FleetRow['fleet_start_time'];
            $StayTime = $FleetRow['fleet_end_stay'];
            $EndTime = $FleetRow['fleet_end_time'];
            // Flotte a l'aller
            $Label = "fs";
            if ($StartTime > time()) {
                $fpage[$StartTime] = AbstractGamePage::BuildFleetEventTable($FleetRow, 0, true, $Label, $Record);
            }

            if ($FleetRow['fleet_mission'] <> 4) {
                // Flotte en stationnement
                $Label = "ft";
                if ($StayTime > time()) {
                    $fpage[$StayTime] = AbstractGamePage::BuildFleetEventTable($FleetRow, 1, true, $Label, $Record);
                }
                // Flotte au retour
                $Label = "fe";
                if ($EndTime > time()) {
                    $fpage[$EndTime] = AbstractGamePage::BuildFleetEventTable($FleetRow, 2, true, $Label, $Record);
                }
            }
        } // End While
        // ----------------------------------------------------------------------------------------------
        // --- Gestion des flottes autres que personnelles ----------------------------------------------
        // Flotte ennemies (ou amie) mais non personnelles
        $OtherFleets = doquery("SELECT * FROM {{table}} WHERE `fleet_target_owner` = '" . $user['id'] . "';", 'fleets');
        $Record = 2000;
        while ($FleetRow = mysqli_fetch_array($OtherFleets)) {
            if ($FleetRow['fleet_owner'] != $user['id']) {
                if ($FleetRow['fleet_mission'] != 8) {
                    $Record++;
                    $StartTime = $FleetRow['fleet_start_time'];
                    $StayTime = $FleetRow['fleet_end_stay'];

                    if ($StartTime > time()) {
                        $Label = "ofs";
                        $fpage[$StartTime] = AbstractGamePage::BuildFleetEventTable($FleetRow, 0, false, $Label, $Record);
                    }
                    if ($FleetRow['fleet_mission'] == 5) {
                        // Flotte en stationnement
                        $Label = "oft";
                        if ($StayTime > time()) {
                            $fpage[$StayTime] = AbstractGamePage::BuildFleetEventTable($FleetRow, 1, false, $Label, $Record);
                        }
                    }
                }
            }
        }

        if (count($fpage) > 0) {
            ksort($fpage);
            foreach ($fpage as $time => $content) {
                $flotten .= $content . "\n";
            }
        }
        $this->tplObj->assign(array(
            'fleet_list' => $flotten,
                'Events' => $lang['Events'],
        ));
    }

    function ShowLeftMenu() {
        global $lang, $user, $game_config;

        includeLang('leftmenu');

        $rank = doquery("SELECT `total_rank` FROM {{table}} WHERE `stat_code` = '1' AND `stat_type` = '1' AND `id_owner` = '" . isset($user['id']) . "';", 'statpoints', true);

        $this->tplObj->assign(array(
            'mf' => '_self',
            'XNovaRelease' => VERSION,
            'devlp' => $lang['devlp'],
            'Overview' => $lang['Overview'],
            'Buildings' => $lang['Buildings'],
            'Research' => $lang['Research'],
            'Shipyard' => $lang['Shipyard'],
            'Defense' => $lang['Defense'],
            'Officiers' => $lang['Officiers'],
            'enable_marchand' => $game_config['enable_marchand'],
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
            'user_rank' => $rank['total_rank'],
            'Statistics' => $lang['Statistics'],
            'Search' => $lang['Search'],
            'blocked' => $lang['blocked'],
            'enable_announces' => $game_config['enable_announces'],
            'Annonces' => $lang['Annonces'],
            'commun' => $lang['commun'],
            'Buddylist' => $lang['Buddylist'],
            'enable_notes' => $game_config['enable_notes'],
            'Notes' => $lang['Notes'],
            'Chat' => $lang['Chat'],
            'forum_url' => $game_config['forum_url'],
            'Board' => $lang['Board'],
            'multi' => $lang['multi'],
            'Rules' => $lang['Rules'],
            'Contact' => $lang['Contact'],
            'Options' => $lang['Options'],
            'Level' => $user['authlevel'],
            'user_level' => $lang['user_level'],
            'link_url' => $game_config['link_url'],
            'link_enable' => $game_config['link_enable'],
            'link_name' => $game_config['link_name'],
            'Logout' => $lang['Logout'],
            'infog' => $lang['infog'],
            'lm_ifo_game' => $lang['lm_ifo_game'],
            'lm_tx_serv' => $game_config['resource_multiplier'],
            'lm_ifo_fleet' => $lang['lm_ifo_fleet'],
            'lm_tx_game' => $game_config['game_speed'] / 2500,
            'lm_ifo_serv' => $lang['lm_ifo_serv'],
            'lm_tx_fleet' => $game_config['fleet_speed'] / 2500,
            'lm_ifo_queue' => $lang['lm_ifo_queue'],
            'lm_tx_queue' => MAX_FLEET_OR_DEFS_PER_ROW,
            'servername' => $game_config['game_name'],
            'enable_marchand' => $game_config['enable_marchand'],
            'enable_announces' => $game_config['enable_announces'],
            'enable_notes' => $game_config['enable_notes'],
            'link_enable' => $game_config['link_enable'],
            'link_url' => $game_config['link_url'],
            'link_name' => $game_config['link_name'],
            'game_speed' => $game_config['game_speed'],
            'fleet_speed' => $game_config['fleet_speed'],
            'resource_multiplier' => $game_config['resource_multiplier'],
            'lm_tx_queue' => MAX_FLEET_OR_DEFS_PER_ROW,
        ));
    }

    function ShowTopNavigationBar($CurrentUser, $CurrentPlanet) {
        global $lang;

        //debug_print_backtrace();
        if ($CurrentUser) {
            if (!$CurrentPlanet) {
                $CurrentPlanet = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $CurrentUser['current_planet'] . "';", 'planets', true);
            }

            // Genearation de la combo des planetes du joueur
            $parse['planetlist'] = '';
            $ThisUsersPlanets = SortUserPlanets($CurrentUser);
            while ($CurPlanet = mysqli_fetch_array($ThisUsersPlanets)) {
                if (isset($CurPlanet["destruyed"]) == 0) {
                    $parse['planetlist'] .= "\n<option ";
                    if ($CurPlanet['id'] == $CurrentUser['current_planet']) {
                        // Bon puisque deja on s'y trouve autant le marquer
                        $parse['planetlist'] .= "selected=\"selected\" ";
                    }
                    $parse['planetlist'] .= "value=\"game.php?page=" . $_GET['page'] . "&cp=" . $CurPlanet['id'] . "";
                    $parse['planetlist'] .= "&amp;type=" . isset($_GET['type']);
                    $parse['planetlist'] .= "&amp;re=0\">";

                    // Nom et coordonnées de la planete
                    $parse['planetlist'] .= "" . $CurPlanet['name'];
                    $parse['planetlist'] .= "&nbsp;[" . $CurPlanet['galaxy'] . ":";
                    $parse['planetlist'] .= "" . $CurPlanet['system'] . ":";
                    $parse['planetlist'] .= "" . $CurPlanet['planet'];
                    $parse['planetlist'] .= "]&nbsp;&nbsp;</option>";
                }
            }

            $energy = pretty_number($CurrentPlanet["energy_max"] + $CurrentPlanet["energy_used"]) . "/" . pretty_number($CurrentPlanet["energy_max"]);
            // Energie
            if (($CurrentPlanet["energy_max"] + $CurrentPlanet["energy_used"]) < 0) {
                $parse['energy'] = colorRed($energy);
            } else {
                $parse['energy'] = $energy;
            }
            // Metal
            $metal = pretty_number($CurrentPlanet["metal"]);
            if (($CurrentPlanet["metal"] > $CurrentPlanet["metal_max"])) {
                $parse['metal'] = colorRed($metal);
            } else {
                $parse['metal'] = $metal;
            }
            // Cristal
            $crystal = pretty_number($CurrentPlanet["crystal"]);
            if (($CurrentPlanet["crystal"] > $CurrentPlanet["crystal_max"])) {
                $parse['crystal'] = colorRed($crystal);
            } else {
                $parse['crystal'] = $crystal;
            }
            // Deuterium
            $deuterium = pretty_number($CurrentPlanet["deuterium"]);
            if (($CurrentPlanet["deuterium"] > $CurrentPlanet["deuterium_max"])) {
                $parse['deuterium'] = colorRed($deuterium);
            } else {
                $parse['deuterium'] = $deuterium;
            }

            // Message
            if ($CurrentUser['new_message'] > 0) {
                $parse['message'] = "<a href=\"game.php?page=messages\">[ " . $CurrentUser['new_message'] . " ]</a>";
            } else {
                $parse['message'] = "0";
            }

            // Le tout passe dans la template
            $this->tplObj->assign(array(
                'image' => $CurrentPlanet['image'],
                'ThisUsersPlanets' => SortUserPlanets($CurrentUser),
                'planetlist' => $parse['planetlist'],
                'Metal' => $lang['Metal'],
                'Crystal' => $lang['Crystal'],
                'Deuterium' => $lang['Deuterium'],
                'Energy' => $lang['Energy'],
                'Message' => $lang['Message'],
                'metal' => $parse['metal'],
                'crystal' => $parse['crystal'],
                'deuterium' => $parse['deuterium'],
                'energy' => $parse['energy'],
                'message' => $parse['message'],
            ));

            $TopBar = parsetemplate(gettemplate('topnav'), $parse);
        } else {
            $TopBar = "";
        }

        return $TopBar;
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
