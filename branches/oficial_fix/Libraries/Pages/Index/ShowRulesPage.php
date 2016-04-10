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
 * @ShowRulesPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @Expression version is undefined on line 23, column 20 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.  10/abr/2016 11:20:47
 */

/**
 * Description of ShowRulesPage
 *
 * @author Rui Silva
 */
class ShowRulesPage extends AbstractIndexPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'rules';
    }

    function show() {
        global $lang, $game_config;
        define('NO_MENU', true);

        includeLang('rules');

        $parse = $lang;
        $parse['servername'] = $game_config['game_name'];

        $PageTPL = gettemplate('rules_body');
        $page = parsetemplate($PageTPL, $parse);

        display($page, $lang['rules'], false);
    }

}
