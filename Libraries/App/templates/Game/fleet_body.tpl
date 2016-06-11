{block name="title" prepend}{/block}
{block name="content"}        <script language="JavaScript" src="scripts/flotten.js"></script>
        <script language="JavaScript" src="scripts/ocnt.js"></script>
        <br>
        <center>
            <table width='519' border='0' cellpadding='0' cellspacing='1'>
                <tr height='20'>
                    <td colspan='9' class='c'>
                        <table border="0" width="100%">
                            <tbody>
                                <tr>
                                    <td style="background-color: transparent;">
                                        {$lang['fl_title']} {$MaxFlyingFleets} {$lang['fl_sur']} {$MaxFlottes}
                                    </td>
                                    <td style="background-color: transparent;" align="right">
                                        {$maxexpde['expedi']} / {1 + floor($MaxExpedition / 3)} {$lang['fl_expttl']}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr height='20'>
                    <th>{$lang['fl_id']}</th>
                    <th>{$lang['fl_mission']}</th>
                    <th>{$lang['fl_count']}</th>
                    <th>{$lang['fl_from']}</th>
                    <th>{$lang['fl_start_t']}</th>
                    <th>{$lang['fl_dest']}</th>
                    <th>{$lang['fl_dest_t']}</th>{*<th>{$lang['fl_back_t']}</th>*}
                    <th>{$lang['fl_back_in']}</th>
                    <th>{$lang['fl_order']}</th>
                </tr>{*// Gestion des flottes du joueur actif*}{while $f = mysqli_fetch_array($fq)}<!--{$i++}-->
                <tr height=20>{*// (01) Fleet ID*}
                    <th>{$i}</th>{*// (02) Fleet Mission*}
                    <th>
                    <a>{$missiontype[$f['fleet_mission']]}</a>{if ($f['fleet_start_time'] + 1) == $f['fleet_end_time']}
                        <br><a title="{$lang['fl_back_to_ttl']}">{$lang['fl_back_to']}</a>{else}
                        <br><a title="{$lang['fl_get_to_ttl']}">{$lang['fl_get_to']}</a>{/if}
                    </th>{*// (03) Fleet Mission*}
                    <th><a title="{*// Fleet details (commentaire)*}{foreach explode(";", $f['fleet_array']) as $a => $b}{if $b != ''}{$a = explode(",", $b)}<!--{$e++}-->{$lang['tech'][$a[0]]}:{$a[1]}{if $e > 1}\t{/if}{/if}{/foreach}">{pretty_number($f['fleet_amount'])}</a></th>{*// (04) Fleet From (Planete d'origine)*}
                    <th>[{$f['fleet_start_galaxy']}:{$f['fleet_start_system']}:{$f['fleet_start_planet']}]</th>{*// (05) Fleet Start Time*}
                    <th>{gmdate("d. M Y H:i:s", $f['fleet_start_time'])}</th>{*// (06) Fleet Target (Planete de destination)*}
                    <th>[{$f['fleet_end_galaxy']}:{$f['fleet_end_system']}:{$f['fleet_end_planet']}]</th>{*// (07) Fleet Target Time*}
                    <th>{gmdate("d. M Y H:i:s", $f['fleet_end_time'])}</th>{*// (08) Fleet Back Time*}{*//<th><font color="lime"><div id="time_0"><font>{pretty_time(floor($f['fleet_end_time'] + 1 - time()))}</font></th>*}{*// (09) Fleet Back In*}
                    <th><font color="lime"><div id="time_0"><font>{pretty_time(floor($f['fleet_end_time'] + 1 - time()))}</font></th>{*// (10) Orders*}
                    <th>{if ($f['fleet_mess'] == 0)}
                        <form action="game.php?page=fleetback" method="post">
                            <input name="fleetid" value="{$f['fleet_id']}" type="hidden">
                            <input value="{$lang['fl_back_to_ttl']}" type="submit" name="send">
                        </form>{if ($f['fleet_mission'] == 1)}
                        <form action="verband.php" method="post">
                            <input name="fleetid" value="{$f['fleet_id']}" type="hidden">
                            <input value="{$lang['fl_associate']}" type="submi">
                        </form>{/if}{else}
                        &nbsp;-&nbsp;{/if}
                    </th>{*// Fin de ligne*}
                </tr>{/while} {*// Y a pas de flottes en vol ... on met des '-'*}{if ($i == 0)}
                <tr>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>
                    <th>-</th>{*<th>-</th>*}
                    <th>-</th>
                    <th>-</th>
                </tr>{/if}{if $MaxFlottes == $MaxFlyingFleets}
                <tr height="20">
                    <th colspan=""><font color="red">{$lang['fl_noslotfree']}</font></th>
                </tr>{/if}
            </table>
        </center>
        <center>{*// Selection d'une nouvelle mission*}
            <form action="game.php?page=floten1" method="post">
                <table width="519" border="0" cellpadding="0" cellspacing="1">
                    <tr height="20">
                        <td colspan="4" class="c">{$lang['fl_new_miss']}</td>
                    </tr>
                    <tr height="20">
                        <th>{$lang['fl_fleet_typ']}</th>
                        <th>{$lang['fl_fleet_disp']}</th>
                        <th>-</th>
                        <th>-</th>
                    </tr>
                    {if !$planetrow}
                        {message($lang['fl_noplanetrow'], $lang['fl_error'])}
                    {/if}
        {*// Prise des coordonnées sur la ligne de commande*}{foreach $reslist['fleet'] as $n => $i}{if ($planetrow[$resource[$i]] > 0)}
                    <tr height="20">
                        <th><a title="{$lang['fl_fleetspeed']}{$CurrentShipSpeed}">{$lang['tech'][$i]}</a></th>
                        <th>{pretty_number($planetrow[$resource[$i]])}</th>{*// Satelitte Solaire (eux ne peuvent pas bouger !)*}{if ($i == 212)}
                        <th></th>
                        <th></th>{else}
                        <th><a href="javascript:maxShip('ship{$i}'); shortInfo();">{$lang['fl_selmax']}</a></th>
                        <th><input name="ship{$i}" size="10" value="0" onfocus="javascript:if(this.value == '0') this.value='';" onblur="javascript:if(this.value == '') this.value='0';" alt="{$lang['tech'][$i]}{$planetrow[$resource[$i]]}" onChange="shortInfo()" onKeyUp="shortInfo()" /></th>{/if}
                    </tr>{/if}<!--{$have_ships = true}-->{/foreach}
                    <tr height="20">{if !$have_ships}{*// Il n'y a pas de vaisseaux sur cette planete*}
                        <th colspan="4">{$lang['fl_noships']}</th>
                    </tr>
                    <tr height="20">
                        <th colspan="4"><input type="submit" value="{$lang['fl_continue'] }" /></th>{else}
                        <th colspan="2"><a href="javascript:noShips();shortInfo();noResources();" >{$lang['fl_unselectall']}</a></th>
                        <th colspan="2"><a href="javascript:maxShips();shortInfo();" >{$lang['fl_selectall']}</a></th>
                    </tr>{if $MaxFlottes > $MaxFlyingFleets}
                    <tr height="20">
                        <th colspan="4"><input type="submit" value="{$lang['fl_continue']}" /></th>{/if}{/if}
                    </tr>
                </table>{foreach $reslist['fleet'] as $n => $i}{if $planetrow[$resource[$i]] > 0}
                <input type="hidden" name="maxship{$i}" value="{$planetrow[$resource[$i]]}" />
                <input type="hidden" name="consumption{$i}" value="{GetShipConsumption($i, $user)}" />
                <input type="hidden" name="speed{$i}" value="{GetFleetMaxSpeed("", $i, $user)}" />
                <input type="hidden" name="capacity{$i}" value="{$pricelist[$i]['capacity']}" />{/if}{/foreach}
                <input type="hidden" name="galaxy" value="{$galaxy}" />
                <input type="hidden" name="system" value="{$system}" />
                <input type="hidden" name="planet" value="{$planet}" />
                <input type="hidden" name="planet_type" value="{$planettype}" />
                <input type="hidden" name="mission" value="{$target_mission}" />
                <input type="hidden" name="maxepedition" value="{1 + floor($MaxExpedition / 3)}" />
                <input type="hidden" name="curepedition" value="{$maxexpde['expedi']}" />
                <input type="hidden" name="target_mission" value="{$target_mission}" />
            </form>
        </center>{/block}