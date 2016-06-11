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
 * @ShowFleetPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 15:49:42
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

        $maxfleet = doquery("SELECT COUNT(fleet_owner) AS `actcnt` FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets', true);

        $this->tplObj->assign('MaxFlyingFleets', $maxfleet['actcnt']);
        //Compteur de flotte en expéditions et nombre d'expédition maximum
        $this->tplObj->assign('MaxFlottes', 1 + $user[$resource[108]]);

        CheckPlanetUsedFields($planetrow);

        includeLang('fleet');

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
        $galaxy = @$_GET['galaxy'];
        $system = @$_GET['system'];
        $planet = @$_GET['planet'];
        $planettype = @$_GET['planettype'];
        $target_mission = @$_GET['target_mission'];

        if (!$galaxy) {
            $galaxy = $planetrow['galaxy'];
        }
        if (!$system) {
            $system = $planetrow['system'];
        }
        if (!$planet) {
            $planet = $planetrow['planet'];
        }
        if (!$planettype) {
            $planettype = $planetrow['planet_type'];
        }
        
        // Gestion des flottes du joueur actif
        $this->tplObj->assign(array(
            'fq' => doquery("SELECT * FROM {{table}} WHERE fleet_owner={$user['id']}", "fleets"),
            'i' => 0,
            'missiontype' => $missiontype,
            'e' => 0,
        ));

        // Selection d'une nouvelle mission
        // Prise des coordonnées sur la ligne de commande
        $this->tplObj->assign(array(
            'galaxy' => intval(@$_GET['galaxy']),
            'system' => intval(@$_GET['system']),
            'planet' => intval(@$_GET['planet']),
            'planettype' => intval(@$_GET['planettype']),
            'target_mission' => intval(@$_GET['target_mission']),
            'reslist' => $reslist,
            'planetrow' => $planetrow,
            'resource' => $resource,
        ));

        $this->tplObj->assign(array(
            'title' => $lang['fl_title'],
            'lang' => $lang,
            'maxexpde' => doquery("SELECT COUNT(fleet_owner) AS `expedi` FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "' AND `fleet_mission` = '15';", 'fleets', true),
            'MaxExpedition' => $user[$resource[124]],
            'user' => $user,
            'pricelist' => $pricelist,
            'CurrentShipSpeed' => $CurrentShipSpeed,
        ));
        $this->render('fleet_body.tpl');
    }

}
