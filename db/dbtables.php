<?php

/* 
 * XNovaPT
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
 * XNovaPT
 * @author XNovaPT Team <xnovaptteam@gmail.com>
 * @dbtables.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  5/abr/2015 11:34:45
 */

if (!defined('AKS')) {
    define('AKS', $config['global']['database']['table_prefix'] . 'aks');
}
if (!defined('ALLIANCE')) {
    define('ALLIANCE', $config['global']['database']['table_prefix'] . 'alliance');
}
if (!defined('ANNONCE')) {
    define('ANNONCE', $config['global']['database']['table_prefix'] . 'annonce');
}
if (!defined('BANNED')) {
    define('BANNED', $config['global']['database']['table_prefix'] . 'banned');
}
if (!defined('BUDDY')) {
    define('BUDDY', $config['global']['database']['table_prefix'] . 'buddy');
}
if (!defined('CHAT')) {
    define('CHAT', $config['global']['database']['table_prefix'] . 'chat');
}
if (!defined('CONFIG')) {
    define('CONFIG', $config['global']['database']['table_prefix'] . 'config');
}
if (!defined('DECLARED')) {
    define('DECLARED', $config['global']['database']['table_prefix'] . 'declared');
}
if (!defined('ERRORS')) {
    define('ERRORS', $config['global']['database']['table_prefix'] . 'errors');
}
if (!defined('FLEET')) {
    define('FLEET', $config['global']['database']['table_prefix'] . 'fleet');
}
if (!defined('GALAXY')) {
    define('GALAXY', $config['global']['database']['table_prefix'] . 'galaxy');
}
if (!defined('IRAKS')) {
    define('IRAKS', $config['global']['database']['table_prefix'] . 'iraks');
}
if (!defined('LUNAS')) {
    define('LUNAS', $config['global']['database']['table_prefix'] . 'lunas');
}
if (!defined('MESSAGES')) {
    define('MESSAGES', $config['global']['database']['table_prefix'] . 'messages');
}
if (!defined('MULTI')) {
    define('MULTI', $config['global']['database']['table_prefix'] . 'multi');
}
if (!defined('NOTES')) {
    define('NOTES', $config['global']['database']['table_prefix'] . 'notes');
}
if (!defined('PLANETS')) {
    define('PLANETS', $config['global']['database']['table_prefix'] . 'planets');
}
if (!defined('RW')) {
    define('RW', $config['global']['database']['table_prefix'] . 'rw');
}
if (!defined('STATPOINTS')) {
    define('STATPOINTS', $config['global']['database']['table_prefix'] . 'statpoints');
}
if (!defined('USERS')) {
    define('USERS', $config['global']['database']['table_prefix'] . 'users');
}