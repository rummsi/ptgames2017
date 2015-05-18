{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br>
            <table width=519>
                <tr>
                    <td class=c colspan=6>{$TableTitle}</td>
                </tr>{if !isset($a)}
                <tr>
                    <th colspan=6>
                        <a href=game.php?page=buddy&a=1>{$Requests}</a>
                    </th>
                </tr>
                <tr>
                    <th colspan=6>
                        <a href=game.php?page=buddy&a=1&e=1>{$My_requests}</a>
                    </th>
                </tr>
                <tr>
                    <td class=c></td>
                    <td class=c>{$Name}</td>
                    <td class=c>{$Alliance}</td>
                    <td class=c>{$Coordinates}</td>
                    <td class=c>{$Position}</td>
                    <td class=c></td>
                </tr>{/if}
                {$solicitudes}{if !isset($i)}
                <tr>
                    <th colspan=6>{$There_is_no_request}</th>
                </tr>{/if}{if $a == 1}
                <tr>
                    <td colspan=6 class=c><a href=game.php?page=buddy>{$Back}</a></td>
                </tr>{/if}
                
                
            </table>
        </center>
{/block}