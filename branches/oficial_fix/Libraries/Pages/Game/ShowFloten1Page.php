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
 * @ShowFloten1Page.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 15:53:08
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
        $this->tplObj->assign(array(
            'g'=>$g,
            's'=>$s,
            'p'=>$p,
            't'=>$t,
        ));
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
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"consumption" . $i . "\" value=\"" . GetShipConsumption($i, $user) . "\" />";
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"speed" . $i . "\"       value=\"" . GetFleetMaxSpeed("", $i, $user) . "\" />";
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"capacity" . $i . "\"    value=\"" . $pricelist[$i]['capacity'] . "\" />";
                    $FleetHiddenBlock .= "<input type=\"hidden\" name=\"ship" . $i . "\"        value=\"" . $_POST["ship$i"] . "\" />";
                    $speedalls[$i] = GetFleetMaxSpeed("", $i, $user);
                }
            }
        }



        // Gestion des raccourcis vers ses propres colonies ou planetes

        $this->tplObj->assign(array(
            'title' => $lang['fl_title'],
            'lang' => $lang,
            'FleetHiddenBlock' => $FleetHiddenBlock,
            'fleet' => $fleet,
            'speedalls'=>$speedalls,
            'planetrow' =>$planetrow,
            '_POST'=>$_POST,
            'speed'=>$speed,
            'fleet_shortcut'=>$user['fleet_shortcut'],
            'kolonien' => SortUserPlanets($user),
            'currentplanet' => doquery("SELECT * FROM {{table}} WHERE id = '" . $user['current_planet'] . "'", 'planets', true),
            'target_mission'=> $target_mission,
        ));
        $this->render('floten1_body.tpl');
    }

}
