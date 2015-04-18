<?php

/**
 * This file is part of XNova:Legacies
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt
 * @see http://www.xnova-ng.org/
 *
 * Copyright (c) 2009-Present, XNova Support Team <http://www.xnova-ng.org>
 * All rights reserved.
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
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *                                --> NOTICE <--
 *  This file is part of the core development branch, changing its contents will
 * make you unable to use the automatic updates manager. Please refer to the
 * documentation for further information about customizing XNova.
 *
 */
class ShowOverviewPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'overview';
    }

    function show() {
        global $user, $lang, $game_config, $planetrow, $dpath, $galaxyrow, $flotten;

        $lunarow = doquery("SELECT * FROM {{table}} WHERE `id_owner` = '" . $planetrow['id_owner'] . "' AND `galaxy` = '" . $planetrow['galaxy'] . "' AND `system` = '" . $planetrow['system'] . "' AND `lunapos` = '" . $planetrow['planet'] . "';", 'lunas', true);

        //CheckPlanetUsedFields ($lunarow);
        $action = isset($_GET['action']) ? $_GET['action'] : '';
        $_POST['deleteid'] = intval(@$_POST['deleteid']);
        $pl = mysql_real_escape_string(isset($_GET['pl']) ? $_GET['pl'] : 0);

        includeLang('resources');
        includeLang('overview');

        switch ($action) {
            case 'renameplanet':
                // -----------------------------------------------------------------------------------------------
                if ($_POST['action'] == $lang['namer']) {
                    // Reponse au changement de nom de la planete
                    $UserPlanet = addslashes(CheckInputStrings($_POST['newname']));
                    $newname = mysql_escape_string(trim($UserPlanet));
                    if ($newname != "") {
                        // Deja on met jour la planete qu'on garde en memoire (pour le nom)
                        $planetrow['name'] = $newname;
                        // Ensuite, on enregistre dans la base de données
                        doquery("UPDATE {{table}} SET `name` = '" . $newname . "' WHERE `id` = '" . $user['current_planet'] . "' LIMIT 1;", "planets");
                        // Est ce qu'il sagit d'une lune ??
                        if ($planetrow['planet_type'] == 3) {
                            // Oui ... alors y a plus qu'a changer son nom dans la table des lunes aussi !!!
                            doquery("UPDATE {{table}} SET `name` = '" . $newname . "' WHERE `galaxy` = '" . $planetrow['galaxy'] . "' AND `system` = '" . $planetrow['system'] . "' AND `lunapos` = '" . $planetrow['planet'] . "' LIMIT 1;", "lunas");
                        }
                    }
                } elseif ($_POST['action'] == $lang['colony_abandon']) {
                    // Cas d'abandon d'une colonie
                    // Affichage de la forme d'abandon de colonie
                    $this->tplObj->assign(array(
                    'planet_id' => $planetrow['id'],
                    'galaxy_galaxy' => $planetrow['galaxy'],
                    'galaxy_system' => $planetrow['system'],
                    'galaxy_planet' => $planetrow['planet'],
                    'planet_name' => $planetrow['name'],
                    ));
                    
                    $this->tplObj->assign(array(
                    'title' => $lang['ov_rena_dele'],
                    'colony_abandon' => $lang['colony_abandon'],
                    'security_query' => $lang['security_query'],
                    'confirm_planet_delete' => $lang['confirm_planet_delete'],
                    'confirmed_with_password' => $lang['confirmed_with_password'],
                        
                    'password' => $lang['password'],
                    'deleteplanet' => $lang['deleteplanet'],
                    ));
                    
                    // On affiche la forme pour l'abandon de la colonie
                    $this->render('overview_deleteplanet.tpl');
                    
                } elseif ($_POST['kolonieloeschen'] == 1 && $_POST['deleteid'] == $user['current_planet']) {
                    // Controle du mot de passe pour abandon de colonie
                    if (md5($_POST['pw']) == $user["password"] && $user['id_planet'] != $user['current_planet']) {

                        include_once(ROOT_PATH . 'includes/functions/AbandonColony.php');
                        if (CheckFleets($planetrow)) {
                            $strMessage = "Vous ne pouvez pas abandonner la colonie, il y a de la flotte en vol !";
                            message($strMessage, $lang['colony_abandon'], 'game.php?page=overview&action=renameplanet', 3);
                        }

                        AbandonColony($user, $planetrow);

                        $QryUpdateUser = "UPDATE {{table}} SET ";
                        $QryUpdateUser .= "`current_planet` = `id_planet` ";
                        $QryUpdateUser .= "WHERE ";
                        $QryUpdateUser .= "`id` = '" . $user['id'] . "' LIMIT 1";
                        doquery($QryUpdateUser, "users");
                        // Tout s'est bien pass� ! La colo a �t� effac�e !!
                        message($lang['deletemessage_ok'], $lang['colony_abandon'], 'game.php?page=overview', 3);
                    } elseif ($user['id_planet'] == $user["current_planet"]) {
                        // Et puis quoi encore ??? On ne peut pas effacer la planete mere ..
                        // Uniquement les colonies cr�es apres coup !!!
                        message($lang['deletemessage_wrong'], $lang['colony_abandon'], 'game.php?page=overview&action=renameplanet');
                    } else {
                        // Erreur de saisie du mot de passe je n'efface pas !!!
                        message($lang['deletemessage_fail'], $lang['colony_abandon'], 'game.php?page=overview&action=renameplanet');
                    }
                }
                
                $this->tplObj->assign(array(
                'planet_id' => $planetrow['id'],
                'galaxy_galaxy' => $planetrow['galaxy'],
                'galaxy_system' => $planetrow['system'],
                'galaxy_planet' => $planetrow['planet'],
                'planet_name' => $planetrow['name'],
                ));
                
                $this->tplObj->assign(array(
                    'title' => $lang['ov_rena_dele'],
                    'rename_and_abandon_planet' => $lang['ov_rena_dele'],
                    'title' => $lang['ov_rena_dele'],
                    'your_planet' => $lang['your_planet'],
                    'coords' => $lang['coords'],
                    'name' => $lang['name'],
                    'functions' => $lang['functions'],
                    'namer' => $lang['namer'],
                    'colony_abandon' => $lang['colony_abandon'],
                ));
                // On affiche la page permettant d'abandonner OU de renomme une Colonie / Planete
                $this->render('overview_renameplanet.tpl');
                break;

            default:
                if ($user['id'] != '') {
                    // --- Gestion des messages ----------------------------------------------------------------------
                    $Have_new_message = "";
                    if ($user['new_message'] != 0) {
                        $Have_new_message .= "<tr>";
                        if ($user['new_message'] == 1) {
                            $Have_new_message .= "<th colspan=4><a href=game.php?page=messages>" . $lang['Have_new_message'] . "</a></th>";
                        } elseif ($user['new_message'] > 1) {
                            $Have_new_message .= "<th colspan=4><a href=game.php?page=messages>";
                            $m = pretty_number($user['new_message']);
                            $Have_new_message .= str_replace('%m', $m, $lang['Have_new_messages']);
                            $Have_new_message .= "</a></th>";
                        }
                        $Have_new_message .= "</tr>";
                    }
                    // -----------------------------------------------------------------------------------------------
                    // --- Gestion Officiers -------------------------------------------------------------------------
                    // Passage au niveau suivant, ajout du point de compétence et affichage du passage au nouveau level
                    $XpMinierUp = $user['lvl_minier'] * 5000;
                    $XpRaidUp = $user['lvl_raid'] * 10;
                    $XpMinier = $user['xpminier'];
                    $XPRaid = $user['xpraid'];

                    $LvlUpMinier = $user['lvl_minier'] + 1;
                    $LvlUpRaid = $user['lvl_raid'] + 1;

                    if (($LvlUpMinier + $LvlUpRaid) <= 100) {
                        if ($XpMinier >= $XpMinierUp) {
                            $QryUpdateUser = "UPDATE {{table}} SET ";
                            $QryUpdateUser .= "`lvl_minier` = '" . $LvlUpMinier . "', ";
                            $QryUpdateUser .= "`rpg_points` = `rpg_points` + 1 ";
                            $QryUpdateUser .= "WHERE ";
                            $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                            doquery($QryUpdateUser, 'users');
                            $HaveNewLevelMineur = "<tr>";
                            $HaveNewLevelMineur .= "<th colspan=4><a href=officier.php>" . $lang['Have_new_level_mineur'] . "</a></th>";
                        }else{$HaveNewLevelMineur = "";}
                        if ($XPRaid >= $XpRaidUp) {
                            $QryUpdateUser = "UPDATE {{table}} SET ";
                            $QryUpdateUser .= "`lvl_raid` = '" . $LvlUpRaid . "', ";
                            $QryUpdateUser .= "`rpg_points` = `rpg_points` + 1 ";
                            $QryUpdateUser .= "WHERE ";
                            $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                            doquery($QryUpdateUser, 'users');
                            $HaveNewLevelRaid = "<tr>";
                            $HaveNewLevelRaid .= "<th colspan=4><a href=officier.php>" . $lang['Have_new_level_raid'] . "</a></th>";
                        }else{$HaveNewLevelRaid = "";}
                    }
                    // -----------------------------------------------------------------------------------------------
                    // --- Gestion des flottes personnelles ---------------------------------------------------------
                    // Toutes de vert vetues
                    $OwnFleets = doquery("SELECT * FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets');
                    $Record = 0;
                    while ($FleetRow = mysql_fetch_array($OwnFleets)) {
                        $Record++;

                        $StartTime = $FleetRow['fleet_start_time'];
                        $StayTime = $FleetRow['fleet_end_stay'];
                        $EndTime = $FleetRow['fleet_end_time'];
                        // Flotte a l'aller
                        $Label = "fs";
                        if ($StartTime > time()) {
                            $fpage[$StartTime] = BuildFleetEventTable($FleetRow, 0, true, $Label, $Record);
                        }

                        if ($FleetRow['fleet_mission'] <> 4) {
                            // Flotte en stationnement
                            $Label = "ft";
                            if ($StayTime > time()) {
                                $fpage[$StayTime] = BuildFleetEventTable($FleetRow, 1, true, $Label, $Record);
                            }
                            // Flotte au retour
                            $Label = "fe";
                            if ($EndTime > time()) {
                                $fpage[$EndTime] = BuildFleetEventTable($FleetRow, 2, true, $Label, $Record);
                            }
                        }
                    } // End While
                    // -----------------------------------------------------------------------------------------------
                    // --- Gestion des flottes autres que personnelles ----------------------------------------------
                    // Flotte ennemies (ou amie) mais non personnelles
                    $OtherFleets = doquery("SELECT * FROM {{table}} WHERE `fleet_target_owner` = '" . $user['id'] . "';", 'fleets');

                    $Record = 2000;
                    while ($FleetRow = mysql_fetch_array($OtherFleets)) {
                        if ($FleetRow['fleet_owner'] != $user['id']) {
                            if ($FleetRow['fleet_mission'] != 8) {
                                $Record++;
                                $StartTime = $FleetRow['fleet_start_time'];
                                $StayTime = $FleetRow['fleet_end_stay'];

                                if ($StartTime > time()) {
                                    $Label = "ofs";
                                    $fpage[$StartTime] = BuildFleetEventTable($FleetRow, 0, false, $Label, $Record);
                                }
                                if ($FleetRow['fleet_mission'] == 5) {
                                    // Flotte en stationnement
                                    $Label = "oft";
                                    if ($StayTime > time()) {
                                        $fpage[$StayTime] = BuildFleetEventTable($FleetRow, 1, false, $Label, $Record);
                                    }
                                }
                            }
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
                    while ($UserPlanet = mysql_fetch_array($planets_query)) {
                        PlanetResourceUpdate($user, $UserPlanet, time());
                        if ($UserPlanet["id"] != $user["current_planet"] && $UserPlanet['planet_type'] != 3) {
                            $AllPlanets .= "<th>" . $UserPlanet['name'] . "<br>";
                            $AllPlanets .= "<a href=\"?page=overview&cp=" . $UserPlanet['id'] . "&re=0\" title=\"" . $UserPlanet['name'] . "\"><img src=\"" . $dpath . "planeten/small/s_" . $UserPlanet['image'] . ".jpg\" height=\"50\" width=\"50\"></a><br>";
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
                    while ($irak = mysql_fetch_array($iraks_query)) {
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

                            if (mysql_num_rows($planet_start) == 1) {
                                $planet = mysql_fetch_array($planet_start);
                            }

                            $fpage[$irak['zeit']] .= "<tr><th><div id=\"bxxfs$i\" class=\"z\"></div><font color=\"lime\">" . gmdate("H:i:s", $irak['zeit'] + 1 * 60 * 60) . "</font> </th><th colspan=\"3\"><font color=\"#0099FF\">Une attaque de missiles (" . $irak['anzahl'] . ") de " . $user_planet['name'] . " ";
                            $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&mode=3&galaxy=' . $irak["galaxy_angreifer"] . '&system=' . $irak["system_angreifer"] . '&planet=' . $irak["planet_angreifer"] . '">[' . $irak["galaxy_angreifer"] . ':' . $irak["system_angreifer"] . ':' . $irak["planet_angreifer"] . ']</a>';
                            $fpage[$irak['zeit']] .= ' arrive sur la plan&egrave;te' . $planet["name"] . ' ';
                            $fpage[$irak['zeit']] .= '<a href="game.php?page=galaxy&mode=3&galaxy=' . $irak["galaxy"] . '&system=' . $irak["system"] . '&planet=' . $irak["planet"] . '">[' . $irak["galaxy"] . ':' . $irak["system"] . ':' . $irak["planet"] . ']</a>';
                            $fpage[$irak['zeit']] .= '</font>';
                            $fpage[$irak['zeit']] .= InsertJavaScriptChronoApplet("fm", $Record, $time, false);
                            $fpage[$irak['zeit']] .= "</th>";
                        }
                    }
                    // -----------------------------------------------------------------------------------------------
                    $parse = $lang;
                    // -----------------------------------------------------------------------------------------------
                    // News Frame ...
                    // External Chat Frame ...
                    // Banner ADS Google (meme si je suis contre cela)
                    if ($game_config['OverviewNewsFrame'] == '1') {
                        $this->tplObj->assign('NewsFrame', "<tr><th>" . $lang['ov_news_title'] . "</th><th colspan=\"3\">" . stripslashes($game_config['OverviewNewsText']) . "</th></tr>");
                    }
                    if ($game_config['OverviewExternChat'] == '1') {
                        $this->tplObj->assign('ExternalTchatFrame', "<tr><th colspan=\"4\">" . stripslashes($game_config['OverviewExternChatCmd']) . "</th></tr>");
                    } else {
                        $this->tplObj->assign('ExternalTchatFrame', "");
                    }
                    if ($game_config['OverviewClickBanner'] != '') {
                        $this->tplObj->assign('ClickBanner', stripslashes($game_config['OverviewClickBanner']));
                    } else {
                        $this->tplObj->assign('ClickBanner', "");
                    }
                    if ($game_config['ForumBannerFrame'] == '1') {

                        $BannerURL = "" . dirname($_SERVER["HTTP_REFERER"]) . "/scripts/createbanner.php?id=" . $user['id'] . "";

                        $this->tplObj->assign('bannerframe', "<th colspan=\"4\"><img src=\"scripts/createbanner.php?id=" . $user['id'] . "\"><br>" . $lang['InfoBanner'] . "<br><input name=\"bannerlink\" type=\"text\" id=\"bannerlink\" value=\"[img]" . $BannerURL . "[/img]\" size=\"62\"></th></tr>");
                    } else {
                        $this->tplObj->assign('bannerframe', "");
                    }
                    // --- Gestion de l'affichage d'une lune ---------------------------------------------------------
                    if ($lunarow['id'] <> 0) {
                        if ($planetrow['planet_type'] == 1) {
                            $lune = doquery("SELECT * FROM {{table}} WHERE `galaxy` = '" . $planetrow['galaxy'] . "' AND `system` = '" . $planetrow['system'] . "' AND `planet` = '" . $planetrow['planet'] . "' AND `planet_type` = '3'", 'planets', true);
                            $this->tplObj->assign('moon_img', "<a href=\"?page=overview&cp=" . $lune['id'] . "&re=0\" title=\"" . $lune['name'] . "\"><img src=\"" . $dpath . "planeten/" . $lune['image'] . ".jpg\" height=\"50\" width=\"50\"></a>");
                            $this->tplObj->assign('moon', $lune['name']);
                        } else {
                            $this->tplObj->assign('moon_img', "");
                            $this->tplObj->assign('moon', "");
                        }
                    } else {
                        $this->tplObj->assign('moon_img', "");
                        $this->tplObj->assign('moon', "");
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
                        'galaxy_planet' => $planetrow['planet'],
                        'galaxy_system' => $planetrow['system'],
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
                    if (count($fpage) > 0) {
                        ksort($fpage);
                        foreach ($fpage as $time => $content) {
                            $flotten .= $content . "\n";
                        }
                    }
                    $this->tplObj->assign(array(
                        'fleet_list' => $flotten,
                        'energy_used' => $planetrow["energy_max"] - $planetrow["energy_used"],
                        'Have_new_message' => $Have_new_message,
                        'Have_new_level_mineur' => $HaveNewLevelMineur,
                        'Have_new_level_raid' => $HaveNewLevelRaid,
                        'time' => "<div id=\"dateheure\"></div>",
                        'dpath' => $dpath,
                        'planet_image' => $planetrow['image'],
                        'anothers_planets' => $AllPlanets,
                        'max_users' => $game_config['users_amount'],
                        'metal_debris' => pretty_number($galaxyrow['metal']),
                        'crystal_debris' => pretty_number($galaxyrow['crystal']),
                    ));
                    if (($galaxyrow['metal'] != 0 || $galaxyrow['crystal'] != 0) && $planetrow[$resource[209]] != 0) {
                        $this->tplObj->assign('get_link', " (<a href=\"game.php?page=quickfleet&mode=8&g=" . $galaxyrow['galaxy'] . "&s=" . $galaxyrow['system'] . "&p=" . $galaxyrow['planet'] . "&t=2\">" . $lang['type_mission'][8] . "</a>)");
                    } else {
                        $this->tplObj->assign('get_link', '');
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

                            $this->tplObj->assign('building', $Build);
                        } else {
                            $this->tplObj->assign('building', $lang['Free']);
                        }
                    } else {
                        $this->tplObj->assign('building', $lang['Free']);
                    }
                    $query = doquery('SELECT username FROM {{table}} ORDER BY register_time DESC', 'users', true);
                    $this->tplObj->assign('last_user', $query['username']);
                    $query = doquery("SELECT COUNT(DISTINCT(id)) FROM {{table}} WHERE onlinetime>" . (time() - 900), 'users', true);
                    $this->tplObj->assign('online_users', $query[0]);
                    // $count = doquery(","users",true);
                    $this->tplObj->assign('users_amount', $game_config['users_amount']);
                    // Rajout d'une barre pourcentage
                    // Calcul du pourcentage de remplissage
                    $this->tplObj->assign('case_pourcentage', floor($planetrow["field_current"] / CalculateMaxPlanetFields($planetrow) * 100) . $lang['o/o']);
                    // Barre de remplissage
                    $case_barre = floor($planetrow["field_current"] / CalculateMaxPlanetFields($planetrow) * 100) * 4.0;
                    // Couleur de la barre de remplissage
                    if ($case_barre > (100 * 4.0)) {
                        $this->tplObj->assign(array(
                            'case_barre' => 400,
                            'case_barre_barcolor' => '#C00000',
                        ));
                    } elseif ($case_barre > (80 * 4.0)) {
                        $this->tplObj->assign('case_barre', '');
                        $this->tplObj->assign('case_barre_barcolor', '#C0C000');
                    } else {
                        $this->tplObj->assign('case_barre', '');
                        $this->tplObj->assign('case_barre_barcolor', '#00C000');
                    }
                    // Mode Améliorations
                    $this->tplObj->assign(array(
                        'xpminier' => $user['xpminier'],
                        'xpraid' => $user['xpraid'],
                        'lvl_minier' => $user['lvl_minier'],
                        'lvl_raid' => $user['lvl_raid'],
                        'lvl_up_minier' => $user['lvl_minier'] * 5000,
                        'lvl_up_raid' => $user['lvl_raid'] * 10,
                    ));
                    // Nombre de raids, pertes, etc ...
                    $this->tplObj->assign(array(
                        'Raids' => $lang['Raids'],
                        'NumberOfRaids' => $lang['NumberOfRaids'],
                        'RaidsWin' => $lang['RaidsWin'],
                        'RaidsLoose' => $lang['RaidsLoose'],
                        'raids' => $user['raids'],
                        'raidswin' => $user['raidswin'],
                        'raidsloose' => $user['raidsloose'],
                    ));
                    // Compteur de Membres en ligne
                    $OnlineUsers = doquery("SELECT COUNT(*) FROM {{table}} WHERE onlinetime>='" . (time() - 15 * 60) . "'", 'users', 'true');
                    $this->tplObj->assign(array(
                        'NumberMembersOnline' => $OnlineUsers[0],
                        'title' => $lang['Overview'],
                        'Planet_menu' => $lang['Planet_menu'],
                        'Planet' => $lang['Planet'],
                        'Server_time' => $lang['Server_time'],
                        'MembersOnline' => $lang['MembersOnline'],
                        'Events' => $lang['Events'],
                        'Diameter' => $lang['Diameter'],
                        'Developed_fields' => $lang['Developed_fields'],
                        'max_eveloped_fields' => $lang['max_eveloped_fields'],
                        'fields' => $lang['fields'],
                        'ov_off_level' => $lang['ov_off_level'],
                        'ov_off_mines' => $lang['ov_off_mines'],
                        'ov_off_raids' => $lang['ov_off_raids'],
                        'ov_off_expe' => $lang['ov_off_expe'],
                        'Temperature' => $lang['Temperature'],
                        'ov_temp_from' => $lang['ov_temp_from'],
                        'ov_temp_unit' => $lang['ov_temp_unit'],
                        'ov_temp_to' => $lang['ov_temp_to'],
                        'Position' => $lang['Position'],
                        'ov_local_cdr' => $lang['ov_local_cdr'],
                        'Points' => $lang['Points'],
                        'ov_pts_build' => $lang['ov_pts_build'],
                        'ov_pts_fleet' => $lang['ov_pts_fleet'],
                        'ov_pts_reche' => $lang['ov_pts_reche'],
                        'ov_pts_total' => $lang['ov_pts_total'],
                        'Rank' => $lang['Rank'],
                        'of' => $lang['of'],
                    ));

                    $this->render('overview_body.tpl');
                    break;
                }
        }
    }

}
