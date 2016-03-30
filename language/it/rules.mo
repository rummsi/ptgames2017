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

$lang['respectrules'] = 'Queste regole devono essere rispettate, ogni violazione di tali norme è verrè punita con il ban temporaneo o permanente !';
$lang['rules']        = 'Regolamento';

$lang['Account']      = 'I.    Account';
$lang['MultiAccount'] = 'II.   Multiaccount';
$lang['Sitting']      = 'III.  Controllo account da terzi (Sitting)';
$lang['Trade']        = 'IV.   Scambio di account';
$lang['Bash']         = 'V.    Bashing';
$lang['Push']         = 'VI.   Pushing';
$lang['Bugusing']     = 'VII.  Bugusing';
$lang['MailIngame']   = 'VIII. L'abuso della funzione di segnalazione dei messaggi ingame';
$lang['OutXnova']     = 'IX.   Minacce al di fuori del campo di applicazione del server';
$lang['Spam']         = 'X.    Spam, insulti e contenuti offensivi';

$lang['AccountText']  = 'Un giocatore può giocare solo su un account per universo.';
$lang['AccountText2'] = 'Un account deve essere gestito da una sola persona.';

$lang['MultiAccountText']  = 'Giocare più di un account per ogni universo è severamente vietato.';
$lang['MultiAccountText2'] = 'Se due o più giocatori condividono lo stesso indirizzo IP (membri di una stessa famiglia, coppie, scuole, ecc), non deve esistere alcun altro punto in comune tra questi account (partecipare alla stessa alleanza è tollerato),altrimenti  pu&oacuta; essere considerato come account multiplo e rischia il blocco.';
$lang['MultiAccountText3'] = 'Sone vietate tutte le iterazioni tra contatti con lo stesso IP.';

$lang['SittingText']  = 'Il sitting di un account è subordinata al rispetto delle seguenti regole:';
$lang['SittingText2'] = 'Un account pu&oacuta; essere condiviso per intervalli di 12 ore consecutive.';
$lang['SittingText3'] = 'Un operatore dell\'universo deve essere avvisato in anticipo';
$lang['SittingText4'] = 'Il trasferimento di risorse da altri pianeti o lune nel account in sitting è severamente vietato.';
$lang['SittingText5'] = 'Prima che il conto può essere cancellato, è necessario il login per l\'account del proprietario.';
$lang['SittingText6'] = 'Le sitting suivant ne peut avoir lieu que 7 jours après le login du propriétaire du compte.';
$lang['SittingText7'] = 'Un compte ne peut changer de propriétaire que tous les 3 mois (sans exception aucune possible !).';
$lang['SittingText8'] = 'Le surveillant du compte ne peut sitter un compte sur cet univers dans les 7 jours qui suivent un sitting.';
$lang['SittingText9'] = 'Le sitting ne doit pas être utilisé pour se procurer un avantage (par ex. utiliser une phalange ou la flotte).';
$lang['SittingText10'] = 'Ce qui est strictement interdit:';
$lang['SittingText11'] = 'Aucun mouvement de flotte n\'est autorisé pendant que le compte est sitté (aucune flotte ne doit être en vol à ce moment là). Cependant, si une flotte est en train de se faire attquer, il est permis de l\'envoyer en mode "Transport" ou "Stationner" vers une autre planète ou lune de ce compte pour esquiver l\'attaque.';
$lang['SittingText12'] = 'Le sitting de compte est interdit pendant les trois premières semaines à compter de la date de démarrage d\'un univers.';
$lang['SittingText13'] = 'Pendant un sitting, seul le sitteur est autorisé à se logger.';
$lang['SittingText14'] = 'Il est interdit de se faire sitter par plusieurs joueurs pendant la période de 12 heures.';
$lang['SittingText15'] = 'Il est interdit de sitter un autre compte.';

$lang['TradeText'] = 'Un compte appartient à la personne à qui appartient l\'adresse permanente qui lui est associé. Si un échange de comptes a lieu sans passer par un opérateur d\'univers, ceci s\'effectue aux risques et périls des propriétaires respectifs, aucune plainte ou demande ne sera traitée si elle ne provient pas de l\'adresse mail permanente du compte concerné.';
$lang['TradeText2'] = 'Les opérateurs de jeu ont non seulement la possibilité d\'effectuer très facilement un échange de comptes, ils peuvent aussi par ce moyen empêcher que le compte soit volé au cours de l\'échange.';

