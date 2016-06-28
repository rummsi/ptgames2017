{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br>
            {if $a == 2 && isset($u)}
                {if isset($u) && $u["id"] != $user["id"]}
                    <script src="scripts/cntchar.js" type="text/javascript"></script>
                    <script src="scripts/win.js" type="text/javascript"></script>
                    <form action=game.php?page=buddy method=post>
                        <input type=hidden name=a value=1>
                        <input type=hidden name=s value=3>
                        <input type=hidden name=e value=1>
                        <input type=hidden name=u value={$u["id"]}>
                        <table width=519>
                            <tr>
                                <td class=c colspan=2>{$lang['Buddy_request']}</td>
                            </tr>
                            <tr>
                                <th>{$lang['Player']}</th>
                                <th>{$u["username"]}</th>
                            </tr>
                            <tr>
                                <th>{$lang['Request_text']} (<span id="cntChars">0</span> / 5000 {$lang['characters']})</th>
                                <th><textarea name=text cols=60 rows=10 onKeyUp="javascript:cntchar(5000)"></textarea></th>
                            </tr>
                            <tr>
                                <td class=c><a href="javascript:back();">{$lang['Back']}</a></td>
                                <td class=c><input type=submit value='{$lang['Send']}'></td>
                            </tr>
                        </table>
                    </form>
                {elseif $u["id"] == $user["id"]}
                    {message($lang['You_cannot_ask_yourself_for_a_request'], $lang['Buddy_request'])}
                {/if}
            {/if}
        </center>
{/block}