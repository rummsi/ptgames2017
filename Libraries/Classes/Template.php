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
 * @Template.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  15/abr/2015 17:02:25
 */

require realpath(ROOT_PATH . 'Libraries/Smarty/libs/Smarty.class.php');

/**
 * Description of Template
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class Template extends Smarty {

    function __construct() {
        parent::__construct();
        $this->SmartySettings();
    }

    function SmartySettings() {
        $this->force_compile = TRUE;
        $this->caching = 0;
        $this->php_handling = Smarty::PHP_REMOVE;
        $this->debugging = TRUE;

        $this->setCompileDir('Libraries/App/templates_c/');
        $this->setTemplateDir('Libraries/App/templates/');
        $this->setCacheDir('Libraries/App/cache/');
        $this->setConfigDir('Libraries/App/configs/');
    }

}

$tplObj = new Template();
$tplObj->debugging = TRUE;
$tplObj->caching = TRUE;
$tplObj->cache_lifetime = 0;
