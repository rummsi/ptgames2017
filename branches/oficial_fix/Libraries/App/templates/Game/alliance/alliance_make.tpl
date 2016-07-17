{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form action="game.php?page=alliance&type=make&yes=1" method="POST">
                <table width=519>
                    <tr>
                       <td class="c" colspan=2>{$lang['make_alliance']}</td>
                    </tr>
                    <tr>
                        <th>{$lang['alliance_tag']} (3-8 {$lang['characters']})</th>
                        <th><input type="text" name="atag" size=8 maxlength=8 value=""></th>
                    </tr>
                    <tr>
                        <th>{$lang['allyance_name']} (max. 35 {$lang['characters']})</th>
                        <th><input type="text" name="aname" size=20 maxlength=30 value=""></th>
                    </tr>
                    <tr>
                        <th colspan=2><input type="submit" value="{$lang['Make']}"></th>
                    </tr>
                </table>
            </form>
        </center>{/block}
