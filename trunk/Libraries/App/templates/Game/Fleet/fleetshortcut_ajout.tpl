{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <form method=POST>
                <table border=0 cellpadding=0 cellspacing=1 width=519>
                    <tr height=20>
                        <td colspan=2 class=c>{$fsc_title_add}</td>
                    </tr>
                    <tr height="20">
                        <th>
                            <input type=text name=n value="{$g}" size=32 maxlength=32 title="{$fsc_name}">
                            <input type=text name=g value="{$s}" size=3 maxlength=1 title="{$fsc_galaxy}">
                            <input type=text name=s value="{$p}" size=3 maxlength=3 title="{$fsc_solar_s}">
                            <input type=text name=p value="{$t}" size=3 maxlength=3 title="{$fsc_planet}">
                            <select name=t>
                                <option value="1"{(($r[4] == 1) ? " SELECTED" : "")}>{$fsc_planet}</option>
                                <option value="2"{(($r[4] == 2) ? " SELECTED" : "")}>{$fsc_debris}</option>
                                <option value="3"{(($r[4] == 3) ? " SELECTED" : "")}>{$fsc_moon}</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input type="reset" value="{$fsc_return}">
                            <input type="submit" value="{$fsc_save}">
                        </th>
                    </tr>
                    <tr>
                        <td colspan=2 class=c>
                            <a href=fleetshortcut.php>{$fsc_del}</a>
                        </td>
                    </tr>
                </table>
            </form>
        </center>
{/block}