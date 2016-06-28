{block name="title" prepend}{/block}
{block name="content"}        <center>
            <form action="game.php?page=notes" method=post>
                {$inputs}
                <table width=519>
                    <tr>
                        <td class=c colspan=2>{$TITLE}</td>
                    </tr>
                    <tr>
                        <th>{$lang['Priority']}</th>
                        <th>
                            <select name=u>
                              {$c_Options}
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>{$lang['Subject']}</th>
                        <th>
                            <input type="text" name="title" size="30" maxlength="30" value="{$title1}">
                        </th>
                    </tr>
                    <tr>
                        <th>{$lang['Note']} (<span id="cntChars">{$cntChars}</span> / 5000 {$lang['characters']})</th>
                        <th>
                        <textarea name="text" cols="60" rows="10" onkeyup="javascript:cntchar(5000)">{$text}</textarea>
                        </th>
                    </tr>
                    <tr>
                        <td class="c"><a href="game.php?page=notes">{$lang['Back']}</a></td>
                        <td class="c">
                            <input type="reset" value="{$lang['Reset']}">
                            <input type="submit" value="{$lang['Save']}">
                        </td>
                    </tr>
                </table>
            </form>
        </center>{/block}
