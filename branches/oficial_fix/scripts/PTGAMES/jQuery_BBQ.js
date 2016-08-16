/*
 * jQuery BBQ: Back Button & Query Library - v1.4pre - 1/15/2013
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010-2013 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function (M, Y) {
    var an, ah = Array.prototype.slice,
            U = decodeURIComponent,
            av = M.param,
            al, at, ai, ad, au = M.bbq = M.bbq || {},
            W, af, ak, aq = M.event.special,
            ar = "hashchange",
            X = "querystring",
            Q = "fragment",
            ab = "elemUrlAttr",
            aj = "href",
            ag = "src",
            ac = /^.*\?|#.*$/g,
            S, N, ao, am, V, R = {};

    function O(a) {
        return typeof a === "string"
    }

    function T(a) {
        var b = ah.call(arguments, 1);
        return function () {
            return a.apply(this, b.concat(ah.call(arguments)))
        }
    }

    function ae(a) {
        return a.replace(N, "$2")
    }

    function aa(a) {
        return a.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }

    function ap(h, c, l, g, k) {
        var a, d, e, b, f;
        if (g !== an) {
            e = l.match(h ? N : /^([^#?]*)\??([^#]*)(#?.*)/);
            f = e[3] || "";
            if (k === 2 && O(g)) {
                d = g.replace(h ? S : ac, "")
            } else {
                b = ai(e[2]);
                g = O(g) ? ai[h ? Q : X](g) : g;
                d = k === 2 ? g : k === 1 ? M.extend({}, g, b) : M.extend({}, b, g);
                d = al(d);
                if (h) {
                    d = d.replace(ao, U)
                }
            }
            a = e[1] + (h ? V : d || !e[1] ? "?" : "") + d + f
        } else {
            a = c(l !== an ? l : location.href)
        }
        return a
    }
    av[X] = T(ap, 0, aa);
    av[Q] = at = T(ap, 1, ae);
    av.sorted = al = function (c, b) {
        var d = [],
                a = {};
        M.each(av(c, b).split("&"), function (e, h) {
            var f = h.replace(/(?:%5B|=).*$/, ""),
                    g = a[f];
            if (!g) {
                g = a[f] = [];
                d.push(f)
            }
            g.push(h)
        });
        return M.map(d.sort(), function (e) {
            return a[e]
        }).join("&")
    };
    at.noEscape = function (a) {
        a = a || "";
        var b = M.map(a.split(""), encodeURIComponent);
        ao = new RegExp(b.join("|"), "g")
    };
    at.noEscape(",/");
    at.ajaxCrawlable = function (a) {
        if (a !== an) {
            if (a) {
                S = /^.*(?:#!|#)/;
                N = /^([^#]*)(?:#!|#)?(.*)$/;
                V = "#!"
            } else {
                S = /^.*#/;
                N = /^([^#]*)#?(.*)$/;
                V = "#"
            }
            am = !!a
        }
        return am
    };
    at.ajaxCrawlable(0);
    M.deparam = ai = function (a, d) {
        var b = {},
                c = {
                    "true": !0,
                    "false": !1,
                    "null": null
                };
        M.each(a.replace(/\+/g, " ").split("&"), function (m, f) {
            var n = f.split("="),
                    g = U(n[0]),
                    o, h = b,
                    l = 0,
                    e = g.split("]["),
                    k = e.length - 1;
            if (/\[/.test(e[0]) && /\]$/.test(e[k])) {
                e[k] = e[k].replace(/\]$/, "");
                e = e.shift().split("[").concat(e);
                k = e.length - 1
            } else {
                k = 0
            }
            if (n.length === 2) {
                o = U(n[1]);
                if (d) {
                    o = o && !isNaN(o) ? +o : o === "undefined" ? an : c[o] !== an ? c[o] : o
                }
                if (k) {
                    for (; l <= k; l++) {
                        g = e[l] === "" ? h.length : e[l];
                        h = h[g] = l < k ? h[g] || (e[l + 1] && isNaN(e[l + 1]) ? {} : []) : o
                    }
                } else {
                    if (M.isArray(b[g])) {
                        b[g].push(o)
                    } else {
                        if (b[g] !== an) {
                            b[g] = [b[g], o]
                        } else {
                            b[g] = o
                        }
                    }
                }
            } else {
                if (g) {
                    b[g] = d ? an : ""
                }
            }
        });
        return b
    };

    function Z(a, c, b) {
        if (c === an || typeof c === "boolean") {
            b = c;
            c = av[a ? Q : X]()
        } else {
            c = O(c) ? c.replace(a ? S : ac, "") : c
        }
        return ai(c, b)
    }
    ai[X] = T(Z, 0);
    ai[Q] = ad = T(Z, 1);
    M[ab] || (M[ab] = function (a) {
        return M.extend(R, a)
    })({
        a: aj,
        base: aj,
        iframe: ag,
        img: ag,
        input: ag,
        form: "action",
        link: aj,
        script: ag
    });
    ak = M[ab];

    function P(a, c, b, d) {
        if (!O(b) && typeof b !== "object") {
            d = b;
            b = c;
            c = an
        }
        return this.each(function () {
            var e = M(this),
                    g = c || ak()[(this.nodeName || "").toLowerCase()] || "",
                    f = g && e.attr(g) || "";
            e.attr(g, av[a](f, b, d))
        })
    }
    M.fn[X] = T(P, X);
    M.fn[Q] = T(P, Q);
    au.pushState = W = function (a, d) {
        if (O(a) && /^#/.test(a) && d === an) {
            d = 2
        }
        var b = a !== an,
                c = at(location.href, b ? a : {}, b ? d : 2);
        location.href = c
    };
    au.getState = af = function (b, a) {
        return b === an || typeof b === "boolean" ? ad(b) : ad(a)[b]
    };
    au.removeState = function (b) {
        var a = {};
        if (b !== an) {
            a = af();
            M.each(M.isArray(b) ? b : arguments, function (c, d) {
                delete a[d]
            })
        }
        W(a, 2)
    };
    aq[ar] = M.extend(aq[ar], {
        add: function (c) {
            var a;

            function b(d) {
                var e = d[Q] = at();
                d.getState = function (g, f) {
                    return g === an || typeof g === "boolean" ? ai(e, g) : ai(e, f)[g]
                };
                a.apply(this, arguments)
            }
            if (M.isFunction(c)) {
                a = c;
                return b
            } else {
                a = c.handler;
                c.handler = b
            }
        }
    })
})(jQuery, this);