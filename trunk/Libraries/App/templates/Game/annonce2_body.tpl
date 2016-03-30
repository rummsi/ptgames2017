{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br>
            <table width="600">
                <tr>
                    <td class="c" colspan="10" align="center">
                        <b><font color="white">Ajouter une Annonce</font></b>
                    </td>
                </tr>
                <tr>
                    <td class="c" colspan="10" align="center">
                        <b>Ressources &agrave; Vendre</font></b>
                    </td>
                </tr>
                <form action="game.php?page=annonce&action=5" method="post">
                    <tr>
                        <th colspan="5">M&eacute;tal</th>
                        <th colspan="5">
                            <input type="texte" value="0" name="metalvendre" />
                        </th>
                    </tr>
                    <tr>
                        <th colspan="5">Cristal</th>
                        <th colspan="5">
                            <input type="texte" value="0" name="cristalvendre" />
                        </th>
                    </tr>
                    <tr>
                        <th colspan="5">Deuterium</th>
                        <th colspan="5">
                            <input type="texte" value="0" name="deutvendre" />
                        </th>
                    </tr>
                    <tr>
                        <td class="c" colspan="10" align="center">
                            <b>Ressources Souhait&eacute;es</font></b>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="5">M&eacute;tal</th>
                        <th colspan="5">
                            <input type="texte" value="0" name="metalsouhait" />
                        </th>
                    </tr>
                    <tr>
                        <th colspan="5">Cristal</th>
                        <th colspan="5">
                            <input type="texte" value="0" name="cristalsouhait" />
                        </th>
                    </tr>
                    <tr>
                        <th colspan="5">Deuterium</th>
                        <th colspan="5">
                            <input type="texte" value="0" name="deutsouhait" />
                        </th>
                    </tr>
                    <tr>
                        <th colspan="10">
                            <input type="submit" value="Envoyer" />
                        </th>
                    </tr>
                </form>
            </table>
        </center>
{/block}