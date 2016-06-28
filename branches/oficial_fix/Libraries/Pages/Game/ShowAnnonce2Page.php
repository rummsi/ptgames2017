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
 * @ShowAnnonce2Page.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/abr/2016 21:38:56
 */

/**
 * Description of ShowAnnonce2Page
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowAnnonce2Page extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'annonce2';
    }

    function show() {
        global $user;

        $actions = $_GET['action'];

        if ($actions == 2) {

            $this->tplObj->assign(array(
                'title' => "Annonce2",
            ));
            $this->render('annonce2_body.tpl');
        }
    }

}
