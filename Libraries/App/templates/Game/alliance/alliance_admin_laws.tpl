{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width=519>
                <tr><td class=c colspan=11>{$lang['Configure_laws']}</td></tr>
                {if count($ally_ranks) == 0 || $ally_ranks == ''}<th>{$lang['There_is_not_range']}</th>{else}
                <br>
                <form action="game.php?page=alliance&type=admin&edit=rights" method=POST>
                    <tr>
                        <th></th>
                        <th>{$lang['Range_name']}</th>
                        <th><img src=images/r1.png></th>
                        <th><img src=images/r2.png></th>
                        <th><img src=images/r3.png></th>
                        <th><img src=images/r4.png></th>
                        <th><img src=images/r5.png></th>
                        <th><img src=images/r6.png></th>
                        <th><img src=images/r7.png></th>
                        <th><img src=images/r8.png></th>
                        <th><img src=images/r9.png></th>
                    </tr><!--{$i = 0}-->{foreach $ally_ranks as $a => $b}{if $ally['ally_owner'] == $user['id']}
                    <br>
                    <tr>
                        <th>
                            <a href="game.php?page=alliance&type=admin&edit=rights&d={$a}">
                                <img src="{$dpath}pic/abort.gif" alt="{$lang['Delete_range']}" border=0>
                            </a>
                        </th>
                        <th>&nbsp;{$b['name']}&nbsp;</th>
                        <input type="hidden" name="id[]" value="{$a}">
                        <th><input type=checkbox name="u{$a}r0"{(($b['delete'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r1"{(($b['kick'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r2"{(($b['bewerbungen'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r3"{(($b['memberlist'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r4"{(($b['bewerbungenbearbeiten'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r5"{(($b['administrieren'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r6"{(($b['onlinestatus'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r7"{(($b['mails'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r8"{(($b['rechtehand'] == 1) ? ' checked="checked"' : '')}></th>
                    </tr>
                    <tr>{else}
                    <br>
                    <tr>
                        <th>
                            <a href="game.php?page=alliance&type=admin&edit=rights&d={$a}">
                                <img src="{$dpath}pic/abort.gif" alt="{$lang['Delete_range']}" border=0>
                            </a>
                        </th>
                        <th>&nbsp;{$b['name']}&nbsp;</th>
                        <input type="hidden" name="id[]" value="{$a}">
                        <th><b>-</b></th>
                        <th><input type=checkbox name="u{$a}r1"{(($b['kick'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r2"{(($b['bewerbungen'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r3"{(($b['memberlist'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r4"{(($b['bewerbungenbearbeiten'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r5"{(($b['administrieren'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r6"{(($b['onlinestatus'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r7"{(($b['mails'] == 1) ? ' checked="checked"' : '')}></th>
                        <th><input type=checkbox name="u{$a}r8"{(($b['rechtehand'] == 1) ? ' checked="checked"' : '')}></th>
                    </tr>
                    <tr>{/if}{/foreach}{if count($ally_ranks) != 0}
                    <br>
                    <tr><th colspan=11><input type=submit value="{$lang['Save']}"></th></tr>
                </form>{/if}{/if}
            </table>
            <br>
            <form action="game.php?page=alliance&type=admin&edit=rights&add=name" method=POST>
                <table width=519>
                    <tr>
                        <td class=c colspan=2>{$lang['Range_make']}</td>
                    </tr>
                    <tr>
                        <th>{$lang['Range_name']}</th>
                        <th><input type=text name="newrangname" size=20 maxlength=30></th>
                    </tr>
                    <tr>
                        <th colspan=2><input type=submit value="{$lang['Make']}"></th>
                    </tr>
                </table>
            </form>
            <form action="game.php?page=alliance&type=admin&edit=rights" method=POST>
                <table width=519>
                    <tr>
                        <td class=c colspan=2>{$lang['Law_leyends']}</td>
                    </tr>
                    <tr>
                        <th><img src=images/r1.png></th>
                        <th>{$lang['Alliance_dissolve']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r2.png></th>
                        <th>{$lang['Expel_users']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r3.png></th>
                        <th>{$lang['See_the_requests']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r4.png></th>
                        <th>{$lang['See_the_list_members']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r5.png></th>
                        <th>{$lang['Check_the_requests']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r6.png></th>
                        <th>{$lang['Alliance_admin']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r7.png></th>
                        <th>{$lang['See_the_online_list_member']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r8.png></th><th>{$lang['Make_a_circular_message']}</th>
                    </tr>
                    <tr>
                        <th><img src=images/r9.png></th><th>{$lang['Left_hand_text']}</th>
                    </tr>
                    <tr>
                        <td class="c" colspan="2"><a href="game.php?page=alliance&type=admin&edit=ally">{$lang['Return_to_overview']}</a></td>
                    </tr>
                </table>
            </form>
        </center>{/block}
	