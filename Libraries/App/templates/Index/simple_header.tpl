<html>
    <head>
        <title>{block name="title"}{$title}-{$servername}{/block}</title>
        <link rel="shortcut icon" href="favicon.ico">
        {if defined('LOGIN')}
            <link rel="stylesheet" type="text/css" href="css/styles.css">
            <link rel="stylesheet" type="text/css" href="css/about.css">
        {else}
            <link rel="stylesheet" type="text/css" href="{$dpath}/default.css" />
            <link rel="stylesheet" type="text/css" href="{$dpath}/formate.css" />
        {/if}
        <meta http-equiv="content-type" content="text/html; charset={$encoding}" />
        <script type="text/javascript" src="scripts/overlib.js"></script>
    </head>
    <body>