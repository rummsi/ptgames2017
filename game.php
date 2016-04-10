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
 * @game.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @Expression version is undefined on line 23, column 20 in file:///D:/servidor/_PTGAMES/www/ptgames-pt/branches/oficial_fix/nbproject/licenseheader.txt.  10/abr/2016 11:36:14
 */


define('INSIDE', true);
define('INSTALL', false);
require_once dirname(__FILE__) . '/common.php';
include 'Libraries/Classes/AbstractGamePage.php';

$page = HTTP::_GP('page', 'index');
$mode1 = HTTP::_GP('mode', 'show');
$mode = str_replace(array('_', '\\', '/', '.', "\0"), '', $mode1);

$pageClass = 'Show' . ucwords($page) . 'Page';

includeLang('login');

// Added Autoload in feature Versions
require(ROOT_PATH . 'Libraries/Pages/Game/' . $pageClass . '.php');

$pageObj = new $pageClass;

$pageObj->{$mode}();
