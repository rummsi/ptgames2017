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
 * @ShowImperiumPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 16:58:00
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

        define('NO_MENU', true);

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

        while ($p = mysqli_fetch_array($planetsrow)) {
            $planet[] = $p;
        }

        $parse['mount'] = count($planet) + 1;
// primera tabla, con las imagenes y coordenadas
        $row = gettemplate('imperium_row');
        $row2 = gettemplate('imperium_row2');

        foreach ($planet as $p) {
            PlanetResourceUpdate($user, $p, time());

            // {file_images}
            $data['text'] = '<a href="game.php?page=overview&cp=' . $p['id'] . '&amp;re=0"><img src="' . $dpath . 'planeten/small/s_' . $p['image'] . '.jpg" border="0" height="71" width="75"></a>';
            $parse['file_images'] .= parsetemplate($row, $data);
            // {file_names}
            $data['text'] = $p['name'];
            $parse['file_names'] .= parsetemplate($row2, $data);
            // {file_coordinates}
            $data['text'] = "[<a href=\"game.php?page=galaxy&type=3&galaxy={$p['galaxy']}&system={$p['system']}\">{$p['galaxy']}:{$p['system']}:{$p['planet']}</a>]";
            $parse['file_coordinates'] .= parsetemplate($row2, $data);
            // {file_fields}
            $data['text'] = $p['field_current'] . '/' . $p['field_max'];
            $parse['file_fields'] .= parsetemplate($row2, $data);
            // {file_metal}
            $data['text'] = '<a href="resources.php?cp=' . $p['id'] . '&amp;re=0&amp;planettype=' . $p['planet_type'] . '">' . pretty_number($p['metal']) . '</a> / ' . pretty_number($p['metal_perhour']);
            $parse['file_metal'] .= parsetemplate($row2, $data);
            // {file_crystal}
            $data['text'] = '<a href="resources.php?cp=' . $p['id'] . '&amp;re=0&amp;planettype=' . $p['planet_type'] . '">' . pretty_number($p['crystal']) . '</a> / ' . pretty_number($p['crystal_perhour']);
            $parse['file_crystal'] .= parsetemplate($row2, $data);
            // {file_deuterium}
            $data['text'] = '<a href="resources.php?cp=' . $p['id'] . '&amp;re=0&amp;planettype=' . $p['planet_type'] . '">' . pretty_number($p['deuterium']) . '</a> / ' . pretty_number($p['deuterium_perhour']);
            $parse['file_deuterium'] .= parsetemplate($row2, $data);
            // {file_energy}
            $data['text'] = pretty_number($p['energy_max'] - $p['energy_used']) . ' / ' . pretty_number($p['energy_max']);
            $parse['file_energy'] .= parsetemplate($row2, $data);

            foreach ($resource as $i => $res) {
                if (in_array($i, $reslist['build']))
                    $data['text'] = ($p[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=buildings&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$p[$resource[$i]]}</a>";
                elseif (in_array($i, $reslist['tech']))
                    $data['text'] = ($user[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=research&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$user[$resource[$i]]}</a>";
                elseif (in_array($i, $reslist['fleet']))
                    $data['text'] = ($p[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=shipyard&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$p[$resource[$i]]}</a>";
                elseif (in_array($i, $reslist['defense']))
                    $data['text'] = ($p[$resource[$i]] == 0) ? '-' : "<a href=\"game.php?page=defense&cp={$p['id']}&amp;re=0&amp;planettype={$p['planet_type']}\">{$p[$resource[$i]]}</a>";

                $r[$i] .= parsetemplate($row2, $data);
            }
        }

// {building_row}
        foreach ($reslist['build'] as $a => $i) {
            $data['text'] = $lang['tech'][$i];
            $parse['building_row'] .= "<tr>" . parsetemplate($row2, $data) . $r[$i] . "</tr>";
        }
// {technology_row}
        foreach ($reslist['tech'] as $a => $i) {
            $data['text'] = $lang['tech'][$i];
            $parse['technology_row'] .= "<tr>" . parsetemplate($row2, $data) . $r[$i] . "</tr>";
        }
// {fleet_row}
        foreach ($reslist['fleet'] as $a => $i) {
            $data['text'] = $lang['tech'][$i];
            $parse['fleet_row'] .= "<tr>" . parsetemplate($row2, $data) . $r[$i] . "</tr>";
        }
// {defense_row}
        foreach ($reslist['defense'] as $a => $i) {
            $data['text'] = $lang['tech'][$i];
            $parse['defense_row'] .= "<tr>" . parsetemplate($row2, $data) . $r[$i] . "</tr>";
        }

        $page .= parsetemplate(gettemplate('imperium_table'), $parse);

        display($page, $lang['Imperium'], false);
    }

}
