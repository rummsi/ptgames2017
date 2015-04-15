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
 * @HTTP.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  15/abr/2015 19:01:02
 */

/**
 * Description of HTTP
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class HTTP {

    static public function _GP($name, $default) {
        if (!isset($_REQUEST[$name])) {
            return $default;
        }

        if (is_int($default)) {
            return (int) $_REQUEST[$name];
        }

        if (is_float($default)) {
            return (float) $_REQUEST[$name];
        }

        if (is_string($default)) {
            $var = trim(htmlspecialchars(str_replace(array("\r\n", "\r", "\0"), array("\n", "\n", ''), $_REQUEST[$name]), ENT_QUOTES, 'UTF-8'));
            if (empty($var)) {
                return $default;
            }
            return $var;
        }

        if (is_array($default)) {
            return (array) $_REQUEST[$name];
        }
        return $default;
    }

}
