<?php

/**
 * This file is part of XNova:Legacies
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt
 * @see http://www.xnova-ng.org/
 *
 * Copyright (c) 2009-Present, XNova Support Team <http://www.xnova-ng.org>
 * All rights reserved.
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
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *                                --> NOTICE <--
 *  This file is part of the core development branch, changing its contents will
 * make you unable to use the automatic updates manager. Please refer to the
 * documentation for further information about customizing XNova.
 *
 */
define('INSIDE', true);
define('INSTALL', false);
require_once dirname(__FILE__) . '/common.php';

includeLang('options');

$lang['PHP_SELF'] = 'options.' . PHPEXT;

$dpath = (!$user["dpath"]) ? DEFAULT_SKINPATH : $user["dpath"];
$mode = $get['mode'];

if ($post && $mode == "exit") { // Array ( [db_character]
    if (isset($post["exit_modus"]) && $post["exit_modus"] == 'on' and $user['urlaubs_until'] <= time()) {
        $urlaubs_modus = "0";
        doquery("UPDATE {{table}} SET
             `urlaubs_modus` = '0',
             `urlaubs_until` = '0'
             WHERE `id` = '" . $user['id'] . "' LIMIT 1", "users");

//Remise des mines au retour du mod vacance

        $query = doquery("SELECT * FROM {{table}} WHERE id_owner = '{$user['id']}'", 'planets');
        while ($id = mysql_fetch_array($query)) {
            doquery("UPDATE {{table}} SET
                   energy_used = '10',
                   energy_max = '10',
                   metal_mine_porcent = '10',
                   crystal_mine_porcent = '10',
                   deuterium_sintetizer_porcent = '10',
                   solar_plant_porcent = '10',
                   fusion_plant_porcent = '10',
                   solar_satelit_porcent = '10'
                 WHERE id = '{$id['id']}' AND `planet_type` = 1 ", 'planets');
        }

        $dpath = (!$user["dpath"]) ? DEFAULT_SKINPATH : $user["dpath"];
        message($lang['succeful_save'], $lang['Options'], "options.php", 1);
    } else {
        $urlaubs_modus = "1";
        $dpath = (!$user["dpath"]) ? DEFAULT_SKINPATH : $user["dpath"];
        message($lang['You_cant_exit_vmode'], $lan['Error'], "options.php", 1);
    }
}
if ($post && $mode == "change") { // Array ( [db_character]
    $iduser = $user["id"];
    $avatar = $post["avatar"];

    if ($post["dpath"] != "")
        $dpath = $post["dpath"];
    else
        $dpath = (!$user["dpath"]) ? DEFAULT_SKINPATH : $user["dpath"];

    // Gestion des options speciales pour les admins
    if ($user['authlevel'] != LEVEL_PLAYER) {
        if ($post['adm_pl_prot'] == 'on') {
            doquery("UPDATE {{table}} SET `id_level` = '" . $user['authlevel'] . "' WHERE `id_owner` = '" . $user['id'] . "';", 'planets');
        } else {
            doquery("UPDATE {{table}} SET `id_level` = '0' WHERE `id_owner` = '" . $user['id'] . "';", 'planets');
        }
    }

    // Mostrar skin
    if (isset($post["design"]) && $post["design"] == 'on') {
        $design = "1";
    } else {
        $design = "0";
    }
    // Desactivar comprobaci? de IP
    if (isset($post["noipcheck"]) && $post["noipcheck"] == 'on') {
        $noipcheck = "1";
    } else {
        $noipcheck = "0";
    }
    // Nombre de usuario
    if (isset($post["db_character"]) && $post["db_character"] != '') {
        $username = CheckInputStrings($post['db_character']);
    } else {
        $username = $user['username'];
    }
    // Adresse e-Mail
    if (isset($post["db_email"]) && $post["db_email"] != '') {
        $db_email = CheckInputStrings($post['db_email']);
    } else {
        $db_email = $user['email'];
    }
    // Cantidad de sondas de espionaje
    if (isset($post["spio_anz"]) && is_numeric($post["spio_anz"])) {
        $spio_anz = $post["spio_anz"];
    } else {
        $spio_anz = "1";
    }
    // Mostrar tooltip durante
    if (isset($post["settings_tooltiptime"]) && is_numeric($post["settings_tooltiptime"])) {
        $settings_tooltiptime = $post["settings_tooltiptime"];
    } else {
        $settings_tooltiptime = "1";
    }
    // Maximo mensajes de flotas
    if (isset($post["settings_fleetactions"]) && is_numeric($post["settings_fleetactions"])) {
        $settings_fleetactions = $post["settings_fleetactions"];
    } else {
        $settings_fleetactions = "1";
    } //
    // Mostrar logos de los aliados
    if (isset($post["settings_allylogo"]) && $post["settings_allylogo"] == 'on') {
        $settings_allylogo = "1";
    } else {
        $settings_allylogo = "0";
    }
    // Espionaje
    if (isset($post["settings_esp"]) && $post["settings_esp"] == 'on') {
        $settings_esp = "1";
    } else {
        $settings_esp = "0";
    }
    // Escribir mensaje
    if (isset($post["settings_wri"]) && $post["settings_wri"] == 'on') {
        $settings_wri = "1";
    } else {
        $settings_wri = "0";
    }
    // A?dir a lista de amigos
    if (isset($post["settings_bud"]) && $post["settings_bud"] == 'on') {
        $settings_bud = "1";
    } else {
        $settings_bud = "0";
    }
    // Ataque con misiles
    if (isset($post["settings_mis"]) && $post["settings_mis"] == 'on') {
        $settings_mis = "1";
    } else {
        $settings_mis = "0";
    }
    // Ver reporte
    if (isset($post["settings_rep"]) && $post["settings_rep"] == 'on') {
        $settings_rep = "1";
    } else {
        $settings_rep = "0";
    }
    // Modo vacaciones
    if (isset($post["urlaubs_modus"]) && $post["urlaubs_modus"] == 'on') {
        //Selectionne si le joueur a des flottes en vol
        $fleet = doquery("SELECT COUNT(fleet_owner) AS `actcnt` FROM {{table}} WHERE `fleet_owner` = '" . $user['id'] . "';", 'fleets', true);
        //Selectionne si le joueur a des batiments en construction
        $build = doquery("SELECT COUNT(id_owner) AS `building` FROM {{table}} WHERE `id_owner` = '" . $user['id'] . "' and `b_building`!=0;", 'planets', true);
        //Selectionne si le joueur a des techno en cours
        $tech = doquery("SELECT COUNT(id) AS `tech` FROM {{table}} WHERE `id` = '" . $user['id'] . "' and `b_tech_planet`!=0;", 'users', true);
        //Selectionne si le joueur est en train de se faire attaquer
        $attack = doquery("SELECT COUNT(fleet_taget_owner) AS `attack` FROM {{table}} WHERE `fleet_taget_owner` = '" . $user['id'] . "';", 'fleets', true);
        if ($fleet['actcnt'] == '0' && $build['building'] == '0' && $tech['tech'] == '0' && $attack['attack'] == '0') {
            $urlaubs_modus = "1";
            $time = time() + 172800;
            doquery("UPDATE {{table}} SET
             `urlaubs_modus` = '$urlaubs_modus',
             `urlaubs_until` = '$time'
             WHERE `id` = '$iduser' LIMIT 1", "users");
        } else {
            message('Verifiez vos flottes, technologies et batiments', '<center><font color=\"red\">Vous avez des actions en cours</font></center>');
        }

        $query = doquery("SELECT * FROM {{table}} WHERE id_owner = '{$user['id']}'", 'planets');
        while ($id = mysql_fetch_array($query)) {
            doquery("UPDATE {{table}} SET
                   metal_perhour = '" . $game_config['metal_basic_income'] . "',
                   crystal_perhour = '" . $game_config['metal_basic_income'] . "',
                   deuterium_perhour = '" . $game_config['metal_basic_income'] . "',
                   energy_used = '0',
                   energy_max = '0',
                   metal_mine_porcent = '0',
                   crystal_mine_porcent = '0',
                   deuterium_sintetizer_porcent = '0',
                   solar_plant_porcent = '0',
                   fusion_plant_porcent = '0',
                   solar_satelit_porcent = '0'
                 WHERE id = '{$id['id']}' AND `planet_type` = 1 ", 'planets');
        }
    } else {
        $urlaubs_modus = "0";
    }

    // Borrar cuenta
    if (isset($post["db_deaktjava"]) && $post["db_deaktjava"] == 'on') {
        $db_deaktjava = "1";
    } else {
        $db_deaktjava = "0";
    }
    $SetSort = $post['settings_sort'];
    $SetOrder = $post['settings_order'];

    doquery("UPDATE {{table}} SET
       `email` = '$db_email',
       `avatar` = '$avatar',
       `dpath` = '$dpath',
       `design` = '$design',
       `noipcheck` = '$noipcheck',
       `planet_sort` = '$SetSort',
       `planet_sort_order` = '$SetOrder',
       `spio_anz` = '$spio_anz',
       `settings_tooltiptime` = '$settings_tooltiptime',
       `settings_fleetactions` = '$settings_fleetactions',
       `settings_allylogo` = '$settings_allylogo',
       `settings_esp` = '$settings_esp',
       `settings_wri` = '$settings_wri',
       `settings_bud` = '$settings_bud',
       `settings_mis` = '$settings_mis',
       `settings_rep` = '$settings_rep',
       `urlaubs_modus` = '$urlaubs_modus',
       `db_deaktjava` = '$db_deaktjava',
       `kolorminus` = '$kolorminus',
       `kolorplus` = '$kolorplus',
       `kolorpoziom` = '$kolorpoziom'
       WHERE `id` = '$iduser' LIMIT 1", "users");

    if (isset($post["db_password"]) && md5($post["db_password"]) == $user["password"]) {
        if (!empty($post['newpass1']) && !empty($post['newpass2']) && $post["newpass1"] == $post["newpass2"]) {
            $newpass = md5($post["newpass1"]);
            doquery("UPDATE {{table}} SET `password` = '{$newpass}' WHERE `id` = '{$user['id']}' LIMIT 1", "users");
            setcookie(COOKIE_NAME, "", time() - 100000, "/", "", 0); //le da el expire
            message($lang['succeful_changepass'], $lang['changue_pass'], "login.php", 1);
        }
    }
    if ($user['username'] != $post["db_character"]) {
        $query = doquery("SELECT id FROM {{table}} WHERE username='{$post["db_character"]}'", 'users', true);
        if (!$query) {
            doquery("UPDATE {{table}} SET username='{$username}' WHERE id='{$user['id']}' LIMIT 1", "users");
            setcookie(COOKIE_NAME, "", time() - 100000, "/", "", 0); //le da el expire
            message($lang['succeful_changename'], $lang['changue_name'], "login.php", 1);
        }
    }
    message($lang['succeful_save'], $lang['Options'], "options.php", 1);
} else {
    $parse = $lang;

    $parse['dpath'] = $dpath;
    $parse['opt_lst_skin_data'] = "<option value =\"skins/xnova/\">skins/xnova/</option>";
    $parse['opt_lst_ord_data'] = "<option value =\"0\"" . (($user['planet_sort'] == 0) ? " selected" : "") . ">" . $lang['opt_lst_ord0'] . "</option>";
    $parse['opt_lst_ord_data'] .= "<option value =\"1\"" . (($user['planet_sort'] == 1) ? " selected" : "") . ">" . $lang['opt_lst_ord1'] . "</option>";
    $parse['opt_lst_ord_data'] .= "<option value =\"2\"" . (($user['planet_sort'] == 2) ? " selected" : "") . ">" . $lang['opt_lst_ord2'] . "</option>";

    $parse['opt_lst_cla_data'] = "<option value =\"0\"" . (($user['planet_sort_order'] == 0) ? " selected" : "") . ">" . $lang['opt_lst_cla0'] . "</option>";
    $parse['opt_lst_cla_data'] .= "<option value =\"1\"" . (($user['planet_sort_order'] == 1) ? " selected" : "") . ">" . $lang['opt_lst_cla1'] . "</option>";

    if ($user['authlevel'] != LEVEL_PLAYER) {
        $FrameTPL = gettemplate('options_admadd');
        $IsProtOn = doquery("SELECT `id_level` FROM {{table}} WHERE `id_owner` = '" . $user['id'] . "' LIMIT 1;", 'planets', true);
        $bloc['opt_adm_title'] = $lang['opt_adm_title'];
        $bloc['opt_adm_planet_prot'] = $lang['opt_adm_planet_prot'];
        $bloc['adm_pl_prot_data'] = ($IsProtOn['id_level'] > 0) ? " checked='checked'/" : '';
        $parse['opt_adm_frame'] = parsetemplate($FrameTPL, $bloc);
    }

    $parse['opt_usern_data'] = $user['username'];
    $parse['opt_mail1_data'] = $user['email'];
    $parse['opt_mail2_data'] = $user['email_2'];
    $parse['opt_dpath_data'] = $user['dpath'];
    $parse['opt_avata_data'] = $user['avatar'];
    $parse['opt_probe_data'] = $user['spio_anz'];
    $parse['opt_toolt_data'] = $user['settings_tooltiptime'];
    $parse['opt_fleet_data'] = $user['settings_fleetactions'];
    $parse['opt_sskin_data'] = ($user['design'] == 1) ? " checked='checked'" : '';
    $parse['opt_noipc_data'] = ($user['noipcheck'] == 1) ? " checked='checked'" : '';
    $parse['opt_allyl_data'] = ($user['settings_allylogo'] == 1) ? " checked='checked'/" : '';
    $parse['opt_delac_data'] = ($user['db_deaktjava'] == 1) ? " checked='checked'/" : '';
    $parse['opt_modev_data'] = ($user['urlaubs_modus'] == 1) ? " checked='checked'/" : '';
    $parse['opt_modev_exit'] = ($user['urlaubs_modus'] == 0) ? " checked='1'/" : '';
    $parse['Vaccation_mode'] = $lang['Vaccation_mode'];
    $parse['vacation_until'] = date("d.m.Y G:i:s", $user['urlaubs_until']);
    $parse['user_settings_rep'] = ($user['settings_rep'] == 1) ? " checked='checked'/" : '';
    $parse['user_settings_esp'] = ($user['settings_esp'] == 1) ? " checked='checked'/" : '';
    $parse['user_settings_wri'] = ($user['settings_wri'] == 1) ? " checked='checked'/" : '';
    $parse['user_settings_mis'] = ($user['settings_mis'] == 1) ? " checked='checked'/" : '';
    $parse['user_settings_bud'] = ($user['settings_bud'] == 1) ? " checked='checked'/" : '';
    $parse['kolorminus'] = $user['kolorminus'];
    $parse['kolorplus'] = $user['kolorplus'];
    $parse['kolorpoziom'] = $user['kolorpoziom'];

    if ($user['urlaubs_modus']) {

        display(parsetemplate(gettemplate('options_body_vmode'), $parse), 'Options', false);
    } else {
        display(parsetemplate(gettemplate('options_body'), $parse), 'Options', false);
    }
    die();
}
