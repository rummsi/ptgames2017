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
 * @ShowContactPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  17/abr/2015 17:40:18
 */

/**
 * Description of ShowContactPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowContactPage extends AbstractIndexPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'contact';
    }

    function show() {
        global $lang;
        includeLang('contact');

        $this->tplObj->assign(array(
            'title' => $lang['ctc_title'],
            'GameOps' => doquery("SELECT `username`, `email`, `authlevel` FROM {{table}} WHERE `authlevel` != '0' ORDER BY `authlevel` DESC;", 'users'),
            'user_level' => $lang['user_level'],
            'ctc_title' => $lang['ctc_title'],
            'ctc_intro' => $lang['ctc_intro'],
            'ctc_name' => $lang['ctc_name'],
            'ctc_rank' => $lang['ctc_rank'],
            'ctc_mail' => $lang['ctc_mail'],
        ));

        $this->render('contact_body.tpl');
    }

}
