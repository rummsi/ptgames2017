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
 * @ShowPlanetlayerPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  20/jul/2016 23:04:51
 */

/**
 * Description of ShowPlanetlayerPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowPlanetlayerPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'Planetlayer';
    }

    function show() {
        global $user, $lang, $planetrow;

        $_POST['deleteid'] = intval($_POST['deleteid']);
        $pl = mysqli_real_escape_string(Database::$dbHandle, isset($_GET['pl']) ? $_GET['pl'] : 0);

        includeLang('overview');

        // -----------------------------------------------------------------------------------------------
        if ($_POST['action'] == $lang['namer']) {
            // Reponse au changement de nom de la planete
            $UserPlanet = addslashes(CheckInputStrings($_POST['newname']));
            $newname = mysqli_real_escape_string(Database::$dbHandle, trim($UserPlanet));
            if ($newname != "") {
                // Deja on met jour la planete qu'on garde en memoire (pour le nom)
                $planetrow['name'] = $newname;
                // Ensuite, on enregistre dans la base de données
                doquery("UPDATE {{table}} SET `name` = '" . $newname . "' WHERE `id` = '" . $user['current_planet'] . "' LIMIT 1;", "planets");
                // Est ce qu'il sagit d'une lune ??
                if ($planetrow['planet_type'] == 3) {
                    // Oui ... alors y a plus qu'a changer son nom dans la table des lunes aussi !!!
                    doquery("UPDATE {{table}} SET `name` = '" . $newname . "' WHERE `galaxy` = '" . $planetrow['galaxy'] . "' AND `system` = '" . $planetrow['system'] . "' AND `lunapos` = '" . $planetrow['planet'] . "' LIMIT 1;", "lunas");
                }
            }
        } elseif ($_POST['action'] == $lang['colony_abandon']) {
            // Cas d'abandon d'une colonie
            // Affichage de la forme d'abandon de colonie
            $this->tplObj->assign(array(
                'planet_id' => $planetrow['id'],
                'galaxy_galaxy' => $planetrow['galaxy'],
                'galaxy_system' => $planetrow['system'],
                'galaxy_planet' => $planetrow['planet'],
                'planet_name' => $planetrow['name'],
            ));

            // On affiche la forme pour l'abandon de la colonie
            $this->tplObj->assign(array(
                'title' => $lang['ov_rena_dele'],
                'ov_rena_dele' => $lang['ov_rena_dele'],
                'security_query' => $lang['security_query'],
                'confirm_planet_delete' => $lang['confirm_planet_delete'],
                'confirmed_with_password' => $lang['confirmed_with_password'],
                'password' => $lang['password'],
                'deleteplanet' => $lang['deleteplanet'],
                'colony_abandon' => $lang['colony_abandon'],
            ));

            $this->render('overview_deleteplanet.tpl');
        } elseif ($_POST['kolonieloeschen'] == 1 && $_POST['deleteid'] == $user['current_planet']) {
            // Controle du mot de passe pour abandon de colonie
            if (md5($_POST['pw']) == $user["password"] && $user['id_planet'] != $user['current_planet']) {

                include_once(ROOT_PATH . 'includes/functions/AbandonColony.' . PHPEXT);
                if (CheckFleets($planetrow)) {
                    $strMessage = "Vous ne pouvez pas abandonner la colonie, il y a de la flotte en vol !";
                    message($strMessage, $lang['colony_abandon'], 'game.php?page=planetlayer', 3);
                }

                AbandonColony($user, $planetrow);
                doquery("UPDATE {{table}} SET `current_planet` = `id_planet` WHERE `id` = '" . $user['id'] . "' LIMIT 1", "users");
                // Tout s'est bien pass� ! La colo a �t� effac�e !!
                message($lang['deletemessage_ok'], $lang['colony_abandon'], 'game.php?page=overview', 3);
            } elseif ($user['id_planet'] == $user["current_planet"]) {
                // Et puis quoi encore ??? On ne peut pas effacer la planete mere ..
                // Uniquement les colonies cr�es apres coup !!!
                message($lang['deletemessage_wrong'], $lang['colony_abandon'], 'game.php?page=planetlayer');
            } else {
                // Erreur de saisie du mot de passe je n'efface pas !!!
                message($lang['deletemessage_fail'], $lang['colony_abandon'], 'game.php?page=planetlayer');
            }
        }

        $this->tplObj->assign(array(
            'planet_id' => $planetrow['id'],
            'galaxy_galaxy' => $planetrow['galaxy'],
            'galaxy_system' => $planetrow['system'],
            'galaxy_planet' => $planetrow['planet'],
            'planet_name' => $planetrow['name'],
        ));

        // On affiche la page permettant d'abandonner OU de renomme une Colonie / Planete
        $this->tplObj->assign(array(
            'title' => $lang['ov_rena_dele'],
            'rename_and_abandon_planet' => $lang['ov_rena_dele'],
            'your_planet' => $lang['your_planet'],
            'coords' => $lang['coords'],
            'name' => $lang['name'],
            'functions' => $lang['functions'],
            'colony_abandon' => $lang['colony_abandon'],
            'namer' => $lang['namer'],
        ));

        $this->render('overview_renameplanet.tpl');
    }

}
