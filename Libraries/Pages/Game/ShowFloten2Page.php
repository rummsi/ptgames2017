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
 * @ShowFloten2Page.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  2/mai/2015 11:52:31
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
        while ($row = mysql_fetch_array($select)) {
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
            } elseif ($_POST['ship210'] >= 1 && !$YourPlanet) {
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
        if ($YourPlanet) {
            $missiontype[4] = $lang['type_mission'][4];
        }
        if ($_POST['planettype'] == 3 && ($_POST['ship214'] || $_POST['ship213']) && !$YourPlanet && $UsedPlanet) {
            $missiontype[2] = $lang['type_mission'][2];
        }
        if ($_POST['planettype'] == 3 && ($_POST['ship214'] >= 1 || $_POST['ship216'] >= 1) && !$YourPlanet && $UsedPlanet) {
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
        $MissionSelector = "";
        if (count($missiontype) > 0) {
            if ($planet == 16) {
                $MissionSelector .= "<tr height=\"20\">";
                $MissionSelector .= "<th>";
                $MissionSelector .= "<input type=\"radio\" name=\"mission\" value=\"15\" checked=\"checked\">" . $lang['type_mission'][15] . "<br /><br />";
                $MissionSelector .= "<font color=\"red\">" . $lang['fl_expe_warning'] . "</font>";
                $MissionSelector .= "</th>";
                $MissionSelector .= "</tr>";
            } else {
                $i = 0;
                foreach ($missiontype as $a => $b) {
                    $MissionSelector .= "<tr height=\"20\">";
                    $MissionSelector .= "<th>";
                    $MissionSelector .= "<input id=\"inpuT_" . $i . "\" type=\"radio\" name=\"mission\" value=\"" . $a . "\"" . ($mission == $a ? " checked=\"checked\"" : "") . ">";
                    $MissionSelector .= "<label for=\"inpuT_" . $i . "\">" . $b . "</label><br>";
                    $MissionSelector .= "</th>";
                    $MissionSelector .= "</tr>";
                    $i++;
                }
            }
        } else {
            $MissionSelector .= "<tr height=\"20\">";
            $MissionSelector .= "<th>";
            $MissionSelector .= "<font color=\"red\">" . $lang['fl_bad_mission'] . "</font>";
            $MissionSelector .= "</th>";
            $MissionSelector .= "</tr>";
        }
        if ($_POST['thisplanettype'] == 1) {
            $TableTitle = "" . $_POST['thisgalaxy'] . ":" . $_POST['thissystem'] . ":" . $_POST['thisplanet'] . " - " . $lang['fl_planet'] . "";
        } elseif ($_POST['thisplanettype'] == 3) {
            $TableTitle = "" . $_POST['thisgalaxy'] . ":" . $_POST['thissystem'] . ":" . $_POST['thisplanet'] . " - " . $lang['fl_moon'] . "";
        }
        $fleetarray_shyp_count = "";
        foreach ($fleetarray as $Ship => $Count) {
            $fleetarray_shyp_count .= "<input type=\"hidden\" name=\"ship" . $Ship . "\"        value=\"" . $Count . "\" />\n";
            $fleetarray_shyp_count .= "<input type=\"hidden\" name=\"capacity" . $Ship . "\"    value=\"" . $pricelist[$Ship]['capacity'] . "\" />\n";
            $fleetarray_shyp_count .= "<input type=\"hidden\" name=\"consumption" . $Ship . "\" value=\"" . GetShipConsumption($Ship, $user) . "\" />\n";
            $fleetarray_shyp_count .= "<input type=\"hidden\" name=\"speed" . $Ship . "\"       value=\"" . GetFleetMaxSpeed("", $Ship, $user) . "\" />\n";
        }
        $if_planet16 = "";
        if ($planet == 16) {
            $if_planet16 .= "<tr height=\"20\">";
            $if_planet16 .= "<td class=\"c\" colspan=\"3\">" . $lang['fl_expe_staytime'] . "</td>";
            $if_planet16 .= "</tr>";
            $if_planet16 .= "<tr height=\"20\">";
            $if_planet16 .= "<th colspan=\"3\">";
            $if_planet16 .= "<select name=\"expeditiontime\" >";
            $if_planet16 .= "<option value=\"1\">1</option>";
            $if_planet16 .= "<option value=\"2\">2</option>";
            $if_planet16 .= "</select>";
            $if_planet16 .= $lang['fl_expe_hours'];
            $if_planet16 .= "</th>";
            $if_planet16 .= "</tr>";
        } elseif (@$missiontype[5] != '') {
            $if_planet16 .= "<tr height=\"20\">";
            $if_planet16 .= "<td class=\"c\" colspan=\"3\">" . $lang['fl_expe_staytime'] . "</td>";
            $if_planet16 .= "</tr>";
            $if_planet16 .= "<tr height=\"20\">";
            $if_planet16 .= "<th colspan=\"3\">";
            $if_planet16 .= "<select name=\"holdingtime\" >";
            $if_planet16 .= "<option value=\"0\">0</option>";
            $if_planet16 .= "<option value=\"1\">1</option>";
            $if_planet16 .= "<option value=\"2\">2</option>";
            $if_planet16 .= "<option value=\"4\">4</option>";
            $if_planet16 .= "<option value=\"8\">8</option>";
            $if_planet16 .= "<option value=\"16\">16</option>";
            $if_planet16 .= "<option value=\"32\">32</option>";
            $if_planet16 .= "</select>";
            $if_planet16 .= $lang['fl_expe_hours'];
            $if_planet16 .= "</th>";
            $if_planet16 .= "</tr>";
        }

        $this->tplObj->assign(array(
            'title' => $lang['fl_title'],
            'pmetal' => floor($planetrow["metal"]),
            'pcrystal' => floor($planetrow["crystal"]),
            'pdeuterium' => floor($planetrow["deuterium"]),
            'consumption' => $consumption,
            'distance' => $distance,
            'Pspeedfactor' => $_POST['speedfactor'],
            'Pthisgalaxy' => $_POST["thisgalaxy"],
            'Pthissystem' => $_POST["thissystem"],
            'Pthisplanet' => $_POST["thisplanet"],
            'Pgalaxy' => $_POST["galaxy"],
            'Psystem' => $_POST["system"],
            'Pplanet' => $_POST["planet"],
            'Pthisplanettype' => $_POST["thisplanettype"],
            'Pplanettype' => $_POST["planettype"],
            'Pspeedallsmin' => $_POST["speedallsmin"],
            'Pspeed' => $_POST['speed'],
            'Pspeedfactor' => $_POST["speedfactor"],
            'Pusedfleet' => $_POST["usedfleet"],
            'Pmaxepedition' => $_POST['maxepedition'],
            'Pcurepedition' => $_POST['curepedition'],
            'fleetarray_shyp_count' => $fleetarray_shyp_count,
            'TableTitle' => $TableTitle,
            'fl_mission' => $lang['fl_mission'],
            'if_planet16' => $if_planet16,
            'fl_planet' => $lang['fl_planet'],
            'fl_moon' => $lang['fl_moon'],
            'type_mission' => $lang['type_mission'],
            'fl_expe_warning' => $lang['fl_expe_warning'],
            'fl_bad_mission' => $lang['fl_bad_mission'],
            'MissionSelector' => $MissionSelector,
            'fl_ressources' => $lang['fl_ressources'],
            'Metal' => $lang['Metal'],
            'fl_selmax' => $lang['fl_selmax'],
            'fmetal' => floor($planetrow['metal']),
            'Crystal' => $lang['Crystal'],
            'fcrystal' => floor($planetrow['crystal']),
            'Deuterium' => $lang['Deuterium'],
            'fdeuterium' => floor($planetrow['deuterium']),
            'i' => $i,
            'a' => $a,
            'mission_cheked' => (filter_input(INPUT_POST, 'target_mission') == $a ? " checked=\"checked\"" : ""),
            'b' => $b,
            'fl_space_left' => $lang['fl_space_left'],
            'fl_allressources' => $lang['fl_allressources'],
            'planet' => $planet,
            'fl_expe_staytime' => $lang['fl_expe_staytime'],
            'fl_expe_hours' => $lang['fl_expe_hours'],
            'fl_expe_staytime' => $lang['fl_expe_staytime'],
            'fleetarray' => $fleetarray,
            'pricelist' => $pricelist,
            'fl_continue' => $lang['fl_continue'],
        ));

        $this->render('Fleet/floten2.tpl');
    }

}
