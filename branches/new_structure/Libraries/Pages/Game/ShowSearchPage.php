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
 * @ShowsearchPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  16/mai/2015 15:57:15
 */

/**
 * Description of ShowsearchPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowSearchPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'search';
    }

    function show() {
        global $lang, $user, $dpath;

        includeLang('search');
        $type = @$_POST['type'];
        $i = 0;
        //creamos la query
        $searchtext = Database::$dbHandle->real_escape_string($_POST["searchtext"]);
        switch ($type) {
            case "playername":
                $table = 'search_user_table.tpl';
                $row = 'search_user_row.tpl';
                $search = doquery("SELECT * FROM {{table}} WHERE username LIKE '%{$searchtext}%' LIMIT 30;", "users");
                break;
            case "planetname":
                $table = 'search_user_table.tpl';
                $row = 'search_user_row.tpl';
                $search = doquery("SELECT * FROM {{table}} WHERE name LIKE '%{$searchtext}%' LIMIT 30", 'planets');
                break;
            case "allytag":
                $table = 'search_ally_table.tpl';
                $row = 'search_ally_row.tpl';
                $search = doquery("SELECT * FROM {{table}} WHERE ally_tag LIKE '%{$searchtext}%' LIMIT 30", "alliance");
                break;
            case "allyname":
                $table = 'search_ally_table.tpl';
                $row = 'search_ally_row.tpl';
                $search = doquery("SELECT * FROM {{table}} WHERE ally_name LIKE '%{$searchtext}%' LIMIT 30", "alliance");
                break;
            default:
                $table = 'search_user_table.tpl';
                $row = 'search_user_row.tpl';
                $search = doquery("SELECT * FROM {{table}} WHERE username LIKE '%{$searchtext}%' LIMIT 30", "users");
        }
        /*
          Esta es la tecnica de, "el ahorro de queries".
          Inventada por Perberos :3
          ...pero ahora no... porque tengo sueño ;P
         */
        if (isset($searchtext) && isset($type)) {
            $result_list = "";
            while ($r = $search->fetch_array()) {
                if ($type == 'playername' || $type == 'planetname') {
                    $s = $r;
                    //para obtener el nombre del planeta
                    if ($type == "planetname") {
                        $pquery = doquery("SELECT * FROM {{table}} WHERE id = {$s['id_owner']}", "users", true);
                        /* 			$farray = $pquery->fetch_array(); */
                        $this->tplObj->assign(array(
                            'planet_name' => $s['name'],
                            'username' => $pquery['username'],
                            'ally_name' => ($pquery['ally_name'] != '') ? "<a href=\"game.php?page=alliance&action=ainfo&tag={$pquery['ally_name']}\">{$pquery['ally_name']}</a>" : '',
                        ));
                    } else {
                        $pquery = doquery("SELECT name FROM {{table}} WHERE id = {$s['id_planet']}", "planets", true);
                        $this->tplObj->assign(array(
                            'username' => $s['username'],
                            'id' => $s['id'],
                            'planet_name' => $pquery['name'],
                            'ally_name' => ($s['ally_name'] != '') ? "<a href=\"game.php?page=alliance&action=ainfo&tag={$s['ally_name']}\">{$s['ally_name']}</a>" : '',
                        ));
                    }
                    //ahora la alianza
                    if ($s['ally_id'] != 0 && $s['ally_request'] == 0) {
                        $aquery = doquery("SELECT ally_name FROM {{table}} WHERE id = {$s['ally_id']}", "alliance", true);
                    } else {
                        $aquery = array();
                    }
                    $this->tplObj->assign(array(
                        'position' => "<a href=\"game.php?page=stat&start=" . @$s['rank'] . "\">" . @$s['rank'] . "</a>",
                        'dpath' => $dpath,
                        'coordinated' => "{$s['galaxy']}:{$s['system']}:{$s['planet']}",
                        'galaxy' => $s['galaxy'],
                        'system' => $s['system'],
                        'planet' => $s['planet'],
                        'buddy_request' => $lang['buddy_request'],
                        'write_a_messege' => $lang['write_a_messege'],
                    ));
                    $result_list .= $this->tplObj->fetch($row);
                } elseif ($type == 'allytag' || $type == 'allyname') {
                    $this->tplObj->assign(array(
                        'ally_members' => $r['ally_members'],
                        'ally_name' => $r['ally_name'],
                        'ally_points' => @pretty_number($r['ally_points']),
                        'ally_tag' => "<a href=\"game.php?page=alliance&action=ainfo&tag={$r['ally_tag']}\">{$r['ally_tag']}</a>",
                    ));
                    $result_list .= $this->tplObj->fetch($row);
                }
            }
            if ($result_list != '') {
                $this->tplObj->assign(array(
                    'Name' => $lang['Name'],
                    'Alliance' => $lang['Alliance'],
                    'Planet' => $lang['Planet'],
                    'Coordinated' => $lang['Coordinated'],
                    'Position' => $lang['Position'],
                    'Tag' => $lang['Tag'],
                    'Members' => $lang['Members'],
                    'Points' => $lang['Points'],
                    'result_list' => $result_list
                ));
                $search_results = $this->tplObj->fetch($table);
            }
        }
        //el resto...
        $this->tplObj->assign(array(
            'title' => $lang['Search'],
            'Search_in_all_game' => $lang['Search_in_all_game'],
            'type_playername' => (@$_POST["type"] == "playername") ? " SELECTED" : "",
            'Player_name' => $lang['Player_name'],
            'type_planetname' => (@$_POST["type"] == "planetname") ? " SELECTED" : "",
            'Planet_name' => $lang['Planet_name'],
            'type_allytag' => (@$_POST["type"] == "allytag") ? " SELECTED" : "",
            'Alliance_tag' => $lang['Alliance_tag'],
            'type_allyname' => (@$_POST["type"] == "allyname") ? " SELECTED" : "",
            'Alliance_name' => $lang['Alliance_name'],
            'searchtext' => $searchtext,
            'search_results' => @$search_results,
        ));
        //esto es algo repetitivo ... w
        $this->render('search_body.tpl');
    }

}
