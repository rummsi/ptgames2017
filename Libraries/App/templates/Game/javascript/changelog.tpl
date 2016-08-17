
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery_UI.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/AnythingSlider.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery_BBQ.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery_hashchange.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery_Cookie_Plugin.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/Ogame.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/Select2.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/Spinners.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery_Tooltip.js'></script>
                    <script type="text/javascript">
                        var vacation = {$user['urlaubs_modus']};
                        var timerHandler = new TimerHandler();
                        function redirectPremium()
                        { 
                            location.href = "game.php?page=premium&showDarkMatter=1";
                        }
                        var playerId = "{$user['id']}";
                        var playerName = "{$user['username']}";
                        var isMobile = false;
                        var isMobileApp = false;
                        var isMobileOnly = false;
                        var isFacebookUser = false;
                        var overlayWidth = 770;
                        var overlayHeight = 600;
                        var isRTLEnabled = 0;
                        var activateToken = "c90e2993b3fc12794e660f04e2755a2d";
                        var miniFleetToken = "89604aa39b0644ac29e82777212cc76f";
                        var currentPage = "{$smarty.get.page}";
                        var bbcodePreviewUrl = "game.php?page=bbcodePreview";
                        var popupWindows = ["notices", "combatreport"];
                        var darkMatter = 10789272;
                        var serverTime = new Date();
                        var localTime = new Date();
                        var timeDiff = serverTime - localTime;
                        localTS = localTime.getTime();
                        var startServerTime = localTime.getTime() - (3600000) - localTime.getTimezoneOffset() * 60 * 1000;
                        var LocalizationStrings = {
                            "timeunits": {
                                "short": {
                                    "year": "y",
                                    "month": "m",
                                    "week": "w",
                                    "day": "d",
                                    "hour": "h",
                                    "minute": "m",
                                    "second": "s"
                                }
                            },
                            "status": {
                                "ready": "done"
                            },
                            "decimalPoint": ".",
                            "thousandSeperator": ".",
                            "unitMega": "M",
                            "unitKilo": "K",
                            "unitMilliard": "Bn",
                            "question": "Question",
                            "error": "Error",
                            "loading": "load...",
                            "yes": "yes",
                            "no": "No",
                            "ok": "Ok",
                            "attention": "Caution",
                            "outlawWarning": "You are about to attack a stronger player. If you do this, your attack defences will be shut down for 7 days and all players will be able to attack you without punishment. Are you sure you want to continue?",
                            "lastSlotWarningMoon": "This building will use the last available building slot. Expand your Lunar Base to receive more space. Are you sure you want to build this building?",
                            "lastSlotWarningPlanet": "This building will use the last available building slot. Expand your Terraformer or buy a Planet Field item to obtain more slots. Are you sure you want to build this building?",
                            "forcedVacationWarning": "Some game features are unavailable until your account is validated.",
                            "moreDetails": "More details",
                            "lessDetails": "Less detail",
                            "planetOrder": {
                                "lock": "Lock arrangement",
                                "unlock": "Unlock arrangement"
                            },
                            "darkMatter": "Dark Matter",
                        };
                        var constants = {
                            "espionage": 6,
                            "missleattack": 10,
                            "language": "en",
                            "name": "671"
                        };
                        var userData = {
                            "id": "{$user['id']}"
                        };
                        var missleAttackLink = "game.php?page=missileattacklayer&width=669&height=250";
                        var changeNickLink = "game.php?page=changenick";
                        var showOutlawWarning = true;
                        var miniFleetLink = "game.php?page=minifleet&ajax=1";
                        var ogameUrl = "http:\/\/localhost/ptgames-pt\/branches\/oficial_fix";
                        var startpageUrl = "http:\/\/localhost/ptgames-pt\/branches\/oficial_fix";
                        var nodePort = 19135;
                        var nodeUrl = "https:\/\/s671-en.ogame.gameforge.com:19135\/socket.io\/socket.io.js";
                        var nodeParams = {
                            "port": 19135,
                            "secure": "true"
                        };
                        var chatUrl = "game.php?page=ajaxChat";
                        var chatUrlLoadMoreMessages = "game.php?page=chatGetAdditionalMessages";
                        var chatLoca = {
                            "TEXT_EMPTY": "Where is the message?",
                            "TEXT_TOO_LONG": "The message is too long.",
                            "SAME_USER": "You cannot write to yourself.",
                            "IGNORED_USER": "You have ignored this player.",
                            "NO_DATABASE_CONNECTION": "A previously unknown error has occurred. Unfortunately your last action couldn`t be executed!",
                            "INVALID_PARAMETERS": "A previously unknown error has occurred. Unfortunately your last action couldn`t be executed!",
                            "SEND_FAILED": "A previously unknown error has occurred. Unfortunately your last action couldn`t be executed!",
                            "LOCA_ALL_ERROR_NOTACTIVATED": "This function is only available after your accounts activation.",
                            "X_NEW_CHATS": "#+# unread conversation(s)",
                            "MORE_USERS": "show more"
                        };
                        var eventboxLoca = {
                            "mission": "Mission",
                            "missions": "Missions",
                            "next misson": "DUMMY_KEY_N\u00e4chster_fertig",
                            "type": "DUMMY_KEY_Art",
                            "friendly": "own",
                            "neutral": "friendly",
                            "hostile": "hostile",
                            "nextEvent": "Next",
                            "nextEventText": "Type"
                        };
                        function redirectLogout() { 
                            location.href = "game.php?page=logout";
                        }
                        function redirectOverview() { 
                            location.href = "game.php?page=overview";
                        }
                        function initAjaxEventbox()
                        { 
                            reloadEventbox({
                                "hostile": 0,
                                "neutral": 0,
                                "friendly": 0});
                        }
                        function initAjaxResourcebox() {
                            reloadResources({
                                "metal": {
                                    "resources": {
                                        "actualFormat": "{$metal}",
                                        "actual": 1931058,
                                        "max": 9820000,
                                        "production": 12.561096964245
                                    },
                                    "tooltip": "{$Metal}|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">{$metal}<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Storage capacity:<\/th>\n                <td><span class=\"\">9.820.000<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+45.220<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Den Capacity:<\/th>\n                <td><span class=\"middlemark\">101.942<\/span><\/td>\n            <\/tr>\n        <\/table>",
                                    "class": ""
                                },
                                "crystal": {
                                    "resources": {
                                        "actualFormat": "{$crystal}",
                                        "actual": 961480,
                                        "max": 9820000,
                                        "production": 6.246770525411
                                    },
                                    "tooltip": "{$Crystal}|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">961.480<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Storage capacity:<\/th>\n                <td><span class=\"\">9.820.000<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+22.488<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Den Capacity:<\/th>\n                <td><span class=\"middlemark\">52.003<\/span><\/td>\n            <\/tr>\n        <\/table>",
                                    "class": ""
                                },
                                "deuterium": {
                                    "resources": {
                                        "actualFormat": "{$deuterium}",
                                        "actual": 384286,
                                        "max": 5355000,
                                        "production": 2.4950980767579
                                    },
                                    "tooltip": "{$Deuterium}|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"\">384.286<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Storage capacity:<\/th>\n                <td><span class=\"\">5.355.000<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+8.982<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Den Capacity:<\/th>\n                <td><span class=\"middlemark\">21.360<\/span><\/td>\n            <\/tr>\n        <\/table>",
                                    "class": ""
                                },
                                "energy": {
                                    "resources": {
                                        "actual": -158,
                                        "actualFormat": "{$energy_used}"
                                    },
                                    "tooltip": "{$Energy}|<table class=\"resourceTooltip\">\n            <tr>\n                <th>Available:<\/th>\n                <td><span class=\"overmark\">-158<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Current production:<\/th>\n                <td><span class=\"undermark\">+9.200<\/span><\/td>\n            <\/tr>\n            <tr>\n                <th>Consumption:<\/th>\n                <td><span class=\"overmark\">{$energy_used}<\/span><\/td>\n            <\/tr>\n        <\/table>",
                                    "class": "overmark"
                                },
                                "darkmatter": {
                                    "resources": {
                                        "actual": 10789272,
                                        "actualFormat": "{$user['new_message']}"
                                    },
                                    "string": "10.789M Dark Matter",
                                    "tooltip": "{$Message}|<table class=\"resourceTooltip\">\n                <tr>\n                    <th>Available:<\/th>\n                    <td><span class=\"\">10.789.272<\/span><\/td>\n                <\/tr>\n                <tr>\n                    <th>Purchased:<\/th>\n                    <td><span class=\"\">0<\/span><\/td>\n                <\/tr>\n                <tr>\n                    <th>Found:<\/th>\n                    <td><span class=\"\">10.789.272<\/span><\/td>\n                <\/tr>\n            <\/table>",
                                    "class": ""
                                }
                            });
                        }
                        function getAjaxEventbox() { 
                            $.get("game.php?page=fetchEventbox&ajax=1", reloadEventbox, "text");
                        }
                        function getAjaxResourcebox(callback) { 
                            $.get("game.php?page=fetchResources&ajax=1", function (data) { 
                                reloadResources(data, callback);
                            }, "text");
                        }
                        var changeSettingsLink = "game.php?page=changeSettings";
                        var changeSettingsToken = "b4430de41c21d9465a7bcd674363eab3";
                        var eventlistLink = "game.php?page=eventList&ajax=1";
                        function openAnnouncement() { 
                            openOverlay("game.php?page=announcement&ajax=1", {
                                'class': 'announcement',
                                zIndex: 4000
                            });
                        }
                        var timeDelta = 1469370107000 - (new Date()).getTime();
                        var LocalizationStrings = {
                            "timeunits": {
                                "short": {
                                    "year": "y",
                                    "month": "m",
                                    "week": "w",
                                    "day": "d",
                                    "hour": "h",
                                    "minute": "m",
                                    "second": "s"
                                }
                            },
                            "status": {
                                "ready": "done"
                            },
                            "decimalPoint": ".",
                            "thousandSeperator": ".",
                            "unitMega": "M",
                            "unitKilo": "K",
                            "unitMilliard": "Bn",
                            "question": "Question",
                            "error": "Error",
                            "loading": "load...",
                            "yes": "yes",
                            "no": "No",
                            "ok": "Ok",
                            "attention": "Caution",
                            "outlawWarning": "You are about to attack a stronger player. If you do this, your attack defences will be shut down for 7 days and all players will be able to attack you without punishment. Are you sure you want to continue?",
                            "lastSlotWarningMoon": "This building will use the last available building slot. Expand your Lunar Base to receive more space. Are you sure you want to build this building?",
                            "lastSlotWarningPlanet": "This building will use the last available building slot. Expand your Terraformer or buy a Planet Field item to obtain more slots. Are you sure you want to build this building?",
                            "forcedVacationWarning": "Some game features are unavailable until your account is validated.",
                            "moreDetails": "More details",
                            "lessDetails": "Less detail",
                            "planetOrder": {
                                "lock": "Lock arrangement",
                                "unlock": "Unlock arrangement"
                            },
                            "darkMatter": "Dark Matter"
                        };
                        $(document).ready(function () { 
                            initEventTable();
                        });
                        var player = {
                            hasCommander: true
                        };
                        var localizedBBCode = {
                            "bold": "Bold",
                            "italic": "Italic",
                            "underline": "Underline",
                            "stroke": "Strikethrough",
                            "sub": "Subscript",
                            "sup": "Superscript",
                            "fontColor": "Font colour",
                            "fontSize": "Font size",
                            "backgroundColor": "Background colour",
                            "backgroundImage": "Background image",
                            "tooltip": "Tool-tip",
                            "alignLeft": "Left align",
                            "alignCenter": "Centre align",
                            "alignRight": "Right align",
                            "alignJustify": "Justify",
                            "block": "Break",
                            "code": "Code",
                            "spoiler": "Spoiler",
                            "moreopts": "More Options",
                            "list": "List",
                            "hr": "Horizontal line",
                            "picture": "Image",
                            "link": "Link",
                            "email": "Email",
                            "player": "Player",
                            "item": "Item",
                            "coordinates": "Coordinates",
                            "preview": "Preview",
                            "textPlaceHolder": "Text...",
                            "playerPlaceHolder": "Player ID or name",
                            "itemPlaceHolder": "Item ID",
                            "coordinatePlaceHolder": "Galaxy:system:position",
                            "charsLeft": "Characters remaining",
                            "colorPicker": {
                                "ok": "Ok",
                                "cancel": "Cancel",
                                "rgbR": "R",
                                "rgbG": "G",
                                "rgbB": "B"
                            },
                            "backgroundImagePicker": {
                                "ok": "Ok",
                                "repeatX": "Repeat horizontally",
                                "repeatY": "Repeat vertically"
                            }
                        };
                        $(document).ready(function () {
                            initIndex();
                            initAjaxEventbox();
                            initChangelog();
                        });
                    </script>