{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <table width="519">
                <tr>
                    <td class="c">{$Name}</td>
                </tr><tr>
                    <td class="c">1</td>
                </tr>
                {$Liste}
            </table>
            <table width="270">
                <tbody>
                    <tr>
                        <td class="c" align="center" nowrap="nowrap">
                            {$te_dt_tx_pre} <a href="game.php?page=infos&gid={$te_dt_id}">'{$te_dt_name}'</a>
                        </td>
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
        </center>
{/block}