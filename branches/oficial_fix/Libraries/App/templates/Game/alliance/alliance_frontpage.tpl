{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width=519>
                <tr>
                    <td class=c colspan=2>{$lang['your_alliance']}</td>
                </tr>{if $ally['ally_image'] != ''}
                <tr>
                    <th colspan=2><img src="{$ally['ally_image']}"></td>
                </tr>{/if}
                <tr>
                    <th>{$lang['Tag']}</th>
                    <th>{$ally_tag}</th>
                </tr>
                <tr>
                    <th>{$lang['Name']}</th>
                    <th>{$ally_name}</th>
                </tr>
                <tr>
                    <th>{$lang['Members']}</th>
                    <th>{$ally['ally_members']}{if $ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id']]['memberlist'] != 0} (<a href="game.php?page=alliance&type=memberslist">{$lang['Members_list']}</a>){/if}</th>
                </tr>
                <tr>
                    <th>{$lang['Range']}</th>
                    <th>{if $ally['ally_owner'] == $user['id']}{($ally['ally_owner_range'] != '') ? $lang['Founder'] : $ally['ally_owner_range']}{elseif ($user['ally_rank_id'] != 0 && isset($ally_ranks[$user['ally_rank_id']]['name']))}{$ally_ranks[$user['ally_rank_id']]['name']}{else}{$lang['member']}{/if}{if $ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id']]['administrieren'] != 0} (<a href="game.php?page=alliance&type=admin&edit=ally">{$lang['Alliance_admin']}</a>){/if}</th>
                </tr>{if $request_count != 0}{if $ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id']]['bewerbungen'] != 0}
                <tr>
                    <th>{$lang['Requests']}</th>
                    <th><a href="game.php?page=alliance&type=admin&edit=requests">{$request_count} {$lang['XRequests']}</a></th>
                </tr>{/if}{/if}{if ($ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id']]['mails'] != 0)}
                <tr>
                    <th>{$lang['Circular_message']}</th>
                    <th><a href="game.php?page=alliance&type=circular">{$lang['Send_circular_mail']}</a></th>
                </tr>{/if}
                <tr>
                    <th colspan=2 height=100>{nl2br($ally['ally_description'])}</th>
                </tr>
                <tr>
                    <th>{$lang['Main_Page']}</th>
                    <th><a href="{$ally_web}">{$ally_web}</a></th>
                </tr>
                <tr>
                    <td class=c colspan=2>{$lang['Inner_section']}</th>
                </tr>
                <tr>
                    <th colspan=2 height=100>{nl2br($ally['ally_text'])}</th>
                </tr>
            </table>
            {if $ally['ally_owner'] != $user['id']}{MessageForm($lang['Exit_of_this_alliance'], "", "game.php?page=alliance&type=exit", $lang['Continue'])}{/if}
        </center>{/block}