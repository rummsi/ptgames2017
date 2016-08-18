
                        <div id="message-wrapper">
                            <!-- Neue Nachrichten-Zähler -->{if $user_new_message != 0}
                            <a class=" comm_menu messages tooltip js_hideTipOnMobile" href="game.php?page=messages" title="{if $user_new_message == 1}{$lang['Have_new_message']}{else}{str_replace('%m', pretty_number($user_new_message), $lang['Have_new_messages'])}{/if}">
                                <span class="new_msg_count totalMessages {if $user_new_message == 0}noMessage {/if}news" data-new-messages="{pretty_number($user_new_message)}">{pretty_number($user_new_message)}</span>
                            </a>{/if}
                            <!-- Neue Chatnachrichten-Zähler -->
                            <a class=" comm_menu chat tooltip js_hideTipOnMobile" href="game.php?page=chat" title="0 unread conversation(s)">
                                <!-- js modification !-->
                                <span class="new_msg_count totalChatMessages noMessage" data-new-messages="0">0</span>
                            </a>
                            <div id="messages_collapsed">
                                <div id="eventboxFilled" class="eventToggle" style="display: none;">
                                    <a id="js_eventDetailsClosed" class="tooltipRight js_hideTipOnMobile" href="javascript:void(0);" title="More details"></a>
                                    <a id="js_eventDetailsOpen" class="tooltipRight open js_hideTipOnMobile" href="javascript:void(0);" title="Less detail"></a>
                                </div>
                                <div id="eventboxLoading" class="textCenter textBeefy" style="display: block;">
                                    <img height="16" width="16" src="https://gf3.geo.gfsrv.net/cdne3/3f9884806436537bdec305aa26fc60.gif" />load...
                                </div>
                                <div id="eventboxBlank" class="textCenter" style="display: none;">No fleet movement</div>
                            </div>
                            <div id="attack_alert" class="tooltip eventToggle noAttack" title="">
                                <a href="game.php?page=eventList" ></a>
                            </div>
                            <br class="clearfloat" />
                        </div><!-- #message-wrapper -->