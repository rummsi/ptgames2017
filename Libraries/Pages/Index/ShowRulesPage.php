<?php

/**
 * This file is part of XNova:Legacies
 *
 * @license http://www.gnu.org/licenses/gpl-3.0.txt
 * @see http://www.xnova-ng.org/
 *
 * Copyright (c) 2009-Present, XNova Support Team <http://www.xnova-ng.org>
 * All rights reserved.
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
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *                                --> NOTICE <--
 *  This file is part of the core development branch, changing its contents will
 * make you unable to use the automatic updates manager. Please refer to the
 * documentation for further information about customizing XNova.
 *
 */
class ShowRulesPage extends AbstractIndexPage {

    function __construct() {
        parent::__construct();
        $this->tplObj->compile_id = 'rules';
    }

    function show() {
        global $lang, $game_config;
        includeLang('rules');

        $this->tplObj->assign(array(
            'title' => $lang['rules'],
            'rules' => $lang['rules'],
            'servername' => $game_config['game_name'],
            'respectrules' => $lang['respectrules'],
            'Account' => $lang['Account'],
            'MultiAccount' => $lang['MultiAccount'],
            'Sitting' => $lang['Sitting'],
            'Trade' => $lang['Trade'],
            'Bash' => $lang['Bash'],
            'Push' => $lang['Push'],
            'Bugusing' => $lang['Bugusing'],
            'MailIngame' => $lang['MailIngame'],
            'OutXnova' => $lang['OutXnova'],
            'Spam' => $lang['Spam'],
            'AccountText' => $lang['AccountText'],
            'AccountText2' => $lang['AccountText2'],
            'MultiAccountText' => $lang['MultiAccountText'],
            'MultiAccountText2' => $lang['MultiAccountText2'],
            'MultiAccountText3' => $lang['MultiAccountText3'],
            'SittingText' => $lang['rules'],
            'SittingText2' => $lang['SittingText2'],
            'SittingText3' => $lang['SittingText3'],
            'SittingText4' => $lang['SittingText4'],
            'SittingText5' => $lang['SittingText5'],
            'SittingText6' => $lang['SittingText6'],
            'SittingText7' => $lang['SittingText7'],
            'SittingText8' => $lang['SittingText8'],
            'SittingText9' => $lang['SittingText9'],
            'SittingText10' => $lang['SittingText10'],
            'SittingText11' => $lang['SittingText11'],
            'SittingText12' => $lang['SittingText12'],
            'SittingText13' => $lang['SittingText13'],
            'SittingText14' => $lang['SittingText14'],
            'SittingText15' => $lang['SittingText15'],
            'TradeText' => $lang['TradeText'],
            'TradeText2' => $lang['TradeText2'],
            'BashText' => $lang['BashText'],
            'BashText2' => $lang['BashText2'],
            'exception' => $lang['exception'],
            'BashExepText' => $lang['BashExepText'],
            'BashExepText2' => $lang['BashExepText2'],
            'BashExepText3' => $lang['BashExepText3'],
            'PushText' => $lang['PushText'],
            'PushText2' => $lang['PushText2'],
            'PushText3' => $lang['PushText3'],
            'PushText4' => $lang['PushText4'],
            'PushText5' => $lang['PushText5'],
            'exemple' => $lang['exemple'],
            'PushEx' => $lang['PushEx'],
            'PushEx2' => $lang['PushEx2'],
            'recyclage' => $lang['recyclage'],
            'PushRec' => $lang['PushRec'],
            'mercenariat' => $lang['mercenariat'],
            'PushMer' => $lang['PushMer'],
            'PushMer2' => $lang['PushMer2'],
            'BugusingText' => $lang['BugusingText'],
            'BugusingText2' => $lang['BugusingText2'],
            'BugusingText3' => $lang['BugusingText3'],
            'BugusingText4' => $lang['BugusingText4'],
            'MailIngameText' => $lang['MailIngameText'],
            'OutText' => $lang['OutText'],
            'SpamText' => $lang['SpamText'],
        ));

        $this->render('rules_body.tpl');
    }

}
