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
 * @ShowFleetshortcutPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 16:07:07
 */

/**
 * Description of ShowFleetshortcutPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowFleetshortcutPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'fleetshortcut';
    }

    function show() {
        global $user;

        /*
          Este script es original xD
          La funcion de este script es administrar una variable del $user
          Permite agregar y quitar arrays...
         */
        //Lets start!
        if (isset($_GET['action'])) {
            if ($_POST) {
                //Pegamos el texto :P
                if ($_POST["n"] == "") {
                    $_POST["n"] = "Unbenannt";
                }

                $r = strip_tags($_POST['n']) . "," . intval($_POST['g']) . "," . intval($_POST['s']) . "," . intval($_POST['p']) . "," . intval($_POST['t']) . "\r\n";
                $user['fleet_shortcut'] .= $r;
                doquery("UPDATE {{table}} SET fleet_shortcut='{$user['fleet_shortcut']}' WHERE id={$user['id']}", "users");
                message("Le raccourcis a &eacute;t&eacute; enregistr&eacute; !", "Enregistrment", "game.php?page=fleetshortcut");
            }
        }
        $this->tplObj->assign(array(
            'title' => "Shortcutmanager",
            'user' => $user,
            'mode' => @$_GET['action'],
            'a' => @$_GET['a'],
            '_POST' => $_POST,
            'g' => @$_POST['galaxy'],
            's' => @$_POST['system'],
            'p' => @$_POST['planet'],
            't' => @$_POST['planet_type'],
            'c' => @$c,
        ));
        $this->render('fleetshortcut_body.tpl');
    }

}
