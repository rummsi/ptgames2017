{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <form action="game.php?page=notes" method=post>
                <table width=519>
                    <tr>
                        <td class=c colspan=4>{$lang['Notes']}</td>
                    </tr>
                    <tr>
                        <th colspan=4><a href="game.php?page=notes&a=1">{$lang['MakeNewNote']}</a></th>
                    </tr>
                    <tr>
                        <td class=c></td>
                        <td class=c>{$lang['Date']}</td>
                        <td class=c>{$lang['Subject']}</td>
                        <td class=c>{$lang['Size']}</td>
                    </tr>{while $note = mysqli_fetch_array($notes_query)}<!--{$count++}-->
                    <tr>
                        <th width=20><input name="delmes{$note['id']}" value="y" type="checkbox"></th>
                        <th width=150>{date("Y-m-d h:i:s", $note["time"])}</th>
                        <th>
                            <a href="game.php?page=notes&a=2&amp;n={$note['id']}">
                                <font color="{if $note["priority"] == 0}lime{elseif $note["priority"] == 1}yellow{elseif $note["priority"] == 2}red{/if}">{$note['title']}</font>
                            </a>
                        </th>
                        <th align="right" width="40">{strlen($note['text'])}</th>
                    </tr>{/while}
                    {if $count == 0}<tr><th colspan=4>{$lang['ThereIsNoNote']}</th>{/if}
                    <tr>
                        <td colspan=4><input value="{$lang['Delete']}" type="submit"></td>
                    </tr>
                </table>
            </form>
        </center>{/block}
