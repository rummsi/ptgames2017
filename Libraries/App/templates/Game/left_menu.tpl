        <div id='leftmenu' class="style">
            <script language="JavaScript">
                function f(target_url,win_name)
                {
                    var new_win = window.open(target_url,win_name,'resizable=yes,scrollbars=yes,menubar=no,toolbar=no,width=550,height=280,top=0,left=0');
                    new_win.focus();
                }
            </script>
            <body topmargin="0" leftmargin="0" marginwidth="0" marginheight="0">
                <center>
                    <div id='menu'>
                        <br>
                        <table width="130" cellspacing="0" cellpadding="0">
                            <tr>
                                <td colspan="2" style="border-top: 1px #545454 solid">
                                    <div>
                                        <center>
                                            {$servername}<br>
                                            (<a href="game.php?page=changelog" target=_self><font color=red>{$XNovaRelease}</font></a>)
                                        </center>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" background="{$dpath}img/bg1.gif">
                                    <center>{$devlp}</center>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=overview" accesskey="g" target="_self">{$Overview}</a></div></td>
                            </tr>
                            <tr>
                                <td height="1px" colspan="2" style="background-color:#FFFFFF"></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=buildings" accesskey="b" target="_self">{$Buildings}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=research" accesskey="r" target="_self">{$Research}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=shipyard" accesskey="f" target="_self">{$Shipyard}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=defense" accesskey="d" target="_self">{$Defense}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=officier" accesskey="o" target="_self">{$Officiers}</a></div></td>
                            </tr>
                            {if $enable_marchand == 1}
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=marchand" target="_self">{$Marchand}</a></div></td>
                            </tr>
                            {/if}
                            <tr>
                                <td colspan="2" background="{$dpath}img/bg1.gif"><center>{$navig}</center></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=alliance" accesskey="a" target="_self">{$Alliance}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=fleet" accesskey="t" target="_self">{$Fleet}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=movement" accesskey="t" target="_self">Movement</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=messages" accesskey="c" target="_self">{$Messages}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2" background="{$dpath}img/bg1.gif"><center>{$observ}</center></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=galaxy&action=0" accesskey="s" target="_self">{$Galaxy}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=empire" accesskey="i" target="_blank">{$Imperium}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=resources" accesskey="r" target="_self">{$Resources}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=techtree" accesskey="g" target="_self">{$Technology}</a></div></td>
                            </tr>
                            <tr>
                                <td height="1px" colspan="2" style="background-color:#FFFFFF"></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=records" accesskey="3" target="_self">{$Records}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=statistics&range={$user_rank}" accesskey="k" target="_self">{$Statistics}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=search" accesskey="b" target="_self">{$Search}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=banned" accesskey="3" target="_self">{$blocked}</a></div></td>
                            </tr>
                            {if $enable_announces == 1}
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=annonce" target="_self">{$Annonces}</a></div></td>
                            </tr>
                            {/if}
                            <tr>
                                <td colspan="2" background="{$dpath}img/bg1.gif"><center>{$commun}</center></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="#" onClick="f('game.php?page=buddy', '');" accesskey="c">{$Buddylist}</a></div></td>
                            </tr>
                            {if $enable_notes == 1}
                            <tr>
                                <td colspan="2"><div><a href="#" onClick="f('game.php?page=notes', 'Report');" accesskey="n">{$Notes}</a></div></td>
                            </tr>
                            {/if}
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=chat" accesskey="a" target="_self">{$Chat}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="{$forum_url}" accesskey="1" target="_self">{$Board}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=multi" accesskey="1" target="_self">{$multi}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="index.php?page=rules"  accesskey="c" target="_blank">{$Rules}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="index.php?page=contact" accesskey="3" target="_self" >{$Contact}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2"><div><a href="game.php?page=options" accesskey="o" target="_self">{$Options}</a></div></td>
                            </tr>
                            {if $Level > 0}
                            <tr>
                                <td colspan="2"><div><a href="admin.php?page=overview"><font color="lime">{$user_level[$Level]}</font></a></div></td>
                            </tr>
                            {/if}
                            {if $link_enable == 1}
                            <tr>
                                <td colspan="2"><div><a href="{$link_url}" target="_self">{stripslashes($link_name)}</a></div></td>
                            </tr>
                            {/if}
                            <tr>
                                <td colspan="2"><div><a href="javascript:top.location.href='index.php?page=logout'" accesskey="s" style="color:red">{$Logout}</a></div></td>
                            </tr>
                            <tr>
                                <td colspan="2" background="{$dpath}img/bg1.gif"><center>{$infog}</center></td>
                            </tr>
                            <tr>
                                <td style="padding-left: 3px">{$lm_ifo_game}</td>
                                <td align="right" style="padding-right: 3px">x {$game_speed / 2500}</td>
                            </tr>
                            <tr>
                              <td style="padding-left: 3px">{$lm_ifo_fleet}</td>
                              <td align="right" style="padding-right: 3px">x {$fleet_speed / 2500}</td>
                            </tr>
                            <tr>
                              <td style="padding-left: 3px">{$lm_ifo_serv}</td>
                              <td align="right" style="padding-right: 3px">x {$resource_multiplier}</td>
                            </tr>
                            <tr>
                              <td style="padding-left: 3px">{$lm_ifo_queue}</td>
                              <td align="right" style="padding-right: 3px">{$lm_tx_queue}</td>
                            </tr>
                        </table>
                    </div>
                </center>
            </body>
        </div>