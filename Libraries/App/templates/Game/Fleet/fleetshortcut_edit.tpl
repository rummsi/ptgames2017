{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <form method=POST>
                <table border=0 cellpadding=0 cellspacing=1 width=519>
                    <tr height=20>
                        <td colspan=2 class=c>{$fsc_edit} {$c[0]} [{$c[1]}:{$c[2]}:{$c[3]}]</td>
                    </tr>
                    <tr height="20">
                        <th>
                            <input type=hidden name=a value=$a>
                            <input type=text name=n value="{$c[0]}" size=32 maxlength=32>
                            <input type=text name=g value="{$c[1]}" size=3 maxlength=1>
                            <input type=text name=s value="{$c[2]}" size=3 maxlength=3>
                            <input type=text name=p value="{$c[3]}" size=3 maxlength=3>
                            <select name=t>
                                <option value="1"{(($c[4] == 1) ? " SELECTED" : "")}>{$fsc_planet}</option>
                                <option value="2"{(($c[4] == 2) ? " SELECTED" : "")}>{$fsc_debris}</option>
                                <option value="3"{(($c[4] == 3) ? " SELECTED" : "")}>{$fsc_moon}</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input type=reset value="{$fsc_reset}">
                            <input type=submit value="{$fsc_save}">
                            <input type=submit name=delete value="{$fsc_remove}">
                        </th>
                    </tr>
                    <tr>
                        <td colspan=2 class=c>
                            <a href=game.php?page=fleetshortcut>{$fsc_return}</a>
                        </td>
                    </tr>
                </table>
            </form>
        </center>
{/block}