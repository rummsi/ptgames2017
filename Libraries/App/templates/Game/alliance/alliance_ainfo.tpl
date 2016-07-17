{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="519">
                <tr>
                    <td class="c" colspan="2">{$lang['Alliance_information']}</td>
                </tr>{if $ally_image != ""}
                <tr>
                    <th colspan=2><img src="{$ally_image}"></td>
                </tr>{/if}
                <tr>
                    <th>{$lang['Tag']}</th>
                    <th>{$title}</th>
                </tr>
                <tr>
                    <th>{$lang['Name']}</th>
                    <th>{$ally_name}</th>
                </tr>
                <tr>
                    <th>{$lang['Members']}</th>
                    <th>{$ally_member_scount}</th>
                </tr>
                {if $ally_description != ""}
                <tr>
                    <th colspan=2 height=100>{$ally_description}</th>
                </tr>{else}
                <tr>
                    <th colspan=2 height=100>Il n'y as aucune descriptions de cette alliance.</th>
                </tr>{/if}
                {if $ally_web != ""}
                <tr>
                    <th>{$lang['Initial_page']}</th>
                    <th><a href="{$ally_web}">{$ally_web}</a></th>
		</tr>{/if}{if $user['ally_id'] == 0}
                <tr>
                    <th>Candidature</th>
                    <th><a href="game.php?page=alliance&type=apply&amp;allyid={$id}">Cliquer ici pour ecrire votre candidature</a></th>
                </tr>{else}Candidature{/if}
            </table>
        </center>{/block}
	