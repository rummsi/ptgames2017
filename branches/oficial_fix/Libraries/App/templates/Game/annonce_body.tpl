{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>{if $action == 5}
            <p>Votre Annonce a bien &eacute;t&eacute; enregistr&eacute;e !</p>
            <br><p><a href="game.php?page=annonce">Retour aux annonces</a></p>{/if}{if $action != 5}
            <table width="600">
                <tr>
                    <td class="c" colspan="10"><font color="#FFFFFF">Petites Annonces</font></td>
                </tr>
                <tr>
                    <th colspan="3">Infos de livraison</th>
                    <th colspan="3">Ressources &agrave; vendre</th>
                    <th colspan="3">Ressources souhait&eacute;es</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <th>Vendeur</th>
                    <th>Galaxie</th>
                    <th>Syst&egrave;me</th>
                    <th>M&eacute;tal</th>
                    <th>Cristal</th>
                    <th>Deuterium</th>
                    <th>M&eacute;tal</th>
                    <th>Cristal</th>
                    <th>Deuterium</th>
                    <th>Delet</th>
                </tr>{while $b = mysqli_fetch_array($annonce)}
                <tr>
                    <th>{$b["user"]}</th>
                    <th>{$b["galaxie"]}</th>
                    <th>{$b["systeme"]}</th>
                    <th>{$b["metala"]}</th>
                    <th>{$b["cristala"]}</th>
                    <th>{$b["deuta"]}</th>
                    <th>{$b["metals"]}</th>
                    <th>{$b["cristals"]}</th>
                    <th>{$b["deuts"]}</th>
                    <th></th>
                </tr>{/while}
                <tr><th colspan="10" align="center"><a href="game.php?page=annonce2&action=2">Ajouter une Annonce</a></th></tr>
            </td>
            </table>{/if}
        </center>{/block}