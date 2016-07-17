{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form action="" method=POST>
                <table width=519>
                    <tr>
                        <td class=c colspan=2>{$question}</td>
                    </tr>
                    <tr>
                        <th>{$lang['New_name']}</th>
                        <th><input type=text name={$name}> <input type=submit value="{$lang['Change']}"></th>
                    </tr>
                    <tr>
                        <td class="c" colspan="9"><a href="game.php?page=alliance&type=admin&edit=ally">{$lang['Return_to_overview']}</a></td>
                    </tr>
                </table>
            </form>
        </center>{/block}