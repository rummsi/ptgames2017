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
                {$no_fleet}
                {$noslotfree}
            </table>
        </center>
{/block}