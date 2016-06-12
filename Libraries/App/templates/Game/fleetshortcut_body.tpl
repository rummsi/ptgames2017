{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>{if isset($mode)}
            <form method=POST>
                <table border=0 cellpadding=0 cellspacing=1 width=519>
                    <tr height=20>
                        <td colspan=2 class=c>Nom [Galaxie/Syst&egrave;me solaire/Plan&egrave;te]</td>
                    </tr>
                    <tr height="20">
                        <th>
                            <input type=text name=n value="{$_POST['n']}" size=32 maxlength=32 title="Name">
                            <input type=text name=g value="{$_POST['g']}" size=3 maxlength=1 title="Galaxie">
                            <input type=text name=s value="{$_POST['s']}" size=3 maxlength=3 title="Sonnensystem">
                            <input type=text name=p value="{$_POST['p']}" size=3 maxlength=3 title="Planet">
                             <select name=t>
                                <option value="1"{(($c[4] == 1) ? " SELECTED" : "")}>Plan&egrave;te</option>
                                <option value="2"{(($c[4] == 2) ? " SELECTED" : "")}>D&eacute;bris</option>
                                <option value="3"{(($c[4] == 3) ? " SELECTED" : "")}>Lune</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th><input type="reset" value="Zur&uuml;cksetzen"> <input type="submit" value="Enregistrer">
                        {*//Muestra un (L) si el destino pertenece a luna, lo mismo para escombros*}
                        </th>
                    </tr>
                    <tr><td colspan=2 class=c><a href=game.php?page=fleetshortcut>Effacer</a></td></tr>
                </table>
            </form>
            {elseif isset($a)}{if $user['fleet_shortcut']}<!--{$scarray = explode("\r\n", $user['fleet_shortcut'])}{$c = explode(',', $scarray[$a])}-->
            <form method=POST>
                <table border=0 cellpadding=0 cellspacing=1 width=519>
                    <tr height=20><td colspan=2 class=c>Editer: {$c[0]} [{$c[1]}:{$c[2]}:{$c[3]}]</td></tr>
                    {*//if($i==0){";}*}
                    <tr height="20">
                        <th>
                            <input type=hidden name=a value=$a>
                            <input type=text name=n value="{$c[0]}" size=32 maxlength=32>
                            <input type=text name=g value="{$c[1]}" size=3 maxlength=1>
                            <input type=text name=s value="{$c[2]}" size=3 maxlength=3>
                            <input type=text name=p value="{$c[3]}" size=3 maxlength=3>
                            <select name=t>
                                <option value="1"{(($c[4] == 1) ? " SELECTED" : "")}>Plan&egrave;te</option>
                                <option value="2"{(($c[4] == 2) ? " SELECTED" : "")}>D&eacute;bris</option>
                                <option value="3"{(($c[4] == 3) ? " SELECTED" : "")}>Lune</option>
                            </select>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <input type=reset value="Reset">
                            <input type=submit value="Enregistrer">
                            <input type=submit name=delete value="Supprimer">
                        </th>
                    </tr>
            {else}
                {message("Le raccourcis a &eacute;t&eacute; enregistr&eacute; !", "Enregistrer", "game.php?page=fleetshortcut")}
            {/if}
                    <tr><td colspan=2 class=c><a href=game.php?page=fleetshortcut>Retour</a></td></tr></tr>
                </table>
            </form> 
            {else}
            <table border="0" cellpadding="0" cellspacing="1" width="519">
                <tr height="20">
                    <td colspan="2" class="c">Raccourcis(<a href="game.php?page=fleetshortcut&action=add">Ajout</a>)</td>
                </tr>{if $user['fleet_shortcut']}{*/*  Dentro de fleet_shortcut, se pueden almacenar las diferentes direcciones  de acceso directo, el formato es el siguiente.  Nombre, Galaxia,Sistema,Planeta,Tipo */*}<!--{$scarray = explode("\r\n", $user['fleet_shortcut'])}{$i = 0}{$e = 0}-->{foreach $scarray as $a => $b}{if $b != ""}<!--{$c = explode(',', $b)}-->{if ($i == 0)}
                <tr height="20">{/if}
                    <th>
                        <a href="game.php?page=fleetshortcut&a={$e++}">
                            {$c[0]} {$c[1]}:{$c[2]}:{$c[3]}
                            {*//Muestra un (L) si el destino pertenece a luna, lo mismo para escombros*}{if $c[4] == 2} (E){elseif ($c[4] == 3)} (L){/if}
                        </a>
                    </th>{if ($i == 1)}
                </tr>{/if}{if $i == 1}<!--{$i = 0}-->{else}<!--{$i = 1}-->{/if}{/if}{/foreach}{if $i == 1}
                <th></th>
                <tr>{/if}{else}
                    <th colspan="2">Pas de Raccourcis</th>{/if}
                    <tr><td colspan=2 class=c><a href=game.php?page=fleet>Retour</a></td></tr>
                </tr>
            </table>{/if}
        </center>{/block}