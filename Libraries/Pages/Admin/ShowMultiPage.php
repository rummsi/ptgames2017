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
 * @ShowMultiPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  15/abr/2016 1:04:30
 */

/**
 * Description of ShowMultiPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMultiPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'userlist';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR, LEVEL_MODERATOR))) {
            includeLang('admin/multi');

            $query = doquery("SELECT * FROM {{table}}", 'multi');

            $parse = $lang;
            $parse['adm_mt_table'] = "";
            $i = 0;

            $RowsTPL = gettemplate('admin/multi_rows');
            $PageTPL = gettemplate('admin/multi_body');

            while ($infos = mysqli_fetch_assoc($query)) {
                $Bloc['player'] = $infos['player'];
                $Bloc['text'] = $infos['text'];

                $parse['adm_mt_table'] .= parsetemplate($RowsTPL, $Bloc);
                $i++;
            }

            $parse['adm_mt_count'] = $i;

            $page = parsetemplate($PageTPL, $parse);
            display($page, $lang['adm_mt_title'], false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
