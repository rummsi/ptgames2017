{block name="title" prepend}{/block}
{block name="content"}        <center>
            <script src="scripts/cntchar.js" type="text/javascript"></script>
            <table width=519>
                <tr>
                    <td class=c colspan=2>{$lang['Alliance_admin']}</td>
                </tr>
                <tr>
                    <th colspan=2><a href="game.php?page=alliance&type=admin&edit=rights">{$lang['Law_settings']}</a></th>
                </tr>
                <tr>
                    <th colspan=2><a href="game.php?page=alliance&type=admin&edit=members">{$lang['Members_administrate']}</a></th>
                </tr>
                <tr>
                    <th colspan=2><a href="game.php?page=alliance&type=admin&edit=tag">{$lang['Change_the_ally_tag']}</a></th>
                </tr>
                <!--<img src="{$dpath}pic/appwiz.gif" border=0 alt="">-->
                <tr>
                    <th colspan=2><a href="game.php?page=alliance&type=admin&edit=name">{$lang['Change_the_ally_name']}</a></th>
                </tr>
                <!--<img src="{$dpath}pic/appwiz.gif" border=0 alt="">-->
            </table>
            <form action="" method="POST">
                <input type="hidden" name="t" value="{$t}">
                <table width=519>
                    <tr>
                        <td class="c" colspan=2>{$lang['Texts']}</td>
                    </tr>
                    <tr>
                        <th><a href="game.php?page=alliance&type=admin&edit=ally&t=1">{$lang['External_text']}</a></th>
                        <th><a href="game.php?page=alliance&type=admin&edit=ally&t=2">{$lang['Internal_text']}</a></th>
                    </tr>
                    <tr>
                        <td class=c colspan=3>{$lang['Show_of_request_text']} (<span id="cntChars">0</span> / 5000 {$lang['characters']})</td>
                    </tr>
                    <tr>
                        <th colspan=3><textarea name="text" cols=70 rows=15 onkeyup="javascript:cntchar(5000)">{$text}</textarea>
                            {$request_type}
                        </th>
                    </tr>
                    <tr>
                        <th colspan=3>
                            <input type="hidden" name=t value={$t}>
                            <input type="reset" value="{$lang['Reset']}"> 
                            <input type="submit" value="{$lang['Save']}">
                        </th>
                    </tr>
                </table>
            </form>
            <form action="" method="POST">
                <table width=519>
                    <tr>
                        <td class=c colspan=2>{$Options}</td>
                    </tr>
                    <tr>
                        <th>{$lang['Main_Page']}</th>
                        <th><input type=text name="web" value="{$ally_web}" size="70"></th>
                    </tr>
                    <tr>
                        <th>{$lang['Alliance_logo']}</th>
                        <th><input type=text name="image" value="{$ally_image}" size="70"></th>
                    </tr>
                    <tr>
                        <th>{$lang['Requests']}</th>
                        <th>
                            <select name="request_notallow"><option value=1{$ally_request_notallow_0}>{$lang['No_allow_request']}</option>
                                <option value=0{$ally_request_notallow_1}>{$lang['Allow_request']}</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>{$lang['Founder_name']}</th>
                        <th><input type="text" name="owner_range" value="{$ally_owner_range}" size=30></th>
                    </tr>
                    <tr>
                        <th colspan=2><input type="submit" name="options" value="{$lang['Save']}"></th>
                    </tr>
                </table>
            </form>
            {MessageForm("Dissoudre L'alliance", "", "game.php?page=alliance&type=admin&edit=exit", $lang['Continue'])}
            {MessageForm("Abandonner / Transf&eacute;rer L'alliance", "", "game.php?page=alliance&type=admin&edit=give", $lang['Continue'])}
        </center>{/block}

