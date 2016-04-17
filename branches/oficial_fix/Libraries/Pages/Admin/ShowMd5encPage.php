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
 * @ShowMd5encPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/abr/2016 20:15:00
 */

/**
 * Description of ShowMd5encPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMd5encPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'md5enc';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR, LEVEL_MODERATOR))) {
            includeLang('admin/md5enc');

            $parse = $lang;

            if ($_POST['md5q'] != "") {
                $parse['md5_md5'] = $_POST['md5q'];
                $parse['md5_enc'] = md5($_POST['md5q']);
            } else {
                $parse['md5_md5'] = "";
                $parse['md5_enc'] = md5("");
            }

            $PageTpl = gettemplate("admin/md5enc");
            $Page = parsetemplate($PageTpl, $parse);

            display($Page, $lang['md5_title'], false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
