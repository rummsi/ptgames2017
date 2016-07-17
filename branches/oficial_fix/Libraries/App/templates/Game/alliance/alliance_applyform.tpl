{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <h1>{$lang['Send_Apply']}</h1>
            <table width=519>
                <form action="game.php?page=alliance&type=apply&allyid={$allyid}" method=POST>
                    <tr>
                        <td class=c colspan=2>{$Write_to_alliance}</td>
                    </tr>
                    <tr>
                        <th>{$lang['Message']} (<span id="cntChars">{$chars_count}</span> / 6000 {$lang['characters']})</th>
                        <th><textarea name="text" cols=40 rows=10 onkeyup="javascript:cntchar(6000)">{$text_apply}</textarea></th>
                    </tr>
                    <tr>
                        <th>{$lang['Help']}</th>
                        <th><input type=submit name="further" value="{$lang['Reload']}"></th>
                    </tr>
                    <tr>
                        <th colspan=2><input type=submit name="further" value="{$lang['Send']}"></th>
                    </tr>
                </form>
            </table>
            <script language="JavaScript" src="js/wz_tooltip.js"></script>
        </center>{/block}