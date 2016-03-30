{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <table border="0" cellpadding="0" cellspacing="1" width="519">
                <tr height="20">
                    <td colspan="2" class="c">
                        {$fsc_shortcut} (<a href="game.php?page=fleetshortcut&mode=add">{$fsc_add}</a>)
                    </td>
                </tr>
                {if $user['fleet_shortcut']}
                    {$i = 0}
                    {$e = 0}
                    {foreach $scarray as $a => $b}
                        {if $b != ""}
                            {$c = explode(',', $b)}
                            {if $i == 0}
                                <tr height="20">
                            {/if}
                                    <th>
                                        <a href="game.php?page=fleetshortcut&a={$e++}">{$c[0]} {$c[1]}:{$c[2]}:{$c[3]}
                                            {if $c[4]==2}{$fsc_s_debris}{elseif $c[4]==3}{$fsc_s_moon}{/if}
                                        </a>
                                    </th>
                            {if $i==1}
                                </tr>
                            {/if}
                        {/if}
                    {/foreach}
                    {if $i == 1}<th></th></tr>{/if}
                {else}
                    <th colspan="2">{$fsc_no_shortcuts}</th>
                {/if}
                <tr>
                    <td colspan=2 class=c>
                        <a href=game.php?page=fleet>{$fsc_return}</a>
                    </td>
                </tr>
            </table>
        </center>
{/block}