{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="569">
                {foreach $lang['tech'] as $Element => $ElementName}
                    {if !isset($resource[$Element])}
                <tr>
                    <td class="c">{$ElementName}</td>
                    <td class="c">{$lang['Requirements']}</td>
                </tr>{else}{if isset($requirements[$Element])}
                <tr>
                    <th class="l" width="40%">
                        <table width="100%">
                            <tr>
                                <td style="background-color: transparent;" align="left">
                                    <a href="game.php?page=infos&gid={$Element}">{$ElementName}</a>
                                </td>
                                <td style="background-color: transparent;" align="right">
                                    <a href="game.php?page=techdetails&techid={$Element}">{$lang['treeinfo']}</a>
                                </td>
                            </tr>
                        </table>
                    </th>
                    <th class="l" width="60%">
                        <table width="100%">
                            <tr>
                                <td style="background-color: transparent;" align="left">{foreach $requirements[$Element] as $ResClass => $Level}{if isset($user[$resource[$ResClass]]) && $user[$resource[$ResClass]] >= $Level}
                                    <font color="#00ff00">{elseif isset($planetrow[$resource[$ResClass]]) && $planetrow[$resource[$ResClass]] >= $Level}<font color="#00ff00">{else}<font color="#ff0000">{/if} 
                                {$lang['tech'][$ResClass]} ({$lang['level']} {$Level})</font><br>
                            {/foreach}
                                </td>
                            </tr>
                        </table>
                    </th>
                </tr>{else}
                <tr>
                    <th class="l" width="40%">
                        <table width="100%">
                            <tr>
                                <td style="background-color: transparent;" align="left">
                                    <a href="game.php?page=infos&gid={$Element}">{$ElementName}</a>
                                </td>
                                <td style="background-color: transparent;" align="right"></td>
                            </tr>
                        </table>
                    </th>
                    <th class="l" width="60%">
                        <table width="100%">
                            <tr>
                                <td style="background-color: transparent;" align="left"></td>
                            </tr>
                        </table>
                    </th>
                </tr>{/if}{/if}
                {/foreach}
            </table>
        </center>{/block}