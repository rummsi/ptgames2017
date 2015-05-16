{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <table width="519">
                <tbody>
                    <tr>
                        <td class="c" colspan="2">{$nfo_title_head} {$tech[200]}</td>
                    </tr>
                    <tr>
                        <th>{$nfo_name}</th>
                        <th>{$name}</th>
                    </tr>
                    <tr>
                        <th colspan="2">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><img src="{$dpath}gebaeude/{$BuildID}.gif" align="top" border="0" height="120" width="120"></td>
                                        <td>{$description}<br><br>{$rf_info_to}{$rf_info_fr}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th>{$nfo_struct_pt}</th>
                        <th>{$hull_pt}</th>
                    </tr>
                    <tr>
                        <th>{$nfo_shielf_pt}</th>
                        <th>{$shield_pt}</th>
                    </tr>
                    <tr>
                        <th>{$nfo_attack_pt}</th>
                        <th>{$attack_pt}</th>
                    </tr>
                    <tr>
                        <th>{$nfo_capacity}</th>
                        <th>{$capacity_pt}&nbsp;{$nfo_units}</th>
                    </tr>
                    <tr>
                        <th>{$nfo_base_speed}</th>
                        <th>{$base_speed} {if $BuildID == 202}<font color="yellow">({pretty_number($pricelist[$BuildID]['speed2'])})</font>{elseif $BuildID == 211}<font color="yellow">({pretty_number($pricelist[$BuildID]['speed2'])})</font>{/if}</th>
                    </tr>
                    <tr>
                        <th>{$nfo_consumption}</th>
                        <th>{$base_conso} {if $BuildID == 202}<font color="yellow">({pretty_number($pricelist[$BuildID]['consumption2'])})</font>{/if}</th>
                    </tr>
                </tbody>
            </table>
        </center>
{/block}