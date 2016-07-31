{block name="title" prepend}{/block}
{block name="content"}
                            <div id="planet" style="background-image:url(https://gf2.geo.gfsrv.net/cdndd/09a2a0d07394b5a7b5db40f5cbb8cc.jpg);">
                                <div id="detailWrapper">
                                    <div id="header_text">
                                        <h2>
                                            <a href="javascript:void(0);" class="openPlanetRenameGiveupBox">
                                                <p class="planetNameOverview">{$Overview} -</p>
                                                <span id="planetNameHeader">{$planet_name}</span>
                                                <img class="hinted tooltip" title="{$Planet_menu}" src="{$dpath}redesign/1f57d944fff38ee51d49c027f574ef.gif" height="16" width="16">
                                            </a>
                                        </h2>
                                    </div>
                                    <div id="detail" class="detail_screen">
                                        <div id="techDetailLoading"></div>
                                    </div>
                                    <div id="planetdata">
                                        <div class="overlay"></div>
                                        <div id="planetDetails">
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tbody><tr>
                                                        <td class="desc">
                                                            <span id="diameterField"></span>
                                                        </td>
                                                        <td class="data">
                                                            <span id="diameterContentField"></span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="desc">
                                                            <span id="temperatureField"></span>
                                                        </td>
                                                        <td class="data">
                                                            <span id="temperatureContentField"></span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="desc">
                                                            <span id="positionField"></span>
                                                        </td>
                                                        <td class="data">
                                                            <span id="positionContentField"></span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="desc">
                                                            <span id="scoreField"></span></td>
                                                        <td class="data">
                                                            <span id="scoreContentField"></span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="planetOptions">
                                            <div class="planetMoveStart fleft" style="display: inline;">
                                                <a class="tooltipLeft dark_highlight_tablet fleft" style="display: inline-block" href="game.php?page=stat" title="
                &lt;tr&gt;
                    &lt;th colspan='3'&gt;
                        &lt;table border='0' width='100%'&gt;
                            &lt;tbody&gt;
                                &lt;tr&gt;
                                    &lt;td align='right' width='50%' style='background-color: transparent;'&gt;&lt;b&gt;{$ov_pts_build} :&lt;/b&gt;&lt;/td&gt;
                                    &lt;td align='left' width='50%' style='background-color: transparent;'&gt;&lt;b&gt;{$user_points}&lt;/b&gt;&lt;/td&gt;
                                &lt;/tr&gt;
                                &lt;tr&gt;
                                    &lt;td align='right' width='50%' style='background-color: transparent;'&gt;&lt;b&gt;{$ov_pts_fleet} :&lt;/b&gt;&lt;/td&gt;
                                    &lt;td align='left' width='50%' style='background-color: transparent;'&gt;&lt;b&gt;{$user_fleet}&lt;/b&gt;&lt;/td&gt;
                                &lt;/tr&gt;
                                &lt;tr&gt;
                                    &lt;td align='right' width='50%' style='background-color: transparent;'&gt;&lt;b&gt;{$ov_pts_reche} :&lt;/b&gt;&lt;/td&gt;
                                    &lt;td align='left' width='50%' style='background-color: transparent;'&gt;&lt;b&gt;{$player_points_tech}&lt;/b&gt;&lt;/td&gt;
                                &lt;/tr&gt;
                            &lt;/tbody&gt;
                        &lt;/table&gt;
                    &lt;/th&gt;
                &lt;/tr&gt;
                                                   " data-tooltip-button="To galaxy">
                                                    <span class="planetMoveIcons planetMoveDefault icon"></span>
                                                    <span class="planetMoveOverviewMoveLink">{$Points}</span>
                                                </a>
                                            </div>
                                            <a class="dark_highlight_tablet float_right openPlanetRenameGiveupBox" href="javascript:void(0);">
                                                <span class="planetMoveOverviewGivUpLink">{$Planet_menu}</span>
                                                <span class="planetMoveIcons settings planetMoveGiveUp icon"></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div id="moon">            
                                    <a href="game.php?page=overview&cp={$lune['id']}&re=0" class="tooltipBottom js_hideTipOnMobile" title="{$lune['name']}">
                                        <img alt="Moon" src="{$dpath}planeten/{$lune['image']}.jpg">
                                    </a>
                                </div>
                            </div>
                            <div class="c-left"></div>
                            <div class="c-right"></div>
                            <div id="overviewBottom">
                                <div class="content-box-s">
                                    <div class="header">
                                        <h3>{$Buildings}</h3>
                                    </div>
                                    <div class="content">
                                        <table class="construction active" cellpadding="0" cellspacing="0">
                                            <tbody><tr>
                                                    <td colspan="2" class="idle">
                                                        <a class="tooltip js_hideTipOnMobile
                                                           " title="At the moment there is no building being built on this planet. Click here to get to resources." href="https://s671-en.ogame.gameforge.com/game/index.php?page=resources">
                                                            No buildings in construction.<br>(To resources)                            </a>
                                                    </td>
                                                </tr>
                                            </tbody></table>
                                    </div>
                                    <div class="footer"></div>
                                </div>
                                <div class="content-box-s">
                                    <div class="header">
                                        <h3>{$Research}</h3>
                                    </div>
                                    <div class="content">    
                                        <table class="construction active" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td colspan="2" class="idle">
                                                        <a class="tooltip js_hideTipOnMobile
                                                           " title="There is no research done at the moment. Click here to get to your research lab." href="https://s671-en.ogame.gameforge.com/game/index.php?page=research">
                                                            There is no research in progress at the moment.<br>(To research)                            </a>
                                                    </td>
                                                </tr>   
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="footer"></div>
                                </div>
                                <div class="content-box-s">
                                    <div class="header">
                                        <h3>{$Shipyard}</h3>
                                    </div>
                                    <div class="content">    
                                        <table class="construction active" cellpadding="0" cellspacing="0">
                                            <tbody>
                                                <tr>
                                                    <td colspan="2" class="idle">
                                                        <a class="tooltip js_hideTipOnMobile
                                                           " title="At the moment there are no ships or defence being built on this planet. Click here to get to the shipyard." href="https://s671-en.ogame.gameforge.com/game/index.php?page=shipyard">
                                                            No ships/defence in construction.<br>(To shipyard)                        </a>

                                                    </td>
                                                </tr>   
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="footer"></div>
                                </div>
                                <div class="clearfloat"></div>
                            </div><!-- #overviewBottom -->
                            
                            <center>
            <br>
            <table width="519">{if ($LvlUpMinier + $LvlUpRaid) <= 100}{if $XpMinier >= $XpMinierUp}
                <tr><th colspan=4><a href=game.php?page=officier>teste2{$Have_new_level_mineur}</a></th></tr>{/if}{if $XPRaid >= $XpRaidUp}
                <tr><th colspan=4><a href=game.php?page=officier>{$Have_new_level_raid}teste3</a></th></tr>{/if}{/if}
                <tr>
                    <th>{$MembersOnline}</th>
                    <th colspan="3">{$NumberMembersOnline}</th>
                </tr>{if $NewsFrame == '1'}
                <tr><th>{$ov_news_title}</th><th colspan="3">{stripslashes($OverviewNewsText)}</th></tr>{/if}
                <tr>
                    <th>{$moon_img}<br>{$moon}</th>
                    <th colspan="2"><img src="{$dpath}planeten/{$planet_image}.jpg" height="200" width="200"><br>{$building}</th>
                    <th class="s"><table class="s" align="top" border="0"><tr>{$anothers_planets}</tr></table></th>
                </tr>
                <th>{$Developed_fields}</th>
                <th colspan="3" align="center">
                    <div  style="border: 1px solid rgb(153, 153, 255); width: 400px;">
                        <div  id="CaseBarre" style="background-color: {$case_barre_barcolor}; width: {$case_barre}px;">
                            <font color="#CCF19F">{$case_pourcentage}</font>
                        </div>
                    </div>
                </th>
                <tr>
                    <th>{$ov_off_level}</th>
                    <th colspan="3" align="center">
                        <table border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td align="center" width="50%" style="background-color: transparent;"><b>{$ov_off_mines} : {$lvl_minier}</b></td>
                                    <td align="center" width="50%" style="background-color: transparent;"><b>{$ov_off_raids} : {$lvl_raid}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </th>
                </tr>
                <tr>
                    <th>{$ov_off_expe}</th>
                    <th colspan="3" align="center">
                        <table border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td align="center" width="50%" style="background-color: transparent;"><b>{$ov_off_mines} : {$xpminier} / {$lvl_up_minier}</b></td>
                                    <td align="center" width="50%" style="background-color: transparent;"><b>{$ov_off_raids} : {$xpraid} / {$lvl_up_raid}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </th>
                </tr>
                <tr>
                    <th>{$ov_local_cdr}</th>
                    <th colspan="3">{$Metal} : {$metal_debris} / {$Crystal} : {$crystal_debris}{$get_link}</th>
                </tr>
                <tr>
                    <th>{$Raids}</th>
                    <th colspan="3">
                        <table border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$NumberOfRaids} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$raids}</b></td>
                                </tr>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$RaidsWin} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$raidswin}</b></td>
                                </tr>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$RaidsLoose} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$raidsloose}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </th>
                </tr>{if $bannerframe == '1'}
                <tr>
                    <th colspan="4"><img src="scripts/createbanner.php?id={$user_id}"><br>{$InfoBanner}<br><input name="bannerlink" type="text" id="bannerlink" value="[img]{dirname($smarty.server.HTTP_REFERER)}/scripts/createbanner.php?id={$user_id}[/img]" size="62"></th>
                </tr>{/if}{if $ExternalTchatFrame == '1'}<tr><th colspan="4">{stripslashes($OverviewExternChatCmd)}</th></tr>{/if}
            </table>
            <br>
            {if $ClickBanner != ''}{stripslashes($ClickBanner)}{/if}
            <br>
        </center>{/block}