        <div id="header_top">
            <center>
                <table class="header">
                    <tbody>
                        <tr class="header">
                            <td class="header">
                                <center>
                                    <table class="header">
                                        <tbody>
                                            <tr class="header">
                                                <td class="header">
                                                    <img src="{$dpath}planeten/small/s_{$image}.jpg" height="50" width="50">
                                                </td>
                                                <td  class="header" valign="middle">
                                                    <select size="1" onChange="eval('location=\''+this.options[this.selectedIndex].value+'\'');">{while $CurPlanet = mysql_fetch_array($ThisUsersPlanets)}{if ($destruyed == 0)}
                                                        <option {if $CurPlanet['id'] == $current_planet}selected="selected" {/if}value="?page={$page}&cp={$CurPlanet['id']}&mode={$mode}&re=0">
                                                            {$CurPlanet['name']}&nbsp;[{$CurPlanet['galaxy']}:{$CurPlanet['system']}:{$CurPlanet['planet']}]&nbsp;&nbsp;
                                                        </option>{/if}{/while}
                                                        {*$planetlist*}
                                                    </select>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </td>
                            <td class="header">
                                <table style="width: 508px;" class="header" id="resources" padding-right="30" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="header">
                                            <td class="header" align="center" width="140"><img src="{$dpath}images/metall.gif" border="0" height="22" width="42"></td>
                                            <td class="header" align="center" width="140"><img src="{$dpath}images/kristall.gif" border="0" height="22" width="42"></td>
                                            <td class="header" align="center" width="140"><img src="{$dpath}images/deuterium.gif" border="0" height="22" width="42"></td>
                                            <td class="header" align="center" width="140"><img src="{$dpath}images/energie.gif" border="0" height="22" width="42"></td>
                                            <td class="header" align="center" width="140"><img src="{$dpath}images/message.gif" border="0" height="22" width="42"></td>
                                        </tr>
                                        <tr class="header">
                                            <td class="header" align="center" width="140"><i><b><font color="#ffffff">{$Metal}</font></b></i></td>
                                            <td class="header" align="center" width="140"><i><b><font color="#ffffff">{$Crystal}</font></b></i></td>
                                            <td class="header" align="center" width="140"><i><b><font color="#ffffff">{$Deuterium}</font></b></i></td>
                                            <td class="header" align="center" width="140"><i><b><font color="#ffffff">{$Energy}</font></b></i></td>
                                            <td class="header" align="center" width="140"><i><b><font color="#ffffff">{$Message}</font></b></i></td>
                                        </tr>
                                        <tr class="header">
                                            <td class="header" align="center" width="140"><font>{if $metal > $metal_max}
                                                                                                    {colorRed(pretty_number($metal))}
                                                                                                {else}
                                                                                                    {pretty_number($metal)}
                                                                                                {/if}</font></td>
                                            <td class="header" align="center" width="140"><font>{if $crystal > $crystal_max}
                                                                                                    {colorRed(pretty_number($crystal))}
                                                                                                {else}
                                                                                                    {pretty_number($crystal)}
                                                                                                {/if}</font></td>
                                            <td class="header" align="center" width="140"><font>{if $deuterium > $deuterium_max}
                                                                                                    {colorRed(pretty_number($deuterium))}
                                                                                                {else}
                                                                                                    {pretty_number($deuterium)}
                                                                                                {/if}</font></td>
                                            <td class="header" align="center" width="140"><font>{if $energy_max > $energy_used}
                                                                                                    {colorRed(pretty_number($energy_used))}
                                                                                                {else}
                                                                                                    {pretty_number($energy_used)}
                                                                                                {/if}/{pretty_number($energy_max)}</font></td>
                                            <td class="header" align="center" width="140"><font>{if $new_message > 0}
                                                                                                    <a href="game.php?page=messages">[ {$new_message} ]</a>
                                                                                                {else}
                                                                                                    0
                                                                                                {/if}</font></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>