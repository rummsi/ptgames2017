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
 * @ShowMessagelistPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/abr/2016 20:07:41
 */

/**
 * Description of ShowMessagelistPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMessagelistPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'messagelist';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {
            includeLang('admin/messagelist');

            $BodyTpl = gettemplate('admin/messagelist_body');
            $RowsTpl = gettemplate('admin/messagelist_table_rows');

            $Prev = (!empty($_POST['prev']) ) ? true : false;
            $Next = (!empty($_POST['next']) ) ? true : false;
            $DelSel = (!empty($_POST['delsel']) ) ? true : false;
            $DelDat = (!empty($_POST['deldat']) ) ? true : false;
            $CurrPage = (!empty($_POST['curr']) ) ? $_POST['curr'] : 1;
            $Selected = (!empty($_POST['sele']) ) ? $_POST['sele'] : 0;
            $SelType = $_POST['type'];
            $SelPage = $_POST['page'];

            $ViewPage = 1;
            if ($Selected != $SelType) {
                $Selected = $SelType;
                $ViewPage = 1;
            } elseif ($CurrPage != $SelPage) {
                $ViewPage = (!empty($SelPage) ) ? $SelPage : 1;
            }

            if ($Prev == true) {
                $CurrPage -= 1;
                if ($CurrPage >= 1) {
                    $ViewPage = $CurrPage;
                } else {
                    $ViewPage = 1;
                }
            } elseif ($Next == true) {
                $Mess = doquery("SELECT COUNT(*) AS `max` FROM {{table}} WHERE `message_type` = '" . $Selected . "';", 'messages', true);
                $MaxPage = ceil(($Mess['max'] / 25));
                $CurrPage += 1;
                if ($CurrPage <= $MaxPage) {
                    $ViewPage = $CurrPage;
                } else {
                    $ViewPage = $MaxPage;
                }
            } elseif ($DelSel == true) {
                foreach ($_POST['sele'] as $MessId => $Value) {
                    if ($Value = "on") {
                        doquery("DELETE FROM {{table}} WHERE `message_id` = '" . $MessId . "';", 'messages');
                    }
                }
            } elseif ($DelDat == true) {
                $SelDay = $_POST['selday'];
                $SelMonth = $_POST['selmonth'];
                $SelYear = $_POST['selyear'];
                $LimitDate = mktime(0, 0, 0, $SelMonth, $SelDay, $SelYear);
                if ($LimitDate != false) {
                    doquery("DELETE FROM {{table}} WHERE `message_time` <= '" . $LimitDate . "';", 'messages');
                    doquery("DELETE FROM {{table}} WHERE `time` <= '" . $LimitDate . "';", 'rw');
                }
            }

            $Mess = doquery("SELECT COUNT(*) AS `max` FROM {{table}} WHERE `message_type` = '" . $Selected . "';", 'messages', true);
            $MaxPage = ceil(($Mess['max'] / 25));

            $parse = $lang;
            $parse['mlst_data_page'] = $ViewPage;
            $parse['mlst_data_pagemax'] = $MaxPage;
            $parse['mlst_data_sele'] = $Selected;

            $parse['mlst_data_types'] = "<option value=\"0\"" . (($Selected == "0") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ__0'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"1\"" . (($Selected == "1") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ__1'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"2\"" . (($Selected == "2") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ__2'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"3\"" . (($Selected == "3") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ__3'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"4\"" . (($Selected == "4") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ__4'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"5\"" . (($Selected == "5") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ__5'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"15\"" . (($Selected == "15") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ_15'] . "</option>";
            $parse['mlst_data_types'] .= "<option value=\"99\"" . (($Selected == "99") ? " SELECTED" : "") . ">" . $lang['mlst_mess_typ_99'] . "</option>";

            $parse['mlst_data_pages'] = "";
            for ($cPage = 1; $cPage <= $MaxPage; $cPage++) {
                $parse['mlst_data_pages'] .= "<option value=\"" . $cPage . "\"" . (($ViewPage == $cPage) ? " SELECTED" : "") . ">" . $cPage . "/" . $MaxPage . "</option>";
            }

            $parse['mlst_scpt'] = "<script language=\"JavaScript\">\n";
            $parse['mlst_scpt'] .= "function f(target_url, win_name) {\n";
            $parse['mlst_scpt'] .= "var new_win = window.open(target_url,win_name,'resizable=yes,scrollbars=yes,menubar=no,toolbar=no,width=550,height=280,top=0,left=0');\n";
            $parse['mlst_scpt'] .= "new_win.focus();\n";
            $parse['mlst_scpt'] .= "}\n";
            $parse['mlst_scpt'] .= "</script>\n";

            $parse['tbl_rows'] = "";
            $parse['mlst_title'] = $lang['mlst_title'];

            $StartRec = 1 + (($ViewPage - 1) * 25);
            $Messages = doquery("SELECT * FROM {{table}} WHERE `message_type` = '" . $Selected . "' ORDER BY `message_time` DESC LIMIT " . $StartRec . ",25;", 'messages');
            while ($row = mysqli_fetch_assoc($Messages)) {
                $OwnerData = doquery("SELECT `username` FROM {{table}} WHERE `id` = '" . $row['message_owner'] . "';", 'users', true);
                $bloc['mlst_id'] = $row['message_id'];
                $bloc['mlst_from'] = $row['message_from'];
                $bloc['mlst_to'] = $OwnerData['username'] . " ID:" . $row['message_owner'];
                $bloc['mlst_text'] = $row['message_text'];
                $bloc['mlst_time'] = gmdate("d. M Y H:i:s", $row['message_time']);

                $parse['mlst_data_rows'] .= parsetemplate($RowsTpl, $bloc);
            }

            $display = parsetemplate($BodyTpl, $parse);

            if (isset($_POST['delit'])) {
                doquery("DELETE FROM {{table}} WHERE `message_id` = '" . $_POST['delit'] . "';", 'messages');
                AdminMessage($lang['mlst_mess_del'] . " ( " . $_POST['delit'] . " )", $lang['mlst_title'], "./messagelist." . PHPEXT, 3);
            }
            display($display, $lang['mlst_title'], false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
