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
 * @ShowMarchandPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  25/abr/2015 12:29:03
 */

/**
 * Description of ShowMarchandPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowMarchandPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'marchand';
    }

    function show() {
        global $lang, $planetrow;

        includeLang('marchand');

        if (HTTP::_GP('ress', '') != '') {
            $PageTPL = 'message_body.tpl';
            $Error = false;
            $CheatTry = false;
            $Metal = $_POST['metal'];
            $Crystal = $_POST['cristal'];
            $Deuterium = $_POST['deut'];
            if ($Metal < 0) {
                $Metal *= -1;
                $CheatTry = true;
            }
            if ($Crystal < 0) {
                $Crystal *= -1;
                $CheatTry = true;
            }
            if ($Deuterium < 0) {
                $Deuterium *= -1;
                $CheatTry = true;
            }
            if ($CheatTry == false) {
                switch ($_POST['ress']) {
                    case 'metal':
                        $Necessaire = (( $Crystal * 2) + ( $Deuterium * 4));
                        if ($planetrow['metal'] > $Necessaire) {
                            $planetrow['metal'] -= $Necessaire;
                        } else {
                            $Message = $lang['mod_ma_noten'] . " " . $lang['Metal'] . "! ";
                            $Error = true;
                        }
                        break;

                    case 'cristal':
                        $Necessaire = (( $Metal * 0.5) + ( $Deuterium * 2));
                        if ($planetrow['crystal'] > $Necessaire) {
                            $planetrow['crystal'] -= $Necessaire;
                        } else {
                            $Message = $lang['mod_ma_noten'] . " " . $lang['Crystal'] . "! ";
                            $Error = true;
                        }
                        break;

                    case 'deuterium':
                        $Necessaire = (( $Metal * 0.25) + ( $Crystal * 0.5));
                        if ($planetrow['deuterium'] > $Necessaire) {
                            $planetrow['deuterium'] -= $Necessaire;
                        } else {
                            $Message = $lang['mod_ma_noten'] . " " . $lang['Deuterium'] . "! ";
                            $Error = true;
                        }
                        break;
                }
            }
            if ($Error == false) {
                if ($CheatTry == true) {
                    $planetrow['metal'] = 0;
                    $planetrow['crystal'] = 0;
                    $planetrow['deuterium'] = 0;
                } else {
                    $planetrow['metal'] += $Metal;
                    $planetrow['crystal'] += $Crystal;
                    $planetrow['deuterium'] += $Deuterium;
                }

                $QryUpdatePlanet = "UPDATE {{table}} SET ";
                $QryUpdatePlanet .= "`metal` = '" . $planetrow['metal'] . "', ";
                $QryUpdatePlanet .= "`crystal` = '" . $planetrow['crystal'] . "', ";
                $QryUpdatePlanet .= "`deuterium` = '" . $planetrow['deuterium'] . "' ";
                $QryUpdatePlanet .= "WHERE ";
                $QryUpdatePlanet .= "`id` = '" . $planetrow['id'] . "';";
                doquery($QryUpdatePlanet, 'planets');
                $Message = $lang['mod_ma_done'];
            }
            if ($Error == true) {
                $this->tplObj->assign('title' , $lang['mod_ma_error']);
            } else {
                $this->tplObj->assign('title' , $lang['mod_ma_donet']);
            }
            $this->tplObj->assign('mes' , $Message);
        } else {
            if (HTTP::_GP('action', '') != 2) {
                $PageTPL = 'marchand_main.tpl';
                $this->tplObj->assign(array(
                    'title' => $lang['mod_marchand'],
                    'mod_ma_title' => $lang['mod_ma_title'],
                    'mod_ma_typer' => $lang['mod_ma_typer'],
                    'Metal' => $lang['Metal'],
                    'Crystal' => $lang['Crystal'],
                    'Deuterium' => $lang['Deuterium'],
                    'mod_ma_rates' => $lang['mod_ma_rates'],
                    'mod_ma_buton' => $lang['mod_ma_buton'],
                ));
            } else {
                $this->tplObj->assign('mod_ma_res' , "1");
                switch ($_POST['choix']) {
                    case 'metal':
                        $PageTPL = 'marchand_metal.tpl';
                        $this->tplObj->assign(array(
                            'title' => $lang['mod_marchand'],
                            'mod_ma_nbre' => $lang['mod_ma_nbre'],
                            'mod_ma_buton' => $lang['mod_ma_buton'],
                            'mod_ma_cours' => $lang['mod_ma_cours'],
                            'mod_ma_excha' => $lang['mod_ma_excha'],
                            'mod_ma_res_a' => "2",
                            'mod_ma_res_b' => "4",
                        ));
                        break;
                    case 'cristal':
                        $PageTPL = 'marchand_cristal.tpl';
                        $this->tplObj->assign(array(
                            'title' => $lang['mod_marchand'],
                            'mod_ma_nbre' => $lang['mod_ma_nbre'],
                            'mod_ma_buton' => $lang['mod_ma_buton'],
                            'mod_ma_cours' => $lang['mod_ma_cours'],
                            'mod_ma_excha' => $lang['mod_ma_excha'],
                            'mod_ma_res_a' => "0.5",
                            'mod_ma_res_b' => "2",
                        ));
                        break;
                    case 'deut':
                        $PageTPL = 'marchand_deuterium.tpl';
                        $this->tplObj->assign(array(
                            'title' => $lang['mod_marchand'],
                            'mod_ma_nbre' => $lang['mod_ma_nbre'],
                            'mod_ma_buton' => $lang['mod_ma_buton'],
                            'mod_ma_cours' => $lang['mod_ma_cours'],
                            'mod_ma_excha' => $lang['mod_ma_excha'],
                            'mod_ma_res_a' => "0.25",
                            'mod_ma_res_b' => "0.5",
                        ));
                        break;
                }
            }
        }

        $Page = $this->render($PageTPL);
    }

}
