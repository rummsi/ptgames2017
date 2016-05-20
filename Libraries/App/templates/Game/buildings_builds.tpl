{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br />
            {if $Queue['lenght'] > 0}{InsertBuildListScript("game.php?page=buildings&")}{/if}
            <table width=530>
            {if $Queue['lenght'] > 0}{$Queue['buildlist']}{/if}
                <tr>
                    <th >{$bld_usedcells}</th>
                    <th colspan="2" >
                        <font color="#00FF00">{$planet_field_current}</font> / <font color="#FF0000">{$planet_field_max}</font> {$bld_theyare} {$field_libre} {$bld_cellfree}
                    </th >
                </tr>
                {if $Queue['lenght'] < MAX_BUILDING_QUEUE_SIZE}
                    {$CanBuildElement = true}
                {else}
                    {$CanBuildElement = false}
                {/if}
                {foreach $tech as $Element => $ElementName}
                {if in_array($Element, $Allowed[$CurrentPlanet['planet_type']])}
                    {if $CurrentPlanet["field_current"] < (CalculateMaxPlanetFields($CurrentPlanet) - $Queue['lenght'])}
                        {$RoomIsOk = true}
                    {else}
                        {$RoomIsOk = false}
                    {/if}
                    {if IsTechnologieAccessible($CurrentUser, $CurrentPlanet, $Element)}
                 <tr>
                    <td class="l">
                        <a href="infos.php?gid={$Element}">
                        <img border="0" src="{$dpath}gebaeude/{$Element}.gif" align="top" width="120" height="120">
                        </a>
                    </td>
                    <td class="l">
                        <a href="infos.php?gid={$Element}">{$ElementName}</a>{($CurrentPlanet[$resource[$Element]] == 0) ? "" : " ({$level} {$CurrentPlanet[$resource[$Element]]})"}<br>
                        {$res_descriptions[$Element]}<br>
                        {GetElementPrice($CurrentUser, $CurrentPlanet, $Element)}
                        {ShowBuildTime(GetBuildingTime($CurrentUser, $CurrentPlanet, $Element))}
                        {GetRestPrice($CurrentUser, $CurrentPlanet, $Element)}
                    </td>
                    <td class="k">{$click = ''}
                    {if $Element == 31}
                    {if $CurrentUser["b_tech_planet"] != 0 && $BuildLabWhileRun != 1}<font color=#FF0000>{$in_working}</font>{/if}
                    {/if}
                    {if $click != ''}
                    {elseif $RoomIsOk && $CanBuildElement}
                        {if $Queue['lenght'] == 0}
                            {if ($CurrentPlanet[$resource[$Element]] + 1) == 1}
                                {if (IsElementBuyable($CurrentUser, $CurrentPlanet, $Element, true, false)) == true}
                                    <a href="game.php?page=buildings&cmd=insert&building={$Element}"><font color=#00FF00>{$BuildFirstLevel}</font></a>
                                {else}
                                    <font color=#FF0000>{$BuildFirstLevel}</font>
                                {/if}
                            {else}
                                {if (IsElementBuyable($CurrentUser, $CurrentPlanet, $Element, true, false)) == true}
                                    <a href="game.php?page=buildings&cmd=insert&building={$Element}"><font color=#00FF00>{$BuildNextLevel} {$CurrentPlanet[$resource[$Element]] + 1}</font></a>
                                {else}
                                    <font color=#FF0000>{$BuildNextLevel} {$CurrentPlanet[$resource[$Element]] + 1}</font>
                                {/if}
                            {/if}
                        {else}
                            <a href="game.php?page=buildings&cmd=insert&building={$Element}"><font color=#00FF00>{$InBuildQueue}</font></a>
                        {/if}
                    {elseif $RoomIsOk && !$CanBuildElement}
                        {if ($CurrentPlanet[$resource[$Element]] + 1) == 1}
                            <font color=#FF0000>{$BuildFirstLevel}</font>
                        {else}
                            <font color=#FF0000>{$BuildNextLevel} {$CurrentPlanet[$resource[$Element]] + 1}</font>
                        {/if}
                    {else}
                        <font color=#FF0000>{$NoMoreSpace}</font>
                    {/if}
                    </td>
                </tr>{/if}{/if}{/foreach}
            </table>
            <br />
        </center>{/block}