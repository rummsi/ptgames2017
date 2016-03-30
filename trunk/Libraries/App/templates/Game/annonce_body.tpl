{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <br>
            <table width="600">
                <tr>
                    <td class="c" colspan="10">
                        <font color="#FFFFFF">Petites Annonces</font>
                    </td>
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
                </tr>
                {$annonce_table}
                <tr>
                    <th colspan="10" align="center">
                        <a href="game.php?page=annonce&action=2">Ajouter une Annonce</a>
                    </th>
                </tr>
            </table>
        </center>
{/block}