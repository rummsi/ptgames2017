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
 * @ShowAdd_moonPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 14:35:17
 */

/**
 * Description of ShowAdd_moonPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowAdd_moonPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'changelog';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {
            includeLang('admin/addmoon');

            $mode = $_POST['mode'];

            $PageTpl = gettemplate("admin/add_moon");
            $parse = $lang;

            if ($mode == 'addit') {
                $PlanetID = $_POST['user'];
                $MoonName = $_POST['name'];

                $QrySelectPlanet = "SELECT * FROM {{table}} ";
                $QrySelectPlanet .= "WHERE ";
                $QrySelectPlanet .= "`id` = '" . $PlanetID . "';";
                $PlanetSelected = doquery($QrySelectPlanet, 'planets', true);

                $Galaxy = $PlanetSelected['galaxy'];
                $System = $PlanetSelected['system'];
                $Planet = $PlanetSelected['planet'];
                $Owner = $PlanetSelected['id_owner'];
                $MoonID = time();

                CreateOneMoonRecord($Galaxy, $System, $Planet, $Owner, $MoonID, $MoonName, 20);

                AdminMessage($lang['addm_done'], $lang['addm_title']);
            }
            $Page = parsetemplate($PageTpl, $parse);

            display($Page, $lang['addm_title'], false, '', true);
        } else {
            AdminMessage($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
