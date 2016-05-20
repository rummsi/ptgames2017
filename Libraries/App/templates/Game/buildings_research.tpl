{block name="title" prepend}{/block}
{block name="content"}        <center>
            <font color="#ff0000">{if !CheckLabSettingsInQueue($CurrentPlanet)}{$labo_on_update}{$bContinue = false}{/if}</font>
            <br />
            <table align=top>
                <tr>
                    <td>
                    <table width=530>
                    <tr>
                    {foreach $lang_tech as $Tech => $TechName}
                    {if $Tech > 105 && $Tech <= 199}
                        {if IsTechnologieAccessible($CurrentUser, $CurrentPlanet, $Tech)}
                        <tr>
                            <th class="l">
                                <a href="game.php?page=infos&gid={$Tech}">
                                <img border=0 src="{$dpath}gebaeude/{$Tech}.gif" align="top" width=120 height=120></a>
                            </th>
                            <td class="l">
                                <a href="game.php?page=infos&gid={$Tech}">{$TechName}</a> {($CurrentUser[$resource[$Tech]] == 0) ? "" : "( {$lang_level} {$CurrentUser[$resource[$Tech]]} )"}<br>{$res_descriptions[$Tech]}<br>
                                {GetElementPrice($CurrentUser, $CurrentPlanet, $Tech)}
                                {ShowBuildTime(GetBuildingTime($CurrentUser, $CurrentPlanet, $Tech))}
                                {$Rest_ress} {GetRestPrice($CurrentUser, $CurrentPlanet, $Tech, true)}
                            </td>
                            <th class="l">
                                {if !$InResearch}
                                    {$LevelToDo = 1 + $CurrentUser[$resource[$Tech]]}
                                    {if IsElementBuyable($CurrentUser, $CurrentPlanet, $Tech)}
                                        {if !CheckLabSettingsInQueue($CurrentPlanet)}
                                            {if $LevelToDo == 1}
                                                <font color=#FF0000>{$Rechercher}</font>
                                            {else}
                                                <font color=#FF0000>{$Rechercher}<br>{$lang_level} {$LevelToDo}</font>
                                            {/if}
                                        {else}
                                            <a href="game.php?page=research&cmd=search&tech={$Tech}">
                                            {if $LevelToDo == 1}
                                                <font color=#00FF00>{$Rechercher}</font>
                                            {else}
                                                <font color=#00FF00>{$Rechercher}<br>{$lang_level} {$LevelToDo}</font>
                                            {/if}</a>
                                        {/if}
                                    {else}
                                        {if $LevelToDo == 1}
                                            <font color=#FF0000>{$Rechercher}</font>
                                        {else}
                                            <font color=#FF0000>{$Rechercher}<br>{$lang_level} {$LevelToDo}</font>
                                        {/if}
                                    {/if}
                                {else}
                                    {if $ThePlanet['b_tech_id'] == $Tech}
                                        {if $ThePlanet['id'] != $CurrentPlanet['id']}
                                            <div id="brp" class="z"></div>
                                            <script   type="text/javascript">
                                            v = new Date();
                                            var brp = document.getElementById('brp');
                                            function t(){
                                                    n  = new Date();
                                                    ss = {$ThePlanet["b_tech"] - time()};
                                                    s  = ss - Math.round( (n.getTime() - v.getTime()) / 1000.);
                                                    m  = 0;
                                                    h  = 0;
                                                    if ( s < 0 ) {
                                                            brp.innerHTML = '{$ready}<br><a href=game.php?page=research&cp={$ThePlanet["id"]}>{$continue}</a>';
                                                    } else {
                                                            if ( s > 59 ) { m = Math.floor( s / 60 ); s = s - m * 60; }
                                                            if ( m > 59 ) { h = Math.floor( m / 60 ); m = m - h * 60; }
                                                            if ( s < 10 ) { s = "0" + s }
                                                            if ( m < 10 ) { m = "0" + m }
                                                            brp.innerHTML = h + ':' + m + ':' + s + '<br><a href=game.php?page=research&cmd=cancel&tech={$ThePlanet['b_tech_id']}>{$cancel}<br>{$lang_on}<br>{$ThePlanet["name"]}</a>';
                                                    }
                                                    window.setTimeout("t();",999);
                                            }
                                            window.onload=t;
                                            </script>
                                        {else}
                                            <div id="brp" class="z"></div>
                                            <script   type="text/javascript">
                                            v = new Date();
                                            var brp = document.getElementById('brp');
                                            function t(){
                                                    n  = new Date();
                                                    ss = {$ThePlanet["b_tech"] - time()};
                                                    s  = ss - Math.round( (n.getTime() - v.getTime()) / 1000.);
                                                    m  = 0;
                                                    h  = 0;
                                                    if ( s < 0 ) {
                                                            brp.innerHTML = '{$ready}<br><a href=game.php?page=research&cp={$CurrentPlanet["id"]}>{$continue}</a>';
                                                    } else {
                                                            if ( s > 59 ) { m = Math.floor( s / 60 ); s = s - m * 60; }
                                                            if ( m > 59 ) { h = Math.floor( m / 60 ); m = m - h * 60; }
                                                            if ( s < 10 ) { s = "0" + s }
                                                            if ( m < 10 ) { m = "0" + m }
                                                            brp.innerHTML = h + ':' + m + ':' + s + '<br><a href=game.php?page=research&cmd=cancel&tech={$CurrentPlanet['b_tech_id']}>{$cancel}</a>';
                                                    }
                                                    window.setTimeout("t();",999);
                                            }
                                            window.onload=t;
                                            </script>
                                        {/if}
                                    {else}
                                        <center>-</center>
                                    {/if}
                                {/if}
                            </th>
                        </tr>
                        {/if}
                    {/if}
                    {/foreach}
                    </tr>
                    </table>
                    </td>
                </tr>
            </table>
        </center>{/block}