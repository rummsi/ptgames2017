
                <tr>
                    <td class=c></td>
                    <td class=c>{$lang['User']}</td>
                    <td class=c>{$lang['Alliance']}</td>
                    <td class=c>{$lang['Coordinates']}</td>
                    <td class=c>{$lang['Text']}</td>
                    <td class=c></td>
		</tr>
	<tr>
		<th width=20>" . $i . "</th>
		<th><a href=game.php?page=messages&mode=write&id=" . $u["id"] . ">" . $u["username"] . "</a></th>
		<th>{$UserAlly}</th>
		<th><a href=\"game.php?page=galaxy&mode=3&galaxy=" . $u["galaxy"] . "&system=" . $u["system"] . "\">" . $u["galaxy"] . ":" . $u["system"] . ":" . $u["planet"] . "</a></th>
		<th>{$LastOnline}</th>
		<th>{$UserCommand}</th>
	</tr>