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
 * @ShowGalaxyPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  9/mai/2015 22:23:31
 */

/**
 * Description of ShowGalaxyPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowGalaxyPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'changelog';
    }

    function show() {
        global $lang, $user, $resource, $planetcount;

        includeLang('galaxy');

        $CurrentPlanet = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $user['current_planet'] . "';", 'planets', true);
        $lunarow = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $user['current_luna'] . "';", 'lunas', true);
        $galaxyrow = doquery("SELECT * FROM {{table}} WHERE `id_planet` = '" . $CurrentPlanet['id'] . "';", 'galaxy', true);

        $dpath = (!$user["dpath"]) ? DEFAULT_SKINPATH : $user["dpath"];
        $fleetmax = $user['computer_tech'] + 1;
        $CurrentPlID = $CurrentPlanet['id'];
        $CurrentMIP = $CurrentPlanet['interplanetary_misil'];
        $CurrentRC = $CurrentPlanet['recycler'];
        $CurrentSP = $CurrentPlanet['spy_sonde'];
        $HavePhalanx = $CurrentPlanet['phalanx'];
        $CurrentSystem = $CurrentPlanet['system'];
        $CurrentGalaxy = $CurrentPlanet['galaxy'];
        $CanDestroy = $CurrentPlanet[$resource[213]] + $CurrentPlanet[$resource[214]];

        $maxfleet = doquery("SELECT * FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets');
        $maxfleet_count = mysql_num_rows($maxfleet);

        CheckPlanetUsedFields($CurrentPlanet);
        CheckPlanetUsedFields($lunarow);

        if (!isset($action)) {
            if (isset($_GET['action'])) {
                $action = intval($_GET['action']);
            } else {
                $action = 0;
            }
        }

        $galaxy = 1;
        $system = 1;
        $planet = null;

        if ($action == 0) {
            $galaxy = $CurrentGalaxy;
            $system = $CurrentSystem;
        } elseif ($action == 1 || $action == 3) {
            if (isset($_POST["galaxyLeft"])) {
                if (!isset($_POST["galaxy"]) || $_POST["galaxy"] <= 1 || $_POST["galaxy"] > MAX_GALAXY_IN_WORLD) {
                    $galaxy = 1;
                } else {
                    $galaxy = intval($_POST["galaxy"]) - 1;
                }
            } elseif (isset($_POST["galaxyRight"])) {
                if (!isset($_POST["galaxy"]) || $_POST["galaxy"] >= MAX_GALAXY_IN_WORLD) {
                    $galaxy = MAX_GALAXY_IN_WORLD;
                } else {
                    $galaxy = intval($_POST["galaxy"]) + 1;
                }
            } else if (!isset($_POST["galaxy"]) || $_POST["galaxy"] <= 1 || $_POST["galaxy"] > MAX_GALAXY_IN_WORLD) {
                $galaxy = 1;
            } else {
                $galaxy = intval($_POST["galaxy"]);
            }

            if (isset($_POST["systemLeft"])) {
                if (!isset($_POST["system"]) || $_POST["system"] <= 1 || $_POST["system"] > MAX_SYSTEM_IN_GALAXY) {
                    $system = 1;
                } else {
                    $system = intval($_POST["system"]) - 1;
                }
            } elseif (isset($_POST["systemRight"])) {
                if (!isset($_POST["system"]) || $_POST["system"] >= MAX_SYSTEM_IN_GALAXY) {
                    $system = MAX_SYSTEM_IN_GALAXY;
                } else {
                    $system = intval($_POST["system"]) + 1;
                }
            } else if (!isset($_POST["system"]) || $_POST["system"] <= 1 || $_POST["system"] > MAX_SYSTEM_IN_GALAXY) {
                $system = 1;
            } else {
                $system = intval($_POST["system"]);
            }
        } elseif ($action == 2) {
            if (!isset($_POST["galaxy"]) || $_POST["galaxy"] <= 0) {
                $galaxy = 1;
            } else if ($_POST["galaxy"] >= MAX_GALAXY_IN_WORLD) {
                $galaxy = MAX_GALAXY_IN_WORLD;
            } else {
                $galaxy = intval($_POST["galaxy"]) + 1;
            }

            if (!isset($_POST["system"]) || $_POST["system"] <= 0) {
                $system = 1;
            } else if ($_POST["system"] >= MAX_SYSTEM_IN_GALAXY) {
                $system = MAX_SYSTEM_IN_GALAXY;
            } else {
                $system = intval($_POST["system"]) + 1;
            }

            if (!isset($_POST["planet"]) || $_POST["planet"] <= 0) {
                $planet = 1;
            } else if ($_POST["planet"] >= MAX_PLANET_IN_SYSTEM) {
                $planet = MAX_PLANET_IN_SYSTEM;
            } else {
                $planet = intval($_POST["planet"]) + 1;
            }
        }

        $planetcount = 0;
        $lunacount = 0;

        $ShowGalaxyMISelector = "";
        if ($action == 2) {
            $ShowGalaxyMISelector = $this->ShowGalaxyMISelector($galaxy, $system, $planet, $CurrentPlanet['id'], $CurrentMIP);
        }

        $this->tplObj->assign(array(
            'title' => $lang['Galaxy'],
            'CurrentPlanet' => $CurrentPlanet,
            'galaxy' => $galaxy,
            'system' => $system,
            'ShowGalaxySelector' => $this->ShowGalaxySelector($galaxy, $system),
            'ShowGalaxyMISelector' => $ShowGalaxyMISelector,
            'Solar_system' => $lang['Solar_system'],
            'Pos' => $lang['Pos'],
            'Planet' => $lang['Planet'],
            'Name' => $lang['Name'],
            'Moon' => $lang['Moon'],
            'Debris' => $lang['Debris'],
            'Player' => $lang['Player'],
            'Alliance' => $lang['Alliance'],
            'Actions' => $lang['Actions'],
            'ShowGalaxyRows' => $this->ShowGalaxyRows($galaxy, $system),
            'ShowGalaxyFooter' => $this->ShowGalaxyFooter($galaxy, $system, $CurrentMIP, $CurrentRC, $CurrentSP),
        ));
        $this->render('Galaxy/galaxy_body.tpl');
    }

    function ShowGalaxySelector($Galaxy, $System) {
        global $lang;

        if ($Galaxy > MAX_GALAXY_IN_WORLD) {
            $Galaxy = MAX_GALAXY_IN_WORLD;
        }
        if ($Galaxy < 1) {
            $Galaxy = 1;
        }
        if ($System > MAX_SYSTEM_IN_GALAXY) {
            $System = MAX_SYSTEM_IN_GALAXY;
        }
        if ($System < 1) {
            $System = 1;
        }

        $this->tplObj->assign(array(
            'lang_Galaxy' => $lang['Galaxy'],
            'lang_Solar_system' => $lang['Solar_system'],
            'lang_Afficher' => $lang['Afficher'],
            'Galaxy' => $Galaxy,
            'System' => $System,
        ));
        return $this->tplObj->fetch('Galaxy/galaxy_selector.tpl');
    }

    function ShowGalaxyMISelector($Galaxy, $System, $Planet, $Current, $MICount) {
        global $lang;

        $this->tplObj->assign(array(
            'Current' => $Current,
            'Galaxy' => $Galaxy,
            'System' => $System,
            'Planet' => $Planet,
            'String' => sprintf($lang['gm_restmi'], $MICount),
            'gm_launch' => $lang['gm_launch'],
            'gm_target' => $lang['gm_target'],
            'gm_all' => $lang['gm_all'],
            'tech' => $lang['tech'],
            'gm_send' => $lang['gm_send'],
        ));

        return $this->tplObj->fetch('Galaxy/galaxy_MI_selector.tpl');
    }

    function ShowGalaxyRows($Galaxy, $System) {
        global $planetcount;

        $Result = "";
        for ($Planet = 1; $Planet < 16; $Planet++) {
            unset($GalaxyRowPlanet);
            unset($GalaxyRowMoon);
            unset($GalaxyRowPlayer);
            unset($GalaxyRowAlly);

            $GalaxyRow = doquery("SELECT * FROM {{table}} WHERE `galaxy` = '" . $Galaxy . "' AND `system` = '" . $System . "' AND `planet` = '" . $Planet . "';", 'galaxy', true);

            if ($GalaxyRow) {
                // Il existe des choses sur cette ligne de planete
                if ($GalaxyRow["id_planet"] != 0) {
                    $GalaxyRowPlanet = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $GalaxyRow["id_planet"] . "';", 'planets', true);

                    if ($GalaxyRowPlanet['destruyed'] != 0 AND
                            $GalaxyRowPlanet['id_owner'] != '' AND
                            $GalaxyRow["id_planet"] != '') {
                        CheckAbandonPlanetState($GalaxyRowPlanet);
                    } else {
                        $planetcount++;
                        $GalaxyRowPlayer = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $GalaxyRowPlanet["id_owner"] . "';", 'users', true);
                    }

                    if ($GalaxyRow["id_luna"] != 0) {
                        $GalaxyRowMoon = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $GalaxyRow["id_luna"] . "';", 'lunas', true);
                        if ($GalaxyRowMoon["destruyed"] != 0) {
                            CheckAbandonMoonState($GalaxyRowMoon);
                        }
                    }
                    $GalaxyRowPlanet = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $GalaxyRow["id_planet"] . "';", 'planets', true);
                    if ($GalaxyRowPlanet['id_owner'] <> 0) {
                        $GalaxyRowUser = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $GalaxyRowPlanet['id_owner'] . "';", 'users', true);
                    } else {
                        $GalaxyRowUser = array();
                    }
                }
            }

            $this->tplObj->assign(array(
                'GalaxyRowPos' => $this->GalaxyRowPos($Planet, $GalaxyRow),
                'GalaxyRowPlanet' => $this->GalaxyRowPlanet($GalaxyRow, @$GalaxyRowPlanet, $Galaxy, $System, $Planet, 1),
                'GalaxyRowPlanetName' => $this->GalaxyRowPlanetName($GalaxyRow, @$GalaxyRowPlanet, @$GalaxyRowPlayer, $Galaxy, $System, $Planet, 1),
                'GalaxyRowMoon' => $this->GalaxyRowMoon($GalaxyRow, @$GalaxyRowMoon, @$GalaxyRowPlayer, $Galaxy, $System, $Planet, 3),
                'GalaxyRowDebris' => $this->GalaxyRowDebris($GalaxyRow, @$GalaxyRowPlanet, @$GalaxyRowPlayer, $Galaxy, $System, $Planet, 2),
                'GalaxyRowUser' => $this->GalaxyRowUser($GalaxyRow, @$GalaxyRowPlanet, @$GalaxyRowPlayer, $Galaxy, $System, $Planet, 0),
                'GalaxyRowAlly' => $this->GalaxyRowAlly($GalaxyRow, @$GalaxyRowPlanet, @$GalaxyRowPlayer, $Galaxy, $System, $Planet, 0),
                'GalaxyRowActions' => $this->GalaxyRowActions($GalaxyRow, @$GalaxyRowPlanet, @$GalaxyRowPlayer, $Galaxy, $System, $Planet, 0),
            ));
            $Result .= $this->tplObj->fetch('Galaxy/galaxy_row.tpl');
        }

        return $Result;
    }

    function ShowGalaxyFooter($Galaxy, $System, $CurrentMIP, $CurrentRC, $CurrentSP) {
        global $lang, $maxfleet_count, $fleetmax, $planetcount;

        if ($planetcount == 1) {
            $PlanetCountMessage = $planetcount . " " . $lang['gf_cntmone'];
        } elseif ($planetcount == 0) {
            $PlanetCountMessage = $lang['gf_cntmnone'];
        } else {
            $PlanetCountMessage = $planetcount . " " . $lang['gf_cntmsome'];
        }
        $LegendPopup = $this->GalaxyLegendPopup();
        $Recyclers = pretty_number($CurrentRC);
        $SpyProbes = pretty_number($CurrentSP);

        $this->tplObj->assign(array(
            'Galaxy' => $Galaxy,
            'System' => $System,
            'gf_unknowsp' => $lang['gf_unknowsp'],
            'PlanetCountMessage' => $PlanetCountMessage,
            'LegendPopup' => $LegendPopup,
            'CurrentMIP' => $CurrentMIP,
            'gf_mi_title' => $lang['gf_mi_title'],
            'maxfleet_count' => $maxfleet_count,
            'fleetmax' => $fleetmax,
            'gf_fleetslt' => $lang['gf_fleetslt'],
            'Recyclers' => $Recyclers,
            'gf_rc_title' => $lang['gf_rc_title'],
            'SpyProbes' => $SpyProbes,
            'gf_sp_title' => $lang['gf_sp_title'],
            'gf_mi_title' => $lang['gf_mi_title'],
        ));
        return $this->tplObj->fetch('Galaxy/galaxy_footer.tpl');
    }

    function GalaxyRowPos($Planet, $GalaxyRow) {
        // Pos
        $Result = "<th width=30>";
        $Result .= "<a href=\"#\"";
        if ($GalaxyRow) {
            $Result .= " tabindex=\"" . ($Planet + 1) . "\"";
        }
        $Result .= ">" . $Planet . "</a>";
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyRowPlanet($GalaxyRow, $GalaxyRowPlanet, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $dpath, $user, $HavePhalanx, $CurrentSystem, $CurrentGalaxy;

        // Planete (Image)
        $Result = "<th width=30>";

        $GalaxyRowUser = doquery("SELECT * FROM {{table}} WHERE id='" . $GalaxyRowPlanet['id_owner'] . "';", 'users', true);
        if ($GalaxyRow && $GalaxyRowPlanet["destruyed"] == 0 && $GalaxyRow["id_planet"] != 0) {
            if ($HavePhalanx <> 0) {
                if ($GalaxyRowUser['id'] != $user['id']) {
                    if ($GalaxyRowPlanet["galaxy"] == $CurrentGalaxy) {
                        $Range = GetPhalanxRange($HavePhalanx);
                        if ($SystemLimitMin < 1) {
                            $SystemLimitMin = 1;
                        }
                        $SystemLimitMax = $CurrentSystem + $Range;
                        if ($System <= $SystemLimitMax) {
                            if ($System >= $SystemLimitMin) {
                                $PhalanxTypeLink = "<a href=# onclick=fenster(&#039;game.php?page=phalanx&galaxy=" . $Galaxy . "&amp;system=" . $System . "&amp;planet=" . $Planet . "&amp;planettype=" . $PlanetType . "&#039;) >" . $lang['gl_phalanx'] . "</a><br />";
                            } else {
                                $PhalanxTypeLink = "";
                            }
                        } else {
                            $PhalanxTypeLink = "";
                        }
                    } else {
                        $PhalanxTypeLink = "";
                    }
                } else {
                    $PhalanxTypeLink = "";
                }
            } else {
                $PhalanxTypeLink = "";
            }
            if ($GalaxyRowUser['id'] != $user['id']) {
                $MissionType6Link = "<a href=# onclick=&#039javascript:doit(6, " . $Galaxy . ", " . $System . ", " . $Planet . ", " . $PlanetType . ", " . $user["spio_anz"] . ");&#039 >" . $lang['type_mission'][6] . "</a><br /><br />";
            } elseif ($GalaxyRowUser['id'] == $user['id']) {
                $MissionType6Link = "";
            }
            if ($GalaxyRowUser['id'] != $user['id']) {
                $MissionType1Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&amp;system=" . $System . "&amp;planet=" . $Planet . "&amp;planettype=" . $PlanetType . "&amp;target_mission=1>" . $lang['type_mission'][1] . "</a><br />";
            } elseif ($GalaxyRowUser['id'] == $user['id']) {
                $MissionType1Link = "";
            }
            if ($GalaxyRowUser['id'] != $user['id']) {
                $MissionType5Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=5>" . $lang['type_mission'][5] . "</a><br />";
            } elseif ($GalaxyRowUser['id'] == $user['id']) {
                $MissionType5Link = "";
            }
            if ($GalaxyRowUser['id'] == $user['id']) {
                $MissionType4Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=4>" . $lang['type_mission'][4] . "</a><br />";
            } elseif ($GalaxyRowUser['id'] != $user['id']) {
                $MissionType4Link = "";
            }
            $MissionType3Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=3>" . $lang['type_mission'][3] . "</a>";

            $this->tplObj->assign(array(
                'gl_planet' => $lang['gl_planet'],
                'GalaxyRowPlanet_image' => $GalaxyRowPlanet['image'],
                'GalaxyRowPlanet_name' => stripslashes($GalaxyRowPlanet['name']),
                'Galaxy' => $Galaxy,
                'System' => $System,
                'Planet' => $Planet,
                'dpath' => $dpath,
                'MissionType6Link' => $MissionType6Link,
                'PhalanxTypeLink' => $PhalanxTypeLink,
                'MissionType1Link' => $MissionType1Link,
                'MissionType5Link' => $MissionType5Link,
                'MissionType4Link' => $MissionType4Link,
                'MissionType3Link' => $MissionType3Link,
            ));
            $Result .= $this->tplObj->fetch('Galaxy/galaxy_row_planet.tpl');
        }
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyRowPlanetName($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $user, $HavePhalanx, $CurrentSystem, $CurrentGalaxy;

        // Planete (Nom)
        $Result = "<th style=\"white-space: nowrap;\" width=130>";
        if ($GalaxyRowUser['ally_id'] == $user['ally_id'] AND
                $GalaxyRowUser['id'] != $user['id'] AND
                $user['ally_id'] != '') {
            $TextColor = "<font color=\"green\">";
            $EndColor = "</font>";
        } elseif ($GalaxyRowUser['id'] == $user['id']) {
            $TextColor = "<font color=\"red\">";
            $EndColor = "</font>";
        } else {
            $TextColor = '';
            $EndColor = "";
        }
        if ($GalaxyRowPlanet['last_update'] > (time() - 59 * 60) AND $GalaxyRowUser['id'] != $user['id']) {
            $Inactivity = pretty_time_hour(time() - $GalaxyRowPlanet['last_update']);
        }
        if ($GalaxyRow && $GalaxyRowPlanet["destruyed"] == 0) {
            if ($HavePhalanx <> 0) {
                if ($GalaxyRowPlanet["galaxy"] == $CurrentGalaxy) {
                    $Range = GetPhalanxRange($HavePhalanx);
                    if ($CurrentGalaxy + $Range <= $CurrentSystem AND
                            $CurrentSystem >= $CurrentGalaxy - $Range) {
                        $PhalanxTypeLink = "<a href=# onclick=fenster('game.php?page=phalanx&galaxy=" . $Galaxy . "&amp;system=" . $System . "&amp;planet=" . $Planet . "&amp;planettype=" . $PlanetType . "')  title=\"" . $lang['gl_phalanx'] . "\">" . $GalaxyRowPlanet['name'] . "</a><br />";
                    } else {
                        $PhalanxTypeLink = stripslashes($GalaxyRowPlanet['name']);
                    }
                } else {
                    $PhalanxTypeLink = stripslashes($GalaxyRowPlanet['name']);
                }
            } else {
                $PhalanxTypeLink = stripslashes($GalaxyRowPlanet['name']);
            }

            $Result .= $TextColor . $PhalanxTypeLink . $EndColor;

            if ($GalaxyRowPlanet['last_update'] > (time() - 59 * 60) AND
                    $GalaxyRowUser['id'] != $user['id']) {
                if ($GalaxyRowPlanet['last_update'] > (time() - 10 * 60) AND
                        $GalaxyRowUser['id'] != $user['id']) {
                    $Result .= "(*)";
                } else {
                    $Result .= " (" . $Inactivity . ")";
                }
            }
        } elseif ($GalaxyRowPlanet["destruyed"] != 0) {
            $Result .= $lang['gl_destroyedplanet'];
        }
        $Result .= "</th>";
        return $Result;
    }

    function GalaxyRowMoon($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $user, $dpath, $HavePhalanx, $CurrentSystem, $CurrentGalaxy, $CanDestroy;

        // Lune
        $Result = "<th style=\"white-space: nowrap;\" width=30>";
        if ($GalaxyRowUser['id'] != $user['id']) {
            $MissionType6Link = "<a href=# onclick=&#039javascript:doit(6, " . $Galaxy . ", " . $System . ", " . $Planet . ", " . $PlanetType . ", " . $user["spio_anz"] . ");&#039 >" . $lang['type_mission'][6] . "</a><br /><br />";
        } elseif ($GalaxyRowUser['id'] == $user['id']) {
            $MissionType6Link = "";
        }
        if ($GalaxyRowUser['id'] != $user['id']) {
            $MissionType1Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&amp;system=" . $System . "&amp;planet=" . $Planet . "&amp;planettype=" . $PlanetType . "&amp;target_mission=1>" . $lang['type_mission'][1] . "</a><br />";
        } elseif ($GalaxyRowUser['id'] == $user['id']) {
            $MissionType1Link = "";
        }

        if ($GalaxyRowUser['id'] != $user['id']) {
            $MissionType5Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=5>" . $lang['type_mission'][5] . "</a><br />";
        } elseif ($GalaxyRowUser['id'] == $user['id']) {
            $MissionType5Link = "";
        }
        if ($GalaxyRowUser['id'] == $user['id']) {
            $MissionType4Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=4>" . $lang['type_mission'][4] . "</a><br />";
        } elseif ($GalaxyRowUser['id'] != $user['id']) {
            $MissionType4Link = "";
        }

        if ($GalaxyRowUser['id'] != $user['id']) {
            if ($CanDestroy > 0) {
                $MissionType9Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=9>" . $lang['type_mission'][9] . "</a>";
            } else {
                $MissionType9Link = "";
            }
        } elseif ($GalaxyRowUser['id'] == $user['id']) {
            $MissionType9Link = "";
        }

        $MissionType3Link = "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&planettype=" . $PlanetType . "&target_mission=3>" . $lang['type_mission'][3] . "</a><br />";

        if ($GalaxyRow && $GalaxyRowPlanet["destruyed"] == 0 && $GalaxyRow["id_luna"] != 0) {
            $Result .= "<a style=\"cursor: pointer;\"";
            $Result .= " onmouseover='return overlib(\"";
            $Result .= "<table width=240>";
            $Result .= "<tr>";
            $Result .= "<td class=c colspan=2>";
            $Result .= $lang['Moon'] . ": " . $GalaxyRowPlanet["name"] . " [" . $Galaxy . ":" . $System . ":" . $Planet . "]";
            $Result .= "</td>";
            $Result .= "</tr><tr>";
            $Result .= "<th width=80>";
            $Result .= "<img src=" . $dpath . "planeten/mond.jpg height=75 width=75 />";
            $Result .= "</th>";
            $Result .= "<th>";
            $Result .= "<table>";
            $Result .= "<tr>";
            $Result .= "<td class=c colspan=2>" . $lang['caracters'] . "</td>";
            $Result .= "</tr><tr>";
            $Result .= "<th>" . $lang['diameter'] . "</th>";
            $Result .= "<th>" . number_format($GalaxyRowPlanet['diameter'], 0, '', '.') . "</th>";
            $Result .= "</tr><tr>";
            $Result .= "<th>" . $lang['temperature'] . "</th><th>" . number_format($GalaxyRowPlanet['temp_min'], 0, '', '.') . "</th>";
            $Result .= "</tr><tr>";
            $Result .= "<td class=c colspan=2>" . $lang['Actions'] . "</td>";
            $Result .= "</tr><tr>";
            $Result .= "<th colspan=2 align=center>";
            $Result .= $MissionType6Link;
            $Result .= $MissionType3Link;
            $Result .= $MissionType4Link;
            $Result .= $MissionType1Link;
            $Result .= $MissionType5Link;
            $Result .= $MissionType9Link;
            $Result .= "</tr>";
            $Result .= "</table>";
            $Result .= "</th>";
            $Result .= "</tr>";
            $Result .= "</table>\"";
//        $Result .= ", STICKY, MOUSEOFF, DELAY, ". ($user["settings_tooltiptime"] * 1000) .", CENTER, OFFSETX, -40, OFFSETY, -40 );'";
            $Result .= ", STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -40, OFFSETY, -40 );'";
            $Result .= " onmouseout='return nd();'>";
            $Result .= "<img src=" . $dpath . "planeten/small/s_mond.jpg height=22 width=22>";
            $Result .= "</a>";
        }
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyRowDebris($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $dpath, $CurrentRC, $user, $pricelist;
        // Cdr
        $Result = "<th style=\"white-space: nowrap;\" width=30>";
        if ($GalaxyRow) {
            if ($GalaxyRow["metal"] != 0 || $GalaxyRow["crystal"] != 0) {
                $RecNeeded = ceil(($GalaxyRow["metal"] + $GalaxyRow["crystal"]) / $pricelist[209]['capacity']);
                if ($RecNeeded < $CurrentRC) {
                    $RecSended = $RecNeeded;
                } elseif ($RecNeeded >= $CurrentRC) {
                    $RecSended = $CurrentRC;
                } else {
                    $RecSended = $RecyclerCount;
                }
                $Result = "<th style=\"";
                if (($GalaxyRow["metal"] + $GalaxyRow["crystal"]) >= 10000000) {
                    $Result .= "background-color: rgb(100, 0, 0);";
                } elseif (($GalaxyRow["metal"] + $GalaxyRow["crystal"]) >= 1000000) {
                    $Result .= "background-color: rgb(100, 100, 0);";
                } elseif (($GalaxyRow["metal"] + $GalaxyRow["crystal"]) >= 100000) {
                    $Result .= "background-color: rgb(0, 100, 0);";
                }
                $Result .= "background-image: none;\" width=30>";
                $Result .= "<a style=\"cursor: pointer;\"";
                $Result .= " onmouseover='return overlib(\"";
                $Result .= "<table width=240>";
                $Result .= "<tr>";
                $Result .= "<td class=c colspan=2>";
                $Result .= $lang['Debris'] . " [" . $Galaxy . ":" . $System . ":" . $Planet . "]";
                $Result .= "</td>";
                $Result .= "</tr><tr>";
                $Result .= "<th width=80>";
                $Result .= "<img src=" . $dpath . "planeten/debris.jpg height=75 width=75 />";
                $Result .= "</th>";
                $Result .= "<th>";
                $Result .= "<table>";
                $Result .= "<tr>";
                $Result .= "<td class=c colspan=2>" . $lang['gl_ressource'] . "</td>";
                $Result .= "</tr><tr>";
                $Result .= "<th>" . $lang['Metal'] . " </th><th>" . number_format($GalaxyRow['metal'], 0, '', '.') . "</th>";
                $Result .= "</tr><tr>";
                $Result .= "<th>" . $lang['Crystal'] . " </th><th>" . number_format($GalaxyRow['crystal'], 0, '', '.') . "</th>";
                $Result .= "</tr><tr>";
                $Result .= "<td class=c colspan=2>" . $lang['gl_action'] . "</td>";
                $Result .= "</tr><tr>";
                $Result .= "<th colspan=2 align=left>";
                $Result .= "<a href= # onclick=&#039javascript:doit (8, " . $Galaxy . ", " . $System . ", " . $Planet . ", " . $PlanetType . ", " . $RecSended . ");&#039 >" . $lang['type_mission'][8] . "</a>";
                $Result .= "</tr>";
                $Result .= "</table>";
                $Result .= "</th>";
                $Result .= "</tr>";
                $Result .= "</table>\"";
//			$Result .= ", STICKY, MOUSEOFF, DELAY, ". ($user["settings_tooltiptime"] * 1000) .", CENTER, OFFSETX, -40, OFFSETY, -40 );'";
                $Result .= ", STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -40, OFFSETY, -40 );'";
                $Result .= " onmouseout='return nd();'>";
                $Result .= "<img src=" . $dpath . "planeten/debris.jpg height=22 width=22></a>";
            }
        }
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyRowUser($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $user;

        // Joueur
        $Result = "<th width=150>";
        if ($GalaxyRowUser && $GalaxyRowPlanet["destruyed"] == 0) {
            $NoobProt = doquery("SELECT * FROM {{table}} WHERE `config_name` = 'noobprotection';", 'config', true);
            $NoobTime = doquery("SELECT * FROM {{table}} WHERE `config_name` = 'noobprotectiontime';", 'config', true);
            $NoobMulti = doquery("SELECT * FROM {{table}} WHERE `config_name` = 'noobprotectionmulti';", 'config', true);
            $UserPoints = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $user['id'] . "';", 'statpoints', true);
            $User2Points = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $GalaxyRowUser['id'] . "';", 'statpoints', true);
            $CurrentPoints = $UserPoints['total_points'];
            $RowUserPoints = $User2Points['total_points'];
            $CurrentLevel = $CurrentPoints * $NoobMulti['config_value'];
            $RowUserLevel = $RowUserPoints * $NoobMulti['config_value'];
            if ($GalaxyRowUser['bana'] == 1 AND
                    $GalaxyRowUser['urlaubs_modus'] == 1) {
                $Systemtatus2 = $lang['vacation_shortcut'] . " <a href=\"banned.php\"><span class=\"banned\">" . $lang['banned_shortcut'] . "</span></a>";
                $Systemtatus = "<span class=\"vacation\">";
            } elseif ($GalaxyRowUser['bana'] == 1) {
                $Systemtatus2 = "<a href=\"banned.php\"><span class=\"banned\">" . $lang['banned_shortcut'] . "</span></a>";
                $Systemtatus = "";
            } elseif ($GalaxyRowUser['urlaubs_modus'] == 1) {
                $Systemtatus2 = "<span class=\"vacation\">" . $lang['vacation_shortcut'] . "</span>";
                $Systemtatus = "<span class=\"vacation\">";
            } elseif ($GalaxyRowUser['onlinetime'] < (time() - 60 * 60 * 24 * 7) AND
                    $GalaxyRowUser['onlinetime'] > (time() - 60 * 60 * 24 * 28)) {
                $Systemtatus2 = "<span class=\"inactive\">" . $lang['inactif_7_shortcut'] . "</span>";
                $Systemtatus = "<span class=\"inactive\">";
            } elseif ($GalaxyRowUser['onlinetime'] < (time() - 60 * 60 * 24 * 28)) {
                $Systemtatus2 = "<span class=\"inactive\">" . $lang['inactif_7_shortcut'] . "</span><span class=\"longinactive\"> " . $lang['inactif_28_shortcut'] . "</span>";
                $Systemtatus = "<span class=\"longinactive\">";
            } elseif ($RowUserLevel < $CurrentPoints AND
                    $NoobProt['config_value'] == 1 AND
                    $NoobTime['config_value'] * 1000 > $RowUserPoints) {
                $Systemtatus2 = "<span class=\"noob\">" . $lang['weak_player_shortcut'] . "</span>";
                $Systemtatus = "<span class=\"noob\">";
            } elseif ($RowUserPoints > $CurrentLevel AND
                    $NoobProt['config_value'] == 1 AND
                    $NoobTime['config_value'] * 1000 > $CurrentPoints) {
                $Systemtatus2 = $lang['strong_player_shortcut'];
                $Systemtatus = "<span class=\"strong\">";
            } else {
                $Systemtatus2 = "";
                $Systemtatus = "";
            }
            $Systemtatus4 = $User2Points['total_rank'];
            if ($Systemtatus2 != '') {
                $Systemtatus6 = "<font color=\"white\">(</font>";
                $Systemtatus7 = "<font color=\"white\">)</font>";
            }
            if ($Systemtatus2 == '') {
                $Systemtatus6 = "";
                $Systemtatus7 = "";
            }
            $admin = "";
            if ($GalaxyRowUser['authlevel'] == LEVEL_ADMIN) {
                $admin = "<font color=\"red\"><blink>A</blink></font>";
            } else if ($GalaxyRowUser['authlevel'] == LEVEL_OPERATOR) {
                $admin = "<font color=\"lime\"><blink>O</blink></font>";
            } else if ($GalaxyRowUser['authlevel'] == LEVEL_MODERATOR) {
                $admin = "<font color=\"skyblue\"><blink>M</blink></font>";
            }
            $Systemtart = $User2Points['total_rank'];
            if (strlen($Systemtart) < 3) {
                $Systemtart = 1;
            } else {
                $Systemtart = (floor($User2Points['total_rank'] / 100) * 100) + 1;
            }
            $Result .= "<a style=\"cursor: pointer;\"";
            $Result .= " onmouseover='return overlib(\"";
            $Result .= "<table width=190>";
            $Result .= "<tr>";
            $Result .= "<td class=c colspan=2>" . $lang['Player'] . " " . $GalaxyRowUser['username'] . " " . $lang['Place'] . " " . $Systemtatus4 . "</td>";
            $Result .= "</tr><tr>";
            if ($GalaxyRowUser['id'] != $user['id']) {
                $Result .= "<td><a href=game.php?page=messages&action=write&id=" . $GalaxyRowUser['id'] . ">" . $lang['gl_sendmess'] . "</a></td>";
                $Result .= "</tr><tr>";
                $Result .= "<td><a href=game.php?page=buddy&a=2&u=" . $GalaxyRowUser['id'] . ">" . $lang['gl_buddyreq'] . "</a></td>";
                $Result .= "</tr><tr>";
            }
            $Result .= "<td><a href=game.php?page=stat&who=player&start=" . $Systemtart . ">" . $lang['gl_stats'] . "</a></td>";
            $Result .= "</tr>";
            $Result .= "</table>\"";
            $Result .= ", STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -40, OFFSETY, -40 );'";
            $Result .= " onmouseout='return nd();'>";
            $Result .= $Systemtatus;
            $Result .= $GalaxyRowUser["username"] . "</span>";
            $Result .= $Systemtatus6;
            $Result .= $Systemtatus;
            $Result .= $Systemtatus2;
            $Result .= $Systemtatus7 . " " . $admin;
            $Result .= "</span></a>";
        }
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyRowAlly($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $user;

        // Alliances
        $Result = "<th width=80>";
        if ($GalaxyRowUser['ally_id'] && $GalaxyRowUser['ally_id'] != 0) {
            $allyquery = doquery("SELECT * FROM {{table}} WHERE id=" . $GalaxyRowUser['ally_id'], "alliance", true);
            if ($allyquery) {
                $members_count = doquery("SELECT COUNT(DISTINCT(id)) FROM {{table}} WHERE ally_id=" . $allyquery['id'] . ";", "users", true);

                if ($members_count[0] > 1) {
                    $add = "s";
                } else {
                    $add = "";
                }

                $Result .= "<a style=\"cursor: pointer;\"";
                $Result .= " onmouseover='return overlib(\"";
                $Result .= "<table width=240>";
                $Result .= "<tr>";
                $Result .= "<td class=c>" . $lang['Alliance'] . " " . $allyquery['ally_name'] . " " . $lang['gl_with'] . " " . $members_count[0] . " " . $lang['gl_membre'] . $add . "</td>";
                $Result .= "</tr>";
                $Result .= "<th>";
                $Result .= "<table>";
                $Result .= "<tr>";
                $Result .= "<td><a href=game.php?page=alliance&action=ainfo&a=" . $allyquery['id'] . ">" . $lang['gl_ally_internal'] . "</a></td>";
                $Result .= "</tr><tr>";
                $Result .= "<td><a href=game.php?page=stat&start=101&who=ally>" . $lang['gl_stats'] . "</a></td>";
                if ($allyquery["ally_web"] != "") {
                    $Result .= "</tr><tr>";
                    $Result .= "<td><a href=" . $allyquery["ally_web"] . " target=_new>" . $lang['gl_ally_web'] . "</td>";
                }
                $Result .= "</tr>";
                $Result .= "</table>";
                $Result .= "</th>";
                $Result .= "</table>\"";
                $Result .= ", STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -40, OFFSETY, -40 );'";
                $Result .= " onmouseout='return nd();'>";
                if ($user['ally_id'] == $GalaxyRowPlayer['ally_id']) {
                    $Result .= "<span class=\"allymember\">" . $allyquery['ally_tag'] . "</span></a>";
                } else {
                    $Result .= $allyquery['ally_tag'] . "</a>";
                }
            }
        }
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyRowActions($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, $PlanetType) {
        global $lang, $user, $dpath, $CurrentMIP, $CurrentSystem, $CurrentGalaxy;
        // Icones action
        $Result = "<th style=\"white-space: nowrap;\" width=125>";
        if ($GalaxyRowPlayer['id'] != $user['id']) {

            if ($CurrentMIP <> 0) {
                if ($GalaxyRowUser['id'] != $user['id']) {
                    if ($GalaxyRowPlanet["galaxy"] == $CurrentGalaxy) {
                        $Range = GetMissileRange();
                        $SystemLimitMin = $CurrentSystem - $Range;
                        if ($SystemLimitMin < 1) {
                            $SystemLimitMin = 1;
                        }
                        $SystemLimitMax = $CurrentSystem + $Range;
                        if ($System <= $SystemLimitMax) {
                            if ($System >= $SystemLimitMin) {
                                $MissileBtn = true;
                            } else {
                                $MissileBtn = false;
                            }
                        } else {
                            $MissileBtn = false;
                        }
                    } else {
                        $MissileBtn = false;
                    }
                } else {
                    $MissileBtn = false;
                }
            } else {
                $MissileBtn = false;
            }

            if ($GalaxyRowPlayer && $GalaxyRowPlanet["destruyed"] == 0) {
                if ($user["settings_esp"] == "1" &&
                        $GalaxyRowPlayer['id']) {
                    $Result .= "<a href=# onclick=\"javascript:doit(6, " . $Galaxy . ", " . $System . ", " . $Planet . ", 1, " . $user["spio_anz"] . ");\" >";
                    $Result .= "<img src=" . $dpath . "img/e.gif alt=\"" . $lang['gl_espionner'] . "\" title=\"" . $lang['gl_espionner'] . "\" border=0></a>";
                    $Result .= "&nbsp;";
                }
                if ($user["settings_wri"] == "1" &&
                        $GalaxyRowPlayer['id']) {
                    $Result .= "<a href=game.php?page=messages&action=write&id=" . $GalaxyRowPlayer["id"] . ">";
                    $Result .= "<img src=" . $dpath . "img/m.gif alt=\"" . $lang['gl_sendmess'] . "\" title=\"" . $lang['gl_sendmess'] . "\" border=0></a>";
                    $Result .= "&nbsp;";
                }
                if ($user["settings_bud"] == "1" &&
                        $GalaxyRowPlayer['id']) {
                    $Result .= "<a href=game.php?page=buddy&a=2&amp;u=" . $GalaxyRowPlayer['id'] . " >";
                    $Result .= "<img src=" . $dpath . "img/b.gif alt=\"" . $lang['gl_buddyreq'] . "\" title=\"" . $lang['gl_buddyreq'] . "\" border=0></a>";
                    $Result .= "&nbsp;";
                }
                if ($user["settings_mis"] == "1" AND
                        $MissileBtn == true &&
                        $GalaxyRowPlayer['id']) {
                    $Result .= "<a href=game.php?page=galaxy&action=2&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&current=" . $user['current_planet'] . " >";
                    $Result .= "<img src=" . $dpath . "img/r.gif alt=\"" . $lang['gl_mipattack'] . "\" title=\"" . $lang['gl_mipattack'] . "\" border=0></a>";
                }
            }
        }
        $Result .= "</th>";

        return $Result;
    }

    function GalaxyLegendPopup() {
        global $lang;

        $Result = "<a href=# style=\"cursor: pointer;\"";
        $Result .= " onmouseover='return overlib(\"";

        $Result .= "<table width=240>";
        $Result .= "<tr>";
        $Result .= "<td class=c colspan=2>" . $lang['Legend'] . "</td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>" . $lang['Strong_player'] . "</td><td><span class=strong>" . $lang['strong_player_shortcut'] . "</span></td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>" . $lang['Weak_player'] . "</td><td><span class=noob>" . $lang['weak_player_shortcut'] . "</span></td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>" . $lang['Way_vacation'] . "</td><td><span class=vacation>" . $lang['vacation_shortcut'] . "</span></td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>" . $lang['Pendent_user'] . "</td><td><span class=banned>" . $lang['banned_shortcut'] . "</span></td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>" . $lang['Inactive_7_days'] . "</td><td><span class=inactive>" . $lang['inactif_7_shortcut'] . "</span></td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>" . $lang['Inactive_28_days'] . "</td><td><span class=longinactive>" . $lang['inactif_28_shortcut'] . "</span></td>";
        $Result .= "</tr><tr>";
        $Result .= "<td width=220>Admin</td><td><font color=lime><blink>A</blink></font></td>";
        $Result .= "</tr>";
        $Result .= "</table>";
        $Result .= "\");' onmouseout='return nd();'>";
        $Result .= $lang['Legend'] . "</a>";




        return $Result;
    }

}
