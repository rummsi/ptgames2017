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
 * @ShowPlanetlistPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 14:04:12
 */

/**
 * Description of ShowPlanetlistPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowPlanetlistPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'changelog';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {

            $parse = $lang;
            $query = doquery("SELECT * FROM {{table}} WHERE planet_type='1'", "planets");
            $i = 0;
            while ($u = mysqli_fetch_array($query)) {
                $parse['planetes'] .= "<tr>"
                        . "<td class=b><center><b>" . $u[0] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[1] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[4] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[5] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[6] . "</center></b></td>"
                        . "</tr>";
                $i++;
            }

            if ($i == "1")
                $parse['planetes'] .= "<tr><th class=b colspan=5>Il y a qu'une seule plan&egrave;te</th></tr>";
            else
                $parse['planetes'] .= "<tr><th class=b colspan=5>Il y a {$i} plan&egrave;tes</th></tr>";

            display(parsetemplate(gettemplate('admin/planetlist_body'), $parse), 'Planetlist', false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
