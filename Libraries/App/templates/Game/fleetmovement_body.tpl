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
        </center>{/block}