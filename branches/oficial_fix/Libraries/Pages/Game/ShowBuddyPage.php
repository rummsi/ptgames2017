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
 * @ShowBuddyPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/abr/2016 21:45:48
 */

/**
 * Description of ShowBuddyPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowBuddyPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'buddy';
    }

    function show() {
        global $lang, $user;
        
        includeLang('buddy');

        $a = @$_GET['a'];
        $e = @$_GET['e'];
        $s = @$_GET['s'];
        $u = intval(@$_GET['u']);

        if ($s == 1 && isset($_GET['bid'])) {
            // Effacer une entree de la liste d'amis
            $bid = intval($_GET['bid']);

            $buddy = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $bid . "';", 'buddy', true);
            if ($buddy['owner'] == $user['id']) {
                if ($buddy['active'] == 0 && $a == 1) {
                    doquery("DELETE FROM {{table}} WHERE `id` = '" . $bid . "';", 'buddy');
                } elseif ($buddy['active'] == 1) {
                    doquery("DELETE FROM {{table}} WHERE `id` = '" . $bid . "';", 'buddy');
                } elseif ($buddy['active'] == 0) {
                    doquery("UPDATE {{table}} SET `active` = '1' WHERE `id` = '" . $bid . "';", 'buddy');
                }
            } elseif ($buddy['sender'] == $user['id']) {
                doquery("DELETE FROM {{table}} WHERE `id` = '" . $bid . "';", 'buddy');
            }
        } elseif (@$_POST["s"] == 3 && $_POST["a"] == 1 && $_POST["e"] == 1 && isset($_POST["u"])) {
            // Traitement de l'enregistrement de la demande d'entree dans la liste d'amis
            $uid = $user["id"];
            $u = intval($_POST["u"]);

            $buddy = doquery("SELECT * FROM {{table}} WHERE sender={$uid} AND owner={$u} OR sender={$u} AND owner={$uid}", 'buddy', true);

            if (!$buddy) {
                if (strlen($_POST['text']) > 5000) {
                    message("Le texte ne doit pas faire plus de 5000 caract&egrave;res !", "Erreur");
                }
                $text = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text']));
                doquery("INSERT INTO {{table}} SET sender={$uid}, owner={$u}, active=0, text='{$text}'", 'buddy');
                message($lang['Request_sent'], $lang['Buddy_request'], 'game.php?page=buddy');
            } else {
                message($lang['A_request_exists_already_for_this_user'], $lang['Buddy_request']);
            }
        }

        if ($a == 2 && isset($u)) {

            $this->tplObj->assign(array(
                'title' => $lang['Buddy_list'],
                'u' => doquery("SELECT * FROM {{table}} WHERE id='$u'", "users", true),
                'a' => $a,
                'lang' => $lang,
                'user' => $user,
            ));

            $this->render('buddy_request.tpl');
        }

        if ($a == 1) {
            $query = ( $e == 1 ) ? "WHERE active=0 AND sender=" . $user["id"] : "WHERE active=0 AND owner=" . $user["id"];
        } else {
            $query = "WHERE active=1 AND sender=" . $user["id"] . " OR active=1 AND owner=" . $user["id"];
        }
        $buddyrow = doquery("SELECT * FROM {{table}} " . $query, 'buddy');

        while ($b = mysqli_fetch_array($buddyrow)) {
            $uid = ( $b["owner"] == $user["id"] ) ? $b["sender"] : $b["owner"];
            // query del user
            $u = doquery("SELECT id,username,galaxy,system,planet,onlinetime,ally_id,ally_name FROM {{table}} WHERE id=" . $uid, "users", true);
        }

        $this->tplObj->assign(array(
            'title' => $lang['Buddy_list'],
            'a' => $a,
            'buddyrow' => doquery("SELECT * FROM {{table}} " . $query, 'buddy'),
            'uid' => ( $b["owner"] == $user["id"] ) ? $b["sender"] : $b["owner"],
            'u' => $u,
            'e' => $e,
            'lang' => $lang,
        ));

        $this->setWindow('popup');
        $this->render('buddy_body.tpl');
    }

}
