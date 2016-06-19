{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form method="post">
                <table width="519">
                    <tr>
                        <td class="c">{$lang['stat_title']}: {$stat_date}</td>
                    </tr>
                    <tr>
                        <th align="center">
                            <table>
                                <tr>
                                    <th width="8%" style="background-color: transparent;">&nbsp;</th>
                                    <th style="background-color: transparent;">{$lang['stat_show']}&nbsp;</th>
                                    <th style="background-color: transparent;">
                                        <select name="who" onChange="javascript:document.forms[0].submit()">
                                            <option value="1"{(($who == "1") ? " SELECTED" : "")}>{$lang['stat_player']}</option>
                                            <option value="2"{(($who == "2") ? " SELECTED" : "")}>{$lang['stat_allys']}</option>
                                        </select>
                                    </th>
                                    <th style="background-color: transparent;">&nbsp;{$lang['stat_by']}&nbsp;</th>
                                    <th style="background-color: transparent;">
                                        <select name="type" onChange="javascript:document.forms[0].submit()">
                                            <option value="1"{(($type == "1") ? " SELECTED" : "")}>{$lang['stat_main']}</option>
                                            <option value="2"{(($type == "2") ? " SELECTED" : "")}>{$lang['stat_fleet']}</option>
                                            <option value="3"{(($type == "3") ? " SELECTED" : "")}>{$lang['stat_research']}</option>
                                            <option value="4"{(($type == "4") ? " SELECTED" : "")}>{$lang['stat_building']}</option>
                                            <option value="5"{(($type == "5") ? " SELECTED" : "")}>{$lang['stat_defenses']}</option>
                                        </select>
                                    </th>
                                    <th style="background-color: transparent;">&nbsp;{$lang['stat_range']}&nbsp;</th>
                                    <th style="background-color: transparent;">
                                        <select name="range" onChange="javascript:document.forms[0].submit()">
                                            {$range}
                                        </select>
                                    </th>
                                    <th width="8%" style="background-color: transparent;">&nbsp;</th>
                                <tr>
                            </table>
                        </th>
                    </tr>
                </table>
            </form>
            <table width="519">
                {$stat_header}
                {$stat_values}
            </table>
        </center>{/block}