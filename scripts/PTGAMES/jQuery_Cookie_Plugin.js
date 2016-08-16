/*
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], b)
    } else {
        b(jQuery)
    }
}(function (l) {
    var h = /\+/g;

    function m(a) {
        return a
    }

    function g(a) {
        return decodeURIComponent(a.replace(h, " "))
    }

    function k(b) {
        if (b.indexOf('"') === 0) {
            b = b.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            return n.json ? JSON.parse(b) : b
        } catch (a) {
        }
    }
    var n = l.cookie = function (b, c, C) {
        if (c !== undefined) {
            C = l.extend({}, n.defaults, C);
            if (typeof C.expires === "number") {
                var a = C.expires,
                        D = C.expires = new Date();
                D.setDate(D.getDate() + a)
            }
            c = n.json ? JSON.stringify(c) : String(c);
            return (document.cookie = [n.raw ? b : encodeURIComponent(b), "=", n.raw ? c : encodeURIComponent(c), C.expires ? "; expires=" + C.expires.toUTCString() : "", C.path ? "; path=" + C.path : "", C.domain ? "; domain=" + C.domain : "", C.secure ? "; secure" : ""].join(""))
        }
        var A = n.raw ? m : g;
        var E = document.cookie.split("; ");
        var B = b ? undefined : {};
        for (var d = 0, f = E.length; d < f; d++) {
            var e = E[d].split("=");
            var y = A(e.shift());
            var x = A(e.join("="));
            if (b && b === y) {
                B = k(x);
                break
            }
            if (!b) {
                B[y] = k(x)
            }
        }
        return B
    };
    n.defaults = {};
    l.removeCookie = function (a, b) {
        if (l.cookie(a) !== undefined) {
            l.cookie(a, "", l.extend({}, b, {
                expires: -1
            }));
            return true
        }
        return false
    }
}));
(function (h) {
    h.fn.dump = function () {
        return h.dump(this)
    };
    h.dump = function (b) {
        var c = function (d, r) {
            if (!r) {
                r = 0
            }
            var o = "",
                    p = "";
            for (i = 0; i < r; i++) {
                p += "\t"
            }
            t = a(d);
            switch (t) {
                case "string":
                    return '"' + d + '"';
                    break;
                case "number":
                    return d.toString();
                    break;
                case "boolean":
                    return d ? "true" : "false";
                case "date":
                    return "Date: " + d.toLocaleString();
                case "array":
                    o += "Array ( \n";
                    h.each(d, function (k, l) {
                        o += p + "\t" + k + " => " + c(l, r + 1) + "\n"
                    });
                    o += p + ")";
                    break;
                case "object":
                    o += "Object { \n";
                    h.each(d, function (k, l) {
                        o += p + "\t" + k + ": " + c(l, r + 1) + "\n"
                    });
                    o += p + "}";
                    break;
                case "jquery":
                    o += "jQuery Object { \n";
                    h.each(d, function (k, l) {
                        o += p + "\t" + k + " = " + c(l, r + 1) + "\n"
                    });
                    o += p + "}";
                    break;
                case "regexp":
                    return "RegExp: " + d.toString();
                case "error":
                    return d.toString();
                case "document":
                case "domelement":
                    o += "DOMElement [ \n" + p + "\tnodeName: " + d.nodeName + "\n" + p + "\tnodeValue: " + d.nodeValue + "\n" + p + "\tinnerHTML: [ \n";
                    h.each(d.childNodes, function (l, m) {
                        if (l < 1) {
                            var k = 0
                        }
                        if (a(m) == "string") {
                            if (m.textContent.match(/[^\s]/)) {
                                o += p + "\t\t" + (l - (k || 0)) + " = String: " + f(m.textContent) + "\n"
                            } else {
                                k--
                            }
                        } else {
                            o += p + "\t\t" + (l - (k || 0)) + " = " + c(m, r + 2) + "\n"
                        }
                    });
                    o += p + "\t]\n" + p + "]";
                    break;
                case "function":
                    var q = d.toString().match(/^(.*)\(([^\)]*)\)/im);
                    q[1] = f(q[1].replace(new RegExp("[\\s]+", "g"), " "));
                    q[2] = f(q[2].replace(new RegExp("[\\s]+", "g"), " "));
                    return q[1] + "(" + q[2] + ")";
                case "window":
                default:
                    o += "N/A: " + t;
                    break
            }
            return o
        };
        var a = function (d) {
            var l = typeof (d);
            if (l != "object") {
                return l
            }
            switch (d) {
                case null:
                    return "null";
                case window:
                    return "window";
                case document:
                    return "document";
                case window.event:
                    return "event";
                default:
                    break
            }
            if (d.jquery) {
                return "jquery"
            }
            switch (d.constructor) {
                case Array:
                    return "array";
                case Boolean:
                    return "boolean";
                case Date:
                    return "date";
                case Object:
                    return "object";
                case RegExp:
                    return "regexp";
                case ReferenceError:
                case Error:
                    return "error";
                case null:
                default:
                    break
            }
            switch (d.nodeType) {
                case 1:
                    return "domelement";
                case 3:
                    return "string";
                case null:
                default:
                    break
            }
            return "Unknown"
        };
        return c(b)
    };

    function f(a) {
        return g(e(a))
    }

    function g(a) {
        return a.replace(new RegExp("^[\\s]+", "g"), "")
    }

    function e(a) {
        return a.replace(new RegExp("[\\s]+$", "g"), "")
    }
})(jQuery);
(function () {
    var b = {
        getSelection: function () {
            var a = (this.jquery) ? this[0] : this;
            return (("selectionStart" in a && function () {
                var d = a.selectionEnd - a.selectionStart;
                return {
                    start: a.selectionStart,
                    end: a.selectionEnd,
                    length: d,
                    text: a.value.substr(a.selectionStart, d)
                }
            }) || (document.selection && function () {
                a.focus();
                var g = document.selection.createRange();
                if (g === null) {
                    return {
                        start: 0,
                        end: a.value.length,
                        length: 0
                    }
                }
                var h = a.createTextRange();
                var f = h.duplicate();
                h.moveToBookmark(g.getBookmark());
                f.setEndPoint("EndToStart", h);
                return {
                    start: f.text.length,
                    end: f.text.length + g.text.length,
                    length: g.text.length,
                    text: g.text
                }
            }) || function () {
                return null
            })()
        },
        setSelection: function () {
            var d = (this.jquery) ? this[0] : this;
            var a = arguments[0] || {};
            return (("selectionStart" in d && function () {
                var c = typeof a == "object" ? a.start : a;
                if (c != undefined) {
                    d.selectionStart = c
                }
                if (a.end != undefined) {
                    d.selectionEnd = a.end
                }
                d.focus();
                return this
            }) || (document.selection && function () {
                d.focus();
                var f = document.selection.createRange();
                if (f === null) {
                    return this
                }
                var c = typeof a == "object" ? a.start : a;
                if (c != undefined) {
                    f.moveStart("character", -d.value.length);
                    f.moveStart("character", c);
                    f.collapse()
                }
                if (a.end != undefined) {
                    f.moveEnd("character", a.end - c)
                }
                f.select();
                return this
            }) || function () {
                d.focus();
                return jQuery(d)
            })()
        },
        replaceSelection: function () {
            var a = (this.jquery) ? this[0] : this;
            var d = arguments[0] || "";
            return (("selectionStart" in a && function () {
                a.value = a.value.substr(0, a.selectionStart) + d + a.value.substr(a.selectionEnd, a.value.length);
                return this
            }) || (document.selection && function () {
                a.focus();
                document.selection.createRange().text = d;
                return this
            }) || function () {
                a.value += d;
                return jQuery(a)
            })()
        }
    };
    jQuery.each(b, function (a) {
        jQuery.fn[a] = this
    })
})();
(function (b) {
    b.fn.hoverIntent = function (q, r) {
        var g = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        g = b.extend(g, r ? {
            over: q,
            out: r
        } : q);
        var a, f, u, w;
        var v = function (c) {
            a = c.pageX;
            f = c.pageY
        };
        var x = function (c, d) {
            d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
            if ((Math.abs(u - a) + Math.abs(w - f)) < g.sensitivity) {
                b(d).unbind("mousemove", v);
                d.hoverIntent_s = 1;
                return g.over.apply(d, [c])
            } else {
                u = a;
                w = f;
                d.hoverIntent_t = setTimeout(function () {
                    x(c, d)
                }, g.interval)
            }
        };
        var s = function (c, d) {
            d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
            d.hoverIntent_s = 0;
            return g.out.apply(d, [c])
        };
        var y = function (e) {
            var c = jQuery.extend({}, e);
            var d = this;
            if (d.hoverIntent_t) {
                d.hoverIntent_t = clearTimeout(d.hoverIntent_t)
            }
            if (e.type == "mouseenter") {
                u = c.pageX;
                w = c.pageY;
                b(d).bind("mousemove", v);
                if (d.hoverIntent_s != 1) {
                    d.hoverIntent_t = setTimeout(function () {
                        x(c, d)
                    }, g.interval)
                }
            } else {
                b(d).unbind("mousemove", v);
                if (d.hoverIntent_s == 1) {
                    d.hoverIntent_t = setTimeout(function () {
                        s(c, d)
                    }, g.timeout)
                }
            }
        };
        return this.bind("mouseenter", y).bind("mouseleave", y)
    }
})(jQuery);
(function (ai) {
    function ak() {}

    function J(a) {
        al = [a]
    }

    function Y(a, c, b) {
        return a && a.apply(c.context || c, b)
    }

    function aa(a) {
        return /\?/.test(a) ? "&" : "?"
    }
    var W = "async",
            N = "charset",
            R = "",
            M = "error",
            L = "insertBefore",
            P = "_jqjsp",
            S = "on",
            ah = S + "click",
            ad = S + M,
            U = S + "load",
            V = S + "readystatechange",
            am = "readyState",
            O = "removeChild",
            ae = "<script>",
            T = "success",
            Q = "timeout",
            aj = window,
            an = ai.Deferred,
            ag = ai("head")[0] || document.documentElement,
            X = {},
            ab = 0,
            al, ac = {
                callback: P,
                url: location.href
            },
    Z = aj.opera,
            af = !!ai("<div>").html("<!--[if IE]><i><![endif]-->").find("i").length;

    function K(n) {
        n = ai.extend({}, ac, n);
        var p = n.success,
                g = n.error,
                q = n.complete,
                y = n.dataFilter,
                w = n.callbackParameter,
                f = n.callback,
                x = n.cache,
                r = n.pageCache,
                o = n.charset,
                m = n.url,
                u = n.data,
                d = n.timeout,
                h, B = 0,
                b = ak,
                e, k, s, v, l, a;
        an && an(function (C) {
            C.done(p).fail(g);
            p = C.resolve;
            g = C.reject
        }).promise(n);
        n.abort = function () {
            !(B++) && b()
        };
        if (Y(n.beforeSend, n, [n]) === !1 || B) {
            return n
        }
        m = m || R;
        u = u ? ((typeof u) == "string" ? u : ai.param(u, n.traditional)) : R;
        m += u ? (aa(m) + u) : R;
        w && (m += aa(m) + encodeURIComponent(w) + "=?");
        !x && !r && (m += aa(m) + "_" + (new Date()).getTime() + "=");
        m = m.replace(/=\?(&|$)/, "=" + f + "$1");

        function A(C) {
            if (!(B++)) {
                b();
                r && (X[m] = {
                    s: [C]
                });
                y && (C = y.apply(n, [C]));
                Y(p, n, [C, T, n]);
                Y(q, n, [n, T])
            }
        }

        function c(C) {
            if (!(B++)) {
                b();
                r && C != Q && (X[m] = C);
                Y(g, n, [n, C]);
                Y(q, n, [n, C])
            }
        }
        if (r && (h = X[m])) {
            h.s ? A(h.s[0]) : c(h)
        } else {
            aj[f] = J;
            v = ai(ae)[0];
            v.id = P + ab++;
            if (o) {
                v[N] = o
            }
            Z && Z.version() < 11.6 ? ((l = ai(ae)[0]).text = "document.getElementById('" + v.id + "')." + ad + "()") : (v[W] = W);
            if (af) {
                v.htmlFor = v.id;
                v.event = ah
            }
            v[U] = v[ad] = v[V] = function (D) {
                if (!v[am] || !/i/.test(v[am])) {
                    try {
                        v[ah] && v[ah]()
                    } catch (C) {
                    }
                    D = al;
                    al = 0;
                    D ? A(D[0]) : c(M)
                }
            };
            v.src = m;
            b = function (C) {
                a && clearTimeout(a);
                v[V] = v[U] = v[ad] = null;
                ag[O](v);
                l && ag[O](l)
            };
            ag[L](v, (s = ag.firstChild));
            l && ag[L](l, s);
            a = d > 0 && setTimeout(function () {
                c(Q)
            }, d)
        }
        return n
    }
    K.setup = function (a) {
        ai.extend(ac, a)
    };
    ai.jsonp = K
})(jQuery);
(function () {
    var b = function (e, f, a) {
        e = jsPlumbUtil.isArray(e) ? e : [e.x, e.y];
        f = jsPlumbUtil.isArray(f) ? f : [f.x, f.y];
        return a(e, f)
    };
    jsPlumbUtil = {
        isArray: function (a) {
            return Object.prototype.toString.call(a) === "[object Array]"
        },
        isNumber: function (a) {
            return Object.prototype.toString.call(a) === "[object Number]"
        },
        isString: function (a) {
            return typeof a === "string"
        },
        isBoolean: function (a) {
            return typeof a === "boolean"
        },
        isNull: function (a) {
            return a == null
        },
        isObject: function (a) {
            return a == null ? false : Object.prototype.toString.call(a) === "[object Object]"
        },
        isDate: function (a) {
            return Object.prototype.toString.call(a) === "[object Date]"
        },
        isFunction: function (a) {
            return Object.prototype.toString.call(a) === "[object Function]"
        },
        clone: function (f) {
            if (this.isString(f)) {
                return "" + f
            } else {
                if (this.isBoolean(f)) {
                    return !!f
                } else {
                    if (this.isDate(f)) {
                        return new Date(f.getTime())
                    } else {
                        if (this.isFunction(f)) {
                            return f
                        } else {
                            if (this.isArray(f)) {
                                var g = [];
                                for (var a = 0; a < f.length; a++) {
                                    g.push(this.clone(f[a]))
                                }
                                return g
                            } else {
                                if (this.isObject(f)) {
                                    var g = {};
                                    for (var a in f) {
                                        g[a] = this.clone(f[a])
                                    }
                                    return g
                                } else {
                                    return f
                                }
                            }
                        }
                    }
                }
            }
        },
        merge: function (n, o) {
            var a = this.clone(n);
            for (var c in o) {
                if (a[c] == null || this.isString(o[c]) || this.isBoolean(o[c])) {
                    a[c] = o[c]
                } else {
                    if (this.isArray(o[c])) {
                        var m = [];
                        if (this.isArray(a[c])) {
                            m.push.apply(m, a[c])
                        }
                        m.push.apply(m, o[c]);
                        a[c] = m
                    } else {
                        if (this.isObject(o[c])) {
                            if (!this.isObject(a[c])) {
                                a[c] = {}
                            }
                            for (var l in o[c]) {
                                a[c][l] = o[c][l]
                            }
                        }
                    }
                }
            }
            return a
        },
        copyValues: function (h, f, g) {
            for (var a = 0; a < h.length; a++) {
                g[h[a]] = f[h[a]]
            }
        },
        functionChain: function (k, g, l) {
            for (var a = 0; a < l.length; a++) {
                var h = l[a][0][l[a][1]].apply(l[a][0], l[a][2]);
                if (h === g) {
                    return h
                }
            }
            return k
        },
        populate: function (g, h) {
            var a = function (c) {
                var e = c.match(/(\${.*?})/g);
                if (e != null) {
                    for (var l = 0; l < e.length; l++) {
                        var d = h[e[l].substring(2, e[l].length - 1)];
                        if (d != null) {
                            c = c.replace(e[l], d)
                        }
                    }
                }
                return c
            },
                    f = function (c) {
                        if (c != null) {
                            if (jsPlumbUtil.isString(c)) {
                                return a(c)
                            } else {
                                if (jsPlumbUtil.isArray(c)) {
                                    var d = [];
                                    for (var e = 0; e < c.length; e++) {
                                        d.push(f(c[e]))
                                    }
                                    return d
                                } else {
                                    if (jsPlumbUtil.isObject(c)) {
                                        var d = {};
                                        for (var e in c) {
                                            d[e] = f(c[e])
                                        }
                                        return d
                                    } else {
                                        return c
                                    }
                                }
                            }
                        }
                    };
            return f(g)
        },
        convertStyle: function (p, a) {
            if ("transparent" === p) {
                return p
            }
            var k = p,
                    l = function (c) {
                        return c.length == 1 ? "0" + c : c
                    },
                    o = function (c) {
                        return l(Number(c).toString(16))
                    },
                    n = /(rgb[a]?\()(.*)(\))/;
            if (p.match(n)) {
                var m = p.match(n)[2].split(",");
                k = "#" + o(m[0]) + o(m[1]) + o(m[2]);
                if (!a && m.length == 4) {
                    k = k + o(m[3])
                }
            }
            return k
        },
        gradient: function (d, a) {
            return b(d, a, function (c, f) {
                if (f[0] == c[0]) {
                    return f[1] > c[1] ? Infinity : -Infinity
                } else {
                    if (f[1] == c[1]) {
                        return f[0] > c[0] ? 0 : -0
                    } else {
                        return (f[1] - c[1]) / (f[0] - c[0])
                    }
                }
            })
        },
        normal: function (d, a) {
            return -1 / this.gradient(d, a)
        },
        lineLength: function (d, a) {
            return b(d, a, function (c, f) {
                return Math.sqrt(Math.pow(f[1] - c[1], 2) + Math.pow(f[0] - c[0], 2))
            })
        },
        segment: function (d, a) {
            return b(d, a, function (c, f) {
                if (f[0] > c[0]) {
                    return (f[1] > c[1]) ? 2 : 1
                } else {
                    if (f[0] == c[0]) {
                        return f[1] > c[1] ? 2 : 1
                    } else {
                        return (f[1] > c[1]) ? 3 : 4
                    }
                }
            })
        },
        theta: function (d, a) {
            return b(d, a, function (l, m) {
                var n = jsPlumbUtil.gradient(l, m),
                        k = Math.atan(n),
                        c = jsPlumbUtil.segment(l, m);
                if ((c == 4 || c == 3)) {
                    k += Math.PI
                }
                if (k < 0) {
                    k += (2 * Math.PI)
                }
                return k
            })
        },
        intersects: function (q, r) {
            var u = q.x,
                    w = q.x + q.w,
                    a = q.y,
                    o = q.y + q.h,
                    s = r.x,
                    v = r.x + r.w,
                    n = r.y,
                    p = r.y + r.h;
            return ((u <= s && s <= w) && (a <= n && n <= o)) || ((u <= v && v <= w) && (a <= n && n <= o)) || ((u <= s && s <= w) && (a <= p && p <= o)) || ((u <= v && s <= w) && (a <= p && p <= o)) || ((s <= u && u <= v) && (n <= a && a <= p)) || ((s <= w && w <= v) && (n <= a && a <= p)) || ((s <= u && u <= v) && (n <= o && o <= p)) || ((s <= w && u <= v) && (n <= o && o <= p))
        },
        segmentMultipliers: [null, [1, -1],
            [1, 1],
            [-1, 1],
            [-1, -1]
        ],
        inverseSegmentMultipliers: [null, [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1]
        ],
        pointOnLine: function (u, p, s) {
            var q = jsPlumbUtil.gradient(u, p),
                    a = jsPlumbUtil.segment(u, p),
                    m = s > 0 ? jsPlumbUtil.segmentMultipliers[a] : jsPlumbUtil.inverseSegmentMultipliers[a],
                    r = Math.atan(q),
                    o = Math.abs(s * Math.sin(r)) * m[1],
                    n = Math.abs(s * Math.cos(r)) * m[0];
            return {
                x: u.x + n,
                y: u.y + o
            }
        },
        perpendicularLineTo: function (o, n, m) {
            var p = jsPlumbUtil.gradient(o, n),
                    l = Math.atan(-1 / p),
                    k = m / 2 * Math.sin(l),
                    a = m / 2 * Math.cos(l);
            return [{
                    x: n.x + a,
                    y: n.y + k
                }, {
                    x: n.x - a,
                    y: n.y - k
                }]
        },
        findWithFunction: function (a, e) {
            if (a) {
                for (var f = 0; f < a.length; f++) {
                    if (e(a[f])) {
                        return f
                    }
                }
            }
            return -1
        },
        clampToGrid: function (a, h, m, k, l) {
            var n = function (g, f) {
                var c = g % f,
                        e = Math.floor(g / f),
                        d = c >= (f / 2) ? 1 : 0;
                return (e + d) * f
            };
            return [k || m == null ? a : n(a, m[0]), l || m == null ? h : n(h, m[1])]
        },
        indexOf: function (a, d) {
            return jsPlumbUtil.findWithFunction(a, function (c) {
                return c == d
            })
        },
        removeWithFunction: function (f, e) {
            var a = jsPlumbUtil.findWithFunction(f, e);
            if (a > -1) {
                f.splice(a, 1)
            }
            return a != -1
        },
        remove: function (f, e) {
            var a = jsPlumbUtil.indexOf(f, e);
            if (a > -1) {
                f.splice(a, 1)
            }
            return a != -1
        },
        addWithFunction: function (e, f, a) {
            if (jsPlumbUtil.findWithFunction(e, a) == -1) {
                e.push(f)
            }
        },
        addToList: function (f, h, g) {
            var a = f[h];
            if (a == null) {
                a = [], f[h] = a
            }
            a.push(g);
            return a
        },
        EventGenerator: function () {
            var g = {},
                    h = this,
                    f = false;
            var a = ["ready"];
            this.bind = function (d, c) {
                jsPlumbUtil.addToList(g, d, c);
                return h
            };
            this.fire = function (e, d, n) {
                if (!f && g[e]) {
                    for (var m = 0; m < g[e].length; m++) {
                        if (jsPlumbUtil.findWithFunction(a, function (k) {
                            return k === e
                        }) != -1) {
                            g[e][m](d, n)
                        } else {
                            try {
                                g[e][m](d, n)
                            } catch (c) {
                                jsPlumbUtil.log("jsPlumb: fire failed for event " + e + " : " + c)
                            }
                        }
                    }
                }
                return h
            };
            this.unbind = function (c) {
                if (c) {
                    delete g[c]
                } else {
                    g = {}
                }
                return h
            };
            this.getListener = function (c) {
                return g[c]
            };
            this.setSuspendEvents = function (c) {
                f = c
            };
            this.isSuspendEvents = function () {
                return f
            }
        },
        logEnabled: true,
        log: function () {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                try {
                    var d = arguments[arguments.length - 1];
                    console.log(d)
                } catch (a) {
                }
            }
        },
        group: function (a) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.group(a)
            }
        },
        groupEnd: function (a) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.groupEnd(a)
            }
        },
        time: function (a) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.time(a)
            }
        },
        timeEnd: function (a) {
            if (jsPlumbUtil.logEnabled && typeof console != "undefined") {
                console.timeEnd(a)
            }
        },
        removeElement: function (a) {
            if (a != null && a.parentNode != null) {
                a.parentNode.removeChild(a)
            }
        },
        removeElements: function (d) {
            for (var a = 0; a < d.length; a++) {
                jsPlumbUtil.removeElement(d[a])
            }
        }
    }
})();
(function () {
    var e = !!document.createElement("canvas").getContext,
            f = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
            g = function () {
                if (g.vml == undefined) {
                    var a = document.body.appendChild(document.createElement("div"));
                    a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
                    var b = a.firstChild;
                    b.style.behavior = "url(#default#VML)";
                    g.vml = b ? typeof b.adj == "object" : true;
                    a.parentNode.removeChild(a)
                }
                return g.vml
            };
    var h = function (a) {
        var b = {},
                c = [],
                m = {},
                n = {},
                d = {};
        this.register = function (u) {
            var v = jsPlumb.CurrentLibrary;
            u = v.getElementObject(u);
            var l = a.getId(u),
                    w = v.getDOMElement(u),
                    k = v.getOffset(u);
            if (!b[l]) {
                b[l] = u;
                c.push(u);
                m[l] = {}
            }
            var s = function (o, A) {
                if (o) {
                    for (var r = 0; r < o.childNodes.length; r++) {
                        if (o.childNodes[r].nodeType != 3 && o.childNodes[r].nodeType != 8) {
                            var p = v.getElementObject(o.childNodes[r]),
                                    B = a.getId(p, null, true);
                            if (B && n[B] && n[B] > 0) {
                                var q = v.getOffset(p);
                                m[l][B] = {
                                    id: B,
                                    offset: {
                                        left: q.left - k.left,
                                        top: q.top - k.top
                                    }
                                };
                                d[B] = l
                            }
                            s(o.childNodes[r])
                        }
                    }
                }
            };
            s(w)
        };
        this.updateOffsets = function (l) {
            var C = jsPlumb.CurrentLibrary,
                    x = C.getElementObject(l),
                    y = a.getId(x),
                    w = m[y],
                    A = C.getOffset(x);
            if (w) {
                for (var D in w) {
                    var B = C.getElementObject(D),
                            k = C.getOffset(B);
                    m[y][D] = {
                        id: D,
                        offset: {
                            left: k.left - A.left,
                            top: k.top - A.top
                        }
                    };
                    d[D] = y
                }
            }
        };
        this.endpointAdded = function (B) {
            var I = jsPlumb.CurrentLibrary,
                    F = document.body,
                    D = a.getId(B),
                    G = I.getDOMElement(B),
                    C = G.parentNode,
                    k = C == F;
            n[D] = n[D] ? n[D] + 1 : 1;
            while (C != null && C != F) {
                var J = a.getId(C, null, true);
                if (J && b[J]) {
                    var p = -1,
                            H = I.getElementObject(C),
                            l = I.getOffset(H);
                    if (m[J][D] == null) {
                        var E = jsPlumb.CurrentLibrary.getOffset(B);
                        m[J][D] = {
                            id: D,
                            offset: {
                                left: E.left - l.left,
                                top: E.top - l.top
                            }
                        };
                        d[D] = J
                    }
                    break
                }
                C = C.parentNode
            }
        };
        this.endpointDeleted = function (l) {
            if (n[l.elementId]) {
                n[l.elementId]--;
                if (n[l.elementId] <= 0) {
                    for (var k in m) {
                        if (m[k]) {
                            delete m[k][l.elementId];
                            delete d[l.elementId]
                        }
                    }
                }
            }
        };
        this.changeId = function (l, k) {
            m[k] = m[l];
            m[l] = {};
            d[k] = d[l];
            d[l] = null
        };
        this.getElementsForDraggable = function (k) {
            return m[k]
        };
        this.elementRemoved = function (k) {
            var l = d[k];
            if (l) {
                delete m[l][k];
                delete d[k]
            }
        };
        this.reset = function () {
            b = {};
            c = [];
            m = {};
            n = {}
        }
    };
    if (!window.console) {
        window.console = {
            time: function () {},
            timeEnd: function () {},
            group: function () {},
            groupEnd: function () {},
            log: function () {}
        }
    }
    window.jsPlumbAdapter = {
        headless: false,
        appendToRoot: function (a) {
            document.body.appendChild(a)
        },
        getRenderModes: function () {
            return ["canvas", "svg", "vml"]
        },
        isRenderModeAvailable: function (a) {
            return {
                canvas: e,
                svg: f,
                vml: g()
            }[a]
        },
        getDragManager: function (a) {
            return new h(a)
        },
        setRenderMode: function (a) {
            var b;
            if (a) {
                a = a.toLowerCase();
                var d = this.isRenderModeAvailable("canvas"),
                        l = this.isRenderModeAvailable("svg"),
                        c = this.isRenderModeAvailable("vml");
                if (a === "svg") {
                    if (l) {
                        b = "svg"
                    } else {
                        if (d) {
                            b = "canvas"
                        } else {
                            if (c) {
                                b = "vml"
                            }
                        }
                    }
                } else {
                    if (a === "canvas" && d) {
                        b = "canvas"
                    } else {
                        if (c) {
                            b = "vml"
                        }
                    }
                }
            }
            return b
        }
    }
})();
(function () {
    var ad = jsPlumbUtil.findWithFunction,
            K = jsPlumbUtil.indexOf,
            U = jsPlumbUtil.removeWithFunction,
            aa = jsPlumbUtil.remove,
            S = jsPlumbUtil.addWithFunction,
            ab = jsPlumbUtil.addToList,
            Z = jsPlumbUtil.isArray,
            W = jsPlumbUtil.isString,
            L = jsPlumbUtil.isObject;
    var Q = function (b, a) {
        return X.CurrentLibrary.getAttribute(af(b), a)
    },
            ah = function (b, a, c) {
                X.CurrentLibrary.setAttribute(af(b), a, c)
            },
            H = function (a, b) {
                X.CurrentLibrary.addClass(af(a), b)
            },
            ac = function (a, b) {
                return X.CurrentLibrary.hasClass(af(a), b)
            },
            Y = function (a, b) {
                X.CurrentLibrary.removeClass(af(a), b)
            },
            af = function (a) {
                return X.CurrentLibrary.getElementObject(a)
            },
            P = function (c, d) {
                var a = X.CurrentLibrary.getOffset(af(c));
                if (d != null) {
                    var b = d.getZoom();
                    return {
                        left: a.left / b,
                        top: a.top / b
                    }
                } else {
                    return a
                }
            },
            aj = function (a) {
                return X.CurrentLibrary.getSize(af(a))
            },
            V = jsPlumbUtil.log,
            N = jsPlumbUtil.group,
            ae = jsPlumbUtil.groupEnd,
            O = jsPlumbUtil.time,
            M = jsPlumbUtil.timeEnd,
            T = function () {
                return "" + (new Date()).getTime()
            },
            R = window.jsPlumbUIComponent = function (y) {
                var f = this,
                        x = arguments,
                        h = false,
                        p = y.parameters || {},
                        r = f.idPrefix,
                        d = r + (new Date()).getTime(),
                        e = null,
                        w = null;
                f._jsPlumb = y._jsPlumb;
                f.getId = function () {
                    return d
                };
                f.hoverClass = y.hoverClass || f._jsPlumb.Defaults.HoverClass || X.Defaults.HoverClass;
                jsPlumbUtil.EventGenerator.apply(this);
                if (y.events) {
                    for (var c in y.events) {
                        f.bind(c, y.events[c])
                    }
                }
                this.clone = function () {
                    var A = new Object();
                    f.constructor.apply(A, x);
                    return A
                };
                this.getParameter = function (A) {
                    return p[A]
                }, this.getParameters = function () {
                    return p
                }, this.setParameter = function (B, A) {
                    p[B] = A
                }, this.setParameters = function (A) {
                    p = A
                }, this.overlayPlacements = [];
                var q = y.beforeDetach;
                this.isDetachAllowed = function (C) {
                    var B = true;
                    if (q) {
                        try {
                            B = q(C)
                        } catch (A) {
                            V("jsPlumb: beforeDetach callback failed", A)
                        }
                    }
                    return B
                };
                var n = y.beforeDrop;
                this.isDropAllowed = function (A, D, C, F, E) {
                    var B = f._jsPlumb.checkCondition("beforeDrop", {
                        sourceId: A,
                        targetId: D,
                        scope: C,
                        connection: F,
                        dropEndpoint: E
                    });
                    if (n) {
                        try {
                            B = n({
                                sourceId: A,
                                targetId: D,
                                scope: C,
                                connection: F,
                                dropEndpoint: E
                            })
                        } catch (G) {
                            V("jsPlumb: beforeDrop callback failed", G)
                        }
                    }
                    return B
                };
                var b = function () {
                    if (e && w) {
                        var A = {};
                        X.extend(A, e);
                        X.extend(A, w);
                        delete f.hoverPaintStyle;
                        if (A.gradient && e.fillStyle) {
                            delete A.gradient
                        }
                        w = A
                    }
                };
                this.setPaintStyle = function (B, A) {
                    e = B;
                    f.paintStyleInUse = e;
                    b();
                    if (!A) {
                        f.repaint()
                    }
                };
                this.getPaintStyle = function () {
                    return e
                };
                this.setHoverPaintStyle = function (B, A) {
                    w = B;
                    b();
                    if (!A) {
                        f.repaint()
                    }
                };
                this.getHoverPaintStyle = function () {
                    return w
                };
                this.setHover = function (C, A, B) {
                    if (!f._jsPlumb.currentlyDragging && !f._jsPlumb.isHoverSuspended()) {
                        h = C;
                        if (f.canvas != null) {
                            if (f.hoverClass != null) {
                                if (C) {
                                    s.addClass(f.canvas, f.hoverClass)
                                } else {
                                    s.removeClass(f.canvas, f.hoverClass)
                                }
                            }
                            if (C) {
                                s.addClass(f.canvas, f._jsPlumb.hoverClass)
                            } else {
                                s.removeClass(f.canvas, f._jsPlumb.hoverClass)
                            }
                        }
                        if (w != null) {
                            f.paintStyleInUse = C ? w : e;
                            if (!f._jsPlumb.isSuspendDrawing()) {
                                B = B || T();
                                f.repaint({
                                    timestamp: B,
                                    recalc: false
                                })
                            }
                        }
                        if (f.getAttachedElements && !A) {
                            a(C, T(), f)
                        }
                    }
                };
                this.isHover = function () {
                    return h
                };
                this.bindListeners = function (A, C, B) {
                    A.bind("click", function (E, D) {
                        C.fire("click", C, D)
                    });
                    A.bind("dblclick", function (E, D) {
                        C.fire("dblclick", C, D)
                    });
                    A.bind("contextmenu", function (E, D) {
                        C.fire("contextmenu", C, D)
                    });
                    A.bind("mouseenter", function (E, D) {
                        if (!C.isHover()) {
                            B(true);
                            C.fire("mouseenter", C, D)
                        }
                    });
                    A.bind("mouseexit", function (E, D) {
                        if (C.isHover()) {
                            B(false);
                            C.fire("mouseexit", C, D)
                        }
                    });
                    A.bind("mousedown", function (E, D) {
                        C.fire("mousedown", C, D)
                    });
                    A.bind("mouseup", function (E, D) {
                        C.fire("mouseup", C, D)
                    })
                };
                var s = X.CurrentLibrary,
                        u = ["click", "dblclick", "mouseenter", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"],
                        g = {
                            mouseout: "mouseexit"
                        },
                o = function (B, A, C) {
                    var D = g[C] || C;
                    s.bind(B, C, function (E) {
                        A.fire(D, A, E)
                    })
                },
                        k = function (A, B) {
                            var C = g[B] || B;
                            s.unbind(A, B)
                        };
                this.attachListeners = function (B, A) {
                    for (var C = 0, D = u.length; C < D; C++) {
                        o(B, A, u[C])
                    }
                };
                var a = function (A, B, E) {
                    var C = f.getAttachedElements();
                    if (C) {
                        for (var D = 0, F = C.length; D < F; D++) {
                            if (!E || E != C[D]) {
                                C[D].setHover(A, true, B)
                            }
                        }
                    }
                };
                this.reattachListenersForElement = function (A) {
                    if (arguments.length > 1) {
                        for (var B = 0, C = u.length; B < C; B++) {
                            k(A, u[B])
                        }
                        for (var B = 1, C = arguments.length; B < C; B++) {
                            f.attachListeners(A, arguments[B])
                        }
                    }
                };
                var v = [],
                        m = function (A) {
                            return A == null ? null : A.split(" ")
                        },
                        l = function (B, D) {
                            if (f.getDefaultType) {
                                var A = f.getTypeDescriptor();
                                var C = jsPlumbUtil.merge({}, f.getDefaultType());
                                for (var E = 0, F = v.length; E < F; E++) {
                                    C = jsPlumbUtil.merge(C, f._jsPlumb.getType(v[E], A))
                                }
                                if (B) {
                                    C = jsPlumbUtil.populate(C, B)
                                }
                                f.applyType(C, D);
                                if (!D) {
                                    f.repaint()
                                }
                            }
                        };
                f.setType = function (C, A, B) {
                    v = m(C) || [];
                    l(A, B)
                };
                f.getType = function () {
                    return v
                };
                f.reapplyTypes = function (A, B) {
                    l(A, B)
                };
                f.hasType = function (A) {
                    return jsPlumbUtil.indexOf(v, A) != -1
                };
                f.addType = function (C, G, B) {
                    var D = m(C),
                            A = false;
                    if (D != null) {
                        for (var E = 0, F = D.length; E < F; E++) {
                            if (!f.hasType(D[E])) {
                                v.push(D[E]);
                                A = true
                            }
                        }
                        if (A) {
                            l(G, B)
                        }
                    }
                };
                f.removeType = function (B, A) {
                    var D = m(B),
                            G = false,
                            C = function (am) {
                                var an = jsPlumbUtil.indexOf(v, am);
                                if (an != -1) {
                                    v.splice(an, 1);
                                    return true
                                }
                                return false
                            };
                    if (D != null) {
                        for (var E = 0, F = D.length; E < F; E++) {
                            G = C(D[E]) || G
                        }
                        if (G) {
                            l(null, A)
                        }
                    }
                };
                f.toggleType = function (B, G, A) {
                    var C = m(B);
                    if (C != null) {
                        for (var D = 0, E = C.length; D < E; D++) {
                            var F = jsPlumbUtil.indexOf(v, C[D]);
                            if (F != -1) {
                                v.splice(F, 1)
                            } else {
                                v.push(C[D])
                            }
                        }
                        l(G, A)
                    }
                };
                this.applyType = function (B, A) {
                    f.setPaintStyle(B.paintStyle, A);
                    f.setHoverPaintStyle(B.hoverPaintStyle, A);
                    if (B.parameters) {
                        for (var C in B.parameters) {
                            f.setParameter(C, B.parameters[C])
                        }
                    }
                };
                this.addClass = function (A) {
                    if (f.canvas != null) {
                        H(f.canvas, A)
                    }
                };
                this.removeClass = function (A) {
                    if (f.canvas != null) {
                        Y(f.canvas, A)
                    }
                }
            },
            I = window.overlayCapableJsPlumbUIComponent = function (k) {
                R.apply(this, arguments);
                var a = this;
                this.overlays = [];
                var m = function (s) {
                    var q = null;
                    if (Z(s)) {
                        var r = s[0],
                                u = X.extend({
                                    component: a,
                                    _jsPlumb: a._jsPlumb
                                }, s[1]);
                        if (s.length == 3) {
                            X.extend(u, s[2])
                        }
                        q = new X.Overlays[a._jsPlumb.getRenderMode()][r](u)
                    } else {
                        if (s.constructor == String) {
                            q = new X.Overlays[a._jsPlumb.getRenderMode()][s]({
                                component: a,
                                _jsPlumb: a._jsPlumb
                            })
                        } else {
                            q = s
                        }
                    }
                    a.overlays.push(q)
                },
                        l = function (u) {
                            var r = a.defaultOverlayKeys || [],
                                    s = u.overlays,
                                    q = function (x) {
                                        return a._jsPlumb.Defaults[x] || X.Defaults[x] || []
                                    };
                            if (!s) {
                                s = []
                            }
                            for (var v = 0, w = r.length; v < w; v++) {
                                s.unshift.apply(s, q(r[v]))
                            }
                            return s
                        };
                var o = l(k);
                if (o) {
                    for (var f = 0, h = o.length; f < h; f++) {
                        m(o[f])
                    }
                }
                var p = function (s) {
                    var r = -1;
                    for (var u = 0, q = a.overlays.length; u < q; u++) {
                        if (s === a.overlays[u].id) {
                            r = u;
                            break
                        }
                    }
                    return r
                };
                this.addOverlay = function (r, q) {
                    m(r);
                    if (!q) {
                        a.repaint()
                    }
                };
                this.getOverlay = function (q) {
                    var r = p(q);
                    return r >= 0 ? a.overlays[r] : null
                };
                this.getOverlays = function () {
                    return a.overlays
                };
                this.hideOverlay = function (q) {
                    var r = a.getOverlay(q);
                    if (r) {
                        r.hide()
                    }
                };
                this.hideOverlays = function () {
                    for (var q = 0, r = a.overlays.length; q < r; q++) {
                        a.overlays[q].hide()
                    }
                };
                this.showOverlay = function (q) {
                    var r = a.getOverlay(q);
                    if (r) {
                        r.show()
                    }
                };
                this.showOverlays = function () {
                    for (var q = 0, r = a.overlays.length; q < r; q++) {
                        a.overlays[q].show()
                    }
                };
                this.removeAllOverlays = function () {
                    for (var q = 0, r = a.overlays.length; q < r; q++) {
                        if (a.overlays[q].cleanup) {
                            a.overlays[q].cleanup()
                        }
                    }
                    a.overlays.splice(0, a.overlays.length);
                    a.repaint()
                };
                this.removeOverlay = function (q) {
                    var r = p(q);
                    if (r != -1) {
                        var s = a.overlays[r];
                        if (s.cleanup) {
                            s.cleanup()
                        }
                        a.overlays.splice(r, 1)
                    }
                };
                this.removeOverlays = function () {
                    for (var q = 0, r = arguments.length; q < r; q++) {
                        a.removeOverlay(arguments[q])
                    }
                };
                var n = "__label",
                        b = function (s) {
                            var r = {
                                cssClass: s.cssClass,
                                labelStyle: this.labelStyle,
                                id: n,
                                component: a,
                                _jsPlumb: a._jsPlumb
                            },
                            q = X.extend(r, s);
                            return new X.Overlays[a._jsPlumb.getRenderMode()].Label(q)
                        };
                if (k.label) {
                    var e = k.labelLocation || a.defaultLabelLocation || 0.5,
                            d = k.labelStyle || a._jsPlumb.Defaults.LabelStyle || X.Defaults.LabelStyle;
                    this.overlays.push(b({
                        label: k.label,
                        location: e,
                        labelStyle: d
                    }))
                }
                this.setLabel = function (r) {
                    var q = a.getOverlay(n);
                    if (!q) {
                        var s = r.constructor == String || r.constructor == Function ? {
                            label: r
                        } : r;
                        q = b(s);
                        this.overlays.push(q)
                    } else {
                        if (r.constructor == String || r.constructor == Function) {
                            q.setLabel(r)
                        } else {
                            if (r.label) {
                                q.setLabel(r.label)
                            }
                            if (r.location) {
                                q.setLocation(r.location)
                            }
                        }
                    }
                    if (!a._jsPlumb.isSuspendDrawing()) {
                        a.repaint()
                    }
                };
                this.getLabel = function () {
                    var q = a.getOverlay(n);
                    return q != null ? q.getLabel() : null
                };
                this.getLabelOverlay = function () {
                    return a.getOverlay(n)
                };
                var g = this.applyType;
                this.applyType = function (u, s) {
                    g(u, s);
                    a.removeAllOverlays();
                    if (u.overlays) {
                        for (var q = 0, r = u.overlays.length; q < r; q++) {
                            a.addOverlay(u.overlays[q], true)
                        }
                    }
                };
                var c = this.setHover;
                this.setHover = function (v, s, u) {
                    c.apply(a, arguments);
                    for (var q = 0, r = a.overlays.length; q < r; q++) {
                        a.overlays[q][v ? "addClass" : "removeClass"](a._jsPlumb.hoverClass)
                    }
                }
            };
    var ag = 0,
            ai = function () {
                var a = ag + 1;
                ag++;
                return a
            };
    var J = function (v) {
        this.Defaults = {
            Anchor: "BottomCenter",
            Anchors: [null, null],
            ConnectionsDetachable: true,
            ConnectionOverlays: [],
            Connector: "Bezier",
            Container: null,
            DoNotThrowErrors: false,
            DragOptions: {},
            DropOptions: {},
            Endpoint: "Dot",
            EndpointOverlays: [],
            Endpoints: [null, null],
            EndpointStyle: {
                fillStyle: "#456"
            },
            EndpointStyles: [null, null],
            EndpointHoverStyle: null,
            EndpointHoverStyles: [null, null],
            HoverPaintStyle: null,
            LabelStyle: {
                color: "black"
            },
            LogEnabled: false,
            Overlays: [],
            MaxConnections: 1,
            PaintStyle: {
                lineWidth: 8,
                strokeStyle: "#456"
            },
            ReattachConnections: false,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"
        };
        if (v) {
            X.extend(this.Defaults, v)
        }
        this.logEnabled = this.Defaults.LogEnabled;
        var bt = {},
                bb = {};
        this.registerConnectionType = function (ak, al) {
            bt[ak] = X.extend({}, al)
        };
        this.registerConnectionTypes = function (ak) {
            for (var al in ak) {
                bt[al] = X.extend({}, ak[al])
            }
        };
        this.registerEndpointType = function (ak, al) {
            bb[ak] = X.extend({}, al)
        };
        this.registerEndpointTypes = function (ak) {
            for (var al in ak) {
                bb[al] = X.extend({}, ak[al])
            }
        };
        this.getType = function (ak, al) {
            return al === "connection" ? bt[ak] : bb[ak]
        };
        jsPlumbUtil.EventGenerator.apply(this);
        var bM = this,
                w = ai(),
                bD = bM.bind,
                G = {},
                d = 1;
        this.getInstanceIndex = function () {
            return w
        };
        this.setZoom = function (ak, al) {
            d = ak;
            if (al) {
                bM.repaintEverything()
            }
        };
        this.getZoom = function () {
            return d
        };
        for (var aq in this.Defaults) {
            G[aq] = this.Defaults[aq]
        }
        this.bind = function (ak, al) {
            if ("ready" === ak && s) {
                al()
            } else {
                bD.apply(bM, [ak, al])
            }
        };
        bM.importDefaults = function (ak) {
            for (var al in ak) {
                bM.Defaults[al] = ak[al]
            }
        };
        bM.restoreDefaults = function () {
            bM.Defaults = X.extend({}, G)
        };
        var p = null,
                bi = null,
                s = false,
                bd = null,
                bv = {},
                bA = {},
                by = {},
                bc = {},
                bK = {},
                bh = {},
                bN = {},
                bG = [],
                bf = [],
                m = this.Defaults.Scope,
                g = null,
                bx = function (ak, al) {
                    if (bM.Defaults.Container) {
                        X.CurrentLibrary.appendElement(ak, bM.Defaults.Container)
                    } else {
                        if (!al) {
                            jsPlumbAdapter.appendToRoot(ak)
                        } else {
                            X.CurrentLibrary.appendElement(ak, al)
                        }
                    }
                },
                F = 1,
                a0 = function () {
                    return "" + F++
                },
                A = function (ak) {
                    return ak._nodes ? ak._nodes : ak
                },
                bm = function (ao, al, am, an) {
                    if (!jsPlumbAdapter.headless && !bq) {
                        var ak = Q(ao, "id"),
                                aA = bM.dragManager.getElementsForDraggable(ak);
                        if (am == null) {
                            am = T()
                        }
                        bM.anchorManager.redraw(ak, al, am, null, an);
                        if (aA) {
                            for (var ap in aA) {
                                bM.anchorManager.redraw(aA[ap].id, al, am, aA[ap].offset, an)
                            }
                        }
                    }
                },
                C = function (ao, am) {
                    var al = null;
                    if (Z(ao)) {
                        al = [];
                        for (var ap = 0, aA = ao.length; ap < aA; ap++) {
                            var an = af(ao[ap]),
                                    ak = Q(an, "id");
                            al.push(am(an, ak))
                        }
                    } else {
                        var an = af(ao),
                                ak = Q(an, "id");
                        al = am(an, ak)
                    }
                    return al
                },
                aw = function (ak) {
                    return by[ak]
                },
                bk = function (ap, aD, am) {
                    if (!jsPlumbAdapter.headless) {
                        var ak = aD == null ? false : aD,
                                ao = X.CurrentLibrary;
                        if (ak) {
                            if (ao.isDragSupported(ap) && !ao.isAlreadyDraggable(ap)) {
                                var al = am || bM.Defaults.DragOptions || X.Defaults.DragOptions;
                                al = X.extend({}, al);
                                var an = ao.dragEvents.drag,
                                        aC = ao.dragEvents.stop,
                                        aA = ao.dragEvents.start;
                                al[aA] = az(al[aA], function () {
                                    bM.setHoverSuspended(true);
                                    bM.select({
                                        source: ap
                                    }).addClass(bM.elementDraggingClass + " " + bM.sourceElementDraggingClass, true);
                                    bM.select({
                                        target: ap
                                    }).addClass(bM.elementDraggingClass + " " + bM.targetElementDraggingClass, true)
                                });
                                al[an] = az(al[an], function () {
                                    var aE = ao.getUIPosition(arguments, bM.getZoom());
                                    bm(ap, aE, null, true);
                                    H(ap, "jsPlumb_dragged")
                                });
                                al[aC] = az(al[aC], function () {
                                    var aE = ao.getUIPosition(arguments, bM.getZoom());
                                    bm(ap, aE);
                                    Y(ap, "jsPlumb_dragged");
                                    bM.setHoverSuspended(false);
                                    bM.select({
                                        source: ap
                                    }).removeClass(bM.elementDraggingClass + " " + bM.sourceElementDraggingClass, true);
                                    bM.select({
                                        target: ap
                                    }).removeClass(bM.elementDraggingClass + " " + bM.targetElementDraggingClass, true)
                                });
                                var aB = x(ap);
                                bN[aB] = true;
                                var ak = bN[aB];
                                al.disabled = ak == null ? false : !ak;
                                ao.initDraggable(ap, al, false, bM);
                                bM.dragManager.register(ap)
                            }
                        }
                    }
                },
                ar = function (ap, al) {
                    var aC = X.extend({
                        sourceIsNew: true,
                        targetIsNew: true
                    }, ap);
                    if (al) {
                        X.extend(aC, al)
                    }
                    if (aC.source && aC.source.endpoint) {
                        aC.sourceEndpoint = aC.source
                    }
                    if (aC.target && aC.target.endpoint) {
                        aC.targetEndpoint = aC.target
                    }
                    if (ap.uuids) {
                        aC.sourceEndpoint = aw(ap.uuids[0]);
                        aC.targetEndpoint = aw(ap.uuids[1])
                    }
                    if (aC.sourceEndpoint && aC.sourceEndpoint.isFull()) {
                        V(bM, "could not add connection; source endpoint is full");
                        return
                    }
                    if (aC.targetEndpoint && aC.targetEndpoint.isFull()) {
                        V(bM, "could not add connection; target endpoint is full");
                        return
                    }
                    if (aC.sourceEndpoint && !aC.sourceEndpoint.addedViaMouse) {
                        aC.sourceIsNew = false
                    }
                    if (aC.targetEndpoint && !aC.targetEndpoint.addedViaMouse) {
                        aC.targetIsNew = false
                    }
                    if (!aC.type && aC.sourceEndpoint) {
                        aC.type = aC.sourceEndpoint.connectionType
                    }
                    if (aC.sourceEndpoint && aC.sourceEndpoint.connectorOverlays) {
                        aC.overlays = aC.overlays || [];
                        for (var am = 0, an = aC.sourceEndpoint.connectorOverlays.length; am < an; am++) {
                            aC.overlays.push(aC.sourceEndpoint.connectorOverlays[am])
                        }
                    }
                    if (!aC["pointer-events"] && aC.sourceEndpoint && aC.sourceEndpoint.connectorPointerEvents) {
                        aC["pointer-events"] = aC.sourceEndpoint.connectorPointerEvents
                    }
                    if (aC.target && !aC.target.endpoint && !aC.targetEndpoint && !aC.newConnection) {
                        var ao = x(aC.target),
                                aB = bu[ao],
                                aA = B[ao];
                        if (aB) {
                            if (!ba[ao]) {
                                return
                            }
                            var ak = aA != null ? aA : bM.addEndpoint(aC.target, aB);
                            if (bg[ao]) {
                                B[ao] = ak
                            }
                            aC.targetEndpoint = ak;
                            ak._makeTargetCreator = true;
                            aC.targetIsNew = true
                        }
                    }
                    if (aC.source && !aC.source.endpoint && !aC.sourceEndpoint && !aC.newConnection) {
                        var ao = x(aC.source),
                                aB = at[ao],
                                aA = br[ao];
                        if (aB) {
                            if (!c[ao]) {
                                return
                            }
                            var ak = aA != null ? aA : bM.addEndpoint(aC.source, aB);
                            if (bo[ao]) {
                                br[ao] = ak
                            }
                            aC.sourceEndpoint = ak;
                            aC.sourceIsNew = true
                        }
                    }
                    return aC
                },
                b = function (ak) {
                    var al = bM.Defaults.ConnectionType || bM.getDefaultConnectionType(),
                            am = bM.Defaults.EndpointType || X.Endpoint,
                            an = X.CurrentLibrary.getParent;
                    if (ak.container) {
                        ak.parent = ak.container
                    } else {
                        if (ak.sourceEndpoint) {
                            ak.parent = ak.sourceEndpoint.parent
                        } else {
                            if (ak.source.constructor == am) {
                                ak.parent = ak.source.parent
                            } else {
                                ak.parent = an(ak.source)
                            }
                        }
                    }
                    ak._jsPlumb = bM;
                    ak.newConnection = b;
                    ak.newEndpoint = E;
                    ak.endpointsByUUID = by;
                    ak.endpointsByElement = bA;
                    ak.finaliseConnection = bH;
                    var ao = new al(ak);
                    ao.id = "con_" + a0();
                    bI("click", "click", ao);
                    bI("dblclick", "dblclick", ao);
                    bI("contextmenu", "contextmenu", ao);
                    return ao
                },
                bH = function (al, ak, an) {
                    ak = ak || {};
                    if (!al.suspendedEndpoint) {
                        ab(bv, al.scope, al)
                    }
                    bM.anchorManager.newConnection(al);
                    bm(al.source);
                    if (!ak.doNotFireConnectionEvent && ak.fireEvent !== false) {
                        var am = {
                            connection: al,
                            source: al.source,
                            target: al.target,
                            sourceId: al.sourceId,
                            targetId: al.targetId,
                            sourceEndpoint: al.endpoints[0],
                            targetEndpoint: al.endpoints[1]
                        };
                        bM.fire("jsPlumbConnection", am, an);
                        bM.fire("connection", am, an)
                    }
                },
                bI = function (am, al, ak) {
                    ak.bind(am, function (an, ao) {
                        bM.fire(al, ak, ao)
                    })
                },
                av = function (ak) {
                    if (ak.container) {
                        return ak.container
                    } else {
                        var am = X.CurrentLibrary.getTagName(ak.source),
                                al = X.CurrentLibrary.getParent(ak.source);
                        if (am && am.toLowerCase() === "td") {
                            return X.CurrentLibrary.getParent(al)
                        } else {
                            return al
                        }
                    }
                },
                E = function (ak) {
                    var al = bM.Defaults.EndpointType || X.Endpoint;
                    var an = X.extend({}, ak);
                    an.parent = av(an);
                    an._jsPlumb = bM;
                    an.newConnection = b;
                    an.newEndpoint = E;
                    an.endpointsByUUID = by;
                    an.endpointsByElement = bA;
                    an.finaliseConnection = bH;
                    an.fireDetachEvent = bp;
                    an.floatingConnections = bh;
                    an.getParentFromParams = av;
                    an.connectionsByScope = bv;
                    var am = new al(an);
                    am.id = "ep_" + a0();
                    bI("click", "endpointClick", am);
                    bI("dblclick", "endpointDblClick", am);
                    bI("contextmenu", "contextmenu", am);
                    if (!jsPlumbAdapter.headless) {
                        bM.dragManager.endpointAdded(ak.source)
                    }
                    return am
                },
                k = function (ap, aA, an) {
                    var aB = bA[ap];
                    if (aB && aB.length) {
                        for (var am = 0, ak = aB.length; am < ak; am++) {
                            for (var ao = 0, al = aB[am].connections.length; ao < al; ao++) {
                                var aC = aA(aB[am].connections[ao]);
                                if (aC) {
                                    return
                                }
                            }
                            if (an) {
                                an(aB[am])
                            }
                        }
                    }
                },
                f = function (ak) {
                    for (var al in bA) {
                        k(al, ak)
                    }
                },
                bO = function (ak, al) {
                    return C(ak, function (an, am) {
                        bN[am] = al;
                        if (X.CurrentLibrary.isDragSupported(an)) {
                            X.CurrentLibrary.setDraggable(an, al)
                        }
                    })
                },
                bs = function (am, al, ao) {
                    al = al === "block";
                    var an = null;
                    if (ao) {
                        if (al) {
                            an = function (ap) {
                                ap.setVisible(true, true, true)
                            }
                        } else {
                            an = function (ap) {
                                ap.setVisible(false, true, true)
                            }
                        }
                    }
                    var ak = Q(am, "id");
                    k(ak, function (ap) {
                        if (al && ao) {
                            var aA = ap.sourceId === ak ? 1 : 0;
                            if (ap.endpoints[aA].isVisible()) {
                                ap.setVisible(true)
                            }
                        } else {
                            ap.setVisible(al)
                        }
                    }, an)
                },
                a = function (ak) {
                    return C(ak, function (am, an) {
                        var al = bN[an] == null ? false : bN[an];
                        al = !al;
                        bN[an] = al;
                        X.CurrentLibrary.setDraggable(am, al);
                        return al
                    })
                },
                bC = function (am, ak) {
                    var al = null;
                    if (ak) {
                        al = function (ao) {
                            var an = ao.isVisible();
                            ao.setVisible(!an)
                        }
                    }
                    k(am, function (an) {
                        var ao = an.isVisible();
                        an.setVisible(!ao)
                    }, al)
                },
                h = function (ak) {
                    var am = ak.timestamp,
                            ap = ak.recalc,
                            al = ak.offset,
                            ao = ak.elId;
                    if (bq && !am) {
                        am = bn
                    }
                    if (!ap) {
                        if (am && am === bK[ao]) {
                            return {
                                o: bc[ao],
                                s: bf[ao]
                            }
                        }
                    }
                    if (ap || !al) {
                        var an = af(ao);
                        if (an != null) {
                            bf[ao] = aj(an);
                            bc[ao] = P(an, bM);
                            bK[ao] = am
                        }
                    } else {
                        bc[ao] = al;
                        if (bf[ao] == null) {
                            var an = af(ao);
                            if (an != null) {
                                bf[ao] = aj(an)
                            }
                        }
                    }
                    if (bc[ao] && !bc[ao].right) {
                        bc[ao].right = bc[ao].left + bf[ao][0];
                        bc[ao].bottom = bc[ao].top + bf[ao][1];
                        bc[ao].width = bf[ao][0];
                        bc[ao].height = bf[ao][1];
                        bc[ao].centerx = bc[ao].left + (bc[ao].width / 2);
                        bc[ao].centery = bc[ao].top + (bc[ao].height / 2)
                    }
                    return {
                        o: bc[ao],
                        s: bf[ao]
                    }
                },
                bE = function (al) {
                    var ak = bc[al];
                    if (!ak) {
                        return h({
                            elId: al
                        })
                    } else {
                        return {
                            o: ak,
                            s: bf[al]
                        }
                    }
                },
                x = function (ao, an, al) {
                    var am = af(ao);
                    var ak = Q(am, "id");
                    if (!ak || ak == "undefined") {
                        if (arguments.length == 2 && arguments[1] != undefined) {
                            ak = an
                        } else {
                            if (arguments.length == 1 || (arguments.length == 3 && !arguments[2])) {
                                ak = "jsPlumb_" + w + "_" + a0()
                            }
                        }
                        if (!al) {
                            ah(am, "id", ak)
                        }
                    }
                    return ak
                },
                az = function (ak, am, al) {
                    ak = ak || function () {};
                    am = am || function () {};
                    return function () {
                        var ao = null;
                        try {
                            ao = am.apply(this, arguments)
                        } catch (an) {
                            V(bM, "jsPlumb function failed : " + an)
                        }
                        if (al == null || (ao !== al)) {
                            try {
                                ak.apply(this, arguments)
                            } catch (an) {
                                V(bM, "wrapped function failed : " + an)
                            }
                        }
                        return ao
                    }
                };
        this.isConnectionBeingDragged = function () {
            return bd != null
        };
        this.setConnectionBeingDragged = function (ak) {
            bd = ak
        };
        this.connectorClass = "_jsPlumb_connector";
        this.hoverClass = "_jsPlumb_hover";
        this.endpointClass = "_jsPlumb_endpoint";
        this.endpointConnectedClass = "_jsPlumb_endpoint_connected";
        this.endpointFullClass = "_jsPlumb_endpoint_full";
        this.endpointDropAllowedClass = "_jsPlumb_endpoint_drop_allowed";
        this.endpointDropForbiddenClass = "_jsPlumb_endpoint_drop_forbidden";
        this.overlayClass = "_jsPlumb_overlay";
        this.draggingClass = "_jsPlumb_dragging";
        this.elementDraggingClass = "_jsPlumb_element_dragging";
        this.sourceElementDraggingClass = "_jsPlumb_source_element_dragging";
        this.targetElementDraggingClass = "_jsPlumb_target_element_dragging";
        this.endpointAnchorClassPrefix = "_jsPlumb_endpoint_anchor";
        this.Anchors = {};
        this.Connectors = {
            canvas: {},
            svg: {},
            vml: {}
        };
        this.Endpoints = {
            canvas: {},
            svg: {},
            vml: {}
        };
        this.Overlays = {
            canvas: {},
            svg: {},
            vml: {}
        };
        this.ConnectorRenderers = {};
        this.addClass = function (ak, al) {
            return X.CurrentLibrary.addClass(ak, al)
        };
        this.removeClass = function (ak, al) {
            return X.CurrentLibrary.removeClass(ak, al)
        };
        this.hasClass = function (ak, al) {
            return X.CurrentLibrary.hasClass(ak, al)
        };
        this.addEndpoint = function (aF, aE, ak) {
            ak = ak || {};
            var aG = X.extend({}, ak);
            X.extend(aG, aE);
            aG.endpoint = aG.endpoint || bM.Defaults.Endpoint || X.Defaults.Endpoint;
            aG.paintStyle = aG.paintStyle || bM.Defaults.EndpointStyle || X.Defaults.EndpointStyle;
            aF = A(aF);
            var aC = [],
                    ap = (Z(aF) || (aF.length != null && !W(aF))) ? aF : [aF];
            for (var aB = 0, aD = ap.length; aB < aD; aB++) {
                var am = af(ap[aB]),
                        aH = x(am);
                aG.source = am;
                h({
                    elId: aH,
                    timestamp: bn
                });
                var an = E(aG);
                if (aG.parentAnchor) {
                    an.parentAnchor = aG.parentAnchor
                }
                ab(bA, aH, an);
                var ao = bc[aH],
                        aA = bf[aH];
                var al = an.anchor.compute({
                    xy: [ao.left, ao.top],
                    wh: aA,
                    element: an,
                    timestamp: bn
                });
                var aI = {
                    anchorLoc: al,
                    timestamp: bn
                };
                if (bq) {
                    aI.recalc = false
                }
                if (!bq) {
                    an.paint(aI)
                }
                aC.push(an)
            }
            return aC.length == 1 ? aC[0] : aC
        };
        this.addEndpoints = function (al, ap, aA) {
            var am = [];
            for (var an = 0, ao = ap.length; an < ao; an++) {
                var ak = bM.addEndpoint(al, ap[an], aA);
                if (Z(ak)) {
                    Array.prototype.push.apply(am, ak)
                } else {
                    am.push(ak)
                }
            }
            return am
        };
        this.animate = function (ao, ap, aA) {
            var an = af(ao),
                    ak = Q(ao, "id");
            aA = aA || {};
            var al = X.CurrentLibrary.dragEvents.step;
            var am = X.CurrentLibrary.dragEvents.complete;
            aA[al] = az(aA[al], function () {
                bM.repaint(ak)
            });
            aA[am] = az(aA[am], function () {
                bM.repaint(ak)
            });
            X.CurrentLibrary.animate(an, ap, aA)
        };
        this.checkCondition = function (an, al) {
            var aA = bM.getListener(an),
                    am = true;
            if (aA && aA.length > 0) {
                try {
                    for (var ao = 0, ap = aA.length; ao < ap; ao++) {
                        am = am && aA[ao](al)
                    }
                } catch (ak) {
                    V(bM, "cannot check condition [" + an + "]" + ak)
                }
            }
            return am
        };
        this.checkASyncCondition = function (an, al, am, ao) {
            var ap = bM.getListener(an);
            if (ap && ap.length > 0) {
                try {
                    ap[0](al, am, ao)
                } catch (ak) {
                    V(bM, "cannot asynchronously check condition [" + an + "]" + ak)
                }
            }
        };
        this.connect = function (ak, am) {
            var an = ar(ak, am),
                    al;
            if (an) {
                if (an.deleteEndpointsOnDetach == null) {
                    an.deleteEndpointsOnDetach = true
                }
                al = b(an);
                bH(al, an)
            }
            return al
        };
        this.deleteEndpoint = function (ak, al) {
            bM.doWhileSuspended(function () {
                var am = (typeof ak == "string") ? by[ak] : ak;
                if (am) {
                    var ap = am.getUuid();
                    if (ap) {
                        by[ap] = null
                    }
                    am.detachAll().cleanup();
                    if (am.endpoint.cleanup) {
                        am.endpoint.cleanup()
                    }
                    jsPlumbUtil.removeElements(am.endpoint.getDisplayElements());
                    bM.anchorManager.deleteEndpoint(am);
                    for (var an in bA) {
                        var aC = bA[an];
                        if (aC) {
                            var ao = [];
                            for (var aA = 0, aB = aC.length; aA < aB; aA++) {
                                if (aC[aA] != am) {
                                    ao.push(aC[aA])
                                }
                            }
                            bA[an] = ao
                        }
                        if (bA[an].length < 1) {
                            delete bA[an]
                        }
                    }
                    if (!jsPlumbAdapter.headless) {
                        bM.dragManager.endpointDeleted(am)
                    }
                }
                return bM
            }, al)
        };
        this.deleteEveryEndpoint = function () {
            bM.doWhileSuspended(function () {
                for (var ak in bA) {
                    var an = bA[ak];
                    if (an && an.length) {
                        for (var al = 0, am = an.length; al < am; al++) {
                            bM.deleteEndpoint(an[al], true)
                        }
                    }
                }
                bA = {};
                by = {};
                bM.anchorManager.reset();
                bM.dragManager.reset()
            });
            return bM
        };
        var bp = function (am, ak, ap) {
            var an = bM.Defaults.ConnectionType || bM.getDefaultConnectionType(),
                    ao = am.constructor == an,
                    al = ao ? {
                        connection: am,
                        source: am.source,
                        target: am.target,
                        sourceId: am.sourceId,
                        targetId: am.targetId,
                        sourceEndpoint: am.endpoints[0],
                        targetEndpoint: am.endpoints[1]
                    } : am;
            if (ak) {
                bM.fire("jsPlumbConnectionDetached", al, ap);
                bM.fire("connectionDetached", al, ap)
            }
            bM.anchorManager.connectionDetached(al)
        };
        this.detach = function () {
            if (arguments.length == 0) {
                return
            }
            var ao = bM.Defaults.ConnectionType || bM.getDefaultConnectionType(),
                    an = arguments[0].constructor == ao,
                    ap = arguments.length == 2 ? an ? (arguments[1] || {}) : arguments[0] : arguments[0],
                    ak = (ap.fireEvent !== false),
                    aB = ap.forceDetach,
                    aA = an ? arguments[0] : ap.connection;
            if (aA) {
                if (aB || jsPlumbUtil.functionChain(true, false, [
                    [aA.endpoints[0], "isDetachAllowed", [aA]],
                    [aA.endpoints[1], "isDetachAllowed", [aA]],
                    [aA, "isDetachAllowed", [aA]],
                    [bM, "checkCondition", ["beforeDetach", aA]]
                ])) {
                    aA.endpoints[0].detach(aA, false, true, ak)
                }
            } else {
                var aC = X.extend({}, ap);
                if (aC.uuids) {
                    aw(aC.uuids[0]).detachFrom(aw(aC.uuids[1]), ak)
                } else {
                    if (aC.sourceEndpoint && aC.targetEndpoint) {
                        aC.sourceEndpoint.detachFrom(aC.targetEndpoint)
                    } else {
                        var al = x(aC.source),
                                am = x(aC.target);
                        k(al, function (aD) {
                            if ((aD.sourceId == al && aD.targetId == am) || (aD.targetId == al && aD.sourceId == am)) {
                                if (bM.checkCondition("beforeDetach", aD)) {
                                    aD.endpoints[0].detach(aD, false, true, ak)
                                }
                            }
                        })
                    }
                }
            }
        };
        this.detachAllConnections = function (am, al) {
            al = al || {};
            am = af(am);
            var ak = Q(am, "id"),
                    ap = bA[ak];
            if (ap && ap.length) {
                for (var an = 0, ao = ap.length; an < ao; an++) {
                    ap[an].detachAll(al.fireEvent)
                }
            }
            return bM
        };
        this.detachEveryConnection = function (al) {
            al = al || {};
            for (var ak in bA) {
                var ao = bA[ak];
                if (ao && ao.length) {
                    for (var am = 0, an = ao.length; am < an; am++) {
                        ao[am].detachAll(al.fireEvent)
                    }
                }
            }
            bv = {};
            return bM
        };
        this.draggable = function (al, an) {
            if (typeof al == "object" && al.length) {
                for (var am = 0, ao = al.length; am < ao; am++) {
                    var ak = af(al[am]);
                    if (ak) {
                        bk(ak, true, an)
                    }
                }
            } else {
                if (al._nodes) {
                    for (var am = 0, ao = al._nodes.length; am < ao; am++) {
                        var ak = af(al._nodes[am]);
                        if (ak) {
                            bk(ak, true, an)
                        }
                    }
                } else {
                    var ak = af(al);
                    if (ak) {
                        bk(ak, true, an)
                    }
                }
            }
            return bM
        };
        this.extend = function (ak, al) {
            return X.CurrentLibrary.extend(ak, al)
        };
        this.getDefaultEndpointType = function () {
            return X.Endpoint
        };
        this.getDefaultConnectionType = function () {
            return X.Connection
        };
        var bL = function (ak, al, an, ap) {
            for (var am = 0, ao = ak.length; am < ao; am++) {
                ak[am][al].apply(ak[am], an)
            }
            return ap(ak)
        },
                l = function (ak, al, an) {
                    var ao = [];
                    for (var am = 0, ap = ak.length; am < ap; am++) {
                        ao.push([ak[am][al].apply(ak[am], an), ak[am]])
                    }
                    return ao
                },
                ay = function (ak, al, am) {
                    return function () {
                        return bL(ak, al, arguments, am)
                    }
                },
                au = function (ak, al) {
                    return function () {
                        return l(ak, al, arguments)
                    }
                },
                bJ = function (ao, ak) {
                    var al = [];
                    if (ao) {
                        if (typeof ao == "string") {
                            if (ao === "*") {
                                return ao
                            }
                            al.push(ao)
                        } else {
                            if (ak) {
                                al = ao
                            } else {
                                for (var am = 0, an = ao.length; am < an; am++) {
                                    al.push(x(af(ao[am])))
                                }
                            }
                        }
                    }
                    return al
                },
                D = function (ak, al, am) {
                    if (ak === "*") {
                        return true
                    }
                    return ak.length > 0 ? K(ak, al) != -1 : !am
                };
        this.getConnections = function (al, aE) {
            if (!al) {
                al = {}
            } else {
                if (al.constructor == String) {
                    al = {
                        scope: al
                    }
                }
            }
            var am = al.scope || bM.getDefaultScope(),
                    an = bJ(am, true),
                    aF = bJ(al.source),
                    ap = bJ(al.target),
                    aB = (!aE && an.length > 1) ? {} : [],
                    ak = function (aH, aG) {
                        if (!aE && an.length > 1) {
                            var aI = aB[aH];
                            if (aI == null) {
                                aI = [];
                                aB[aH] = aI
                            }
                            aI.push(aG)
                        } else {
                            aB.push(aG)
                        }
                    };
            for (var aC in bv) {
                if (D(an, aC)) {
                    for (var aD = 0, aA = bv[aC].length; aD < aA; aD++) {
                        var ao = bv[aC][aD];
                        if (D(aF, ao.sourceId) && D(ap, ao.targetId)) {
                            ak(aC, ao)
                        }
                    }
                }
            }
            return aB
        };
        var r = function (al, ak) {
            return function (am) {
                for (var ao = 0, an = al.length; ao < an; ao++) {
                    am(al[ao])
                }
                return ak(al)
            }
        },
                o = function (ak) {
                    return function (al) {
                        return ak[al]
                    }
                };
        var n = function (al, ak) {
            var aA = {
                length: al.length,
                each: r(al, ak),
                get: o(al)
            },
            am = ["setHover", "removeAllOverlays", "setLabel", "addClass", "addOverlay", "removeOverlay", "removeOverlays", "showOverlay", "hideOverlay", "showOverlays", "hideOverlays", "setPaintStyle", "setHoverPaintStyle", "setSuspendEvents", "setParameter", "setParameters", "setVisible", "repaint", "addType", "toggleType", "removeType", "removeClass", "setType", "bind", "unbind"],
                    an = ["getLabel", "getOverlay", "isHover", "getParameter", "getParameters", "getPaintStyle", "getHoverPaintStyle", "isVisible", "hasType", "getType", "isSuspendEvents"];
            for (var ap = 0, ao = am.length; ap < ao; ap++) {
                aA[am[ap]] = ay(al, am[ap], ak)
            }
            for (var ap = 0, ao = an.length; ap < ao; ap++) {
                aA[an[ap]] = au(al, an[ap])
            }
            return aA
        };
        var y = function (ak) {
            var al = n(ak, y);
            return X.CurrentLibrary.extend(al, {
                setDetachable: ay(ak, "setDetachable", y),
                setReattach: ay(ak, "setReattach", y),
                setConnector: ay(ak, "setConnector", y),
                detach: function () {
                    for (var an = 0, am = ak.length; an < am; an++) {
                        bM.detach(ak[an])
                    }
                },
                isDetachable: au(ak, "isDetachable"),
                isReattach: au(ak, "isReattach")
            })
        };
        var bl = function (ak) {
            var al = n(ak, bl);
            return X.CurrentLibrary.extend(al, {
                setEnabled: ay(ak, "setEnabled", bl),
                setAnchor: ay(ak, "setAnchor", bl),
                isEnabled: au(ak, "isEnabled"),
                detachAll: function () {
                    for (var an = 0, am = ak.length; an < am; an++) {
                        ak[an].detachAll()
                    }
                },
                remove: function () {
                    for (var an = 0, am = ak.length; an < am; an++) {
                        bM.deleteEndpoint(ak[an])
                    }
                }
            })
        };
        this.select = function (al) {
            al = al || {};
            al.scope = al.scope || "*";
            var ak = al.connections || bM.getConnections(al, true);
            return y(ak)
        };
        this.selectEndpoints = function (am) {
            am = am || {};
            am.scope = am.scope || "*";
            var aE = !am.element && !am.source && !am.target,
                    aB = aE ? "*" : bJ(am.element),
                    aH = aE ? "*" : bJ(am.source),
                    aK = aE ? "*" : bJ(am.target),
                    ap = bJ(am.scope, true);
            var aI = [];
            for (var aG in bA) {
                var al = D(aB, aG, true),
                        ao = D(aH, aG, true),
                        aL = aH != "*",
                        aJ = D(aK, aG, true),
                        aC = aK != "*";
                if (al || ao || aJ) {
                    inner: for (var an = 0, aD = bA[aG].length; an < aD; an++) {
                        var aA = bA[aG][an];
                        if (D(ap, aA.scope, true)) {
                            var ak = (aL && aH.length > 0 && !aA.isSource),
                                    aF = (aC && aK.length > 0 && !aA.isTarget);
                            if (ak || aF) {
                                continue inner
                            }
                            aI.push(aA)
                        }
                    }
                }
            }
            return bl(aI)
        };
        this.getAllConnections = function () {
            return bv
        };
        this.getDefaultScope = function () {
            return m
        };
        this.getEndpoint = aw;
        this.getEndpoints = function (ak) {
            return bA[x(ak)]
        };
        this.getId = x;
        this.getOffset = function (ak) {
            var al = bc[ak];
            return h({
                elId: ak
            })
        };
        this.getSelector = function () {
            return X.CurrentLibrary.getSelector.apply(null, arguments)
        };
        this.getSize = function (ak) {
            var al = bf[ak];
            if (!al) {
                h({
                    elId: ak
                })
            }
            return bf[ak]
        };
        this.appendElement = bx;
        var bB = false;
        this.isHoverSuspended = function () {
            return bB
        };
        this.setHoverSuspended = function (ak) {
            bB = ak
        };
        var bw = function (ak) {
            return function () {
                return jsPlumbAdapter.isRenderModeAvailable(ak)
            }
        };
        this.isCanvasAvailable = bw("canvas");
        this.isSVGAvailable = bw("svg");
        this.isVMLAvailable = bw("vml");
        this.hide = function (al, ak) {
            bs(al, "none", ak);
            return bM
        };
        this.idstamp = a0;
        this.init = function () {
            if (!s) {
                bM.anchorManager = new X.AnchorManager({
                    jsPlumbInstance: bM
                });
                bM.setRenderMode(bM.Defaults.RenderMode);
                s = true;
                bM.fire("ready", bM)
            }
        };
        this.log = p;
        this.jsPlumbUIComponent = R;
        this.makeAnchor = function () {
            var am = function (aC, aB) {
                if (X.Anchors[aC]) {
                    return new X.Anchors[aC](aB)
                }
                if (!bM.Defaults.DoNotThrowErrors) {
                    throw {
                        msg: "jsPlumb: unknown anchor type '" + aC + "'"
                    }
                }
            };
            if (arguments.length == 0) {
                return null
            }
            var ak = arguments[0],
                    ao = arguments[1],
                    ap = arguments[2],
                    an = null;
            if (ak.compute && ak.getOrientation) {
                return ak
            } else {
                if (typeof ak == "string") {
                    an = am(arguments[0], {
                        elementId: ao,
                        jsPlumbInstance: bM
                    })
                } else {
                    if (Z(ak)) {
                        if (Z(ak[0]) || W(ak[0])) {
                            if (ak.length == 2 && W(ak[0]) && L(ak[1])) {
                                var aA = X.extend({
                                    elementId: ao,
                                    jsPlumbInstance: bM
                                }, ak[1]);
                                an = am(ak[0], aA)
                            } else {
                                an = new X.DynamicAnchor({
                                    anchors: ak,
                                    selector: null,
                                    elementId: ao,
                                    jsPlumbInstance: ap
                                })
                            }
                        } else {
                            var al = {
                                x: ak[0],
                                y: ak[1],
                                orientation: (ak.length >= 4) ? [ak[2], ak[3]] : [0, 0],
                                offsets: (ak.length >= 6) ? [ak[4], ak[5]] : [0, 0],
                                elementId: ao,
                                jsPlumbInstance: ap,
                                cssClass: ak.length == 7 ? ak[6] : null
                            };
                            an = new X.Anchor(al);
                            an.clone = function () {
                                return new X.Anchor(al)
                            }
                        }
                    }
                }
            }
            if (!an.id) {
                an.id = "anchor_" + a0()
            }
            return an
        };
        this.makeAnchors = function (am, ao, ap) {
            var ak = [];
            for (var an = 0, al = am.length; an < al; an++) {
                if (typeof am[an] == "string") {
                    ak.push(X.Anchors[am[an]]({
                        elementId: ao,
                        jsPlumbInstance: ap
                    }))
                } else {
                    if (Z(am[an])) {
                        ak.push(bM.makeAnchor(am[an], ao, ap))
                    }
                }
            }
            return ak
        };
        this.makeDynamicAnchor = function (al, ak) {
            return new X.DynamicAnchor({
                anchors: al,
                selector: ak,
                elementId: null,
                jsPlumbInstance: bM
            })
        };
        var bu = {},
                B = {},
                bg = {},
                ax = {},
                e = function (al, ak) {
                    al.paintStyle = al.paintStyle || bM.Defaults.EndpointStyles[ak] || bM.Defaults.EndpointStyle || X.Defaults.EndpointStyles[ak] || X.Defaults.EndpointStyle;
                    al.hoverPaintStyle = al.hoverPaintStyle || bM.Defaults.EndpointHoverStyles[ak] || bM.Defaults.EndpointHoverStyle || X.Defaults.EndpointHoverStyles[ak] || X.Defaults.EndpointHoverStyle;
                    al.anchor = al.anchor || bM.Defaults.Anchors[ak] || bM.Defaults.Anchor || X.Defaults.Anchors[ak] || X.Defaults.Anchor;
                    al.endpoint = al.endpoint || bM.Defaults.Endpoints[ak] || bM.Defaults.Endpoint || X.Defaults.Endpoints[ak] || X.Defaults.Endpoint
                };
        this.makeTarget = function (aC, aB, ak) {
            var aE = X.extend({
                _jsPlumb: bM
            }, ak);
            X.extend(aE, aB);
            e(aE, 1);
            var an = X.CurrentLibrary,
                    am = aE.scope || bM.Defaults.Scope,
                    aA = !(aE.deleteEndpointsOnDetach === false),
                    aD = aE.maxConnections || -1,
                    aF = aE.onMaxConnections;
            _doOne = function (aG) {
                var aI = x(aG);
                bu[aI] = aE;
                bg[aI] = aE.uniqueEndpoint, ax[aI] = aD, ba[aI] = true, proxyComponent = new R(aE);
                var aJ = X.extend({}, aE.dropOptions || {}),
                        aK = function () {
                            var aU = X.CurrentLibrary.getDropEvent(arguments),
                                    aR = bM.select({
                                        target: aI
                                    }).length;
                            bM.currentlyDragging = false;
                            var aT = af(an.getDragObject(arguments)),
                                    aS = Q(aT, "dragId"),
                                    aX = Q(aT, "originalScope"),
                                    aM = bh[aS],
                                    aW = aM.endpoints[0],
                                    aY = aE.endpoint ? X.extend({}, aE.endpoint) : {};
                            if (!ba[aI] || ax[aI] > 0 && aR >= ax[aI]) {
                                if (aF) {
                                    aF({
                                        element: aG,
                                        connection: aM
                                    }, aU)
                                }
                                return false
                            }
                            aW.anchor.locked = false;
                            if (aX) {
                                an.setDragScope(aT, aX)
                            }
                            var aO = proxyComponent.isDropAllowed(aM.sourceId, x(aG), aM.scope, aM, null);
                            if (aM.endpointsToDeleteOnDetach) {
                                if (aW === aM.endpointsToDeleteOnDetach[0]) {
                                    aM.endpointsToDeleteOnDetach[0] = null
                                } else {
                                    if (aW === aM.endpointsToDeleteOnDetach[1]) {
                                        aM.endpointsToDeleteOnDetach[1] = null
                                    }
                                }
                            }
                            if (aM.suspendedEndpoint) {
                                aM.targetId = aM.suspendedEndpoint.elementId;
                                aM.target = an.getElementObject(aM.suspendedEndpoint.elementId);
                                aM.endpoints[1] = aM.suspendedEndpoint
                            }
                            if (aO) {
                                aW.detach(aM, false, true, false);
                                var aV = B[aI] || bM.addEndpoint(aG, aE);
                                if (aE.uniqueEndpoint) {
                                    B[aI] = aV
                                }
                                aV._makeTargetCreator = true;
                                if (aV.anchor.positionFinder != null) {
                                    var aL = an.getUIPosition(arguments, bM.getZoom()),
                                            aP = P(aG, bM),
                                            aZ = aj(aG),
                                            aQ = aV.anchor.positionFinder(aL, aP, aZ, aV.anchor.constructorParams);
                                    aV.anchor.x = aQ[0];
                                    aV.anchor.y = aQ[1]
                                }
                                var aN = bM.connect({
                                    source: aW,
                                    target: aV,
                                    scope: aX,
                                    previousConnection: aM,
                                    container: aM.parent,
                                    deleteEndpointsOnDetach: aA,
                                    endpointsToDeleteOnDetach: aA ? [aW, aV] : null,
                                    doNotFireConnectionEvent: aW.endpointWillMoveAfterConnection
                                });
                                if (aM.endpoints[1]._makeTargetCreator && aM.endpoints[1].connections.length < 2) {
                                    bM.deleteEndpoint(aM.endpoints[1])
                                }
                                aN.repaint()
                            } else {
                                if (aM.suspendedEndpoint) {
                                    if (aM.isReattach()) {
                                        aM.setHover(false);
                                        aM.floatingAnchorIndex = null;
                                        aM.suspendedEndpoint.addConnection(aM);
                                        bM.repaint(aW.elementId)
                                    } else {
                                        aW.detach(aM, false, true, true, aU)
                                    }
                                }
                            }
                        };
                var aH = an.dragEvents.drop;
                aJ.scope = aJ.scope || am;
                aJ[aH] = az(aJ[aH], aK);
                an.initDroppable(aG, aJ, true)
            };
            aC = A(aC);
            var ao = aC.length && aC.constructor != String ? aC : [aC];
            for (var ap = 0, al = ao.length; ap < al; ap++) {
                _doOne(af(ao[ap]))
            }
            return bM
        };
        this.unmakeTarget = function (al, ak) {
            al = X.CurrentLibrary.getElementObject(al);
            var am = x(al);
            if (!ak) {
                delete bu[am];
                delete bg[am];
                delete ax[am];
                delete ba[am]
            }
            return bM
        };
        this.makeTargets = function (am, ak, ao) {
            for (var an = 0, al = am.length; an < al; an++) {
                bM.makeTarget(am[an], ak, ao)
            }
        };
        var at = {},
                br = {},
                bo = {},
                c = {},
                u = {},
                q = {},
                ba = {},
                bz = function (ap, ak, aA) {
                    var am = ap.target || ap.srcElement,
                            an = false,
                            al = bM.getSelector(ak, aA);
                    for (var ao = 0; ao < al.length; ao++) {
                        if (al[ao] == am) {
                            an = true;
                            break
                        }
                    }
                    return an
                };
        this.makeSource = function (aA, ap, ak) {
            var aC = X.extend({}, ak);
            X.extend(aC, ap);
            e(aC, 0);
            var am = X.CurrentLibrary,
                    aB = aC.maxConnections || -1,
                    aD = aC.onMaxConnections,
                    aE = function (aO) {
                        var aI = x(aO),
                                aM = function () {
                                    return aC.parent == null ? aC.parent : aC.parent === "parent" ? am.getElementObject(am.getDOMElement(aO).parentNode) : am.getElementObject(aC.parent)
                                },
                                aJ = aC.parent != null ? bM.getId(aM()) : aI;
                        at[aJ] = aC;
                        bo[aJ] = aC.uniqueEndpoint;
                        c[aJ] = true;
                        var aH = am.dragEvents.stop,
                                aP = am.dragEvents.drag,
                                aN = X.extend({}, aC.dragOptions || {}),
                                aF = aN.drag,
                                aL = aN.stop,
                                aK = null,
                                aQ = false;
                        q[aJ] = aB;
                        aN.scope = aN.scope || aC.scope;
                        aN[aP] = az(aN[aP], function () {
                            if (aF) {
                                aF.apply(this, arguments)
                            }
                            aQ = false
                        });
                        aN[aH] = az(aN[aH], function () {
                            if (aL) {
                                aL.apply(this, arguments)
                            }
                            bM.currentlyDragging = false;
                            if (aK.connections.length == 0) {
                                bM.deleteEndpoint(aK)
                            } else {
                                am.unbind(aK.canvas, "mousedown");
                                var aU = aC.anchor || bM.Defaults.Anchor,
                                        aS = aK.anchor,
                                        aT = aK.connections[0];
                                aK.setAnchor(bM.makeAnchor(aU, aI, bM));
                                if (aC.parent) {
                                    var aW = aM();
                                    if (aW) {
                                        var aV = aK.elementId,
                                                aR = aC.container || bM.Defaults.Container || X.Defaults.Container;
                                        aK.setElement(aW, aR);
                                        aK.endpointWillMoveAfterConnection = false;
                                        bM.anchorManager.rehomeEndpoint(aV, aW);
                                        aT.previousConnection = null;
                                        U(bv[aT.scope], function (aX) {
                                            return aX.id === aT.id
                                        });
                                        bM.anchorManager.connectionDetached({
                                            sourceId: aT.sourceId,
                                            targetId: aT.targetId,
                                            connection: aT
                                        });
                                        bH(aT)
                                    }
                                }
                                aK.repaint();
                                bM.repaint(aK.elementId);
                                bM.repaint(aT.targetId)
                            }
                        });
                        var aG = function (aR) {
                            if (!c[aJ]) {
                                return
                            }
                            if (aC.filter) {
                                var aZ = am.getOriginalEvent(aR),
                                        aY = jsPlumbUtil.isString(aC.filter) ? bz(aZ, aO, aC.filter) : aC.filter(aZ, aO);
                                if (aY === false) {
                                    return
                                }
                            }
                            var aU = bM.select({
                                source: aJ
                            }).length;
                            if (q[aJ] >= 0 && aU >= q[aJ]) {
                                if (aD) {
                                    aD({
                                        element: aO,
                                        maxConnections: aB
                                    }, aR)
                                }
                                return false
                            }
                            var a2 = h({
                                elId: aI
                            }).o,
                                    a5 = bM.getZoom(),
                                    a3 = (((aR.pageX || aR.page.x) / a5) - a2.left) / a2.width,
                                    a4 = (((aR.pageY || aR.page.y) / a5) - a2.top) / a2.height,
                                    aT = a3,
                                    aW = a4;
                            if (aC.parent) {
                                var a6 = aM(),
                                        aS = x(a6);
                                a2 = h({
                                    elId: aS
                                }).o;
                                aT = ((aR.pageX || aR.page.x) - a2.left) / a2.width, aW = ((aR.pageY || aR.page.y) - a2.top) / a2.height
                            }
                            var aX = {};
                            X.extend(aX, aC);
                            aX.isSource = true;
                            aX.anchor = [a3, a4, 0, 0];
                            aX.parentAnchor = [aT, aW, 0, 0];
                            aX.dragOptions = aN;
                            if (aC.parent) {
                                var aV = aX.container || bM.Defaults.Container || X.Defaults.Container;
                                if (aV) {
                                    aX.container = aV
                                } else {
                                    aX.container = X.CurrentLibrary.getParent(aM())
                                }
                            }
                            aK = bM.addEndpoint(aI, aX);
                            aQ = true;
                            aK.endpointWillMoveAfterConnection = aC.parent != null;
                            aK.endpointWillMoveTo = aC.parent ? aM() : null;
                            aK.addedViaMouse = true;
                            var a1 = function () {
                                if (aQ) {
                                    bM.deleteEndpoint(aK)
                                }
                            };
                            bM.registerListener(aK.canvas, "mouseup", a1);
                            bM.registerListener(aO, "mouseup", a1);
                            am.trigger(aK.canvas, "mousedown", aR)
                        };
                        bM.registerListener(aO, "mousedown", aG);
                        u[aI] = aG;
                        if (aC.filter && jsPlumbUtil.isString(aC.filter)) {
                            am.setDragFilter(aO, aC.filter)
                        }
                    };
            aA = A(aA);
            var an = aA.length && aA.constructor != String ? aA : [aA];
            for (var ao = 0, al = an.length; ao < al; ao++) {
                aE(af(an[ao]))
            }
            return bM
        };
        this.unmakeSource = function (am, al) {
            am = X.CurrentLibrary.getElementObject(am);
            var ak = x(am),
                    an = u[ak];
            if (an) {
                bM.unregisterListener(am, "mousedown", an)
            }
            if (!al) {
                delete at[ak];
                delete bo[ak];
                delete c[ak];
                delete u[ak];
                delete q[ak]
            }
            return bM
        };
        this.unmakeEverySource = function () {
            for (var ak in c) {
                bM.unmakeSource(ak, true)
            }
            at = {};
            bo = {};
            c = {};
            u = {}
        };
        this.unmakeEveryTarget = function () {
            for (var ak in ba) {
                bM.unmakeTarget(ak, true)
            }
            bu = {};
            bg = {};
            ax = {};
            ba = {};
            return bM
        };
        this.makeSources = function (am, ak, ao) {
            for (var an = 0, al = am.length; an < al; an++) {
                bM.makeSource(am[an], ak, ao)
            }
            return bM
        };
        var bF = function (am, an, al, aB) {
            var aA = am == "source" ? c : ba;
            if (W(an)) {
                aA[an] = aB ? !aA[an] : al
            } else {
                if (an.length) {
                    an = A(an);
                    for (var ap = 0, ao = an.length; ap < ao; ap++) {
                        var ak = _el = X.CurrentLibrary.getElementObject(an[ap]),
                                ak = x(_el);
                        aA[ak] = aB ? !aA[ak] : al
                    }
                }
            }
            return bM
        };
        this.setSourceEnabled = function (al, ak) {
            return bF("source", al, ak)
        };
        this.toggleSourceEnabled = function (ak) {
            bF("source", ak, null, true);
            return bM.isSourceEnabled(ak)
        };
        this.isSource = function (ak) {
            ak = X.CurrentLibrary.getElementObject(ak);
            return c[x(ak)] != null
        };
        this.isSourceEnabled = function (ak) {
            ak = X.CurrentLibrary.getElementObject(ak);
            return c[x(ak)] === true
        };
        this.setTargetEnabled = function (al, ak) {
            return bF("target", al, ak)
        };
        this.toggleTargetEnabled = function (ak) {
            bF("target", ak, null, true);
            return bM.isTargetEnabled(ak)
        };
        this.isTarget = function (ak) {
            ak = X.CurrentLibrary.getElementObject(ak);
            return ba[x(ak)] != null
        };
        this.isTargetEnabled = function (ak) {
            ak = X.CurrentLibrary.getElementObject(ak);
            return ba[x(ak)] === true
        };
        this.ready = function (ak) {
            bM.bind("ready", ak)
        };
        this.repaint = function (am, ak, al) {
            if (typeof am == "object" && am.length) {
                for (var ao = 0, an = am.length; ao < an; ao++) {
                    bm(af(am[ao]), ak, al)
                }
            } else {
                bm(af(am), ak, al)
            }
            return bM
        };
        this.repaintEverything = function () {
            var ak = null;
            for (var al in bA) {
                bm(af(al), null, ak)
            }
            return bM
        };
        this.removeAllEndpoints = function (al, ak) {
            var am = function (an) {
                var aB = jsPlumbUtil.isString(an) ? an : x(af(an)),
                        ao = bA[aB];
                if (ao) {
                    for (var aA = 0, ap = ao.length; aA < ap; aA++) {
                        bM.deleteEndpoint(ao[aA])
                    }
                }
                delete bA[aB];
                if (ak) {
                    var aC = X.CurrentLibrary.getDOMElement(af(an));
                    if (aC && aC.nodeType != 3 && aC.nodeType != 8) {
                        for (var aA = 0, ap = aC.childNodes.length; aA < ap; aA++) {
                            am(aC.childNodes[aA])
                        }
                    }
                }
            };
            am(al);
            return bM
        };
        this.remove = function (am) {
            var ak = af(am);
            var al = jsPlumbUtil.isString(am) ? am : x(ak);
            bM.doWhileSuspended(function () {
                bM.removeAllEndpoints(al, true);
                bM.dragManager.elementRemoved(al)
            });
            X.CurrentLibrary.removeElement(ak)
        };
        var be = {},
                bj = function () {
                    for (var am in be) {
                        for (var an = 0, al = be[am].length; an < al; an++) {
                            var ak = be[am][an];
                            X.CurrentLibrary.unbind(ak.el, ak.event, ak.listener)
                        }
                    }
                    be = {}
                };
        this.registerListener = function (al, am, ak) {
            X.CurrentLibrary.bind(al, am, ak);
            ab(be, am, {
                el: al,
                event: am,
                listener: ak
            })
        };
        this.unregisterListener = function (al, am, ak) {
            X.CurrentLibrary.unbind(al, am, ak);
            U(be, function (an) {
                return an.type == am && an.listener == ak
            })
        };
        this.reset = function () {
            bM.deleteEveryEndpoint();
            bM.unbind();
            bu = {};
            B = {};
            bg = {};
            ax = {};
            at = {};
            br = {};
            bo = {};
            q = {};
            bj();
            bM.anchorManager.reset();
            if (!jsPlumbAdapter.headless) {
                bM.dragManager.reset()
            }
        };
        this.setDefaultScope = function (ak) {
            m = ak;
            return bM
        };
        this.setDraggable = bO;
        this.setId = function (aA, ap, al) {
            var aC = aA.constructor == String ? aA : bM.getId(aA),
                    aB = bM.getConnections({
                        source: aC,
                        scope: "*"
                    }, true),
                    an = bM.getConnections({
                        target: aC,
                        scope: "*"
                    }, true);
            ap = "" + ap;
            if (!al) {
                aA = X.CurrentLibrary.getElementObject(aC);
                X.CurrentLibrary.setAttribute(aA, "id", ap)
            }
            aA = X.CurrentLibrary.getElementObject(ap);
            bA[ap] = bA[aC] || [];
            for (var am = 0, ak = bA[ap].length; am < ak; am++) {
                bA[ap][am].setElementId(ap);
                bA[ap][am].setReferenceElement(aA)
            }
            delete bA[aC];
            bM.anchorManager.changeId(aC, ap);
            if (!jsPlumbAdapter.headless) {
                bM.dragManager.changeId(aC, ap)
            }
            var ao = function (aF, aE, aG) {
                for (var aD = 0, aH = aF.length; aD < aH; aD++) {
                    aF[aD].endpoints[aE].setElementId(ap);
                    aF[aD].endpoints[aE].setReferenceElement(aA);
                    aF[aD][aG + "Id"] = ap;
                    aF[aD][aG] = aA
                }
            };
            ao(aB, 0, "source");
            ao(an, 1, "target");
            bM.repaint(ap)
        };
        this.setIdChanged = function (ak, al) {
            bM.setId(ak, al, true)
        };
        this.setDebugLog = function (ak) {
            p = ak
        };
        var bq = false,
                bn = null;
        this.setSuspendDrawing = function (ak, al) {
            bq = ak;
            if (ak) {
                bn = new Date().getTime()
            } else {
                bn = null
            }
            if (al) {
                bM.repaintEverything()
            }
        };
        this.isSuspendDrawing = function () {
            return bq
        };
        this.getSuspendedAt = function () {
            return bn
        };
        this.doWhileSuspended = function (al, am) {
            bM.setSuspendDrawing(true);
            try {
                al()
            } catch (ak) {
                V("Function run while suspended failed", ak)
            }
            bM.setSuspendDrawing(false, !am)
        };
        this.updateOffset = h;
        this.getOffset = function (ak) {
            return bc[ak]
        };
        this.getSize = function (ak) {
            return bf[ak]
        };
        this.getCachedData = bE;
        this.timestamp = T;
        this.SVG = "svg";
        this.CANVAS = "canvas";
        this.VML = "vml";
        this.setRenderMode = function (ak) {
            g = jsPlumbAdapter.setRenderMode(ak);
            return g
        };
        this.getRenderMode = function () {
            return g
        };
        this.show = function (al, ak) {
            bs(al, "block", ak);
            return bM
        };
        this.sizeCanvas = function (am, ao, ak, an, al) {
            if (am) {
                am.style.height = al + "px";
                am.height = al;
                am.style.width = an + "px";
                am.width = an;
                am.style.left = ao + "px";
                am.style.top = ak + "px"
            }
            return bM
        };
        this.getTestHarness = function () {
            return {
                endpointsByElement: bA,
                endpointCount: function (al) {
                    var ak = bA[al];
                    return ak ? ak.length : 0
                },
                connectionCount: function (al) {
                    al = al || m;
                    var ak = bv[al];
                    return ak ? ak.length : 0
                },
                getId: x,
                makeAnchor: self.makeAnchor,
                makeDynamicAnchor: self.makeDynamicAnchor
            }
        };
        this.toggleVisible = bC;
        this.toggleDraggable = a;
        this.wrap = az;
        this.addListener = this.bind;
        this.adjustForParentOffsetAndScroll = function (ak, an) {
            var am = null,
                    ap = ak;
            if (an.tagName.toLowerCase() === "svg" && an.parentNode) {
                am = an.parentNode
            } else {
                if (an.offsetParent) {
                    am = an.offsetParent
                }
            }
            if (am != null) {
                var ao = am.tagName.toLowerCase() === "body" ? {
                    left: 0,
                    top: 0
                } : P(am, bM),
                        al = am.tagName.toLowerCase() === "body" ? {
                    left: 0,
                    top: 0
                } : {
                    left: am.scrollLeft,
                    top: am.scrollTop
                };
                ap[0] = ak[0] - ao.left + al.left;
                ap[1] = ak[1] - ao.top + al.top
            }
            return ap
        };
        if (!jsPlumbAdapter.headless) {
            bM.dragManager = jsPlumbAdapter.getDragManager(bM);
            bM.recalculateOffsets = bM.dragManager.updateOffsets
        }
    };
    var X = new J();
    if (typeof window != "undefined") {
        window.jsPlumb = X
    }
    X.getInstance = function (a) {
        var b = new J(a);
        b.init();
        return b
    };
    if (typeof define === "function") {
        define("jsplumb", [], function () {
            return X
        });
        define("jsplumbinstance", [], function () {
            return X.getInstance()
        })
    }
    if (typeof exports !== "undefined") {
        exports.jsPlumb = X
    }
})();
(function () {
    jsPlumb.AnchorManager = function (a) {
        var V = {},
                G = {},
                D = {},
                O = {},
                J = {},
                b = {
                    HORIZONTAL: "horizontal",
                    VERTICAL: "vertical",
                    DIAGONAL: "diagonal",
                    IDENTITY: "identity"
                },
        T = {},
                M = this,
                S = {},
                K = a.jsPlumbInstance,
                U = jsPlumb.CurrentLibrary,
                N = {},
                Q = function (g, f, m, q, l, e) {
                    if (g === f) {
                        return {
                            orientation: b.IDENTITY,
                            a: ["top", "top"]
                        }
                    }
                    var r = Math.atan2((q.centery - m.centery), (q.centerx - m.centerx)),
                            n = Math.atan2((m.centery - q.centery), (m.centerx - q.centerx)),
                            o = ((m.left <= q.left && m.right >= q.left) || (m.left <= q.right && m.right >= q.right) || (m.left <= q.left && m.right >= q.right) || (q.left <= m.left && q.right >= m.right)),
                            h = ((m.top <= q.top && m.bottom >= q.top) || (m.top <= q.bottom && m.bottom >= q.bottom) || (m.top <= q.top && m.bottom >= q.bottom) || (q.top <= m.top && q.bottom >= m.bottom)),
                            k = function (s) {
                                return [l.isContinuous ? l.verifyEdge(s[0]) : s[0], e.isContinuous ? e.verifyEdge(s[1]) : s[1]]
                            },
                            p = {
                                orientation: b.DIAGONAL,
                                theta: r,
                                theta2: n
                            };
                    if (!(o || h)) {
                        if (q.left > m.left && q.top > m.top) {
                            p.a = ["right", "top"]
                        } else {
                            if (q.left > m.left && m.top > q.top) {
                                p.a = ["top", "left"]
                            } else {
                                if (q.left < m.left && q.top < m.top) {
                                    p.a = ["top", "right"]
                                } else {
                                    if (q.left < m.left && q.top > m.top) {
                                        p.a = ["left", "top"]
                                    }
                                }
                            }
                        }
                    } else {
                        if (o) {
                            p.orientation = b.HORIZONTAL;
                            p.a = m.top < q.top ? ["bottom", "top"] : ["top", "bottom"]
                        } else {
                            p.orientation = b.VERTICAL;
                            p.a = m.left < q.left ? ["right", "left"] : ["left", "right"]
                        }
                    }
                    p.a = k(p.a);
                    return p
                },
                I = function (h, n, p, o, g, m, w) {
                    var f = [],
                            x = n[g ? 0 : 1] / (o.length + 1);
                    for (var l = 0; l < o.length; l++) {
                        var e = (l + 1) * x,
                                y = m * n[g ? 1 : 0];
                        if (w) {
                            e = n[g ? 0 : 1] - e
                        }
                        var q = (g ? e : y),
                                u = p[0] + q,
                                r = q / n[0],
                                s = (g ? y : e),
                                v = p[1] + s,
                                k = s / n[1];
                        f.push([u, v, r, k, o[l][1], o[l][2]])
                    }
                    return f
                },
                L = function (e) {
                    return function (g, h) {
                        var f = true;
                        if (e) {
                            f = g[0][0] < h[0][0]
                        } else {
                            f = g[0][0] > h[0][0]
                        }
                        return f === false ? -1 : 1
                    }
                },
                X = function (g, h) {
                    var e = g[0][0] < 0 ? -Math.PI - g[0][0] : Math.PI - g[0][0],
                            f = h[0][0] < 0 ? -Math.PI - h[0][0] : Math.PI - h[0][0];
                    if (e > f) {
                        return 1
                    } else {
                        return g[0][1] > h[0][1] ? 1 : -1
                    }
                },
                F = {
                    top: function (e, f) {
                        return e[0] > f[0] ? 1 : -1
                    },
                    right: L(true),
                    bottom: L(true),
                    left: X
                },
        H = function (f, e) {
            return f.sort(e)
        },
                R = function (k, l) {
                    var e = K.getCachedData(k),
                            g = e.s,
                            f = e.o,
                            h = function (v, n, A, w, p, q, B) {
                                if (w.length > 0) {
                                    var r = H(w, F[v]),
                                            u = v === "right" || v === "top",
                                            C = I(v, n, A, r, p, q, u);
                                    var m = function (ac, ab) {
                                        var ad = K.adjustForParentOffsetAndScroll([ab[0], ab[1]], ac.canvas);
                                        D[ac.id] = [ad[0], ad[1], ab[2], ab[3]];
                                        J[ac.id] = B
                                    };
                                    for (var y = 0; y < C.length; y++) {
                                        var s = C[y][4],
                                                o = s.endpoints[0].elementId === k,
                                                x = s.endpoints[1].elementId === k;
                                        if (o) {
                                            m(s.endpoints[0], C[y])
                                        } else {
                                            if (x) {
                                                m(s.endpoints[1], C[y])
                                            }
                                        }
                                    }
                                }
                            };
                    h("bottom", g, [f.left, f.top], l.bottom, true, 1, [0, 1]);
                    h("top", g, [f.left, f.top], l.top, true, 0, [0, -1]);
                    h("left", g, [f.left, f.top], l.left, false, 0, [-1, 0]);
                    h("right", g, [f.left, f.top], l.right, false, 1, [1, 0])
                };
        this.reset = function () {
            V = {};
            T = {};
            S = {}
        };
        this.addFloatingConnection = function (f, e) {
            N[f] = e
        };
        this.removeFloatingConnection = function (e) {
            delete N[e]
        };
        this.newConnection = function (g) {
            var e = g.sourceId,
                    h = g.targetId,
                    l = g.endpoints,
                    f = true,
                    k = function (o, n, q, m, p) {
                        if ((e == h) && q.isContinuous) {
                            U.removeElement(l[1].canvas);
                            f = false
                        }
                        jsPlumbUtil.addToList(T, m, [p, n, q.constructor == jsPlumb.DynamicAnchor])
                    };
            k(0, l[0], l[0].anchor, h, g);
            if (f) {
                k(1, l[1], l[1].anchor, e, g)
            }
        };
        var W = function (e) {
            (function (f, h) {
                if (f) {
                    var g = function (k) {
                        return k[4] == h
                    };
                    jsPlumbUtil.removeWithFunction(f.top, g);
                    jsPlumbUtil.removeWithFunction(f.left, g);
                    jsPlumbUtil.removeWithFunction(f.bottom, g);
                    jsPlumbUtil.removeWithFunction(f.right, g)
                }
            })(S[e.elementId], e.id)
        };
        this.connectionDetached = function (e) {
            var k = e.connection || e,
                    f = e.sourceId,
                    h = e.targetId,
                    l = k.endpoints,
                    g = function (o, n, q, m, p) {
                        if (q.constructor == jsPlumb.FloatingAnchor) {
                        } else {
                            jsPlumbUtil.removeWithFunction(T[m], function (r) {
                                return r[0].id == p.id
                            })
                        }
                    };
            g(1, l[1], l[1].anchor, f, k);
            g(0, l[0], l[0].anchor, h, k);
            W(k.endpoints[0]);
            W(k.endpoints[1]);
            M.redraw(k.sourceId);
            M.redraw(k.targetId)
        };
        this.add = function (e, f) {
            jsPlumbUtil.addToList(V, f, e)
        };
        this.changeId = function (e, f) {
            T[f] = T[e];
            V[f] = V[e];
            delete T[e];
            delete V[e]
        };
        this.getConnectionsFor = function (e) {
            return T[e] || []
        };
        this.getEndpointsFor = function (e) {
            return V[e] || []
        };
        this.deleteEndpoint = function (e) {
            jsPlumbUtil.removeWithFunction(V[e.elementId], function (f) {
                return f.id == e.id
            });
            W(e)
        };
        this.clearFor = function (e) {
            delete V[e];
            V[e] = []
        };
        var P = function (g, w, n, A, s, r, p, u, e, q, B, h) {
            var l = -1,
                    C = -1,
                    y = A.endpoints[p],
                    o = y.id,
                    v = [1, 0][p],
                    ab = [
                        [w, n], A, s, r, o
                    ],
                    aa = g[e],
                    f = y._continuousAnchorEdge ? g[y._continuousAnchorEdge] : null;
            if (f) {
                var k = jsPlumbUtil.findWithFunction(f, function (Y) {
                    return Y[4] == o
                });
                if (k != -1) {
                    f.splice(k, 1);
                    for (var m = 0; m < f.length; m++) {
                        jsPlumbUtil.addWithFunction(B, f[m][1], function (Y) {
                            return Y.id == f[m][1].id
                        });
                        jsPlumbUtil.addWithFunction(h, f[m][1].endpoints[p], function (Y) {
                            return Y.id == f[m][1].endpoints[p].id
                        });
                        jsPlumbUtil.addWithFunction(h, f[m][1].endpoints[v], function (Y) {
                            return Y.id == f[m][1].endpoints[v].id
                        })
                    }
                }
            }
            for (var m = 0; m < aa.length; m++) {
                if (a.idx == 1 && aa[m][3] === r && C == -1) {
                    C = m
                }
                jsPlumbUtil.addWithFunction(B, aa[m][1], function (Y) {
                    return Y.id == aa[m][1].id
                });
                jsPlumbUtil.addWithFunction(h, aa[m][1].endpoints[p], function (Y) {
                    return Y.id == aa[m][1].endpoints[p].id
                });
                jsPlumbUtil.addWithFunction(h, aa[m][1].endpoints[v], function (Y) {
                    return Y.id == aa[m][1].endpoints[v].id
                })
            }
            if (l != -1) {
                aa[l] = ab
            } else {
                var x = u ? C != -1 ? C : 0 : aa.length;
                aa.splice(x, 0, ab)
            }
            y._continuousAnchorEdge = e
        };
        this.redraw = function (o, l, C, y, e) {
            if (!K.isSuspendDrawing()) {
                var ah = V[o] || [],
                        ai = T[o] || [],
                        af = [],
                        aj = [],
                        B = [];
                C = C || K.timestamp();
                y = y || {
                    left: 0,
                    top: 0
                };
                if (l) {
                    l = {
                        left: l.left + y.left,
                        top: l.top + y.top
                    }
                }
                var u = K.updateOffset({
                    elId: o,
                    offset: l,
                    recalc: false,
                    timestamp: C
                }),
                        r = {};
                for (var al = 0; al < ai.length; al++) {
                    var x = ai[al][0],
                            v = x.sourceId,
                            A = x.targetId,
                            w = x.endpoints[0].anchor.isContinuous,
                            p = x.endpoints[1].anchor.isContinuous;
                    if (w || p) {
                        var ak = v + "_" + A,
                                g = A + "_" + v,
                                h = r[ak],
                                q = x.sourceId == o ? 1 : 0;
                        if (w && !S[v]) {
                            S[v] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }
                        }
                        if (p && !S[A]) {
                            S[A] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }
                        }
                        if (o != A) {
                            K.updateOffset({
                                elId: A,
                                timestamp: C
                            })
                        }
                        if (o != v) {
                            K.updateOffset({
                                elId: v,
                                timestamp: C
                            })
                        }
                        var s = K.getCachedData(A),
                                ag = K.getCachedData(v);
                        if (A == v && (w || p)) {
                            P(S[v], -Math.PI / 2, 0, x, false, A, 0, false, "top", v, af, aj)
                        } else {
                            if (!h) {
                                h = Q(v, A, ag.o, s.o, x.endpoints[0].anchor, x.endpoints[1].anchor);
                                r[ak] = h
                            }
                            if (w) {
                                P(S[v], h.theta, 0, x, false, A, 0, false, h.a[0], v, af, aj)
                            }
                            if (p) {
                                P(S[A], h.theta2, -1, x, true, v, 1, true, h.a[1], A, af, aj)
                            }
                        }
                        if (w) {
                            jsPlumbUtil.addWithFunction(B, v, function (Y) {
                                return Y === v
                            })
                        }
                        if (p) {
                            jsPlumbUtil.addWithFunction(B, A, function (Y) {
                                return Y === A
                            })
                        }
                        jsPlumbUtil.addWithFunction(af, x, function (Y) {
                            return Y.id == x.id
                        });
                        if ((w && q == 0) || (p && q == 1)) {
                            jsPlumbUtil.addWithFunction(aj, x.endpoints[q], function (Y) {
                                return Y.id == x.endpoints[q].id
                            })
                        }
                    }
                }
                for (var al = 0; al < ah.length; al++) {
                    if (ah[al].connections.length == 0 && ah[al].anchor.isContinuous) {
                        if (!S[o]) {
                            S[o] = {
                                top: [],
                                right: [],
                                bottom: [],
                                left: []
                            }
                        }
                        P(S[o], -Math.PI / 2, 0, {
                            endpoints: [ah[al], ah[al]],
                            paint: function () {}
                        }, false, o, 0, false, "top", o, af, aj);
                        jsPlumbUtil.addWithFunction(B, o, function (Y) {
                            return Y === o
                        })
                    }
                }
                for (var al = 0; al < B.length; al++) {
                    R(B[al], S[B[al]])
                }
                for (var al = 0; al < ah.length; al++) {
                    ah[al].paint({
                        timestamp: C,
                        offset: u,
                        dimensions: u.s
                    })
                }
                for (var al = 0; al < aj.length; al++) {
                    var m = K.getCachedData(aj[al].elementId);
                    aj[al].paint({
                        timestamp: C,
                        offset: m,
                        dimensions: m.s
                    })
                }
                for (var al = 0; al < ai.length; al++) {
                    var n = ai[al][1];
                    if (n.anchor.constructor == jsPlumb.DynamicAnchor) {
                        n.paint({
                            elementWithPrecedence: o
                        });
                        jsPlumbUtil.addWithFunction(af, ai[al][0], function (Y) {
                            return Y.id == ai[al][0].id
                        });
                        for (var f = 0; f < n.connections.length; f++) {
                            if (n.connections[f] !== ai[al][0]) {
                                jsPlumbUtil.addWithFunction(af, n.connections[f], function (Y) {
                                    return Y.id == n.connections[f].id
                                })
                            }
                        }
                    } else {
                        if (n.anchor.constructor == jsPlumb.Anchor) {
                            jsPlumbUtil.addWithFunction(af, ai[al][0], function (Y) {
                                return Y.id == ai[al][0].id
                            })
                        }
                    }
                }
                var k = N[o];
                if (k) {
                    k.paint({
                        timestamp: C,
                        recalc: false,
                        elId: o
                    })
                }
                for (var al = 0; al < af.length; al++) {
                    af[al].paint({
                        elId: o,
                        timestamp: C,
                        recalc: false,
                        clearEdits: e
                    })
                }
            }
        };
        this.rehomeEndpoint = function (k, e) {
            var h = V[k] || [],
                    g = K.getId(e);
            if (g !== k) {
                for (var f = 0; f < h.length; f++) {
                    M.add(h[f], g)
                }
                h.splice(0, h.length)
            }
        };
        var E = function (p) {
            jsPlumbUtil.EventGenerator.apply(this);
            this.type = "Continuous";
            this.isDynamic = true;
            this.isContinuous = true;
            var m = p.faces || ["top", "right", "bottom", "left"],
                    q = !(p.clockwise === false),
                    f = {},
                    h = {
                        top: "bottom",
                        right: "left",
                        left: "right",
                        bottom: "top"
                    },
            n = {
                top: "right",
                right: "bottom",
                left: "top",
                bottom: "left"
            },
            l = {
                top: "left",
                right: "top",
                left: "bottom",
                bottom: "right"
            },
            o = q ? n : l,
                    e = q ? l : n,
                    g = p.cssClass || "";
            for (var k = 0; k < m.length; k++) {
                f[m[k]] = true
            }
            this.verifyEdge = function (r) {
                if (f[r]) {
                    return r
                } else {
                    if (f[h[r]]) {
                        return h[r]
                    } else {
                        if (f[o[r]]) {
                            return o[r]
                        } else {
                            if (f[e[r]]) {
                                return e[r]
                            }
                        }
                    }
                }
                return r
            };
            this.compute = function (r) {
                return O[r.element.id] || D[r.element.id] || [0, 0]
            };
            this.getCurrentLocation = function (r) {
                return O[r.id] || D[r.id] || [0, 0]
            };
            this.getOrientation = function (r) {
                return J[r.id] || [0, 0]
            };
            this.clearUserDefinedLocation = function () {
                delete O[p.elementId]
            };
            this.setUserDefinedLocation = function (r) {
                O[p.elementId] = r
            };
            this.getCssClass = function () {
                return g
            };
            this.setCssClass = function (r) {
                g = r
            }
        };
        K.continuousAnchorFactory = {
            get: function (e) {
                var f = G[e.elementId];
                if (!f) {
                    f = new E(e);
                    G[e.elementId] = f
                }
                return f
            }
        }
    };
    jsPlumb.Anchor = function (a) {
        var m = this;
        this.x = a.x || 0;
        this.y = a.y || 0;
        this.elementId = a.elementId;
        jsPlumbUtil.EventGenerator.apply(this);
        var n = a.orientation || [0, 0],
                o = a.jsPlumbInstance,
                b = null,
                p = null,
                q = null,
                r = a.cssClass || "";
        this.getCssClass = function () {
            return r
        };
        this.offsets = a.offsets || [0, 0];
        m.timestamp = null;
        this.compute = function (f) {
            var g = f.xy,
                    e = f.wh,
                    k = f.element,
                    h = f.timestamp;
            if (f.clearUserDefinedLocation) {
                q = null
            }
            if (h && h === m.timestamp) {
                return p
            }
            if (q != null) {
                p = q
            } else {
                p = [g[0] + (m.x * e[0]) + m.offsets[0], g[1] + (m.y * e[1]) + m.offsets[1]];
                p = o.adjustForParentOffsetAndScroll(p, k.canvas)
            }
            m.timestamp = h;
            return p
        };
        this.getOrientation = function (e) {
            return n
        };
        this.equals = function (e) {
            if (!e) {
                return false
            }
            var g = e.getOrientation();
            var f = this.getOrientation();
            return this.x == e.x && this.y == e.y && this.offsets[0] == e.offsets[0] && this.offsets[1] == e.offsets[1] && f[0] == g[0] && f[1] == g[1]
        };
        this.getCurrentLocation = function () {
            return p
        };
        this.getUserDefinedLocation = function () {
            return q
        };
        this.setUserDefinedLocation = function (e) {
            q = e
        };
        this.clearUserDefinedLocation = function () {
            q = null
        }
    };
    jsPlumb.FloatingAnchor = function (u) {
        jsPlumb.Anchor.apply(this, arguments);
        var v = u.reference,
                s = jsPlumb.CurrentLibrary,
                q = u.jsPlumbInstance,
                p = u.referenceCanvas,
                b = s.getSize(s.getElementObject(p)),
                a = 0,
                r = 0,
                w = null,
                o = null;
        this.x = 0;
        this.y = 0;
        this.isFloating = true;
        this.compute = function (e) {
            var f = e.xy,
                    g = e.element,
                    h = [f[0] + (b[0] / 2), f[1] + (b[1] / 2)];
            h = q.adjustForParentOffsetAndScroll(h, g.canvas);
            o = h;
            return h
        };
        this.getOrientation = function (e) {
            if (w) {
                return w
            } else {
                var f = v.getOrientation(e);
                return [Math.abs(f[0]) * a * -1, Math.abs(f[1]) * r * -1]
            }
        };
        this.over = function (e) {
            w = e.getOrientation()
        };
        this.out = function () {
            w = null
        };
        this.getCurrentLocation = function () {
            return o
        }
    };
    jsPlumb.DynamicAnchor = function (r) {
        jsPlumb.Anchor.apply(this, arguments);
        this.isSelective = true;
        this.isDynamic = true;
        var a = [],
                b = this,
                o = function (e) {
                    return e.constructor == jsPlumb.Anchor ? e : r.jsPlumbInstance.makeAnchor(e, r.elementId, r.jsPlumbInstance)
                };
        for (var p = 0; p < r.anchors.length; p++) {
            a[p] = o(r.anchors[p])
        }
        this.addAnchor = function (e) {
            a.push(o(e))
        };
        this.getAnchors = function () {
            return a
        };
        this.locked = false;
        var v = a.length > 0 ? a[0] : null,
                s = a.length > 0 ? 0 : -1,
                q = v,
                b = this,
                u = function (m, e, f, l, g) {
                    var h = l[0] + (m.x * g[0]),
                            k = l[1] + (m.y * g[1]),
                            n = l[0] + (g[0] / 2),
                            y = l[1] + (g[1] / 2);
                    return (Math.sqrt(Math.pow(e - h, 2) + Math.pow(f - k, 2)) + Math.sqrt(Math.pow(n - h, 2) + Math.pow(y - k, 2)))
                },
                w = r.selector || function (k, g, f, e, h) {
                    var C = f[0] + (e[0] / 2),
                            D = f[1] + (e[1] / 2);
                    var n = -1,
                            l = Infinity;
                    for (var B = 0; B < h.length; B++) {
                        var m = u(h[B], C, D, k, g);
                        if (m < l) {
                            n = B + 0;
                            l = m
                        }
                    }
                    return h[n]
                };
        this.compute = function (f) {
            var g = f.xy,
                    m = f.wh,
                    k = f.timestamp,
                    l = f.txy,
                    e = f.twh;
            if (f.clearUserDefinedLocation) {
                userDefinedLocation = null
            }
            var h = b.getUserDefinedLocation();
            if (h != null) {
                return h
            }
            if (b.locked || l == null || e == null) {
                return v.compute(f)
            } else {
                f.timestamp = null
            }
            v = w(g, m, l, e, a);
            b.x = v.x;
            b.y = v.y;
            if (v != q) {
                b.fire("anchorChanged", v)
            }
            q = v;
            return v.compute(f)
        };
        this.getCurrentLocation = function () {
            return b.getUserDefinedLocation() || (v != null ? v.getCurrentLocation() : null)
        };
        this.getOrientation = function (e) {
            return v != null ? v.getOrientation(e) : [0, 0]
        };
        this.over = function (e) {
            if (v != null) {
                v.over(e)
            }
        };
        this.out = function () {
            if (v != null) {
                v.out()
            }
        };
        this.getCssClass = function () {
            return (v && v.getCssClass()) || ""
        }
    };
    var c = function (n, a, l, m, b, k) {
        jsPlumb.Anchors[b] = function (e) {
            var f = e.jsPlumbInstance.makeAnchor([n, a, l, m, 0, 0], e.elementId, e.jsPlumbInstance);
            f.type = b;
            if (k) {
                k(f, e)
            }
            return f
        }
    };
    c(0.5, 0, 0, -1, "TopCenter");
    c(0.5, 1, 0, 1, "BottomCenter");
    c(0, 0.5, -1, 0, "LeftMiddle");
    c(1, 0.5, 1, 0, "RightMiddle");
    c(0.5, 0, 0, -1, "Top");
    c(0.5, 1, 0, 1, "Bottom");
    c(0, 0.5, -1, 0, "Left");
    c(1, 0.5, 1, 0, "Right");
    c(0.5, 0.5, 0, 0, "Center");
    c(1, 0, 0, -1, "TopRight");
    c(1, 1, 0, 1, "BottomRight");
    c(0, 0, 0, -1, "TopLeft");
    c(0, 1, 0, 1, "BottomLeft");
    jsPlumb.Defaults.DynamicAnchors = function (a) {
        return a.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], a.elementId, a.jsPlumbInstance)
    };
    jsPlumb.Anchors.AutoDefault = function (a) {
        var b = a.jsPlumbInstance.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors(a));
        b.type = "AutoDefault";
        return b
    };
    var d = function (a, b) {
        jsPlumb.Anchors[a] = function (g) {
            var h = g.jsPlumbInstance.makeAnchor(["Continuous", {
                    faces: b
                }], g.elementId, g.jsPlumbInstance);
            h.type = a;
            return h
        }
    };
    jsPlumb.Anchors.Continuous = function (a) {
        return a.jsPlumbInstance.continuousAnchorFactory.get(a)
    };
    d("ContinuousLeft", ["left"]);
    d("ContinuousTop", ["top"]);
    d("ContinuousBottom", ["bottom"]);
    d("ContinuousRight", ["right"]);
    jsPlumb.Anchors.Assign = c(0, 0, 0, 0, "Assign", function (b, a) {
        var f = a.position || "Fixed";
        b.positionFinder = f.constructor == String ? a.jsPlumbInstance.AnchorPositionFinders[f] : f;
        b.constructorParams = a
    });
    jsPlumb.AnchorPositionFinders = {
        Fixed: function (a, h, b, g) {
            return [(a.left - h.left) / b[0], (a.top - h.top) / b[1]]
        },
        Grid: function (w, a, r, v) {
            var b = w.left - a.left,
                    o = w.top - a.top,
                    p = r[0] / (v.grid[0]),
                    q = r[1] / (v.grid[1]),
                    s = Math.floor(b / p),
                    u = Math.floor(o / q);
            return [((s * p) + (p / 2)) / r[0], ((u * q) + (q / 2)) / r[1]]
        }
    };
    jsPlumb.Anchors.Perimeter = function (y) {
        y = y || {};
        var x = y.anchorCount || 60,
                u = y.shape;
        if (!u) {
            throw new Error("no shape supplied to Perimeter Anchor type")
        }
        var w = function () {
            var g = 0.5,
                    h = Math.PI * 2 / x,
                    f = 0,
                    l = [];
            for (var k = 0; k < x; k++) {
                var m = g + (g * Math.sin(f)),
                        e = g + (g * Math.cos(f));
                l.push([m, e, 0, 0]);
                f += h
            }
            return l
        },
                s = function (g) {
                    var e = x / g.length,
                            k = [],
                            h = function (H, F, m, G, E) {
                                e = x * E;
                                var n = (m - H) / e,
                                        o = (G - F) / e;
                                for (var l = 0; l < e; l++) {
                                    k.push([H + (n * l), F + (o * l), 0, 0])
                                }
                            };
                    for (var f = 0; f < g.length; f++) {
                        h.apply(null, g[f])
                    }
                    return k
                },
                p = function (g) {
                    var e = [];
                    for (var f = 0; f < g.length; f++) {
                        e.push([g[f][0], g[f][1], g[f][2], g[f][3], 1 / g.length])
                    }
                    return s(e)
                },
                r = function () {
                    return p([
                        [0, 0, 1, 0],
                        [1, 0, 1, 1],
                        [1, 1, 0, 1],
                        [0, 1, 0, 0]
                    ])
                };
        var v = {
            Circle: w,
            Ellipse: w,
            Diamond: function () {
                return p([
                    [0.5, 0, 1, 0.5],
                    [1, 0.5, 0.5, 1],
                    [0.5, 1, 0, 0.5],
                    [0, 0.5, 0.5, 0]
                ])
            },
            Rectangle: r,
            Square: r,
            Triangle: function () {
                return p([
                    [0.5, 0, 1, 1],
                    [1, 1, 0, 1],
                    [0, 1, 0.5, 0]
                ])
            },
            Path: function (e) {
                var g = e.points,
                        f = [],
                        k = 0;
                for (var h = 0; h < g.length - 1; h++) {
                    var l = Math.sqrt(Math.pow(g[h][2] - g[h][0]) + Math.pow(g[h][3] - g[h][1]));
                    k += l;
                    f.push([g[h][0], g[h][1], g[h + 1][0], g[h + 1][1], l])
                }
                for (var h = 0; h < f.length; h++) {
                    f[h][4] = f[h][4] / k
                }
                return s(f)
            }
        },
        b = function (f, g) {
            var e = [],
                    h = g / 180 * Math.PI;
            for (var k = 0; k < f.length; k++) {
                var l = f[k][0] - 0.5,
                        m = f[k][1] - 0.5;
                e.push([0.5 + ((l * Math.cos(h)) - (m * Math.sin(h))), 0.5 + ((l * Math.sin(h)) + (m * Math.cos(h))), f[k][2], f[k][3]])
            }
            return e
        };
        if (!v[u]) {
            throw new Error("Shape [" + u + "] is unknown by Perimeter Anchor type")
        }
        var a = v[u](y);
        if (y.rotation) {
            a = b(a, y.rotation)
        }
        var q = y.jsPlumbInstance.makeDynamicAnchor(a);
        q.type = "Perimeter";
        return q
    }
})();
(function () {
    var h = function (a, c) {
        var b = false;
        return {
            drag: function () {
                if (b) {
                    b = false;
                    return true
                }
                var d = jsPlumb.CurrentLibrary.getUIPosition(arguments, c.getZoom());
                if (a.element) {
                    jsPlumb.CurrentLibrary.setOffset(a.element, d);
                    c.repaint(a.element, d)
                }
            },
            stopDrag: function () {
                b = true
            }
        }
    };
    var f = function (c, m, n) {
        var a = document.createElement("div");
        a.style.position = "absolute";
        var d = jsPlumb.CurrentLibrary.getElementObject(a);
        jsPlumb.CurrentLibrary.appendElement(a, m);
        var b = n.getId(d);
        n.updateOffset({
            elId: b
        });
        c.id = b;
        c.element = d
    };
    var g = function (a, b, r, c, o, p, q) {
        var d = new jsPlumb.FloatingAnchor({
            reference: b,
            referenceCanvas: c,
            jsPlumbInstance: p
        });
        return q({
            paintStyle: a,
            endpoint: r,
            anchor: d,
            source: o,
            scope: "__floating"
        })
    };
    var e = ["connectorStyle", "connectorHoverStyle", "connectorOverlays", "connector", "connectionType", "connectorClass", "connectorHoverClass"];
    jsPlumb.Endpoint = function (aR) {
        var aJ = this,
                aH = aR._jsPlumb,
                aQ = jsPlumb.CurrentLibrary,
                ap = aQ.getAttribute,
                aB = aQ.getElementObject,
                aK = jsPlumbUtil,
                aS = aQ.getOffset,
                aC = aR.newConnection,
                ah = aR.newEndpoint,
                b = aR.finaliseConnection,
                a = aR.fireDetachEvent,
                aw = aR.floatingConnections;
        aJ.idPrefix = "_jsplumb_e_";
        aJ.defaultLabelLocation = [0.5, 0.5];
        aJ.defaultOverlayKeys = ["Overlays", "EndpointOverlays"];
        this.parent = aR.parent;
        overlayCapableJsPlumbUIComponent.apply(this, arguments);
        aR = aR || {};
        this.getTypeDescriptor = function () {
            return "endpoint"
        };
        this.getDefaultType = function () {
            return {
                parameters: {},
                scope: null,
                maxConnections: aJ._jsPlumb.Defaults.MaxConnections,
                paintStyle: aJ._jsPlumb.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle,
                endpoint: aJ._jsPlumb.Defaults.Endpoint || jsPlumb.Defaults.Endpoint,
                hoverPaintStyle: aJ._jsPlumb.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle,
                overlays: aJ._jsPlumb.Defaults.EndpointOverlays || jsPlumb.Defaults.EndpointOverlays,
                connectorStyle: aR.connectorStyle,
                connectorHoverStyle: aR.connectorHoverStyle,
                connectorClass: aR.connectorClass,
                connectorHoverClass: aR.connectorHoverClass,
                connectorOverlays: aR.connectorOverlays,
                connector: aR.connector,
                connectorTooltip: aR.connectorTooltip
            }
        };
        var ag = this.applyType;
        this.applyType = function (l, k) {
            ag(l, k);
            if (l.maxConnections != null) {
                al = l.maxConnections
            }
            if (l.scope) {
                aJ.scope = l.scope
            }
            aK.copyValues(e, l, aJ)
        };
        var az = true,
                aP = !(aR.enabled === false);
        this.isVisible = function () {
            return az
        };
        this.setVisible = function (n, k, o) {
            az = n;
            if (aJ.canvas) {
                aJ.canvas.style.display = n ? "block" : "none"
            }
            aJ[n ? "showOverlays" : "hideOverlays"]();
            if (!k) {
                for (var l = 0; l < aJ.connections.length; l++) {
                    aJ.connections[l].setVisible(n);
                    if (!o) {
                        var m = aJ === aJ.connections[l].endpoints[0] ? 1 : 0;
                        if (aJ.connections[l].endpoints[m].connections.length == 1) {
                            aJ.connections[l].endpoints[m].setVisible(n, true, true)
                        }
                    }
                }
            }
        };
        this.isEnabled = function () {
            return aP
        };
        this.setEnabled = function (k) {
            aP = k
        };
        var ao = aR.source,
                aM = aR.uuid,
                aT = null,
                an = null;
        if (aM) {
            aR.endpointsByUUID[aM] = aJ
        }
        var c = ap(ao, "id");
        this.elementId = c;
        this.element = ao;
        aJ.setElementId = function (k) {
            c = k;
            aJ.elementId = k;
            aJ.anchor.elementId = k
        };
        aJ.setReferenceElement = function (k) {
            ao = k;
            aJ.element = k
        };
        var aU = aR.connectionCost;
        this.getConnectionCost = function () {
            return aU
        };
        this.setConnectionCost = function (k) {
            aU = k
        };
        var am = aR.connectionsDirected;
        this.areConnectionsDirected = function () {
            return am
        };
        this.setConnectionsDirected = function (k) {
            am = k
        };
        var at = "",
                ak = function () {
                    aQ.removeClass(ao, aH.endpointAnchorClassPrefix + "_" + at);
                    aJ.removeClass(aH.endpointAnchorClassPrefix + "_" + at);
                    at = aJ.anchor.getCssClass();
                    aJ.addClass(aH.endpointAnchorClassPrefix + "_" + at);
                    aQ.addClass(ao, aH.endpointAnchorClassPrefix + "_" + at)
                };
        this.setAnchor = function (l, k) {
            aJ.anchor = aH.makeAnchor(l, c, aH);
            ak();
            aJ.anchor.bind("anchorChanged", function (m) {
                aJ.fire("anchorChanged", {
                    endpoint: aJ,
                    anchor: m
                });
                ak()
            });
            if (!k) {
                aH.repaint(c)
            }
        };
        this.cleanup = function () {
            aQ.removeClass(ao, aH.endpointAnchorClassPrefix + "_" + at)
        };
        var ai = aR.anchor ? aR.anchor : aR.anchors ? aR.anchors : (aH.Defaults.Anchor || "Top");
        aJ.setAnchor(ai, true);
        if (!aR._transient) {
            aH.anchorManager.add(aJ, c)
        }
        var d = null,
                af = null;
        this.setEndpoint = function (m) {
            var n = function (p, q) {
                var o = aH.getRenderMode();
                if (jsPlumb.Endpoints[o][p]) {
                    return new jsPlumb.Endpoints[o][p](q)
                }
                if (!aH.Defaults.DoNotThrowErrors) {
                    throw {
                        msg: "jsPlumb: unknown endpoint type '" + p + "'"
                    }
                }
            };
            var l = {
                _jsPlumb: aJ._jsPlumb,
                cssClass: aR.cssClass,
                parent: aR.parent,
                container: aR.container,
                tooltip: aR.tooltip,
                connectorTooltip: aR.connectorTooltip,
                endpoint: aJ
            };
            if (aK.isString(m)) {
                d = n(m, l)
            } else {
                if (aK.isArray(m)) {
                    l = aK.merge(m[1], l);
                    d = n(m[0], l)
                } else {
                    d = m.clone()
                }
            }
            var k = jsPlumb.extend({}, l);
            d.clone = function () {
                var o = new Object();
                d.constructor.apply(o, [k]);
                return o
            };
            aJ.endpoint = d;
            aJ.type = aJ.endpoint.type
        };
        this.setEndpoint(aR.endpoint || aH.Defaults.Endpoint || jsPlumb.Defaults.Endpoint || "Dot");
        af = d;
        var aF = aJ.setHover;
        aJ.setHover = function () {
            aJ.endpoint.setHover.apply(aJ.endpoint, arguments);
            aF.apply(aJ, arguments)
        };
        var aq = function (k) {
            if (aJ.connections.length > 0) {
                aJ.connections[0].setHover(k, false)
            } else {
                aJ.setHover(k)
            }
        };
        aJ.bindListeners(aJ.endpoint, aJ, aq);
        this.setPaintStyle(aR.paintStyle || aR.style || aH.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle, true);
        this.setHoverPaintStyle(aR.hoverPaintStyle || aH.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle, true);
        this.paintStyleInUse = this.getPaintStyle();
        var aE = this.getPaintStyle();
        aK.copyValues(e, aR, this);
        this.isSource = aR.isSource || false;
        this.isTarget = aR.isTarget || false;
        var al = aR.maxConnections || aH.Defaults.MaxConnections;
        this.getAttachedElements = function () {
            return aJ.connections
        };
        this.canvas = this.endpoint.canvas;
        aJ.addClass(aH.endpointAnchorClassPrefix + "_" + at);
        aQ.addClass(ao, aH.endpointAnchorClassPrefix + "_" + at);
        this.connections = aR.connections || [];
        this.connectorPointerEvents = aR["connector-pointer-events"];
        this.scope = aR.scope || aH.getDefaultScope();
        this.timestamp = null;
        aJ.reattachConnections = aR.reattach || aH.Defaults.ReattachConnections;
        aJ.connectionsDetachable = aH.Defaults.ConnectionsDetachable;
        if (aR.connectionsDetachable === false || aR.detachable === false) {
            aJ.connectionsDetachable = false
        }
        var au = aR.dragAllowedWhenFull || true;
        if (aR.onMaxConnections) {
            aJ.bind("maxConnections", aR.onMaxConnections)
        }
        this.computeAnchor = function (k) {
            return aJ.anchor.compute(k)
        };
        this.addConnection = function (k) {
            aJ.connections.push(k);
            aJ[(aJ.connections.length > 0 ? "add" : "remove") + "Class"](aH.endpointConnectedClass);
            aJ[(aJ.isFull() ? "add" : "remove") + "Class"](aH.endpointFullClass)
        };
        this.detach = function (s, o, r, l, u) {
            var m = aK.findWithFunction(aJ.connections, function (v) {
                return v.id == s.id
            }),
                    n = false;
            l = (l !== false);
            if (m >= 0) {
                if (r || s._forceDetach || s.isDetachable() || s.isDetachAllowed(s)) {
                    var k = s.endpoints[0] == aJ ? s.endpoints[1] : s.endpoints[0];
                    if (r || s._forceDetach || (aJ.isDetachAllowed(s))) {
                        aJ.connections.splice(m, 1);
                        if (!o) {
                            k.detach(s, true, r);
                            if (s.endpointsToDeleteOnDetach) {
                                for (var p = 0; p < s.endpointsToDeleteOnDetach.length; p++) {
                                    var q = s.endpointsToDeleteOnDetach[p];
                                    if (q && q.connections.length == 0) {
                                        aH.deleteEndpoint(q)
                                    }
                                }
                            }
                        }
                        if (s.getConnector() != null) {
                            aK.removeElements(s.getConnector().getDisplayElements(), s.parent)
                        }
                        aK.removeWithFunction(aR.connectionsByScope[s.scope], function (v) {
                            return v.id == s.id
                        });
                        aJ[(aJ.connections.length > 0 ? "add" : "remove") + "Class"](aH.endpointConnectedClass);
                        aJ[(aJ.isFull() ? "add" : "remove") + "Class"](aH.endpointFullClass);
                        n = true;
                        a(s, (!o && l), u)
                    }
                }
            }
            return n
        };
        this.detachAll = function (k, l) {
            while (aJ.connections.length > 0) {
                aJ.detach(aJ.connections[0], false, true, k, l)
            }
            return aJ
        };
        this.detachFrom = function (l, m, o) {
            var k = [];
            for (var n = 0; n < aJ.connections.length; n++) {
                if (aJ.connections[n].endpoints[1] == l || aJ.connections[n].endpoints[0] == l) {
                    k.push(aJ.connections[n])
                }
            }
            for (var n = 0; n < k.length; n++) {
                if (aJ.detach(k[n], false, true, m, o)) {
                    k[n].setHover(false, false)
                }
            }
            return aJ
        };
        this.detachFromConnection = function (k) {
            var l = aK.findWithFunction(aJ.connections, function (m) {
                return m.id == k.id
            });
            if (l >= 0) {
                aJ.connections.splice(l, 1);
                aJ[(aJ.connections.length > 0 ? "add" : "remove") + "Class"](aH.endpointConnectedClass);
                aJ[(aJ.isFull() ? "add" : "remove") + "Class"](aH.endpointFullClass)
            }
        };
        this.getElement = function () {
            return ao
        };
        this.setElement = function (m, p) {
            var k = aH.getId(m);
            aK.removeWithFunction(aR.endpointsByElement[aJ.elementId], function (q) {
                return q.id == aJ.id
            });
            ao = aB(m);
            c = aH.getId(ao);
            aJ.elementId = c;
            var l = aR.getParentFromParams({
                source: k,
                container: p
            }),
                    n = aQ.getParent(aJ.canvas);
            aQ.removeElement(aJ.canvas, n);
            aQ.appendElement(aJ.canvas, l);
            for (var o = 0; o < aJ.connections.length; o++) {
                aJ.connections[o].moveParent(l);
                aJ.connections[o].sourceId = c;
                aJ.connections[o].source = ao
            }
            aK.addToList(aR.endpointsByElement, k, aJ)
        };
        this.getUuid = function () {
            return aM
        };
        aJ.makeInPlaceCopy = function () {
            var k = aJ.anchor.getCurrentLocation(aJ),
                    l = aJ.anchor.getOrientation(aJ),
                    m = aJ.anchor.getCssClass(),
                    n = {
                        bind: function () {},
                        compute: function () {
                            return [k[0], k[1]]
                        },
                        getCurrentLocation: function () {
                            return [k[0], k[1]]
                        },
                        getOrientation: function () {
                            return l
                        },
                        getCssClass: function () {
                            return m
                        }
                    };
            return ah({
                anchor: n,
                source: ao,
                paintStyle: this.getPaintStyle(),
                endpoint: aR.hideOnDrag ? "Blank" : d,
                _transient: true,
                scope: aJ.scope
            })
        };
        this.isConnectedTo = function (k) {
            var l = false;
            if (k) {
                for (var m = 0; m < aJ.connections.length; m++) {
                    if (aJ.connections[m].endpoints[1] == k) {
                        l = true;
                        break
                    }
                }
            }
            return l
        };
        this.isFloating = function () {
            return aT != null
        };
        this.connectorSelector = function () {
            var k = aJ.connections[0];
            if (aJ.isTarget && k) {
                return k
            } else {
                return (aJ.connections.length < al) || al == -1 ? null : k
            }
        };
        this.isFull = function () {
            return !(aJ.isFloating() || al < 1 || aJ.connections.length < al)
        };
        this.setDragAllowedWhenFull = function (k) {
            au = k
        };
        this.setStyle = aJ.setPaintStyle;
        this.equals = function (k) {
            return this.anchor.equals(k.anchor)
        };
        var av = function (l) {
            var m = 0;
            if (l != null) {
                for (var k = 0; k < aJ.connections.length; k++) {
                    if (aJ.connections[k].sourceId == l || aJ.connections[k].targetId == l) {
                        m = k;
                        break
                    }
                }
            }
            return aJ.connections[m]
        };
        this.paint = function (x) {
            x = x || {};
            var q = x.timestamp,
                    r = !(x.recalc === false);
            if (!q || aJ.timestamp !== q) {
                var y = aH.updateOffset({
                    elId: c,
                    timestamp: q,
                    recalc: r
                });
                var k = x.offset ? x.offset.o : y.o;
                if (k) {
                    var u = x.anchorPoint,
                            w = x.connectorPaintStyle;
                    if (u == null) {
                        var C = x.dimensions || y.s;
                        if (k == null || C == null) {
                            y = aH.updateOffset({
                                elId: c,
                                timestamp: q
                            });
                            k = y.o;
                            C = y.s
                        }
                        var A = {
                            xy: [k.left, k.top],
                            wh: C,
                            element: aJ,
                            timestamp: q
                        };
                        if (r && aJ.anchor.isDynamic && aJ.connections.length > 0) {
                            var o = av(x.elementWithPrecedence),
                                    l = o.endpoints[0] == aJ ? 1 : 0,
                                    v = l == 0 ? o.sourceId : o.targetId,
                                    m = aH.getCachedData(v),
                                    p = m.o,
                                    n = m.s;
                            A.txy = [p.left, p.top];
                            A.twh = n;
                            A.tElement = o.endpoints[l]
                        }
                        u = aJ.anchor.compute(A)
                    }
                    d.compute(u, aJ.anchor.getOrientation(aJ), aJ.paintStyleInUse, w || aJ.paintStyleInUse);
                    d.paint(aJ.paintStyleInUse, aJ.anchor);
                    aJ.timestamp = q;
                    for (var s = 0; s < aJ.overlays.length; s++) {
                        var B = aJ.overlays[s];
                        if (B.isVisible()) {
                            aJ.overlayPlacements[s] = B.draw(aJ.endpoint, aJ.paintStyleInUse);
                            B.paint(aJ.overlayPlacements[s])
                        }
                    }
                }
            }
        };
        this.repaint = this.paint;
        if (aQ.isDragSupported(ao)) {
            var ay = {
                id: null,
                element: null
            },
            aO = null,
                    aI = false,
                    aD = null,
                    aA = h(ay, aH);
            var ax = function () {
                aO = aJ.connectorSelector();
                var p = true;
                if (!aJ.isEnabled()) {
                    p = false
                }
                if (aO == null && !aR.isSource) {
                    p = false
                }
                if (aR.isSource && aJ.isFull() && !au) {
                    p = false
                }
                if (aO != null && !aO.isDetachable()) {
                    p = false
                }
                if (p === false) {
                    if (aQ.stopDrag) {
                        aQ.stopDrag()
                    }
                    aA.stopDrag();
                    return false
                }
                aJ.addClass("endpointDrag");
                if (aO && !aJ.isFull() && aR.isSource) {
                    aO = null
                }
                aH.updateOffset({
                    elId: c
                });
                an = aJ.makeInPlaceCopy();
                an.referenceEndpoint = aJ;
                an.paint();
                f(ay, aJ.parent, aH);
                var q = aB(an.canvas),
                        k = aS(q, aH),
                        n = aH.adjustForParentOffsetAndScroll([k.left, k.top], an.canvas),
                        o = aB(aJ.canvas);
                aQ.setOffset(ay.element, {
                    left: n[0],
                    top: n[1]
                });
                if (aJ.parentAnchor) {
                    aJ.anchor = aH.makeAnchor(aJ.parentAnchor, aJ.elementId, aH)
                }
                aQ.setAttribute(o, "dragId", ay.id);
                aQ.setAttribute(o, "elId", c);
                aT = g(aJ.getPaintStyle(), aJ.anchor, d, aJ.canvas, ay.element, aH, ah);
                aJ.canvas.style.visibility = "hidden";
                if (aO == null) {
                    aJ.anchor.locked = true;
                    aJ.setHover(false, false);
                    aO = aC({
                        sourceEndpoint: aJ,
                        targetEndpoint: aT,
                        source: aJ.endpointWillMoveTo || ao,
                        target: ay.element,
                        anchors: [aJ.anchor, aT.anchor],
                        paintStyle: aR.connectorStyle,
                        hoverPaintStyle: aR.connectorHoverStyle,
                        connector: aR.connector,
                        overlays: aR.connectorOverlays,
                        type: aJ.connectionType,
                        cssClass: aJ.connectorClass,
                        hoverClass: aJ.connectorHoverClass
                    });
                    aO.addClass(aH.draggingClass);
                    aT.addClass(aH.draggingClass);
                    aH.fire("connectionDrag", aO)
                } else {
                    aI = true;
                    aO.setHover(false);
                    aL(q, false, true);
                    var l = aO.endpoints[0].id == aJ.id ? 0 : 1;
                    aO.floatingAnchorIndex = l;
                    aJ.detachFromConnection(aO);
                    var r = jsPlumb.CurrentLibrary.getDragScope(o);
                    aQ.setAttribute(o, "originalScope", r);
                    var m = aQ.getDropScope(o);
                    aQ.setDragScope(o, m);
                    if (l == 0) {
                        aD = [aO.source, aO.sourceId, ae, r];
                        aO.source = ay.element;
                        aO.sourceId = ay.id
                    } else {
                        aD = [aO.target, aO.targetId, ae, r];
                        aO.target = ay.element;
                        aO.targetId = ay.id
                    }
                    aO.endpoints[l == 0 ? 1 : 0].anchor.locked = true;
                    aO.suspendedEndpoint = aO.endpoints[l];
                    aO.suspendedElement = aO.endpoints[l].getElement();
                    aO.suspendedElementId = aO.endpoints[l].elementId;
                    aO.suspendedElementType = l == 0 ? "source" : "target";
                    aO.suspendedEndpoint.setHover(false);
                    aT.referenceEndpoint = aO.suspendedEndpoint;
                    aO.endpoints[l] = aT;
                    aO.addClass(aH.draggingClass);
                    aT.addClass(aH.draggingClass);
                    aH.fire("connectionDrag", aO)
                }
                aw[ay.id] = aO;
                aH.anchorManager.addFloatingConnection(ay.id, aO);
                aT.addConnection(aO);
                aK.addToList(aR.endpointsByElement, ay.id, aT);
                aH.currentlyDragging = true
            };
            var aN = aR.dragOptions || {},
                    aG = jsPlumb.extend({}, aQ.defaultDragOptions),
                    aj = aQ.dragEvents.start,
                    ad = aQ.dragEvents.stop,
                    ar = aQ.dragEvents.drag;
            aN = jsPlumb.extend(aG, aN);
            aN.scope = aN.scope || aJ.scope;
            aN[aj] = aH.wrap(aN[aj], ax);
            aN[ar] = aH.wrap(aN[ar], aA.drag);
            aN[ad] = aH.wrap(aN[ad], function () {
                var k = aQ.getDropEvent(arguments);
                aK.removeWithFunction(aR.endpointsByElement[ay.id], function (m) {
                    return m.id == aT.id
                });
                aK.removeElement(an.canvas, ao);
                aH.anchorManager.clearFor(ay.id);
                var l = aO.floatingAnchorIndex == null ? 1 : aO.floatingAnchorIndex;
                aO.endpoints[l == 0 ? 1 : 0].anchor.locked = false;
                if (aO.endpoints[l] == aT) {
                    if (aI && aO.suspendedEndpoint) {
                        if (l == 0) {
                            aO.source = aD[0];
                            aO.sourceId = aD[1]
                        } else {
                            aO.target = aD[0];
                            aO.targetId = aD[1]
                        }
                        aQ.setDragScope(aD[2], aD[3]);
                        aO.endpoints[l] = aO.suspendedEndpoint;
                        if (aO.isReattach() || aO._forceReattach || aO._forceDetach || !aO.endpoints[l == 0 ? 1 : 0].detach(aO, false, false, true, k)) {
                            aO.setHover(false);
                            aO.floatingAnchorIndex = null;
                            aO.suspendedEndpoint.addConnection(aO);
                            aH.repaint(aD[1])
                        }
                        aO._forceDetach = null;
                        aO._forceReattach = null
                    } else {
                        aK.removeElements(aO.getConnector().getDisplayElements(), aJ.parent);
                        aJ.detachFromConnection(aO)
                    }
                }
                aK.removeElements([ay.element[0], aT.canvas], ao);
                aH.dragManager.elementRemoved(aT.elementId);
                aJ.canvas.style.visibility = "visible";
                aJ.anchor.locked = false;
                aJ.paint({
                    recalc: false
                });
                aO.removeClass(aH.draggingClass);
                aT.removeClass(aH.draggingClass);
                aH.fire("connectionDragStop", aO);
                aO = null;
                an = null;
                delete aR.endpointsByElement[aT.elementId];
                aT.anchor = null;
                aT = null;
                aH.currentlyDragging = false
            });
            var ae = aB(aJ.canvas);
            aQ.initDraggable(ae, aN, true, aH)
        }
        var aL = function (q, l, n, k) {
            if ((aR.isTarget || l) && aQ.isDropSupported(ao)) {
                var p = aR.dropOptions || aH.Defaults.DropOptions || jsPlumb.Defaults.DropOptions;
                p = jsPlumb.extend({}, p);
                p.scope = p.scope || aJ.scope;
                var r = aQ.dragEvents.drop,
                        m = aQ.dragEvents.over,
                        s = aQ.dragEvents.out,
                        o = function () {
                            aJ.removeClass(aH.endpointDropAllowedClass);
                            aJ.removeClass(aH.endpointDropForbiddenClass);
                            var G = aQ.getDropEvent(arguments),
                                    D = aB(aQ.getDragObject(arguments)),
                                    E = ap(D, "dragId"),
                                    B = ap(D, "elId"),
                                    H = ap(D, "originalScope"),
                                    x = aw[E];
                            var A = x.suspendedEndpoint && (x.suspendedEndpoint.id == aJ.id || aJ.referenceEndpoint && x.suspendedEndpoint.id == aJ.referenceEndpoint.id);
                            if (A) {
                                x._forceReattach = true;
                                return
                            }
                            if (x != null) {
                                var v = x.floatingAnchorIndex == null ? 1 : x.floatingAnchorIndex,
                                        u = v == 0 ? 1 : 0;
                                if (H) {
                                    jsPlumb.CurrentLibrary.setDragScope(D, H)
                                }
                                var I = k != null ? k.isEnabled() : true;
                                if (aJ.isFull()) {
                                    aJ.fire("maxConnections", {
                                        endpoint: aJ,
                                        connection: x,
                                        maxConnections: al
                                    }, G)
                                }
                                if (!aJ.isFull() && !(v == 0 && !aJ.isSource) && !(v == 1 && !aJ.isTarget) && I) {
                                    var y = true;
                                    if (x.suspendedEndpoint && x.suspendedEndpoint.id != aJ.id) {
                                        if (v == 0) {
                                            x.source = x.suspendedEndpoint.element;
                                            x.sourceId = x.suspendedEndpoint.elementId
                                        } else {
                                            x.target = x.suspendedEndpoint.element;
                                            x.targetId = x.suspendedEndpoint.elementId
                                        }
                                        if (!x.isDetachAllowed(x) || !x.endpoints[v].isDetachAllowed(x) || !x.suspendedEndpoint.isDetachAllowed(x) || !aH.checkCondition("beforeDetach", x)) {
                                            y = false
                                        }
                                    }
                                    if (v == 0) {
                                        x.source = aJ.element;
                                        x.sourceId = aJ.elementId
                                    } else {
                                        x.target = aJ.element;
                                        x.targetId = aJ.elementId
                                    }
                                    var w = function () {
                                        x.floatingAnchorIndex = null
                                    };
                                    var F = function () {
                                        x.endpoints[v].detachFromConnection(x);
                                        if (x.suspendedEndpoint) {
                                            x.suspendedEndpoint.detachFromConnection(x)
                                        }
                                        x.endpoints[v] = aJ;
                                        aJ.addConnection(x);
                                        var J = aJ.getParameters();
                                        for (var L in J) {
                                            x.setParameter(L, J[L])
                                        }
                                        if (!x.suspendedEndpoint) {
                                            if (J.draggable) {
                                                jsPlumb.CurrentLibrary.initDraggable(aJ.element, aN, true, aH)
                                            }
                                        } else {
                                            var K = x.suspendedEndpoint.getElement(),
                                                    M = x.suspendedEndpoint.elementId;
                                            a({
                                                source: v == 0 ? K : x.source,
                                                target: v == 1 ? K : x.target,
                                                sourceId: v == 0 ? M : x.sourceId,
                                                targetId: v == 1 ? M : x.targetId,
                                                sourceEndpoint: v == 0 ? x.suspendedEndpoint : x.endpoints[0],
                                                targetEndpoint: v == 1 ? x.suspendedEndpoint : x.endpoints[1],
                                                connection: x
                                            }, true, G)
                                        }
                                        if (x.endpoints[0].addedViaMouse) {
                                            x.endpointsToDeleteOnDetach[0] = x.endpoints[0]
                                        }
                                        if (x.endpoints[1].addedViaMouse) {
                                            x.endpointsToDeleteOnDetach[1] = x.endpoints[1]
                                        }
                                        b(x, null, G);
                                        w()
                                    };
                                    var C = function () {
                                        if (x.suspendedEndpoint) {
                                            x.endpoints[v] = x.suspendedEndpoint;
                                            x.setHover(false);
                                            x._forceDetach = true;
                                            if (v == 0) {
                                                x.source = x.suspendedEndpoint.element;
                                                x.sourceId = x.suspendedEndpoint.elementId
                                            } else {
                                                x.target = x.suspendedEndpoint.element;
                                                x.targetId = x.suspendedEndpoint.elementId
                                            }
                                            x.suspendedEndpoint.addConnection(x);
                                            x.endpoints[0].repaint();
                                            x.repaint();
                                            aH.repaint(x.sourceId);
                                            x._forceDetach = false
                                        }
                                        w()
                                    };
                                    y = y && aJ.isDropAllowed(x.sourceId, x.targetId, x.scope, x, aJ);
                                    if (y) {
                                        F()
                                    } else {
                                        C()
                                    }
                                }
                                aH.currentlyDragging = false;
                                delete aw[E];
                                aH.anchorManager.removeFloatingConnection(E)
                            }
                        };
                p[r] = aH.wrap(p[r], o);
                p[m] = aH.wrap(p[m], function () {
                    var y = aQ.getDragObject(arguments),
                            u = ap(aB(y), "dragId"),
                            v = aw[u];
                    if (v != null) {
                        var A = v.floatingAnchorIndex == null ? 1 : v.floatingAnchorIndex;
                        var w = (aJ.isTarget && v.floatingAnchorIndex != 0) || (v.suspendedEndpoint && aJ.referenceEndpoint && aJ.referenceEndpoint.id == v.suspendedEndpoint.id);
                        if (w) {
                            var x = aH.checkCondition("checkDropAllowed", {
                                sourceEndpoint: v.endpoints[A],
                                targetEndpoint: aJ,
                                connection: v
                            });
                            aJ[(x ? "add" : "remove") + "Class"](aH.endpointDropAllowedClass);
                            aJ[(x ? "remove" : "add") + "Class"](aH.endpointDropForbiddenClass);
                            v.endpoints[A].anchor.over(aJ.anchor)
                        }
                    }
                });
                p[s] = aH.wrap(p[s], function () {
                    var x = aQ.getDragObject(arguments),
                            u = ap(aB(x), "dragId"),
                            v = aw[u];
                    if (v != null) {
                        var y = v.floatingAnchorIndex == null ? 1 : v.floatingAnchorIndex;
                        var w = (aJ.isTarget && v.floatingAnchorIndex != 0) || (v.suspendedEndpoint && aJ.referenceEndpoint && aJ.referenceEndpoint.id == v.suspendedEndpoint.id);
                        if (w) {
                            aJ.removeClass(aH.endpointDropAllowedClass);
                            aJ.removeClass(aH.endpointDropForbiddenClass);
                            v.endpoints[y].anchor.out()
                        }
                    }
                });
                aQ.initDroppable(q, p, true, n)
            }
        };
        aL(aB(aJ.canvas), true, !(aR._transient || aJ.anchor.isFloating), aJ);
        if (aR.type) {
            aJ.addType(aR.type, aR.data, aH.isSuspendDrawing())
        }
        return aJ
    }
})();
(function () {
    jsPlumb.Connection = function (aD) {
        var au = this,
                an = true,
                T, Y, aq = aD._jsPlumb,
                az = jsPlumb.CurrentLibrary,
                ai = az.getAttribute,
                U = az.getElementObject,
                aw = jsPlumbUtil,
                aE = az.getOffset,
                V = aD.newConnection,
                aa = aD.newEndpoint,
                aB = null;
        au.idPrefix = "_jsplumb_c_";
        au.defaultLabelLocation = 0.5;
        au.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"];
        this.parent = aD.parent;
        overlayCapableJsPlumbUIComponent.apply(this, arguments);
        this.isVisible = function () {
            return an
        };
        this.setVisible = function (a) {
            an = a;
            au[a ? "showOverlays" : "hideOverlays"]();
            if (aB && aB.canvas) {
                aB.canvas.style.display = a ? "block" : "none"
            }
            au.repaint()
        };
        var ag = aD.editable === true;
        this.setEditable = function (a) {
            if (aB && aB.isEditable()) {
                ag = a
            }
            return ag
        };
        this.isEditable = function () {
            return ag
        };
        this.editStarted = function () {
            au.fire("editStarted", {
                path: aB.getPath()
            });
            aq.setHoverSuspended(true)
        };
        this.editCompleted = function () {
            au.fire("editCompleted", {
                path: aB.getPath()
            });
            au.setHover(false);
            aq.setHoverSuspended(false)
        };
        this.editCanceled = function () {
            au.fire("editCanceled", {
                path: aB.getPath()
            });
            au.setHover(false);
            aq.setHoverSuspended(false)
        };
        var at = this.addClass,
                af = this.removeClass;
        this.addClass = function (a, b) {
            at(a);
            if (b) {
                au.endpoints[0].addClass(a);
                au.endpoints[1].addClass(a)
            }
        };
        this.removeClass = function (a, b) {
            af(a);
            if (b) {
                au.endpoints[0].removeClass(a);
                au.endpoints[1].removeClass(a)
            }
        };
        this.getTypeDescriptor = function () {
            return "connection"
        };
        this.getDefaultType = function () {
            return {
                parameters: {},
                scope: null,
                detachable: au._jsPlumb.Defaults.ConnectionsDetachable,
                rettach: au._jsPlumb.Defaults.ReattachConnections,
                paintStyle: au._jsPlumb.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
                connector: au._jsPlumb.Defaults.Connector || jsPlumb.Defaults.Connector,
                hoverPaintStyle: au._jsPlumb.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle,
                overlays: au._jsPlumb.Defaults.ConnectorOverlays || jsPlumb.Defaults.ConnectorOverlays
            }
        };
        var Z = this.applyType;
        this.applyType = function (b, a) {
            Z(b, a);
            if (b.detachable != null) {
                au.setDetachable(b.detachable)
            }
            if (b.reattach != null) {
                au.setReattach(b.reattach)
            }
            if (b.scope) {
                au.scope = b.scope
            }
            ag = b.editable;
            au.setConnector(b.connector, a)
        };
        Y = au.setHover;
        au.setHover = function (a) {
            aB.setHover.apply(aB, arguments);
            Y.apply(au, arguments)
        };
        T = function (a) {
            if (!aq.isConnectionBeingDragged()) {
                au.setHover(a, false)
            }
        };
        var ad = function (d, a, b) {
            var c = new Object();
            if (!aq.Defaults.DoNotThrowErrors && jsPlumb.Connectors[a] == null) {
                throw {
                    msg: "jsPlumb: unknown connector type '" + a + "'"
                }
            }
            jsPlumb.Connectors[a].apply(c, [b]);
            jsPlumb.ConnectorRenderers[d].apply(c, [b]);
            return c
        };
        this.setConnector = function (b, d) {
            if (aB != null) {
                aw.removeElements(aB.getDisplayElements())
            }
            var a = {
                _jsPlumb: au._jsPlumb,
                parent: aD.parent,
                cssClass: aD.cssClass,
                container: aD.container,
                tooltip: au.tooltip,
                "pointer-events": aD["pointer-events"]
            },
            c = aq.getRenderMode();
            if (aw.isString(b)) {
                aB = ad(c, b, a)
            } else {
                if (aw.isArray(b)) {
                    if (b.length == 1) {
                        aB = ad(c, b[0], a)
                    } else {
                        aB = ad(c, b[0], aw.merge(b[1], a))
                    }
                }
            }
            au.bindListeners(aB, au, T);
            au.canvas = aB.canvas;
            if (ag && jsPlumb.ConnectorEditors != null && jsPlumb.ConnectorEditors[aB.type] && aB.isEditable()) {
                new jsPlumb.ConnectorEditors[aB.type]({
                    connector: aB,
                    connection: au,
                    params: aD.editorParams || {}
                })
            } else {
                ag = false
            }
            if (!d) {
                au.repaint()
            }
        };
        this.getConnector = function () {
            return aB
        };
        this.source = U(aD.source);
        this.target = U(aD.target);
        if (aD.sourceEndpoint) {
            this.source = aD.sourceEndpoint.endpointWillMoveTo || aD.sourceEndpoint.getElement()
        }
        if (aD.targetEndpoint) {
            this.target = aD.targetEndpoint.getElement()
        }
        au.previousConnection = aD.previousConnection;
        this.sourceId = ai(this.source, "id");
        this.targetId = ai(this.target, "id");
        this.scope = aD.scope;
        this.endpoints = [];
        this.endpointStyles = [];
        var ah = function (a, b) {
            return (a) ? aq.makeAnchor(a, b, aq) : null
        },
                ae = function (l, d, k, g, f, h, e) {
                    var c;
                    if (l) {
                        au.endpoints[d] = l;
                        l.addConnection(au)
                    } else {
                        if (!k.endpoints) {
                            k.endpoints = [null, null]
                        }
                        var m = k.endpoints[d] || k.endpoint || aq.Defaults.Endpoints[d] || jsPlumb.Defaults.Endpoints[d] || aq.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                        if (!k.endpointStyles) {
                            k.endpointStyles = [null, null]
                        }
                        if (!k.endpointHoverStyles) {
                            k.endpointHoverStyles = [null, null]
                        }
                        var o = k.endpointStyles[d] || k.endpointStyle || aq.Defaults.EndpointStyles[d] || jsPlumb.Defaults.EndpointStyles[d] || aq.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                        if (o.fillStyle == null && h != null) {
                            o.fillStyle = h.strokeStyle
                        }
                        if (o.outlineColor == null && h != null) {
                            o.outlineColor = h.outlineColor
                        }
                        if (o.outlineWidth == null && h != null) {
                            o.outlineWidth = h.outlineWidth
                        }
                        var a = k.endpointHoverStyles[d] || k.endpointHoverStyle || aq.Defaults.EndpointHoverStyles[d] || jsPlumb.Defaults.EndpointHoverStyles[d] || aq.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                        if (e != null) {
                            if (a == null) {
                                a = {}
                            }
                            if (a.fillStyle == null) {
                                a.fillStyle = e.strokeStyle
                            }
                        }
                        var b = k.anchors ? k.anchors[d] : k.anchor ? k.anchor : ah(aq.Defaults.Anchors[d], f) || ah(jsPlumb.Defaults.Anchors[d], f) || ah(aq.Defaults.Anchor, f) || ah(jsPlumb.Defaults.Anchor, f),
                                n = k.uuids ? k.uuids[d] : null;
                        c = aa({
                            paintStyle: o,
                            hoverPaintStyle: a,
                            endpoint: m,
                            connections: [au],
                            uuid: n,
                            anchor: b,
                            source: g,
                            scope: k.scope,
                            container: k.container,
                            reattach: k.reattach || aq.Defaults.ReattachConnections,
                            detachable: k.detachable || aq.Defaults.ConnectionsDetachable
                        });
                        au.endpoints[d] = c;
                        if (k.drawEndpoints === false) {
                            c.setVisible(false, true, true)
                        }
                    }
                    return c
                };
        var ax = ae(aD.sourceEndpoint, 0, aD, au.source, au.sourceId, aD.paintStyle, aD.hoverPaintStyle);
        if (ax) {
            aw.addToList(aD.endpointsByElement, this.sourceId, ax)
        }
        var ay = ae(aD.targetEndpoint, 1, aD, au.target, au.targetId, aD.paintStyle, aD.hoverPaintStyle);
        if (ay) {
            aw.addToList(aD.endpointsByElement, this.targetId, ay)
        }
        if (!this.scope) {
            this.scope = this.endpoints[0].scope
        }
        au.endpointsToDeleteOnDetach = [null, null];
        if (aD.deleteEndpointsOnDetach) {
            if (aD.sourceIsNew) {
                au.endpointsToDeleteOnDetach[0] = au.endpoints[0]
            }
            if (aD.targetIsNew) {
                au.endpointsToDeleteOnDetach[1] = au.endpoints[1]
            }
        }
        if (aD.endpointsToDeleteOnDetach) {
            au.endpointsToDeleteOnDetach = aD.endpointsToDeleteOnDetach
        }
        au.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || aD.connector || aq.Defaults.Connector || jsPlumb.Defaults.Connector, true);
        if (aD.path) {
            aB.setPath(aD.path)
        }
        this.setPaintStyle(this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || aD.paintStyle || aq.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle, true);
        this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || aD.hoverPaintStyle || aq.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle, true);
        this.paintStyleInUse = this.getPaintStyle();
        var al = aq.getSuspendedAt();
        aq.updateOffset({
            elId: this.sourceId,
            timestamp: al
        });
        aq.updateOffset({
            elId: this.targetId,
            timestamp: al
        });
        if (!aq.isSuspendDrawing()) {
            var X = aq.getCachedData(this.sourceId),
                    aA = X.o,
                    ak = X.s,
                    ap = aq.getCachedData(this.targetId),
                    ar = ap.o,
                    ac = ap.s,
                    S = al || aq.timestamp(),
                    av = this.endpoints[0].anchor.compute({
                xy: [aA.left, aA.top],
                wh: ak,
                element: this.endpoints[0],
                elementId: this.endpoints[0].elementId,
                txy: [ar.left, ar.top],
                twh: ac,
                tElement: this.endpoints[1],
                timestamp: S
            });
            this.endpoints[0].paint({
                anchorLoc: av,
                timestamp: S
            });
            av = this.endpoints[1].anchor.compute({
                xy: [ar.left, ar.top],
                wh: ac,
                element: this.endpoints[1],
                elementId: this.endpoints[1].elementId,
                txy: [aA.left, aA.top],
                twh: ak,
                tElement: this.endpoints[0],
                timestamp: S
            });
            this.endpoints[1].paint({
                anchorLoc: av,
                timestamp: S
            })
        }
        var ao = aq.Defaults.ConnectionsDetachable;
        if (aD.detachable === false) {
            ao = false
        }
        if (au.endpoints[0].connectionsDetachable === false) {
            ao = false
        }
        if (au.endpoints[1].connectionsDetachable === false) {
            ao = false
        }
        this.isDetachable = function () {
            return ao === true
        };
        this.setDetachable = function (a) {
            ao = a === true
        };
        var W = aD.reattach || au.endpoints[0].reattachConnections || au.endpoints[1].reattachConnections || aq.Defaults.ReattachConnections;
        this.isReattach = function () {
            return W === true
        };
        this.setReattach = function (a) {
            W = a === true
        };
        var aC = aD.cost || au.endpoints[0].getConnectionCost();
        au.getCost = function () {
            return aC
        };
        au.setCost = function (a) {
            aC = a
        };
        var am = aD.directed;
        if (aD.directed == null) {
            am = au.endpoints[0].areConnectionsDirected()
        }
        au.isDirected = function () {
            return am === true
        };
        var ab = jsPlumb.extend({}, this.endpoints[0].getParameters());
        jsPlumb.extend(ab, this.endpoints[1].getParameters());
        jsPlumb.extend(ab, au.getParameters());
        au.setParameters(ab);
        this.getAttachedElements = function () {
            return au.endpoints
        };
        this.moveParent = function (a) {
            var b = jsPlumb.CurrentLibrary,
                    c = b.getParent(aB.canvas);
            if (aB.bgCanvas) {
                b.removeElement(aB.bgCanvas);
                b.appendElement(aB.bgCanvas, a)
            }
            b.removeElement(aB.canvas);
            b.appendElement(aB.canvas, a);
            for (var d = 0; d < au.overlays.length; d++) {
                if (au.overlays[d].isAppendedAtTopLevel) {
                    b.removeElement(au.overlays[d].canvas);
                    b.appendElement(au.overlays[d].canvas, a);
                    if (au.overlays[d].reattachListeners) {
                        au.overlays[d].reattachListeners(aB)
                    }
                }
            }
            if (aB.reattachListeners) {
                aB.reattachListeners()
            }
        };
        var aj = null;
        this.paint = function (o) {
            if (an) {
                o = o || {};
                var y = o.elId,
                        x = o.ui,
                        c = o.recalc,
                        g = o.timestamp,
                        w = false,
                        p = w ? this.sourceId : this.targetId,
                        d = w ? this.targetId : this.sourceId,
                        f = w ? 0 : 1,
                        m = w ? 1 : 0;
                if (g == null || g != aj) {
                    var l = aq.updateOffset({
                        elId: y,
                        offset: x,
                        recalc: c,
                        timestamp: g
                    }).o,
                            b = aq.updateOffset({
                                elId: p,
                                timestamp: g
                            }).o,
                            u = this.endpoints[m],
                            h = this.endpoints[f];
                    if (o.clearEdits) {
                        u.anchor.clearUserDefinedLocation();
                        h.anchor.clearUserDefinedLocation();
                        aB.setEdited(false)
                    }
                    var e = u.anchor.getCurrentLocation(u),
                            q = h.anchor.getCurrentLocation(h);
                    aB.resetBounds();
                    aB.compute({
                        sourcePos: e,
                        targetPos: q,
                        sourceEndpoint: this.endpoints[m],
                        targetEndpoint: this.endpoints[f],
                        lineWidth: au.paintStyleInUse.lineWidth,
                        sourceInfo: l,
                        targetInfo: b,
                        clearEdits: o.clearEdits === true
                    });
                    var a = {
                        minX: Infinity,
                        minY: Infinity,
                        maxX: -Infinity,
                        maxY: -Infinity
                    };
                    for (var r = 0; r < au.overlays.length; r++) {
                        var v = au.overlays[r];
                        if (v.isVisible()) {
                            au.overlayPlacements[r] = v.draw(aB, au.paintStyleInUse);
                            a.minX = Math.min(a.minX, au.overlayPlacements[r].minX);
                            a.maxX = Math.max(a.maxX, au.overlayPlacements[r].maxX);
                            a.minY = Math.min(a.minY, au.overlayPlacements[r].minY);
                            a.maxY = Math.max(a.maxY, au.overlayPlacements[r].maxY)
                        }
                    }
                    var k = parseFloat(au.paintStyleInUse.lineWidth || 1) / 2,
                            n = parseFloat(au.paintStyleInUse.lineWidth || 0),
                            s = {
                                xmin: Math.min(aB.bounds.minX - (k + n), a.minX),
                                ymin: Math.min(aB.bounds.minY - (k + n), a.minY),
                                xmax: Math.max(aB.bounds.maxX + (k + n), a.maxX),
                                ymax: Math.max(aB.bounds.maxY + (k + n), a.maxY)
                            };
                    aB.paint(au.paintStyleInUse, null, s);
                    for (var r = 0; r < au.overlays.length; r++) {
                        var v = au.overlays[r];
                        if (v.isVisible()) {
                            v.paint(au.overlayPlacements[r], s)
                        }
                    }
                }
                aj = g
            }
        };
        this.repaint = function (a) {
            a = a || {};
            var b = !(a.recalc === false);
            this.paint({
                elId: this.sourceId,
                recalc: b,
                timestamp: a.timestamp,
                clearEdits: a.clearEdits
            })
        };
        var R = aD.type || au.endpoints[0].connectionType || au.endpoints[1].connectionType;
        if (R) {
            au.addType(R, aD.data, aq.isSuspendDrawing())
        }
    }
})();
(function () {
    jsPlumb.DOMElementComponent = function (a) {
        jsPlumb.jsPlumbUIComponent.apply(this, arguments);
        this.mousemove = this.dblclick = this.click = this.mousedown = this.mouseup = function (b) {}
    };
    jsPlumb.Segments = {
        AbstractSegment: function (a) {
            this.params = a;
            this.findClosestPointOnPath = function (c, b) {
                return {
                    d: Infinity,
                    x: null,
                    y: null,
                    l: null
                }
            };
            this.getBounds = function () {
                return {
                    minX: Math.min(a.x1, a.x2),
                    minY: Math.min(a.y1, a.y2),
                    maxX: Math.max(a.x1, a.x2),
                    maxY: Math.max(a.y1, a.y2)
                }
            }
        },
        Straight: function (s) {
            var a = this,
                    c = jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                    v, u, b, w, x, d, m, y = function () {
                        v = Math.sqrt(Math.pow(x - w, 2) + Math.pow(m - d, 2));
                        u = jsPlumbUtil.gradient({
                            x: w,
                            y: d
                        }, {
                            x: x,
                            y: m
                        });
                        b = -1 / u
                    };
            this.type = "Straight";
            a.getLength = function () {
                return v
            };
            a.getGradient = function () {
                return u
            };
            this.getCoordinates = function () {
                return {
                    x1: w,
                    y1: d,
                    x2: x,
                    y2: m
                }
            };
            this.setCoordinates = function (k) {
                w = k.x1;
                d = k.y1;
                x = k.x2;
                m = k.y2;
                y()
            };
            this.setCoordinates({
                x1: s.x1,
                y1: s.y1,
                x2: s.x2,
                y2: s.y2
            });
            this.getBounds = function () {
                return {
                    minX: Math.min(w, x),
                    minY: Math.min(d, m),
                    maxX: Math.max(w, x),
                    maxY: Math.max(d, m)
                }
            };
            this.pointOnPath = function (n, l) {
                if (n == 0 && !l) {
                    return {
                        x: w,
                        y: d
                    }
                } else {
                    if (n == 1 && !l) {
                        return {
                            x: x,
                            y: m
                        }
                    } else {
                        var k = l ? n > 0 ? n : v + n : n * v;
                        return jsPlumbUtil.pointOnLine({
                            x: w,
                            y: d
                        }, {
                            x: x,
                            y: m
                        }, k)
                    }
                }
            };
            this.gradientAtPoint = function (k) {
                return u
            };
            this.pointAlongPathFrom = function (k, l, n) {
                var o = a.pointOnPath(k, n),
                        p = k == 1 ? {
                            x: w + ((x - w) * 10),
                            y: d + ((d - m) * 10)
                        } : l <= 0 ? {
                    x: w,
                    y: d
                } : {
                    x: x,
                    y: m
                };
                if (l <= 0 && Math.abs(l) > 1) {
                    l *= -1
                }
                return jsPlumbUtil.pointOnLine(o, p, l)
            };
            this.findClosestPointOnPath = function (q, r) {
                if (u == 0) {
                    return {
                        x: q,
                        y: d,
                        d: Math.abs(r - d)
                    }
                } else {
                    if (u == Infinity || u == -Infinity) {
                        return {
                            x: w,
                            y: r,
                            d: Math.abs(q - 1)
                        }
                    } else {
                        var l = d - (u * w),
                                p = r - (b * q),
                                o = (p - l) / (u - b),
                                D = (u * o) + l,
                                k = jsPlumbUtil.lineLength([q, r], [o, D]),
                                n = jsPlumbUtil.lineLength([o, D], [w, d]);
                        return {
                            d: k,
                            x: o,
                            y: D,
                            l: n / v
                        }
                    }
                }
            }
        },
        Arc: function (w) {
            var a = this,
                    b = jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                    u = function (k, l) {
                        return jsPlumbUtil.theta([w.cx, w.cy], [k, l])
                    },
                    B = function (m) {
                        if (a.anticlockwise) {
                            var n = a.startAngle < a.endAngle ? a.startAngle + x : a.startAngle,
                                    k = Math.abs(n - a.endAngle);
                            return n - (k * m)
                        } else {
                            var l = a.endAngle < a.startAngle ? a.endAngle + x : a.endAngle,
                                    k = Math.abs(l - a.startAngle);
                            return a.startAngle + (k * m)
                        }
                    },
                    x = 2 * Math.PI;
            this.radius = w.r;
            this.anticlockwise = w.ac;
            this.type = "Arc";
            if (w.startAngle && w.endAngle) {
                this.startAngle = w.startAngle;
                this.endAngle = w.endAngle;
                this.x1 = w.cx + (a.radius * Math.cos(w.startAngle));
                this.y1 = w.cy + (a.radius * Math.sin(w.startAngle));
                this.x2 = w.cx + (a.radius * Math.cos(w.endAngle));
                this.y2 = w.cy + (a.radius * Math.sin(w.endAngle))
            } else {
                this.startAngle = u(w.x1, w.y1);
                this.endAngle = u(w.x2, w.y2);
                this.x1 = w.x1;
                this.y1 = w.y1;
                this.x2 = w.x2;
                this.y2 = w.y2
            }
            if (this.endAngle < 0) {
                this.endAngle += x
            }
            if (this.startAngle < 0) {
                this.startAngle += x
            }
            this.segment = jsPlumbUtil.segment([this.x1, this.y1], [this.x2, this.y2]);
            var s = a.endAngle < a.startAngle ? a.endAngle + x : a.endAngle;
            a.sweep = Math.abs(s - a.startAngle);
            if (a.anticlockwise) {
                a.sweep = x - a.sweep
            }
            var c = 2 * Math.PI * a.radius,
                    A = a.sweep / x,
                    y = c * A;
            this.getLength = function () {
                return y
            };
            this.getBounds = function () {
                return {
                    minX: w.cx - w.r,
                    maxX: w.cx + w.r,
                    minY: w.cy - w.r,
                    maxY: w.cy + w.r
                }
            };
            var v = 1e-10,
                    d = function (k) {
                        var l = Math.floor(k),
                                m = Math.ceil(k);
                        if (k - l < v) {
                            return l
                        } else {
                            if (m - k < v) {
                                return m
                            }
                        }
                        return k
                    };
            this.pointOnPath = function (o, k) {
                if (o == 0) {
                    return {
                        x: a.x1,
                        y: a.y1,
                        theta: a.startAngle
                    }
                } else {
                    if (o == 1) {
                        return {
                            x: a.x2,
                            y: a.y2,
                            theta: a.endAngle
                        }
                    }
                }
                if (k) {
                    o = o / y
                }
                var l = B(o),
                        m = w.cx + (w.r * Math.cos(l)),
                        n = w.cy + (w.r * Math.sin(l));
                return {
                    x: d(m),
                    y: d(n),
                    theta: l
                }
            };
            this.gradientAtPoint = function (m, k) {
                var l = a.pointOnPath(m, k);
                var n = jsPlumbUtil.normal([w.cx, w.cy], [l.x, l.y]);
                if (!a.anticlockwise && (n == Infinity || n == -Infinity)) {
                    n *= -1
                }
                return n
            };
            this.pointAlongPathFrom = function (k, D, l) {
                var q = a.pointOnPath(k, l),
                        r = D / c * 2 * Math.PI,
                        p = a.anticlockwise ? -1 : 1,
                        m = q.theta + (p * r),
                        n = w.cx + (a.radius * Math.cos(m)),
                        o = w.cy + (a.radius * Math.sin(m));
                return {
                    x: n,
                    y: o
                }
            }
        },
        Bezier: function (a) {
            var n = this,
                    d = jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                    b = [{
                            x: a.x1,
                            y: a.y1
                        }, {
                            x: a.cp1x,
                            y: a.cp1y
                        }, {
                            x: a.cp2x,
                            y: a.cp2y
                        }, {
                            x: a.x2,
                            y: a.y2
                        }],
                    m = {
                        minX: Math.min(a.x1, a.x2, a.cp1x, a.cp2x),
                        minY: Math.min(a.y1, a.y2, a.cp1y, a.cp2y),
                        maxX: Math.max(a.x1, a.x2, a.cp1x, a.cp2x),
                        maxY: Math.max(a.y1, a.y2, a.cp1y, a.cp2y)
                    };
            this.type = "Bezier";
            var c = function (p, k, l) {
                if (l) {
                    k = jsBezier.locationAlongCurveFrom(p, k > 0 ? 0 : 1, k)
                }
                return k
            };
            this.pointOnPath = function (k, l) {
                k = c(b, k, l);
                return jsBezier.pointOnCurve(b, k)
            };
            this.gradientAtPoint = function (k, l) {
                k = c(b, k, l);
                return jsBezier.gradientAtPoint(b, k)
            };
            this.pointAlongPathFrom = function (k, l, p) {
                k = c(b, k, p);
                return jsBezier.pointAlongCurveFrom(b, k, l)
            };
            this.getLength = function () {
                return jsBezier.getLength(b)
            };
            this.getBounds = function () {
                return m
            }
        }
    };
    var g = function () {
        var a = this;
        a.resetBounds = function () {
            a.bounds = {
                minX: Infinity,
                minY: Infinity,
                maxX: -Infinity,
                maxY: -Infinity
            }
        };
        a.resetBounds()
    };
    jsPlumb.Connectors.AbstractConnector = function (I) {
        g.apply(this, arguments);
        var c = this,
                L = [],
                U = false,
                K = 0,
                S = [],
                E = [],
                V = I.stub || 0,
                P = jsPlumbUtil.isArray(V) ? V[0] : V,
                G = jsPlumbUtil.isArray(V) ? V[1] : V,
                b = I.gap || 0,
                O = jsPlumbUtil.isArray(b) ? b[0] : b,
                M = jsPlumbUtil.isArray(b) ? b[1] : b,
                N = null,
                R = false,
                Q = null;
        this.isEditable = function () {
            return false
        };
        this.setEdited = function (k) {
            R = k
        };
        this.getPath = function () {};
        this.setPath = function (k) {};
        this.findSegmentForPoint = function (o, k) {
            var n = {
                d: Infinity,
                s: null,
                x: null,
                y: null,
                l: null
            };
            for (var m = 0; m < L.length; m++) {
                var l = L[m].findClosestPointOnPath(o, k);
                if (l.d < n.d) {
                    n.d = l.d;
                    n.l = l.l;
                    n.x = l.x;
                    n.y = l.y;
                    n.s = L[m]
                }
            }
            return n
        };
        var J = function () {
            var k = 0;
            for (var l = 0; l < L.length; l++) {
                var m = L[l].getLength();
                E[l] = m / K;
                S[l] = [k, (k += (m / K))]
            }
        },
                T = function (m, k) {
                    if (k) {
                        m = m > 0 ? m / K : (K + m) / K
                    }
                    var o = S.length - 1,
                            n = 1;
                    for (var l = 0; l < S.length; l++) {
                        if (S[l][1] >= m) {
                            o = l;
                            n = m == 1 ? 1 : m == 0 ? 0 : (m - S[l][0]) / E[l];
                            break
                        }
                    }
                    return {
                        segment: L[o],
                        proportion: n,
                        index: o
                    }
                },
                a = function (l, k) {
                    var m = new jsPlumb.Segments[l](k);
                    L.push(m);
                    K += m.getLength();
                    c.updateBounds(m)
                },
                F = function () {
                    K = 0;
                    L.splice(0, L.length);
                    S.splice(0, S.length);
                    E.splice(0, E.length)
                };
        this.setSegments = function (k) {
            N = [];
            K = 0;
            for (var l = 0; l < k.length; l++) {
                N.push(k[l]);
                K += k[l].getLength()
            }
        };
        var H = function (m) {
            c.lineWidth = m.lineWidth;
            var X = jsPlumbUtil.segment(m.sourcePos, m.targetPos),
                    q = m.targetPos[0] < m.sourcePos[0],
                    s = m.targetPos[1] < m.sourcePos[1],
                    B = m.lineWidth || 1,
                    n = m.sourceEndpoint.anchor.orientation || m.sourceEndpoint.anchor.getOrientation(m.sourceEndpoint),
                    D = m.targetEndpoint.anchor.orientation || m.targetEndpoint.anchor.getOrientation(m.targetEndpoint),
                    x = q ? m.targetPos[0] : m.sourcePos[0],
                    y = s ? m.targetPos[1] : m.sourcePos[1],
                    v = Math.abs(m.targetPos[0] - m.sourcePos[0]),
                    o = Math.abs(m.targetPos[1] - m.sourcePos[1]);
            if (n[0] == 0 && n[1] == 0 || D[0] == 0 && D[1] == 0) {
                var A = v > o ? 0 : 1,
                        C = [1, 0][A];
                n = [];
                D = [];
                n[A] = m.sourcePos[A] > m.targetPos[A] ? -1 : 1;
                D[A] = m.sourcePos[A] > m.targetPos[A] ? 1 : -1;
                n[C] = 0;
                D[C] = 0
            }
            var r = q ? v + (O * n[0]) : O * n[0],
                    u = s ? o + (O * n[1]) : O * n[1],
                    k = q ? M * D[0] : v + (M * D[0]),
                    l = s ? M * D[1] : o + (M * D[1]),
                    p = ((n[0] * D[0]) + (n[1] * D[1]));
            var w = {
                sx: r,
                sy: u,
                tx: k,
                ty: l,
                lw: B,
                xSpan: Math.abs(k - r),
                ySpan: Math.abs(l - u),
                mx: (r + k) / 2,
                my: (u + l) / 2,
                so: n,
                to: D,
                x: x,
                y: y,
                w: v,
                h: o,
                segment: X,
                startStubX: r + (n[0] * P),
                startStubY: u + (n[1] * P),
                endStubX: k + (D[0] * G),
                endStubY: l + (D[1] * G),
                isXGreaterThanStubTimes2: Math.abs(r - k) > (P + G),
                isYGreaterThanStubTimes2: Math.abs(u - l) > (P + G),
                opposite: p == -1,
                perpendicular: p == 0,
                orthogonal: p == 1,
                sourceAxis: n[0] == 0 ? "y" : "x",
                points: [x, y, v, o, r, u, k, l]
            };
            w.anchorOrientation = w.opposite ? "opposite" : w.orthogonal ? "orthogonal" : "perpendicular";
            return w
        };
        this.getSegments = function () {
            return L
        };
        c.updateBounds = function (k) {
            var l = k.getBounds();
            c.bounds.minX = Math.min(c.bounds.minX, l.minX);
            c.bounds.maxX = Math.max(c.bounds.maxX, l.maxX);
            c.bounds.minY = Math.min(c.bounds.minY, l.minY);
            c.bounds.maxY = Math.max(c.bounds.maxY, l.maxY)
        };
        var d = function () {
            console.log("SEGMENTS:");
            for (var k = 0; k < L.length; k++) {
                console.log(L[k].type, L[k].getLength(), S[k])
            }
        };
        this.pointOnPath = function (l, k) {
            var m = T(l, k);
            return m.segment.pointOnPath(m.proportion, k)
        };
        this.gradientAtPoint = function (k) {
            var l = T(k, absolute);
            return l.segment.gradientAtPoint(l.proportion, absolute)
        };
        this.pointAlongPathFrom = function (m, k, l) {
            var n = T(m, l);
            return n.segment.pointAlongPathFrom(n.proportion, k, false)
        };
        this.compute = function (k) {
            if (!R) {
                Q = H(k)
            }
            F();
            this._compute(Q, k);
            c.x = Q.points[0];
            c.y = Q.points[1];
            c.w = Q.points[2];
            c.h = Q.points[3];
            c.segment = Q.segment;
            J()
        };
        return {
            addSegment: a,
            prepareCompute: H,
            sourceStub: P,
            targetStub: G,
            maxStub: Math.max(P, G),
            sourceGap: O,
            targetGap: M,
            maxGap: Math.max(O, M)
        }
    };
    jsPlumb.Connectors.Straight = function () {
        this.type = "Straight";
        var a = jsPlumb.Connectors.AbstractConnector.apply(this, arguments);
        this._compute = function (b, c) {
            a.addSegment("Straight", {
                x1: b.sx,
                y1: b.sy,
                x2: b.startStubX,
                y2: b.startStubY
            });
            a.addSegment("Straight", {
                x1: b.startStubX,
                y1: b.startStubY,
                x2: b.endStubX,
                y2: b.endStubY
            });
            a.addSegment("Straight", {
                x1: b.endStubX,
                y1: b.endStubY,
                x2: b.tx,
                y2: b.ty
            })
        }
    };
    jsPlumb.Connectors.Bezier = function (a) {
        a = a || {};
        var m = this,
                c = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                b = a.stub || 50,
                n = a.curviness || 150,
                d = 10;
        this.type = "Bezier";
        this.getCurviness = function () {
            return n
        };
        this._findControlPoint = function (A, y, D, x, l) {
            var C = x.anchor.getOrientation(x),
                    B = l.anchor.getOrientation(l),
                    k = C[0] != B[0] || C[1] == B[1],
                    p = [];
            if (!k) {
                if (C[0] == 0) {
                    p.push(y[0] < D[0] ? A[0] + d : A[0] - d)
                } else {
                    p.push(A[0] - (n * C[0]))
                }
                if (C[1] == 0) {
                    p.push(y[1] < D[1] ? A[1] + d : A[1] - d)
                } else {
                    p.push(A[1] + (n * B[1]))
                }
            } else {
                if (B[0] == 0) {
                    p.push(D[0] < y[0] ? A[0] + d : A[0] - d)
                } else {
                    p.push(A[0] + (n * B[0]))
                }
                if (B[1] == 0) {
                    p.push(D[1] < y[1] ? A[1] + d : A[1] - d)
                } else {
                    p.push(A[1] + (n * C[1]))
                }
            }
            return p
        };
        this._compute = function (k, B) {
            var l = B.sourcePos,
                    F = B.targetPos,
                    E = Math.abs(l[0] - F[0]),
                    I = Math.abs(l[1] - F[1]),
                    H = l[0] < F[0] ? E : 0,
                    J = l[1] < F[1] ? I : 0,
                    C = l[0] < F[0] ? 0 : E,
                    D = l[1] < F[1] ? 0 : I,
                    p = m._findControlPoint([H, J], l, F, B.sourceEndpoint, B.targetEndpoint),
                    G = m._findControlPoint([C, D], F, l, B.targetEndpoint, B.sourceEndpoint);
            c.addSegment("Bezier", {
                x1: H,
                y1: J,
                x2: C,
                y2: D,
                cp1x: p[0],
                cp1y: p[1],
                cp2x: G[0],
                cp2y: G[1]
            })
        }
    };
    jsPlumb.Endpoints.AbstractEndpoint = function (a) {
        g.apply(this, arguments);
        var b = this;
        this.compute = function (d, p, c, n) {
            var o = b._compute.apply(b, arguments);
            b.x = o[0];
            b.y = o[1];
            b.w = o[2];
            b.h = o[3];
            b.bounds.minX = b.x;
            b.bounds.minY = b.y;
            b.bounds.maxX = b.x + b.w;
            b.bounds.maxY = b.y + b.h;
            return o
        };
        return {
            compute: b.compute,
            cssClass: a.cssClass
        }
    };
    jsPlumb.Endpoints.Dot = function (a) {
        this.type = "Dot";
        var c = this,
                b = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        a = a || {};
        this.radius = a.radius || 10;
        this.defaultOffset = 0.5 * this.radius;
        this.defaultInnerRadius = this.radius / 3;
        this._compute = function (d, B, A, x) {
            c.radius = A.radius || c.radius;
            var u = d[0] - c.radius,
                    v = d[1] - c.radius,
                    C = c.radius * 2,
                    w = c.radius * 2;
            if (A.strokeStyle) {
                var y = A.lineWidth || 1;
                u -= y;
                v -= y;
                C += (y * 2);
                w += (y * 2)
            }
            return [u, v, C, w, c.radius]
        }
    };
    jsPlumb.Endpoints.Rectangle = function (a) {
        this.type = "Rectangle";
        var c = this,
                b = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        a = a || {};
        this.width = a.width || 20;
        this.height = a.height || 20;
        this._compute = function (x, r, v, y) {
            var d = v.width || c.width,
                    s = v.height || c.height,
                    u = x[0] - (d / 2),
                    w = x[1] - (s / 2);
            return [u, w, d, s]
        }
    };
    var e = function (a) {
        jsPlumb.DOMElementComponent.apply(this, arguments);
        var c = this;
        var b = [];
        this.getDisplayElements = function () {
            return b
        };
        this.appendDisplayElement = function (d) {
            b.push(d)
        }
    };
    jsPlumb.Endpoints.Image = function (s) {
        this.type = "Image";
        e.apply(this, arguments);
        var a = this,
                b = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments),
                u = false,
                v = false,
                w = s.width,
                x = s.height,
                d = null,
                y = s.endpoint;
        this.img = new Image();
        a.ready = false;
        this.img.onload = function () {
            a.ready = true;
            w = w || a.img.width;
            x = x || a.img.height;
            if (d) {
                d(a)
            }
        };
        y.setImage = function (m, k) {
            var l = m.constructor == String ? m : m.src;
            d = k;
            a.img.src = m;
            if (a.canvas != null) {
                a.canvas.setAttribute("src", m)
            }
        };
        y.setImage(s.src || s.url, s.onload);
        this._compute = function (l, n, k, m) {
            a.anchorPoint = l;
            if (a.ready) {
                return [l[0] - w / 2, l[1] - x / 2, w, x]
            } else {
                return [0, 0, 0, 0]
            }
        };
        a.canvas = document.createElement("img"), u = false;
        a.canvas.style.margin = 0;
        a.canvas.style.padding = 0;
        a.canvas.style.outline = 0;
        a.canvas.style.position = "absolute";
        var r = s.cssClass ? " " + s.cssClass : "";
        a.canvas.className = jsPlumb.endpointClass + r;
        if (w) {
            a.canvas.setAttribute("width", w)
        }
        if (x) {
            a.canvas.setAttribute("height", x)
        }
        jsPlumb.appendElement(a.canvas, s.parent);
        a.attachListeners(a.canvas, a);
        a.cleanup = function () {
            v = true
        };
        var c = function (l, m, n) {
            if (!v) {
                if (!u) {
                    a.canvas.setAttribute("src", a.img.src);
                    a.appendDisplayElement(a.canvas);
                    u = true
                }
                var o = a.anchorPoint[0] - (w / 2),
                        k = a.anchorPoint[1] - (x / 2);
                jsPlumb.sizeCanvas(a.canvas, o, k, w, x)
            }
        };
        this.paint = function (k, l) {
            if (a.ready) {
                c(k, l)
            } else {
                window.setTimeout(function () {
                    a.paint(k, l)
                }, 200)
            }
        }
    };
    jsPlumb.Endpoints.Blank = function (a) {
        var c = this,
                b = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        this.type = "Blank";
        e.apply(this, arguments);
        this._compute = function (n, p, d, o) {
            return [n[0], n[1], 10, 0]
        };
        c.canvas = document.createElement("div");
        c.canvas.style.display = "block";
        c.canvas.style.width = "1px";
        c.canvas.style.height = "1px";
        c.canvas.style.background = "transparent";
        c.canvas.style.position = "absolute";
        c.canvas.className = c._jsPlumb.endpointClass;
        jsPlumb.appendElement(c.canvas, a.parent);
        this.paint = function (d, l) {
            jsPlumb.sizeCanvas(c.canvas, c.x, c.y, c.w, c.h)
        }
    };
    jsPlumb.Endpoints.Triangle = function (a) {
        this.type = "Triangle";
        var c = this,
                b = jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
        a = a || {};
        a.width = a.width || 55;
        a.height = a.height || 55;
        this.width = a.width;
        this.height = a.height;
        this._compute = function (x, r, v, y) {
            var d = v.width || c.width,
                    s = v.height || c.height,
                    u = x[0] - (d / 2),
                    w = x[1] - (s / 2);
            return [u, w, d, s]
        }
    };
    var h = jsPlumb.Overlays.AbstractOverlay = function (a) {
        var b = true,
                c = this;
        this.isAppendedAtTopLevel = true;
        this.component = a.component;
        this.loc = a.location == null ? 0.5 : a.location;
        this.endpointLoc = a.endpointLocation == null ? [0.5, 0.5] : a.endpointLocation;
        this.setVisible = function (d) {
            b = d;
            c.component.repaint()
        };
        this.isVisible = function () {
            return b
        };
        this.hide = function () {
            c.setVisible(false)
        };
        this.show = function () {
            c.setVisible(true)
        };
        this.incrementLocation = function (d) {
            c.loc += d;
            c.component.repaint()
        };
        this.setLocation = function (d) {
            c.loc = d;
            c.component.repaint()
        };
        this.getLocation = function () {
            return c.loc
        }
    };
    jsPlumb.Overlays.Arrow = function (a) {
        this.type = "Arrow";
        h.apply(this, arguments);
        this.isAppendedAtTopLevel = false;
        a = a || {};
        var d = this,
                n = jsPlumbUtil;
        this.length = a.length || 20;
        this.width = a.width || 20;
        this.id = a.id;
        var b = (a.direction || 1) < 0 ? -1 : 1,
                c = a.paintStyle || {
                    lineWidth: 1
                },
        m = a.foldback || 0.623;
        this.computeMaxSize = function () {
            return d.width * 1.5
        };
        this.cleanup = function () {};
        this.draw = function (K, D) {
            var k, J, G, N, l;
            if (K.pointAlongPathFrom) {
                if (n.isString(d.loc) || d.loc > 1 || d.loc < 0) {
                    var F = parseInt(d.loc);
                    k = K.pointAlongPathFrom(F, b * d.length / 2, true), J = K.pointOnPath(F, true), G = n.pointOnLine(k, J, d.length)
                } else {
                    if (d.loc == 1) {
                        k = K.pointOnPath(d.loc);
                        J = K.pointAlongPathFrom(d.loc, -(d.length));
                        G = n.pointOnLine(k, J, d.length);
                        if (b == -1) {
                            var E = G;
                            G = k;
                            k = E
                        }
                    } else {
                        if (d.loc == 0) {
                            G = K.pointOnPath(d.loc);
                            J = K.pointAlongPathFrom(d.loc, d.length);
                            k = n.pointOnLine(G, J, d.length);
                            if (b == -1) {
                                var E = G;
                                G = k;
                                k = E
                            }
                        } else {
                            k = K.pointAlongPathFrom(d.loc, b * d.length / 2), J = K.pointOnPath(d.loc), G = n.pointOnLine(k, J, d.length)
                        }
                    }
                }
                N = n.perpendicularLineTo(k, G, d.width);
                l = n.pointOnLine(k, G, m * d.length);
                var M = {
                    hxy: k,
                    tail: N,
                    cxy: l
                },
                L = c.strokeStyle || D.strokeStyle,
                        I = c.fillStyle || D.strokeStyle,
                        C = c.lineWidth || D.lineWidth,
                        H = {
                            component: K,
                            d: M,
                            lineWidth: C,
                            strokeStyle: L,
                            fillStyle: I,
                            minX: Math.min(k.x, N[0].x, N[1].x),
                            maxX: Math.max(k.x, N[0].x, N[1].x),
                            minY: Math.min(k.y, N[0].y, N[1].y),
                            maxY: Math.max(k.y, N[0].y, N[1].y)
                        };
                return H
            } else {
                return {
                    component: K,
                    minX: 0,
                    maxX: 0,
                    minY: 0,
                    maxY: 0
                }
            }
        }
    };
    jsPlumb.Overlays.PlainArrow = function (a) {
        a = a || {};
        var b = jsPlumb.extend(a, {
            foldback: 1
        });
        jsPlumb.Overlays.Arrow.call(this, b);
        this.type = "PlainArrow"
    };
    jsPlumb.Overlays.Diamond = function (a) {
        a = a || {};
        var c = a.length || 40,
                b = jsPlumb.extend(a, {
                    length: c / 2,
                    foldback: 2
                });
        jsPlumb.Overlays.Arrow.call(this, b);
        this.type = "Diamond"
    };
    var f = function (s) {
        jsPlumb.DOMElementComponent.apply(this, arguments);
        h.apply(this, arguments);
        var b = this,
                p = false,
                q = jsPlumb.CurrentLibrary;
        s = s || {};
        this.id = s.id;
        var u;
        var r = function () {
            u = s.create(s.component);
            u = q.getDOMElement(u);
            u.style.position = "absolute";
            var k = s._jsPlumb.overlayClass + " " + (b.cssClass ? b.cssClass : s.cssClass ? s.cssClass : "");
            u.className = k;
            s._jsPlumb.appendElement(u, s.component.parent);
            s._jsPlumb.getId(u);
            b.attachListeners(u, b);
            b.canvas = u
        };
        this.getElement = function () {
            if (u == null) {
                r()
            }
            return u
        };
        this.getDimensions = function () {
            return q.getSize(q.getElementObject(b.getElement()))
        };
        var d = null,
                c = function (k) {
                    if (d == null) {
                        d = b.getDimensions()
                    }
                    return d
                };
        this.clearCachedDimensions = function () {
            d = null
        };
        this.computeMaxSize = function () {
            var k = c();
            return Math.max(k[0], k[1])
        };
        var a = b.setVisible;
        b.setVisible = function (k) {
            a(k);
            u.style.display = k ? "block" : "none"
        };
        this.cleanup = function () {
            if (u != null) {
                q.removeElement(u)
            }
        };
        this.paint = function (k, l) {
            if (!p) {
                b.getElement();
                k.component.appendDisplayElement(u);
                b.attachListeners(u, k.component);
                p = true
            }
            u.style.left = (k.component.x + k.d.minx) + "px";
            u.style.top = (k.component.y + k.d.miny) + "px"
        };
        this.draw = function (D, n) {
            var m = c();
            if (m != null && m.length == 2) {
                var l = {
                    x: 0,
                    y: 0
                };
                if (D.pointOnPath) {
                    var k = b.loc,
                            C = false;
                    if (jsPlumbUtil.isString(b.loc) || b.loc < 0 || b.loc > 1) {
                        k = parseInt(b.loc);
                        C = true
                    }
                    l = D.pointOnPath(k, C)
                } else {
                    var A = b.loc.constructor == Array ? b.loc : b.endpointLoc;
                    l = {
                        x: A[0] * D.w,
                        y: A[1] * D.h
                    }
                }
                var o = l.x - (m[0] / 2),
                        B = l.y - (m[1] / 2);
                return {
                    component: D,
                    d: {
                        minx: o,
                        miny: B,
                        td: m,
                        cxy: l
                    },
                    minX: o,
                    maxX: o + m[0],
                    minY: B,
                    maxY: B + m[1]
                }
            } else {
                return {
                    minX: 0,
                    maxX: 0,
                    minY: 0,
                    maxY: 0
                }
            }
        };
        this.reattachListeners = function (k) {
            if (u) {
                b.reattachListenersForElement(u, b, k)
            }
        }
    };
    jsPlumb.Overlays.Custom = function (a) {
        this.type = "Custom";
        f.apply(this, arguments)
    };
    jsPlumb.Overlays.GuideLines = function () {
        var a = this;
        a.length = 50;
        a.lineWidth = 5;
        this.type = "GuideLines";
        h.apply(this, arguments);
        jsPlumb.jsPlumbUIComponent.apply(this, arguments);
        this.draw = function (p, r) {
            var b = p.pointAlongPathFrom(a.loc, a.length / 2),
                    c = p.pointOnPath(a.loc),
                    d = jsPlumbUtil.pointOnLine(b, c, a.length),
                    o = jsPlumbUtil.perpendicularLineTo(b, d, 40),
                    q = jsPlumbUtil.perpendicularLineTo(d, b, 20);
            return {
                connector: p,
                head: b,
                tail: d,
                headLine: q,
                tailLine: o,
                minX: Math.min(b.x, d.x, q[0].x, q[1].x),
                minY: Math.min(b.y, d.y, q[0].y, q[1].y),
                maxX: Math.max(b.x, d.x, q[0].x, q[1].x),
                maxY: Math.max(b.y, d.y, q[0].y, q[1].y)
            }
        };
        this.cleanup = function () {}
    };
    jsPlumb.Overlays.Label = function (b) {
        var n = this;
        this.labelStyle = b.labelStyle || jsPlumb.Defaults.LabelStyle;
        this.cssClass = this.labelStyle != null ? this.labelStyle.cssClass : null;
        b.create = function () {
            return document.createElement("div")
        };
        jsPlumb.Overlays.Custom.apply(this, arguments);
        this.type = "Label";
        var d = b.label || "",
                n = this,
                c = null;
        this.setLabel = function (k) {
            d = k;
            c = null;
            n.clearCachedDimensions();
            m();
            n.component.repaint()
        };
        var m = function () {
            if (typeof d == "function") {
                var k = d(n);
                n.getElement().innerHTML = k.replace(/\r\n/g, "<br/>")
            } else {
                if (c == null) {
                    c = d;
                    n.getElement().innerHTML = c.replace(/\r\n/g, "<br/>")
                }
            }
        };
        this.getLabel = function () {
            return d
        };
        var a = this.getDimensions;
        this.getDimensions = function () {
            m();
            return a()
        }
    }
})();
(function () {
    var f = function (c, a, h, b) {
        this.m = (b - a) / (h - c);
        this.b = -1 * ((this.m * c) - a);
        this.rectIntersect = function (g, w, F, x) {
            var y = [];
            var C = (w - this.b) / this.m;
            if (C >= g && C <= (g + F)) {
                y.push([C, (this.m * C) + this.b])
            }
            var E = (this.m * (g + F)) + this.b;
            if (E >= w && E <= (w + x)) {
                y.push([(E - this.b) / this.m, E])
            }
            var C = ((w + x) - this.b) / this.m;
            if (C >= g && C <= (g + F)) {
                y.push([C, (this.m * C) + this.b])
            }
            var E = (this.m * g) + this.b;
            if (E >= w && E <= (w + x)) {
                y.push([(E - this.b) / this.m, E])
            }
            if (y.length == 2) {
                var A = (y[0][0] + y[1][0]) / 2,
                        B = (y[0][1] + y[1][1]) / 2;
                y.push([A, B]);
                var D = A <= g + (F / 2) ? -1 : 1,
                        G = B <= w + (x / 2) ? -1 : 1;
                y.push([D, G]);
                return y
            }
            return null
        }
    },
            e = function (c, a, h, b) {
                if (c <= h && b <= a) {
                    return 1
                } else {
                    if (c <= h && a <= b) {
                        return 2
                    } else {
                        if (h <= c && b >= a) {
                            return 3
                        }
                    }
                }
                return 4
            },
            d = function (q, r, o, s, p, a, b, u, c) {
                if (u <= c) {
                    return [q, r]
                }
                if (o === 1) {
                    if (s[3] <= 0 && p[3] >= 1) {
                        return [q + (s[2] < 0.5 ? -1 * a : a), r]
                    } else {
                        if (s[2] >= 1 && p[2] <= 0) {
                            return [q, r + (s[3] < 0.5 ? -1 * b : b)]
                        } else {
                            return [q + (-1 * a), r + (-1 * b)]
                        }
                    }
                } else {
                    if (o === 2) {
                        if (s[3] >= 1 && p[3] <= 0) {
                            return [q + (s[2] < 0.5 ? -1 * a : a), r]
                        } else {
                            if (s[2] >= 1 && p[2] <= 0) {
                                return [q, r + (s[3] < 0.5 ? -1 * b : b)]
                            } else {
                                return [q + (1 * a), r + (-1 * b)]
                            }
                        }
                    } else {
                        if (o === 3) {
                            if (s[3] >= 1 && p[3] <= 0) {
                                return [q + (s[2] < 0.5 ? -1 * a : a), r]
                            } else {
                                if (s[2] <= 0 && p[2] >= 1) {
                                    return [q, r + (s[3] < 0.5 ? -1 * b : b)]
                                } else {
                                    return [q + (-1 * a), r + (-1 * b)]
                                }
                            }
                        } else {
                            if (o === 4) {
                                if (s[3] <= 0 && p[3] >= 1) {
                                    return [q + (s[2] < 0.5 ? -1 * a : a), r]
                                } else {
                                    if (s[2] <= 0 && p[2] >= 1) {
                                        return [q, r + (s[3] < 0.5 ? -1 * b : b)]
                                    } else {
                                        return [q + (1 * a), r + (-1 * b)]
                                    }
                                }
                            }
                        }
                    }
                }
            };
    jsPlumb.Connectors.StateMachine = function (q) {
        q = q || {};
        this.type = "StateMachine";
        var a = this,
                c = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                u = q.curviness || 10,
                p = q.margin || 5,
                o = q.proximityLimit || 80,
                s = q.orientation && q.orientation === "clockwise",
                r = q.loopbackRadius || 25,
                b = q.showLoopback !== false;
        this._compute = function (ae, g) {
            var y = Math.abs(g.sourcePos[0] - g.targetPos[0]),
                    k = Math.abs(g.sourcePos[1] - g.targetPos[1]),
                    T = Math.min(g.sourcePos[0], g.targetPos[0]),
                    X = Math.min(g.sourcePos[1], g.targetPos[1]);
            if (!b || (g.sourceEndpoint.elementId !== g.targetEndpoint.elementId)) {
                var af = g.sourcePos[0] < g.targetPos[0] ? 0 : y,
                        Z = g.sourcePos[1] < g.targetPos[1] ? 0 : k,
                        n = g.sourcePos[0] < g.targetPos[0] ? y : 0,
                        x = g.sourcePos[1] < g.targetPos[1] ? k : 0;
                if (g.sourcePos[2] === 0) {
                    af -= p
                }
                if (g.sourcePos[2] === 1) {
                    af += p
                }
                if (g.sourcePos[3] === 0) {
                    Z -= p
                }
                if (g.sourcePos[3] === 1) {
                    Z += p
                }
                if (g.targetPos[2] === 0) {
                    n -= p
                }
                if (g.targetPos[2] === 1) {
                    n += p
                }
                if (g.targetPos[3] === 0) {
                    x -= p
                }
                if (g.targetPos[3] === 1) {
                    x += p
                }
                var V = (af + n) / 2,
                        aa = (Z + x) / 2,
                        ah = (-1 * V) / aa,
                        m = Math.atan(ah),
                        S = (ah == Infinity || ah == -Infinity) ? 0 : Math.abs(u / 2 * Math.sin(m)),
                        w = (ah == Infinity || ah == -Infinity) ? 0 : Math.abs(u / 2 * Math.cos(m)),
                        ag = e(af, Z, n, x),
                        ac = Math.sqrt(Math.pow(n - af, 2) + Math.pow(x - Z, 2)),
                        Y = d(V, aa, ag, g.sourcePos, g.targetPos, u, u, ac, o);
                c.addSegment("Bezier", {
                    x1: n,
                    y1: x,
                    x2: af,
                    y2: Z,
                    cp1x: Y[0],
                    cp1y: Y[1],
                    cp2x: Y[0],
                    cp2y: Y[1]
                })
            } else {
                var h = g.sourcePos[0],
                        l = g.sourcePos[0],
                        U = g.sourcePos[1] - p,
                        ab = g.sourcePos[1] - p,
                        W = h,
                        ad = U - r;
                y = 2 * r, k = 2 * r, T = W - r, X = ad - r;
                ae.points[0] = T;
                ae.points[1] = X;
                ae.points[2] = y;
                ae.points[3] = k;
                c.addSegment("Arc", {
                    x1: (h - T) + 4,
                    y1: U - X,
                    startAngle: 0,
                    endAngle: 2 * Math.PI,
                    r: r,
                    ac: !s,
                    x2: (h - T) - 4,
                    y2: U - X,
                    cx: W - T,
                    cy: ad - X
                })
            }
        }
    }
})();
(function () {
    jsPlumb.Connectors.Flowchart = function (params) {
        this.type = "Flowchart";
        params = params || {};
        params.stub = params.stub || 30;
        var self = this,
                _super = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                midpoint = params.midpoint || 0.5,
                points = [],
                segments = [],
                grid = params.grid,
                alwaysRespectStubs = params.alwaysRespectStubs,
                userSuppliedSegments = null,
                lastx = null,
                lasty = null,
                lastOrientation, cornerRadius = params.cornerRadius != null ? params.cornerRadius : 0,
                sgn = function (n) {
                    return n < 0 ? -1 : n == 0 ? 0 : 1
                },
                addSegment = function (segments, x, y, paintInfo) {
                    if (lastx == x && lasty == y) {
                        return
                    }
                    var lx = lastx == null ? paintInfo.sx : lastx,
                            ly = lasty == null ? paintInfo.sy : lasty,
                            o = lx == x ? "v" : "h",
                            sgnx = sgn(x - lx),
                            sgny = sgn(y - ly);
                    lastx = x;
                    lasty = y;
                    segments.push([lx, ly, x, y, o, sgnx, sgny])
                },
                segLength = function (s) {
                    return Math.sqrt(Math.pow(s[0] - s[2], 2) + Math.pow(s[1] - s[3], 2))
                },
                _cloneArray = function (a) {
                    var _a = [];
                    _a.push.apply(_a, a);
                    return _a
                },
                updateMinMax = function (a1) {
                    self.bounds.minX = Math.min(self.bounds.minX, a1[2]);
                    self.bounds.maxX = Math.max(self.bounds.maxX, a1[2]);
                    self.bounds.minY = Math.min(self.bounds.minY, a1[3]);
                    self.bounds.maxY = Math.max(self.bounds.maxY, a1[3])
                },
                writeSegments = function (segments, paintInfo) {
                    var current, next;
                    for (var i = 0; i < segments.length - 1; i++) {
                        current = current || _cloneArray(segments[i]);
                        next = _cloneArray(segments[i + 1]);
                        if (cornerRadius > 0 && current[4] != next[4]) {
                            var radiusToUse = Math.min(cornerRadius, segLength(current), segLength(next));
                            current[2] -= current[5] * radiusToUse;
                            current[3] -= current[6] * radiusToUse;
                            next[0] += next[5] * radiusToUse;
                            next[1] += next[6] * radiusToUse;
                            var ac = (current[6] == next[5] && next[5] == 1) || ((current[6] == next[5] && next[5] == 0) && current[5] != next[6]) || (current[6] == next[5] && next[5] == -1),
                                    sgny = next[1] > current[3] ? 1 : -1,
                                    sgnx = next[0] > current[2] ? 1 : -1,
                                    sgnEqual = sgny == sgnx,
                                    cx = (sgnEqual && ac || (!sgnEqual && !ac)) ? next[0] : current[2],
                                    cy = (sgnEqual && ac || (!sgnEqual && !ac)) ? current[3] : next[1];
                            _super.addSegment("Straight", {
                                x1: current[0],
                                y1: current[1],
                                x2: current[2],
                                y2: current[3]
                            });
                            _super.addSegment("Arc", {
                                r: radiusToUse,
                                x1: current[2],
                                y1: current[3],
                                x2: next[0],
                                y2: next[1],
                                cx: cx,
                                cy: cy,
                                ac: ac
                            })
                        } else {
                            var dx = (current[2] == current[0]) ? 0 : (current[2] > current[0]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2),
                                    dy = (current[3] == current[1]) ? 0 : (current[3] > current[1]) ? (paintInfo.lw / 2) : -(paintInfo.lw / 2);
                            _super.addSegment("Straight", {
                                x1: current[0] - dx,
                                y1: current[1] - dy,
                                x2: current[2] + dx,
                                y2: current[3] + dy
                            })
                        }
                        current = next
                    }
                    _super.addSegment("Straight", {
                        x1: next[0],
                        y1: next[1],
                        x2: next[2],
                        y2: next[3]
                    })
                };
        this.setSegments = function (s) {
            userSuppliedSegments = s
        };
        this.isEditable = function () {
            return true
        };
        this.getOriginalSegments = function () {
            return userSuppliedSegments || segments
        };
        this._compute = function (paintInfo, params) {
            if (params.clearEdits) {
                userSuppliedSegments = null
            }
            if (userSuppliedSegments != null) {
                writeSegments(userSuppliedSegments, paintInfo);
                return
            }
            segments = [];
            lastx = null;
            lasty = null;
            lastOrientation = null;
            var midx = paintInfo.startStubX + ((paintInfo.endStubX - paintInfo.startStubX) * midpoint),
                    midy = paintInfo.startStubY + ((paintInfo.endStubY - paintInfo.startStubY) * midpoint);
            var findClearedLine = function (start, mult, anchorPos, dimension) {
                return start + (mult * ((1 - anchorPos) * dimension) + _super.maxStub)
            },
                    orientations = {
                        x: [0, 1],
                        y: [1, 0]
                    },
            commonStubCalculator = function (axis) {
                return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY]
            },
                    stubCalculators = {
                        perpendicular: commonStubCalculator,
                        orthogonal: commonStubCalculator,
                        opposite: function (axis) {
                            var pi = paintInfo,
                                    idx = axis == "x" ? 0 : 1,
                                    areInProximity = {
                                        x: function () {
                                            return ((pi.so[idx] == 1 && (((pi.startStubX > pi.endStubX) && (pi.tx > pi.startStubX)) || ((pi.sx > pi.endStubX) && (pi.tx > pi.sx))))) || ((pi.so[idx] == -1 && (((pi.startStubX < pi.endStubX) && (pi.tx < pi.startStubX)) || ((pi.sx < pi.endStubX) && (pi.tx < pi.sx)))))
                                        },
                                        y: function () {
                                            return ((pi.so[idx] == 1 && (((pi.startStubY > pi.endStubY) && (pi.ty > pi.startStubY)) || ((pi.sy > pi.endStubY) && (pi.ty > pi.sy))))) || ((pi.so[idx] == -1 && (((pi.startStubY < pi.endStubY) && (pi.ty < pi.startStubY)) || ((pi.sy < pi.endStubY) && (pi.ty < pi.sy)))))
                                        }
                                    };
                            if (!alwaysRespectStubs && areInProximity[axis]()) {
                                return {
                                    x: [(paintInfo.sx + paintInfo.tx) / 2, paintInfo.startStubY, (paintInfo.sx + paintInfo.tx) / 2, paintInfo.endStubY],
                                    y: [paintInfo.startStubX, (paintInfo.sy + paintInfo.ty) / 2, paintInfo.endStubX, (paintInfo.sy + paintInfo.ty) / 2]
                                }[axis]
                            } else {
                                return [paintInfo.startStubX, paintInfo.startStubY, paintInfo.endStubX, paintInfo.endStubY]
                            }
                        }
                    },
            lineCalculators = {
                perpendicular: function (axis, ss, oss, es, oes) {
                    with (paintInfo) {
                        var sis = {
                            x: [
                                [
                                    [1, 2, 3, 4], null, [2, 1, 4, 3]
                                ], null, [
                                    [4, 3, 2, 1], null, [3, 4, 1, 2]
                                ]
                            ],
                            y: [
                                [
                                    [3, 2, 1, 4], null, [2, 3, 4, 1]
                                ], null, [
                                    [4, 1, 2, 3], null, [1, 4, 3, 2]
                                ]
                            ]
                        },
                        stubs = {
                            x: [
                                [startStubX, endStubX], null, [endStubX, startStubX]
                            ],
                            y: [
                                [startStubY, endStubY], null, [endStubY, startStubY]
                            ]
                        },
                        midLines = {
                            x: [
                                [midx, startStubY],
                                [midx, endStubY]
                            ],
                            y: [
                                [startStubX, midy],
                                [endStubX, midy]
                            ]
                        },
                        linesToEnd = {
                            x: [
                                [endStubX, startStubY]
                            ],
                            y: [
                                [startStubX, endStubY]
                            ]
                        },
                        startToEnd = {
                            x: [
                                [startStubX, endStubY],
                                [endStubX, endStubY]
                            ],
                            y: [
                                [endStubX, startStubY],
                                [endStubX, endStubY]
                            ]
                        },
                        startToMidToEnd = {
                            x: [
                                [startStubX, midy],
                                [endStubX, midy],
                                [endStubX, endStubY]
                            ],
                            y: [
                                [midx, startStubY],
                                [midx, endStubY],
                                [endStubX, endStubY]
                            ]
                        },
                        otherStubs = {
                            x: [startStubY, endStubY],
                            y: [startStubX, endStubX]
                        },
                        soIdx = orientations[axis][0],
                                toIdx = orientations[axis][1],
                                _so = so[soIdx] + 1,
                                _to = to[toIdx] + 1,
                                otherFlipped = (to[toIdx] == -1 && (otherStubs[axis][1] < otherStubs[axis][0])) || (to[toIdx] == 1 && (otherStubs[axis][1] > otherStubs[axis][0])),
                                stub1 = stubs[axis][_so][0],
                                stub2 = stubs[axis][_so][1],
                                segmentIndexes = sis[axis][_so][_to];
                        if (segment == segmentIndexes[3] || (segment == segmentIndexes[2] && otherFlipped)) {
                            return midLines[axis]
                        } else {
                            if (segment == segmentIndexes[2] && stub2 < stub1) {
                                return linesToEnd[axis]
                            } else {
                                if ((segment == segmentIndexes[2] && stub2 >= stub1) || (segment == segmentIndexes[1] && !otherFlipped)) {
                                    return startToMidToEnd[axis]
                                } else {
                                    if (segment == segmentIndexes[0] || (segment == segmentIndexes[1] && otherFlipped)) {
                                        return startToEnd[axis]
                                    }
                                }
                            }
                        }
                    }
                },
                orthogonal: function (axis, startStub, otherStartStub, endStub, otherEndStub) {
                    var pi = paintInfo,
                            extent = {
                                x: pi.so[0] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub),
                                y: pi.so[1] == -1 ? Math.min(startStub, endStub) : Math.max(startStub, endStub)
                            }[axis];
                    return {
                        x: [
                            [extent, otherStartStub],
                            [extent, otherEndStub],
                            [endStub, otherEndStub]
                        ],
                        y: [
                            [otherStartStub, extent],
                            [otherEndStub, extent],
                            [otherEndStub, endStub]
                        ]
                    }[axis]
                },
                opposite: function (axis, ss, oss, es, oes) {
                    var pi = paintInfo,
                            otherAxis = {
                                x: "y",
                                y: "x"
                            }[axis],
                            dim = {
                                x: "height",
                                y: "width"
                            }[axis],
                            comparator = pi["is" + axis.toUpperCase() + "GreaterThanStubTimes2"];
                    if (params.sourceEndpoint.elementId == params.targetEndpoint.elementId) {
                        var _val = oss + ((1 - params.sourceEndpoint.anchor[otherAxis]) * params.sourceInfo[dim]) + _super.maxStub;
                        return {
                            x: [
                                [ss, _val],
                                [es, _val]
                            ],
                            y: [
                                [_val, ss],
                                [_val, es]
                            ]
                        }[axis]
                    } else {
                        if (!comparator || (pi.so[idx] == 1 && ss > es) || (pi.so[idx] == -1 && ss < es)) {
                            return {
                                x: [
                                    [ss, midy],
                                    [es, midy]
                                ],
                                y: [
                                    [midx, ss],
                                    [midx, es]
                                ]
                            }[axis]
                        } else {
                            if ((pi.so[idx] == 1 && ss < es) || (pi.so[idx] == -1 && ss > es)) {
                                return {
                                    x: [
                                        [midx, pi.sy],
                                        [midx, pi.ty]
                                    ],
                                    y: [
                                        [pi.sx, midy],
                                        [pi.tx, midy]
                                    ]
                                }[axis]
                            }
                        }
                    }
                }
            };
            var stubs = stubCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis),
                    idx = paintInfo.sourceAxis == "x" ? 0 : 1,
                    oidx = paintInfo.sourceAxis == "x" ? 1 : 0,
                    ss = stubs[idx],
                    oss = stubs[oidx],
                    es = stubs[idx + 2],
                    oes = stubs[oidx + 2];
            addSegment(segments, stubs[0], stubs[1], paintInfo);
            var p = lineCalculators[paintInfo.anchorOrientation](paintInfo.sourceAxis, ss, oss, es, oes);
            if (p) {
                for (var i = 0; i < p.length; i++) {
                    addSegment(segments, p[i][0], p[i][1], paintInfo)
                }
            }
            addSegment(segments, stubs[2], stubs[3], paintInfo);
            addSegment(segments, paintInfo.tx, paintInfo.ty, paintInfo);
            writeSegments(segments, paintInfo)
        };
        this.getPath = function () {
            var _last = null,
                    _lastAxis = null,
                    s = [],
                    segs = userSuppliedSegments || segments;
            for (var i = 0; i < segs.length; i++) {
                var seg = segs[i],
                        axis = seg[4],
                        axisIndex = (axis == "v" ? 3 : 2);
                if (_last != null && _lastAxis === axis) {
                    _last[axisIndex] = seg[axisIndex]
                } else {
                    if (seg[0] != seg[2] || seg[1] != seg[3]) {
                        s.push({
                            start: [seg[0], seg[1]],
                            end: [seg[2], seg[3]]
                        });
                        _last = seg;
                        _lastAxis = seg[4]
                    }
                }
            }
            return s
        };
        this.setPath = function (path) {
            userSuppliedSegments = [];
            for (var i = 0; i < path.length; i++) {
                var lx = path[i].start[0],
                        ly = path[i].start[1],
                        x = path[i].end[0],
                        y = path[i].end[1],
                        o = lx == x ? "v" : "h",
                        sgnx = sgn(x - lx),
                        sgny = sgn(y - ly);
                userSuppliedSegments.push([lx, ly, x, y, o, sgnx, sgny])
            }
        }
    }
})();
(function () {
    var G = {
        "stroke-linejoin": "joinstyle",
        joinstyle: "joinstyle",
        endcap: "endcap",
        miterlimit: "miterlimit"
    },
    L = null;
    if (document.createStyleSheet && document.namespaces) {
        var D = [".jsplumb_vml", "jsplumb\\:textbox", "jsplumb\\:oval", "jsplumb\\:rect", "jsplumb\\:stroke", "jsplumb\\:shape", "jsplumb\\:group"],
                H = "behavior:url(#default#VML);position:absolute;";
        L = document.createStyleSheet();
        for (var x = 0; x < D.length; x++) {
            L.addRule(D[x], H)
        }
        document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml")
    }
    jsPlumb.vml = {};
    var v = 1000,
            w = {},
            N = function (b, c) {
                var d = jsPlumb.getId(b),
                        a = w[d];
                if (!a) {
                    a = I("group", [0, 0, v, v], {
                        "class": c
                    });
                    a.style.backgroundColor = "red";
                    w[d] = a;
                    jsPlumb.appendElement(a, b)
                }
                return a
            },
            J = function (b, a) {
                for (var c in a) {
                    b[c] = a[c]
                }
            },
            I = function (c, g, e, f, d, b) {
                e = e || {};
                var a = document.createElement("jsplumb:" + c);
                if (b) {
                    d.appendElement(a, f)
                } else {
                    jsPlumb.CurrentLibrary.appendElement(a, f)
                }
                a.className = (e["class"] ? e["class"] + " " : "") + "jsplumb_vml";
                F(a, g);
                J(a, e);
                return a
            },
            F = function (b, c, a) {
                b.style.left = c[0] + "px";
                b.style.top = c[1] + "px";
                b.style.width = c[2] + "px";
                b.style.height = c[3] + "px";
                b.style.position = "absolute";
                if (a) {
                    b.style.zIndex = a
                }
            },
            A = jsPlumb.vml.convertValue = function (a) {
                return Math.floor(a * v)
            },
            M = function (d, b, a, c) {
                if ("transparent" === b) {
                    c.setOpacity(a, "0.0")
                } else {
                    c.setOpacity(a, "1.0")
                }
            },
            y = function (d, h, a, m) {
                var e = {};
                if (h.strokeStyle) {
                    e.stroked = "true";
                    var l = jsPlumbUtil.convertStyle(h.strokeStyle, true);
                    e.strokecolor = l;
                    M(e, l, "stroke", a);
                    e.strokeweight = h.lineWidth + "px"
                } else {
                    e.stroked = "false"
                }
                if (h.fillStyle) {
                    e.filled = "true";
                    var g = jsPlumbUtil.convertStyle(h.fillStyle, true);
                    e.fillcolor = g;
                    M(e, g, "fill", a)
                } else {
                    e.filled = "false"
                }
                if (h.dashstyle) {
                    if (a.strokeNode == null) {
                        a.strokeNode = I("stroke", [0, 0, 0, 0], {
                            dashstyle: h.dashstyle
                        }, d, m)
                    } else {
                        a.strokeNode.dashstyle = h.dashstyle
                    }
                } else {
                    if (h["stroke-dasharray"] && h.lineWidth) {
                        var k = h["stroke-dasharray"].indexOf(",") == -1 ? " " : ",",
                                c = h["stroke-dasharray"].split(k),
                                f = "";
                        for (var b = 0; b < c.length; b++) {
                            f += (Math.floor(c[b] / h.lineWidth) + k)
                        }
                        if (a.strokeNode == null) {
                            a.strokeNode = I("stroke", [0, 0, 0, 0], {
                                dashstyle: f
                            }, d, m)
                        } else {
                            a.strokeNode.dashstyle = f
                        }
                    }
                }
                J(d, e)
            },
            C = function () {
                var c = this,
                        a = {};
                jsPlumb.jsPlumbUIComponent.apply(this, arguments);
                this.opacityNodes = {
                    stroke: null,
                    fill: null
                };
                this.initOpacityNodes = function (d) {
                    c.opacityNodes.stroke = I("stroke", [0, 0, 1, 1], {
                        opacity: "0.0"
                    }, d, c._jsPlumb);
                    c.opacityNodes.fill = I("fill", [0, 0, 1, 1], {
                        opacity: "0.0"
                    }, d, c._jsPlumb)
                };
                this.setOpacity = function (f, e) {
                    var d = c.opacityNodes[f];
                    if (d) {
                        d.opacity = "" + e
                    }
                };
                var b = [];
                this.getDisplayElements = function () {
                    return b
                };
                this.appendDisplayElement = function (d, e) {
                    if (!e) {
                        c.canvas.parentNode.appendChild(d)
                    }
                    b.push(d)
                }
            },
            K = jsPlumb.ConnectorRenderers.vml = function (d) {
                var c = this;
                c.strokeNode = null;
                c.canvas = null;
                var a = C.apply(this, arguments);
                var b = c._jsPlumb.connectorClass + (d.cssClass ? (" " + d.cssClass) : "");
                this.paint = function (g) {
                    if (g !== null) {
                        var o = c.getSegments(),
                                f = {
                                    path: ""
                                },
                        n = [c.x, c.y, c.w, c.h];
                        for (var e = 0; e < o.length; e++) {
                            f.path += jsPlumb.Segments.vml.SegmentRenderer.getPath(o[e]);
                            f.path += " "
                        }
                        if (g.outlineColor) {
                            var l = g.outlineWidth || 1,
                                    k = g.lineWidth + (2 * l),
                                    m = {
                                        strokeStyle: jsPlumbUtil.convertStyle(g.outlineColor),
                                        lineWidth: k
                                    };
                            for (var h in G) {
                                m[h] = g[h]
                            }
                            if (c.bgCanvas == null) {
                                f["class"] = b;
                                f.coordsize = (n[2] * v) + "," + (n[3] * v);
                                c.bgCanvas = I("shape", n, f, d.parent, c._jsPlumb, true);
                                F(c.bgCanvas, n);
                                c.appendDisplayElement(c.bgCanvas, true);
                                c.attachListeners(c.bgCanvas, c);
                                c.initOpacityNodes(c.bgCanvas, ["stroke"])
                            } else {
                                f.coordsize = (n[2] * v) + "," + (n[3] * v);
                                F(c.bgCanvas, n);
                                J(c.bgCanvas, f)
                            }
                            y(c.bgCanvas, m, c)
                        }
                        if (c.canvas == null) {
                            f["class"] = b;
                            f.coordsize = (n[2] * v) + "," + (n[3] * v);
                            c.canvas = I("shape", n, f, d.parent, c._jsPlumb, true);
                            c.appendDisplayElement(c.canvas, true);
                            c.attachListeners(c.canvas, c);
                            c.initOpacityNodes(c.canvas, ["stroke"])
                        } else {
                            f.coordsize = (n[2] * v) + "," + (n[3] * v);
                            F(c.canvas, n);
                            J(c.canvas, f)
                        }
                        y(c.canvas, g, c, c._jsPlumb)
                    }
                };
                this.reattachListeners = function () {
                    if (c.canvas) {
                        c.reattachListenersForElement(c.canvas, c)
                    }
                }
            },
            E = window.VmlEndpoint = function (f) {
                C.apply(this, arguments);
                var d = null,
                        b = this,
                        c = null,
                        a = null;
                b.canvas = document.createElement("div");
                b.canvas.style.position = "absolute";
                var e = b._jsPlumb.endpointClass + (f.cssClass ? (" " + f.cssClass) : "");
                f._jsPlumb.appendElement(b.canvas, f.parent);
                this.paint = function (h, k) {
                    var g = {};
                    jsPlumb.sizeCanvas(b.canvas, b.x, b.y, b.w, b.h);
                    if (d == null) {
                        g["class"] = e;
                        d = b.getVml([0, 0, b.w, b.h], g, k, b.canvas, b._jsPlumb);
                        b.attachListeners(d, b);
                        b.appendDisplayElement(d, true);
                        b.appendDisplayElement(b.canvas, true);
                        b.initOpacityNodes(d, ["fill"])
                    } else {
                        F(d, [0, 0, b.w, b.h]);
                        J(d, g)
                    }
                    y(d, h, b)
                };
                this.reattachListeners = function () {
                    if (d) {
                        b.reattachListenersForElement(d, b)
                    }
                }
            };
    jsPlumb.Segments.vml = {
        SegmentRenderer: {
            getPath: function (a) {
                return ({
                    Straight: function (c) {
                        var b = c.params;
                        return "m" + A(b.x1) + "," + A(b.y1) + " l" + A(b.x2) + "," + A(b.y2) + " e"
                    },
                    Bezier: function (c) {
                        var b = c.params;
                        return "m" + A(b.x1) + "," + A(b.y1) + " c" + A(b.cp1x) + "," + A(b.cp1y) + "," + A(b.cp2x) + "," + A(b.cp2y) + "," + A(b.x2) + "," + A(b.y2) + " e"
                    },
                    Arc: function (c) {
                        var l = c.params,
                                h = Math.min(l.x1, l.x2),
                                d = Math.max(l.x1, l.x2),
                                k = Math.min(l.y1, l.y2),
                                f = Math.max(l.y1, l.y2),
                                b = c.anticlockwise ? 1 : 0,
                                g = (c.anticlockwise ? "at " : "wa "),
                                e = function () {
                                    var m = [null, [function () {
                                                return [h, k]
                                            }, function () {
                                                return [h - l.r, k - l.r]
                                            }],
                                        [function () {
                                                return [h - l.r, k]
                                            }, function () {
                                                return [h, k - l.r]
                                            }],
                                        [function () {
                                                return [h - l.r, k - l.r]
                                            }, function () {
                                                return [h, k]
                                            }],
                                        [function () {
                                                return [h, k - l.r]
                                            }, function () {
                                                return [h - l.r, k]
                                            }]
                                    ][c.segment][b]();
                                    return A(m[0]) + "," + A(m[1]) + "," + A(m[0] + (2 * l.r)) + "," + A(m[1] + (2 * l.r))
                                };
                        return g + e() + "," + A(l.x1) + "," + A(l.y1) + "," + A(l.x2) + "," + A(l.y2) + " e"
                    }
                })[a.type](a)
            }
        }
    };
    jsPlumb.Endpoints.vml.Dot = function () {
        jsPlumb.Endpoints.Dot.apply(this, arguments);
        E.apply(this, arguments);
        this.getVml = function (e, b, c, a, d) {
            return I("oval", e, b, a, d)
        }
    };
    jsPlumb.Endpoints.vml.Rectangle = function () {
        jsPlumb.Endpoints.Rectangle.apply(this, arguments);
        E.apply(this, arguments);
        this.getVml = function (e, b, c, a, d) {
            return I("rect", e, b, a, d)
        }
    };
    jsPlumb.Endpoints.vml.Image = jsPlumb.Endpoints.Image;
    jsPlumb.Endpoints.vml.Blank = jsPlumb.Endpoints.Blank;
    jsPlumb.Overlays.vml.Label = jsPlumb.Overlays.Label;
    jsPlumb.Overlays.vml.Custom = jsPlumb.Overlays.Custom;
    var B = function (b, a) {
        b.apply(this, a);
        C.apply(this, a);
        var c = this,
                e = null;
        c.canvas = null;
        c.isAppendedAtTopLevel = true;
        var d = function (f) {
            return "m " + A(f.hxy.x) + "," + A(f.hxy.y) + " l " + A(f.tail[0].x) + "," + A(f.tail[0].y) + " " + A(f.cxy.x) + "," + A(f.cxy.y) + " " + A(f.tail[1].x) + "," + A(f.tail[1].y) + " x e"
        };
        this.paint = function (u, s) {
            var g = {},
                    n = u.d,
                    P = u.component;
            if (u.strokeStyle) {
                g.stroked = "true";
                g.strokecolor = jsPlumbUtil.convertStyle(u.strokeStyle, true)
            }
            if (u.lineWidth) {
                g.strokeweight = u.lineWidth + "px"
            }
            if (u.fillStyle) {
                g.filled = "true";
                g.fillcolor = u.fillStyle
            }
            var h = Math.min(n.hxy.x, n.tail[0].x, n.tail[1].x, n.cxy.x),
                    k = Math.min(n.hxy.y, n.tail[0].y, n.tail[1].y, n.cxy.y),
                    r = Math.max(n.hxy.x, n.tail[0].x, n.tail[1].x, n.cxy.x),
                    f = Math.max(n.hxy.y, n.tail[0].y, n.tail[1].y, n.cxy.y),
                    l = Math.abs(r - h),
                    p = Math.abs(f - k),
                    q = [h, k, l, p];
            g.path = d(n);
            g.coordsize = (P.w * v) + "," + (P.h * v);
            q[0] = P.x;
            q[1] = P.y;
            q[2] = P.w;
            q[3] = P.h;
            if (c.canvas == null) {
                var m = P._jsPlumb.overlayClass || "";
                var o = a && (a.length == 1) ? (a[0].cssClass || "") : "";
                g["class"] = o + " " + m;
                c.canvas = I("shape", q, g, P.canvas.parentNode, P._jsPlumb, true);
                P.appendDisplayElement(c.canvas, true);
                c.attachListeners(c.canvas, P);
                c.attachListeners(c.canvas, c)
            } else {
                F(c.canvas, q);
                J(c.canvas, g)
            }
        };
        this.reattachListeners = function () {
            if (c.canvas) {
                c.reattachListenersForElement(c.canvas, c)
            }
        };
        this.cleanup = function () {
            if (c.canvas != null) {
                jsPlumb.CurrentLibrary.removeElement(c.canvas)
            }
        }
    };
    jsPlumb.Overlays.vml.Arrow = function () {
        B.apply(this, [jsPlumb.Overlays.Arrow, arguments])
    };
    jsPlumb.Overlays.vml.PlainArrow = function () {
        B.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
    };
    jsPlumb.Overlays.vml.Diamond = function () {
        B.apply(this, [jsPlumb.Overlays.Diamond, arguments])
    }
})();
(function () {
    var Z = {
        joinstyle: "stroke-linejoin",
        "stroke-linejoin": "stroke-linejoin",
        "stroke-dashoffset": "stroke-dashoffset",
        "stroke-linecap": "stroke-linecap"
    },
    H = "stroke-dasharray",
            O = "dashstyle",
            af = "linearGradient",
            ai = "radialGradient",
            ah = "fill",
            aj = "stop",
            Q = "stroke",
            S = "stroke-width",
            ac = "style",
            Y = "none",
            L = "jsplumb_gradient_",
            W = "lineWidth",
            K = {
                svg: "http://www.w3.org/2000/svg",
                xhtml: "http://www.w3.org/1999/xhtml"
            },
    ad = function (a, c) {
        for (var b in c) {
            a.setAttribute(b, "" + c[b])
        }
    },
            ae = function (b, c) {
                var a = document.createElementNS(K.svg, b);
                c = c || {};
                c.version = "1.1";
                c.xmlns = K.xhtml;
                ad(a, c);
                return a
            },
            X = function (a) {
                return "position:absolute;left:" + a[0] + "px;top:" + a[1] + "px"
            },
            ab = function (a) {
                for (var b = 0; b < a.childNodes.length; b++) {
                    if (a.childNodes[b].tagName == af || a.childNodes[b].tagName == ai) {
                        a.removeChild(a.childNodes[b])
                    }
                }
            },
            I = function (b, g, l, n, f) {
                var k = L + f._jsPlumb.idstamp();
                ab(b);
                var d;
                if (!l.gradient.offset) {
                    d = ae(af, {
                        id: k,
                        gradientUnits: "userSpaceOnUse"
                    })
                } else {
                    d = ae(ai, {
                        id: k
                    })
                }
                b.appendChild(d);
                for (var e = 0; e < l.gradient.stops.length; e++) {
                    var h = f.segment == 1 || f.segment == 2 ? e : l.gradient.stops.length - 1 - e,
                            c = jsPlumbUtil.convertStyle(l.gradient.stops[h][1], true),
                            a = ae(aj, {
                                offset: Math.floor(l.gradient.stops[e][0] * 100) + "%",
                                "stop-color": c
                            });
                    d.appendChild(a)
                }
                var m = l.strokeStyle ? Q : ah;
                g.setAttribute(ac, m + ":url(#" + k + ")")
            },
            V = function (b, f, h, k, e) {
                if (h.gradient) {
                    I(b, f, h, k, e)
                } else {
                    ab(b);
                    f.setAttribute(ac, "")
                }
                f.setAttribute(ah, h.fillStyle ? jsPlumbUtil.convertStyle(h.fillStyle, true) : Y);
                f.setAttribute(Q, h.strokeStyle ? jsPlumbUtil.convertStyle(h.strokeStyle, true) : Y);
                if (h.lineWidth) {
                    f.setAttribute(S, h.lineWidth)
                }
                if (h[O] && h[W] && !h[H]) {
                    var a = h[O].indexOf(",") == -1 ? " " : ",",
                            d = h[O].split(a),
                            g = "";
                    d.forEach(function (l) {
                        g += (Math.floor(l * h.lineWidth) + a)
                    });
                    f.setAttribute(H, g)
                } else {
                    if (h[H]) {
                        f.setAttribute(H, h[H])
                    }
                }
                for (var c in Z) {
                    if (h[c]) {
                        f.setAttribute(Z[c], h[c])
                    }
                }
            },
            N = function (a) {
                var c = /([0-9].)(p[xt])\s(.*)/,
                        b = a.match(c);
                return {
                    size: b[1] + b[2],
                    font: b[3]
                }
            },
            P = function (h, g, d) {
                var f = d.split(" "),
                        a = h.className,
                        b = a.baseVal.split(" ");
                for (var c = 0; c < f.length; c++) {
                    if (g) {
                        if (b.indexOf(f[c]) == -1) {
                            b.push(f[c])
                        }
                    } else {
                        var e = b.indexOf(f[c]);
                        if (e != -1) {
                            b.splice(e, 1)
                        }
                    }
                }
                h.className.baseVal = b.join(" ")
            },
            J = function (a, b) {
                P(a, true, b)
            },
            aa = function (a, b) {
                P(a, false, b)
            },
            R = function (b, a, c) {
                if (b.childNodes.length > c) {
                    b.insertBefore(a, b.childNodes[c])
                } else {
                    b.appendChild(a)
                }
            };
    jsPlumbUtil.svg = {
        addClass: J,
        removeClass: aa,
        node: ae,
        attr: ad,
        pos: X
    };
    var M = function (g) {
        var e = this,
                b = g.pointerEventsSpec || "all",
                a = {};
        jsPlumb.jsPlumbUIComponent.apply(this, g.originalArgs);
        e.canvas = null, e.path = null, e.svg = null;
        var c = g.cssClass + " " + (g.originalArgs[0].cssClass || ""),
                f = {
                    style: "",
                    width: 0,
                    height: 0,
                    "pointer-events": b,
                    position: "absolute"
                };
        e.svg = ae("svg", f);
        if (g.useDivWrapper) {
            e.canvas = document.createElement("div");
            e.canvas.style.position = "absolute";
            jsPlumb.sizeCanvas(e.canvas, 0, 0, 1, 1);
            e.canvas.className = c
        } else {
            ad(e.svg, {
                "class": c
            });
            e.canvas = e.svg
        }
        g._jsPlumb.appendElement(e.canvas, g.originalArgs[0]["parent"]);
        if (g.useDivWrapper) {
            e.canvas.appendChild(e.svg)
        }
        var d = [e.canvas];
        this.getDisplayElements = function () {
            return d
        };
        this.appendDisplayElement = function (h) {
            d.push(h)
        };
        this.paint = function (m, n, l) {
            if (m != null) {
                var h = [e.x, e.y],
                        o = [e.w, e.h],
                        k;
                if (l != null) {
                    if (l.xmin < 0) {
                        h[0] += l.xmin
                    }
                    if (l.ymin < 0) {
                        h[1] += l.ymin
                    }
                    o[0] = l.xmax + ((l.xmin < 0) ? -l.xmin : 0);
                    o[1] = l.ymax + ((l.ymin < 0) ? -l.ymin : 0)
                }
                if (g.useDivWrapper) {
                    jsPlumb.sizeCanvas(e.canvas, h[0], h[1], o[0], o[1]);
                    h[0] = 0, h[1] = 0;
                    k = X([0, 0])
                } else {
                    k = X([h[0], h[1]])
                }
                a.paint.apply(this, arguments);
                ad(e.svg, {
                    style: k,
                    width: o[0],
                    height: o[1]
                })
            }
        };
        return {
            renderer: a
        }
    };
    var ag = jsPlumb.ConnectorRenderers.svg = function (a) {
        var c = this,
                b = M.apply(this, [{
                        cssClass: a._jsPlumb.connectorClass,
                        originalArgs: arguments,
                        pointerEventsSpec: "none",
                        _jsPlumb: a._jsPlumb
                    }]);
        b.renderer.paint = function (q, m, f) {
            var l = c.getSegments(),
                    p = "",
                    o = [0, 0];
            if (f.xmin < 0) {
                o[0] = -f.xmin
            }
            if (f.ymin < 0) {
                o[1] = -f.ymin
            }
            for (var n = 0; n < l.length; n++) {
                p += jsPlumb.Segments.svg.SegmentRenderer.getPath(l[n]);
                p += " "
            }
            var e = {
                d: p,
                transform: "translate(" + o[0] + "," + o[1] + ")",
                "pointer-events": a["pointer-events"] || "visibleStroke"
            },
            h = null,
                    k = [c.x, c.y, c.w, c.h];
            if (q.outlineColor) {
                var g = q.outlineWidth || 1,
                        d = q.lineWidth + (2 * g),
                        h = jsPlumb.CurrentLibrary.extend({}, q);
                h.strokeStyle = jsPlumbUtil.convertStyle(q.outlineColor);
                h.lineWidth = d;
                if (c.bgPath == null) {
                    c.bgPath = ae("path", e);
                    R(c.svg, c.bgPath, 0);
                    c.attachListeners(c.bgPath, c)
                } else {
                    ad(c.bgPath, e)
                }
                V(c.svg, c.bgPath, h, k, c)
            }
            if (c.path == null) {
                c.path = ae("path", e);
                R(c.svg, c.path, q.outlineColor ? 1 : 0);
                c.attachListeners(c.path, c)
            } else {
                ad(c.path, e)
            }
            V(c.svg, c.path, q, k, c)
        };
        this.reattachListeners = function () {
            if (c.bgPath) {
                c.reattachListenersForElement(c.bgPath, c)
            }
            if (c.path) {
                c.reattachListenersForElement(c.path, c)
            }
        }
    };
    jsPlumb.Segments.svg = {
        SegmentRenderer: {
            getPath: function (a) {
                return ({
                    Straight: function () {
                        var b = a.getCoordinates();
                        return "M " + b.x1 + " " + b.y1 + " L " + b.x2 + " " + b.y2
                    },
                    Bezier: function () {
                        var b = a.params;
                        return "M " + b.x1 + " " + b.y1 + " C " + b.cp1x + " " + b.cp1y + " " + b.cp2x + " " + b.cp2y + " " + b.x2 + " " + b.y2
                    },
                    Arc: function () {
                        var b = a.params,
                                d = a.sweep > Math.PI ? 1 : 0,
                                c = a.anticlockwise ? 0 : 1;
                        return "M" + a.x1 + " " + a.y1 + " A " + a.radius + " " + b.r + " 0 " + d + "," + c + " " + a.x2 + " " + a.y2
                    }
                })[a.type]()
            }
        }
    };
    var U = window.SvgEndpoint = function (a) {
        var c = this,
                b = M.apply(this, [{
                        cssClass: a._jsPlumb.endpointClass,
                        originalArgs: arguments,
                        pointerEventsSpec: "all",
                        useDivWrapper: true,
                        _jsPlumb: a._jsPlumb
                    }]);
        b.renderer.paint = function (d) {
            var e = jsPlumb.extend({}, d);
            if (e.outlineColor) {
                e.strokeWidth = e.outlineWidth;
                e.strokeStyle = jsPlumbUtil.convertStyle(e.outlineColor, true)
            }
            if (c.node == null) {
                c.node = c.makeNode(e);
                c.svg.appendChild(c.node);
                c.attachListeners(c.node, c)
            } else {
                if (c.updateNode != null) {
                    c.updateNode(c.node)
                }
            }
            V(c.svg, c.node, e, [c.x, c.y, c.w, c.h], c);
            X(c.node, [c.x, c.y])
        };
        this.reattachListeners = function () {
            if (c.node) {
                c.reattachListenersForElement(c.node, c)
            }
        }
    };
    jsPlumb.Endpoints.svg.Dot = function () {
        jsPlumb.Endpoints.Dot.apply(this, arguments);
        U.apply(this, arguments);
        this.makeNode = function (a) {
            return ae("circle", {
                cx: this.w / 2,
                cy: this.h / 2,
                r: this.radius
            })
        };
        this.updateNode = function (a) {
            ad(a, {
                cx: this.w / 2,
                cy: this.h / 2,
                r: this.radius
            })
        }
    };
    jsPlumb.Endpoints.svg.Rectangle = function () {
        jsPlumb.Endpoints.Rectangle.apply(this, arguments);
        U.apply(this, arguments);
        this.makeNode = function (a) {
            return ae("rect", {
                width: this.w,
                height: this.h
            })
        };
        this.updateNode = function (a) {
            ad(a, {
                width: this.w,
                height: this.h
            })
        }
    };
    jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image;
    jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank;
    jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label;
    jsPlumb.Overlays.svg.Custom = jsPlumb.Overlays.Custom;
    var T = function (a, c) {
        a.apply(this, c);
        jsPlumb.jsPlumbUIComponent.apply(this, c);
        this.isAppendedAtTopLevel = false;
        var e = this,
                b = null;
        this.paint = function (f, k) {
            if (f.component.svg && k) {
                if (b == null) {
                    b = ae("path", {
                        "pointer-events": "all"
                    });
                    f.component.svg.appendChild(b);
                    e.attachListeners(b, f.component);
                    e.attachListeners(b, e)
                }
                var h = c && (c.length == 1) ? (c[0].cssClass || "") : "",
                        g = [0, 0];
                if (k.xmin < 0) {
                    g[0] = -k.xmin
                }
                if (k.ymin < 0) {
                    g[1] = -k.ymin
                }
                ad(b, {
                    d: d(f.d),
                    "class": h,
                    stroke: f.strokeStyle ? f.strokeStyle : null,
                    fill: f.fillStyle ? f.fillStyle : null,
                    transform: "translate(" + g[0] + "," + g[1] + ")"
                })
            }
        };
        var d = function (f) {
            return "M" + f.hxy.x + "," + f.hxy.y + " L" + f.tail[0].x + "," + f.tail[0].y + " L" + f.cxy.x + "," + f.cxy.y + " L" + f.tail[1].x + "," + f.tail[1].y + " L" + f.hxy.x + "," + f.hxy.y
        };
        this.reattachListeners = function () {
            if (b) {
                e.reattachListenersForElement(b, e)
            }
        };
        this.cleanup = function () {
            if (b != null) {
                jsPlumb.CurrentLibrary.removeElement(b)
            }
        }
    };
    jsPlumb.Overlays.svg.Arrow = function () {
        T.apply(this, [jsPlumb.Overlays.Arrow, arguments])
    };
    jsPlumb.Overlays.svg.PlainArrow = function () {
        T.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
    };
    jsPlumb.Overlays.svg.Diamond = function () {
        T.apply(this, [jsPlumb.Overlays.Diamond, arguments])
    };
    jsPlumb.Overlays.svg.GuideLines = function () {
        var a = null,
                e = this,
                b, c;
        jsPlumb.Overlays.GuideLines.apply(this, arguments);
        this.paint = function (f, h) {
            if (a == null) {
                a = ae("path");
                f.connector.svg.appendChild(a);
                e.attachListeners(a, f.connector);
                e.attachListeners(a, e);
                b = ae("path");
                f.connector.svg.appendChild(b);
                e.attachListeners(b, f.connector);
                e.attachListeners(b, e);
                c = ae("path");
                f.connector.svg.appendChild(c);
                e.attachListeners(c, f.connector);
                e.attachListeners(c, e)
            }
            var g = [0, 0];
            if (h.xmin < 0) {
                g[0] = -h.xmin
            }
            if (h.ymin < 0) {
                g[1] = -h.ymin
            }
            ad(a, {
                d: d(f.head, f.tail),
                stroke: "red",
                fill: null,
                transform: "translate(" + g[0] + "," + g[1] + ")"
            });
            ad(b, {
                d: d(f.tailLine[0], f.tailLine[1]),
                stroke: "blue",
                fill: null,
                transform: "translate(" + g[0] + "," + g[1] + ")"
            });
            ad(c, {
                d: d(f.headLine[0], f.headLine[1]),
                stroke: "green",
                fill: null,
                transform: "translate(" + g[0] + "," + g[1] + ")"
            })
        };
        var d = function (f, g) {
            return "M " + f.x + "," + f.y + " L" + g.x + "," + g.y
        }
    }
})();
(function (c) {
    var d = function (a) {
        return typeof (a) == "string" ? c("#" + a) : c(a)
    };
    jsPlumb.CurrentLibrary = {
        addClass: function (b, e) {
            b = d(b);
            try {
                if (b[0].className.constructor == SVGAnimatedString) {
                    jsPlumbUtil.svg.addClass(b[0], e)
                }
            } catch (a) {
            }
            try {
                b.addClass(e)
            } catch (a) {
            }
        },
        animate: function (a, b, f) {
            a.animate(b, f)
        },
        appendElement: function (a, b) {
            d(b).append(a)
        },
        ajax: function (a) {
            a = a || {};
            a.type = a.type || "get";
            c.ajax(a)
        },
        bind: function (f, b, a) {
            f = d(f);
            f.bind(b, a)
        },
        dragEvents: {
            start: "start",
            stop: "stop",
            drag: "drag",
            step: "step",
            over: "over",
            out: "out",
            drop: "drop",
            complete: "complete"
        },
        extend: function (a, b) {
            return c.extend(a, b)
        },
        getAttribute: function (b, a) {
            return b.attr(a)
        },
        getClientXY: function (a) {
            return [a.clientX, a.clientY]
        },
        getDragObject: function (a) {
            return a[1].draggable || a[1].helper
        },
        getDragScope: function (a) {
            return a.draggable("option", "scope")
        },
        getDropEvent: function (a) {
            return a[0]
        },
        getDropScope: function (a) {
            return a.droppable("option", "scope")
        },
        getDOMElement: function (a) {
            if (typeof (a) == "string") {
                return document.getElementById(a)
            } else {
                if (a.context || a.length != null) {
                    return a[0]
                } else {
                    return a
                }
            }
        },
        getElementObject: d,
        getOffset: function (a) {
            return a.offset()
        },
        getOriginalEvent: function (a) {
            return a.originalEvent
        },
        getPageXY: function (a) {
            return [a.pageX, a.pageY]
        },
        getParent: function (a) {
            return d(a).parent()
        },
        getScrollLeft: function (a) {
            return a.scrollLeft()
        },
        getScrollTop: function (a) {
            return a.scrollTop()
        },
        getSelector: function (a, b) {
            if (arguments.length == 2) {
                return d(a).find(b)
            } else {
                return c(a)
            }
        },
        getSize: function (a) {
            return [a.outerWidth(), a.outerHeight()]
        },
        getTagName: function (b) {
            var a = d(b);
            return a.length > 0 ? a[0].tagName : null
        },
        getUIPosition: function (g, b) {
            b = b || 1;
            if (g.length == 1) {
                ret = {
                    left: g[0].pageX,
                    top: g[0].pageY
                }
            } else {
                var a = g[1],
                        h = a.offset;
                ret = h || a.absolutePosition;
                a.position.left /= b;
                a.position.top /= b
            }
            return {
                left: ret.left / b,
                top: ret.top / b
            }
        },
        hasClass: function (a, b) {
            return a.hasClass(b)
        },
        initDraggable: function (b, g, a, h) {
            g = g || {};
            if (!g.doNotRemoveHelper) {
                g.helper = null
            }
            if (a) {
                g.scope = g.scope || jsPlumb.Defaults.Scope
            }
            b.draggable(g)
        },
        initDroppable: function (a, b) {
            b.scope = b.scope || jsPlumb.Defaults.Scope;
            a.droppable(b)
        },
        isAlreadyDraggable: function (a) {
            return d(a).hasClass("ui-draggable")
        },
        isDragSupported: function (a, b) {
            return a.draggable
        },
        isDropSupported: function (a, b) {
            return a.droppable
        },
        removeClass: function (b, e) {
            b = d(b);
            try {
                if (b[0].className.constructor == SVGAnimatedString) {
                    jsPlumbUtil.svg.removeClass(b[0], e);
                    return
                }
            } catch (a) {
            }
            b.removeClass(e)
        },
        removeElement: function (a) {
            d(a).remove()
        },
        setAttribute: function (b, a, f) {
            b.attr(a, f)
        },
        setDragFilter: function (a, b) {
            if (jsPlumb.CurrentLibrary.isAlreadyDraggable(a)) {
                a.draggable("option", "cancel", b)
            }
        },
        setDraggable: function (a, b) {
            a.draggable("option", "disabled", !b)
        },
        setDragScope: function (a, b) {
            a.draggable("option", "scope", b)
        },
        setOffset: function (b, a) {
            d(b).offset(a)
        },
        trigger: function (b, a, h) {
            var g = jQuery._data(d(b)[0], "handle");
            g(h)
        },
        unbind: function (f, b, a) {
            f = d(f);
            f.unbind(b, a)
        }
    };
    c(document).ready(jsPlumb.init)
})(jQuery);
(function () {
    "undefined" == typeof Math.sgn && (Math.sgn = function (a) {
        return 0 == a ? 0 : 0 < a ? 1 : -1
    });
    var y = {
        subtract: function (a, b) {
            return {
                x: a.x - b.x,
                y: a.y - b.y
            }
        },
        dotProduct: function (a, b) {
            return a.x * b.x + a.y * b.y
        },
        square: function (a) {
            return Math.sqrt(a.x * a.x + a.y * a.y)
        },
        scale: function (a, b) {
            return {
                x: a.x * b,
                y: a.y * b
            }
        }
    },
    x = Math.pow(2, -65),
            s = function (c, f) {
                for (var l = [], h = f.length - 1, m = 2 * h - 1, C = [], k = [], d = [], a = [], b = [
                    [1, 0.6, 0.3, 0.1],
                    [0.4, 0.6, 0.6, 0.4],
                    [0.1, 0.3, 0.6, 1]
                ], g = 0; g <= h; g++) {
                    C[g] = y.subtract(f[g], c)
                }
                for (g = 0; g <= h - 1; g++) {
                    k[g] = y.subtract(f[g + 1], f[g]), k[g] = y.scale(k[g], 3)
                }
                for (g = 0; g <= h - 1; g++) {
                    for (var e = 0; e <= h; e++) {
                        d[g] || (d[g] = []), d[g][e] = y.dotProduct(k[g], C[e])
                    }
                }
                for (g = 0; g <= m; g++) {
                    a[g] || (a[g] = []), a[g].y = 0, a[g].x = parseFloat(g) / m
                }
                m = h - 1;
                for (C = 0; C <= h + m; C++) {
                    g = Math.max(0, C - m);
                    for (k = Math.min(C, h); g <= k; g++) {
                        j = C - g, a[g + j].y += d[j][g] * b[j][g]
                    }
                }
                h = f.length - 1;
                a = p(a, 2 * h - 1, l, 0);
                m = y.subtract(c, f[0]);
                d = y.square(m);
                for (g = b = 0; g < a; g++) {
                    m = y.subtract(c, q(f, h, l[g], null, null)), m = y.square(m), m < d && (d = m, b = l[g])
                }
                m = y.subtract(c, f[h]);
                m = y.square(m);
                m < d && (d = m, b = 1);
                return {
                    location: b,
                    distance: d
                }
            },
            p = function (G, I, f, c) {
                var g = [],
                        h = [],
                        d = [],
                        m = [],
                        k = 0,
                        l, a;
                a = Math.sgn(G[0].y);
                for (var H = 1; H <= I; H++) {
                    l = Math.sgn(G[H].y), l != a && k++, a = l
                }
                switch (k) {
                    case 0:
                        return 0;
                    case 1:
                        if (64 <= c) {
                            return f[0] = (G[0].x + G[I].x) / 2, 1
                        }
                        var e, b, k = G[0].y - G[I].y;
                        a = G[I].x - G[0].x;
                        H = G[0].x * G[I].y - G[I].x * G[0].y;
                        l = max_distance_below = 0;
                        for (e = 1; e < I; e++) {
                            b = k * G[e].x + a * G[e].y + H, b > l ? l = b : b < max_distance_below && (max_distance_below = b)
                        }
                        b = a;
                        e = 0 * b - 1 * k;
                        l = (1 * (H - l) - 0 * b) * (1 / e);
                        b = a;
                        a = H - max_distance_below;
                        e = 0 * b - 1 * k;
                        k = (1 * a - 0 * b) * (1 / e);
                        a = Math.min(l, k);
                        if (Math.max(l, k) - a < x) {
                            return d = G[I].x - G[0].x, m = G[I].y - G[0].y, f[0] = 0 + 1 * (d * (G[0].y - 0) - m * (G[0].x - 0)) * (1 / (0 * d - 1 * m)), 1
                        }
                }
                q(G, I, 0.5, g, h);
                G = p(g, I, d, c + 1);
                I = p(h, I, m, c + 1);
                for (c = 0; c < G; c++) {
                    f[c] = d[c]
                }
                for (c = 0; c < I; c++) {
                    f[c + G] = m[c]
                }
                return G + I
            },
            q = function (f, g, c, a, d) {
                for (var e = [
                    []
                ], b = 0; b <= g; b++) {
                    e[0][b] = f[b]
                }
                for (f = 1; f <= g; f++) {
                    for (b = 0; b <= g - f; b++) {
                        e[f] || (e[f] = []), e[f][b] || (e[f][b] = {}), e[f][b].x = (1 - c) * e[f - 1][b].x + c * e[f - 1][b + 1].x, e[f][b].y = (1 - c) * e[f - 1][b].y + c * e[f - 1][b + 1].y
                    }
                }
                if (null != a) {
                    for (b = 0; b <= g; b++) {
                        a[b] = e[b][0]
                    }
                }
                if (null != d) {
                    for (b = 0; b <= g; b++) {
                        d[b] = e[g - b][b]
                    }
                }
                return e[g][0]
            },
            u = {},
            n = function (f, g) {
                var m, k = f.length - 1;
                m = u[k];
                if (!m) {
                    m = [];
                    var a = function (B) {
                        return function () {
                            return B
                        }
                    },
                            b = function () {
                                return function (B) {
                                    return B
                                }
                            },
                            l = function () {
                                return function (B) {
                                    return 1 - B
                                }
                            },
                            e = function (B) {
                                return function (F) {
                                    for (var A = 1, E = 0; E < B.length; E++) {
                                        A *= B[E](F)
                                    }
                                    return A
                                }
                            };
                    m.push(new function () {
                        return function (B) {
                            return Math.pow(B, k)
                        }
                    });
                    for (var c = 1; c < k; c++) {
                        for (var d = [new a(k)], h = 0; h < k - c; h++) {
                            d.push(new b)
                        }
                        for (h = 0; h < c; h++) {
                            d.push(new l)
                        }
                        m.push(new e(d))
                    }
                    m.push(new function () {
                        return function (B) {
                            return Math.pow(1 - B, k)
                        }
                    });
                    u[k] = m
                }
                for (l = b = a = 0; l < f.length; l++) {
                    a += f[l].x * m[l](g), b += f[l].y * m[l](g)
                }
                return {
                    x: a,
                    y: b
                }
            },
            v = function (a, b) {
                return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
            },
            w = function (a) {
                return a[0].x == a[1].x && a[0].y == a[1].y
            },
            o = function (f, g, c) {
                if (w(f)) {
                    return {
                        point: f[0],
                        location: g
                    }
                }
                for (var a = n(f, g), d = 0, e = 0 < c ? 1 : -1, b = null; d < Math.abs(c); ) {
                    g += 0.005 * e, b = n(f, g), d += v(b, a), a = b
                }
                return {
                    point: b,
                    location: g
                }
            },
            r = function (d, e) {
                var b = n(d, e),
                        a = n(d.slice(0, d.length - 1), e),
                        c = a.y - b.y,
                        b = a.x - b.x;
                return 0 == c ? Infinity : Math.atan(c / b)
            };
    window.jsBezier = {
        distanceFromCurve: s,
        gradientAtPoint: r,
        gradientAtPointAlongCurveFrom: function (b, c, a) {
            c = o(b, c, a);
            1 < c.location && (c.location = 1);
            0 > c.location && (c.location = 0);
            return r(b, c.location)
        },
        nearestPointOnCurve: function (b, c) {
            var a = s(b, c);
            return {
                point: q(c, c.length - 1, a.location, null, null),
                location: a.location
            }
        },
        pointOnCurve: n,
        pointAlongCurveFrom: function (b, c, a) {
            return o(b, c, a).point
        },
        perpendicularToCurveAt: function (c, d, b, a) {
            d = o(c, d, null == a ? 0 : a);
            c = r(c, d.location);
            a = Math.atan(-1 / c);
            c = b / 2 * Math.sin(a);
            b = b / 2 * Math.cos(a);
            return [{
                    x: d.point.x + b,
                    y: d.point.y + c
                }, {
                    x: d.point.x - b,
                    y: d.point.y - c
                }]
        },
        locationAlongCurveFrom: function (b, c, a) {
            return o(b, c, a).location
        },
        getLength: function (d) {
            if (w(d)) {
                return 0
            }
            for (var e = n(d, 0), b = 0, a = 0, c = null; 1 > a; ) {
                a += 0.005, c = n(d, a), b += v(c, e), e = c
            }
            return b
        }
    }
})();
(function ($) {
    $.fn.markItUp = function (settings, extraSettings) {
        var method, params, options, ctrlKey, shiftKey, altKey;
        ctrlKey = shiftKey = altKey = false;
        if (typeof settings == "string") {
            method = settings;
            params = extraSettings
        }
        options = {
            id: "",
            nameSpace: "",
            root: "",
            previewHandler: false,
            previewInWindow: "",
            previewInElement: "",
            previewAutoRefresh: true,
            previewPosition: "after",
            previewTemplatePath: "~/templates/preview.html",
            previewParser: false,
            previewParserPath: "",
            previewParserVar: "data",
            resizeHandle: true,
            beforeInsert: "",
            afterInsert: "",
            onEnter: {},
            onShiftEnter: {},
            onCtrlEnter: {},
            onTab: {},
            markupSet: [{}]
        };
        $.extend(options, settings, extraSettings);
        if (!options.root) {
            $("script").each(function (a, tag) {
                miuScript = $(tag).get(0).src.match(/(.*)jquery\.markitup(\.pack)?\.js$/);
                if (miuScript !== null) {
                    options.root = miuScript[1]
                }
            })
        }
        var uaMatch = function (ua) {
            ua = ua.toLowerCase();
            var match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
            return {
                browser: match[1] || "",
                version: match[2] || "0"
            }
        };
        var matched = uaMatch(navigator.userAgent);
        var browser = {};
        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version
        }
        if (browser.chrome) {
            browser.webkit = true
        } else {
            if (browser.webkit) {
                browser.safari = true
            }
        }
        return this.each(function () {
            var $$, textarea, levels, scrollPosition, caretPosition, caretOffset, clicked, hash, header, footer, previewWindow, template, iFrame, abort;
            $$ = $(this);
            textarea = this;
            levels = [];
            abort = false;
            scrollPosition = caretPosition = 0;
            caretOffset = -1;
            options.previewParserPath = localize(options.previewParserPath);
            options.previewTemplatePath = localize(options.previewTemplatePath);
            if (method) {
                switch (method) {
                    case "remove":
                        remove();
                        break;
                    case "insert":
                        markup(params);
                        break;
                    default:
                        $.error("Method " + method + " does not exist on jQuery.markItUp")
                }
                return
            }

            function localize(data, inText) {
                if (inText) {
                    return data.replace(/("|')~\//g, "$1" + options.root)
                }
                return data.replace(/^~\//, options.root)
            }

            function init() {
                id = "";
                nameSpace = "";
                if (options.id) {
                    id = 'id="' + options.id + '"'
                } else {
                    if ($$.attr("id")) {
                        id = 'id="markItUp' + ($$.attr("id").substr(0, 1).toUpperCase()) + ($$.attr("id").substr(1)) + '"'
                    }
                }
                if (options.nameSpace) {
                    nameSpace = 'class="' + options.nameSpace + '"'
                }
                $$.wrap("<div " + nameSpace + "></div>");
                $$.wrap("<div " + id + ' class="markItUp"></div>');
                $$.wrap('<div class="markItUpContainer"></div>');
                $$.addClass("markItUpEditor");
                header = $('<div class="markItUpHeader"></div>').insertBefore($$);
                var $basicSet = $(dropMenus(options.markupSet[0], "miu_basic"));
                $basicSet.append('<li class="txt_link fright li_miu_advanced"><span class="toggle_miu_advanced show_miu_advanced awesome-button" role="button">' + locaKeys.moreopts + "</span></li>");
                $basicSet.appendTo(header);
                var $advancedSet = $(dropMenus(options.markupSet[1], "miu_advanced"));
                $advancedSet.appendTo(header).hide();
                footer = $('<div class="markItUpFooter"></div>').insertAfter($$);
                if (options.resizeHandle === true && browser.safari !== true) {
                    resizeHandle = $('<div class="markItUpResizeHandle"></div>').insertAfter($$).bind("mousedown.markItUp", function (e) {
                        var h = $$.height(),
                                y = e.clientY,
                                mouseMove, mouseUp;
                        mouseMove = function (e) {
                            $$.css("height", Math.max(20, e.clientY + h - y) + "px");
                            return false
                        };
                        mouseUp = function (e) {
                            $("html").unbind("mousemove.markItUp", mouseMove).unbind("mouseup.markItUp", mouseUp);
                            return false
                        };
                        $("html").bind("mousemove.markItUp", mouseMove).bind("mouseup.markItUp", mouseUp)
                    });
                    footer.append(resizeHandle)
                }
                $$.bind("keydown.markItUp", keyPressed).bind("keyup", keyPressed);
                $$.bind("insertion.markItUp", function (e, settings) {
                    if (settings.target !== false) {
                        get()
                    }
                    if (textarea === $.markItUp.focused) {
                        markup(settings)
                    }
                });
                $$.bind("focus.markItUp", function () {
                    $.markItUp.focused = this
                });
                if (options.previewInElement) {
                    refreshPreview()
                }
            }

            function dropMenus(markupSet, mSetClass) {
                if (!mSetClass) {
                    mSetClass = ""
                }
                var ul = $('<ul class="' + mSetClass + '"></ul>'),
                        i = 0;
                $.each(markupSet, function () {
                    var button = this,
                            t = "",
                            title, li, j;
                    title = (button.key) ? (button.name || "") + " [Ctrl+" + button.key + "]" : (button.name || "");
                    key = (button.key) ? 'accesskey="' + button.key + '"' : "";
                    if (button.separator) {
                        li = $('<li class="markItUpSeparator">' + (button.separator || "") + "</li>").appendTo(ul)
                    } else {
                        i++;
                        for (j = levels.length - 1; j >= 0; j--) {
                            t += levels[j] + "-"
                        }
                        li = $('<li class="markItUpButton markItUpButton' + t + (i) + " " + (button.className || "") + '"><a href="" ' + key + ' title="' + title + '">' + (button.name || "") + "</a></li>").bind("contextmenu.markItUp", function () {
                            return false
                        }).appendTo(ul);
                        if (!isMobile) {
                            li.unbind("click.markItUp").bind("click.markItUp", function () {
                                if (button.call) {
                                    eval(button.call)()
                                } else {
                                    var $innerUL = $(">ul", li);
                                    if ($innerUL.length > 0) {
                                        $innerUL.parents(".ui-dialog").find(".ui-dialog-titlebar-close").on("click", function () {
                                            $innerUL.hide()
                                        });
                                        $innerUL.addClass("markItUpOutpost");
                                        $("body").append($innerUL);
                                        var randomId = Math.ceil(Math.random() * 10000);
                                        li.attr("id", "markitUpDropdown" + randomId);
                                        $innerUL.attr("rel", "markitUpDropdown" + randomId);
                                        $innerUL.find(">li").bind("click.markItUp", function () {
                                            $innerUL.hide();
                                            li.attr("data-opened", 0)
                                        });
                                        $(window).on("resize", function (e) {
                                            repositionDropdowns($innerUL, li)
                                        })
                                    } else {
                                        $innerUL = $('body>ul[rel="' + li.attr("id") + '"]')
                                    }
                                    $("html").one("click.markItUp2", function () {
                                        $innerUL.hide();
                                        li.attr("data-opened", 0)
                                    });
                                    repositionDropdowns($innerUL, li);
                                    if ($innerUL.filter(":visible").length) {
                                        $innerUL.hide();
                                        li.attr("data-opened", 0)
                                    } else {
                                        $innerUL.show();
                                        li.attr("data-opened", 1)
                                    }
                                }
                                setTimeout(function () {
                                    markup(button)
                                }, 1);
                                return false
                            }).bind("focusin.markItUp", function () {
                                $$.focus()
                            })
                        } else {
                            li.bind("click.markItUp", function () {
                                $(header).find("ul ul").hide();
                                if ($(this).find("> ul").length) {
                                    $(this).find("> ul").show()
                                } else {
                                    if (button.call) {
                                        eval(button.call)()
                                    }
                                    setTimeout(function () {
                                        markup(button)
                                    }, 1)
                                }
                                return false
                            })
                        }
                        if (button.dropMenu) {
                            levels.push(i);
                            $(li).addClass("markItUpDropMenu").append(dropMenus(button.dropMenu));
                            var dropDownArr = $('<span class="dropdown_arr"></span>');
                            $(li).append(dropDownArr)
                        }
                    }
                });
                levels.pop();
                return ul
            }

            function repositionDropdowns($innerUL, li) {
                var ulHeight = $innerUL.outerHeight();
                var top;
                var dropDownTop = Math.ceil(li.offset().top);
                if (dropDownTop + li.height() + ulHeight + $("#siteFooter").outerHeight() >= $(window).innerHeight() + $(window).scrollTop()) {
                    top = dropDownTop - ulHeight - 2
                } else {
                    top = dropDownTop + 29
                }
                $innerUL.css({
                    top: top,
                    left: Math.floor(li.offset()["left"])
                })
            }

            function magicMarkups(string) {
                if (string) {
                    string = string.toString();
                    string = string.replace(/\(\!\(([\s\S]*?)\)\!\)/g, function (x, a) {
                        var b = a.split("|!|");
                        if (altKey === true) {
                            return (b[1] !== undefined) ? b[1] : b[0]
                        } else {
                            return (b[1] === undefined) ? "" : b[0]
                        }
                    });
                    string = string.replace(/\[\!\[([\s\S]*?)\]\!\]/g, function (x, a) {
                        var b = a.split(":!:");
                        if (abort === true) {
                            return false
                        }
                        value = prompt(b[0], (b[1]) ? b[1] : "");
                        if (value === null) {
                            abort = true
                        }
                        return value
                    });
                    return string
                }
                return ""
            }

            function prepare(action) {
                if ($.isFunction(action)) {
                    action = action(hash)
                }
                return magicMarkups(action)
            }

            function build(string) {
                var openWith = prepare(clicked.openWith);
                var placeHolder = prepare(clicked.placeHolder);
                var replaceWith = prepare(clicked.replaceWith);
                var closeWith = prepare(clicked.closeWith);
                var openBlockWith = prepare(clicked.openBlockWith);
                var closeBlockWith = prepare(clicked.closeBlockWith);
                var multiline = clicked.multiline;
                if (replaceWith !== "") {
                    block = openWith + replaceWith + closeWith
                } else {
                    if (selection === "" && placeHolder !== "") {
                        block = openWith + placeHolder + closeWith
                    } else {
                        string = string || selection;
                        var lines = [string],
                                blocks = [];
                        if (multiline === true) {
                            lines = string.split(/\r?\n/)
                        }
                        for (var l = 0; l < lines.length; l++) {
                            line = lines[l];
                            var trailingSpaces;
                            if (trailingSpaces = line.match(/ *$/)) {
                                blocks.push(openWith + line.replace(/ *$/g, "") + closeWith + trailingSpaces)
                            } else {
                                blocks.push(openWith + line + closeWith)
                            }
                        }
                        block = blocks.join("\n")
                    }
                }
                block = openBlockWith + block + closeBlockWith;
                return {
                    block: block,
                    openBlockWith: openBlockWith,
                    openWith: openWith,
                    replaceWith: replaceWith,
                    placeHolder: placeHolder,
                    closeWith: closeWith,
                    closeBlockWith: closeBlockWith
                }
            }

            function markup(button) {
                var len, j, n, i;
                hash = clicked = button;
                get();
                $.extend(hash, {
                    line: "",
                    root: options.root,
                    textarea: textarea,
                    selection: (selection || ""),
                    caretPosition: caretPosition,
                    ctrlKey: ctrlKey,
                    shiftKey: shiftKey,
                    altKey: altKey
                });
                prepare(options.beforeInsert);
                prepare(clicked.beforeInsert);
                if ((ctrlKey === true && shiftKey === true) || button.multiline === true) {
                    prepare(clicked.beforeMultiInsert)
                }
                $.extend(hash, {
                    line: 1
                });
                if ((ctrlKey === true && shiftKey === true)) {
                    lines = selection.split(/\r?\n/);
                    for (j = 0, n = lines.length, i = 0; i < n; i++) {
                        if ($.trim(lines[i]) !== "") {
                            $.extend(hash, {
                                line: ++j,
                                selection: lines[i]
                            });
                            lines[i] = build(lines[i]).block
                        } else {
                            lines[i] = ""
                        }
                    }
                    string = {
                        block: lines.join("\n")
                    };
                    start = caretPosition;
                    len = string.block.length + ((browser.opera) ? n - 1 : 0)
                } else {
                    if (ctrlKey === true) {
                        string = build(selection);
                        start = caretPosition + string.openWith.length;
                        len = string.block.length - string.openWith.length - string.closeWith.length;
                        len = len - (string.block.match(/ $/) ? 1 : 0);
                        len -= fixIeBug(string.block)
                    } else {
                        if (shiftKey === true) {
                            string = build(selection);
                            start = caretPosition;
                            len = string.block.length;
                            len -= fixIeBug(string.block)
                        } else {
                            string = build(selection);
                            start = caretPosition + string.block.length;
                            len = 0;
                            start -= fixIeBug(string.block)
                        }
                    }
                }
                if ((selection === "" && string.replaceWith === "")) {
                    caretOffset += fixOperaBug(string.block);
                    start = caretPosition + string.openBlockWith.length + string.openWith.length;
                    len = string.block.length - string.openBlockWith.length - string.openWith.length - string.closeWith.length - string.closeBlockWith.length;
                    caretOffset = $$.val().substring(caretPosition, $$.val().length).length;
                    caretOffset -= fixOperaBug($$.val().substring(0, caretPosition))
                }
                $.extend(hash, {
                    caretPosition: caretPosition,
                    scrollPosition: scrollPosition
                });
                if (string.block !== selection && abort === false) {
                    insert(string.block);
                    set(start, len)
                } else {
                    caretOffset = -1
                }
                get();
                $.extend(hash, {
                    line: "",
                    selection: selection
                });
                if ((ctrlKey === true && shiftKey === true) || button.multiline === true) {
                    prepare(clicked.afterMultiInsert)
                }
                prepare(clicked.afterInsert);
                prepare(options.afterInsert);
                if (previewWindow && options.previewAutoRefresh) {
                    refreshPreview()
                }
                shiftKey = altKey = ctrlKey = abort = false
            }

            function fixOperaBug(string) {
                if (browser.opera) {
                    return string.length - string.replace(/\n*/g, "").length
                }
                return 0
            }

            function fixIeBug(string) {
                if (browser.msie) {
                    return string.length - string.replace(/\r*/g, "").length
                }
                return 0
            }

            function insert(block) {
                if (document.selection) {
                    var newSelection = document.selection.createRange();
                    newSelection.text = block
                } else {
                    textarea.value = textarea.value.substring(0, caretPosition) + block + textarea.value.substring(caretPosition + selection.length, textarea.value.length)
                }
            }

            function set(start, len) {
                if (textarea.createTextRange) {
                    if (browser.opera && browser.version >= 9.5 && len == 0) {
                        return false
                    }
                    range = textarea.createTextRange();
                    range.collapse(true);
                    range.moveStart("character", start);
                    range.moveEnd("character", len);
                    range.select()
                } else {
                    if (textarea.setSelectionRange) {
                        textarea.setSelectionRange(start, start + len)
                    }
                }
                textarea.scrollTop = scrollPosition;
                textarea.focus()
            }

            function get() {
                textarea.focus();
                scrollPosition = textarea.scrollTop;
                if (document.selection) {
                    selection = document.selection.createRange().text;
                    if (browser.msie) {
                        var range = document.selection.createRange(),
                                rangeCopy = range.duplicate();
                        rangeCopy.moveToElementText(textarea);
                        caretPosition = -1;
                        while (rangeCopy.inRange(range)) {
                            rangeCopy.moveStart("character");
                            caretPosition++
                        }
                    } else {
                        caretPosition = textarea.selectionStart
                    }
                } else {
                    caretPosition = textarea.selectionStart;
                    selection = textarea.value.substring(caretPosition, textarea.selectionEnd)
                }
                return selection
            }

            function preview() {
                if (typeof options.previewHandler === "function") {
                    previewWindow = true
                } else {
                    if (options.previewInElement) {
                        previewWindow = $(options.previewInElement)
                    } else {
                        if (!previewWindow || previewWindow.closed) {
                            if (options.previewInWindow) {
                                previewWindow = window.open("", "preview", options.previewInWindow);
                                $(window).unload(function () {
                                    previewWindow.close()
                                })
                            } else {
                                iFrame = $('<iframe class="markItUpPreviewFrame"></iframe>');
                                if (options.previewPosition == "after") {
                                    iFrame.insertAfter(footer)
                                } else {
                                    iFrame.insertBefore(header)
                                }
                                previewWindow = iFrame[iFrame.length - 1].contentWindow || frame[iFrame.length - 1]
                            }
                        } else {
                            if (altKey === true) {
                                if (iFrame) {
                                    iFrame.remove()
                                } else {
                                    previewWindow.close()
                                }
                                previewWindow = iFrame = false
                            }
                        }
                    }
                }
                if (!options.previewAutoRefresh) {
                    refreshPreview()
                }
                if (options.previewInWindow) {
                    previewWindow.focus()
                }
            }

            function refreshPreview() {
                renderPreview()
            }

            function renderPreview() {
                var phtml;
                if (options.previewHandler && typeof options.previewHandler === "function") {
                    options.previewHandler($$.val())
                } else {
                    if (options.previewParser && typeof options.previewParser === "function") {
                        var data = options.previewParser($$.val());
                        writeInPreview(localize(data, 1))
                    } else {
                        if (options.previewParserPath !== "") {
                            $.ajax({
                                type: "POST",
                                dataType: "text",
                                global: false,
                                url: options.previewParserPath,
                                data: options.previewParserVar + "=" + encodeURIComponent($$.val()),
                                success: function (data) {
                                    writeInPreview(localize(data, 1))
                                }
                            })
                        } else {
                            if (!template) {
                                $.ajax({
                                    url: options.previewTemplatePath,
                                    dataType: "text",
                                    global: false,
                                    success: function (data) {
                                        writeInPreview(localize(data, 1).replace(/<!-- content -->/g, $$.val()))
                                    }
                                })
                            }
                        }
                    }
                }
                return false
            }

            function writeInPreview(data) {
                if (options.previewInElement) {
                    $(options.previewInElement).html(data)
                } else {
                    if (previewWindow && previewWindow.document) {
                        try {
                            sp = previewWindow.document.documentElement.scrollTop
                        } catch (e) {
                            sp = 0
                        }
                        previewWindow.document.open();
                        previewWindow.document.write(data);
                        previewWindow.document.close();
                        previewWindow.document.documentElement.scrollTop = sp
                    }
                }
            }

            function keyPressed(e) {
                shiftKey = e.shiftKey;
                altKey = e.altKey;
                ctrlKey = (!(e.altKey && e.ctrlKey)) ? (e.ctrlKey || e.metaKey) : false;
                if (e.type === "keydown") {
                    if (ctrlKey === true) {
                        li = $('a[accesskey="' + ((e.keyCode == 13) ? "\\n" : String.fromCharCode(e.keyCode)) + '"]', header).parent("li");
                        if (li.length !== 0) {
                            ctrlKey = false;
                            setTimeout(function () {
                                li.triggerHandler("mouseup")
                            }, 1);
                            return false
                        }
                    }
                    if (e.keyCode === 13 || e.keyCode === 10) {
                        if (ctrlKey === true) {
                            ctrlKey = false;
                            markup(options.onCtrlEnter);
                            return options.onCtrlEnter.keepDefault
                        } else {
                            if (shiftKey === true) {
                                shiftKey = false;
                                markup(options.onShiftEnter);
                                return options.onShiftEnter.keepDefault
                            } else {
                                markup(options.onEnter);
                                return options.onEnter.keepDefault
                            }
                        }
                    }
                    if (e.keyCode === 9) {
                        if (shiftKey == true || ctrlKey == true || altKey == true) {
                            return false
                        }
                        if (caretOffset !== -1) {
                            get();
                            caretOffset = $$.val().length - caretOffset;
                            set(caretOffset, 0);
                            caretOffset = -1;
                            return false
                        } else {
                            markup(options.onTab);
                            return options.onTab.keepDefault
                        }
                    }
                }
            }

            function remove() {
                $$.unbind(".markItUp").removeClass("markItUpEditor");
                $$.parent("div").parent("div.markItUp").parent("div").replaceWith($$);
                $$.data("markItUp", null)
            }
            init()
        })
    };
    $.fn.markItUpRemove = function () {
        return this.each(function () {
            $(this).markItUp("remove")
        })
    };
    $.markItUp = function (settings) {
        var options = {
            target: false
        };
        $.extend(options, settings);
        if (options.target) {
            return $(options.target).each(function () {
                $(this).focus();
                $(this).trigger("insertion", [options])
            })
        } else {
            $("textarea").trigger("insertion", [options])
        }
    }
})(jQuery);