{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form action="game.php?page=search" method="post">
                <table width="519">
                    <tr>
                        <td class="c">{$lang['Search_in_all_game']}</td>
                    </tr>
                    <tr>
                        <th>
                            <select name="type">
                                <option value="playername"{$type_playername}>{$lang['Player_name']}</option>
                                <option value="planetname"{$type_planetname}>{$lang['Planet_name']}</option>
                                <option value="allytag"{$type_allytag}>{$lang['Alliance_tag']}</option>
                                <option value="allyname"{$type_allyname}>{$lang['Alliance_name']}</option>
                            </select>
                            &nbsp;&nbsp;
                            <input type="text" name="searchtext" value="{$searchtext}"/>
                            &nbsp;&nbsp;
                            <input type="submit" value="{$lang['Search']}" />
                        </th>
                    </tr>
               </table>
            </form>{if isset($searchtext) && isset($type)}{if $type_playername}
            <table width="519">
                <tr>
                    <td class="c">{$lang['Name']}</td>
                    <td class="c">&nbsp;</td>
                    <td class="c">{$lang['Alliance']}</td>
                    <td class="c">{$lang['Planet']}</td>
                    <td class="c">{$lang['Coordinated']}</td>
                    <td class="c">{$lang['Position']}</td></tr>
                </tr>
                {$result_list}
            </table>{elseif $type_planetname}
            <table width="519">
                <tr>
                    <td class="c">{$lang['Name']}</td>
                    <td class="c">&nbsp;</td>
                    <td class="c">{$lang['Alliance']}</td>
                    <td class="c">{$lang['Planet']}</td>
                    <td class="c">{$lang['Coordinated']}</td>
                    <td class="c">{$lang['Position']}</td></tr>
                </tr>
                {$result_list}
            </table>{elseif $type_allytag}
            <table width="519">
                <tr>
                    <td class="c">{$lang['Tag']}</td>
                    <td class="c">{$lang['Name']}</td>
                    <td class="c">{$lang['Members']}</td>
                    <td class="c">{$lang['Points']}</td>
                </tr>
                {$result_list}
            </table>{elseif $type_allyname}
            <table width="519">
                <tr>
                    <td class="c">{$lang['Tag']}</td>
                    <td class="c">{$lang['Name']}</td>
                    <td class="c">{$lang['Members']}</td>
                    <td class="c">{$lang['Points']}</td>
                </tr>{if ($result_list != '')}
                {$result_list}{/if}
            </table>{/if}
           {/if}
        </center>{/block}
