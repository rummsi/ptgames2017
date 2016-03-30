
        <tr>
            <th width="30">16</th>
            <th colspan=7>
                <a href=game.php?page=fleet&galaxy={$Galaxy}&amp;system={$System}&amp;planet=16;planettype=1&amp;target_mission=15>
                    {$gf_unknowsp}
                </a>
            </th>
        </tr>
        <tr>
            <td class=c colspan=6>( {$PlanetCountMessage} )</td>
            <td class=c colspan=2>{$LegendPopup}</td>
        </tr>
        <tr>
            <td class=c colspan=3>
                <span id="missiles">{$CurrentMIP}</span> {$gf_mi_title}
            </td>
            <td class=c colspan=3>
                <span id="slots">{$maxfleet_count}</span>/{$fleetmax} {$gf_fleetslt}</td>
            <td class=c colspan=2>
            <span id="recyclers">{$Recyclers}</span> {$gf_rc_title}<br>
            <span id="probes">{$SpyProbes}</span> {$gf_sp_title}</td>
        </tr>
        <tr style="display: none;" id="fleetstatusrow">
            <th class=c colspan=8>
                <!--<div id=\"fleetstatus\"></div>-->
                <table style="font-weight: bold" width="100%" id="fleetstatustable">
                    <!-- will be filled with content later on while processing ajax replys -->
                </table>
            </th>
        </tr>