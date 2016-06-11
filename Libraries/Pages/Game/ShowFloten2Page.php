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
 * @ShowFloten2Page.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 15:56:05
 */

/**
 * Description of ShowFloten2Page
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowFloten2Page extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'floten2';
    }

    function show() {
        global $user, $planetrow, $lang, $pricelist;

        includeLang('fleet');

        $galaxy = intval($_POST['galaxy']);
        $system = intval($_POST['system']);
        $planet = intval($_POST['planet']);
        $planettype = intval($_POST['planettype']);

        // Test d'existance et de proprieté de la planete
        $YourPlanet = false;
        $UsedPlanet = false;
        $select = doquery("SELECT * FROM {{table}}", "planets");

        while ($row = mysqli_fetch_array($select)) {
            if ($galaxy == $row['galaxy'] &&
                    $system == $row['system'] &&
                    $planet == $row['planet'] &&
                    $planettype == $row['planet_type']) {
                if ($row['id_owner'] == $user['id']) {
                    $YourPlanet = true;
                    $UsedPlanet = true;
                } else {
                    $UsedPlanet = true;
                }
                break;
            }
        }

        // Determinons les type de missions possibles par rapport a la planete cible
        if ($_POST['planettype'] == "2") {
            if ($_POST['ship209'] >= 1) {
                $missiontype = array(8 => $lang['type_mission'][8]);
            } else {
                $missiontype = array();
            }
        } elseif ($_POST['planettype'] == "1" || $_POST['planettype'] == "3") {
            if ($_POST['ship208'] >= 1 && !$UsedPlanet) {
                $missiontype = array(7 => $lang['type_mission'][7]);
            } elseif (@$_POST['ship210'] >= 1 && !$YourPlanet) {
                $missiontype = array(6 => $lang['type_mission'][6]);
            }

            if (@$_POST['ship202'] >= 1 ||
                    @$_POST['ship203'] >= 1 ||
                    @$_POST['ship204'] >= 1 ||
                    @$_POST['ship205'] >= 1 ||
                    @$_POST['ship206'] >= 1 ||
                    @$_POST['ship207'] >= 1 ||
                    @$_POST['ship210'] >= 1 ||
                    @$_POST['ship211'] >= 1 ||
                    @$_POST['ship213'] >= 1 ||
                    @$_POST['ship214'] >= 1 ||
                    @$_POST['ship215'] >= 1 ||
                    @$_POST['ship216'] >= 1) {
                if (!$YourPlanet) {
                    $missiontype[1] = $lang['type_mission'][1];
                    $missiontype[5] = $lang['type_mission'][5];
                }
                $missiontype[3] = $lang['type_mission'][3];
            }
        } elseif ($_POST['ship209'] >= 1 || $_POST['ship208'] >= 1) {
            $missiontype[3] = $lang['type_mission'][3];
        }
        if ($YourPlanet)
            $missiontype[4] = $lang['type_mission'][4];

        if ($_POST['planettype'] == 3 &&
                (@$_POST['ship214'] ||
                @$_POST['ship213']) &&
                !$YourPlanet &&
                $UsedPlanet) {
            $missiontype[2] = $lang['type_mission'][2];
        }
        if ($_POST['planettype'] == 3 &&
                (@$_POST['ship214'] >= 1 || @$_POST['ship216'] >= 1) &&
                !$YourPlanet &&
                $UsedPlanet) {
            $missiontype[9] = $lang['type_mission'][9];
        }

        $fleetarray = unserialize(base64_decode(str_rot13($_POST["usedfleet"])));
        $mission = $_POST['target_mission'];
        $SpeedFactor = $_POST['speedfactor'];
        $AllFleetSpeed = GetFleetMaxSpeed($fleetarray, 0, $user);
        $GenFleetSpeed = $_POST['speed'];
        $MaxFleetSpeed = min($AllFleetSpeed);

        $distance = GetTargetDistance($_POST['thisgalaxy'], $_POST['galaxy'], $_POST['thissystem'], $_POST['system'], $_POST['thisplanet'], $_POST['planet']);
        $duration = GetMissionDuration($GenFleetSpeed, $MaxFleetSpeed, $distance, $SpeedFactor);
        $consumption = GetFleetConsumption($fleetarray, $SpeedFactor, $duration, $distance, $MaxFleetSpeed, $user);

        $this->tplObj->assign(array(
            'title' => $lang['fl_title'],
            'lang' => $lang,
            'planetrow' => $planetrow,
            'fleetarray' => unserialize(base64_decode(str_rot13($_POST["usedfleet"]))),
            'mission' => $_POST['target_mission'],
            'SpeedFactor' => $_POST['speedfactor'],
            'AllFleetSpeed' => GetFleetMaxSpeed($fleetarray, 0, $user),
            'GenFleetSpeed' => $_POST['speed'],
            'MaxFleetSpeed' => min($AllFleetSpeed),
            'distance' => GetTargetDistance($_POST['thisgalaxy'], $_POST['galaxy'], $_POST['thissystem'], $_POST['system'], $_POST['thisplanet'], $_POST['planet']),
            'duration' => GetMissionDuration($GenFleetSpeed, $MaxFleetSpeed, $distance, $SpeedFactor),
            'consumption' => GetFleetConsumption($fleetarray, $SpeedFactor, $duration, $distance, $MaxFleetSpeed, $user),
            '_POST' => $_POST,
            'pricelist' => $pricelist,
            'user' => $user,
            'user' => $user,
            'galaxy' => intval($_POST['galaxy']),
            'system' => intval($_POST['system']),
            'planet' => intval($_POST['planet']),
            'planettype' => intval($_POST['planettype']),
            'missiontype' => $missiontype,
            'missiontype_5' => @$missiontype[5],
        ));
        $this->render('floten2_body.tpl');
    }

}
