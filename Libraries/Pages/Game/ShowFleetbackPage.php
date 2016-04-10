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
 * @ShowFleetbackPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  10/abr/2016 16:01:53
 */

/**
 * Description of ShowFleetbackPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowFleetbackPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'fleetback';
    }

    function show() {
        global $user, $lang;

        includeLang('fleet');

        $BoxTitle = $lang['fl_error'];
        $TxtColor = "red";
        $BoxMessage = $lang['fl_notback'];
        if (is_numeric($_POST['fleetid'])) {
            $fleetid = intval($_POST['fleetid']);

            $FleetRow = doquery("SELECT * FROM {{table}} WHERE `fleet_id` = '" . $fleetid . "';", 'fleets', true);
            $i = 0;

            if ($FleetRow['fleet_owner'] == $user['id']) {
                if ($FleetRow['fleet_mess'] == 0) {
                    if ($FleetRow['fleet_end_stay'] != 0) {
                        // Faut calculer le temps reel de retour
                        if ($FleetRow['fleet_start_time'] < time()) {
                            // On a pas encore entamé le stationnement
                            // Il faut calculer la parcelle de temps ecoulée depuis le lancement de la flotte
                            $CurrentFlyingTime = time() - $FleetRow['start_time'];
                        } else {
                            // On est deja en stationnement
                            // Il faut donc directement calculer la durée d'un vol aller ou retour
                            $CurrentFlyingTime = $FleetRow['fleet_start_time'] - $FleetRow['start_time'];
                        }
                    } else {
                        // C'est quoi le stationnement ??
                        // On calcule sagement la parcelle de temps ecoulée depuis le depart
                        $CurrentFlyingTime = time() - $FleetRow['start_time'];
                    }
                    // Allez houste au bout du compte y a la maison !! (E.T. phone home.............)
                    $ReturnFlyingTime = $CurrentFlyingTime + time();

                    $QryUpdateFleet = "UPDATE {{table}} SET ";
                    $QryUpdateFleet .= "`fleet_start_time` = '" . (time() - 1) . "', ";
                    $QryUpdateFleet .= "`fleet_end_stay` = '0', ";
                    $QryUpdateFleet .= "`fleet_end_time` = '" . ($ReturnFlyingTime + 1) . "', ";
                    $QryUpdateFleet .= "`fleet_target_owner` = '" . $user['id'] . "', ";
                    $QryUpdateFleet .= "`fleet_mess` = '1' ";
                    $QryUpdateFleet .= "WHERE ";
                    $QryUpdateFleet .= "`fleet_id` = '" . $fleetid . "';";
                    doquery($QryUpdateFleet, 'fleets');

                    $BoxTitle = $lang['fl_sback'];
                    $TxtColor = "lime";
                    $BoxMessage = $lang['fl_isback'];
                } elseif ($FleetRow['fleet_mess'] == 1) {
                    $BoxMessage = $lang['fl_notback'];
                }
            } else {
                $BoxMessage = $lang['fl_onlyyours'];
            }
        }

        message("<font color=\"" . $TxtColor . "\">" . $BoxMessage . "</font>", $BoxTitle, "fleet." . PHPEXT, 2);
    }

}
