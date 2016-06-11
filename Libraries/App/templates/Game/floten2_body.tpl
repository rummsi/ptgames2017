{block name="title" prepend}{/block}
{block name="content"}        <script type="text/javascript" src="scripts/flotten.js"></script>
            <script type="text/javascript">
                function getStorageFaktor() {
                    return 1;
                }
            </script>
            <br>
            <center>
                <form action="game.php?page=floten3" method="post">
                    <input type="hidden" name="thisresource1"      value="{floor($planetrow["metal"])}" />
                    <input type="hidden" name="thisresource2"      value="{floor($planetrow["crystal"])}" />
                    <input type="hidden" name="thisresource3"      value="{floor($planetrow["deuterium"])}" />
                    <input type="hidden" name="consumption"        value="{$consumption}" />
                    <input type="hidden" name="dist"               value="{$distance}" />
                    <input type="hidden" name="speedfactor"        value="{$SpeedFactor}" />
                    <input type="hidden" name="thisgalaxy"         value="{$_POST["thisgalaxy"]}" />
                    <input type="hidden" name="thissystem"         value="{$_POST["thissystem"]}" />
                    <input type="hidden" name="thisplanet"         value="{$_POST["thisplanet"]}" />
                    <input type="hidden" name="galaxy"             value="{$_POST["galaxy"]}" />
                    <input type="hidden" name="system"             value="{$_POST["system"]}" />
                    <input type="hidden" name="planet"             value="{$_POST["planet"]}" />
                    <input type="hidden" name="thisplanettype"     value="{$_POST["thisplanettype"]}" />
                    <input type="hidden" name="planettype"         value="{$_POST["planettype"]}" />
                    <input type="hidden" name="speedallsmin"       value="{$_POST["speedallsmin"]}" />
                    <input type="hidden" name="speed"              value="{$_POST['speed']}" />
                    <input type="hidden" name="speedfactor"        value="{$SpeedFactor}" />
                    <input type="hidden" name="usedfleet"          value="{$_POST["usedfleet"]}" />
                    <input type="hidden" name="maxepedition"       value="{$_POST['maxepedition']}" />
                    <input type="hidden" name="curepedition"       value="{$_POST['curepedition']}" />
                    {foreach $fleetarray as $Ship => $Count}<input type="hidden" name="ship{$Ship}"            value="{$Count}" />
                    <input type="hidden" name="capacity{$Ship}"        value="{$pricelist[$Ship]['capacity']}" />
                    <input type="hidden" name="consumption{$Ship}"     value="{GetShipConsumption($Ship, $user)}" />
                    <input type="hidden" name="speed{$Ship}"           value="{GetFleetMaxSpeed("", $Ship, $user)}" />
                    {/foreach}<table border="0" cellpadding="0" cellspacing="1" width="519">
                        <tbody>
                            <tr align="left" height="20">
                                <td class="c" colspan="2">{if $_POST['thisplanettype'] == 1}{$_POST['thisgalaxy']}:{$_POST['thissystem']}:{$_POST['thisplanet']} - {$lang['fl_planet']}{elseif $_POST['thisplanettype'] == 3}{$_POST['thisgalaxy']}:{$_POST['thissystem']}:{$_POST['thisplanet']} - {$lang['fl_moon']}{/if}</td>
                            </tr>
                            <tr align="left" valign="top">
                                <th width="50%">
                                    <table border="0" cellpadding="0" cellspacing="0" width="259">
                                        <tbody>
                                            <tr height="20">
                                                <td class="c" colspan="2">{$lang['fl_mission']}</td>
                                            </tr>{if count($missiontype) > 0}{if $planet == 16}
                                            <tr height="20">
                                                <th>
                                                    <input type="radio" name="mission" value="15" checked="checked">{$lang['type_mission'][15]}<br /><br />
                                                    <font color="red">{$lang['fl_expe_warning']}</font>
                                                </th>
                                            </tr>{else}<!--{$i = 0}-->{foreach $missiontype as $a => $b}
                                            <tr height="20">
                                                <th>
                                                    <input id="inpuT_{$i}" type="radio" name="mission" value="{$a}"{if $mission == $a} checked="checked"{/if}>
                                                    <label for="inpuT_{$i}">{$b}</label><br>
                                                </th>
                                            </tr><!--{$i++}-->{/foreach} {/if}{else}
                                        <tr height="20">
                                            <th><font color="red">{$lang['fl_bad_mission']}</font></th>
                                        </tr>{/if}
                                        </tbody>
                                    </table>
                                </th>
                                <th>
                                    <table border="0" cellpadding="0" cellspacing="0" width="259">
                                        <tbody>
                                            <tr height="20">
                                                <td colspan="3" class="c">{$lang['fl_ressources']}</td>
                                            </tr>
                                            <tr height="20">
                                                <th>{$lang['Metal']}</th>
                                                <th><a href="javascript:maxResource('1');">{$lang['fl_selmax']}</a></th>
                                                <th><input name="resource1" alt="{$lang['Metal']} {floor($planetrow["metal"])}" size="10" onchange="calculateTransportCapacity();" type="text"></th>
                                            </tr>
                                            <tr height="20">
                                                <th>{$lang['Crystal']}</th>
                                                <th><a href="javascript:maxResource('2');">{$lang['fl_selmax']}</a></th>
                                                <th><input name="resource2" alt="{$lang['Crystal']} {floor($planetrow["crystal"])}" size="10" onchange="calculateTransportCapacity();" type="text"></th>
                                            </tr>
                                            <tr height="20">
                                                <th>{$lang['Deuterium']}</th>
                                                <th><a href="javascript:maxResource('3');">{$lang['fl_selmax']}</a></th>
                                                <th><input name="resource3" alt="{$lang['Deuterium']} {floor($planetrow["deuterium"])}" size="10" onchange="calculateTransportCapacity();" type="text"></th>
                                            </tr>
                                            <tr height="20">
                                                <th>{$lang['fl_space_left']}</th>
                                                <th colspan="2"><div id="remainingresources">-</div></th>
                                            </tr>
                                            <tr height="20">
                                                <th colspan="3"><a href="javascript:maxResources()">{$lang['fl_allressources']}</a></th>
                                            </tr>
                                            <tr height="20">
                                                <th colspan="3">&nbsp;</th>
                                            </tr>{if $planet == 16}
                                            <tr height="20">
                                                <td class="c" colspan="3">{$lang['fl_expe_staytime']}</td>
                                            </tr>
                                            <tr height="20">
                                                <th colspan="3">
                                                    <select name="expeditiontime" >
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                    </select>
                                                    {$lang['fl_expe_hours']}
                                                </th>
                                            </tr>{elseif $missiontype_5 != ''}
                                            <tr height="2">
                                                <td class="c" colspan="3">{$lang['fl_expe_staytime']}</td>
                                            </tr>
                                            <tr height="20">
                                                <th colspan="3">
                                                    <select name="holdingtime" >
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="4">4</option>
                                                        <option value="8">8</option>
                                                        <option value="16">16</option>
                                                        <option value="32">32</option>
                                                    </select>
                                                    {$lang['fl_expe_hours']}
                                                </th>
                                            </tr>{/if}
                                        </tbody>
                                    </table>
                                </th>
                            </tr>
                            <tr height="20">
                                <th colspan="2"><input accesskey="z" value="{$lang['fl_continue']}" type="submit"></th>
                            </tr>
                        </tbody>
                    </table>
            </form>
        </center>{/block}