                    <div id="links">
                        <ul id="menuTable" class="leftmenu">
                            <li>
                                <span class="menu_icon">
                                    <a href="game.php?page=rewards" class="tooltipRight js_hideTipOnMobile " target="_self" title="Rewards">
                                        <div class="menuImage overview highlighted"></div>
                                    </a>
                                </span>
                                <a class="menubutton  selected" href="game.php?page=overview" accesskey="g" target="_self" >
                                    <span class="textlabel">{$Overview}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <a href="game.php?page=resources" class="tooltipRight js_hideTipOnMobile " target="_self" title="{$Resources}">
                                        <div class="menuImage resources"></div>
                                    </a>
                                </span>
                                <a class="menubutton " href="game.php?page=buildings" accesskey="b" target="_self" >
                                    <span class="textlabel">{$Buildings}</span>
                                </a>
                            </li>{if $enable_marchand == 1}
                            <li>{if $enable_announces == 1}
                                <span class="menu_icon">
                                    <a href="game.php?page=traderOverview#page=annonce&animation=false" class="trader tooltipRight js_hideTipOnMobile " target="_self" title="Annonces">
                                        <div class="menuImage traderOverview"></div>
                                    </a>
                                </span>{/if}
                                <a class="menubutton premiumHighligt" href="game.php?page=marchand" accesskey="" target="_self" >
                                    <span class="textlabel">Marchand</span>
                                </a>
                            </li>{/if}
                            <li>
                                <span class="menu_icon">
                                    <a href="game.php?page=techtree&tab=3&open=all" class="overlay tooltipRight js_hideTipOnMobile " target="_blank" title="{$Technology}">
                                        <div class="menuImage research"></div>
                                    </a>
                                </span>
                                <a class="menubutton " href="game.php?page=research" accesskey="r" target="_self" >
                                    <span class="textlabel">{$Research}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage shipyard"></div>
                                </span>
                                <a class="menubutton " href="game.php?page=shipyard" accesskey="" target="_self" >
                                    <span class="textlabel">{$Shipyard}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage defense"></div>
                                </span>
                                <a class="menubutton " href="game.php?page=defense" accesskey="" target="_self" >
                                    <span class="textlabel">{$Defense}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <a href="game.php?page=fleetmovement" class="tooltipRight js_hideTipOnMobile " target="_self" title="{$Fleet_Movement}">
                                        <div class="menuImage fleet1 active"></div>
                                    </a>
                                </span>
                                <a class="menubutton " href="game.php?page=fleet" accesskey="" target="_self" >
                                    <span class="textlabel">{$Fleet}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage galaxy"></div>
                                </span>
                                <a class="menubutton " href="game.php?page=galaxy&type=0" accesskey="" target="_self" >
                                    <span class="textlabel">{$Galaxy}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage empire"></div>
                                </span>
                                <a class="menubutton " href="game.php?page=imperium" accesskey="" target="_blank" >
                                    <span class="textlabel">{$Imperium}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage alliance"></div>
                                </span>
                                <a class="menubutton " href="game.php?page=alliance" accesskey="" target="_self" >
                                    <span class="textlabel">{$Alliance}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage premium"></div>
                                </span>
                                <a class="menubutton premiumHighligt officers" href="game.php?page=officier" accesskey="" target="_self" >
                                    <span class="textlabel">{$Officiers}</span>
                                </a>
                            </li>
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage feedback"></div>
                                </span>
                                <a class="menubutton overlay" href="game.php?page=banned" target="_self" data-overlay-title=Feedback >
                                    <span class="textlabel">{$blocked}</span>
                                </a>
                            </li>{if $Level > 0}
                            <li>
                                <span class="menu_icon">
                                    <div class="menuImage shop"></div>
                                </span>
                                <a class="menubutton premiumHighligt" href="admin.php?page=overview" accesskey="" target="_self" >
                                    <span class="textlabel"><font color="lime">{$user_level[$Level]}</font></span>
                                </a>
                            </li>{/if}
                        </ul>
                        <div class="adviceWrapper">
                            <div id="advice-bar">
                            </div>
                        </div>
                        <div id="toolLinksWrapper">
                            <ul id="menuTableTools" class="leftmenu">
                                <table width="130" cellspacing="0" cellpadding="0">
                                    <tr><td colspan="2" background="{$dpath}img/bg1.gif"><center>{$infog}</center></td></tr>
                                    <tr>
                                        <td style="padding-left: 3px">{$lm_ifo_game}</td>
                                        <td align="right" style="padding-right: 3px">x {$lm_tx_game}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-left: 3px">{$lm_ifo_fleet}</td>
                                        <td align="right" style="padding-right: 3px">x {$lm_tx_fleet}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-left: 3px">{$lm_ifo_serv}</td>
                                        <td align="right" style="padding-right: 3px">x {$lm_tx_serv}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding-left: 3px">{$lm_ifo_queue}</td>
                                        <td align="right" style="padding-right: 3px">{$lm_tx_queue}</td>
                                    </tr>
                                </table>
                            </ul>
                        </div>
                        <br class="clearfloat" />
                    </div>