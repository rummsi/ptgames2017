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
 * ShowShipyardPage.php
 * @license http://www.gnu.org/licenses/gpl.html GNU GPLv3 License
 * @version 0.01  22/abr/2015 18:38:35
 */
require_once ROOT_PATH . 'includes/classes/Legacies/Empire/Shipyard.php';

/**
 * Description of ShowShipyardPage
 *
 * @author author XNovaPT Team <xnovaptteam@gmail.com>
 */
class ShowShipyardPage extends AbstractGamePage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'shipyard';
    }

    function show() {
        global $lang, $resource, $planetrow, $user, $dpath;
        includeLang('buildings');

        // Mise a jour de la liste de construction si necessaire
        UpdatePlanetBatimentQueueList($planetrow, $user);
        $IsWorking = HandleTechnologieBuild($planetrow, $user);

        // S'il n'y a pas de Chantier
        if (!isset($planetrow[$resource[Legacies_Empire::ID_BUILDING_SHIPYARD]]) || $planetrow[$resource[Legacies_Empire::ID_BUILDING_SHIPYARD]] == 0) {
            message($lang['need_hangar'], $lang['tech'][Legacies_Empire::ID_BUILDING_SHIPYARD]);
            return;
        }

        $shipyard = Legacies_Empire_Shipyard::factory($planetrow, $user);
        if (isset($_POST['fmenge']) && is_array($_POST['fmenge'])) {
            foreach ($_POST['fmenge'] as $shipId => $count) {
                $shipId = intval($shipId);
                if (in_array($shipId, $resource)) {
                    continue;
                }
                $count = intval($count);
                if ($count <= 0) {
                    continue;
                }

                if ($shipId == Legacies_Empire::ID_SHIP_DEATH_STAR && $user['rpg_destructeur'] == 1) { // FIXME: Officers
                    $count = $count * 2;
                }

                $shipyard->appendQueue($shipId, $count);
            }
            $planetrow = $shipyard->save();
        }

        // -------------------------------------------------------------------------------------------------------
        // Construction de la page du Chantier (car si j'arrive ici ... c'est que j'ai tout ce qu'il faut pour ...
        $tableIndex = 0;
        $types = include ROOT_PATH . 'includes/data/types.php';
        foreach ($types[Legacies_Empire::TYPE_SHIP] as $shipId) {
            if ($shipyard->checkAvailability($shipId)) {
                // Disponible à la construction
                // On regarde si on peut en acheter au moins 1
                $CanBuildOne = IsElementBuyable($user, $planetrow, $shipId, false);
                // On regarde combien de temps il faut pour construire l'element
                $BuildOneElementTime = $shipyard->getBuildTime($shipId, 1);
                // Disponibilité actuelle
                $shipIdCount = $planetrow[$resource[$shipId]];
                $shipIdNbre = ($shipIdCount == 0) ? "" : " (" . $lang['dispo'] . ": " . pretty_number($shipIdCount) . ")";
                $shipIdName = $lang['tech'][$shipId];
                // Construction des 3 cases de la ligne d'un element dans la page d'achat !
                // Début de ligne
                $PageTable = "\n<tr>";

                // Imagette + Link vers la page d'info
                $PageTable .= "<th class=l>";
                $PageTable .= "<a href=infos.php?gid=" . $shipId . ">";
                $PageTable .= "<img border=0 src=\"" . $dpath . "gebaeude/" . $shipId . ".gif\" align=top width=120 height=120></a>";
                $PageTable .= "</th>";

                // Description
                $PageTable .= "<td class=l>";
                $PageTable .= "<a href=infos.php?gid=" . $shipId . ">" . $shipIdName . "</a> " . $shipIdNbre . "<br />";
                $PageTable .= "" . $lang['res']['descriptions'][$shipId] . "<br />";
                // On affiche le 'prix' avec eventuellement ce qui manque en ressource
                $PageTable .= GetElementPrice($user, $planetrow, $shipId, false);
                // On affiche le temps de construction (c'est toujours tellement plus joli)
                $PageTable .= ShowBuildTime($BuildOneElementTime);
                $PageTable .= "</td>";

                // Case nombre d'elements a construire
                $PageTable .= "<th class=k>";
                // Si ... Et Seulement si je peux construire je mets la p'tite zone de saisie
                if ($CanBuildOne) {
                    $tableIndex++;
                    $PageTable .= "<input type=text id=\"fmenge:{$shipId}\" name=fmenge[" . $shipId . "] alt='" . $lang['tech'][$shipId] . "' value=0 tabindex=" . $tableIndex . ">";
                }

                $maxElements = $shipyard->getMaximumBuildableElementsCount($shipId);

                if (MAX_FLEET_OR_DEFS_PER_ROW > 0 && $maxElements > MAX_FLEET_OR_DEFS_PER_ROW) {
                    $maxElements = MAX_FLEET_OR_DEFS_PER_ROW;
                }

                if ($CanBuildOne) {
                    $PageTable .= '<br /><a onclick="document.getElementById(\'fmenge:' . $shipId . '\').value=\'' . strval($maxElements) . '\';" style="cursor:pointer;">Nombre max (' . number_format($maxElements, 0, ',', '.') . ')</a>';
                }

                // Fin de ligne (les 3 cases sont construites !!
                $PageTable .= "</tr>";
            }
        }

        if (!empty($planetrow['b_hangar_id'])) {
            $data = array();
            foreach ($shipyard->getQueue() as $item) {
                $data[] = array_merge($item, array(
                    'label' => $lang['tech'][$item['ship_id']],
                    'speed' => $shipyard->getBuildTime($item['ship_id'], 1)
                ));
            }
            $parse = array(
                'data' => json_encode($data)
            );
            $this->tplObj->assign(array('data' => json_encode($data)));
            $BuildQueue = $this->tplObj->fetch('buildings_script.tpl');
        }

        $this->tplObj->assign(array(
            'title' => $lang['Defense'],
            // La page se trouve dans $PageTable;
            'buildlist' => $PageTable,
            // Et la liste de constructions en cours dans $BuildQueue;
            'buildinglist' => $BuildQueue,
            'Construire' => $lang['Construire'],
        ));

        $this->render('buildings_fleet.tpl');
        Game::display($page, $lang['Fleet']);
    }

}
