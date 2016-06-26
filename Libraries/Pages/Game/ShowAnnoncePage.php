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
 * @ShowAnnoncePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/abr/2016 21:34:11
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
        $action = @$_GET['action'];

        if ($action == 5) {
            $metalvendre = $_POST['metalvendre'];
            $cristalvendre = $_POST['cristalvendre'];
            $deutvendre = $_POST['deutvendre'];

            $metalsouhait = $_POST['metalsouhait'];
            $cristalsouhait = $_POST['cristalsouhait'];
            $deutsouhait = $_POST['deutsouhait'];

            while ($v_annonce = mysqli_fetch_array($users)) {
                $user = $v_annonce['username'];
                $galaxie = $v_annonce['galaxy'];
                $systeme = $v_annonce['system'];
            }

            doquery("INSERT INTO {{table}} SET user='{$user}', galaxie='{$galaxie}', systeme='{$systeme}', metala='{$metalvendre}', cristala='{$cristalvendre}', deuta='{$deutvendre}', metals='{$metalsouhait}', cristals='{$cristalsouhait}', deuts='{$deutsouhait}'", "annonce");
        }

        if ($action != 5) {

            $this->tplObj->assign(array(
                'annonce' => doquery("SELECT * FROM {{table}} ORDER BY `id` DESC ", "annonce"),
            ));
        }
        $this->tplObj->assign(array(
            'title' => "Annonce",
            'action' => $action,
        ));
        $this->render('annonce_body.tpl');
    }

}
