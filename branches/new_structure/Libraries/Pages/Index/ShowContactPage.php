<?php

/**
 * This file is part of XNova:Legacies
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt
 * @see http://www.xnova-ng.org/
 *
 * Copyright (c) 2009-Present, XNova Support Team <http://www.xnova-ng.org>
 * All rights reserved.
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
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *                                --> NOTICE <--
 *  This file is part of the core development branch, changing its contents will
 * make you unable to use the automatic updates manager. Please refer to the
 * documentation for further information about customizing XNova.
 *
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
