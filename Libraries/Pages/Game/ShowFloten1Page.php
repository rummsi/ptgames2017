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
 * @ShowFloten1Page.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  2/mai/2015 11:50:31
 */

/**
 * Description of ShowFloten1Page
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowFloten1Page extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'floten1';
    }

    function show() {
        global $user, $planetrow, $lang, $resource, $pricelist, $reslist, $target_mission, $speedallsmin;

        includeLang('fleet');
        $speed = array(10 => 100,
            9 => 90,
            8 => 80,
            7 => 70,
            6 => 60,
            5 => 50,
            4 => 40,
            3 => 30,
            2 => 20,
            1 => 10,
        );
        $g = $_POST['galaxy'];
        $s = $_POST['system'];
        $p = $_POST['planet'];
        $t = $_POST['planet_type'];
        if (!$g) {
            $g = $planetrow['galaxy'];
        }
        if (!$s) {
            $s = $planetrow['system'];
        }
        if (!$p) {
            $p = $planetrow['planet'];
        }
        if (!$t) {
            $t = $planetrow['planet_type'];
        }
        // Verifions si nous avons bien tout ce que nous voullons envoyer
        $FleetHiddenBlock = "";
        foreach ($reslist['fleet'] as $n => $i) {
            if ($i > 200 && $i < 300 && @$_POST["ship$i"] > "0") {
                if ($_POST["ship$i"] > $planetrow[$resource[$i]]) {
                    $page .= $lang['fl_noenought'];
                    $speedalls[$i] = GetFleetMaxSpeed("", $i, $user);
                } else {
                    $fleet['fleetarray'][$i] = $_POST["ship$i"];
                    // Tableau des vaisseaux avec leur nombre
                    @$fleet['fleetlist'] .= $i . "," . $_POST["ship$i"] . ";";
                    // Nombre total de vaisseaux
                    @$fleet['amount'] += $_POST["ship$i"];
                    // Tableau des vitesses
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"consumption" . $i . "\" value=\"" . GetShipConsumption($i, $user) . "\" />\n";
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"speed" . $i . "\"       value=\"" . GetFleetMaxSpeed("", $i, $user) . "\" />\n";
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"capacity" . $i . "\"    value=\"" . $pricelist[$i]['capacity'] . "\" />\n";
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"ship" . $i . "\"        value=\"" . $_POST["ship$i"] . "\" />";
                    $speedalls[$i] = GetFleetMaxSpeed("", $i, $user);
                }
            }
        }
        if (!$fleet['fleetlist']) {
            message($lang['fl_unselectall'], $lang['fl_error'], "fleet.php", 1);
        } else {
            $speedallsmin = min($speedalls);
        }
        $speed_ab="";
        foreach ($speed as $a => $b) {
            $speed_ab .= "<option value=\"" . $a . "\">" . $b . "</option>\n";
        }
        $fleet_short = "";
        if ($user['fleet_shortcut']) {
            $scarray = explode("\r\n", $user['fleet_shortcut']);
            $i = 0;
            foreach ($scarray as $a => $b) {
                if ($b != "") {
                    $c = explode(',', $b);
                    if ($i == 0) {
                        $fleet_short .= "<tr height=\"20\">";
                    }
                    $fleet_short .= "<th><a href=\"javascript:setTarget(" . $c[1] . "," . $c[2] . "," . $c[3] . "," . $c[4] . "); shortInfo();\"";
                    $fleet_short .= ">" . $c[0] . " " . $c[1] . ":" . $c[2] . ":" . $c[3] . " ";
                    // Signalisation du type de raccourci ...
                    // (P)lanete
                    // (D)ebris
                    // (L)une
                    if ($c[4] == 1) {
                        $fleet_short .= $lang['fl_shrtcup1'];
                    } elseif ($c[4] == 2) {
                        $fleet_short .= $lang['fl_shrtcup2'];
                    } elseif ($c[4] == 3) {
                        $fleet_short .= $lang['fl_shrtcup3'];
                    }
                    $fleet_short .= "</a></th>";
                    if ($i == 1) {
                        $fleet_short .= "</tr>";
                    }
                    if ($i == 1) {
                        $i = 0;
                    } else {
                        $i = 1;
                    }
                }
            }
            if ($i == 1) {
                $fleet_short .= "<th></th></tr>";
            }
        } else {
            $fleet_short .= "<tr height=\"20\">";
            $fleet_short .= "<th colspan=\"2\">" . $lang['fl_noshortc'] . "</th>";
            $fleet_short .= "</tr>";
        }
        // Gestion des raccourcis vers ses propres colonies ou planetes
        $kolonien = SortUserPlanets($user);
        $currentplanet = doquery("SELECT * FROM {{table}} WHERE id = '" . $user['current_planet'] . "'", 'planets', true);
        $kolonien_page = "";
        if ($kolonien->num_rows > 1) {
            $i = 0;
            $w = 0;
            $tr = true;
            while ($row = $kolonien->fetch_array()) {
                if ($w == 0 && $tr) {
                    $kolonien_page .= "<tr height=\"20\">";
                    $tr = false;
                }
                if ($w == 2) {
                    $kolonien_page .= "</tr>";
                    $w = 0;
                    $tr = true;
                }
                if ($row['planet_type'] == 3) {
                    $row['name'] .= " " . $lang['fl_shrtcup3'];
                }
                if ($currentplanet['galaxy'] == $row['galaxy'] &&
                        $currentplanet['system'] == $row['system'] &&
                        $currentplanet['planet'] == $row['planet'] &&
                        $currentplanet['planet_type'] == $row['planet_type']) {
                    //$page .= '<th><a href="javascript:setTarget('.$row['galaxy'].','.$row['system'].','.$row['planet'].','.$row['planet_type'].'); shortInfo();">'.$row['name'].' '.$row['galaxy'].':'.$row['system'].':'.$row['planet'].'</a></th>';
                } else {
                    $kolonien_page .= "<th><a href=\"javascript:setTarget(" . $row['galaxy'] . "," . $row['system'] . "," . $row['planet'] . "," . $row['planet_type'] . "); shortInfo();\">" . $row['name'] . " " . $row['galaxy'] . ":" . $row['system'] . ":" . $row['planet'] . "</a></th>";
                    $w++;
                    $i++;
                }
            }
            if ($i % 2 != 0) {
                $kolonien_page .= "<th>&nbsp;</th></tr>";
            } elseif ($w == 2) {
                $kolonien_page .= "</tr>";
            }
        } else {
            $kolonien_page .= "<th colspan=\"2\">" . $lang['fl_nocolonies'] . "</th>";
        }

        $this->tplObj->assign(array(
            'title' => $lang['fl_title'],
            'FleetHiddenBlock' => $FleetHiddenBlock,
            'speedallsmin' => $speedallsmin,
            'f_fleetarray' => str_rot13(base64_encode(serialize($fleet['fleetarray']))),
            'galaxy' => $planetrow['galaxy'],
            'system' => $planetrow['system'],
            'planet' => $planetrow['planet'],
            'Pgalaxy' => intval(filter_input(INPUT_POST, 'galaxy')),
            'Psystem' => intval(filter_input(INPUT_POST, 'system')),
            'Pplanet' => intval(filter_input(INPUT_POST, 'planet')),
            'GetGameSpeedFactor' => GetGameSpeedFactor(),
            'planet_type' => $planetrow['planet_type'],
            'fmetal' => floor($planetrow['metal']),
            'fcrystal' => floor($planetrow['crystal']),
            'fdeuterium' => floor($planetrow['deuterium']),
            'fl_floten1_ttl' => $lang['fl_floten1_ttl'],
            'fl_dest' => $lang['fl_dest'],
            'g' => $g,
            's' => $s,
            'p' => $p,
            't' => $t,
            'fl_planet' => $lang['fl_planet'],
            'fl_ruins' => $lang['fl_ruins'],
            'fl_moon' => $lang['fl_moon'],
            'fl_speed' => $lang['fl_speed'],
            'speed_ab' => $speed_ab,
            'fl_dist' => $lang['fl_dist'],
            'fl_fltime' => $lang['fl_fltime'],
            'fl_deute_need' => $lang['fl_deute_need'],
            'fl_speed_max' => $lang['fl_speed_max'],
            'fl_max_load' => $lang['fl_max_load'],
            'fl_shortcut' => $lang['fl_shortcut'],
            'fl_shortlnk' => $lang['fl_shortlnk'],
            'fleet_short' => $fleet_short,
            'fl_myplanets' => $lang['fl_myplanets'],
            'kolonien_page' => $kolonien_page,
            'fl_grattack' => $lang['fl_grattack'],
            'fl_continue' => $lang['fl_continue'],
            'Pmaxepedition' => filter_input(INPUT_POST, 'maxepedition'),
            'Pcurepedition' => filter_input(INPUT_POST, 'curepedition'),
            'target_mission' => $target_mission,
        ));
        $this->render('Fleet/floten1.tpl');
    }

}
