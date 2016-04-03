{block name="title" prepend}{/block}
{block name="content"}
        <br />
        <center>
            <h1>{$rename_and_abandon_planet}</h1>
            <form action="game.php?page=overview&action=renameplanet&pl={$planet_id}" method="POST">
                <table width=519>
                    <tr>
                        <td class="c" colspan=3>{$your_planet}</td>
                    </tr>
                    <tr>
                        <th>{$coords}</th>
                        <th>{$name}</th>
                        <th>{$functions}</th>
                    </tr>
                    <tr>
                        <th>{$galaxy_galaxy}:{$galaxy_system}:{$galaxy_planet}</th>
                        <th>{$planet_name}</th>
                        <th><input type="submit" name="action" value="{$colony_abandon}" alt="{$colony_abandon}"></th>
                    </tr>
                    <tr>
                        <th>{$namer}</th>
                        <th><input type="text" name="newname" size=25 maxlength=20></th>
                        <th><input type="submit" name="action" value="{$namer}"></th>
                    </tr>
                </table>
            </form>
        </center>
{/block}