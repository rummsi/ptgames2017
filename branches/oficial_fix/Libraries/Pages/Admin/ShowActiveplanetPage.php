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
 * @ShowActiveplanetPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 14:08:05
 */

/**
 * Description of ShowActiveplanetPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowActiveplanetPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'activeplanet';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {
            includeLang('admin');

            $parse = $lang;
            $parse['dpath'] = $dpath;
            $parse['mf'] = $mf;

            $PageTPL = gettemplate('admin/activeplanet_body');
            $AllActivPlanet = doquery("SELECT * FROM {{table}} WHERE `last_update` >= '" . (time() - 15 * 60) . "' ORDER BY `id` ASC", 'planets');
            $Count = 0;

            while ($ActivPlanet = mysqli_fetch_array($AllActivPlanet)) {
                $parse['online_list'] .= "<tr>";
                $parse['online_list'] .= "<td class=b><center><b>" . $ActivPlanet['name'] . "</b></center></td>";
                $parse['online_list'] .= "<td class=b><center><b>[" . $ActivPlanet['galaxy'] . ":" . $ActivPlanet['system'] . ":" . $ActivPlanet['planet'] . "]</b></center></td>";
                $parse['online_list'] .= "<td class=m><center><b>" . pretty_number($ActivPlanet['points'] / 1000) . "</b></center></td>";
                $parse['online_list'] .= "<td class=b><center><b>" . pretty_time(time() - $ActivPlanet['last_update']) . "</b></center></td>";
                $parse['online_list'] .= "</tr>";
                $Count++;
            }
            $parse['online_list'] .= "<tr>";
            $parse['online_list'] .= "<th class=\"b\" colspan=\"4\">" . $lang['adm_pl_they'] . " " . $Count . " " . $lang['adm_pl_apla'] . "</th>";
            $parse['online_list'] .= "</tr>";

            $page = parsetemplate($PageTPL, $parse);
            display($page, $lang['adm_pl_title'], false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
