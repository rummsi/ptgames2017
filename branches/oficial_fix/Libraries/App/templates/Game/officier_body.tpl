{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="569">
                <tr>
                    <td class="c" colspan="3">{$off_points} {$alv_points}</td>
                </tr>
                {for $Officier = 601; $Officier <= 615; $Officier++}
                    {$Result = IsOfficierAccessible($CurrentUser, $Officier)}
                    {if $Result != 0}
                <tr>
                    <th width=120><img src="images/officiers/{$Officier}.jpg" align="top" width="120" height="120" /></th>
                    <th align=center><font color="#ff8900">{$off_tx_lvl} {$CurrentUser[$resource[$Officier]]}</font>{$off_desc[$Officier]}</th>
                    <th align=center>
                    {if $Result == 1}
                        <a href="game.php?page=officier&action=2&offi={$Officier}">
                            <font color="#00ff00">{$lang_link[$Officier]}</font>
                    {else}{/if}</th>
                </tr>
                    {/if}
                {/for}
            </table>
        </center>{/block}