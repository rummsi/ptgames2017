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
 * @ShowUnbannedPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/abr/2016 13:39:16
 */

/**
 * Description of ShowUnbannedPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowUnbannedPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'unbanned';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {

            $parse['dpath'] = $dpath;
            $parse = $lang;

            $mode = $_GET['type'];

            if ($mode != 'change') {
                $parse['Name'] = "Nom du joueur";
            } elseif ($mode == 'change') {
                $nam = $_POST['nam'];
                doquery("DELETE FROM {{table}} WHERE who2='{$nam}'", 'banned');
                doquery("UPDATE {{table}} SET bana=0, banaday=0 WHERE username='{$nam}'", "users");
                message("Le joueur {$nam} a bien &eacute;t&eacute; d&eacute;banni!", 'Information');
            }

            display(parsetemplate(gettemplate('admin/unbanned'), $parse), "Overview", false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
