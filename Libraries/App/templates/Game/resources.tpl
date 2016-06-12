{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form action="" method="post">
                <table width="569">
                    <tbody>
                        <tr>
                            <td class="c" colspan="5">{$Production_of_resources_in_the_planet}</td>
                        </tr>
                        <tr>
                            <th height="22"></th>
                            <th width="60">{$lang['Metal']}</th>
                            <th width="60">{$lang['Crystal']}</th>
                            <th width="60">{$lang['Deuterium']}</th>
                            <th width="60">{$lang['Energy']}</th>
                        </tr>
                        <tr>
                            <th height="22">{$lang['Basic_income']}</th>
                            <td class="k">{$metal_basic_income}</td>
                            <td class="k">{$crystal_basic_income}</td>
                            <td class="k">{$deuterium_basic_income}</td>
                            <td class="k">{$energy_basic_income}</td>
                        </tr>
                        {$resource_row}
                        <tr>
                            <th height="22">{$lang['Stores_capacity']}</th>
                            <td class="k">{$metal_max}</td>
                            <td class="k">{$crystal_max}</td>
                            <td class="k">{$deuterium_max}</td>
                            <td class="k"><font color="#00ff00">-</font></td>
                            <td class="k"><input name="action" value="{$lang['Calcule']}" type="submit"></td>
                        </tr>
                        <tr>
                            <th height="22">Total:</th>
                            <td class="k">{$metal_total}</td>
                            <td class="k">{$crystal_total}</td>
                            <td class="k">{$deuterium_total}</td>
                            <td class="k">{$energy_total}</td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <br>
            <table width="569">
                <tbody>
                    <tr>
                        <td class="c" colspan="4">{$lang['Widespread_production']}</td>
                    </tr>
                    <tr>
                        <th>&nbsp;</th>
                        <th>{$lang['Daily']}</th>
                        <th>{$lang['Weekly']}</th>
                        <th>{$lang['Monthly']}</th>
                    </tr>
                    <tr>
                        <th>{$lang['Metal']}</th>
                        <th>{$daily_metal}</th>
                        <th>{$weekly_metal}</th>
                        <th>{$monthly_metal}</th>
                    </tr>
                    <tr>
                        <th>{$lang['Crystal']}</th>
                        <th>{$daily_crystal}</th>
                        <th>{$weekly_crystal}</th>
                        <th>{$monthly_crystal}</th>
                    </tr>
                    <tr>
                        <th>{$lang['Deuterium']}</th>
                        <th>{$daily_deuterium}</th>
                        <th>{$weekly_deuterium}</th>
                        <th>{$monthly_deuterium}</th>
                    </tr>
                </tbody>
            </table>
            <br>
            <table width="569">
                <tbody>
                    <tr>
                        <td class="c" colspan="3">{$lang['Storage_state']}</td>
                    </tr>
                    <tr>
                        <th>{$lang['Metal']}</th>
                        <th>{$metal_storage}</th>
                        <th width="250">
                            <div style="border: 1px solid rgb(153, 153, 255); width: 250px;">
                                <div id="AlmMBar" style="background-color: {$metal_storage_barcolor}; width: {$metal_storage_bar}px;">
                                    &nbsp;
                                </div>
                            </div>
                        </th>
                    </tr><tr>
                        <th>{$lang['Crystal']}</th>
                        <th>{$crystal_storage}</th>
                        <th width="250">
                            <div style="border: 1px solid rgb(153, 153, 255); width: 250px;">
                                <div id="AlmCBar" style="background-color: {$crystal_storage_barcolor}; width: {$crystal_storage_bar}px; opacity: 0.98;">
                                    &nbsp;
                                </div>
                            </div>
                        </th>
                    </tr><tr>
                        <th>{$lang['Deuterium']}</th>
                        <th>{$deuterium_storage}</th>
                        <th width="250">
                            <div style="border: 1px solid rgb(153, 153, 255); width: 250px;">
                                <div id="AlmDBar" style="background-color: {$deuterium_storage_barcolor}; width: {$deuterium_storage_bar}px;">
                                &nbsp;
                                </div>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
            <br>
        </center>{/block}