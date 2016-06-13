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
 * @ShowTechdetailsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  13/jun/2016 1:12:27
 */

/**
 * Description of ShowTechdetailsPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowTechdetailsPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'techdetails';
    }

    function show() {
        global $lang;
        $Id = $_GET['techid'];
        $PageTPL = gettemplate('techtree_details');
        $RowsTPL = gettemplate('techtree_details_rows');

        $parse = $lang;
        $parse['te_dt_id'] = $Id;
        $parse['te_dt_name'] = $lang['tech'][$Id];
        $Liste = "";

        if ($Id == 12) {
            $Liste .= "<tr><th>" . $lang['tech']['31'] . " (" . $lang['level'] . " 1)</th></tr>";
            $Liste .= "<tr><td class=\"c\">2</td><tr>";
            $Liste .= "<tr><th>" . $lang['tech']['3'] . " (" . $lang['level'] . " 5)</th></tr>";
            $Liste .= "<tr><th>" . $lang['tech']['113'] . " (" . $lang['level'] . " 3) <a href=\"techtreedetails.php?tech=113\">[i]</a></th></tr>";
        }

        $parse['Liste'] = $Liste;
        $page = parsetemplate($PageTPL, $parse);

        display($page, $lang['Tech'], false, '', false);
    }

}
