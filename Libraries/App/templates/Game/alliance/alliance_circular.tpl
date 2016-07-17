{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form action="game.php?page=alliance&type=circular&sendmail=1" method="post">
                <table width=519>
                    <tr>
                        <td class="c" colspan=2>{$lang['Send_circular_mail']}</td>
                    </tr>
                    <tr>
                        <th>{$lang['Destiny']}</th>
                        <th>
                            <select name="r">
                                <option value="0">{$lang['All_players']}</option>{if $allianz_raenge}{foreach $allianz_raenge as $id => $array}
                                <option value="{$id + 1}">{$array['name']}</option>{/foreach}{/if}
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>{$lang['Text_mail']} (<span id="cntChars">0</span> / 5000 {$lang['characters']})</th>
                        <th>
                            <textarea name="text" cols="60" rows="10" onkeyup="javascript:cntchar(5000)"></textarea>
                        </th>
                    </tr>
                    <tr>
                        <td class="c"><a href="game.php?page=alliance">{$lang['Back']}</a></td>
                        <td class="c">
                            <input type="reset" value="{$lang['Clear']}">
                            <input type="submit" value="{$lang['Send']}">
                        </td>
                    </tr>
                </table>
            </form>
        </center>{/block}