$lang['BashText'] = 'Attaquer une planète ou une lune plus de 6 fois en l\'espace de 24 heures consécutives est considéré comme du bash et par conséquent interdit.';
$lang['BashText2'] = 'Attaquer une lune en mode "Destruction" compte dans le cadre de cette limite de 6 attaques.';
$lang['exception'] = 'Exceptions:';
$lang['BashExepText'] = 'Le bash n\'est autorisé que si les alliances impliquées sont en guerre (cette guerre doit être déclarée dans la section correspondante du forum officiel).';
$lang['BashExepText2'] = 'Les flottes attaquantes complètement détruites lors d\'une attaque et les combats interrompus au bout d\'un tour par le bug du match nul ne sont pas prises en compte dans le calcul des 6 attaques.';
$lang['BashExepText3'] = 'Les attaques par missiles interplanétaires ne sont pas limitées et ne sont pas prises en compte dans le calcul des 6 attaques.';

$lang['PushText'] = 'Le push se définit par le transfert volontaire de ressources sous quelque forme que ce soit d\'un joueur vers un joueur mieux classé que lui sans aucune contrepartie. Ceci est aussi valable lorsqu\'un joueur mieux classé vous fait du chantage.';
$lang['PushText2'] = 'Contrairement au bash, il n\'y a aucune exception où le push est autorisé:';
$lang['PushText3'] = 'Si un joueur plus faible que vous vous envoie des ressources sans que vous ne lui ayez rien demandé, veuillez lui renvoyer ou l\'envoyer à un des opérateurs de jeu. Vous ne pouvez pas garder ces ressources!';
$lang['PushText4'] = 'Le chantage n\'est pas autorisé.';
$lang['PushText5'] = 'Les échanges de ressources doivent être exécutés sous 48 heures.';
$lang['exemple'] = 'Exemples (les infractions ne se limitent pas aux cas cités ci-dessous):';
$lang['PushEx'] = 'Un joueur envoie des ressources à un joueur mieux classé que lui.';
$lang['PushEx2'] = 'Une flotte suicide envoyée vers un joueur plus fort dans le seul but que ce dernier puisse recycler le champ de débris.';
$lang['PushEx3'] = 'Transporter des ressources vers une planète pour les mettre à disposition d\'une attaque d\'un joueur plus fort informé de cette manoeuvre.';
$lang['recyclage'] = 'Aide au recyclage:';
$lang['PushRec'] = 'Après avoir aidé un joueur à collecter un champ de débris, vous êtes autorisé à transférer ces ressources au joueur attaquant mieux classé, cet envoi devant être obligatoirement accompagné d\'un mail d\'information à votre opérateur d\'univers.';
$lang['mercenariat'] = 'Mercenariats:';
$lang['PushMer'] = 'Les mercenariats doivent être déclarés sur le forum officiel dans la section correspondante pour être approuvés. Les mercenariats non déclarés sont passibles de bannissement pour push.';
$lang['PushMer2'] = 'La récompense ne peut-être versée que lorsque la cible a été détruite.';

$lang['BugusingText'] = 'Utiliser un bug à son avantage est strictement interdit.';
$lang['BugusingText2'] = 'Un joueur qui trouve un bug est prié de le signaler immédiatement au staff (par ex. via le forum, l\'IRC ou les mails).';
$lang['BugusingText3'] = 'Ne pas signaler un bug trouvé est passible de bannissement.';
$lang['BugusingText4'] = 'Toute méthode de jeu visant à rendre le compte d\'un adversaire lent ou injouable est absolument interdite.';

$lang['MailIngameText'] = 'Utiliser le bouton Signaler pour signaler un message qui ne contient pas d\'insultes ou qui n\'enfreint pas les règles du jeu est interdit.';

$lang['OutText']        = 'Il est interdit de menacer quelqu\'un de conséquences dans la vie réelle, ceci étant valable pour le jeu, le forum et l\'IRC.';

$lang['SpamText']       = 'Le spam, les insultes et les messages à contenus offensants sont interdits, de même que tout contenu xénophobe, antisémite ou raciste.';

//Text & design by XxmangaxX

?>