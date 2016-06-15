{block name="title" prepend}{/block}
{block name="content"}        <center>
            <table width="519">
                <tbody>
                    <tr>
                        <td class="c">{$lang['info'][$BuildID]['name']}</td>
                    </tr>
                    <tr>
                        <th>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><img src="{$dpath}gebaeude/{$BuildID}.gif" align="top" border="0" height="120" width="120"></td>
                                        <td>{$lang['info'][$BuildID]['description']}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                </tbody>
            </table>{if $GateTPL != ''}{include file="info_gate_fleet.tpl"}{/if}{if $DestroyTPL != ''}{if $CurrentPlanet[$resource[$BuildID]] > 0}
            <table width="519">
                <tbody>
                    <tr>
                        <td class="c" align="center">
                            <a href=game.php?page=buildings&cmd=destroy&building={$BuildID}>{$lang['nfo_destroy']}: {$lang['info'][$BuildID]['name']} {$lang['nfo_level']} {$CurrentPlanet[$resource[$BuildID]]} ?</a>
                        </td>
                    </tr>
                    <tr>
                        <th>{$lang['nfo_needed']} : {$lang['Metal']}:<b>{pretty_number($NeededRessources['metal'])}</b> {$lang['Crystal']}:<b>{pretty_number($NeededRessources['crystal'])}</b> {$lang['Deuterium']}:<b>{pretty_number($NeededRessources['deuterium'])}</b></th>
                    </tr>
                    <tr>
                        <th><br>{$lang['nfo_dest_durati']}: {pretty_time($DestroyTime)}<br></th>
                    </tr>
                </tbody>
            </table>{/if}{/if}
        </center>
{/block}