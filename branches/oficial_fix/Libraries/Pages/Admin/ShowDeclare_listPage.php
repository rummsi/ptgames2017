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
 * @ShowDeclare_listPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 14:18:23
 */

/**
 * Description of ShowDeclare_listPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowDeclare_listPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'declarelist';
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

            $PageTPL = gettemplate('admin/declarelist_body');
            $RowsTPL = gettemplate('admin/declarelist_rows');

            $query = doquery("SELECT * FROM {{table}} ORDER BY `declarator` DESC", 'declared');

            $parse = $lang;
            $parse['adm_ul_table'] = "";
            $i = 0;
            $Color = "lime";
            while ($u = mysqli_fetch_assoc($query)) {
                if ($PrevIP != "") {
                    if ($PrevIP == $u['declarator']) {
                        $Color = "red";
                    } else {
                        $Color = "lime";
                    }
                }
                $Bloc['adm_ul_data_id'] = stripslashes($u['declarator_name']);
                $Bloc['adm_ul_data_name'] = stripslashes($u['declarator']);
                $Bloc['adm_ul_data_mail'] = stripslashes($u['declared_1']);
                $Bloc['adm_ul_data_adip'] = stripslashes($u['declared_2']);
                $Bloc['adm_ul_data_detai'] = stripslashes($u['declared_3']);
                $Bloc['adm_ul_data_regd'] = stripslashes($u['reason']);


                $parse['adm_ul_table'] .= parsetemplate($RowsTPL, $Bloc);
                $i++;
            }
            $parse['adm_ul_count'] = $i;

            $page = parsetemplate($PageTPL, $parse);
            display($page, "Liste des joueurs ayant declare une IP collective", false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
