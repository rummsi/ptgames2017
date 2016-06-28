{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br><br>
            <table width="519">
                <tbody>
                <tr>
                   <td class="c" colspan="2">{$lang['Vaccation_mode']}  {$vacation_until}</td>
                </tr><tr>
                   <th><a title="{$lang['vacations_tip']}">{$lang['exit_vacations']}</a></th>
                   <form action="game.php?page=options&type=exit" method="post">
                   <th><input type="checkbox" name="exit_modus"{$opt_modev_exit}/></th>
                </tr><tr>
                   <th colspan="2"><input type="submit" value="{$lang['save_settings']}" ></th>
                </tr>
                </tbody>
            </table>
        </center>{/block}
