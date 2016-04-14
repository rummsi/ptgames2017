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
 * @ShowBannedPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/abr/2016 21:31:35
 */

/**
 * Description of ShowBannedPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowBannedPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'banned';
    }

    function show() {
        global $lang;

        includeLang('banned');

        $parse = $lang;
        $parse['dpath'] = $dpath;
        $parse['mf'] = $mf;


        $query = doquery("SELECT * FROM {{table}} ORDER BY `id`;", 'banned');
        $i = 0;
        while ($u = mysqli_fetch_array($query)) {
            $parse['banned'] .=
                    "<tr><td class=b><center><b>" . $u[1] . "</center></td></b>" .
                    "<td class=b><center><b>" . $u[2] . "</center></b></td>" .
                    "<td class=b><center><b>" . date("d/m/Y G:i:s", $u[4]) . "</center></b></td>" .
                    "<td class=b><center><b>" . date("d/m/Y G:i:s", $u[5]) . "</center></b></td>" .
                    "<td class=b><center><b>" . $u[6] . "</center></b></td></tr>";
            $i++;
        }

        if ($i == "0")
            $parse['banned'] .= "<tr><th class=b colspan=6>Il n'y a pas de joueurs bannis</th></tr>";
        else
            $parse['banned'] .= "<tr><th class=b colspan=6>Il y a {$i} joueurs bannis</th></tr>";

        display(parsetemplate(gettemplate('banned_body'), $parse), 'Banned', true);
    }

}
