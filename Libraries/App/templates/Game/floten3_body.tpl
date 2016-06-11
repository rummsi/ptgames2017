{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
        <br><div><center>
        <table border=\"0\" cellpadding=\"0\" cellspacing=\"1\" width=\"519\">
        <tr height=\"20\">
        <td class=\"c\" colspan=\"2\"><span class=\"success\">" . $lang['fl_fleet_send'] . "</span></td>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_mission'] . "</th>
        <th>" . $missiontype[$_POST['mission']] . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_dist'] . "</th>
        <th>" . pretty_number($distance) . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_speed'] . "</th>
        <th>" . pretty_number($_POST['speedallsmin']) . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_deute_need'] . "</th>
        <th>" . pretty_number($consumption) . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_from'] . "</th>
        <th>" . $_POST['thisgalaxy'] . ":" . $_POST['thissystem'] . ":" . $_POST['thisplanet'] . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_dest'] . "</th>
        <th>" . $_POST['galaxy'] . ":" . $_POST['system'] . ":" . $_POST['planet'] . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_time_go'] . "</th>
        <th>" . date("M D d H:i:s", $fleet['start_time']) . "</th>
        </tr><tr height=\"20\">
        <th>" . $lang['fl_time_back'] . "</th>
        <th>" . date("M D d H:i:s", $fleet['end_time']) . "</th>
        </tr><tr height=\"20\">
        <td class=\"c\" colspan=\"2\">" . $lang['fl_title'] . "</td>

        foreach ($fleetarray as $Ship => $Count) {
            </tr><tr height=\"20\">
            <th>" . $lang['tech'][$Ship] . "</th>
            <th>" . pretty_number($Count) . "</th>
        }
        </tr></table></div></center>
        </center>{/block}