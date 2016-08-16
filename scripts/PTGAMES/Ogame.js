/* Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function (h) {
    function k(m) {
        var n = m || window.event,
                o = e.call(arguments, 1),
                v = 0,
                E = 0,
                p = 0,
                q = 0,
                r = 0,
                s = 0;
        if (m = h.event.fix(n), m.type = "mousewheel", "detail" in n && (p = -1 * n.detail), "wheelDelta" in n && (p = n.wheelDelta), "wheelDeltaY" in n && (p = n.wheelDeltaY), "wheelDeltaX" in n && (E = -1 * n.wheelDeltaX), "axis" in n && n.axis === n.HORIZONTAL_AXIS && (E = -1 * p, p = 0), v = 0 === p ? E : p, "deltaY" in n && (p = -1 * n.deltaY, v = p), "deltaX" in n && (E = n.deltaX, 0 === p && (v = -1 * E)), 0 !== p || 0 !== E) {
            if (1 === n.deltaMode) {
                var u = h.data(this, "mousewheel-line-height");
                v *= u, p *= u, E *= u
            } else {
                if (2 === n.deltaMode) {
                    var w = h.data(this, "mousewheel-page-height");
                    v *= w, p *= w, E *= w
                }
            }
            if (q = Math.max(Math.abs(p), Math.abs(E)), (!b || b > q) && (b = q, y(n, q) && (b /= 40)), y(n, q) && (v /= 40, E /= 40, p /= 40), v = Math[v >= 1 ? "floor" : "ceil"](v / b), E = Math[E >= 1 ? "floor" : "ceil"](E / b), p = Math[p >= 1 ? "floor" : "ceil"](p / b), g.settings.normalizeOffset && this.getBoundingClientRect) {
                var l = this.getBoundingClientRect();
                r = m.clientX - l.left, s = m.clientY - l.top
            }
            return m.deltaX = E, m.deltaY = p, m.deltaFactor = b, m.offsetX = r, m.offsetY = s, m.deltaMode = 0, o.unshift(m, v, E, p), a && clearTimeout(a), a = setTimeout(x, 200), (h.event.dispatch || h.event.handle).apply(this, o)
        }
    }

    function x() {
        b = null
    }

    function y(l, m) {
        return g.settings.adjustOldDeltas && "mousewheel" === l.type && m % 120 === 0
    }
    var a, b, c = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            d = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
            e = Array.prototype.slice;
    if (h.event.fixHooks) {
        for (var f = c.length; f; ) {
            h.event.fixHooks[c[--f]] = h.event.mouseHooks
        }
    }
    var g = h.event.special.mousewheel = {
        version: "3.1.12",
        setup: function () {
            if (this.addEventListener) {
                for (var l = d.length; l; ) {
                    this.addEventListener(d[--l], k, !1)
                }
            } else {
                this.onmousewheel = k
            }
            h.data(this, "mousewheel-line-height", g.getLineHeight(this)), h.data(this, "mousewheel-page-height", g.getPageHeight(this))
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var l = d.length; l; ) {
                    this.removeEventListener(d[--l], k, !1)
                }
            } else {
                this.onmousewheel = null
            }
            h.removeData(this, "mousewheel-line-height"), h.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function (l) {
            var m = h(l),
                    n = m["offsetParent" in h.fn ? "offsetParent" : "parent"]();
            return n.length || (n = h("body")), parseInt(n.css("fontSize"), 10) || parseInt(m.css("fontSize"), 10) || 16
        },
        getPageHeight: function (l) {
            return h(l).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    h.fn.extend({
        mousewheel: function (l) {
            return l ? this.bind("mousewheel", l) : this.trigger("mousewheel")
        },
        unmousewheel: function (l) {
            return this.unbind("mousewheel", l)
        }
    })
});
(function ($) {
    $.extend({
        tablesorter: new function () {
            var parsers = [],
                    widgets = [];
            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortUp",
                cssDesc: "headerSortDown",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: true,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {
                    css: ["even", "odd"]
                },
                headers: {},
                widthFixed: false,
                cancelSelection: true,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: "/.|,/g",
                onRenderHeader: null,
                selectorHeaders: "thead th",
                debug: false
            };

            function benchmark(s, d) {
                log(s + "," + (new Date().getTime() - d.getTime()) + "ms")
            }
            this.benchmark = benchmark;

            function log(s) {
                if (typeof console != "undefined" && typeof console.debug != "undefined") {
                    console.log(s)
                } else {
                    alert(s)
                }
            }

            function buildParserCache(table, $headers) {
                if (table.config.debug) {
                    var parsersDebug = ""
                }
                if (table.tBodies.length == 0) {
                    return
                }
                var rows = table.tBodies[0].rows;
                if (rows[0]) {
                    var list = [],
                            cells = rows[0].cells,
                            l = cells.length;
                    for (var i = 0; i < l; i++) {
                        var p = false;
                        if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {
                            p = getParserById($($headers[i]).metadata().sorter)
                        } else {
                            if ((table.config.headers[i] && table.config.headers[i].sorter)) {
                                p = getParserById(table.config.headers[i].sorter)
                            }
                        }
                        if (!p) {
                            p = detectParserForColumn(table, rows, -1, i)
                        }
                        if (table.config.debug) {
                            parsersDebug += "column:" + i + " parser:" + p.id + "\n"
                        }
                        list.push(p)
                    }
                }
                if (table.config.debug) {
                    log(parsersDebug)
                }
                return list
            }

            function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                var l = parsers.length,
                        node = false,
                        nodeValue = false,
                        keepLooking = true;
                while (nodeValue == "" && keepLooking) {
                    rowIndex++;
                    if (rows[rowIndex]) {
                        node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                        nodeValue = trimAndGetNodeText(table.config, node);
                        if (table.config.debug) {
                            log("Checking if value was empty on row:" + rowIndex)
                        }
                    } else {
                        keepLooking = false
                    }
                }
                for (var i = 1; i < l; i++) {
                    if (parsers[i].is(nodeValue, table, node)) {
                        return parsers[i]
                    }
                }
                return parsers[0]
            }

            function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                return rows[rowIndex].cells[cellIndex]
            }

            function trimAndGetNodeText(config, node) {
                return $.trim(getElementText(config, node))
            }

            function getParserById(name) {
                var l = parsers.length;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                        return parsers[i]
                    }
                }
                return false
            }

            function buildCache(table) {
                if (table.config.debug) {
                    var cacheTime = new Date()
                }
                var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                        totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                        parsers = table.config.parsers,
                        cache = {
                            row: [],
                            normalized: []
                        };
                for (var i = 0; i < totalRows; ++i) {
                    var c = $(table.tBodies[0].rows[i]),
                            cols = [];
                    if (c.hasClass(table.config.cssChildRow)) {
                        cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                        continue
                    }
                    cache.row.push(c);
                    for (var j = 0; j < totalCells; ++j) {
                        cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]))
                    }
                    cols.push(cache.normalized.length);
                    cache.normalized.push(cols);
                    cols = null
                }
                if (table.config.debug) {
                    benchmark("Building cache for " + totalRows + " rows:", cacheTime)
                }
                return cache
            }

            function getElementText(config, node) {
                var text = "";
                if (!node) {
                    return ""
                }
                if (!config.supportsTextContent) {
                    config.supportsTextContent = node.textContent || false
                }
                if (config.textExtraction == "simple") {
                    if (config.supportsTextContent) {
                        text = node.textContent
                    } else {
                        if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                            text = node.childNodes[0].innerHTML
                        } else {
                            text = node.innerHTML
                        }
                    }
                } else {
                    if (typeof (config.textExtraction) == "function") {
                        text = config.textExtraction(node)
                    } else {
                        text = $(node).text()
                    }
                }
                return text
            }

            function appendToTable(table, cache) {
                if (table.config.debug) {
                    var appendTime = new Date()
                }
                var c = cache,
                        r = c.row,
                        n = c.normalized,
                        totalRows = n.length,
                        checkCell = (n[0].length - 1),
                        tableBody = $(table.tBodies[0]),
                        rows = [];
                for (var i = 0; i < totalRows; i++) {
                    var pos = n[i][checkCell];
                    rows.push(r[pos]);
                    if (!table.config.appender) {
                        var l = r[pos].length;
                        for (var j = 0; j < l; j++) {
                            tableBody[0].appendChild(r[pos][j])
                        }
                    }
                }
                if (table.config.appender) {
                    table.config.appender(table, rows)
                }
                rows = null;
                if (table.config.debug) {
                    benchmark("Rebuilt table:", appendTime)
                }
                applyWidget(table);
                setTimeout(function () {
                    $(table).trigger("sortEnd")
                }, 0)
            }

            function buildHeaders(table) {
                if (table.config.debug) {
                    var time = new Date()
                }
                var meta = ($.metadata) ? true : false;
                var header_index = computeTableHeaderCellIndexes(table);
                $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {
                    this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                    this.order = formatSortingOrder(table.config.sortInitialOrder);
                    this.count = this.order;
                    if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) {
                        this.sortDisabled = true
                    }
                    if (checkHeaderOptionsSortingLocked(table, index)) {
                        this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index)
                    }
                    if (!this.sortDisabled) {
                        var $th = $(this).addClass(table.config.cssHeader);
                        if (table.config.onRenderHeader) {
                            table.config.onRenderHeader.apply($th)
                        }
                    }
                    table.config.headerList[index] = this
                });
                if (table.config.debug) {
                    benchmark("Built headers:", time);
                    log($tableHeaders)
                }
                return $tableHeaders
            }

            function computeTableHeaderCellIndexes(t) {
                var matrix = [];
                var lookup = {};
                var thead = t.getElementsByTagName("THEAD")[0];
                var trs = thead.getElementsByTagName("TR");
                for (var i = 0; i < trs.length; i++) {
                    var cells = trs[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var c = cells[j];
                        var rowIndex = c.parentNode.rowIndex;
                        var cellId = rowIndex + "-" + c.cellIndex;
                        var rowSpan = c.rowSpan || 1;
                        var colSpan = c.colSpan || 1;
                        var firstAvailCol;
                        if (typeof (matrix[rowIndex]) == "undefined") {
                            matrix[rowIndex] = []
                        }
                        for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                            if (typeof (matrix[rowIndex][k]) == "undefined") {
                                firstAvailCol = k;
                                break
                            }
                        }
                        lookup[cellId] = firstAvailCol;
                        for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                            if (typeof (matrix[k]) == "undefined") {
                                matrix[k] = []
                            }
                            var matrixrow = matrix[k];
                            for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                matrixrow[l] = "x"
                            }
                        }
                    }
                }
                return lookup
            }

            function checkCellColSpan(table, rows, row) {
                var arr = [],
                        r = table.tHead.rows,
                        c = r[row].cells;
                for (var i = 0; i < c.length; i++) {
                    var cell = c[i];
                    if (cell.colSpan > 1) {
                        arr = arr.concat(checkCellColSpan(table, headerArr, row++))
                    } else {
                        if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                            arr.push(cell)
                        }
                    }
                }
                return arr
            }

            function checkHeaderMetadata(cell) {
                if (($.metadata) && ($(cell).metadata().sorter === false)) {
                    return true
                }
                return false
            }

            function checkHeaderOptions(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                    return true
                }
                return false
            }

            function checkHeaderOptionsSortingLocked(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) {
                    return table.config.headers[i].lockedOrder
                }
                return false
            }

            function applyWidget(table) {
                var c = table.config.widgets;
                var l = c.length;
                for (var i = 0; i < l; i++) {
                    getWidgetById(c[i]).format(table)
                }
            }

            function getWidgetById(name) {
                var l = widgets.length;
                for (var i = 0; i < l; i++) {
                    if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                        return widgets[i]
                    }
                }
            }

            function formatSortingOrder(v) {
                if (typeof (v) != "Number") {
                    return (v.toLowerCase() == "desc") ? 1 : 0
                } else {
                    return (v == 1) ? 1 : 0
                }
            }

            function isValueInArray(v, a) {
                var l = a.length;
                for (var i = 0; i < l; i++) {
                    if (a[i][0] == v) {
                        return true
                    }
                }
                return false
            }

            function setHeadersCss(table, $headers, list, css) {
                $headers.removeClass(css[0]).removeClass(css[1]);
                var h = [];
                $headers.each(function (offset) {
                    if (!this.sortDisabled) {
                        h[this.column] = $(this)
                    }
                });
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    h[list[i][0]].addClass(css[list[i][1]])
                }
            }

            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $("<colgroup>");
                    $("tr:first td", table.tBodies[0]).each(function () {
                        colgroup.append($("<col>").css("width", $(this).width()))
                    });
                    $(table).prepend(colgroup)
                }
            }

            function updateHeaderSortCount(table, sortList) {
                var c = table.config,
                        l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var s = sortList[i],
                            o = c.headerList[s[0]];
                    o.count = s[1];
                    o.count++
                }
            }

            function multisort(table, sortList, cache) {
                if (table.config.debug) {
                    var sortTime = new Date()
                }
                var dynamicExp = "var sortWrapper = function(a,b) {",
                        l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var c = sortList[i][0];
                    var order = sortList[i][1];
                    var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                    var e = "e" + i;
                    dynamicExp += "var " + e + " = " + s;
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { "
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) {
                    dynamicExp += "}; "
                }
                dynamicExp += "return 0; ";
                dynamicExp += "}; ";
                if (table.config.debug) {
                    benchmark("Evaling expression:" + dynamicExp, new Date())
                }
                eval(dynamicExp);
                cache.normalized.sort(sortWrapper);
                if (table.config.debug) {
                    benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime)
                }
                return cache
            }

            function makeSortFunction(type, direction, index) {
                var a = "a[" + index + "]",
                        b = "b[" + index + "]";
                if (type == "text" && direction == "asc") {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));"
                } else {
                    if (type == "text" && direction == "desc") {
                        return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));"
                    } else {
                        if (type == "numeric" && direction == "asc") {
                            return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));"
                        } else {
                            if (type == "numeric" && direction == "desc") {
                                return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));"
                            }
                        }
                    }
                }
            }

            function makeSortText(i) {
                return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));"
            }

            function makeSortTextDesc(i) {
                return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));"
            }

            function makeSortNumeric(i) {
                return "a[" + i + "]-b[" + i + "];"
            }

            function makeSortNumericDesc(i) {
                return "b[" + i + "]-a[" + i + "];"
            }

            function sortText(a, b) {
                if (table.config.sortLocaleCompare) {
                    return a.localeCompare(b)
                }
                return ((a < b) ? -1 : ((a > b) ? 1 : 0))
            }

            function sortTextDesc(a, b) {
                if (table.config.sortLocaleCompare) {
                    return b.localeCompare(a)
                }
                return ((b < a) ? -1 : ((b > a) ? 1 : 0))
            }

            function sortNumeric(a, b) {
                return a - b
            }

            function sortNumericDesc(a, b) {
                return b - a
            }

            function getCachedSortType(parsers, i) {
                return parsers[i].type
            }
            this.construct = function (settings) {
                return this.each(function () {
                    if (!this.tHead || !this.tBodies) {
                        return
                    }
                    var $this, $document, $headers, cache, config, shiftDown = 0,
                            sortOrder;
                    this.config = {};
                    config = $.extend(this.config, $.tablesorter.defaults, settings);
                    $this = $(this);
                    $.data(this, "tablesorter", config);
                    $headers = buildHeaders(this);
                    this.config.parsers = buildParserCache(this, $headers);
                    cache = buildCache(this);
                    var sortCSS = [config.cssDesc, config.cssAsc];
                    fixColumnWidth(this);
                    $headers.click(function (e) {
                        var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                        if (!this.sortDisabled && totalRows > 0) {
                            $this.trigger("sortStart");
                            var $cell = $(this);
                            var i = this.column;
                            this.order = this.count++ % 2;
                            if (this.lockedOrder) {
                                this.order = this.lockedOrder
                            }
                            if (!e[config.sortMultiSortKey]) {
                                config.sortList = [];
                                if (config.sortForce != null) {
                                    var a = config.sortForce;
                                    for (var j = 0; j < a.length; j++) {
                                        if (a[j][0] != i) {
                                            config.sortList.push(a[j])
                                        }
                                    }
                                }
                                config.sortList.push([i, this.order])
                            } else {
                                if (isValueInArray(i, config.sortList)) {
                                    for (var j = 0; j < config.sortList.length; j++) {
                                        var s = config.sortList[j],
                                                o = config.headerList[s[0]];
                                        if (s[0] == i) {
                                            o.count = s[1];
                                            o.count++;
                                            s[1] = o.count % 2
                                        }
                                    }
                                } else {
                                    config.sortList.push([i, this.order])
                                }
                            }
                            setTimeout(function () {
                                setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                appendToTable($this[0], multisort($this[0], config.sortList, cache))
                            }, 1);
                            return false
                        }
                    }).mousedown(function () {
                        if (config.cancelSelection) {
                            this.onselectstart = function () {
                                return false
                            };
                            return false
                        }
                    });
                    $this.bind("update", function () {
                        var me = this;
                        setTimeout(function () {
                            me.config.parsers = buildParserCache(me, $headers);
                            cache = buildCache(me)
                        }, 1)
                    }).bind("updateCell", function (e, cell) {
                        var config = this.config;
                        var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                        cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(getElementText(config, cell), cell)
                    }).bind("sorton", function (e, list) {
                        $(this).trigger("sortStart");
                        config.sortList = list;
                        var sortList = config.sortList;
                        updateHeaderSortCount(this, sortList);
                        setHeadersCss(this, $headers, sortList, sortCSS);
                        appendToTable(this, multisort(this, sortList, cache))
                    }).bind("appendCache", function () {
                        appendToTable(this, cache)
                    }).bind("applyWidgetId", function (e, id) {
                        getWidgetById(id).format(this)
                    }).bind("applyWidgets", function () {
                        applyWidget(this)
                    });
                    if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                        config.sortList = $(this).metadata().sortlist
                    }
                    if (config.sortList.length > 0) {
                        $this.trigger("sorton", [config.sortList])
                    }
                    applyWidget(this)
                })
            };
            this.addParser = function (parser) {
                var l = parsers.length,
                        a = true;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                        a = false
                    }
                }
                if (a) {
                    parsers.push(parser)
                }
            };
            this.addWidget = function (widget) {
                widgets.push(widget)
            };
            this.formatFloat = function (s) {
                var i = parseFloat(s);
                return (isNaN(i)) ? 0 : i
            };
            this.formatInt = function (s) {
                var i = parseInt(s);
                return (isNaN(i)) ? 0 : i
            };
            this.isDigit = function (s, config) {
                return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, "")))
            };
            this.clearTableBody = function (table) {
                if ($.browser.msie) {
                    function empty() {
                        while (this.firstChild) {
                            this.removeChild(this.firstChild)
                        }
                    }
                    empty.apply(table.tBodies[0])
                } else {
                    table.tBodies[0].innerHTML = ""
                }
            }
        }
    });
    $.fn.extend({
        tablesorter: $.tablesorter.construct
    });
    var ts = $.tablesorter;
    ts.addParser({
        id: "text",
        is: function (s) {
            return true
        },
        format: function (s) {
            return $.trim(s.toLocaleLowerCase())
        },
        type: "text"
    });
    ts.addParser({
        id: "digit",
        is: function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c)
        },
        format: function (s) {
            return $.tablesorter.formatFloat(s)
        },
        type: "numeric"
    });
    ts.addParser({
        id: "currency",
        is: function (s) {
            return /^[£$€?.]/.test(s)
        },
        format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g), ""))
        },
        type: "numeric"
    });
    ts.addParser({
        id: "ipAddress",
        is: function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s)
        },
        format: function (s) {
            var a = s.split("."),
                    r = "",
                    l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item
                } else {
                    r += item
                }
            }
            return $.tablesorter.formatFloat(r)
        },
        type: "numeric"
    });
    ts.addParser({
        id: "url",
        is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s)
        },
        format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ""))
        },
        type: "text"
    });
    ts.addParser({
        id: "isoDate",
        is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s)
        },
        format: function (s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0")
        },
        type: "numeric"
    });
    ts.addParser({
        id: "percent",
        is: function (s) {
            return /\%$/.test($.trim(s))
        },
        format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""))
        },
        type: "numeric"
    });
    ts.addParser({
        id: "usLongDate",
        is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/))
        },
        format: function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime())
        },
        type: "numeric"
    });
    ts.addParser({
        id: "shortDate",
        is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s)
        },
        format: function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2")
            } else {
                if (c.dateFormat == "uk") {
                    s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1")
                } else {
                    if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                        s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3")
                    }
                }
            }
            return $.tablesorter.formatFloat(new Date(s).getTime())
        },
        type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s)
        },
        format: function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime())
        },
        type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function (s) {
            return false
        },
        format: function (s, table, cell) {
            var c = table.config,
                    p = (!c.parserMetadataName) ? "sortValue" : c.parserMetadataName;
            return $(cell).metadata()[p]
        },
        type: "numeric"
    });
    ts.addWidget({
        id: "zebra",
        format: function (table) {
            if (table.config.debug) {
                var time = new Date()
            }
            var $tr, row = -1,
                    odd;
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                if (!$tr.hasClass(table.config.cssChildRow)) {
                    row++
                }
                odd = (row % 2 == 0);
                $tr.removeClass(table.config.widgetZebra.css[odd ? 0 : 1]).addClass(table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time)
            }
        }
    })
})(jQuery);
(function (f) {
    var d = {
        init: function (b) {
            var a = this;
            if (!a.data("jqv") || a.data("jqv") == null) {
                b = d._saveOptions(a, b);
                f(document).on("click", ".formError", function () {
                    f(this).fadeOut(150, function () {
                        f(this).parent(".formErrorOuter").remove();
                        f(this).remove()
                    })
                })
            }
            return this
        },
        attach: function (a) {
            var b = this;
            var c;
            if (a) {
                c = d._saveOptions(b, a)
            } else {
                c = b.data("jqv")
            }
            c.validateAttribute = (b.find("[data-validation-engine*=validate]").length) ? "data-validation-engine" : "class";
            if (c.binded) {
                b.on(c.validationEventTrigger, "[" + c.validateAttribute + "*=validate]:not([type=checkbox]):not([type=radio]):not(.datepicker)", d._onFieldEvent);
                b.on("click", "[" + c.validateAttribute + "*=validate][type=checkbox],[" + c.validateAttribute + "*=validate][type=radio]", d._onFieldEvent);
                b.on(c.validationEventTrigger, "[" + c.validateAttribute + "*=validate][class*=datepicker]", {
                    delay: 300
                }, d._onFieldEvent)
            }
            if (c.autoPositionUpdate) {
                f(window).bind("resize", {
                    noAnimation: true,
                    formElem: b
                }, d.updatePromptsPosition)
            }
            b.on("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", d._submitButtonClick);
            b.removeData("jqv_submitButton");
            b.on("submit", d._onSubmitEvent);
            return this
        },
        detach: function () {
            var a = this;
            var b = a.data("jqv");
            a.find("[" + b.validateAttribute + "*=validate]").not("[type=checkbox]").off(b.validationEventTrigger, d._onFieldEvent);
            a.find("[" + b.validateAttribute + "*=validate][type=checkbox],[class*=validate][type=radio]").off("click", d._onFieldEvent);
            a.off("submit", d._onSubmitEvent);
            a.removeData("jqv");
            a.off("click", "a[data-validation-engine-skip], a[class*='validate-skip'], button[data-validation-engine-skip], button[class*='validate-skip'], input[data-validation-engine-skip], input[class*='validate-skip']", d._submitButtonClick);
            a.removeData("jqv_submitButton");
            if (b.autoPositionUpdate) {
                f(window).off("resize", d.updatePromptsPosition)
            }
            return this
        },
        validate: function () {
            var c = f(this);
            var a = null;
            if (c.is("form") || c.hasClass("validationEngineContainer")) {
                if (c.hasClass("validating")) {
                    return false
                } else {
                    c.addClass("validating");
                    var h = c.data("jqv");
                    var a = d._validateFields(this);
                    setTimeout(function () {
                        c.removeClass("validating")
                    }, 100);
                    if (a && h.onSuccess) {
                        h.onSuccess()
                    } else {
                        if (!a && h.onFailure) {
                            h.onFailure()
                        }
                    }
                }
            } else {
                if (c.is("form") || c.hasClass("validationEngineContainer")) {
                    c.removeClass("validating")
                } else {
                    var b = c.closest("form, .validationEngineContainer"),
                            h = (b.data("jqv")) ? b.data("jqv") : f.validationEngine.defaults,
                            a = d._validateField(c, h);
                    if (a && h.onFieldSuccess) {
                        h.onFieldSuccess()
                    } else {
                        if (h.onFieldFailure && h.InvalidFields.length > 0) {
                            h.onFieldFailure()
                        }
                    }
                }
            }
            if (h.onValidationComplete) {
                return !!h.onValidationComplete(b, a)
            }
            return a
        },
        updatePromptsPosition: function (a) {
            if (a && this == window) {
                var b = a.data.formElem;
                var h = a.data.noAnimation
            } else {
                var b = f(this.closest("form, .validationEngineContainer"))
            }
            var c = b.data("jqv");
            b.find("[" + c.validateAttribute + "*=validate]").not(":disabled").each(function () {
                var g = f(this);
                if (c.prettySelect && g.is(":hidden")) {
                    g = b.find("#" + c.usePrefix + g.attr("id") + c.useSuffix)
                }
                var n = d._getPrompt(g);
                var m = f(n).find(".formErrorContent").html();
                if (n) {
                    d._updatePrompt(g, f(n), m, undefined, false, c, h)
                }
            });
            return this
        },
        showPrompt: function (m, c, a, l) {
            var b = this.closest("form, .validationEngineContainer");
            var n = b.data("jqv");
            if (!n) {
                n = d._saveOptions(this, n)
            }
            if (a) {
                n.promptPosition = a
            }
            n.showArrow = l == true;
            d._showPrompt(this, m, c, false, n);
            return this
        },
        hide: function () {
            var a = f(this).closest("form, .validationEngineContainer");
            var c = a.data("jqv");
            var b = (c && c.fadeDuration) ? c.fadeDuration : 0.3;
            var h;
            if (f(this).is("form") || f(this).hasClass("validationEngineContainer")) {
                h = "parentForm" + d._getClassName(f(this).attr("id"))
            } else {
                h = d._getClassName(f(this).attr("id")) + "formError"
            }
            f("." + h).fadeTo(b, 0.3, function () {
                f(this).parent(".formErrorOuter").remove();
                f(this).remove()
            });
            return this
        },
        hideAll: function () {
            var b = this;
            var c = b.data("jqv");
            var a = c ? c.fadeDuration : 300;
            f(".formError").fadeTo(a, 300, function () {
                f(this).parent(".formErrorOuter").remove();
                f(this).remove()
            });
            return this
        },
        _onFieldEvent: function (b) {
            var a = f(this);
            var c = a.closest("form, .validationEngineContainer");
            var h = c.data("jqv");
            h.eventTrigger = "field";
            window.setTimeout(function () {
                d._validateField(a, h);
                if (h.InvalidFields.length == 0 && h.onFieldSuccess) {
                    h.onFieldSuccess()
                } else {
                    if (h.InvalidFields.length > 0 && h.onFieldFailure) {
                        h.onFieldFailure()
                    }
                }
            }, (b.data) ? b.data.delay : 0)
        },
        _onSubmitEvent: function () {
            var a = f(this);
            var h = a.data("jqv");
            if (a.data("jqv_submitButton")) {
                var c = f("#" + a.data("jqv_submitButton"));
                if (c) {
                    if (c.length > 0) {
                        if (c.hasClass("validate-skip") || c.attr("data-validation-engine-skip") == "true") {
                            return true
                        }
                    }
                }
            }
            h.eventTrigger = "submit";
            var b = d._validateFields(a);
            if (b && h.ajaxFormValidation) {
                d._validateFormWithAjax(a, h);
                return false
            }
            if (h.onValidationComplete) {
                return !!h.onValidationComplete(a, b)
            }
            return b
        },
        _checkAjaxStatus: function (a) {
            var b = true;
            f.each(a.ajaxValidCache, function (h, c) {
                if (!c) {
                    b = false;
                    return false
                }
            });
            return b
        },
        _checkAjaxFieldStatus: function (b, a) {
            return a.ajaxValidCache[b] == true
        },
        _validateFields: function (y) {
            var b = y.data("jqv");
            var x = false;
            y.trigger("jqv.form.validating");
            var a = null;
            y.find("[" + b.validateAttribute + "*=validate]").not(":disabled").each(function () {
                var g = f(this);
                var h = [];
                if (f.inArray(g.attr("name"), h) < 0) {
                    x |= d._validateField(g, b);
                    if (x && a == null) {
                        if (g.is(":hidden") && b.prettySelect) {
                            a = g = y.find("#" + b.usePrefix + d._jqSelector(g.attr("id")) + b.useSuffix)
                        } else {
                            if (g.data("jqv-prompt-at") instanceof jQuery) {
                                g = g.data("jqv-prompt-at")
                            } else {
                                if (g.data("jqv-prompt-at")) {
                                    g = f(g.data("jqv-prompt-at"))
                                }
                            }
                            a = g
                        }
                    }
                    if (b.doNotShowAllErrosOnSubmit) {
                        return false
                    }
                    h.push(g.attr("name"));
                    if (b.showOneMessage == true && x) {
                        return false
                    }
                }
            });
            y.trigger("jqv.form.result", [x]);
            if (x) {
                if (b.scroll) {
                    var c = a.offset().top;
                    var v = a.offset().left;
                    var s = b.promptPosition;
                    if (typeof (s) == "string" && s.indexOf(":") != -1) {
                        s = s.substring(0, s.indexOf(":"))
                    }
                    if (s != "bottomRight" && s != "bottomLeft") {
                        var u = d._getPrompt(a);
                        if (u) {
                            c = u.offset().top
                        }
                    }
                    if (b.scrollOffset) {
                        c -= b.scrollOffset
                    }
                    if (b.isOverflown) {
                        var B = f(b.overflownDIV);
                        if (!B.length) {
                            return false
                        }
                        var A = B.scrollTop();
                        var w = -parseInt(B.offset().top);
                        c += A + w - 5;
                        var r = f(b.overflownDIV + ":not(:animated)");
                        r.animate({
                            scrollTop: c
                        }, 1100, function () {
                            if (b.focusFirstField) {
                                a.focus()
                            }
                        })
                    } else {
                        f("html, body").animate({
                            scrollTop: c
                        }, 1100, function () {
                            if (b.focusFirstField) {
                                a.focus()
                            }
                        });
                        f("html, body").animate({
                            scrollLeft: v
                        }, 1100)
                    }
                } else {
                    if (b.focusFirstField) {
                        a.focus()
                    }
                }
                return false
            }
            return true
        },
        _validateFormWithAjax: function (b, l) {
            var a = b.serialize();
            var c = (l.ajaxFormValidationMethod) ? l.ajaxFormValidationMethod : "GET";
            var m = (l.ajaxFormValidationURL) ? l.ajaxFormValidationURL : b.attr("action");
            var n = (l.dataType) ? l.dataType : "json";
            f.ajax({
                type: c,
                url: m,
                cache: false,
                dataType: n,
                data: a,
                form: b,
                methods: d,
                options: l,
                beforeSend: function () {
                    return l.onBeforeAjaxFormValidation(b, l)
                },
                error: function (h, g) {
                    d._ajaxError(h, g)
                },
                success: function (w) {
                    if ((n == "json") && (w !== true)) {
                        var y = false;
                        for (var x = 0; x < w.length; x++) {
                            var v = w[x];
                            var k = v[0];
                            var g = f(f("#" + k)[0]);
                            if (g.length == 1) {
                                var u = v[2];
                                if (v[1] == true) {
                                    if (u == "" || !u) {
                                        d._closePrompt(g)
                                    } else {
                                        if (l.allrules[u]) {
                                            var h = l.allrules[u].alertTextOk;
                                            if (h) {
                                                u = h
                                            }
                                        }
                                        if (l.showPrompts) {
                                            d._showPrompt(g, u, "pass", false, l, true)
                                        }
                                    }
                                } else {
                                    y |= true;
                                    if (l.allrules[u]) {
                                        var h = l.allrules[u].alertText;
                                        if (h) {
                                            u = h
                                        }
                                    }
                                    if (l.showPrompts) {
                                        d._showPrompt(g, u, "", false, l, true)
                                    }
                                }
                            }
                        }
                        l.onAjaxFormComplete(!y, b, w, l)
                    } else {
                        l.onAjaxFormComplete(true, b, w, l)
                    }
                }
            })
        },
        _validateField: function (Y, R, F) {
            if (!Y.attr("id")) {
                Y.attr("id", "form-validation-field-" + f.validationEngine.fieldIdCounter);
                ++f.validationEngine.fieldIdCounter
            }
            if (!R.validateNonVisibleFields && (Y.is(":hidden") && !R.prettySelect || Y.parent().is(":hidden"))) {
                return false
            }
            var b = Y.attr(R.validateAttribute);
            var J = /validate\[(.*)\]/.exec(b);
            if (!J) {
                return false
            }
            var a = J[1];
            var G = a.split(/\[|,|\]/);
            var N = false;
            var T = Y.attr("name");
            var U = "";
            var L = "";
            var c = false;
            var H = false;
            R.isError = false;
            R.showArrow = true;
            if (R.maxErrorsPerField > 0) {
                H = true
            }
            var X = f(Y.closest("form, .validationEngineContainer"));
            for (var M = 0; M < G.length; M++) {
                G[M] = G[M].replace(" ", "");
                if (G[M] === "") {
                    delete G[M]
                }
            }
            for (var M = 0, P = 0; M < G.length; M++) {
                if (H && P >= R.maxErrorsPerField) {
                    if (!c) {
                        var S = f.inArray("required", G);
                        c = (S != -1 && S >= M)
                    }
                    break
                }
                var V = undefined;
                switch (G[M]) {
                    case "required":
                        c = true;
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._required);
                        break;
                    case "custom":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._custom);
                        break;
                    case "groupRequired":
                        var O = "[" + R.validateAttribute + "*=" + G[M + 1] + "]";
                        var W = X.find(O).eq(0);
                        if (W[0] != Y[0]) {
                            d._validateField(W, R, F);
                            R.showArrow = true
                        }
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._groupRequired);
                        if (V) {
                            c = true
                        }
                        R.showArrow = false;
                        break;
                    case "ajax":
                        V = d._ajax(Y, G, M, R);
                        if (V) {
                            L = "load"
                        }
                        break;
                    case "minSize":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._minSize);
                        break;
                    case "maxSize":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._maxSize);
                        break;
                    case "min":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._min);
                        break;
                    case "max":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._max);
                        break;
                    case "past":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._past);
                        break;
                    case "future":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._future);
                        break;
                    case "dateRange":
                        var O = "[" + R.validateAttribute + "*=" + G[M + 1] + "]";
                        R.firstOfGroup = X.find(O).eq(0);
                        R.secondOfGroup = X.find(O).eq(1);
                        if (R.firstOfGroup[0].value || R.secondOfGroup[0].value) {
                            V = d._getErrorMessage(X, Y, G[M], G, M, R, d._dateRange)
                        }
                        if (V) {
                            c = true
                        }
                        R.showArrow = false;
                        break;
                    case "dateTimeRange":
                        var O = "[" + R.validateAttribute + "*=" + G[M + 1] + "]";
                        R.firstOfGroup = X.find(O).eq(0);
                        R.secondOfGroup = X.find(O).eq(1);
                        if (R.firstOfGroup[0].value || R.secondOfGroup[0].value) {
                            V = d._getErrorMessage(X, Y, G[M], G, M, R, d._dateTimeRange)
                        }
                        if (V) {
                            c = true
                        }
                        R.showArrow = false;
                        break;
                    case "maxCheckbox":
                        Y = f(X.find("input[name='" + T + "']"));
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._maxCheckbox);
                        break;
                    case "minCheckbox":
                        Y = f(X.find("input[name='" + T + "']"));
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._minCheckbox);
                        break;
                    case "equals":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._equals);
                        break;
                    case "funcCall":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._funcCall);
                        break;
                    case "creditCard":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._creditCard);
                        break;
                    case "condRequired":
                        V = d._getErrorMessage(X, Y, G[M], G, M, R, d._condRequired);
                        if (V !== undefined) {
                            c = true
                        }
                        break;
                    default:
                }
                var Q = false;
                if (typeof V == "object") {
                    switch (V.status) {
                        case "_break":
                            Q = true;
                            break;
                        case "_error":
                            V = V.message;
                            break;
                        case "_error_no_prompt":
                            return true;
                            break;
                        default:
                            break
                    }
                }
                if (Q) {
                    break
                }
                if (typeof V == "string") {
                    U += V + "<br/>";
                    R.isError = true;
                    P++
                }
            }
            if (!c && !(Y.val()) && Y.val().length < 1) {
                R.isError = false
            }
            var K = Y.prop("type");
            var Z = Y.data("promptPosition") || R.promptPosition;
            if ((K == "radio" || K == "checkbox") && X.find("input[name='" + T + "']").size() > 1) {
                if (Z === "inline") {
                    Y = f(X.find("input[name='" + T + "'][type!=hidden]:last"))
                } else {
                    Y = f(X.find("input[name='" + T + "'][type!=hidden]:first"))
                }
                R.showArrow = false
            }
            if (Y.is(":hidden") && R.prettySelect) {
                Y = X.find("#" + R.usePrefix + d._jqSelector(Y.attr("id")) + R.useSuffix)
            }
            if (R.isError && R.showPrompts) {
                d._showPrompt(Y, U, L, false, R)
            } else {
                if (!N) {
                    d._closePrompt(Y)
                }
            }
            if (!N) {
                Y.trigger("jqv.field.result", [Y, R.isError, U])
            }
            var I = f.inArray(Y[0], R.InvalidFields);
            if (I == -1) {
                if (R.isError) {
                    R.InvalidFields.push(Y[0])
                }
            } else {
                if (!R.isError) {
                    R.InvalidFields.splice(I, 1)
                }
            }
            d._handleStatusCssClasses(Y, R);
            if (R.isError && R.onFieldFailure) {
                R.onFieldFailure(Y)
            }
            if (!R.isError && R.onFieldSuccess) {
                R.onFieldSuccess(Y)
            }
            return R.isError
        },
        _handleStatusCssClasses: function (a, b) {
            if (b.addSuccessCssClassToField) {
                a.removeClass(b.addSuccessCssClassToField)
            }
            if (b.addFailureCssClassToField) {
                a.removeClass(b.addFailureCssClassToField)
            }
            if (b.addSuccessCssClassToField && !b.isError) {
                a.addClass(b.addSuccessCssClassToField)
            }
            if (b.addFailureCssClassToField && b.isError) {
                a.addClass(b.addFailureCssClassToField)
            }
        },
        _getErrorMessage: function (E, c, v, a, A, F, u) {
            var x = jQuery.inArray(v, a);
            if (v === "custom" || v === "funcCall") {
                var b = a[x + 1];
                v = v + "[" + b + "]";
                delete(a[x])
            }
            var D = v;
            var C = (c.attr("data-validation-engine")) ? c.attr("data-validation-engine") : c.attr("class");
            var y = C.split(" ");
            var w;
            if (v == "future" || v == "past" || v == "maxCheckbox" || v == "minCheckbox") {
                w = u(E, c, a, A, F)
            } else {
                w = u(c, a, A, F)
            }
            if (w != undefined) {
                var B = d._getCustomErrorMessage(f(c), y, D, F);
                if (B) {
                    w = B
                }
            }
            return w
        },
        _getCustomErrorMessage: function (c, r, o, a) {
            var q = false;
            var s = /^custom\[.*\]$/.test(o) ? d._validityProp.custom : d._validityProp[o];
            if (s != undefined) {
                q = c.attr("data-errormessage-" + s);
                if (q != undefined) {
                    return q
                }
            }
            q = c.attr("data-errormessage");
            if (q != undefined) {
                return q
            }
            var u = "#" + c.attr("id");
            if (typeof a.custom_error_messages[u] != "undefined" && typeof a.custom_error_messages[u][o] != "undefined") {
                q = a.custom_error_messages[u][o]["message"]
            } else {
                if (r.length > 0) {
                    for (var p = 0; p < r.length && r.length > 0; p++) {
                        var b = "." + r[p];
                        if (typeof a.custom_error_messages[b] != "undefined" && typeof a.custom_error_messages[b][o] != "undefined") {
                            q = a.custom_error_messages[b][o]["message"];
                            break
                        }
                    }
                }
            }
            if (!q && typeof a.custom_error_messages[o] != "undefined" && typeof a.custom_error_messages[o]["message"] != "undefined") {
                q = a.custom_error_messages[o]["message"]
            }
            return q
        },
        _validityProp: {
            required: "value-missing",
            custom: "custom-error",
            groupRequired: "value-missing",
            ajax: "custom-error",
            minSize: "range-underflow",
            maxSize: "range-overflow",
            min: "range-underflow",
            max: "range-overflow",
            past: "type-mismatch",
            future: "type-mismatch",
            dateRange: "type-mismatch",
            dateTimeRange: "type-mismatch",
            maxCheckbox: "range-overflow",
            minCheckbox: "range-underflow",
            equals: "pattern-mismatch",
            funcCall: "custom-error",
            creditCard: "pattern-mismatch",
            condRequired: "value-missing"
        },
        _required: function (o, c, q, a, p) {
            switch (o.prop("type")) {
                case "text":
                case "password":
                case "textarea":
                case "file":
                case "select-one":
                case "select-multiple":
                default:
                    var b = f.trim(o.val());
                    var r = f.trim(o.attr("data-validation-placeholder"));
                    if ((!b) || (r && b == r)) {
                        return a.allrules[c[q]].alertText
                    }
                    break;
                case "radio":
                case "checkbox":
                    if (p) {
                        if (!o.attr("checked")) {
                            return a.allrules[c[q]].alertTextCheckboxMultiple
                        }
                        break
                    }
                    var s = o.closest("form, .validationEngineContainer");
                    var u = o.attr("name");
                    if (s.find("input[name='" + u + "']:checked").size() == 0) {
                        if (s.find("input[name='" + u + "']:visible").size() == 1) {
                            return a.allrules[c[q]].alertTextCheckboxe
                        } else {
                            return a.allrules[c[q]].alertTextCheckboxMultiple
                        }
                    }
                    break
            }
        },
        _groupRequired: function (c, a, m, n) {
            var b = "[" + n.validateAttribute + "*=" + a[m + 1] + "]";
            var l = false;
            c.closest("form, .validationEngineContainer").find(b).each(function () {
                if (!d._required(f(this), a, m, n)) {
                    l = true;
                    return false
                }
            });
            if (!l) {
                return n.allrules[a[m]].alertText
            }
        },
        _custom: function (c, b, s, a) {
            var u = b[s + 1];
            var p = a.allrules[u];
            var o;
            if (!p) {
                alert("jqv:custom rule not found - " + u);
                return
            }
            if (p.regex) {
                var q = p.regex;
                if (!q) {
                    alert("jqv:custom regex not found - " + u);
                    return
                }
                var r = new RegExp(q);
                if (!r.test(c.val())) {
                    return a.allrules[u].alertText
                }
            } else {
                if (p.func) {
                    o = p.func;
                    if (typeof (o) !== "function") {
                        alert("jqv:custom parameter 'function' is no function - " + u);
                        return
                    }
                    if (!o(c, b, s, a)) {
                        return a.allrules[u].alertText
                    }
                } else {
                    alert("jqv:custom type not allowed " + u);
                    return
                }
            }
        },
        _funcCall: function (b, a, q, r) {
            var c = a[q + 1];
            var o;
            if (c.indexOf(".") > -1) {
                var n = c.split(".");
                var p = window;
                while (n.length) {
                    p = p[n.shift()]
                }
                o = p
            } else {
                o = window[c] || r.customFunctions[c]
            }
            if (typeof (o) == "function") {
                return o(b, a, q, r)
            }
        },
        _equals: function (b, a, c, k) {
            var l = a[c + 1];
            if (b.val() != f("#" + l).val()) {
                return k.allrules.equals.alertText
            }
        },
        _maxSize: function (b, a, m, n) {
            var o = a[m + 1];
            var p = b.val().length;
            if (p > o) {
                var c = n.allrules.maxSize;
                if (typeof c.alertText2 == "string") {
                    return c.alertText + min + c.alertText2
                } else {
                    return c.alertText
                }
            }
        },
        _minSize: function (b, a, m, o) {
            var n = a[m + 1];
            var p = b.val().length;
            if (p < n) {
                var c = o.allrules.minSize;
                if (typeof c.alertText2 == "string") {
                    return c.alertText + n + c.alertText2
                } else {
                    return c.alertText
                }
            }
        },
        _min: function (b, a, m, o) {
            var n = parseFloat(a[m + 1]);
            var p = parseFloat(b.val());
            if (p < n) {
                var c = o.allrules.min;
                if (c.alertText2) {
                    return c.alertText + n + c.alertText2
                }
                return c.alertText + n
            }
        },
        _max: function (b, a, m, n) {
            var o = parseFloat(a[m + 1]);
            var p = parseFloat(b.val());
            if (p > o) {
                var c = n.allrules.max;
                if (c.alertText2) {
                    return c.alertText + o + c.alertText2
                }
                return c.alertText + o
            }
        },
        _past: function (v, p, c, u, a) {
            var w = c[u + 1];
            var r = f(v.find("input[name='" + w.replace(/^#+/, "") + "']"));
            var s;
            if (w.toLowerCase() == "now") {
                s = new Date()
            } else {
                if (undefined != r.val()) {
                    if (r.is(":disabled")) {
                        return
                    }
                    s = d._parseDate(r.val())
                } else {
                    s = d._parseDate(w)
                }
            }
            var b = d._parseDate(p.val());
            if (b > s) {
                var q = a.allrules.past;
                if (q.alertText2) {
                    return q.alertText + d._dateToString(s) + q.alertText2
                }
                return q.alertText + d._dateToString(s)
            }
        },
        _future: function (v, p, c, u, a) {
            var w = c[u + 1];
            var r = f(v.find("input[name='" + w.replace(/^#+/, "") + "']"));
            var s;
            if (w.toLowerCase() == "now") {
                s = new Date()
            } else {
                if (undefined != r.val()) {
                    if (r.is(":disabled")) {
                        return
                    }
                    s = d._parseDate(r.val())
                } else {
                    s = d._parseDate(w)
                }
            }
            var b = d._parseDate(p.val());
            if (b < s) {
                var q = a.allrules.future;
                if (q.alertText2) {
                    return q.alertText + d._dateToString(s) + q.alertText2
                }
                return q.alertText + d._dateToString(s)
            }
        },
        _isDate: function (a) {
            var b = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/);
            return b.test(a)
        },
        _isDateTime: function (a) {
            var b = new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/);
            return b.test(a)
        },
        _dateCompare: function (a, b) {
            return (new Date(a.toString()) < new Date(b.toString()))
        },
        _dateRange: function (b, a, c, h) {
            if ((!h.firstOfGroup[0].value && h.secondOfGroup[0].value) || (h.firstOfGroup[0].value && !h.secondOfGroup[0].value)) {
                return h.allrules[a[c]].alertText + h.allrules[a[c]].alertText2
            }
            if (!d._isDate(h.firstOfGroup[0].value) || !d._isDate(h.secondOfGroup[0].value)) {
                return h.allrules[a[c]].alertText + h.allrules[a[c]].alertText2
            }
            if (!d._dateCompare(h.firstOfGroup[0].value, h.secondOfGroup[0].value)) {
                return h.allrules[a[c]].alertText + h.allrules[a[c]].alertText2
            }
        },
        _dateTimeRange: function (b, a, c, h) {
            if ((!h.firstOfGroup[0].value && h.secondOfGroup[0].value) || (h.firstOfGroup[0].value && !h.secondOfGroup[0].value)) {
                return h.allrules[a[c]].alertText + h.allrules[a[c]].alertText2
            }
            if (!d._isDateTime(h.firstOfGroup[0].value) || !d._isDateTime(h.secondOfGroup[0].value)) {
                return h.allrules[a[c]].alertText + h.allrules[a[c]].alertText2
            }
            if (!d._dateCompare(h.firstOfGroup[0].value, h.secondOfGroup[0].value)) {
                return h.allrules[a[c]].alertText + h.allrules[a[c]].alertText2
            }
        },
        _maxCheckbox: function (c, b, a, n, o) {
            var q = a[n + 1];
            var p = b.attr("name");
            var r = c.find("input[name='" + p + "']:checked").size();
            if (r > q) {
                o.showArrow = false;
                if (o.allrules.maxCheckbox.alertText2) {
                    return o.allrules.maxCheckbox.alertText + " " + q + " " + o.allrules.maxCheckbox.alertText2
                }
                return o.allrules.maxCheckbox.alertText
            }
        },
        _minCheckbox: function (c, b, a, n, o) {
            var q = a[n + 1];
            var p = b.attr("name");
            var r = c.find("input[name='" + p + "']:checked").size();
            if (r < q) {
                o.showArrow = false;
                return o.allrules.minCheckbox.alertText + " " + q + " " + o.allrules.minCheckbox.alertText2
            }
        },
        _creditCard: function (q, c, v, a) {
            var x = false,
                    b = q.val().replace(/ +/g, "").replace(/-+/g, "");
            var y = b.length;
            if (y >= 14 && y <= 16 && parseInt(b) > 0) {
                var u = 0,
                        v = y - 1,
                        r = 1,
                        s, w = new String();
                do {
                    s = parseInt(b.charAt(v));
                    w += (r++ % 2 == 0) ? s * 2 : s
                } while (--v >= 0);
                for (v = 0; v < w.length; v++) {
                    u += parseInt(w.charAt(v))
                }
                x = u % 10 == 0
            }
            if (!x) {
                return a.allrules.creditCard.alertText
            }
        },
        _ajax: function (b, I, A, H) {
            var J = I[A + 1];
            var c = H.allrules[J];
            var E = c.extraData;
            var x = c.extraDataDynamic;
            var B = {
                fieldId: b.attr("id"),
                fieldValue: b.val()
            };
            if (typeof E === "object") {
                f.extend(B, E)
            } else {
                if (typeof E === "string") {
                    var y = E.split("&");
                    for (var A = 0; A < y.length; A++) {
                        var a = y[A].split("=");
                        if (a[0] && a[0]) {
                            B[a[0]] = a[1]
                        }
                    }
                }
            }
            if (x) {
                var C = [];
                var w = String(x).split(",");
                for (var A = 0; A < w.length; A++) {
                    var G = w[A];
                    if (f(G).length) {
                        var F = b.closest("form, .validationEngineContainer").find(G).val();
                        var D = G.replace("#", "") + "=" + escape(F);
                        B[G.replace("#", "")] = F
                    }
                }
            }
            if (H.eventTrigger == "field") {
                delete(H.ajaxValidCache[b.attr("id")])
            }
            if (!H.isError && !d._checkAjaxFieldStatus(b.attr("id"), H)) {
                f.ajax({
                    type: H.ajaxFormValidationMethod,
                    url: c.url,
                    cache: false,
                    dataType: "json",
                    data: B,
                    field: b,
                    rule: c,
                    methods: d,
                    options: H,
                    beforeSend: function () {},
                    error: function (h, g) {
                        d._ajaxError(h, g)
                    },
                    success: function (h) {
                        var l = h[0];
                        var n = f("#" + l).eq(0);
                        if (n.length == 1) {
                            var g = h[1];
                            var m = h[2];
                            if (!g) {
                                H.ajaxValidCache[l] = false;
                                H.isError = true;
                                if (m) {
                                    if (H.allrules[m]) {
                                        var k = H.allrules[m].alertText;
                                        if (k) {
                                            m = k
                                        }
                                    }
                                } else {
                                    m = c.alertText
                                }
                                if (H.showPrompts) {
                                    d._showPrompt(n, m, "", true, H)
                                }
                            } else {
                                H.ajaxValidCache[l] = true;
                                if (m) {
                                    if (H.allrules[m]) {
                                        var k = H.allrules[m].alertTextOk;
                                        if (k) {
                                            m = k
                                        }
                                    }
                                } else {
                                    m = c.alertTextOk
                                }
                                if (H.showPrompts) {
                                    if (m) {
                                        d._showPrompt(n, m, "pass", true, H)
                                    } else {
                                        d._closePrompt(n)
                                    }
                                }
                                if (H.eventTrigger == "submit") {
                                    b.closest("form").submit()
                                }
                            }
                        }
                        n.trigger("jqv.field.result", [n, H.isError, m])
                    }
                });
                return c.alertTextLoad
            }
        },
        _ajaxError: function (b, a) {
            if (b.status == 0 && a == null) {
                alert("The page is not served from a server! ajax call failed")
            } else {
                if (typeof console != "undefined") {
                    console.log("Ajax error: " + b.status + " " + a)
                }
            }
        },
        _dateToString: function (a) {
            return a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate()
        },
        _parseDate: function (a) {
            var b = a.split("-");
            if (b == a) {
                b = a.split("/")
            }
            if (b == a) {
                b = a.split(".");
                return new Date(b[2], (b[1] - 1), b[0])
            }
            return new Date(b[0], (b[1] - 1), b[2])
        },
        _showPrompt: function (a, c, b, m, n, o) {
            if (a.data("jqv-prompt-at") instanceof jQuery) {
                a = a.data("jqv-prompt-at")
            } else {
                if (a.data("jqv-prompt-at")) {
                    a = f(a.data("jqv-prompt-at"))
                }
            }
            var p = d._getPrompt(a);
            if (o) {
                p = false
            }
            if (f.trim(c)) {
                if (p) {
                    d._updatePrompt(a, p, c, b, m, n)
                } else {
                    d._buildPrompt(a, c, b, m, n)
                }
            }
        },
        _buildPrompt: function (u, B, w, r, b) {
            var A = f("<div>");
            A.addClass(d._getClassName(u.attr("id")) + "formError");
            A.addClass("parentForm" + d._getClassName(u.closest("form, .validationEngineContainer").attr("id")));
            A.addClass("formError");
            switch (w) {
                case "pass":
                    A.addClass("greenPopup");
                    break;
                case "load":
                    A.addClass("blackPopup");
                    break;
                default:
            }
            if (r) {
                A.addClass("ajaxed")
            }
            var a = f("<div>").addClass("formErrorContent").html(B).appendTo(A);
            var x = u.data("promptPosition") || b.promptPosition;
            if (b.showArrow) {
                var s = f("<div>").addClass("formErrorArrow");
                if (typeof (x) == "string") {
                    var v = x.indexOf(":");
                    if (v != -1) {
                        x = x.substring(0, v)
                    }
                }
                switch (x) {
                    case "bottomLeft":
                    case "bottomRight":
                        A.find(".formErrorContent").before(s);
                        s.addClass("formErrorArrowBottom").html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
                        break;
                    case "topLeft":
                    case "topRight":
                        s.html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
                        A.append(s);
                        break
                }
            }
            if (b.addPromptClass) {
                A.addClass(b.addPromptClass)
            }
            var c = u.attr("data-required-class");
            if (c !== undefined) {
                A.addClass(c)
            } else {
                if (b.prettySelect) {
                    if (f("#" + u.attr("id")).next().is("select")) {
                        var y = f("#" + u.attr("id").substr(b.usePrefix.length).substring(b.useSuffix.length)).attr("data-required-class");
                        if (y !== undefined) {
                            A.addClass(y)
                        }
                    }
                }
            }
            A.css({
                opacity: 0
            });
            if (x === "inline") {
                A.addClass("inline");
                if (typeof u.attr("data-prompt-target") !== "undefined" && f("#" + u.attr("data-prompt-target")).length > 0) {
                    A.appendTo(f("#" + u.attr("data-prompt-target")))
                } else {
                    u.after(A)
                }
            } else {
                u.before(A)
            }
            var v = d._calculatePosition(u, A, b);
            A.css({
                position: x === "inline" ? "relative" : "absolute",
                top: v.callerTopPosition,
                left: v.callerleftPosition,
                marginTop: v.marginTopSize,
                opacity: 0
            }).data("callerField", u);
            if (b.autoHidePrompt) {
                setTimeout(function () {
                    A.animate({
                        opacity: 0
                    }, function () {
                        A.closest(".formErrorOuter").remove();
                        A.remove()
                    })
                }, b.autoHideDelay)
            }
            return A.animate({
                opacity: 0.87
            })
        },
        _updatePrompt: function (c, s, u, p, b, a, r) {
            if (s) {
                if (typeof p !== "undefined") {
                    if (p == "pass") {
                        s.addClass("greenPopup")
                    } else {
                        s.removeClass("greenPopup")
                    }
                    if (p == "load") {
                        s.addClass("blackPopup")
                    } else {
                        s.removeClass("blackPopup")
                    }
                }
                if (b) {
                    s.addClass("ajaxed")
                } else {
                    s.removeClass("ajaxed")
                }
                s.find(".formErrorContent").html(u);
                var o = d._calculatePosition(c, s, a);
                var q = {
                    top: o.callerTopPosition,
                    left: o.callerleftPosition,
                    marginTop: o.marginTopSize
                };
                if (r) {
                    s.css(q)
                } else {
                    s.animate(q)
                }
            }
        },
        _closePrompt: function (a) {
            var b = d._getPrompt(a);
            if (b) {
                b.fadeTo("fast", 0, function () {
                    b.parent(".formErrorOuter").remove();
                    b.remove()
                })
            }
        },
        closePrompt: function (a) {
            return d._closePrompt(a)
        },
        _getPrompt: function (b) {
            var a = f(b).closest("form, .validationEngineContainer").attr("id");
            var c = d._getClassName(b.attr("id")) + "formError";
            var h = f("." + d._escapeExpression(c) + ".parentForm" + d._getClassName(a))[0];
            if (h) {
                return f(h)
            }
        },
        _escapeExpression: function (a) {
            return a.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1")
        },
        isRTL: function (b) {
            var a = f(document);
            var h = f("body");
            var c = (b && b.hasClass("rtl")) || (b && (b.attr("dir") || "").toLowerCase() === "rtl") || a.hasClass("rtl") || (a.attr("dir") || "").toLowerCase() === "rtl" || h.hasClass("rtl") || (h.attr("dir") || "").toLowerCase() === "rtl";
            return Boolean(c)
        },
        _calculatePosition: function (c, D, H) {
            var E, b, x;
            var C = c.width();
            var G = c.position().left;
            var J = c.position().top;
            var F = c.height();
            var I = D.height();
            E = b = 0;
            x = -I;
            var y = c.data("promptPosition") || H.promptPosition;
            var A = "";
            var B = "";
            var a = 0;
            var w = 0;
            if (typeof (y) == "string") {
                if (y.indexOf(":") != -1) {
                    A = y.substring(y.indexOf(":") + 1);
                    y = y.substring(0, y.indexOf(":"));
                    if (A.indexOf(",") != -1) {
                        B = A.substring(A.indexOf(",") + 1);
                        A = A.substring(0, A.indexOf(","));
                        w = parseInt(B);
                        if (isNaN(w)) {
                            w = 0
                        }
                    }
                    a = parseInt(A);
                    if (isNaN(A)) {
                        A = 0
                    }
                }
            }
            switch (y) {
                default:
                case "topRight":
                    b += G + C - 30;
                    E += J;
                    break;
                case "topLeft":
                    E += J;
                    b += G;
                    break;
                case "centerRight":
                    E = J + 4;
                    x = 0;
                    b = G + c.outerWidth(true) + 5;
                    break;
                case "centerLeft":
                    b = G - (D.width() + 2);
                    E = J + 4;
                    x = 0;
                    break;
                case "bottomLeft":
                    E = J + c.height() + 5;
                    x = 0;
                    b = G;
                    break;
                case "bottomRight":
                    b = G + C - 30;
                    E = J + c.height() + 5;
                    x = 0;
                    break;
                case "inline":
                    b = 0;
                    E = 0;
                    x = 0
            }
            b += a;
            E += w;
            return {
                callerTopPosition: E + "px",
                callerleftPosition: b + "px",
                marginTopSize: x + "px"
            }
        },
        _saveOptions: function (b, c) {
            if (f.validationEngineLanguage) {
                var h = f.validationEngineLanguage.allRules
            } else {
                f.error("jQuery.validationEngine rules are not loaded, plz add localization files to the page")
            }
            f.validationEngine.defaults.allrules = h;
            var a = f.extend(true, {}, f.validationEngine.defaults, c);
            b.data("jqv", a);
            return a
        },
        _getClassName: function (a) {
            if (a) {
                return a.replace(/:/g, "_").replace(/\./g, "_")
            }
        },
        _jqSelector: function (a) {
            return a.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1")
        },
        _condRequired: function (b, a, l, m) {
            var n, c;
            for (n = (l + 1); n < a.length; n++) {
                c = jQuery("#" + a[n]).first();
                if (c.length && d._required(c, ["required"], 0, m, true) == undefined) {
                    return d._required(b, ["required"], 0, m)
                }
            }
        },
        _submitButtonClick: function (a) {
            var c = f(this);
            var b = c.closest("form, .validationEngineContainer");
            b.data("jqv_submitButton", c.attr("id"))
        }
    };
    f.fn.validationEngine = function (a) {
        var b = f(this);
        if (!b[0]) {
            return b
        }
        if (typeof (a) == "string" && a.charAt(0) != "_" && d[a]) {
            if (a != "showPrompt" && a != "hide" && a != "hideAll") {
                d.init.apply(b)
            }
            return d[a].apply(b, Array.prototype.slice.call(arguments, 1))
        } else {
            if (typeof a == "object" || !a) {
                d.init.apply(b, arguments);
                return d.attach.apply(b)
            } else {
                f.error("Method " + a + " does not exist in jQuery.validationEngine")
            }
        }
    };
    f.validationEngine = {
        fieldIdCounter: 0,
        defaults: {
            validationEventTrigger: "blur",
            scroll: true,
            focusFirstField: true,
            showPrompts: true,
            validateNonVisibleFields: false,
            promptPosition: "topRight",
            bindMethod: "bind",
            inlineAjax: false,
            ajaxFormValidation: false,
            ajaxFormValidationURL: false,
            ajaxFormValidationMethod: "get",
            onAjaxFormComplete: f.noop,
            onBeforeAjaxFormValidation: f.noop,
            onValidationComplete: false,
            doNotShowAllErrosOnSubmit: false,
            custom_error_messages: {},
            binded: true,
            showArrow: true,
            isError: false,
            maxErrorsPerField: false,
            ajaxValidCache: {},
            autoPositionUpdate: false,
            InvalidFields: [],
            onFieldSuccess: false,
            onFieldFailure: false,
            onSuccess: false,
            onFailure: false,
            validateAttribute: "class",
            addSuccessCssClassToField: "",
            addFailureCssClassToField: "",
            autoHidePrompt: false,
            autoHideDelay: 10000,
            fadeDuration: 0.3,
            prettySelect: false,
            addPromptClass: "",
            usePrefix: "",
            useSuffix: "",
            showOneMessage: false
        }
    };
    var e = {
        hook: "rightmiddle",
        hideOn: false,
        skin: "cloud",
        hideOthers: false
    };
    d._buildPrompt = function (a, c, b, k, l) {
        a.data("promptText", c);
        Tipped.create(a[0], c, e);
        Tipped.show(a[0])
    };
    d._closePrompt = function (a) {
        a.data("promptText", "");
        Tipped.remove(a[0])
    };
    d._updatePrompt = function (a, p, c, b, m, n, o) {
        if (a.data("promptText") != c) {
            d._closePrompt(a);
            d._buildPrompt(a, c)
        }
    };
    d._getPrompt = function (a) {
        return Tipped.get(a[0])
    };
    f(function () {
        f.validationEngine.defaults.promptPosition = d.isRTL() ? "topLeft" : "topRight"
    })
})(jQuery);
(function (b) {
    b.fn.wipetouch = function (d) {
        var a = {
            moveX: 40,
            moveY: 40,
            tapToClick: false,
            preventDefault: true,
            allowDiagonal: false,
            preventDefaultWhenTriggering: true,
            wipeLeft: false,
            wipeRight: false,
            wipeUp: false,
            wipeDown: false,
            wipeUpLeft: false,
            wipeDownLeft: false,
            wipeUpRight: false,
            wipeDownRight: false,
            wipeMove: false,
            wipeTopLeft: false,
            wipeBottomLeft: false,
            wipeTopRight: false,
            wipeBottomRight: false
        };
        if (d) {
            b.extend(a, d)
        }
        this.each(function () {
            var B;
            var C;
            var E = false;
            var F;
            var G;
            var x = false;
            var I = false;
            var J = false;
            var c = false;

            function D(f) {
                A();
                var e = J || (f.originalEvent.touches && f.originalEvent.touches.length > 0);
                if (!x && e) {
                    if (a.preventDefault) {
                        f.preventDefault()
                    }
                    if (a.allowDiagonal) {
                        if (!a.wipeDownLeft) {
                            a.wipeDownLeft = a.wipeBottomLeft
                        }
                        if (!a.wipeDownRight) {
                            a.wipeDownRight = a.wipeBottomRight
                        }
                        if (!a.wipeUpLeft) {
                            a.wipeUpLeft = a.wipeTopLeft
                        }
                        if (!a.wipeUpRight) {
                            a.wipeUpRight = a.wipeTopRight
                        }
                    }
                    if (J) {
                        B = f.pageX;
                        C = f.pageY;
                        b(this).bind("mousemove", H);
                        b(this).one("mouseup", v)
                    } else {
                        B = f.originalEvent.touches[0].pageX;
                        C = f.originalEvent.touches[0].pageY;
                        b(this).bind("touchmove", H)
                    }
                    E = new Date().getTime();
                    F = B;
                    G = C;
                    x = true;
                    I = b(f.target)
                }
            }

            function v(e) {
                if (a.preventDefault) {
                    e.preventDefault()
                }
                if (J) {
                    b(this).unbind("mousemove", H)
                } else {
                    b(this).unbind("touchmove", H)
                }
                if (x) {
                    y(e)
                } else {
                    A()
                }
            }

            function H(e) {
                if (a.preventDefault) {
                    e.preventDefault()
                }
                if (J && !x) {
                    D(e)
                }
                if (x) {
                    if (J) {
                        F = e.pageX;
                        G = e.pageY
                    } else {
                        F = e.originalEvent.touches[0].pageX;
                        G = e.originalEvent.touches[0].pageY
                    }
                    if (a.wipeMove) {
                        w(a.wipeMove, {
                            curX: F,
                            curY: G
                        })
                    }
                }
            }

            function y(f) {
                var g = new Date().getTime();
                var p = E - g;
                var N = F;
                var e = G;
                var k = N - B;
                var o = e - C;
                var r = Math.abs(k);
                var l = Math.abs(o);
                if (r < 15 && l < 15 && p < 100) {
                    c = false;
                    if (a.preventDefault) {
                        A();
                        I.trigger("click");
                        return
                    }
                } else {
                    if (J) {
                        var q = I.data("events");
                        if (q) {
                            var s = q.click;
                            if (s && s.length > 0) {
                                b.each(s, function (K, L) {
                                    c = L;
                                    return
                                });
                                I.unbind("click")
                            }
                        }
                    }
                }
                var u = k > 0;
                var h = o > 0;
                var m = ((r + l) * 60) / ((p) / 6 * (p));
                if (m < 1) {
                    m = 1
                }
                if (m > 5) {
                    m = 5
                }
                var n = {
                    speed: parseInt(m),
                    x: r,
                    y: l,
                    source: I
                };
                if (r >= a.moveX) {
                    if (a.allowDiagonal && l >= a.moveY) {
                        if (u && h) {
                            w(a.wipeDownRight, n, f)
                        } else {
                            if (u && !h) {
                                w(a.wipeUpRight, n, f)
                            } else {
                                if (!u && h) {
                                    w(a.wipeDownLeft, n, f)
                                } else {
                                    w(a.wipeUpLeft, n, f)
                                }
                            }
                        }
                    } else {
                        if (r >= l) {
                            if (u) {
                                w(a.wipeRight, n, f)
                            } else {
                                w(a.wipeLeft, n, f)
                            }
                        }
                    }
                } else {
                    if (l >= a.moveY && l > r) {
                        if (h) {
                            w(a.wipeDown, n, f)
                        } else {
                            w(a.wipeUp, n, f)
                        }
                    }
                }
                A()
            }

            function A() {
                B = false;
                C = false;
                E = false;
                x = false;
                if (c) {
                    window.setTimeout(function () {
                        I.bind("click", c);
                        c = false
                    }, 50)
                }
            }

            function w(e, g, f) {
                if (e) {
                    if (a.preventDefaultWhenTriggering) {
                        f.preventDefault()
                    }
                    e(g)
                }
            }
            if ("ontouchstart" in document.documentElement) {
                b(this).bind("touchstart", D);
                b(this).bind("touchend", v)
            } else {
                J = true;
                b(this).bind("mousedown", D);
                b(this).bind("mouseout mouseup", v)
            }
        });
        return this
    }
})(jQuery);
!function (b) {
    "undefined" != typeof module && module.exports ? module.exports = b : b(jQuery, window, document)
}(function (b) {
    !function (k) {
        var h = "function" == typeof define && define.amd,
                a = "undefined" != typeof module && module.exports,
                g = "https:" == document.location.protocol ? "https:" : "http:",
                l = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
        h || (a ? require("jquery-mousewheel")(b) : b.event.special.mousewheel || b("head").append(decodeURI("%3Cscript src=" + g + "//" + l + "%3E%3C/script%3E"))), k()
    }(function () {
        var V, Q = "mCustomScrollbar",
                ag = "mCS",
                P = ".mCustomScrollbar",
                K = {
                    setTop: 0,
                    setLeft: 0,
                    axis: "y",
                    scrollbarPosition: "inside",
                    scrollInertia: 950,
                    autoDraggerLength: !0,
                    alwaysShowScrollbar: 0,
                    snapOffset: 0,
                    mouseWheel: {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        deltaFactor: "auto",
                        disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                    },
                    scrollButtons: {
                        scrollType: "stepless",
                        scrollAmount: "auto"
                    },
                    keyboard: {
                        enable: !0,
                        scrollType: "stepless",
                        scrollAmount: "auto"
                    },
                    contentTouchScroll: 25,
                    advanced: {
                        autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                        updateOnContentResize: !0,
                        updateOnImageLoad: !0,
                        autoUpdateTimeout: 60
                    },
                    theme: "light",
                    callbacks: {
                        onTotalScrollOffset: 0,
                        onTotalScrollBackOffset: 0,
                        alwaysTriggerOffsets: !0
                    }
                },
        T = 0,
                N = {},
                U = window.attachEvent && !window.addEventListener ? 1 : 0,
                F = !1,
                G = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
                W = {
                    init: function (e) {
                        var e = b.extend(!0, {}, K, e),
                                al = H.call(this);
                        if (e.live) {
                            var am = e.liveSelector || this.selector || P,
                                    ak = b(am);
                            if ("off" === e.live) {
                                return void O(am)
                            }
                            N[am] = setTimeout(function () {
                                ak.mCustomScrollbar(e), "once" === e.live && ak.length && O(am)
                            }, 500)
                        } else {
                            O(am)
                        }
                        return e.setWidth = e.set_width ? e.set_width : e.setWidth, e.setHeight = e.set_height ? e.set_height : e.setHeight, e.axis = e.horizontalScroll ? "x" : R(e.axis), e.scrollInertia = e.scrollInertia > 0 && e.scrollInertia < 17 ? 17 : e.scrollInertia, "object" != typeof e.mouseWheel && 1 == e.mouseWheel && (e.mouseWheel = {
                            enable: !0,
                            scrollAmount: "auto",
                            axis: "y",
                            preventDefault: !1,
                            deltaFactor: "auto",
                            normalizeDelta: !1,
                            invert: !1
                        }), e.mouseWheel.scrollAmount = e.mouseWheelPixels ? e.mouseWheelPixels : e.mouseWheel.scrollAmount, e.mouseWheel.normalizeDelta = e.advanced.normalizeMouseWheelDelta ? e.advanced.normalizeMouseWheelDelta : e.mouseWheel.normalizeDelta, e.scrollButtons.scrollType = I(e.scrollButtons.scrollType), J(e), b(al).each(function () {
                            var at = b(this);
                            if (!at.data(ag)) {
                                at.data(ag, {
                                    idx: ++T,
                                    opt: e,
                                    scrollRatio: {
                                        y: null,
                                        x: null
                                    },
                                    overflowed: null,
                                    contentReset: {
                                        y: null,
                                        x: null
                                    },
                                    bindEvents: !1,
                                    tweenRunning: !1,
                                    sequential: {},
                                    langDir: at.css("direction"),
                                    cbOffsets: null,
                                    trigger: null
                                });
                                var aq = at.data(ag),
                                        ao = aq.opt,
                                        ap = at.data("mcs-axis"),
                                        an = at.data("mcs-scrollbar-position"),
                                        ar = at.data("mcs-theme");
                                ap && (ao.axis = ap), an && (ao.scrollbarPosition = an), ar && (ao.theme = ar, J(ao)), X.call(this), b("#mCSB_" + aq.idx + "_container img:not(." + G[2] + ")").addClass(G[2]), W.update.call(null, at)
                            }
                        })
                    },
                    update: function (e, al) {
                        var ak = e || H.call(this);
                        return b(ak).each(function () {
                            var ao = b(this);
                            if (ao.data(ag)) {
                                var ar = ao.data(ag),
                                        ap = ar.opt,
                                        am = b("#mCSB_" + ar.idx + "_container"),
                                        aq = [b("#mCSB_" + ar.idx + "_dragger_vertical"), b("#mCSB_" + ar.idx + "_dragger_horizontal")];
                                if (!am.length) {
                                    return
                                }
                                ar.tweenRunning && A(ao), ao.hasClass(G[3]) && ao.removeClass(G[3]), ao.hasClass(G[4]) && ao.removeClass(G[4]), w.call(this), af.call(this), "y" === ap.axis || ap.advanced.autoExpandHorizontalScroll || am.css("width", Z(am.children())), ar.overflowed = a.call(this), r.call(this), ap.autoDraggerLength && ai.call(this), c.call(this), M.call(this);
                                var an = [Math.abs(am[0].offsetTop), Math.abs(am[0].offsetLeft)];
                                "x" !== ap.axis && (ar.overflowed[0] ? aq[0].height() > aq[0].parent().height() ? x.call(this) : (u(ao, an[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }), ar.contentReset.y = null) : (x.call(this), "y" === ap.axis ? p.call(this) : "yx" === ap.axis && ar.overflowed[1] && u(ao, an[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }))), "y" !== ap.axis && (ar.overflowed[1] ? aq[1].width() > aq[1].parent().width() ? x.call(this) : (u(ao, an[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }), ar.contentReset.x = null) : (x.call(this), "x" === ap.axis ? p.call(this) : "yx" === ap.axis && ar.overflowed[0] && u(ao, an[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }))), al && ar && (2 === al && ap.callbacks.onImageLoad && "function" == typeof ap.callbacks.onImageLoad ? ap.callbacks.onImageLoad.call(this) : 3 === al && ap.callbacks.onSelectorChange && "function" == typeof ap.callbacks.onSelectorChange ? ap.callbacks.onSelectorChange.call(this) : ap.callbacks.onUpdate && "function" == typeof ap.callbacks.onUpdate && ap.callbacks.onUpdate.call(this)), D.call(this)
                            }
                        })
                    },
                    scrollTo: function (e, al) {
                        if ("undefined" != typeof e && null != e) {
                            var ak = H.call(this);
                            return b(ak).each(function () {
                                var ar = b(this);
                                if (ar.data(ag)) {
                                    var ap = ar.data(ag),
                                            an = ap.opt,
                                            aq = {
                                                trigger: "external",
                                                scrollInertia: an.scrollInertia,
                                                scrollEasing: "mcsEaseInOut",
                                                moveDragger: !1,
                                                timeout: 60,
                                                callbacks: !0,
                                                onStart: !0,
                                                onUpdate: !0,
                                                onComplete: !0
                                            },
                                    ao = b.extend(!0, {}, aq, al),
                                            at = E.call(this, e),
                                            am = ao.scrollInertia > 0 && ao.scrollInertia < 17 ? 17 : ao.scrollInertia;
                                    at[0] = L.call(this, at[0], "y"), at[1] = L.call(this, at[1], "x"), ao.moveDragger && (at[0] *= ap.scrollRatio.y, at[1] *= ap.scrollRatio.x), ao.dur = am, setTimeout(function () {
                                        null !== at[0] && "undefined" != typeof at[0] && "x" !== an.axis && ap.overflowed[0] && (ao.dir = "y", ao.overwrite = "all", u(ar, at[0].toString(), ao)), null !== at[1] && "undefined" != typeof at[1] && "y" !== an.axis && ap.overflowed[1] && (ao.dir = "x", ao.overwrite = "none", u(ar, at[1].toString(), ao))
                                    }, ao.timeout)
                                }
                            })
                        }
                    },
                    stop: function () {
                        var e = H.call(this);
                        return b(e).each(function () {
                            var ak = b(this);
                            ak.data(ag) && A(ak)
                        })
                    },
                    disable: function (e) {
                        var ak = H.call(this);
                        return b(ak).each(function () {
                            var al = b(this);
                            if (al.data(ag)) {
                                al.data(ag);
                                D.call(this, "remove"), p.call(this), e && x.call(this), r.call(this, !0), al.addClass(G[3])
                            }
                        })
                    },
                    destroy: function () {
                        var e = H.call(this);
                        return b(e).each(function () {
                            var ak = b(this);
                            if (ak.data(ag)) {
                                var ao = ak.data(ag),
                                        am = ao.opt,
                                        ap = b("#mCSB_" + ao.idx),
                                        an = b("#mCSB_" + ao.idx + "_container"),
                                        al = b(".mCSB_" + ao.idx + "_scrollbar");
                                am.live && O(am.liveSelector || b(e).selector), D.call(this, "remove"), p.call(this), x.call(this), ak.removeData(ag), aj(this, "mcs"), al.remove(), an.find("img." + G[2]).removeClass(G[2]), ap.replaceWith(an.contents()), ak.removeClass(Q + " _" + ag + "_" + ao.idx + " " + G[6] + " " + G[7] + " " + G[5] + " " + G[3]).addClass(G[4])
                            }
                        })
                    }
                },
        H = function () {
            return "object" != typeof b(this) || b(this).length < 1 ? P : this
        },
                J = function (an) {
                    var al = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                            e = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                            ak = ["minimal", "minimal-dark"],
                            ao = ["minimal", "minimal-dark"],
                            am = ["minimal", "minimal-dark"];
                    an.autoDraggerLength = b.inArray(an.theme, al) > -1 ? !1 : an.autoDraggerLength, an.autoExpandScrollbar = b.inArray(an.theme, e) > -1 ? !1 : an.autoExpandScrollbar, an.scrollButtons.enable = b.inArray(an.theme, ak) > -1 ? !1 : an.scrollButtons.enable, an.autoHideScrollbar = b.inArray(an.theme, ao) > -1 ? !0 : an.autoHideScrollbar, an.scrollbarPosition = b.inArray(an.theme, am) > -1 ? "outside" : an.scrollbarPosition
                },
                O = function (e) {
                    N[e] && (clearTimeout(N[e]), aj(N, e))
                },
                R = function (e) {
                    return "yx" === e || "xy" === e || "auto" === e ? "yx" : "x" === e || "horizontal" === e ? "x" : "y"
                },
                I = function (e) {
                    return "stepped" === e || "pixels" === e || "step" === e || "click" === e ? "stepped" : "stepless"
                },
                X = function () {
                    var ak = b(this),
                            ap = ak.data(ag),
                            aw = ap.opt,
                            at = aw.autoExpandScrollbar ? " " + G[1] + "_expand" : "",
                            al = ["<div id='mCSB_" + ap.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + ap.idx + "_scrollbar mCS-" + aw.theme + " mCSB_scrollTools_vertical" + at + "'><div class='" + G[12] + "'><div id='mCSB_" + ap.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + ap.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + ap.idx + "_scrollbar mCS-" + aw.theme + " mCSB_scrollTools_horizontal" + at + "'><div class='" + G[12] + "'><div id='mCSB_" + ap.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                            e = "yx" === aw.axis ? "mCSB_vertical_horizontal" : "x" === aw.axis ? "mCSB_horizontal" : "mCSB_vertical",
                            ao = "yx" === aw.axis ? al[0] + al[1] : "x" === aw.axis ? al[1] : al[0],
                            am = "yx" === aw.axis ? "<div id='mCSB_" + ap.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                            ar = aw.autoHideScrollbar ? " " + G[6] : "",
                            av = "x" !== aw.axis && "rtl" === ap.langDir ? " " + G[7] : "";
                    aw.setWidth && ak.css("width", aw.setWidth), aw.setHeight && ak.css("height", aw.setHeight), aw.setLeft = "y" !== aw.axis && "rtl" === ap.langDir ? "989999px" : aw.setLeft, ak.addClass(Q + " _" + ag + "_" + ap.idx + ar + av).wrapInner("<div id='mCSB_" + ap.idx + "' class='mCustomScrollBox mCS-" + aw.theme + " " + e + "'><div id='mCSB_" + ap.idx + "_container' class='mCSB_container' style='position:relative; top:" + aw.setTop + "; left:" + aw.setLeft + ";' dir=" + ap.langDir + " /></div>");
                    var an = b("#mCSB_" + ap.idx),
                            aq = b("#mCSB_" + ap.idx + "_container");
                    "y" === aw.axis || aw.advanced.autoExpandHorizontalScroll || aq.css("width", Z(aq.children())), "outside" === aw.scrollbarPosition ? ("static" === ak.css("position") && ak.css("position", "relative"), ak.css("overflow", "visible"), an.addClass("mCSB_outside").after(ao)) : (an.addClass("mCSB_inside").append(ao), aq.wrap(am)), Y.call(this);
                    var au = [b("#mCSB_" + ap.idx + "_dragger_vertical"), b("#mCSB_" + ap.idx + "_dragger_horizontal")];
                    au[0].css("min-height", au[0].height()), au[1].css("min-width", au[1].width())
                },
                Z = function (e) {
                    return Math.max.apply(Math, e.map(function () {
                        return b(this).outerWidth(!0)
                    }).get())
                },
                af = function () {
                    var am = b(this),
                            al = am.data(ag),
                            ak = al.opt,
                            e = b("#mCSB_" + al.idx + "_container");
                    ak.advanced.autoExpandHorizontalScroll && "y" !== ak.axis && e.css({
                        position: "absolute",
                        width: "auto"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(e[0].getBoundingClientRect().right + 0.4) - Math.floor(e[0].getBoundingClientRect().left),
                        position: "relative"
                    }).unwrap()
                },
                Y = function () {
                    var ao = b(this),
                            al = ao.data(ag),
                            ak = al.opt,
                            ap = b(".mCSB_" + al.idx + "_scrollbar:first"),
                            am = C(ak.scrollButtons.tabindex) ? "tabindex='" + ak.scrollButtons.tabindex + "'" : "",
                            e = ["<a href='#' class='" + G[13] + "' oncontextmenu='return false;' " + am + " />", "<a href='#' class='" + G[14] + "' oncontextmenu='return false;' " + am + " />", "<a href='#' class='" + G[15] + "' oncontextmenu='return false;' " + am + " />", "<a href='#' class='" + G[16] + "' oncontextmenu='return false;' " + am + " />"],
                            an = ["x" === ak.axis ? e[2] : e[0], "x" === ak.axis ? e[3] : e[1], e[2], e[3]];
                    ak.scrollButtons.enable && ap.prepend(an[0]).append(an[1]).next(".mCSB_scrollTools").prepend(an[2]).append(an[3])
                },
                w = function () {
                    var ao = b(this),
                            al = ao.data(ag),
                            ak = b("#mCSB_" + al.idx),
                            ap = ao.css("max-height") || "none",
                            am = -1 !== ap.indexOf("%"),
                            e = ao.css("box-sizing");
                    if ("none" !== ap) {
                        var an = am ? ao.parent().height() * parseInt(ap) / 100 : parseInt(ap);
                        "border-box" === e && (an -= ao.innerHeight() - ao.height() + (ao.outerHeight() - ao.innerHeight())), ak.css("max-height", Math.round(an))
                    }
                },
                ai = function () {
                    var ar = b(this),
                            ap = ar.data(ag),
                            ao = b("#mCSB_" + ap.idx),
                            am = b("#mCSB_" + ap.idx + "_container"),
                            aq = [b("#mCSB_" + ap.idx + "_dragger_vertical"), b("#mCSB_" + ap.idx + "_dragger_horizontal")],
                            an = [ao.height() / am.outerHeight(!1), ao.width() / am.outerWidth(!1)],
                            ak = [parseInt(aq[0].css("min-height")), Math.round(an[0] * aq[0].parent().height()), parseInt(aq[1].css("min-width")), Math.round(an[1] * aq[1].parent().width())],
                            al = U && ak[1] < ak[0] ? ak[0] : ak[1],
                            e = U && ak[3] < ak[2] ? ak[2] : ak[3];
                    aq[0].css({
                        height: al,
                        "max-height": aq[0].parent().height() - 10
                    }).find(".mCSB_dragger_bar").css({
                        "line-height": ak[0] + "px"
                    }), aq[1].css({
                        width: e,
                        "max-width": aq[1].parent().width() - 10
                    })
                },
                c = function () {
                    var ao = b(this),
                            al = ao.data(ag),
                            ak = b("#mCSB_" + al.idx),
                            ap = b("#mCSB_" + al.idx + "_container"),
                            am = [b("#mCSB_" + al.idx + "_dragger_vertical"), b("#mCSB_" + al.idx + "_dragger_horizontal")],
                            e = [ap.outerHeight(!1) - ak.height(), ap.outerWidth(!1) - ak.width()],
                            an = [e[0] / (am[0].parent().height() - am[0].height()), e[1] / (am[1].parent().width() - am[1].width())];
                    al.scrollRatio = {
                        y: an[0],
                        x: an[1]
                    }
                },
                aa = function (am, an, al) {
                    var e = al ? G[0] + "_expanded" : "",
                            ak = am.closest(".mCSB_scrollTools");
                    "active" === an ? (am.toggleClass(G[0] + " " + e), ak.toggleClass(G[1]), am[0]._draggable = am[0]._draggable ? 0 : 1) : am[0]._draggable || ("hide" === an ? (am.removeClass(G[0]), ak.removeClass(G[1])) : (am.addClass(G[0]), ak.addClass(G[1])))
                },
                a = function () {
                    var an = b(this),
                            al = an.data(ag),
                            ak = b("#mCSB_" + al.idx),
                            ao = b("#mCSB_" + al.idx + "_container"),
                            am = null == al.overflowed ? ao.height() : ao.outerHeight(!1),
                            e = null == al.overflowed ? ao.width() : ao.outerWidth(!1);
                    return [am > ak.height(), e > ak.width()]
                },
                x = function () {
                    var ao = b(this),
                            al = ao.data(ag),
                            ak = al.opt,
                            ap = b("#mCSB_" + al.idx),
                            am = b("#mCSB_" + al.idx + "_container"),
                            e = [b("#mCSB_" + al.idx + "_dragger_vertical"), b("#mCSB_" + al.idx + "_dragger_horizontal")];
                    if (A(ao), ("x" !== ak.axis && !al.overflowed[0] || "y" === ak.axis && al.overflowed[0]) && (e[0].add(am).css("top", 0), u(ao, "_resetY")), "y" !== ak.axis && !al.overflowed[1] || "x" === ak.axis && al.overflowed[1]) {
                        var an = dx = 0;
                        "rtl" === al.langDir && (an = ap.width() - am.outerWidth(!1), dx = Math.abs(an / al.scrollRatio.x)), am.css("left", an), e[1].css("left", dx), u(ao, "_resetX")
                    }
                },
                M = function () {
                    function an() {
                        am = setTimeout(function () {
                            b.event.special.mousewheel ? (clearTimeout(am), B.call(al[0])) : an()
                        }, 100)
                    }
                    var al = b(this),
                            ak = al.data(ag),
                            e = ak.opt;
                    if (!ak.bindEvents) {
                        if (v.call(this), e.contentTouchScroll && d.call(this), f.call(this), e.mouseWheel.enable) {
                            var am;
                            an()
                        }
                        s.call(this), k.call(this), e.advanced.autoScrollOnFocus && ab.call(this), e.scrollButtons.enable && y.call(this), e.keyboard.enable && g.call(this), ak.bindEvents = !0
                    }
                },
                p = function () {
                    var ao = b(this),
                            al = ao.data(ag),
                            ak = al.opt,
                            ap = ag + "_" + al.idx,
                            am = ".mCSB_" + al.idx + "_scrollbar",
                            e = b("#mCSB_" + al.idx + ",#mCSB_" + al.idx + "_container,#mCSB_" + al.idx + "_container_wrapper," + am + " ." + G[12] + ",#mCSB_" + al.idx + "_dragger_vertical,#mCSB_" + al.idx + "_dragger_horizontal," + am + ">a"),
                            an = b("#mCSB_" + al.idx + "_container");
                    ak.advanced.releaseDraggableSelectors && e.add(b(ak.advanced.releaseDraggableSelectors)), al.bindEvents && (b(document).unbind("." + ap), e.each(function () {
                        b(this).unbind("." + ap)
                    }), clearTimeout(ao[0]._focusTimeout), aj(ao[0], "_focusTimeout"), clearTimeout(al.sequential.step), aj(al.sequential, "step"), clearTimeout(an[0].onCompleteTimeout), aj(an[0], "onCompleteTimeout"), al.bindEvents = !1)
                },
                r = function (ao) {
                    var al = b(this),
                            ap = al.data(ag),
                            aq = ap.opt,
                            am = b("#mCSB_" + ap.idx + "_container_wrapper"),
                            ak = am.length ? am : b("#mCSB_" + ap.idx + "_container"),
                            an = [b("#mCSB_" + ap.idx + "_scrollbar_vertical"), b("#mCSB_" + ap.idx + "_scrollbar_horizontal")],
                            e = [an[0].find(".mCSB_dragger"), an[1].find(".mCSB_dragger")];
                    "x" !== aq.axis && (ap.overflowed[0] && !ao ? (an[0].add(e[0]).add(an[0].children("a")).css("display", "block"), ak.removeClass(G[8] + " " + G[10])) : (aq.alwaysShowScrollbar ? (2 !== aq.alwaysShowScrollbar && e[0].css("display", "none"), ak.removeClass(G[10])) : (an[0].css("display", "none"), ak.addClass(G[10])), ak.addClass(G[8]))), "y" !== aq.axis && (ap.overflowed[1] && !ao ? (an[1].add(e[1]).add(an[1].children("a")).css("display", "block"), ak.removeClass(G[9] + " " + G[11])) : (aq.alwaysShowScrollbar ? (2 !== aq.alwaysShowScrollbar && e[1].css("display", "none"), ak.removeClass(G[11])) : (an[1].css("display", "none"), ak.addClass(G[11])), ak.addClass(G[9]))), ap.overflowed[0] || ap.overflowed[1] ? al.removeClass(G[5]) : al.addClass(G[5])
                },
                l = function (al) {
                    var am = al.type;
                    switch (am) {
                        case "pointerdown":
                        case "MSPointerDown":
                        case "pointermove":
                        case "MSPointerMove":
                        case "pointerup":
                        case "MSPointerUp":
                            return al.target.ownerDocument !== document ? [al.originalEvent.screenY, al.originalEvent.screenX, !1] : [al.originalEvent.pageY, al.originalEvent.pageX, !1];
                        case "touchstart":
                        case "touchmove":
                        case "touchend":
                            var ak = al.originalEvent.touches[0] || al.originalEvent.changedTouches[0],
                                    e = al.originalEvent.touches.length || al.originalEvent.changedTouches.length;
                            return al.target.ownerDocument !== document ? [ak.screenY, ak.screenX, e > 1] : [ak.pageY, ak.pageX, e > 1];
                        default:
                            return [al.pageY, al.pageX, !1]
                    }
                },
                v = function () {
                    function e(ay) {
                        var az = aw.find("iframe");
                        if (az.length) {
                            var ax = ay ? "auto" : "none";
                            az.css("pointer-events", ax)
                        }
                    }

                    function ao(ay, aA, ax, aC) {
                        if (aw[0].idleTimer = ak.scrollInertia < 233 ? 250 : 0, al.attr("id") === at[1]) {
                            var aB = "x",
                                    az = (al[0].offsetLeft - aA + aC) * am.scrollRatio.x
                        } else {
                            var aB = "y",
                                    az = (al[0].offsetTop - ay + ax) * am.scrollRatio.y
                        }
                        u(av, az.toString(), {
                            dir: aB,
                            drag: !0
                        })
                    }
                    var al, au, ar, av = b(this),
                            am = av.data(ag),
                            ak = am.opt,
                            an = ag + "_" + am.idx,
                            at = ["mCSB_" + am.idx + "_dragger_vertical", "mCSB_" + am.idx + "_dragger_horizontal"],
                            aw = b("#mCSB_" + am.idx + "_container"),
                            ap = b("#" + at[0] + ",#" + at[1]),
                            aq = ak.advanced.releaseDraggableSelectors ? ap.add(b(ak.advanced.releaseDraggableSelectors)) : ap;
                    ap.bind("mousedown." + an + " touchstart." + an + " pointerdown." + an + " MSPointerDown." + an, function (ay) {
                        if (ay.stopImmediatePropagation(), ay.preventDefault(), ad(ay)) {
                            F = !0, U && (document.onselectstart = function () {
                                return !1
                            }), e(!1), A(av), al = b(this);
                            var ax = al.offset(),
                                    aA = l(ay)[0] - ax.top,
                                    aB = l(ay)[1] - ax.left,
                                    aC = al.height() + ax.top,
                                    az = al.width() + ax.left;
                            aC > aA && aA > 0 && az > aB && aB > 0 && (au = aA, ar = aB), aa(al, "active", ak.autoExpandScrollbar)
                        }
                    }).bind("touchmove." + an, function (ax) {
                        ax.stopImmediatePropagation(), ax.preventDefault();
                        var ay = al.offset(),
                                az = l(ax)[0] - ay.top,
                                aA = l(ax)[1] - ay.left;
                        ao(au, ar, az, aA)
                    }), b(document).bind("mousemove." + an + " pointermove." + an + " MSPointerMove." + an, function (ax) {
                        if (al) {
                            var ay = al.offset(),
                                    az = l(ax)[0] - ay.top,
                                    aA = l(ax)[1] - ay.left;
                            if (au === az) {
                                return
                            }
                            ao(au, ar, az, aA)
                        }
                    }).add(aq).bind("mouseup." + an + " touchend." + an + " pointerup." + an + " MSPointerUp." + an, function (ax) {
                        al && (aa(al, "active", ak.autoExpandScrollbar), al = null), F = !1, U && (document.onselectstart = null), e(!0)
                    })
                },
                d = function () {
                    function aK(aR) {
                        if (!ah(aR) || F || l(aR)[2]) {
                            return void(V = 0)
                        }
                        V = 1, aI = 0, am = 0, aQ.removeClass("mCS_touch_action");
                        var aS = aE.offset();
                        ao = l(aR)[0] - aS.top, ar = l(aR)[1] - aS.left, aM = [l(aR)[0], l(aR)[1]]
                    }

                    function aA(aR) {
                        if (ah(aR) && !F && !l(aR)[2] && (aR.stopImmediatePropagation(), !am || aI)) {
                            aL = m();
                            var aY = aw.offset(),
                                    aW = l(aR)[0] - aY.top,
                                    aZ = l(aR)[1] - aY.left,
                                    aV = "mcsLinearOut";
                            if (aH.push(aW), al.push(aZ), aM[2] = Math.abs(l(aR)[0] - aM[0]), aM[3] = Math.abs(l(aR)[1] - aM[1]), aC.overflowed[0]) {
                                var aT = aF[0].parent().height() - aF[0].height(),
                                        aX = ao - aW > 0 && aW - ao > -(aT * aC.scrollRatio.y) && (2 * aM[3] < aM[2] || "yx" === aN.axis)
                            }
                            if (aC.overflowed[1]) {
                                var aU = aF[1].parent().width() - aF[1].width(),
                                        aS = ar - aZ > 0 && aZ - ar > -(aU * aC.scrollRatio.x) && (2 * aM[2] < aM[3] || "yx" === aN.axis)
                            }
                            aX || aS ? (aR.preventDefault(), aI = 1) : (am = 1, aQ.addClass("mCS_touch_action")), e = "yx" === aN.axis ? [ao - aW, ar - aZ] : "x" === aN.axis ? [null, ar - aZ] : [ao - aW, null], aE[0].idleTimer = 250, aC.overflowed[0] && ak(e[0], an, aV, "y", "all", !0), aC.overflowed[1] && ak(e[1], an, aV, "x", aO, !0)
                        }
                    }

                    function av(aR) {
                        if (!ah(aR) || F || l(aR)[2]) {
                            return void(V = 0)
                        }
                        V = 1, aR.stopImmediatePropagation(), A(aQ), ay = m();
                        var aS = aw.offset();
                        ap = l(aR)[0] - aS.top, at = l(aR)[1] - aS.left, aH = [], al = []
                    }

                    function aP(aT) {
                        if (ah(aT) && !F && !l(aT)[2]) {
                            aT.stopImmediatePropagation(), aI = 0, am = 0, aq = m();
                            var aZ = aw.offset(),
                                    aW = l(aT)[0] - aZ.top,
                                    aR = l(aT)[1] - aZ.left;
                            if (!(aq - aL > 30)) {
                                aB = 1000 / (aq - ay);
                                var aV = "mcsEaseOut",
                                        aU = 2.5 > aB,
                                        aY = aU ? [aH[aH.length - 2], al[al.length - 2]] : [0, 0];
                                au = aU ? [aW - aY[0], aR - aY[1]] : [aW - ap, aR - at];
                                var aS = [Math.abs(au[0]), Math.abs(au[1])];
                                aB = aU ? [Math.abs(au[0] / 4), Math.abs(au[1] / 4)] : [aB, aB];
                                var a0 = [Math.abs(aE[0].offsetTop) - au[0] * ax(aS[0] / aB[0], aB[0]), Math.abs(aE[0].offsetLeft) - au[1] * ax(aS[1] / aB[1], aB[1])];
                                e = "yx" === aN.axis ? [a0[0], a0[1]] : "x" === aN.axis ? [null, a0[1]] : [a0[0], null], az = [4 * aS[0] + aN.scrollInertia, 4 * aS[1] + aN.scrollInertia];
                                var aX = parseInt(aN.contentTouchScroll) || 0;
                                e[0] = aS[0] > aX ? e[0] : 0, e[1] = aS[1] > aX ? e[1] : 0, aC.overflowed[0] && ak(e[0], az[0], aV, "y", aO, !1), aC.overflowed[1] && ak(e[1], az[1], aV, "x", aO, !1)
                            }
                        }
                    }

                    function ax(aT, aR) {
                        var aS = [1.5 * aR, 2 * aR, aR / 1.5, aR / 2];
                        return aT > 90 ? aR > 4 ? aS[0] : aS[3] : aT > 60 ? aR > 3 ? aS[3] : aS[2] : aT > 30 ? aR > 8 ? aS[1] : aR > 6 ? aS[0] : aR > 4 ? aR : aS[2] : aR > 8 ? aR : aS[3]
                    }

                    function ak(aU, aV, aT, aR, aS, aW) {
                        aU && u(aQ, aU.toString(), {
                            dur: aV,
                            scrollEasing: aT,
                            dir: aR,
                            overwrite: aS,
                            drag: aW
                        })
                    }
                    var ao, ar, ap, at, ay, aL, aq, au, aB, e, az, aI, am, aQ = b(this),
                            aC = aQ.data(ag),
                            aN = aC.opt,
                            aJ = ag + "_" + aC.idx,
                            aw = b("#mCSB_" + aC.idx),
                            aE = b("#mCSB_" + aC.idx + "_container"),
                            aF = [b("#mCSB_" + aC.idx + "_dragger_vertical"), b("#mCSB_" + aC.idx + "_dragger_horizontal")],
                            aH = [],
                            al = [],
                            an = 0,
                            aO = "yx" === aN.axis ? "none" : "all",
                            aM = [],
                            aG = aE.find("iframe"),
                            aD = ["touchstart." + aJ + " pointerdown." + aJ + " MSPointerDown." + aJ, "touchmove." + aJ + " pointermove." + aJ + " MSPointerMove." + aJ, "touchend." + aJ + " pointerup." + aJ + " MSPointerUp." + aJ];
                    aE.bind(aD[0], function (aR) {
                        aK(aR)
                    }).bind(aD[1], function (aR) {
                        aA(aR)
                    }), aw.bind(aD[0], function (aR) {
                        av(aR)
                    }).bind(aD[2], function (aR) {
                        aP(aR)
                    }), aG.length && aG.each(function () {
                        b(this).load(function () {
                            o(this) && b(this.contentDocument || this.contentWindow.document).bind(aD[0], function (aR) {
                                aK(aR), av(aR)
                            }).bind(aD[1], function (aR) {
                                aA(aR)
                            }).bind(aD[2], function (aR) {
                                aP(aR)
                            })
                        })
                    })
                },
                f = function () {
                    function ao() {
                        return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                    }

                    function an(av, aw, au) {
                        at.type = au && al ? "stepped" : "stepless", at.scrollAmount = 10, S(ap, av, aw, "mcsLinearOut", au ? 60 : null)
                    }
                    var al, ap = b(this),
                            am = ap.data(ag),
                            aq = am.opt,
                            at = am.sequential,
                            ar = ag + "_" + am.idx,
                            e = b("#mCSB_" + am.idx + "_container"),
                            ak = e.parent();
                    e.bind("mousedown." + ar, function (au) {
                        V || al || (al = 1, F = !0)
                    }).add(document).bind("mousemove." + ar, function (av) {
                        if (!V && al && ao()) {
                            var ax = e.offset(),
                                    aw = l(av)[0] - ax.top + e[0].offsetTop,
                                    au = l(av)[1] - ax.left + e[0].offsetLeft;
                            aw > 0 && aw < ak.height() && au > 0 && au < ak.width() ? at.step && an("off", null, "stepped") : ("x" !== aq.axis && am.overflowed[0] && (0 > aw ? an("on", 38) : aw > ak.height() && an("on", 40)), "y" !== aq.axis && am.overflowed[1] && (0 > au ? an("on", 37) : au > ak.width() && an("on", 39)))
                        }
                    }).bind("mouseup." + ar, function (au) {
                        V || (al && (al = 0, an("off", null)), F = !1)
                    })
                },
                B = function () {
                    function an(at, ay) {
                        if (A(ak), !ae(ak, at.target)) {
                            var aw = "auto" !== ao.mouseWheel.deltaFactor ? parseInt(ao.mouseWheel.deltaFactor) : U && at.deltaFactor < 100 ? 100 : at.deltaFactor || 100;
                            if ("x" === ao.axis || "x" === ao.mouseWheel.axis) {
                                var az = "x",
                                        ax = [Math.round(aw * ap.scrollRatio.x), parseInt(ao.mouseWheel.scrollAmount)],
                                        aA = "auto" !== ao.mouseWheel.scrollAmount ? ax[1] : ax[0] >= e.width() ? 0.9 * e.width() : ax[0],
                                        ar = Math.abs(b("#mCSB_" + ap.idx + "_container")[0].offsetLeft),
                                        au = aq[1][0].offsetLeft,
                                        av = aq[1].parent().width() - aq[1].width(),
                                        aB = at.deltaX || at.deltaY || ay
                            } else {
                                var az = "y",
                                        ax = [Math.round(aw * ap.scrollRatio.y), parseInt(ao.mouseWheel.scrollAmount)],
                                        aA = "auto" !== ao.mouseWheel.scrollAmount ? ax[1] : ax[0] >= e.height() ? 0.9 * e.height() : ax[0],
                                        ar = Math.abs(b("#mCSB_" + ap.idx + "_container")[0].offsetTop),
                                        au = aq[0][0].offsetTop,
                                        av = aq[0].parent().height() - aq[0].height(),
                                        aB = at.deltaY || ay
                            }
                            "y" === az && !ap.overflowed[0] || "x" === az && !ap.overflowed[1] || ((ao.mouseWheel.invert || at.webkitDirectionInvertedFromDevice) && (aB = -aB), ao.mouseWheel.normalizeDelta && (aB = 0 > aB ? -1 : 1), (aB > 0 && 0 !== au || 0 > aB && au !== av || ao.mouseWheel.preventDefault) && (at.stopImmediatePropagation(), at.preventDefault()), u(ak, (ar - aB * aA).toString(), {
                                dir: az
                            }))
                        }
                    }
                    if (b(this).data(ag)) {
                        var ak = b(this),
                                ap = ak.data(ag),
                                ao = ap.opt,
                                am = ag + "_" + ap.idx,
                                e = b("#mCSB_" + ap.idx),
                                aq = [b("#mCSB_" + ap.idx + "_dragger_vertical"), b("#mCSB_" + ap.idx + "_dragger_horizontal")],
                                al = b("#mCSB_" + ap.idx + "_container").find("iframe");
                        al.length && al.each(function () {
                            b(this).load(function () {
                                o(this) && b(this.contentDocument || this.contentWindow.document).bind("mousewheel." + am, function (at, ar) {
                                    an(at, ar)
                                })
                            })
                        }), e.bind("mousewheel." + am, function (at, ar) {
                            an(at, ar)
                        })
                    }
                },
                o = function (al) {
                    var am = null;
                    try {
                        var ak = al.contentDocument || al.contentWindow.document;
                        am = ak.body.innerHTML
                    } catch (e) {
                    }
                    return null !== am
                },
                ae = function (an, al) {
                    var ak = al.nodeName.toLowerCase(),
                            e = an.data(ag).opt.mouseWheel.disableOver,
                            am = ["select", "textarea"];
                    return b.inArray(ak, e) > -1 && !(b.inArray(ak, am) > -1 && !b(al).is(":focus"))
                },
                s = function () {
                    var an = b(this),
                            al = an.data(ag),
                            ak = ag + "_" + al.idx,
                            ao = b("#mCSB_" + al.idx + "_container"),
                            am = ao.parent(),
                            e = b(".mCSB_" + al.idx + "_scrollbar ." + G[12]);
                    e.bind("touchstart." + ak + " pointerdown." + ak + " MSPointerDown." + ak, function (ap) {
                        F = !0
                    }).bind("touchend." + ak + " pointerup." + ak + " MSPointerUp." + ak, function (ap) {
                        F = !1
                    }).bind("click." + ak, function (ap) {
                        if (b(ap.target).hasClass(G[12]) || b(ap.target).hasClass("mCSB_draggerRail")) {
                            A(an);
                            var ar = b(this),
                                    aq = ar.find(".mCSB_dragger");
                            if (ar.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                if (!al.overflowed[1]) {
                                    return
                                }
                                var au = "x",
                                        at = ap.pageX > aq.offset().left ? -1 : 1,
                                        av = Math.abs(ao[0].offsetLeft) - 0.9 * at * am.width()
                            } else {
                                if (!al.overflowed[0]) {
                                    return
                                }
                                var au = "y",
                                        at = ap.pageY > aq.offset().top ? -1 : 1,
                                        av = Math.abs(ao[0].offsetTop) - 0.9 * at * am.height()
                            }
                            u(an, av.toString(), {
                                dir: au,
                                scrollEasing: "mcsEaseInOut"
                            })
                        }
                    })
                },
                ab = function () {
                    var an = b(this),
                            al = an.data(ag),
                            ak = al.opt,
                            ao = ag + "_" + al.idx,
                            am = b("#mCSB_" + al.idx + "_container"),
                            e = am.parent();
                    am.bind("focusin." + ao, function (at) {
                        var ar = b(document.activeElement),
                                aq = am.find(".mCustomScrollBox").length,
                                ap = 0;
                        ar.is(ak.advanced.autoScrollOnFocus) && (A(an), clearTimeout(an[0]._focusTimeout), an[0]._focusTimer = aq ? (ap + 17) * aq : 0, an[0]._focusTimeout = setTimeout(function () {
                            var aw = [ac(ar)[0], ac(ar)[1]],
                                    av = [am[0].offsetTop, am[0].offsetLeft],
                                    ax = [av[0] + aw[0] >= 0 && av[0] + aw[0] < e.height() - ar.outerHeight(!1), av[1] + aw[1] >= 0 && av[0] + aw[1] < e.width() - ar.outerWidth(!1)],
                                    au = "yx" !== ak.axis || ax[0] || ax[1] ? "all" : "none";
                            "x" === ak.axis || ax[0] || u(an, aw[0].toString(), {
                                dir: "y",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: au,
                                dur: ap
                            }), "y" === ak.axis || ax[1] || u(an, aw[1].toString(), {
                                dir: "x",
                                scrollEasing: "mcsEaseInOut",
                                overwrite: au,
                                dur: ap
                            })
                        }, an[0]._focusTimer))
                    })
                },
                k = function () {
                    var am = b(this),
                            al = am.data(ag),
                            ak = ag + "_" + al.idx,
                            e = b("#mCSB_" + al.idx + "_container").parent();
                    e.bind("scroll." + ak, function (an) {
                        (0 !== e.scrollTop() || 0 !== e.scrollLeft()) && b(".mCSB_" + al.idx + "_scrollbar").css("visibility", "hidden")
                    })
                },
                y = function () {
                    var ao = b(this),
                            al = ao.data(ag),
                            ak = al.opt,
                            ap = al.sequential,
                            am = ag + "_" + al.idx,
                            e = ".mCSB_" + al.idx + "_scrollbar",
                            an = b(e + ">a");
                    an.bind("mousedown." + am + " touchstart." + am + " pointerdown." + am + " MSPointerDown." + am + " mouseup." + am + " touchend." + am + " pointerup." + am + " MSPointerUp." + am + " mouseout." + am + " pointerout." + am + " MSPointerOut." + am + " click." + am, function (at) {
                        function ar(au, av) {
                            ap.scrollAmount = ak.snapAmount || ak.scrollButtons.scrollAmount, S(ao, au, av)
                        }
                        if (at.preventDefault(), ad(at)) {
                            var aq = b(this).attr("class");
                            switch (ap.type = ak.scrollButtons.scrollType, at.type) {
                                case "mousedown":
                                case "touchstart":
                                case "pointerdown":
                                case "MSPointerDown":
                                    if ("stepped" === ap.type) {
                                        return
                                    }
                                    F = !0, al.tweenRunning = !1, ar("on", aq);
                                    break;
                                case "mouseup":
                                case "touchend":
                                case "pointerup":
                                case "MSPointerUp":
                                case "mouseout":
                                case "pointerout":
                                case "MSPointerOut":
                                    if ("stepped" === ap.type) {
                                        return
                                    }
                                    F = !1, ap.dir && ar("off", aq);
                                    break;
                                case "click":
                                    if ("stepped" !== ap.type || al.tweenRunning) {
                                        return
                                    }
                                    ar("on", aq)
                            }
                        }
                    })
                },
                g = function () {
                    function am(aA) {
                        function aC(aD, aE) {
                            ar.type = al.keyboard.scrollType, ar.scrollAmount = al.snapAmount || al.keyboard.scrollAmount, "stepped" === ar.type && ao.tweenRunning || S(ap, aD, aE)
                        }
                        switch (aA.type) {
                            case "blur":
                                ao.tweenRunning && ar.dir && aC("off", null);
                                break;
                            case "keydown":
                            case "keyup":
                                var az = aA.keyCode ? aA.keyCode : aA.which,
                                        aw = "on";
                                if ("x" !== al.axis && (38 === az || 40 === az) || "y" !== al.axis && (37 === az || 39 === az)) {
                                    if ((38 === az || 40 === az) && !ao.overflowed[0] || (37 === az || 39 === az) && !ao.overflowed[1]) {
                                        return
                                    }
                                    "keyup" === aA.type && (aw = "off"), b(document.activeElement).is(aq) || (aA.preventDefault(), aA.stopImmediatePropagation(), aC(aw, az))
                                } else {
                                    if (33 === az || 34 === az) {
                                        if ((ao.overflowed[0] || ao.overflowed[1]) && (aA.preventDefault(), aA.stopImmediatePropagation()), "keyup" === aA.type) {
                                            A(ap);
                                            var ay = 34 === az ? -1 : 1;
                                            if ("x" === al.axis || "yx" === al.axis && ao.overflowed[1] && !ao.overflowed[0]) {
                                                var ax = "x",
                                                        aB = Math.abs(at[0].offsetLeft) - 0.9 * ay * au.width()
                                            } else {
                                                var ax = "y",
                                                        aB = Math.abs(at[0].offsetTop) - 0.9 * ay * au.height()
                                            }
                                            u(ap, aB.toString(), {
                                                dir: ax,
                                                scrollEasing: "mcsEaseInOut"
                                            })
                                        }
                                    } else {
                                        if ((35 === az || 36 === az) && !b(document.activeElement).is(aq) && ((ao.overflowed[0] || ao.overflowed[1]) && (aA.preventDefault(), aA.stopImmediatePropagation()), "keyup" === aA.type)) {
                                            if ("x" === al.axis || "yx" === al.axis && ao.overflowed[1] && !ao.overflowed[0]) {
                                                var ax = "x",
                                                        aB = 35 === az ? Math.abs(au.width() - at.outerWidth(!1)) : 0
                                            } else {
                                                var ax = "y",
                                                        aB = 35 === az ? Math.abs(au.height() - at.outerHeight(!1)) : 0
                                            }
                                            u(ap, aB.toString(), {
                                                dir: ax,
                                                scrollEasing: "mcsEaseInOut"
                                            })
                                        }
                                    }
                                }
                        }
                    }
                    var ap = b(this),
                            ao = ap.data(ag),
                            al = ao.opt,
                            ar = ao.sequential,
                            an = ag + "_" + ao.idx,
                            ak = b("#mCSB_" + ao.idx),
                            at = b("#mCSB_" + ao.idx + "_container"),
                            au = at.parent(),
                            aq = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                            av = at.find("iframe"),
                            e = ["blur." + an + " keydown." + an + " keyup." + an];
                    av.length && av.each(function () {
                        b(this).load(function () {
                            o(this) && b(this.contentDocument || this.contentWindow.document).bind(e[0], function (aw) {
                                am(aw)
                            })
                        })
                    }), ak.attr("tabindex", "0").bind(e[0], function (aw) {
                        am(aw)
                    })
                },
                S = function (ax, ao, al, at, ar) {
                    function au(aB) {
                        var aE = "stepped" !== am.type,
                                ay = ar ? ar : aB ? aE ? ap / 1.5 : an : 1000 / 60,
                                aD = aB ? aE ? 7.5 : 40 : 2.5,
                                aF = [Math.abs(aq[0].offsetTop), Math.abs(aq[0].offsetLeft)],
                                aA = [ak.scrollRatio.y > 10 ? 10 : ak.scrollRatio.y, ak.scrollRatio.x > 10 ? 10 : ak.scrollRatio.x],
                                aG = "x" === am.dir[0] ? aF[1] + am.dir[1] * aA[1] * aD : aF[0] + am.dir[1] * aA[0] * aD,
                                aC = "x" === am.dir[0] ? aF[1] + am.dir[1] * parseInt(am.scrollAmount) : aF[0] + am.dir[1] * parseInt(am.scrollAmount),
                                aH = "auto" !== am.scrollAmount ? aC : aG,
                                az = at ? at : aB ? aE ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                                aI = aB ? !0 : !1;
                        return aB && 17 > ay && (aH = "x" === am.dir[0] ? aF[1] : aF[0]), u(ax, aH.toString(), {
                            dir: am.dir[0],
                            scrollEasing: az,
                            dur: ay,
                            onComplete: aI
                        }), aB ? void(am.dir = !1) : (clearTimeout(am.step), void(am.step = setTimeout(function () {
                            au()
                        }, ay)))
                    }

                    function aw() {
                        clearTimeout(am.step), aj(am, "step"), A(ax)
                    }
                    var ak = ax.data(ag),
                            e = ak.opt,
                            am = ak.sequential,
                            aq = b("#mCSB_" + ak.idx + "_container"),
                            av = "stepped" === am.type ? !0 : !1,
                            ap = e.scrollInertia < 26 ? 26 : e.scrollInertia,
                            an = e.scrollInertia < 1 ? 17 : e.scrollInertia;
                    switch (ao) {
                        case "on":
                            if (am.dir = [al === G[16] || al === G[15] || 39 === al || 37 === al ? "x" : "y", al === G[13] || al === G[15] || 38 === al || 37 === al ? -1 : 1], A(ax), C(al) && "stepped" === am.type) {
                                return
                            }
                            au(av);
                            break;
                        case "off":
                            aw(), (av || ak.tweenRunning && am.dir) && au(!0)
                    }
                },
                E = function (e) {
                    var al = b(this).data(ag).opt,
                            ak = [];
                    return "function" == typeof e && (e = e()), e instanceof Array ? ak = e.length > 1 ? [e[0], e[1]] : "x" === al.axis ? [null, e[0]] : [e[0], null] : (ak[0] = e.y ? e.y : e.x || "x" === al.axis ? null : e, ak[1] = e.x ? e.x : e.y || "y" === al.axis ? null : e), "function" == typeof ak[0] && (ak[0] = ak[0]()), "function" == typeof ak[1] && (ak[1] = ak[1]()), ak
                },
                L = function (ak, ao) {
                    if (null != ak && "undefined" != typeof ak) {
                        var al = b(this),
                                au = al.data(ag),
                                ar = au.opt,
                                av = b("#mCSB_" + au.idx + "_container"),
                                e = av.parent(),
                                am = typeof ak;
                        ao || (ao = "x" === ar.axis ? "x" : "y");
                        var an = "x" === ao ? av.outerWidth(!1) : av.outerHeight(!1),
                                aq = "x" === ao ? av[0].offsetLeft : av[0].offsetTop,
                                at = "x" === ao ? "left" : "top";
                        switch (am) {
                            case "function":
                                return ak();
                            case "object":
                                var aw = ak.jquery ? ak : b(ak);
                                if (!aw.length) {
                                    return
                                }
                                return "x" === ao ? ac(aw)[1] : ac(aw)[0];
                            case "string":
                            case "number":
                                if (C(ak)) {
                                    return Math.abs(ak)
                                }
                                if (-1 !== ak.indexOf("%")) {
                                    return Math.abs(an * parseInt(ak) / 100)
                                }
                                if (-1 !== ak.indexOf("-=")) {
                                    return Math.abs(aq - parseInt(ak.split("-=")[1]))
                                }
                                if (-1 !== ak.indexOf("+=")) {
                                    var ap = aq + parseInt(ak.split("+=")[1]);
                                    return ap >= 0 ? 0 : Math.abs(ap)
                                }
                                if (-1 !== ak.indexOf("px") && C(ak.split("px")[0])) {
                                    return Math.abs(ak.split("px")[0])
                                }
                                if ("top" === ak || "left" === ak) {
                                    return 0
                                }
                                if ("bottom" === ak) {
                                    return Math.abs(e.height() - av.outerHeight(!1))
                                }
                                if ("right" === ak) {
                                    return Math.abs(e.width() - av.outerWidth(!1))
                                }
                                if ("first" === ak || "last" === ak) {
                                    var aw = av.find(":" + ak);
                                    return "x" === ao ? ac(aw)[1] : ac(aw)[0]
                                }
                                return b(ak).length ? "x" === ao ? ac(b(ak))[1] : ac(b(ak))[0] : (av.css(at, ak), void W.update.call(null, al[0]))
                        }
                    }
                },
                D = function (ao) {
                    function aw() {
                        return clearTimeout(ap[0].autoUpdate), 0 === aA.parents("html").length ? void(aA = null) : void(ap[0].autoUpdate = setTimeout(function () {
                            return am.advanced.updateOnSelectorChange && (at = ay(), at !== az) ? (ar(3), void(az = at)) : (am.advanced.updateOnContentResize && (ax = [ap.outerHeight(!1), ap.outerWidth(!1), au.height(), au.width(), e()[0], e()[1]], (ax[0] !== aC[0] || ax[1] !== aC[1] || ax[2] !== aC[2] || ax[3] !== aC[3] || ax[4] !== aC[4] || ax[5] !== aC[5]) && (ar(ax[0] !== aC[0] || ax[1] !== aC[1]), aC = ax)), am.advanced.updateOnImageLoad && (an = av(), an !== ak && (ap.find("img").each(function () {
                                aq(this)
                            }), ak = an)), void((am.advanced.updateOnSelectorChange || am.advanced.updateOnContentResize || am.advanced.updateOnImageLoad) && aw()))
                        }, am.advanced.autoUpdateTimeout))
                    }

                    function av() {
                        var aD = 0;
                        return am.advanced.updateOnImageLoad && (aD = ap.find("img").length), aD
                    }

                    function aq(aG) {
                        function aF(aH, aI) {
                            return function () {
                                return aI.apply(aH, arguments)
                            }
                        }

                        function aD() {
                            this.onload = null, b(aG).addClass(G[2]), ar(2)
                        }
                        if (b(aG).hasClass(G[2])) {
                            return void ar()
                        }
                        var aE = new Image;
                        aE.onload = aF(aE, aD), aE.src = aG.src
                    }

                    function ay() {
                        am.advanced.updateOnSelectorChange === !0 && (am.advanced.updateOnSelectorChange = "*");
                        var aD = 0,
                                aE = ap.find(am.advanced.updateOnSelectorChange);
                        return am.advanced.updateOnSelectorChange && aE.length > 0 && aE.each(function () {
                            aD += b(this).height() + b(this).width()
                        }), aD
                    }

                    function ar(aD) {
                        clearTimeout(ap[0].autoUpdate), W.update.call(null, aA[0], aD)
                    }
                    var aA = b(this),
                            al = aA.data(ag),
                            am = al.opt,
                            ap = b("#mCSB_" + al.idx + "_container");
                    if (ao) {
                        return clearTimeout(ap[0].autoUpdate), void aj(ap[0], "autoUpdate")
                    }
                    var at, ax, an, au = ap.parent(),
                            aB = [b("#mCSB_" + al.idx + "_scrollbar_vertical"), b("#mCSB_" + al.idx + "_scrollbar_horizontal")],
                            e = function () {
                                return [aB[0].is(":visible") ? aB[0].outerHeight(!0) : 0, aB[1].is(":visible") ? aB[1].outerWidth(!0) : 0]
                            },
                            az = ay(),
                            aC = [ap.outerHeight(!1), ap.outerWidth(!1), au.height(), au.width(), e()[0], e()[1]],
                            ak = av();
                    aw()
                },
                q = function (al, e, ak) {
                    return Math.round(al / e) * e - ak
                },
                A = function (e) {
                    var al = e.data(ag),
                            ak = b("#mCSB_" + al.idx + "_container,#mCSB_" + al.idx + "_container_wrapper,#mCSB_" + al.idx + "_dragger_vertical,#mCSB_" + al.idx + "_dragger_horizontal");
                    ak.each(function () {
                        n.call(this)
                    })
                },
                u = function (aC, av, au) {
                    function aq(aI) {
                        return aB && al.callbacks[aI] && "function" == typeof al.callbacks[aI]
                    }

                    function az() {
                        return [al.callbacks.alwaysTriggerOffsets || e >= aG[0] + ak, al.callbacks.alwaysTriggerOffsets || -aA >= e]
                    }

                    function ar() {
                        var aK = [ap[0].offsetTop, ap[0].offsetLeft],
                                aJ = [aE[0].offsetTop, aE[0].offsetLeft],
                                aI = [ap.outerHeight(!1), ap.outerWidth(!1)],
                                aL = [an.height(), an.width()];
                        aC[0].mcs = {
                            content: ap,
                            top: aK[0],
                            left: aK[1],
                            draggerTop: aJ[0],
                            draggerLeft: aJ[1],
                            topPct: Math.round(100 * Math.abs(aK[0]) / (Math.abs(aI[0]) - aL[0])),
                            leftPct: Math.round(100 * Math.abs(aK[1]) / (Math.abs(aI[1]) - aL[1])),
                            direction: au.dir
                        }
                    }
                    var aB = aC.data(ag),
                            al = aB.opt,
                            am = {
                                trigger: "internal",
                                dir: "y",
                                scrollEasing: "mcsEaseOut",
                                drag: !1,
                                dur: al.scrollInertia,
                                overwrite: "all",
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            },
                    au = b.extend(am, au),
                            aD = [au.dur, au.drag ? 0 : au.dur],
                            an = b("#mCSB_" + aB.idx),
                            ap = b("#mCSB_" + aB.idx + "_container"),
                            at = ap.parent(),
                            aw = al.callbacks.onTotalScrollOffset ? E.call(aC, al.callbacks.onTotalScrollOffset) : [0, 0],
                            ao = al.callbacks.onTotalScrollBackOffset ? E.call(aC, al.callbacks.onTotalScrollBackOffset) : [0, 0];
                    if (aB.trigger = au.trigger, (0 !== at.scrollTop() || 0 !== at.scrollLeft()) && (b(".mCSB_" + aB.idx + "_scrollbar").css("visibility", "visible"), at.scrollTop(0).scrollLeft(0)), "_resetY" !== av || aB.contentReset.y || (aq("onOverflowYNone") && al.callbacks.onOverflowYNone.call(aC[0]), aB.contentReset.y = 1), "_resetX" !== av || aB.contentReset.x || (aq("onOverflowXNone") && al.callbacks.onOverflowXNone.call(aC[0]), aB.contentReset.x = 1), "_resetY" !== av && "_resetX" !== av) {
                        switch (!aB.contentReset.y && aC[0].mcs || !aB.overflowed[0] || (aq("onOverflowY") && al.callbacks.onOverflowY.call(aC[0]), aB.contentReset.x = null), !aB.contentReset.x && aC[0].mcs || !aB.overflowed[1] || (aq("onOverflowX") && al.callbacks.onOverflowX.call(aC[0]), aB.contentReset.x = null), al.snapAmount && (av = q(av, al.snapAmount, al.snapOffset)), au.dir) {
                            case "x":
                                var aE = b("#mCSB_" + aB.idx + "_dragger_horizontal"),
                                        ay = "left",
                                        e = ap[0].offsetLeft,
                                        aG = [an.width() - ap.outerWidth(!1), aE.parent().width() - aE.width()],
                                        aF = [av, 0 === av ? 0 : av / aB.scrollRatio.x],
                                        ak = aw[1],
                                        aA = ao[1],
                                        ax = ak > 0 ? ak / aB.scrollRatio.x : 0,
                                        aH = aA > 0 ? aA / aB.scrollRatio.x : 0;
                                break;
                            case "y":
                                var aE = b("#mCSB_" + aB.idx + "_dragger_vertical"),
                                        ay = "top",
                                        e = ap[0].offsetTop,
                                        aG = [an.height() - ap.outerHeight(!1), aE.parent().height() - aE.height()],
                                        aF = [av, 0 === av ? 0 : av / aB.scrollRatio.y],
                                        ak = aw[0],
                                        aA = ao[0],
                                        ax = ak > 0 ? ak / aB.scrollRatio.y : 0,
                                        aH = aA > 0 ? aA / aB.scrollRatio.y : 0
                        }
                        aF[1] < 0 || 0 === aF[0] && 0 === aF[1] ? aF = [0, 0] : aF[1] >= aG[1] ? aF = [aG[0], aG[1]] : aF[0] = -aF[0], aC[0].mcs || (ar(), aq("onInit") && al.callbacks.onInit.call(aC[0])), clearTimeout(ap[0].onCompleteTimeout), (aB.tweenRunning || !(0 === e && aF[0] >= 0 || e === aG[0] && aF[0] <= aG[0])) && (h(aE[0], ay, Math.round(aF[1]), aD[1], au.scrollEasing), h(ap[0], ay, Math.round(aF[0]), aD[0], au.scrollEasing, au.overwrite, {
                            onStart: function () {
                                au.callbacks && au.onStart && !aB.tweenRunning && (aq("onScrollStart") && (ar(), al.callbacks.onScrollStart.call(aC[0])), aB.tweenRunning = !0, aa(aE), aB.cbOffsets = az())
                            },
                            onUpdate: function () {
                                au.callbacks && au.onUpdate && aq("whileScrolling") && (ar(), al.callbacks.whileScrolling.call(aC[0]))
                            },
                            onComplete: function () {
                                if (au.callbacks && au.onComplete) {
                                    "yx" === al.axis && clearTimeout(ap[0].onCompleteTimeout);
                                    var aI = ap[0].idleTimer || 0;
                                    ap[0].onCompleteTimeout = setTimeout(function () {
                                        aq("onScroll") && (ar(), al.callbacks.onScroll.call(aC[0])), aq("onTotalScroll") && aF[1] >= aG[1] - ax && aB.cbOffsets[0] && (ar(), al.callbacks.onTotalScroll.call(aC[0])), aq("onTotalScrollBack") && aF[1] <= aH && aB.cbOffsets[1] && (ar(), al.callbacks.onTotalScrollBack.call(aC[0])), aB.tweenRunning = !1, ap[0].idleTimer = 0, aa(aE, "hide")
                                    }, aI)
                                }
                            }
                        }))
                    }
                },
                h = function (ao, aC, ay, ak, ax, at, aA) {
                    function av() {
                        aG.stop || (aD || aw.call(), aD = m() - aF, aB(), aD >= aG.time && (aG.time = aD > aG.time ? aD + ap - (aD - aG.time) : aD + ap - 1, aG.time < aD + 1 && (aG.time = aD + 1)), aG.time < ak ? aG.id = ar(av) : aq.call())
                    }

                    function aB() {
                        ak > 0 ? (aG.currVal = aE(aG.time, e, al, ak, ax), au[aC] = Math.round(aG.currVal) + "px") : au[aC] = ay + "px", az.call()
                    }

                    function am() {
                        ap = 1000 / 60, aG.time = aD + ap, ar = window.requestAnimationFrame ? window.requestAnimationFrame : function (aH) {
                            return aB(), setTimeout(aH, 0.01)
                        }, aG.id = ar(av)
                    }

                    function an() {
                        null != aG.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(aG.id) : clearTimeout(aG.id), aG.id = null)
                    }

                    function aE(aK, aM, aJ, aH, aI) {
                        switch (aI) {
                            case "linear":
                            case "mcsLinear":
                                return aJ * aK / aH + aM;
                            case "mcsLinearOut":
                                return aK /= aH, aK--, aJ * Math.sqrt(1 - aK * aK) + aM;
                            case "easeInOutSmooth":
                                return aK /= aH / 2, 1 > aK ? aJ / 2 * aK * aK + aM : (aK--, -aJ / 2 * (aK * (aK - 2) - 1) + aM);
                            case "easeInOutStrong":
                                return aK /= aH / 2, 1 > aK ? aJ / 2 * Math.pow(2, 10 * (aK - 1)) + aM : (aK--, aJ / 2 * (-Math.pow(2, -10 * aK) + 2) + aM);
                            case "easeInOut":
                            case "mcsEaseInOut":
                                return aK /= aH / 2, 1 > aK ? aJ / 2 * aK * aK * aK + aM : (aK -= 2, aJ / 2 * (aK * aK * aK + 2) + aM);
                            case "easeOutSmooth":
                                return aK /= aH, aK--, -aJ * (aK * aK * aK * aK - 1) + aM;
                            case "easeOutStrong":
                                return aJ * (-Math.pow(2, -10 * aK / aH) + 1) + aM;
                            case "easeOut":
                            case "mcsEaseOut":
                            default:
                                var aN = (aK /= aH) * aK,
                                        aL = aN * aK;
                                return aM + aJ * (0.499999999999997 * aL * aN + -2.5 * aN * aN + 5.5 * aL + -6.5 * aN + 4 * aK)
                        }
                    }
                    ao._mTween || (ao._mTween = {
                        top: {},
                        left: {}
                    });
                    var ap, ar, aA = aA || {},
                            aw = aA.onStart || function () {},
                            az = aA.onUpdate || function () {},
                            aq = aA.onComplete || function () {},
                            aF = m(),
                            aD = 0,
                            e = ao.offsetTop,
                            au = ao.style,
                            aG = ao._mTween[aC];
                    "left" === aC && (e = ao.offsetLeft);
                    var al = ay - e;
                    aG.stop = 0, "none" !== at && an(), am()
                },
                m = function () {
                    return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                },
                n = function () {
                    var al = this;
                    al._mTween || (al._mTween = {
                        top: {},
                        left: {}
                    });
                    for (var am = ["top", "left"], ak = 0; ak < am.length; ak++) {
                        var e = am[ak];
                        al._mTween[e].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(al._mTween[e].id) : clearTimeout(al._mTween[e].id), al._mTween[e].id = null, al._mTween[e].stop = 1)
                    }
                },
                aj = function (al, e) {
                    try {
                        delete al[e]
                    } catch (ak) {
                        al[e] = null
                    }
                },
                ad = function (e) {
                    return !(e.which && 1 !== e.which)
                },
                ah = function (ak) {
                    var e = ak.originalEvent.pointerType;
                    return !(e && "touch" !== e && 2 !== e)
                },
                C = function (e) {
                    return !isNaN(parseFloat(e)) && isFinite(e)
                },
                ac = function (ak) {
                    var e = ak.parents(".mCSB_container");
                    return [ak.offset().top - e.offset().top, ak.offset().left - e.offset().left]
                };
        b.fn[Q] = function (e) {
            return W[e] ? W[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void b.error("Method " + e + " does not exist") : W.init.apply(this, arguments)
        }, b[Q] = function (e) {
            return W[e] ? W[e].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof e && e ? void b.error("Method " + e + " does not exist") : W.init.apply(this, arguments)
        }, b[Q].defaults = K, window[Q] = !0, b(window).load(function () {
            b(P)[Q](), b.extend(b.expr[":"], {
                mcsInView: b.expr[":"].mcsInView || function (am) {
                    var al, e, ak = b(am),
                            an = ak.parents(".mCSB_container");
                    if (an.length) {
                        return al = an.parent(), e = [an[0].offsetTop, an[0].offsetLeft], e[0] + ac(ak)[0] >= 0 && e[0] + ac(ak)[0] < al.height() - ak.outerHeight(!1) && e[1] + ac(ak)[1] >= 0 && e[1] + ac(ak)[1] < al.width() - ak.outerWidth(!1)
                    }
                },
                mcsOverflow: b.expr[":"].mcsOverflow || function (e) {
                    var ak = b(e).data(ag);
                    if (ak) {
                        return ak.overflowed[0] || ak.overflowed[1]
                    }
                }
            })
        })
    })
});
var ogame = ogame || {};