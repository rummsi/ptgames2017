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
 * @ShowFleetPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  2/mai/2015 11:29:31
 */

/**
 * Description of ShowFleetPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowFleetPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'fleet';
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
        // Y a pas de flottes en vol ... on met des '-'
        $i =0;
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
        // Prise des coordonnées sur la ligne de commande
        $galaxy = intval(HTTP::_GP('galaxy', ''));
        $system = intval(HTTP::_GP('ssytem', ''));
        $planet = intval(HTTP::_GP('planet', ''));
        $planettype = intval(HTTP::_GP('planettype', ''));
        $target_mission = intval(HTTP::_GP('target_mission', ''));
        $ShipData = "";
        foreach ($reslist['fleet'] as $n => $i) {
            if ($planetrow[$resource[$i]] > 0) {
                // Satelitte Solaire (eux ne peuvent pas bouger !)
                if ($i == 212) {
                    $this->tplObj->assign('i212', "<th></th><th></th>");
                } else {
                    $this->tplObj->assign('i212', "<th><a href=\"javascript:maxShip('ship" . $i . "'); shortInfo();\">" . $lang['fl_selmax'] . "</a> </th>
                    <th><input name=\"ship" . $i . "\" size=\"10\" value=\"0\" onfocus=\"javascript:if(this.value == '0') this.value='';\" onblur=\"javascript:if(this.value == '') this.value='0';\" alt=\"" . $lang['tech'][$i] . $planetrow[$resource[$i]] . "\" onChange=\"shortInfo()\" onKeyUp=\"shortInfo()\" /></th>");
                }
                $this->tplObj->assign(array(
                    'fl_fleetspeed' => $lang['fl_fleetspeed'],
                    'i' => $i,
                    'tech' => $lang['tech'],
                    'CurrentShipSpeed' => $CurrentShipSpeed,
                    'p_resource_i' => $planetrow[$resource[$i]],
                    'GetShipConsumption' => GetShipConsumption($i, $user),
                    'GetFleetMaxSpeed' => GetFleetMaxSpeed("", $i, $user),
                    'capacity' => $pricelist[$i]['capacity']
                ));
                $ShipData .= $this->tplObj->fetch('Fleet/fleet_row.tpl');
            }
            $have_ships = true;
        }
        $btncontinue = "<tr height=\"20\"><th colspan=\"4\"><input type=\"submit\" value=\" " . $lang['fl_continue'] . " \" /></th>";
        $have_ships1 = "";
        if (!$have_ships) {
            // Il n'y a pas de vaisseaux sur cette planete
            $have_ships1 = "<th colspan=\"4\">" . $lang['fl_noships'] . "</th>";
            $have_ships1 .= "</tr>";
            $have_ships1 .= $btncontinue;
        } else {
            $have_ships1 = "<th colspan=\"2\"><a href=\"javascript:noShips();shortInfo();noResources();\" >" . $lang['fl_unselectall'] . "</a></th>";
            $have_ships1 .= "<th colspan=\"2\"><a href=\"javascript:maxShips();shortInfo();\" >" . $lang['fl_selectall'] . "</a></th>";
            $have_ships1 .= "</tr>";

            if ($MaxFlottes > $MaxFlyingFleets) {
                $have_ships1 .= $btncontinue;
            }
        }

        $this->tplObj->assign(array(
            'title' => $lang['fl_title'],
            'fl_title' => $lang['fl_title'],
            'MaxFlyingFleets' => $MaxFlyingFleets,
            'fl_sur' => $lang['fl_sur'],
            'MaxFlottes' => $MaxFlottes,
            'ExpeditionEnCours' => isset($ExpeditionEnCours),
            'EnvoiMaxExpedition' => isset($EnvoiMaxExpedition),
            'fl_expttl' => $lang['fl_expttl'],
            'fl_new_miss' => $lang['fl_new_miss'],
            'fl_fleet_typ' => $lang['fl_fleet_typ'],
            'fl_fleet_disp' => $lang['fl_fleet_disp'],
            'ShipData' => $ShipData,
            'galaxy' => $galaxy,
            'system' => $system,
            'planet' => $planet,
            'planettype' => $planettype,
            'target_mission' => $target_mission,
            'have_ships1' => $have_ships1,
            'noslotfree' => $noslotfree,
        ));
        $this->render('Fleet/fleet.tpl');
    }

}
