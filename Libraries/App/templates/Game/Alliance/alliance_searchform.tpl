{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br>
            <table width="519">
                <tr>
                    <td class="c" colspan="2">{$search_alliance}</td>
                </tr>
                <tr>
                    <th>{$Search}</th>
                    <th>
                        <form action="" method="POST">
                            <input type="text" name="searchtext" value="{$searchtext}">
                            <input type="submit" value="{$Search}">
                        </form>
                    </th>
                </tr>
            </table>
            {if $INPUT_POST}
                {if mysql_num_rows($search) != 0}
                    <br>
                    <table width=519>
                        <tr>
                            <td class=c colspan=3>{$searched_alliance_availables}</th>
                        </tr>
                        {while $s = mysql_fetch_array($search)}
                            <br>
                            <tr>
                                <th><center>[<a href="game.php?page=alliance&mode=apply&allyid={$s['id']}">{$s['ally_tag']}</a>]</center></th>
                                <th><center>{$s['ally_name']}</center></th>
                                <th><center>{$s['ally_members']}</center></th>
                            </tr>
                        {/while}
                        <tr>
                    </table>
                {/if}
            {/if}
        </center>
{/block}
