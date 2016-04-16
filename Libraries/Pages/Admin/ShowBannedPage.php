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
 * @ShowBannedPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 15:03:21
 */

/**
 * Description of ShowBannedPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowBannedPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'changelog';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR, LEVEL_MODERATOR))) {
            includeLang('admin');

            $mode = $_POST['mode'];

            $PageTpl = gettemplate("admin/banned");

            $parse = $lang;
            if ($mode == 'banit') {
                $name = $_POST['name'];
                $reas = $_POST['why'];
                $days = $_POST['days'];
                $hour = $_POST['hour'];
                $mins = $_POST['mins'];
                $secs = $_POST['secs'];

                $admin = $user['username'];
                $mail = $user['email'];

                $Now = time();
                $BanTime = $days * 86400;
                $BanTime += $hour * 3600;
                $BanTime += $mins * 60;
                $BanTime += $secs;
                $BannedUntil = $Now + $BanTime;

                $QryInsertBan = "INSERT INTO {{table}} SET ";
                $QryInsertBan .= "`who` = \"" . $name . "\", ";
                $QryInsertBan .= "`theme` = '" . $reas . "', ";
                $QryInsertBan .= "`who2` = '" . $name . "', ";
                $QryInsertBan .= "`time` = '" . $Now . "', ";
                $QryInsertBan .= "`longer` = '" . $BannedUntil . "', ";
                $QryInsertBan .= "`author` = '" . $admin . "', ";
                $QryInsertBan .= "`email` = '" . $mail . "';";
                doquery($QryInsertBan, 'banned');

                $QryUpdateUser = "UPDATE {{table}} SET ";
                $QryUpdateUser .= "`bana` = '1', ";
                $QryUpdateUser .= "`banaday` = '" . $BannedUntil . "' ";
                $QryUpdateUser .= "WHERE ";
                $QryUpdateUser .= "`username` = \"" . $name . "\";";
                doquery($QryUpdateUser, 'users');

                $DoneMessage = $lang['adm_bn_thpl'] . " " . $name . " " . $lang['adm_bn_isbn'];
                AdminMessage($DoneMessage, $lang['adm_bn_ttle']);
            }

            $Page = parsetemplate($PageTpl, $parse);
            display($Page, $lang['adm_bn_ttle'], false, '', true);
        } else {
            AdminMessage($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
