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
 * @ShowChangelogPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 11:10:27
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

        $this->tplObj->assign(array(
            'title' => "Change Log",
            'Version' => $lang['Version'],
            'Description' => $lang['Description'],
            'changelog' => $lang['changelog'],
        ));
        $this->render('changelog_body.tpl');
    }

}
