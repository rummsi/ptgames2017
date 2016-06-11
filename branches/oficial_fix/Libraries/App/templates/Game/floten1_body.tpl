{block name="title" prepend}{/block}
{block name="content"}        <script type="text/javascript" src="scripts/flotten.js"></script>
        <script type="text/javascript">
            function getStorageFaktor() {
                return 1
            }
        </script>
        <form action="game.php?page=floten2" method="post">
            {$FleetHiddenBlock}
            <input type="hidden" name="speedallsmin"   value="{if !$fleet['fleetlist']}{message($lang['fl_unselectall'], $lang['fl_error'], "game.php?page=fleet", 1)}{else}{min($speedalls)}{/if}" />
            <input type="hidden" name="usedfleet"      value="{str_rot13(base64_encode(serialize($fleet['fleetarray'])))}" />
            <input type="hidden" name="thisgalaxy"     value="{$planetrow['galaxy']}" />
            <input type="hidden" name="thissystem"     value="{$planetrow['system']}" />
            <input type="hidden" name="thisplanet"     value="{$planetrow['planet']}" />
            <input type="hidden" name="galaxyend"      value="{intval($_POST['galaxy'])}" />
            <input type="hidden" name="systemend"      value="{intval($_POST['system'])}" />
            <input type="hidden" name="planetend"      value="{intval($_POST['planet'])}" />
            <input type="hidden" name="speedfactor"    value="{GetGameSpeedFactor()}" />
            <input type="hidden" name="thisplanettype" value="{$planetrow['planet_type']}" />
            <input type="hidden" name="thisresource1"  value="{floor($planetrow['metal'])}" />
            <input type="hidden" name="thisresource2"  value="{floor($planetrow['crystal'])}" />
            <input type="hidden" name="thisresource3"  value="{floor($planetrow['deuterium'])}" />
            <br>
            <div>
                <center>
                    <table width="519" border="0" cellpadding="0" cellspacing="1">
                        <tr height="20">
                            <td colspan="2" class="c">{$lang['fl_floten1_ttl']}</td>
                        </tr>
                        <tr height="20">
                            <th width="50%">{$lang['fl_dest']}</th>
                            <th>
                                <input name="galaxy" size="3" maxlength="2" onChange="shortInfo()" onKeyUp="shortInfo()" value="{$g}" />
                                <input name="system" size="3" maxlength="3" onChange="shortInfo()" onKeyUp="shortInfo()" value="{$s}" />
                                <input name="planet" size="3" maxlength="2" onChange="shortInfo()" onKeyUp="shortInfo()" value="{$p}" />
                                <select name="planettype" onChange=\"shortInfo()\" onKeyUp=\"shortInfo()\">
                                    <option value="1"{(($t == 1) ? " SELECTED" : "" )}>{$lang['fl_planet']}</option>
                                    <option value="2"{(($t == 2) ? " SELECTED" : "" )}>{$lang['fl_ruins']}</option>
                                    <option value="3"{(($t == 3) ? " SELECTED" : "" )}>{$lang['fl_moon']}</option>
                                </select>
                            </th>
                        </tr>
                        <tr height="20">
                            <th>{$lang['fl_speed']}</th>
                            <th>
                                <select name="speed" onChange="shortInfo()" onKeyUp="shortInfo()">{foreach $speed as $a => $b}
                                    <option value="{$a}">{$b}</option>{/foreach}
                                </select> %
                            </th>
                        </tr>
                        <tr height="20">
                            <th>{$lang['fl_dist']}</th>
                            <th><div id="distance">-</div></th>
                        </tr>
                        <tr height="20">
                            <th>{$lang['fl_fltime']}</th>
                            <th><div id="duration">-</div></th>
                        </tr>
                        <tr height="20">
                        {*/* A faire assez rapidement (faut juste savoir comment)
                            <th>{$lang['fl_time_go']}</th>
                            <th><font color="lime"><div id="llegada1"><font>{gmdate("H:i:s")}</font></div></font></th>
                        </tr>
                        <tr height="20">
                            <th>". $lang['fl_time_back'] ."</th>
                            <th><font color="lime"><div id="llegada2"><font>{gmdate("H:i:s")}</font></div></font></th>
                        </tr>
                        <tr height="20">
                         */*}
                            <th>{$lang['fl_deute_need']}</th>
                            <th><div id="consumption">-</div></th>
                        </tr>
                        <tr height="20">
                            <th>{$lang['fl_speed_max']}</th>
                            <th><div id="maxspeed">-</div></th>
                        </tr>
                        <tr height="20">
                            <th>{$lang['fl_max_load']}</th>
                            <th><div id="storage">-</div></th>
                        </tr>{*// Gestion des raccourcis sur la galaxie*}
                        <tr height="20">
                            <td colspan="2" class="c">{$lang['fl_shortcut']} <a href="game.php?page=fleetshortcut">{$lang['fl_shortlnk']}</a></td>
                        </tr>{if $fleet_shortcut}<!--{$scarray = explode("\r\n", $fleet_shortcut)}--><!--{$i = 0}-->{foreach $scarray as $a => $b}{if $b != ""}{$c = explode(',', $b)}{if $i == 0}
                        <tr height="20">{/if}
                            <th>
                                <a href="javascript:setTarget({$c[1]},{$c[2]},{$c[3]},{$c[4]}); shortInfo();" >{$c[0]} {$c[1]}:{$c[2]}:{$c[3]} {*// Signalisation du type de raccourci ...*}{*// (P)lanete*}{*// (D)ebris*}{*// (L)une*}
                                    {if $c[4] == 1}{$lang['fl_shrtcup1']}{elseif $c[4] == 2}{$lang['fl_shrtcup2']}{elseif $c[4] == 3}{$lang['fl_shrtcup3']}{/if}
                                </a>
                            </th>{if $i == 1}
                        </tr>{/if}{if $i == 1} {$i = 0}{else}{$i = 1}{/if}{/if}{/foreach}{if $i == 1}
                            <th></th>
                        </tr>{/if}{else}
                        <tr height="20">
                            <th colspan="2">{$lang['fl_noshortc']}</th>
                        </tr>{/if}
                        <tr height="20">
                            <td colspan="2" class="c">{$lang['fl_myplanets']}</td>
                        </tr>{*// Gestion des raccourcis vers ses propres colonies ou planetes*}{if mysqli_num_rows($kolonien) > 1}<!--{$i = 0}{$w = 0}{$tr = true}-->{while $row = mysqli_fetch_array($kolonien)}{if $w == 0 && $tr}
                        <tr height="20"><!--{$tr = false}-->{/if}{if $w == 2}</tr><!-- {$w = 0}{$tr = true}-->{/if}
                    {if ($currentplanet['galaxy'] == $row['galaxy'] &&
                        $currentplanet['system'] == $row['system'] &&
                        $currentplanet['planet'] == $row['planet'] &&
                        $currentplanet['planet_type'] == $row['planet_type'])}
				{*<th><a href="javascript:setTarget('.$row['galaxy'].','.$row['system'].','.$row['planet'].','.$row['planet_type'].'); shortInfo();">{if $row['planet_type'] == 3}{$lang['fl_shrtcup3']}{/if} '.$row['galaxy'].':'.$row['system'].':'.$row['planet'].'</a></th>*}{else}
                            <th><a href="javascript:setTarget({$row['galaxy']},{$row['system']},{$row['planet']},{$row['planet_type']}); shortInfo();">{if $row['planet_type'] == 3}{$lang['fl_shrtcup3']}{/if} {$row['galaxy']}:{$row['system']}:{$row['planet']}</a></th><!--{$w++}{$i++}-->{/if}{/while}
                    {if $i % 2 != 0}<th>&nbsp;</th></tr>{elseif $w == 2}</tr>{/if}{else}<th colspan="2">{$lang['fl_nocolonies']}</th>{/if}
                        </tr>
                        <tr height="20"><td colspan="2" class="c">{$lang['fl_grattack']}</td></tr>
                        <tr height="20"><th colspan="2">-</th></tr>
                        <tr height="20"><th colspan="2"><input type="submit" value="{$lang['fl_continue']}" /></th></tr>
                    </table>
                </center>
            </div>
            <input type="hidden" name="maxepedition" value="{$_POST['maxepedition']}" />
            <input type="hidden" name="curepedition" value="{$_POST['curepedition']}" />
            <input type="hidden" name="target_mission" value="{$target_mission}" />
        </form>
        <script>javascript:shortInfo(); </script>{/block}