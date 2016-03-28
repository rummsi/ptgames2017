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
 * @ShowMovementPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  6/mai/2015 21:29:31
 */

/**
 * Description of ShowMovementPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMovementPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'movement';
    }

    function show() {
        global $user, $planetrow, $lang, $resource, $pricelist, $reslist, $CurrentShipSpeed;

        includeLang('fleet');

        $maxfleet = doquery("SELECT COUNT(fleet_owner) AS `actcnt` FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets', true);
        $MaxFlyingFleets = $maxfleet['actcnt'];
        //Compteur de flotte en expéditions et nombre d'expédition maximum
        $MaxExpedition = $user[$resource[124]];
        if ($MaxExpedition >= 1) {
            $maxexpde = doquery("SELECT COUNT(fleet_owner) AS `expedi` FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "' AND `fleet_mission` = '15';", 'fleets', true);
            $ExpeditionEnCours = $maxexpde['expedi'];
            $EnvoiMaxExpedition = 1 + floor($MaxExpedition / 3);
        }
        $MaxFlottes = 1 + $user[$resource[108]];
        CheckPlanetUsedFields($planetrow);
        $missiontype = array(
            1 => $lang['type_mission'][1],
            2 => $lang['type_mission'][2],
            3 => $lang['type_mission'][3],
            4 => $lang['type_mission'][4],
            5 => $lang['type_mission'][5],
            6 => $lang['type_mission'][6],
            7 => $lang['type_mission'][7],
            8 => $lang['type_mission'][8],
            9 => $lang['type_mission'][9],
            15 => $lang['type_mission'][15]
        );
        // Histoire de recuperer les infos passées par galaxy
        $galaxy1 = HTTP::_GP('galaxy', '');
        $system1 = HTTP::_GP('system', '');
        $planet1 = HTTP::_GP('planet', '');
        $planettype1 = HTTP::_GP('planettype', '');

        if (!$galaxy1) {
            $galaxy1 = $planetrow['galaxy'];
        }
        if (!$system1) {
            $system1 = $planetrow['system'];
        }
        if (!$planet1) {
            $planet1 = $planetrow['planet'];
        }
        if (!$planettype1) {
            $planettype1 = $planetrow['planet_type'];
        }
        // Gestion des flottes du joueur actif
        $fq = doquery("SELECT * FROM {{table}} WHERE fleet_owner={$user['id']}", "fleets");
        $i = 0;
        $fleet_table = "";
        while ($f = $fq->fetch_array()) {
            $i++;
            $fleet_destination = "";
            if (($f['fleet_start_time'] + 1) == $f['fleet_end_time']) {
                $fleet_destination = "<br><a title=\"" . $lang['fl_back_to_ttl'] . "\">" . $lang['fl_back_to'] . "</a>";
            } else {
                $fleet_destination = "<br><a title=\"" . $lang['fl_get_to_ttl'] . "\">" . $lang['fl_get_to'] . "</a>";
            }
            // Fleet details (commentaire)
            $fleet = explode(";", $f['fleet_array']);
            $e = 0;
            $fleet_ab = "";
            foreach ($fleet as $a => $b) {
                if ($b != '') {
                    $e++;
                    $a = explode(",", $b);
                    $fleet_ab .= $lang['tech'][$a[0]] . ":" . $a[1] . "\n";
                    if ($e > 1) {
                        $fleet_ab .= "\t";
                    }
                }
            }
            if ($f['fleet_mess'] == 0) {
                $fleet_mess = "<form action=\"game.php?page=fleetback\" method=\"post\">";
                $fleet_mess .= "<input name=\"fleetid\" value=\"" . $f['fleet_id'] . "\" type=\"hidden\">";
                $fleet_mess .= "<input value=\" " . $lang['fl_back_to_ttl'] . " \" type=\"submit\" name=\"send\">";
                $fleet_mess .= "</form>";
                if ($f['fleet_mission'] == 1) {
                    $fleet_mess .= "<form action=\"verband.php\" method=\"post\">";
                    $fleet_mess .= "<input name=\"fleetid\" value=\"" . $f['fleet_id'] . "\" type=\"hidden\">";
                    $fleet_mess .= "<input value=\" " . $lang['fl_associate'] . " \" type=\"submit\">";
                    $fleet_mess .= "</form>";
                }
            } else {
                $fleet_mess = "&nbsp;-&nbsp;";
            }
            $this->tplObj->assign(array(
                'i' => $i,
                'mf_fleet_missiion' => $missiontype[$f['fleet_mission']],
                'fleet_destination' => $fleet_destination,
                'fleet_ab' => $fleet_ab,
                'f_fleet_amount' => $f['fleet_amount'],
                'f_fleet_start_galaxy' => $f['fleet_start_galaxy'],
                'f_fleet_start_system' => $f['fleet_start_system'],
                'f_fleet_start_planet' => $f['fleet_start_planet'],
                'f_fleet_start_time' => gmdate("d. M Y H:i:s", $f['fleet_start_time']),
                'f_fleet_end_galaxy' => $f['fleet_end_galaxy'],
                'f_fleet_end_system' => $f['fleet_end_system'],
                'f_fleet_end_planet' => $f['fleet_end_planet'],
                'f_fleet_end_time' => gmdate("d. M Y H:i:s", $f['fleet_end_time']),
                'fleet_end_time' => pretty_time(floor($f['fleet_end_time'] + 1 - time())),
                'fleet_mess' => $fleet_mess,
            ));
            $fleet_table .= $this->tplObj->fetch('Fleet/fleet_table.tpl');
        }
        // Y a pas de flottes en vol ... on met des '-'
        $no_fleet = "";
        if ($i == 0) {
            $no_fleet = "<tr>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            //$no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "<th>-</th>";
            $no_fleet .= "</tr>";
        }
        $noslotfree = "";
        if ($MaxFlottes == $MaxFlyingFleets) {
            $noslotfree = "<tr height=\"20\"><th colspan=\"9\"><font color=\"red\">" . $lang['fl_noslotfree'] . "</font></th></tr>";
        }
        if (!$planetrow) {
            message($lang['fl_noplanetrow'], $lang['fl_error']);
        }

        $this->tplObj->assign(array(
            'title' => 'Fleet Movement',
            'fl_title' => $lang['fl_title'],
            'MaxFlyingFleets' => $MaxFlyingFleets,
            'fl_sur' => $lang['fl_sur'],
            'MaxFlottes' => $MaxFlottes,
            'ExpeditionEnCours' => isset($ExpeditionEnCours),
            'EnvoiMaxExpedition' => isset($EnvoiMaxExpedition),
            'fl_expttl' => $lang['fl_expttl'],
            'fl_id' => $lang['fl_id'],
            'fl_mission' => $lang['fl_mission'],
            'fl_count' => $lang['fl_count'],
            'fl_from' => $lang['fl_from'],
            'fl_start_t' => $lang['fl_start_t'],
            'fl_dest' => $lang['fl_dest'],
            'fl_dest_t' => $lang['fl_dest_t'],
            'fl_back_t' => $lang['fl_back_t'],
            'fl_back_in' => $lang['fl_back_in'],
            'fl_order' => $lang['fl_order'],
            'fleet_table' => $fleet_table,
            'no_fleet' => $no_fleet,
            'noslotfree' => $noslotfree,
        ));
        $this->render('Fleet/fleet_movement.tpl');
    }

}
