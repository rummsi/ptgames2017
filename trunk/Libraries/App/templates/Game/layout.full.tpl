{include file="main.header.tpl"}
{include file="topnav.tpl"}
{include file="left_menu.tpl"}
        <center>
            <br>
            <table width="519">
                <tr>
                    <td colspan="4" class="c">{$Events}</td>
                </tr>
                {$fleet_list}
            </table>
        </center>
{block name="content"}{/block}
{include file="main.footer.tpl"}