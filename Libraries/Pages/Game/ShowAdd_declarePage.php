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
 * @ShowAdd_declarePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/abr/2016 22:09:29
 */

/**
 * Description of ShowAdd_declarePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowAdd_declarePage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'add_declare';
    }

    function show() {
        global $lang, $user;

        includeLang('admin');

        $mode = $_POST['type'];

        $PageTpl = gettemplate("add_declare");
        $parse = $lang;

        if ($mode == 'addit') {
            $declarator = $user['id'];
            $declarator_name = addslashes(htmlspecialchars($user['username']));
            $decl1 = addslashes(htmlspecialchars($_POST['dec1']));
            $decl2 = addslashes(htmlspecialchars($_POST['dec2']));
            $decl3 = addslashes(htmlspecialchars($_POST['dec3']));
            $reason1 = addslashes(htmlspecialchars($_POST['reason']));

            $QryDeclare = "INSERT INTO {{table}} SET ";
            $QryDeclare .= "`declarator` = '" . $declarator . "', ";
            $QryDeclare .= "`declarator_name` = '" . $declarator_name . "', ";
            $QryDeclare .= "`declared_1` = '" . $decl1 . "', ";
            $QryDeclare .= "`declared_2` = '" . $decl2 . "', ";
            $QryDeclare .= "`declared_3` = '" . $decl3 . "', ";
            $QryDeclare .= "`reason`     = '" . $reason1 . "' ";

            doquery($QryDeclare, "declared");
            doquery("UPDATE {{table}} SET multi_validated ='1' WHERE username='{$user['username']}'", "users");

            AdminMessage("Merci, votre demande a ete prise en compte. Les autres joueurs que vous avez implique doivent egalement et imperativement suivre cette procedure aussi.", "Ajout");
        }
        $Page = parsetemplate($PageTpl, $parse);

        display($Page, "Declaration d\'IP partagee");
    }

}
