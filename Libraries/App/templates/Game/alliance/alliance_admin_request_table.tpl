{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width=519>
                <tr>
                    <td class=c colspan=2>{$lang['Apply_ally_overview']} [{$ally_tag}]</td><!--{$i = 0}-->
                </tr>{if isset($show) && $show != 0 && $request_count != 0}
                <br>{while $r = mysqli_fetch_array($query)}
                <form action="game.php?page=alliance&type=admin&edit=requests&show={$r['id']}&sort=0" method="POST">
                    <tr><th colspan=2>{str_replace('%s', $r['username'], $lang['Request_from'])}</th></tr>
                    <tr><th colspan=2>{nl2br($r['ally_request_text'])}</th></tr>
                    <tr><td class="c" colspan=2>{$lang['Request_responde']}</td></tr>
                    <tr>
                        <th>&#160;</th>
                        <th><input type="submit" name="action" value="Accepter"></th>
                    </tr>
                    <tr>
                        <th>{$lang['Motive_optional']} <span id="cntChars">0</span> / 500 {$lang['characters']}</th>
                        <th><textarea name="text" cols=40 rows=10 onkeyup="javascript:cntchar(500)"></textarea></th>
                    </tr>
                    <tr>
                        <th>&#160;</th>
                        <th><input type="submit" name="action" value="Refuser"></th>
                    </tr>
                    <tr><td colspan=2>&#160;</td></tr>
                </form><!--{$i++}-->{/while}{/if}{if $request_count == 0}
                <tr><th colspan=2>Il ne reste plus aucune candidature</th></tr>
                {/if}
                <tr>
                    <th colspan=2>{str_replace('%n', $request_count, $lang['There_is_hanging_request'])}</th>
                </tr>
                <tr>
                    <td class=c><center><a href="game.php?page=alliance&type=admin&edit=requests&show=0&sort=1">{$lang['Candidate']}</a></center></td>
                    <td class=c><center><a href="game.php?page=alliance&type=admin&edit=requests&show=0&sort=0">{$lang['Date_of_the_request']}</a></center></th>
                </tr>{while $r = mysqli_fetch_array($query)}
                <br>
                <tr>
                    <th><center><a href="game.php?page=alliance&type=admin&edit=requests&show={$r['id']}&sort=0">{$r['username']}</a></center></th>
                    <th><center>{date("Y-m-d h:i:s", $r['ally_register_time'])}</center></th>
                </tr>{/while}
                <tr>
                    <td class=c colspan=2><a href="game.php?page=alliance">{$lang['Back']}</a></td>
                </tr>
            </table>
        </center>{/block}
