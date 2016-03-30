<tr height=20>
    <th>{$i}</th>
    <th>
        <a>{$mf_fleet_missiion}</a>
        {$fleet_destination}
    </th>
    <th><a title="{$fleet_ab}">{pretty_number($f_fleet_amount)}</a></th>
    <th>[{$f_fleet_start_galaxy}:{$f_fleet_start_system}:{$f_fleet_start_planet}]</th>
    <th>{$f_fleet_start_time}</th>
    <th>[{$f_fleet_end_galaxy}:{$f_fleet_end_system}:{$f_fleet_end_planet}]</th>
    <th>{$f_fleet_end_time}</th>
    <th>
        <font color="lime">
            <div id="time_0">
                <font>{$fleet_end_time}</font>
            </div>
        </font>
    </th>
    <th>
        {$fleet_mess}
    </th>
</tr>