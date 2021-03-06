{block name="title" prepend}{/block}
{block name="content"}
        <script language="JavaScript">
            function f(target_url, win_name) {
            var new_win = window.open(target_url, win_name, 'resizable=yes, scrollbars=yes, menubar=no, toolbar=no, width=550, height=280, top=0, left=0');
            new_win.focus();
            }
        </script>
        <center>
            <br>
            <table width="569">
                <tr>
                    <td class="c" colspan="5">{$title}</td>
                </tr>
                <tr>
                    <th colspan="3">{$head_type}</th>
                    <th>{$head_count}</th>
                    <th>{$head_total}</th>
                </tr>
                <tr>
                    <th colspan="3">
                        <a href="game.php?page=messages&mode=show&amp;messcat=100">
                            <font color="{$TitleColor100}">{$type100}</font>
                        </a>
                    </th>
                    <th><font color="{$TitleColor100}">{$WaitingMess100}</font></th>
                    <th><font color="{$TitleColor100}">{$TotalMess100}</font></th>
                </tr>
                {for $MessType = 0; $MessType < 100; $MessType++}{if in_array($MessType, $MessageType)}
                <tr>
                    <th colspan="3">
                        <a href="game.php?page=messages&mode=show&amp;messcat={$MessType}">
                            <font color="{$TitleColor[$MessType]}">{$type[$MessType]}</font>
                        </a>
                    </th>
                    <th><font color="{$TitleColor[$MessType]}">{$WaitingMess[$MessType]}</font></th>
                    <th><font color="{$TitleColor[$MessType]}">{$TotalMess[$MessType]}</font></th>
                </tr>{/if}{/for}
            </table>
        </center>
{/block}