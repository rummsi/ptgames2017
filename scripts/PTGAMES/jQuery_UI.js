/* jQuery UI - v1.11.4 - 2015-03-11
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js, tooltip.js
 * Copyright 2015 jQuery Foundation and other contributors; Licensed MIT */
(function (b) {
    "function" == typeof define && define.amd ? define(["jquery"], b) : b(jQuery)
})(function (e) {
    function l(B, A) {
        var q, k, w, x = B.nodeName.toLowerCase();
        return "area" === x ? (q = B.parentNode, k = q.name, B.href && k && "map" === q.nodeName.toLowerCase() ? (w = e("img[usemap='#" + k + "']")[0], !!w && m(w)) : !1) : (/^(input|select|textarea|button|object)$/.test(x) ? !B.disabled : "a" === x ? B.href || A : A) && m(B)
    }

    function m(k) {
        return e.expr.filters.visible(k) && !e(k).parents().addBack().filter(function () {
            return "hidden" === e.css(this, "visibility")
        }).length
    }

    function Q(w) {
        for (var k, q; w.length && w[0] !== document; ) {
            if (k = w.css("position"), ("absolute" === k || "relative" === k || "fixed" === k) && (q = parseInt(w.css("zIndex"), 10), !isNaN(q) && 0 !== q)) {
                return q
            }
            w = w.parent()
        }
        return 0
    }

    function r() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, e.extend(this._defaults, this.regional[""]), this.regional.en = e.extend(!0, {}, this.regional[""]), this.regional["en-US"] = e.extend(!0, {}, this.regional.en), this.dpDiv = a(e("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function a(k) {
        var q = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return k.delegate(q, "mouseout", function () {
            e(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).removeClass("ui-datepicker-next-hover")
        }).delegate(q, "mouseover", s)
    }

    function s() {
        e.datepicker._isDisabledDatepicker(v.inline ? v.dpDiv.parent()[0] : v.input[0]) || (e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), e(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && e(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && e(this).addClass("ui-datepicker-next-hover"))
    }

    function y(k, q) {
        e.extend(k, q);
        for (var w in q) {
            null == q[w] && (k[w] = q[w])
        }
        return k
    }

    function h(k) {
        return function () {
            var q = this.element.val();
            k.apply(this, arguments), this._refresh(), q !== this.element.val() && this._trigger("change")
        }
    }
    e.ui = e.ui || {}, e.extend(e.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        scrollParent: function (x) {
            var A = this.css("position"),
                    w = "absolute" === A,
                    q = x ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                    k = this.parents().filter(function () {
                var B = e(this);
                return w && "static" === B.css("position") ? !1 : q.test(B.css("overflow") + B.css("overflow-y") + B.css("overflow-x"))
            }).eq(0);
            return "fixed" !== A && k.length ? k : e(this[0].ownerDocument || document)
        },
        uniqueId: function () {
            var k = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++k)
                })
            }
        }(),
        removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function (k) {
            return function (q) {
                return !!e.data(q, k)
            }
        }) : function (k, q, w) {
            return !!e.data(k, w[3])
        },
        focusable: function (k) {
            return l(k, !isNaN(e.attr(k, "tabindex")))
        },
        tabbable: function (q) {
            var k = e.attr(q, "tabindex"),
                    w = isNaN(k);
            return (w || k >= 0) && l(q, !w)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (A, B) {
        function x(C, D, F, E) {
            return e.each(q, function () {
                D -= parseFloat(e.css(C, "padding" + this)) || 0, F && (D -= parseFloat(e.css(C, "border" + this + "Width")) || 0), E && (D -= parseFloat(e.css(C, "margin" + this)) || 0)
            }), D
        }
        var q = "Width" === B ? ["Left", "Right"] : ["Top", "Bottom"],
                k = B.toLowerCase(),
                w = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
        e.fn["inner" + B] = function (C) {
            return void 0 === C ? w["inner" + B].call(this) : this.each(function () {
                e(this).css(k, x(this, C) + "px")
            })
        }, e.fn["outer" + B] = function (C, D) {
            return "number" != typeof C ? w["outer" + B].call(this, C) : this.each(function () {
                e(this).css(k, x(this, C, !0, D) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function (k) {
        return this.add(null == k ? this.prevObject : this.prevObject.filter(k))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function (k) {
        return function (q) {
            return arguments.length ? k.call(this, e.camelCase(q)) : k.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.fn.extend({
        focus: function (k) {
            return function (q, w) {
                return "number" == typeof q ? this.each(function () {
                    var x = this;
                    setTimeout(function () {
                        e(x).focus(), w && w.call(x)
                    }, q)
                }) : k.apply(this, arguments)
            }
        }(e.fn.focus),
        disableSelection: function () {
            var k = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.bind(k + ".ui-disableSelection", function (q) {
                    q.preventDefault()
                })
            }
        }(),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (k) {
            if (void 0 !== k) {
                return this.css("zIndex", k)
            }
            if (this.length) {
                for (var q, x, w = e(this[0]); w.length && w[0] !== document; ) {
                    if (q = w.css("position"), ("absolute" === q || "relative" === q || "fixed" === q) && (x = parseInt(w.css("zIndex"), 10), !isNaN(x) && 0 !== x)) {
                        return x
                    }
                    w = w.parent()
                }
            }
            return 0
        }
    }), e.ui.plugin = {
        add: function (x, A, w) {
            var q, k = e.ui[x].prototype;
            for (q in w) {
                k.plugins[q] = k.plugins[q] || [], k.plugins[q].push([A, w[q]])
            }
        },
        call: function (w, A, B, x) {
            var q, k = w.plugins[A];
            if (k && (x || w.element[0].parentNode && 11 !== w.element[0].parentNode.nodeType)) {
                for (q = 0; k.length > q; q++) {
                    w.options[k[q][0]] && k[q][1].apply(w.element, B)
                }
            }
        }
    };
    var o = 0,
            n = Array.prototype.slice;
    e.cleanData = function (k) {
        return function (B) {
            var A, w, q;
            for (q = 0; null != (w = B[q]); q++) {
                try {
                    A = e._data(w, "events"), A && A.remove && e(w).triggerHandler("remove")
                } catch (x) {
                }
            }
            k(B)
        }
    }(e.cleanData), e.widget = function (k, x, E) {
        var B, q, C, D, w = {},
                A = k.split(".")[0];
        return k = k.split(".")[1], B = A + "-" + k, E || (E = x, x = e.Widget), e.expr[":"][B.toLowerCase()] = function (F) {
            return !!e.data(F, B)
        }, e[A] = e[A] || {}, q = e[A][k], C = e[A][k] = function (G, F) {
            return this._createWidget ? (arguments.length && this._createWidget(G, F), void 0) : new C(G, F)
        }, e.extend(C, q, {
            version: E.version,
            _proto: e.extend({}, E),
            _childConstructors: []
        }), D = new x, D.options = e.widget.extend({}, D.options), e.each(E, function (F, G) {
            return e.isFunction(G) ? (w[F] = function () {
                var H = function () {
                    return x.prototype[F].apply(this, arguments)
                },
                        I = function (J) {
                            return x.prototype[F].apply(this, J)
                        };
                return function () {
                    var J, K = this._super,
                            L = this._superApply;
                    return this._super = H, this._superApply = I, J = G.apply(this, arguments), this._super = K, this._superApply = L, J
                }
            }(), void 0) : (w[F] = G, void 0)
        }), C.prototype = e.widget.extend(D, {
            widgetEventPrefix: q ? D.widgetEventPrefix || k : k
        }, w, {
            constructor: C,
            namespace: A,
            widgetName: k,
            widgetFullName: B
        }), q ? (e.each(q._childConstructors, function (H, G) {
            var F = G.prototype;
            e.widget(F.namespace + "." + F.widgetName, C, G._proto)
        }), delete q._childConstructors) : x._childConstructors.push(C), e.widget.bridge(k, C), C
    }, e.widget.extend = function (A) {
        for (var B, x, q = n.call(arguments, 1), k = 0, w = q.length; w > k; k++) {
            for (B in q[k]) {
                x = q[k][B], q[k].hasOwnProperty(B) && void 0 !== x && (A[B] = e.isPlainObject(x) ? e.isPlainObject(A[B]) ? e.widget.extend({}, A[B], x) : e.widget.extend({}, x) : x)
            }
        }
        return A
    }, e.widget.bridge = function (k, q) {
        var w = q.prototype.widgetFullName || k;
        e.fn[k] = function (x) {
            var C = "string" == typeof x,
                    A = n.call(arguments, 1),
                    B = this;
            return C ? this.each(function () {
                var D, E = e.data(this, w);
                return "instance" === x ? (B = E, !1) : E ? e.isFunction(E[x]) && "_" !== x.charAt(0) ? (D = E[x].apply(E, A), D !== E && void 0 !== D ? (B = D && D.jquery ? B.pushStack(D.get()) : D, !1) : void 0) : e.error("no such method '" + x + "' for " + k + " widget instance") : e.error("cannot call methods on " + k + " prior to initialization; attempted to call method '" + x + "'")
            }) : (A.length && (x = e.widget.extend.apply(null, [x].concat(A))), this.each(function () {
                var D = e.data(this, w);
                D ? (D.option(x || {}), D._init && D._init()) : e.data(this, w, new q(x, this))
            })), B
        }
    }, e.Widget = function () {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (k, q) {
            q = e(q || this.defaultElement || this)[0], this.element = e(q), this.uuid = o++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), q !== this && (e.data(q, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (w) {
                    w.target === q && this.destroy()
                }
            }), this.document = e(q.style ? q.ownerDocument : q.document || q), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), k), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function () {
            return this.element
        },
        option: function (A, B) {
            var x, q, k, w = A;
            if (0 === arguments.length) {
                return e.widget.extend({}, this.options)
            }
            if ("string" == typeof A) {
                if (w = {}, x = A.split("."), A = x.shift(), x.length) {
                    for (q = w[A] = e.widget.extend({}, this.options[A]), k = 0; x.length - 1 > k; k++) {
                        q[x[k]] = q[x[k]] || {}, q = q[x[k]]
                    }
                    if (A = x.pop(), 1 === arguments.length) {
                        return void 0 === q[A] ? null : q[A]
                    }
                    q[A] = B
                } else {
                    if (1 === arguments.length) {
                        return void 0 === this.options[A] ? null : this.options[A]
                    }
                    w[A] = B
                }
            }
            return this._setOptions(w), this
        },
        _setOptions: function (k) {
            var q;
            for (q in k) {
                this._setOption(q, k[q])
            }
            return this
        },
        _setOption: function (k, q) {
            return this.options[k] = q, "disabled" === k && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!q), q && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function (x, A, w) {
            var q, k = this;
            "boolean" != typeof x && (w = A, A = x, x = !1), w ? (A = q = e(A), this.bindings = this.bindings.add(A)) : (w = A, A = this.element, q = this.widget()), e.each(w, function (G, D) {
                function F() {
                    return x || k.options.disabled !== !0 && !e(this).hasClass("ui-state-disabled") ? ("string" == typeof D ? k[D] : D).apply(k, arguments) : void 0
                }
                "string" != typeof D && (F.guid = D.guid = D.guid || F.guid || e.guid++);
                var B = G.match(/^([\w:-]*)\s*(.*)$/),
                        C = B[1] + k.eventNamespace,
                        E = B[2];
                E ? q.delegate(E, C, F) : A.bind(C, F)
            })
        },
        _off: function (k, q) {
            q = (q || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, k.unbind(q).undelegate(q), this.bindings = e(this.bindings.not(k).get()), this.focusable = e(this.focusable.not(k).get()), this.hoverable = e(this.hoverable.not(k).get())
        },
        _delay: function (w, k) {
            function q() {
                return ("string" == typeof w ? x[w] : w).apply(x, arguments)
            }
            var x = this;
            return setTimeout(q, k || 0)
        },
        _hoverable: function (k) {
            this.hoverable = this.hoverable.add(k), this._on(k, {
                mouseenter: function (q) {
                    e(q.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (q) {
                    e(q.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (k) {
            this.focusable = this.focusable.add(k), this._on(k, {
                focusin: function (q) {
                    e(q.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (q) {
                    e(q.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (A, B, x) {
            var q, k, w = this.options[A];
            if (x = x || {}, B = e.Event(B), B.type = (A === this.widgetEventPrefix ? A : this.widgetEventPrefix + A).toLowerCase(), B.target = this.element[0], k = B.originalEvent) {
                for (q in k) {
                    q in B || (B[q] = k[q])
                }
            }
            return this.element.trigger(B, x), !(e.isFunction(w) && w.apply(this.element[0], [B].concat(x)) === !1 || B.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (k, q) {
        e.Widget.prototype["_" + k] = function (B, w, C) {
            "string" == typeof w && (w = {
                effect: w
            });
            var x, A = w ? w === !0 || "number" == typeof w ? q : w.effect || q : k;
            w = w || {}, "number" == typeof w && (w = {
                duration: w
            }), x = !e.isEmptyObject(w), w.complete = C, w.delay && B.delay(w.delay), x && e.effects && e.effects.effect[A] ? B[k](w) : A !== k && B[A] ? B[A](w.duration, w.easing, C) : B.queue(function (D) {
                e(this)[k](), C && C.call(B[0]), D()
            })
        }
    }), e.widget;
    var d = !1;
    e(document).mouseup(function () {
        d = !1
    }), e.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var k = this;
            this.element.bind("mousedown." + this.widgetName, function (q) {
                return k._mouseDown(q)
            }).bind("click." + this.widgetName, function (q) {
                return !0 === e.data(q.target, k.widgetName + ".preventClickEvent") ? (e.removeData(q.target, k.widgetName + ".preventClickEvent"), q.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (k) {
            if (!d) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(k), this._mouseDownEvent = k;
                var q = this,
                        x = 1 === k.which,
                        w = "string" == typeof this.options.cancel && k.target.nodeName ? e(k.target).closest(this.options.cancel).length : !1;
                return x && !w && this._mouseCapture(k) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    q.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(k) && this._mouseDelayMet(k) && (this._mouseStarted = this._mouseStart(k) !== !1, !this._mouseStarted) ? (k.preventDefault(), !0) : (!0 === e.data(k.target, this.widgetName + ".preventClickEvent") && e.removeData(k.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (A) {
                    return q._mouseMove(A)
                }, this._mouseUpDelegate = function (A) {
                    return q._mouseUp(A)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), k.preventDefault(), d = !0, !0)) : !0
            }
        },
        _mouseMove: function (k) {
            if (this._mouseMoved) {
                if (e.ui.ie && (!document.documentMode || 9 > document.documentMode) && !k.button) {
                    return this._mouseUp(k)
                }
                if (!k.which) {
                    return this._mouseUp(k)
                }
            }
            return (k.which || k.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(k), k.preventDefault()) : (this._mouseDistanceMet(k) && this._mouseDelayMet(k) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, k) !== !1, this._mouseStarted ? this._mouseDrag(k) : this._mouseUp(k)), !this._mouseStarted)
        },
        _mouseUp: function (k) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, k.target === this._mouseDownEvent.target && e.data(k.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(k)), d = !1, !1
        },
        _mouseDistanceMet: function (k) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - k.pageX), Math.abs(this._mouseDownEvent.pageY - k.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return !0
        }
    }),
            function () {
                function q(L, M, K) {
                    return [parseFloat(L[0]) * (G.test(L[0]) ? M / 100 : 1), parseFloat(L[1]) * (G.test(L[1]) ? K / 100 : 1)]
                }

                function H(L, K) {
                    return parseInt(e.css(L, K), 10) || 0
                }

                function k(L) {
                    var K = L[0];
                    return 9 === K.nodeType ? {
                        width: L.width(),
                        height: L.height(),
                        offset: {
                            top: 0,
                            left: 0
                        }
                    } : e.isWindow(K) ? {
                        width: L.width(),
                        height: L.height(),
                        offset: {
                            top: L.scrollTop(),
                            left: L.scrollLeft()
                        }
                    } : K.preventDefault ? {
                        width: 0,
                        height: 0,
                        offset: {
                            top: K.pageY,
                            left: K.pageX
                        }
                    } : {
                        width: L.outerWidth(),
                        height: L.outerHeight(),
                        offset: L.offset()
                    }
                }
                e.ui = e.ui || {};
                var x, A, F = Math.max,
                        I = Math.abs,
                        E = Math.round,
                        J = /left|center|right/,
                        w = /top|center|bottom/,
                        C = /[\+\-]\d+(\.[\d]+)?%?/,
                        B = /^\w+/,
                        G = /%$/,
                        D = e.fn.position;
                e.position = {
                    scrollbarWidth: function () {
                        if (void 0 !== x) {
                            return x
                        }
                        var L, M, K = e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                                N = K.children()[0];
                        return e("body").append(K), L = N.offsetWidth, K.css("overflow", "scroll"), M = N.offsetWidth, L === M && (M = K[0].clientWidth), K.remove(), x = L - M
                    },
                    getScrollInfo: function (M) {
                        var N = M.isWindow || M.isDocument ? "" : M.element.css("overflow-x"),
                                L = M.isWindow || M.isDocument ? "" : M.element.css("overflow-y"),
                                K = "scroll" === N || "auto" === N && M.width < M.element[0].scrollWidth,
                                O = "scroll" === L || "auto" === L && M.height < M.element[0].scrollHeight;
                        return {
                            width: O ? e.position.scrollbarWidth() : 0,
                            height: K ? e.position.scrollbarWidth() : 0
                        }
                    },
                    getWithinInfo: function (N) {
                        var K = e(N || window),
                                M = e.isWindow(K[0]),
                                L = !!K[0] && 9 === K[0].nodeType;
                        return {
                            element: K,
                            isWindow: M,
                            isDocument: L,
                            offset: K.offset() || {
                                left: 0,
                                top: 0
                            },
                            scrollLeft: K.scrollLeft(),
                            scrollTop: K.scrollTop(),
                            width: M || L ? K.width() : K.outerWidth(),
                            height: M || L ? K.height() : K.outerHeight()
                        }
                    }
                }, e.fn.position = function (U) {
                    if (!U || !U.of) {
                        return D.apply(this, arguments)
                    }
                    U = e.extend({}, U);
                    var V, T, O, L, N, K, M = e(U.of),
                            X = e.position.getWithinInfo(U.within),
                            W = e.position.getScrollInfo(X),
                            P = (U.collision || "flip").split(" "),
                            S = {};
                    return K = k(M), M[0].preventDefault && (U.at = "left top"), T = K.width, O = K.height, L = K.offset, N = e.extend({}, L), e.each(["my", "at"], function () {
                        var Z, Y, aa = (U[this] || "").split(" ");
                        1 === aa.length && (aa = J.test(aa[0]) ? aa.concat(["center"]) : w.test(aa[0]) ? ["center"].concat(aa) : ["center", "center"]), aa[0] = J.test(aa[0]) ? aa[0] : "center", aa[1] = w.test(aa[1]) ? aa[1] : "center", Z = C.exec(aa[0]), Y = C.exec(aa[1]), S[this] = [Z ? Z[0] : 0, Y ? Y[0] : 0], U[this] = [B.exec(aa[0])[0], B.exec(aa[1])[0]]
                    }), 1 === P.length && (P[1] = P[0]), "right" === U.at[0] ? N.left += T : "center" === U.at[0] && (N.left += T / 2), "bottom" === U.at[1] ? N.top += O : "center" === U.at[1] && (N.top += O / 2), V = q(S.at, T, O), N.left += V[0], N.top += V[1], this.each(function () {
                        var aj, Y, ak = e(this),
                                an = ak.outerWidth(),
                                am = ak.outerHeight(),
                                ap = H(this, "marginLeft"),
                                al = H(this, "marginTop"),
                                aa = an + ap + H(this, "marginRight") + W.width,
                                aq = am + al + H(this, "marginBottom") + W.height,
                                ao = e.extend({}, N),
                                Z = q(S.my, ak.outerWidth(), ak.outerHeight());
                        "right" === U.my[0] ? ao.left -= an : "center" === U.my[0] && (ao.left -= an / 2), "bottom" === U.my[1] ? ao.top -= am : "center" === U.my[1] && (ao.top -= am / 2), ao.left += Z[0], ao.top += Z[1], A || (ao.left = E(ao.left), ao.top = E(ao.top)), aj = {
                            marginLeft: ap,
                            marginTop: al
                        }, e.each(["left", "top"], function (ab, ac) {
                            e.ui.position[P[ab]] && e.ui.position[P[ab]][ac](ao, {
                                targetWidth: T,
                                targetHeight: O,
                                elemWidth: an,
                                elemHeight: am,
                                collisionPosition: aj,
                                collisionWidth: aa,
                                collisionHeight: aq,
                                offset: [V[0] + Z[0], V[1] + Z[1]],
                                my: U.my,
                                at: U.at,
                                within: X,
                                elem: ak
                            })
                        }), U.using && (Y = function (ab) {
                            var ae = L.left - ao.left,
                                    af = ae + T - an,
                                    ac = L.top - ao.top,
                                    ag = ac + O - am,
                                    ad = {
                                        target: {
                                            element: M,
                                            left: L.left,
                                            top: L.top,
                                            width: T,
                                            height: O
                                        },
                                        element: {
                                            element: ak,
                                            left: ao.left,
                                            top: ao.top,
                                            width: an,
                                            height: am
                                        },
                                        horizontal: 0 > af ? "left" : ae > 0 ? "right" : "center",
                                        vertical: 0 > ag ? "top" : ac > 0 ? "bottom" : "middle"
                                    };
                            an > T && T > I(ae + af) && (ad.horizontal = "center"), am > O && O > I(ac + ag) && (ad.vertical = "middle"), ad.important = F(I(ae), I(af)) > F(I(ac), I(ag)) ? "horizontal" : "vertical", U.using.call(this, ab, ad)
                        }), ak.offset(e.extend(ao, {
                            using: Y
                        }))
                    })
                }, e.ui.position = {
                    fit: {
                        left: function (U, L) {
                            var O, K = L.within,
                                    S = K.isWindow ? K.scrollLeft : K.offset.left,
                                    M = K.width,
                                    T = U.left - L.collisionPosition.marginLeft,
                                    N = S - T,
                                    P = T + L.collisionWidth - M - S;
                            L.collisionWidth > M ? N > 0 && 0 >= P ? (O = U.left + N + L.collisionWidth - M - S, U.left += N - O) : U.left = P > 0 && 0 >= N ? S : N > P ? S + M - L.collisionWidth : S : N > 0 ? U.left += N : P > 0 ? U.left -= P : U.left = F(U.left - T, U.left)
                        },
                        top: function (U, L) {
                            var O, K = L.within,
                                    S = K.isWindow ? K.scrollTop : K.offset.top,
                                    M = L.within.height,
                                    T = U.top - L.collisionPosition.marginTop,
                                    N = S - T,
                                    P = T + L.collisionHeight - M - S;
                            L.collisionHeight > M ? N > 0 && 0 >= P ? (O = U.top + N + L.collisionHeight - M - S, U.top += N - O) : U.top = P > 0 && 0 >= N ? S : N > P ? S + M - L.collisionHeight : S : N > 0 ? U.top += N : P > 0 ? U.top -= P : U.top = F(U.top - T, U.top)
                        }
                    },
                    flip: {
                        left: function (W, P) {
                            var ad, O, M = P.within,
                                    T = M.offset.left + M.scrollLeft,
                                    N = M.width,
                                    aa = M.isWindow ? M.scrollLeft : M.offset.left,
                                    L = W.left - P.collisionPosition.marginLeft,
                                    S = L - aa,
                                    V = L + P.collisionWidth - N - aa,
                                    U = "left" === P.my[0] ? -P.elemWidth : "right" === P.my[0] ? P.elemWidth : 0,
                                    K = "left" === P.at[0] ? P.targetWidth : "right" === P.at[0] ? -P.targetWidth : 0,
                                    X = -2 * P.offset[0];
                            0 > S ? (ad = W.left + U + K + X + P.collisionWidth - N - T, (0 > ad || I(S) > ad) && (W.left += U + K + X)) : V > 0 && (O = W.left - P.collisionPosition.marginLeft + U + K + X - aa, (O > 0 || V > I(O)) && (W.left += U + K + X))
                        },
                        top: function (W, P) {
                            var ae, O, M = P.within,
                                    T = M.offset.top + M.scrollTop,
                                    N = M.height,
                                    aa = M.isWindow ? M.scrollTop : M.offset.top,
                                    af = W.top - P.collisionPosition.marginTop,
                                    S = af - aa,
                                    V = af + P.collisionHeight - N - aa,
                                    U = "top" === P.my[1],
                                    L = U ? -P.elemHeight : "bottom" === P.my[1] ? P.elemHeight : 0,
                                    X = "top" === P.at[1] ? P.targetHeight : "bottom" === P.at[1] ? -P.targetHeight : 0,
                                    K = -2 * P.offset[1];
                            0 > S ? (O = W.top + L + X + K + P.collisionHeight - N - T, (0 > O || I(S) > O) && (W.top += L + X + K)) : V > 0 && (ae = W.top - P.collisionPosition.marginTop + L + X + K - aa, (ae > 0 || V > I(ae)) && (W.top += L + X + K))
                        }
                    },
                    flipfit: {
                        left: function () {
                            e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
                        },
                        top: function () {
                            e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
                        }
                    }
                },
                function () {
                    var S, L, N, M, O, K = document.getElementsByTagName("body")[0],
                            P = document.createElement("div");
                    S = document.createElement(K ? "div" : "body"), N = {
                        visibility: "hidden",
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: "none"
                    }, K && e.extend(N, {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px"
                    });
                    for (O in N) {
                        S.style[O] = N[O]
                    }
                    S.appendChild(P), L = K || document.documentElement, L.insertBefore(S, L.firstChild), P.style.cssText = "position: absolute; left: 10.7432222px;", M = e(P).offset().left, A = M > 10 && 11 > M, S.innerHTML = "", L.removeChild(S)
                }()
            }(), e.ui.position, e.widget("ui.accordion", {
        version: "1.11.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function () {
            var k = this.options;
            this.prevShow = this.prevHide = e(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), k.collapsible || k.active !== !1 && null != k.active || (k.active = 0), this._processPanels(), 0 > k.active && (k.active += this.headers.length), this._refresh()
        },
        _getCreateEventData: function () {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : e()
            }
        },
        _createIcons: function () {
            var k = this.options.icons;
            k && (e("<span>").addClass("ui-accordion-header-icon ui-icon " + k.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(k.header).addClass(k.activeHeader), this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function () {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function () {
            var k;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId(), this._destroyIcons(), k = this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId(), "content" !== this.options.heightStyle && k.css("height", "")
        },
        _setOption: function (k, q) {
            return "active" === k ? (this._activate(q), void 0) : ("event" === k && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(q)), this._super(k, q), "collapsible" !== k || q || this.options.active !== !1 || this._activate(0), "icons" === k && (this._destroyIcons(), q && this._createIcons()), "disabled" === k && (this.element.toggleClass("ui-state-disabled", !!q).attr("aria-disabled", q), this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!q)), void 0)
        },
        _keydown: function (x) {
            if (!x.altKey && !x.ctrlKey) {
                var A = e.ui.keyCode,
                        w = this.headers.length,
                        q = this.headers.index(x.target),
                        k = !1;
                switch (x.keyCode) {
                    case A.RIGHT:
                    case A.DOWN:
                        k = this.headers[(q + 1) % w];
                        break;
                    case A.LEFT:
                    case A.UP:
                        k = this.headers[(q - 1 + w) % w];
                        break;
                    case A.SPACE:
                    case A.ENTER:
                        this._eventHandler(x);
                        break;
                    case A.HOME:
                        k = this.headers[0];
                        break;
                    case A.END:
                        k = this.headers[w - 1]
                }
                k && (e(x.target).attr("tabIndex", -1), e(k).attr("tabIndex", 0), k.focus(), x.preventDefault())
            }
        },
        _panelKeyDown: function (k) {
            k.keyCode === e.ui.keyCode.UP && k.ctrlKey && e(k.currentTarget).prev().focus()
        },
        refresh: function () {
            var k = this.options;
            this._processPanels(), k.active === !1 && k.collapsible === !0 || !this.headers.length ? (k.active = !1, this.active = e()) : k.active === !1 ? this._activate(0) : this.active.length && !e.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (k.active = !1, this.active = e()) : this._activate(Math.max(0, k.active - 1)) : k.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
        },
        _processPanels: function () {
            var k = this.headers,
                    q = this.panels;
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all"), this.panels = this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide(), q && (this._off(k.not(this.headers)), this._off(q.not(this.panels)))
        },
        _refresh: function () {
            var k, q = this.options,
                    x = q.heightStyle,
                    w = this.element.parent();
            this.active = this._findActive(q.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function () {
                var C = e(this),
                        D = C.uniqueId().attr("id"),
                        B = C.next(),
                        A = B.uniqueId().attr("id");
                C.attr("aria-controls", A), B.attr("aria-labelledby", D)
            }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(), this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(q.event), "fill" === x ? (k = w.height(), this.element.siblings(":visible").each(function () {
                var B = e(this),
                        A = B.css("position");
                "absolute" !== A && "fixed" !== A && (k -= B.outerHeight(!0))
            }), this.headers.each(function () {
                k -= e(this).outerHeight(!0)
            }), this.headers.next().each(function () {
                e(this).height(Math.max(0, k - e(this).innerHeight() + e(this).height()))
            }).css("overflow", "auto")) : "auto" === x && (k = 0, this.headers.next().each(function () {
                k = Math.max(k, e(this).css("height", "").height())
            }).height(k))
        },
        _activate: function (k) {
            var q = this._findActive(k)[0];
            q !== this.active[0] && (q = q || this.active[0], this._eventHandler({
                target: q,
                currentTarget: q,
                preventDefault: e.noop
            }))
        },
        _findActive: function (k) {
            return "number" == typeof k ? this.headers.eq(k) : e()
        },
        _setupEvents: function (k) {
            var q = {
                keydown: "_keydown"
            };
            k && e.each(k.split(" "), function (w, x) {
                q[x] = "_eventHandler"
            }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, q), this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }), this._hoverable(this.headers), this._focusable(this.headers)
        },
        _eventHandler: function (k) {
            var x = this.options,
                    E = this.active,
                    B = e(k.currentTarget),
                    q = B[0] === E[0],
                    C = q && x.collapsible,
                    D = C ? e() : B.next(),
                    w = E.next(),
                    A = {
                        oldHeader: E,
                        oldPanel: w,
                        newHeader: C ? e() : B,
                        newPanel: D
                    };
            k.preventDefault(), q && !x.collapsible || this._trigger("beforeActivate", k, A) === !1 || (x.active = C ? !1 : this.headers.index(B), this.active = q ? e() : B, this._toggle(A), E.removeClass("ui-accordion-header-active ui-state-active"), x.icons && E.children(".ui-accordion-header-icon").removeClass(x.icons.activeHeader).addClass(x.icons.header), q || (B.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), x.icons && B.children(".ui-accordion-header-icon").removeClass(x.icons.header).addClass(x.icons.activeHeader), B.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function (k) {
            var q = k.newPanel,
                    w = this.prevShow.length ? this.prevShow : k.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = q, this.prevHide = w, this.options.animate ? this._animate(q, w, k) : (w.hide(), q.show(), this._toggleComplete(k)), w.attr({
                "aria-hidden": "true"
            }), w.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), q.length && w.length ? w.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : q.length && this.headers.filter(function () {
                return 0 === parseInt(e(this).attr("tabIndex"), 10)
            }).attr("tabIndex", -1), q.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _animate: function (G, x, k) {
            var w, E, B, F = this,
                    H = 0,
                    I = G.css("box-sizing"),
                    q = G.length && (!x.length || G.index() < x.index()),
                    A = this.options.animate || {},
                    D = q && A.down || A,
                    C = function () {
                        F._toggleComplete(k)
                    };
            return "number" == typeof D && (B = D), "string" == typeof D && (E = D), E = E || D.easing || A.easing, B = B || D.duration || A.duration, x.length ? G.length ? (w = G.show().outerHeight(), x.animate(this.hideProps, {
                duration: B,
                easing: E,
                step: function (K, J) {
                    J.now = Math.round(K)
                }
            }), G.hide().animate(this.showProps, {
                duration: B,
                easing: E,
                complete: C,
                step: function (K, J) {
                    J.now = Math.round(K), "height" !== J.prop ? "content-box" === I && (H += J.now) : "content" !== F.options.heightStyle && (J.now = Math.round(w - x.outerHeight() - H), H = 0)
                }
            }), void 0) : x.animate(this.hideProps, B, E, C) : G.animate(this.showProps, B, E, C)
        },
        _toggleComplete: function (k) {
            var q = k.oldPanel;
            q.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), q.length && (q.parent()[0].className = q.parent()[0].className), this._trigger("activate", null, k)
        }
    }), e.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item": function (k) {
                    k.preventDefault()
                },
                "click .ui-menu-item": function (k) {
                    var q = e(k.target);
                    !this.mouseHandled && q.not(".ui-state-disabled").length && (this.select(k), k.isPropagationStopped() || (this.mouseHandled = !0), q.has(".ui-menu").length ? this.expand(k) : !this.element.is(":focus") && e(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function (k) {
                    if (!this.previousFilter) {
                        var q = e(k.currentTarget);
                        q.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(k, q)
                    }
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function (w, k) {
                    var q = this.active || this.element.find(this.options.items).eq(0);
                    k || this.focus(w, q)
                },
                blur: function (k) {
                    this._delay(function () {
                        e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(k)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (k) {
                    this._closeOnDocumentClick(k) && this.collapseAll(k), this.mouseHandled = !1
                }
            })
        },
        _destroy: function () {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function () {
                var k = e(this);
                k.data("ui-menu-submenu-carat") && k.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function (A) {
            var B, x, q, k, w = !0;
            switch (A.keyCode) {
                case e.ui.keyCode.PAGE_UP:
                    this.previousPage(A);
                    break;
                case e.ui.keyCode.PAGE_DOWN:
                    this.nextPage(A);
                    break;
                case e.ui.keyCode.HOME:
                    this._move("first", "first", A);
                    break;
                case e.ui.keyCode.END:
                    this._move("last", "last", A);
                    break;
                case e.ui.keyCode.UP:
                    this.previous(A);
                    break;
                case e.ui.keyCode.DOWN:
                    this.next(A);
                    break;
                case e.ui.keyCode.LEFT:
                    this.collapse(A);
                    break;
                case e.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(A);
                    break;
                case e.ui.keyCode.ENTER:
                case e.ui.keyCode.SPACE:
                    this._activate(A);
                    break;
                case e.ui.keyCode.ESCAPE:
                    this.collapse(A);
                    break;
                default:
                    w = !1, x = this.previousFilter || "", q = String.fromCharCode(A.keyCode), k = !1, clearTimeout(this.filterTimer), q === x ? k = !0 : q = x + q, B = this._filterMenuItems(q), B = k && -1 !== B.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : B, B.length || (q = String.fromCharCode(A.keyCode), B = this._filterMenuItems(q)), B.length ? (this.focus(A, B), this.previousFilter = q, this.filterTimer = this._delay(function () {
                        delete this.previousFilter
                    }, 1000)) : delete this.previousFilter
            }
            w && A.preventDefault()
        },
        _activate: function (k) {
            this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(k) : this.select(k))
        },
        refresh: function () {
            var x, A, w = this,
                    q = this.options.icons.submenu,
                    k = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), k.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var D = e(this),
                        B = D.parent(),
                        C = e("<span>").addClass("ui-menu-icon ui-icon " + q).data("ui-menu-submenu-carat", !0);
                B.attr("aria-haspopup", "true").prepend(C), D.attr("aria-labelledby", B.attr("id"))
            }), x = k.add(this.element), A = x.find(this.options.items), A.not(".ui-menu-item").each(function () {
                var B = e(this);
                w._isDivider(B) && B.addClass("ui-widget-content ui-menu-divider")
            }), A.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }), A.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function (k, q) {
            "icons" === k && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(q.submenu), "disabled" === k && this.element.toggleClass("ui-state-disabled", !!q).attr("aria-disabled", q), this._super(k, q)
        },
        focus: function (w, k) {
            var q, x;
            this.blur(w, w && "focus" === w.type), this._scrollIntoView(k), this.active = k.first(), x = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", x.attr("id")), this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), w && "keydown" === w.type ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), q = k.children(".ui-menu"), q.length && w && /^mouse/.test(w.type) && this._startOpening(q), this.activeMenu = k.parent(), this._trigger("focus", w, {
                item: k
            })
        },
        _scrollIntoView: function (B) {
            var C, A, q, k, w, x;
            this._hasScroll() && (C = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, A = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, q = B.offset().top - this.activeMenu.offset().top - C - A, k = this.activeMenu.scrollTop(), w = this.activeMenu.height(), x = B.outerHeight(), 0 > q ? this.activeMenu.scrollTop(k + q) : q + x > w && this.activeMenu.scrollTop(k + q - w + x))
        },
        blur: function (k, q) {
            q || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), this.active = null, this._trigger("blur", k, {
                item: this.active
            }))
        },
        _startOpening: function (k) {
            clearTimeout(this.timer), "true" === k.attr("aria-hidden") && (this.timer = this._delay(function () {
                this._close(), this._open(k)
            }, this.delay))
        },
        _open: function (k) {
            var q = e.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(k.parents(".ui-menu")).hide().attr("aria-hidden", "true"), k.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(q)
        },
        collapseAll: function (k, q) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var w = q ? this.element : e(k && k.target).closest(this.element.find(".ui-menu"));
                w.length || (w = this.element), this._close(w), this.blur(k), this.activeMenu = w
            }, this.delay)
        },
        _close: function (k) {
            k || (k = this.active ? this.active.parent() : this.element), k.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active")
        },
        _closeOnDocumentClick: function (k) {
            return !e(k.target).closest(".ui-menu").length
        },
        _isDivider: function (k) {
            return !/[^\-\u2014\u2013\s]/.test(k.text())
        },
        collapse: function (k) {
            var q = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            q && q.length && (this._close(), this.focus(k, q))
        },
        expand: function (k) {
            var q = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            q && q.length && (this._open(q.parent()), this._delay(function () {
                this.focus(k, q)
            }))
        },
        next: function (k) {
            this._move("next", "first", k)
        },
        previous: function (k) {
            this._move("prev", "last", k)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (w, k, q) {
            var x;
            this.active && (x = "first" === w || "last" === w ? this.active["first" === w ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[w + "All"](".ui-menu-item").eq(0)), x && x.length && this.active || (x = this.activeMenu.find(this.options.items)[k]()), this.focus(q, x)
        },
        nextPage: function (k) {
            var q, x, w;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (x = this.active.offset().top, w = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return q = e(this), 0 > q.offset().top - x - w
            }), this.focus(k, q)) : this.focus(k, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(k), void 0)
        },
        previousPage: function (k) {
            var q, x, w;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (x = this.active.offset().top, w = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return q = e(this), q.offset().top - x + w > 0
            }), this.focus(k, q)) : this.focus(k, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(k), void 0)
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (k) {
            this.active = this.active || e(k.target).closest(".ui-menu-item");
            var q = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(k, !0), this._trigger("select", k, q)
        },
        _filterMenuItems: function (k) {
            var q = k.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
                    w = RegExp("^" + q, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                return w.test(e.trim(e(this).text()))
            })
        }
    }), e.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var A, B, x, q = this.element[0].nodeName.toLowerCase(),
                    k = "textarea" === q,
                    w = "input" === q;
            this.isMultiLine = k ? !0 : w ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[k || w ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (C) {
                    if (this.element.prop("readOnly")) {
                        return A = !0, x = !0, B = !0, void 0
                    }
                    A = !1, x = !1, B = !1;
                    var D = e.ui.keyCode;
                    switch (C.keyCode) {
                        case D.PAGE_UP:
                            A = !0, this._move("previousPage", C);
                            break;
                        case D.PAGE_DOWN:
                            A = !0, this._move("nextPage", C);
                            break;
                        case D.UP:
                            A = !0, this._keyEvent("previous", C);
                            break;
                        case D.DOWN:
                            A = !0, this._keyEvent("next", C);
                            break;
                        case D.ENTER:
                            this.menu.active && (A = !0, C.preventDefault(), this.menu.select(C));
                            break;
                        case D.TAB:
                            this.menu.active && this.menu.select(C);
                            break;
                        case D.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(C), C.preventDefault());
                            break;
                        default:
                            B = !0, this._searchTimeout(C)
                    }
                },
                keypress: function (C) {
                    if (A) {
                        return A = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && C.preventDefault(), void 0
                    }
                    if (!B) {
                        var D = e.ui.keyCode;
                        switch (C.keyCode) {
                            case D.PAGE_UP:
                                this._move("previousPage", C);
                                break;
                            case D.PAGE_DOWN:
                                this._move("nextPage", C);
                                break;
                            case D.UP:
                                this._keyEvent("previous", C);
                                break;
                            case D.DOWN:
                                this._keyEvent("next", C)
                        }
                    }
                },
                input: function (C) {
                    return x ? (x = !1, C.preventDefault(), void 0) : (this._searchTimeout(C), void 0)
                },
                focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function (C) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(C), this._change(C), void 0)
                }
            }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance"), this._on(this.menu.element, {
                mousedown: function (D) {
                    D.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur
                    });
                    var C = this.menu.element[0];
                    e(D.target).closest(".ui-menu-item").length || this._delay(function () {
                        var E = this;
                        this.document.one("mousedown", function (F) {
                            F.target === E.element[0] || F.target === C || e.contains(C, F.target) || E.close()
                        })
                    })
                },
                menufocus: function (F, E) {
                    var D, C;
                    return this.isNewMenu && (this.isNewMenu = !1, F.originalEvent && /^mouse/.test(F.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
                        e(F.target).trigger(F.originalEvent)
                    }), void 0) : (C = E.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", F, {
                        item: C
                    }) && F.originalEvent && /^key/.test(F.originalEvent.type) && this._value(C.value), D = E.item.attr("aria-label") || C.value, D && e.trim(D).length && (this.liveRegion.children().hide(), e("<div>").text(D).appendTo(this.liveRegion)), void 0)
                },
                menuselect: function (C, F) {
                    var E = F.item.data("ui-autocomplete-item"),
                            D = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = D, this._delay(function () {
                        this.previous = D, this.selectedItem = E
                    })), !1 !== this._trigger("select", C, {
                        item: E
                    }) && this._value(E.value), this.term = this._value(), this.close(C), this.selectedItem = E
                }
            }), this.liveRegion = e("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (k, q) {
            this._super(k, q), "source" === k && this._initSource(), "appendTo" === k && this.menu.element.appendTo(this._appendTo()), "disabled" === k && q && this.xhr && this.xhr.abort()
        },
        _appendTo: function () {
            var k = this.options.appendTo;
            return k && (k = k.jquery || k.nodeType ? e(k) : this.document.find(k).eq(0)), k && k[0] || (k = this.element.closest(".ui-front")), k.length || (k = this.document[0].body), k
        },
        _initSource: function () {
            var k, q, w = this;
            e.isArray(this.options.source) ? (k = this.options.source, this.source = function (A, x) {
                x(e.ui.autocomplete.filter(k, A.term))
            }) : "string" == typeof this.options.source ? (q = this.options.source, this.source = function (A, x) {
                w.xhr && w.xhr.abort(), w.xhr = e.ajax({
                    url: q,
                    data: A,
                    dataType: "json",
                    success: function (B) {
                        x(B)
                    },
                    error: function () {
                        x([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (k) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                var x = this.term === this._value(),
                        q = this.menu.element.is(":visible"),
                        w = k.altKey || k.ctrlKey || k.metaKey || k.shiftKey;
                (!x || x && !q && !w) && (this.selectedItem = null, this.search(null, k))
            }, this.options.delay)
        },
        search: function (k, q) {
            return k = null != k ? k : this._value(), this.term = this._value(), k.length < this.options.minLength ? this.close(q) : this._trigger("search", q) !== !1 ? this._search(k) : void 0
        },
        _search: function (k) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: k
            }, this._response())
        },
        _response: function () {
            var k = ++this.requestIndex;
            return e.proxy(function (q) {
                k === this.requestIndex && this.__response(q), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function (k) {
            k && (k = this._normalize(k)), this._trigger("response", null, {
                content: k
            }), !this.options.disabled && k && k.length && !this.cancelSearch ? (this._suggest(k), this._trigger("open")) : this._close()
        },
        close: function (k) {
            this.cancelSearch = !0, this._close(k)
        },
        _close: function (k) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", k))
        },
        _change: function (k) {
            this.previous !== this._value() && this._trigger("change", k, {
                item: this.selectedItem
            })
        },
        _normalize: function (k) {
            return k.length && k[0].label && k[0].value ? k : e.map(k, function (q) {
                return "string" == typeof q ? {
                    label: q,
                    value: q
                } : e.extend({}, q, {
                    label: q.label || q.value,
                    value: q.value || q.label
                })
            })
        },
        _suggest: function (k) {
            var q = this.menu.element.empty();
            this._renderMenu(q, k), this.isNewMenu = !0, this.menu.refresh(), q.show(), this._resizeMenu(), q.position(e.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function () {
            var k = this.menu.element;
            k.outerWidth(Math.max(k.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (k, q) {
            var w = this;
            e.each(q, function (x, A) {
                w._renderItemData(k, A)
            })
        },
        _renderItemData: function (k, q) {
            return this._renderItem(k, q).data("ui-autocomplete-item", q)
        },
        _renderItem: function (k, q) {
            return e("<li>").text(q.label).appendTo(k)
        },
        _move: function (k, q) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(k) || this.menu.isLastItem() && /^next/.test(k) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[k](q), void 0) : (this.search(null, q), void 0)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (k, q) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(k, q), q.preventDefault())
        }
    }), e.extend(e.ui.autocomplete, {
        escapeRegex: function (k) {
            return k.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function (k, q) {
            var w = RegExp(e.ui.autocomplete.escapeRegex(q), "i");
            return e.grep(k, function (x) {
                return w.test(x.label || x.value || x)
            })
        }
    }), e.widget("ui.autocomplete", e.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (k) {
                    return k + (k > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function (k) {
            var q;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (q = k && k.length ? this.options.messages.results(k.length) : this.options.messages.noResults, this.liveRegion.children().hide(), e("<div>").text(q).appendTo(this.liveRegion))
        }
    }), e.ui.autocomplete;
    var c, u = "ui-button ui-widget ui-state-default ui-corner-all",
            f = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            p = function () {
                var k = e(this);
                setTimeout(function () {
                    k.find(":ui-button").button("refresh")
                }, 1)
            },
            g = function (k) {
                var q = k.name,
                        x = k.form,
                        w = e([]);
                return q && (q = q.replace(/'/g, "\\'"), w = x ? e(x).find("[name='" + q + "'][type=radio]") : e("[name='" + q + "'][type=radio]", k.ownerDocument).filter(function () {
                    return !this.form
                })), w
            };
    e.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, p), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var k = this,
                    q = this.options,
                    x = "checkbox" === this.type || "radio" === this.type,
                    w = x ? "" : "ui-state-active";
            null === q.label && (q.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(u).attr("role", "button").bind("mouseenter" + this.eventNamespace, function () {
                q.disabled || this === c && e(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function () {
                q.disabled || e(this).removeClass(w)
            }).bind("click" + this.eventNamespace, function (A) {
                q.disabled && (A.preventDefault(), A.stopImmediatePropagation())
            }), this._on({
                focus: function () {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function () {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }), x && this.element.bind("change" + this.eventNamespace, function () {
                k.refresh()
            }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                return q.disabled ? !1 : void 0
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function () {
                if (q.disabled) {
                    return !1
                }
                e(this).addClass("ui-state-active"), k.buttonElement.attr("aria-pressed", "true");
                var A = k.element[0];
                g(A).not(A).map(function () {
                    return e(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function () {
                return q.disabled ? !1 : (e(this).addClass("ui-state-active"), c = this, k.document.one("mouseup", function () {
                    c = null
                }), void 0)
            }).bind("mouseup" + this.eventNamespace, function () {
                return q.disabled ? !1 : (e(this).removeClass("ui-state-active"), void 0)
            }).bind("keydown" + this.eventNamespace, function (A) {
                return q.disabled ? !1 : ((A.keyCode === e.ui.keyCode.SPACE || A.keyCode === e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active"), void 0)
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function () {
                e(this).removeClass("ui-state-active")
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function (A) {
                A.keyCode === e.ui.keyCode.SPACE && e(this).click()
            })), this._setOption("disabled", q.disabled), this._resetButton()
        },
        _determineButtonType: function () {
            var w, k, q;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (w = this.element.parents().last(), k = "label[for='" + this.element.attr("id") + "']", this.buttonElement = w.find(k), this.buttonElement.length || (w = w.length ? w.siblings() : this.element.siblings(), this.buttonElement = w.filter(k), this.buttonElement.length || (this.buttonElement = w.find(k))), this.element.addClass("ui-helper-hidden-accessible"), q = this.element.is(":checked"), q && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", q)) : this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        _destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(u + " ui-state-active " + f).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function (k, q) {
            return this._super(k, q), "disabled" === k ? (this.widget().toggleClass("ui-state-disabled", !!q), this.element.prop("disabled", !!q), q && ("checkbox" === this.type || "radio" === this.type ? this.buttonElement.removeClass("ui-state-focus") : this.buttonElement.removeClass("ui-state-focus ui-state-active")), void 0) : (this._resetButton(), void 0)
        },
        refresh: function () {
            var k = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            k !== this.options.disabled && this._setOption("disabled", k), "radio" === this.type ? g(this.element[0]).each(function () {
                e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function () {
            if ("input" === this.type) {
                return this.options.label && this.element.val(this.options.label), void 0
            }
            var x = this.buttonElement.removeClass(f),
                    A = e("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(x.empty()).text(),
                    w = this.options.icons,
                    q = w.primary && w.secondary,
                    k = [];
            w.primary || w.secondary ? (this.options.text && k.push("ui-button-text-icon" + (q ? "s" : w.primary ? "-primary" : "-secondary")), w.primary && x.prepend("<span class='ui-button-icon-primary ui-icon " + w.primary + "'></span>"), w.secondary && x.append("<span class='ui-button-icon-secondary ui-icon " + w.secondary + "'></span>"), this.options.text || (k.push(q ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || x.attr("title", e.trim(A)))) : k.push("ui-button-text-only"), x.addClass(k.join(" "))
        }
    }), e.widget("ui.buttonset", {
        version: "1.11.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (k, q) {
            "disabled" === k && this.buttons.button("option", k, q), this._super(k, q)
        },
        refresh: function () {
            var k = "rtl" === this.element.css("direction"),
                    q = this.element.find(this.options.items),
                    w = q.filter(":ui-button");
            q.not(":ui-button").button(), w.button("refresh"), this.buttons = q.map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(k ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(k ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function () {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                return e(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    }), e.ui.button, e.extend(e.ui, {
        datepicker: {
            version: "1.11.4"
        }
    });
    var v;
    e.extend(r.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (k) {
            return y(this._defaults, k || {}), this
        },
        _attachDatepicker: function (x, A) {
            var w, q, k;
            w = x.nodeName.toLowerCase(), q = "div" === w || "span" === w, x.id || (this.uuid += 1, x.id = "dp" + this.uuid), k = this._newInst(e(x), q), k.settings = e.extend({}, A || {}), "input" === w ? this._connectDatepicker(x, k) : q && this._inlineDatepicker(x, k)
        },
        _newInst: function (k, q) {
            var w = k[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: w,
                input: k,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: q,
                dpDiv: q ? a(e("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (k, q) {
            var w = e(k);
            q.append = e([]), q.trigger = e([]), w.hasClass(this.markerClassName) || (this._attachments(w, q), w.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(q), e.data(k, "datepicker", q), q.settings.disabled && this._disableDatepicker(k))
        },
        _attachments: function (B, C) {
            var A, q, k, w = this._get(C, "appendText"),
                    x = this._get(C, "isRTL");
            C.append && C.append.remove(), w && (C.append = e("<span class='" + this._appendClass + "'>" + w + "</span>"), B[x ? "before" : "after"](C.append)), B.unbind("focus", this._showDatepicker), C.trigger && C.trigger.remove(), A = this._get(C, "showOn"), ("focus" === A || "both" === A) && B.focus(this._showDatepicker), ("button" === A || "both" === A) && (q = this._get(C, "buttonText"), k = this._get(C, "buttonImage"), C.trigger = e(this._get(C, "buttonImageOnly") ? e("<img/>").addClass(this._triggerClass).attr({
                src: k,
                alt: q,
                title: q
            }) : e("<button type='button'></button>").addClass(this._triggerClass).html(k ? e("<img/>").attr({
                src: k,
                alt: q,
                title: q
            }) : q)), B[x ? "before" : "after"](C.trigger), C.trigger.click(function () {
                return e.datepicker._datepickerShowing && e.datepicker._lastInput === B[0] ? e.datepicker._hideDatepicker() : e.datepicker._datepickerShowing && e.datepicker._lastInput !== B[0] ? (e.datepicker._hideDatepicker(), e.datepicker._showDatepicker(B[0])) : e.datepicker._showDatepicker(B[0]), !1
            }))
        },
        _autoSize: function (x) {
            if (this._get(x, "autoSize") && !x.inline) {
                var B, C, A, q, k = new Date(2009, 11, 20),
                        w = this._get(x, "dateFormat");
                w.match(/[DM]/) && (B = function (D) {
                    for (C = 0, A = 0, q = 0; D.length > q; q++) {
                        D[q].length > C && (C = D[q].length, A = q)
                    }
                    return A
                }, k.setMonth(B(this._get(x, w.match(/MM/) ? "monthNames" : "monthNamesShort"))), k.setDate(B(this._get(x, w.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - k.getDay())), x.input.attr("size", this._formatDate(x, k).length)
            }
        },
        _inlineDatepicker: function (k, q) {
            var w = e(k);
            w.hasClass(this.markerClassName) || (w.addClass(this.markerClassName).append(q.dpDiv), e.data(k, "datepicker", q), this._setDate(q, this._getDefaultDate(q), !0), this._updateDatepicker(q), this._updateAlternate(q), q.settings.disabled && this._disableDatepicker(k), q.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (A, B, x, D, G) {
            var F, w, C, E, q, k = this._dialogInst;
            return k || (this.uuid += 1, F = "dp" + this.uuid, this._dialogInput = e("<input type='text' id='" + F + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), e("body").append(this._dialogInput), k = this._dialogInst = this._newInst(this._dialogInput, !1), k.settings = {}, e.data(this._dialogInput[0], "datepicker", k)), y(k.settings, D || {}), B = B && B.constructor === Date ? this._formatDate(k, B) : B, this._dialogInput.val(B), this._pos = G ? G.length ? G : [G.pageX, G.pageY] : null, this._pos || (w = document.documentElement.clientWidth, C = document.documentElement.clientHeight, E = document.documentElement.scrollLeft || document.body.scrollLeft, q = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [w / 2 - 100 + E, C / 2 - 150 + q]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), k.settings.onSelect = x, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), e.blockUI && e.blockUI(this.dpDiv), e.data(this._dialogInput[0], "datepicker", k), this
        },
        _destroyDatepicker: function (k) {
            var q, x = e(k),
                    w = e.data(k, "datepicker");
            x.hasClass(this.markerClassName) && (q = k.nodeName.toLowerCase(), e.removeData(k, "datepicker"), "input" === q ? (w.append.remove(), w.trigger.remove(), x.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === q || "span" === q) && x.removeClass(this.markerClassName).empty(), v === w && (v = null))
        },
        _enableDatepicker: function (x) {
            var A, w, q = e(x),
                    k = e.data(x, "datepicker");
            q.hasClass(this.markerClassName) && (A = x.nodeName.toLowerCase(), "input" === A ? (x.disabled = !1, k.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === A || "span" === A) && (w = q.children("." + this._inlineClass), w.children().removeClass("ui-state-disabled"), w.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = e.map(this._disabledInputs, function (B) {
                return B === x ? null : B
            }))
        },
        _disableDatepicker: function (x) {
            var A, w, q = e(x),
                    k = e.data(x, "datepicker");
            q.hasClass(this.markerClassName) && (A = x.nodeName.toLowerCase(), "input" === A ? (x.disabled = !0, k.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === A || "span" === A) && (w = q.children("." + this._inlineClass), w.children().addClass("ui-state-disabled"), w.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = e.map(this._disabledInputs, function (B) {
                return B === x ? null : B
            }), this._disabledInputs[this._disabledInputs.length] = x)
        },
        _isDisabledDatepicker: function (k) {
            if (!k) {
                return !1
            }
            for (var q = 0; this._disabledInputs.length > q; q++) {
                if (this._disabledInputs[q] === k) {
                    return !0
                }
            }
            return !1
        },
        _getInst: function (k) {
            try {
                return e.data(k, "datepicker")
            } catch (q) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (B, C, w) {
            var A, D, q, x, k = this._getInst(B);
            return 2 === arguments.length && "string" == typeof C ? "defaults" === C ? e.extend({}, e.datepicker._defaults) : k ? "all" === C ? e.extend({}, k.settings) : this._get(k, C) : null : (A = C || {}, "string" == typeof C && (A = {}, A[C] = w), k && (this._curInst === k && this._hideDatepicker(), D = this._getDateDatepicker(B, !0), q = this._getMinMaxDate(k, "min"), x = this._getMinMaxDate(k, "max"), y(k.settings, A), null !== q && void 0 !== A.dateFormat && void 0 === A.minDate && (k.settings.minDate = this._formatDate(k, q)), null !== x && void 0 !== A.dateFormat && void 0 === A.maxDate && (k.settings.maxDate = this._formatDate(k, x)), "disabled" in A && (A.disabled ? this._disableDatepicker(B) : this._enableDatepicker(B)), this._attachments(e(B), k), this._autoSize(k), this._setDate(k, D), this._updateAlternate(k), this._updateDatepicker(k)), void 0)
        },
        _changeDatepicker: function (w, k, q) {
            this._optionDatepicker(w, k, q)
        },
        _refreshDatepicker: function (k) {
            var q = this._getInst(k);
            q && this._updateDatepicker(q)
        },
        _setDateDatepicker: function (w, k) {
            var q = this._getInst(w);
            q && (this._setDate(q, k), this._updateDatepicker(q), this._updateAlternate(q))
        },
        _getDateDatepicker: function (w, k) {
            var q = this._getInst(w);
            return q && !q.inline && this._setDateFromField(q, k), q ? this._getDate(q) : null
        },
        _doKeyDown: function (B) {
            var C, A, q, k = e.datepicker._getInst(B.target),
                    w = !0,
                    x = k.dpDiv.is(".ui-datepicker-rtl");
            if (k._keyEvent = !0, e.datepicker._datepickerShowing) {
                switch (B.keyCode) {
                    case 9:
                        e.datepicker._hideDatepicker(), w = !1;
                        break;
                    case 13:
                        return q = e("td." + e.datepicker._dayOverClass + ":not(." + e.datepicker._currentClass + ")", k.dpDiv), q[0] && e.datepicker._selectDay(B.target, k.selectedMonth, k.selectedYear, q[0]), C = e.datepicker._get(k, "onSelect"), C ? (A = e.datepicker._formatDate(k), C.apply(k.input ? k.input[0] : null, [A, k])) : e.datepicker._hideDatepicker(), !1;
                    case 27:
                        e.datepicker._hideDatepicker();
                        break;
                    case 33:
                        e.datepicker._adjustDate(B.target, B.ctrlKey ? -e.datepicker._get(k, "stepBigMonths") : -e.datepicker._get(k, "stepMonths"), "M");
                        break;
                    case 34:
                        e.datepicker._adjustDate(B.target, B.ctrlKey ? +e.datepicker._get(k, "stepBigMonths") : +e.datepicker._get(k, "stepMonths"), "M");
                        break;
                    case 35:
                        (B.ctrlKey || B.metaKey) && e.datepicker._clearDate(B.target), w = B.ctrlKey || B.metaKey;
                        break;
                    case 36:
                        (B.ctrlKey || B.metaKey) && e.datepicker._gotoToday(B.target), w = B.ctrlKey || B.metaKey;
                        break;
                    case 37:
                        (B.ctrlKey || B.metaKey) && e.datepicker._adjustDate(B.target, x ? 1 : -1, "D"), w = B.ctrlKey || B.metaKey, B.originalEvent.altKey && e.datepicker._adjustDate(B.target, B.ctrlKey ? -e.datepicker._get(k, "stepBigMonths") : -e.datepicker._get(k, "stepMonths"), "M");
                        break;
                    case 38:
                        (B.ctrlKey || B.metaKey) && e.datepicker._adjustDate(B.target, -7, "D"), w = B.ctrlKey || B.metaKey;
                        break;
                    case 39:
                        (B.ctrlKey || B.metaKey) && e.datepicker._adjustDate(B.target, x ? -1 : 1, "D"), w = B.ctrlKey || B.metaKey, B.originalEvent.altKey && e.datepicker._adjustDate(B.target, B.ctrlKey ? +e.datepicker._get(k, "stepBigMonths") : +e.datepicker._get(k, "stepMonths"), "M");
                        break;
                    case 40:
                        (B.ctrlKey || B.metaKey) && e.datepicker._adjustDate(B.target, 7, "D"), w = B.ctrlKey || B.metaKey;
                        break;
                    default:
                        w = !1
                }
            } else {
                36 === B.keyCode && B.ctrlKey ? e.datepicker._showDatepicker(this) : w = !1
            }
            w && (B.preventDefault(), B.stopPropagation())
        },
        _doKeyPress: function (k) {
            var q, x, w = e.datepicker._getInst(k.target);
            return e.datepicker._get(w, "constrainInput") ? (q = e.datepicker._possibleChars(e.datepicker._get(w, "dateFormat")), x = String.fromCharCode(null == k.charCode ? k.keyCode : k.charCode), k.ctrlKey || k.metaKey || " " > x || !q || q.indexOf(x) > -1) : void 0
        },
        _doKeyUp: function (k) {
            var q, x = e.datepicker._getInst(k.target);
            if (x.input.val() !== x.lastVal) {
                try {
                    q = e.datepicker.parseDate(e.datepicker._get(x, "dateFormat"), x.input ? x.input.val() : null, e.datepicker._getFormatConfig(x)), q && (e.datepicker._setDateFromField(x), e.datepicker._updateAlternate(x), e.datepicker._updateDatepicker(x))
                } catch (w) {
                }
            }
            return !0
        },
        _showDatepicker: function (x) {
            if (x = x.target || x, "input" !== x.nodeName.toLowerCase() && (x = e("input", x.parentNode)[0]), !e.datepicker._isDisabledDatepicker(x) && e.datepicker._lastInput !== x) {
                var B, A, D, q, w, k, C;
                B = e.datepicker._getInst(x), e.datepicker._curInst && e.datepicker._curInst !== B && (e.datepicker._curInst.dpDiv.stop(!0, !0), B && e.datepicker._datepickerShowing && e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])), A = e.datepicker._get(B, "beforeShow"), D = A ? A.apply(x, [x, B]) : {}, D !== !1 && (y(B.settings, D), B.lastVal = null, e.datepicker._lastInput = x, e.datepicker._setDateFromField(B), e.datepicker._inDialog && (x.value = ""), e.datepicker._pos || (e.datepicker._pos = e.datepicker._findPos(x), e.datepicker._pos[1] += x.offsetHeight), q = !1, e(x).parents().each(function () {
                    return q |= "fixed" === e(this).css("position"), !q
                }), w = {
                    left: e.datepicker._pos[0],
                    top: e.datepicker._pos[1]
                }, e.datepicker._pos = null, B.dpDiv.empty(), B.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), e.datepicker._updateDatepicker(B), w = e.datepicker._checkOffset(B, w, q), B.dpDiv.css({
                    position: e.datepicker._inDialog && e.blockUI ? "static" : q ? "fixed" : "absolute",
                    display: "none",
                    left: w.left + "px",
                    top: w.top + "px"
                }), B.inline || (k = e.datepicker._get(B, "showAnim"), C = e.datepicker._get(B, "duration"), B.dpDiv.css("z-index", Q(e(x)) + 1), e.datepicker._datepickerShowing = !0, e.effects && e.effects.effect[k] ? B.dpDiv.show(k, e.datepicker._get(B, "showOptions"), C) : B.dpDiv[k || "show"](k ? C : null), e.datepicker._shouldFocusInput(B) && B.input.focus(), e.datepicker._curInst = B))
            }
        },
        _updateDatepicker: function (A) {
            this.maxRows = 4, v = A, A.dpDiv.empty().append(this._generateHTML(A)), this._attachHandlers(A);
            var B, x = this._getNumberOfMonths(A),
                    q = x[1],
                    k = 17,
                    w = A.dpDiv.find("." + this._dayOverClass + " a");
            w.length > 0 && s.apply(w.get(0)), A.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), q > 1 && A.dpDiv.addClass("ui-datepicker-multi-" + q).css("width", k * q + "em"), A.dpDiv[(1 !== x[0] || 1 !== x[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), A.dpDiv[(this._get(A, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), A === e.datepicker._curInst && e.datepicker._datepickerShowing && e.datepicker._shouldFocusInput(A) && A.input.focus(), A.yearshtml && (B = A.yearshtml, setTimeout(function () {
                B === A.yearshtml && A.yearshtml && A.dpDiv.find("select.ui-datepicker-year:first").replaceWith(A.yearshtml), B = A.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (k) {
            return k.input && k.input.is(":visible") && !k.input.is(":disabled") && !k.input.is(":focus")
        },
        _checkOffset: function (k, x, E) {
            var B = k.dpDiv.outerWidth(),
                    q = k.dpDiv.outerHeight(),
                    C = k.input ? k.input.outerWidth() : 0,
                    D = k.input ? k.input.outerHeight() : 0,
                    w = document.documentElement.clientWidth + (E ? 0 : e(document).scrollLeft()),
                    A = document.documentElement.clientHeight + (E ? 0 : e(document).scrollTop());
            return x.left -= this._get(k, "isRTL") ? B - C : 0, x.left -= E && x.left === k.input.offset().left ? e(document).scrollLeft() : 0, x.top -= E && x.top === k.input.offset().top + D ? e(document).scrollTop() : 0, x.left -= Math.min(x.left, x.left + B > w && w > B ? Math.abs(x.left + B - w) : 0), x.top -= Math.min(x.top, x.top + q > A && A > q ? Math.abs(q + D) : 0), x
        },
        _findPos: function (k) {
            for (var q, x = this._getInst(k), w = this._get(x, "isRTL"); k && ("hidden" === k.type || 1 !== k.nodeType || e.expr.filters.hidden(k)); ) {
                k = k[w ? "previousSibling" : "nextSibling"]
            }
            return q = e(k).offset(), [q.left, q.top]
        },
        _hideDatepicker: function (A) {
            var B, x, q, k, w = this._curInst;
            !w || A && w !== e.data(A, "datepicker") || this._datepickerShowing && (B = this._get(w, "showAnim"), x = this._get(w, "duration"), q = function () {
                e.datepicker._tidyDialog(w)
            }, e.effects && (e.effects.effect[B] || e.effects[B]) ? w.dpDiv.hide(B, e.datepicker._get(w, "showOptions"), x, q) : w.dpDiv["slideDown" === B ? "slideUp" : "fadeIn" === B ? "fadeOut" : "hide"](B ? x : null, q), B || q(), this._datepickerShowing = !1, k = this._get(w, "onClose"), k && k.apply(w.input ? w.input[0] : null, [w.input ? w.input.val() : "", w]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), e.blockUI && (e.unblockUI(), e("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (k) {
            k.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (k) {
            if (e.datepicker._curInst) {
                var q = e(k.target),
                        w = e.datepicker._getInst(q[0]);
                (q[0].id !== e.datepicker._mainDivId && 0 === q.parents("#" + e.datepicker._mainDivId).length && !q.hasClass(e.datepicker.markerClassName) && !q.closest("." + e.datepicker._triggerClass).length && e.datepicker._datepickerShowing && (!e.datepicker._inDialog || !e.blockUI) || q.hasClass(e.datepicker.markerClassName) && e.datepicker._curInst !== w) && e.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (x, A, w) {
            var q = e(x),
                    k = this._getInst(q[0]);
            this._isDisabledDatepicker(q[0]) || (this._adjustInstDate(k, A + ("M" === w ? this._get(k, "showCurrentAtPos") : 0), w), this._updateDatepicker(k))
        },
        _gotoToday: function (k) {
            var q, x = e(k),
                    w = this._getInst(x[0]);
            this._get(w, "gotoCurrent") && w.currentDay ? (w.selectedDay = w.currentDay, w.drawMonth = w.selectedMonth = w.currentMonth, w.drawYear = w.selectedYear = w.currentYear) : (q = new Date, w.selectedDay = q.getDate(), w.drawMonth = w.selectedMonth = q.getMonth(), w.drawYear = w.selectedYear = q.getFullYear()), this._notifyChange(w), this._adjustDate(x)
        },
        _selectMonthYear: function (x, A, w) {
            var q = e(x),
                    k = this._getInst(q[0]);
            k["selected" + ("M" === w ? "Month" : "Year")] = k["draw" + ("M" === w ? "Month" : "Year")] = parseInt(A.options[A.selectedIndex].value, 10), this._notifyChange(k), this._adjustDate(q)
        },
        _selectDay: function (A, B, x, q) {
            var k, w = e(A);
            e(q).hasClass(this._unselectableClass) || this._isDisabledDatepicker(w[0]) || (k = this._getInst(w[0]), k.selectedDay = k.currentDay = e("a", q).html(), k.selectedMonth = k.currentMonth = B, k.selectedYear = k.currentYear = x, this._selectDate(A, this._formatDate(k, k.currentDay, k.currentMonth, k.currentYear)))
        },
        _clearDate: function (k) {
            var q = e(k);
            this._selectDate(q, "")
        },
        _selectDate: function (x, A) {
            var w, q = e(x),
                    k = this._getInst(q[0]);
            A = null != A ? A : this._formatDate(k), k.input && k.input.val(A), this._updateAlternate(k), w = this._get(k, "onSelect"), w ? w.apply(k.input ? k.input[0] : null, [A, k]) : k.input && k.input.trigger("change"), k.inline ? this._updateDatepicker(k) : (this._hideDatepicker(), this._lastInput = k.input[0], "object" != typeof k.input[0] && k.input.focus(), this._lastInput = null)
        },
        _updateAlternate: function (x) {
            var A, w, q, k = this._get(x, "altField");
            k && (A = this._get(x, "altFormat") || this._get(x, "dateFormat"), w = this._getDate(x), q = this.formatDate(A, w, this._getFormatConfig(x)), e(k).each(function () {
                e(this).val(q)
            }))
        },
        noWeekends: function (k) {
            var q = k.getDay();
            return [q > 0 && 6 > q, ""]
        },
        iso8601Week: function (w) {
            var k, q = new Date(w.getTime());
            return q.setDate(q.getDate() + 4 - (q.getDay() || 7)), k = q.getTime(), q.setMonth(0), q.setDate(1), Math.floor(Math.round((k - q) / 86400000) / 7) + 1
        },
        parseDate: function (B, P, A) {
            if (null == B || null == P) {
                throw "Invalid arguments"
            }
            if (P = "object" == typeof P ? "" + P : P + "", "" === P) {
                return null
            }
            var k, H, q, x, O = 0,
                    ae = (A ? A.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    C = "string" != typeof ae ? ae : (new Date).getFullYear() % 100 + parseInt(ae, 10),
                    K = (A ? A.dayNamesShort : null) || this._defaults.dayNamesShort,
                    J = (A ? A.dayNames : null) || this._defaults.dayNames,
                    w = (A ? A.monthNamesShort : null) || this._defaults.monthNamesShort,
                    L = (A ? A.monthNames : null) || this._defaults.monthNames,
                    af = -1,
                    N = -1,
                    D = -1,
                    M = -1,
                    I = !1,
                    G = function (S) {
                        var T = B.length > k + 1 && B.charAt(k + 1) === S;
                        return T && k++, T
                    },
                    F = function (V) {
                        var X = G(V),
                                W = "@" === V ? 14 : "!" === V ? 20 : "y" === V && X ? 4 : "o" === V ? 3 : 2,
                                T = "y" === V ? W : 1,
                                S = RegExp("^\\d{" + T + "," + W + "}"),
                                U = P.substring(O).match(S);
                        if (!U) {
                            throw "Missing number at position " + O
                        }
                        return O += U[0].length, parseInt(U[0], 10)
                    },
                    E = function (W, V, T) {
                        var S = -1,
                                U = e.map(G(W) ? T : V, function (Y, X) {
                                    return [
                                        [X, Y]
                                    ]
                                }).sort(function (Y, X) {
                            return -(Y[1].length - X[1].length)
                        });
                        if (e.each(U, function (Y, X) {
                            var Z = X[1];
                            return P.substr(O, Z.length).toLowerCase() === Z.toLowerCase() ? (S = X[0], O += Z.length, !1) : void 0
                        }), -1 !== S) {
                            return S + 1
                        }
                        throw "Unknown name at position " + O
                    },
                    ad = function () {
                        if (P.charAt(O) !== B.charAt(k)) {
                            throw "Unexpected literal at position " + O
                        }
                        O++
                    };
            for (k = 0; B.length > k; k++) {
                if (I) {
                    "'" !== B.charAt(k) || G("'") ? ad() : I = !1
                } else {
                    switch (B.charAt(k)) {
                        case "d":
                            D = F("d");
                            break;
                        case "D":
                            E("D", K, J);
                            break;
                        case "o":
                            M = F("o");
                            break;
                        case "m":
                            N = F("m");
                            break;
                        case "M":
                            N = E("M", w, L);
                            break;
                        case "y":
                            af = F("y");
                            break;
                        case "@":
                            x = new Date(F("@")), af = x.getFullYear(), N = x.getMonth() + 1, D = x.getDate();
                            break;
                        case "!":
                            x = new Date((F("!") - this._ticksTo1970) / 10000), af = x.getFullYear(), N = x.getMonth() + 1, D = x.getDate();
                            break;
                        case "'":
                            G("'") ? ad() : I = !0;
                            break;
                        default:
                            ad()
                    }
                }
            }
            if (P.length > O && (q = P.substr(O), !/^\s+/.test(q))) {
                throw "Extra/unparsed characters found in date: " + q
            }
            if (-1 === af ? af = (new Date).getFullYear() : 100 > af && (af += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (C >= af ? 0 : -100)), M > -1) {
                for (N = 1, D = M; ; ) {
                    if (H = this._getDaysInMonth(af, N - 1), H >= D) {
                        break
                    }
                    N++, D -= H
                }
            }
            if (x = this._daylightSavingAdjust(new Date(af, N - 1, D)), x.getFullYear() !== af || x.getMonth() + 1 !== N || x.getDate() !== D) {
                throw "Invalid date"
            }
            return x
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 10000000 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (G, x, k) {
            if (!x) {
                return ""
            }
            var w, E = (k ? k.dayNamesShort : null) || this._defaults.dayNamesShort,
                    B = (k ? k.dayNames : null) || this._defaults.dayNames,
                    F = (k ? k.monthNamesShort : null) || this._defaults.monthNamesShort,
                    H = (k ? k.monthNames : null) || this._defaults.monthNames,
                    I = function (K) {
                        var J = G.length > w + 1 && G.charAt(w + 1) === K;
                        return J && w++, J
                    },
                    q = function (K, M, J) {
                        var L = "" + M;
                        if (I(K)) {
                            for (; J > L.length; ) {
                                L = "0" + L
                            }
                        }
                        return L
                    },
                    A = function (K, M, J, L) {
                        return I(K) ? L[M] : J[M]
                    },
                    D = "",
                    C = !1;
            if (x) {
                for (w = 0; G.length > w; w++) {
                    if (C) {
                        "'" !== G.charAt(w) || I("'") ? D += G.charAt(w) : C = !1
                    } else {
                        switch (G.charAt(w)) {
                            case "d":
                                D += q("d", x.getDate(), 2);
                                break;
                            case "D":
                                D += A("D", x.getDay(), E, B);
                                break;
                            case "o":
                                D += q("o", Math.round((new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime() - new Date(x.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                D += q("m", x.getMonth() + 1, 2);
                                break;
                            case "M":
                                D += A("M", x.getMonth(), F, H);
                                break;
                            case "y":
                                D += I("y") ? x.getFullYear() : (10 > x.getYear() % 100 ? "0" : "") + x.getYear() % 100;
                                break;
                            case "@":
                                D += x.getTime();
                                break;
                            case "!":
                                D += 10000 * x.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                I("'") ? D += "'" : C = !0;
                                break;
                            default:
                                D += G.charAt(w)
                        }
                    }
                }
            }
            return D
        },
        _possibleChars: function (x) {
            var k, q = "",
                    A = !1,
                    w = function (C) {
                        var B = x.length > k + 1 && x.charAt(k + 1) === C;
                        return B && k++, B
                    };
            for (k = 0; x.length > k; k++) {
                if (A) {
                    "'" !== x.charAt(k) || w("'") ? q += x.charAt(k) : A = !1
                } else {
                    switch (x.charAt(k)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            q += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            w("'") ? q += "'" : A = !0;
                            break;
                        default:
                            q += x.charAt(k)
                    }
                }
            }
            return q
        },
        _get: function (k, q) {
            return void 0 !== k.settings[q] ? k.settings[q] : this._defaults[q]
        },
        _setDateFromField: function (x, C) {
            if (x.input.val() !== x.lastVal) {
                var D = this._get(x, "dateFormat"),
                        B = x.lastVal = x.input ? x.input.val() : null,
                        q = this._getDefaultDate(x),
                        k = q,
                        w = this._getFormatConfig(x);
                try {
                    k = this.parseDate(D, B, w) || q
                } catch (A) {
                    B = C ? "" : B
                }
                x.selectedDay = k.getDate(), x.drawMonth = x.selectedMonth = k.getMonth(), x.drawYear = x.selectedYear = k.getFullYear(), x.currentDay = B ? k.getDate() : 0, x.currentMonth = B ? k.getMonth() : 0, x.currentYear = B ? k.getFullYear() : 0, this._adjustInstDate(x)
            }
        },
        _getDefaultDate: function (k) {
            return this._restrictMinMax(k, this._determineDate(k, this._get(k, "defaultDate"), new Date))
        },
        _determineDate: function (A, B, x) {
            var q = function (D) {
                var C = new Date;
                return C.setDate(C.getDate() + D), C
            },
                    k = function (E) {
                        try {
                            return e.datepicker.parseDate(e.datepicker._get(A, "dateFormat"), E, e.datepicker._getFormatConfig(A))
                        } catch (J) {
                        }
                        for (var F = (E.toLowerCase().match(/^c/) ? e.datepicker._getDate(A) : null) || new Date, I = F.getFullYear(), G = F.getMonth(), H = F.getDate(), D = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, C = D.exec(E); C; ) {
                            switch (C[2] || "d") {
                                case "d":
                                case "D":
                                    H += parseInt(C[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    H += 7 * parseInt(C[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    G += parseInt(C[1], 10), H = Math.min(H, e.datepicker._getDaysInMonth(I, G));
                                    break;
                                case "y":
                                case "Y":
                                    I += parseInt(C[1], 10), H = Math.min(H, e.datepicker._getDaysInMonth(I, G))
                            }
                            C = D.exec(E)
                        }
                        return new Date(I, G, H)
                    },
                    w = null == B || "" === B ? x : "string" == typeof B ? k(B) : "number" == typeof B ? isNaN(B) ? x : q(B) : new Date(B.getTime());
            return w = w && "Invalid Date" == "" + w ? x : w, w && (w.setHours(0), w.setMinutes(0), w.setSeconds(0), w.setMilliseconds(0)), this._daylightSavingAdjust(w)
        },
        _daylightSavingAdjust: function (k) {
            return k ? (k.setHours(k.getHours() > 12 ? k.getHours() + 2 : 0), k) : null
        },
        _setDate: function (x, B, C) {
            var A = !B,
                    q = x.selectedMonth,
                    k = x.selectedYear,
                    w = this._restrictMinMax(x, this._determineDate(x, B, new Date));
            x.selectedDay = x.currentDay = w.getDate(), x.drawMonth = x.selectedMonth = x.currentMonth = w.getMonth(), x.drawYear = x.selectedYear = x.currentYear = w.getFullYear(), q === x.selectedMonth && k === x.selectedYear || C || this._notifyChange(x), this._adjustInstDate(x), x.input && x.input.val(A ? "" : this._formatDate(x))
        },
        _getDate: function (k) {
            var q = !k.currentYear || k.input && "" === k.input.val() ? null : this._daylightSavingAdjust(new Date(k.currentYear, k.currentMonth, k.currentDay));
            return q
        },
        _attachHandlers: function (k) {
            var q = this._get(k, "stepMonths"),
                    w = "#" + k.id.replace(/\\\\/g, "\\");
            k.dpDiv.find("[data-handler]").map(function () {
                var x = {
                    prev: function () {
                        e.datepicker._adjustDate(w, -q, "M")
                    },
                    next: function () {
                        e.datepicker._adjustDate(w, +q, "M")
                    },
                    hide: function () {
                        e.datepicker._hideDatepicker()
                    },
                    today: function () {
                        e.datepicker._gotoToday(w)
                    },
                    selectDay: function () {
                        return e.datepicker._selectDay(w, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    },
                    selectMonth: function () {
                        return e.datepicker._selectMonthYear(w, this, "M"), !1
                    },
                    selectYear: function () {
                        return e.datepicker._selectMonthYear(w, this, "Y"), !1
                    }
                };
                e(this).bind(this.getAttribute("data-event"), x[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (Y) {
            var ao, ac, an, ah, az, ai, am, ab, af, ap, X, aY, aj, Z, ag, aa, aq, au, aX, ay, at, ar, ae, O, w, N, H, q, I, ax, K, D, C, av, A, x, J, ad, T, G = new Date,
                    M = this._daylightSavingAdjust(new Date(G.getFullYear(), G.getMonth(), G.getDate())),
                    V = this._get(Y, "isRTL"),
                    k = this._get(Y, "showButtonPanel"),
                    E = this._get(Y, "hideIfNoPrevNext"),
                    al = this._get(Y, "navigationAsDateFormat"),
                    F = this._getNumberOfMonths(Y),
                    S = this._get(Y, "showCurrentAtPos"),
                    P = this._get(Y, "stepMonths"),
                    L = 1 !== F[0] || 1 !== F[1],
                    B = this._daylightSavingAdjust(Y.currentDay ? new Date(Y.currentYear, Y.currentMonth, Y.currentDay) : new Date(9999, 9, 9)),
                    U = this._getMinMaxDate(Y, "min"),
                    aw = this._getMinMaxDate(Y, "max"),
                    W = Y.drawMonth - S,
                    ak = Y.drawYear;
            if (0 > W && (W += 12, ak--), aw) {
                for (ao = this._daylightSavingAdjust(new Date(aw.getFullYear(), aw.getMonth() - F[0] * F[1] + 1, aw.getDate())), ao = U && U > ao ? U : ao; this._daylightSavingAdjust(new Date(ak, W, 1)) > ao; ) {
                    W--, 0 > W && (W = 11, ak--)
                }
            }
            for (Y.drawMonth = W, Y.drawYear = ak, ac = this._get(Y, "prevText"), ac = al ? this.formatDate(ac, this._daylightSavingAdjust(new Date(ak, W - P, 1)), this._getFormatConfig(Y)) : ac, an = this._canAdjustMonth(Y, -1, ak, W) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + ac + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "e" : "w") + "'>" + ac + "</span></a>" : E ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + ac + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "e" : "w") + "'>" + ac + "</span></a>", ah = this._get(Y, "nextText"), ah = al ? this.formatDate(ah, this._daylightSavingAdjust(new Date(ak, W + P, 1)), this._getFormatConfig(Y)) : ah, az = this._canAdjustMonth(Y, 1, ak, W) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + ah + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "w" : "e") + "'>" + ah + "</span></a>" : E ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + ah + "'><span class='ui-icon ui-icon-circle-triangle-" + (V ? "w" : "e") + "'>" + ah + "</span></a>", ai = this._get(Y, "currentText"), am = this._get(Y, "gotoCurrent") && Y.currentDay ? B : M, ai = al ? this.formatDate(ai, am, this._getFormatConfig(Y)) : ai, ab = Y.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(Y, "closeText") + "</button>", af = k ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (V ? ab : "") + (this._isInRange(Y, am) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + ai + "</button>" : "") + (V ? "" : ab) + "</div>" : "", ap = parseInt(this._get(Y, "firstDay"), 10), ap = isNaN(ap) ? 0 : ap, X = this._get(Y, "showWeek"), aY = this._get(Y, "dayNames"), aj = this._get(Y, "dayNamesMin"), Z = this._get(Y, "monthNames"), ag = this._get(Y, "monthNamesShort"), aa = this._get(Y, "beforeShowDay"), aq = this._get(Y, "showOtherMonths"), au = this._get(Y, "selectOtherMonths"), aX = this._getDefaultDate(Y), ay = "", ar = 0; F[0] > ar; ar++) {
                for (ae = "", this.maxRows = 4, O = 0; F[1] > O; O++) {
                    if (w = this._daylightSavingAdjust(new Date(ak, W, Y.selectedDay)), N = " ui-corner-all", H = "", L) {
                        if (H += "<div class='ui-datepicker-group", F[1] > 1) {
                            switch (O) {
                                case 0:
                                    H += " ui-datepicker-group-first", N = " ui-corner-" + (V ? "right" : "left");
                                    break;
                                case F[1] - 1:
                                    H += " ui-datepicker-group-last", N = " ui-corner-" + (V ? "left" : "right");
                                    break;
                                default:
                                    H += " ui-datepicker-group-middle", N = ""
                            }
                        }
                        H += "'>"
                    }
                    for (H += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + N + "'>" + (/all|left/.test(N) && 0 === ar ? V ? az : an : "") + (/all|right/.test(N) && 0 === ar ? V ? an : az : "") + this._generateMonthYearHeader(Y, W, ak, U, aw, ar > 0 || O > 0, Z, ag) + "</div><table class='ui-datepicker-calendar'><thead><tr>", q = X ? "<th class='ui-datepicker-week-col'>" + this._get(Y, "weekHeader") + "</th>" : "", at = 0; 7 > at; at++) {
                        I = (at + ap) % 7, q += "<th scope='col'" + ((at + ap + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + aY[I] + "'>" + aj[I] + "</span></th>"
                    }
                    for (H += q + "</tr></thead><tbody>", ax = this._getDaysInMonth(ak, W), ak === Y.selectedYear && W === Y.selectedMonth && (Y.selectedDay = Math.min(Y.selectedDay, ax)), K = (this._getFirstDayOfMonth(ak, W) - ap + 7) % 7, D = Math.ceil((K + ax) / 7), C = L ? this.maxRows > D ? this.maxRows : D : D, this.maxRows = C, av = this._daylightSavingAdjust(new Date(ak, W, 1 - K)), A = 0; C > A; A++) {
                        for (H += "<tr>", x = X ? "<td class='ui-datepicker-week-col'>" + this._get(Y, "calculateWeek")(av) + "</td>" : "", at = 0; 7 > at; at++) {
                            J = aa ? aa.apply(Y.input ? Y.input[0] : null, [av]) : [!0, ""], ad = av.getMonth() !== W, T = ad && !au || !J[0] || U && U > av || aw && av > aw, x += "<td class='" + ((at + ap + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (ad ? " ui-datepicker-other-month" : "") + (av.getTime() === w.getTime() && W === Y.selectedMonth && Y._keyEvent || aX.getTime() === av.getTime() && aX.getTime() === w.getTime() ? " " + this._dayOverClass : "") + (T ? " " + this._unselectableClass + " ui-state-disabled" : "") + (ad && !aq ? "" : " " + J[1] + (av.getTime() === B.getTime() ? " " + this._currentClass : "") + (av.getTime() === M.getTime() ? " ui-datepicker-today" : "")) + "'" + (ad && !aq || !J[2] ? "" : " title='" + J[2].replace(/'/g, "&#39;") + "'") + (T ? "" : " data-handler='selectDay' data-event='click' data-month='" + av.getMonth() + "' data-year='" + av.getFullYear() + "'") + ">" + (ad && !aq ? "&#xa0;" : T ? "<span class='ui-state-default'>" + av.getDate() + "</span>" : "<a class='ui-state-default" + (av.getTime() === M.getTime() ? " ui-state-highlight" : "") + (av.getTime() === B.getTime() ? " ui-state-active" : "") + (ad ? " ui-priority-secondary" : "") + "' href='#'>" + av.getDate() + "</a>") + "</td>", av.setDate(av.getDate() + 1), av = this._daylightSavingAdjust(av)
                        }
                        H += x + "</tr>"
                    }
                    W++, W > 11 && (W = 0, ak++), H += "</tbody></table>" + (L ? "</div>" + (F[0] > 0 && O === F[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), ae += H
                }
                ay += ae
            }
            return ay += af, Y._keyEvent = !1, ay
        },
        _generateMonthYearHeader: function (L, C, P, B, q, H, w, A) {
            var O, ab, D, K, J, x, M, k, N = this._get(L, "changeMonth"),
                    E = this._get(L, "changeYear"),
                    F = this._get(L, "showMonthAfterYear"),
                    I = "<div class='ui-datepicker-title'>",
                    G = "";
            if (H || !N) {
                G += "<span class='ui-datepicker-month'>" + w[C] + "</span>"
            } else {
                for (O = B && B.getFullYear() === P, ab = q && q.getFullYear() === P, G += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", D = 0; 12 > D; D++) {
                    (!O || D >= B.getMonth()) && (!ab || q.getMonth() >= D) && (G += "<option value='" + D + "'" + (D === C ? " selected='selected'" : "") + ">" + A[D] + "</option>")
                }
                G += "</select>"
            }
            if (F || (I += G + (!H && N && E ? "" : "&#xa0;")), !L.yearshtml) {
                if (L.yearshtml = "", H || !E) {
                    I += "<span class='ui-datepicker-year'>" + P + "</span>"
                } else {
                    for (K = this._get(L, "yearRange").split(":"), J = (new Date).getFullYear(), x = function (S) {
                        var T = S.match(/c[+\-].*/) ? P + parseInt(S.substring(1), 10) : S.match(/[+\-].*/) ? J + parseInt(S, 10) : parseInt(S, 10);
                        return isNaN(T) ? J : T
                    }, M = x(K[0]), k = Math.max(M, x(K[1] || "")), M = B ? Math.max(M, B.getFullYear()) : M, k = q ? Math.min(k, q.getFullYear()) : k, L.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; k >= M; M++) {
                        L.yearshtml += "<option value='" + M + "'" + (M === P ? " selected='selected'" : "") + ">" + M + "</option>"
                    }
                    L.yearshtml += "</select>", I += L.yearshtml, L.yearshtml = null
                }
            }
            return I += this._get(L, "yearSuffix"), F && (I += (!H && N && E ? "" : "&#xa0;") + G), I += "</div>"
        },
        _adjustInstDate: function (x, B, C) {
            var A = x.drawYear + ("Y" === C ? B : 0),
                    q = x.drawMonth + ("M" === C ? B : 0),
                    k = Math.min(x.selectedDay, this._getDaysInMonth(A, q)) + ("D" === C ? B : 0),
                    w = this._restrictMinMax(x, this._daylightSavingAdjust(new Date(A, q, k)));
            x.selectedDay = w.getDate(), x.drawMonth = x.selectedMonth = w.getMonth(), x.drawYear = x.selectedYear = w.getFullYear(), ("M" === C || "Y" === C) && this._notifyChange(x)
        },
        _restrictMinMax: function (x, k) {
            var q = this._getMinMaxDate(x, "min"),
                    A = this._getMinMaxDate(x, "max"),
                    w = q && q > k ? q : k;
            return A && w > A ? A : w
        },
        _notifyChange: function (k) {
            var q = this._get(k, "onChangeMonthYear");
            q && q.apply(k.input ? k.input[0] : null, [k.selectedYear, k.selectedMonth + 1, k])
        },
        _getNumberOfMonths: function (k) {
            var q = this._get(k, "numberOfMonths");
            return null == q ? [1, 1] : "number" == typeof q ? [1, q] : q
        },
        _getMinMaxDate: function (k, q) {
            return this._determineDate(k, this._get(k, q + "Date"), null)
        },
        _getDaysInMonth: function (k, q) {
            return 32 - this._daylightSavingAdjust(new Date(k, q, 32)).getDate()
        },
        _getFirstDayOfMonth: function (k, q) {
            return new Date(k, q, 1).getDay()
        },
        _canAdjustMonth: function (w, A, B, x) {
            var q = this._getNumberOfMonths(w),
                    k = this._daylightSavingAdjust(new Date(B, x + (0 > A ? A : q[0] * q[1]), 1));
            return 0 > A && k.setDate(this._getDaysInMonth(k.getFullYear(), k.getMonth())), this._isInRange(w, k)
        },
        _isInRange: function (w, k) {
            var A, E, B = this._getMinMaxDate(w, "min"),
                    q = this._getMinMaxDate(w, "max"),
                    C = null,
                    D = null,
                    x = this._get(w, "yearRange");
            return x && (A = x.split(":"), E = (new Date).getFullYear(), C = parseInt(A[0], 10), D = parseInt(A[1], 10), A[0].match(/[+\-].*/) && (C += E), A[1].match(/[+\-].*/) && (D += E)), (!B || k.getTime() >= B.getTime()) && (!q || k.getTime() <= q.getTime()) && (!C || k.getFullYear() >= C) && (!D || D >= k.getFullYear())
        },
        _getFormatConfig: function (k) {
            var q = this._get(k, "shortYearCutoff");
            return q = "string" != typeof q ? q : (new Date).getFullYear() % 100 + parseInt(q, 10), {
                shortYearCutoff: q,
                dayNamesShort: this._get(k, "dayNamesShort"),
                dayNames: this._get(k, "dayNames"),
                monthNamesShort: this._get(k, "monthNamesShort"),
                monthNames: this._get(k, "monthNames")
            }
        },
        _formatDate: function (x, k, q, A) {
            k || (x.currentDay = x.selectedDay, x.currentMonth = x.selectedMonth, x.currentYear = x.selectedYear);
            var w = k ? "object" == typeof k ? k : this._daylightSavingAdjust(new Date(A, q, k)) : this._daylightSavingAdjust(new Date(x.currentYear, x.currentMonth, x.currentDay));
            return this.formatDate(this._get(x, "dateFormat"), w, this._getFormatConfig(x))
        }
    }), e.fn.datepicker = function (k) {
        if (!this.length) {
            return this
        }
        e.datepicker.initialized || (e(document).mousedown(e.datepicker._checkExternalClick), e.datepicker.initialized = !0), 0 === e("#" + e.datepicker._mainDivId).length && e("body").append(e.datepicker.dpDiv);
        var q = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof k || "isDisabled" !== k && "getDate" !== k && "widget" !== k ? "option" === k && 2 === arguments.length && "string" == typeof arguments[1] ? e.datepicker["_" + k + "Datepicker"].apply(e.datepicker, [this[0]].concat(q)) : this.each(function () {
            "string" == typeof k ? e.datepicker["_" + k + "Datepicker"].apply(e.datepicker, [this].concat(q)) : e.datepicker._attachDatepicker(this, k)
        }) : e.datepicker["_" + k + "Datepicker"].apply(e.datepicker, [this[0]].concat(q))
    }, e.datepicker = new r, e.datepicker.initialized = !1, e.datepicker.uuid = (new Date).getTime(), e.datepicker.version = "1.11.4", e.datepicker, e.widget("ui.draggable", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
        },
        _setOption: function (k, q) {
            this._super(k, q), "handle" === k && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function () {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0)
        },
        _mouseCapture: function (k) {
            var q = this.options;
            return this._blurActiveElement(k), this.helper || q.disabled || e(k.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(k), this.handle ? (this._blockFrames(q.iframeFix === !0 ? "iframe" : q.iframeFix), !0) : !1)
        },
        _blockFrames: function (k) {
            this.iframeBlocks = this.document.find(k).map(function () {
                var q = e(this);
                return e("<div>").css("position", "absolute").appendTo(q.parent()).outerWidth(q.outerWidth()).outerHeight(q.outerHeight()).offset(q.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function (k) {
            var q = this.document[0];
            if (this.handleElement.is(k.target)) {
                try {
                    q.activeElement && "body" !== q.activeElement.nodeName.toLowerCase() && e(q.activeElement).blur()
                } catch (w) {
                }
            }
        },
        _mouseStart: function (k) {
            var q = this.options;
            return this.helper = this._createHelper(k), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
                return "fixed" === e(this).css("position")
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(k), this.originalPosition = this.position = this._generatePosition(k, !1), this.originalPageX = k.pageX, this.originalPageY = k.pageY, q.cursorAt && this._adjustOffsetFromHelper(q.cursorAt), this._setContainment(), this._trigger("start", k) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !q.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, k), this._normalizeRightBottom(), this._mouseDrag(k, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, k), !0)
        },
        _refreshOffsets: function (k) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {
                left: k.pageX - this.offset.left,
                top: k.pageY - this.offset.top
            }
        },
        _mouseDrag: function (k, q) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(k, !0), this.positionAbs = this._convertPositionTo("absolute"), !q) {
                var w = this._uiHash();
                if (this._trigger("drag", k, w) === !1) {
                    return this._mouseUp({}), !1
                }
                this.position = w.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", e.ui.ddmanager && e.ui.ddmanager.drag(this, k), !1
        },
        _mouseStop: function (k) {
            var q = this,
                    w = !1;
            return e.ui.ddmanager && !this.options.dropBehaviour && (w = e.ui.ddmanager.drop(this, k)), this.dropped && (w = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !w || "valid" === this.options.revert && w || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, w) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                q._trigger("stop", k) !== !1 && q._clear()
            }) : this._trigger("stop", k) !== !1 && this._clear(), !1
        },
        _mouseUp: function (k) {
            return this._unblockFrames(), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, k), this.handleElement.is(k.target) && this.element.focus(), e.ui.mouse.prototype._mouseUp.call(this, k)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function (k) {
            return this.options.handle ? !!e(k.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function () {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function () {
            this.handleElement.removeClass("ui-draggable-handle")
        },
        _createHelper: function (k) {
            var q = this.options,
                    x = e.isFunction(q.helper),
                    w = x ? e(q.helper.apply(this.element[0], [k])) : "clone" === q.helper ? this.element.clone().removeAttr("id") : this.element;
            return w.parents("body").length || w.appendTo("parent" === q.appendTo ? this.element[0].parentNode : q.appendTo), x && w[0] === this.element[0] && this._setPositionRelative(), w[0] === this.element[0] || /(fixed|absolute)/.test(w.css("position")) || w.css("position", "absolute"), w
        },
        _setPositionRelative: function () {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function (k) {
            "string" == typeof k && (k = k.split(" ")), e.isArray(k) && (k = {
                left: +k[0],
                top: +k[1] || 0
            }), "left" in k && (this.offset.click.left = k.left + this.margins.left), "right" in k && (this.offset.click.left = this.helperProportions.width - k.right + this.margins.left), "top" in k && (this.offset.click.top = k.top + this.margins.top), "bottom" in k && (this.offset.click.top = this.helperProportions.height - k.bottom + this.margins.top)
        },
        _isRootNode: function (k) {
            return /(html|body)/i.test(k.tagName) || k === this.document[0]
        },
        _getParentOffset: function () {
            var k = this.offsetParent.offset(),
                    q = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== q && e.contains(this.scrollParent[0], this.offsetParent[0]) && (k.left += this.scrollParent.scrollLeft(), k.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (k = {
                top: 0,
                left: 0
            }), {
                top: k.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: k.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" !== this.cssPosition) {
                return {
                    top: 0,
                    left: 0
                }
            }
            var k = this.element.position(),
                    q = this._isRootNode(this.scrollParent[0]);
            return {
                top: k.top - (parseInt(this.helper.css("top"), 10) || 0) + (q ? 0 : this.scrollParent.scrollTop()),
                left: k.left - (parseInt(this.helper.css("left"), 10) || 0) + (q ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var x, A, w, q = this.options,
                    k = this.document[0];
            return this.relativeContainer = null, q.containment ? "window" === q.containment ? (this.containment = [e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, e(window).scrollLeft() + e(window).width() - this.helperProportions.width - this.margins.left, e(window).scrollTop() + (e(window).height() || k.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === q.containment ? (this.containment = [0, 0, e(k).width() - this.helperProportions.width - this.margins.left, (e(k).height() || k.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : q.containment.constructor === Array ? (this.containment = q.containment, void 0) : ("parent" === q.containment && (q.containment = this.helper[0].parentNode), A = e(q.containment), w = A[0], w && (x = /(scroll|auto)/.test(A.css("overflow")), this.containment = [(parseInt(A.css("borderLeftWidth"), 10) || 0) + (parseInt(A.css("paddingLeft"), 10) || 0), (parseInt(A.css("borderTopWidth"), 10) || 0) + (parseInt(A.css("paddingTop"), 10) || 0), (x ? Math.max(w.scrollWidth, w.offsetWidth) : w.offsetWidth) - (parseInt(A.css("borderRightWidth"), 10) || 0) - (parseInt(A.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (x ? Math.max(w.scrollHeight, w.offsetHeight) : w.offsetHeight) - (parseInt(A.css("borderBottomWidth"), 10) || 0) - (parseInt(A.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = A), void 0) : (this.containment = null, void 0)
        },
        _convertPositionTo: function (w, k) {
            k || (k = this.position);
            var q = "absolute" === w ? 1 : -1,
                    x = this._isRootNode(this.scrollParent[0]);
            return {
                top: k.top + this.offset.relative.top * q + this.offset.parent.top * q - ("fixed" === this.cssPosition ? -this.offset.scroll.top : x ? 0 : this.offset.scroll.top) * q,
                left: k.left + this.offset.relative.left * q + this.offset.parent.left * q - ("fixed" === this.cssPosition ? -this.offset.scroll.left : x ? 0 : this.offset.scroll.left) * q
            }
        },
        _generatePosition: function (k, E) {
            var w, C, A, F, B = this.options,
                    D = this._isRootNode(this.scrollParent[0]),
                    q = k.pageX,
                    x = k.pageY;
            return D && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), E && (this.containment && (this.relativeContainer ? (C = this.relativeContainer.offset(), w = [this.containment[0] + C.left, this.containment[1] + C.top, this.containment[2] + C.left, this.containment[3] + C.top]) : w = this.containment, k.pageX - this.offset.click.left < w[0] && (q = w[0] + this.offset.click.left), k.pageY - this.offset.click.top < w[1] && (x = w[1] + this.offset.click.top), k.pageX - this.offset.click.left > w[2] && (q = w[2] + this.offset.click.left), k.pageY - this.offset.click.top > w[3] && (x = w[3] + this.offset.click.top)), B.grid && (A = B.grid[1] ? this.originalPageY + Math.round((x - this.originalPageY) / B.grid[1]) * B.grid[1] : this.originalPageY, x = w ? A - this.offset.click.top >= w[1] || A - this.offset.click.top > w[3] ? A : A - this.offset.click.top >= w[1] ? A - B.grid[1] : A + B.grid[1] : A, F = B.grid[0] ? this.originalPageX + Math.round((q - this.originalPageX) / B.grid[0]) * B.grid[0] : this.originalPageX, q = w ? F - this.offset.click.left >= w[0] || F - this.offset.click.left > w[2] ? F : F - this.offset.click.left >= w[0] ? F - B.grid[0] : F + B.grid[0] : F), "y" === B.axis && (q = this.originalPageX), "x" === B.axis && (x = this.originalPageY)), {
                top: x - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : D ? 0 : this.offset.scroll.top),
                left: q - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : D ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
        },
        _normalizeRightBottom: function () {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
        },
        _trigger: function (k, q, w) {
            return w = w || this._uiHash(), e.ui.plugin.call(this, k, [q, w, this], !0), /^(drag|start|stop)/.test(k) && (this.positionAbs = this._convertPositionTo("absolute"), w.offset = this.positionAbs), e.Widget.prototype._trigger.call(this, k, q, w)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), e.ui.plugin.add("draggable", "connectToSortable", {
        start: function (k, q, x) {
            var w = e.extend({}, q, {
                item: x.element
            });
            x.sortables = [], e(x.options.connectToSortable).each(function () {
                var A = e(this).sortable("instance");
                A && !A.options.disabled && (x.sortables.push(A), A.refreshPositions(), A._trigger("activate", k, w))
            })
        },
        stop: function (k, q, x) {
            var w = e.extend({}, q, {
                item: x.element
            });
            x.cancelHelperRemoval = !1, e.each(x.sortables, function () {
                var A = this;
                A.isOver ? (A.isOver = 0, x.cancelHelperRemoval = !0, A.cancelHelperRemoval = !1, A._storedCSS = {
                    position: A.placeholder.css("position"),
                    top: A.placeholder.css("top"),
                    left: A.placeholder.css("left")
                }, A._mouseStop(k), A.options.helper = A.options._helper) : (A.cancelHelperRemoval = !0, A._trigger("deactivate", k, w))
            })
        },
        drag: function (k, q, w) {
            e.each(w.sortables, function () {
                var x = !1,
                        A = this;
                A.positionAbs = w.positionAbs, A.helperProportions = w.helperProportions, A.offset.click = w.offset.click, A._intersectsWith(A.containerCache) && (x = !0, e.each(w.sortables, function () {
                    return this.positionAbs = w.positionAbs, this.helperProportions = w.helperProportions, this.offset.click = w.offset.click, this !== A && this._intersectsWith(this.containerCache) && e.contains(A.element[0], this.element[0]) && (x = !1), x
                })), x ? (A.isOver || (A.isOver = 1, w._parent = q.helper.parent(), A.currentItem = q.helper.appendTo(A.element).data("ui-sortable-item", !0), A.options._helper = A.options.helper, A.options.helper = function () {
                    return q.helper[0]
                }, k.target = A.currentItem[0], A._mouseCapture(k, !0), A._mouseStart(k, !0, !0), A.offset.click.top = w.offset.click.top, A.offset.click.left = w.offset.click.left, A.offset.parent.left -= w.offset.parent.left - A.offset.parent.left, A.offset.parent.top -= w.offset.parent.top - A.offset.parent.top, w._trigger("toSortable", k), w.dropped = A.element, e.each(w.sortables, function () {
                    this.refreshPositions()
                }), w.currentItem = w.element, A.fromOutside = w), A.currentItem && (A._mouseDrag(k), q.position = A.position)) : A.isOver && (A.isOver = 0, A.cancelHelperRemoval = !0, A.options._revert = A.options.revert, A.options.revert = !1, A._trigger("out", k, A._uiHash(A)), A._mouseStop(k, !0), A.options.revert = A.options._revert, A.options.helper = A.options._helper, A.placeholder && A.placeholder.remove(), q.helper.appendTo(w._parent), w._refreshOffsets(k), q.position = w._generatePosition(k, !0), w._trigger("fromSortable", k), w.dropped = !1, e.each(w.sortables, function () {
                    this.refreshPositions()
                }))
            })
        }
    }), e.ui.plugin.add("draggable", "cursor", {
        start: function (x, A, w) {
            var q = e("body"),
                    k = w.options;
            q.css("cursor") && (k._cursor = q.css("cursor")), q.css("cursor", k.cursor)
        },
        stop: function (k, q, x) {
            var w = x.options;
            w._cursor && e("body").css("cursor", w._cursor)
        }
    }), e.ui.plugin.add("draggable", "opacity", {
        start: function (x, A, w) {
            var q = e(A.helper),
                    k = w.options;
            q.css("opacity") && (k._opacity = q.css("opacity")), q.css("opacity", k.opacity)
        },
        stop: function (k, q, x) {
            var w = x.options;
            w._opacity && e(q.helper).css("opacity", w._opacity)
        }
    }), e.ui.plugin.add("draggable", "scroll", {
        start: function (w, k, q) {
            q.scrollParentNotHidden || (q.scrollParentNotHidden = q.helper.scrollParent(!1)), q.scrollParentNotHidden[0] !== q.document[0] && "HTML" !== q.scrollParentNotHidden[0].tagName && (q.overflowOffset = q.scrollParentNotHidden.offset())
        },
        drag: function (B, C, A) {
            var q = A.options,
                    k = !1,
                    w = A.scrollParentNotHidden[0],
                    x = A.document[0];
            w !== x && "HTML" !== w.tagName ? (q.axis && "x" === q.axis || (A.overflowOffset.top + w.offsetHeight - B.pageY < q.scrollSensitivity ? w.scrollTop = k = w.scrollTop + q.scrollSpeed : B.pageY - A.overflowOffset.top < q.scrollSensitivity && (w.scrollTop = k = w.scrollTop - q.scrollSpeed)), q.axis && "y" === q.axis || (A.overflowOffset.left + w.offsetWidth - B.pageX < q.scrollSensitivity ? w.scrollLeft = k = w.scrollLeft + q.scrollSpeed : B.pageX - A.overflowOffset.left < q.scrollSensitivity && (w.scrollLeft = k = w.scrollLeft - q.scrollSpeed))) : (q.axis && "x" === q.axis || (B.pageY - e(x).scrollTop() < q.scrollSensitivity ? k = e(x).scrollTop(e(x).scrollTop() - q.scrollSpeed) : e(window).height() - (B.pageY - e(x).scrollTop()) < q.scrollSensitivity && (k = e(x).scrollTop(e(x).scrollTop() + q.scrollSpeed))), q.axis && "y" === q.axis || (B.pageX - e(x).scrollLeft() < q.scrollSensitivity ? k = e(x).scrollLeft(e(x).scrollLeft() - q.scrollSpeed) : e(window).width() - (B.pageX - e(x).scrollLeft()) < q.scrollSensitivity && (k = e(x).scrollLeft(e(x).scrollLeft() + q.scrollSpeed)))), k !== !1 && e.ui.ddmanager && !q.dropBehaviour && e.ui.ddmanager.prepareOffsets(A, B)
        }
    }), e.ui.plugin.add("draggable", "snap", {
        start: function (k, q, x) {
            var w = x.options;
            x.snapElements = [], e(w.snap.constructor !== String ? w.snap.items || ":data(ui-draggable)" : w.snap).each(function () {
                var A = e(this),
                        B = A.offset();
                this !== x.element[0] && x.snapElements.push({
                    item: this,
                    width: A.outerWidth(),
                    height: A.outerHeight(),
                    top: B.top,
                    left: B.left
                })
            })
        },
        drag: function (D, O, C) {
            var w, G, x, B, N, k, E, K, J, A, L = C.options,
                    q = L.snapTolerance,
                    M = O.offset.left,
                    F = M + C.helperProportions.width,
                    I = O.offset.top,
                    H = I + C.helperProportions.height;
            for (J = C.snapElements.length - 1; J >= 0; J--) {
                N = C.snapElements[J].left - C.margins.left, k = N + C.snapElements[J].width, E = C.snapElements[J].top - C.margins.top, K = E + C.snapElements[J].height, N - q > F || M > k + q || E - q > H || I > K + q || !e.contains(C.snapElements[J].item.ownerDocument, C.snapElements[J].item) ? (C.snapElements[J].snapping && C.options.snap.release && C.options.snap.release.call(C.element, D, e.extend(C._uiHash(), {
                    snapItem: C.snapElements[J].item
                })), C.snapElements[J].snapping = !1) : ("inner" !== L.snapMode && (w = q >= Math.abs(E - H), G = q >= Math.abs(K - I), x = q >= Math.abs(N - F), B = q >= Math.abs(k - M), w && (O.position.top = C._convertPositionTo("relative", {
                    top: E - C.helperProportions.height,
                    left: 0
                }).top), G && (O.position.top = C._convertPositionTo("relative", {
                    top: K,
                    left: 0
                }).top), x && (O.position.left = C._convertPositionTo("relative", {
                    top: 0,
                    left: N - C.helperProportions.width
                }).left), B && (O.position.left = C._convertPositionTo("relative", {
                    top: 0,
                    left: k
                }).left)), A = w || G || x || B, "outer" !== L.snapMode && (w = q >= Math.abs(E - I), G = q >= Math.abs(K - H), x = q >= Math.abs(N - M), B = q >= Math.abs(k - F), w && (O.position.top = C._convertPositionTo("relative", {
                    top: E,
                    left: 0
                }).top), G && (O.position.top = C._convertPositionTo("relative", {
                    top: K - C.helperProportions.height,
                    left: 0
                }).top), x && (O.position.left = C._convertPositionTo("relative", {
                    top: 0,
                    left: N
                }).left), B && (O.position.left = C._convertPositionTo("relative", {
                    top: 0,
                    left: k - C.helperProportions.width
                }).left)), !C.snapElements[J].snapping && (w || G || x || B || A) && C.options.snap.snap && C.options.snap.snap.call(C.element, D, e.extend(C._uiHash(), {
                    snapItem: C.snapElements[J].item
                })), C.snapElements[J].snapping = w || G || x || B || A)
            }
        }
    }), e.ui.plugin.add("draggable", "stack", {
        start: function (A, B, x) {
            var q, k = x.options,
                    w = e.makeArray(e(k.stack)).sort(function (D, C) {
                return (parseInt(e(D).css("zIndex"), 10) || 0) - (parseInt(e(C).css("zIndex"), 10) || 0)
            });
            w.length && (q = parseInt(e(w[0]).css("zIndex"), 10) || 0, e(w).each(function (C) {
                e(this).css("zIndex", q + C)
            }), this.css("zIndex", q + w.length))
        }
    }), e.ui.plugin.add("draggable", "zIndex", {
        start: function (x, A, w) {
            var q = e(A.helper),
                    k = w.options;
            q.css("zIndex") && (k._zIndex = q.css("zIndex")), q.css("zIndex", k.zIndex)
        },
        stop: function (k, q, x) {
            var w = x.options;
            w._zIndex && e(q.helper).css("zIndex", w._zIndex)
        }
    }), e.ui.draggable, e.widget("ui.resizable", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function (k) {
            return parseInt(k, 10) || 0
        },
        _isNumber: function (k) {
            return !isNaN(parseInt(k, 10))
        },
        _hasScroll: function (k, q) {
            if ("hidden" === e(k).css("overflow")) {
                return !1
            }
            var x = q && "left" === q ? "scrollLeft" : "scrollTop",
                    w = !1;
            return k[x] > 0 ? !0 : (k[x] = 1, w = k[x] > 0, k[x] = 0, w)
        },
        _create: function () {
            var B, C, A, q, k, w = this,
                    x = this.options;
            if (this.element.addClass("ui-resizable"), e.extend(this, {
                _aspectRatio: !!x.aspectRatio,
                aspectRatio: x.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: x.helper || x.ghost || x.animate ? x.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = x.handles || (e(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this._handles = e(), this.handles.constructor === String) {
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), B = this.handles.split(","), this.handles = {}, C = 0; B.length > C; C++) {
                    A = e.trim(B[C]), k = "ui-resizable-" + A, q = e("<div class='ui-resizable-handle " + k + "'></div>"), q.css({
                        zIndex: x.zIndex
                    }), "se" === A && q.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[A] = ".ui-resizable-" + A, this.element.append(q)
                }
            }
            this._renderAxis = function (H) {
                var D, G, F, E;
                H = H || this.element;
                for (D in this.handles) {
                    this.handles[D].constructor === String ? this.handles[D] = this.element.children(this.handles[D]).first().show() : (this.handles[D].jquery || this.handles[D].nodeType) && (this.handles[D] = e(this.handles[D]), this._on(this.handles[D], {
                        mousedown: w._mouseDown
                    })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (G = e(this.handles[D], this.element), E = /sw|ne|nw|se|n|s/.test(D) ? G.outerHeight() : G.outerWidth(), F = ["padding", /ne|nw|n/.test(D) ? "Top" : /se|sw|s/.test(D) ? "Bottom" : /^e$/.test(D) ? "Right" : "Left"].join(""), H.css(F, E), this._proportionallyResize()), this._handles = this._handles.add(this.handles[D])
                }
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function () {
                w.resizing || (this.className && (q = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), w.axis = q && q[1] ? q[1] : "se")
            }), x.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
                x.disabled || (e(this).removeClass("ui-resizable-autohide"), w._handles.show())
            }).mouseleave(function () {
                x.disabled || w.resizing || (e(this).addClass("ui-resizable-autohide"), w._handles.hide())
            })), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var k, q = function (w) {
                e(w).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (q(this.element), k = this.element, this.originalElement.css({
                position: k.css("position"),
                width: k.outerWidth(),
                height: k.outerHeight(),
                top: k.css("top"),
                left: k.css("left")
            }).insertAfter(k), k.remove()), this.originalElement.css("resize", this.originalResizeStyle), q(this.originalElement), this
        },
        _mouseCapture: function (k) {
            var q, x, w = !1;
            for (q in this.handles) {
                x = e(this.handles[q])[0], (x === k.target || e.contains(x, k.target)) && (w = !0)
            }
            return !this.options.disabled && w
        },
        _mouseStart: function (A) {
            var B, x, q, k = this.options,
                    w = this.element;
            return this.resizing = !0, this._renderProxy(), B = this._num(this.helper.css("left")), x = this._num(this.helper.css("top")), k.containment && (B += e(k.containment).scrollLeft() || 0, x += e(k.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: B,
                top: x
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: w.width(),
                height: w.height()
            }, this.originalSize = this._helper ? {
                width: w.outerWidth(),
                height: w.outerHeight()
            } : {
                width: w.width(),
                height: w.height()
            }, this.sizeDiff = {
                width: w.outerWidth() - w.width(),
                height: w.outerHeight() - w.height()
            }, this.originalPosition = {
                left: B,
                top: x
            }, this.originalMousePosition = {
                left: A.pageX,
                top: A.pageY
            }, this.aspectRatio = "number" == typeof k.aspectRatio ? k.aspectRatio : this.originalSize.width / this.originalSize.height || 1, q = e(".ui-resizable-" + this.axis).css("cursor"), e("body").css("cursor", "auto" === q ? this.axis + "-resize" : q), w.addClass("ui-resizable-resizing"), this._propagate("start", A), !0
        },
        _mouseDrag: function (C) {
            var D, A, q = this.originalMousePosition,
                    k = this.axis,
                    w = C.pageX - q.left || 0,
                    x = C.pageY - q.top || 0,
                    B = this._change[k];
            return this._updatePrevProperties(), B ? (D = B.apply(this, [C, w, x]), this._updateVirtualBoundaries(C.shiftKey), (this._aspectRatio || C.shiftKey) && (D = this._updateRatio(D, C)), D = this._respectSize(D, C), this._updateCache(D), this._propagate("resize", C), A = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), e.isEmptyObject(A) || (this._updatePrevProperties(), this._trigger("resize", C, this.ui()), this._applyChanges()), !1) : !1
        },
        _mouseStop: function (F) {
            this.resizing = !1;
            var x, D, B, q, C, E, w, A = this.options,
                    k = this;
            return this._helper && (x = this._proportionallyResizeElements, D = x.length && /textarea/i.test(x[0].nodeName), B = D && this._hasScroll(x[0], "left") ? 0 : k.sizeDiff.height, q = D ? 0 : k.sizeDiff.width, C = {
                width: k.helper.width() - q,
                height: k.helper.height() - B
            }, E = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, w = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, A.animate || this.element.css(e.extend(C, {
                top: w,
                left: E
            })), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !A.animate && this._proportionallyResize()), e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", F), this._helper && this.helper.remove(), !1
        },
        _updatePrevProperties: function () {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function () {
            var k = {};
            return this.position.top !== this.prevPosition.top && (k.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (k.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (k.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (k.height = this.size.height + "px"), this.helper.css(k), k
        },
        _updateVirtualBoundaries: function (x) {
            var B, C, A, q, k, w = this.options;
            k = {
                minWidth: this._isNumber(w.minWidth) ? w.minWidth : 0,
                maxWidth: this._isNumber(w.maxWidth) ? w.maxWidth : 1 / 0,
                minHeight: this._isNumber(w.minHeight) ? w.minHeight : 0,
                maxHeight: this._isNumber(w.maxHeight) ? w.maxHeight : 1 / 0
            }, (this._aspectRatio || x) && (B = k.minHeight * this.aspectRatio, A = k.minWidth / this.aspectRatio, C = k.maxHeight * this.aspectRatio, q = k.maxWidth / this.aspectRatio, B > k.minWidth && (k.minWidth = B), A > k.minHeight && (k.minHeight = A), k.maxWidth > C && (k.maxWidth = C), k.maxHeight > q && (k.maxHeight = q)), this._vBoundaries = k
        },
        _updateCache: function (k) {
            this.offset = this.helper.offset(), this._isNumber(k.left) && (this.position.left = k.left), this._isNumber(k.top) && (this.position.top = k.top), this._isNumber(k.height) && (this.size.height = k.height), this._isNumber(k.width) && (this.size.width = k.width)
        },
        _updateRatio: function (w) {
            var k = this.position,
                    q = this.size,
                    x = this.axis;
            return this._isNumber(w.height) ? w.width = w.height * this.aspectRatio : this._isNumber(w.width) && (w.height = w.width / this.aspectRatio), "sw" === x && (w.left = k.left + (q.width - w.width), w.top = null), "nw" === x && (w.top = k.top + (q.height - w.height), w.left = k.left + (q.width - w.width)), w
        },
        _respectSize: function (k) {
            var x = this._vBoundaries,
                    A = this.axis,
                    w = this._isNumber(k.width) && x.maxWidth && x.maxWidth < k.width,
                    C = this._isNumber(k.height) && x.maxHeight && x.maxHeight < k.height,
                    G = this._isNumber(k.width) && x.minWidth && x.minWidth > k.width,
                    D = this._isNumber(k.height) && x.minHeight && x.minHeight > k.height,
                    F = this.originalPosition.left + this.originalSize.width,
                    q = this.position.top + this.size.height,
                    B = /sw|nw|w/.test(A),
                    E = /nw|ne|n/.test(A);
            return G && (k.width = x.minWidth), D && (k.height = x.minHeight), w && (k.width = x.maxWidth), C && (k.height = x.maxHeight), G && B && (k.left = F - x.minWidth), w && B && (k.left = F - x.maxWidth), D && E && (k.top = q - x.minHeight), C && E && (k.top = q - x.maxHeight), k.width || k.height || k.left || !k.top ? k.width || k.height || k.top || !k.left || (k.left = null) : k.top = null, k
        },
        _getPaddingPlusBorderDimensions: function (x) {
            for (var k = 0, q = [], A = [x.css("borderTopWidth"), x.css("borderRightWidth"), x.css("borderBottomWidth"), x.css("borderLeftWidth")], w = [x.css("paddingTop"), x.css("paddingRight"), x.css("paddingBottom"), x.css("paddingLeft")]; 4 > k; k++) {
                q[k] = parseInt(A[k], 10) || 0, q[k] += parseInt(w[k], 10) || 0
            }
            return {
                height: q[0] + q[2],
                width: q[1] + q[3]
            }
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) {
                for (var w, k = 0, q = this.helper || this.element; this._proportionallyResizeElements.length > k; k++) {
                    w = this._proportionallyResizeElements[k], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(w)), w.css({
                        height: q.height() - this.outerDimensions.height || 0,
                        width: q.width() - this.outerDimensions.width || 0
                    })
                }
            }
        },
        _renderProxy: function () {
            var k = this.element,
                    q = this.options;
            this.elementOffset = k.offset(), this._helper ? (this.helper = this.helper || e("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++q.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function (k, q) {
                return {
                    width: this.originalSize.width + q
                }
            },
            w: function (w, k) {
                var q = this.originalSize,
                        x = this.originalPosition;
                return {
                    left: x.left + k,
                    width: q.width - k
                }
            },
            n: function (x, k, q) {
                var A = this.originalSize,
                        w = this.originalPosition;
                return {
                    top: w.top + q,
                    height: A.height - q
                }
            },
            s: function (w, k, q) {
                return {
                    height: this.originalSize.height + q
                }
            },
            se: function (k, q, w) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [k, q, w]))
            },
            sw: function (k, q, w) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [k, q, w]))
            },
            ne: function (k, q, w) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [k, q, w]))
            },
            nw: function (k, q, w) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [k, q, w]))
            }
        },
        _propagate: function (k, q) {
            e.ui.plugin.call(this, k, [q, this.ui()]), "resize" !== k && this._trigger(k, q, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), e.ui.plugin.add("resizable", "animate", {
        stop: function (F) {
            var x = e(this).resizable("instance"),
                    D = x.options,
                    B = x._proportionallyResizeElements,
                    q = B.length && /textarea/i.test(B[0].nodeName),
                    C = q && x._hasScroll(B[0], "left") ? 0 : x.sizeDiff.height,
                    E = q ? 0 : x.sizeDiff.width,
                    w = {
                        width: x.size.width - E,
                        height: x.size.height - C
                    },
            A = parseInt(x.element.css("left"), 10) + (x.position.left - x.originalPosition.left) || null,
                    k = parseInt(x.element.css("top"), 10) + (x.position.top - x.originalPosition.top) || null;
            x.element.animate(e.extend(w, k && A ? {
                top: k,
                left: A
            } : {}), {
                duration: D.animateDuration,
                easing: D.animateEasing,
                step: function () {
                    var G = {
                        width: parseInt(x.element.css("width"), 10),
                        height: parseInt(x.element.css("height"), 10),
                        top: parseInt(x.element.css("top"), 10),
                        left: parseInt(x.element.css("left"), 10)
                    };
                    B && B.length && e(B[0]).css({
                        width: G.width,
                        height: G.height
                    }), x._updateCache(G), x._propagate("resize", F)
                }
            })
        }
    }), e.ui.plugin.add("resizable", "containment", {
        start: function () {
            var x, q, w, D, B, E, G, k = e(this).resizable("instance"),
                    C = k.options,
                    A = k.element,
                    H = C.containment,
                    F = H instanceof e ? H.get(0) : /parent/.test(H) ? A.parent().get(0) : H;
            F && (k.containerElement = e(F), /document/.test(H) || H === document ? (k.containerOffset = {
                left: 0,
                top: 0
            }, k.containerPosition = {
                left: 0,
                top: 0
            }, k.parentData = {
                element: e(document),
                left: 0,
                top: 0,
                width: e(document).width(),
                height: e(document).height() || document.body.parentNode.scrollHeight
            }) : (x = e(F), q = [], e(["Top", "Right", "Left", "Bottom"]).each(function (J, I) {
                q[J] = k._num(x.css("padding" + I))
            }), k.containerOffset = x.offset(), k.containerPosition = x.position(), k.containerSize = {
                height: x.innerHeight() - q[3],
                width: x.innerWidth() - q[1]
            }, w = k.containerOffset, D = k.containerSize.height, B = k.containerSize.width, E = k._hasScroll(F, "left") ? F.scrollWidth : B, G = k._hasScroll(F) ? F.scrollHeight : D, k.parentData = {
                element: F,
                left: w.left,
                top: w.top,
                width: E,
                height: G
            }))
        },
        resize: function (w) {
            var I, q, D, A, E = e(this).resizable("instance"),
                    H = E.options,
                    G = E.containerOffset,
                    k = E.position,
                    x = E._aspectRatio || w.shiftKey,
                    C = {
                        top: 0,
                        left: 0
                    },
            B = E.containerElement,
                    F = !0;
            B[0] !== document && /static/.test(B.css("position")) && (C = G), k.left < (E._helper ? G.left : 0) && (E.size.width = E.size.width + (E._helper ? E.position.left - G.left : E.position.left - C.left), x && (E.size.height = E.size.width / E.aspectRatio, F = !1), E.position.left = H.helper ? G.left : 0), k.top < (E._helper ? G.top : 0) && (E.size.height = E.size.height + (E._helper ? E.position.top - G.top : E.position.top), x && (E.size.width = E.size.height * E.aspectRatio, F = !1), E.position.top = E._helper ? G.top : 0), D = E.containerElement.get(0) === E.element.parent().get(0), A = /relative|absolute/.test(E.containerElement.css("position")), D && A ? (E.offset.left = E.parentData.left + E.position.left, E.offset.top = E.parentData.top + E.position.top) : (E.offset.left = E.element.offset().left, E.offset.top = E.element.offset().top), I = Math.abs(E.sizeDiff.width + (E._helper ? E.offset.left - C.left : E.offset.left - G.left)), q = Math.abs(E.sizeDiff.height + (E._helper ? E.offset.top - C.top : E.offset.top - G.top)), I + E.size.width >= E.parentData.width && (E.size.width = E.parentData.width - I, x && (E.size.height = E.size.width / E.aspectRatio, F = !1)), q + E.size.height >= E.parentData.height && (E.size.height = E.parentData.height - q, x && (E.size.width = E.size.height * E.aspectRatio, F = !1)), F || (E.position.left = E.prevPosition.left, E.position.top = E.prevPosition.top, E.size.width = E.prevSize.width, E.size.height = E.prevSize.height)
        },
        stop: function () {
            var k = e(this).resizable("instance"),
                    x = k.options,
                    E = k.containerOffset,
                    B = k.containerPosition,
                    q = k.containerElement,
                    C = e(k.helper),
                    D = C.offset(),
                    w = C.outerWidth() - k.sizeDiff.width,
                    A = C.outerHeight() - k.sizeDiff.height;
            k._helper && !x.animate && /relative/.test(q.css("position")) && e(this).css({
                left: D.left - B.left - E.left,
                width: w,
                height: A
            }), k._helper && !x.animate && /static/.test(q.css("position")) && e(this).css({
                left: D.left - B.left - E.left,
                width: w,
                height: A
            })
        }
    }), e.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var k = e(this).resizable("instance"),
                    q = k.options;
            e(q.alsoResize).each(function () {
                var w = e(this);
                w.data("ui-resizable-alsoresize", {
                    width: parseInt(w.width(), 10),
                    height: parseInt(w.height(), 10),
                    left: parseInt(w.css("left"), 10),
                    top: parseInt(w.css("top"), 10)
                })
            })
        },
        resize: function (B, C) {
            var A = e(this).resizable("instance"),
                    q = A.options,
                    k = A.originalSize,
                    w = A.originalPosition,
                    x = {
                        height: A.size.height - k.height || 0,
                        width: A.size.width - k.width || 0,
                        top: A.position.top - w.top || 0,
                        left: A.position.left - w.left || 0
                    };
            e(q.alsoResize).each(function () {
                var D = e(this),
                        G = e(this).data("ui-resizable-alsoresize"),
                        F = {},
                        E = D.parents(C.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                e.each(E, function (I, J) {
                    var H = (G[J] || 0) + (x[J] || 0);
                    H && H >= 0 && (F[J] = H || null)
                }), D.css(F)
            })
        },
        stop: function () {
            e(this).removeData("resizable-alsoresize")
        }
    }), e.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var k = e(this).resizable("instance"),
                    q = k.options,
                    w = k.size;
            k.ghost = k.originalElement.clone(), k.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: w.height,
                width: w.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof q.ghost ? q.ghost : ""), k.ghost.appendTo(k.helper)
        },
        resize: function () {
            var k = e(this).resizable("instance");
            k.ghost && k.ghost.css({
                position: "relative",
                height: k.size.height,
                width: k.size.width
            })
        },
        stop: function () {
            var k = e(this).resizable("instance");
            k.ghost && k.helper && k.helper.get(0).removeChild(k.ghost.get(0))
        }
    }), e.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var E, k = e(this).resizable("instance"),
                    D = k.options,
                    x = k.size,
                    G = k.originalSize,
                    A = k.originalPosition,
                    C = k.axis,
                    N = "number" == typeof D.grid ? [D.grid, D.grid] : D.grid,
                    q = N[0] || 1,
                    F = N[1] || 1,
                    J = Math.round((x.width - G.width) / q) * q,
                    I = Math.round((x.height - G.height) / F) * F,
                    B = G.width + J,
                    L = G.height + I,
                    w = D.maxWidth && B > D.maxWidth,
                    M = D.maxHeight && L > D.maxHeight,
                    H = D.minWidth && D.minWidth > B,
                    K = D.minHeight && D.minHeight > L;
            D.grid = N, H && (B += q), K && (L += F), w && (B -= q), M && (L -= F), /^(se|s|e)$/.test(C) ? (k.size.width = B, k.size.height = L) : /^(ne)$/.test(C) ? (k.size.width = B, k.size.height = L, k.position.top = A.top - I) : /^(sw)$/.test(C) ? (k.size.width = B, k.size.height = L, k.position.left = A.left - J) : ((0 >= L - F || 0 >= B - q) && (E = k._getPaddingPlusBorderDimensions(this)), L - F > 0 ? (k.size.height = L, k.position.top = A.top - I) : (L = F - E.height, k.size.height = L, k.position.top = A.top + G.height - L), B - q > 0 ? (k.size.width = B, k.position.left = A.left - J) : (B = q - E.width, k.size.width = B, k.position.left = A.left + G.width - B))
        }
    }), e.ui.resizable, e.widget("ui.dialog", {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "Close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function (k) {
                    var q = e(this).css(k).offset().top;
                    0 > q && e(this).css("top", k.top - q)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && e.fn.draggable && this._makeDraggable(), this.options.resizable && e.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _appendTo: function () {
            var k = this.options.appendTo;
            return k && (k.jquery || k.nodeType) ? e(k) : this.document.find(k || "body").eq(0)
        },
        _destroy: function () {
            var k, q = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), k = q.parent.children().eq(q.index), k.length && k[0] !== this.element[0] ? k.before(this.element) : q.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        disable: e.noop,
        enable: e.noop,
        close: function (k) {
            var q, x = this;
            if (this._isOpen && this._trigger("beforeClose", k) !== !1) {
                if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), !this.opener.filter(":focusable").focus().length) {
                    try {
                        q = this.document[0].activeElement, q && "body" !== q.nodeName.toLowerCase() && e(q).blur()
                    } catch (w) {
                    }
                }
                this._hide(this.uiDialog, this.options.hide, function () {
                    x._trigger("close", k)
                })
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (x, A) {
            var w = !1,
                    q = this.uiDialog.siblings(".ui-front:visible").map(function () {
                return +e(this).css("z-index")
            }).get(),
                    k = Math.max.apply(null, q);
            return k >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", k + 1), w = !0), w && !A && this._trigger("focus", x), w
        },
        open: function () {
            var k = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = e(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
                k._focusTabbable(), k._trigger("focus")
            }), this._makeFocusTarget(), this._trigger("open"), void 0)
        },
        _focusTabbable: function () {
            var k = this._focusedElement;
            k || (k = this.element.find("[autofocus]")), k.length || (k = this.element.find(":tabbable")), k.length || (k = this.uiDialogButtonPane.find(":tabbable")), k.length || (k = this.uiDialogTitlebarClose.filter(":tabbable")), k.length || (k = this.uiDialog), k.eq(0).focus()
        },
        _keepFocus: function (k) {
            function q() {
                var w = this.document[0].activeElement,
                        x = this.uiDialog[0] === w || e.contains(this.uiDialog[0], w);
                x || this._focusTabbable()
            }
            k.preventDefault(), q.call(this), this._delay(q)
        },
        _createWrapper: function () {
            this.uiDialog = e("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function (k) {
                    if (this.options.closeOnEscape && !k.isDefaultPrevented() && k.keyCode && k.keyCode === e.ui.keyCode.ESCAPE) {
                        return k.preventDefault(), this.close(k), void 0
                    }
                    if (k.keyCode === e.ui.keyCode.TAB && !k.isDefaultPrevented()) {
                        var q = this.uiDialog.find(":tabbable"),
                                x = q.filter(":first"),
                                w = q.filter(":last");
                        k.target !== w[0] && k.target !== this.uiDialog[0] || k.shiftKey ? k.target !== x[0] && k.target !== this.uiDialog[0] || !k.shiftKey || (this._delay(function () {
                            w.focus()
                        }), k.preventDefault()) : (this._delay(function () {
                            x.focus()
                        }), k.preventDefault())
                    }
                },
                mousedown: function (k) {
                    this._moveToTop(k) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function () {
            var k;
            this.uiDialogTitlebar = e("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
                mousedown: function (q) {
                    e(q.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }), this.uiDialogTitlebarClose = e("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function (q) {
                    q.preventDefault(), this.close(q)
                }
            }), k = e("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(k), this.uiDialog.attr({
                "aria-labelledby": k.attr("id")
            })
        },
        _title: function (k) {
            this.options.title || k.html("&#160;"), k.text(this.options.title)
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = e("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = e("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
        },
        _createButtons: function () {
            var k = this,
                    q = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), e.isEmptyObject(q) || e.isArray(q) && !q.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (e.each(q, function (A, x) {
                var w, B;
                x = e.isFunction(x) ? {
                    click: x,
                    text: A
                } : x, x = e.extend({
                    type: "button"
                }, x), w = x.click, x.click = function () {
                    w.apply(k.element[0], arguments)
                }, B = {
                    icons: x.icons,
                    text: x.showText
                }, delete x.icons, delete x.showText, e("<button></button>", x).button(B).appendTo(k.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
        },
        _makeDraggable: function () {
            function k(x) {
                return {
                    position: x.position,
                    offset: x.offset
                }
            }
            var q = this,
                    w = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (A, x) {
                    e(this).addClass("ui-dialog-dragging"), q._blockFrames(), q._trigger("dragStart", A, k(x))
                },
                drag: function (x, A) {
                    q._trigger("drag", x, k(A))
                },
                stop: function (x, C) {
                    var A = C.offset.left - q.document.scrollLeft(),
                            B = C.offset.top - q.document.scrollTop();
                    w.position = {
                        my: "left top",
                        at: "left" + (A >= 0 ? "+" : "") + A + " top" + (B >= 0 ? "+" : "") + B,
                        of: q.window
                    }, e(this).removeClass("ui-dialog-dragging"), q._unblockFrames(), q._trigger("dragStop", x, k(C))
                }
            })
        },
        _makeResizable: function () {
            function A(C) {
                return {
                    originalPosition: C.originalPosition,
                    originalSize: C.originalSize,
                    position: C.position,
                    size: C.size
                }
            }
            var B = this,
                    x = this.options,
                    q = x.resizable,
                    k = this.uiDialog.css("position"),
                    w = "string" == typeof q ? q : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: x.maxWidth,
                maxHeight: x.maxHeight,
                minWidth: x.minWidth,
                minHeight: this._minHeight(),
                handles: w,
                start: function (C, D) {
                    e(this).addClass("ui-dialog-resizing"), B._blockFrames(), B._trigger("resizeStart", C, A(D))
                },
                resize: function (D, C) {
                    B._trigger("resize", D, A(C))
                },
                stop: function (E, D) {
                    var F = B.uiDialog.offset(),
                            G = F.left - B.document.scrollLeft(),
                            C = F.top - B.document.scrollTop();
                    x.height = B.uiDialog.height(), x.width = B.uiDialog.width(), x.position = {
                        my: "left top",
                        at: "left" + (G >= 0 ? "+" : "") + G + " top" + (C >= 0 ? "+" : "") + C,
                        of: B.window
                    }, e(this).removeClass("ui-dialog-resizing"), B._unblockFrames(), B._trigger("resizeStop", E, A(D))
                }
            }).css("position", k)
        },
        _trackFocus: function () {
            this._on(this.widget(), {
                focusin: function (k) {
                    this._makeFocusTarget(), this._focusedElement = e(k.target)
                }
            })
        },
        _makeFocusTarget: function () {
            this._untrackInstance(), this._trackingInstances().unshift(this)
        },
        _untrackInstance: function () {
            var k = this._trackingInstances(),
                    q = e.inArray(this, k);
            -1 !== q && k.splice(q, 1)
        },
        _trackingInstances: function () {
            var k = this.document.data("ui-dialog-instances");
            return k || (k = [], this.document.data("ui-dialog-instances", k)), k
        },
        _minHeight: function () {
            var k = this.options;
            return "auto" === k.height ? k.minHeight : Math.min(k.minHeight, k.height)
        },
        _position: function () {
            var k = this.uiDialog.is(":visible");
            k || this.uiDialog.show(), this.uiDialog.position(this.options.position), k || this.uiDialog.hide()
        },
        _setOptions: function (k) {
            var q = this,
                    x = !1,
                    w = {};
            e.each(k, function (A, B) {
                q._setOption(A, B), A in q.sizeRelatedOptions && (x = !0), A in q.resizableRelatedOptions && (w[A] = B)
            }), x && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", w)
        },
        _setOption: function (x, k) {
            var q, A, w = this.uiDialog;
            "dialogClass" === x && w.removeClass(this.options.dialogClass).addClass(k), "disabled" !== x && (this._super(x, k), "appendTo" === x && this.uiDialog.appendTo(this._appendTo()), "buttons" === x && this._createButtons(), "closeText" === x && this.uiDialogTitlebarClose.button({
                label: "" + k
            }), "draggable" === x && (q = w.is(":data(ui-draggable)"), q && !k && w.draggable("destroy"), !q && k && this._makeDraggable()), "position" === x && this._position(), "resizable" === x && (A = w.is(":data(ui-resizable)"), A && !k && w.resizable("destroy"), A && "string" == typeof k && w.resizable("option", "handles", k), A || k === !1 || this._makeResizable()), "title" === x && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function () {
            var w, k, q, x = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), x.minWidth > x.width && (x.width = x.minWidth), w = this.uiDialog.css({
                height: "auto",
                width: x.width
            }).outerHeight(), k = Math.max(0, x.minHeight - w), q = "number" == typeof x.maxHeight ? Math.max(0, x.maxHeight - w) : "none", "auto" === x.height ? this.element.css({
                minHeight: k,
                maxHeight: q,
                height: "auto"
            }) : this.element.height(Math.max(0, x.height - w)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var k = e(this);
                return e("<div>").css({
                    position: "absolute",
                    width: k.outerWidth(),
                    height: k.outerHeight()
                }).appendTo(k.parent()).offset(k.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function (k) {
            return e(k.target).closest(".ui-dialog").length ? !0 : !!e(k.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (this.options.modal) {
                var k = !0;
                this._delay(function () {
                    k = !1
                }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function (q) {
                        k || this._allowInteraction(q) || (q.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                    }
                }), this.overlay = e("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function () {
            if (this.options.modal && this.overlay) {
                var k = this.document.data("ui-dialog-overlays") - 1;
                k ? this.document.data("ui-dialog-overlays", k) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), this.overlay.remove(), this.overlay = null
            }
        }
    }), e.widget("ui.droppable", {
        version: "1.11.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var k, q = this.options,
                    w = q.accept;
            this.isover = !1, this.isout = !0, this.accept = e.isFunction(w) ? w : function (x) {
                return x.is(w)
            }, this.proportions = function () {
                return arguments.length ? (k = arguments[0], void 0) : k ? k : k = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            }, this._addToManager(q.scope), q.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function (k) {
            e.ui.ddmanager.droppables[k] = e.ui.ddmanager.droppables[k] || [], e.ui.ddmanager.droppables[k].push(this)
        },
        _splice: function (k) {
            for (var q = 0; k.length > q; q++) {
                k[q] === this && k.splice(q, 1)
            }
        },
        _destroy: function () {
            var k = e.ui.ddmanager.droppables[this.options.scope];
            this._splice(k), this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function (k, q) {
            if ("accept" === k) {
                this.accept = e.isFunction(q) ? q : function (x) {
                    return x.is(q)
                }
            } else {
                if ("scope" === k) {
                    var w = e.ui.ddmanager.droppables[this.options.scope];
                    this._splice(w), this._addToManager(q)
                }
            }
            this._super(k, q)
        },
        _activate: function (k) {
            var q = e.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), q && this._trigger("activate", k, this.ui(q))
        },
        _deactivate: function (k) {
            var q = e.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), q && this._trigger("deactivate", k, this.ui(q))
        },
        _over: function (k) {
            var q = e.ui.ddmanager.current;
            q && (q.currentItem || q.element)[0] !== this.element[0] && this.accept.call(this.element[0], q.currentItem || q.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", k, this.ui(q)))
        },
        _out: function (k) {
            var q = e.ui.ddmanager.current;
            q && (q.currentItem || q.element)[0] !== this.element[0] && this.accept.call(this.element[0], q.currentItem || q.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", k, this.ui(q)))
        },
        _drop: function (k, q) {
            var x = q || e.ui.ddmanager.current,
                    w = !1;
            return x && (x.currentItem || x.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var A = e(this).droppable("instance");
                return A.options.greedy && !A.options.disabled && A.options.scope === x.options.scope && A.accept.call(A.element[0], x.currentItem || x.element) && e.ui.intersect(x, e.extend(A, {
                    offset: A.element.offset()
                }), A.options.tolerance, k) ? (w = !0, !1) : void 0
            }), w ? !1 : this.accept.call(this.element[0], x.currentItem || x.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", k, this.ui(x)), this.element) : !1) : !1
        },
        ui: function (k) {
            return {
                draggable: k.currentItem || k.element,
                helper: k.helper,
                position: k.position,
                offset: k.positionAbs
            }
        }
    }), e.ui.intersect = function () {
        function k(w, x, q) {
            return w >= x && x + q > w
        }
        return function (A, w, x, E) {
            if (!w.offset) {
                return !1
            }
            var C = (A.positionAbs || A.position.absolute).left + A.margins.left,
                    F = (A.positionAbs || A.position.absolute).top + A.margins.top,
                    H = C + A.helperProportions.width,
                    q = F + A.helperProportions.height,
                    D = w.offset.left,
                    B = w.offset.top,
                    I = D + w.proportions().width,
                    G = B + w.proportions().height;
            switch (x) {
                case "fit":
                    return C >= D && I >= H && F >= B && G >= q;
                case "intersect":
                    return C + A.helperProportions.width / 2 > D && I > H - A.helperProportions.width / 2 && F + A.helperProportions.height / 2 > B && G > q - A.helperProportions.height / 2;
                case "pointer":
                    return k(E.pageY, B, w.proportions().height) && k(E.pageX, D, w.proportions().width);
                case "touch":
                    return (F >= B && G >= F || q >= B && G >= q || B > F && q > G) && (C >= D && I >= C || H >= D && I >= H || D > C && H > I);
                default:
                    return !1
            }
        }
    }(), e.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (B, C) {
            var A, q, k = e.ui.ddmanager.droppables[B.options.scope] || [],
                    w = C ? C.type : null,
                    x = (B.currentItem || B.element).find(":data(ui-droppable)").addBack();
            e: for (A = 0; k.length > A; A++) {
                if (!(k[A].options.disabled || B && !k[A].accept.call(k[A].element[0], B.currentItem || B.element))) {
                    for (q = 0; x.length > q; q++) {
                        if (x[q] === k[A].element[0]) {
                            k[A].proportions().height = 0;
                            continue e
                        }
                    }
                    k[A].visible = "none" !== k[A].element.css("display"), k[A].visible && ("mousedown" === w && k[A]._activate.call(k[A], C), k[A].offset = k[A].element.offset(), k[A].proportions({
                        width: k[A].element[0].offsetWidth,
                        height: k[A].element[0].offsetHeight
                    }))
                }
            }
        },
        drop: function (k, q) {
            var w = !1;
            return e.each((e.ui.ddmanager.droppables[k.options.scope] || []).slice(), function () {
                this.options && (!this.options.disabled && this.visible && e.ui.intersect(k, this, this.options.tolerance, q) && (w = this._drop.call(this, q) || w), !this.options.disabled && this.visible && this.accept.call(this.element[0], k.currentItem || k.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, q)))
            }), w
        },
        dragStart: function (k, q) {
            k.element.parentsUntil("body").bind("scroll.droppable", function () {
                k.options.refreshPositions || e.ui.ddmanager.prepareOffsets(k, q)
            })
        },
        drag: function (k, q) {
            k.options.refreshPositions && e.ui.ddmanager.prepareOffsets(k, q), e.each(e.ui.ddmanager.droppables[k.options.scope] || [], function () {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var B, w, C, x = e.ui.intersect(k, this, this.options.tolerance, q),
                            A = !x && this.isover ? "isout" : x && !this.isover ? "isover" : null;
                    A && (this.options.greedy && (w = this.options.scope, C = this.element.parents(":data(ui-droppable)").filter(function () {
                        return e(this).droppable("instance").options.scope === w
                    }), C.length && (B = e(C[0]).droppable("instance"), B.greedyChild = "isover" === A)), B && "isover" === A && (B.isover = !1, B.isout = !0, B._out.call(B, q)), this[A] = !0, this["isout" === A ? "isover" : "isout"] = !1, this["isover" === A ? "_over" : "_out"].call(this, q), B && "isout" === A && (B.isout = !1, B.isover = !0, B._over.call(B, q)))
                }
            })
        },
        dragStop: function (k, q) {
            k.element.parentsUntil("body").unbind("scroll.droppable"), k.options.refreshPositions || e.ui.ddmanager.prepareOffsets(k, q)
        }
    }, e.ui.droppable;
    var R = "ui-effects-",
            b = e;
    e.effects = {
        effect: {}
    },
    function (D, q) {
        function G(M, O, L) {
            var N = C[O.type] || {};
            return null == M ? L || !O.def ? null : O.def : (M = N.floor ? ~~M : parseFloat(M), isNaN(M) ? O.def : N.mod ? (M + N.mod) % N.mod : 0 > M ? 0 : M > N.max ? N.max : M)
        }

        function k(L) {
            var N = I(),
                    M = N._rgba = [];
            return L = L.toLowerCase(), E(F, function (O, V) {
                var U, P = V.re.exec(L),
                        T = P && V.parse(P),
                        S = V.space || "rgba";
                return T ? (U = N[S](T), N[w[S].cache] = U[w[S].cache], M = N._rgba = U._rgba, !1) : q
            }), M.length ? ("0,0,0,0" === M.join() && D.extend(M, x.transparent), N) : x[L]
        }

        function K(M, N, L) {
            return L = (L + 1) % 1, 1 > 6 * L ? M + 6 * (N - M) * L : 1 > 2 * L ? N : 2 > 3 * L ? M + 6 * (N - M) * (2 / 3 - L) : M
        }
        var x, B = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                J = /^([\-+])=\s*(\d+\.?\d*)/,
                F = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function (L) {
                            return [L[1], L[2], L[3], L[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function (L) {
                            return [2.55 * L[1], 2.55 * L[2], 2.55 * L[3], L[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function (L) {
                            return [parseInt(L[1], 16), parseInt(L[2], 16), parseInt(L[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function (L) {
                            return [parseInt(L[1] + L[1], 16), parseInt(L[2] + L[2], 16), parseInt(L[3] + L[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function (L) {
                            return [L[1], L[2] / 100, L[3] / 100, L[4]]
                        }
                    }],
                I = D.Color = function (O, L, N, M) {
                    return new D.Color.fn.parse(O, L, N, M)
                },
                w = {
                    rgba: {
                        props: {
                            red: {
                                idx: 0,
                                type: "byte"
                            },
                            green: {
                                idx: 1,
                                type: "byte"
                            },
                            blue: {
                                idx: 2,
                                type: "byte"
                            }
                        }
                    },
                    hsla: {
                        props: {
                            hue: {
                                idx: 0,
                                type: "degrees"
                            },
                            saturation: {
                                idx: 1,
                                type: "percent"
                            },
                            lightness: {
                                idx: 2,
                                type: "percent"
                            }
                        }
                    }
                },
        C = {
            "byte": {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        },
        A = I.support = {},
                H = D("<p>")[0],
                E = D.each;
        H.style.cssText = "background-color:rgba(1,1,1,.5)", A.rgba = H.style.backgroundColor.indexOf("rgba") > -1, E(w, function (M, L) {
            L.cache = "_" + M, L.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }), I.fn = D.extend(I.prototype, {
            parse: function (T, O, S, M) {
                if (T === q) {
                    return this._rgba = [null, null, null, null], this
                }
                (T.jquery || T.nodeType) && (T = D(T).css(O), O = q);
                var L = this,
                        N = D.type(T),
                        P = this._rgba = [];
                return O !== q && (T = [T, O, S, M], N = "array"), "string" === N ? this.parse(k(T) || x._default) : "array" === N ? (E(w.rgba.props, function (U, V) {
                    P[V.idx] = G(T[V.idx], V)
                }), this) : "object" === N ? (T instanceof I ? E(w, function (U, V) {
                    T[V.cache] && (L[V.cache] = T[V.cache].slice())
                }) : E(w, function (V, U) {
                    var W = U.cache;
                    E(U.props, function (X, Y) {
                        if (!L[W] && U.to) {
                            if ("alpha" === X || null == T[X]) {
                                return
                            }
                            L[W] = U.to(L._rgba)
                        }
                        L[W][Y.idx] = G(T[X], Y, !0)
                    }), L[W] && 0 > D.inArray(null, L[W].slice(0, 3)) && (L[W][3] = 1, U.from && (L._rgba = U.from(L[W])))
                }), this) : q
            },
            is: function (N) {
                var L = I(N),
                        O = !0,
                        M = this;
                return E(w, function (U, S) {
                    var T, P = L[S.cache];
                    return P && (T = M[S.cache] || S.to && S.to(M._rgba) || [], E(S.props, function (V, W) {
                        return null != P[W.idx] ? O = P[W.idx] === T[W.idx] : q
                    })), O
                }), O
            },
            _space: function () {
                var M = [],
                        L = this;
                return E(w, function (O, N) {
                    L[N.cache] && M.push(O)
                }), M.pop()
            },
            transition: function (M, T) {
                var L = I(M),
                        O = L._space(),
                        U = w[O],
                        S = 0 === this.alpha() ? I("transparent") : this,
                        P = S[U.cache] || U.to(S._rgba),
                        N = P.slice();
                return L = L[U.cache], E(U.props, function (aa, V) {
                    var Z = V.idx,
                            Y = P[Z],
                            X = L[Z],
                            W = C[V.type] || {};
                    null !== X && (null === Y ? N[Z] = X : (W.mod && (X - Y > W.mod / 2 ? Y += W.mod : Y - X > W.mod / 2 && (Y -= W.mod)), N[Z] = G((X - Y) * T + Y, V)))
                }), this[O](N)
            },
            blend: function (O) {
                if (1 === this._rgba[3]) {
                    return this
                }
                var L = this._rgba.slice(),
                        N = L.pop(),
                        M = I(O)._rgba;
                return I(D.map(L, function (P, S) {
                    return (1 - N) * M[S] + N * P
                }))
            },
            toRgbaString: function () {
                var M = "rgba(",
                        L = D.map(this._rgba, function (N, O) {
                            return null == N ? O > 2 ? 1 : 0 : N
                        });
                return 1 === L[3] && (L.pop(), M = "rgb("), M + L.join() + ")"
            },
            toHslaString: function () {
                var M = "hsla(",
                        L = D.map(this.hsla(), function (N, O) {
                            return null == N && (N = O > 2 ? 1 : 0), O && 3 > O && (N = Math.round(100 * N) + "%"), N
                        });
                return 1 === L[3] && (L.pop(), M = "hsl("), M + L.join() + ")"
            },
            toHexString: function (N) {
                var L = this._rgba.slice(),
                        M = L.pop();
                return N && L.push(~~(255 * M)), "#" + D.map(L, function (O) {
                    return O = (O || 0).toString(16), 1 === O.length ? "0" + O : O
                }).join("")
            },
            toString: function () {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), I.fn.parse.prototype = I.fn, w.hsla.to = function (W) {
            if (null == W[0] || null == W[1] || null == W[2]) {
                return [null, null, null, W[3]]
            }
            var S, Y, P = W[0] / 255,
                    M = W[1] / 255,
                    U = W[2] / 255,
                    N = W[3],
                    O = Math.max(P, M, U),
                    X = Math.min(P, M, U),
                    L = O - X,
                    T = O + X,
                    V = 0.5 * T;
            return S = X === O ? 0 : P === O ? 60 * (M - U) / L + 360 : M === O ? 60 * (U - P) / L + 120 : 60 * (P - M) / L + 240, Y = 0 === L ? 0 : 0.5 >= V ? L / T : L / (2 - T), [Math.round(S) % 360, Y, V, null == N ? 1 : N]
        }, w.hsla.from = function (T) {
            if (null == T[0] || null == T[1] || null == T[2]) {
                return [null, null, null, T[3]]
            }
            var N = T[0] / 360,
                    P = T[1],
                    M = T[2],
                    S = T[3],
                    O = 0.5 >= M ? M * (1 + P) : M + P - M * P,
                    L = 2 * M - O;
            return [Math.round(255 * K(L, O, N + 1 / 3)), Math.round(255 * K(L, O, N)), Math.round(255 * K(L, O, N - 1 / 3)), S]
        }, E(w, function (M, O) {
            var S = O.props,
                    L = O.cache,
                    N = O.to,
                    P = O.from;
            I.fn[M] = function (T) {
                if (N && !this[L] && (this[L] = N(this._rgba)), T === q) {
                    return this[L].slice()
                }
                var W, V = D.type(T),
                        X = "array" === V || "object" === V ? T : arguments,
                        U = this[L].slice();
                return E(S, function (Z, aa) {
                    var Y = X["object" === V ? Z : aa.idx];
                    null == Y && (Y = U[aa.idx]), U[aa.idx] = G(Y, aa)
                }), P ? (W = I(P(U)), W[L] = U, W) : I(U)
            }, E(S, function (U, T) {
                I.fn[U] || (I.fn[U] = function (W) {
                    var V, Y = D.type(W),
                            Z = "alpha" === U ? this._hsla ? "hsla" : "rgba" : M,
                            X = this[Z](),
                            ab = X[T.idx];
                    return "undefined" === Y ? ab : ("function" === Y && (W = W.call(this, ab), Y = D.type(W)), null == W && T.empty ? this : ("string" === Y && (V = J.exec(W), V && (W = ab + parseFloat(V[2]) * ("+" === V[1] ? 1 : -1))), X[T.idx] = W, this[Z](X)))
                })
            })
        }), I.hook = function (M) {
            var L = M.split(" ");
            E(L, function (N, O) {
                D.cssHooks[O] = {
                    set: function (P, W) {
                        var U, S, T = "";
                        if ("transparent" !== W && ("string" !== D.type(W) || (U = k(W)))) {
                            if (W = I(U || W), !A.rgba && 1 !== W._rgba[3]) {
                                for (S = "backgroundColor" === O ? P.parentNode : P;
                                        ("" === T || "transparent" === T) && S && S.style; ) {
                                    try {
                                        T = D.css(S, "backgroundColor"), S = S.parentNode
                                    } catch (V) {
                                    }
                                }
                                W = W.blend(T && "transparent" !== T ? T : "_default")
                            }
                            W = W.toRgbaString()
                        }
                        try {
                            P.style[O] = W
                        } catch (V) {
                        }
                    }
                }, D.fx.step[O] = function (P) {
                    P.colorInit || (P.start = I(P.elem, O), P.end = I(P.end), P.colorInit = !0), D.cssHooks[O].set(P.elem, P.start.transition(P.end, P.pos))
                }
            })
        }, I.hook(B), D.cssHooks.borderColor = {
            expand: function (M) {
                var L = {};
                return E(["Top", "Right", "Bottom", "Left"], function (O, N) {
                    L["border" + N + "Color"] = M
                }), L
            }
        }, x = D.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(b),
            function () {
                function k(C) {
                    var D, B, A = C.ownerDocument.defaultView ? C.ownerDocument.defaultView.getComputedStyle(C, null) : C.currentStyle,
                            E = {};
                    if (A && A.length && A[0] && A[A[0]]) {
                        for (B = A.length; B--; ) {
                            D = A[B], "string" == typeof A[D] && (E[e.camelCase(D)] = A[D])
                        }
                    } else {
                        for (D in A) {
                            "string" == typeof A[D] && (E[D] = A[D])
                        }
                    }
                    return E
                }

                function q(C, D) {
                    var B, E, A = {};
                    for (B in D) {
                        E = D[B], C[B] !== E && (w[B] || (e.fx.step[B] || !isNaN(parseFloat(E))) && (A[B] = E))
                    }
                    return A
                }
                var x = ["add", "remove", "toggle"],
                        w = {
                            border: 1,
                            borderBottom: 1,
                            borderColor: 1,
                            borderLeft: 1,
                            borderRight: 1,
                            borderTop: 1,
                            borderWidth: 1,
                            margin: 1,
                            padding: 1
                        };
                e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (A, B) {
                    e.fx.step[B] = function (C) {
                        ("none" !== C.end && !C.setAttr || 1 === C.pos && !C.setAttr) && (b.style(C.elem, B, C.end), C.setAttr = !0)
                    }
                }), e.fn.addBack || (e.fn.addBack = function (A) {
                    return this.add(null == A ? this.prevObject : this.prevObject.filter(A))
                }), e.effects.animateClass = function (A, E, B, C) {
                    var D = e.speed(E, B, C);
                    return this.queue(function () {
                        var I, G = e(this),
                                H = G.attr("class") || "",
                                F = D.children ? G.find("*").addBack() : G;
                        F = F.map(function () {
                            var J = e(this);
                            return {
                                el: J,
                                start: k(this)
                            }
                        }), I = function () {
                            e.each(x, function (J, K) {
                                A[K] && G[K + "Class"](A[K])
                            })
                        }, I(), F = F.map(function () {
                            return this.end = k(this.el[0]), this.diff = q(this.start, this.end), this
                        }), G.attr("class", H), F = F.map(function () {
                            var K = this,
                                    L = e.Deferred(),
                                    J = e.extend({}, D, {
                                        queue: !1,
                                        complete: function () {
                                            L.resolve(K)
                                        }
                                    });
                            return this.el.animate(this.diff, J), L.promise()
                        }), e.when.apply(e, F.get()).done(function () {
                            I(), e.each(arguments, function () {
                                var J = this.el;
                                e.each(this.diff, function (K) {
                                    J.css(K, "")
                                })
                            }), D.complete.call(G[0])
                        })
                    })
                }, e.fn.extend({
                    addClass: function (A) {
                        return function (D, C, B, E) {
                            return C ? e.effects.animateClass.call(this, {
                                add: D
                            }, C, B, E) : A.apply(this, arguments)
                        }
                    }(e.fn.addClass),
                    removeClass: function (A) {
                        return function (D, C, B, E) {
                            return arguments.length > 1 ? e.effects.animateClass.call(this, {
                                remove: D
                            }, C, B, E) : A.apply(this, arguments)
                        }
                    }(e.fn.removeClass),
                    toggleClass: function (A) {
                        return function (E, D, B, F, C) {
                            return "boolean" == typeof D || void 0 === D ? B ? e.effects.animateClass.call(this, D ? {
                                add: E
                            } : {
                                remove: E
                            }, B, F, C) : A.apply(this, arguments) : e.effects.animateClass.call(this, {
                                toggle: E
                            }, D, B, F)
                        }
                    }(e.fn.toggleClass),
                    switchClass: function (C, D, B, A, E) {
                        return e.effects.animateClass.call(this, {
                            add: D,
                            remove: C
                        }, B, A, E)
                    }
                })
            }(),
            function () {
                function k(A, B, x, w) {
                    return e.isPlainObject(A) && (B = A, A = A.effect), A = {
                        effect: A
                    }, null == B && (B = {}), e.isFunction(B) && (w = B, x = null, B = {}), ("number" == typeof B || e.fx.speeds[B]) && (w = x, x = B, B = {}), e.isFunction(x) && (w = x, x = null), B && e.extend(A, B), x = x || B.duration, A.duration = e.fx.off ? 0 : "number" == typeof x ? x : x in e.fx.speeds ? e.fx.speeds[x] : e.fx.speeds._default, A.complete = w || B.complete, A
                }

                function q(w) {
                    return !w || "number" == typeof w || e.fx.speeds[w] ? !0 : "string" != typeof w || e.effects.effect[w] ? e.isFunction(w) ? !0 : "object" != typeof w || w.effect ? !1 : !0 : !0
                }
                e.extend(e.effects, {
                    version: "1.11.4",
                    save: function (w, x) {
                        for (var A = 0; x.length > A; A++) {
                            null !== x[A] && w.data(R + x[A], w[0].style[x[A]])
                        }
                    },
                    restore: function (w, A) {
                        var B, x;
                        for (x = 0; A.length > x; x++) {
                            null !== A[x] && (B = w.data(R + A[x]), void 0 === B && (B = ""), w.css(A[x], B))
                        }
                    },
                    setMode: function (w, x) {
                        return "toggle" === x && (x = w.is(":hidden") ? "show" : "hide"), x
                    },
                    getBaseline: function (w, A) {
                        var B, x;
                        switch (w[0]) {
                            case "top":
                                B = 0;
                                break;
                            case "middle":
                                B = 0.5;
                                break;
                            case "bottom":
                                B = 1;
                                break;
                            default:
                                B = w[0] / A.height
                        }
                        switch (w[1]) {
                            case "left":
                                x = 0;
                                break;
                            case "center":
                                x = 0.5;
                                break;
                            case "right":
                                x = 1;
                                break;
                            default:
                                x = w[1] / A.width
                        }
                        return {
                            x: x,
                            y: B
                        }
                    },
                    createWrapper: function (B) {
                        if (B.parent().is(".ui-effects-wrapper")) {
                            return B.parent()
                        }
                        var C = {
                            width: B.outerWidth(!0),
                            height: B.outerHeight(!0),
                            "float": B.css("float")
                        },
                        A = e("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                                w = {
                                    width: B.width(),
                                    height: B.height()
                                },
                        D = document.activeElement;
                        try {
                            D.id
                        } catch (x) {
                            D = document.body
                        }
                        return B.wrap(A), (B[0] === D || e.contains(B[0], D)) && e(D).focus(), A = B.parent(), "static" === B.css("position") ? (A.css({
                            position: "relative"
                        }), B.css({
                            position: "relative"
                        })) : (e.extend(C, {
                            position: B.css("position"),
                            zIndex: B.css("z-index")
                        }), e.each(["top", "left", "bottom", "right"], function (E, F) {
                            C[F] = B.css(F), isNaN(parseInt(C[F], 10)) && (C[F] = "auto")
                        }), B.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), B.css(w), A.css(C).show()
                    },
                    removeWrapper: function (w) {
                        var x = document.activeElement;
                        return w.parent().is(".ui-effects-wrapper") && (w.parent().replaceWith(w), (w[0] === x || e.contains(w[0], x)) && e(x).focus()), w
                    },
                    setTransition: function (A, B, x, w) {
                        return w = w || {}, e.each(B, function (C, D) {
                            var E = A.cssUnit(D);
                            E[0] > 0 && (w[D] = E[0] * x + E[1])
                        }), w
                    }
                }), e.fn.extend({
                    effect: function () {
                        function B(D) {
                            function E() {
                                e.isFunction(F) && F.call(G[0]), e.isFunction(D) && D()
                            }
                            var G = e(this),
                                    F = A.complete,
                                    H = A.mode;
                            (G.is(":hidden") ? "hide" === H : "show" === H) ? (G[H](), E()) : x.call(G[0], A, E)
                        }
                        var A = k.apply(this, arguments),
                                w = A.mode,
                                C = A.queue,
                                x = e.effects.effect[A.effect];
                        return e.fx.off || !x ? w ? this[w](A.duration, A.complete) : this.each(function () {
                            A.complete && A.complete.call(this)
                        }) : C === !1 ? this.each(B) : this.queue(C || "fx", B)
                    },
                    show: function (w) {
                        return function (A) {
                            if (q(A)) {
                                return w.apply(this, arguments)
                            }
                            var x = k.apply(this, arguments);
                            return x.mode = "show", this.effect.call(this, x)
                        }
                    }(e.fn.show),
                    hide: function (w) {
                        return function (A) {
                            if (q(A)) {
                                return w.apply(this, arguments)
                            }
                            var x = k.apply(this, arguments);
                            return x.mode = "hide", this.effect.call(this, x)
                        }
                    }(e.fn.hide),
                    toggle: function (w) {
                        return function (A) {
                            if (q(A) || "boolean" == typeof A) {
                                return w.apply(this, arguments)
                            }
                            var x = k.apply(this, arguments);
                            return x.mode = "toggle", this.effect.call(this, x)
                        }
                    }(e.fn.toggle),
                    cssUnit: function (x) {
                        var A = this.css(x),
                                w = [];
                        return e.each(["em", "px", "%", "pt"], function (B, C) {
                            A.indexOf(C) > 0 && (w = [parseFloat(A), C])
                        }), w
                    }
                })
            }(),
            function () {
                var k = {};
                e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (w, q) {
                    k[q] = function (x) {
                        return Math.pow(x, w + 2)
                    }
                }), e.extend(k, {
                    Sine: function (q) {
                        return 1 - Math.cos(q * Math.PI / 2)
                    },
                    Circ: function (q) {
                        return 1 - Math.sqrt(1 - q * q)
                    },
                    Elastic: function (q) {
                        return 0 === q || 1 === q ? q : -Math.pow(2, 8 * (q - 1)) * Math.sin((80 * (q - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function (q) {
                        return q * q * (3 * q - 2)
                    },
                    Bounce: function (w) {
                        for (var x, q = 4;
                                ((x = Math.pow(2, --q)) - 1) / 11 > w; ) {
                        }
                        return 1 / Math.pow(4, 3 - q) - 7.5625 * Math.pow((3 * x - 2) / 22 - w, 2)
                    }
                }), e.each(k, function (w, q) {
                    e.easing["easeIn" + w] = q, e.easing["easeOut" + w] = function (x) {
                        return 1 - q(1 - x)
                    }, e.easing["easeInOut" + w] = function (x) {
                        return 0.5 > x ? q(2 * x) / 2 : 1 - q(-2 * x + 2) / 2
                    }
                })
            }(), e.effects, e.effects.effect.blind = function (L, D) {
        var K, G, q, I = e(this),
                J = /up|down|vertical/,
                C = /up|left|vertical|horizontal/,
                E = ["position", "top", "bottom", "left", "right", "height", "width"],
                M = e.effects.setMode(I, L.mode || "hide"),
                x = L.direction || "up",
                w = J.test(x),
                H = w ? "height" : "width",
                A = w ? "top" : "left",
                F = C.test(x),
                B = {},
                k = "show" === M;
        I.parent().is(".ui-effects-wrapper") ? e.effects.save(I.parent(), E) : e.effects.save(I, E), I.show(), K = e.effects.createWrapper(I).css({
            overflow: "hidden"
        }), G = K[H](), q = parseFloat(K.css(A)) || 0, B[H] = k ? G : 0, F || (I.css(w ? "bottom" : "right", 0).css(w ? "top" : "left", "auto").css({
            position: "absolute"
        }), B[A] = k ? q : G + q), k && (K.css(H, 0), F || K.css(A, q + G)), K.animate(B, {
            duration: L.duration,
            easing: L.easing,
            queue: !1,
            complete: function () {
                "hide" === M && I.hide(), e.effects.restore(I, E), e.effects.removeWrapper(I), D()
            }
        })
    }, e.effects.effect.bounce = function (D, P) {
        var C, w, H, x = e(this),
                B = ["position", "top", "bottom", "left", "right", "height", "width"],
                O = e.effects.setMode(x, D.mode || "effect"),
                k = "hide" === O,
                E = "show" === O,
                L = D.direction || "up",
                K = D.distance,
                A = D.times || 5,
                M = 2 * A + (E || k ? 1 : 0),
                q = D.duration / M,
                N = D.easing,
                F = "up" === L || "down" === L ? "top" : "left",
                J = "up" === L || "left" === L,
                I = x.queue(),
                G = I.length;
        for ((E || k) && B.push("opacity"), e.effects.save(x, B), x.show(), e.effects.createWrapper(x), K || (K = x["top" === F ? "outerHeight" : "outerWidth"]() / 3), E && (H = {
            opacity: 1
        }, H[F] = 0, x.css("opacity", 0).css(F, J ? 2 * -K : 2 * K).animate(H, q, N)), k && (K /= Math.pow(2, A - 1)), H = {}, H[F] = 0, C = 0; A > C; C++) {
            w = {}, w[F] = (J ? "-=" : "+=") + K, x.animate(w, q, N).animate(H, q, N), K = k ? 2 * K : K / 2
        }
        k && (w = {
            opacity: 0
        }, w[F] = (J ? "-=" : "+=") + K, x.animate(w, q, N)), x.queue(function () {
            k && x.hide(), e.effects.restore(x, B), e.effects.removeWrapper(x), P()
        }), G > 1 && I.splice.apply(I, [1, 0].concat(I.splice(G, M + 1))), x.dequeue()
    }, e.effects.effect.clip = function (q, H) {
        var k, x, A, F = e(this),
                I = ["position", "top", "bottom", "left", "right", "height", "width"],
                E = e.effects.setMode(F, q.mode || "hide"),
                J = "show" === E,
                w = q.direction || "vertical",
                C = "vertical" === w,
                B = C ? "height" : "width",
                G = C ? "top" : "left",
                D = {};
        e.effects.save(F, I), F.show(), k = e.effects.createWrapper(F).css({
            overflow: "hidden"
        }), x = "IMG" === F[0].tagName ? k : F, A = x[B](), J && (x.css(B, 0), x.css(G, A / 2)), D[B] = J ? A : 0, D[G] = J ? 0 : A / 2, x.animate(D, {
            queue: !1,
            duration: q.duration,
            easing: q.easing,
            complete: function () {
                J || F.hide(), e.effects.restore(F, I), e.effects.removeWrapper(F), H()
            }
        })
    }, e.effects.effect.drop = function (x, A) {
        var w, C = e(this),
                G = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                D = e.effects.setMode(C, x.mode || "hide"),
                F = "show" === D,
                q = x.direction || "left",
                B = "up" === q || "down" === q ? "top" : "left",
                E = "up" === q || "left" === q ? "pos" : "neg",
                k = {
                    opacity: F ? 1 : 0
                };
        e.effects.save(C, G), C.show(), e.effects.createWrapper(C), w = x.distance || C["top" === B ? "outerHeight" : "outerWidth"](!0) / 2, F && C.css("opacity", 0).css(B, "pos" === E ? -w : w), k[B] = (F ? "pos" === E ? "+=" : "-=" : "pos" === E ? "-=" : "+=") + w, C.animate(k, {
            queue: !1,
            duration: x.duration,
            easing: x.easing,
            complete: function () {
                "hide" === D && C.hide(), e.effects.restore(C, G), e.effects.removeWrapper(C), A()
            }
        })
    }, e.effects.effect.explode = function (D, O) {
        function C() {
            H.push(this), H.length === K * J && w()
        }

        function w() {
            A.css({
                visibility: "visible"
            }), e(H).remove(), q || A.hide(), O()
        }
        var G, x, B, N, k, E, K = D.pieces ? Math.round(Math.sqrt(D.pieces)) : 3,
                J = K,
                A = e(this),
                L = e.effects.setMode(A, D.mode || "hide"),
                q = "show" === L,
                M = A.show().css("visibility", "hidden").offset(),
                F = Math.ceil(A.outerWidth() / J),
                I = Math.ceil(A.outerHeight() / K),
                H = [];
        for (G = 0; K > G; G++) {
            for (N = M.top + G * I, E = G - (K - 1) / 2, x = 0; J > x; x++) {
                B = M.left + x * F, k = x - (J - 1) / 2, A.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -x * F,
                    top: -G * I
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: F,
                    height: I,
                    left: B + (q ? k * F : 0),
                    top: N + (q ? E * I : 0),
                    opacity: q ? 0 : 1
                }).animate({
                    left: B + (q ? 0 : k * F),
                    top: N + (q ? 0 : E * I),
                    opacity: q ? 1 : 0
                }, D.duration || 500, D.easing, C)
            }
        }
    }, e.effects.effect.fade = function (k, q) {
        var x = e(this),
                w = e.effects.setMode(x, k.mode || "toggle");
        x.animate({
            opacity: w
        }, {
            queue: !1,
            duration: k.duration,
            easing: k.easing,
            complete: q
        })
    }, e.effects.effect.fold = function (L, D) {
        var K, G, q = e(this),
                I = ["position", "top", "bottom", "left", "right", "height", "width"],
                J = e.effects.setMode(q, L.mode || "hide"),
                C = "show" === J,
                E = "hide" === J,
                M = L.size || 15,
                x = /([0-9]+)%/.exec(M),
                w = !!L.horizFirst,
                H = C !== w,
                A = H ? ["width", "height"] : ["height", "width"],
                F = L.duration / 2,
                B = {},
                k = {};
        e.effects.save(q, I), q.show(), K = e.effects.createWrapper(q).css({
            overflow: "hidden"
        }), G = H ? [K.width(), K.height()] : [K.height(), K.width()], x && (M = parseInt(x[1], 10) / 100 * G[E ? 0 : 1]), C && K.css(w ? {
            height: 0,
            width: M
        } : {
            height: M,
            width: 0
        }), B[A[0]] = C ? G[0] : M, k[A[1]] = C ? G[1] : 0, K.animate(B, F, L.easing).animate(k, F, L.easing, function () {
            E && q.hide(), e.effects.restore(q, I), e.effects.removeWrapper(q), D()
        })
    }, e.effects.effect.highlight = function (A, B) {
        var x = e(this),
                q = ["backgroundImage", "backgroundColor", "opacity"],
                k = e.effects.setMode(x, A.mode || "show"),
                w = {
                    backgroundColor: x.css("backgroundColor")
                };
        "hide" === k && (w.opacity = 0), e.effects.save(x, q), x.show().css({
            backgroundImage: "none",
            backgroundColor: A.color || "#ffff99"
        }).animate(w, {
            queue: !1,
            duration: A.duration,
            easing: A.easing,
            complete: function () {
                "hide" === k && x.hide(), e.effects.restore(x, q), B()
            }
        })
    }, e.effects.effect.size = function (D, O) {
        var C, w, G, x = e(this),
                B = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                N = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                k = ["width", "height", "overflow"],
                E = ["fontSize"],
                K = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                J = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                A = e.effects.setMode(x, D.mode || "effect"),
                L = D.restore || "effect" !== A,
                q = D.scale || "both",
                M = D.origin || ["middle", "center"],
                F = x.css("position"),
                I = L ? B : N,
                H = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
        "show" === A && x.show(), C = {
            height: x.height(),
            width: x.width(),
            outerHeight: x.outerHeight(),
            outerWidth: x.outerWidth()
        }, "toggle" === D.mode && "show" === A ? (x.from = D.to || H, x.to = D.from || C) : (x.from = D.from || ("show" === A ? H : C), x.to = D.to || ("hide" === A ? H : C)), G = {
            from: {
                y: x.from.height / C.height,
                x: x.from.width / C.width
            },
            to: {
                y: x.to.height / C.height,
                x: x.to.width / C.width
            }
        }, ("box" === q || "both" === q) && (G.from.y !== G.to.y && (I = I.concat(K), x.from = e.effects.setTransition(x, K, G.from.y, x.from), x.to = e.effects.setTransition(x, K, G.to.y, x.to)), G.from.x !== G.to.x && (I = I.concat(J), x.from = e.effects.setTransition(x, J, G.from.x, x.from), x.to = e.effects.setTransition(x, J, G.to.x, x.to))), ("content" === q || "both" === q) && G.from.y !== G.to.y && (I = I.concat(E).concat(k), x.from = e.effects.setTransition(x, E, G.from.y, x.from), x.to = e.effects.setTransition(x, E, G.to.y, x.to)), e.effects.save(x, I), x.show(), e.effects.createWrapper(x), x.css("overflow", "hidden").css(x.from), M && (w = e.effects.getBaseline(M, C), x.from.top = (C.outerHeight - x.outerHeight()) * w.y, x.from.left = (C.outerWidth - x.outerWidth()) * w.x, x.to.top = (C.outerHeight - x.to.outerHeight) * w.y, x.to.left = (C.outerWidth - x.to.outerWidth) * w.x), x.css(x.from), ("content" === q || "both" === q) && (K = K.concat(["marginTop", "marginBottom"]).concat(E), J = J.concat(["marginLeft", "marginRight"]), k = B.concat(K).concat(J), x.find("*[width]").each(function () {
            var S = e(this),
                    P = {
                        height: S.height(),
                        width: S.width(),
                        outerHeight: S.outerHeight(),
                        outerWidth: S.outerWidth()
                    };
            L && e.effects.save(S, k), S.from = {
                height: P.height * G.from.y,
                width: P.width * G.from.x,
                outerHeight: P.outerHeight * G.from.y,
                outerWidth: P.outerWidth * G.from.x
            }, S.to = {
                height: P.height * G.to.y,
                width: P.width * G.to.x,
                outerHeight: P.height * G.to.y,
                outerWidth: P.width * G.to.x
            }, G.from.y !== G.to.y && (S.from = e.effects.setTransition(S, K, G.from.y, S.from), S.to = e.effects.setTransition(S, K, G.to.y, S.to)), G.from.x !== G.to.x && (S.from = e.effects.setTransition(S, J, G.from.x, S.from), S.to = e.effects.setTransition(S, J, G.to.x, S.to)), S.css(S.from), S.animate(S.to, D.duration, D.easing, function () {
                L && e.effects.restore(S, k)
            })
        })), x.animate(x.to, {
            queue: !1,
            duration: D.duration,
            easing: D.easing,
            complete: function () {
                0 === x.to.opacity && x.css("opacity", x.from.opacity), "hide" === A && x.hide(), e.effects.restore(x, I), L || ("static" === F ? x.css({
                    position: "relative",
                    top: x.to.top,
                    left: x.to.left
                }) : e.each(["top", "left"], function (P, S) {
                    x.css(S, function (V, W) {
                        var U = parseInt(W, 10),
                                T = P ? x.to.left : x.to.top;
                        return "auto" === W ? T + "px" : U + T + "px"
                    })
                })), e.effects.removeWrapper(x), O()
            }
        })
    }, e.effects.effect.scale = function (F, x) {
        var D = e(this),
                B = e.extend(!0, {}, F),
                q = e.effects.setMode(D, F.mode || "effect"),
                C = parseInt(F.percent, 10) || (0 === parseInt(F.percent, 10) ? 0 : "hide" === q ? 0 : 100),
                E = F.direction || "both",
                w = F.origin,
                A = {
                    height: D.height(),
                    width: D.width(),
                    outerHeight: D.outerHeight(),
                    outerWidth: D.outerWidth()
                },
        k = {
            y: "horizontal" !== E ? C / 100 : 1,
            x: "vertical" !== E ? C / 100 : 1
        };
        B.effect = "size", B.queue = !1, B.complete = x, "effect" !== q && (B.origin = w || ["middle", "center"], B.restore = !0), B.from = F.from || ("show" === q ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : A), B.to = {
            height: A.height * k.y,
            width: A.width * k.x,
            outerHeight: A.outerHeight * k.y,
            outerWidth: A.outerWidth * k.x
        }, B.fade && ("show" === q && (B.from.opacity = 0, B.to.opacity = 1), "hide" === q && (B.from.opacity = 1, B.to.opacity = 0)), D.effect(B)
    }, e.effects.effect.puff = function (C, D) {
        var A = e(this),
                q = e.effects.setMode(A, C.mode || "hide"),
                k = "hide" === q,
                w = parseInt(C.percent, 10) || 150,
                x = w / 100,
                B = {
                    height: A.height(),
                    width: A.width(),
                    outerHeight: A.outerHeight(),
                    outerWidth: A.outerWidth()
                };
        e.extend(C, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: q,
            complete: D,
            percent: k ? w : 100,
            from: k ? B : {
                height: B.height * x,
                width: B.width * x,
                outerHeight: B.outerHeight * x,
                outerWidth: B.outerWidth * x
            }
        }), A.effect(C)
    }, e.effects.effect.pulsate = function (w, I) {
        var q, D = e(this),
                A = e.effects.setMode(D, w.mode || "show"),
                E = "show" === A,
                H = "hide" === A,
                G = E || "hide" === A,
                k = 2 * (w.times || 5) + (G ? 1 : 0),
                x = w.duration / k,
                C = 0,
                B = D.queue(),
                F = B.length;
        for ((E || !D.is(":visible")) && (D.css("opacity", 0).show(), C = 1), q = 1; k > q; q++) {
            D.animate({
                opacity: C
            }, x, w.easing), C = 1 - C
        }
        D.animate({
            opacity: C
        }, x, w.easing), D.queue(function () {
            H && D.hide(), I()
        }), F > 1 && B.splice.apply(B, [1, 0].concat(B.splice(F, k + 1))), D.dequeue()
    }, e.effects.effect.shake = function (E, k) {
        var D, x = e(this),
                G = ["position", "top", "bottom", "left", "right", "height", "width"],
                A = e.effects.setMode(x, E.mode || "effect"),
                C = E.direction || "left",
                N = E.distance || 20,
                q = E.times || 3,
                F = 2 * q + 1,
                J = Math.round(E.duration / F),
                I = "up" === C || "down" === C ? "top" : "left",
                B = "up" === C || "left" === C,
                L = {},
                w = {},
                M = {},
                H = x.queue(),
                K = H.length;
        for (e.effects.save(x, G), x.show(), e.effects.createWrapper(x), L[I] = (B ? "-=" : "+=") + N, w[I] = (B ? "+=" : "-=") + 2 * N, M[I] = (B ? "-=" : "+=") + 2 * N, x.animate(L, J, E.easing), D = 1; q > D; D++) {
            x.animate(w, J, E.easing).animate(M, J, E.easing)
        }
        x.animate(w, J, E.easing).animate(L, J / 2, E.easing).queue(function () {
            "hide" === A && x.hide(), e.effects.restore(x, G), e.effects.removeWrapper(x), k()
        }), K > 1 && H.splice.apply(H, [1, 0].concat(H.splice(K, F + 1))), x.dequeue()
    }, e.effects.effect.slide = function (x, A) {
        var w, C = e(this),
                G = ["position", "top", "bottom", "left", "right", "width", "height"],
                D = e.effects.setMode(C, x.mode || "show"),
                F = "show" === D,
                q = x.direction || "left",
                B = "up" === q || "down" === q ? "top" : "left",
                E = "up" === q || "left" === q,
                k = {};
        e.effects.save(C, G), C.show(), w = x.distance || C["top" === B ? "outerHeight" : "outerWidth"](!0), e.effects.createWrapper(C).css({
            overflow: "hidden"
        }), F && C.css(B, E ? isNaN(w) ? "-" + w : -w : w), k[B] = (F ? E ? "+=" : "-=" : E ? "-=" : "+=") + w, C.animate(k, {
            queue: !1,
            duration: x.duration,
            easing: x.easing,
            complete: function () {
                "hide" === D && C.hide(), e.effects.restore(C, G), e.effects.removeWrapper(C), A()
            }
        })
    }, e.effects.effect.transfer = function (x, q) {
        var w = e(this),
                D = e(x.to),
                B = "fixed" === D.css("position"),
                E = e("body"),
                G = B ? E.scrollTop() : 0,
                k = B ? E.scrollLeft() : 0,
                C = D.offset(),
                A = {
                    top: C.top - G,
                    left: C.left - k,
                    height: D.innerHeight(),
                    width: D.innerWidth()
                },
        H = w.offset(),
                F = e("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(x.className).css({
            top: H.top - G,
            left: H.left - k,
            height: w.innerHeight(),
            width: w.innerWidth(),
            position: B ? "fixed" : "absolute"
        }).animate(A, x.duration, x.easing, function () {
            F.remove(), q()
        })
    }, e.widget("ui.progressbar", {
        version: "1.11.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function () {
            this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }), this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
        },
        _destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
        },
        value: function (k) {
            return void 0 === k ? this.options.value : (this.options.value = this._constrainedValue(k), this._refreshValue(), void 0)
        },
        _constrainedValue: function (k) {
            return void 0 === k && (k = this.options.value), this.indeterminate = k === !1, "number" != typeof k && (k = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, k))
        },
        _setOptions: function (k) {
            var q = k.value;
            delete k.value, this._super(k), this.options.value = this._constrainedValue(q), this._refreshValue()
        },
        _setOption: function (k, q) {
            "max" === k && (q = Math.max(this.min, q)), "disabled" === k && this.element.toggleClass("ui-state-disabled", !!q).attr("aria-disabled", q), this._super(k, q)
        },
        _percentage: function () {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function () {
            var k = this.options.value,
                    q = this._percentage();
            this.valueDiv.toggle(this.indeterminate || k > this.min).toggleClass("ui-corner-right", k === this.options.max).width(q.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = e("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": k
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== k && (this.oldValue = k, this._trigger("change")), k === this.options.max && this._trigger("complete")
        }
    }), e.widget("ui.selectable", e.ui.mouse, {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function () {
            var k, q = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
                k = e(q.options.filter, q.element[0]), k.addClass("ui-selectee"), k.each(function () {
                    var w = e(this),
                            x = w.offset();
                    e.data(this, "selectable-item", {
                        element: this,
                        $element: w,
                        left: x.left,
                        top: x.top,
                        right: x.left + w.outerWidth(),
                        bottom: x.top + w.outerHeight(),
                        startselected: !1,
                        selected: w.hasClass("ui-selected"),
                        selecting: w.hasClass("ui-selecting"),
                        unselecting: w.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = k.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function (k) {
            var q = this,
                    w = this.options;
            this.opos = [k.pageX, k.pageY], this.options.disabled || (this.selectees = e(w.filter, this.element[0]), this._trigger("start", k), e(w.appendTo).append(this.helper), this.helper.css({
                left: k.pageX,
                top: k.pageY,
                width: 0,
                height: 0
            }), w.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                var x = e.data(this, "selectable-item");
                x.startselected = !0, k.metaKey || k.ctrlKey || (x.$element.removeClass("ui-selected"), x.selected = !1, x.$element.addClass("ui-unselecting"), x.unselecting = !0, q._trigger("unselecting", k, {
                    unselecting: x.element
                }))
            }), e(k.target).parents().addBack().each(function () {
                var A, x = e.data(this, "selectable-item");
                return x ? (A = !k.metaKey && !k.ctrlKey || !x.$element.hasClass("ui-selected"), x.$element.removeClass(A ? "ui-unselecting" : "ui-selected").addClass(A ? "ui-selecting" : "ui-unselecting"), x.unselecting = !A, x.selecting = A, x.selected = A, A ? q._trigger("selecting", k, {
                    selecting: x.element
                }) : q._trigger("unselecting", k, {
                    unselecting: x.element
                }), !1) : void 0
            }))
        },
        _mouseDrag: function (C) {
            if (this.dragged = !0, !this.options.disabled) {
                var D, A = this,
                        q = this.options,
                        k = this.opos[0],
                        w = this.opos[1],
                        x = C.pageX,
                        B = C.pageY;
                return k > x && (D = x, x = k, k = D), w > B && (D = B, B = w, w = D), this.helper.css({
                    left: k,
                    top: w,
                    width: x - k,
                    height: B - w
                }), this.selectees.each(function () {
                    var F = e.data(this, "selectable-item"),
                            E = !1;
                    F && F.element !== A.element[0] && ("touch" === q.tolerance ? E = !(F.left > x || k > F.right || F.top > B || w > F.bottom) : "fit" === q.tolerance && (E = F.left > k && x > F.right && F.top > w && B > F.bottom), E ? (F.selected && (F.$element.removeClass("ui-selected"), F.selected = !1), F.unselecting && (F.$element.removeClass("ui-unselecting"), F.unselecting = !1), F.selecting || (F.$element.addClass("ui-selecting"), F.selecting = !0, A._trigger("selecting", C, {
                        selecting: F.element
                    }))) : (F.selecting && ((C.metaKey || C.ctrlKey) && F.startselected ? (F.$element.removeClass("ui-selecting"), F.selecting = !1, F.$element.addClass("ui-selected"), F.selected = !0) : (F.$element.removeClass("ui-selecting"), F.selecting = !1, F.startselected && (F.$element.addClass("ui-unselecting"), F.unselecting = !0), A._trigger("unselecting", C, {
                        unselecting: F.element
                    }))), F.selected && (C.metaKey || C.ctrlKey || F.startselected || (F.$element.removeClass("ui-selected"), F.selected = !1, F.$element.addClass("ui-unselecting"), F.unselecting = !0, A._trigger("unselecting", C, {
                        unselecting: F.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function (k) {
            var q = this;
            return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function () {
                var w = e.data(this, "selectable-item");
                w.$element.removeClass("ui-unselecting"), w.unselecting = !1, w.startselected = !1, q._trigger("unselected", k, {
                    unselected: w.element
                })
            }), e(".ui-selecting", this.element[0]).each(function () {
                var w = e.data(this, "selectable-item");
                w.$element.removeClass("ui-selecting").addClass("ui-selected"), w.selecting = !1, w.selected = !0, w.startselected = !0, q._trigger("selected", k, {
                    selected: w.element
                })
            }), this._trigger("stop", k), this.helper.remove(), !1
        }
    }), e.widget("ui.selectmenu", {
        version: "1.11.4",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function () {
            var k = this.element.uniqueId().attr("id");
            this.ids = {
                element: k,
                button: k + "-button",
                menu: k + "-menu"
            }, this._drawButton(), this._drawMenu(), this.options.disabled && this.disable()
        },
        _drawButton: function () {
            var k = this;
            this.label = e("label[for='" + this.ids.element + "']").attr("for", this.ids.button), this._on(this.label, {
                click: function (q) {
                    this.button.focus(), q.preventDefault()
                }
            }), this.element.hide(), this.button = e("<span>", {
                "class": "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true"
            }).insertAfter(this.element), e("<span>", {
                "class": "ui-icon " + this.options.icons.button
            }).prependTo(this.button), this.buttonText = e("<span>", {
                "class": "ui-selectmenu-text"
            }).appendTo(this.button), this._setText(this.buttonText, this.element.find("option:selected").text()), this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
                k.menuItems || k._refreshMenu()
            }), this._hoverable(this.button), this._focusable(this.button)
        },
        _drawMenu: function () {
            var k = this;
            this.menu = e("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            }), this.menuWrap = e("<div>", {
                "class": "ui-selectmenu-menu ui-front"
            }).append(this.menu).appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                role: "listbox",
                select: function (w, q) {
                    w.preventDefault(), k._setSelection(), k._select(q.item.data("ui-selectmenu-item"), w)
                },
                focus: function (w, q) {
                    var x = q.item.data("ui-selectmenu-item");
                    null != k.focusIndex && x.index !== k.focusIndex && (k._trigger("focus", w, {
                        item: x
                    }), k.isOpen || k._select(x, w)), k.focusIndex = x.index, k.button.attr("aria-activedescendant", k.menuItems.eq(x.index).attr("id"))
                }
            }).menu("instance"), this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
                return !1
            }, this.menuInstance._isDivider = function () {
                return !1
            }
        },
        refresh: function () {
            this._refreshMenu(), this._setText(this.buttonText, this._getSelectedItem().text()), this.options.width || this._resizeButton()
        },
        _refreshMenu: function () {
            this.menu.empty();
            var k, q = this.element.find("option");
            q.length && (this._parseOptions(q), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup"), k = this._getSelectedItem(), this.menuInstance.focus(null, k), this._setAria(k.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function (k) {
            this.options.disabled || (this.menuItems ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", k))
        },
        _position: function () {
            this.menuWrap.position(e.extend({
                of: this.button
            }, this.options.position))
        },
        close: function (k) {
            this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", k))
        },
        widget: function () {
            return this.button
        },
        menuWidget: function () {
            return this.menu
        },
        _renderMenu: function (k, q) {
            var x = this,
                    w = "";
            e.each(q, function (A, B) {
                B.optgroup !== w && (e("<li>", {
                    "class": "ui-selectmenu-optgroup ui-menu-divider" + (B.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : ""),
                    text: B.optgroup
                }).appendTo(k), w = B.optgroup), x._renderItemData(k, B)
            })
        },
        _renderItemData: function (k, q) {
            return this._renderItem(k, q).data("ui-selectmenu-item", q)
        },
        _renderItem: function (k, q) {
            var w = e("<li>");
            return q.disabled && w.addClass("ui-state-disabled"), this._setText(w, q.label), w.appendTo(k)
        },
        _setText: function (k, q) {
            q ? k.text(q) : k.html("&#160;")
        },
        _move: function (x, k) {
            var q, A, w = ".ui-menu-item";
            this.isOpen ? q = this.menuItems.eq(this.focusIndex) : (q = this.menuItems.eq(this.element[0].selectedIndex), w += ":not(.ui-state-disabled)"), A = "first" === x || "last" === x ? q["first" === x ? "prevAll" : "nextAll"](w).eq(-1) : q[x + "All"](w).eq(0), A.length && this.menuInstance.focus(k, A)
        },
        _getSelectedItem: function () {
            return this.menuItems.eq(this.element[0].selectedIndex)
        },
        _toggle: function (k) {
            this[this.isOpen ? "close" : "open"](k)
        },
        _setSelection: function () {
            var k;
            this.range && (window.getSelection ? (k = window.getSelection(), k.removeAllRanges(), k.addRange(this.range)) : this.range.select(), this.button.focus())
        },
        _documentClick: {
            mousedown: function (k) {
                this.isOpen && (e(k.target).closest(".ui-selectmenu-menu, #" + this.ids.button).length || this.close(k))
            }
        },
        _buttonEvents: {
            mousedown: function () {
                var k;
                window.getSelection ? (k = window.getSelection(), k.rangeCount && (this.range = k.getRangeAt(0))) : this.range = document.selection.createRange()
            },
            click: function (k) {
                this._setSelection(), this._toggle(k)
            },
            keydown: function (k) {
                var q = !0;
                switch (k.keyCode) {
                    case e.ui.keyCode.TAB:
                    case e.ui.keyCode.ESCAPE:
                        this.close(k), q = !1;
                        break;
                    case e.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(k);
                        break;
                    case e.ui.keyCode.UP:
                        k.altKey ? this._toggle(k) : this._move("prev", k);
                        break;
                    case e.ui.keyCode.DOWN:
                        k.altKey ? this._toggle(k) : this._move("next", k);
                        break;
                    case e.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(k) : this._toggle(k);
                        break;
                    case e.ui.keyCode.LEFT:
                        this._move("prev", k);
                        break;
                    case e.ui.keyCode.RIGHT:
                        this._move("next", k);
                        break;
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.PAGE_UP:
                        this._move("first", k);
                        break;
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_DOWN:
                        this._move("last", k);
                        break;
                    default:
                        this.menu.trigger(k), q = !1
                }
                q && k.preventDefault()
            }
        },
        _selectFocusedItem: function (k) {
            var q = this.menuItems.eq(this.focusIndex);
            q.hasClass("ui-state-disabled") || this._select(q.data("ui-selectmenu-item"), k)
        },
        _select: function (w, k) {
            var q = this.element[0].selectedIndex;
            this.element[0].selectedIndex = w.index, this._setText(this.buttonText, w.label), this._setAria(w), this._trigger("select", k, {
                item: w
            }), w.index !== q && this._trigger("change", k, {
                item: w
            }), this.close(k)
        },
        _setAria: function (k) {
            var q = this.menuItems.eq(k.index).attr("id");
            this.button.attr({
                "aria-labelledby": q,
                "aria-activedescendant": q
            }), this.menu.attr("aria-activedescendant", q)
        },
        _setOption: function (k, q) {
            "icons" === k && this.button.find("span.ui-icon").removeClass(this.options.icons.button).addClass(q.button), this._super(k, q), "appendTo" === k && this.menuWrap.appendTo(this._appendTo()), "disabled" === k && (this.menuInstance.option("disabled", q), this.button.toggleClass("ui-state-disabled", q).attr("aria-disabled", q), this.element.prop("disabled", q), q ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)), "width" === k && this._resizeButton()
        },
        _appendTo: function () {
            var k = this.options.appendTo;
            return k && (k = k.jquery || k.nodeType ? e(k) : this.document.find(k).eq(0)), k && k[0] || (k = this.element.closest(".ui-front")), k.length || (k = this.document[0].body), k
        },
        _toggleAttr: function () {
            this.button.toggleClass("ui-corner-top", this.isOpen).toggleClass("ui-corner-all", !this.isOpen).attr("aria-expanded", this.isOpen), this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function () {
            var k = this.options.width;
            k || (k = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(k)
        },
        _resizeMenu: function () {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function () {
            return {
                disabled: this.element.prop("disabled")
            }
        },
        _parseOptions: function (k) {
            var q = [];
            k.each(function (A, x) {
                var w = e(x),
                        B = w.parent("optgroup");
                q.push({
                    element: w,
                    index: A,
                    value: w.val(),
                    label: w.text(),
                    optgroup: B.attr("label") || "",
                    disabled: B.prop("disabled") || w.prop("disabled")
                })
            }), this.items = q
        },
        _destroy: function () {
            this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.label.attr("for", this.ids.element)
        }
    }), e.widget("ui.slider", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var A, B, x = this.options,
                    q = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    k = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",
                    w = [];
            for (B = x.values && x.values.length || 1, q.length > B && (q.slice(B).remove(), q = q.slice(0, B)), A = q.length; B > A; A++) {
                w.push(k)
            }
            this.handles = q.add(e(w.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function (C) {
                e(this).data("ui-slider-handle-index", C)
            })
        },
        _createRange: function () {
            var k = this.options,
                    q = "";
            k.range ? (k.range === !0 && (k.values ? k.values.length && 2 !== k.values.length ? k.values = [k.values[0], k.values[0]] : e.isArray(k.values) && (k.values = k.values.slice(0)) : k.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = e("<div></div>").appendTo(this.element), q = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(q + ("min" === k.range || "max" === k.range ? " ui-slider-range-" + k.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function () {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
        },
        _mouseCapture: function (x) {
            var A, w, C, G, D, F, q, B, E = this,
                    k = this.options;
            return k.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), A = {
                x: x.pageX,
                y: x.pageY
            }, w = this._normValueFromMouse(A), C = this._valueMax() - this._valueMin() + 1, this.handles.each(function (I) {
                var H = Math.abs(w - E.values(I));
                (C > H || C === H && (I === E._lastChangedValue || E.values(I) === k.min)) && (C = H, G = e(this), D = I)
            }), F = this._start(x, D), F === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = D, G.addClass("ui-state-active").focus(), q = G.offset(), B = !e(x.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = B ? {
                left: 0,
                top: 0
            } : {
                left: x.pageX - q.left - G.width() / 2,
                top: x.pageY - q.top - G.height() / 2 - (parseInt(G.css("borderTopWidth"), 10) || 0) - (parseInt(G.css("borderBottomWidth"), 10) || 0) + (parseInt(G.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(x, D, w), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (w) {
            var k = {
                x: w.pageX,
                y: w.pageY
            },
            q = this._normValueFromMouse(k);
            return this._slide(w, this._handleIndex, q), !1
        },
        _mouseStop: function (k) {
            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(k, this._handleIndex), this._change(k, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (w) {
            var A, B, x, q, k;
            return "horizontal" === this.orientation ? (A = this.elementSize.width, B = w.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (A = this.elementSize.height, B = w.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), x = B / A, x > 1 && (x = 1), 0 > x && (x = 0), "vertical" === this.orientation && (x = 1 - x), q = this._valueMax() - this._valueMin(), k = this._valueMin() + x * q, this._trimAlignValue(k)
        },
        _start: function (w, k) {
            var q = {
                handle: this.handles[k],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (q.value = this.values(k), q.values = this.values()), this._trigger("start", w, q)
        },
        _slide: function (w, A, B) {
            var x, q, k;
            this.options.values && this.options.values.length ? (x = this.values(A ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === A && B > x || 1 === A && x > B) && (B = x), B !== this.values(A) && (q = this.values(), q[A] = B, k = this._trigger("slide", w, {
                handle: this.handles[A],
                value: B,
                values: q
            }), x = this.values(A ? 0 : 1), k !== !1 && this.values(A, B))) : B !== this.value() && (k = this._trigger("slide", w, {
                handle: this.handles[A],
                value: B
            }), k !== !1 && this.value(B))
        },
        _stop: function (w, k) {
            var q = {
                handle: this.handles[k],
                value: this.value()
            };
            this.options.values && this.options.values.length && (q.value = this.values(k), q.values = this.values()), this._trigger("stop", w, q)
        },
        _change: function (w, k) {
            if (!this._keySliding && !this._mouseSliding) {
                var q = {
                    handle: this.handles[k],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (q.value = this.values(k), q.values = this.values()), this._lastChangedValue = k, this._trigger("change", w, q)
            }
        },
        value: function (k) {
            return arguments.length ? (this.options.value = this._trimAlignValue(k), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function (x, A) {
            var w, q, k;
            if (arguments.length > 1) {
                return this.options.values[x] = this._trimAlignValue(A), this._refreshValue(), this._change(null, x), void 0
            }
            if (!arguments.length) {
                return this._values()
            }
            if (!e.isArray(arguments[0])) {
                return this.options.values && this.options.values.length ? this._values(x) : this.value()
            }
            for (w = this.options.values, q = arguments[0], k = 0; w.length > k; k += 1) {
                w[k] = this._trimAlignValue(q[k]), this._change(null, k)
            }
            this._refreshValue()
        },
        _setOption: function (k, q) {
            var x, w = 0;
            switch ("range" === k && this.options.range === !0 && ("min" === q ? (this.options.value = this._values(0), this.options.values = null) : "max" === q && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), e.isArray(this.options.values) && (w = this.options.values.length), "disabled" === k && this.element.toggleClass("ui-state-disabled", !!q), this._super(k, q), k) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === q ? "bottom" : "left", "");
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), x = 0; w > x; x += 1) {
                        this._change(null, x)
                    }
                    this._animateOff = !1;
                    break;
                case "step":
                case "min":
                case "max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function () {
            var k = this.options.value;
            return k = this._trimAlignValue(k)
        },
        _values: function (w) {
            var k, q, x;
            if (arguments.length) {
                return k = this.options.values[w], k = this._trimAlignValue(k)
            }
            if (this.options.values && this.options.values.length) {
                for (q = this.options.values.slice(), x = 0; q.length > x; x += 1) {
                    q[x] = this._trimAlignValue(q[x])
                }
                return q
            }
            return []
        },
        _trimAlignValue: function (w) {
            if (this._valueMin() >= w) {
                return this._valueMin()
            }
            if (w >= this._valueMax()) {
                return this._valueMax()
            }
            var k = this.options.step > 0 ? this.options.step : 1,
                    q = (w - this._valueMin()) % k,
                    x = w - q;
            return 2 * Math.abs(q) >= k && (x += q > 0 ? k : -k), parseFloat(x.toFixed(5))
        },
        _calculateNewMax: function () {
            var w = this.options.max,
                    k = this._valueMin(),
                    q = this.options.step,
                    x = Math.floor(+(w - k).toFixed(this._precision()) / q) * q;
            w = x + k, this.max = parseFloat(w.toFixed(this._precision()))
        },
        _precision: function () {
            var k = this._precisionOf(this.options.step);
            return null !== this.options.min && (k = Math.max(k, this._precisionOf(this.options.min))), k
        },
        _precisionOf: function (w) {
            var k = "" + w,
                    q = k.indexOf(".");
            return -1 === q ? 0 : k.length - q - 1
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.max
        },
        _refreshValue: function () {
            var F, x, D, B, q, C = this.options.range,
                    E = this.options,
                    w = this,
                    A = this._animateOff ? !1 : E.animate,
                    k = {};
            this.options.values && this.options.values.length ? this.handles.each(function (G) {
                x = 100 * ((w.values(G) - w._valueMin()) / (w._valueMax() - w._valueMin())), k["horizontal" === w.orientation ? "left" : "bottom"] = x + "%", e(this).stop(1, 1)[A ? "animate" : "css"](k, E.animate), w.options.range === !0 && ("horizontal" === w.orientation ? (0 === G && w.range.stop(1, 1)[A ? "animate" : "css"]({
                    left: x + "%"
                }, E.animate), 1 === G && w.range[A ? "animate" : "css"]({
                    width: x - F + "%"
                }, {
                    queue: !1,
                    duration: E.animate
                })) : (0 === G && w.range.stop(1, 1)[A ? "animate" : "css"]({
                    bottom: x + "%"
                }, E.animate), 1 === G && w.range[A ? "animate" : "css"]({
                    height: x - F + "%"
                }, {
                    queue: !1,
                    duration: E.animate
                }))), F = x
            }) : (D = this.value(), B = this._valueMin(), q = this._valueMax(), x = q !== B ? 100 * ((D - B) / (q - B)) : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = x + "%", this.handle.stop(1, 1)[A ? "animate" : "css"](k, E.animate), "min" === C && "horizontal" === this.orientation && this.range.stop(1, 1)[A ? "animate" : "css"]({
                width: x + "%"
            }, E.animate), "max" === C && "horizontal" === this.orientation && this.range[A ? "animate" : "css"]({
                width: 100 - x + "%"
            }, {
                queue: !1,
                duration: E.animate
            }), "min" === C && "vertical" === this.orientation && this.range.stop(1, 1)[A ? "animate" : "css"]({
                height: x + "%"
            }, E.animate), "max" === C && "vertical" === this.orientation && this.range[A ? "animate" : "css"]({
                height: 100 - x + "%"
            }, {
                queue: !1,
                duration: E.animate
            }))
        },
        _handleEvents: {
            keydown: function (A) {
                var B, x, q, k, w = e(A.target).data("ui-slider-handle-index");
                switch (A.keyCode) {
                    case e.ui.keyCode.HOME:
                    case e.ui.keyCode.END:
                    case e.ui.keyCode.PAGE_UP:
                    case e.ui.keyCode.PAGE_DOWN:
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (A.preventDefault(), !this._keySliding && (this._keySliding = !0, e(A.target).addClass("ui-state-active"), B = this._start(A, w), B === !1)) {
                            return
                        }
                }
                switch (k = this.options.step, x = q = this.options.values && this.options.values.length ? this.values(w) : this.value(), A.keyCode) {
                    case e.ui.keyCode.HOME:
                        q = this._valueMin();
                        break;
                    case e.ui.keyCode.END:
                        q = this._valueMax();
                        break;
                    case e.ui.keyCode.PAGE_UP:
                        q = this._trimAlignValue(x + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.PAGE_DOWN:
                        q = this._trimAlignValue(x - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.RIGHT:
                        if (x === this._valueMax()) {
                            return
                        }
                        q = this._trimAlignValue(x + k);
                        break;
                    case e.ui.keyCode.DOWN:
                    case e.ui.keyCode.LEFT:
                        if (x === this._valueMin()) {
                            return
                        }
                        q = this._trimAlignValue(x - k)
                }
                this._slide(A, w, q)
            },
            keyup: function (k) {
                var q = e(k.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(k, q), this._change(k, q), e(k.target).removeClass("ui-state-active"))
            }
        }
    }), e.widget("ui.sortable", e.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function (w, k, q) {
            return w >= k && k + q > w
        },
        _isFloating: function (k) {
            return /left|right/.test(k.css("float")) || /inline|table-cell/.test(k.css("display"))
        },
        _create: function () {
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
        },
        _setOption: function (k, q) {
            this._super(k, q), "handle" === k && this._setHandleClassName()
        },
        _setHandleClassName: function () {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), e.each(this.items, function () {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
            for (var k = this.items.length - 1; k >= 0; k--) {
                this.items[k].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _mouseCapture: function (x, A) {
            var w = null,
                    q = !1,
                    k = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(x), e(x.target).parents().each(function () {
                return e.data(this, k.widgetName + "-item") === k ? (w = e(this), !1) : void 0
            }), e.data(x.target, k.widgetName + "-item") === k && (w = e(x.target)), w ? !this.options.handle || A || (e(this.options.handle, w).find("*").addBack().each(function () {
                this === x.target && (q = !0)
            }), q) ? (this.currentItem = w, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function (A, B, x) {
            var q, k, w = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(A), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, e.extend(this.offset, {
                click: {
                    left: A.pageX - this.offset.left,
                    top: A.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(A), this.originalPageX = A.pageX, this.originalPageY = A.pageY, w.cursorAt && this._adjustOffsetFromHelper(w.cursorAt), this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), w.containment && this._setContainment(), w.cursor && "auto" !== w.cursor && (k = this.document.find("body"), this.storedCursor = k.css("cursor"), k.css("cursor", w.cursor), this.storedStylesheet = e("<style>*{ cursor: " + w.cursor + " !important; }</style>").appendTo(k)), w.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", w.opacity)), w.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", w.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", A, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !x) {
                for (q = this.containers.length - 1; q >= 0; q--) {
                    this.containers[q]._trigger("activate", A, this._uiHash(this))
                }
            }
            return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !w.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, A), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(A), !0
        },
        _mouseDrag: function (B) {
            var C, A, q, k, w = this.options,
                    x = !1;
            for (this.position = this._generatePosition(B), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - B.pageY < w.scrollSensitivity ? this.scrollParent[0].scrollTop = x = this.scrollParent[0].scrollTop + w.scrollSpeed : B.pageY - this.overflowOffset.top < w.scrollSensitivity && (this.scrollParent[0].scrollTop = x = this.scrollParent[0].scrollTop - w.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - B.pageX < w.scrollSensitivity ? this.scrollParent[0].scrollLeft = x = this.scrollParent[0].scrollLeft + w.scrollSpeed : B.pageX - this.overflowOffset.left < w.scrollSensitivity && (this.scrollParent[0].scrollLeft = x = this.scrollParent[0].scrollLeft - w.scrollSpeed)) : (B.pageY - this.document.scrollTop() < w.scrollSensitivity ? x = this.document.scrollTop(this.document.scrollTop() - w.scrollSpeed) : this.window.height() - (B.pageY - this.document.scrollTop()) < w.scrollSensitivity && (x = this.document.scrollTop(this.document.scrollTop() + w.scrollSpeed)), B.pageX - this.document.scrollLeft() < w.scrollSensitivity ? x = this.document.scrollLeft(this.document.scrollLeft() - w.scrollSpeed) : this.window.width() - (B.pageX - this.document.scrollLeft()) < w.scrollSensitivity && (x = this.document.scrollLeft(this.document.scrollLeft() + w.scrollSpeed))), x !== !1 && e.ui.ddmanager && !w.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, B)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), C = this.items.length - 1; C >= 0; C--) {
                if (A = this.items[C], q = A.item[0], k = this._intersectsWithPointer(A), k && A.instance === this.currentContainer && q !== this.currentItem[0] && this.placeholder[1 === k ? "next" : "prev"]()[0] !== q && !e.contains(this.placeholder[0], q) && ("semi-dynamic" === this.options.type ? !e.contains(this.element[0], q) : !0)) {
                    if (this.direction = 1 === k ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(A)) {
                        break
                    }
                    this._rearrange(B, A), this._trigger("change", B, this._uiHash());
                    break
                }
            }
            return this._contactContainers(B), e.ui.ddmanager && e.ui.ddmanager.drag(this, B), this._trigger("sort", B, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (A, B) {
            if (A) {
                if (e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, A), this.options.revert) {
                    var x = this,
                            q = this.placeholder.offset(),
                            k = this.options.axis,
                            w = {};
                    k && "x" !== k || (w.left = q.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), k && "y" !== k || (w.top = q.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, e(this.helper).animate(w, parseInt(this.options.revert, 10) || 500, function () {
                        x._clear(A)
                    })
                } else {
                    this._clear(A, B)
                }
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var k = this.containers.length - 1; k >= 0; k--) {
                    this.containers[k]._trigger("deactivate", null, this._uiHash(this)), this.containers[k].containerCache.over && (this.containers[k]._trigger("out", null, this._uiHash(this)), this.containers[k].containerCache.over = 0)
                }
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (k) {
            var q = this._getItemsAsjQuery(k && k.connected),
                    w = [];
            return k = k || {}, e(q).each(function () {
                var x = (e(k.item || this).attr(k.attribute || "id") || "").match(k.expression || /(.+)[\-=_](.+)/);
                x && w.push((k.key || x[1] + "[]") + "=" + (k.key && k.expression ? x[1] : x[2]))
            }), !w.length && k.key && w.push(k.key + "="), w.join("&")
        },
        toArray: function (k) {
            var q = this._getItemsAsjQuery(k && k.connected),
                    w = [];
            return k = k || {}, q.each(function () {
                w.push(e(k.item || this).attr(k.attribute || "id") || "")
            }), w
        },
        _intersectsWith: function (D) {
            var q = this.positionAbs.left,
                    H = q + this.helperProportions.width,
                    k = this.positionAbs.top,
                    x = k + this.helperProportions.height,
                    A = D.left,
                    F = A + D.width,
                    I = D.top,
                    E = I + D.height,
                    J = this.offset.click.top,
                    w = this.offset.click.left,
                    C = "x" === this.options.axis || k + J > I && E > k + J,
                    B = "y" === this.options.axis || q + w > A && F > q + w,
                    G = C && B;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > D[this.floating ? "width" : "height"] ? G : q + this.helperProportions.width / 2 > A && F > H - this.helperProportions.width / 2 && k + this.helperProportions.height / 2 > I && E > x - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function (w) {
            var A = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, w.top, w.height),
                    B = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, w.left, w.width),
                    x = A && B,
                    q = this._getDragVerticalDirection(),
                    k = this._getDragHorizontalDirection();
            return x ? this.floating ? k && "right" === k || "down" === q ? 2 : 1 : q && ("down" === q ? 2 : 1) : !1
        },
        _intersectsWithSides: function (x) {
            var k = this._isOverAxis(this.positionAbs.top + this.offset.click.top, x.top + x.height / 2, x.height),
                    q = this._isOverAxis(this.positionAbs.left + this.offset.click.left, x.left + x.width / 2, x.width),
                    A = this._getDragVerticalDirection(),
                    w = this._getDragHorizontalDirection();
            return this.floating && w ? "right" === w && q || "left" === w && !q : A && ("down" === A && k || "up" === A && !k)
        },
        _getDragVerticalDirection: function () {
            var k = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== k && (k > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var k = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== k && (k > 0 ? "right" : "left")
        },
        refresh: function (k) {
            return this._refreshItems(k), this._setHandleClassName(), this.refreshPositions(), this
        },
        _connectWith: function () {
            var k = this.options;
            return k.connectWith.constructor === String ? [k.connectWith] : k.connectWith
        },
        _getItemsAsjQuery: function (k) {
            function x() {
                D.push(this)
            }
            var E, B, q, C, D = [],
                    w = [],
                    A = this._connectWith();
            if (A && k) {
                for (E = A.length - 1; E >= 0; E--) {
                    for (q = e(A[E], this.document[0]), B = q.length - 1; B >= 0; B--) {
                        C = e.data(q[B], this.widgetFullName), C && C !== this && !C.options.disabled && w.push([e.isFunction(C.options.items) ? C.options.items.call(C.element) : e(C.options.items, C.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), C])
                    }
                }
            }
            for (w.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), E = w.length - 1; E >= 0; E--) {
                w[E][0].each(x)
            }
            return e(D)
        },
        _removeCurrentsFromItems: function () {
            var k = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = e.grep(this.items, function (w) {
                for (var q = 0; k.length > q; q++) {
                    if (k[q] === w.item[0]) {
                        return !1
                    }
                }
                return !0
            })
        },
        _refreshItems: function (x) {
            this.items = [], this.containers = [this];
            var q, w, D, B, E, G, k, C, A = this.items,
                    H = [
                        [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], x, {
                                item: this.currentItem
                            }) : e(this.options.items, this.element), this]
                    ],
                    F = this._connectWith();
            if (F && this.ready) {
                for (q = F.length - 1; q >= 0; q--) {
                    for (D = e(F[q], this.document[0]), w = D.length - 1; w >= 0; w--) {
                        B = e.data(D[w], this.widgetFullName), B && B !== this && !B.options.disabled && (H.push([e.isFunction(B.options.items) ? B.options.items.call(B.element[0], x, {
                                item: this.currentItem
                            }) : e(B.options.items, B.element), B]), this.containers.push(B))
                    }
                }
            }
            for (q = H.length - 1; q >= 0; q--) {
                for (E = H[q][1], G = H[q][0], w = 0, C = G.length; C > w; w++) {
                    k = e(G[w]), k.data(this.widgetName + "-item", E), A.push({
                        item: k,
                        instance: E,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (x) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var A, w, q, k;
            for (A = this.items.length - 1; A >= 0; A--) {
                w = this.items[A], w.instance !== this.currentContainer && this.currentContainer && w.item[0] !== this.currentItem[0] || (q = this.options.toleranceElement ? e(this.options.toleranceElement, w.item) : w.item, x || (w.width = q.outerWidth(), w.height = q.outerHeight()), k = q.offset(), w.left = k.left, w.top = k.top)
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (A = this.containers.length - 1; A >= 0; A--) {
                    k = this.containers[A].element.offset(), this.containers[A].containerCache.left = k.left, this.containers[A].containerCache.top = k.top, this.containers[A].containerCache.width = this.containers[A].element.outerWidth(), this.containers[A].containerCache.height = this.containers[A].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (k) {
            k = k || this;
            var q, w = k.options;
            w.placeholder && w.placeholder.constructor !== String || (q = w.placeholder, w.placeholder = {
                element: function () {
                    var A = k.currentItem[0].nodeName.toLowerCase(),
                            x = e("<" + A + ">", k.document[0]).addClass(q || k.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tbody" === A ? k._createTrPlaceholder(k.currentItem.find("tr").eq(0), e("<tr>", k.document[0]).appendTo(x)) : "tr" === A ? k._createTrPlaceholder(k.currentItem, x) : "img" === A && x.attr("src", k.currentItem.attr("src")), q || x.css("visibility", "hidden"), x
                },
                update: function (A, x) {
                    (!q || w.forcePlaceholderSize) && (x.height() || x.height(k.currentItem.innerHeight() - parseInt(k.currentItem.css("paddingTop") || 0, 10) - parseInt(k.currentItem.css("paddingBottom") || 0, 10)), x.width() || x.width(k.currentItem.innerWidth() - parseInt(k.currentItem.css("paddingLeft") || 0, 10) - parseInt(k.currentItem.css("paddingRight") || 0, 10)))
                }
            }), k.placeholder = e(w.placeholder.element.call(k.element, k.currentItem)), k.currentItem.after(k.placeholder), w.placeholder.update(k, k.placeholder)
        },
        _createTrPlaceholder: function (k, q) {
            var w = this;
            k.children().each(function () {
                e("<td>&#160;</td>", w.document[0]).attr("colspan", e(this).attr("colspan") || 1).appendTo(q)
            })
        },
        _contactContainers: function (w) {
            var I, q, D, A, E, H, G, k, x, C, B = null,
                    F = null;
            for (I = this.containers.length - 1; I >= 0; I--) {
                if (!e.contains(this.currentItem[0], this.containers[I].element[0])) {
                    if (this._intersectsWith(this.containers[I].containerCache)) {
                        if (B && e.contains(this.containers[I].element[0], B.element[0])) {
                            continue
                        }
                        B = this.containers[I], F = I
                    } else {
                        this.containers[I].containerCache.over && (this.containers[I]._trigger("out", w, this._uiHash(this)), this.containers[I].containerCache.over = 0)
                    }
                }
            }
            if (B) {
                if (1 === this.containers.length) {
                    this.containers[F].containerCache.over || (this.containers[F]._trigger("over", w, this._uiHash(this)), this.containers[F].containerCache.over = 1)
                } else {
                    for (D = 10000, A = null, x = B.floating || this._isFloating(this.currentItem), E = x ? "left" : "top", H = x ? "width" : "height", C = x ? "clientX" : "clientY", q = this.items.length - 1; q >= 0; q--) {
                        e.contains(this.containers[F].element[0], this.items[q].item[0]) && this.items[q].item[0] !== this.currentItem[0] && (G = this.items[q].item.offset()[E], k = !1, w[C] - G > this.items[q][H] / 2 && (k = !0), D > Math.abs(w[C] - G) && (D = Math.abs(w[C] - G), A = this.items[q], this.direction = k ? "up" : "down"))
                    }
                    if (!A && !this.options.dropOnEmpty) {
                        return
                    }
                    if (this.currentContainer === this.containers[F]) {
                        return this.currentContainer.containerCache.over || (this.containers[F]._trigger("over", w, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0
                    }
                    A ? this._rearrange(w, A, null, !0) : this._rearrange(w, null, this.containers[F].element, !0), this._trigger("change", w, this._uiHash()), this.containers[F]._trigger("change", w, this._uiHash(this)), this.currentContainer = this.containers[F], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[F]._trigger("over", w, this._uiHash(this)), this.containers[F].containerCache.over = 1
                }
            }
        },
        _createHelper: function (k) {
            var q = this.options,
                    w = e.isFunction(q.helper) ? e(q.helper.apply(this.element[0], [k, this.currentItem])) : "clone" === q.helper ? this.currentItem.clone() : this.currentItem;
            return w.parents("body").length || e("parent" !== q.appendTo ? q.appendTo : this.currentItem[0].parentNode)[0].appendChild(w[0]), w[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!w[0].style.width || q.forceHelperSize) && w.width(this.currentItem.width()), (!w[0].style.height || q.forceHelperSize) && w.height(this.currentItem.height()), w
        },
        _adjustOffsetFromHelper: function (k) {
            "string" == typeof k && (k = k.split(" ")), e.isArray(k) && (k = {
                left: +k[0],
                top: +k[1] || 0
            }), "left" in k && (this.offset.click.left = k.left + this.margins.left), "right" in k && (this.offset.click.left = this.helperProportions.width - k.right + this.margins.left), "top" in k && (this.offset.click.top = k.top + this.margins.top), "bottom" in k && (this.offset.click.top = this.helperProportions.height - k.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var k = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) && (k.left += this.scrollParent.scrollLeft(), k.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && e.ui.ie) && (k = {
                top: 0,
                left: 0
            }), {
                top: k.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: k.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var k = this.currentItem.position();
                return {
                    top: k.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: k.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var k, q, x, w = this.options;
            "parent" === w.containment && (w.containment = this.helper[0].parentNode), ("document" === w.containment || "window" === w.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === w.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === w.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(w.containment) || (k = e(w.containment)[0], q = e(w.containment).offset(), x = "hidden" !== e(k).css("overflow"), this.containment = [q.left + (parseInt(e(k).css("borderLeftWidth"), 10) || 0) + (parseInt(e(k).css("paddingLeft"), 10) || 0) - this.margins.left, q.top + (parseInt(e(k).css("borderTopWidth"), 10) || 0) + (parseInt(e(k).css("paddingTop"), 10) || 0) - this.margins.top, q.left + (x ? Math.max(k.scrollWidth, k.offsetWidth) : k.offsetWidth) - (parseInt(e(k).css("borderLeftWidth"), 10) || 0) - (parseInt(e(k).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, q.top + (x ? Math.max(k.scrollHeight, k.offsetHeight) : k.offsetHeight) - (parseInt(e(k).css("borderTopWidth"), 10) || 0) - (parseInt(e(k).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function (x, A) {
            A || (A = this.position);
            var w = "absolute" === x ? 1 : -1,
                    q = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    k = /(html|body)/i.test(q[0].tagName);
            return {
                top: A.top + this.offset.relative.top * w + this.offset.parent.top * w - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : k ? 0 : q.scrollTop()) * w,
                left: A.left + this.offset.relative.left * w + this.offset.parent.left * w - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : k ? 0 : q.scrollLeft()) * w
            }
        },
        _generatePosition: function (C) {
            var D, A, q = this.options,
                    k = C.pageX,
                    w = C.pageY,
                    x = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    B = /(html|body)/i.test(x[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (C.pageX - this.offset.click.left < this.containment[0] && (k = this.containment[0] + this.offset.click.left), C.pageY - this.offset.click.top < this.containment[1] && (w = this.containment[1] + this.offset.click.top), C.pageX - this.offset.click.left > this.containment[2] && (k = this.containment[2] + this.offset.click.left), C.pageY - this.offset.click.top > this.containment[3] && (w = this.containment[3] + this.offset.click.top)), q.grid && (D = this.originalPageY + Math.round((w - this.originalPageY) / q.grid[1]) * q.grid[1], w = this.containment ? D - this.offset.click.top >= this.containment[1] && D - this.offset.click.top <= this.containment[3] ? D : D - this.offset.click.top >= this.containment[1] ? D - q.grid[1] : D + q.grid[1] : D, A = this.originalPageX + Math.round((k - this.originalPageX) / q.grid[0]) * q.grid[0], k = this.containment ? A - this.offset.click.left >= this.containment[0] && A - this.offset.click.left <= this.containment[2] ? A : A - this.offset.click.left >= this.containment[0] ? A - q.grid[0] : A + q.grid[0] : A)), {
                top: w - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : B ? 0 : x.scrollTop()),
                left: k - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : B ? 0 : x.scrollLeft())
            }
        },
        _rearrange: function (x, k, q, A) {
            q ? q[0].appendChild(this.placeholder[0]) : k.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? k.item[0] : k.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var w = this.counter;
            this._delay(function () {
                w === this.counter && this.refreshPositions(!A)
            })
        },
        _clear: function (x, k) {
            function q(B, C, D) {
                return function (E) {
                    D._trigger(B, E, C._uiHash(C))
                }
            }
            this.reverting = !1;
            var A, w = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (A in this._storedCSS) {
                    ("auto" === this._storedCSS[A] || "static" === this._storedCSS[A]) && (this._storedCSS[A] = "")
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            for (this.fromOutside && !k && w.push(function (B) {
                this._trigger("receive", B, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || k || w.push(function (B) {
                this._trigger("update", B, this._uiHash())
            }), this !== this.currentContainer && (k || (w.push(function (B) {
                this._trigger("remove", B, this._uiHash())
            }), w.push(function (B) {
                return function (C) {
                    B._trigger("receive", C, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), w.push(function (B) {
                return function (C) {
                    B._trigger("update", C, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), A = this.containers.length - 1; A >= 0; A--) {
                k || w.push(q("deactivate", this, this.containers[A])), this.containers[A].containerCache.over && (w.push(q("out", this, this.containers[A])), this.containers[A].containerCache.over = 0)
            }
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, k || this._trigger("beforeStop", x, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !k) {
                for (A = 0; w.length > A; A++) {
                    w[A].call(this, x)
                }
                this._trigger("stop", x, this._uiHash())
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval
        },
        _trigger: function () {
            e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (k) {
            var q = k || this;
            return {
                helper: q.helper,
                placeholder: q.placeholder || e([]),
                position: q.position,
                originalPosition: q.originalPosition,
                offset: q.positionAbs,
                item: q.currentItem,
                sender: k ? k.element : null
            }
        }
    }), e.widget("ui.spinner", {
        version: "1.11.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function () {
            this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), "" !== this.value() && this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function () {
            var k = {},
                    q = this.element;
            return e.each(["min", "max", "step"], function (x, A) {
                var w = q.attr(A);
                void 0 !== w && w.length && (k[A] = w)
            }), k
        },
        _events: {
            keydown: function (k) {
                this._start(k) && this._keydown(k) && k.preventDefault()
            },
            keyup: "_stop",
            focus: function () {
                this.previous = this.element.val()
            },
            blur: function (k) {
                return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", k), void 0)
            },
            mousewheel: function (k, q) {
                if (q) {
                    if (!this.spinning && !this._start(k)) {
                        return !1
                    }
                    this._spin((q > 0 ? 1 : -1) * this.options.step, k), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function () {
                        this.spinning && this._stop(k)
                    }, 100), k.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function (k) {
                function q() {
                    var x = this.element[0] === this.document[0].activeElement;
                    x || (this.element.focus(), this.previous = w, this._delay(function () {
                        this.previous = w
                    }))
                }
                var w;
                w = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), k.preventDefault(), q.call(this), this.cancelBlur = !0, this._delay(function () {
                    delete this.cancelBlur, q.call(this)
                }), this._start(k) !== !1 && this._repeat(null, e(k.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, k)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function (k) {
                return e(k.currentTarget).hasClass("ui-state-active") ? this._start(k) === !1 ? !1 : (this._repeat(null, e(k.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, k), void 0) : void 0
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function () {
            var k = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"), this.buttons = k.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(0.5 * k.height()) && k.height() > 0 && k.height(k.height()), this.options.disabled && this.disable()
        },
        _keydown: function (k) {
            var q = this.options,
                    w = e.ui.keyCode;
            switch (k.keyCode) {
                case w.UP:
                    return this._repeat(null, 1, k), !0;
                case w.DOWN:
                    return this._repeat(null, -1, k), !0;
                case w.PAGE_UP:
                    return this._repeat(null, q.page, k), !0;
                case w.PAGE_DOWN:
                    return this._repeat(null, -q.page, k), !0
            }
            return !1
        },
        _uiSpinnerHtml: function () {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function () {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function (k) {
            return this.spinning || this._trigger("start", k) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
        },
        _repeat: function (w, k, q) {
            w = w || 500, clearTimeout(this.timer), this.timer = this._delay(function () {
                this._repeat(40, k, q)
            }, w), this._spin(k * this.options.step, q)
        },
        _spin: function (w, k) {
            var q = this.value() || 0;
            this.counter || (this.counter = 1), q = this._adjustValue(q + w * this._increment(this.counter)), this.spinning && this._trigger("spin", k, {
                value: q
            }) === !1 || (this._value(q), this.counter++)
        },
        _increment: function (k) {
            var q = this.options.incremental;
            return q ? e.isFunction(q) ? q(k) : Math.floor(k * k * k / 50000 - k * k / 500 + 17 * k / 200 + 1) : 1
        },
        _precision: function () {
            var k = this._precisionOf(this.options.step);
            return null !== this.options.min && (k = Math.max(k, this._precisionOf(this.options.min))), k
        },
        _precisionOf: function (w) {
            var k = "" + w,
                    q = k.indexOf(".");
            return -1 === q ? 0 : k.length - q - 1
        },
        _adjustValue: function (w) {
            var k, q, x = this.options;
            return k = null !== x.min ? x.min : 0, q = w - k, q = Math.round(q / x.step) * x.step, w = k + q, w = parseFloat(w.toFixed(this._precision())), null !== x.max && w > x.max ? x.max : null !== x.min && x.min > w ? x.min : w
        },
        _stop: function (k) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", k))
        },
        _setOption: function (w, k) {
            if ("culture" === w || "numberFormat" === w) {
                var q = this._parse(this.element.val());
                return this.options[w] = k, this.element.val(this._format(q)), void 0
            }
            ("max" === w || "min" === w || "step" === w) && "string" == typeof k && (k = this._parse(k)), "icons" === w && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(k.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(k.down)), this._super(w, k), "disabled" === w && (this.widget().toggleClass("ui-state-disabled", !!k), this.element.prop("disabled", !!k), this.buttons.button(k ? "disable" : "enable"))
        },
        _setOptions: h(function (k) {
            this._super(k)
        }),
        _parse: function (k) {
            return "string" == typeof k && "" !== k && (k = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(k, 10, this.options.culture) : +k), "" === k || isNaN(k) ? null : k
        },
        _format: function (k) {
            return "" === k ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(k, this.options.numberFormat, this.options.culture) : k
        },
        _refresh: function () {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function () {
            var k = this.value();
            return null === k ? !1 : k === this._adjustValue(k)
        },
        _value: function (w, k) {
            var q;
            "" !== w && (q = this._parse(w), null !== q && (k || (q = this._adjustValue(q)), w = this._format(q))), this.element.val(w), this._refresh()
        },
        _destroy: function () {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
        },
        stepUp: h(function (k) {
            this._stepUp(k)
        }),
        _stepUp: function (k) {
            this._start() && (this._spin((k || 1) * this.options.step), this._stop())
        },
        stepDown: h(function (k) {
            this._stepDown(k)
        }),
        _stepDown: function (k) {
            this._start() && (this._spin((k || 1) * -this.options.step), this._stop())
        },
        pageUp: h(function (k) {
            this._stepUp((k || 1) * this.options.page)
        }),
        pageDown: h(function (k) {
            this._stepDown((k || 1) * this.options.page)
        }),
        value: function (k) {
            return arguments.length ? (h(this._value).call(this, k), void 0) : this._parse(this.element.val())
        },
        widget: function () {
            return this.uiSpinner
        }
    }), e.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: function () {
            var k = /#.*$/;
            return function (A) {
                var q, x;
                A = A.cloneNode(!1), q = A.href.replace(k, ""), x = location.href.replace(k, "");
                try {
                    q = decodeURIComponent(q)
                } catch (w) {
                }
                try {
                    x = decodeURIComponent(x)
                } catch (w) {
                }
                return A.hash.length > 1 && q === x
            }
        }(),
        _create: function () {
            var k = this,
                    q = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", q.collapsible), this._processTabs(), q.active = this._initialActive(), e.isArray(q.disabled) && (q.disabled = e.unique(q.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"), function (w) {
                return k.tabs.index(w)
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(q.active) : e(), this._refresh(), this.active.length && this.load(q.active)
        },
        _initialActive: function () {
            var k = this.options.active,
                    q = this.options.collapsible,
                    w = location.hash.substring(1);
            return null === k && (w && this.tabs.each(function (A, x) {
                return e(x).attr("aria-controls") === w ? (k = A, !1) : void 0
            }), null === k && (k = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === k || -1 === k) && (k = this.tabs.length ? 0 : !1)), k !== !1 && (k = this.tabs.index(this.tabs.eq(k)), -1 === k && (k = q ? !1 : 0)), !q && k === !1 && this.anchors.length && (k = 0), k
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : e()
            }
        },
        _tabKeydown: function (k) {
            var q = e(this.document[0].activeElement).closest("li"),
                    x = this.tabs.index(q),
                    w = !0;
            if (!this._handlePageNav(k)) {
                switch (k.keyCode) {
                    case e.ui.keyCode.RIGHT:
                    case e.ui.keyCode.DOWN:
                        x++;
                        break;
                    case e.ui.keyCode.UP:
                    case e.ui.keyCode.LEFT:
                        w = !1, x--;
                        break;
                    case e.ui.keyCode.END:
                        x = this.anchors.length - 1;
                        break;
                    case e.ui.keyCode.HOME:
                        x = 0;
                        break;
                    case e.ui.keyCode.SPACE:
                        return k.preventDefault(), clearTimeout(this.activating), this._activate(x), void 0;
                    case e.ui.keyCode.ENTER:
                        return k.preventDefault(), clearTimeout(this.activating), this._activate(x === this.options.active ? !1 : x), void 0;
                    default:
                        return
                }
                k.preventDefault(), clearTimeout(this.activating), x = this._focusNextTab(x, w), k.ctrlKey || k.metaKey || (q.attr("aria-selected", "false"), this.tabs.eq(x).attr("aria-selected", "true"), this.activating = this._delay(function () {
                    this.option("active", x)
                }, this.delay))
            }
        },
        _panelKeydown: function (k) {
            this._handlePageNav(k) || k.ctrlKey && k.keyCode === e.ui.keyCode.UP && (k.preventDefault(), this.active.focus())
        },
        _handlePageNav: function (k) {
            return k.altKey && k.keyCode === e.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : k.altKey && k.keyCode === e.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
        },
        _findNextTab: function (k, q) {
            function x() {
                return k > w && (k = 0), 0 > k && (k = w), k
            }
            for (var w = this.tabs.length - 1; -1 !== e.inArray(x(), this.options.disabled); ) {
                k = q ? k + 1 : k - 1
            }
            return k
        },
        _focusNextTab: function (k, q) {
            return k = this._findNextTab(k, q), this.tabs.eq(k).focus(), k
        },
        _setOption: function (k, q) {
            return "active" === k ? (this._activate(q), void 0) : "disabled" === k ? (this._setupDisabled(q), void 0) : (this._super(k, q), "collapsible" === k && (this.element.toggleClass("ui-tabs-collapsible", q), q || this.options.active !== !1 || this._activate(0)), "event" === k && this._setupEvents(q), "heightStyle" === k && this._setupHeightStyle(q), void 0)
        },
        _sanitizeSelector: function (k) {
            return k ? k.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function () {
            var k = this.options,
                    q = this.tablist.children(":has(a[href])");
            k.disabled = e.map(q.filter(".ui-state-disabled"), function (w) {
                return q.index(w)
            }), this._processTabs(), k.active !== !1 && this.anchors.length ? this.active.length && !e.contains(this.tablist[0], this.active[0]) ? this.tabs.length === k.disabled.length ? (k.active = !1, this.active = e()) : this._activate(this._findNextTab(Math.max(0, k.active - 1), !1)) : k.active = this.tabs.index(this.active) : (k.active = !1, this.active = e()), this._refresh()
        },
        _refresh: function () {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function () {
            var k = this,
                    q = this.tabs,
                    x = this.anchors,
                    w = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function (A) {
                e(this).is(".ui-state-disabled") && A.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function () {
                e(this).closest("li").is(".ui-state-disabled") && this.blur()
            }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function () {
                return e("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = e(), this.anchors.each(function (D, G) {
                var H, E, B, C = e(G).uniqueId().attr("id"),
                        A = e(G).closest("li"),
                        F = A.attr("aria-controls");
                k._isLocal(G) ? (H = G.hash, B = H.substring(1), E = k.element.find(k._sanitizeSelector(H))) : (B = A.attr("aria-controls") || e({}).uniqueId()[0].id, H = "#" + B, E = k.element.find(H), E.length || (E = k._createPanel(B), E.insertAfter(k.panels[D - 1] || k.tablist)), E.attr("aria-live", "polite")), E.length && (k.panels = k.panels.add(E)), F && A.data("ui-tabs-aria-controls", F), A.attr({
                    "aria-controls": B,
                    "aria-labelledby": C
                }), E.attr("aria-labelledby", C)
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), q && (this._off(q.not(this.tabs)), this._off(x.not(this.anchors)), this._off(w.not(this.panels)))
        },
        _getList: function () {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function (k) {
            return e("<div>").attr("id", k).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function (k) {
            e.isArray(k) && (k.length ? k.length === this.anchors.length && (k = !0) : k = !1);
            for (var q, w = 0; q = this.tabs[w]; w++) {
                k === !0 || -1 !== e.inArray(w, k) ? e(q).addClass("ui-state-disabled").attr("aria-disabled", "true") : e(q).removeClass("ui-state-disabled").removeAttr("aria-disabled")
            }
            this.options.disabled = k
        },
        _setupEvents: function (k) {
            var q = {};
            k && e.each(k.split(" "), function (w, x) {
                q[x] = "_eventHandler"
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                click: function (w) {
                    w.preventDefault()
                }
            }), this._on(this.anchors, q), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs)
        },
        _setupHeightStyle: function (k) {
            var q, w = this.element.parent();
            "fill" === k ? (q = w.height(), q -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function () {
                var A = e(this),
                        x = A.css("position");
                "absolute" !== x && "fixed" !== x && (q -= A.outerHeight(!0))
            }), this.element.children().not(this.panels).each(function () {
                q -= e(this).outerHeight(!0)
            }), this.panels.each(function () {
                e(this).height(Math.max(0, q - e(this).innerHeight() + e(this).height()))
            }).css("overflow", "auto")) : "auto" === k && (q = 0, this.panels.each(function () {
                q = Math.max(q, e(this).height("").height())
            }).height(q))
        },
        _eventHandler: function (F) {
            var x = this.options,
                    D = this.active,
                    B = e(F.currentTarget),
                    q = B.closest("li"),
                    C = q[0] === D[0],
                    E = C && x.collapsible,
                    w = E ? e() : this._getPanelForTab(q),
                    A = D.length ? this._getPanelForTab(D) : e(),
                    k = {
                        oldTab: D,
                        oldPanel: A,
                        newTab: E ? e() : q,
                        newPanel: w
                    };
            F.preventDefault(), q.hasClass("ui-state-disabled") || q.hasClass("ui-tabs-loading") || this.running || C && !x.collapsible || this._trigger("beforeActivate", F, k) === !1 || (x.active = E ? !1 : this.tabs.index(q), this.active = C ? e() : q, this.xhr && this.xhr.abort(), A.length || w.length || e.error("jQuery UI Tabs: Mismatching fragment identifier."), w.length && this.load(this.tabs.index(q), F), this._toggle(F, k))
        },
        _toggle: function (B, C) {
            function A() {
                k.running = !1, k._trigger("activate", B, C)
            }

            function q() {
                C.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), w.length && k.options.show ? k._show(w, k.options.show, A) : (w.show(), A())
            }
            var k = this,
                    w = C.newPanel,
                    x = C.oldPanel;
            this.running = !0, x.length && this.options.hide ? this._hide(x, this.options.hide, function () {
                C.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), q()
            }) : (C.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), x.hide(), q()), x.attr("aria-hidden", "true"), C.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), w.length && x.length ? C.oldTab.attr("tabIndex", -1) : w.length && this.tabs.filter(function () {
                return 0 === e(this).attr("tabIndex")
            }).attr("tabIndex", -1), w.attr("aria-hidden", "false"), C.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function (k) {
            var q, w = this._findActive(k);
            w[0] !== this.active[0] && (w.length || (w = this.active), q = w.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: q,
                currentTarget: q,
                preventDefault: e.noop
            }))
        },
        _findActive: function (k) {
            return k === !1 ? e() : this.tabs.eq(k)
        },
        _getIndex: function (k) {
            return "string" == typeof k && (k = this.anchors.index(this.anchors.filter("[href$='" + k + "']"))), k
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function () {
                e.data(this, "ui-tabs-destroy") ? e(this).remove() : e(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }), this.tabs.each(function () {
                var k = e(this),
                        q = k.data("ui-tabs-aria-controls");
                q ? k.attr("aria-controls", q).removeData("ui-tabs-aria-controls") : k.removeAttr("aria-controls")
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function (k) {
            var q = this.options.disabled;
            q !== !1 && (void 0 === k ? q = !1 : (k = this._getIndex(k), q = e.isArray(q) ? e.map(q, function (w) {
                return w !== k ? w : null
            }) : e.map(this.tabs, function (w, x) {
                return x !== k ? x : null
            })), this._setupDisabled(q))
        },
        disable: function (k) {
            var q = this.options.disabled;
            if (q !== !0) {
                if (void 0 === k) {
                    q = !0
                } else {
                    if (k = this._getIndex(k), -1 !== e.inArray(k, q)) {
                        return
                    }
                    q = e.isArray(q) ? e.merge([k], q).sort() : [k]
                }
                this._setupDisabled(q)
            }
        },
        load: function (C, D) {
            C = this._getIndex(C);
            var A = this,
                    q = this.tabs.eq(C),
                    k = q.find(".ui-tabs-anchor"),
                    w = this._getPanelForTab(q),
                    x = {
                        tab: q,
                        panel: w
                    },
            B = function (F, E) {
                "abort" === E && A.panels.stop(!1, !0), q.removeClass("ui-tabs-loading"), w.removeAttr("aria-busy"), F === A.xhr && delete A.xhr
            };
            this._isLocal(k[0]) || (this.xhr = e.ajax(this._ajaxSettings(k, D, x)), this.xhr && "canceled" !== this.xhr.statusText && (q.addClass("ui-tabs-loading"), w.attr("aria-busy", "true"), this.xhr.done(function (F, E, G) {
                setTimeout(function () {
                    w.html(F), A._trigger("load", D, x), B(G, E)
                }, 1)
            }).fail(function (F, E) {
                setTimeout(function () {
                    B(F, E)
                }, 1)
            })))
        },
        _ajaxSettings: function (k, q, x) {
            var w = this;
            return {
                url: k.attr("href"),
                beforeSend: function (A, B) {
                    return w._trigger("beforeLoad", q, e.extend({
                        jqXHR: A,
                        ajaxSettings: B
                    }, x))
                }
            }
        },
        _getPanelForTab: function (k) {
            var q = e(k).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + q))
        }
    }), e.widget("ui.tooltip", {
        version: "1.11.4",
        options: {
            content: function () {
                var k = e(this).attr("title") || "";
                return e("<a>").text(k).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _addDescribedBy: function (k, q) {
            var w = (k.attr("aria-describedby") || "").split(/\s+/);
            w.push(q), k.data("ui-tooltip-id", q).attr("aria-describedby", e.trim(w.join(" ")))
        },
        _removeDescribedBy: function (k) {
            var q = k.data("ui-tooltip-id"),
                    x = (k.attr("aria-describedby") || "").split(/\s+/),
                    w = e.inArray(q, x);
            -1 !== w && x.splice(w, 1), k.removeData("ui-tooltip-id"), x = e.trim(x.join(" ")), x ? k.attr("aria-describedby", x) : k.removeAttr("aria-describedby")
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = e("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
        },
        _setOption: function (k, q) {
            var w = this;
            return "disabled" === k ? (this[q ? "_disable" : "_enable"](), this.options[k] = q, void 0) : (this._super(k, q), "content" === k && e.each(this.tooltips, function (x, A) {
                w._updateContent(A.element)
            }), void 0)
        },
        _disable: function () {
            var k = this;
            e.each(this.tooltips, function (q, x) {
                var w = e.Event("blur");
                w.target = w.currentTarget = x.element[0], k.close(w, !0)
            }), this.element.find(this.options.items).addBack().each(function () {
                var q = e(this);
                q.is("[title]") && q.data("ui-tooltip-title", q.attr("title")).removeAttr("title")
            })
        },
        _enable: function () {
            this.element.find(this.options.items).addBack().each(function () {
                var k = e(this);
                k.data("ui-tooltip-title") && k.attr("title", k.data("ui-tooltip-title"))
            })
        },
        open: function (k) {
            var q = this,
                    w = e(k ? k.target : this.element).closest(this.options.items);
            w.length && !w.data("ui-tooltip-id") && (w.attr("title") && w.data("ui-tooltip-title", w.attr("title")), w.data("ui-tooltip-open", !0), k && "mouseover" === k.type && w.parents().each(function () {
                var A, x = e(this);
                x.data("ui-tooltip-open") && (A = e.Event("blur"), A.target = A.currentTarget = this, q.close(A, !0)), x.attr("title") && (x.uniqueId(), q.parents[this.id] = {
                    element: this,
                    title: x.attr("title")
                }, x.attr("title", ""))
            }), this._registerCloseHandlers(k, w), this._updateContent(w, k))
        },
        _updateContent: function (w, A) {
            var B, x = this.options.content,
                    q = this,
                    k = A ? A.type : null;
            return "string" == typeof x ? this._open(A, w, x) : (B = x.call(w[0], function (C) {
                q._delay(function () {
                    w.data("ui-tooltip-open") && (A && (A.type = k), this._open(A, w, C))
                })
            }), B && this._open(A, w, B), void 0)
        },
        _open: function (k, x, E) {
            function B(F) {
                A.of = F, C.is(":hidden") || C.position(A)
            }
            var q, C, D, w, A = e.extend({}, this.options.position);
            if (E) {
                if (q = this._find(x)) {
                    return q.tooltip.find(".ui-tooltip-content").html(E), void 0
                }
                x.is("[title]") && (k && "mouseover" === k.type ? x.attr("title", "") : x.removeAttr("title")), q = this._tooltip(x), C = q.tooltip, this._addDescribedBy(x, C.attr("id")), C.find(".ui-tooltip-content").html(E), this.liveRegion.children().hide(), E.clone ? (w = E.clone(), w.removeAttr("id").find("[id]").removeAttr("id")) : w = E, e("<div>").html(w).appendTo(this.liveRegion), this.options.track && k && /^mouse/.test(k.type) ? (this._on(this.document, {
                    mousemove: B
                }), B(k)) : C.position(e.extend({
                    of: x
                }, this.options.position)), C.hide(), this._show(C, this.options.show), this.options.show && this.options.show.delay && (D = this.delayedShow = setInterval(function () {
                    C.is(":visible") && (B(A.of), clearInterval(D))
                }, e.fx.interval)), this._trigger("open", k, {
                    tooltip: C
                })
            }
        },
        _registerCloseHandlers: function (k, q) {
            var w = {
                keyup: function (A) {
                    if (A.keyCode === e.ui.keyCode.ESCAPE) {
                        var x = e.Event(A);
                        x.currentTarget = q[0], this.close(x, !0)
                    }
                }
            };
            q[0] !== this.element[0] && (w.remove = function () {
                this._removeTooltip(this._find(q).tooltip)
            }), k && "mouseover" !== k.type || (w.mouseleave = "close"), k && "focusin" !== k.type || (w.focusout = "close"), this._on(!0, q, w)
        },
        close: function (x) {
            var A, w = this,
                    q = e(x ? x.currentTarget : this.element),
                    k = this._find(q);
            return k ? (A = k.tooltip, k.closing || (clearInterval(this.delayedShow), q.data("ui-tooltip-title") && !q.attr("title") && q.attr("title", q.data("ui-tooltip-title")), this._removeDescribedBy(q), k.hiding = !0, A.stop(!0), this._hide(A, this.options.hide, function () {
                w._removeTooltip(e(this))
            }), q.removeData("ui-tooltip-open"), this._off(q, "mouseleave focusout keyup"), q[0] !== this.element[0] && this._off(q, "remove"), this._off(this.document, "mousemove"), x && "mouseleave" === x.type && e.each(this.parents, function (C, B) {
                e(B.element).attr("title", B.title), delete w.parents[C]
            }), k.closing = !0, this._trigger("close", x, {
                tooltip: A
            }), k.hiding || (k.closing = !1)), void 0) : (q.removeData("ui-tooltip-open"), void 0)
        },
        _tooltip: function (k) {
            var q = e("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
                    w = q.uniqueId().attr("id");
            return e("<div>").addClass("ui-tooltip-content").appendTo(q), q.appendTo(this.document[0].body), this.tooltips[w] = {
                element: k,
                tooltip: q
            }
        },
        _find: function (k) {
            var q = k.data("ui-tooltip-id");
            return q ? this.tooltips[q] : null
        },
        _removeTooltip: function (k) {
            k.remove(), delete this.tooltips[k.attr("id")]
        },
        _destroy: function () {
            var k = this;
            e.each(this.tooltips, function (A, x) {
                var w = e.Event("blur"),
                        q = x.element;
                w.target = w.currentTarget = q[0], k.close(w, !0), e("#" + A).remove(), q.data("ui-tooltip-title") && (q.attr("title") || q.attr("title", q.data("ui-tooltip-title")), q.removeData("ui-tooltip-title"))
            }), this.liveRegion.remove()
        }
    })
});