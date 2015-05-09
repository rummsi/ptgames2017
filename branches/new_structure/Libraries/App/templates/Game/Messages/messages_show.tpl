{block name="title" prepend}{/block}
{block name="content"}
        <script language="JavaScript">
            function f(target_url, win_name) {
                var new_win = window.open(target_url,win_name,'resizable=yes,scrollbars=yes,menubar=no,toolbar=no,width=550,height=280,top=0,left=0');
                new_win.focus();
            }
        </script>
        <center>
            <table>
                <td></td>
                <td>
                    <table width="519">
                        <form action="game.php?page=messages" method="post">
                            <table>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input name="messages" value="1" type="hidden">
                                        <table width="519">
                                            <tr>
                                                <th colspan="4">
                                                    <select onchange="document.getElementById('deletemessages').options[this.selectedIndex].selected='true'" id="deletemessages2" name="deletemessages2">
                                                        <option value="deletemarked">{$mess_deletemarked}</option>
                                                        <option value="deleteunmarked">{$mess_deleteunmarked}</option>
                                                        <option value="deleteall">{$mess_deleteall}</option>
                                                    </select>
                                                    <input value="{$mess_its_ok}" type="submit">
                                                </th>
                                            </tr>
                                            <tr>
                                            <th style="color: rgb(242, 204, 74);" colspan="4">
                                                <input name="category" value="{$MessCategory}" type="hidden">
                                                <input onchange="document.getElementById('fullreports').checked=this.checked" id="fullreports2" name="fullreports2" type="checkbox">
                                                {$mess_partialreport}
                                            </th>
                                            </tr>
                                            <tr>
                                                <th>{$mess_action}</th>
                                                <th>{$mess_date}</th>
                                                <th>{$mess_from}</th>
                                                <th>{$mess_subject}</th>
                                            </tr>
                                            {$page1}
                                            <tr>
                                                <th style="color: rgb(242, 204, 74);" colspan="4">
                                                    <input onchange="document.getElementById('fullreports2').checked=this.checked" id="fullreports" name="fullreports" type="checkbox">
                                                    {$mess_partialreport}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th colspan="4">
                                                    <select onchange="document.getElementById('deletemessages2').options[this.selectedIndex].selected='true'" id="deletemessages" name="deletemessages">
                                                        <option value="deletemarked">{$mess_deletemarked}</option>
                                                        <option value="deleteunmarked">{$mess_deleteunmarked}</option>
                                                        <option value="deleteall">{$mess_deleteall}</option>
                                                    </select>
                                                    <input value="{$mess_its_ok}" type="submit">
                                                </th>
                                            </tr>
                                            <tr>
                                                <td colspan="4"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </table>
                </td>
            </table>
        </center>
{/block}