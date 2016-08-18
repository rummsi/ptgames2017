{include file="simple_header.tpl"}
        <div class="contentBoxBody">

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
                                <li class="OGameClock"></li>
                            </ul>
                        </div>
{include file="topnav.tpl"}
{include file="message_wrapper.tpl"}
                        <div id="helper">
                            <a class="tooltip" href="game.php?page=tutorial" title="Tutorial overview"></a>
                        </div>
                        <div id="selectedPlanetName" class="textCenter">{$CurrentPlanet['name']}</div>
                    </div><!-- Info -->
                    <!-- END HEADER -->

                    <!-- LEFTMENU -->
{include file="left_menu.tpl"}
                    <!-- END LEFTMENU -->

                    <!-- CONTENT AREA -->
                    <div id="contentWrapper" class="with_chat_bar">
{include file="eventboxContent.tpl"}
                        <div id="inhalt">
{block name="content"}{/block}
                        </div>
                    </div>
                    <!-- END CONTENT AREA -->

                    <!-- RIGHTMENU -->
{include file="right_menu.tpl"}
                    <!-- END RIGHTMENU -->

                    <!-- JAVASCRIPT -->
{include file="javascript/{$get_page}.tpl"}
                    <!-- END JAVASCRIPT -->
                    
                </div><!-- box -->
            </div><!-- boxBG -->
        </div><!-- contentBoxBody -->
{include file="overall_footer.tpl"}