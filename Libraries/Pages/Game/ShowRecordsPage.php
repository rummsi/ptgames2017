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
 * @ShowRecordsPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  13/mai/2015 21:02:58
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
            'section' => $lang['rec_build'],
            'player' => $lang['rec_playe'],
            'level' => $lang['rec_level'],
        ));
        $parse['building'] = $this->tplObj->fetch('records_section_header.tpl');

        $this->tplObj->assign(array(
            'section' => $lang['rec_specb'],
            'player' => $lang['rec_playe'],
            'level' => $lang['rec_level'],
        ));
        $parse['buildspe'] = $this->tplObj->fetch('records_section_header.tpl');

        $this->tplObj->assign(array(
            'section' => $lang['rec_techn'],
            'player' => $lang['rec_playe'],
            'level' => $lang['rec_level'],
        ));
        $parse['research'] = $this->tplObj->fetch('records_section_header.tpl');

        $this->tplObj->assign(array(
            'section' => $lang['rec_fleet'],
            'player' => $lang['rec_playe'],
            'level' => $lang['rec_nbre'],
        ));
        $parse['fleet'] = $this->tplObj->fetch('records_section_header.tpl');

        $this->tplObj->assign(array(
            'section' => $lang['rec_defes'],
            'player' => $lang['rec_playe'],
            'level' => $lang['rec_nbre'],
        ));
        $parse['defenses'] = $this->tplObj->fetch('records_section_header.tpl');

        foreach ($lang['tech'] as $element => $elementName) {
            if (!empty($elementName) && !empty($resource[$element])) {
                $data = array();
                if ($element >= 0 && $element < 100 || $element >= 200 && $element < 600) {
                    $record = doquery(sprintf(
                                    'SELECT IF(COUNT(u.username)<=10,GROUP_CONCAT(DISTINCT u.username ORDER BY u.username DESC SEPARATOR ", "),"Plus de 10 joueurs ont ce record") AS players, p.%1$s AS level ' .
                                    'FROM {{table}}users AS u ' .
                                    'LEFT JOIN {{table}}planets AS p ON (u.id=p.id_owner) ' .
                                    'WHERE p.%1$s=(SELECT MAX(p2.%1$s) FROM {{table}}planets AS p2) AND p.%1$s>0 ' .
                                    'GROUP BY p.%1$s ORDER BY u.username ASC', $resource[$element]), '', true);
                } else if ($element >= 100 && $element < 200) {
                    $record = doquery(sprintf(
                                    'SELECT IF(COUNT(u.username)<=10,GROUP_CONCAT(DISTINCT u.username ORDER BY u.username DESC SEPARATOR ", "),"Plus de 10 joueurs ont ce record") AS players, u.%1$s AS level ' .
                                    'FROM {{table}}users AS u ' .
                                    'WHERE u.%1$s=(SELECT MAX(u2.%1$s) FROM {{table}}users AS u2) AND u.%1$s>0 ' .
                                    'GROUP BY u.%1$s ORDER BY u.username ASC', $resource[$element]), '', true);
                } else {
                    continue;
                }


                $this->tplObj->assign(array(
                    'element' => $elementName,
                    'winner' => !empty($record['players']) ? $record['players'] : '-',
                    'count' => intval($record['level']),
                ));
                $data['count'] = intval($record['level']);

                if ($element >= 0 && $element < 40 || $element == 44) {
                    $parse['building'] .= $this->tplObj->fetch('records_section_rows.tpl');
                } else if ($element >= 40 && $element < 100 && $element != 44) {
                    $parse['buildspe'] .= $this->tplObj->fetch('records_section_rows.tpl');
                } else if ($element >= 100 && $element < 200) {
                    $parse['research'] .= $this->tplObj->fetch('records_section_rows.tpl');
                } else if ($element >= 200 && $element < 400) {
                    $this->tplObj->assign('count', number_format(intval($data['count']), 0, ',', '.'));
                    $parse['fleet'] .= $this->tplObj->fetch('records_section_rows.tpl');
                } else if ($element >= 400 && $element < 600 && $element != 407 && $element != 408) {
                    $this->tplObj->assign('count', number_format(intval($data['count']), 0, ',', '.'));
                    $parse['defenses'] .= $this->tplObj->fetch('records_section_rows.tpl');
                }
            }
        }

        $this->tplObj->assign(array(
            'title' => $lang['rec_title'],
            'rec_title' => $lang['rec_title'],
            'building' => $parse['building'],
            'buildspe' => $parse['buildspe'],
            'research' => $parse['research'],
            'fleet' => $parse['fleet'],
            'defenses' => $parse['defenses'],
        ));
        
        $this->render('records_body.tpl');
    }

}
