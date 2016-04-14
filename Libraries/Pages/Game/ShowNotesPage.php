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
 * @ShowNotesPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  14/abr/2016 21:53:07
 */

/**
 * Description of ShowNotesPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowNotesPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'notes';
    }

    function show() {
        global $lang, $user;

        define('NO_MENU', true);

        $dpath = (!$user["dpath"]) ? DEFAULT_SKINPATH : $user["dpath"];

        $a = $_GET['a'];
        $n = intval($_GET['n']);
        $lang['Please_Wait'] = "Patientez...";

        //lenguaje
        includeLang('notes');

        $lang['PHP_SELF'] = 'game.php?page=notes';

        if ($_POST["s"] == 1 || $_POST["s"] == 2) {//Edicion y agregar notas
            $time = time();
            $priority = $_POST["u"];
            $title = ($_POST["title"]) ? mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST["title"])) : $lang['NoTitle'];
            $text = ($_POST["text"]) ? mysqli_real_escape_string(Database::$dbHandle, strip_tags($_POST["text"])) : $lang['NoText'];

            if ($_POST["s"] == 1) {
                doquery("INSERT INTO {{table}} SET owner={$user['id']}, time=$time, priority=$priority, title='$title', text='$text'", "notes");
                message($lang['NoteAdded'], $lang['Please_Wait'], 'game.php?page=notes', "3");
            } elseif ($_POST["s"] == 2) {
                /*
                  pequeño query para averiguar si la nota que se edita es del propio jugador
                 */
                $id = intval($_POST["n"]);
                $note_query = doquery("SELECT * FROM {{table}} WHERE id=$id AND owner=" . $user["id"], "notes");

                if (!$note_query) {
                    error($lang['notpossiblethisway'], $lang['Notes']);
                }

                doquery("UPDATE {{table}} SET time=$time, priority=$priority, title='$title', text='$text' WHERE id=$id", "notes");
                message($lang['NoteUpdated'], $lang['Please_Wait'], 'game.php?page=notes', "3");
            }
        } elseif ($_POST) {//Borrar
            foreach ($_POST as $a => $b) {
                /*
                  Los checkbox marcados tienen la palabra delmes seguido del id.
                  Y cada array contiene el valor "y" para compro
                 */
                if (preg_match("/delmes/i", $a) && $b == "y") {

                    $id = str_replace("delmes", "", $a);
                    $note_query = doquery("SELECT * FROM {{table}} WHERE id=$id AND owner={$user['id']}", "notes");
                    //comprobamos,
                    if ($note_query) {
                        $deleted++;
                        doquery("DELETE FROM {{table}} WHERE `id`=$id;", "notes"); // y borramos
                    }
                }
            }
            if ($deleted) {
                $mes = ($deleted == 1) ? $lang['NoteDeleted'] : $lang['NoteDeleteds'];
                message($mes, $lang['Please_Wait'], 'game.php?page=notes', "3");
            } else {
                header("Location: game.php?page=notes");
            }
        } else {//sin post...
            if ($_GET["a"] == 1) {//crear una nueva nota.
                /*
                  Formulario para crear una nueva nota.
                 */

                $parse = $lang;

                $parse['c_Options'] = "<option value=2 selected=selected>{$lang['Important']}</option>
			  <option value=1>{$lang['Normal']}</option>
			  <option value=0>{$lang['Unimportant']}</option>";

                $parse['cntChars'] = '0';
                $parse['TITLE'] = $lang['Createnote'];
                $parse['text'] = '';
                $parse['title'] = '';
                $parse['inputs'] = '<input type=hidden name=s value=1>';

                $page .= parsetemplate(gettemplate('notes_form'), $parse);

                display($page, $lang['Notes'], false);
            } elseif ($_GET["a"] == 2) {//editar
                /*
                  Formulario donde se puestra la nota y se puede editar.
                 */
                $note = doquery("SELECT * FROM {{table}} WHERE owner={$user['id']} AND id=$n", 'notes', true);

                if (!$note) {
                    message($lang['notpossiblethisway'], $lang['Error']);
                }

                $cntChars = strlen($note['text']);

                $SELECTED[$note['priority']] = ' selected="selected"';

                $parse = array_merge($note, $lang);

                $parse['c_Options'] = "<option value=2{$SELECTED[2]}>{$lang['Important']}</option>
			  <option value=1{$SELECTED[1]}>{$lang['Normal']}</option>
			  <option value=0{$SELECTED[0]}>{$lang['Unimportant']}</option>";

                $parse['cntChars'] = $cntChars;
                $parse['TITLE'] = $lang['Editnote'];
                $parse['inputs'] = '<input type=hidden name=s value=2><input type=hidden name=n value=' . $note['id'] . '>';

                $page .= parsetemplate(gettemplate('notes_form'), $parse);

                display($page, $lang['Notes'], false);
            } else {//default
                $notes_query = doquery("SELECT * FROM {{table}} WHERE owner={$user['id']} ORDER BY time DESC", 'notes');
                //Loop para crear la lista de notas que el jugador tiene
                $count = 0;
                $parse = $lang;
                while ($note = mysqli_fetch_array($notes_query)) {
                    $count++;
                    //Colorea el titulo dependiendo de la prioridad
                    if ($note["priority"] == 0) {
                        $parse['NOTE_COLOR'] = "lime";
                    }//Importante
                    elseif ($note["priority"] == 1) {
                        $parse['NOTE_COLOR'] = "yellow";
                    }//Normal
                    elseif ($note["priority"] == 2) {
                        $parse['NOTE_COLOR'] = "red";
                    }//Sin importancia
                    //fragmento de template
                    $parse['NOTE_ID'] = $note['id'];
                    $parse['NOTE_TIME'] = date("Y-m-d h:i:s", $note["time"]);
                    $parse['NOTE_TITLE'] = $note['title'];
                    $parse['NOTE_TEXT'] = strlen($note['text']);

                    $list .= parsetemplate(gettemplate('notes_body_entry'), $parse);
                }

                if ($count == 0) {
                    $list .= "<tr><th colspan=4>{$lang['ThereIsNoNote']}</th>\n";
                }

                $parse = $lang;
                $parse['BODY_LIST'] = $list;
                //fragmento de template
                $page .= parsetemplate(gettemplate('notes_body'), $parse);

                display($page, $lang['Notes'], false);
            }
        }
    }

}
