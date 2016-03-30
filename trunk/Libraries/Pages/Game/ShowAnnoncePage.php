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
 * @ShowAnnoncePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/mai/2015 21:08:39
 */

/**
 * Description of ShowAnnoncePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowAnnoncePage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'annonce';
    }

    function show() {
        global $user;

        $users = doquery("SELECT * FROM {{table}} WHERE id='" . $user['id'] . "';", 'users');
        $annonce = doquery("SELECT * FROM {{table}} ", 'annonce');
        $action = HTTP::_GP('action', '');
        if ($action == 5) {
            $metalvendre = $_POST['metalvendre'];
            $cristalvendre = $_POST['cristalvendre'];
            $deutvendre = $_POST['deutvendre'];
            $metalsouhait = $_POST['metalsouhait'];
            $cristalsouhait = $_POST['cristalsouhait'];
            $deutsouhait = $_POST['deutsouhait'];
            while ($v_annonce = $users->fetch_array()) {
                $user = $v_annonce['username'];
                $galaxie = $v_annonce['galaxy'];
                $systeme = $v_annonce['system'];
            }
            doquery("INSERT INTO {{table}} SET user='{$user}', galaxie='{$galaxie}', systeme='{$systeme}', metala='{$metalvendre}', cristala='{$cristalvendre}', deuta='{$deutvendre}', metals='{$metalsouhait}', cristals='{$cristalsouhait}', deuts='{$deutsouhait}'", "annonce");

            $this->tplObj->assign(array(
                'title' => '',
            ));

            $this->render('annonce_ok.tpl');
        } elseif ($action == 2) {

            $this->tplObj->assign(array(
                'title' => '',
            ));

            $this->render('annonce2_body.tpl');
        } else {
            $annonce = doquery("SELECT * FROM {{table}} ORDER BY `id` DESC ", "annonce");
            $annonce_table = "";
            while ($b = $annonce->fetch_array()) {
                $this->tplObj->assign(array(
                    'b_user' => $b["user"],
                    'b_galaxie' => $b["galaxie"],
                    'b_systeme' => $b["systeme"],
                    'b_metala' => @$b["metala"],
                    'b_gcristala' => @$b["gcristala"],
                    'b_deuta' => @$b["deuta"],
                    'b_metals' => @$b["metals"],
                    'b_cristals' => @$b["cristals"],
                    'b_deuts' => @$b["deuts"],
                ));
                $annonce_table .= $this->tplObj->fetch('annonce_table.tpl');
            }

            $this->tplObj->assign(array(
                'title' => '',
                'annonce_table' => $annonce_table,
            ));

            $this->render('annonce_body.tpl');
        }
    }

}
