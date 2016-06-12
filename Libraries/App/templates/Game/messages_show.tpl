{block name="title" prepend}{/block}
{block name="content"}        <script language="JavaScript">
            function f(target_url, win_name) {
                var new_win = window.open(target_url,win_name,'resizable=yes,scrollbars=yes,menubar=no,toolbar=no,width=550,height=280,top=0,left=0');
                new_win.focus();
            }
        </script>
        <center>
            <table>
                <tr>
                    <td></td>
                    <td>
                        <table width="519">
                            <form action="game.php?page=messages" method="post">
                                <tr>
                                    <td></td>
                                    <td>
                                        <input name="messages" value="1" type="hidden">
                                        <table width="519">
                                            <tr>
                                                <th colspan="4">
                                                    <select onchange="document.getElementById('deletemessages').options[this.selectedIndex].selected='true'" id="deletemessages2" name="deletemessages2">
                                                        <option value="deletemarked">{$lang['mess_deletemarked']}</option>
                                                        <option value="deleteunmarked">{$lang['mess_deleteunmarked']}</option>
                                                        <option value="deleteall">{$lang['mess_deleteall']}</option>
                                                    </select>
                                                    <input value="{$lang['mess_its_ok']}" type="submit">
                                                </th>
                                            </tr>
                                            <tr>
                                                <th style="color: rgb(242, 204, 74);" colspan="4">
                                                <input name="category" value="{$MessCategory}" type="hidden">
                                                <input onchange="document.getElementById('fullreports').checked=this.checked" id="fullreports2" name="fullreports2" type="checkbox">{$lang['mess_partialreport']}</th>
                                            </tr>
                                            <tr>
                                                <th>{$lang['mess_action']}</th>
                                                <th>{$lang['mess_date']}</th>
                                                <th>{$lang['mess_from']}</th>
                                                <th>{$lang['mess_subject']}</th>
                                            </tr>
                                        {if $MessCategory == 100}
                                            {while $CurMess = mysqli_fetch_array($UsrMess)}
                                            <tr>
                                                <input name="showmes{$CurMess['message_id']}" type="hidden" value="1">
                                                <th><input name="delmes{$CurMess['message_id']}" type="checkbox"></th>
                                                <th>{date("m-d H:i:s O", $CurMess['message_time'])}</th>
                                                <th>{stripslashes($CurMess['message_from'])}</th>
                                                <th>{stripslashes($CurMess['message_subject'])} 
                                                {if $CurMess['message_type'] == 1}
                                                    <a href="game.php?page=messages&type=write&amp;id={$CurMess['message_sender']}&amp;subject={$lang['mess_answer_prefix']}{htmlspecialchars($CurMess['message_subject'])}">
                                                        <img src="{$dpath}img/m.gif" alt="{$lang['mess_answer']}" border="0">
                                                    </a>
                                                </th>
                                                {else}
                                                </th>
                                                {/if}
                                            </tr>
                                            <tr>
                                                <td style="background-color: {$BackGndColor[$CurMess['message_type']]}; background-image: none;"; class="b"> </td>
                                                <td style="background-color: {$BackGndColor[$CurMess['message_type']]}; background-image: none;"; colspan="3" class="b">{stripslashes(nl2br($CurMess['message_text']))}</td>
                        
                                            </tr>
                                            {/while}
                                        {else}
                                            {while $CurMess = mysqli_fetch_array($UsrMess1)}
                                                {if $CurMess['message_type'] == $MessCategory}
                                            <tr>
                                                <input name="showmes{$CurMess['message_id']}" type="hidden" value="1">
                                                <th><input name="delmes{$CurMess['message_id']}" type="checkbox"></th>
                                                <th>{date("m-d H:i:s O", $CurMess['message_time'])}</th>
                                                <th>{stripslashes($CurMess['message_from'])}</th>
                                                <th>{stripslashes($CurMess['message_subject'])} 
                                                    {if $CurMess['message_type'] == 1}
                                                    <a href="game.php?page=messages&type=write&amp;id={$CurMess['message_sender']}&amp;subject={$lang['mess_answer_prefix']}{htmlspecialchars($CurMess['message_subject'])}">
                                                    <img src="{$dpath}img/m.gif" alt="{$lang['mess_answer']}" border="0"></a></th>
                                                    {else}
                                                </th>
                                                    {/if}
                                            </tr>
                                            <tr>
                                                <td class="b"> </td>
                                                <td colspan="3" class="b">{nl2br(stripslashes($CurMess['message_text']))}</td>
                                            </tr>
                                                {/if}
                                            {/while}
                                        {/if}
                                            <tr>
                                                <th style="color: rgb(242, 204, 74);" colspan="4">
                                                <input onchange="document.getElementById('fullreports2').checked=this.checked" id="fullreports" name="fullreports" type="checkbox">{$lang['mess_partialreport']}</th>
                                            </tr>
                                            <tr>
                                                <th colspan="4">
                                                    <select onchange="document.getElementById('deletemessages2').options[this.selectedIndex].selected='true'" id="deletemessages" name="deletemessages">
                                                        <option value="deletemarked">{$lang['mess_deletemarked']}</option>
                                                        <option value="deleteunmarked">{$lang['mess_deleteunmarked']}</option>
                                                        <option value="deleteall">{$lang['mess_deleteall']}</option>
                                                    </select>
                                                    <input value="{$lang['mess_its_ok']}" type="submit">
                                                </th>
                                            </tr>
                                            <tr>
                                                <td colspan="4"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </form>
                        </table>
                    </td>
                </tr>
            </table>
        </center>{/block}