{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="519">
                <tr>
                    <td class="c" colspan="4">
                        <a href="game.php?page=planetlayer" title="{$Planet_menu}">{$Planet} "{$planet_name}"</a> ({$user_username})
                    </td>
                </tr>
                {if $user_new_message != 0}
                <tr>{if $user_new_message == 1}
                    <th colspan=4><a href=game.php?page=messages>{$Have_new_message}</a></th>
                {else}
                    <th colspan=4>
                        <a href=game.php?page=messages>
                            {str_replace('%m', pretty_number($user_new_message), $Have_new_messages)}
                        </a>
                    </th>{/if}
                </tr>{/if}{if ($LvlUpMinier + $LvlUpRaid) <= 100}{if $XpMinier >= $XpMinierUp}
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
                <tr>
                    <th>{$Diameter}</th>
                    <th colspan="3">
                        {$planet_diameter} km (<a title="{$Developed_fields}">{$planet_field_current}</a> / 
                        <a title="{$max_eveloped_fields}">{$planet_field_max}</a> {$fields})
                    </th>
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
                    <th>{$Temperature}</th>
                    <th colspan="3">{$ov_temp_from} {$planet_temp_min}{$ov_temp_unit} {$ov_temp_to} {$planet_temp_max}{$ov_temp_unit}</th>
                </tr>
                <tr>
                    <th>{$Position}</th>
                    <th colspan="3"><a href="game.php?page=galaxy&type=0&galaxy={$galaxy_galaxy}&system={$galaxy_system}">[{$galaxy_galaxy}:{$galaxy_system}:{$galaxy_planet}]</a></th>
                </tr>
                <tr>
                    <th>{$ov_local_cdr}</th>
                    <th colspan="3">{$Metal} : {$metal_debris} / {$Crystal} : {$crystal_debris}{$get_link}</th>
                </tr>
                <tr>
                    <th>{$Points}</th>
                    <th colspan="3">
                        <table border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$ov_pts_build} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$user_points}</b></td>
                                </tr>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$ov_pts_fleet} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$user_fleet}</b></td>
                                </tr>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$ov_pts_reche} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$player_points_tech}</b></td>
                                </tr>
                                <tr>
                                    <td align="right" width="50%" style="background-color: transparent;"><b>{$ov_pts_total} :</b></td>
                                    <td align="left" width="50%" style="background-color: transparent;"><b>{$total_points}</b></td>
                                </tr>
                                <tr>
                                    <td colspan="2" align="center" width="100%" style="background-color: transparent;">
                                        <b>({$Rank} <a href="game.php?page=stat&range={$u_user_rank}">{$user_rank}</a> {$of} {$max_users})</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </th>
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