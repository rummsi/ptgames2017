{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br />
            <table align="top">
                <tr>
                    <td>
                        <form action="game.php?page=defense" method="post">
                            <table width=530>{$TabIndex = 0}
                                {foreach $types[Legacies_Empire::TYPE_DEFENSE] as $shipId}
                                    {if $shipyard->checkAvailability($shipId)}
                                        {$shipIdNbre = ($currentPlanet[$resource[$shipId]] == 0) ? "" : " ({$lang_dispo}: {pretty_number($currentPlanet[$resource[$shipId]])})"}
                                        <tr>
                                            <th class=l>
                                                <a href=infos.php?gid={$shipId}>
                                                   <img border=0 src="{$dpath}gebaeude/{$shipId}.gif" align=top width=120 height=120>
                                                </a>
                                            </th>
                                            <td class=l>
                                                <a href=infos.php?gid={$shipId}>{$lang_tech[$shipId]}</a> {$shipIdNbre}<br>
                                                {$res_descriptions[$shipId]}<br>
                                                {GetElementPrice($currentUser, $currentPlanet, $shipId, false)}
                                                {ShowBuildTime($shipyard->getBuildTime($shipId, 1))}
                                            </td>
                                            <td class=k>
                                                {$maxElements = $shipyard->getMaximumBuildableElementsCount($shipId)}
                                                {if bccomp($maxElements, 0) > 0}
                                                    {$TabIndex++}
                                                    <input type="text" id="fmenge:{$shipId}" name="fmenge[{$shipId}]" alt='{$lang_tech[$shipId]}' size=5 maxlength=5 value=0 tabindex={$TabIndex}>
                                                    {if MAX_FLEET_OR_DEFS_PER_ROW > 0 && $maxElements > MAX_FLEET_OR_DEFS_PER_ROW}
                                                        {$maxElements = MAX_FLEET_OR_DEFS_PER_ROW}
                                                    {/if}
                                                    <br /><a onclick="document.getElementById('fmenge:{$shipId}').value='{strval($maxElements)}';" style="cursor:pointer;">Nombre max ({number_format($maxElements, 0, ',', '.')})</a>
                                                {else if in_array($shipId, array(Legacies_Empire::ID_DEFENSE_SMALL_SHIELD_DOME, Legacies_Empire::ID_DEFENSE_LARGE_SHIELD_DOME))}
                                                    <span style="color:red">Limite de construction atteinte.</span>
                                                {else if in_array($shipId, array(Legacies_Empire::ID_DEFENSE_SMALL_SHIELD_DOME, Legacies_Empire::ID_DEFENSE_LARGE_SHIELD_DOME))}
                                                    <span style="color:red">Silo plein.</span>
                                                {/if}
                                            </td>
                                        </tr>
                                    {/if}
                                {/foreach}
                                <tr>
                                    <td class="c" colspan=2 align="center">
                                        <input type="submit" value="{$Construire}">
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </td>
                    <td valign="top"></td>
                </tr>
            </table>
            {if !empty($currentPlanet['b_hangar_id'])}
                <table align="top">
                    <tr>
                        <td class="c" colspan=2 align="center">Production Actuelle:</td>
                    </tr>
                        <th class=k><select id="buildList" size="10"></select></th>
                </table>
                <script type="text/javascript">
                //<![CDATA[
                var date = new Date();
                var data = {$data};
                var select = document.getElementById('buildList');

                setInterval(function(){
                  var now = new Date();
                  var datediff = (now.getTime() - date.getTime()) / 1000;

                  var option = null;
                  var index = 0;
                  if (data.length == 0) {
                    select.parentNode.style.display = 'none';
                    return;
                  }
                  select.length = 0;
                  for (i in data) {
                    if (datediff > 0) {
                      data[i]['actual_qty'] = data[i]['qty'] - Math.floor(datediff / data[i]['speed']);
                    } else {
                      data[i]['actual_qty'] = data[i]['qty'];
                    }
                    if (data[i]['actual_qty'] <= 0) {
                      datediff = datediff - (data[i]['speed'] * data[i]['qty']);
                      delete data[i];
                      continue;
                    } else {
                      datediff = 0;
                    }
                    option = new Option(data[i]['label'] + ' (' + data[i]['actual_qty'] + ')', data[i]['speed'], false, true);
                    select.options[index++] = option;
                  }
                  }, 1000);
                //]]>
                </script>
            {/if}
        </center>{/block}