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
 * @ShowDefensePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 14:05:14
 */

require_once ROOT_PATH . 'includes/classes/Legacies/Empire/Shipyard.php';

/**
 * Description of ShowDefensePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowDefensePage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'defense';
    }

    function show() {
        global $lang, $resource, $dpath, $planetrow, $user;

        // Mise a jour de la liste de construction si necessaire
        UpdatePlanetBatimentQueueList($planetrow, $user);
        $IsWorking = HandleTechnologieBuild($planetrow, $user);
        $currentPlanet = $planetrow;
        $currentUser = $user;

        includeLang('buildings');
        includeLang('tech');

        // S'il n'y a pas de Chantier
        if (!isset($currentPlanet[$resource[Legacies_Empire::ID_BUILDING_SHIPYARD]]) || $currentPlanet[$resource[Legacies_Empire::ID_BUILDING_SHIPYARD]] == 0) {
            message($lang['need_hangar'], $lang['tech'][Legacies_Empire::ID_BUILDING_SHIPYARD]);
            return;
        }

        $shipyard = Legacies_Empire_Shipyard::factory($currentPlanet, $currentUser);
        if (isset($_POST['fmenge']) && is_array($_POST['fmenge'])) {
            foreach ($_POST['fmenge'] as $shipId => $count) {
                $shipId = intval($shipId);
                if (in_array($shipId, $resource)) {
                    continue;
                }
                $count = intval($count);

                $shipyard->appendQueue($shipId, $count);
            }
            $currentPlanet = $shipyard->save();
        }

        if (!empty($currentPlanet['b_hangar_id'])) {
            $data = array();
            foreach ($shipyard->getQueue() as $item) {
                $data[] = array_merge($item, array(
                    'label' => $lang['tech'][$item['ship_id']],
                    'speed' => $shipyard->getBuildTime($item['ship_id'], 1)
                ));
            }
        }

        $this->tplObj->assign(array(
            'title' => "Defense",
            'types' => include ROOT_PATH . 'includes/data/types.php',
            'currentPlanet' => $planetrow,
            'currentUser' => $user,
            'Construire' => $lang['Construire'],
            'shipyard' => $shipyard,
            'resource' => $resource,
            'lang_dispo' => $lang['dispo'],
            'lang_tech' => $lang['tech'],
            'res_descriptions' => $lang['res']['descriptions'],
            'data' => json_encode($data)
        ));
        $this->render('buildings_defense.tpl');
    }

}
