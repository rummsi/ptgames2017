{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="519">
                <tr>
                    <td class="c" colspan="9">{$lang['Members_list']} ({$lang['Ammount']}: {$memberzahl})</td>
                </tr>
                <tr>
                    <th>{$lang['Number']}</th>
                    <th><a href="game.php?page=alliance&type=admin&edit=members&sort1=1&sort2={$s}">{$lang['Name']}</a></th>
                    <th> </th>
                    <th><a href="game.php?page=alliance&type=admin&edit=members&sort1=2&sort2={$s}">{$lang['Position']}</a></th>
                    <th><a href="game.php?page=alliance&type=admin&edit=members&sort1=3&sort2={$s}">{$lang['Points']}</a></th>
                    <th><a href="game.php?page=alliance&type=admin&edit=members&sort1=0&sort2={$s}">{$lang['Coordinated']}</a></th>
                    <th><a href="game.php?page=alliance&type=admin&edit=members&sort1=4&sort2={$s}">{$lang['Member_from']}</a></th>
                    <th><a href="game.php?page=alliance&type=admin&edit=members&sort1=5&sort2={$s}">Duree d inactivite</a></th>
                    <th>Fonction</th>
                </tr>{$memberslist}
                <tr>
                    <td class="c" colspan="9"><a href="game.php?page=alliance&type=admin&edit=ally">{$lang['Return_to_overview']}</a></td>
                </tr>
            </table>
            <script src="scripts/wz_tooltip.js" type="text/javascript"></script>
        </center>{/block}
