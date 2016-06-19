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
 * @ShowStatPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  11/abr/2016 19:42:45
 */

/**
 * Description of ShowStatPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowStatPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'statistics';
    }

    function show() {
        global $lang, $user, $game_config, $dpath;

        includeLang('stat');

        $who = (isset($_POST['who'])) ? $_POST['who'] : $_GET['who'];
        if (!isset($who)) {
            $who = 1;
        }
        $type = (isset($_POST['type'])) ? $_POST['type'] : $_GET['type'];
        if (!isset($type)) {
            $type = 1;
        }
        $range = (isset($_POST['range'])) ? $_POST['range'] : $_GET['range'];
        if (!isset($range)) {
            $range = 1;
        }

        if ($type == 1) {
            $Order = "total_points";
            $Points = "total_points";
            $Counts = "total_count";
            $Rank = "total_rank";
            $OldRank = "total_old_rank";
        } elseif ($type == 2) {
            $Order = "fleet_points";
            $Points = "fleet_points";
            $Counts = "fleet_count";
            $Rank = "fleet_rank";
            $OldRank = "fleet_old_rank";
        } elseif ($type == 3) {
            $Order = "tech_count";
            $Points = "tech_points";
            $Counts = "tech_count";
            $Rank = "tech_rank";
            $OldRank = "tech_old_rank";
        } elseif ($type == 4) {
            $Order = "build_points";
            $Points = "build_points";
            $Counts = "build_count";
            $Rank = "build_rank";
            $OldRank = "build_old_rank";
        } elseif ($type == 5) {
            $Order = "defs_points";
            $Points = "defs_points";
            $Counts = "defs_count";
            $Rank = "defs_rank";
            $OldRank = "defs_old_rank";
        }

        if ($who == 2) {
            $this->tplObj->assign('lang', $lang);
            $MaxAllys = doquery("SELECT COUNT(*) AS `count` FROM {{table}} WHERE 1;", 'alliance', true);
            if ($MaxAllys['count'] > 100) {
                $LastPage = floor($MaxAllys['count'] / 100);
            }
            $parse['range'] = "";
            for ($Page = 0; $Page <= @$LastPage; $Page++) {
                $PageValue = ($Page * 100) + 1;
                $PageRange = $PageValue + 99;
                $parse['range'] .= "<option value=\"" . $PageValue . "\"" . (($range == $PageValue) ? " SELECTED" : "") . ">" . $PageValue . "-" . $PageRange . "</option>";
            }

            $parse['stat_header'] = $this->tplObj->fetch('stat_alliancetable_header.tpl');

            $start = floor($range / 100 % 100) * 100;
            $query = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '2' AND `stat_code` = '1' ORDER BY `" . $Order . "` DESC LIMIT " . $start . ",100;", 'statpoints');

            $start++;
            $parse['stat_values'] = "";
            while ($StatRow = mysqli_fetch_assoc($query)) {
                $parse['ally_rank'] = $start;

                $AllyRow = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $StatRow['id_owner'] . "';", 'alliance', true);

                $rank_old = $StatRow[$OldRank];
                if ($rank_old == 0) {
                    $rank_old = $start;
                    $QryUpdRank = doquery("UPDATE {{table}} SET `" . $Rank . "` = '" . $start . "', `" . $OldRank . "` = '" . $start . "' WHERE `stat_type` = '2' AND `stat_code` = '1' AND `id_owner` = '" . $StatRow['id_owner'] . "';", "statpoints");
                } else {
                    $QryUpdRank = doquery("UPDATE {{table}} SET `" . $Rank . "` = '" . $start . "' WHERE `stat_type` = '2' AND `stat_code` = '1' AND `id_owner` = '" . $StatRow['id_owner'] . "';", "statpoints");
                }
                $rank_new = $start;
                $ranking = $rank_old - $rank_new;
                if ($ranking == "0") {
                    $parse['ally_rankplus'] = "<font color=\"#87CEEB\">*</font>";
                }
                if ($ranking < "0") {
                    $parse['ally_rankplus'] = "<font color=\"red\">" . $ranking . "</font>";
                }
                if ($ranking > "0") {
                    $parse['ally_rankplus'] = "<font color=\"green\">+" . $ranking . "</font>";
                }

                $this->tplObj->assign(array(
                    'ally_tag' => $AllyRow['ally_tag'],
                    'ally_name' => $AllyRow['ally_name'],
                    'ally_mes' => '',
                    'ally_members' => $AllyRow['ally_members'],
                    'ally_points' => pretty_number($StatRow[$Order]),
                    'ally_members_points' => pretty_number(floor($StatRow[$Order] / $AllyRow['ally_members'])),
                    'ally_rank' => $start,
                    'ally_rankplus' => $parse['ally_rankplus'],
                ));
                $parse['stat_values'] .= $this->tplObj->fetch('stat_alliancetable.tpl');
                $start++;
            }
        } else {
            $this->tplObj->assign('lang', $lang);
            $MaxUsers = doquery("SELECT COUNT(*) AS `count` FROM {{table}} WHERE `db_deaktjava` = '0';", 'users', true);
            if ($MaxUsers['count'] > 100) {
                $LastPage = floor($MaxUsers['count'] / 100);
            }
            $parse['range'] = "";
            for ($Page = 0; $Page <= @$LastPage; $Page++) {
                $PageValue = ($Page * 100) + 1;
                $PageRange = $PageValue + 99;
                $parse['range'] .= "<option value=\"" . $PageValue . "\"" . ((@$start == $PageValue) ? " SELECTED" : "") . ">" . $PageValue . "-" . $PageRange . "</option>";
            }

            $parse['stat_header'] = $this->tplObj->fetch('stat_playertable_header.tpl');

            $start = floor($range / 100 % 100) * 100;
            $query = doquery("SELECT * FROM {{table}} WHERE `stat_type` = '1' AND `stat_code` = '1' ORDER BY `" . $Order . "` DESC LIMIT " . $start . ",100;", 'statpoints');

            $start++;
            $parse['stat_values'] = "";
            while ($StatRow = mysqli_fetch_assoc($query)) {

                $UsrRow = doquery("SELECT * FROM {{table}} WHERE `id` = '" . $StatRow['id_owner'] . "';", 'users', true);

                @$QryUpdateStats .= "`stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $TheRank['id_owner'] . "';";

                $rank_old = $StatRow[$OldRank];
                if ($rank_old == 0) {
                    $rank_old = $start;
                    $QryUpdRank = doquery("UPDATE {{table}} SET `" . $Rank . "` = '" . $start . "', `" . $OldRank . "` = '" . $start . "' WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $StatRow['id_owner'] . "';", "statpoints");
                } else {
                    $QryUpdRank = doquery("UPDATE {{table}} SET `" . $Rank . "` = '" . $start . "' WHERE `stat_type` = '1' AND `stat_code` = '1' AND `id_owner` = '" . $StatRow['id_owner'] . "';", "statpoints");
                }
                $rank_new = $start;
                $ranking = $rank_old - $rank_new;
                if ($ranking == "0") {
                    $parse['player_rankplus'] = "<font color=\"#87CEEB\">*</font>";
                }
                if ($ranking < "0") {
                    $parse['player_rankplus'] = "<font color=\"red\">" . $ranking . "</font>";
                }
                if ($ranking > "0") {
                    $parse['player_rankplus'] = "<font color=\"green\">+" . $ranking . "</font>";
                }
                if ($UsrRow['id'] == $user['id']) {
                    $parse['player_name'] = "<font color=\"lime\">" . $UsrRow['username'] . "</font>";
                } else {
                    $parse['player_name'] = $UsrRow['username'];
                }
                if ($UsrRow['ally_name'] == $user['ally_name']) {
                    $parse['player_alliance'] = "<font color=\"#33CCFF\">" . $UsrRow['ally_name'] . "</font>";
                } else {
                    $parse['player_alliance'] = $UsrRow['ally_name'];
                }

                $this->tplObj->assign(array(
                    'player_rank' => $start,
                    'player_rankplus' => $parse['player_rankplus'],
                    'player_name' => $parse['player_name'],
                    'player_mes' => "<a href=\"messages.php?mode=write&id=" . $UsrRow['id'] . "\"><img src=\"" . $dpath . "img/m.gif\" border=\"0\" alt=\"" . $lang['Ecrire'] . "\" /></a>",
                    'player_alliance' => $parse['player_alliance'],
                    'player_points' => pretty_number($StatRow[$Order]),
                ));

                $parse['stat_values'] .= $this->tplObj->fetch('stat_playertable.tpl');
                $start++;
            }
        }

        $this->tplObj->assign(array(
            'title' => $lang['stat_title'],
            'lang' => $lang,
            'stat_date' => date("d M Y - H:i:s", $StatRow['stat_date']),
            'who' => $who,
            'type' => $type,
            'range' => $parse['range'],
            'stat_header' => $parse['stat_header'],
            'stat_values' => $parse['stat_values'],
        ));
        $this->render('stat_body.tpl');
    }

}
