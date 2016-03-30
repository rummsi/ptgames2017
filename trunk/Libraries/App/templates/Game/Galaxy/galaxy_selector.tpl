
                    <form action="game.php?page=galaxy&action=1" method="post" id="galaxy_form">
                        <input type="hidden" id="auto" value="dr" >
                        <table border="0">
                            <tbody>
                                <tr>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td class="c" colspan="3">{$lang_Galaxy}</td>
                                                </tr>
                                                <tr>
                                                    <td class="l">
                                                        <input name="galaxyLeft" value="&lt;-" onclick="galaxy_submit('galaxyLeft')" type="button">
                                                    </td>
                                                    <td class="l">
                                                        <input name="galaxy" value="{$Galaxy}" size="5" maxlength="3" tabindex="1" type="text">
                                                    </td>
                                                    <td class="l">
                                                        <input name="galaxyRight" value="-&gt;" onclick="galaxy_submit('galaxyRight')" type="button">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td class="c" colspan="3">{$lang_Solar_system}</td>
                                                </tr>
                                                <tr>
                                                    <td class="l">
                                                        <input name="systemLeft" value="&lt;-" onclick="galaxy_submit('systemLeft')" type="button">
                                                    </td>
                                                    <td class="l">
                                                        <input name="system" value="{$System}" size="5" maxlength="3" tabindex="2" type="text">
                                                    </td>
                                                    <td class="l">
                                                        <input name="systemRight" value="-&gt;" onclick="galaxy_submit('systemRight')" type="button">
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="l" colspan="2" align="center">
                                        <input value="{$lang_Afficher}" type="submit">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>