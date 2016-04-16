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
 * @ShowAdd_moneyPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 13:56:45
 */

/**
 * Description of ShowAdd_moneyPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowAdd_moneyPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'add_money';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {
            includeLang('admin');

            $mode = $_POST['type'];

            $PageTpl = gettemplate("admin/add_money");
            $parse = $lang;

            if ($mode == 'addit') {
                $id = $_POST['id'];
                $metal = $_POST['metal'];
                $cristal = $_POST['cristal'];
                $deut = $_POST['deut'];

                $QryUpdatePlanet = "UPDATE {{table}} SET ";
                $QryUpdatePlanet .= "`metal` = `metal` + '" . $metal . "', ";
                $QryUpdatePlanet .= "`crystal` = `crystal` + '" . $cristal . "', ";
                $QryUpdatePlanet .= "`deuterium` = `deuterium` + '" . $deut . "' ";
                $QryUpdatePlanet .= "WHERE ";
                $QryUpdatePlanet .= "`id` = '" . $id . "' ";
                doquery($QryUpdatePlanet, "planets");

                AdminMessage($lang['adm_am_done'], $lang['adm_am_ttle']);
            }
            $Page = parsetemplate($PageTpl, $parse);

            display($Page, $lang['adm_am_ttle'], false, '', true);
        } else {
            AdminMessage($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
