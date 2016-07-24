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
                        <div id="message-wrapper">
                            <!-- Neue Nachrichten-Zähler -->{if $user_new_message != 0}
                            <a class=" comm_menu messages tooltip js_hideTipOnMobile" href="game.php?page=messages" title="{if $user_new_message == 1}{$Have_new_message}{else}{str_replace('%m', pretty_number($user_new_message), $Have_new_messages)}{/if}">
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

                    <!-- RIGHTMENU -->
{include file="right_menu.tpl"}
                    <!-- END RIGHTMENU -->

                    <!-- JAVASCRIPT -->
                    <script type='text/javascript' src='https://gf1.geo.gfsrv.net/cdnc0/52431c2ea91d060d5c573e57e23fad.js'></script>
                    <script type="text/javascript">
                var session = "427ae1f52ae77575a40e2cb1cdf82cd888114623"; var vacation = 0; var timerHandler = new TimerHandler(); function redirectPremium()
                { location.href = "https://s670-en.ogame.gameforge.com/game/index.php?page=premium&showDarkMatter=1";  }
                var playerId = "332993"; var playerName = "rummsi"; var session = "427ae1f52ae77575a40e2cb1cdf82cd888114623"; var isMobile = false; var isMobileApp = false; var isMobileOnly = false; var isFacebookUser = false; var overlayWidth = 770; var overlayHeight = 600; var isRTLEnabled = 0; var activateToken = "c6e2630db5a9f88e50f81354bf8d2a7a"; var miniFleetToken = "7cd31e1a17fac7edd82f9ea50fe65a39"; var currentPage = "overview"; var bbcodePreviewUrl = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=bbcodePreview"; var popupWindows = []; var honorScore = 0; var darkMatter = 5285780; var serverTime = new Date(2016, 6, 23, 17, 6, 45); var localTime = new Date(); var timeDiff = serverTime - localTime; localTS = localTime.getTime(); var startServerTime = localTime.getTime() - (3600000) - localTime.getTimezoneOffset() * 60 * 1000; var LocalizationStrings = { "timeunits":{ "short":{ "year":"y", "month":"m", "week":"w", "day":"d", "hour":"h", "minute":"m", "second":"s" } }, "status":{ "ready":"done" }, "decimalPoint":".", "thousandSeperator":".", "unitMega":"M", "unitKilo":"K", "unitMilliard":"Bn", "question":"Question", "error":"Error", "loading":"load...", "yes":"yes", "no":"No", "ok":"Ok", "attention":"Caution", "outlawWarning":"You are about to attack a stronger player. If you do this, your attack defences will be shut down for 7 days and all players will be able to attack you without punishment. Are you sure you want to continue?", "lastSlotWarningMoon":"This building will use the last available building slot. Expand your Lunar Base to receive more space. Are you sure you want to build this building?", "lastSlotWarningPlanet":"This building will use the last available building slot. Expand your Terraformer or buy a Planet Field item to obtain more slots. Are you sure you want to build this building?", "forcedVacationWarning":"Some game features are unavailable until your account is validated.", "moreDetails":"More details", "lessDetails":"Less detail", "planetOrder":{ "lock":"Lock arrangement", "unlock":"Unlock arrangement" }, "darkMatter":"Dark Matter", "activateItem":{ "upgradeItemQuestion":"Would you like to replace the existing item? The old bonus will be lost in the process.", "upgradeItemQuestionHeader":"Replace item?" } }; var constants = { "espionage":6, "missleattack":10, "language":"en", "name":"670" }; var userData = { "id":"332993" }; var missleAttackLink = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=missileattacklayer&width=669&height=250"; var changeNickLink = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=changenick"; var showOutlawWarning = true; var miniFleetLink = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=minifleet&ajax=1"; var ogameUrl = "https:\/\/s670-en.ogame.gameforge.com"; var startpageUrl = "https:\/\/pioneers.ogame.gameforge.com"; var nodePort = 19134; var nodeUrl = "https:\/\/s670-en.ogame.gameforge.com:19134\/socket.io\/socket.io.js"; var nodeParams = { "port":19134, "secure":"true" }; var chatUrl = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=ajaxChat"; var chatUrlLoadMoreMessages = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=chatGetAdditionalMessages"; var chatLoca = { "TEXT_EMPTY":"Where is the message?", "TEXT_TOO_LONG":"The message is too long.", "SAME_USER":"You cannot write to yourself.", "IGNORED_USER":"You have ignored this player.", "NO_DATABASE_CONNECTION":"A previously unknown error has occurred. Unfortunately your last action couldn`t be executed!", "INVALID_PARAMETERS":"A previously unknown error has occurred. Unfortunately your last action couldn`t be executed!", "SEND_FAILED":"A previously unknown error has occurred. Unfortunately your last action couldn`t be executed!", "LOCA_ALL_ERROR_NOTACTIVATED":"This function is only available after your accounts activation.", "X_NEW_CHATS":"#+# unread conversation(s)", "MORE_USERS":"show more" }; var eventboxLoca = { "mission":"Mission", "missions":"Missions", "next misson":"DUMMY_KEY_N\u00e4chster_fertig", "type":"DUMMY_KEY_Art", "friendly":"own", "neutral":"friendly", "hostile":"hostile", "nextEvent":"Next", "nextEventText":"Type" }; function redirectLogout(){ location.href = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=logout";  }
                function redirectOverview(){ location.href = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=overview";  }
                function redirectPlatformLogout(){ location.href = "https:\/\/oauth.gameforge.com\/authorize?client_id=674a05cd-3327-4507-9e6a-bbf2f6b4681c&redirect_uri=https%3A%2F%2Fs670-en.ogame.gameforge.com%2Fportal%2Fauthenticate&response_type=code&auto_login=557d8c0b-d9cb-432f-842d-35eaa4d3f653";  }
                function redirectSpaceDock(){ location.href = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=station&openTech=36";  }
                function initAjaxEventbox()
                { reloadEventbox({ "hostile":0, "neutral":0, "friendly":1, "eventTime":1031, "eventText":"Transport", "eventType":"undermark" });  }
                function initAjaxResourcebox(){ reloadResources({ "metal":{ "resources":{ "actualFormat":"741.727", "actual":741727, "max":1590000, "production":3.2103678676104 }, "tooltip":"Metal|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">741.727<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Storage capacity:<\/th>\n                <td><span class=\"\">1.590.000<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+11.557<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Den Capacity:<\/th>\n                <td><span class=\"middlemark\">20.628<\/span><\/td>\n            <\/tr>\n        <\/table>", "class":"" }, "crystal":{ "resources":{ "actualFormat":"327.685", "actual":327685, "max":2920000, "production":1.814833014726 }, "tooltip":"Crystal|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">327.685<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Storage capacity:<\/th>\n                <td><span class=\"\">2.920.000<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+6.533<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Den Capacity:<\/th>\n                <td><span class=\"middlemark\">13.426<\/span><\/td>\n            <\/tr>\n        <\/table>", "class":"" }, "deuterium":{ "resources":{ "actualFormat":"1.038.348", "actual":1038348, "max":1590000, "production":0.76451442862152 }, "tooltip":"Deuterium|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">1.038.348<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Storage capacity:<\/th>\n                <td><span class=\"\">1.590.000<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+2.752<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Den Capacity:<\/th>\n                <td><span class=\"middlemark\">5.164<\/span><\/td>\n            <\/tr>\n        <\/table>", "class":"" }, "energy":{ "resources":{ "actual":69, "actualFormat":"69" }, "tooltip":"Energy|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">69<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+5.417<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Consumption:<\/th>\n                <td><span class=\"overmark\">-5.348<\/span><\/td>\n            <\/tr>\n        <\/table>", "class":"" }, "darkmatter":{ "resources":{ "actual":5285780, "actualFormat":"5.285.780" }, "string":"5.285M Dark Matter", "tooltip":"Dark Matter|<table class=\"resourceTooltip\">\n                <tr>\n                    <th>Available:<\/th>\n                    <td><span class=\"\">5.285.780<\/span><\/td>\n                <\/tr>\n                <tr>\n                    <th>Purchased:<\/th>\n                    <td><span class=\"\">0<\/span><\/td>\n                <\/tr>\n                <tr>\n                    <th>Found:<\/th>\n                    <td><span class=\"\">5.285.780<\/span><\/td>\n                <\/tr>\n            <\/table>", "class":"" }, "honorScore":0 });  }
                function getAjaxEventbox(){ $.get("https://s670-en.ogame.gameforge.com/game/index.php?page=fetchEventbox&ajax=1", reloadEventbox, "text");  }
                function getAjaxResourcebox(callback){ $.get("https://s670-en.ogame.gameforge.com/game/index.php?page=fetchResources&ajax=1", function(data){ reloadResources(data, callback);  }, "text");  }
                var changeSettingsLink = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=changeSettings"; var changeSettingsToken = "637e22637e0424a31a4dc00f69b6e934"; var eventlistLink = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=eventList&ajax=1"; function openAnnouncement(){ openOverlay("https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=announcement&ajax=1", { 'class':'announcement', zIndex:4000 });  }
                var timeDelta = 1469290005000 - (new Date()).getTime(); var LocalizationStrings = { "timeunits":{ "short":{ "year":"y", "month":"m", "week":"w", "day":"d", "hour":"h", "minute":"m", "second":"s" } }, "status":{ "ready":"done" }, "decimalPoint":".", "thousandSeperator":".", "unitMega":"M", "unitKilo":"K", "unitMilliard":"Bn", "question":"Question", "error":"Error", "loading":"load...", "yes":"yes", "no":"No", "ok":"Ok", "attention":"Caution", "outlawWarning":"You are about to attack a stronger player. If you do this, your attack defences will be shut down for 7 days and all players will be able to attack you without punishment. Are you sure you want to continue?", "lastSlotWarningMoon":"This building will use the last available building slot. Expand your Lunar Base to receive more space. Are you sure you want to build this building?", "lastSlotWarningPlanet":"This building will use the last available building slot. Expand your Terraformer or buy a Planet Field item to obtain more slots. Are you sure you want to build this building?", "forcedVacationWarning":"Some game features are unavailable until your account is validated.", "moreDetails":"More details", "lessDetails":"Less detail", "planetOrder":{ "lock":"Lock arrangement", "unlock":"Unlock arrangement" }, "darkMatter":"Dark Matter", "activateItem":{ "upgradeItemQuestion":"Would you like to replace the existing item? The old bonus will be lost in the process.", "upgradeItemQuestionHeader":"Replace item?" } }; $(document).ready(function(){ new eventboxCountdown($("#counter-eventlist-11797787"), 1031, $('#eventListWrap'), "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=checkEvents&ajax=1", [11797787, 11797788]); new eventboxCountdown($("#counter-eventlist-11797788"), 2225, $('#eventListWrap'), "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=checkEvents&ajax=1", [11797787, 11797788]); initEventTable();  }); var planetMoveLoca = { "askTitle":"Resettle Planet", "askCancel":"Are you sure that you wish to cancel this planet relocation? The normal waiting time will thereby be maintained.", "yes":"yes", "no":"No", "success":"The planet relocation was successfully cancelled.", "error":"Error" }; function openPlanetRenameGiveupBox()
                { openOverlay("https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=planetlayer", { title:"Abandon\/Rename Main", 'class':"planetRenameOverlay" });  }
                var textContent = []; textContent[0] = "Diameter:"; textContent[1] = "12.800km (<span>143<\/span>\/<span>163<\/span>)"; textContent[2] = "Temperature:"; textContent[3] = "-16\u00b0C to 24\u00b0C"; textContent[4] = "Position:"; textContent[5] = "<a  href=\"https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=galaxy&galaxy=1&system=240&position=10\" >[1:240:10]<\/a>"; textContent[6] = "Points:"; textContent[7] = "<a href='https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=highscore'>117.355 (Place 164 of 1.938)<\/a>"; textContent[8] = "Honour points:"; textContent[9] = "0"; var textDestination = []; textDestination[0] = "diameterField"; textDestination[1] = "diameterContentField"; textDestination[2] = "temperatureField"; textDestination[3] = "temperatureContentField"; textDestination[4] = "positionField"; textDestination[5] = "positionContentField"; textDestination[6] = "scoreField"; textDestination[7] = "scoreContentField"; textDestination[8] = "honorField"; textDestination[9] = "honorContentField"; var currentIndex = 0; var currentChar = 0; var linetwo = 0; var locaPremium = { "buildingHalfOverlay":"Do you want to reduce the construction time by 50% of the total construction time () for <b>750 Dark Matter<\/b>?", "buildingFullOverlay":"Do you want to immediately complete the construction order for <b>750 Dark Matter<\/b>?", "shipsHalfOverlay":"Do you want to reduce the construction time by 50% of the total construction time () for <b>750 Dark Matter<\/b>?", "shipsFullOverlay":"Do you want to immediately complete the construction order for <b>750 Dark Matter<\/b>?", "researchHalfOverlay":"Do you want to reduce the research time by 50% of the total research time () for <b>750 Dark Matter<\/b>?", "researchFullOverlay":"Do you want to immediately complete the research order for <b>750 Dark Matter<\/b>?" }; var priceBuilding = 750; var priceResearch = 750; var priceShips = 750; var loca = loca || {  }; loca = $.extend({  }, loca, { "error":"Error", "errorNotEnoughDM":"Not enough Dark Matter available! Do you want to buy some now?", "notice":"Reference", "planetGiveupQuestion":"Are you sure you want to abandon the planet %planetName% %planetCoordinates%?", "moonGiveupQuestion":"Are you sure you want to abandon the moon %planetName% %planetCoordinates%?" }); function type()
                { var destination = document.getElementById(textDestination[currentIndex]); if (destination){ if (textContent[currentIndex].substr(currentChar, 1) == "<" && linetwo != 1){ while (textContent[currentIndex].substr(currentChar, 1) != ">"){ currentChar++;  } }
                if (linetwo == 1){ destination.innerHTML = textContent[currentIndex]; currentChar = destination.innerHTML = textContent[currentIndex].length + 1;  } else{ destination.innerHTML = textContent[currentIndex].substr(0, currentChar) + "_"; currentChar++;  }
                if (currentChar > textContent[currentIndex].length){ destination.innerHTML = textContent[currentIndex]; currentIndex++; currentChar = 0; if (currentIndex < textContent.length){ type();  } } else{ setTimeout("type()", 15);  } } }
                function planetRenamed(data)
                { var data = $.parseJSON(data); if (data["status"]){ $("#planetNameHeader").html(data["newName"]); reloadRightmenu("https://s670-en.ogame.gameforge.com/game/index.php?page=rightmenu&renamed=1&pageToLink=overview"); $(".overlayDiv.planetRenameOverlay").dialog('close');  }
                errorBoxAsArray(data["errorbox"]);  }
                function reloadPage()
                { location.href = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=overview";  }
                var demolish_id; var buildUrl; function loadDetails(type)
                { url = "https://s670-en.ogame.gameforge.com/game/index.php?page=overview&ajax=1"; if (typeof (detailUrl) != 'undefined'){ url = detailUrl;  }
                $.get(url, { type:type }, function(data){ $("#detail").html(data); $("#techDetailLoading").hide(); $("input[type='text']:first", document.forms["form"]).focus(); $(document).trigger("ajaxShowElement", techID);  });  }
                function sendBuildRequest(url, ev, showSlotWarning)
                { if (ev != undefined){ var keyCode; if (window.event){ keyCode = window.event.keyCode;  } else if (ev){ keyCode = ev.which;  } else{ return true;  }
                if (keyCode != 13){ return true;  } }
                function build(){ if (url == null){ sendForm();  } else{ fastBuild();  } }
                if (url == null){ fallBackFunc = sendForm;  } else{ fallBackFunc = build; buildUrl = url;  }
                if (showSlotWarning){ build();  } else{ build();  }
                return false;  }
                function fastBuild(){ location.href = buildUrl; return false;  }
                function sendForm(){ document.form.submit(); return false;  }
                function demolishBuilding(id, question){ demolish_id = id; question += "<br/><br/>" + $("#demolish" + id).html(); errorBoxDecision("Caution", "" + question + "", "yes", "No", demolishStart);  }
                function demolishStart()
                { window.location.replace("https://s670-en.ogame.gameforge.com/game/index.php?page=overview&modus=3&token=c8f3748b39b6300d16df50e023c81e3e&type=" + demolish_id);  }
                gfSlider = new GFSlider(getElementByIdWithCache('detailWrapper')); var detailUrl = "https:\/\/s670-en.ogame.gameforge.com\/game\/index.php?page=buffActivation&ajax=1"; var cancelProduction_id; var production_listid; function cancelProduction(id, listid, question)
                { cancelProduction_id = id; production_listid = listid; errorBoxDecision("Caution", "" + question + "", "yes", "No", cancelProductionStart);  }
                function cancelProductionStart()
                { window.location.replace("https://s670-en.ogame.gameforge.com/game/index.php?page=overview&modus=2&token=66c7f92eda6cacb78920f9bdb8dad6f7&techid=" + cancelProduction_id + "&listid=" + production_listid);  }
                function initType(){ type();  }
                new baulisteCountdown(getElementByIdWithCache("moveCountdown"), - 1469290005); $('#planet').find('h2 a').hover(function(){ $('#planet').find('h2 a img').toggleClass('hinted');  }, function(){ $('#planet').find('h2 a img').toggleClass('hinted');  }); var player = { hasCommander:true }; var localizedBBCode = { "bold":"Bold", "italic":"Italic", "underline":"Underline", "stroke":"Strikethrough", "sub":"Subscript", "sup":"Superscript", "fontColor":"Font colour", "fontSize":"Font size", "backgroundColor":"Background colour", "backgroundImage":"Background image", "tooltip":"Tool-tip", "alignLeft":"Left align", "alignCenter":"Centre align", "alignRight":"Right align", "alignJustify":"Justify", "block":"Break", "code":"Code", "spoiler":"Spoiler", "moreopts":"More Options", "list":"List", "hr":"Horizontal line", "picture":"Image", "link":"Link", "email":"Email", "player":"Player", "item":"Item", "coordinates":"Coordinates", "preview":"Preview", "textPlaceHolder":"Text...", "playerPlaceHolder":"Player ID or name", "itemPlaceHolder":"Item ID", "coordinatePlaceHolder":"Galaxy:system:position", "charsLeft":"Characters remaining", "colorPicker":{ "ok":"Ok", "cancel":"Cancel", "rgbR":"R", "rgbG":"G", "rgbB":"B" }, "backgroundImagePicker":{ "ok":"Ok", "repeatX":"Repeat horizontally", "repeatY":"Repeat vertically" } }, itemNames = { "090a969b05d1b5dc458a6b1080da7ba08b84ec7f":"Bronze Crystal Booster", "e254352ac599de4dd1f20f0719df0a070c623ca8":"Bronze Deuterium Booster", "b956c46faa8e4e5d8775701c69dbfbf53309b279":"Bronze Metal Booster", "3c9f85221807b8d593fa5276cdf7af9913c4a35d":"Bronze Crystal Booster", "422db99aac4ec594d483d8ef7faadc5d40d6f7d3":"Silver Crystal Booster", "118d34e685b5d1472267696d1010a393a59aed03":"Gold Crystal Booster", "d3d541ecc23e4daa0c698e44c32f04afd2037d84":"DETROID Bronze", "0968999df2fe956aa4a07aea74921f860af7d97f":"DETROID Gold", "27cbcd52f16693023cb966e5026d8a1efbbfc0f9":"DETROID Silver", "d9fa5f359e80ff4f4c97545d07c66dbadab1d1be":"Bronze Deuterium Booster", "e4b78acddfa6fd0234bcb814b676271898b0dbb3":"Silver Deuterium Booster", "5560a1580a0330e8aadf05cb5bfe6bc3200406e2":"Gold Deuterium Booster", "40f6c78e11be01ad3389b7dccd6ab8efa9347f3c":"KRAKEN Bronze", "929d5e15709cc51a4500de4499e19763c879f7f7":"KRAKEN Gold", "4a58d4978bbe24e3efb3b0248e21b3b4b1bfbd8a":"KRAKEN Silver", "de922af379061263a56d7204d1c395cefcfb7d75":"Bronze Metal Booster", "ba85cc2b8a5d986bbfba6954e2164ef71af95d4a":"Silver Metal Booster", "05294270032e5dc968672425ab5611998c409166":"Gold Metal Booster", "be67e009a5894f19bbf3b0c9d9b072d49040a2cc":"Bronze Moon Fields", "05ee9654bd11a261f1ff0e5d0e49121b5e7e4401":"Gold Moon Fields", "c21ff33ba8f0a7eadb6b7d1135763366f0c4b8bf":"Silver Moon Fields", "485a6d5624d9de836d3eb52b181b13423f795770":"Bronze M.O.O.N.S.", "45d6660308689c65d97f3c27327b0b31f880ae75":"Gold M.O.O.N.S.", "fd895a5c9fd978b9c5c7b65158099773ba0eccef":"Silver M.O.O.N.S.", "da4a2a1bb9afd410be07bc9736d87f1c8059e66d":"NEWTRON Bronze", "8a4f9e8309e1078f7f5ced47d558d30ae15b4a1b":"NEWTRON Gold", "d26f4dab76fdc5296e3ebec11a1e1d2558c713ea":"NEWTRON Silver", "16768164989dffd819a373613b5e1a52e226a5b0":"Bronze Planet Fields", "04e58444d6d0beb57b3e998edc34c60f8318825a":"Gold Planet Fields", "0e41524dc46225dca21c9119f2fb735fd7ea5cb3":"Silver Planet Fields" }; $(document).ready(function(){ initIndex(); initAjaxEventbox(); initOverview(); initBuffBar(); initType(); tabletInitOverviewAdvice(); ogame.chat.showPlayerList('#chatBarPlayerList .cb_playerlist_box'); ogame.chat.showPlayerList('#sideBar'); var initChatAsyncInterval = window.setInterval(initChatAsync, 100); function initChatAsync(){ if (ogame.chat.isLoadingPlayerList === false && ogame.chat.playerList !== null){ clearInterval(initChatAsyncInterval); ogame.chat.initChatBar(playerId); ogame.chat.initChat(playerId); ogame.chat.updateCustomScrollbar($('.scrollContainer'));  } } });
                    </script>
                    <!-- END JAVASCRIPT -->
                    
                </div><!-- box -->
            </div><!-- boxBG -->
        </div><!-- contentBoxBody -->
{include file="overall_footer.tpl"}