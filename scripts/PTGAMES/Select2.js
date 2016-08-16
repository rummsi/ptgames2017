/*
 * Select2 4.0.0
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (b) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], b)
    } else {
        if (typeof exports === "object") {
            b(require("jquery"))
        } else {
            b(jQuery)
        }
    }
}(function (f) {
    var d = (function () {
        if (f && f.fn && f.fn.select2 && f.fn.select2.amd) {
            var a = f.fn.select2.amd
        }
        var a;
        (function () {
            if (!a || !a.requirejs) {
                if (!a) {
                    a = {}
                } else {
                    h = a
                }
                var c, h, b;
                (function (T) {
                    var P, X, H, G, U = {},
                            V = {},
                            L = {},
                            R = {},
                            I = Object.prototype.hasOwnProperty,
                            N = [].slice,
                            K = /\.js$/;

                    function J(l, k) {
                        return I.call(l, k)
                    }

                    function F(x, A) {
                        var o, s, v, r, n, w, l, k, p, q, u, m = A && A.split("/"),
                                y = L.map,
                                B = (y && y["*"]) || {};
                        if (x && x.charAt(0) === ".") {
                            if (A) {
                                m = m.slice(0, m.length - 1);
                                x = x.split("/");
                                n = x.length - 1;
                                if (L.nodeIdCompat && K.test(x[n])) {
                                    x[n] = x[n].replace(K, "")
                                }
                                x = m.concat(x);
                                for (p = 0; p < x.length; p += 1) {
                                    u = x[p];
                                    if (u === ".") {
                                        x.splice(p, 1);
                                        p -= 1
                                    } else {
                                        if (u === "..") {
                                            if (p === 1 && (x[2] === ".." || x[0] === "..")) {
                                                break
                                            } else {
                                                if (p > 0) {
                                                    x.splice(p - 1, 2);
                                                    p -= 2
                                                }
                                            }
                                        }
                                    }
                                }
                                x = x.join("/")
                            } else {
                                if (x.indexOf("./") === 0) {
                                    x = x.substring(2)
                                }
                            }
                        }
                        if ((m || B) && y) {
                            o = x.split("/");
                            for (p = o.length; p > 0; p -= 1) {
                                s = o.slice(0, p).join("/");
                                if (m) {
                                    for (q = m.length; q > 0; q -= 1) {
                                        v = y[m.slice(0, q).join("/")];
                                        if (v) {
                                            v = v[s];
                                            if (v) {
                                                r = v;
                                                w = p;
                                                break
                                            }
                                        }
                                    }
                                }
                                if (r) {
                                    break
                                }
                                if (!l && B && B[s]) {
                                    l = B[s];
                                    k = p
                                }
                            }
                            if (!r && l) {
                                r = l;
                                w = k
                            }
                            if (r) {
                                o.splice(0, w, r);
                                x = o.join("/")
                            }
                        }
                        return x
                    }

                    function M(l, k) {
                        return function () {
                            return X.apply(T, N.call(arguments, 0).concat([l, k]))
                        }
                    }

                    function g(k) {
                        return function (l) {
                            return F(l, k)
                        }
                    }

                    function S(k) {
                        return function (l) {
                            U[k] = l
                        }
                    }

                    function Q(k) {
                        if (J(V, k)) {
                            var l = V[k];
                            delete V[k];
                            R[k] = true;
                            P.apply(T, l)
                        }
                        if (!J(U, k) && !J(R, k)) {
                            throw new Error("No " + k)
                        }
                        return U[k]
                    }

                    function O(l) {
                        var k, m = l ? l.indexOf("!") : -1;
                        if (m > -1) {
                            k = l.substring(0, m);
                            l = l.substring(m + 1, l.length)
                        }
                        return [k, l]
                    }
                    H = function (n, o) {
                        var m, k = O(n),
                                l = k[0];
                        n = k[1];
                        if (l) {
                            l = F(l, o);
                            m = Q(l)
                        }
                        if (l) {
                            if (m && m.normalize) {
                                n = m.normalize(n, g(o))
                            } else {
                                n = F(n, o)
                            }
                        } else {
                            n = F(n, o);
                            k = O(n);
                            l = k[0];
                            n = k[1];
                            if (l) {
                                m = Q(l)
                            }
                        }
                        return {
                            f: l ? l + "!" + n : n,
                            n: n,
                            pr: l,
                            p: m
                        }
                    };

                    function W(k) {
                        return function () {
                            return (L && L.config && L.config[k]) || {}
                        }
                    }
                    G = {
                        require: function (k) {
                            return M(k)
                        },
                        exports: function (l) {
                            var k = U[l];
                            if (typeof k !== "undefined") {
                                return k
                            } else {
                                return (U[l] = {})
                            }
                        },
                        module: function (k) {
                            return {
                                id: k,
                                uri: "",
                                exports: U[k],
                                config: W(k)
                            }
                        }
                    };
                    P = function (v, k, l, m) {
                        var r, n, q, w, s, p = [],
                                u = typeof l,
                                o;
                        m = m || v;
                        if (u === "undefined" || u === "function") {
                            k = !k.length && l.length ? ["require", "exports", "module"] : k;
                            for (s = 0; s < k.length; s += 1) {
                                w = H(k[s], m);
                                n = w.f;
                                if (n === "require") {
                                    p[s] = G.require(v)
                                } else {
                                    if (n === "exports") {
                                        p[s] = G.exports(v);
                                        o = true
                                    } else {
                                        if (n === "module") {
                                            r = p[s] = G.module(v)
                                        } else {
                                            if (J(U, n) || J(V, n) || J(R, n)) {
                                                p[s] = Q(n)
                                            } else {
                                                if (w.p) {
                                                    w.p.load(w.n, M(m, true), S(n), {});
                                                    p[s] = U[n]
                                                } else {
                                                    throw new Error(v + " missing " + n)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            q = l ? l.apply(U[v], p) : undefined;
                            if (v) {
                                if (r && r.exports !== T && r.exports !== U[v]) {
                                    U[v] = r.exports
                                } else {
                                    if (q !== T || !o) {
                                        U[v] = q
                                    }
                                }
                            }
                        } else {
                            if (v) {
                                U[v] = l
                            }
                        }
                    };
                    c = h = X = function (l, k, o, n, m) {
                        if (typeof l === "string") {
                            if (G[l]) {
                                return G[l](k)
                            }
                            return Q(H(l, k).f)
                        } else {
                            if (!l.splice) {
                                L = l;
                                if (L.deps) {
                                    X(L.deps, L.callback)
                                }
                                if (!k) {
                                    return
                                }
                                if (k.splice) {
                                    l = k;
                                    k = o;
                                    o = null
                                } else {
                                    l = T
                                }
                            }
                        }
                        k = k || function () {};
                        if (typeof o === "function") {
                            o = n;
                            n = m
                        }
                        if (n) {
                            P(T, l, k, o)
                        } else {
                            setTimeout(function () {
                                P(T, l, k, o)
                            }, 4)
                        }
                        return X
                    };
                    X.config = function (k) {
                        return X(k)
                    };
                    c._defined = U;
                    b = function (m, l, k) {
                        if (!l.splice) {
                            k = l;
                            l = []
                        }
                        if (!J(U, m) && !J(V, m)) {
                            V[m] = [m, l, k]
                        }
                    };
                    b.amd = {
                        jQuery: true
                    }
                }());
                a.requirejs = c;
                a.require = h;
                a.define = b
            }
        }());
        a.define("almond", function () {});
        a.define("jquery", [], function () {
            var b = f || $;
            if (b == null && console && console.error) {
                console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page.")
            }
            return b
        });
        a.define("select2/utils", ["jquery"], function (b) {
            var c = {};
            c.Extend = function (q, h) {
                var g = {}.hasOwnProperty;

                function p() {
                    this.constructor = q
                }
                for (var r in h) {
                    if (g.call(h, r)) {
                        q[r] = h[r]
                    }
                }
                p.prototype = h.prototype;
                q.prototype = new p();
                q.__super__ = h.prototype;
                return q
            };

            function k(m) {
                var q = m.prototype;
                var r = [];
                for (var g in q) {
                    var h = q[g];
                    if (typeof h !== "function") {
                        continue
                    }
                    if (g === "constructor") {
                        continue
                    }
                    r.push(g)
                }
                return r
            }
            c.Decorate = function (F, g) {
                var h = k(g);
                var m = k(F);

                function C() {
                    var o = Array.prototype.unshift;
                    var p = g.prototype.constructor.length;
                    var n = F.prototype.constructor;
                    if (p > 0) {
                        o.call(arguments, F.prototype.constructor);
                        n = g.prototype.constructor
                    }
                    n.apply(this, arguments)
                }
                g.displayName = F.displayName;

                function B() {
                    this.constructor = C
                }
                C.prototype = new B();
                for (var x = 0; x < m.length; x++) {
                    var A = m[x];
                    C.prototype[A] = F.prototype[A]
                }
                var D = function (o) {
                    var n = function () {};
                    if (o in C.prototype) {
                        n = C.prototype[o]
                    }
                    var p = g.prototype[o];
                    return function () {
                        var q = Array.prototype.unshift;
                        q.call(arguments, n);
                        return p.apply(this, arguments)
                    }
                };
                for (var E = 0; E < h.length; E++) {
                    var y = h[E];
                    C.prototype[y] = D(y)
                }
                return C
            };
            var l = function () {
                this.listeners = {}
            };
            l.prototype.on = function (h, g) {
                this.listeners = this.listeners || {};
                if (h in this.listeners) {
                    this.listeners[h].push(g)
                } else {
                    this.listeners[h] = [g]
                }
            };
            l.prototype.trigger = function (h) {
                var g = Array.prototype.slice;
                this.listeners = this.listeners || {};
                if (h in this.listeners) {
                    this.invoke(this.listeners[h], g.call(arguments, 1))
                }
                if ("*" in this.listeners) {
                    this.invoke(this.listeners["*"], arguments)
                }
            };
            l.prototype.invoke = function (g, p) {
                for (var h = 0, o = g.length; h < o; h++) {
                    g[h].apply(this, p)
                }
            };
            c.Observable = l;
            c.generateChars = function (p) {
                var g = "";
                for (var h = 0; h < p; h++) {
                    var o = Math.floor(Math.random() * 36);
                    g += o.toString(36)
                }
                return g
            };
            c.bind = function (g, h) {
                return function () {
                    g.apply(h, arguments)
                }
            };
            c._convertData = function (r) {
                for (var s in r) {
                    var u = s.split("-");
                    var h = r;
                    if (u.length === 1) {
                        continue
                    }
                    for (var g = 0; g < u.length; g++) {
                        var v = u[g];
                        v = v.substring(0, 1).toLowerCase() + v.substring(1);
                        if (!(v in h)) {
                            h[v] = {}
                        }
                        if (g == u.length - 1) {
                            h[v] = r[s]
                        }
                        h = h[v]
                    }
                    delete r[s]
                }
                return r
            };
            c.hasScroll = function (g, q) {
                var r = b(q);
                var h = q.style.overflowX;
                var p = q.style.overflowY;
                if (h === p && (p === "hidden" || p === "visible")) {
                    return false
                }
                if (h === "scroll" || p === "scroll") {
                    return true
                }
                return (r.innerHeight() < q.scrollHeight || r.innerWidth() < q.scrollWidth)
            };
            c.escapeMarkup = function (h) {
                var g = {
                    "\\": "&#92;",
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#47;"
                };
                if (typeof h !== "string") {
                    return h
                }
                return String(h).replace(/[&<>"'\/\\]/g, function (n) {
                    return g[n]
                })
            };
            c.appendMany = function (n, g) {
                if (b.fn.jquery.substr(0, 3) === "1.7") {
                    var h = b();
                    b.map(g, function (m) {
                        h = h.add(m)
                    });
                    g = h
                }
                n.append(g)
            };
            return c
        });
        a.define("select2/results", ["jquery", "./utils"], function (b, c) {
            function h(n, m, g) {
                this.$element = n;
                this.data = g;
                this.options = m;
                h.__super__.constructor.call(this)
            }
            c.Extend(h, c.Observable);
            h.prototype.render = function () {
                var g = b('<ul class="select2-results__options" role="tree"></ul>');
                if (this.options.get("multiple")) {
                    g.attr("aria-multiselectable", "true")
                }
                this.$results = g;
                return g
            };
            h.prototype.clear = function () {
                this.$results.empty()
            };
            h.prototype.displayMessage = function (g) {
                var p = this.options.get("escapeMarkup");
                this.clear();
                this.hideLoading();
                var o = b('<li role="treeitem" class="select2-results__option"></li>');
                var n = this.options.get("translations").get(g.message);
                o.append(p(n(g.args)));
                this.$results.append(o)
            };
            h.prototype.append = function (o) {
                this.hideLoading();
                var q = [];
                if (o.results == null || o.results.length === 0) {
                    if (this.$results.children().length === 0) {
                        this.trigger("results:message", {
                            message: "noResults"
                        })
                    }
                    return
                }
                o.results = this.sort(o.results);
                for (var r = 0; r < o.results.length; r++) {
                    var p = o.results[r];
                    var g = this.option(p);
                    q.push(g)
                }
                this.$results.append(q)
            };
            h.prototype.position = function (n, m) {
                var g = m.find(".select2-results");
                g.append(n)
            };
            h.prototype.sort = function (l) {
                var g = this.options.get("sorter");
                return g(l)
            };
            h.prototype.setClasses = function () {
                var g = this;
                this.data.current(function (r) {
                    var p = b.map(r, function (k) {
                        return k.id.toString()
                    });
                    var q = g.$results.find(".select2-results__option[aria-selected]");
                    q.each(function () {
                        var l = b(this);
                        var m = b.data(this, "data");
                        var k = "" + m.id;
                        if ((m.element != null && m.element.selected) || (m.element == null && b.inArray(k, p) > -1)) {
                            l.attr("aria-selected", "true")
                        } else {
                            l.attr("aria-selected", "false")
                        }
                    });
                    var o = q.filter("[aria-selected=true]");
                    if (o.length > 0) {
                        o.first().trigger("mouseenter")
                    } else {
                        q.first().trigger("mouseenter")
                    }
                })
            };
            h.prototype.showLoading = function (n) {
                this.hideLoading();
                var o = this.options.get("translations").get("searching");
                var g = {
                    disabled: true,
                    loading: true,
                    text: o(n)
                };
                var p = this.option(g);
                p.className += " loading-results";
                this.$results.prepend(p)
            };
            h.prototype.hideLoading = function () {
                this.$results.find(".loading-results").remove()
            };
            h.prototype.option = function (B) {
                var A = document.createElement("li");
                A.className = "select2-results__option";
                var G = {
                    role: "treeitem",
                    "aria-selected": "false"
                };
                if (B.disabled) {
                    delete G["aria-selected"];
                    G["aria-disabled"] = "true"
                }
                if (B.id == null) {
                    delete G["aria-selected"]
                }
                if (B._resultId != null) {
                    A.id = B._resultId
                }
                if (B.title) {
                    A.title = B.title
                }
                if (B.children) {
                    G.role = "group";
                    G["aria-label"] = B.text;
                    delete G["aria-selected"]
                }
                for (var y in G) {
                    var C = G[y];
                    A.setAttribute(y, C)
                }
                if (B.children) {
                    var F = b(A);
                    var I = document.createElement("strong");
                    I.className = "select2-results__group";
                    var J = b(I);
                    this.template(B, I);
                    var H = [];
                    for (var g = 0; g < B.children.length; g++) {
                        var D = B.children[g];
                        var E = this.option(D);
                        H.push(E)
                    }
                    var x = b("<ul></ul>", {
                        "class": "select2-results__options select2-results__options--nested"
                    });
                    x.append(H);
                    F.append(I);
                    F.append(x)
                } else {
                    this.template(B, A)
                }
                b.data(A, "data", B);
                return A
            };
            h.prototype.bind = function (p, n) {
                var o = this;
                var g = p.id + "-results";
                this.$results.attr("id", g);
                p.on("results:all", function (k) {
                    o.clear();
                    o.append(k.data);
                    if (p.isOpen()) {
                        o.setClasses()
                    }
                });
                p.on("results:append", function (k) {
                    o.append(k.data);
                    if (p.isOpen()) {
                        o.setClasses()
                    }
                });
                p.on("query", function (k) {
                    o.showLoading(k)
                });
                p.on("select", function () {
                    if (!p.isOpen()) {
                        return
                    }
                    o.setClasses()
                });
                p.on("unselect", function () {
                    if (!p.isOpen()) {
                        return
                    }
                    o.setClasses()
                });
                p.on("open", function () {
                    o.$results.attr("aria-expanded", "true");
                    o.$results.attr("aria-hidden", "false");
                    o.setClasses();
                    o.ensureHighlightVisible()
                });
                p.on("close", function () {
                    o.$results.attr("aria-expanded", "false");
                    o.$results.attr("aria-hidden", "true");
                    o.$results.removeAttr("aria-activedescendant")
                });
                p.on("results:toggle", function () {
                    var k = o.getHighlightedResults();
                    if (k.length === 0) {
                        return
                    }
                    k.trigger("mouseup")
                });
                p.on("results:select", function () {
                    var l = o.getHighlightedResults();
                    if (l.length === 0) {
                        return
                    }
                    var k = l.data("data");
                    if (l.attr("aria-selected") == "true") {
                        o.trigger("close")
                    } else {
                        o.trigger("select", {
                            data: k
                        })
                    }
                });
                p.on("results:previous", function () {
                    var y = o.getHighlightedResults();
                    var A = o.$results.find("[aria-selected]");
                    var w = A.index(y);
                    if (w === 0) {
                        return
                    }
                    var B = w - 1;
                    if (y.length === 0) {
                        B = 0
                    }
                    var x = A.eq(B);
                    x.trigger("mouseenter");
                    var k = o.$results.offset().top;
                    var l = x.offset().top;
                    var m = o.$results.scrollTop() + (l - k);
                    if (B === 0) {
                        o.$results.scrollTop(0)
                    } else {
                        if (l - k < 0) {
                            o.$results.scrollTop(m)
                        }
                    }
                });
                p.on("results:next", function () {
                    var y = o.getHighlightedResults();
                    var A = o.$results.find("[aria-selected]");
                    var w = A.index(y);
                    var B = w + 1;
                    if (B >= A.length) {
                        return
                    }
                    var x = A.eq(B);
                    x.trigger("mouseenter");
                    var k = o.$results.offset().top + o.$results.outerHeight(false);
                    var l = x.offset().top + x.outerHeight(false);
                    var m = o.$results.scrollTop() + l - k;
                    if (B === 0) {
                        o.$results.scrollTop(0)
                    } else {
                        if (l > k) {
                            o.$results.scrollTop(m)
                        }
                    }
                });
                p.on("results:focus", function (k) {
                    k.element.addClass("select2-results__option--highlighted")
                });
                p.on("results:message", function (k) {
                    o.displayMessage(k)
                });
                if (b.fn.mousewheel) {
                    this.$results.on("mousewheel", function (l) {
                        var m = o.$results.scrollTop();
                        var u = (o.$results.get(0).scrollHeight - o.$results.scrollTop() + l.deltaY);
                        var k = l.deltaY > 0 && m - l.deltaY <= 0;
                        var s = l.deltaY < 0 && u <= o.$results.height();
                        if (k) {
                            o.$results.scrollTop(0);
                            l.preventDefault();
                            l.stopPropagation()
                        } else {
                            if (s) {
                                o.$results.scrollTop(o.$results.get(0).scrollHeight - o.$results.height());
                                l.preventDefault();
                                l.stopPropagation()
                            }
                        }
                    })
                }
                this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (m) {
                    var k = b(this);
                    var l = k.data("data");
                    if (k.attr("aria-selected") === "true") {
                        if (o.options.get("multiple")) {
                            o.trigger("unselect", {
                                originalEvent: m,
                                data: l
                            })
                        } else {
                            o.trigger("close")
                        }
                        return
                    }
                    o.trigger("select", {
                        originalEvent: m,
                        data: l
                    })
                });
                this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (l) {
                    var k = b(this).data("data");
                    o.getHighlightedResults().removeClass("select2-results__option--highlighted");
                    o.trigger("results:focus", {
                        data: k,
                        element: b(this)
                    })
                })
            };
            h.prototype.getHighlightedResults = function () {
                var g = this.$results.find(".select2-results__option--highlighted");
                return g
            };
            h.prototype.destroy = function () {
                this.$results.remove()
            };
            h.prototype.ensureHighlightVisible = function () {
                var r = this.getHighlightedResults();
                if (r.length === 0) {
                    return
                }
                var s = this.$results.find("[aria-selected]");
                var q = s.index(r);
                var v = this.$results.offset().top;
                var w = r.offset().top;
                var g = this.$results.scrollTop() + (w - v);
                var u = w - v;
                g -= r.outerHeight(false) * 2;
                if (q <= 2) {
                    this.$results.scrollTop(0)
                } else {
                    if (u > this.$results.outerHeight() || u < 0) {
                        this.$results.scrollTop(g)
                    }
                }
            };
            h.prototype.template = function (p, o) {
                var g = this.options.get("templateResult");
                var q = this.options.get("escapeMarkup");
                var r = g(p);
                if (r == null) {
                    o.style.display = "none"
                } else {
                    if (typeof r === "string") {
                        o.innerHTML = q(r)
                    } else {
                        b(o).append(r)
                    }
                }
            };
            return h
        });
        a.define("select2/keys", [], function () {
            var b = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                ESC: 27,
                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                DELETE: 46
            };
            return b
        });
        a.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (b, c, l) {
            function k(h, g) {
                this.$element = h;
                this.options = g;
                k.__super__.constructor.call(this)
            }
            c.Extend(k, c.Observable);
            k.prototype.render = function () {
                var g = b('<span class="select2-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>');
                this._tabindex = 0;
                if (this.$element.data("old-tabindex") != null) {
                    this._tabindex = this.$element.data("old-tabindex")
                } else {
                    if (this.$element.attr("tabindex") != null) {
                        this._tabindex = this.$element.attr("tabindex")
                    }
                }
                g.attr("title", this.$element.attr("title"));
                g.attr("tabindex", this._tabindex);
                this.$selection = g;
                return g
            };
            k.prototype.bind = function (p, r) {
                var g = this;
                var q = p.id + "-container";
                var h = p.id + "-results";
                this.container = p;
                this.$selection.on("focus", function (m) {
                    g.trigger("focus", m)
                });
                this.$selection.on("blur", function (m) {
                    g.trigger("blur", m)
                });
                this.$selection.on("keydown", function (m) {
                    g.trigger("keypress", m);
                    if (m.which === l.SPACE) {
                        m.preventDefault()
                    }
                });
                p.on("results:focus", function (m) {
                    g.$selection.attr("aria-activedescendant", m.data._resultId)
                });
                p.on("selection:update", function (m) {
                    g.update(m.data)
                });
                p.on("open", function () {
                    g.$selection.attr("aria-expanded", "true");
                    g.$selection.attr("aria-owns", h);
                    g._attachCloseHandler(p)
                });
                p.on("close", function () {
                    g.$selection.attr("aria-expanded", "false");
                    g.$selection.removeAttr("aria-activedescendant");
                    g.$selection.removeAttr("aria-owns");
                    g.$selection.focus();
                    g._detachCloseHandler(p)
                });
                p.on("enable", function () {
                    g.$selection.attr("tabindex", g._tabindex)
                });
                p.on("disable", function () {
                    g.$selection.attr("tabindex", "-1")
                })
            };
            k.prototype._attachCloseHandler = function (h) {
                var g = this;
                b(document.body).on("mousedown.select2." + h.id, function (r) {
                    var q = b(r.target);
                    var u = q.closest(".select2");
                    var s = b(".select2.select2-container--open");
                    s.each(function () {
                        var m = b(this);
                        if (this == u[0]) {
                            return
                        }
                        var n = m.data("element");
                        n.select2("close")
                    })
                })
            };
            k.prototype._detachCloseHandler = function (g) {
                b(document.body).off("mousedown.select2." + g.id)
            };
            k.prototype.position = function (n, g) {
                var h = g.find(".selection");
                h.append(n)
            };
            k.prototype.destroy = function () {
                this._detachCloseHandler(this.container)
            };
            k.prototype.update = function (g) {
                throw new Error("The `update` method must be defined in child classes.")
            };
            return k
        });
        a.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (c, m, l, n) {
            function b() {
                b.__super__.constructor.apply(this, arguments)
            }
            l.Extend(b, m);
            b.prototype.render = function () {
                var g = b.__super__.render.call(this);
                g.addClass("select2-selection--single");
                g.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>');
                return g
            };
            b.prototype.bind = function (h, p) {
                var g = this;
                b.__super__.bind.apply(this, arguments);
                var k = h.id + "-container";
                this.$selection.find(".select2-selection__rendered").attr("id", k);
                this.$selection.attr("aria-labelledby", k);
                this.$selection.on("mousedown", function (o) {
                    if (o.which !== 1) {
                        return
                    }
                    g.trigger("toggle", {
                        originalEvent: o
                    })
                });
                this.$selection.on("focus", function (o) {});
                this.$selection.on("blur", function (o) {});
                h.on("selection:update", function (o) {
                    g.update(o.data)
                })
            };
            b.prototype.clear = function () {
                this.$selection.find(".select2-selection__rendered").empty()
            };
            b.prototype.display = function (k) {
                var g = this.options.get("templateSelection");
                var h = this.options.get("escapeMarkup");
                return h(g(k))
            };
            b.prototype.selectionContainer = function () {
                return c("<span></span>")
            };
            b.prototype.update = function (p) {
                if (p.length === 0) {
                    this.clear();
                    return
                }
                var h = p[0];
                var g = this.display(h);
                var k = this.$selection.find(".select2-selection__rendered");
                k.empty().append(g);
                k.prop("title", h.title || h.text)
            };
            return b
        });
        a.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (b, l, c) {
            function k(h, g) {
                k.__super__.constructor.apply(this, arguments)
            }
            c.Extend(k, l);
            k.prototype.render = function () {
                var g = k.__super__.render.call(this);
                g.addClass("select2-selection--multiple");
                g.html('<ul class="select2-selection__rendered"></ul>');
                return g
            };
            k.prototype.bind = function (n, g) {
                var h = this;
                k.__super__.bind.apply(this, arguments);
                this.$selection.on("click", function (m) {
                    h.trigger("toggle", {
                        originalEvent: m
                    })
                });
                this.$selection.on("click", ".select2-selection__choice__remove", function (s) {
                    var r = b(this);
                    var u = r.parent();
                    var m = u.data("data");
                    h.trigger("unselect", {
                        originalEvent: s,
                        data: m
                    })
                })
            };
            k.prototype.clear = function () {
                this.$selection.find(".select2-selection__rendered").empty()
            };
            k.prototype.display = function (g) {
                var h = this.options.get("templateSelection");
                var n = this.options.get("escapeMarkup");
                return n(h(g))
            };
            k.prototype.selectionContainer = function () {
                var g = b('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                return g
            };
            k.prototype.update = function (v) {
                this.clear();
                if (v.length === 0) {
                    return
                }
                var h = [];
                for (var s = 0; s < v.length; s++) {
                    var g = v[s];
                    var w = this.display(g);
                    var r = this.selectionContainer();
                    r.append(w);
                    r.prop("title", g.title || g.text);
                    r.data("data", g);
                    h.push(r)
                }
                var u = this.$selection.find(".select2-selection__rendered");
                c.appendMany(u, h)
            };
            return k
        });
        a.define("select2/selection/placeholder", ["../utils"], function (b) {
            function c(l, n, m) {
                this.placeholder = this.normalizePlaceholder(m.get("placeholder"));
                l.call(this, n, m)
            }
            c.prototype.normalizePlaceholder = function (l, k) {
                if (typeof k === "string") {
                    k = {
                        id: "",
                        text: k
                    }
                }
                return k
            };
            c.prototype.createPlaceholder = function (m, l) {
                var n = this.selectionContainer();
                n.html(this.display(l));
                n.addClass("select2-selection__placeholder").removeClass("select2-selection__choice");
                return n
            };
            c.prototype.update = function (n, o) {
                var q = (o.length == 1 && o[0].id != this.placeholder.id);
                var p = o.length > 1;
                if (p || q) {
                    return n.call(this, o)
                }
                this.clear();
                var r = this.createPlaceholder(this.placeholder);
                this.$selection.find(".select2-selection__rendered").append(r)
            };
            return c
        });
        a.define("select2/selection/allowClear", ["jquery", "../keys"], function (c, h) {
            function b() {}
            b.prototype.bind = function (n, p, g) {
                var o = this;
                n.call(this, p, g);
                if (this.placeholder == null) {
                    if (this.options.get("debug") && window.console && console.error) {
                        console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option.")
                    }
                }
                this.$selection.on("mousedown", ".select2-selection__clear", function (k) {
                    o._handleClear(k)
                });
                p.on("keypress", function (k) {
                    o._handleKeyboardClear(k, p)
                })
            };
            b.prototype._handleClear = function (q, r) {
                if (this.options.get("disabled")) {
                    return
                }
                var u = this.$selection.find(".select2-selection__clear");
                if (u.length === 0) {
                    return
                }
                r.stopPropagation();
                var g = u.data("data");
                for (var s = 0; s < g.length; s++) {
                    var p = {
                        data: g[s]
                    };
                    this.trigger("unselect", p);
                    if (p.prevented) {
                        return
                    }
                }
                this.$element.val(this.placeholder.id).trigger("change");
                this.trigger("toggle")
            };
            b.prototype._handleKeyboardClear = function (g, m, n) {
                if (n.isOpen()) {
                    return
                }
                if (m.which == h.DELETE || m.which == h.BACKSPACE) {
                    this._handleClear(m)
                }
            };
            b.prototype.update = function (g, m) {
                g.call(this, m);
                if (this.$selection.find(".select2-selection__placeholder").length > 0 || m.length === 0) {
                    return
                }
                var n = c('<span class="select2-selection__clear">&times;</span>');
                n.data("data", m);
                this.$selection.find(".select2-selection__rendered").prepend(n)
            };
            return b
        });
        a.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (b, c, l) {
            function k(g, n, h) {
                g.call(this, n, h)
            }
            k.prototype.render = function (h) {
                var n = b('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></li>');
                this.$searchContainer = n;
                this.$search = n.find("input");
                var g = h.call(this);
                return g
            };
            k.prototype.bind = function (g, o, p) {
                var h = this;
                g.call(this, o, p);
                o.on("open", function () {
                    h.$search.attr("tabindex", 0);
                    h.$search.focus()
                });
                o.on("close", function () {
                    h.$search.attr("tabindex", -1);
                    h.$search.val("");
                    h.$search.focus()
                });
                o.on("enable", function () {
                    h.$search.prop("disabled", false)
                });
                o.on("disable", function () {
                    h.$search.prop("disabled", true)
                });
                this.$selection.on("focusin", ".select2-search--inline", function (m) {
                    h.trigger("focus", m)
                });
                this.$selection.on("focusout", ".select2-search--inline", function (m) {
                    h.trigger("blur", m)
                });
                this.$selection.on("keydown", ".select2-search--inline", function (u) {
                    u.stopPropagation();
                    h.trigger("keypress", u);
                    h._keyUpPrevented = u.isDefaultPrevented();
                    var n = u.which;
                    if (n === l.BACKSPACE && h.$search.val() === "") {
                        var s = h.$searchContainer.prev(".select2-selection__choice");
                        if (s.length > 0) {
                            var m = s.data("data");
                            h.searchRemoveChoice(m);
                            u.preventDefault()
                        }
                    }
                });
                this.$selection.on("input", ".select2-search--inline", function (m) {
                    h.$selection.off("keyup.search")
                });
                this.$selection.on("keyup.search input", ".select2-search--inline", function (m) {
                    h.handleSearch(m)
                })
            };
            k.prototype.createPlaceholder = function (h, g) {
                this.$search.attr("placeholder", g.text)
            };
            k.prototype.update = function (g, h) {
                this.$search.attr("placeholder", "");
                g.call(this, h);
                this.$selection.find(".select2-selection__rendered").append(this.$searchContainer);
                this.resizeSearch()
            };
            k.prototype.handleSearch = function () {
                this.resizeSearch();
                if (!this._keyUpPrevented) {
                    var g = this.$search.val();
                    this.trigger("query", {
                        term: g
                    })
                }
                this._keyUpPrevented = false
            };
            k.prototype.searchRemoveChoice = function (g, h) {
                this.trigger("unselect", {
                    data: h
                });
                this.trigger("open");
                this.$search.val(h.text + " ")
            };
            k.prototype.resizeSearch = function () {
                this.$search.css("width", "25px");
                var h = "";
                if (this.$search.attr("placeholder") !== "") {
                    h = this.$selection.find(".select2-selection__rendered").innerWidth()
                } else {
                    var g = this.$search.val().length + 1;
                    h = (g * 0.75) + "em"
                }
                this.$search.css("width", h)
            };
            return k
        });
        a.define("select2/selection/eventRelay", ["jquery"], function (c) {
            function b() {}
            b.prototype.bind = function (o, s, u) {
                var r = this;
                var q = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"];
                var p = ["opening", "closing", "selecting", "unselecting"];
                o.call(this, s, u);
                s.on("*", function (h, g) {
                    if (c.inArray(h, q) === -1) {
                        return
                    }
                    g = g || {};
                    var k = c.Event("select2:" + h, {
                        params: g
                    });
                    r.$element.trigger(k);
                    if (c.inArray(h, p) === -1) {
                        return
                    }
                    g.prevented = k.isDefaultPrevented()
                })
            };
            return b
        });
        a.define("select2/translation", ["jquery", "require"], function (b, c) {
            function h(g) {
                this.dict = g || {}
            }
            h.prototype.all = function () {
                return this.dict
            };
            h.prototype.get = function (g) {
                return this.dict[g]
            };
            h.prototype.extend = function (g) {
                this.dict = b.extend({}, g.all(), this.dict)
            };
            h._cache = {};
            h.loadPath = function (g) {
                if (!(g in h._cache)) {
                    var l = c(g);
                    h._cache[g] = l
                }
                return new h(h._cache[g])
            };
            return h
        });
        a.define("select2/diacritics", [], function () {
            var b = {
                "\u24B6": "A",
                "\uFF21": "A",
                "\u00C0": "A",
                "\u00C1": "A",
                "\u00C2": "A",
                "\u1EA6": "A",
                "\u1EA4": "A",
                "\u1EAA": "A",
                "\u1EA8": "A",
                "\u00C3": "A",
                "\u0100": "A",
                "\u0102": "A",
                "\u1EB0": "A",
                "\u1EAE": "A",
                "\u1EB4": "A",
                "\u1EB2": "A",
                "\u0226": "A",
                "\u01E0": "A",
                "\u00C4": "A",
                "\u01DE": "A",
                "\u1EA2": "A",
                "\u00C5": "A",
                "\u01FA": "A",
                "\u01CD": "A",
                "\u0200": "A",
                "\u0202": "A",
                "\u1EA0": "A",
                "\u1EAC": "A",
                "\u1EB6": "A",
                "\u1E00": "A",
                "\u0104": "A",
                "\u023A": "A",
                "\u2C6F": "A",
                "\uA732": "AA",
                "\u00C6": "AE",
                "\u01FC": "AE",
                "\u01E2": "AE",
                "\uA734": "AO",
                "\uA736": "AU",
                "\uA738": "AV",
                "\uA73A": "AV",
                "\uA73C": "AY",
                "\u24B7": "B",
                "\uFF22": "B",
                "\u1E02": "B",
                "\u1E04": "B",
                "\u1E06": "B",
                "\u0243": "B",
                "\u0182": "B",
                "\u0181": "B",
                "\u24B8": "C",
                "\uFF23": "C",
                "\u0106": "C",
                "\u0108": "C",
                "\u010A": "C",
                "\u010C": "C",
                "\u00C7": "C",
                "\u1E08": "C",
                "\u0187": "C",
                "\u023B": "C",
                "\uA73E": "C",
                "\u24B9": "D",
                "\uFF24": "D",
                "\u1E0A": "D",
                "\u010E": "D",
                "\u1E0C": "D",
                "\u1E10": "D",
                "\u1E12": "D",
                "\u1E0E": "D",
                "\u0110": "D",
                "\u018B": "D",
                "\u018A": "D",
                "\u0189": "D",
                "\uA779": "D",
                "\u01F1": "DZ",
                "\u01C4": "DZ",
                "\u01F2": "Dz",
                "\u01C5": "Dz",
                "\u24BA": "E",
                "\uFF25": "E",
                "\u00C8": "E",
                "\u00C9": "E",
                "\u00CA": "E",
                "\u1EC0": "E",
                "\u1EBE": "E",
                "\u1EC4": "E",
                "\u1EC2": "E",
                "\u1EBC": "E",
                "\u0112": "E",
                "\u1E14": "E",
                "\u1E16": "E",
                "\u0114": "E",
                "\u0116": "E",
                "\u00CB": "E",
                "\u1EBA": "E",
                "\u011A": "E",
                "\u0204": "E",
                "\u0206": "E",
                "\u1EB8": "E",
                "\u1EC6": "E",
                "\u0228": "E",
                "\u1E1C": "E",
                "\u0118": "E",
                "\u1E18": "E",
                "\u1E1A": "E",
                "\u0190": "E",
                "\u018E": "E",
                "\u24BB": "F",
                "\uFF26": "F",
                "\u1E1E": "F",
                "\u0191": "F",
                "\uA77B": "F",
                "\u24BC": "G",
                "\uFF27": "G",
                "\u01F4": "G",
                "\u011C": "G",
                "\u1E20": "G",
                "\u011E": "G",
                "\u0120": "G",
                "\u01E6": "G",
                "\u0122": "G",
                "\u01E4": "G",
                "\u0193": "G",
                "\uA7A0": "G",
                "\uA77D": "G",
                "\uA77E": "G",
                "\u24BD": "H",
                "\uFF28": "H",
                "\u0124": "H",
                "\u1E22": "H",
                "\u1E26": "H",
                "\u021E": "H",
                "\u1E24": "H",
                "\u1E28": "H",
                "\u1E2A": "H",
                "\u0126": "H",
                "\u2C67": "H",
                "\u2C75": "H",
                "\uA78D": "H",
                "\u24BE": "I",
                "\uFF29": "I",
                "\u00CC": "I",
                "\u00CD": "I",
                "\u00CE": "I",
                "\u0128": "I",
                "\u012A": "I",
                "\u012C": "I",
                "\u0130": "I",
                "\u00CF": "I",
                "\u1E2E": "I",
                "\u1EC8": "I",
                "\u01CF": "I",
                "\u0208": "I",
                "\u020A": "I",
                "\u1ECA": "I",
                "\u012E": "I",
                "\u1E2C": "I",
                "\u0197": "I",
                "\u24BF": "J",
                "\uFF2A": "J",
                "\u0134": "J",
                "\u0248": "J",
                "\u24C0": "K",
                "\uFF2B": "K",
                "\u1E30": "K",
                "\u01E8": "K",
                "\u1E32": "K",
                "\u0136": "K",
                "\u1E34": "K",
                "\u0198": "K",
                "\u2C69": "K",
                "\uA740": "K",
                "\uA742": "K",
                "\uA744": "K",
                "\uA7A2": "K",
                "\u24C1": "L",
                "\uFF2C": "L",
                "\u013F": "L",
                "\u0139": "L",
                "\u013D": "L",
                "\u1E36": "L",
                "\u1E38": "L",
                "\u013B": "L",
                "\u1E3C": "L",
                "\u1E3A": "L",
                "\u0141": "L",
                "\u023D": "L",
                "\u2C62": "L",
                "\u2C60": "L",
                "\uA748": "L",
                "\uA746": "L",
                "\uA780": "L",
                "\u01C7": "LJ",
                "\u01C8": "Lj",
                "\u24C2": "M",
                "\uFF2D": "M",
                "\u1E3E": "M",
                "\u1E40": "M",
                "\u1E42": "M",
                "\u2C6E": "M",
                "\u019C": "M",
                "\u24C3": "N",
                "\uFF2E": "N",
                "\u01F8": "N",
                "\u0143": "N",
                "\u00D1": "N",
                "\u1E44": "N",
                "\u0147": "N",
                "\u1E46": "N",
                "\u0145": "N",
                "\u1E4A": "N",
                "\u1E48": "N",
                "\u0220": "N",
                "\u019D": "N",
                "\uA790": "N",
                "\uA7A4": "N",
                "\u01CA": "NJ",
                "\u01CB": "Nj",
                "\u24C4": "O",
                "\uFF2F": "O",
                "\u00D2": "O",
                "\u00D3": "O",
                "\u00D4": "O",
                "\u1ED2": "O",
                "\u1ED0": "O",
                "\u1ED6": "O",
                "\u1ED4": "O",
                "\u00D5": "O",
                "\u1E4C": "O",
                "\u022C": "O",
                "\u1E4E": "O",
                "\u014C": "O",
                "\u1E50": "O",
                "\u1E52": "O",
                "\u014E": "O",
                "\u022E": "O",
                "\u0230": "O",
                "\u00D6": "O",
                "\u022A": "O",
                "\u1ECE": "O",
                "\u0150": "O",
                "\u01D1": "O",
                "\u020C": "O",
                "\u020E": "O",
                "\u01A0": "O",
                "\u1EDC": "O",
                "\u1EDA": "O",
                "\u1EE0": "O",
                "\u1EDE": "O",
                "\u1EE2": "O",
                "\u1ECC": "O",
                "\u1ED8": "O",
                "\u01EA": "O",
                "\u01EC": "O",
                "\u00D8": "O",
                "\u01FE": "O",
                "\u0186": "O",
                "\u019F": "O",
                "\uA74A": "O",
                "\uA74C": "O",
                "\u01A2": "OI",
                "\uA74E": "OO",
                "\u0222": "OU",
                "\u24C5": "P",
                "\uFF30": "P",
                "\u1E54": "P",
                "\u1E56": "P",
                "\u01A4": "P",
                "\u2C63": "P",
                "\uA750": "P",
                "\uA752": "P",
                "\uA754": "P",
                "\u24C6": "Q",
                "\uFF31": "Q",
                "\uA756": "Q",
                "\uA758": "Q",
                "\u024A": "Q",
                "\u24C7": "R",
                "\uFF32": "R",
                "\u0154": "R",
                "\u1E58": "R",
                "\u0158": "R",
                "\u0210": "R",
                "\u0212": "R",
                "\u1E5A": "R",
                "\u1E5C": "R",
                "\u0156": "R",
                "\u1E5E": "R",
                "\u024C": "R",
                "\u2C64": "R",
                "\uA75A": "R",
                "\uA7A6": "R",
                "\uA782": "R",
                "\u24C8": "S",
                "\uFF33": "S",
                "\u1E9E": "S",
                "\u015A": "S",
                "\u1E64": "S",
                "\u015C": "S",
                "\u1E60": "S",
                "\u0160": "S",
                "\u1E66": "S",
                "\u1E62": "S",
                "\u1E68": "S",
                "\u0218": "S",
                "\u015E": "S",
                "\u2C7E": "S",
                "\uA7A8": "S",
                "\uA784": "S",
                "\u24C9": "T",
                "\uFF34": "T",
                "\u1E6A": "T",
                "\u0164": "T",
                "\u1E6C": "T",
                "\u021A": "T",
                "\u0162": "T",
                "\u1E70": "T",
                "\u1E6E": "T",
                "\u0166": "T",
                "\u01AC": "T",
                "\u01AE": "T",
                "\u023E": "T",
                "\uA786": "T",
                "\uA728": "TZ",
                "\u24CA": "U",
                "\uFF35": "U",
                "\u00D9": "U",
                "\u00DA": "U",
                "\u00DB": "U",
                "\u0168": "U",
                "\u1E78": "U",
                "\u016A": "U",
                "\u1E7A": "U",
                "\u016C": "U",
                "\u00DC": "U",
                "\u01DB": "U",
                "\u01D7": "U",
                "\u01D5": "U",
                "\u01D9": "U",
                "\u1EE6": "U",
                "\u016E": "U",
                "\u0170": "U",
                "\u01D3": "U",
                "\u0214": "U",
                "\u0216": "U",
                "\u01AF": "U",
                "\u1EEA": "U",
                "\u1EE8": "U",
                "\u1EEE": "U",
                "\u1EEC": "U",
                "\u1EF0": "U",
                "\u1EE4": "U",
                "\u1E72": "U",
                "\u0172": "U",
                "\u1E76": "U",
                "\u1E74": "U",
                "\u0244": "U",
                "\u24CB": "V",
                "\uFF36": "V",
                "\u1E7C": "V",
                "\u1E7E": "V",
                "\u01B2": "V",
                "\uA75E": "V",
                "\u0245": "V",
                "\uA760": "VY",
                "\u24CC": "W",
                "\uFF37": "W",
                "\u1E80": "W",
                "\u1E82": "W",
                "\u0174": "W",
                "\u1E86": "W",
                "\u1E84": "W",
                "\u1E88": "W",
                "\u2C72": "W",
                "\u24CD": "X",
                "\uFF38": "X",
                "\u1E8A": "X",
                "\u1E8C": "X",
                "\u24CE": "Y",
                "\uFF39": "Y",
                "\u1EF2": "Y",
                "\u00DD": "Y",
                "\u0176": "Y",
                "\u1EF8": "Y",
                "\u0232": "Y",
                "\u1E8E": "Y",
                "\u0178": "Y",
                "\u1EF6": "Y",
                "\u1EF4": "Y",
                "\u01B3": "Y",
                "\u024E": "Y",
                "\u1EFE": "Y",
                "\u24CF": "Z",
                "\uFF3A": "Z",
                "\u0179": "Z",
                "\u1E90": "Z",
                "\u017B": "Z",
                "\u017D": "Z",
                "\u1E92": "Z",
                "\u1E94": "Z",
                "\u01B5": "Z",
                "\u0224": "Z",
                "\u2C7F": "Z",
                "\u2C6B": "Z",
                "\uA762": "Z",
                "\u24D0": "a",
                "\uFF41": "a",
                "\u1E9A": "a",
                "\u00E0": "a",
                "\u00E1": "a",
                "\u00E2": "a",
                "\u1EA7": "a",
                "\u1EA5": "a",
                "\u1EAB": "a",
                "\u1EA9": "a",
                "\u00E3": "a",
                "\u0101": "a",
                "\u0103": "a",
                "\u1EB1": "a",
                "\u1EAF": "a",
                "\u1EB5": "a",
                "\u1EB3": "a",
                "\u0227": "a",
                "\u01E1": "a",
                "\u00E4": "a",
                "\u01DF": "a",
                "\u1EA3": "a",
                "\u00E5": "a",
                "\u01FB": "a",
                "\u01CE": "a",
                "\u0201": "a",
                "\u0203": "a",
                "\u1EA1": "a",
                "\u1EAD": "a",
                "\u1EB7": "a",
                "\u1E01": "a",
                "\u0105": "a",
                "\u2C65": "a",
                "\u0250": "a",
                "\uA733": "aa",
                "\u00E6": "ae",
                "\u01FD": "ae",
                "\u01E3": "ae",
                "\uA735": "ao",
                "\uA737": "au",
                "\uA739": "av",
                "\uA73B": "av",
                "\uA73D": "ay",
                "\u24D1": "b",
                "\uFF42": "b",
                "\u1E03": "b",
                "\u1E05": "b",
                "\u1E07": "b",
                "\u0180": "b",
                "\u0183": "b",
                "\u0253": "b",
                "\u24D2": "c",
                "\uFF43": "c",
                "\u0107": "c",
                "\u0109": "c",
                "\u010B": "c",
                "\u010D": "c",
                "\u00E7": "c",
                "\u1E09": "c",
                "\u0188": "c",
                "\u023C": "c",
                "\uA73F": "c",
                "\u2184": "c",
                "\u24D3": "d",
                "\uFF44": "d",
                "\u1E0B": "d",
                "\u010F": "d",
                "\u1E0D": "d",
                "\u1E11": "d",
                "\u1E13": "d",
                "\u1E0F": "d",
                "\u0111": "d",
                "\u018C": "d",
                "\u0256": "d",
                "\u0257": "d",
                "\uA77A": "d",
                "\u01F3": "dz",
                "\u01C6": "dz",
                "\u24D4": "e",
                "\uFF45": "e",
                "\u00E8": "e",
                "\u00E9": "e",
                "\u00EA": "e",
                "\u1EC1": "e",
                "\u1EBF": "e",
                "\u1EC5": "e",
                "\u1EC3": "e",
                "\u1EBD": "e",
                "\u0113": "e",
                "\u1E15": "e",
                "\u1E17": "e",
                "\u0115": "e",
                "\u0117": "e",
                "\u00EB": "e",
                "\u1EBB": "e",
                "\u011B": "e",
                "\u0205": "e",
                "\u0207": "e",
                "\u1EB9": "e",
                "\u1EC7": "e",
                "\u0229": "e",
                "\u1E1D": "e",
                "\u0119": "e",
                "\u1E19": "e",
                "\u1E1B": "e",
                "\u0247": "e",
                "\u025B": "e",
                "\u01DD": "e",
                "\u24D5": "f",
                "\uFF46": "f",
                "\u1E1F": "f",
                "\u0192": "f",
                "\uA77C": "f",
                "\u24D6": "g",
                "\uFF47": "g",
                "\u01F5": "g",
                "\u011D": "g",
                "\u1E21": "g",
                "\u011F": "g",
                "\u0121": "g",
                "\u01E7": "g",
                "\u0123": "g",
                "\u01E5": "g",
                "\u0260": "g",
                "\uA7A1": "g",
                "\u1D79": "g",
                "\uA77F": "g",
                "\u24D7": "h",
                "\uFF48": "h",
                "\u0125": "h",
                "\u1E23": "h",
                "\u1E27": "h",
                "\u021F": "h",
                "\u1E25": "h",
                "\u1E29": "h",
                "\u1E2B": "h",
                "\u1E96": "h",
                "\u0127": "h",
                "\u2C68": "h",
                "\u2C76": "h",
                "\u0265": "h",
                "\u0195": "hv",
                "\u24D8": "i",
                "\uFF49": "i",
                "\u00EC": "i",
                "\u00ED": "i",
                "\u00EE": "i",
                "\u0129": "i",
                "\u012B": "i",
                "\u012D": "i",
                "\u00EF": "i",
                "\u1E2F": "i",
                "\u1EC9": "i",
                "\u01D0": "i",
                "\u0209": "i",
                "\u020B": "i",
                "\u1ECB": "i",
                "\u012F": "i",
                "\u1E2D": "i",
                "\u0268": "i",
                "\u0131": "i",
                "\u24D9": "j",
                "\uFF4A": "j",
                "\u0135": "j",
                "\u01F0": "j",
                "\u0249": "j",
                "\u24DA": "k",
                "\uFF4B": "k",
                "\u1E31": "k",
                "\u01E9": "k",
                "\u1E33": "k",
                "\u0137": "k",
                "\u1E35": "k",
                "\u0199": "k",
                "\u2C6A": "k",
                "\uA741": "k",
                "\uA743": "k",
                "\uA745": "k",
                "\uA7A3": "k",
                "\u24DB": "l",
                "\uFF4C": "l",
                "\u0140": "l",
                "\u013A": "l",
                "\u013E": "l",
                "\u1E37": "l",
                "\u1E39": "l",
                "\u013C": "l",
                "\u1E3D": "l",
                "\u1E3B": "l",
                "\u017F": "l",
                "\u0142": "l",
                "\u019A": "l",
                "\u026B": "l",
                "\u2C61": "l",
                "\uA749": "l",
                "\uA781": "l",
                "\uA747": "l",
                "\u01C9": "lj",
                "\u24DC": "m",
                "\uFF4D": "m",
                "\u1E3F": "m",
                "\u1E41": "m",
                "\u1E43": "m",
                "\u0271": "m",
                "\u026F": "m",
                "\u24DD": "n",
                "\uFF4E": "n",
                "\u01F9": "n",
                "\u0144": "n",
                "\u00F1": "n",
                "\u1E45": "n",
                "\u0148": "n",
                "\u1E47": "n",
                "\u0146": "n",
                "\u1E4B": "n",
                "\u1E49": "n",
                "\u019E": "n",
                "\u0272": "n",
                "\u0149": "n",
                "\uA791": "n",
                "\uA7A5": "n",
                "\u01CC": "nj",
                "\u24DE": "o",
                "\uFF4F": "o",
                "\u00F2": "o",
                "\u00F3": "o",
                "\u00F4": "o",
                "\u1ED3": "o",
                "\u1ED1": "o",
                "\u1ED7": "o",
                "\u1ED5": "o",
                "\u00F5": "o",
                "\u1E4D": "o",
                "\u022D": "o",
                "\u1E4F": "o",
                "\u014D": "o",
                "\u1E51": "o",
                "\u1E53": "o",
                "\u014F": "o",
                "\u022F": "o",
                "\u0231": "o",
                "\u00F6": "o",
                "\u022B": "o",
                "\u1ECF": "o",
                "\u0151": "o",
                "\u01D2": "o",
                "\u020D": "o",
                "\u020F": "o",
                "\u01A1": "o",
                "\u1EDD": "o",
                "\u1EDB": "o",
                "\u1EE1": "o",
                "\u1EDF": "o",
                "\u1EE3": "o",
                "\u1ECD": "o",
                "\u1ED9": "o",
                "\u01EB": "o",
                "\u01ED": "o",
                "\u00F8": "o",
                "\u01FF": "o",
                "\u0254": "o",
                "\uA74B": "o",
                "\uA74D": "o",
                "\u0275": "o",
                "\u01A3": "oi",
                "\u0223": "ou",
                "\uA74F": "oo",
                "\u24DF": "p",
                "\uFF50": "p",
                "\u1E55": "p",
                "\u1E57": "p",
                "\u01A5": "p",
                "\u1D7D": "p",
                "\uA751": "p",
                "\uA753": "p",
                "\uA755": "p",
                "\u24E0": "q",
                "\uFF51": "q",
                "\u024B": "q",
                "\uA757": "q",
                "\uA759": "q",
                "\u24E1": "r",
                "\uFF52": "r",
                "\u0155": "r",
                "\u1E59": "r",
                "\u0159": "r",
                "\u0211": "r",
                "\u0213": "r",
                "\u1E5B": "r",
                "\u1E5D": "r",
                "\u0157": "r",
                "\u1E5F": "r",
                "\u024D": "r",
                "\u027D": "r",
                "\uA75B": "r",
                "\uA7A7": "r",
                "\uA783": "r",
                "\u24E2": "s",
                "\uFF53": "s",
                "\u00DF": "s",
                "\u015B": "s",
                "\u1E65": "s",
                "\u015D": "s",
                "\u1E61": "s",
                "\u0161": "s",
                "\u1E67": "s",
                "\u1E63": "s",
                "\u1E69": "s",
                "\u0219": "s",
                "\u015F": "s",
                "\u023F": "s",
                "\uA7A9": "s",
                "\uA785": "s",
                "\u1E9B": "s",
                "\u24E3": "t",
                "\uFF54": "t",
                "\u1E6B": "t",
                "\u1E97": "t",
                "\u0165": "t",
                "\u1E6D": "t",
                "\u021B": "t",
                "\u0163": "t",
                "\u1E71": "t",
                "\u1E6F": "t",
                "\u0167": "t",
                "\u01AD": "t",
                "\u0288": "t",
                "\u2C66": "t",
                "\uA787": "t",
                "\uA729": "tz",
                "\u24E4": "u",
                "\uFF55": "u",
                "\u00F9": "u",
                "\u00FA": "u",
                "\u00FB": "u",
                "\u0169": "u",
                "\u1E79": "u",
                "\u016B": "u",
                "\u1E7B": "u",
                "\u016D": "u",
                "\u00FC": "u",
                "\u01DC": "u",
                "\u01D8": "u",
                "\u01D6": "u",
                "\u01DA": "u",
                "\u1EE7": "u",
                "\u016F": "u",
                "\u0171": "u",
                "\u01D4": "u",
                "\u0215": "u",
                "\u0217": "u",
                "\u01B0": "u",
                "\u1EEB": "u",
                "\u1EE9": "u",
                "\u1EEF": "u",
                "\u1EED": "u",
                "\u1EF1": "u",
                "\u1EE5": "u",
                "\u1E73": "u",
                "\u0173": "u",
                "\u1E77": "u",
                "\u1E75": "u",
                "\u0289": "u",
                "\u24E5": "v",
                "\uFF56": "v",
                "\u1E7D": "v",
                "\u1E7F": "v",
                "\u028B": "v",
                "\uA75F": "v",
                "\u028C": "v",
                "\uA761": "vy",
                "\u24E6": "w",
                "\uFF57": "w",
                "\u1E81": "w",
                "\u1E83": "w",
                "\u0175": "w",
                "\u1E87": "w",
                "\u1E85": "w",
                "\u1E98": "w",
                "\u1E89": "w",
                "\u2C73": "w",
                "\u24E7": "x",
                "\uFF58": "x",
                "\u1E8B": "x",
                "\u1E8D": "x",
                "\u24E8": "y",
                "\uFF59": "y",
                "\u1EF3": "y",
                "\u00FD": "y",
                "\u0177": "y",
                "\u1EF9": "y",
                "\u0233": "y",
                "\u1E8F": "y",
                "\u00FF": "y",
                "\u1EF7": "y",
                "\u1E99": "y",
                "\u1EF5": "y",
                "\u01B4": "y",
                "\u024F": "y",
                "\u1EFF": "y",
                "\u24E9": "z",
                "\uFF5A": "z",
                "\u017A": "z",
                "\u1E91": "z",
                "\u017C": "z",
                "\u017E": "z",
                "\u1E93": "z",
                "\u1E95": "z",
                "\u01B6": "z",
                "\u0225": "z",
                "\u0240": "z",
                "\u2C6C": "z",
                "\uA763": "z",
                "\u0386": "\u0391",
                "\u0388": "\u0395",
                "\u0389": "\u0397",
                "\u038A": "\u0399",
                "\u03AA": "\u0399",
                "\u038C": "\u039F",
                "\u038E": "\u03A5",
                "\u03AB": "\u03A5",
                "\u038F": "\u03A9",
                "\u03AC": "\u03B1",
                "\u03AD": "\u03B5",
                "\u03AE": "\u03B7",
                "\u03AF": "\u03B9",
                "\u03CA": "\u03B9",
                "\u0390": "\u03B9",
                "\u03CC": "\u03BF",
                "\u03CD": "\u03C5",
                "\u03CB": "\u03C5",
                "\u03B0": "\u03C5",
                "\u03C9": "\u03C9",
                "\u03C2": "\u03C3"
            };
            return b
        });
        a.define("select2/data/base", ["../utils"], function (b) {
            function c(l, k) {
                c.__super__.constructor.call(this)
            }
            b.Extend(c, b.Observable);
            c.prototype.current = function (h) {
                throw new Error("The `current` method must be defined in child classes.")
            };
            c.prototype.query = function (l, k) {
                throw new Error("The `query` method must be defined in child classes.")
            };
            c.prototype.bind = function (l, k) {};
            c.prototype.destroy = function () {};
            c.prototype.generateResultId = function (n, m) {
                var l = n.id + "-result-";
                l += b.generateChars(4);
                if (m.id != null) {
                    l += "-" + m.id.toString()
                } else {
                    l += "-" + b.generateChars(4)
                }
                return l
            };
            return c
        });
        a.define("select2/data/select", ["./base", "../utils", "jquery"], function (l, b, c) {
            function k(h, g) {
                this.$element = h;
                this.options = g;
                k.__super__.constructor.call(this)
            }
            b.Extend(k, l);
            k.prototype.current = function (g) {
                var h = [];
                var n = this;
                this.$element.find(":selected").each(function () {
                    var m = c(this);
                    var p = n.item(m);
                    h.push(p)
                });
                g(h)
            };
            k.prototype.select = function (h) {
                var n = this;
                h.selected = true;
                if (c(h.element).is("option")) {
                    h.element.selected = true;
                    this.$element.trigger("change");
                    return
                }
                if (this.$element.prop("multiple")) {
                    this.current(function (u) {
                        var r = [];
                        h = [h];
                        h.push.apply(h, u);
                        for (var s = 0; s < h.length; s++) {
                            var m = h[s].id;
                            if (c.inArray(m, r) === -1) {
                                r.push(m)
                            }
                        }
                        n.$element.val(r);
                        n.$element.trigger("change")
                    })
                } else {
                    var g = h.id;
                    this.$element.val(g);
                    this.$element.trigger("change")
                }
            };
            k.prototype.unselect = function (g) {
                var h = this;
                if (!this.$element.prop("multiple")) {
                    return
                }
                g.selected = false;
                if (c(g.element).is("option")) {
                    g.element.selected = false;
                    this.$element.trigger("change");
                    return
                }
                this.current(function (q) {
                    var s = [];
                    for (var u = 0; u < q.length; u++) {
                        var r = q[u].id;
                        if (r !== g.id && c.inArray(r, s) === -1) {
                            s.push(r)
                        }
                    }
                    h.$element.val(s);
                    h.$element.trigger("change")
                })
            };
            k.prototype.bind = function (n, g) {
                var h = this;
                this.container = n;
                n.on("select", function (m) {
                    h.select(m.data)
                });
                n.on("unselect", function (m) {
                    h.unselect(m.data)
                })
            };
            k.prototype.destroy = function () {
                this.$element.find("*").each(function () {
                    c.removeData(this, "data")
                })
            };
            k.prototype.query = function (r, q) {
                var g = [];
                var h = this;
                var p = this.$element.children();
                p.each(function () {
                    var m = c(this);
                    if (!m.is("option") && !m.is("optgroup")) {
                        return
                    }
                    var o = h.item(m);
                    var n = h.matches(r, o);
                    if (n !== null) {
                        g.push(n)
                    }
                });
                q({
                    results: g
                })
            };
            k.prototype.addOptions = function (g) {
                b.appendMany(this.$element, g)
            };
            k.prototype.option = function (h) {
                var o;
                if (h.children) {
                    o = document.createElement("optgroup");
                    o.label = h.text
                } else {
                    o = document.createElement("option");
                    if (o.textContent !== undefined) {
                        o.textContent = h.text
                    } else {
                        o.innerText = h.text
                    }
                }
                if (h.id) {
                    o.value = h.id
                }
                if (h.disabled) {
                    o.disabled = true
                }
                if (h.selected) {
                    o.selected = true
                }
                if (h.title) {
                    o.title = h.title
                }
                var g = c(o);
                var p = this._normalizeItem(h);
                p.element = o;
                c.data(o, "data", p);
                return g
            };
            k.prototype.item = function (v) {
                var w = {};
                w = c.data(v[0], "data");
                if (w != null) {
                    return w
                }
                if (v.is("option")) {
                    w = {
                        id: v.val(),
                        text: v.text(),
                        disabled: v.prop("disabled"),
                        selected: v.prop("selected"),
                        title: v.prop("title")
                    }
                } else {
                    if (v.is("optgroup")) {
                        w = {
                            text: v.prop("label"),
                            children: [],
                            title: v.prop("title")
                        };
                        var r = v.children("option");
                        var h = [];
                        for (var s = 0; s < r.length; s++) {
                            var g = c(r[s]);
                            var u = this.item(g);
                            h.push(u)
                        }
                        w.children = h
                    }
                }
                w = this._normalizeItem(w);
                w.element = v[0];
                c.data(v[0], "data", w);
                return w
            };
            k.prototype._normalizeItem = function (h) {
                if (!c.isPlainObject(h)) {
                    h = {
                        id: h,
                        text: h
                    }
                }
                h = c.extend({}, {
                    text: ""
                }, h);
                var g = {
                    selected: false,
                    disabled: false
                };
                if (h.id != null) {
                    h.id = h.id.toString()
                }
                if (h.text != null) {
                    h.text = h.text.toString()
                }
                if (h._resultId == null && h.id && this.container != null) {
                    h._resultId = this.generateResultId(this.container, h)
                }
                return c.extend({}, g, h)
            };
            k.prototype.matches = function (g, n) {
                var h = this.options.get("matcher");
                return h(g, n)
            };
            return k
        });
        a.define("select2/data/array", ["./select", "../utils", "jquery"], function (l, c, k) {
            function b(n, h) {
                var g = h.get("data") || [];
                b.__super__.constructor.call(this, n, h);
                this.addOptions(this.convertToOptions(g))
            }
            c.Extend(b, l);
            b.prototype.select = function (h) {
                var g = this.$element.find("option").filter(function (o, p) {
                    return p.value == h.id.toString()
                });
                if (g.length === 0) {
                    g = this.option(h);
                    this.addOptions(g)
                }
                b.__super__.select.call(this, h)
            };
            b.prototype.convertToOptions = function (D) {
                var H = this;
                var A = this.$element.find("option");
                var E = A.map(function () {
                    return H.item(k(this)).id
                }).get();
                var B = [];

                function K(m) {
                    return function () {
                        return k(this).val() == m.id
                    }
                }
                for (var L = 0; L < D.length; L++) {
                    var I = this._normalizeItem(D[L]);
                    if (k.inArray(I.id, E) >= 0) {
                        var h = A.filter(K(I));
                        var g = this.item(h);
                        var G = k.extend(true, {}, g, I);
                        var C = this.option(g);
                        h.replaceWith(C);
                        continue
                    }
                    var F = this.option(I);
                    if (I.children) {
                        var J = this.convertToOptions(I.children);
                        c.appendMany(F, J)
                    }
                    B.push(F)
                }
                return B
            };
            return b
        });
        a.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (b, c, k) {
            function l(h, g) {
                this.ajaxOptions = this._applyDefaults(g.get("ajax"));
                if (this.ajaxOptions.processResults != null) {
                    this.processResults = this.ajaxOptions.processResults
                }
                b.__super__.constructor.call(this, h, g)
            }
            c.Extend(l, b);
            l.prototype._applyDefaults = function (h) {
                var g = {
                    data: function (n) {
                        return {
                            q: n.term
                        }
                    },
                    transport: function (r, s, u) {
                        var q = k.ajax(r);
                        q.then(s);
                        q.fail(u);
                        return q
                    }
                };
                return k.extend({}, g, h, true)
            };
            l.prototype.processResults = function (g) {
                return g
            };
            l.prototype.query = function (s, r) {
                var u = [];
                var q = this;
                if (this._request != null) {
                    if (k.isFunction(this._request.abort)) {
                        this._request.abort()
                    }
                    this._request = null
                }
                var h = k.extend({
                    type: "GET"
                }, this.ajaxOptions);
                if (typeof h.url === "function") {
                    h.url = h.url(s)
                }
                if (typeof h.data === "function") {
                    h.data = h.data(s)
                }

                function g() {
                    var m = h.transport(h, function (n) {
                        var o = q.processResults(n, s);
                        if (q.options.get("debug") && window.console && console.error) {
                            if (!o || !o.results || !k.isArray(o.results)) {
                                console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")
                            }
                        }
                        r(o)
                    }, function () {});
                    q._request = m
                }
                if (this.ajaxOptions.delay && s.term !== "") {
                    if (this._queryTimeout) {
                        window.clearTimeout(this._queryTimeout)
                    }
                    this._queryTimeout = window.setTimeout(g, this.ajaxOptions.delay)
                } else {
                    g()
                }
            };
            return l
        });
        a.define("select2/data/tags", ["jquery"], function (b) {
            function c(A, x, u) {
                var s = u.get("tags");
                var y = u.get("createTag");
                if (y !== undefined) {
                    this.createTag = y
                }
                A.call(this, x, u);
                if (b.isArray(s)) {
                    for (var v = 0; v < s.length; v++) {
                        var r = s[v];
                        var w = this._normalizeItem(r);
                        var B = this.option(w);
                        this.$element.append(B)
                    }
                }
            }
            c.prototype.query = function (q, p, n) {
                var r = this;
                this._removeOldTags();
                if (p.term == null || p.page != null) {
                    q.call(this, p, n);
                    return
                }

                function o(g, l) {
                    var B = g.results;
                    for (var A = 0; A < B.length; A++) {
                        var y = B[A];
                        var k = (y.children != null && !o({
                            results: y.children
                        }, true));
                        var h = y.text === p.term;
                        if (h || k) {
                            if (l) {
                                return false
                            }
                            g.data = B;
                            n(g);
                            return
                        }
                    }
                    if (l) {
                        return true
                    }
                    var x = r.createTag(p);
                    if (x != null) {
                        var m = r.option(x);
                        m.attr("data-select2-tag", true);
                        r.addOptions([m]);
                        r.insertTag(B, x)
                    }
                    g.results = B;
                    n(g)
                }
                q.call(this, p, o)
            };
            c.prototype.createTag = function (m, l) {
                var n = b.trim(l.term);
                if (n === "") {
                    return null
                }
                return {
                    id: n,
                    text: n
                }
            };
            c.prototype.insertTag = function (m, l, n) {
                l.unshift(n)
            };
            c.prototype._removeOldTags = function (l) {
                var m = this._lastTag;
                var n = this.$element.find("option[data-select2-tag]");
                n.each(function () {
                    if (this.selected) {
                        return
                    }
                    b(this).remove()
                })
            };
            return c
        });
        a.define("select2/data/tokenizer", ["jquery"], function (b) {
            function c(m, p, o) {
                var n = o.get("tokenizer");
                if (n !== undefined) {
                    this.tokenizer = n
                }
                m.call(this, p, o)
            }
            c.prototype.bind = function (m, n, l) {
                m.call(this, n, l);
                this.$search = n.dropdown.$search || n.selection.$search || l.find(".select2-search__field")
            };
            c.prototype.query = function (q, p, u) {
                var r = this;

                function s(g) {
                    r.select(g)
                }
                p.term = p.term || "";
                var o = this.tokenizer(p, this.options, s);
                if (o.term !== p.term) {
                    if (this.$search.length) {
                        this.$search.val(o.term);
                        this.$search.focus()
                    }
                    p.term = o.term
                }
                q.call(this, p, u)
            };
            c.prototype.tokenizer = function (x, D, G, H) {
                var C = G.get("tokenSeparators") || [];
                var E = D.term;
                var A = 0;
                var y = this.createTag || function (g) {
                    return {
                        id: g.term,
                        text: g.term
                    }
                };
                while (A < E.length) {
                    var v = E[A];
                    if (b.inArray(v, C) === -1) {
                        A++;
                        continue
                    }
                    var F = E.substr(0, A);
                    var w = b.extend({}, D, {
                        term: F
                    });
                    var B = y(w);
                    H(B);
                    E = E.substr(A + 1) || "";
                    A = 0
                }
                return {
                    term: E
                }
            };
            return c
        });
        a.define("select2/data/minimumInputLength", [], function () {
            function b(c, k, l) {
                this.minimumInputLength = l.get("minimumInputLength");
                c.call(this, k, l)
            }
            b.prototype.query = function (l, k, c) {
                k.term = k.term || "";
                if (k.term.length < this.minimumInputLength) {
                    this.trigger("results:message", {
                        message: "inputTooShort",
                        args: {
                            minimum: this.minimumInputLength,
                            input: k.term,
                            params: k
                        }
                    });
                    return
                }
                l.call(this, k, c)
            };
            return b
        });
        a.define("select2/data/maximumInputLength", [], function () {
            function b(c, k, l) {
                this.maximumInputLength = l.get("maximumInputLength");
                c.call(this, k, l)
            }
            b.prototype.query = function (l, k, c) {
                k.term = k.term || "";
                if (this.maximumInputLength > 0 && k.term.length > this.maximumInputLength) {
                    this.trigger("results:message", {
                        message: "inputTooLong",
                        args: {
                            maximum: this.maximumInputLength,
                            input: k.term,
                            params: k
                        }
                    });
                    return
                }
                l.call(this, k, c)
            };
            return b
        });
        a.define("select2/data/maximumSelectionLength", [], function () {
            function b(c, k, l) {
                this.maximumSelectionLength = l.get("maximumSelectionLength");
                c.call(this, k, l)
            }
            b.prototype.query = function (m, l, c) {
                var n = this;
                this.current(function (h) {
                    var g = h != null ? h.length : 0;
                    if (n.maximumSelectionLength > 0 && g >= n.maximumSelectionLength) {
                        n.trigger("results:message", {
                            message: "maximumSelected",
                            args: {
                                maximum: n.maximumSelectionLength
                            }
                        });
                        return
                    }
                    m.call(n, l, c)
                })
            };
            return b
        });
        a.define("select2/dropdown", ["jquery", "./utils"], function (b, c) {
            function h(l, g) {
                this.$element = l;
                this.options = g;
                h.__super__.constructor.call(this)
            }
            c.Extend(h, c.Observable);
            h.prototype.render = function () {
                var g = b('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                g.attr("dir", this.options.get("dir"));
                this.$dropdown = g;
                return g
            };
            h.prototype.position = function (l, g) {};
            h.prototype.destroy = function () {
                this.$dropdown.remove()
            };
            return h
        });
        a.define("select2/dropdown/search", ["jquery", "../utils"], function (b, c) {
            function h() {}
            h.prototype.render = function (m) {
                var g = m.call(this);
                var n = b('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                this.$searchContainer = n;
                this.$search = n.find("input");
                g.prepend(n);
                return g
            };
            h.prototype.bind = function (n, p, g) {
                var o = this;
                n.call(this, p, g);
                this.$search.on("keydown", function (k) {
                    o.trigger("keypress", k);
                    o._keyUpPrevented = k.isDefaultPrevented()
                });
                this.$search.on("input", function (k) {
                    b(this).off("keyup")
                });
                this.$search.on("keyup input", function (k) {
                    o.handleSearch(k)
                });
                p.on("open", function () {
                    o.$search.attr("tabindex", 0);
                    o.$search.focus();
                    window.setTimeout(function () {
                        o.$search.focus()
                    }, 0)
                });
                p.on("close", function () {
                    o.$search.attr("tabindex", -1);
                    o.$search.val("")
                });
                p.on("results:all", function (k) {
                    if (k.query.term == null || k.query.term === "") {
                        var l = o.showSearch(k);
                        if (l) {
                            o.$searchContainer.removeClass("select2-search--hide")
                        } else {
                            o.$searchContainer.addClass("select2-search--hide")
                        }
                    }
                })
            };
            h.prototype.handleSearch = function (l) {
                if (!this._keyUpPrevented) {
                    var g = this.$search.val();
                    this.trigger("query", {
                        term: g
                    })
                }
                this._keyUpPrevented = false
            };
            h.prototype.showSearch = function (l, g) {
                return true
            };
            return h
        });
        a.define("select2/dropdown/hidePlaceholder", [], function () {
            function b(l, n, m, c) {
                this.placeholder = this.normalizePlaceholder(m.get("placeholder"));
                l.call(this, n, m, c)
            }
            b.prototype.append = function (c, h) {
                h.results = this.removePlaceholder(h.results);
                c.call(this, h)
            };
            b.prototype.normalizePlaceholder = function (h, c) {
                if (typeof c === "string") {
                    c = {
                        id: "",
                        text: c
                    }
                }
                return c
            };
            b.prototype.removePlaceholder = function (p, m) {
                var n = m.slice(0);
                for (var c = m.length - 1; c >= 0; c--) {
                    var o = m[c];
                    if (this.placeholder.id === o.id) {
                        n.splice(c, 1)
                    }
                }
                return n
            };
            return b
        });
        a.define("select2/dropdown/infiniteScroll", ["jquery"], function (b) {
            function c(n, p, o, m) {
                this.lastParams = {};
                n.call(this, p, o, m);
                this.$loadingMore = this.createLoadingMore();
                this.loading = false
            }
            c.prototype.append = function (k, l) {
                this.$loadingMore.remove();
                this.loading = false;
                k.call(this, l);
                if (this.showLoadingMore(l)) {
                    this.$results.append(this.$loadingMore)
                }
            };
            c.prototype.bind = function (n, p, m) {
                var o = this;
                n.call(this, p, m);
                p.on("query", function (g) {
                    o.lastParams = g;
                    o.loading = true
                });
                p.on("query:append", function (g) {
                    o.lastParams = g;
                    o.loading = true
                });
                this.$results.on("scroll", function () {
                    var h = b.contains(document.documentElement, o.$loadingMore[0]);
                    if (o.loading || !h) {
                        return
                    }
                    var k = o.$results.offset().top + o.$results.outerHeight(false);
                    var g = o.$loadingMore.offset().top + o.$loadingMore.outerHeight(false);
                    if (k + 50 >= g) {
                        o.loadMore()
                    }
                })
            };
            c.prototype.loadMore = function () {
                this.loading = true;
                var h = b.extend({}, {
                    page: 1
                }, this.lastParams);
                h.page++;
                this.trigger("query:append", h)
            };
            c.prototype.showLoadingMore = function (l, k) {
                return k.pagination && k.pagination.more
            };
            c.prototype.createLoadingMore = function () {
                var k = b('<li class="option load-more" role="treeitem"></li>');
                var l = this.options.get("translations").get("loadingMore");
                k.html(l(this.lastParams));
                return k
            };
            return c
        });
        a.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (b, c) {
            function h(g, n, m) {
                this.$dropdownParent = m.get("dropdownParent") || document.body;
                g.call(this, n, m)
            }
            h.prototype.bind = function (g, q, r) {
                var o = this;
                var p = false;
                g.call(this, q, r);
                q.on("open", function () {
                    o._showDropdown();
                    o._attachPositioningHandler(q);
                    if (!p) {
                        p = true;
                        q.on("results:all", function () {
                            o._positionDropdown();
                            o._resizeDropdown()
                        });
                        q.on("results:append", function () {
                            o._positionDropdown();
                            o._resizeDropdown()
                        })
                    }
                });
                q.on("close", function () {
                    o._hideDropdown();
                    o._detachPositioningHandler(q)
                });
                this.$dropdownContainer.on("mousedown", function (k) {
                    k.stopPropagation()
                })
            };
            h.prototype.position = function (n, m, g) {
                m.attr("class", g.attr("class"));
                m.removeClass("select2");
                m.addClass("select2-container--open");
                m.css({
                    position: "absolute",
                    top: -999999
                });
                this.$container = g
            };
            h.prototype.render = function (n) {
                var g = b("<span></span>");
                var m = n.call(this);
                g.append(m);
                this.$dropdownContainer = g;
                return g
            };
            h.prototype._hideDropdown = function (g) {
                this.$dropdownContainer.detach()
            };
            h.prototype._attachPositioningHandler = function (r) {
                var q = this;
                var g = "scroll.select2." + r.id;
                var s = "resize.select2." + r.id;
                var u = "orientationchange.select2." + r.id;
                var p = this.$container.parents().filter(c.hasScroll);
                p.each(function () {
                    b(this).data("select2-scroll-position", {
                        x: b(this).scrollLeft(),
                        y: b(this).scrollTop()
                    })
                });
                p.on(g, function (k) {
                    var l = b(this).data("select2-scroll-position");
                    b(this).scrollTop(l.y)
                });
                b(window).on(g + " " + s + " " + u, function (k) {
                    q._positionDropdown();
                    q._resizeDropdown()
                })
            };
            h.prototype._detachPositioningHandler = function (q) {
                var o = "scroll.select2." + q.id;
                var r = "resize.select2." + q.id;
                var g = "orientationchange.select2." + q.id;
                var p = this.$container.parents().filter(c.hasScroll);
                p.off(o);
                b(window).off(o + " " + r + " " + g)
            };
            h.prototype._positionDropdown = function () {
                var C = b(window);
                var F = this.$dropdown.hasClass("select2-dropdown--above");
                var D = this.$dropdown.hasClass("select2-dropdown--below");
                var H = null;
                var A = this.$container.position();
                var B = this.$container.offset();
                B.bottom = B.top + this.$container.outerHeight(false);
                var E = {
                    height: this.$container.outerHeight(false)
                };
                E.top = B.top;
                E.bottom = B.top + E.height;
                var G = {
                    height: this.$dropdown.outerHeight(false)
                };
                var w = {
                    top: C.scrollTop(),
                    bottom: C.scrollTop() + C.height()
                };
                var x = w.top < (B.top - G.height);
                var g = w.bottom > (B.bottom + G.height);
                var y = {
                    left: B.left,
                    top: E.bottom
                };
                if (!F && !D) {
                    H = "below"
                }
                if (!g && x && !F) {
                    H = "above"
                } else {
                    if (!x && g && F) {
                        H = "below"
                    }
                }
                if (H == "above" || (F && H !== "below")) {
                    y.top = E.top - G.height
                }
                if (H != null) {
                    this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + H);
                    this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + H)
                }
                this.$dropdownContainer.css(y)
            };
            h.prototype._resizeDropdown = function () {
                this.$dropdownContainer.width();
                var g = {
                    width: this.$container.outerWidth(false) + "px"
                };
                if (this.options.get("dropdownAutoWidth")) {
                    g.minWidth = g.width;
                    g.width = "auto"
                }
                this.$dropdown.css(g)
            };
            h.prototype._showDropdown = function (g) {
                this.$dropdownContainer.appendTo(this.$dropdownParent);
                this._positionDropdown();
                this._resizeDropdown()
            };
            return h
        });
        a.define("select2/dropdown/minimumResultsForSearch", [], function () {
            function b(n) {
                var o = 0;
                for (var m = 0; m < n.length; m++) {
                    var p = n[m];
                    if (p.children) {
                        o += b(p.children)
                    } else {
                        o++
                    }
                }
                return o
            }

            function c(n, p, o, m) {
                this.minimumResultsForSearch = o.get("minimumResultsForSearch");
                if (this.minimumResultsForSearch < 0) {
                    this.minimumResultsForSearch = Infinity
                }
                n.call(this, p, o, m)
            }
            c.prototype.showSearch = function (l, k) {
                if (b(k.data.results) < this.minimumResultsForSearch) {
                    return false
                }
                return l.call(this, k)
            };
            return c
        });
        a.define("select2/dropdown/selectOnClose", [], function () {
            function b() {}
            b.prototype.bind = function (l, n, c) {
                var m = this;
                l.call(this, n, c);
                n.on("close", function () {
                    m._handleSelectOnClose()
                })
            };
            b.prototype._handleSelectOnClose = function () {
                var c = this.getHighlightedResults();
                if (c.length < 1) {
                    return
                }
                this.trigger("select", {
                    data: c.data("data")
                })
            };
            return b
        });
        a.define("select2/dropdown/closeOnSelect", [], function () {
            function b() {}
            b.prototype.bind = function (l, n, c) {
                var m = this;
                l.call(this, n, c);
                n.on("select", function (g) {
                    m._selectTriggered(g)
                });
                n.on("unselect", function (g) {
                    m._selectTriggered(g)
                })
            };
            b.prototype._selectTriggered = function (c, k) {
                var l = k.originalEvent;
                if (l && l.ctrlKey) {
                    return
                }
                this.trigger("close")
            };
            return b
        });
        a.define("select2/i18n/en", [], function () {
            return {
                errorLoading: function () {
                    return "The results could not be loaded."
                },
                inputTooLong: function (h) {
                    var b = h.input.length - h.maximum;
                    var c = "Please delete " + b + " character";
                    if (b != 1) {
                        c += "s"
                    }
                    return c
                },
                inputTooShort: function (h) {
                    var b = h.minimum - h.input.length;
                    var c = "Please enter " + b + " or more characters";
                    return c
                },
                loadingMore: function () {
                    return "Loading more results…"
                },
                maximumSelected: function (c) {
                    var b = "You can only select " + c.maximum + " item";
                    if (c.maximum != 1) {
                        b += "s"
                    }
                    return b
                },
                noResults: function () {
                    return "No results found"
                },
                searching: function () {
                    return "Searching…"
                }
            }
        });
        a.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function (an, aj, Q, ae, T, N, ak, U, P, ap, R, b, X, V, ao, ad, am, S, c, ag, Y, ah, aa, Z, W, O, ai, al, ac) {
            function ab() {
                this.reset()
            }
            ab.prototype.apply = function (x) {
                x = an.extend({}, this.defaults, x);
                if (x.dataAdapter == null) {
                    if (x.ajax != null) {
                        x.dataAdapter = ao
                    } else {
                        if (x.data != null) {
                            x.dataAdapter = V
                        } else {
                            x.dataAdapter = X
                        }
                    }
                    if (x.minimumInputLength > 0) {
                        x.dataAdapter = ap.Decorate(x.dataAdapter, S)
                    }
                    if (x.maximumInputLength > 0) {
                        x.dataAdapter = ap.Decorate(x.dataAdapter, c)
                    }
                    if (x.maximumSelectionLength > 0) {
                        x.dataAdapter = ap.Decorate(x.dataAdapter, ag)
                    }
                    if (x.tags) {
                        x.dataAdapter = ap.Decorate(x.dataAdapter, ad)
                    }
                    if (x.tokenSeparators != null || x.tokenizer != null) {
                        x.dataAdapter = ap.Decorate(x.dataAdapter, am)
                    }
                    if (x.query != null) {
                        var n = aj(x.amdBase + "compat/query");
                        x.dataAdapter = ap.Decorate(x.dataAdapter, n)
                    }
                    if (x.initSelection != null) {
                        var y = aj(x.amdBase + "compat/initSelection");
                        x.dataAdapter = ap.Decorate(x.dataAdapter, y)
                    }
                }
                if (x.resultsAdapter == null) {
                    x.resultsAdapter = Q;
                    if (x.ajax != null) {
                        x.resultsAdapter = ap.Decorate(x.resultsAdapter, Z)
                    }
                    if (x.placeholder != null) {
                        x.resultsAdapter = ap.Decorate(x.resultsAdapter, aa)
                    }
                    if (x.selectOnClose) {
                        x.resultsAdapter = ap.Decorate(x.resultsAdapter, ai)
                    }
                }
                if (x.dropdownAdapter == null) {
                    if (x.multiple) {
                        x.dropdownAdapter = Y
                    } else {
                        var u = ap.Decorate(Y, ah);
                        x.dropdownAdapter = u
                    }
                    if (x.minimumResultsForSearch !== 0) {
                        x.dropdownAdapter = ap.Decorate(x.dropdownAdapter, O)
                    }
                    if (x.closeOnSelect) {
                        x.dropdownAdapter = ap.Decorate(x.dropdownAdapter, al)
                    }
                    if (x.dropdownCssClass != null || x.dropdownCss != null || x.adaptDropdownCssClass != null) {
                        var v = aj(x.amdBase + "compat/dropdownCss");
                        x.dropdownAdapter = ap.Decorate(x.dropdownAdapter, v)
                    }
                    x.dropdownAdapter = ap.Decorate(x.dropdownAdapter, W)
                }
                if (x.selectionAdapter == null) {
                    if (x.multiple) {
                        x.selectionAdapter = T
                    } else {
                        x.selectionAdapter = ae
                    }
                    if (x.placeholder != null) {
                        x.selectionAdapter = ap.Decorate(x.selectionAdapter, N)
                    }
                    if (x.allowClear) {
                        x.selectionAdapter = ap.Decorate(x.selectionAdapter, ak)
                    }
                    if (x.multiple) {
                        x.selectionAdapter = ap.Decorate(x.selectionAdapter, U)
                    }
                    if (x.containerCssClass != null || x.containerCss != null || x.adaptContainerCssClass != null) {
                        var l = aj(x.amdBase + "compat/containerCss");
                        x.selectionAdapter = ap.Decorate(x.selectionAdapter, l)
                    }
                    x.selectionAdapter = ap.Decorate(x.selectionAdapter, P)
                }
                if (typeof x.language === "string") {
                    if (x.language.indexOf("-") > 0) {
                        var q = x.language.split("-");
                        var o = q[0];
                        x.language = [x.language, o]
                    } else {
                        x.language = [x.language]
                    }
                }
                if (an.isArray(x.language)) {
                    var r = new R();
                    x.language.push("en");
                    var g = x.language;
                    for (var s = 0; s < g.length; s++) {
                        var w = g[s];
                        var p = {};
                        try {
                            p = R.loadPath(w)
                        } catch (m) {
                            try {
                                w = this.defaults.amdLanguageBase + w;
                                p = R.loadPath(w)
                            } catch (h) {
                                if (x.debug && window.console && console.warn) {
                                    console.warn('Select2: The language file for "' + w + '" could not be automatically loaded. A fallback will be used instead.')
                                }
                                continue
                            }
                        }
                        r.extend(p)
                    }
                    x.translations = r
                } else {
                    var k = R.loadPath(this.defaults.amdLanguageBase + "en");
                    var A = new R(x.language);
                    A.extend(k);
                    x.translations = A
                }
                return x
            };
            ab.prototype.reset = function () {
                function g(k) {
                    function l(m) {
                        return b[m] || m
                    }
                    return k.replace(/[^\u0000-\u007E]/g, l)
                }

                function h(m, n) {
                    if (an.trim(m.term) === "") {
                        return n
                    }
                    if (n.children && n.children.length > 0) {
                        var r = an.extend(true, {}, n);
                        for (var k = n.children.length - 1; k >= 0; k--) {
                            var l = n.children[k];
                            var o = h(m, l);
                            if (o == null) {
                                r.children.splice(k, 1)
                            }
                        }
                        if (r.children.length > 0) {
                            return r
                        }
                        return h(m, r)
                    }
                    var p = g(n.text).toUpperCase();
                    var q = g(m.term).toUpperCase();
                    if (p.indexOf(q) > -1) {
                        return n
                    }
                    return null
                }
                this.defaults = {
                    amdBase: "./",
                    amdLanguageBase: "./i18n/",
                    closeOnSelect: true,
                    debug: false,
                    dropdownAutoWidth: false,
                    escapeMarkup: ap.escapeMarkup,
                    language: ac,
                    matcher: h,
                    minimumInputLength: 0,
                    maximumInputLength: 0,
                    maximumSelectionLength: 0,
                    minimumResultsForSearch: 0,
                    selectOnClose: false,
                    sorter: function (k) {
                        return k
                    },
                    templateResult: function (k) {
                        return k.text
                    },
                    templateSelection: function (k) {
                        return k.text
                    },
                    theme: "default",
                    width: "resolve"
                }
            };
            ab.prototype.set = function (l, h) {
                var m = an.camelCase(l);
                var k = {};
                k[m] = h;
                var g = ap._convertData(k);
                an.extend(this.defaults, g)
            };
            var af = new ab();
            return af
        });
        a.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (m, c, b, l) {
            function n(k, h) {
                this.options = k;
                if (h != null) {
                    this.fromElement(h)
                }
                this.options = b.apply(this.options);
                if (h && h.is("input")) {
                    var g = m(this.get("amdBase") + "compat/inputData");
                    this.options.dataAdapter = l.Decorate(this.options.dataAdapter, g)
                }
            }
            n.prototype.fromElement = function (h) {
                var r = ["select2"];
                if (this.options.multiple == null) {
                    this.options.multiple = h.prop("multiple")
                }
                if (this.options.disabled == null) {
                    this.options.disabled = h.prop("disabled")
                }
                if (this.options.language == null) {
                    if (h.prop("lang")) {
                        this.options.language = h.prop("lang").toLowerCase()
                    } else {
                        if (h.closest("[lang]").prop("lang")) {
                            this.options.language = h.closest("[lang]").prop("lang")
                        }
                    }
                }
                if (this.options.dir == null) {
                    if (h.prop("dir")) {
                        this.options.dir = h.prop("dir")
                    } else {
                        if (h.closest("[dir]").prop("dir")) {
                            this.options.dir = h.closest("[dir]").prop("dir")
                        } else {
                            this.options.dir = "ltr"
                        }
                    }
                }
                h.prop("disabled", this.options.disabled);
                h.prop("multiple", this.options.multiple);
                if (h.data("select2Tags")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.')
                    }
                    h.data("data", h.data("select2Tags"));
                    h.data("tags", true)
                }
                if (h.data("ajaxUrl")) {
                    if (this.options.debug && window.console && console.warn) {
                        console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2.")
                    }
                    h.attr("ajax--url", h.data("ajaxUrl"));
                    h.data("ajax--url", h.data("ajaxUrl"))
                }
                var k = {};
                if (c.fn.jquery && c.fn.jquery.substr(0, 2) == "1." && h[0].dataset) {
                    k = c.extend(true, {}, h[0].dataset, h.data())
                } else {
                    k = h.data()
                }
                var q = c.extend(true, {}, k);
                q = l._convertData(q);
                for (var g in q) {
                    if (c.inArray(g, r) > -1) {
                        continue
                    }
                    if (c.isPlainObject(this.options[g])) {
                        c.extend(this.options[g], q[g])
                    } else {
                        this.options[g] = q[g]
                    }
                }
                return this
            };
            n.prototype.get = function (g) {
                return this.options[g]
            };
            n.prototype.set = function (h, g) {
                this.options[h] = g
            };
            return n
        });
        a.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (b, l, c, n) {
            var m = function (h, A) {
                if (h.data("select2") != null) {
                    h.data("select2").destroy()
                }
                this.$element = h;
                this.id = this._generateId(h);
                A = A || {};
                this.options = new l(A, h);
                m.__super__.constructor.call(this);
                var v = h.attr("tabindex") || 0;
                h.data("old-tabindex", v);
                h.attr("tabindex", "-1");
                var w = this.options.get("dataAdapter");
                this.dataAdapter = new w(h, this.options);
                var B = this.render();
                this._placeContainer(B);
                var k = this.options.get("selectionAdapter");
                this.selection = new k(h, this.options);
                this.$selection = this.selection.render();
                this.selection.position(this.$selection, B);
                var y = this.options.get("dropdownAdapter");
                this.dropdown = new y(h, this.options);
                this.$dropdown = this.dropdown.render();
                this.dropdown.position(this.$dropdown, B);
                var x = this.options.get("resultsAdapter");
                this.results = new x(h, this.options, this.dataAdapter);
                this.$results = this.results.render();
                this.results.position(this.$results, this.$dropdown);
                var g = this;
                this._bindAdapters();
                this._registerDomEvents();
                this._registerDataEvents();
                this._registerSelectionEvents();
                this._registerDropdownEvents();
                this._registerResultsEvents();
                this._registerEvents();
                this.dataAdapter.current(function (o) {
                    g.trigger("selection:update", {
                        data: o
                    })
                });
                h.addClass("select2-hidden-accessible");
                h.attr("aria-hidden", "true");
                this._syncAttributes();
                h.data("select2", this)
            };
            c.Extend(m, c.Observable);
            m.prototype._generateId = function (h) {
                var g = "";
                if (h.attr("id") != null) {
                    g = h.attr("id")
                } else {
                    if (h.attr("name") != null) {
                        g = h.attr("name") + "-" + c.generateChars(2)
                    } else {
                        g = c.generateChars(4)
                    }
                }
                g = "select2-" + g;
                return g
            };
            m.prototype._placeContainer = function (g) {
                g.insertAfter(this.$element);
                var h = this._resolveWidth(this.$element, this.options.get("width"));
                if (h != null) {
                    g.css("width", h)
                }
            };
            m.prototype._resolveWidth = function (C, B) {
                var E = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                if (B == "resolve") {
                    var k = this._resolveWidth(C, "style");
                    if (k != null) {
                        return k
                    }
                    return this._resolveWidth(C, "element")
                }
                if (B == "element") {
                    var F = C.outerWidth(false);
                    if (F <= 0) {
                        return "auto"
                    }
                    return F + "px"
                }
                if (B == "style") {
                    var A = C.attr("style");
                    if (typeof (A) !== "string") {
                        return null
                    }
                    var D = A.split(";");
                    for (var h = 0, y = D.length; h < y; h = h + 1) {
                        var G = D[h].replace(/\s/g, "");
                        var g = G.match(E);
                        if (g !== null && g.length >= 1) {
                            return g[1]
                        }
                    }
                    return null
                }
                return B
            };
            m.prototype._bindAdapters = function () {
                this.dataAdapter.bind(this, this.$container);
                this.selection.bind(this, this.$container);
                this.dropdown.bind(this, this.$container);
                this.results.bind(this, this.$container)
            };
            m.prototype._registerDomEvents = function () {
                var g = this;
                this.$element.on("change.select2", function () {
                    g.dataAdapter.current(function (k) {
                        g.trigger("selection:update", {
                            data: k
                        })
                    })
                });
                this._sync = c.bind(this._syncAttributes, this);
                if (this.$element[0].attachEvent) {
                    this.$element[0].attachEvent("onpropertychange", this._sync)
                }
                var h = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (h != null) {
                    this._observer = new h(function (k) {
                        b.each(k, g._sync)
                    });
                    this._observer.observe(this.$element[0], {
                        attributes: true,
                        subtree: false
                    })
                } else {
                    if (this.$element[0].addEventListener) {
                        this.$element[0].addEventListener("DOMAttrModified", g._sync, false)
                    }
                }
            };
            m.prototype._registerDataEvents = function () {
                var g = this;
                this.dataAdapter.on("*", function (h, k) {
                    g.trigger(h, k)
                })
            };
            m.prototype._registerSelectionEvents = function () {
                var h = this;
                var g = ["toggle"];
                this.selection.on("toggle", function () {
                    h.toggleDropdown()
                });
                this.selection.on("*", function (p, k) {
                    if (b.inArray(p, g) !== -1) {
                        return
                    }
                    h.trigger(p, k)
                })
            };
            m.prototype._registerDropdownEvents = function () {
                var g = this;
                this.dropdown.on("*", function (h, k) {
                    g.trigger(h, k)
                })
            };
            m.prototype._registerResultsEvents = function () {
                var g = this;
                this.results.on("*", function (h, k) {
                    g.trigger(h, k)
                })
            };
            m.prototype._registerEvents = function () {
                var g = this;
                this.on("open", function () {
                    g.$container.addClass("select2-container--open")
                });
                this.on("close", function () {
                    g.$container.removeClass("select2-container--open")
                });
                this.on("enable", function () {
                    g.$container.removeClass("select2-container--disabled")
                });
                this.on("disable", function () {
                    g.$container.addClass("select2-container--disabled")
                });
                this.on("focus", function () {
                    g.$container.addClass("select2-container--focus")
                });
                this.on("blur", function () {
                    g.$container.removeClass("select2-container--focus")
                });
                this.on("query", function (h) {
                    if (!g.isOpen()) {
                        g.trigger("open")
                    }
                    this.dataAdapter.query(h, function (k) {
                        g.trigger("results:all", {
                            data: k,
                            query: h
                        })
                    })
                });
                this.on("query:append", function (h) {
                    this.dataAdapter.query(h, function (k) {
                        g.trigger("results:append", {
                            data: k,
                            query: h
                        })
                    })
                });
                this.on("keypress", function (h) {
                    var k = h.which;
                    if (g.isOpen()) {
                        if (k === n.ENTER) {
                            g.trigger("results:select");
                            h.preventDefault()
                        } else {
                            if ((k === n.SPACE && h.ctrlKey)) {
                                g.trigger("results:toggle");
                                h.preventDefault()
                            } else {
                                if (k === n.UP) {
                                    g.trigger("results:previous");
                                    h.preventDefault()
                                } else {
                                    if (k === n.DOWN) {
                                        g.trigger("results:next");
                                        h.preventDefault()
                                    } else {
                                        if (k === n.ESC || k === n.TAB) {
                                            g.close();
                                            h.preventDefault()
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (k === n.ENTER || k === n.SPACE || ((k === n.DOWN || k === n.UP) && h.altKey)) {
                            g.open();
                            h.preventDefault()
                        }
                    }
                })
            };
            m.prototype._syncAttributes = function () {
                this.options.set("disabled", this.$element.prop("disabled"));
                if (this.options.get("disabled")) {
                    if (this.isOpen()) {
                        this.close()
                    }
                    this.trigger("disable")
                } else {
                    this.trigger("enable")
                }
            };
            m.prototype.trigger = function (s, u) {
                var r = m.__super__.trigger;
                var k = {
                    open: "opening",
                    close: "closing",
                    select: "selecting",
                    unselect: "unselecting"
                };
                if (s in k) {
                    var g = k[s];
                    var h = {
                        prevented: false,
                        name: s,
                        args: u
                    };
                    r.call(this, g, h);
                    if (h.prevented) {
                        u.prevented = true;
                        return
                    }
                }
                r.call(this, s, u)
            };
            m.prototype.toggleDropdown = function () {
                if (this.options.get("disabled")) {
                    return
                }
                if (this.isOpen()) {
                    this.close()
                } else {
                    this.open()
                }
            };
            m.prototype.open = function () {
                if (this.isOpen()) {
                    return
                }
                this.trigger("query", {});
                this.trigger("open")
            };
            m.prototype.close = function () {
                if (!this.isOpen()) {
                    return
                }
                this.trigger("close")
            };
            m.prototype.isOpen = function () {
                return this.$container.hasClass("select2-container--open")
            };
            m.prototype.enable = function (h) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.')
                }
                if (h == null || h.length === 0) {
                    h = [true]
                }
                var g = !h[0];
                this.$element.prop("disabled", g)
            };
            m.prototype.data = function () {
                if (this.options.get("debug") && arguments.length > 0 && window.console && console.warn) {
                    console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.')
                }
                var g = [];
                this.dataAdapter.current(function (h) {
                    g = h
                });
                return g
            };
            m.prototype.val = function (g) {
                if (this.options.get("debug") && window.console && console.warn) {
                    console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.')
                }
                if (g == null || g.length === 0) {
                    return this.$element.val()
                }
                var h = g[0];
                if (b.isArray(h)) {
                    h = b.map(h, function (k) {
                        return k.toString()
                    })
                }
                this.$element.val(h).trigger("change")
            };
            m.prototype.destroy = function () {
                this.$container.remove();
                if (this.$element[0].detachEvent) {
                    this.$element[0].detachEvent("onpropertychange", this._sync)
                }
                if (this._observer != null) {
                    this._observer.disconnect();
                    this._observer = null
                } else {
                    if (this.$element[0].removeEventListener) {
                        this.$element[0].removeEventListener("DOMAttrModified", this._sync, false)
                    }
                }
                this._sync = null;
                this.$element.off(".select2");
                this.$element.attr("tabindex", this.$element.data("old-tabindex"));
                this.$element.removeClass("select2-hidden-accessible");
                this.$element.attr("aria-hidden", "false");
                this.$element.removeData("select2");
                this.dataAdapter.destroy();
                this.selection.destroy();
                this.dropdown.destroy();
                this.results.destroy();
                this.dataAdapter = null;
                this.selection = null;
                this.dropdown = null;
                this.results = null
            };
            m.prototype.render = function () {
                var g = b('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                g.attr("dir", this.options.get("dir"));
                this.$container = g;
                this.$container.addClass("select2-container--" + this.options.get("theme"));
                g.data("element", this.$element);
                return g
            };
            return m
        });
        a.define("jquery.select2", ["jquery", "require", "./select2/core", "./select2/defaults"], function (c, l, n, b) {
            l("jquery.mousewheel");
            if (c.fn.select2 == null) {
                var m = ["open", "close", "destroy"];
                c.fn.select2 = function (k) {
                    k = k || {};
                    if (typeof k === "object") {
                        this.each(function () {
                            var o = c.extend({}, k, true);
                            var r = new n(c(this), o)
                        });
                        return this
                    } else {
                        if (typeof k === "string") {
                            var h = this.data("select2");
                            if (h == null && window.console && console.error) {
                                console.error("The select2('" + k + "') method was called on an element that is not using Select2.")
                            }
                            var p = Array.prototype.slice.call(arguments, 1);
                            var g = h[k](p);
                            if (c.inArray(k, m) > -1) {
                                return this
                            }
                            return g
                        } else {
                            throw new Error("Invalid arguments for Select2: " + k)
                        }
                    }
                }
            }
            if (c.fn.select2.defaults == null) {
                c.fn.select2.defaults = b
            }
            return n
        });
        a.define("jquery.mousewheel", ["jquery"], function (b) {
            return b
        });
        return {
            define: a.define,
            require: a.require
        }
    }());
    var e = d.require("jquery.select2");
    f.fn.select2.amd = d;
    return e
}));