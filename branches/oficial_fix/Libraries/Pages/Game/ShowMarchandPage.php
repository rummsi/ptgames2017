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
 * @ShowMarchandPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 14:49:22
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
        global $lang, $_POST, $planetrow, $user;

        $CurrentPlanet = $planetrow;
        $CurrentUser = $user;

        includeLang('marchand');

        $parse = $lang;

        if (isset($_POST['ress']) != '') {
            $PageTPL = 'message_body';
            $Error = false;
            $CheatTry = false;
            $Metal = isset($_POST['metal']);
            $Crystal = isset($_POST['cristal']);
            $Deuterium = isset($_POST['deut']);
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
                        if ($CurrentPlanet['metal'] > $Necessaire) {
                            $CurrentPlanet['metal'] -= $Necessaire;
                        } else {
                            $Message = $lang['mod_ma_noten'] . " " . $lang['Metal'] . "! ";
                            $Error = true;
                        }
                        break;

                    case 'cristal':
                        $Necessaire = (( $Metal * 0.5) + ( $Deuterium * 2));
                        if ($CurrentPlanet['crystal'] > $Necessaire) {
                            $CurrentPlanet['crystal'] -= $Necessaire;
                        } else {
                            $Message = $lang['mod_ma_noten'] . " " . $lang['Crystal'] . "! ";
                            $Error = true;
                        }
                        break;

                    case 'deuterium':
                        $Necessaire = (( $Metal * 0.25) + ( $Crystal * 0.5));
                        if ($CurrentPlanet['deuterium'] > $Necessaire) {
                            $CurrentPlanet['deuterium'] -= $Necessaire;
                        } else {
                            $Message = $lang['mod_ma_noten'] . " " . $lang['Deuterium'] . "! ";
                            $Error = true;
                        }
                        break;
                }
            }
            if ($Error == false) {
                if ($CheatTry == true) {
                    $CurrentPlanet['metal'] = 0;
                    $CurrentPlanet['crystal'] = 0;
                    $CurrentPlanet['deuterium'] = 0;
                } else {
                    $CurrentPlanet['metal'] += $Metal;
                    $CurrentPlanet['crystal'] += $Crystal;
                    $CurrentPlanet['deuterium'] += $Deuterium;
                }

                $QryUpdatePlanet = "UPDATE {{table}} SET ";
                $QryUpdatePlanet .= "`metal` = '" . $CurrentPlanet['metal'] . "', ";
                $QryUpdatePlanet .= "`crystal` = '" . $CurrentPlanet['crystal'] . "', ";
                $QryUpdatePlanet .= "`deuterium` = '" . $CurrentPlanet['deuterium'] . "' ";
                $QryUpdatePlanet .= "WHERE ";
                $QryUpdatePlanet .= "`id` = '" . $CurrentPlanet['id'] . "';";
                doquery($QryUpdatePlanet, 'planets');
                $Message = $lang['mod_ma_done'];
            }
            if ($Error == true) {
                $parse['title'] = $lang['mod_ma_error'];
            } else {
                $parse['title'] = $lang['mod_ma_donet'];
            }
            $this->tplObj->assign('mes', $Message);
        } else {
            if (isset($_POST['action']) != 2) {
                $PageTPL = 'marchand_main';
            } else {
                $parse['mod_ma_res'] = "1";
                switch ($_POST['choix']) {
                    case 'metal':
                        $PageTPL = 'marchand_metal';
                        $this->tplObj->assign(array(
                            'mod_ma_res_a' => "2",
                            'mod_ma_res_b' => "4",
                        ));
                        break;
                    case 'cristal':
                        $PageTPL = 'marchand_cristal';
                        $this->tplObj->assign(array(
                            'mod_ma_res_a' => "0.5",
                            'mod_ma_res_b' => "2",
                        ));
                        break;
                    case 'deut':
                        $PageTPL = 'marchand_deuterium';
                        $this->tplObj->assign(array(
                            'mod_ma_res_a' => "0.25",
                            'mod_ma_res_b' => "0.5",
                        ));
                        break;
                }
            }
        }

        $this->tplObj->assign(array(
            'title' => $lang['mod_marchand'],
            'mod_ma_title' => $lang['mod_ma_title'],
            'mod_ma_typer' => $lang['mod_ma_typer'],
            'mod_ma_rates' => $lang['mod_ma_rates'],
            'mod_ma_buton' => $lang['mod_ma_buton'],
            'mod_ma_nbre' => $lang['mod_ma_nbre'],
            'mod_ma_buton' => $lang['mod_ma_buton'],
            'mod_ma_cours' => $lang['mod_ma_cours'],
            'mod_ma_res' => isset($parse['mod_ma_res']),
            'mod_ma_excha' => $lang['mod_ma_excha'],
        ));
        $this->render($PageTPL . '.tpl');
    }

}
