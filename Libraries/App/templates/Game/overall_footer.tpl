
        <div id="siteFooter">
            <div class="content" style="font-size:10px">
                <div class="fleft textLeft">
                    <a href="game.php?page=changelog" class="tooltip js_hideTipOnMobile" title="{$servername}">{$XNovaRelease}</a>
                    <a class="homeLink" href="game.php?page=records" target="_blank">{$Records}</a>
                </div>
                <div class="fright textRight">
                    <a href="index.php?page=contact" target="_blank">{$Contact}</a>|
                    <a href="{$forum_url}" target="_blank">{$Board}</a>|
                    <a class="overlay" href="index.php?page=rules" data-overlay-iframe="true" data-iframe-width="450" data-overlay-title="{$Rules}">{$Rules}</a>{if $link_enable == 1}|
                    <a href="{$link_url}" target="_blank">{stripslashes($link_name)}</a>{/if}
                </div>
            </div><!-- -->
        </div>

        <div id="decisionTB" style="display:none;">
            <div id="errorBoxDecision" class="errorBox TBfixedPosition">
                <div class="head"><h4 id="errorBoxDecisionHead">-</h4></div>
                <div class="middle">
                    <span id="errorBoxDecisionContent">-</span>
                    <div class="response">
                        <div style="float:left; width:180px;">
                            <a href="javascript:void(0);" class="yes"><span id="errorBoxDecisionYes">.</span></a>
                        </div>
                        <div style="float:left; width:180px;">
                            <a href="javascript:void(0);" class="no"><span id="errorBoxDecisionNo">.</span></a>
                        </div>
                        <br class="clearfloat" />
                    </div>
                </div>
                <div class="foot"></div>
            </div> 
        </div>

        <div id="fadeBox" class="fadeBox fixedPostion" style="display:none;">
            <div>
                <span id="fadeBoxStyle" class="success"></span>
                <p id="fadeBoxContent"></p>
            </div>
        </div>

        <div id="notifyTB" style="display:none;">
            <div id="errorBoxNotify" class="errorBox TBfixedPosition">
                <div class="head"><h4 id="errorBoxNotifyHead">-</h4></div>
                <div class="middle">
                    <span id="errorBoxNotifyContent">-</span>
                    <div class="response">
                        <div>
                            <a href="javascript:void(0);" class="ok">
                                <span id="errorBoxNotifyOk">.</span>
                            </a>
                        </div>
                        <br class="clearfloat" />
                    </div>
                </div>
                <div class="foot"></div>
            </div>
        </div>
    </body>
</html>