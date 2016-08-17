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
 * @ShowResourceSettingsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 18:14:14
 */

/**
 * Description of ShowResourceSettingsPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowResourceSettingsPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'resources';
        includeLang('leftmenu');
    }

    function show() {
        global $lang, $ProdGrid, $resource, $reslist, $game_config, $_POST, $planetrow, $user;

        $CurrentPlanet = $planetrow;
        $CurrentUser = $user;

        includeLang('resources');

        // Si c'est une lune ... pas de ressources produites
        if ($CurrentPlanet['planet_type'] == 3) {
            $game_config['metal_basic_income'] = 0;
            $game_config['crystal_basic_income'] = 0;
            $game_config['deuterium_basic_income'] = 0;
        }

        $ValidList['percent'] = array(0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100);
        $SubQry = "";
        if ($_POST) {
            foreach ($_POST as $Field => $Value) {
                $FieldName = $Field . "_porcent";
                if (isset($CurrentPlanet[$FieldName])) {
                    if (!in_array($Value, $ValidList['percent'])) {
                        header("Location: game.php?page=overview");
                        exit;
                    }

                    $Value = $Value / 10;
                    $CurrentPlanet[$FieldName] = $Value;
                    $SubQry .= ", `" . $FieldName . "` = '" . $Value . "'";
                }
            }
        }

        $parse = $lang;

        $parse['production_level'] = 100;
        if ($CurrentPlanet['energy_max'] == 0 &&
                $CurrentPlanet['energy_used'] > 0) {
            $post_porcent = 0;
        } elseif ($CurrentPlanet['energy_max'] > 0 &&
                ($CurrentPlanet['energy_used'] + $CurrentPlanet['energy_max']) < 0) {
            $post_porcent = floor(($CurrentPlanet['energy_max']) / $CurrentPlanet['energy_used'] * 100);
        } else {
            $post_porcent = 100;
        }
        if ($post_porcent > 100) {
            $post_porcent = 100;
        }

        // -------------------------------------------------------------------------------------------------------
        // Mise a jour de l'espace de stockage
        $CurrentPlanet['metal_max'] = (floor(BASE_STORAGE_SIZE * pow(1.5, $CurrentPlanet[$resource[22]]))) * (1 + ($CurrentUser['rpg_stockeur'] * 0.5));
        $CurrentPlanet['crystal_max'] = (floor(BASE_STORAGE_SIZE * pow(1.5, $CurrentPlanet[$resource[23]]))) * (1 + ($CurrentUser['rpg_stockeur'] * 0.5));
        $CurrentPlanet['deuterium_max'] = (floor(BASE_STORAGE_SIZE * pow(1.5, $CurrentPlanet[$resource[24]]))) * (1 + ($CurrentUser['rpg_stockeur'] * 0.5));

        // -------------------------------------------------------------------------------------------------------
        $parse['resource_row'] = "";
        $CurrentPlanet['metal_perhour'] = 0;
        $CurrentPlanet['crystal_perhour'] = 0;
        $CurrentPlanet['deuterium_perhour'] = 0;
        $CurrentPlanet['energy_max'] = 0;
        $CurrentPlanet['energy_used'] = 0;
        $BuildTemp = $CurrentPlanet['temp_max'];
        foreach ($reslist['prod'] as $ProdID) {
            if ($CurrentPlanet[$resource[$ProdID]] > 0 && isset($ProdGrid[$ProdID])) {
                $BuildLevelFactor = $CurrentPlanet[$resource[$ProdID] . "_porcent"];
                $BuildLevel = $CurrentPlanet[$resource[$ProdID]];
                $metal = floor(eval($ProdGrid[$ProdID]['formule']['metal']) * ( $game_config['resource_multiplier'] ) * ( 1 + ( $CurrentUser['rpg_geologue'] * 0.05 ) ));
                $crystal = floor(eval($ProdGrid[$ProdID]['formule']['crystal']) * ( $game_config['resource_multiplier'] ) * ( 1 + ( $CurrentUser['rpg_geologue'] * 0.05 ) ));
                $deuterium = floor(eval($ProdGrid[$ProdID]['formule']['deuterium']) * ( $game_config['resource_multiplier'] ) * ( 1 + ( $CurrentUser['rpg_geologue'] * 0.05 ) ));
                $energy = floor(eval($ProdGrid[$ProdID]['formule']['energy']) * ( $game_config['resource_multiplier'] ) * ( 1 + ( $CurrentUser['rpg_ingenieur'] * 0.05 ) ));
                if ($energy > 0) {
                    $CurrentPlanet['energy_max'] += $energy;
                } else {
                    $CurrentPlanet['energy_used'] += $energy;
                }
                $CurrentPlanet['metal_perhour'] += $metal;
                $CurrentPlanet['crystal_perhour'] += $crystal;
                $CurrentPlanet['deuterium_perhour'] += $deuterium;

                $metal = $metal * 0.01 * $post_porcent;
                $crystal = $crystal * 0.01 * $post_porcent;
                $deuterium = $deuterium * 0.01 * $post_porcent;
                $energy = $energy * 0.01 * $post_porcent;
                $Field = $resource[$ProdID] . "_porcent";
                $CurrRow = array();
                $CurrRow['name'] = $resource[$ProdID];
                $CurrRow['porcent'] = $CurrentPlanet[$Field];
                for ($Option = 10; $Option >= 0; $Option--) {
                    $OptValue = $Option * 10;
                    if ($Option == $CurrRow['porcent']) {
                        $OptSelected = " selected=selected";
                    } else {
                        $OptSelected = "";
                    }
                    @$CurrRow['option'] .= "<option class=\"undermark\" value=\"" . $OptValue . "\" " . $OptSelected . ">" . $OptValue . "%</option>";
                }
                $CurrRow['metal_type'] = pretty_number($metal);
                $CurrRow['crystal_type'] = pretty_number($crystal);
                $CurrRow['deuterium_type'] = pretty_number($deuterium);
                $CurrRow['energy_type'] = pretty_number($energy);

                $this->tplObj->assign(array(
                    'type' => $lang['tech'][$ProdID],
                    'level' => ($ProdID > 200) ? $lang['quantity'] : $lang['level'],
                    'level_type' => $CurrentPlanet[$resource[$ProdID]],
                    'metal_type' => colorNumber($CurrRow['metal_type']),
                    'crystal_type' => colorNumber($CurrRow['crystal_type']),
                    'deuterium_type' => colorNumber($CurrRow['deuterium_type']),
                    'energy_type' => colorNumber($CurrRow['energy_type']),
                    'name'=>$CurrRow['name'],
                    'option'=>$CurrRow['option'],
                    'CurrRow'=>$CurrRow,
                ));
                $parse['resource_row'] .= $this->tplObj->fetch('resources_row.tpl');
            }
        }

        if ($CurrentPlanet['energy_max'] == 0 &&
                $CurrentPlanet['energy_used'] > 0) {
            $parse['production_level'] = 0;
        } elseif ($CurrentPlanet['energy_max'] > 0 &&
                abs($CurrentPlanet['energy_used']) > $CurrentPlanet['energy_max']) {
            $parse['production_level'] = floor(($CurrentPlanet['energy_max']) / $CurrentPlanet['energy_used'] * 100);
        } elseif ($CurrentPlanet['energy_max'] == 0 &&
                abs($CurrentPlanet['energy_used']) > $CurrentPlanet['energy_max']) {
            $parse['production_level'] = 0;
        } else {
            $parse['production_level'] = 100;
        }
        if ($parse['production_level'] > 100) {
            $parse['production_level'] = 100;
        }

        $parse['metal_basic_income'] = $game_config['metal_basic_income'] * $game_config['resource_multiplier'];
        $parse['crystal_basic_income'] = $game_config['crystal_basic_income'] * $game_config['resource_multiplier'];
        $parse['deuterium_basic_income'] = $game_config['deuterium_basic_income'] * $game_config['resource_multiplier'];
        $parse['energy_basic_income'] = $game_config['energy_basic_income'] * $game_config['resource_multiplier'];

        if ($CurrentPlanet['metal_max'] < $CurrentPlanet['metal']) {
            $parse['metal_max'] = "<font color=\"#ff0000\">";
        } else {
            $parse['metal_max'] = "<font color=\"#00ff00\">";
        }
        $parse['metal_max'] .= pretty_number($CurrentPlanet['metal_max'] / 1000) . " " . $lang['k'] . "</font>";

        if ($CurrentPlanet['crystal_max'] < $CurrentPlanet['crystal']) {
            $parse['crystal_max'] = "<font color=\"#ff0000\">";
        } else {
            $parse['crystal_max'] = "<font color=\"#00ff00\">";
        }
        $parse['crystal_max'] .= pretty_number($CurrentPlanet['crystal_max'] / 1000) . " " . $lang['k'] . "</font>";

        if ($CurrentPlanet['deuterium_max'] < $CurrentPlanet['deuterium']) {
            $parse['deuterium_max'] = "<font color=\"#ff0000\">";
        } else {
            $parse['deuterium_max'] = "<font color=\"#00ff00\">";
        }
        $parse['deuterium_max'] .= pretty_number($CurrentPlanet['deuterium_max'] / 1000) . " " . $lang['k'] . "</font>";

        $parse['metal_total'] = colorNumber(pretty_number(floor(( $CurrentPlanet['metal_perhour'] * 0.01 * $parse['production_level'] ) + $parse['metal_basic_income'])));
        $parse['crystal_total'] = colorNumber(pretty_number(floor(( $CurrentPlanet['crystal_perhour'] * 0.01 * $parse['production_level'] ) + $parse['crystal_basic_income'])));
        $parse['deuterium_total'] = colorNumber(pretty_number(floor(( $CurrentPlanet['deuterium_perhour'] * 0.01 * $parse['production_level'] ) + $parse['deuterium_basic_income'])));
        $parse['energy_total'] = colorNumber(pretty_number(floor(( $CurrentPlanet['energy_max'] + $parse['energy_basic_income'] ) + $CurrentPlanet['energy_used'])));

        $parse['daily_metal'] = floor($CurrentPlanet['metal_perhour'] * 24 * 0.01 * $parse['production_level'] + $parse['metal_basic_income'] * 24);
        $parse['weekly_metal'] = floor($CurrentPlanet['metal_perhour'] * 24 * 7 * 0.01 * $parse['production_level'] + $parse['metal_basic_income'] * 24 * 7);
        $parse['monthly_metal'] = floor($CurrentPlanet['metal_perhour'] * 24 * 30 * 0.01 * $parse['production_level'] + $parse['metal_basic_income'] * 24 * 30);

        $parse['daily_crystal'] = floor($CurrentPlanet['crystal_perhour'] * 24 * 0.01 * $parse['production_level'] + $parse['crystal_basic_income'] * 24);
        $parse['weekly_crystal'] = floor($CurrentPlanet['crystal_perhour'] * 24 * 7 * 0.01 * $parse['production_level'] + $parse['crystal_basic_income'] * 24 * 7);
        $parse['monthly_crystal'] = floor($CurrentPlanet['crystal_perhour'] * 24 * 30 * 0.01 * $parse['production_level'] + $parse['crystal_basic_income'] * 24 * 30);

        $parse['daily_deuterium'] = floor($CurrentPlanet['deuterium_perhour'] * 24 * 0.01 * $parse['production_level'] + $parse['deuterium_basic_income'] * 24);
        $parse['weekly_deuterium'] = floor($CurrentPlanet['deuterium_perhour'] * 24 * 7 * 0.01 * $parse['production_level'] + $parse['deuterium_basic_income'] * 24 * 7);
        $parse['monthly_deuterium'] = floor($CurrentPlanet['deuterium_perhour'] * 24 * 30 * 0.01 * $parse['production_level'] + $parse['deuterium_basic_income'] * 24 * 30);


        $parse['metal_storage_bar'] = floor(($CurrentPlanet['metal'] / $CurrentPlanet['metal_max'] * 100) * 2.5);
        $parse['crystal_storage_bar'] = floor(($CurrentPlanet['crystal'] / $CurrentPlanet['crystal_max'] * 100) * 2.5);
        $parse['deuterium_storage_bar'] = floor(($CurrentPlanet['deuterium'] / $CurrentPlanet['deuterium_max'] * 100) * 2.5);

        if ($parse['metal_storage_bar'] > (100 * 2.5)) {
            $parse['metal_storage_bar'] = 250;
            $parse['metal_storage_barcolor'] = '#C00000';
        } elseif ($parse['metal_storage_bar'] > (80 * 2.5)) {
            $parse['metal_storage_barcolor'] = '#C0C000';
        } else {
            $parse['metal_storage_barcolor'] = '#00C000';
        }

        if ($parse['crystal_storage_bar'] > (100 * 2.5)) {
            $parse['crystal_storage_bar'] = 250;
            $parse['crystal_storage_barcolor'] = '#C00000';
        } elseif ($parse['crystal_storage_bar'] > (80 * 2.5)) {
            $parse['crystal_storage_barcolor'] = '#C0C000';
        } else {
            $parse['crystal_storage_barcolor'] = '#00C000';
        }

        if ($parse['deuterium_storage_bar'] > (100 * 2.5)) {
            $parse['deuterium_storage_bar'] = 250;
            $parse['deuterium_storage_barcolor'] = '#C00000';
        } elseif ($parse['deuterium_storage_bar'] > (80 * 2.5)) {
            $parse['deuterium_storage_barcolor'] = '#C0C000';
        } else {
            $parse['deuterium_storage_barcolor'] = '#00C000';
        }

        $parse['production_level_bar'] = $parse['production_level'] * 2.5;
        $parse['production_level'] = "{$parse['production_level']}%";
        $parse['production_level_barcolor'] = '#00ff00';

        $QryUpdatePlanet = "UPDATE {{table}} SET ";
        $QryUpdatePlanet .= "`id` = '" . $CurrentPlanet['id'] . "' ";
        $QryUpdatePlanet .= $SubQry;
        $QryUpdatePlanet .= "WHERE ";
        $QryUpdatePlanet .= "`id` = '" . $CurrentPlanet['id'] . "';";
        doquery($QryUpdatePlanet, 'planets');

        $this->tplObj->assign(array(
            'title' => $lang['Resources'],
            'lang' => $lang,
            'metal_basic_income' => $parse['metal_basic_income'],
            'crystal_basic_income' => $parse['crystal_basic_income'],
            'deuterium_basic_income' => $parse['deuterium_basic_income'],
            'energy_basic_income' => $parse['energy_basic_income'],
            'metal_max' => $parse['metal_max'],
            'crystal_max' => $parse['crystal_max'],
            'deuterium_max' => $parse['deuterium_max'],
            'metal_total' => $parse['metal_total'],
            'crystal_total' => $parse['crystal_total'],
            'deuterium_total' => $parse['deuterium_total'],
            'energy_total' => $parse['energy_total'],
            'daily_metal' => pretty_number($parse['daily_metal']),
            'weekly_metal' => pretty_number($parse['weekly_metal']),
            'monthly_metal' => pretty_number($parse['monthly_metal']),
            'daily_crystal' => pretty_number($parse['daily_crystal']),
            'weekly_crystal' => pretty_number($parse['weekly_crystal']),
            'monthly_crystal' => pretty_number($parse['monthly_crystal']),
            'daily_deuterium' => pretty_number($parse['daily_deuterium']),
            'weekly_deuterium' => pretty_number($parse['weekly_deuterium']),
            'monthly_deuterium' => pretty_number($parse['monthly_deuterium']),
            'metal_storage' => floor($CurrentPlanet['metal'] / $CurrentPlanet['metal_max'] * 100) . $lang['o/o'],
            'crystal_storage' => floor($CurrentPlanet['crystal'] / $CurrentPlanet['crystal_max'] * 100) . $lang['o/o'],
            'deuterium_storage' => floor($CurrentPlanet['deuterium'] / $CurrentPlanet['deuterium_max'] * 100) . $lang['o/o'],
            'metal_storage_barcolor' => $parse['metal_storage_barcolor'],
            'crystal_storage_barcolor' => $parse['crystal_storage_barcolor'],
            'deuterium_storage_barcolor' => $parse['deuterium_storage_barcolor'],
            'metal_storage_bar' => $parse['metal_storage_bar'],
            'crystal_storage_bar' => $parse['crystal_storage_bar'],
            'deuterium_storage_bar' => $parse['deuterium_storage_bar'],
            'resource_row' => $parse['resource_row'],
        ));
        $this->render('resources.tpl');
    }

}
