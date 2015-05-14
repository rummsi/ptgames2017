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
 * @ShowTechdetailsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/mai/2015 12:47:44
 */

/**
 * Description of ShowTechdetailsPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowTechdetailsPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'techdetails';
    }

    function show() {
        global $lang;

        $Id = $_GET['techid'];

        $Liste = "";
        if ($Id == 12) {
            $this->tplObj->assign(array(
                'tech' => $lang['tech'],
                'level' => $lang['level'],
            ));
            $Liste .= $this->tplObj->fetch('techtree_details_row.tpl');
        }

        $this->tplObj->assign(array(
            'title' => $lang['Tech'],
            'Name' => $lang['tech'][$Id],
            'Liste' => $Liste,
            'te_dt_tx_pre' => $lang['te_dt_tx_pre'],
            'te_dt_id' => $Id,
            'te_dt_name' => $lang['tech'][$Id],
        ));

        $this->render('techtree_details.tpl');
    }

}
