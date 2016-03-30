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
 * @ShowFleetShortcutPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  2/mai/2015 13:37:31
 */

/**
 * Description of ShowFleetShortcutPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowFleetShortcutPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'fleetshortcut';
    }

    function show() {
        global $user;

        $a = filter_input(INPUT_GET, 'a');
        /*
          Este script es original xD
          La funcion de este script es administrar una variable del $user
          Permite agregar y quitar arrays...
         */
        //Lets start!
        if (isset($a)) {
            if (filter_input_array(INPUT_POST)) {
                //Armamos el array...
                $scarray = explode("\r\n", $user['fleet_shortcut']);
                if (filter_input(INPUT_POST, 'delete')) {
                    unset($scarray[$a]);
                    $user['fleet_shortcut'] = implode("\r\n", $scarray);
                    doquery("UPDATE {{table}} SET fleet_shortcut='{$user['fleet_shortcut']}' WHERE id={$user['id']}", "users");
                    message("Shortcut wurde gel&ouml;scht", "Gel&ouml;scht", header("Refresh: 3;url=game.php?page=fleetshortcut"));
                } else {
                    $r = explode(",", $scarray[$a]);
                    $r[0] = strip_tags(filter_input(INPUT_POST, 'n'));
                    $r[1] = intval(filter_input(INPUT_POST, 'g'));
                    $r[2] = intval(filter_input(INPUT_POST, 's'));
                    $r[3] = intval(filter_input(INPUT_POST, 'p'));
                    $r[4] = intval(filter_input(INPUT_POST, 't'));
                    $scarray[$a] = implode(",", $r);
                    $user['fleet_shortcut'] = implode("\r\n", $scarray);
                    doquery("UPDATE {{table}} SET fleet_shortcut='{$user['fleet_shortcut']}' WHERE id={$user['id']}", "users");
                    message("Le raccourcis a &eacute;t&eacute; enregistr&eacute; !", "Enregistrer", header("Refresh: 3;url=game.php?page=fleetshortcut"));
                }
            }
            if ($user['fleet_shortcut']) {
                $scarray = explode("\r\n", $user['fleet_shortcut']);
            } else {
                message("Le raccourcis a &eacute;t&eacute; enregistr&eacute; !", "Enregistrer", header("Refresh: 3;url=game.php?page=fleetshortcut"));
            }
            $this->tplObj->assign(array(
                'title' => 'Shortcutmanager',
                'fsc_edit' => 'Editer',
                'fsc_planet' => 'Plan&egrave;te',
                'fsc_debris' => 'D&eacute;bris',
                'fsc_moon' => 'Lune',
                'fsc_reset' => 'Reset',
                'fsc_save' => 'Enregistrer',
                'fsc_remove' => 'Supprimer',
                'fsc_return' => 'Retour',
                'user' => $user,
                'c' => explode(',', $scarray[$a]),
                'scarray' => explode("\r\n", $user['fleet_shortcut']),
            ));

            $this->render('Fleet/fleetshortcut_edit.tpl');
        } else {
            if ($user['fleet_shortcut']) {
                /*
                  Dentro de fleet_shortcut, se pueden almacenar las diferentes direcciones
                  de acceso directo, el formato es el siguiente.
                  Nombre, Galaxia,Sistema,Planeta,Tipo
                 */
                $scarray = explode("\r\n", $user['fleet_shortcut']);
                $i = $e = 0;
                foreach ($scarray as $a => $b) {
                    if ($b != "") {
                        if ($i == 1) {
                            $i = 0;
                        } else {
                            $i = 1;
                        }
                    }
                }
            }
            $this->tplObj->assign(array(
                'title' => 'Shortcutmanager',
                'fsc_shortcut' => 'Raccourcis',
                'fsc_add' => 'Ajout',
                'fsc_s_debris' => '(E)',
                'fsc_s_moon' => '(L)',
                'fsc_no_shortcuts' => 'Pas de Raccourcis',
                'fsc_return' => 'Retour',
                'user' => $user,
                'scarray' => explode("\r\n", $user['fleet_shortcut']),
            ));

            $this->render('Fleet/fleetshortcut.tpl');
        }
    }

    function add() {
        global $user, $lang;

        $n = filter_input(INPUT_POST, 'n');
        if (filter_input_array(INPUT_POST)) {
            //Pegamos el texto :P
            if ($n == "") {
                $n = $lang['fsc_anonymous'];
            }
            $r = strip_tags(filter_input(INPUT_POST, 'n')) . "," . intval(filter_input(INPUT_POST, 'g')) . "," . intval(filter_input(INPUT_POST, 's')) . "," . intval(filter_input(INPUT_POST, 'p')) . "," . intval(filter_input(INPUT_POST, 't')) . "\r\n";
            $user['fleet_shortcut'] .= $r;
            doquery("UPDATE {{table}} SET fleet_shortcut='{$user['fleet_shortcut']}' WHERE id={$user['id']}", "users");
            message("Le raccourcis a &eacute;t&eacute; enregistr&eacute; !", "Enregistrment", header("Refresh: 3;url=game.php?page=fleetshortcut"));
        }
        $this->tplObj->assign(array(
            'title' => 'Shortcutmanager',
            'fsc_title_add' => 'Nom [Galaxie/Syst&egrave;me solaire/Plan&egrave;te]',
            'fsc_name' => 'Name',
            'fsc_galaxy' => 'Galaxie',
            'fsc_solar_s' => 'Sonnensystem',
            'fsc_planet' => 'Planet',
            'fsc_debris' => 'D&eacute;bris',
            'fsc_moon' => 'Lune',
            'g' => intval(filter_input(INPUT_POST, 'g')),
            's' => intval(filter_input(INPUT_POST, 's')),
            'p' => intval(filter_input(INPUT_POST, 'p')),
            't' => intval(filter_input(INPUT_POST, 't')),
            'fsc_return' => 'Zur&uuml;cksetzen',
            'fsc_save' => 'Enregistrer',
            'fsc_del' => 'Effacer',
            'user' => $user,
            'scarray' => explode("\r\n", $user['fleet_shortcut']),
            'r' => strip_tags(filter_input(INPUT_POST, 'n')) . "," . intval(filter_input(INPUT_POST, 'g')) . "," . intval(filter_input(INPUT_POST, 's')) . "," . intval(filter_input(INPUT_POST, 'p')) . "," . intval(filter_input(INPUT_POST, 't')) . "\r\n",
        ));

        $this->render('Fleet/fleetshortcut_ajout.tpl');
    }

}
