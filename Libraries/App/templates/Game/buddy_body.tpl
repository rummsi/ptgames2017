{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width=519>
                <tr>
                    <td class=c colspan=6>
                        {if ($a == 1)}
                            {($e == 1) ? $lang['My_requests'] : $lang['Anothers_requests']}
                        {else}
                            {$lang['Buddy_list']}
                        {/if}</td>
                </tr>
                {if !isset($a)}
                    <tr>
                        <th colspan=6>
                            <a href=game.php?page=buddy&a=1>{$lang['Requests']}</a>
                        </th>
                    </tr>
                    <tr>
                        <th colspan=6>
                            <a href=game.php?page=buddy&a=1&e=1>{$lang['My_requests']}</a>
                        </th>
                    </tr>
                    <tr>
                        <td class=c></td>
                        <td class=c>{$lang['Name']}</td>
                        <td class=c>{$lang['Alliance']}</td>
                        <td class=c>{$lang['Coordinates']}</td>
                        <td class=c>{$lang['Position']}</td>
                        <td class=c></td>
                    </tr>
                {/if}
                {while $b = mysqli_fetch_array($buddyrow)}
                    <!--{$i++}-->
                    {if (isset($i) && isset($a))}
                        <tr>
                            <td class=c></td>
                            <td class=c>{$lang['User']}</td>
                            <td class=c>{$lang['Alliance']}</td>
                            <td class=c>{$lang['Coordinates']}</td>
                            <td class=c>{$lang['Text']}</td>
                            <td class=c></td>
                        </tr>
                    {/if}
                    <tr>
                        <th width=20>{$i}</th>
                        <th>
                            <a href=game.php?page=messages&mode=write&id={$u["id"]}>{$u["username"]}</a>
                        </th>
                        <th>{if $u["ally_id"] != 0}<a href=game.php?page=alliance&mode=ainfo&a={$u["id"]}>{$u["ally_name"]}</a>{/if}</th>
                        <th>
                            <a href="game.php?page=galaxy&action=3&galaxy={$u["galaxy"]}&system={$u["system"]}">{$u["galaxy"]}:{$u["system"]}:{$u["planet"]}</a>
                        </th>
                        <th>
                            {if isset($a)}
                                {$b["text"]}
                            {else}
                                <font color={if $u["onlinetime"] + 60 * 10 >= time()}
                                                lime>{$lang['On']}
                                            {elseif $u["onlinetime"] + 60 * 20 >= time()}
                                                yellow>{$lang['15_min']}
                                            {else}
                                            red>{$lang['Off']}
                                            {/if}
                                </font>
                            {/if}
                        </th>
                        <th>
                            {if (isset($a) && isset($e))}
                                <a href=game.php?page=buddy&s=1&bid={$b["id"]}>{$lang['Delete_request']}</a>
                            {elseif (isset($a))}
                                <a href=game.php?page=buddy&s=1&bid={$b["id"]}>{$lang['Ok']}</a><br/>
                                <a href=game.php?page=buddy&a=1&s=1&bid={$b["id"]}>{$lang['Reject']}</a></a>
                            {else}
                                <a href=game.php?page=buddy&s=1&bid={$b["id"]}>{$lang['Delete']}</a>
                            {/if}
                        </th>
                    </tr>
                {/while}
                {if (!isset($i))}
                    <tr>
                        <th colspan=6>{$lang['There_is_no_request']}</th>
                    </tr>
                {/if}
                {if ($a == 1)}
                    <tr>
                        <td colspan=6 class=c>
                            <a href=game.php?page=buddy>{$lang['Back']}</a>
                        </td>
                    </tr>
                {/if}
            </table>
        </center>{/block}