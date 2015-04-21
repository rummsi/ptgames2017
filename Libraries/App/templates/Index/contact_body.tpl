{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br><br>
            <table width="569">
                <tbody>
                    <tr>
                        <td colspan="3" class="c"><b>{$ctc_title}</b></td>
                    </tr>
                    <tr>
                        <th colspan="3">
                            <font color="orange">{$ctc_intro}</font>
                        </th>
                    </tr>
                    <tr>
                        <th><font color="lime">{$ctc_name}</font></th>
                        <th><font color="lime">{$ctc_rank}</font></th>
                        <th><font color="lime">{$ctc_mail}</font></th>
                    </tr>
                    {while $Ops = mysql_fetch_assoc($GameOps)}
                        <tr>
                            <th>{$Ops['username']}</th>
                            <th>{$user_level[$Ops['authlevel']]}</th>
                            <th><a href=mailto:{$Ops['email']}>{$Ops['email']}</a></th>
                        </tr>
                    {/while}
                    <tr>
                    </tr>
                    <tr>
                        <th colspan="3">
                            <a href="index.php">{$ctc_return}</a>
                        </th>
                    </tr>
                </tbody>
            </table>
        </center>
{/block}