
        <form action="raketenangriff.php?c={$Current}&action=2&galaxy={$Galaxy}&system={$System}&planet={$Planet}" method="POST">
            <table border="0">
                <tr>
                    <td class="c" colspan="2">
                        {$gm_launch} [{$Galaxy}:{$System}:{$Planet}]
                    </td>
                </tr>
                <tr>
                    <td class="c">{$String}
                        <input type="text" name="SendMI" size="2" maxlength="7" />
                    </td>
                    <td class="c">{$gm_target}
                        <select name="Target">
                            <option value="all" selected>{$gm_all}</option>
                            <option value="0">{$tech[401]}</option>
                            <option value="1">{$tech[402]}</option>
                            <option value="2">{$tech[403]}</option>
                            <option value="3">{$tech[404]}</option>
                            <option value="4">{$tech[405]}</option>
                            <option value="5">{$tech[406]}</option>
                            <option value="6">{$tech[407]}</option>
                            <option value="7">{$tech[408]}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="c" colspan="2">
                        <input type="submit" name="aktion" value="{$gm_send}">
                    </td>
                </tr>
            </table>
        </form>