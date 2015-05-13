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
 * @ShowTechtreePage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  13/mai/2015 17:59:07
 */

/**
 * Description of ShowTechtreePage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowTechtreePage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'techtree';
    }

    function show() {
        global $lang, $resource, $requirements, $planetrow, $user;

        $HeadTpl = gettemplate('techtree_head');
        $RowTpl = gettemplate('techtree_row');
        foreach ($lang['tech'] as $Element => $ElementName) {
            $parse = array();
            $parse['tt_name'] = $ElementName;
            if (!isset($resource[$Element])) {
                $parse['Requirements'] = $lang['Requirements'];
                $page .= parsetemplate($HeadTpl, $parse);
            } else {
                if (isset($requirements[$Element])) {
                    $parse['required_list'] = "";
                    foreach ($requirements[$Element] as $ResClass => $Level) {
                        if (isset($user[$resource[$ResClass]]) &&
                                $user[$resource[$ResClass]] >= $Level) {
                            $parse['required_list'] .= "<font color=\"#00ff00\">";
                        } elseif (isset($planetrow[$resource[$ResClass]]) &&
                                $planetrow[$resource[$ResClass]] >= $Level) {
                            $parse['required_list'] .= "<font color=\"#00ff00\">";
                        } else {
                            $parse['required_list'] .= "<font color=\"#ff0000\">";
                        }
                        $parse['required_list'] .= $lang['tech'][$ResClass] . " (" . $lang['level'] . " " . $Level . ")";
                        $parse['required_list'] .= "</font><br>";
                    }
                    $parse['tt_detail'] = "<a href=\"game.php?page=techdetails&techid=" . $Element . "\">" . $lang['treeinfo'] . "</a>";
                } else {
                    $parse['required_list'] = "";
                    $parse['tt_detail'] = "";
                }
                $parse['tt_info'] = $Element;
                $page .= parsetemplate($RowTpl, $parse);
            }
        }

        $parse['techtree_list'] = $page;
        $page = parsetemplate(gettemplate('techtree_body'), $parse);

        Game::display($page, $lang['Tech']);

// -----------------------------------------------------------------------------------------------------------
// History version
// - 1.0 mise en conformité code avec skin XNova
// - 1.1 ajout lien pour les details des technos
// - 1.2 suppression du lien details ou il n'est pas necessaire
    }

}
