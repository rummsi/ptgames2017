{block name="title" prepend}{/block}
{block name="content"}        <center>
            <table width="519">
                <tr>
                    <td class="c">{$te_dt_name}</td>
                </tr><tr>
                    <td class="c">1</td>
                </tr>{if $te_dt_id == 12}
                <tr><th>{$lang['tech']['31']} ({$lang['level']} 1)</th></tr>
                <tr><td class="c">2</td><tr>
                <tr><th>{$lang['tech']['3']} ({$lang['level']} 5)</th></tr>
                <tr><th>{$lang['tech']['113']} ({$lang['level']} 3) <a href="game.php?page=techdetails&tech=113">[i]</a></th></tr>{/if}
            </table>
            <table width="270">
                <tbody>
                    <tr>
                        <td class="c" align="center" nowrap="nowrap">
                        {$lang['te_dt_tx_pre']} <a href="game.php?page=infos&gid={$te_dt_id}">{$te_dt_name}</a></td>
                    </tr>
                    <tr>
                        <td class="c">1</td>
                    </tr>
                    <tr>
                        <td class="l" align="center">
                            <table border="0" width="100%">
                                <tbody>
                                    <tr>
                                        <td align="left"><font color="#00ff00">Laboratoire de recherche (Niveau 1)</font></td>
                                        <td align="right"><a href="game.php?page=techdetails&techid=31">[i]</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </center>{/block}