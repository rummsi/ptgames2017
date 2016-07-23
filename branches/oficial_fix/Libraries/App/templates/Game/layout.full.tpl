{include file="simple_header.tpl"}
{include file="topnav.tpl"}
{include file="left_menu.tpl"}        <center>
            <table width="519">
                <tr><td colspan="4" class="c">{$Events}</td>
                {$fleet_list}
                </tr>
            </table>
        </center>
{block name="content"}{/block}
{include file="overall_footer.tpl"}