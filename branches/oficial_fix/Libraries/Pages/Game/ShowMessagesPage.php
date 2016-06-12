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
 * @ShowMessagesPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 16:21:26
 */

/**
 * Description of ShowMessagesPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMessagesPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'messages';
    }

    function show() {
        global $user, $lang, $messfields, $dpath, $game_config;

        include(ROOT_PATH . 'includes/functions/BBcodeFunction.' . PHPEXT);

        if (!isset($user['authlevel'])) {
            header("Location: index.php");
        }

        includeLang('messages');

        $OwnerID = $_GET['id'];
        $MessCategory = @$_GET['messcat'];
        $MessPageMode = (string) $_GET['type'];
        $DeleteWhat = @$_POST['deletemessages'];
        if (isset($DeleteWhat)) {
            $MessPageMode = "delete";
        }

        $UsrMess = doquery("SELECT * FROM {{table}} WHERE `message_owner` = '" . strval($user['id']) . "' ORDER BY `message_time` DESC", 'messages');
        $UnRead = doquery("SELECT * FROM {{table}} WHERE `id` = '" . strval($user['id']) . "'", 'users', true);

        $MessageType = array(0, 1, 2, 3, 4, 5, 15, 99, 100);
        $TitleColor = array(0 => '#FFFF00', 1 => '#FF6699', 2 => '#FF3300', 3 => '#FF9900', 4 => '#773399', 5 => '#009933', 15 => '#030070', 99 => '#007070', 100 => '#ABABAB');

        for ($MessType = 0; $MessType < 101; $MessType++) {
            if (in_array($MessType, $MessageType)) {
                $WaitingMess[$MessType] = $UnRead[$messfields[$MessType]];
                $TotalMess[$MessType] = 0;
            }
        }

        while ($CurMess = mysqli_fetch_array($UsrMess)) {
            $MessType = $CurMess['message_type'];
            $TotalMess[$MessType] += 1;
            $TotalMess[100] += 1;
        }

        switch ($MessPageMode) {
            case 'write':
                // -------------------------------------------------------------------------------------------------------
                // Envoi d'un messages
                if (!is_numeric($OwnerID)) {
                    message($lang['mess_no_ownerid'], $lang['mess_error']);
                }
                $OwnerRecord = doquery("SELECT * FROM {{table}} WHERE `id` = '" . strval($OwnerID) . "';", 'users', true);
                if (!$OwnerRecord) {
                    message($lang['mess_no_owner'], $lang['mess_error']);
                }
                $OwnerHome = doquery("SELECT * FROM {{table}} WHERE `id_planet` = '" . $OwnerRecord["id_planet"] . "';", 'galaxy', true);
                if (!$OwnerHome) {
                    message($lang['mess_no_ownerpl'], $lang['mess_error']);
                }
                if ($_POST) {
                    $error = 0;
                    if (!$_POST["subject"]) {
                        $error++;
                        $page .= "<center><br><font color=#FF0000>" . $lang['mess_no_subject'] . "<br></font></center>";
                    }
                    if (!$_POST["text"]) {
                        $error++;
                        $page .= "<center><br><font color=#FF0000>" . $lang['mess_no_text'] . "<br></font></center>";
                    }
                    if ($error == 0) {
                        $page .= "<center><font color=#00FF00>" . $lang['mess_sended'] . "<br></font></center>";

                        $_POST['text'] = str_replace("'", '&#39;', $_POST['text']);
                        //$_POST['text'] = str_replace('\r\n', '<br />', $_POST['text']);
                        $Owner = $OwnerID;
                        $Sender = $user['id'];
                        $From = $user['username'] . " [" . $user['galaxy'] . ":" . $user['system'] . ":" . $user['planet'] . "]";
                        $Subject = $_POST['subject'];
                        if ($game_config['enable_bbcode'] == 1) {
                            $Message = trim(nl2br(bbcode(image(strip_tags($_POST['text'], '<br>')))));
                        } else {
                            $Message = trim(nl2br(strip_tags($_POST['text'], '<br>')));
                        }
                        SendSimpleMessage($Owner, $Sender, '', 1, $From, $Subject, $Message);
                        $subject = "";
                        $text = "";
                    }
                }

                $this->tplObj->assign(array(
                    'title' => $lang['mess_pagetitle'],
                    'lang' => $lang,
                    'id' => $OwnerID,
                    'subject' => (!isset($subject)) ? $lang['mess_no_subject'] : $subject,
                    'to' => $OwnerRecord['username'] . " [" . $OwnerHome['galaxy'] . ":" . $OwnerHome['system'] . ":" . $OwnerHome['planet'] . "]",
                    'text' => @$text,
                ));

                if ($game_config['enable_bbcode'] == 1) {

                    $this->render('messages_pm_form_bb.tpl');
                } else {

                    $this->render('messages_pm_form.tpl');
                }
                break;

            case 'delete':
                // -------------------------------------------------------------------------------------------------------
                // Suppression des messages selectionnés
                $DeleteWhat = $_POST['deletemessages'];
                if ($DeleteWhat == 'deleteall') {
                    doquery("DELETE FROM {{table}} WHERE `message_owner` = '" . $user['id'] . "';", 'messages');
                } elseif ($DeleteWhat == 'deletemarked') {
                    foreach ($_POST as $Message => $Answer) {
                        if (preg_match("/delmes/i", $Message) && $Answer == 'on') {
                            $MessId = str_replace("delmes", "", $Message);
                            $MessHere = doquery("SELECT * FROM {{table}} WHERE `message_id` = '" . $MessId . "' AND `message_owner` = '" . $user['id'] . "';", 'messages');
                            if ($MessHere) {
                                doquery("DELETE FROM {{table}} WHERE `message_id` = '" . $MessId . "';", 'messages');
                            }
                        }
                    }
                } elseif ($DeleteWhat == 'deleteunmarked') {
                    foreach ($_POST as $Message => $Answer) {
                        $CurMess = preg_match("/showmes/i", $Message);
                        $MessId = str_replace("showmes", "", $Message);
                        $Selected = "delmes" . $MessId;
                        $IsSelected = $_POST[$Selected];
                        if (preg_match("/showmes/i", $Message) && !isset($IsSelected)) {
                            $MessHere = doquery("SELECT * FROM {{table}} WHERE `message_id` = '" . $MessId . "' AND `message_owner` = '" . $user['id'] . "';", 'messages');
                            if ($MessHere) {
                                doquery("DELETE FROM {{table}} WHERE `message_id` = '" . $MessId . "';", 'messages');
                            }
                        }
                    }
                }
                $MessCategory = $_POST['category'];

            case 'show':
                // -------------------------------------------------------------------------------------------------------
                // Affichage de la page des messages
                if ($MessCategory == 100) {
                    $SubUpdateQry = "";
                    for ($MessType = 0; $MessType < 101; $MessType++) {
                        if (in_array($MessType, $MessageType)) {
                            $SubUpdateQry .= "`" . $messfields[$MessType] . "` = '0', ";
                        }
                    }
                    $QryUpdateUser = "UPDATE {{table}} SET $SubUpdateQry`id` = '" . $user['id'] . "' WHERE `id` = '" . $user['id'] . "';";
                    doquery($QryUpdateUser, 'users');
                } else {
                    if ($WaitingMess[$MessCategory] <> '') {
                        $QryUpdateUser = "UPDATE {{table}} SET `" . $messfields[$MessCategory] . "` = '0', `" . $messfields[100] . "` = `" . $messfields[100] . "` - '" . $WaitingMess[$MessCategory] . "' WHERE `id` = '" . $user['id'] . "';";
                        doquery($QryUpdateUser, 'users');
                    }
                }

                $this->tplObj->assign(array(
                    'title' => $lang['mess_pagetitle'],
                    'lang' => $lang,
                    'UsrMess' => doquery("SELECT * FROM {{table}} WHERE `message_owner` = '" . $user['id'] . "' ORDER BY `message_time` DESC;", 'messages'),
                    'UsrMess1' => doquery("SELECT * FROM {{table}} WHERE `message_owner` = '" . $user['id'] . "' AND `message_type` = '" . $MessCategory . "' ORDER BY `message_time` DESC;", 'messages'),
                    'MessCategory' => $MessCategory,
                    'MessType' => $MessType,
                    'MessageType' => $MessageType,
                    'BackGndColor' => array(0 => '#663366', 1 => '#336666', 2 => '#000099', 3 => '#666666', 4 => '#999999', 5 => '#999999', 15 => '#999999', 99 => '#999999', 100 => '#999999'),
                ));

                $this->render('messages_show.tpl');
                break;

            default:

                $this->tplObj->assign(array(
                    'title' => $lang['mess_pagetitle'],
                    'lang' => $lang,
                    'TitleColor' => $TitleColor,
                    'WaitingMess' => $WaitingMess,
                    'TotalMess' => $TotalMess,
                    'MessType' => $MessType,
                    'MessageType' => $MessageType,
                ));

                $this->render('messages_default.tpl');
                break;
        }
    }

}
