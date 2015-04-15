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
 * @AbstractIndexPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  15/abr/2015 17:02:03
 */

/**
 * Description of AbstractIndexPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class AbstractIndexPage {

    protected $tplObj;
    protected $window;
    public $defaultWindow = 'normal';

    function __construct() {
        $this->setWindow($this->defaultWindow);
        $this->initTemplate();
    }

    protected function setWindow($window) {
        $this->window = $window;
    }

    protected function initTemplate() {
        if (isset($this->tplObj)) {
            return true;
        }
        $this->tplObj = new Template();
        list($tplDir) = $this->tplObj->getTemplateDir();
        $this->tplObj->setTemplateDir($tplDir . 'Index/');
        return true;
    }

    protected function render($file) {
        global $langInfos, $game_config;
        if (defined('LOGIN')) {
            $this->tplObj->assign(array(
                'dpath' => "skins/xnova/",
            ));
        } else {
            $this->tplObj->assign(array(
                'dpath' => DEFAULT_SKINPATH,
            ));
        }

        $this->tplObj->assign(array(
            'encoding' => $langInfos['ENCODING'],
            'game_config' => $game_config,
        ));

        $this->tplObj->display('extends:layout.' . $this->getWindow() . '.tpl|' . $file);
        exit;
    }

    protected function getWindow() {
        return $this->window;
    }

    protected function getQueryString() {
        $queryString = array();
        $page = HTTP::_GP('page', '');
        if (!empty($page)) {
            $queryString['page'] = $page;
        }

        $mode = HTTP::_GP('mode', '');
        if (!empty($mode)) {
            $queryString['mode'] = $mode;
        }
        return http_build_query($queryString);
    }

    function getTemplate($templateName) {
        $filename = realpath(ROOT_PATH . '/Libraries/App/templates/Index') . "/{$templateName}";
        return ReadFromFile($filename);
    }

}
