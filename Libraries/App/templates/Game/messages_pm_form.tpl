{block name="title" prepend}{/block}
{block name="content"}        <script src="scripts/cntchar.js" type="text/javascript"></script>
        <br />
        <center>
            <form action="game.php?page=messages&type=write&id={$id}" method="post">
                <table width="519">
                    <tr>
                        <td class="c" colspan="2">{$lang['mess_pagetitle']}</td>
                    </tr>
                    <tr>
                        <th>{$lang['mess_recipient']}</th>
                        <th><input type="text" name="to" size="40" value="{$to}" /></th>
                    </tr>
                    <tr>
                        <th>{$lang['mess_subject']}</th>
                        <th><input type="text" name="subject" size="40" maxlength="40" value="{$subject}" /></th>
                    </tr>
                    <tr>
                        <th>{$lang['mess_message']}(<span id="cntChars">0</span> / 5000 {$lang['mess_characters']})</th>
                        <th><textarea name="text" cols="40" rows="10" size="100" onkeyup="javascript:cntchar(5000)">{$text}</textarea></th>
                    </tr>
                    <tr>
                        <th colspan="2"><input type="submit" value="{$lang['mess_envoyer']}" /></th>
                    </tr>
                </table>
            </form>
        </center>{/block}