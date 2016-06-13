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
 * @ShowTechtreePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 21:29:45
 */

/**
 * Description of ShowTechtreePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowTechtreePage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'techtree';
    }

    function show() {
        global $lang, $resource, $requirements, $user;

        $this->tplObj->assign(array(
            'title' => $lang['Tech'],
            'lang' => $lang,
            'resource' => $resource,
            'requirements' => $requirements,
            'user' => $user,
        ));
        $this->render('techtree_body.tpl');
    }

}
