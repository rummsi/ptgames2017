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
 * @ShowQueryExecutePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 13:25:09
 */

/**
 * Description of ShowQueryExecutePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowQueryExecutePage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'queryexecute';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN))) {
            includeLang('admin/Queries');

            $parse = $lang;

            if ($_POST['really_do_it'] == 'on') {

                mysqli_query(Database::$dbHandle, $_POST['qry_sql']);
                AdminMessage($lang['qry_succesful'], 'Succes', '?');
            } else {
                
            }

            $PageTpl = gettemplate("admin/exec_query");
            $Page = parsetemplate($PageTpl, $parse);

            display($Page, $lang['qry_title'], false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
