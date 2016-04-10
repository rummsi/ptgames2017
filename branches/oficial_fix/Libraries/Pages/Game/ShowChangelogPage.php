<?php

/*
 * Expression package is undefined on line 4, column 19 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.
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
 * Expression package is undefined on line 19, column 19 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.
 * @Rui Silva
 * @ShowChangelogPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @Expression version is undefined on line 23, column 20 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.  10/abr/2016 11:10:27
 */

/**
 * Description of ShowChangelogPage
 *
 * @author Rui Silva
 */
class ShowChangelogPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'changelog';
    }

    function show() {
        global $lang;
        includeLang('changelog');

        $template = gettemplate('changelog_table');

        foreach ($lang['changelog'] as $a => $b) {
            $parse['version_number'] = $a;
            $parse['description'] = nl2br($b);

            $body .= parsetemplate($template, $parse);
        }

        $parse = $lang;
        $parse['body'] = $body;

        $page .= parsetemplate(gettemplate('changelog_body'), $parse);

        display($page, "Change Log");
    }

}
