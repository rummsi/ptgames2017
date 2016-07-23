{include file="simple_header.tpl"}

            <!-- HEADER -->
            <!-- ONET 4 POLAND -->

            <div id="boxBG">
                <div id="box">
                    <a name="anchor"></a>
                    <div id="info" class="header normal">
                        <div id="star"></div>
                        <div id="star1"></div>
                        <div id="star2"></div>
                        <div id="clearAdvice"></div>
                        <div id="bar">
                            <ul>
                                <li id="playerName">{$lang_user_level}:
                                    <span class="textBeefy">
                                        <a href="game.php?page=changenick" class="overlay textBeefy" data-overlay-title="Change player name" data-overlay-popup-width="400" data-overlay-popup-height="200" >{$username}</a>
                                    </span>
                                </li>
                                <li><a class="" accesskey="c" href="game.php?page=buddy" >{$Buddylist}</a></li>{if $enable_notes == 1}
                                <li>
                                    <a href="game.php?page=notes" class="overlay" data-overlay-title="My notes" data-overlay-class="notices" data-overlay-popup-width="750" data-overlay-popup-height="480" accesskey="">{$Notes}</a>
                                </li>{/if}
                                <li><a href="game.php?page=stat" accesskey="k">{$Statistics}</a>({$user_rank})</li>
                                <li><a class="overlay" href="game.php?page=search&ajax=1" data-overlay-title="Search Universe" data-overlay-close="__default closeSearch" data-overlay-class="search" accesskey="b">{$Search}</a></li>
                                <li><a href="game.php?page=options" accesskey="o">{$Options}</a></li>
                                <li><a href="game.php?page=add_declare" target="_blank">{$multi}</a></li>
                                <li><a href="game.php?page=chat" target="_blank">{$Chat}</a></li>
                                <li><a href="javascript:top.location.href='index.php?page=logout'">{$Logout}</a></li>
                                <li class="OGameClock"><div id="dateheure"></div></li>
                            </ul>
                        </div>	
{include file="topnav.tpl"}
                        <div id="officers" class="">
                            <table class="header">
                                <tbody>
                                    <tr class="header">
                                        <td class="header"><img src="{$dpath}planeten/small/s_{$image}.jpg" height="50" width="50"></td>
                                        <td  class="header" valign="middle">
                                            <select size="1" onChange="eval('location=\''+this.options[this.selectedIndex].value+'\'');">
                                                {$planetlist}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="message-wrapper">
                            <!-- Neue Nachrichten-Zähler -->
                            <a class=" comm_menu messages tooltip js_hideTipOnMobile" href="game.php?page=messages" title="0 unread message(s)">
                                <span class="new_msg_count totalMessages noMessage news" data-new-messages="0">0</span>
                            </a>
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
                        <div id="helper">
                            <a class="tooltip" href="game.php?page=tutorial" title="Tutorial overview"></a>
                        </div>
                        <div id="selectedPlanetName" class="textCenter">Colony</div>
                    </div><!-- Info -->
                    <!-- END HEADER -->

                    <!-- LEFTMENU -->
{include file="left_menu.tpl"}
                    <!-- END LEFTMENU -->

                    <!-- CONTENT AREA -->
                    <div id="contentWrapper" class="with_chat_bar">
                        <div id="eventboxContent">
                            <div id="eventListWrap">
                                <div id="eventHeader">
                                    <a class="close_details eventToggle" href="javascript:void(0);">
                                        <img src="https://gf2.geo.gfsrv.net/cdndf/3e567d6f16d040326c7a0ea29a4f41.gif" height="16" width="16" />
                                    </a>
                                    <h2>{$Events}</h2>
                                </div>
                                <table id="eventContent">
                                    <tbody>
                                        {$fleet_list}
                                    </tbody>
                                </table>
                                <div id="eventFooter"></div>
                            </div>
                        </div>
                        <div id="inhalt">
{block name="content"}{/block}
                        </div>
                    </div>
                    <!-- END CONTENT AREA -->
                    
                </div><!-- box -->
            </div><!-- boxBG -->
        </div><!-- contentBoxBody -->
{include file="overall_footer.tpl"}