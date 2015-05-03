{block name="title" prepend}{/block}
{block name="content"}
        <script language="JavaScript" src="scripts/flotten.js"></script>
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
                                        {$fl_title} {$MaxFlyingFleets} {$fl_sur} {$MaxFlottes}
                                    </td>
                                    <td style="background-color: transparent;" align="right">
                                        {$ExpeditionEnCours}/{$EnvoiMaxExpedition} {$fl_expttl}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr height='20'>
                    <th>{$fl_id}</th>
                    <th>{$fl_mission}</th>
                    <th>{$fl_count}</th>
                    <th>{$fl_from}</th>
                    <th>{$fl_start_t}</th>
                    <th>{$fl_dest}</th>
                    <th>{$fl_dest_t}</th>
                    <!--<th>{$fl_back_t}</th>-->
                    <th>{$fl_back_in}</th>
                    <th>{$fl_order}</th>
                </tr>
                {$fleet_table}
                {isset($no_fleet)}
                {isset($noslotfree)}
            </table>
        </center>
        <center>
            <form action="game.php?page=floten1" method="post">
                <table width="519" border="0" cellpadding="0" cellspacing="1">
                    <tr height="20">
                        <td colspan="4" class="c">{$fl_new_miss}</td>
                    </tr>
                    <tr height="20">
                        <th>{$fl_fleet_typ}</th>
                        <th>{$fl_fleet_disp}</th>
                        <th>-</th>
                        <th>-</th>
                    </tr>
                    {$ShipData}
                    <tr height="20">
                        {$have_ships1}
                    </tr>
                </table>
                    <input type="hidden" name="galaxy" value="{$galaxy}" />
                    <input type="hidden" name="system" value="{$system}" />
                    <input type="hidden" name="planet" value="{$planet}" />
                    <input type="hidden" name="planet_type" value="{$planettype}" />
                    <input type="hidden" name="mission" value="{$target_mission}" />
                    <input type="hidden" name="maxepedition" value="{$EnvoiMaxExpedition}" />
                    <input type="hidden" name="curepedition" value="{$ExpeditionEnCours}" />
                    <input type="hidden" name="target_mission" value="{$target_mission}" />
                </form>
            </center>
{/block}