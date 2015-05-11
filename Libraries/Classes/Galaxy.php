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
 * @Galaxy.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/mai/2015 12:34:52
 */

/**
 * Description of Galaxy
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class Galaxy {

    static function InsertGalaxyScripts($CurrentPlanet) {
        global $lang;
        $Script = "<div style=\"top: 10px;\" id=\"content\">";
        $Script .= "<script language=\"JavaScript\">\n";
        $Script .= "function galaxy_submit(value) {\n";
        $Script .= "	document.getElementById('auto').name = value;\n";
        $Script .= "	document.getElementById('galaxy_form').submit();\n";
        $Script .= "}\n\n";

        $Script .= "function fenster(target_url,win_name) {\n";
        $Script .= "	var new_win = window.open(target_url,win_name,'resizable=yes,scrollbars=yes,menubar=no,toolbar=no,width=640,height=480,top=0,left=0');\n";
        $Script .= "	new_win.focus();\n";
        $Script .= "}\n";
        $Script .= "</script>\n";

        $Script .= "<script language=\"JavaScript\" src=\"scripts/tw-sack.js\"></script>\n";

        $Script .= "<script type=\"text/javascript\">\n\n";
        $Script .= "var ajax = new sack();\n";
        $Script .= "var strInfo = \"\";\n";

        $Script .= "function whenResponse () {\n";
        $Script .= "	retVals   = this.response.split(\"|\");\n";
        $Script .= "	Message   = retVals[0];\n";
        $Script .= "	Infos     = retVals[1];\n";
        $Script .= "	retVals   = Infos.split(\" \");\n";
        $Script .= "	UsedSlots = retVals[0];\n";
        $Script .= "	SpyProbes = retVals[1];\n";
        $Script .= "	Recyclers = retVals[2];\n";
        $Script .= "	Missiles  = retVals[3];\n";
        $Script .= "	retVals   = Message.split(\";\");\n";
        $Script .= "	CmdCode   = retVals[0];\n";
        $Script .= "	strInfo   = retVals[1];\n";
        $Script .= "	addToTable(\"done\", \"success\");\n";
        $Script .= "	changeSlots( UsedSlots );\n";
        $Script .= "	setShips(\"probes\", SpyProbes );\n";
        $Script .= "	setShips(\"recyclers\", Recyclers );\n";
        $Script .= "	setShips(\"missiles\", Missiles );\n";
        $Script .= "}\n\n";

        $Script .= "function doit (order, galaxy, system, planet, planettype, shipcount) {\n";
        $Script .= "	ajax.requestFile = \"flotenajax.php?action=send\";\n";
        $Script .= "	ajax.runResponse = whenResponse;\n";
        $Script .= "	ajax.execute = true;\n\n";
        $Script .= "	ajax.setVar(\"thisgalaxy\", " . $CurrentPlanet["galaxy"] . ");\n";
        $Script .= "	ajax.setVar(\"thissystem\", " . $CurrentPlanet["system"] . ");\n";
        $Script .= "	ajax.setVar(\"thisplanet\", " . $CurrentPlanet["planet"] . ");\n";
        $Script .= "	ajax.setVar(\"thisplanettype\", " . $CurrentPlanet["planet_type"] . ");\n";
        $Script .= "	ajax.setVar(\"mission\", order);\n";
        $Script .= "	ajax.setVar(\"galaxy\", galaxy);\n";
        $Script .= "	ajax.setVar(\"system\", system);\n";
        $Script .= "	ajax.setVar(\"planet\", planet);\n";
        $Script .= "	ajax.setVar(\"planettype\", planettype);\n";
        $Script .= "	if (order == 6)\n";
        $Script .= "		ajax.setVar(\"ship210\", shipcount);\n";
        $Script .= "	if (order == 7) {\n";
        $Script .= "		ajax.setVar(\"ship208\", 1);\n\n";
        $Script .= "		ajax.setVar(\"ship203\", 2);\n\n";
        $Script .= "	}\n";
        $Script .= "	if (order == 8)\n";
        $Script .= "		ajax.setVar(\"ship209\", shipcount);\n\n";
        $Script .= "	ajax.runAJAX();\n";
        $Script .= "}\n\n";

        $Script .= "function addToTable(strDataResult, strClass) {\n";
        $Script .= "	var e = document.getElementById('fleetstatusrow');\n";
        $Script .= "	var e2 = document.getElementById('fleetstatustable');\n";
        $Script .= "	e.style.display = '';\n";
        $Script .= "	if(e2.rows.length > 2) {\n";
        $Script .= "		e2.deleteRow(2);\n";
        $Script .= "	}\n";
        $Script .= "	var row = e2.insertRow(0);\n";
        $Script .= "	var td1 = document.createElement(\"td\");\n";
        $Script .= "	var td1text = document.createTextNode(strInfo);\n";
        $Script .= "	td1.appendChild(td1text);\n";
        $Script .= "	var td2 = document.createElement(\"td\");\n";
        $Script .= "	var span = document.createElement(\"span\");\n";
        $Script .= "	var spantext = document.createTextNode(strDataResult);\n";
        $Script .= "	var spanclass = document.createAttribute(\"class\");\n";
        $Script .= "	spanclass.nodeValue = strClass;\n";
        $Script .= "	span.setAttributeNode(spanclass);\n";
        $Script .= "	span.appendChild(spantext);\n";
        $Script .= "	td2.appendChild(span);\n";
        $Script .= "	row.appendChild(td1);\n";
        $Script .= "	row.appendChild(td2);\n";
        $Script .= "}\n\n";

        $Script .= "function changeSlots(slotsInUse) {\n";
        $Script .= "	var e = document.getElementById('slots');\n";
        $Script .= "	e.innerHTML = slotsInUse;\n";
        $Script .= "}\n\n";

        $Script .= "function setShips(ship, count) {\n";
        $Script .= "	var e = document.getElementById(ship);\n";
        $Script .= "	e.innerHTML = count;\n";
        $Script .= "}\n";

        $Script .= "</script>\n";

        return $Script;
    }

    static function ShowGalaxySelector($Galaxy, $System) {
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

        $Result = "<form action=\"game.php?page=galaxy&mode=1\" method=\"post\" id=\"galaxy_form\">";
        $Result .= "<input type=\"hidden\" id=\"auto\" value=\"dr\" >";
        $Result .= "<table border=\"0\">";
        $Result .= "<tbody><tr><td>";

        $Result .= "<table><tbody><tr>";
        $Result .= "<td class=\"c\" colspan=\"3\">" . $lang['Galaxy'] . "</td></tr><tr>";
        $Result .= "<td class=\"l\"><input name=\"galaxyLeft\" value=\"&lt;-\" onclick=\"galaxy_submit('galaxyLeft')\" type=\"button\"></td>";
        $Result .= "<td class=\"l\"><input name=\"galaxy\" value=\"" . $Galaxy . "\" size=\"5\" maxlength=\"3\" tabindex=\"1\" type=\"text\"></td>";
        $Result .= "<td class=\"l\"><input name=\"galaxyRight\" value=\"-&gt;\" onclick=\"galaxy_submit('galaxyRight')\" type=\"button\"></td>";
        $Result .= "</tr></tbody></table>";

        $Result .= "</td><td>";

        $Result .= "<table><tbody><tr>";
        $Result .= "<td class=\"c\" colspan=\"3\">" . $lang['Solar_system'] . "</td></tr><tr>";
        $Result .= "<td class=\"l\"><input name=\"systemLeft\" value=\"&lt;-\" onclick=\"galaxy_submit('systemLeft')\" type=\"button\"></td>";
        $Result .= "<td class=\"l\"><input name=\"system\" value=\"" . $System . "\" size=\"5\" maxlength=\"3\" tabindex=\"2\" type=\"text\"></td>";
        $Result .= "<td class=\"l\"><input name=\"systemRight\" value=\"-&gt;\" onclick=\"galaxy_submit('systemRight')\" type=\"button\"></td>";
        $Result .= "</tr></tbody></table>";

        $Result .= "</td>";
        $Result .= "</tr><tr>";
        $Result .= "<td class=\"l\" colspan=\"2\" align=\"center\"> <input value=\"" . $lang['Afficher'] . "\" type=\"submit\"></td>";
        $Result .= "</tr>";
        $Result .= "</tbody></table>";
        $Result .= "</form>";

        return $Result;
    }

    static function ShowGalaxyMISelector($Galaxy, $System, $Planet, $Current, $MICount) {
        global $lang;

        $Result = "<form action=\"raketenangriff.php?c=" . $Current . "&mode=2&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "\" method=\"POST\">";
        $Result .= "<tr>";
        $Result .= "<table border=\"0\">";
        $Result .= "<tr>";
        $Result .= "<td class=\"c\" colspan=\"2\">";
        $Result .= $lang['gm_launch'] . " [" . $Galaxy . ":" . $System . ":" . $Planet . "]";
        $Result .= "</td>";
        $Result .= "</tr>";
        $Result .= "<tr>";
        $String = sprintf($lang['gm_restmi'], $MICount);
        $Result .= "<td class=\"c\">" . $String . " <input type=\"text\" name=\"SendMI\" size=\"2\" maxlength=\"7\" /></td>";
        $Result .= "<td class=\"c\">" . $lang['gm_target'] . " <select name=\"Target\">";
        $Result .= "<option value=\"all\" selected>" . $lang['gm_all'] . "</option>";
        $Result .= "<option value=\"0\">" . $lang['tech'][401] . "</option>";
        $Result .= "<option value=\"1\">" . $lang['tech'][402] . "</option>";
        $Result .= "<option value=\"2\">" . $lang['tech'][403] . "</option>";
        $Result .= "<option value=\"3\">" . $lang['tech'][404] . "</option>";
        $Result .= "<option value=\"4\">" . $lang['tech'][405] . "</option>";
        $Result .= "<option value=\"5\">" . $lang['tech'][406] . "</option>";
        $Result .= "<option value=\"6\">" . $lang['tech'][407] . "</option>";
        $Result .= "<option value=\"7\">" . $lang['tech'][408] . "</option>";
        $Result .= "</select>";
        $Result .= "</td>";
        $Result .= "</tr>";
        $Result .= "<tr>";
        $Result .= "<td class=\"c\" colspan=\"2\"><input type=\"submit\" name=\"aktion\" value=\"" . $lang['gm_send'] . "\"></td>";
        $Result .= "</tr>";
        $Result .= "</table>";
        $Result .= "</form>";

        return $Result;
    }

    static function ShowGalaxyTitles($Galaxy, $System) {
        global $lang;

        $Result = "\n";
        $Result .= "<tr>";
        $Result .= "<td class=c colspan=8>" . $lang['Solar_system'] . " " . $Galaxy . ":" . $System . "</td>";
        $Result .= "</tr><tr>";
        $Result .= "<td class=c>" . $lang['Pos'] . "</td>";
        $Result .= "<td class=c>" . $lang['Planet'] . "</td>";
        $Result .= "<td class=c>" . $lang['Name'] . "</td>";
        $Result .= "<td class=c>" . $lang['Moon'] . "</td>";
        $Result .= "<td class=c>" . $lang['Debris'] . "</td>";
        $Result .= "<td class=c>" . $lang['Player'] . "</td>";
        $Result .= "<td class=c>" . $lang['Alliance'] . "</td>";
        $Result .= "<td class=c>" . $lang['Actions'] . "</td>";
        $Result .= "</tr>";

        return $Result;
    }

    static function ShowGalaxyRows($Galaxy, $System) {
        global $lang, $planetcount, $CurrentRC, $dpath, $user;

        $Result = "";
        for ($Planet = 1; $Planet < 16; $Planet++) {
            unset($GalaxyRowPlanet);
            unset($GalaxyRowMoon);
            unset($GalaxyRowPlayer);
            unset($GalaxyRowAlly);

            $GalaxyRow = doquery("SELECT * FROM {{table}} WHERE `galaxy` = '" . $Galaxy . "' AND `system` = '" . $System . "' AND `planet` = '" . $Planet . "';", 'galaxy', true);

            $Result .= "\n";
            $Result .= "<tr>"; // Depart de ligne
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
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowPos($Planet, $GalaxyRow);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowPlanet($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 1);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowPlanetName($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 1);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowMoon($GalaxyRow, $GalaxyRowMoon, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 3);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowDebris($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 2);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowUser($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 0);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowAlly($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 0);
            $Result .= "\n";
            $Result .= Galaxy::GalaxyRowActions($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, 0);
            $Result .= "\n";
            $Result .= "</tr>";
        }

        return $Result;
    }

    static function ShowGalaxyFooter($Galaxy, $System, $CurrentMIP, $CurrentRC, $CurrentSP) {
        global $lang, $maxfleet_count, $fleetmax, $planetcount;

        $Result = "";
        if ($planetcount == 1) {
            $PlanetCountMessage = $planetcount . " " . $lang['gf_cntmone'];
        } elseif ($planetcount == 0) {
            $PlanetCountMessage = $lang['gf_cntmnone'];
        } else {
            $PlanetCountMessage = $planetcount . " " . $lang['gf_cntmsome'];
        }
        $LegendPopup = Galaxy::GalaxyLegendPopup();
        $Recyclers = pretty_number($CurrentRC);
        $SpyProbes = pretty_number($CurrentSP);

        $Result .= "\n";
        $Result .= "<tr>";
        $Result .= "<th width=\"30\">16</th>";
        $Result .= "<th colspan=7>";
        $Result .= "<a href=game.php?page=fleet&galaxy=" . $Galaxy . "&amp;system=" . $System . "&amp;planet=16;planettype=1&amp;target_mission=15>" . $lang['gf_unknowsp'] . "</a>";
        $Result .= "</th>";
        $Result .= "</tr>";

        $Result .= "\n";
        $Result .= "<tr>";
        $Result .= "<td class=c colspan=6>( " . $PlanetCountMessage . " )</td>";
        $Result .= "<td class=c colspan=2>" . $LegendPopup . "</td>";
        $Result .= "</tr>";

        $Result .= "\n";
        $Result .= "<tr>";
        $Result .= "<td class=c colspan=3><span id=\"missiles\">" . $CurrentMIP . "</span> " . $lang['gf_mi_title'] . "</td>";
        $Result .= "<td class=c colspan=3><span id=\"slots\">" . $maxfleet_count . "</span>/" . $fleetmax . " " . $lang['gf_fleetslt'] . "</td>";
        $Result .= "<td class=c colspan=2>";
        $Result .= "<span id=\"recyclers\">" . $Recyclers . "</span> " . $lang['gf_rc_title'] . "<br>";
        $Result .= "<span id=\"probes\">" . $SpyProbes . "</span> " . $lang['gf_sp_title'] . "</td>";
        $Result .= "</tr>";

        $Result .= "\n";
        $Result .= "<tr style=\"display: none;\" id=\"fleetstatusrow\">";
        $Result .= "<th class=c colspan=8><!--<div id=\"fleetstatus\"></div>-->";
        $Result .= "<table style=\"font-weight: bold\" width=\"100%\" id=\"fleetstatustable\">";
        $Result .= "<!-- will be filled with content later on while processing ajax replys -->";
//	$Result .= "<tr style=\"display: none; align:left\" id=\"fleetstatusrow\">";
//	$Result .= "<th colspan=8><div style=\"align:left\" id=\"fleetstatus\"></div></th>";
//	$Result .= "</tr>";
        $Result .= "</table>";
        $Result .= "</th>";
        $Result .= "\n";
        $Result .= "</tr>";
        /*
          <tr style=\"display: none;\" id=\"fleetstatusrow\"><th colspan="8"><!--<div id="fleetstatus"></div>-->
          <table style="font-weight: bold;" width=100% id="fleetstatustable">
          <!-- will be filled with content later on while processing ajax replys -->
          </table>
          </th>
          </tr>
         */
        return $Result;
    }

    static function GalaxyRowPos($Planet, $GalaxyRow) {
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

    static function GalaxyRowPlanet($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
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

            $Result .= "<a style=\"cursor: pointer;\"";
            $Result .= " onmouseover='return overlib(\"";
            $Result .= "<table width=240>";
            $Result .= "<tr>";
            $Result .= "<td class=c colspan=2>";
            $Result .= $lang['gl_planet'] . " " . stripslashes($GalaxyRowPlanet["name"]) . " [" . $Galaxy . ":" . $System . ":" . $Planet . "]";
            $Result .= "</td>";
            $Result .= "</tr>";
            $Result .= "<tr>";
            $Result .= "<th width=80>";
            $Result .= "<img src=" . $dpath . "planeten/small/s_" . $GalaxyRowPlanet["image"] . ".jpg height=75 width=75 />";
            $Result .= "</th>";
            $Result .= "<th align=left>";
            $Result .= $MissionType6Link;
            $Result .= $PhalanxTypeLink;
            $Result .= $MissionType1Link;
            $Result .= $MissionType5Link;
            $Result .= $MissionType4Link;
            $Result .= $MissionType3Link;
            $Result .= "</th>";
            $Result .= "</tr>";
            $Result .= "</table>\"";
//		$Result .= ", STICKY, MOUSEOFF, DELAY, ". ($user["settings_tooltiptime"] * 1000) .", CENTER, OFFSETX, -40, OFFSETY, -40 );'";
            $Result .= ", STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -40, OFFSETY, -40 );'";
            $Result .= " onmouseout='return nd();'>";
            $Result .= "<img src=" . $dpath . "planeten/small/s_" . $GalaxyRowPlanet["image"] . ".jpg height=30 width=30>";
//		$Result .= $GalaxyRowPlanet["name"];
            $Result .= "</a>";
        }
        $Result .= "</th>";

        return $Result;
    }

    static function GalaxyRowPlanetName($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
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

        if ($GalaxyRowPlanet['last_update'] > (time() - 59 * 60) AND
                $GalaxyRowUser['id'] != $user['id']) {
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

    static function GalaxyRowMoon($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
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

    static function GalaxyRowDebris($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
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

    static function GalaxyRowUser($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
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
                $Result .= "<td><a href=game.php?page=messages&mode=write&id=" . $GalaxyRowUser['id'] . ">" . $lang['gl_sendmess'] . "</a></td>";
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

    static function GalaxyRowAlly($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowUser, $Galaxy, $System, $Planet, $PlanetType) {
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
                $Result .= "<td><a href=game.php?page=alliance&mode=ainfo&a=" . $allyquery['id'] . ">" . $lang['gl_ally_internal'] . "</a></td>";
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

    static function GalaxyRowActions($GalaxyRow, $GalaxyRowPlanet, $GalaxyRowPlayer, $Galaxy, $System, $Planet, $PlanetType) {
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
                    $Result .= "<a href=game.php?page=messages&mode=write&id=" . $GalaxyRowPlayer["id"] . ">";
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
                    $Result .= "<a href=game.php?page=galaxy&mode=2&galaxy=" . $Galaxy . "&system=" . $System . "&planet=" . $Planet . "&current=" . $user['current_planet'] . " >";
                    $Result .= "<img src=" . $dpath . "img/r.gif alt=\"" . $lang['gl_mipattack'] . "\" title=\"" . $lang['gl_mipattack'] . "\" border=0></a>";
                }
            }
        }
        $Result .= "</th>";

        return $Result;
    }

    static function GalaxyLegendPopup() {
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
