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
 * @ShowInfosPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/mai/2015 13:52:42
 */

/**
 * Description of ShowInfosPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowInfosPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'infos';
    }

    function show() {
        global $lang, $resource, $pricelist, $CombatCaps, $user, $planetrow;

        // ----------------------------------------------------------------------------------------------------------
        // Construit la page par rapport a l'information demandée ...
        // Permet de faire la differance entre les divers types et les pages speciales
        //
        includeLang('infos');
        $GateTPL = '';
        $DestroyTPL = '';
        $TableHeadTPL = '';

        $BuildID = $_GET['gid'];
        if ($BuildID >= 1 && $BuildID <= 3) {
            // Cas des mines
            $DestroyTPL = '1';
            $TableHeadTPL = "<tr><td class=\"c\">{nfo_level}</td><td class=\"c\">{nfo_prod_p_hour}</td><td class=\"c\">{nfo_difference}</td><td class=\"c\">{nfo_used_energy}</td><td class=\"c\">{nfo_difference}</td></tr>";
            $TableTPL = "<tr><th>{build_lvl}</th><th>{build_prod} {build_gain}</th><th>{build_prod_diff}</th><th>{build_need}</th><th>{build_need_diff}</th></tr>";
            $template = 'info_buildings_table.tpl';
        } elseif ($BuildID == 4) {
            // Centrale Solaire
            $DestroyTPL = 'info_buildings_destroy.tpl';
            $TableHeadTPL = "<tr><td class=\"c\">{nfo_level}</td><td class=\"c\">{nfo_prod_energy}</td><td class=\"c\">{nfo_difference}</td></tr>";
            $TableTPL = "<tr><th>{build_lvl}</th><th>{build_prod} {build_gain}</th><th>{build_prod_diff}</th></tr>";
            $template = 'info_buildings_table.tpl';
        } elseif ($BuildID == 12) {
            // Centrale Fusion
            $DestroyTPL = '1';
            $TableHeadTPL = "<tr><td class=\"c\">{nfo_level}</td><td class=\"c\">{nfo_prod_energy}</td><td class=\"c\">{nfo_difference}</td><td class=\"c\">{nfo_used_deuter}</td><td class=\"c\">{nfo_difference}</td></tr>";
            $TableTPL = "<tr><th>{build_lvl}</th><th>{build_prod} {build_gain}</th><th>{build_prod_diff}</th><th>{build_need}</th><th>{build_need_diff}</th></tr>";
            $template = 'info_buildings_table.tpl';
        } elseif ($BuildID >= 14 && $BuildID <= 32) {
            // Batiments Generaux
            $DestroyTPL = '1';
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID == 33) {
            // Batiments Terraformer
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID == 34) {
            // Dépot d'alliance
            $DestroyTPL = '1';
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID == 44) {
            // Silo de missiles
            $DestroyTPL = '1';
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID == 41) {
            // Batiments lunaires
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID == 42) {
            // Phalange
            $TableHeadTPL = "<tr><td class=\"c\">{nfo_level}</td><td class=\"c\">{nfo_range}</td></tr>";
            $TableTPL = "<tr><th>{build_lvl}</th><th>{build_range}</th></tr>";
            $DestroyTPL = '1';
            $template = 'info_buildings_table.tpl';
        } elseif ($BuildID == 43) {
            // Porte de Saut
            $GateTPL = '1';
            $DestroyTPL = '1';
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID >= 106 && $BuildID <= 199) {
            // Laboratoire
            $template = 'info_buildings_general.tpl';
        } elseif ($BuildID >= 202 && $BuildID <= 216) {
            // Flotte
            $rf_info_to = ShowRapidFireTo($BuildID);   // Rapid Fire vers
            $rf_info_fr = ShowRapidFireFrom($BuildID); // Rapid Fire de
            $hull_pt = pretty_number($pricelist[$BuildID]['metal'] + $pricelist[$BuildID]['crystal']); // Points de Structure
            $shield_pt = pretty_number($CombatCaps[$BuildID]['shield']);  // Points de Bouclier
            $attack_pt = pretty_number($CombatCaps[$BuildID]['attack']);  // Points d'Attaque
            $capacity_pt = pretty_number($pricelist[$BuildID]['capacity']); // Capacitée de fret
            $base_speed = pretty_number($pricelist[$BuildID]['speed']);    // Vitesse de base
            $base_conso = pretty_number($pricelist[$BuildID]['consumption']);  // Consommation de base

            $this->tplObj->assign(array(
                'rf_info_to' => $rf_info_to,
                'rf_info_fr' => $rf_info_fr,
                'hull_pt' => $hull_pt,
                'shield_pt' => $shield_pt,
                'attack_pt' => $attack_pt,
                'capacity_pt' => $capacity_pt,
                'base_speed' => $base_speed,
                'base_conso' => $base_conso,
                'pricelist' => $pricelist,
            ));

            $template = 'info_buildings_fleet.tpl';
        } elseif ($BuildID >= 401 && $BuildID <= 408) {
            // Defenses
            $element_typ = $lang['tech'][400];
            $rf_info_to = ShowRapidFireTo($BuildID);   // Rapid Fire vers
            $rf_info_fr = ShowRapidFireFrom($BuildID); // Rapid Fire de
            $hull_pt = pretty_number($pricelist[$BuildID]['metal'] + $pricelist[$BuildID]['crystal']); // Points de Structure
            $shield_pt = pretty_number($CombatCaps[$BuildID]['shield']);  // Points de Bouclier
            $attack_pt = pretty_number($CombatCaps[$BuildID]['attack']);  // Points d'Attaque

            $this->tplObj->assign(array(
                'element_typ' => $element_typ,
                'rf_info_to' => $rf_info_to,
                'rf_info_fr' => $rf_info_fr,
                'hull_pt' => $hull_pt,
                'shield_pt' => $shield_pt,
                'attack_pt' => $attack_pt,
                'pricelist' => $pricelist,
            ));

            $template = 'info_buildings_defense.tpl';
        } elseif ($BuildID >= 502 && $BuildID <= 503) {
            // Misilles
            $element_typ = $lang['tech'][400];
            $hull_pt = pretty_number($pricelist[$BuildID]['metal'] + $pricelist[$BuildID]['crystal']); // Points de Structure
            $shield_pt = pretty_number($CombatCaps[$BuildID]['shield']);  // Points de Bouclier
            $attack_pt = pretty_number($CombatCaps[$BuildID]['attack']);  // Points d'Attaque

            $this->tplObj->assign(array(
                'element_typ' => $element_typ,
                'rf_info_to' => '',
                'rf_info_fr' => '',
                'hull_pt' => $hull_pt,
                'shield_pt' => $shield_pt,
                'attack_pt' => $attack_pt,
                'pricelist' => $pricelist,
            ));

            $template = 'info_buildings_defense.tpl';
        } elseif ($BuildID >= 601 && $BuildID <= 615) {
            // Officiers            
            $template = 'info_officiers_general.tpl';
        }

        if ($GateTPL != '') {
            if ($planetrow[$resource[$BuildID]] > 0) {
                $RestString = GetNextJumpWaitTime($planetrow);
                $gate_start_link = BuildPlanetAdressLink($planetrow);
                if ($RestString['value'] != 0) {
                    $gate_time_script = InsertJavaScriptChronoApplet("Gate", "1", $RestString['value'], true);
                    $gate_wait_time = "<div id=\"bxx" . "Gate" . "1" . "\"></div>";
                    $gate_script_go = InsertJavaScriptChronoApplet("Gate", "1", $RestString['value'], false);
                } else {
                    $gate_time_script = "";
                    $gate_wait_time = "";
                    $gate_script_go = "";
                }
                $this->tplObj->assign(array(
                    'gate_start_link' => $gate_start_link,
                    'gate_time_script' => $gate_time_script,
                    'gate_wait_time' => $gate_wait_time,
                    'gate_script_go' => $gate_script_go,
                    'gate_dest_moons' => BuildJumpableMoonCombo($user, $planetrow),
                    'gate_fleet_rows' => BuildFleetListRows($planetrow),
                ));
            }
        }

        // ---- Tableau d'evolution
        if ($TableHeadTPL != '') {
            $table_head = parsetemplate($TableHeadTPL, $lang);
            $table_data = ShowProductionTable($user, $planetrow, $BuildID, $TableTPL);
            $this->tplObj->assign(array(
                'table_head' => $table_head,
                'table_data' => $table_data,
            ));
        }

        $this->tplObj->assign(array(
            'title' => $lang['nfo_page_title'],
            'BuildID' => $BuildID,
            'TableHeadTPL' => $TableHeadTPL,
            'DestroyTPL' => $DestroyTPL,
            'GateTPL' => $GateTPL,
            'CurrentPlanet' => $planetrow,
            'resource' => $resource,
            'NeededRessources' => GetBuildingPrice($user, $planetrow, $BuildID, true, true),
            'DestroyTime' => GetBuildingTime($user, $planetrow, $BuildID) / 2,
            'name' => $lang['info'][$BuildID]['name'],
            'description' => $lang['info'][$BuildID]['description'],
            'nfo_destroy' => $lang['nfo_destroy'],
            'nfo_level' => $lang['nfo_level'],
            'nfo_needed' => $lang['nfo_needed'],
            'Metal' => $lang['Metal'],
            'Crystal' => $lang['Crystal'],
            'Deuterium' => $lang['Deuterium'],
            'nfo_dest_durati'=> $lang['nfo_dest_durati'],
            'nfo_title_head' => $lang['nfo_title_head'],
            'tech' => $lang['tech'],
            'nfo_name' => $lang['nfo_name'],
            'nfo_struct_pt' => $lang['nfo_struct_pt'],
            'nfo_shielf_pt' => $lang['nfo_shielf_pt'],
            'nfo_attack_pt' => $lang['nfo_attack_pt'],
            'nfo_capacity'=> $lang['nfo_capacity'],
            'nfo_units'=>$lang['nfo_units'],
            'nfo_base_speed'=>$lang['nfo_base_speed'],
            'nfo_consumption'=>$lang['nfo_consumption'],
        ));

        $this->render($template);
    }

}

// ----------------------------------------------------------------------------------------------------------
// Creation de la Liste de flotte disponible sur la lune
//
function BuildFleetListRows($CurrentPlanet) {
    global $resource, $lang;

    $RowsTPL = gettemplate('gate_fleet_rows');
    $CurrIdx = 1;
    $Result = "";
    for ($Ship = 300; $Ship > 200; $Ship--) {
        if ($resource[$Ship] != "") {
            if ($CurrentPlanet[$resource[$Ship]] > 0) {
                $bloc['idx'] = $CurrIdx;
                $bloc['fleet_id'] = $Ship;
                $bloc['fleet_name'] = $lang['tech'][$Ship];
                $bloc['fleet_max'] = pretty_number($CurrentPlanet[$resource[$Ship]]);
                $bloc['gate_ship_dispo'] = $lang['gate_ship_dispo'];
                $Result .= parsetemplate($RowsTPL, $bloc);
                $CurrIdx++;
            }
        }
    }
    return $Result;
}

// ----------------------------------------------------------------------------------------------------------
// Creation de la combo de selection de Lune d'arrivé
//
function BuildJumpableMoonCombo($CurrentUser, $CurrentPlanet) {
    global $resource;
    $QrySelectMoons = "SELECT * FROM {{table}} WHERE `planet_type` = '3' AND `id_owner` = '" . $CurrentUser['id'] . "';";
    $MoonList = doquery($QrySelectMoons, 'planets');
    $Combo = "";
    while ($CurMoon = mysql_fetch_assoc($MoonList)) {
        if ($CurMoon['id'] != $CurrentPlanet['id']) {
            $RestString = GetNextJumpWaitTime($CurMoon);
            if ($CurMoon[$resource[43]] >= 1) {
                $Combo .= "<option value=\"" . $CurMoon['id'] . "\">[" . $CurMoon['galaxy'] . ":" . $CurMoon['system'] . ":" . $CurMoon['planet'] . "] " . $CurMoon['name'] . $RestString['string'] . "</option>\n";
            }
        }
    }
    return $Combo;
}

// ----------------------------------------------------------------------------------------------------------
// Creation du tableau de production de ressources
// Tient compte du parametrage de la planete (si la production n'est pas affectée a 100% par exemple
// Tient compte aussi du multiplicateur de ressources
//
function ShowProductionTable($CurrentUser, $CurrentPlanet, $BuildID, $Template) {
    global $ProdGrid, $resource, $game_config;

    @$BuildLevelFactor = $CurrentPlanet[$resource[$BuildID] . "_porcent"];
    $BuildTemp = $CurrentPlanet['temp_max'];
    $CurrentBuildtLvl = $CurrentPlanet[$resource[$BuildID]];

    $BuildLevel = ($CurrentBuildtLvl > 0) ? $CurrentBuildtLvl : 1;
    @$Prod[1] = (floor(eval($ProdGrid[$BuildID]['formule']['metal']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_geologue'] * 0.05)));
    @$Prod[2] = (floor(eval($ProdGrid[$BuildID]['formule']['crystal']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_geologue'] * 0.05)));
    @$Prod[3] = (floor(eval($ProdGrid[$BuildID]['formule']['deuterium']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_geologue'] * 0.05)));
    @$Prod[4] = (floor(eval($ProdGrid[$BuildID]['formule']['energy']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_ingenieur'] * 0.05)));
    $BuildLevel = "";

    @$ActualProd = floor($Prod[$BuildID]);
    if ($BuildID != 12) {
        $ActualNeed = floor($Prod[4]);
    } else {
        $ActualNeed = floor($Prod[3]);
    }

    $BuildStartLvl = $CurrentBuildtLvl - 2;
    if ($BuildStartLvl < 1) {
        $BuildStartLvl = 1;
    }
    $Table = "";
    $ProdFirst = 0;
    for ($BuildLevel = $BuildStartLvl; $BuildLevel < $BuildStartLvl + 10; $BuildLevel++) {
        if ($BuildID != 42) {
            $Prod[1] = (floor(eval($ProdGrid[$BuildID]['formule']['metal']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_geologue'] * 0.05)));
            $Prod[2] = (floor(eval($ProdGrid[$BuildID]['formule']['crystal']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_geologue'] * 0.05)));
            $Prod[3] = (floor(eval($ProdGrid[$BuildID]['formule']['deuterium']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_geologue'] * 0.05)));
            $Prod[4] = (floor(eval($ProdGrid[$BuildID]['formule']['energy']) * $game_config['resource_multiplier']) * (1 + ($CurrentUser['rpg_ingenieur'] * 0.05)));

            $bloc['build_lvl'] = ($CurrentBuildtLvl == $BuildLevel) ? "<font color=\"#ff0000\">" . $BuildLevel . "</font>" : $BuildLevel;
            if ($ProdFirst > 0) {
                if ($BuildID != 12) {
                    $bloc['build_gain'] = "<font color=\"lime\">(" . pretty_number(floor($Prod[$BuildID] - $ProdFirst)) . ")</font>";
                } else {
                    $bloc['build_gain'] = "<font color=\"lime\">(" . pretty_number(floor($Prod[4] - $ProdFirst)) . ")</font>";
                }
            } else {
                $bloc['build_gain'] = "";
            }
            if ($BuildID != 12) {
                $bloc['build_prod'] = pretty_number(floor($Prod[$BuildID]));
                $bloc['build_prod_diff'] = colorNumber(pretty_number(floor($Prod[$BuildID] - $ActualProd)));
                $bloc['build_need'] = colorNumber(pretty_number(floor($Prod[4])));
                $bloc['build_need_diff'] = colorNumber(pretty_number(floor($Prod[4] - $ActualNeed)));
            } else {
                $bloc['build_prod'] = pretty_number(floor($Prod[4]));
                $bloc['build_prod_diff'] = colorNumber(pretty_number(floor($Prod[4] - $ActualProd)));
                $bloc['build_need'] = colorNumber(pretty_number(floor($Prod[3])));
                $bloc['build_need_diff'] = colorNumber(pretty_number(floor($Prod[3] - $ActualNeed)));
            }
            if ($ProdFirst == 0) {
                if ($BuildID != 12) {
                    $ProdFirst = floor($Prod[$BuildID]);
                } else {
                    $ProdFirst = floor($Prod[4]);
                }
            }
        } else {
            // Cas particulier de la phalange
            $bloc['build_lvl'] = ($CurrentBuildtLvl == $BuildLevel) ? "<font color=\"#ff0000\">" . $BuildLevel . "</font>" : $BuildLevel;
            $bloc['build_range'] = ($BuildLevel * $BuildLevel) - 1;
        }
        $Table .= parsetemplate($Template, $bloc);
    }

    return $Table;
}

// ----------------------------------------------------------------------------------------------------------
// Creation de l'information des RapidFire contre ...
//
function ShowRapidFireTo($BuildID) {
    global $lang, $CombatCaps;
    $ResultString = "";
    for ($Type = 200; $Type < 500; $Type++) {
        if (@$CombatCaps[$BuildID]['sd'][$Type] > 1) {
            $ResultString .= $lang['nfo_rf_again'] . " " . $lang['tech'][$Type] . " <font color=\"#00ff00\">" . $CombatCaps[$BuildID]['sd'][$Type] . "</font><br>";
        }
    }
    return $ResultString;
}

// ----------------------------------------------------------------------------------------------------------
// Creation de l'information des RapidFire de ...
//
function ShowRapidFireFrom($BuildID) {
    global $lang, $CombatCaps;

    $ResultString = "";
    for ($Type = 200; $Type < 500; $Type++) {
        if (@$CombatCaps[$Type]['sd'][$BuildID] > 1) {
            $ResultString .= $lang['nfo_rf_from'] . " " . $lang['tech'][$Type] . " <font color=\"#ff0000\">" . $CombatCaps[$Type]['sd'][$BuildID] . "</font><br>";
        }
    }
    return $ResultString;
}

