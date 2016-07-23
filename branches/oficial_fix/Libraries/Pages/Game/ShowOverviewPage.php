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
 * @ShowOverviewPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 10:55:00
 */

/**
 * Description of ShowOverviewPage
 *
 * @author Rui Silva
 */
class ShowOverviewPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'overview';
    }

    function show() {
        global $user, $lang, $game_config, $planetrow, $dpath, $galaxyrow;

        $lunarow = doquery("SELECT * FROM {{table}} WHERE `id_owner` = '" . $planetrow['id_owner'] . "' AND `galaxy` = '" . $planetrow['galaxy'] . "' AND `system` = '" . $planetrow['system'] . "' AND `lunapos` = '" . $planetrow['planet'] . "';", 'lunas', true);

        $_POST['deleteid'] = intval(@$_POST['deleteid']);
        $pl = mysqli_real_escape_string(Database::$dbHandle, isset($_GET['pl']) ? $_GET['pl'] : 0);

        includeLang('overview');

        if ($user['id'] != '') {
            // --- Gestion des messages ----------------------------------------------------------------------
            $this->tplObj->assign('user_new_message', $user['new_message']);
            // -----------------------------------------------------------------------------------------------
            // --- Gestion Officiers -------------------------------------------------------------------------
            // Passage au niveau suivant, ajout du point de compétence et affichage du passage au nouveau level
            $XpMinierUp = $user['lvl_minier'] * 5000;
            $XpRaidUp = $user['lvl_raid'] * 10;
            $XpMinier = $user['xpminier'];
            $XPRaid = $user['xpraid'];
            $LvlUpMinier = $user['lvl_minier'] + 1;
            $LvlUpRaid = $user['lvl_raid'] + 1;

            $this->tplObj->assign(array(
                'XpMinierUp' => $user['lvl_minier'] * 5000,
                'XpRaidUp' => $user['lvl_raid'] * 10,
                'XpMinier' => $user['xpminier'],
                'XPRaid' => $user['xpraid'],
                'LvlUpMinier' => $user['lvl_minier'] * 5000,
                'LvlUpRaid' => $user['xpraid'],
            ));

            if (($LvlUpMinier + $LvlUpRaid) <= 100) {
                if ($XpMinier >= $XpMinierUp) {
                    doquery("UPDATE {{table}} SET `lvl_minier` = '" . $LvlUpMinier . "', `rpg_points` = `rpg_points` + 1 WHERE `id` = '" . $user['id'] . "';", 'users');
                }
                if ($XPRaid >= $XpRaidUp) {
                    doquery("UPDATE {{table}} SET `lvl_raid` = '" . $LvlUpRaid . "', `rpg_points` = `rpg_points` + 1 WHERE `id` = '" . $user['id'] . "';", 'users');
                }
            }
            // -----------------------------------------------------------------------------------------------
            // --- Gestion de la liste des planetes ----------------------------------------------------------
            // Planetes ...
            $Order = ($user['planet_sort_order'] == 1) ? "DESC" : "ASC";
            $Sort = $user['planet_sort'];

            $QryPlanets = "SELECT * FROM {{table}} WHERE `id_owner` = '" . $user['id'] . "' ORDER BY ";
            if ($Sort == 0) {
                $QryPlanets .= "`id` " . $Order;
            } elseif ($Sort == 1) {
                $QryPlanets .= "`galaxy`, `system`, `planet`, `planet_type` " . $Order;
            } elseif ($Sort == 2) {
                $QryPlanets .= "`name` " . $Order;
            }
            $planets_query = doquery($QryPlanets, 'planets');
            $Colone = 1;
            $AllPlanets = "<tr>";
            while ($UserPlanet = mysqli_fetch_array($planets_query)) {
                PlanetResourceUpdate($user, $UserPlanet, time());
                if ($UserPlanet["id"] != $user["current_planet"] && $UserPlanet['planet_type'] != 3) {
                    $AllPlanets .= "<th>" . $UserPlanet['name'] . "<br>";
                    $AllPlanets .= "<a href=\"game.php?page=overview&cp=" . $UserPlanet['id'] . "&re=0\" title=\"" . $UserPlanet['name'] . "\"><img src=\"" . $dpath . "planeten/small/s_" . $UserPlanet['image'] . ".jpg\" height=\"50\" width=\"50\"></a><br>";
                    $AllPlanets .= "<center>";

                    if ($UserPlanet['b_building'] != 0) {
                        UpdatePlanetBatimentQueueList($UserPlanet, $user);
                        if ($UserPlanet['b_building'] != 0) {
                            $BuildQueue = $UserPlanet['b_building_id'];
                            $QueueArray = explode(";", $BuildQueue);
                            $CurrentBuild = explode(",", $QueueArray[0]);
                            $BuildElement = $CurrentBuild[0];
                            $BuildLevel = $CurrentBuild[1];
                            $BuildRestTime = pretty_time($CurrentBuild[3] - time());
                            $AllPlanets .= '' . $lang['tech'][$BuildElement] . ' (' . $BuildLevel . ')';
                            $AllPlanets .= "<br><font color=\"#7f7f7f\">(" . $BuildRestTime . ")</font>";
                        } else {
                            CheckPlanetUsedFields($UserPlanet);
                            $AllPlanets .= $lang['Free'];
                        }
                    } else {
                        $AllPlanets .= $lang['Free'];
                    }

                    $AllPlanets .= "</center></th>";
                    if ($Colone <= 1) {
                        $Colone++;
                    } else {
                        $AllPlanets .= "</tr><tr>";
                        $Colone = 1;
                    }
                }
            }
            // -----------------------------------------------------------------------------------------------
            // --- Gestion des attaques missiles -------------------------------------------------------------
            $iraks_query = doquery("SELECT * FROM {{table}} WHERE owner = '" . $user['id'] . "'", 'iraks');
            $Record = 4000;
            while ($irak = mysqli_fetch_array($iraks_query)) {
                $Record++;
                $fpage[$irak['zeit']] = '';

                if ($irak['zeit'] > time()) {
                    $time = $irak['zeit'] - time();

                    $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, true);

                    $planet_start = doquery("SELECT * FROM {{table}} WHERE
						galaxy = '" . $irak['galaxy'] . "' AND
						system = '" . $irak['system'] . "' AND
						planet = '" . $irak['planet'] . "' AND
						planet_type = '1'", 'planets');

                    $user_planet = doquery("SELECT * FROM {{table}} WHERE
						galaxy = '" . $irak['galaxy_angreifer'] . "' AND
						system = '" . $irak['system_angreifer'] . "' AND
						planet = '" . $irak['planet_angreifer'] . "' AND
						planet_type = '1'", 'planets', true);

                    if (mysqli_num_rows($planet_start) == 1) {
                        $planet = mysqli_fetch_array($planet_start);
                    }

                    $fpage[$irak['zeit']] .= "<tr><th><div id=\"bxxfs$i\" class=\"z\"></div><font color=\"lime\">" . gmdate("H:i:s", $irak['zeit'] + 1 * 60 * 60) . "</font> </th><th colspan=\"3\"><font color=\"#0099FF\">Une attaque de missiles (" . $irak['anzahl'] . ") de " . $user_planet['name'] . " ";
                    $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&type=3&galaxy=' . $irak["galaxy_angreifer"] . '&system=' . $irak["system_angreifer"] . '&planet=' . $irak["planet_angreifer"] . '">[' . $irak["galaxy_angreifer"] . ':' . $irak["system_angreifer"] . ':' . $irak["planet_angreifer"] . ']</a>';
                    $fpage[$irak['zeit']] .= ' arrive sur la plan&egrave;te' . $planet["name"] . ' ';
                    $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&type=3&galaxy=' . $irak["galaxy"] . '&system=' . $irak["system"] . '&planet=' . $irak["planet"] . '">[' . $irak["galaxy"] . ':' . $irak["system"] . ':' . $irak["planet"] . ']</a>';
                    $fpage[$irak['zeit']] .= '</font>';
                    $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, false);
                    $fpage[$irak['zeit']] .= "</th>";
                }
            }
            // --- Gestion de l'affichage d'une lune ---------------------------------------------------------
            if ($lunarow['id'] <> 0) {
                if ($planetrow['planet_type'] == 1) {
                    $lune = doquery("SELECT * FROM {{table}} WHERE `galaxy` = '" . $planetrow['galaxy'] . "' AND `system` = '" . $planetrow['system'] . "' AND `planet` = '" . $planetrow['planet'] . "' AND `planet_type` = '3'", 'planets', true);
                    $parse['moon_img'] = "<a href=\"game.php?page=overview&cp=" . $lune['id'] . "&re=0\" title=\"" . $lune['name'] . "\"><img src=\"" . $dpath . "planeten/" . $lune['image'] . ".jpg\" height=\"50\" width=\"50\"></a>";
                    $parse['moon'] = $lune['name'];
                } else {
                    $parse['moon_img'] = "";
                    $parse['moon'] = "";
                }
            } else {
                $parse['moon_img'] = "";
                $parse['moon'] = "";
            }
            // Moon END
            $this->tplObj->assign(array(
                'planet_name' => $planetrow['name'],
                'planet_diameter' => pretty_number($planetrow['diameter']),
                'planet_field_current' => $planetrow['field_current'],
                'planet_field_max' => CalculateMaxPlanetFields($planetrow),
                'planet_temp_min' => $planetrow['temp_min'],
                'planet_temp_max' => $planetrow['temp_max'],
                'galaxy_galaxy' => $planetrow['galaxy'],
                'galaxy_system' => $planetrow['system'],
                'galaxy_planet' => $planetrow['planet'],
            ));
            $StatRecord = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $user['id'] . "';", 'statpoints', true);

            $this->tplObj->assign(array(
                'user_points' => pretty_number($StatRecord['build_points']),
                'user_fleet' => pretty_number($StatRecord['fleet_points']),
                'player_points_tech' => pretty_number($StatRecord['tech_points']),
                'total_points' => pretty_number($StatRecord['total_points']),
                'user_rank' => $StatRecord['total_rank'],
            ));

            $ile = $StatRecord['total_old_rank'] - $StatRecord['total_rank'];
            if ($ile >= 1) {
                $parse['ile'] = "<font color=lime>+" . $ile . "</font>";
            } elseif ($ile < 0) {
                $parse['ile'] = "<font color=red>-" . $ile . "</font>";
            } elseif ($ile == 0) {
                $parse['ile'] = "<font color=lightblue>" . $ile . "</font>";
            }

            $this->tplObj->assign(array(
                'u_user_rank' => $StatRecord['total_rank'],
                'user_username' => $user['username'],
            ));


            $parse['energy_used'] = $planetrow["energy_max"] - $planetrow["energy_used"];

            $parse['time'] = "<div id=\"dateheure\"></div>";
            $parse['dpath'] = $dpath;
            if (($galaxyrow['metal'] != 0 || $galaxyrow['crystal'] != 0) && $planetrow[$resource[209]] != 0) {
                $parse['get_link'] = " (<a href=\"game.php?page=quickfleet&mode=8&g=" . $galaxyrow['galaxy'] . "&s=" . $galaxyrow['system'] . "&p=" . $galaxyrow['planet'] . "&t=2\">" . $lang['type_mission'][8] . "</a>)";
            } else {
                $parse['get_link'] = '';
            }

            if ($planetrow['b_building'] != 0) {
                UpdatePlanetBatimentQueueList($planetrow, $user);
                if ($planetrow['b_building'] != 0) {
                    $BuildQueue = explode(";", $planetrow['b_building_id']);
                    $CurrBuild = explode(",", $BuildQueue[0]);
                    $RestTime = $planetrow['b_building'] - time();
                    $PlanetID = $planetrow['id'];
                    $Build = InsertBuildListScript("overview");
                    $Build .= $lang['tech'][$CurrBuild[0]] . ' (' . ($CurrBuild[1]) . ')';
                    $Build .= "<br /><div id=\"blc\" class=\"z\">" . pretty_time($RestTime) . "</div>";
                    $Build .= "\n<script language=\"JavaScript\">";
                    $Build .= "\n	pp = \"" . $RestTime . "\";\n"; // temps necessaire (a compter de maintenant et sans ajouter time() )
                    $Build .= "\n	pk = \"" . 1 . "\";\n"; // id index (dans la liste de construction)
                    $Build .= "\n	pm = \"cancel\";\n"; // mot de controle
                    $Build .= "\n	pl = \"" . $PlanetID . "\";\n"; // id planete
                    $Build .= "\n	t();\n";
                    $Build .= "\n</script>\n";

                    $parse['building'] = $Build;
                } else {
                    $parse['building'] = $lang['Free'];
                }
            } else {
                $parse['building'] = $lang['Free'];
            }
            $query = doquery('SELECT username FROM {{table}} ORDER BY register_time DESC', 'users', true);
            $parse['last_user'] = $query['username'];
            $query = doquery("SELECT COUNT(DISTINCT(id)) FROM {{table}} WHERE onlinetime>" . (time() - 900), 'users', true);
            $parse['online_users'] = $query[0];
            // $count = doquery(","users",true);
            $parse['users_amount'] = $game_config['users_amount'];
            // Rajout d'une barre pourcentage
            // Calcul du pourcentage de remplissage
            // Barre de remplissage
            $parse['case_barre'] = floor($planetrow["field_current"] / CalculateMaxPlanetFields($planetrow) * 100) * 4.0;
            // Couleur de la barre de remplissage
            if ($parse['case_barre'] > (100 * 4.0)) {
                $parse['case_barre'] = 400;
                $parse['case_barre_barcolor'] = '#C00000';
            } elseif ($parse['case_barre'] > (80 * 4.0)) {
                $parse['case_barre_barcolor'] = '#C0C000';
            } else {
                $parse['case_barre_barcolor'] = '#00C000';
            }
            // Mode Améliorations

            $LvlMinier = $user['lvl_minier'];
            $LvlRaid = $user['lvl_raid'];

            // Compteur de Membres en ligne
            $OnlineUsers = doquery("SELECT COUNT(*) FROM {{table}} WHERE onlinetime>='" . (time() - 15 * 60) . "'", 'users', 'true');

            $this->tplObj->assign(array(
                'u_user_rank' => $StatRecord['total_rank'],
                'user_username' => $user['username'],
            ));
            $this->tplObj->assign(array(
                'title' => $lang['Overview'],
                'Planet_menu' => $lang['Planet_menu'],
                'Planet' => $lang['Planet'],
                'Have_new_message' => $lang['Have_new_message'],
                'Have_new_messages' => $lang['Have_new_messages'],
                'Have_new_level_mineur' => $lang['Have_new_level_mineur'],
                'Have_new_level_raid' => $lang['Have_new_level_raid'],
                'Server_time' => $lang['Server_time'],
                'MembersOnline' => $lang['MembersOnline'],
                'NumberMembersOnline' => $OnlineUsers[0],
                'NewsFrame' => $game_config['OverviewNewsFrame'],
                'moon_img' => $parse['moon_img'],
                'moon' => $parse['moon'],
                'planet_image' => $planetrow['image'],
                'building' => $parse['building'],
                'anothers_planets' => $AllPlanets,
                'Diameter' => $lang['Diameter'],
                'Developed_fields' => $lang['Developed_fields'],
                'max_eveloped_fields' => $lang['max_eveloped_fields'],
                'fields' => $lang['fields'],
                'case_barre_barcolor' => $parse['case_barre_barcolor'],
                'case_barre' => $parse['case_barre'],
                'case_pourcentage' => floor($planetrow["field_current"] / CalculateMaxPlanetFields($planetrow) * 100) . $lang['o/o'],
                'ov_off_level' => $lang['ov_off_level'],
                'ov_off_mines' => $lang['ov_off_mines'],
                'lvl_minier' => $user['lvl_minier'],
                'ov_off_raids' => $lang['ov_off_raids'],
                'lvl_raid' => $user['lvl_raid'],
                'ov_off_expe' => $lang['ov_off_expe'],
                'xpminier' => $user['xpminier'],
                'lvl_up_minier' => $LvlMinier * 5000,
                'xpraid' => $user['xpraid'],
                'lvl_up_raid' => $LvlRaid * 10,
                'Temperature' => $lang['Temperature'],
                'ov_temp_from' => $lang['ov_temp_from'],
                'ov_temp_unit' => $lang['ov_temp_unit'],
                'ov_temp_to' => $lang['ov_temp_to'],
                'Position' => $lang['Position'],
                'ov_local_cdr' => $lang['ov_local_cdr'],
                'Metal' => $lang['Metal'],
                'metal_debris' => pretty_number($galaxyrow['metal']),
                'Crystal' => $lang['Crystal'],
                'crystal_debris' => pretty_number($galaxyrow['crystal']),
                'get_link' => $parse['get_link'],
                'Points' => $lang['Points'],
                'ov_pts_build' => $lang['ov_pts_build'],
                'ov_pts_fleet' => $lang['ov_pts_fleet'],
                'ov_pts_reche' => $lang['ov_pts_reche'],
                'ov_pts_total' => $lang['ov_pts_total'],
                'Rank' => $lang['Rank'],
                'of' => $lang['of'],
                'max_users' => $game_config['users_amount'],
                'Raids' => $lang['Raids'],
                'NumberOfRaids' => $lang['NumberOfRaids'],
                'raids' => $user['raids'],
                'RaidsWin' => $lang['RaidsWin'],
                'raidswin' => $user['raidswin'],
                'RaidsLoose' => $lang['RaidsLoose'],
                'raidswin' => $user['raidswin'],
                'raidsloose' => $user['raidsloose'],
                'bannerframe' => $game_config['ForumBannerFrame'],
                'ExternalTchatFrame' => $game_config['OverviewExternChat'],
                'OverviewExternChatCmd' => $game_config['OverviewExternChatCmd'],
                'ClickBanner' => $game_config['OverviewClickBanner'],
                'user_id' => $user['id'],
                'InfoBanner' => $lang['InfoBanner'],
                'ov_news_title' => $lang['ov_news_title'],
                'OverviewNewsText' => $game_config['OverviewNewsText'],
            ));
            $this->render('overview_body.tpl');
        }
    }

}
