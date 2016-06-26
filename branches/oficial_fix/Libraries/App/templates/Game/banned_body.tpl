{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="600" style="color:#FFFFFF">
            <tr>
                <td class="c" colspan="6">{$lang['ban_title']}</td>
            </tr><tr>
                <th>{$lang['ban_name']}</th>
                <th>{$lang['ban_reason']}</th>
                <th>{$lang['ban_from']}</th>
                <th>{$lang['ban_to']}</th>
                <th>{$lang['ban_by']}</th>
            </tr>{while $u = mysqli_fetch_array($query)}
            <tr>
                <td class=b><center><b>{$u[1]}</center></td></b>
                <td class=b><center><b>{$u[2]}</center></b></td>
                <td class=b><center><b>{date("d/m/Y G:i:s", $u[4])}</center></b></td>
                <td class=b><center><b>{date("d/m/Y G:i:s", $u[5])}</center></b></td>
                <td class=b><center><b>{$u[6]}</center></b></td>
            </tr><!--{$i++}-->{/while}{if $i == "0"}<tr><th class=b colspan=6>Il n'y a pas de joueurs bannis</th></tr>{else}<tr><th class=b colspan=6>Il y a {$i} joueurs bannis</th></tr>{/if}
            </table>
        </center>{/block}