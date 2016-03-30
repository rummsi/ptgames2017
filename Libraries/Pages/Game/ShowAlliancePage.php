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
 * @ShowAlliancePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  3/Dez/2014 17:28:42
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
        global $user;

        if (empty($user['id'])) {
            echo '<script language="javascript">';
            echo 'parent.location="../";';
            echo '</script>';
        }
        if ($user['ally_id'] == 0) {
            $this->no_ally();
        } elseif ($user['ally_id'] != 0 && $user['ally_request'] == 0) {
            $this->ally();
        }
    }

    function ally() {
        global $user, $lang;
        $mode = HTTP::_GP('mode', '');

        // Con alianza
        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        $ally_ranks = unserialize($ally['ally_ranks']);
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['bewerbungen'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_bewerbungen_einsehen = true;
        } else {
            $user_bewerbungen_einsehen = false;
        }
        if ($allianz_raenge[$user['ally_rank_id']]['onlinestatus'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_onlinestatus = true;
        } else {
            $user_onlinestatus = false;
        }
        if (!$ally) {
            doquery("UPDATE {{table}} SET `ally_name`='',`ally_id`=0 WHERE `id`='{$user['id']}'", "users");
            message($lang['ally_notexist'], $lang['your_alliance'], 'game.php?page=alliance');
        }
        if ($mode == 'exit') {
            $this->quit();
        }
        // Default *falta revisar...*
        if ($ally['ally_owner'] != $user['id']) {
            $ally_ranks = unserialize($ally['ally_ranks']);
        }
        // Imagen de la alianza
        if ($ally['ally_ranks'] != '') {
            $ally['ally_ranks'] = "<tr><td colspan=2><img src=\"{$ally['ally_image']}\"></td></tr>";
        }
        // temporalmente...
        if ($ally['ally_owner'] == $user['id']) {
            $range = ($ally['ally_owner_range'] != '') ? $lang['Founder'] : $ally['ally_owner_range'];
        } elseif ($user['ally_rank_id'] != 0 && isset($ally_ranks[$user['ally_rank_id'] - 1]['name'])) {
            $range = $ally_ranks[$user['ally_rank_id'] - 1]['name'];
        } else {
            $range = $lang['member'];
        }
        // Link de la lista de miembros
        if ($ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id'] - 1]['memberlist'] != 0) {
            $lang['members_list'] = " (<a href=\"game.php?page=alliance&mode=memberslist\">{$lang['Members_list']}</a>)";
        } else {
            $lang['members_list'] = '';
        }
        // El link de adminstrar la allianza
        if ($ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id'] - 1]['administrieren'] != 0) {
            $lang['alliance_admin'] = " (<a href=\"game.php?page=alliance&mode=admin&edit=ally\">{$lang['Alliance_admin']}</a>)";
        } else {
            $lang['alliance_admin'] = '';
        }
        // El link de enviar correo circular
        if ($ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id'] - 1]['mails'] != 0) {
            $lang['send_circular_mail'] = "<tr><th>{$lang['Circular_message']}</th><th><a href=\"game.php?page=alliance&mode=circular\">{$lang['Send_circular_mail']}</a></th></tr>";
        } else {
            $lang['send_circular_mail'] = '';
        }
        // El link para ver las solicitudes
        $lang['requests'] = '';
        $request = doquery("SELECT id FROM {{table}} WHERE ally_request='{$ally['id']}'", 'users');
        $request_count = $request->num_rows;
        if ($request_count != 0) {
            if ($ally['ally_owner'] == $user['id'] || $ally_ranks[$user['ally_rank_id'] - 1]['bewerbungen'] != 0) {
                $lang['requests'] = "<tr><th>{$lang['Requests']}</th><th><a href=\"game.php?page=alliance&mode=admin&edit=requests\">{$request_count} {$lang['Requests']}</a></th></tr>";
            }
        }
        if ($ally['ally_owner'] != $user['id']) {
            $lang['ally_owner'] = $this->MessageForm($lang['Exit_of_this_alliance'], "", "game.php?page=alliance&mode=quit", $lang['Continue']);
        } else {
            $lang['ally_owner'] = '';
        }
        // codigo raro
        $patterns[] = "#\[fc\]([a-z0-9\#]+)\[/fc\](.*?)\[/f\]#Ssi";
        $replacements[] = '<font color="\1">\2</font>';
        $patterns[] = '#\[img\](.*?)\[/img\]#Smi';
        $replacements[] = '<img src="\1" alt="\1" style="border:0px;" />';
        $patterns[] = "#\[fc\]([a-z0-9\#\ \[\]]+)\[/fc\]#Ssi";
        $replacements[] = '<font color="\1">';
        $patterns[] = "#\[/f\]#Ssi";
        $replacements[] = '</font>';
        $ally['ally_description'] = preg_replace($patterns, $replacements, $ally['ally_description']);
        $ally['ally_text'] = preg_replace($patterns, $replacements, $ally['ally_text']);

        $this->tplObj->assign(array(
            'title' => $lang['your_alliance'],
            'your_alliance' => $lang['your_alliance'],
            // La imagen de logotipo
            'ally_image' => ($ally['ally_image'] != '') ? "<tr><th colspan=2><img src=\"{$ally['ally_image']}\"></td></tr>" : '',
            'Tag' => $lang['Tag'],
            'ally_tag' => $ally['ally_tag'],
            'Name' => $lang['Name'],
            'ally_name' => $ally['ally_name'],
            'Members' => $lang['Members'],
            'ally_members' => $ally['ally_members'],
            'members_list' => $lang['members_list'],
            'Range' => $lang['Range'],
            'range' => $range,
            'alliance_admin' => $lang['alliance_admin'],
            'requests' => $lang['requests'],
            'send_circular_mail' => $lang['send_circular_mail'],
            'ally_description' => nl2br($ally['ally_description']),
            'Main_Page' => $lang['Main_Page'],
            'ally_web' => $ally['ally_web'],
            'Inner_section' => $lang['Inner_section'],
            'ally_text' => nl2br($ally['ally_text']),
            'ally_owner' => $lang['ally_owner'],
        ));

        $this->render('Alliance/alliance_frontpage.tpl');
    }

    function no_ally() {
        global $user, $lang, $ally_tag;
        $mode = HTTP::_GP('mode', '');
        // Sin alianza
        if ($mode == 'apply' && $user['ally_request'] == 0) {
            $this->apply();
        }
        if ($user['ally_request'] != 0) {
            // Esperando una respuesta
            // preguntamos por el ally_tag
            $allyquery = doquery("SELECT ally_tag FROM {{table}} WHERE id='" . intval($user['ally_request']) . "' ORDER BY `id`", "alliance", true);
            extract($allyquery);
            if (@$_POST['bcancel']) {
                doquery("UPDATE {{table}} SET `ally_request`=0 WHERE `id`=" . $user['id'], "users");
                $this->tplObj->assign(array(
                    'title' => 'Deine Anfrage',
                    'your_apply' => $lang['your_apply'],
                    'request_text' => str_replace('%s', $ally_tag, $lang['Canceled_a_request_text']),
                    'button_text' => $lang['Ok'],
                ));

                $this->render('Alliance/alliance_apply_waitform.tpl');
            } else {
                $this->tplObj->assign(array(
                    'title' => 'Deine Anfrage',
                    'your_apply' => $lang['your_apply'],
                    'request_text' => str_replace('%s', $ally_tag, $lang['Waiting_a_request_text']),
                    'button_text' => $lang['Delete_apply'],
                ));

                $this->render('Alliance/alliance_apply_waitform.tpl');
            }
        } else { // Vista sin allianza
            /*
              Vista normal de cuando no se tiene ni solicitud ni alianza
             */
            $this->tplObj->assign(array(
                'title' => $lang['alliance'],
                'alliance' => $lang['alliance'],
                'make_alliance_owner' => $lang['make_alliance_owner'],
                'search_alliance' => $lang['search_alliance'],
            ));

            $this->render('Alliance/alliance_defaultmenu.tpl');
        }
    }

    function apply() {
        global $user, $lang, $ally_tag, $ally_request;
        $allyid = HTTP::_GP('allyid', '');

        // solicitudes
        if (!is_numeric($_GET['allyid']) || !$_GET['allyid'] || $user['ally_request'] != 0 || $user['ally_id'] != 0) {
            message($lang['it_is_not_posible_to_apply'], $lang['it_is_not_posible_to_apply']);
        }
        // pedimos la info de la alianza
        $allyrow = doquery("SELECT ally_tag,ally_request FROM {{table}} WHERE id='" . intval($_GET['allyid']) . "'", "alliance", true);

        if (!$allyrow) {
            message($lang['it_is_not_posible_to_apply'], $lang['it_is_not_posible_to_apply']);
        }
        extract($allyrow);
        if (@$_POST['further'] == $lang['Send']) { // esta parte es igual que el buscador de game.php?page=search...
            doquery("UPDATE {{table}} SET `ally_request`='" . intval($allyid) . "', ally_request_text='" . Database::$dbHandle->real_escape_string(strip_tags($_POST['text'])) . "', ally_register_time='" . time() . "' WHERE `id`='" . $user['id'] . "'", "users");
	    // mensaje de cuando se envia correctamente el mensaje
            message($lang['apply_registered'], $lang['your_apply']);
            // mensaje de cuando falla el envio
            // message($lang['apply_cantbeadded'], $lang['your_apply']);
        } else {
            $text_apply = ($ally_request) ? $ally_request : $lang['There_is_no_a_text_apply'];
        }
        $this->tplObj->assign(array(
            'title' => $lang['Write_to_alliance'],
            'Send_Apply' => $lang['Send_Apply'],
            'allyid' => intval($_GET['allyid']),
            'Write_to_alliance' => str_replace('%s', $ally_tag, $lang['Write_to_alliance']),
            'Message' => $lang['Message'],
            'chars_count' => strlen($text_apply),
            'characters' => $lang['characters'],
            'text_apply' => $text_apply,
            'Help' => $lang['Help'],
            'Reload' => $lang['Reload'],
            'Send' => $lang['Send'],
        ));

        $this->render('Alliance/alliance_applyform.tpl');
    }

    function quit() {
        global $user, $lang, $ally_name;
        $mode = HTTP::_GP('mode', 'exit');
        $yes = HTTP::_GP('yes', '');

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        if ($ally['ally_owner'] == $user['id']) {
            message($lang['Owner_cant_go_out'], $lang['Alliance']);
        }
        // se sale de la alianza
        if ($yes == 1) {
            doquery("UPDATE {{table}} SET `ally_id`=0, `ally_name` = '' WHERE `id`='{$user['id']}'", "users");
            $lang['Go_out_welldone'] = str_replace("%s", $ally_name, $lang['Go_out_welldone']);
            $this->tplObj->assign(array(
                'title' => $lang['Go_out_welldone'],
                'Title' => $lang['Go_out_welldone'],
                'Message1' => "<br>",
                'Goto' => 'game.php?page=alliance',
                'Button' => $lang['Ok'],
            ));

            $this->render('Alliance/alliance_messageform.tpl');
            // Se quitan los puntos del user en la alianza
        } else {
            // se pregunta si se quiere salir
            $lang['Want_go_out'] = str_replace("%s", $ally_name, $lang['Want_go_out']);
            $this->tplObj->assign(array(
                'title' => $lang['Want_go_out'],
                'Title' => $lang['Want_go_out'],
                'Message1' => "<br>",
                'Goto' => "game.php?page=alliance&mode=quit&yes=1",
                'Button' => $lang['Ok'],
            ));

            $this->render('Alliance/alliance_messageform.tpl');
        }
    }

    // Parte inicial.
    function ainfo() {
        global $user, $lang, $ally_image, $ally_description, $ally_web, $ally_members, $ally_name, $ally_tag;
        $id = intval(HTTP::_GP('id', ''));

        if ($_GET['mode'] == 'ainfo') {
            $a = intval(HTTP::_GP('a', ''));
            $tag = Database::$dbHandle->real_escape_string(HTTP::_GP('tag', ''));
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

            if ($ally_image != "") {
                $ally_image = "<tr><th colspan=2><img src=\"{$ally_image}\"></td></tr>";
            }

            if ($ally_description != "") {
                $ally_description = "<tr><th colspan=2 height=100>{$ally_description}</th></tr>";
            } else {
                $ally_description = "<tr><th colspan=2 height=100>Il n'y as aucune descriptions de cette alliance.</th></tr>";
            }

            if ($ally_web != "") {
                $ally_web = "<tr>
		<th>{$lang['Initial_page']}</th>
		<th><a href=\"{$ally_web}\">{$ally_web}</a></th>
		</tr>";
            }

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

            if ($user['ally_id'] == 0) {
                $lang['bewerbung'] = "<tr>
	  <th>Candidature</th>
	  <th><a href=\"game.php?page=alliance&mode=apply&amp;allyid=" . $id . "\">Cliquer ici pour ecrire votre candidature</a></th>

	</tr>";
            } else {
                $lang['bewerbung'] = "Candidature";
            }
            $lang['Info_of_Alliance'] = 'Information Alliance %s'; // manter por agora
            $this->tplObj->assign(array(
                'title' => str_replace('%s', $ally_name, $lang['Info_of_Alliance']),
                'Alliance_information' => str_replace('%s', $ally_name, $lang['Info_of_Alliance']),
                'ally_image' => $ally_image,
                'Tag' => $lang['Tag'],
                'ally_tag' => $ally_tag,
                'Name' => $lang['Name'],
                'ally_name' => $ally_name,
                'Members' => $lang['Members'],
                'ally_member_scount' => $ally_members,
                'ally_description' => nl2br($ally_description),
                'ally_web' => $ally_web,
                'bewerbung' => $lang['bewerbung'],
            ));

            $this->render('Alliance/alliance_ainfo.tpl');
        }
    }

    // --[Comprobaciones de alianza]-------------------------
    function make() {
        global $user, $lang;
        $mode = HTTP::_GP('mode', '');
        $yes = HTTP::_GP('yes', '');

        if ($mode == 'make' && $user['ally_request'] == 0) {
            // Make alliance
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
                doquery("INSERT INTO {{table}} SET`ally_name`='{$_POST['aname']}',`ally_tag`='{$_POST['atag']}' ,`ally_owner`='{$user['id']}',`ally_owner_range`='Leader',`ally_members`='1',`ally_register_time`=" . time(), "alliance");
                $allyquery = doquery("SELECT * FROM {{table}} WHERE ally_tag='{$_POST['atag']}'", 'alliance', true);
                doquery("UPDATE {{table}} SET`ally_id`='{$allyquery['id']}',`ally_name`='{$allyquery['ally_name']}',`ally_register_time`='" . time() . "'WHERE `id`='{$user['id']}'", "users");
                $this->tplObj->assign(array(
                    'title' => $lang['ally_maked'],
                    'Title' => str_replace('%s', $_POST['atag'], $lang['ally_maked']),
                    'Message1' => str_replace('%s', $_POST['atag'], $lang['alliance_has_been_maked']) . "<br><br>",
                    'Goto' => 'game.php?page=alliance',
                    'Button' => $lang['Ok'],
                ));

                $this->render('Alliance/alliance_messageform.tpl');
            } else {

                $this->tplObj->assign(array(
                    'title' => $lang['make_alliance'],
                    'make_alliance' => $lang['make_alliance'],
                    'alliance_tag' => $lang['alliance_tag'],
                    'characters' => $lang['characters'],
                    'allyance_name' => $lang['allyance_name'],
                    'Make' => $lang['Make'],
                ));

                $this->render('Alliance/alliance_make.tpl');
            }
        }
    }

    function search() {
        global $user, $lang;
        $mode = HTTP::_GP('mode', '');

        if ($mode == 'search' && $user['ally_request'] == 0) {
            // search one
            $lang['searchtext'] = @$_POST['searchtext'];
            @$search = doquery("SELECT * FROM {{table}} WHERE ally_name LIKE '%{$_POST['searchtext']}%' or ally_tag LIKE '%{$_POST['searchtext']}%' LIMIT 30", "alliance");

            $this->tplObj->assign(array(
                'title' => $lang['search_alliance'],
                'search_alliance' => $lang['search_alliance'],
                'Search' => $lang['Search'],
                'searchtext' => $lang['searchtext'],
                'INPUT_POST' => $_POST,
                'search' => $search,
                'searched_alliance_availables' => $lang['searched_alliance_availables'],
            ));

            $this->render('Alliance/alliance_searchform.tpl');
        }
    }

    // Parte de adentro de la alianza
    function memberslist() {
        global $user, $lang, $dpath;
        $sort2 = intval(HTTP::_GP('sort2', ''));

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        // Lista de miembros.
        /*
          Lista de miembros.
          Por lo que parece solo se hace una query fijandose los usuarios con el mismo ally_id.
          seguido del query del planeta principal de cada uno para sacarle la posicion, pero
          voy a ver si tambien agrego las cordenadas en el id user...
         */
        // obtenemos el array de los rangos
        // $ally_ranks = unserialize($ally['ally_ranks']);
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['memberlist'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_can_watch_memberlist = true;
        } else {
            $user_can_watch_memberlist = false;
        }
        // comprobamos el permiso
        if ($ally['ally_owner'] != $user['id'] && !$user_can_watch_memberlist) {
            message($lang['Denied_access'], $lang['Members_list']);
        }
        // El orden de aparicion
        if ($sort2) {
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
        $page_list = '';
        if ($allianz_raenge[$user['ally_rank_id']]['onlinestatus'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_can_watch_memberlist_status = true;
        } else {
            $user_can_watch_memberlist_status = false;
        }
        while ($u = $listuser->fetch_array()) {
            $UserPoints = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $u['id'] . "';", 'statpoints', true);
            $i++;
            if ($u["onlinetime"] + 60 * 10 >= time() && $user_can_watch_memberlist_status) {
                $u["onlinetime"] = "lime>{$lang['On']}<";
            } elseif ($u["onlinetime"] + 60 * 20 >= time() && $user_can_watch_memberlist_status) {
                $u["onlinetime"] = "yellow>{$lang['15_min']}<";
            } elseif ($user_can_watch_memberlist_status) {
                $u["onlinetime"] = "red>{$lang['Off']}<";
            } else {
                $u["onlinetime"] = "orange>-<";
            }
            // Nombre de rango
            if ($ally['ally_owner'] == $u['id']) {
                $u["ally_range"] = ($ally['ally_owner_range'] == '') ? "Leader" : $ally['ally_owner_range'];
            } elseif (isset($allianz_raenge[$u['ally_rank_id']]['name'])) {
                $u["ally_range"] = $allianz_raenge[$u['ally_rank_id']]['name'];
            } else {
                $u["ally_range"] = $lang['Novate'];
            }
            $u["dpath"] = $dpath;
            $u['points'] = "" . pretty_number($UserPoints['total_points']) . "";
            if ($u['ally_register_time'] > 0) {
                $u['ally_register_time'] = date("Y-m-d h:i:s", $u['ally_register_time']);
            } else {
                $u['ally_register_time'] = "-";
            }
            $this->tplObj->assign(array(
                'i' => $i,
                'username' => $u['username'],
                'id' => $u['id'],
                'dpath' => $dpath,
                'Write_a_message' => $lang['Write_a_message'],
                'ally_range' => $u['ally_range'],
                'points' => $u['points'],
                'galaxy' => $u['galaxy'],
                'system' => $u['system'],
                'planet' => $u['planet'],
                'ally_register_time' => $u['ally_register_time'],
                'onlinetime' => $u['onlinetime'],
            ));
            // Como es costumbre. un row template
            $page_list .= $this->tplObj->fetch('Alliance/alliance_memberslist_row.tpl');
        }
        // para cambiar el link de ordenar.
        if ($sort2 == 1) {
            $s = 2;
        } elseif ($sort2 == 2) {
            $s = 1;
        } else {
            $s = 1;
        }

        if ($i != $ally['ally_members']) {
            doquery("UPDATE {{table}} SET `ally_members`='{$i}' WHERE `id`='{$ally['id']}'", 'alliance');
        }

        $this->tplObj->assign(array(
            'title' => $lang['Members_list'],
            'Members_list' => $lang['Members_list'],
            'Ammount' => $lang['Ammount'],
            'i' => $i,
            'Number' => $lang['Number'],
            's' => $s,
            'Name' => $lang['Name'],
            'Position' => $lang['Position'],
            'Points' => $lang['Points'],
            'Coordinated' => $lang['Coordinated'],
            'Member_from' => $lang['Member_from'],
            'Online' => $lang['Online'],
            'list' => $page_list,
            'Return_to_overview' => $lang['Return_to_overview'],
        ));

        $this->render('Alliance/alliance_memberslist_table.tpl');
    }

    function admin() {

        $mode = HTTP::_GP('mode', '');
        $edit = HTTP::_GP('edit', '');

        if ($mode == 'admin' && $edit == 'rights') {
            $this->admin_rights();
        }

        if ($mode == 'admin' && $edit == 'ally') {
            $this->admin_ally();
        }

        if ($mode == 'admin' && $edit == 'give') {
            $this->admin_give();
        }

        if ($mode == 'admin' && $edit == 'members') {
            $this->admin_members();
        }

        if ($mode == 'admin' && $edit == 'requests') {
            $this->admin_requests();
        }

        if ($mode == 'admin' && $edit == 'name') {
            $this->admin_name();
        }

        if ($mode == 'admin' && $edit == 'tag') {
            $this->admin_tag();
        }

        if ($mode == 'admin' && $edit == 'exit') {
            $this->admin_exit();
        }
    }

    function admin_rights() {
        global $user, $lang, $dpath;
        $d = HTTP::_GP('d', '');
        if ((!is_numeric($d)) || (empty($d) && $d != 0)) {
            unset($d);
        }

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        $ally_ranks = unserialize($ally['ally_ranks']);
        // Administrar leyes
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['rechtehand'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_can_edit_rights = true;
        } else {
            $user_can_edit_rights = false;
        }
        if ($ally['ally_owner'] != $user['id'] && !$user_can_edit_rights) {
            message($lang['Denied_access'], $lang['Members_list']);
        } elseif (!empty($_POST['newrangname'])) {
            $name = Database::$dbHandle->real_escape_string(strip_tags($_POST['newrangname']));

            $allianz_raenge[] = array('name' => $name,
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
            $ranks = serialize($allianz_raenge);
            doquery("UPDATE {{table}} SET `ally_ranks`='" . $ranks . "' WHERE `id`=" . $ally['id'], "alliance");
            $goto = $_SERVER['PHP_SELF'] . "?" . $_SERVER['QUERY_STRING'];
            header("Location: " . $goto);
            exit();
        } elseif (@$_POST['id'] != '' && is_array($_POST['id'])) {
            $ally_ranks_new = array();
            foreach ($_POST['id'] as $id) {
                $name = $allianz_raenge[$id]['name'];
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
        if (count($ally_ranks) == 0 || $ally_ranks == '') { // si no hay rangos
            $list = "<th>{$lang['There_is_not_range']}</th>";
        } else {
            // Si hay rangos
            // cargamos la template de tabla
            $this->tplObj->assign('Range_name', $lang['Range_name']);
            $list = $this->tplObj->fetch('Alliance/alliance_admin_laws_head.tpl');
            // Creamos la lista de rangos
            $i = 0;
            foreach ($ally_ranks as $a => $b) {
                if ($ally['ally_owner'] == $user['id']) {
                    // $i++;u2r5
                    $this->tplObj->assign(array(
                        'id' => $a,
                        'delete' => "<a href=\"game.php?page=alliance&mode=admin&edit=rights&d={$a}\"><img src=\"{$dpath}pic/abort.gif\" alt=\"{$lang['Delete_range']}\" border=0></a>",
                        'r0' => $b['name'],
                        'a' => $a,
                        'r1' => "<input type=checkbox name=\"u{$a}r0\"" . (($b['delete'] == 1) ? ' checked="checked"' : '') . ">", //{$b[1]}
                        'r2' => "<input type=checkbox name=\"u{$a}r1\"" . (($b['kick'] == 1) ? ' checked="checked"' : '') . ">",
                        'r3' => "<input type=checkbox name=\"u{$a}r2\"" . (($b['bewerbungen'] == 1) ? ' checked="checked"' : '') . ">",
                        'r4' => "<input type=checkbox name=\"u{$a}r3\"" . (($b['memberlist'] == 1) ? ' checked="checked"' : '') . ">",
                        'r5' => "<input type=checkbox name=\"u{$a}r4\"" . (($b['bewerbungenbearbeiten'] == 1) ? ' checked="checked"' : '') . ">",
                        'r6' => "<input type=checkbox name=\"u{$a}r5\"" . (($b['administrieren'] == 1) ? ' checked="checked"' : '') . ">",
                        'r7' => "<input type=checkbox name=\"u{$a}r6\"" . (($b['onlinestatus'] == 1) ? ' checked="checked"' : '') . ">",
                        'r8' => "<input type=checkbox name=\"u{$a}r7\"" . (($b['mails'] == 1) ? ' checked="checked"' : '') . ">",
                        'r9' => "<input type=checkbox name=\"u{$a}r8\"" . (($b['rechtehand'] == 1) ? ' checked="checked"' : '') . ">",
                    ));
                    $list .= $this->tplObj->fetch('Alliance/alliance_admin_laws_row.tpl');
                } else {
                    $this->tplObj->assign(array(
                        'id' => $a,
                        'r0' => $b['name'],
                        'delete' => "<a href=\"game.php?page=alliance&mode=admin&edit=rights&d={$a}\"><img src=\"{$dpath}pic/abort.gif\" alt=\"{$lang['Delete_range']}\" border=0></a>",
                        'a' => $a,
                        'r1' => "<b>-</b>",
                        'r2' => "<input type=checkbox name=\"u{$a}r1\"" . (($b['kick'] == 1) ? ' checked="checked"' : '') . ">",
                        'r3' => "<input type=checkbox name=\"u{$a}r2\"" . (($b['bewerbungen'] == 1) ? ' checked="checked"' : '') . ">",
                        'r4' => "<input type=checkbox name=\"u{$a}r3\"" . (($b['memberlist'] == 1) ? ' checked="checked"' : '') . ">",
                        'r5' => "<input type=checkbox name=\"u{$a}r4\"" . (($b['bewerbungenbearbeiten'] == 1) ? ' checked="checked"' : '') . ">",
                        'r6' => "<input type=checkbox name=\"u{$a}r5\"" . (($b['administrieren'] == 1) ? ' checked="checked"' : '') . ">",
                        'r7' => "<input type=checkbox name=\"u{$a}r6\"" . (($b['onlinestatus'] == 1) ? ' checked="checked"' : '') . ">",
                        'r8' => "<input type=checkbox name=\"u{$a}r7\"" . (($b['mails'] == 1) ? ' checked="checked"' : '') . ">",
                        'r9' => "<input type=checkbox name=\"u{$a}r8\"" . (($b['rechtehand'] == 1) ? ' checked="checked"' : '') . ">",
                    ));
                    $list .= $this->tplObj->fetch('Alliance/alliance_admin_laws_row.tpl');
                }
            }
            if (count($ally_ranks) != 0) {
                $this->tplObj->assign('Save', $lang['Save']);
                $list .= $this->tplObj->fetch('Alliance/alliance_admin_laws_feet.tpl');
            }
        }
        $this->tplObj->assign(array(
            'title' => $lang['Law_settings'],
            'Configure_laws' => $lang['Configure_laws'],
            'list' => $list,
            'Range_make' => $lang['Range_make'],
            'Range_name' => $lang['Range_name'],
            'Make' => $lang['Make'],
            'Law_leyends' => $lang['Law_leyends'],
            'Alliance_dissolve' => $lang['Alliance_dissolve'],
            'Expel_users' => $lang['Expel_users'],
            'See_the_requests' => $lang['See_the_requests'],
            'See_the_list_members' => $lang['See_the_list_members'],
            'Check_the_requests' => $lang['Check_the_requests'],
            'Alliance_admin' => $lang['Alliance_admin'],
            'See_the_online_list_member' => $lang['See_the_online_list_member'],
            'Make_a_circular_message' => $lang['Make_a_circular_message'],
            'Left_hand_text' => $lang['Left_hand_text'],
            'Return_to_overview' => $lang['Return_to_overview'],
        ));

        $this->render('Alliance/alliance_admin_laws.tpl');
    }

    function admin_ally() {
        global $user, $lang, $dpath;
        $t = HTTP::_GP('t', '');

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        // Administrar la alianza *pendiente urgente*
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
        if (@$_POST['options']) {
            $ally['ally_owner_range'] = Database::$dbHandle->real_escape_string(htmlspecialchars(strip_tags($_POST['owner_range'])));
            $ally['ally_web'] = Database::$dbHandle->real_escape_string(htmlspecialchars(strip_tags($_POST['web'])));
            $ally['ally_image'] = Database::$dbHandle->real_escape_string(htmlspecialchars(strip_tags($_POST['image'])));
            $ally['ally_request_notallow'] = intval($_POST['request_notallow']);
            if ($ally['ally_request_notallow'] != 0 && $ally['ally_request_notallow'] != 1) {
                message("Aller � \"Candidature\" et sur une option dans le formulaire!", "Erreur");
                exit;
            }
            doquery("UPDATE {{table}} SET`ally_owner_range`='{$ally['ally_owner_range']}',`ally_image`='{$ally['ally_image']}',`ally_web`='{$ally['ally_web']}',`ally_request_notallow`='{$ally['ally_request_notallow']}'WHERE `id`='{$ally['id']}'", "alliance");
        } elseif (@$_POST['t']) {
            if ($t == 3) {
                $ally['ally_request'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['text']));
                doquery("UPDATE {{table}} SET `ally_request`='{$ally['ally_request']}'WHERE `id`='{$ally['id']}'", "alliance");
            } elseif ($t == 2) {
                $ally['ally_text'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['text']));
                doquery("UPDATE {{table}} SET `ally_text`='{$ally['ally_text']}'WHERE `id`='{$ally['id']}'", "alliance");
            } else {
                $ally['ally_description'] = Database::$dbHandle->real_escape_string(strip_tags(stripslashes($_POST['text'])));
                doquery("UPDATE {{table}} SET `ally_description`='" . $ally['ally_description'] . "'WHERE `id`='{$ally['id']}'", "alliance");
            }
        }
        /*
          Depende del $t, muestra el formulario para cada tipo de texto.
         */
        if ($t == 3) {
            $lang['request_type'] = $lang['Show_of_request_text'];
            $lang['text'] = $ally['ally_request'];
            $lang['Texts'] = "Request Text";
            $lang['Show_of_request_text'] = "Request Allianz Text";
        } elseif ($t == 2) {
            $lang['request_type'] = /* $lang[ */'Internal_text_of_alliance'/* ] */;
            $lang['text'] = $ally['ally_text'];
            $lang['Texts'] = "Interner Text";
            $lang['Show_of_request_text'] = "Internet Allianz Text";
        } else {
            $lang['request_type'] = /* $lang[ */'Public_text_of_alliance'/* ] */;
            $lang['text'] = $ally['ally_description'];
            $lang['Texts'] = "Public Text";
            $lang['Show_of_request_text'] = "Public Allianz Text";
        }

        $this->tplObj->assign(array(
            'title' => $lang['Alliance_admin'],
            'Alliance_admin' => $lang['Alliance_admin'],
            'Law_settings' => $lang['Law_settings'],
            'Members_administrate' => $lang['Members_administrate'],
            'Change_the_ally_tag' => $lang['Change_the_ally_tag'],
            'dpath' => $dpath,
            'Change_the_ally_name' => $lang['Change_the_ally_name'],
            't' => $t,
            'Texts' => $lang['Texts'],
            'External_text' => $lang['External_text'],
            'Internal_text' => $lang['Internal_text'],
            'Show_of_request_text' => $lang['Show_of_request_text'],
            'characters' => $lang['characters'],
            'text' => $lang['text'],
            'request_type' => $lang['request_type'],
            'Reset' => $lang['Reset'],
            'Save' => $lang['Save'],
            'Options' => $lang['Options'],
            'Main_Page' => $lang['Main_Page'],
            'ally_web' => $ally['ally_web'],
            'Alliance_logo' => $lang['Alliance_logo'],
            'ally_image' => $ally['ally_image'],
            'Requests' => $lang['Requests'],
            'ally_request_notallow_0' => (($ally['ally_request_notallow'] == 1) ? ' SELECTED' : ''),
            'No_allow_request' => $lang['No_allow_request'],
            'ally_request_notallow_1' => (($ally['ally_request_notallow'] == 0) ? ' SELECTED' : ''),
            'Allow_request' => $lang['Allow_request'],
            'Founder_name' => $lang['Founder_name'],
            'ally_owner_range' => $ally['ally_owner_range'],
            'Disolve_alliance' => "Dissoudre L'alliance",
            'Transfer_alliance' => "Abandonner / Transf&eacute;rer L'alliance",
        ));

        $this->render('Alliance/alliance_admin.tpl');
    }

    function admin_give() {
        global $user, $lang;

        if (@$_POST["id"]) {
            doquery("update {{table}} set `ally_owner`='" . $_POST["id"] . "' where `id`='" . $user['ally_id'] . "'", 'alliance');
        } else {
            $selection = doquery("SELECT * FROM {{table}} where ally_id='" . $user['ally_id'] . "'", 'users');
            $select = '';
            while($data=$selection->fetch_array()){
                $select.='<OPTION VALUE="' . $data['id'] . '">' . $data['username'];
            }

            $this->tplObj->assign(array(
                'title' => $lang['Alliance_admin'],
                'select' => $select,
            ));

            $this->render('Alliance/alliance_transfer.tpl');
        }
    }

    function admin_members() {
        global $user, $lang, $dpath;
        $sort1 = HTTP::_GP('sort1', '');
        $sort2 = intval(HTTP::_GP('sort2', ''));
        $kick = intval(HTTP::_GP('kick', ''));
        $id = intval(HTTP::_GP('id', ''));
        $rank = intval(HTTP::_GP('rank', ''));

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        $ally_ranks = unserialize($ally['ally_ranks']);
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['kick'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_can_kick = true;
        } else {
            $user_can_kick = false;
        }
        // Administrar a los miembros
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
                doquery("UPDATE {{table}} SET `ally_rank_id`='" . Database::$dbHandle->real_escape_string(strip_tags($_POST['newrang'])) . "' WHERE `id`='" . intval($id) . "'", 'users');
            }
        }
        // obtenemos las template row
        // El orden de aparicion
        if ($sort2) {
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

        while ($u = $listuser->fetch_array()) {
            $UserPoints = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $u['id'] . "';", 'statpoints', true);
            $i++;
            $u['i'] = $i;
            // Dias de inactivos
            $u['points'] = "" . pretty_number($UserPoints['total_points']) . "";
            $days = floor(round(time() - $u["onlinetime"]) / 3600 % 24);
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
            if ($ally['ally_owner'] == $u['id'] || $rank == $u['id']) {
                $u["functions"] = '';
            } elseif (@$ally_ranks[$user['ally_rank_id']][5] == 1 || $ally['ally_owner'] == $user['id']) {
                $f['Expel_user'] = @$lang['Expel_user'];
                $f['Set_range'] = @$lang['Set_range'];
                $f['You_are_sure_want_kick_to'] = @str_replace("%s", $u['username'], $lang['You_are_sure_want_kick_to']);
                $this->tplObj->assign(array(
                    'dpath' => $dpath,
                    'id' => $u['id'],
                ));
                $u["functions"] = $this->tplObj->fetch('Alliance/alliance_admin_members_function.tpl');
            } else {
                $u["functions"] = '';
            }
            // por el formulario...
            if ($rank != $u['id']) {
                $u['ally_range'] = $ally_range;
            } else {
                $u['ally_range'] = '';
            }
            $this->tplObj->assign(array(
                'i' => $i,
                'dpath' => $dpath,
                'id' => $u['id'],
                'username' => $u['username'],
                'Write_a_message' => $lang['Write_a_message'],
                'ally_range' => $u['ally_range'],
                'points' => $u['points'],
                'galaxy' => $u['galaxy'],
                'system' => $u['system'],
                'planet' => $u['planet'],
                'ally_register_time' => date("Y-m-d h:i:s", $u['ally_register_time']),
                'onlinetime' => str_replace("%s", $days, "%s d"),
                'functions' => $u['functions'],
            ));
            $page_list .= $this->tplObj->fetch('Alliance/alliance_admin_members_row.tpl');
            if ($rank == $u['id']) {
                $r['options'] = "<option value=\"0\">{$lang['Novate']}</option>";

                foreach ($ally_ranks as $a => $b) {
                    $r['options'] .= "<option value=\"" . ($a + 1) . "\"";
                    if ($u['ally_rank_id'] - 1 == $a) {
                        $r['options'] .= ' selected=selected';
                    }
                    $r['options'] .= ">{$b['name']}</option>";
                }
                $r['Save'] = $lang['Save'];
                $this->tplObj->assign(array(
                    'i' => $i,
                    'dpath' => $dpath,
                    'id' => $u['id'],
                    'Rank_for' => str_replace("%s", $u['username'], @$lang['Rank_for']),
                    'options' => $r['options'],
                    'Save' => $lang['Save'],
                ));
                $page_list .= $this->tplObj->fetch('Alliance/alliance_admin_members_row_edit.tpl');
            }
        }
        // para cambiar el link de ordenar.
        if ($sort2 == 1) {
            $s = 2;
        } elseif ($sort2 == 2) {
            $s = 1;
        } else {
            $s = 1;
        }

        if ($i != $ally['ally_members']) {
            doquery("UPDATE {{table}} SET `ally_members`='{$i}' WHERE `id`='{$ally['id']}'", 'alliance');
        }
        $this->tplObj->assign(array(
            'title' => $lang['Members_administrate'],
            'Members_list' => $lang['Members_list'],
            'Ammount' => $lang['Ammount'],
            'memberzahl' => $listuser->num_rows,
            'Number' => $lang['Number'],
            's' => $s,
            'Name' => $lang['Name'],
            'Position' => $lang['Position'],
            'Points' => $lang['Points'],
            'Coordinated' => $lang['Coordinated'],
            'Member_from' => $lang['Member_from'],
            'memberslist' => $page_list,
            'Return_to_overview' => $lang['Return_to_overview'],
        ));

        $this->render('Alliance/alliance_admin_members_table.tpl');
        // a=9 es para cambiar la etiqueta de la etiqueta.
        // a=10 es para cambiarle el nombre de la alianza
    }

    function admin_requests() {
        global $user, $lang;
        $show = intval(HTTP::_GP('show', ''));

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['bewerbungenbearbeiten'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_bewerbungen_bearbeiten = true;
        } else {
            $user_bewerbungen_bearbeiten = false;
        }
        // Administrar solicitudes
        if ($ally['ally_owner'] != $user['id'] && !$user_bewerbungen_bearbeiten) {
            message($lang['Denied_access'], $lang['Check_the_requests']);
        }

        if (@$_POST['action'] == "Accepter") {
            $_POST['text'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['text']));

            $u = doquery("SELECT * FROM {{table}} WHERE id=$show", 'users', true);
            // agrega los puntos al unirse el user a la alianza
            doquery("UPDATE {{table}} SET
			ally_members=ally_members+1
			WHERE id='{$ally['id']}'", 'alliance');
            doquery("UPDATE {{table}} SET
			ally_name='{$ally['ally_name']}',
			ally_request_text='',
			ally_request='0',
			ally_id='{$ally['id']}',
			new_message=new_message+1,
			mnl_alliance=mnl_alliance+1
			WHERE id='{$show}'", 'users');
            // Se envia un mensaje avizando...
            doquery("INSERT INTO {{table}} SET
			`message_owner`='{$show}',
			`message_sender`='{$user['id']}' ,
			`message_time`='" . time() . "',
			`message_type`='2',
			`message_from`='{$ally['ally_tag']}',
			`message_subject`='[" . $ally['ally_name'] . "] vous a acceptee!',
			`message_text`='Hi!<br>L\'Alliance <b>" . $ally['ally_name'] . "</b> a acceptee votre candidature!<br>Charte:<br>" . $_POST['text'] . "'", "messages");
            header('Location:game.php?page=alliance&mode=admin&edit=requests');
            die();
        } elseif (@$_POST['action'] == "Refuser" && $_POST['action'] != '') {
            $_POST['text'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['text']));
            doquery("UPDATE {{table}} SET ally_request_text='',ally_request='0',ally_id='0',new_message=new_message+1, mnl_alliance=mnl_alliance+1 WHERE id='{$show}'", 'users');
            // Se envia un mensaje avizando...
            doquery("INSERT INTO {{table}} SET
			`message_owner`='{$show}',
			`message_sender`='{$user['id']}' ,
			`message_time`='" . time() . "',
			`message_type`='2',
			`message_from`='{$ally['ally_tag']}',
			`message_subject`='[" . $ally['ally_name'] . "] vous as refuse!',
			`message_text`='Hi!<br>L\'Alliance <b>" . $ally['ally_name'] . "</b> a refusee votre candidature!<br>Begr&uuml;ndung/Text:<br>" . $_POST['text'] . "'", "messages");
            header('Location:game.php?page=alliance&mode=admin&edit=requests');
            die();
        }
        $i = 0;
        $parse = $lang;
        $query = doquery("SELECT id,username,ally_request_text,ally_register_time FROM {{table}} WHERE ally_request='{$ally['id']}'", 'users');
        while ($r = $query->fetch_array()) {
            // recolectamos los datos del que se eligio.
            if (isset($show) && $r['id'] == $show) {
                $s['username'] = $r['username'];
                $s['ally_request_text'] = nl2br($r['ally_request_text']);
                $s['id'] = $r['id'];
            }
            $this->tplObj->assign(array(
                'id' => $r['id'],
                'username' => $r['username'],
                // la fecha de cuando se envio la solicitud
                'time' => date("Y-m-d h:i:s", $r['ally_register_time']),
            ));

            $parse['list'] = $this->tplObj->fetch('Alliance/alliance_admin_request_row.tpl');
            $i++;
        }
        if (@$parse['list'] == '') {
            $parse['list'] = '<tr><th colspan=2>Il ne reste plus aucune candidature</th></tr>';
        }
        // Con $show
        if (isset($show) && $show != 0 && $parse['list'] != '') {
            // Los datos de la solicitud
            $s['Request_from'] = str_replace('%s', $s['username'], /* $lang[ */ 'Request_from'/* ] */);
            // el formulario
            $this->tplObj->assign(array(
                'id' => $s['id'],
                'username' => $s['username'],
                'time' => date("Y-m-d h:i:s", $s['ally_register_time']),
            ));
            $parse['request'] = $this->tplObj->fetch('Alliance/alliance_admin_request_row.tpl');
        } else {
            $parse['request'] = '';
        }

        $this->tplObj->assign(array(
            'title' => $lang['Check_the_requests'],
            'Apply_ally_overview' => $lang['Apply_ally_overview'],
            'ally_tag' => $ally['ally_tag'],
            'request' => $parse['request'],
            'There_is_hanging_request' => str_replace('%n', $i, /* $lang[ */ 'There_is_hanging_request'/* ] */),
            'Candidate' => $lang['Candidate'],
            'Date_of_the_request' => $lang['Date_of_the_request'],
            'list' => $parse['list'],
            'Back' => $lang['Back'],
        ));

        $this->render('Alliance/alliance_admin_request_table.tpl');
    }

    function admin_name() {
        global $user, $lang;

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        // Changer le nom de l'alliance
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['administrieren'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_admin = true;
        } else {
            $user_admin = false;
        }
        // comprobamos el permiso
        if ($ally['ally_owner'] != $user['id'] && !$user_admin) {
            message($lang['Denied_access'], $lang['Members_list']);
        }

        if (@$_POST['newname']) {
            // Y a le nouveau Nom
            $ally['ally_name'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['newname']));
			doquery("UPDATE {{table}} SET `ally_name` = '" . $ally['ally_name'] . "' WHERE `id` = '" . $user['ally_id'] . "';", 'alliance');
            doquery("UPDATE {{table}} SET `ally_name` = '" . $ally['ally_name'] . "' WHERE `ally_id` = '" . $ally['id'] . "';", 'users');
        }
        $this->tplObj->assign(array(
            'title' => $lang['Alliance_admin'],
            'question' => str_replace('%s', $ally['ally_name'], $lang['How_you_will_call_the_alliance_in_the_future']),
            'New_name' => $lang['New_name'],
            'name' => 'newname',
            'Change' => $lang['Change'],
            'Return_to_overview' => $lang['Return_to_overview'],
        ));

        $this->render('Alliance/alliance_admin_rename.tpl');
    }

    function admin_tag() {
        global $user, $lang;

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        // Changer le TAG l'alliance
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['administrieren'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_admin = true;
        } else {
            $user_admin = false;
        }

        // Bon si on verifiait les autorisation ?
        if ($ally['ally_owner'] != $user['id'] && !$user_admin) {
            message($lang['Denied_access'], $lang['Members_list']);
        }

        if (filter_input(INPUT_POST, 'newtag')) {
            // Y a le nouveau TAG
            $ally['ally_tag'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['newtag']));
            doquery("UPDATE {{table}} SET `ally_tag` = '" . $ally['ally_tag'] . "' WHERE `id` = '" . $user['ally_id'] . "';", 'alliance');
        }
        $this->tplObj->assign(array(
            'title' => $lang['Alliance_admin'],
            'question' => str_replace('%s', $ally['ally_tag'], $lang['How_you_will_call_the_alliance_in_the_future']),
            'New_name' => $lang['New_name'],
            'name' => 'newtag',
            'Change' => $lang['Change'],
            'Return_to_overview' => $lang['Return_to_overview'],
        ));

        $this->render('Alliance/alliance_admin_rename.tpl');
    }

    function admin_exit() {
        global $user, $lang;

        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['delete'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_can_exit_alliance = true;
        } else {
            $user_can_exit_alliance = false;
        }
        // disolver una alianza
        // obtenemos el array de los rangos
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
    }

    function circular() {
        global $user, $lang;
        $sendmail = intval(HTTP::_GP('sendmail', ''));

        // Correo circular
        /*
          Mandar un correo circular.
          creo que aqui tendria que ver yo como crear el sistema de mensajes...
         */
        // un loop para mostrar losrangos
        $ally = doquery("SELECT * FROM {{table}} WHERE id='{$user['ally_id']}'", "alliance", true);
        $allianz_raenge = unserialize($ally['ally_ranks']);
        if ($allianz_raenge[$user['ally_rank_id']]['mails'] == 1 || $ally['ally_owner'] == $user['id']) {
            $user_can_send_mails = true;
        } else {
            $user_can_send_mails = false;
        }
        // comprobamos el permiso
        if ($ally['ally_owner'] != $user['id'] && !$user_can_send_mails) {
            message($lang['Denied_access'], $lang['Send_circular_mail']);
        }

        if ($sendmail == 1) {
            $_POST['r'] = intval($_POST['r']);
            $_POST['text'] = Database::$dbHandle->real_escape_string(strip_tags($_POST['text']));

            if ($_POST['r'] == 0) {
                $sq = doquery("SELECT id,username FROM {{table}} WHERE ally_id='{$user['ally_id']}'", "users");
            } else {
                $sq = doquery("SELECT id,username FROM {{table}} WHERE ally_id='{$user['ally_id']}' AND ally_rank_id='{$_POST['r']}'", "users");
            }
            // looooooop
            $list = '';
            while ($u = $sq->fetch_array()) {
                doquery("INSERT INTO {{table}} SET
				`message_owner`='{$u['id']}',
				`message_sender`='{$user['id']}' ,
				`message_time`='" . time() . "',
				`message_type`='2',
				`message_from`='{$ally['ally_tag']}',
				`message_subject`='{$user['username']}',
				`message_text`='{$_POST['text']}'
				", "messages");
                $list .= "<br>{$u['username']} ";
            }
            // doquery("SELECT id,username FROM {{table}} WHERE ally_id='{$user['ally_id']}' ORDER BY `id`","users");
            doquery("UPDATE {{table}} SET `new_message`=new_message+1 WHERE ally_id='{$user['ally_id']}' AND ally_rank_id='{$_POST['r']}'", "users");
            doquery("UPDATE {{table}} SET `mnl_alliance`=mnl_alliance+1 WHERE ally_id='{$user['ally_id']}' AND ally_rank_id='{$_POST['r']}'", "users");
            /*
              Aca un mensajito diciendo que a quien se mando.
             */
            $this->MessageForm($lang['Circular_sended'], "Les membres suivants ont re�u un message:" . $list, "game.php?page=alliance", $lang['Ok'], true);
            //    Game::display($page, $lang['Send_circular_mail']);
        }

        $lang['r_list'] = "<option value=\"0\">{$lang['All_players']}</option>";
        if ($allianz_raenge) {
            foreach ($allianz_raenge as $id => $array) {
                $lang['r_list'] .= "<option value=\"" . ($id + 1) . "\">" . $array['name'] . "</option>";
            }
        }

        $this->tplObj->assign(array(
            'title' => $lang['Send_circular_mail'],
            'Send_circular_mail' => $lang['Send_circular_mail'],
            'Destiny' => $lang['Destiny'],
            'r_list' => $lang['r_list'],
            'Text_mail' => $lang['Text_mail'],
            'characters' => $lang['characters'],
            'Back' => $lang['Back'],
            'Clear' => $lang['Clear'],
            'Send' => $lang['Send'],
        ));

        $this->render('Alliance/alliance_circular.tpl');
    }

    function MessageForm($Title, $Message, $Goto = '', $Button = ' ok ', $TwoLines = false) {
        global $lang;
        
        $this->tplObj->assign(array(
            'title' => $lang['Send_circular_mail'],
            'Title' => $Title,
            'Message1' => $Message,
            'Goto' => $Goto,
            'Button' => $Button,
            'TwoLines' => $TwoLines,
        ));

        $this->render('Alliance/alliance_messageform.tpl');
    }

}
