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
 * @ShowErrorsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/abr/2016 20:25:04
 */

/**
 * Description of ShowErrorsPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowErrorsPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'errors';
    }

    function show() {
        global $lang, $user;

        includeLang('admin');
        $parse = $lang;

        if (in_array($user['authlevel'], array(LEVEL_ADMIN))) {

            // Supprimer les erreurs
            extract($_GET);
            if (isset($delete)) {
                doquery("DELETE FROM {{table}} WHERE `error_id`=$delete", 'errors');
            } elseif ($deleteall == 'yes') {
                doquery("TRUNCATE TABLE {{table}}", 'errors');
            }

            // Afficher les erreurs
            $query = doquery("SELECT * FROM {{table}}", 'errors');
            $i = 0;
            while ($u = mysqli_fetch_array($query)) {
                $i++;
                $parse['errors_list'] .= "
			<tr><td width=\"25\" class=n>" . $u['error_id'] . "</td>
			<td width=\"170\" class=n>" . $u['error_type'] . "</td>
			<td width=\"230\" class=n>" . date('d/m/Y h:i:s', $u['error_time']) . "</td>
			<td width=\"95\" class=n><a href=\"?delete=" . $u['error_id'] . "\"><img src=\"../images/r1.png\"></a></td></tr>
			<tr><td colspan=\"4\" class=b>" . nl2br($u['error_text']) . "</td></tr>";
            }
            $parse['errors_list'] .= "<tr>
			<th class=b colspan=5>" . $i . " " . $lang['adm_er_nbs'] . "</th>
		</tr>";

            display(parsetemplate(gettemplate('admin/errors_body'), $parse), "Bledy", false, '', true);
        } else {
            message($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}
