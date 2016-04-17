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
 * @ShowUserlistPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  15/abr/2016 1:00:02
 */

/**
 * Description of ShowUserlistPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowUserlistPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'userlist';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {
            includeLang('admin');
            if ($_GET['cmd'] == 'dele') {
                DeleteSelectedUser($_GET['user']);
            }
            if ($_GET['cmd'] == 'sort') {
                $TypeSort = $_GET['type'];
            } else {
                $TypeSort = "id";
            }

            $PageTPL = gettemplate('admin/userlist_body');
            $RowsTPL = gettemplate('admin/userlist_rows');

            $query = doquery("SELECT * FROM {{table}} ORDER BY `" . $TypeSort . "` ASC", 'users');

            $parse = $lang;
            $parse['adm_ul_table'] = "";
            $i = 0;
            $Color = "lime";
            while ($u = mysqli_fetch_assoc($query)) {
                if ($PrevIP != "") {
                    if ($PrevIP == $u['user_lastip']) {
                        $Color = "red";
                    } else {
                        $Color = "lime";
                    }
                }

                $Bloc['adm_ul_data_id'] = $u['id'];
                $Bloc['adm_ul_data_name'] = $u['username'];
                $Bloc['adm_ul_data_mail'] = $u['email'];
                $Bloc['ip_adress_at_register'] = $u['ip_at_reg'];
                $Bloc['adm_ul_data_adip'] = "<font color=\"" . $Color . "\">" . $u['user_lastip'] . "</font>";
                $Bloc['adm_ul_data_regd'] = gmdate("d/m/Y G:i:s", $u['register_time']);
                $Bloc['adm_ul_data_lconn'] = gmdate("d/m/Y G:i:s", $u['onlinetime']);
                $Bloc['adm_ul_data_banna'] = ( $u['bana'] == 1 ) ? "<a href # title=\"" . gmdate("d/m/Y G:i:s", $u['banaday']) . "\">" . $lang['adm_ul_yes'] . "</a>" : $lang['adm_ul_no'];
                $Bloc['adm_ul_data_detai'] = ""; // Lien vers une page de details genre Empire
                $Bloc['adm_ul_data_actio'] = "<a href=\"userlist.php?cmd=dele&user=" . $u['id'] . "\"><img src=\"images/r1.png\"></a>"; // Lien vers actions 'effacer'


                $PrevIP = $u['user_lastip'];
                $parse['adm_ul_table'] .= parsetemplate($RowsTPL, $Bloc);
                $i++;
            }
            $parse['adm_ul_count'] = $i;

            $page = parsetemplate($PageTPL, $parse);
            display($page, $lang['adm_ul_title'], false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
