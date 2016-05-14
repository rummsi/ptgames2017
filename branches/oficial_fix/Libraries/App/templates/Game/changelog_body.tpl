{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="668">
                <tr>
                    <td class="c">{$Version}</td>
                    <td class="c">{$Description}</td>
                </tr>
                {foreach $changelog as $a => $b}
                <tr>
                    <th width="42">{$a}</th>
                    <td style="text-align:left" class=b>{nl2br($b)}</td>
                </tr>
                {/foreach}
            </table>
        </center>{/block}