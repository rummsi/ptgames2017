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
 * @ShowOfficierPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 14:28:17
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
        global $lang, $resource, $reslist, $_GET, $user;

        $CurrentUser = $user;
        includeLang('officier');

        // Vérification que le joueur n'a pas un nombre de points négatif
        if ($CurrentUser['rpg_points'] < 0) {
            doquery("UPDATE {{table}} SET `rpg_points` = '0' WHERE `id` = '" . $CurrentUser['id'] . "';", 'users');
        }

        // Si recrutement d'un officier
        if (isset($_GET['action']) == 2) {
            if ($CurrentUser['rpg_points'] > 0) {
                $Selected = $_GET['offi'];
                if (in_array($Selected, $reslist['officier'])) {
                    $Result = IsOfficierAccessible($CurrentUser, $Selected);
                    if ($Result == 1) {
                        $CurrentUser[$resource[$Selected]] += 1;
                        $CurrentUser['rpg_points'] -= 1;
                        if ($Selected == 610) {
                            $CurrentUser['spy_tech'] += 5;
                        } elseif ($Selected == 611) {
                            $CurrentUser['computer_tech'] += 3;
                        }

                        $QryUpdateUser = "UPDATE {{table}} SET ";
                        $QryUpdateUser .= "`rpg_points` = '" . $CurrentUser['rpg_points'] . "', ";
                        $QryUpdateUser .= "`spy_tech` = '" . $CurrentUser['spy_tech'] . "', ";
                        $QryUpdateUser .= "`computer_tech` = '" . $CurrentUser['computer_tech'] . "', ";
                        $QryUpdateUser .= "`" . $resource[$Selected] . "` = '" . $CurrentUser[$resource[$Selected]] . "' ";
                        $QryUpdateUser .= "WHERE ";
                        $QryUpdateUser .= "`id` = '" . $CurrentUser['id'] . "';";
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
                'title' => $lang['Officier'],
                'off_points' => $lang['off_points'],
                'alv_points' => $CurrentUser['rpg_points'],
                'CurrentUser' => $CurrentUser,
                'off_tx_lvl'=>$lang['off_tx_lvl'],
                'resource'=>$resource,
                'off_desc'=>$lang['Desc'],
                'lang_link'=>$lang['link'],
                'Maxlvl'=>$lang['Maxlvl'],
            ));

            $this->render('officier_body.tpl');
        }
    }

}
