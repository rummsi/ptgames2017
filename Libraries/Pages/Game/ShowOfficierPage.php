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
 * @ShowOfficierPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  25/abr/2015 11:57:01
 */

/**
 * Description of ShowOfficierPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowOfficierPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'officier';
    }

    function show() {
        global $user, $lang, $resource;

        includeLang('officier');

        // Vérification que le joueur n'a pas un nombre de points négatif
        if ($user['rpg_points'] < 0) {
            doquery("UPDATE {{table}} SET `rpg_points` = '0' WHERE `id` = '" . $user['id'] . "';", 'users');
        }

        // Si recrutement d'un officier
        if (filter_input(INPUT_GET, 'action') == 2) {
            if ($user['rpg_points'] > 0) {
                $Selected = $_GET['offi'];
                if (in_array($Selected, $reslist['officier'])) {
                    $Result = IsOfficierAccessible($user, $Selected);
                    if ($Result == 1) {
                        $user[$resource[$Selected]] += 1;
                        $user['rpg_points'] -= 1;
                        if ($Selected == 610) {
                            $user['spy_tech'] += 5;
                        } elseif ($Selected == 611) {
                            $user['computer_tech'] += 3;
                        }

                        $QryUpdateUser = "UPDATE {{table}} SET ";
                        $QryUpdateUser .= "`rpg_points` = '" . $user['rpg_points'] . "', ";
                        $QryUpdateUser .= "`spy_tech` = '" . $user['spy_tech'] . "', ";
                        $QryUpdateUser .= "`computer_tech` = '" . $user['computer_tech'] . "', ";
                        $QryUpdateUser .= "`" . $resource[$Selected] . "` = '" . $user[$resource[$Selected]] . "' ";
                        $QryUpdateUser .= "WHERE ";
                        $QryUpdateUser .= "`id` = '" . $user['id'] . "';";
                        doquery($QryUpdateUser, 'users');
                        $Message = $lang['OffiRecrute'];
                    } elseif ($Result == -1) {
                        $Message = $lang['Maxlvl'];
                    } elseif ($Result == 0) {
                        $Message = $lang['Noob'];
                    }
                }
            } else {
                $Message = $lang['NoPoints'];
            }
            $this->tplObj->assign(array(
                'title' => $lang['Officier'],
                'mes' => $Message,
            ));

            $this->render('message_body.tpl');
        } else {
            // Pas de recrutement d'officier
            $this->tplObj->assign(array(
                'off_points' => $lang['off_points'],
                'alv_points' => $user['rpg_points'],
                'disp_off_tbl' => "",
            ));
            for ($Officier = 601; $Officier <= 615; $Officier++) {
                $Result = IsOfficierAccessible($user, $Officier);
                if ($Result != 0) {
                    $this->tplObj->assign(array(
                        'off_id' => $Officier,
                        'off_tx_lvl' => $lang['off_tx_lvl'],
                        'off_lvl' => $user[$resource[$Officier]],
                        'off_desc' => $lang['Desc'][$Officier],
                    ));
                    if ($Result == 1) {
                        $this->tplObj->assign('off_link', "<a href=\"game.php?page=officier&action=2&offi=" . $Officier . "\"><font color=\"#00ff00\">" . $lang['link'][$Officier] . "</font>");
                    } else {
                        $this->tplObj->assign('off_link', $lang['Maxlvl']);
                    }
                    @$disp_off_tbl .= $this->tplObj->fetch('officier_rows.tpl');
                    $this->tplObj->assign(array(
                        'title' => $lang['Officier'],
                        'disp_off_tbl' => $disp_off_tbl,
                    ));
                }
            }
            $this->render('officier_body.tpl');
        }
    }

}
