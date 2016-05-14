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
 * @ShowVariablesPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/abr/2016 13:33:29
 */

/**
 * Description of ShowVariablesPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowVariablesPage extends AbstractAdminPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'variables';
    }

    function show() {
        global $lang, $user;


        if (in_array($user['authlevel'], array(LEVEL_ADMIN, LEVEL_OPERATOR, LEVEL_MODERATOR))) {

            $parse['phpinfo'] = phpinfo();

            $Page = parsetemplate($PageTPL, $parse);

            display($Page, "PhpInfo", false, '', true);
        } else {
            AdminMessage($lang['sys_noalloaw'], $lang['sys_noaccess']);
        }
    }

}