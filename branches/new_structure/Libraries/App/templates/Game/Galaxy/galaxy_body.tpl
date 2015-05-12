{block name="title" prepend}{/block}
{block name="content"}
{include file="Galaxy/galaxy_scripts.tpl"}
        <center>
            <body style="overflow: auto;" onUnload="">
                <br>
                <br>
                {$ShowGalaxySelector}
                {$ShowGalaxyMISelector}
                <table width=569>
                    <tbody>
                        <tr>
                            <td class=c colspan=8>{$Solar_system} {$galaxy}:{$system}</td>
                        </tr>
                        <tr>
                            <td class=c>{$Pos}</td>
                            <td class=c>{$Planet}</td>
                            <td class=c>{$Name}</td>
                            <td class=c>{$Moon}</td>
                            <td class=c>{$Debris}</td>
                            <td class=c>{$Player}</td>
                            <td class=c>{$Alliance}</td>
                            <td class=c>{$Actions}</td>
                        </tr>
                        {$ShowGalaxyRows}
                        {$ShowGalaxyFooter}
                    </tbody>
                </table>
            </div>

{/block}