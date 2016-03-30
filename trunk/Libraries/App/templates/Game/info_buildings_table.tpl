{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <table width="519">
                <tbody>
                    <tr>
                        <td class="c">{$name}</td>
                    </tr>
                    <tr>
                        <th>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><img src="{$dpath}gebaeude/{$BuildID}.gif" align="top" border="0" height="120" width="120"></td>
                                        <td>{$description}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <center>
                                <table border="1">
                                    <tbody>
                                        {if ($TableHeadTPL != '')}
                                        {$table_head}
                                        {$table_data}
                                        {/if}
                                    </tbody>
                                </table>
                            </center>
                        </th>
                    </tr>
                </tbody>
            </table>
            {if $DestroyTPL != ''}
                <table width="519">
                    <tbody>
                        <tr>
                            <td class="c" align="center">
                                <a href=game.php?page=buildings&cmd=destroy&building={$BuildID}>{$nfo_destroy}: {$name} {$nfo_level} {$CurrentPlanet[$resource[$BuildID]]} ?</a>
                            </td>
                        </tr>
                        <tr>
                            <th>{$nfo_needed} : {$Metal}:<b>{pretty_number($NeededRessources['metal'])}</b> {$Crystal}:<b>{pretty_number($NeededRessources['crystal'])}</b> {$Deuterium}:<b>{pretty_number($NeededRessources['deuterium'])}</b></th>
                        </tr>
                        <tr>
                            <th><br>{$nfo_dest_durati}: {pretty_time($DestroyTime)}<br></th>
                        </tr>
                    </tbody>
                </table>
            {/if}
        </center>
{/block}