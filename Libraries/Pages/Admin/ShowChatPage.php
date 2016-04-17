<?php

/*
 * PTGamesPT
 * Copyright (C) 2012
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should read the GNU General Public License, see <http://www.gnu.org/licenses/>.
 * 
 * PTGamesPT
 * @author XNovaPT Team <xnovaptteam@gmail.com>
 * @ShowChatPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/abr/2016 13:47:32
 */

/**
 * Description of ShowChatPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowChatPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'adminchat';
    }

    function show() {
        global $lang, $user;

        includeLang('admin');
        $parse = $lang;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN))) {

            // Système de suppression
            extract($_GET);
            if (isset($delete)) {
                doquery("DELETE FROM {{table}} WHERE `messageid`=$delete", 'chat');
            } elseif ($deleteall == 'yes') {
                doquery("DELETE FROM {{table}}", 'chat');
            }

            // Affichage des messages
            $query = doquery("SELECT * FROM {{table}} ORDER BY messageid DESC LIMIT 25", 'chat');
            $i = 0;
            while ($e = mysqli_fetch_array($query)) {
                $i++;
                $parse['msg_list'] .= stripslashes("<tr><th class=b>" . date('h:i:s', $e['timestamp']) . "</th>" .
                        "<th class=b>" . $e['user'] . "</th>" .
                        "<td class=b>" . nl2br($e['message']) . "</td>" .
                        "<th class=b><a href=admin.php?page=chat&delete=" . $e['messageid'] . "><img src=\"../images/r1.png\" border=\"0\"></a></th></tr>");
            }
            $parse['msg_list'] .= "<tr><th class=b colspan=4>{$i} " . $lang['adm_ch_nbs'] . "</th></tr>";

            display(parsetemplate(gettemplate('admin/chat_body'), $parse), "Chat", false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
