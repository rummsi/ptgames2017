{block name="title" prepend}{/block}
{block name="content"}        <center>
            <br>
            <table width="590">
                <tbody>
                    <tr>
                        <td width="199" class="c">{$lang['rec_build']}</td>
                        <td width="203" class="c">{$lang['rec_playe']}</td>
                        <td width="172" class="c">{$lang['rec_level']}</td>
                    </tr>{foreach $lang['tech'] as $element => $elementName}{if !empty($elementName) && !empty($resource[$element])}{if ($element >= 0 && $element < 40 || $element == 44)}
                    <tr>
                        <th width="199" class="c">{$elementName}</th>
                        <th width="203" class="c">{if !empty($record['players'])}{$record['players']}{else}-{/if}</th>
                        <th width="172" class="c">{intval($record['level'])}</th>
                    </tr>
                    {/if}{/if}{/foreach}
                    <tr>
                        <td width="199" class="c">{$lang['rec_specb']}</td>
                        <td width="203" class="c">{$lang['rec_playe']}</td>
                        <td width="172" class="c">{$lang['rec_level']}</td>
                    </tr>{foreach $lang['tech'] as $element => $elementName}{if !empty($elementName) && !empty($resource[$element])}{if ($element >= 40 && $element < 100 && $element != 44)}
                    <tr>
                        <th width="199" class="c">{$elementName}</th>
                        <th width="203" class="c">{if !empty($record['players'])}{$record['players']}{else}-{/if}</th>
                        <th width="172" class="c">{intval($record['level'])}</th>
                    </tr>
                    {/if}{/if}{/foreach}
                    <tr>
                        <td width="199" class="c">{$lang['rec_techn']}</td>
                        <td width="203" class="c">{$lang['rec_playe']}</td>
                        <td width="172" class="c">{$lang['rec_level']}</td>
                    </tr>{foreach $lang['tech'] as $element => $elementName}{if !empty($elementName) && !empty($resource[$element])}{if ($element >= 100 && $element < 200)}
                    <tr>
                        <th width="199" class="c">{$elementName}</th>
                        <th width="203" class="c">{if !empty($record1['players'])}{$record1['players']}{else}-{/if}</th>
                        <th width="172" class="c">{intval($record1['level'])}</th>
                    </tr>
                    {/if}{/if}{/foreach}
                    <tr>
                        <td width="199" class="c">{$lang['rec_fleet']}</td>
                        <td width="203" class="c">{$lang['rec_playe']}</td>
                        <td width="172" class="c">{$lang['rec_nbre']}</td>
                    </tr>{foreach $lang['tech'] as $element => $elementName}{if !empty($elementName) && !empty($resource[$element])}{if ($element >= 200 && $element < 400)}
                    <tr>
                        <th width="199" class="c">{$elementName}</th>
                        <th width="203" class="c">{if !empty($record['players'])}{$record['players']}{else}-{/if}</th>
                        <th width="172" class="c">{number_format(intval(intval($record['level'])), 0, ',', '.')}</th>
                    </tr>
                    {/if}{/if}{/foreach}
                    <tr>
                        <td width="199" class="c">{$lang['rec_defes']}</td>
                        <td width="203" class="c">{$lang['rec_playe']}</td>
                        <td width="172" class="c">{$lang['rec_nbre']}</td>
                    </tr>{foreach $lang['tech'] as $element => $elementName}{if !empty($elementName) && !empty($resource[$element])}{if ($element >= 400 && $element < 600 && $element != 407 && $element != 408)}
                    <tr>
                        <th width="199" class="c">{$elementName}</th>
                        <th width="203" class="c">{if !empty($record['players'])}{$record['players']}{else}-{/if}</th>
                        <th width="172" class="c">{number_format(intval(intval($record['level'])), 0, ',', '.')}</th>
                    </tr>
                    {/if}{/if}{/foreach}
                </tbody>
            </table>
        </center>{/block}
