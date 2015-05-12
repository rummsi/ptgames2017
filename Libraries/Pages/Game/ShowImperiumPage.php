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
 * @ShowImperiumPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  12/mai/2015 18:56:47
 */

/**
 * Description of ShowImperiumPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowImperiumPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'empire';
        includeLang('leftmenu');
    }

    function show() {
        global $lang, $user, $resource, $reslist, $dpath;

        $this->initTemplate();
        $this->setWindow('popup');

        includeLang('imperium');
        $Order = ( $user['planet_sort_order'] == 1 ) ? "DESC" : "ASC";
        $Sort = $user['planet_sort'];
        $QryPlanets = "SELECT * FROM {{table}} WHERE `id_owner` = '" . $user['id'] . "' ORDER BY ";
        if ($Sort == 0) {
            $QryPlanets .= "`id` " . $Order;
        } elseif ($Sort == 1) {
            $QryPlanets .= "`galaxy`, `system`, `planet`, `planet_type` " . $Order;
        } elseif ($Sort == 2) {
            $QryPlanets .= "`name` " . $Order;
        }
        $planetsrow = doquery($QryPlanets, 'planets');
        $planet = array();
        $parse = $lang;
        while ($p = mysql_fetch_array($planetsrow)) {
            $planet[] = $p;
        }
        // primera tabla, con las imagenes y coordenadas
        $parse['file_images'] = "";
        $parse['file_names'] = "";
        $parse['file_coordinates'] = "";
        $parse['file_fields'] = "";
        $parse['file_metal'] = "";
        $parse['file_crystal'] = "";
        $parse['file_deuterium'] = "";
        $parse['file_energy'] = "";
        foreach ($planet as $p) {
            PlanetResourceUpdate($user, $p, time());
            // {file_images}
            $this->tplObj->assign('text', '<a href="game.php?page=overview&cp=' . $p['id'] . '&amp;re=0"><img src="' . $dpath . 'planeten/small/s_' . $p['image'] . '.jpg" border="0" height="71" width="75"></a>');
            $parse['file_images'] .= $this->tplObj->fetch('imperium_row.tpl');
            // {file_names}
            $this->tplObj->assign('text', $p['name']);
            $parse['file_names'] .= $this->tplObj->fetch('imperium_row2.tpl');
            // {file_coordinates}
            $this->tplObj->assign('text', "[<a href=\"game.php?page=galaxy&action=3&galaxy={$p['galaxy']}&system={$p['system']}\">{$p['galaxy']}:{$p['system']}:{$p['planet']}</a>]");
            $parse['file_coordinates'] .= $this->tplObj->fetch('imperium_row2.tpl');
            // {file_fields}
            $this->tplObj->assign('text', $p['field_current'] . '/' . $p['field_max']);
            $parse['file_fields'] .= $this->tplObj->fetch('imperium_row2.tpl');
            // {file_metal}
            $this->tplObj->assign('text', '<a href="game.php?page=resources&cp=' . $p['id'] . '&amp;re=0&amp;planettype=' . $p['planet_type'] . '">' . pretty_number($p['metal']) . '</a> / ' . pretty_number($p['metal_perhour']));
            $parse['file_metal'] .= $this->tplObj->fetch('imperium_row2.tpl');
            // {file_crystal}
            $this->tplObj->assign('text', '<a href="game.php?page=resources&cp=' . $p['id'] . '&amp;re=0&amp;planettype=' . $p['planet_type'] . '">' . pretty_number($p['crystal']) . '</a> / ' . pretty_number($p['crystal_perhour']));
            $parse['file_crystal'] .= $this->tplObj->fetch('imperium_row2.tpl');
            // {file_deuterium}
            $this->tplObj->assign('text', '<a href="game.php?page=resources&cp=' . $p['id'] . '&amp;re=0&amp;planettype=' . $p['planet_type'] . '">' . pretty_number($p['deuterium']) . '</a> / ' . pretty_number($p['deuterium_perhour']));
            $parse['file_deuterium'] .= $this->tplObj->fetch('imperium_row2.tpl');
            // {file_energy}
            $this->tplObj->assign('text', pretty_number($p['energy_max'] - $p['energy_used']) . ' / ' . pretty_number($p['energy_max']));
            $parse['file_energy'] .= $this->tplObj->fetch('imperium_row2.tpl');

            foreach ($resource as $i => $res) {
                if (in_array($i, $reslist['build'])) {
                    $data['text'] = ($p[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=buildings&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$p[$resource[$i]]}</a>";
                } elseif (in_array($i, $reslist['tech'])) {
                    $data['text'] = ($user[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=buildings&mode=research&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$user[$resource[$i]]}</a>";
                } elseif (in_array($i, $reslist['fleet'])) {
                    $data['text'] = ($p[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=buildings&mode=fleet&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$p[$resource[$i]]}</a>";
                } elseif (in_array($i, $reslist['defense'])) {
                    $data['text'] = ($p[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=buildings&mode=defense&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$p[$resource[$i]]}</a>";
                }
                $this->tplObj->assign('text', $data['text']);
                @$r[$i] .= $this->tplObj->fetch('imperium_row2.tpl');
            }

            $this->tplObj->assign(array(
                'file_images' => $parse['file_images'],
                'file_names' => $parse['file_names'],
                'file_coordinates' => $parse['file_coordinates'],
                'file_fields' => $parse['file_fields'],
                'file_metal' => $parse['file_metal'],
                'file_crystal' => $parse['file_crystal'],
                'file_deuterium' => $parse['file_deuterium'],
                'file_energy' => $parse['file_energy'],
            ));
        }
        // {building_row}
        $parse['building_row'] ="";
        $parse['technology_row'] ="";
        $parse['fleet_row'] ="";
        $parse['defense_row'] ="";
        foreach ($reslist['build'] as $a => $i) {
            $this->tplObj->assign('text', $lang['tech'][$i]);
            $parse['building_row'] .= "<tr>" . $this->tplObj->fetch('imperium_row2.tpl') . $r[$i] . "</tr>";
        }
        // {technology_row}
        foreach ($reslist['tech'] as $a => $i) {
            $this->tplObj->assign('text', $lang['tech'][$i]);
            $parse['technology_row'] .= "<tr>" . $this->tplObj->fetch('imperium_row2.tpl') . $r[$i] . "</tr>";
        }
        // {fleet_row}
        foreach ($reslist['fleet'] as $a => $i) {
            $this->tplObj->assign('text', $lang['tech'][$i]);
            $parse['fleet_row'] .= "<tr>" . $this->tplObj->fetch('imperium_row2.tpl') . $r[$i] . "</tr>";
        }
        // {defense_row}
        foreach ($reslist['defense'] as $a => $i) {
            $this->tplObj->assign('text', $lang['tech'][$i]);
            $parse['defense_row'] .= "<tr>" . $this->tplObj->fetch('imperium_row2.tpl') . $r[$i] . "</tr>";
        }

        $this->tplObj->assign(array(
            'title' => $lang['Imperium'],
            'mount' => count($planet) + 1,
            'imperium_vision' => $lang['imperium_vision'],
            'name' => $lang['name'],
            'coordinates' => $lang['coordinates'],
            'fields' => $lang['fields'],
            'resources' => $lang['resources'],
            'Metal' => $lang['Metal'],
            'Crystal' => $lang['Crystal'],
            'Deuterium' => $lang['Deuterium'],
            'Energy' => $lang['Energy'],
            'buildings' => $lang['buildings'],
            'building_row' => $parse['building_row'],
            'investigation' => $lang['investigation'],
            'technology_row' => $parse['technology_row'],
            'ships' => $lang['ships'],
            'fleet_row' => $parse['fleet_row'],
            'defense' => $lang['defense'],
            'defense_row' => $parse['defense_row'],
        ));

        $this->render('imperium_table.tpl');
    }

}
