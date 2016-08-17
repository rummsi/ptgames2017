{block name="title" prepend}{/block}
{block name="content"}
                            <div id="planet" class="shortHeader">
                                <h2>{str_replace('%s', $CurrentPlanet['name'], $lang['Production_of_resources_in_the_planet'])}</h2>
                            </div>
                            <div class="contentRS">
                                <div class="headerRS"><a href="game.php?page=resources" class="close_details close_ressources"></a></div>
                                <div class="mainRS">
                                    <form method="POST" action="#">
                                        <input type="hidden" name="saveSettings" value="1">
                                        <input type='hidden' name='token' value='741e46d1807538560c2b4b56362143cc' />
                                        <table cellpadding="0" cellspacing="0" class="list listOfResourceSettingsPerPlanet" style="margin-top:0px;">
                                            <tr>
                                                <td colspan="7" id="factor">
                                                    <div class="secondcol">
                                                        <div style="width:376px; margin: 0px auto;">
                                                            <span class="factorbutton">
                                                                <input class="btn_blue" type="submit" value="{$lang['Calcule']}" />
                                                            </span>
                                                            <br class="clearfloat" />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th colspan="2"></th>
                                                <th>{$lang['Metal']}</th>
                                                <th>{$lang['Crystal']}</th>
                                                <th>{$lang['Deuterium']}</th>
                                                <th>{$lang['Energy']}</th>
                                                <th></th>
                                            </tr>
                                            <tr class="alt">
                                                <td colspan="2" class="label">{$lang['Basic_income']}</td>
                                                <td class="undermark textRight">
                                                    <span class="tooltipCustom" title="{$metal_basic_income}">{$metal_basic_income}</span>
                                                </td>
                                                <td class="undermark textRight">
                                                    <span class="tooltipCustom" title="{$crystal_basic_income}">{$crystal_basic_income}</span>
                                                </td>
                                                <td class="normalmark textRight">
                                                    <span class="tooltipCustom" title="{$deuterium_basic_income}">{$deuterium_basic_income}</span>
                                                </td>
                                                <td class="normalmark textRight">
                                                    <span class="tooltipCustom" title="{$energy_basic_income}">{$energy_basic_income}</span>
                                                </td>
                                                <td></td>
                                            </tr>
                                            {$resource_row}
                                            <tr class="">
                                                <td colspan="2" class="label">Total:</td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="">{$metal_total}</span>
                                                </td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="">{$crystal_total}</span>
                                                </td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="">{$deuterium_total}</span>
                                                </td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="">{$energy_total}</span>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr class="">
                                                <td colspan="2" class="label">{$lang['Stores_capacity']}</td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="{pretty_number($CurrentPlanet['metal_max'])}">{$metal_max}</span>
                                                </td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="{pretty_number($CurrentPlanet['crystal_max'])}">{$crystal_max}</span>
                                                </td>
                                                <td class="normalmark left2">
                                                    <span class="tooltipCustom" title="{pretty_number($CurrentPlanet['deuterium_max'])}">{$deuterium_max}</span>
                                                </td>
                                                <td>-</td>
                                                <td></td>
                                            </tr>
                                            <tr class="summary alt">
                                                <td colspan="2" class="label"><em>{$lang['Daily']}:</em></td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$daily_metal}">{colorNumber($daily_metal)}</span>
                                                </td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$daily_metal}">{colorNumber($daily_crystal)}</span>
                                                </td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$daily_crystal}">{colorNumber($daily_deuterium)}</span>
                                                </td>
                                                <td class="undermark"></td>
                                                <td></td>
                                            </tr>
                                            <tr class="">
                                                <td colspan="2" class="label"><em>{$lang['Weekly']}:</em></td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$weekly_metal}">{colorNumber($weekly_metal)}</span>
                                                </td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$weekly_crystal}">{colorNumber($weekly_crystal)}</span>
                                                </td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$weekly_deuterium}">{colorNumber($weekly_deuterium)}</span>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr class="alt">
                                                <td colspan="2" class="label"><em>{$lang['Monthly']}:</em></td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$monthly_metal}">{colorNumber($monthly_metal)}</span>
                                                </td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$monthly_crystal}">{colorNumber($monthly_crystal)}</span>
                                                </td>
                                                <td class="undermark">
                                                    <span class="tooltipCustom" title="{$monthly_deuterium}">{colorNumber($monthly_deuterium)}</span>
                                                </td>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </form>
                                </div>
                                <div class="footerRS"></div>
                            </div>
                            <br class="clearfloat" />{/block}