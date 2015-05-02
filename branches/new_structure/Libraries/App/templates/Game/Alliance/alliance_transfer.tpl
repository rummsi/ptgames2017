{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br>
            <form method="post" action="game.php?page=alliance&mode=admin&edit=give">
                <table width="600" border="0" cellpadding="0" cellspacing="1" align="center">
                    <tr>
                        <td class="c" colspan="4" align="center">A qui voulez vous donner l alliance ?</td>
                    </tr>
                    <tr>
                        <th colspan="3">Choisissez le joueur a qui vous souhaitez donner l alliance :</th>
                        <th colspan="1">
                            <select name="id">{$select}</select>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="4"><input type="submit" value="Donner"></th>
                    </tr>
                </table>
            </form>
        </center>
{/block}