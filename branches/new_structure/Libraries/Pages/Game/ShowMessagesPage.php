<?php

/*
 * XNovaPT
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
 * XNovaPT
 * @author XNovaPT Team <xnovaptteam@gmail.com>
 * @ShowMessagesPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  6/mai/2015 21:49:59
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
        global $user, $lang, $messfields, $dpath;

        if (!isset($user['authlevel'])) {
            header("Location: index.php");
        }

        includeLang('messages');

        $OwnerID = @$_GET['id'];
        $MessCategory = @$_GET['messcat'];
        $MessPageMode = (string) @$_GET['mode'];
        $DeleteWhat = @$_POST['deletemessages'];
        if (isset($DeleteWhat)) {
            $MessPageMode = "delete";
        }

        $UsrMess = doquery("SELECT * FROM {{table}} WHERE `message_owner` = '" . strval($user['id']) . "' ORDER BY `message_time` DESC", 'messages');
        $UnRead = doquery("SELECT * FROM {{table}} WHERE `id` = '" . strval($user['id']) . "'", 'users', true);

        $MessageType = array(0, 1, 2, 3, 4, 5, 15, 99, 100);
        $TitleColor = array(0 => '#FFFF00', 1 => '#FF6699', 2 => '#FF3300', 3 => '#FF9900', 4 => '#773399', 5 => '#009933', 15 => '#030070', 99 => '#007070', 100 => '#ABABAB');
        $BackGndColor = array(0 => '#663366', 1 => '#336666', 2 => '#000099', 3 => '#666666', 4 => '#999999', 5 => '#999999', 15 => '#999999', 99 => '#999999', 100 => '#999999');

        for ($MessType = 0; $MessType < 101; $MessType++) {
            if (in_array($MessType, $MessageType)) {
                $WaitingMess[$MessType] = $UnRead[$messfields[$MessType]];
                $TotalMess[$MessType] = 0;
            }
        }

        while ($CurMess = mysql_fetch_array($UsrMess)) {
            $MessType = $CurMess['message_type'];
            $TotalMess[$MessType] += 1;
            $TotalMess[100] += 1;
        }

        switch ($MessPageMode) {

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
                        $IsSelected = @$_POST[$Selected];
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
                $page1 = "";
                if ($MessCategory == 100) {
                    $UsrMess = doquery("SELECT * FROM {{table}} WHERE `message_owner` = '" . $user['id'] . "' ORDER BY `message_time` DESC;", 'messages');
                    $SubUpdateQry = "";
                    for ($MessType = 0; $MessType < 101; $MessType++) {
                        if (in_array($MessType, $MessageType)) {
                            $SubUpdateQry .= "`" . $messfields[$MessType] . "` = '0', ";
                        }
                    }
                    $QryUpdateUser = "UPDATE {{table}} SET ";
                    $QryUpdateUser .= $SubUpdateQry;
                    $QryUpdateUser .= "`id` = '" . $user['id'] . "' ";
                    $QryUpdateUser .= "WHERE ";
                    $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                    doquery($QryUpdateUser, 'users');
                    while ($CurMess = mysql_fetch_array($UsrMess)) {
                        $page1 .= "\n<tr>";
                        $page1 .= "<input name=\"showmes" . $CurMess['message_id'] . "\" type=\"hidden\" value=\"1\">";
                        $page1 .= "<th><input name=\"delmes" . $CurMess['message_id'] . "\" type=\"checkbox\"></th>";
                        $page1 .= "<th>" . date("m-d H:i:s O", $CurMess['message_time']) . "</th>";
                        $page1 .= "<th>" . stripslashes($CurMess['message_from']) . "</th>";
                        $page1 .= "<th>" . stripslashes($CurMess['message_subject']) . " ";
                        if ($CurMess['message_type'] == 1) {
                            $page1 .= "<a href=\"game.php?page=messages&mode=write&amp;id=" . $CurMess['message_sender'] . "&amp;subject=" . $lang['mess_answer_prefix'] . htmlspecialchars($CurMess['message_subject']) . "\">";
                            $page1 .= "<img src=\"" . $dpath . "img/m.gif\" alt=\"" . $lang['mess_answer'] . "\" border=\"0\"></a></th>";
                        } else {
                            $page1 .= "</th>";
                        }
                        $page1 .= "</tr><tr>";
                        $page1 .= "<td style=\"background-color: " . $BackGndColor[$CurMess['message_type']] . "; background-image: none;\"; class=\"b\"> </td>";
                        $page1 .= "<td style=\"background-color: " . $BackGndColor[$CurMess['message_type']] . "; background-image: none;\"; colspan=\"3\" class=\"b\">" . stripslashes(nl2br($CurMess['message_text'])) . "</td>";
                        $page1 .= "</tr>";
                    }
                } else {
                    $UsrMess = doquery("SELECT * FROM {{table}} WHERE `message_owner` = '" . $user['id'] . "' AND `message_type` = '" . $MessCategory . "' ORDER BY `message_time` DESC;", 'messages');
                    if ($WaitingMess[$MessCategory] <> '') {
                        $QryUpdateUser = "UPDATE {{table}} SET ";
                        $QryUpdateUser .= "`" . $messfields[$MessCategory] . "` = '0', ";
                        $QryUpdateUser .= "`" . $messfields[100] . "` = `" . $messfields[100] . "` - '" . $WaitingMess[$MessCategory] . "' ";
                        $QryUpdateUser .= "WHERE ";
                        $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                        doquery($QryUpdateUser, 'users');
                    }
                    while ($CurMess = mysql_fetch_array($UsrMess)) {
                        if ($CurMess['message_type'] == $MessCategory) {
                            $page1 .= "\n<tr>";
                            $page1 .= "<input name=\"showmes" . $CurMess['message_id'] . "\" type=\"hidden\" value=\"1\">";
                            $page1 .= "<th><input name=\"delmes" . $CurMess['message_id'] . "\" type=\"checkbox\"></th>";
                            $page1 .= "<th>" . date("m-d H:i:s O", $CurMess['message_time']) . "</th>";
                            $page1 .= "<th>" . stripslashes($CurMess['message_from']) . "</th>";
                            $page1 .= "<th>" . stripslashes($CurMess['message_subject']) . " ";
                            if ($CurMess['message_type'] == 1) {
                                $page1 .= "<a href=\"game.php?page=messages&mode=write&amp;id=" . $CurMess['message_sender'] . "&amp;subject=" . $lang['mess_answer_prefix'] . htmlspecialchars($CurMess['message_subject']) . "\">";
                                $page1 .= "<img src=\"" . $dpath . "img/m.gif\" alt=\"" . $lang['mess_answer'] . "\" border=\"0\"></a></th>";
                            } else {
                                $page1 .= "</th>";
                            }
                            $page1 .= "</tr><tr>";
                            $page1 .= "<td class=\"b\"> </td>";
                            $page1 .= "<td colspan=\"3\" class=\"b\">" . nl2br(stripslashes($CurMess['message_text'])) . "</td>";
                            $page1 .= "</tr>";
                        }
                    }
                }

                $this->tplObj->assign(array(
                    'title' => $lang['title'],
                    'mess_deletemarked' => $lang['mess_deletemarked'],
                    'mess_deleteunmarked' => $lang['mess_deleteunmarked'],
                    'mess_deleteall' => $lang['mess_deleteall'],
                    'mess_its_ok' => $lang['mess_its_ok'],
                    'MessCategory' => $MessCategory,
                    'mess_partialreport' => $lang['mess_partialreport'],
                    'mess_action' => $lang['mess_action'],
                    'mess_date' => $lang['mess_date'],
                    'mess_from' => $lang['mess_from'],
                    'mess_subject' => $lang['mess_subject'],
                    'page1' => $page1, /*

                          'TotalMess100' => $TotalMess[100],
                          'MessageType' => $MessageType,
                          'TitleColor' => $TitleColor,
                          'WaitingMess_MessType' => $WaitingMess[$MessType],
                          'TotalMess_MessType' => $TotalMess[$MessType], */
                ));
                $this->render('Messages/messages_show.tpl');
                break;

            default:

                $this->tplObj->assign(array(
                    'title' => $lang['title'],
                    'head_type' => $lang['head_type'],
                    'head_count' => $lang['head_count'],
                    'head_total' => $lang['head_total'],
                    'TitleColor100' => $TitleColor[100],
                    'type100' => $lang['type'][100],
                    'WaitingMess100' => $WaitingMess[100],
                    'TotalMess100' => $TotalMess[100],
                    'MessageType' => $MessageType,
                    'TitleColor' => $TitleColor,
                    'type' => $lang['type'],
                    'WaitingMess' => $WaitingMess,
                    'TotalMess' => $TotalMess,
                ));
                $this->render('Messages/messages_default.tpl');
                break;
        }

