{block name="title" prepend}{/block}
{block name="content"}
        <center>
            <form action="{$Goto}" method="post">
                <table width="519">
                    <tr>
                        <td class="c" colspan="2">{$Title}</td>
                    </tr>
                    <tr>
                        <th colspan="2">{$Message1}</th>
                    </tr>
                    <tr>
                        <th colspan="2" align="center">
                            <input type="submit" value="{$Button}">
                        </th>
                    </tr>
                </table>
            </form>
        </center>
{/block}