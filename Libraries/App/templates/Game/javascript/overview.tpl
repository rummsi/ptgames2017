
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery_UI.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/AnythingSlider.js'></script>
                    <script type='text/javascript' src='scripts/PTGAMES/jQuery BBQ.js'></script>
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
                        var planetMoveLoca = {
                            "askTitle": "Resettle Planet",
                            "askCancel": "Are you sure that you wish to cancel this planet relocation? The normal waiting time will thereby be maintained.",
                            "yes": "yes",
                            "no": "No",
                            "success": "The planet relocation was successfully cancelled.",
                            "error": "Error"
                        };
                        function openPlanetRenameGiveupBox() {
                            openOverlay("game.php?page=planetlayer", {
                                title: "{$Planet_menu} {$planet_name}",
                                'class': "planetRenameOverlay"
                            });
                        }
                        var textContent = [];
                        textContent[0] = "{$Diameter}:";
                        textContent[1] = "{$planet_diameter}km (<span>{$planet_field_current}<\/span>\/<span>{$planet_field_max}<\/span>)";
                        textContent[2] = "{$Temperature}:";
                        textContent[3] = "{$planet_temp_min}{$ov_temp_unit} {$ov_temp_to} {$planet_temp_max}{$ov_temp_unit}";
                        textContent[4] = "{$Position}:";
                        textContent[5] = "<a  href=\"game.php?page=galaxy&type=0&galaxy={$galaxy_galaxy}&system={$galaxy_system}\" >[{$galaxy_galaxy}:{$galaxy_system}:{$galaxy_planet}]<\/a>";
                        textContent[6] = "{$Points}:";
                        textContent[7] = "<a href='game.php?page=stat&range={$u_user_rank}'>{$total_points} ({$Rank} {$user_rank} {$of} {$max_users})<\/a>";
                        var textDestination = [];
                        textDestination[0] = "diameterField";
                        textDestination[1] = "diameterContentField";
                        textDestination[2] = "temperatureField";
                        textDestination[3] = "temperatureContentField";
                        textDestination[4] = "positionField";
                        textDestination[5] = "positionContentField";
                        textDestination[6] = "scoreField";
                        textDestination[7] = "scoreContentField";
                        var currentIndex = 0;
                        var currentChar = 0;
                        var linetwo = 0;
                        var locaPremium = {
                            "buildingHalfOverlay": "Do you want to reduce the construction time by 50% of the total construction time () for <b>750 Dark Matter<\/b>?",
                            "buildingFullOverlay": "Do you want to immediately complete the construction order for <b>750 Dark Matter<\/b>?",
                            "shipsHalfOverlay": "Do you want to reduce the construction time by 50% of the total construction time () for <b>750 Dark Matter<\/b>?",
                            "shipsFullOverlay": "Do you want to immediately complete the construction order for <b>750 Dark Matter<\/b>?",
                            "researchHalfOverlay": "Do you want to reduce the research time by 50% of the total research time () for <b>750 Dark Matter<\/b>?",
                            "researchFullOverlay": "Do you want to immediately complete the research order for <b>750 Dark Matter<\/b>?"
                        };
                        var priceBuilding = 750;
                        var priceResearch = 750;
                        var priceShips = 750;
                        var loca = loca || { };
                        loca = $.extend({
                        },
                        loca, {
                            "error": "Error",
                            "errorNotEnoughDM": "Not enough Dark Matter available! Do you want to buy some now?",
                            "notice": "Reference",
                            "planetGiveupQuestion": "Are you sure you want to abandon the planet %planetName% %planetCoordinates%?",
                            "moonGiveupQuestion": "Are you sure you want to abandon the moon %planetName% %planetCoordinates%?"
                        });
                        function type()
                        { 
                            var destination = document.getElementById(textDestination[currentIndex]);
                            if (destination) { 
                                if (textContent[currentIndex].substr(currentChar, 1) == "<" && linetwo != 1) { 
                                    while (textContent[currentIndex].substr(currentChar, 1) != ">") { 
                                        currentChar++;
                                    }
                                }
                                if (linetwo == 1) { 
                                    destination.innerHTML = textContent[currentIndex];
                                    currentChar = destination.innerHTML = textContent[currentIndex].length + 1;
                                } else { 
                                    destination.innerHTML = textContent[currentIndex].substr(0, currentChar) + "_";
                                    currentChar++;
                                }
                                if (currentChar > textContent[currentIndex].length) { 
                                    destination.innerHTML = textContent[currentIndex];
                                    currentIndex++;
                                    currentChar = 0;
                                    if (currentIndex < textContent.length) { 
                                        type();
                                    }
                                } else { 
                                    setTimeout("type()", 15);
                                }
                            }
                        }
                        function planetRenamed(data)
                        { 
                            var data = $.parseJSON(data);
                            if (data["status"]) { 
                                $("#planetNameHeader").html(data["newName"]);
                                reloadRightmenu("game.php?page=rightmenu&renamed=1&pageToLink=overview");
                                $(".overlayDiv.planetRenameOverlay").dialog('close');
                            }
                            errorBoxAsArray(data["errorbox"]);
                        }
                        function reloadPage()
                        { 
                            location.href = "game.php?page=overview";
                        }
                        var demolish_id;
                        var buildUrl;
                        function loadDetails(type)
                        { 
                            url = "game.php?page=overview&ajax=1";
                            if (typeof (detailUrl) != 'undefined') { 
                                url = detailUrl;
                            }
                            $.get(url, { type: type}, function (data) { 
                                $("#detail").html(data);
                                $("#techDetailLoading").hide();
                                $("input[type='text']:first", document.forms["form"]).focus();
                                $(document).trigger("ajaxShowElement", techID);
                            });
                        }
                        function sendBuildRequest(url, ev, showSlotWarning)
                        { 
                            if (ev != undefined) { 
                                var keyCode;
                                if (window.event) { 
                                    keyCode = window.event.keyCode;
                                } else if (ev) { 
                                    keyCode = ev.which;
                                } else { 
                                    return true;
                                }
                                if (keyCode != 13) { 
                                    return true;
                                }
                            }
                            function build() { 
                                if (url == null) { 
                                    sendForm();
                                } else { 
                                    fastBuild();
                                }
                            }
                            if (url == null) { 
                                fallBackFunc = sendForm;
                            } else { 
                                fallBackFunc = build;
                                buildUrl = url;
                            }
                            if (showSlotWarning) { 
                                build();
                            } else { 
                                build();
                            }
                            return false;
                        }
                        function fastBuild() { 
                            location.href = buildUrl;
                            return false;
                        }
                        function sendForm() { 
                            document.form.submit();
                            return false;
                        }
                        function demolishBuilding(id, question) { 
                            demolish_id = id;
                            question += "<br/><br/>" + $("#demolish" + id).html();
                            errorBoxDecision("Caution", "" + question + "", "yes", "No", demolishStart);
                        }
                        function demolishStart()
                        { 
                            window.location.replace("game.php?page=overview&modus=3&token=7a5601ff7b1a060d44327f64a04da88b&type=" + demolish_id);
                        }
                        gfSlider = new GFSlider(getElementByIdWithCache('detailWrapper'));
                        var detailUrl = "game.php?page=buffActivation&ajax=1";
                        var cancelProduction_id;
                        var production_listid;
                        function cancelProduction(id, listid, question)
                        { 
                            cancelProduction_id = id;
                            production_listid = listid;
                            errorBoxDecision("Caution", "" + question + "", "yes", "No", cancelProductionStart);
                        }
                        function cancelProductionStart()
                        { 
                            window.location.replace("game.php?page=overview&modus=2&token=2e0c5e160ebc97485096d653aff590f1&techid=" + cancelProduction_id + "&listid=" + production_listid);
                        }
                        function initType() { 
                            type();
                        }
                        new baulisteCountdown(getElementByIdWithCache("moveCountdown"), -1469370107);
                        $('#planet').find('h2 a').hover(function () { 
                            $('#planet').find('h2 a img').toggleClass('hinted');
                        }, function () { 
                            $('#planet').find('h2 a img').toggleClass('hinted');
                        });
                        var player = {
                            hasCommander: true
                        };
                        var localizedBBCode = {
                            "bold": "Bold",
                            "italic": "Italic",
                            "underline": "Underline",
                            "stroke": "Strikethrough",
                            "sub": "Subscript", "sup": "Superscript",
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
                            initOverview();
                            initBuffBar();
                            initType();
                            tabletInitOverviewAdvice();
                            }
                        );
                    </script>