//        Game::display($page, $lang['mess_pagetitle']);
// -----------------------------------------------------------------------------------------------------------
// History version
// 1.0 - Version originelle (Tom1991)
// 1.1 - Mise a plat, linearisation, suppression des doublons / triplons / 'n'gnions dans le code (Chlorel)
// 1.2 - Regroupage des 2 fichiers vers 1 seul plus simple a mettre en oeuvre et a gerer !
    }

    function write() {
        global $lang, $game_config, $user;
        include(ROOT_PATH . 'includes/functions/BBcodeFunction.php');

        includeLang('messages');
        $OwnerID = @$_GET['id'];
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
                $page1 = "<center><br><font color=#FF0000>" . $lang['mess_no_subject'] . "<br></font></center>";
            }
            if (!$_POST["text"]) {
                $error++;
                $page1 = "<center><br><font color=#FF0000>" . $lang['mess_no_text'] . "<br></font></center>";
            }
            if ($error == 0) {
                $page1 = "<center><font color=#00FF00>" . $lang['mess_sended'] . "<br></font></center>";

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
            $this->tplObj->assign('page1', $page1);
        }
        $this->tplObj->assign(array(
            'title' => $lang['mess_pagetitle'],
            'Send_message' => $lang['mess_pagetitle'],
            'Recipient' => $lang['mess_recipient'],
            'Subject' => $lang['mess_subject'],
            'Message' => $lang['mess_message'],
            'characters' => $lang['mess_characters'],
            'Envoyer' => $lang['mess_envoyer'],
            'id' => $OwnerID,
            'to' => $OwnerRecord['username'] . " [" . $OwnerHome['galaxy'] . ":" . $OwnerHome['system'] . ":" . $OwnerHome['planet'] . "]",
            'subject' => (!isset($subject)) ? $lang['mess_no_subject'] : $subject,
            'text' => isset($text),
        ));

        if ($game_config['enable_bbcode'] == 1) {
            $this->render('messages_pm_form_bb.tpl');
        } else {
            $this->render('messages_pm_form.tpl');
        }
    }

}
