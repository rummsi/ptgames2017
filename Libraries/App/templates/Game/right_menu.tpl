
                    <div id="rechts">
                        <div id="cutty">
                            <div id="myPlanets">
                                <div id="countColonies">
                                    <p class="textCenter"><span></span> {$adm_pltlst}</p>
                                </div>
                                <div id="planetList">{while $UserPlanet = mysqli_fetch_array($planets_query)}{if $UserPlanet['planet_type'] == 1}
                                    <div class="smallplanet" id="planet-{$UserPlanet['id']}">
                                        <a href="game.php?page={$_GET['page']}&cp={$UserPlanet['id']}&re=0"
                                           title="&lt;b&gt;{$UserPlanet['name']} 
                                           [{$UserPlanet['galaxy']}:{$UserPlanet['system']}:{$UserPlanet['planet']}]
                                           &lt;/b&gt;&lt;br/&gt;{$UserPlanet['diameter']}km ({$UserPlanet['field_current']}/{$UserPlanet['field_max']})
                                           &lt;BR&gt;{$UserPlanet['temp_min']}°C to {$UserPlanet['temp_max']}°C
                                           &lt;br/&gt;&lt;a href=&quot;game.php?page=overview&amp;cp={$UserPlanet['id']}&amp;re=0&quot;&gt;Overview&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=resources&amp;cp={$UserPlanet['id']}&quot;&gt;Resources&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=research&amp;cp={$UserPlanet['id']}&quot;&gt;Research&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=station&amp;cp={$UserPlanet['id']}&quot;&gt;Facilities&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=shipyard&amp;cp={$UserPlanet['id']}&quot;&gt;Shipyard&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=defense&amp;cp={$UserPlanet['id']}&quot;&gt;Defence&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=fleet1&amp;cp={$UserPlanet['id']}&quot;&gt;Fleet&lt;/a&gt;&lt;br/&gt;
                                           &lt;a href=&quot;game.php?page=galaxy&amp;cp={$UserPlanet['id']}&amp;galaxy={$UserPlanet['galaxy']}&amp;system={$UserPlanet['system']}&amp;position={$UserPlanet['planet']}&quot;&gt;Galaxy&lt;/a&gt;"
                                           class="planetlink {if $UserPlanet['id'] == $CurrentUser['current_planet']}active {/if}tooltipRight tooltipClose js_hideTipOnMobile">
                                            <img class="planetPic js_replace2x"
                                                 src="{$dpath}planeten/small/s_{$UserPlanet['image']}.jpg"
                                                 width="30" height="30" />
                                            <span class="planet-name  ">{$UserPlanet['name']}</span>
                                            <span class="planet-koords  ">[{$UserPlanet['galaxy']}:{$UserPlanet['system']}:{$UserPlanet['planet']}]</span>
                                        </a>{/if}{if $UserPlanet['planet_type'] == 3}
                                        <a class="moonlink {if $UserPlanet['id'] == $CurrentUser['current_planet']}active {/if}tooltipLeft tooltipClose js_hideTipOnMobile"
                                            title="&lt;B&gt;{$UserPlanet['name']} 
                                            [{$UserPlanet['galaxy']}:{$UserPlanet['system']}:{$UserPlanet['planet']}]
                                            &lt;/B&gt;&lt;BR&gt;{$UserPlanet['diameter']}km ({$UserPlanet['field_current']}/{$UserPlanet['field_max']})&lt;br/&gt;
                                            &lt;a href=&quot;game.php?page=resources&amp;cp={$UserPlanet['id']}&amp;re=0&quot;&gt;Resources&lt;/a&gt;&lt;br/&gt;
                                            &lt;a href=&quot;game.php?page=station&amp;cp={$UserPlanet['id']}&amp;opengate=1&quot;&gt;Jump Gate&lt;/a&gt;&lt;br/&gt;
                                            &lt;a href=&quot;game.php?page=station&amp;cp={$UserPlanet['id']}&quot;&gt;Facilities&lt;/a&gt;&lt;br/&gt;
                                            &lt;a href=&quot;game.php?page=defense&amp;cp={$UserPlanet['id']}&quot;&gt;Defence&lt;/a&gt;&lt;br/&gt;
                                            &lt;a href=&quot;game.php?page=fleet1&amp;cp={$UserPlanet['id']}&quot;&gt;Fleet&lt;/a&gt;&lt;br/&gt;
                                            &lt;a href=&quot;game.php?page=galaxy&amp;cp={$UserPlanet['id']}&amp;galaxy={$UserPlanet['galaxy']}&amp;system={$UserPlanet['system']}&amp;position={$UserPlanet['planet']}&quot;&gt;Galaxy&lt;/a&gt;"
                                            href="game.php?page=overview&cp={$UserPlanet['id']}">
                                            <img src="{$dpath}planeten/small/s_{$UserPlanet['image']}.jpg" width="16" height="16" alt="" class="icon-moon"/>
                                        </a>
                                    </div>{/if}{/while}
                                </div>
                            </div>
                        </div>
                    </div>