{block name="title" prepend}{/block}
{block name="content"}
        <dl id="changelog" class="major">{foreach $changelog as $main_version => $update_version}
            <dt class="header {cycle values="odd,even"}">{$Version} {$main_version}</dt>
            <dd>
                <dl class="minor">{foreach $update_version as $version_number => $description}
                    <dt class="version {cycle values="odd,even"}">{$version_number}</dt>
                    <dd class="{cycle values="odd,even"}">
                        <ul>
                            {$description|nl2br}
                        </ul>
                    </dd>{/foreach}
                </dl>
            </dd>{/foreach}
        </dl>{/block}