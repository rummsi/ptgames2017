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
 * @ShowRecordsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 21:45:49
 */

/**
 * Description of ShowRecordsPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowRecordsPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'records';
    }

    function show() {
        global $lang, $resource, $element;

        includeLang('records');

        $this->tplObj->assign(array(
            'title' => $lang['rec_title'],
            'lang' => $lang,
            'resource' => $resource,
            'record' => @doquery(sprintf(
                            'SELECT IF(COUNT(u.username)<=10,GROUP_CONCAT(DISTINCT u.username ORDER BY u.username DESC SEPARATOR ", "),"Plus de 10 joueurs ont ce record") AS players, p.%1$s AS level ' .
                            'FROM {{table}}users AS u ' .
                            'LEFT JOIN {{table}}planets AS p ON (u.id=p.id_owner) ' .
                            'WHERE p.%1$s=(SELECT MAX(p2.%1$s) FROM {{table}}planets AS p2) AND p.%1$s>0 ' .
                            'GROUP BY p.%1$s ORDER BY u.username ASC', $resource[$element]), '', true),
            'record1' => @doquery(sprintf(
                            'SELECT IF(COUNT(u.username)<=10,GROUP_CONCAT(DISTINCT u.username ORDER BY u.username DESC SEPARATOR ", "),"Plus de 10 joueurs ont ce record") AS players, u.%1$s AS level ' .
                            'FROM {{table}}users AS u ' .
                            'WHERE u.%1$s=(SELECT MAX(u2.%1$s) FROM {{table}}users AS u2) AND u.%1$s>0 ' .
                            'GROUP BY u.%1$s ORDER BY u.username ASC', $resource[$element]), '', true),
        ));

        $this->render('records_body.tpl');
    }

}
