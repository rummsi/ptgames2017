                    <tr height="20">
                        <th><a title="{$fl_fleetspeed} {$CurrentShipSpeed}">{$tech[$i]}</a></th>
                        <th>{pretty_number($p_resource_i)}
                            <input type="hidden" name="maxship{$i}" value="{$p_resource_i}"/>
                            <input type="hidden" name="consumption{$i}" value="{$GetShipConsumption}"/>
                            <input type="hidden" name="speed{$i}" value="{$GetFleetMaxSpeed}"/>
                            <input type="hidden" name="capacity{$i}" value="{$capacity}" />
                        </th>
                        {$i212}
                    </tr>