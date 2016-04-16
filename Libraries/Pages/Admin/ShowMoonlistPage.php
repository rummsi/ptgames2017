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
 * @ShowMoonlistPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 14:13:23
 */

/**
 * Description of ShowMoonlistPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMoonlistPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'moonlist';
    }

    function show() {
        global $lang, $user;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR))) {
            includeLang('overview');

            $parse = $lang;
            $query = doquery("SELECT * FROM {{table}} WHERE planet_type='3'", "planets");
            $i = 0;
            while ($u = mysqli_fetch_array($query)) {
                $parse['moon'] .= "<tr>"
                        . "<td class=b><center><b>" . $u[0] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[1] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[2] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[4] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[5] . "</center></b></td>"
                        . "<td class=b><center><b>" . $u[6] . "</center></b></td>"
                        . "</tr>";
                $i++;
            }

            if ($i == "1")
                $parse['moon'] .= "<tr><th class=b colspan=6>Il y a qu'une seule lune</th></tr>";
            else
                $parse['moon'] .= "<tr><th class=b colspan=6>Il y a {$i} lunes</th></tr>";

            display(parsetemplate(gettemplate('admin/moonlist_body'), $parse), 'Lunalist', false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
