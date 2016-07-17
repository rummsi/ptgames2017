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
 * @ShowAlliancePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 14:58:00
 */

/**
 * Description of ShowAlliancePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowAlliancePage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'alliance';
        includeLang('alliance');
    }

    function show() {
        global $user, $lang, $dpath;

        includeLang('alliance');

        $mode = @$_GET['type'];
        if (empty($mode)) {
            unset($mode);
        }
        $a = intval(@$_GET['a']);
        if (empty($a)) {
            unset($a);
        }
        $sort1 = intval(@$_GET['sort1']);
        if (empty($sort1)) {
            unset($sort1);
        }
        $sort2 = intval(@$_GET['sort2']);
        if (empty($sort2)) {
            unset($sort2);
        }
        $d = @$_GET['d'];
        if ((!is_numeric($d)) || (empty($d) && $d != 0))
            unset($d);

        $edit = @$_GET['edit'];

        if (empty($edit))
            unset($edit);

        $rank = intval(@$_GET['rank']);
        if (empty($rank))
            unset($rank);

        $kick = intval(@$_GET['kick']);
        if (empty($kick))
            unset($kick);

        $id = intval(@$_GET['id']);
        if (empty($id))
            unset($id);

        if (empty($user['id'])) {
            echo '<script language="javascript">';
            echo 'parent.location="../";';
            echo '</script>';
        }

        //    $mode = @$_GET['type'];
        $yes = @$_GET['yes'];
        //    $edit = @$_GET['edit'];
        $allyid = intval(@$_GET['allyid']);
        $show = intval(@$_GET['show']);
        $sort = intval(@$_GET['sort']);
        $sendmail = intval(@$_GET['sendmail']);
        $t = @$_GET['t'];
        $a = intval(@$_GET['a']);
        $tag = mysqli_real_escape_string(Database::$dbHandle, @$_GET['tag']);

        /*
          Alianza consiste en tres partes.
          La primera es la comun. Es decir, no se necesita comprobar si se esta en una alianza o no.
          La segunda, es sin alianza. Eso implica las solicitudes.
          La ultima, seria cuando ya se esta dentro de una.
         */
        // Parte inicial.

        if (@$_GET['type'] == 'ainfo') {
            $a = intval($_GET['a']);
            $tag = mysqli_real_escape_string(Database::$dbHandle, @$_GET['tag']);
            // Evitamos errores casuales xD
            // query

            if (isset($_GET['tag'])) {
                $allyrow = doquery("SELECT * FROM {{table}} WHERE ally_tag='{$tag}'", "alliance", true);
            } elseif (is_numeric($a) && $a != 0) {
                $allyrow = doquery("SELECT * FROM {{table}} WHERE id='{$a}'", "alliance", true);
            } else {
                message("Cette alliance n'existe pas !", "Information Alliance (1)");
            }
            // Si no existe
            if (!$allyrow) {
                message("Cette alliance n'existe pas !", "Information Alliance (1)");
            }
            extract($allyrow);

            // codigo raro
            $patterns[] = "#\[fc\]([a-z0-9\#]+)\[/fc\](.*?)\[/f\]#Ssi";
            $replacements[] = '<font color="\1">\2</font>';
            $patterns[] = '#\[img\](.*?)\[/img\]#Smi';
            $replacements[] = '<img src="\1" alt="\1" style="border:0px;" />';
            $patterns[] = "#\[fc\]([a-z0-9\#\ \[\]]+)\[/fc\]#Ssi";
            $replacements[] = '<font color="\1">';
            $patterns[] = "#\[/f\]#Ssi";
            $replacements[] = '</font>';
            $ally_description = preg_replace($patterns, $replacements, $ally_description);

            $this->tplObj->assign(array(
                'title' => str_replace('%s', $ally_name, $lang['Alliance_information']),
                'user' => $user,
                'lang' => $lang,
                'ally_description' => nl2br($ally_description),
                'ally_image' => $ally_image,
                'ally_web' => $ally_web,
                'ally_member_scount' => $ally_members,
                'ally_name' => $ally_name,
                'ally_tag' => $ally_tag,
            ));
            $this->render('alliance/alliance_ainfo.tpl');
        }
        // --[Comprobaciones de alianza]-------------------------
        if ($user['ally_id'] == 0) { // Sin alianza
            if ($mode == 'make' && $user['ally_request'] == 0) { // Make alliance
                /*
                  Aca se crean las alianzas...
                 */
                if ($yes == 1 && $_POST) {
                    /*
                      Por el momento solo estoy improvisando, luego se perfeccionara el sistema :)
                      Creo que aqui se realiza una query para comprovar el nombre, y luego le pregunta si es el tag correcto...
                     */
                    if (!$_POST['atag']) {
                        message($lang['have_not_tag'], $lang['make_alliance']);
                    }
                    if (!$_POST['aname']) {
                        message($lang['have_not_name'], $lang['make_alliance']);
                    }
                    $_POST['aname'] = addslashes($_POST['aname']);
                    $_POST['atag'] = addslashes($_POST['atag']);

                    $tagquery = doquery("SELECT * FROM {{table}} WHERE ally_tag='{$_POST['atag']}'", 'alliance', true);

                    if ($tagquery) {
                        message(str_replace('%s', $_POST['atag'], $lang['always_exist']), $lang['make_alliance']);
                    }
                    doquery("INSERT INTO {{table}} SET `ally_name`='{$_POST['aname']}', `ally_tag`='{$_POST['atag']}' , `ally_owner`='{$user['id']}', `ally_owner_range`='Leader', `ally_members`='1', `ally_register_time`=" . time(), "alliance");
                    $allyquery = doquery("SELECT * FROM {{table}} WHERE ally_tag='{$_POST['atag']}'", 'alliance', true);
                    doquery("UPDATE {{table}} SET `ally_id`='{$allyquery['id']}', `ally_name`='{$allyquery['ally_name']}', `ally_register_time`='" . time() . "' WHERE `id`='{$user['id']}'", "users");

                    $this->tplObj->assign(array(
                        'title' => str_replace('%s', $_POST['atag'], $lang['ally_maked']),
                        'Title' => str_replace('%s', $_POST['atag'], $lang['ally_maked']),
                        'Message1' => str_replace('%s', $_POST['atag'], $lang['alliance_has_been_maked']) . "<br><br>",
                        'Goto' => "",
                        'Button' => $lang['Ok'],
                        'TwoLines' => false,
                    ));
                    $this->render('alliance/MessageForm.tpl');
                } else {
                    $this->tplObj->assign(array(
                        'title' => $lang['make_alliance'],
                        'lang' => $lang,
                    ));
                    $this->render('alliance/alliance_make.tpl');
                }
            }

            if ($mode == 'search' && $user['ally_request'] == 0) { // search one
                $this->tplObj->assign(array(
                    'title' => $lang['search_alliance'],
                    'lang' => $lang,
                    'searchtext' => @$_POST['searchtext'],
                    '_POST' => $_POST,
                    'search' => @doquery("SELECT * FROM {{table}} WHERE ally_name LIKE '%{$_POST['searchtext']}%' or ally_tag LIKE '%{$_POST['searchtext']}%' LIMIT 30", "alliance"),
                ));
                $this->render('alliance/alliance_searchform.tpl');
            }

            if ($mode == 'apply' && $user['ally_request'] == 0) { // solicitudes
                if (!is_numeric($_GET['allyid']) || !$_GET['allyid'] || $user['ally_request'] != 0 || $user['ally_id'] != 0) {
                    message($lang['it_is_not_posible_to_apply'], $lang['it_is_not_posible_to_apply']);
                }
                // pedimos la info de la alianza
                $allyrow = doquery("SELECT ally_tag,ally_request FROM {{table}} WHERE id='" . intval($_GET['allyid']) . "'", "alliance", true);

                if (!$allyrow) {
                    message($lang['it_is_not_posible_to_apply'], $lang['it_is_not_posible_to_apply']);
                }

                extract($allyrow);

                if (@$_POST['further'] == $lang['Send']) { // esta parte es igual que el buscador de search.php...
                    doquery("UPDATE {{table}} SET `ally_request`='" . intval($allyid) . "', ally_request_text='" . mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text'])) . "', ally_register_time='" . time() . "' WHERE `id`='" . $user['id'] . "'", "users");
                    // mensaje de cuando se envia correctamente el mensaje
                    message($lang['apply_registered'], $lang['your_apply']);
                    // mensaje de cuando falla el envio
                    // message($lang['apply_cantbeadded'], $lang['your_apply']);
                } else {
                    $text_apply = ($ally_request) ? $ally_request : $lang['There_is_no_a_text_apply'];
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Write_to_alliance'],
                    'lang' => $lang,
                    'allyid' => intval($_GET['allyid']),
                    'chars_count' => strlen($text_apply),
                    'text_apply' => $text_apply,
                    'Write_to_alliance' => str_replace('%s', $ally_tag, $lang['Write_to_alliance']),
                ));
                $this->render('alliance/alliance_applyform.tpl');
            }

            if ($user['ally_request'] != 0) { // Esperando una respuesta
                // preguntamos por el ally_tag
                $allyquery = doquery("SELECT ally_tag FROM {{table}} WHERE id='" . intval($user['ally_request']) . "' ORDER BY `id`", "alliance", true);

                extract($allyquery);
                if (@$_POST['bcancel']) {
                    doquery("UPDATE {{table}} SET `ally_request`=0 WHERE `id`=" . $user['id'], "users");

                    $this->tplObj->assign(array(
                        'title' => "Deine Anfrage",
                        'lang' => $lang,
                        'request_text' => str_replace('%s', $ally_tag, $lang['Canceled_a_request_text']),
                        'button_text' => $lang['Ok'],
                    ));
                    $this->render('alliance/alliance_apply_waitform.tpl');
                } else {
                    $this->tplObj->assign(array(
                        'title' => "Deine Anfrage",
                        'lang' => $lang,
                        'request_text' => str_replace('%s', $ally_tag, $lang['Waiting_a_request_text']),
                        'button_text' => $lang['Delete_apply'],
                    ));
                    $this->render('alliance/alliance_apply_waitform.tpl');
                }
            } else { // Vista sin allianza
                /*
                  Vista normal de cuando no se tiene ni solicitud ni alianza
                 */
                $this->tplObj->assign(array(
                    'title' => $lang['alliance'],
                    'lang' => $lang,
                ));
                $this->render('alliance/alliance_defaultmenu.tpl');
            }
        }

        //---------------------------------------------------------------------------------------------------------------------------------------------------
        // Parte de adentro de la alianza
        elseif ($user['ally_id'] != 0 && $user['ally_request'] == 0) { // Con alianza
            $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
            $ally_ranks = unserialize($ally['ally_ranks']);
            if ($ally_ranks[$user['ally_rank_id'] - 1]['onlinestatus'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_can_watch_memberlist_status = true;
            } else {
                $user_can_watch_memberlist_status = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['memberlist'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_can_watch_memberlist = true;
            } else {
                $user_can_watch_memberlist = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['mails'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_can_send_mails = true;
            } else {
                $user_can_send_mails = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['kick'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_can_kick = true;
            } else {
                $user_can_kick = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['rechtehand'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_can_edit_rights = true;
            } else {
                $user_can_edit_rights = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['delete'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_can_exit_alliance = true;
            } else {
                $user_can_exit_alliance = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['bewerbungen'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_bewerbungen_einsehen = true;
            } else {
                $user_bewerbungen_einsehen = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['bewerbungenbearbeiten'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_bewerbungen_bearbeiten = true;
            } else {
                $user_bewerbungen_bearbeiten = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['administrieren'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_admin = true;
            } else {
                $user_admin = false;
            }
            if ($ally_ranks[$user['ally_rank_id'] - 1]['onlinestatus'] == 1 || $ally['ally_owner'] == $user['id']) {
                $user_onlinestatus = true;
            } else {
                $user_onlinestatus = false;
            }
            if (!$ally) {
                doquery("UPDATE {{table}} SET `ally_name`='',`ally_id`=0 WHERE `id`='{$user['id']}'", "users");
                message($lang['ally_notexist'], $lang['your_alliance'], 'game.php?page=alliance');
            }

            if ($mode == 'exit') {
                if ($ally['ally_owner'] == $user['id']) {
                    message($lang['Owner_cant_go_out'], $lang['Alliance']);
                }
                // se sale de la alianza
                if ($_GET['yes'] == 1) {
                    doquery("UPDATE {{table}} SET `ally_id`=0, `ally_name` = '' WHERE `id`='{$user['id']}'", "users");
                    $this->tplObj->assign(array(
                        'title' => $lang['Go_out_welldone'],
                        'Title' => str_replace("%s", $ally_name, $lang['Go_out_welldone']),
                        'Message1' => "<br>",
                        'Goto' => "game.php?page=alliance",
                        'Button' => $lang['Ok'],
                        'TwoLines' => false,
                    ));
                    $this->render('alliance/MessageForm.tpl');
                    // Se quitan los puntos del user en la alianza
                } else {
                    // se pregunta si se quiere salir
                    $this->tplObj->assign(array(
                        'title' => $lang['Want_go_out'],
                        'Title' => str_replace("%s", $ally_name, $lang['Want_go_out']),
                        'Message1' => "<br>",
                        'Goto' => "game.php?page=alliance&type=exit&yes=1",
                        'Button' => "Oui",
                        'TwoLines' => false,
                    ));
                    $this->render('alliance/MessageForm.tpl');
                }
            }

            if ($mode == 'memberslist') { // Lista de miembros.
                /*
                  Lista de miembros.
                  Por lo que parece solo se hace una query fijandose los usuarios con el mismo ally_id.
                  seguido del query del planeta principal de cada uno para sacarle la posicion, pero
                  voy a ver si tambien agrego las cordenadas en el id user...
                 */
                // $user_can_watch_memberlist
                // comprobamos el permiso
                if ($ally['ally_owner'] != $user['id'] && !$user_can_watch_memberlist) {
                    message($lang['Denied_access'], $lang['Members_list']);
                }
                // El orden de aparicion
                if (@$sort2) {
                    $sort1 = intval($_GET['sort1']);
                    $sort2 = intval($_GET['sort2']);
                    if ($sort1 == 1) {
                        $sort = " ORDER BY `username`";
                    } elseif ($sort1 == 2) {
                        $sort = " ORDER BY `username`";
                    } elseif ($sort1 == 4) {
                        $sort = " ORDER BY `ally_register_time`";
                    } elseif ($sort1 == 5) {
                        $sort = " ORDER BY `onlinetime`";
                    } else {
                        $sort = " ORDER BY `id`";
                    }
                    if ($sort2 == 1) {
                        $sort .= " DESC;";
                    } elseif ($sort2 == 2) {
                        $sort .= " ASC;";
                    }
                    $listuser = doquery("SELECT * FROM {{table}} WHERE ally_id='{$user['ally_id']}'{$sort}", 'users');
                } else {
                    $listuser = doquery("SELECT * FROM {{table}} WHERE ally_id='{$user['ally_id']}'", 'users');
                }
                // contamos la cantidad de usuarios.
                $i = 0;
                // para cambiar el link de ordenar.
                if (@$sort2 == 1) {
                    $s = 2;
                } elseif (@$sort2 == 2) {
                    $s = 1;
                } else {
                    $s = 1;
                }
                if ($i != $ally['ally_members']) {
                    doquery("UPDATE {{table}} SET `ally_members`='{$i}' WHERE `id`='{$ally['id']}'", 'alliance');
                }
                $this->tplObj->assign(array(
                    'title' => $lang['Members_list'],
                    'lang' => $lang,
                    'ally_ranks' => unserialize($ally['ally_ranks']),
                    'i' => 0,
                    's' => $s,
                    'doquery' => doquery("UPDATE {{table}} SET `ally_members`='{$i}' WHERE `id`='{$ally['id']}'", 'alliance'),
                    'user_can_watch_memberlist_status' => $user_can_watch_memberlist_status,
                    'listuser' => doquery("SELECT * FROM {{table}} WHERE ally_id='{$user['ally_id']}'", 'users'),
                    'UserPoints' => @doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $u['id'] . "';", 'statpoints', true),
                    'ally_members' => $ally['ally_members'],
                    'ally_owner_range' => $ally['ally_owner_range'],
                    'ally_owner' => $ally['ally_owner'],
                ));
                $this->render('alliance/alliance_memberslist_table.tpl');
            }

            if ($mode == 'circular') { // Correo circular
                /*
                  Mandar un correo circular.
                  creo que aqui tendria que ver yo como crear el sistema de mensajes...
                 */
                // comprobamos el permiso
                if ($ally['ally_owner'] != $user['id'] && !$user_can_send_mails) {
                    message($lang['Denied_access'], $lang['Send_circular_mail']);
                }

                if ($sendmail == 1) {
                    $_POST['r'] = intval($_POST['r']);
                    $_POST['text'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text']));

                    if ($_POST['r'] == 0) {
                        $sq = doquery("SELECT id,username FROM {{table}} WHERE ally_id='{$user['ally_id']}'", "users");
                    } else {
                        $sq = doquery("SELECT id,username FROM {{table}} WHERE ally_id='{$user['ally_id']}' AND ally_rank_id='{$_POST['r']}'", "users");
                    }
                    // looooooop
                    $list = '';
                    while ($u = mysqli_fetch_array($sq)) {
                        doquery("INSERT INTO {{table}} SET `message_owner`='{$u['id']}', `message_sender`='{$user['id']}' , `message_time`='" . time() . "', `message_type`='2', `message_from`='{$ally['ally_tag']}', `message_subject`='{$user['username']}', `message_text`='{$_POST['text']}' ", "messages");
                        $list .= "<br>{$u['username']} ";
                    }
                    // doquery("SELECT id,username FROM {{table}} WHERE ally_id='{$user['ally_id']}' ORDER BY `id`","users");
                    doquery("UPDATE {{table}} SET `new_message`=new_message+1 WHERE ally_id='{$user['ally_id']}' AND ally_rank_id='{$_POST['r']}'", "users");
                    doquery("UPDATE {{table}} SET `mnl_alliance`=mnl_alliance+1 WHERE ally_id='{$user['ally_id']}' AND ally_rank_id='{$_POST['r']}'", "users");
                    /*
                      Aca un mensajito diciendo que a quien se mando.
                     */

                    $this->tplObj->assign(array(
                        'title' => $lang['Send_circular_mail'],
                        'lang' => $lang,
                        'Title' => $lang['Circular_sended'],
                        'Message1' => "Les membres suivants ont re�u un message:" . $list,
                        'Goto' => "game.php?page=alliance",
                        'Button' => $lang['Ok'],
                        'TwoLines' => true,
                    ));
                    $this->render('alliance/MessageForm.tpl');
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Send_circular_mail'],
                    'lang' => $lang,
                    'allianz_raenge' => unserialize($ally['ally_ranks']),
                ));
                $this->render('alliance/alliance_circular.tpl');
            }

            if ($mode == 'admin' && $edit == 'rights') { // Administrar leyes
                $ally_ranks = unserialize($ally['ally_ranks']);

                if ($ally['ally_owner'] != $user['id'] && !$user_can_edit_rights) {
                    message($lang['Denied_access'], $lang['Members_list']);
                } elseif (!empty($_POST['newrangname'])) {
                    $name = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['newrangname']));

                    $ally_ranks[] = array(
                        'name' => $name,
                        'mails' => 0,
                        'delete' => 0,
                        'kick' => 0,
                        'bewerbungen' => 0,
                        'administrieren' => 0,
                        'bewerbungenbearbeiten' => 0,
                        'memberlist' => 0,
                        'onlinestatus' => 0,
                        'rechtehand' => 0
                    );

                    $ranks = serialize($ally_ranks);
                    doquery("UPDATE {{table}} SET `ally_ranks`='" . $ranks . "' WHERE `id`=" . $ally['id'], "alliance");
                    $goto = $_SERVER['PHP_SELF'] . "?" . $_SERVER['QUERY_STRING'];
                    header("Location: " . $goto);
                    exit();
                } elseif ($_POST['id'] != '' && is_array($_POST['id'])) {
                    $ally_ranks_new = array();
                    foreach ($_POST['id'] as $id) {
                        $name = $ally_ranks[$id]['name'];
                        $ally_ranks_new[$id]['name'] = $name;
                        if (isset($_POST['u' . $id . 'r0'])) {
                            $ally_ranks_new[$id]['delete'] = 1;
                        } else {
                            $ally_ranks_new[$id]['delete'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r1']) && $ally['ally_owner'] == $user['id']) {
                            $ally_ranks_new[$id]['kick'] = 1;
                        } else {
                            $ally_ranks_new[$id]['kick'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r2'])) {
                            $ally_ranks_new[$id]['bewerbungen'] = 1;
                        } else {
                            $ally_ranks_new[$id]['bewerbungen'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r3'])) {
                            $ally_ranks_new[$id]['memberlist'] = 1;
                        } else {
                            $ally_ranks_new[$id]['memberlist'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r4'])) {
                            $ally_ranks_new[$id]['bewerbungenbearbeiten'] = 1;
                        } else {
                            $ally_ranks_new[$id]['bewerbungenbearbeiten'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r5'])) {
                            $ally_ranks_new[$id]['administrieren'] = 1;
                        } else {
                            $ally_ranks_new[$id]['administrieren'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r6'])) {
                            $ally_ranks_new[$id]['onlinestatus'] = 1;
                        } else {
                            $ally_ranks_new[$id]['onlinestatus'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r7'])) {
                            $ally_ranks_new[$id]['mails'] = 1;
                        } else {
                            $ally_ranks_new[$id]['mails'] = 0;
                        }
                        if (isset($_POST['u' . $id . 'r8'])) {
                            $ally_ranks_new[$id]['rechtehand'] = 1;
                        } else {
                            $ally_ranks_new[$id]['rechtehand'] = 0;
                        }
                    }
                    $ranks = serialize($ally_ranks_new);
                    doquery("UPDATE {{table}} SET `ally_ranks`='" . $ranks . "' WHERE `id`=" . $ally['id'], "alliance");
                    $goto = $_SERVER['PHP_SELF'] . "?" . $_SERVER['QUERY_STRING'];
                    header("Location: " . $goto);
                    exit();
                }
                // borrar una entrada
                elseif (isset($d) && isset($ally_ranks[$d])) {
                    unset($ally_ranks[$d]);
                    $ally['ally_rank'] = serialize($ally_ranks);
                    doquery("UPDATE {{table}} SET `ally_ranks`='{$ally['ally_rank']}' WHERE `id`={$ally['id']}", "alliance");
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Law_settings'],
                    'lang' => $lang,
                    'user' => $user,
                    'ally_ranks' => $ally_ranks,
                    'ally' => $ally,
                ));
                $this->render('alliance/alliance_admin_laws.tpl');
            }

            if ($mode == 'admin' && $edit == 'ally') { // Administrar la alianza *pendiente urgente*
                if ($t != 1 && $t != 2 && $t != 3) {
                    $t = 1;
                }
                // post!
                if ($_POST) {
                    if (!get_magic_quotes_gpc()) {
                        $_POST['owner_range'] = stripslashes($_POST['owner_range']);
                        $_POST['web'] = stripslashes($_POST['web']);
                        $_POST['image'] = stripslashes($_POST['image']);
                        $_POST['text'] = stripslashes($_POST['text']);
                    }
                }

                if ($_POST['options']) {
                    $ally['ally_owner_range'] = mysqli_real_escape_string(Database::$dbHandle, htmlspecialchars(strip_tags($_POST['owner_range'])));
                    $ally['ally_web'] = mysqli_real_escape_string(Database::$dbHandle, htmlspecialchars(strip_tags($_POST['web'])));
                    $ally['ally_image'] = mysqli_real_escape_string(Database::$dbHandle, htmlspecialchars(strip_tags($_POST['image'])));
                    $ally['ally_request_notallow'] = intval($_POST['request_notallow']);

                    if ($ally['ally_request_notallow'] != 0 && $ally['ally_request_notallow'] != 1) {
                        message("Aller � \"Candidature\" et sur une option dans le formulaire!", "Erreur");
                        exit;
                    }

                    doquery("UPDATE {{table}} SET `ally_owner_range`='{$ally['ally_owner_range']}', `ally_image`='{$ally['ally_image']}', `ally_web`='{$ally['ally_web']}', `ally_request_notallow`='{$ally['ally_request_notallow']}' WHERE `id`='{$ally['id']}'", "alliance");
                } elseif ($_POST['t']) {
                    if ($t == 3) {
                        $ally['ally_request'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text']));
                        doquery("UPDATE {{table}} SET `ally_request`='{$ally['ally_request']}' WHERE `id`='{$ally['id']}'", "alliance");
                    } elseif ($t == 2) {
                        $ally['ally_text'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text']));
                        doquery("UPDATE {{table}} SET `ally_text`='{$ally['ally_text']}' WHERE `id`='{$ally['id']}'", "alliance");
                    } else {
                        $ally['ally_description'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags(stripslashes($_POST['text'])));
                        doquery("UPDATE {{table}} SET `ally_description`='" . $ally['ally_description'] . "' WHERE `id`='{$ally['id']}'", "alliance");
                    }
                }
                /*
                  Depende del $t, muestra el formulario para cada tipo de texto.
                 */
                if ($t == 3) {
                    $lang['request_type'] = $lang['Show_of_request_text'];
                } elseif ($t == 2) {
                    $lang['request_type'] = $lang['Internal_text_of_alliance'];
                } else {
                    $lang['request_type'] = $lang['Public_text_of_alliance'];
                }

                if ($t == 2) {
                    $lang['text'] = $ally['ally_text'];
                    $lang['Texts'] = "Interner Text";
                    $lang['Show_of_request_text'] = "Internet Allianz Text";
                } else {
                    $lang['text'] = $ally['ally_description'];
                }

                if ($t == 3) {
                    
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Alliance_admin'],
                    'lang' => $lang,
                    't' => $t,
                    'text' => $lang['text'],
                    'request_type' => $lang['request_type'],
                    'ally_web' => $ally['ally_web'],
                    'ally_image' => $ally['ally_image'],
                    'ally_request_notallow_0' => (($ally['ally_request_notallow'] == 1) ? ' SELECTED' : ''),
                    'ally_request_notallow_1' => (($ally['ally_request_notallow'] == 0) ? ' SELECTED' : ''),
                    'ally_owner_range' => $ally['ally_owner_range'],
                    'Transfer_alliance' => MessageForm("Abandonner / Transf&eacute;rer L'alliance", "", "game.php?page=alliance&type=admin&edit=give", $lang['Continue']),
                    'Disolve_alliance' => MessageForm("Dissoudre L'alliance", "", "game.php?page=alliance&type=admin&edit=exit", $lang['Continue']),
                ));
                $this->render('alliance/alliance_admin.tpl');
            }

            if ($mode == 'admin' && $edit == 'give') {
                if ($_POST["id"]) {
                    doquery("update {{table}} set `ally_owner`='" . $_POST["id"] . "' where `id`='" . $user['ally_id'] . "'", 'alliance');
                } else {
                    $selection = doquery("SELECT * FROM {{table}} where ally_id='" . $user['ally_id'] . "'", 'users');
                    $select = '';
                    while ($data = mysqli_fetch_array($selection)) {
                        $select.='<OPTION VALUE="' . $data['id'] . '">' . $data['username'];
                    }
                    $page .= '<br><form method="post" action="game.php?page=alliance&type=admin&edit=give"><table width="600" border="0" cellpadding="0" cellspacing="1" ALIGN="center">';
                    $page .= '<tr><td class="c" colspan="4" align="center">A qui voulez vous donner l alliance ?</td></tr>';
                    $page .= '<tr>';
                    $page .= "<th colspan=\"3\">Choisissez le joueur a qui vous souhaitez donner l alliance :</th><th colspan=\"1\"><SELECT NAME=\"id\">$select</SELECT></th>";
                    $page .= '</tr>';
                    $page .= '<tr><th colspan="4"><INPUT TYPE="submit" VALUE="Donner"></th></tr>';
                }
            }

            if ($mode == 'admin' && $edit == 'members') { // Administrar a los miembros
                /*
                  En la administrar a los miembros se pueden establecer los rangos
                  para dar los diferentes derechos "Leyes"
                 */
                // comprobamos el permiso
                if ($ally['ally_owner'] != $user['id'] && !$user_can_kick) {
                    message($lang['Denied_access'], $lang['Members_list']);
                }
                /*
                  Kickear usuarios requiere el permiso numero 1
                 */
                if (isset($kick)) {
                    if ($ally['ally_owner'] != $user['id'] && !$user_can_kick) {
                        message($lang['Denied_access'], $lang['Members_list']);
                    }

                    $u = doquery("SELECT * FROM {{table}} WHERE id='{$kick}' LIMIT 1", 'users', true);
                    // kickeamos!
                    if ($u['ally_id'] == $ally['id'] && $u['id'] != $ally['ally_owner']) {
                        doquery("UPDATE {{table}} SET `ally_id`='0' ,`ally_name` = '' WHERE `id`='{$u['id']}'", 'users');
                    }
                } elseif (isset($_POST['newrang'])) {
                    $q = doquery("SELECT * FROM {{table}} WHERE id='{$u}' LIMIT 1", 'users', true);

                    if ((isset($ally_ranks[$_POST['newrang'] - 1]) || $_POST['newrang'] == 0) && $q['id'] != $ally['ally_owner']) {
                        doquery("UPDATE {{table}} SET `ally_rank_id`='" . mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['newrang'])) . "' WHERE `id`='" . intval($id) . "'", 'users');
                    }
                }
                // El orden de aparicion
                if (@$sort2) {
                    // agregar el =0 para las coordenadas...
                    if ($sort1 == 1) {
                        $sort = " ORDER BY `username`";
                    } elseif ($sort1 == 2) {
                        $sort = " ORDER BY `username`";
                    } elseif ($sort1 == 4) {
                        $sort = " ORDER BY `ally_register_time`";
                    } elseif ($sort1 == 5) {
                        $sort = " ORDER BY `onlinetime`";
                    } else {
                        $sort = " ORDER BY `id`";
                    }

                    if ($sort2 == 1) {
                        $sort .= " DESC;";
                    } elseif ($sort2 == 2) {
                        $sort .= " ASC;";
                    }
                    $listuser = doquery("SELECT * FROM {{table}} WHERE ally_id='{$user['ally_id']}'{$sort}", 'users');
                } else {
                    $listuser = doquery("SELECT * FROM {{table}} WHERE ally_id={$user['ally_id']}", 'users');
                }
                // contamos la cantidad de usuarios.
                $i = 0;
                // Como es costumbre. un row template
                $page_list = '';

                while ($u = mysqli_fetch_array($listuser)) {
                    $UserPoints = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $u['id'] . "';", 'statpoints', true);
                    $i++;
                    $u['i'] = $i;
                    // Dias de inactivos
                    $u['points'] = "" . pretty_number($UserPoints['total_points']) . "";
                    $days = floor(round(time() - $u["onlinetime"]) / 3600 % 24);
                    $u["onlinetime"] = str_replace("%s", $days, "%s d");
                    // Nombre de rango
                    if ($ally['ally_owner'] == $u['id']) {
                        $ally_range = ($ally['ally_owner_range'] == '') ? $lang['Founder'] : $ally['ally_owner_range'];
                    } elseif ($u['ally_rank_id'] == 0 || !isset($ally_ranks[$u['ally_rank_id'] - 1]['name'])) {
                        $ally_range = $lang['Novate'];
                    } else {
                        $ally_range = $ally_ranks[$u['ally_rank_id'] - 1]['name'];
                    }

                    /*
                      Aca viene la parte jodida...
                     */
                    if ($ally['ally_owner'] == $u['id'] || @$rank == $u['id']) {
                        $u["functions"] = '';
                    } elseif (@$ally_ranks[$user['ally_rank_id'] - 1][5] == 1 || $ally['ally_owner'] == $user['id']) {
                        $f['dpath'] = $dpath;
                        $f['Expel_user'] = $lang['Expel_user'];
                        $f['Set_range'] = $lang['Set_range'];
                        $f['You_are_sure_want_kick_to'] = str_replace("%s", $u['username'], $lang['You_are_sure_want_kick_to']);
                        $f['id'] = $u['id'];
                        $u["functions"] = $this->tplObj->fetch('alliance/alliance_admin_members_function.tpl', $f);
                    } else {
                        $u["functions"] = '';
                    }
                    $u["dpath"] = $dpath;
                    // por el formulario...
                    if (@$rank != $u['id']) {
                        $u['ally_range'] = $ally_range;
                    } else {
                        $u['ally_range'] = '';
                    }
                    $u['ally_register_time'] = date("Y-m-d h:i:s", $u['ally_register_time']);
                    $u['Write_a_message'] = $lang['Write_a_message'];
                    $page_list .= $this->tplObj->fetch('alliance/alliance_admin_members_row.tpl', $u);
                    if (@$rank == $u['id']) {
                        $r['Rank_for'] = str_replace("%s", $u['username'], $lang['Rank_for']);
                        $r['options'] .= "<option value=\"0\">{$lang['Novate']}</option>";

                        foreach ($ally_ranks as $a => $b) {
                            $r['options'] .= "<option value=\"" . ($a + 1) . "\"";
                            if ($u['ally_rank_id'] - 1 == $a) {
                                $r['options'] .= ' selected=selected';
                            }
                            $r['options'] .= ">{$b['name']}</option>";
                        }
                        $r['id'] = $u['id'];
                        $r['Save'] = $lang['Save'];
                        $page_list .= $this->tplObj->fetch('alliance/alliance_admin_members_row_edit.tpl', $r);
                    }
                }
                // para cambiar el link de ordenar.
                if (@$sort2 == 1) {
                    $s = 2;
                } elseif (@$sort2 == 2) {
                    $s = 1;
                } else {
                    $s = 1;
                }

                if ($i != $ally['ally_members']) {
                    doquery("UPDATE {{table}} SET `ally_members`='{$i}' WHERE `id`='{$ally['id']}'", 'alliance');
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Members_administrate'],
                    'memberslist' => $page_list,
                    's' => $s,
                    'lang' => $lang,
                    'memberzahl' => mysqli_num_rows($listuser),
                ));
                $this->render('alliance/alliance_admin_members_table.tpl');
                // a=9 es para cambiar la etiqueta de la etiqueta.
                // a=10 es para cambiarle el nombre de la alianza
            }

            if ($mode == 'admin' && $edit == 'requests') { // Administrar solicitudes
                if ($ally['ally_owner'] != $user['id'] && !$user_bewerbungen_bearbeiten) {
                    message($lang['Denied_access'], $lang['Check_the_requests']);
                }

                if (@$_POST['action'] == "Accepter") {
                    $_POST['text'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text']));

                    $u = doquery("SELECT * FROM {{table}} WHERE id=$show", 'users', true);
                    // agrega los puntos al unirse el user a la alianza
                    doquery("UPDATE {{table}} SET ally_members=ally_members+1 WHERE id='{$ally['id']}'", 'alliance');

                    doquery("UPDATE {{table}} SET ally_name='{$ally['ally_name']}', ally_request_text='', ally_request='0', ally_id='{$ally['id']}', new_message=new_message+1, mnl_alliance=mnl_alliance+1 WHERE id='{$show}'", 'users');
                    // Se envia un mensaje avizando...

                    doquery("INSERT INTO {{table}} SET `message_owner`='{$show}', `message_sender`='{$user['id']}' , `message_time`='" . time() . "', `message_type`='2', `message_from`='{$ally['ally_tag']}', `message_subject`='[" . $ally['ally_name'] . "] vous a acceptee!', `message_text`='Hi!<br>L\'Alliance <b>" . $ally['ally_name'] . "</b> a acceptee votre candidature!<br>Charte:<br>" . $_POST['text'] . "'", "messages");

                    header('Location:game.php?page=alliance&type=admin&edit=requests');
                    die();
                } elseif (@$_POST['action'] == "Refuser" && $_POST['action'] != '') {
                    $_POST['text'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['text']));

                    doquery("UPDATE {{table}} SET ally_request_text='',ally_request='0',ally_id='0',new_message=new_message+1, mnl_alliance=mnl_alliance+1 WHERE id='{$show}'", 'users');
                    // Se envia un mensaje avizando...
                    doquery("INSERT INTO {{table}} SET `message_owner`='{$show}', `message_sender`='{$user['id']}' , `message_time`='" . time() . "', `message_type`='2', `message_from`='{$ally['ally_tag']}', `message_subject`='[" . $ally['ally_name'] . "] vous as refuse!', `message_text`='Hi!<br>L\'Alliance <b>" . $ally['ally_name'] . "</b> a refusee votre candidature!<br>Begr&uuml;ndung/Text:<br>" . $_POST['text'] . "'", "messages");

                    header('Location:game.php?page=alliance&type=admin&edit=requests');
                    die();
                }

                $request = doquery("SELECT id FROM {{table}} WHERE ally_request='{$ally['id']}'", 'users');
                $this->tplObj->assign(array(
                    'title' => $lang['Check_the_requests'],
                    'lang' => $lang,
                    'ally_tag' => $ally['ally_tag'],
                    'show' => $show,
                    'request_count' => mysqli_num_rows($request),
                    //        'list'=>$list,
                    'query' => doquery("SELECT id,username,ally_request_text,ally_register_time FROM {{table}} WHERE ally_request='{$ally['id']}'", 'users'),
                ));
                $this->render('alliance/alliance_admin_request_table.tpl');
            }

            if ($mode == 'admin' && $edit == 'name') {
                // Changer le nom de l'alliance

                $ally_ranks = unserialize($ally['ally_ranks']);
                // comprobamos el permiso
                if ($ally['ally_owner'] != $user['id'] && !$user_admin) {
                    message($lang['Denied_access'], $lang['Members_list']);
                }

                if ($_POST['newname']) {
                    // Y a le nouveau Nom
                    $ally['ally_name'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['newname']));
                    doquery("UPDATE {{table}} SET `ally_name` = '" . $ally['ally_name'] . "' WHERE `id` = '" . $user['ally_id'] . "';", 'alliance');
                    doquery("UPDATE {{table}} SET `ally_name` = '" . $ally['ally_name'] . "' WHERE `ally_id` = '" . $ally['id'] . "';", 'users');
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Alliance_admin'],
                    'lang' => $lang,
                    'ally' => $ally,
                    'question' => str_replace('%s', $ally['ally_name'], $lang['How_you_will_call_the_alliance_in_the_future']),
                    'name' => 'newname',
                ));
                $this->render('alliance/alliance_admin_rename.tpl');
            }

            if ($mode == 'admin' && $edit == 'tag') {
                // Changer le TAG l'alliance
                $ally_ranks = unserialize($ally['ally_ranks']);

                // Bon si on verifiait les autorisation ?
                if ($ally['ally_owner'] != $user['id'] && !$user_admin) {
                    message($lang['Denied_access'], $lang['Members_list']);
                }

                if ($_POST['newtag']) {
                    // Y a le nouveau TAG
                    $ally['ally_tag'] = mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST['newtag']));
                    doquery("UPDATE {{table}} SET `ally_tag` = '" . $ally['ally_tag'] . "' WHERE `id` = '" . $user['ally_id'] . "';", 'alliance');
                }

                $this->tplObj->assign(array(
                    'title' => $lang['Alliance_admin'],
                    'lang' => $lang,
                    'ally' => $ally,
                    'question' => str_replace('%s', $ally['ally_tag'], $lang['How_you_will_call_the_alliance_in_the_future']),
                    'name' => 'newtag',
                ));
                $this->render('alliance/alliance_admin_rename.tpl');
            }

            if ($mode == 'admin' && $edit == 'exit') { // disolver una alianza
                // obtenemos el array de los rangos
                $ally_ranks = unserialize($ally['ally_ranks']);
                // comprobamos el permiso
                if ($ally['ally_owner'] != $user['id'] && !$user_can_exit_alliance) {
                    message($lang['Denied_access'], $lang['Members_list']);
                }
                /*
                  Si bien, se tendria que confirmar, no tengo animos para hacerlo mas detallado...
                  sorry :(
                 */
                doquery("UPDATE {{table}} SET `ally_id`='0', `ally_name` = '' WHERE `id`='{$user['id']}'", 'users');
                doquery("DELETE FROM {{table}} WHERE id='{$ally['id']}'", "alliance");
                header('Location: game.php?page=alliance');
                exit;
            } {
                // Default *falta revisar...*
                if ($ally['ally_owner'] != $user['id']) {
                    $ally_ranks = unserialize($ally['ally_ranks']);
                }
                // El link para ver las solicitudes
                $request = doquery("SELECT id FROM {{table}} WHERE ally_request='{$ally['id']}'", 'users');
                // codigo raro
                $patterns[] = "#\[fc\]([a-z0-9\#]+)\[/fc\](.*?)\[/f\]#Ssi";
                $replacements[] = '<font color="\1">\2</font>';
                $patterns[] = '#\[img\](.*?)\[/img\]#Smi';
                $replacements[] = '<img src="\1" alt="\1" style="border:0px;" />';
                $patterns[] = "#\[fc\]([a-z0-9\#\ \[\]]+)\[/fc\]#Ssi";
                $replacements[] = '<font color="\1">';
                $patterns[] = "#\[/f\]#Ssi";
                $replacements[] = '</font>';

                $this->tplObj->assign(array(
                    'title' => $lang['your_alliance'],
                    'lang' => $lang,
                    'ally' => $ally,
                    'user' => $user,
                    'request_count' => mysqli_num_rows($request),
                    'ally_description' => preg_replace($patterns, $replacements, $ally['ally_description']),
                    'ally_text' => preg_replace($patterns, $replacements, $ally['ally_text']),
                    'ally_web' => $ally['ally_web'],
                    'ally_tag' => $ally['ally_tag'],
                    'ally_members' => $ally['ally_members'],
                    'ally_name' => $ally['ally_name'],
                    'ally_ranks' => $ally_ranks,
                ));
                $this->render('alliance/alliance_frontpage.tpl');
            }
        }
    }

}
