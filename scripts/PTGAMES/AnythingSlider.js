/*
 AnythingSlider v1.8.6
 Original by Chris Coyier: http://css-tricks.com
 Get the latest version: https://github.com/ProLoser/AnythingSlider
 
 To use the navigationFormatter function, you must have a function that
 accepts two paramaters, and returns a string of HTML text.
 
 index = integer index (1 based);
 panel = jQuery wrapped LI item this tab references
 @return = Must return a string of HTML/Text
 
 navigationFormatter: function(index, panel){
 return "Panel #" + index; // This would have each tab with the text 'Panel #X' where X = index
 }
 */
(function (b) {
    b.anythingSlider = function (k, a) {
        var h = this,
                g, l;
        h.el = k;
        h.$el = b(k).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');
        h.$el.data("AnythingSlider", h);
        h.init = function () {
            h.options = g = b.extend({}, b.anythingSlider.defaults, a);
            h.initialized = false;
            if (b.isFunction(g.onBeforeInitialize)) {
                h.$el.bind("before_initialize", g.onBeforeInitialize)
            }
            h.$el.trigger("before_initialize", h);
            b('<!--[if lte IE 8]><script>jQuery("body").addClass("as-oldie");<\/script><![endif]-->').appendTo("body").remove();
            h.$wrapper = h.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-" + g.theme);
            h.$window = h.$el.closest("div.anythingWindow");
            h.win = window;
            h.$win = b(h.win);
            h.$controls = b('<div class="anythingControls"></div>');
            h.$nav = b('<ul class="thumbNav"><li><a><span></span></a></li></ul>');
            h.$startStop = b('<a href="#" class="start-stop"></a>');
            if (g.buildStartStop || g.buildNavigation) {
                h.$controls.appendTo((g.appendControlsTo && b(g.appendControlsTo).length) ? b(g.appendControlsTo) : h.$wrapper)
            }
            if (g.buildNavigation) {
                h.$nav.appendTo((g.appendNavigationTo && b(g.appendNavigationTo).length) ? b(g.appendNavigationTo) : h.$controls)
            }
            if (g.buildStartStop) {
                h.$startStop.appendTo((g.appendStartStopTo && b(g.appendStartStopTo).length) ? b(g.appendStartStopTo) : h.$controls)
            }
            h.runTimes = b(".anythingBase").length;
            h.regex = new RegExp("panel" + h.runTimes + "-(\\d+)", "i");
            if (h.runTimes === 1) {
                h.makeActive()
            }
            h.flag = false;
            h.playing = g.autoPlay;
            h.slideshow = false;
            h.hovered = false;
            h.panelSize = [];
            h.currentPage = h.targetPage = g.startPanel = parseInt(g.startPanel, 10) || 1;
            g.changeBy = parseInt(g.changeBy, 10) || 1;
            l = (g.mode || "h").toLowerCase().match(/(h|v|f)/);
            l = g.vertical ? "v" : (l || ["h"])[0];
            g.mode = l === "v" ? "vertical" : l === "f" ? "fade" : "horizontal";
            if (l === "f") {
                g.showMultiple = 1;
                g.infiniteSlides = false
            }
            h.adj = (g.infiniteSlides) ? 0 : 1;
            h.adjustMultiple = 0;
            h.width = h.$el.width();
            h.height = h.$el.height();
            h.outerPad = [h.$wrapper.innerWidth() - h.$wrapper.width(), h.$wrapper.innerHeight() - h.$wrapper.height()];
            if (g.playRtl) {
                h.$wrapper.addClass("rtl")
            }
            if (g.expand) {
                h.$outer = h.$wrapper.parent();
                h.$window.css({
                    width: "100%",
                    height: "100%"
                });
                h.checkResize()
            }
            if (g.buildStartStop) {
                h.buildAutoPlay()
            }
            if (g.buildArrows) {
                h.buildNextBackButtons()
            }
            if (!g.autoPlay) {
                g.autoPlayLocked = false
            }
            h.$lastPage = h.$targetPage = h.$currentPage;
            h.updateSlider();
            if (!b.isFunction(b.easing[g.easing])) {
                g.easing = "swing"
            }
            if (g.pauseOnHover) {
                h.$wrapper.hover(function () {
                    if (h.playing) {
                        h.$el.trigger("slideshow_paused", h);
                        h.clearTimer(true)
                    }
                }, function () {
                    if (h.playing) {
                        h.$el.trigger("slideshow_unpaused", h);
                        h.startStop(h.playing, true)
                    }
                })
            }
            h.slideControls(false);
            h.$wrapper.bind("mouseenter mouseleave", function (d) {
                b(this)[d.type === "mouseenter" ? "addClass" : "removeClass"]("anythingSlider-hovered");
                h.hovered = (d.type === "mouseenter") ? true : false;
                h.slideControls(h.hovered)
            });
            b(document).keyup(function (d) {
                if (g.enableKeyboard && h.$wrapper.hasClass("activeSlider") && !d.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
                    if (g.mode !== "vertical" && (d.which === 38 || d.which === 40)) {
                        return
                    }
                    switch (d.which) {
                        case 39:
                        case 40:
                            h.goForward();
                            break;
                        case 37:
                        case 38:
                            h.goBack();
                            break
                    }
                }
            });
            h.currentPage = h.gotoHash() || g.startPanel || 1;
            h.gotoPage(h.currentPage, false, null, -1);
            var c = "slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
            b.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function (e, d) {
                if (b.isFunction(g[d])) {
                    h.$el.bind(c[e], g[d])
                }
            });
            if (b.isFunction(g.onSlideComplete)) {
                h.$el.bind("slide_complete", function () {
                    setTimeout(function () {
                        g.onSlideComplete(h)
                    }, 0);
                    return false
                })
            }
            h.initialized = true;
            h.$el.trigger("initialized", h);
            h.startStop(g.autoPlay)
        };
        h.updateSlider = function () {
            h.$el.children(".cloned").remove();
            h.navTextVisible = h.$nav.find("span:first").css("visibility") !== "hidden";
            h.$nav.empty();
            h.currentPage = h.currentPage || 1;
            h.$items = h.$el.children();
            h.pages = h.$items.length;
            h.dir = (g.mode === "vertical") ? "top" : "left";
            g.showMultiple = (g.mode === "vertical") ? 1 : parseInt(g.showMultiple, 10) || 1;
            g.navigationSize = (g.navigationSize === false) ? 0 : parseInt(g.navigationSize, 10) || 0;
            h.$items.find("a").unbind("focus.AnythingSlider").bind("focus.AnythingSlider", function (d) {
                var f = b(this).closest(".panel"),
                        e = h.$items.index(f) + h.adj;
                h.$items.find(".focusedLink").removeClass("focusedLink");
                b(this).addClass("focusedLink");
                h.$window.scrollLeft(0).scrollTop(0);
                if ((e !== -1 && (e >= h.currentPage + g.showMultiple || e < h.currentPage))) {
                    h.gotoPage(e);
                    d.preventDefault()
                }
            });
            if (g.showMultiple > 1) {
                if (g.showMultiple > h.pages) {
                    g.showMultiple = h.pages
                }
                h.adjustMultiple = (g.infiniteSlides && h.pages > 1) ? 0 : g.showMultiple - 1
            }
            h.$controls.add(h.$nav).add(h.$startStop).add(h.$forward).add(h.$back)[(h.pages <= 1) ? "hide" : "show"]();
            if (h.pages > 1) {
                h.buildNavigation()
            }
            if (g.mode !== "fade" && g.infiniteSlides && h.pages > 1) {
                h.$el.prepend(h.$items.filter(":last").clone().addClass("cloned"));
                if (g.showMultiple > 1) {
                    h.$el.append(h.$items.filter(":lt(" + g.showMultiple + ")").clone().addClass("cloned multiple"))
                } else {
                    h.$el.append(h.$items.filter(":first").clone().addClass("cloned"))
                }
                h.$el.find(".cloned").each(function () {
                    b(this).find("a,input,textarea,select,button,area,form").attr({
                        disabled: "disabled",
                        name: ""
                    });
                    b(this).find("[id]").andSelf().removeAttr("id")
                })
            }
            h.$items = h.$el.addClass(g.mode).children().addClass("panel");
            h.setDimensions();
            if (g.resizeContents) {
                h.$items.css("width", h.width);
                h.$wrapper.css("width", h.getDim(h.currentPage)[0]).add(h.$items).css("height", h.height)
            } else {
                h.$win.load(function () {
                    h.setDimensions();
                    c = h.getDim(h.currentPage);
                    h.$wrapper.css({
                        width: c[0],
                        height: c[1]
                    });
                    h.setCurrentPage(h.currentPage, false)
                })
            }
            if (h.currentPage > h.pages) {
                h.currentPage = h.pages
            }
            h.setCurrentPage(h.currentPage, false);
            h.$nav.find("a").eq(h.currentPage - 1).addClass("cur");
            if (g.mode === "fade") {
                var c = h.$items.eq(h.currentPage - 1);
                if (g.resumeOnVisible) {
                    c.css({
                        opacity: 1
                    }).siblings().css({
                        opacity: 0
                    })
                } else {
                    h.$items.css("opacity", 1);
                    c.fadeIn(0).siblings().fadeOut(0)
                }
            }
        };
        h.buildNavigation = function () {
            if (g.buildNavigation && (h.pages > 1)) {
                var n, c, e, f, d;
                h.$items.filter(":not(.cloned)").each(function (m) {
                    d = b("<li/>");
                    e = m + 1;
                    c = (e === 1 ? " first" : "") + (e === h.pages ? " last" : "");
                    n = '<a class="panel' + e + (h.navTextVisible ? '"' : " " + g.tooltipClass + '" title="@"') + ' href="#"><span>@</span></a>';
                    if (b.isFunction(g.navigationFormatter)) {
                        f = g.navigationFormatter(e, b(this));
                        if (typeof (f) === "string") {
                            d.html(n.replace(/@/g, f))
                        } else {
                            d = b("<li/>", f)
                        }
                    } else {
                        d.html(n.replace(/@/g, e))
                    }
                    d.appendTo(h.$nav).addClass(c).data("index", e)
                });
                h.$nav.children("li").bind(g.clickControls, function (m) {
                    if (!h.flag && g.enableNavigation) {
                        h.flag = true;
                        setTimeout(function () {
                            h.flag = false
                        }, 100);
                        h.gotoPage(b(this).data("index"))
                    }
                    m.preventDefault()
                });
                if (!!g.navigationSize && g.navigationSize < h.pages) {
                    if (!h.$controls.find(".anythingNavWindow").length) {
                        h.$nav.before('<ul><li class="prev"><a href="#"><span>' + g.backText + "</span></a></li></ul>").after('<ul><li class="next"><a href="#"><span>' + g.forwardText + "</span></a></li></ul>").wrap('<div class="anythingNavWindow"></div>')
                    }
                    h.navWidths = h.$nav.find("li").map(function () {
                        return b(this).outerWidth(true) + Math.ceil(parseInt(b(this).find("span").css("left"), 10) / 2 || 0)
                    }).get();
                    h.navLeft = h.currentPage;
                    h.$nav.width(h.navWidth(1, h.pages + 1) + 25);
                    h.$controls.find(".anythingNavWindow").width(h.navWidth(1, g.navigationSize + 1)).end().find(".prev,.next").bind(g.clickControls, function (m) {
                        if (!h.flag) {
                            h.flag = true;
                            setTimeout(function () {
                                h.flag = false
                            }, 200);
                            h.navWindow(h.navLeft + g.navigationSize * (b(this).is(".prev") ? -1 : 1))
                        }
                        m.preventDefault()
                    })
                }
            }
        };
        h.navWidth = function (o, p) {
            var e, d = Math.min(o, p),
                    c = Math.max(o, p),
                    f = 0;
            for (e = d; e < c; e++) {
                f += h.navWidths[e - 1] || 0
            }
            return f
        };
        h.navWindow = function (c) {
            if (!!g.navigationSize && g.navigationSize < h.pages && h.navWidths) {
                var d = h.pages - g.navigationSize + 1;
                c = (c <= 1) ? 1 : (c > 1 && c < d) ? c : d;
                if (c !== h.navLeft) {
                    h.$controls.find(".anythingNavWindow").animate({
                        scrollLeft: h.navWidth(1, c),
                        width: h.navWidth(c, c + g.navigationSize)
                    }, {
                        queue: false,
                        duration: g.animationTime
                    });
                    h.navLeft = c
                }
            }
        };
        h.buildNextBackButtons = function () {
            h.$forward = b('<span class="arrow forward"><a href="#"><span>' + g.forwardText + "</span></a></span>");
            h.$back = b('<span class="arrow back"><a href="#"><span>' + g.backText + "</span></a></span>");
            h.$back.bind(g.clickBackArrow, function (c) {
                if (g.enableArrows && !h.flag) {
                    h.flag = true;
                    setTimeout(function () {
                        h.flag = false
                    }, 100);
                    h.goBack()
                }
                c.preventDefault()
            });
            h.$forward.bind(g.clickForwardArrow, function (c) {
                if (g.enableArrows && !h.flag) {
                    h.flag = true;
                    setTimeout(function () {
                        h.flag = false
                    }, 100);
                    h.goForward()
                }
                c.preventDefault()
            });
            h.$back.add(h.$forward).find("a").bind("focusin focusout", function () {
                b(this).toggleClass("hover")
            });
            h.$back.appendTo((g.appendBackTo && b(g.appendBackTo).length) ? b(g.appendBackTo) : h.$wrapper);
            h.$forward.appendTo((g.appendForwardTo && b(g.appendForwardTo).length) ? b(g.appendForwardTo) : h.$wrapper);
            h.arrowWidth = h.$forward.width();
            h.arrowRight = parseInt(h.$forward.css("right"), 10);
            h.arrowLeft = parseInt(h.$back.css("left"), 10)
        };
        h.buildAutoPlay = function () {
            h.$startStop.html("<span>" + (h.playing ? g.stopText : g.startText) + "</span>").bind(g.clickSlideshow, function (c) {
                if (g.enableStartStop) {
                    h.startStop(!h.playing);
                    h.makeActive();
                    if (h.playing && !g.autoPlayDelayed) {
                        h.goForward(true)
                    }
                }
                c.preventDefault()
            }).bind("focusin focusout", function () {
                b(this).toggleClass("hover")
            })
        };
        h.checkResize = function (c) {
            clearTimeout(h.resizeTimer);
            h.resizeTimer = setTimeout(function () {
                var e = h.$outer.width() - h.outerPad[0],
                        d = (h.$outer[0].tagName === "BODY" ? h.$win.height() : h.$outer.height()) - h.outerPad[1];
                if (h.width * g.showMultiple !== e || h.height !== d) {
                    h.setDimensions();
                    h.gotoPage(h.currentPage, h.playing, null, -1)
                }
                if (typeof (c) === "undefined") {
                    h.checkResize()
                }
            }, 500)
        };
        h.setDimensions = function () {
            var f, u, r, d, s = 0,
                    e = {
                        width: "100%",
                        height: "100%"
                    },
            v = (g.showMultiple > 1) ? h.width || h.$window.width() / g.showMultiple : h.$window.width(),
                    c = h.$win.width();
            if (g.expand) {
                f = h.$outer.width() - h.outerPad[0];
                h.height = u = h.$outer.height() - h.outerPad[1];
                h.$wrapper.add(h.$window).add(h.$items).css({
                    width: f,
                    height: u
                });
                h.width = v = (g.showMultiple > 1) ? f / g.showMultiple : f
            }
            h.$items.each(function (m) {
                d = b(this);
                r = d.children();
                if (g.resizeContents) {
                    f = h.width;
                    u = h.height;
                    d.css({
                        width: f,
                        height: u
                    });
                    if (r.length) {
                        if (r[0].tagName === "EMBED") {
                            r.attr(e)
                        }
                        if (r[0].tagName === "OBJECT") {
                            r.find("embed").attr(e)
                        }
                        if (r.length === 1) {
                            r.css(e)
                        }
                    }
                } else {
                    f = d.width() || h.width;
                    if (r.length === 1 && f >= c) {
                        f = (r.width() >= c) ? v : r.width();
                        r.css("max-width", f)
                    }
                    d.css("width", f);
                    u = (r.length === 1 ? r.outerHeight(true) : d.height());
                    if (u <= h.outerPad[1]) {
                        u = h.height
                    }
                    d.css("height", u)
                }
                h.panelSize[m] = [f, u, s];
                s += (g.mode === "vertical") ? u : f
            });
            h.$el.css((g.mode === "vertical" ? "height" : "width"), g.mode === "fade" ? h.width : s)
        };
        h.getDim = function (c) {
            var e, f = h.width,
                    d = h.height;
            if (h.pages < 1 || isNaN(c)) {
                return [f, d]
            }
            c = (g.infiniteSlides && h.pages > 1) ? c : c - 1;
            e = h.panelSize[c];
            if (e) {
                f = e[0] || f;
                d = e[1] || d
            }
            if (g.showMultiple > 1) {
                for (e = 1; e < g.showMultiple; e++) {
                    f += h.panelSize[(c + e)][0];
                    d = Math.max(d, h.panelSize[c + e][1])
                }
            }
            return [f, d]
        };
        h.goForward = function (c) {
            h.gotoPage(h[g.allowRapidChange ? "targetPage" : "currentPage"] + g.changeBy * (g.playRtl ? -1 : 1), c)
        };
        h.goBack = function (c) {
            h.gotoPage(h[g.allowRapidChange ? "targetPage" : "currentPage"] + g.changeBy * (g.playRtl ? 1 : -1), c)
        };
        h.gotoPage = function (e, f, c, d) {
            if (f !== true) {
                f = false;
                h.startStop(false);
                h.makeActive()
            }
            if (/^[#|.]/.test(e) && b(e).length) {
                e = b(e).closest(".panel").index() + h.adj
            }
            if (g.changeBy !== 1) {
                var n = h.pages - h.adjustMultiple;
                if (e < 1) {
                    e = g.stopAtEnd ? 1 : (g.infiniteSlides ? h.pages + e : (g.showMultiple > 1 - e ? 1 : n))
                }
                if (e > h.pages) {
                    e = g.stopAtEnd ? h.pages : (g.showMultiple > 1 - e ? 1 : e -= n)
                } else {
                    if (e >= n) {
                        e = n
                    }
                }
            }
            if (h.pages <= 1) {
                return
            }
            h.$lastPage = h.$currentPage;
            if (typeof (e) !== "number") {
                e = parseInt(e, 10) || g.startPanel;
                h.setCurrentPage(e)
            }
            if (f && g.isVideoPlaying(h)) {
                return
            }
            h.exactPage = e;
            if (e > h.pages + 1 - h.adj) {
                e = (!g.infiniteSlides && !g.stopAtEnd) ? 1 : h.pages
            }
            if (e < h.adj) {
                e = (!g.infiniteSlides && !g.stopAtEnd) ? h.pages : 1
            }
            if (!g.infiniteSlides) {
                h.exactPage = e
            }
            h.currentPage = (e > h.pages) ? h.pages : (e < 1) ? 1 : h.currentPage;
            h.$currentPage = h.$items.eq(h.currentPage - h.adj);
            h.targetPage = (e === 0) ? h.pages : (e > h.pages) ? 1 : e;
            h.$targetPage = h.$items.eq(h.targetPage - h.adj);
            d = typeof d !== "undefined" ? d : g.animationTime;
            if (d >= 0) {
                h.$el.trigger("slide_init", h)
            }
            if (d > 0) {
                h.slideControls(true)
            }
            if (g.buildNavigation) {
                h.setNavigation(h.targetPage)
            }
            if (f !== true) {
                f = false
            }
            if (!f || (g.stopAtEnd && e === h.pages)) {
                h.startStop(false)
            }
            if (d >= 0) {
                h.$el.trigger("slide_begin", h)
            }
            setTimeout(function (m) {
                var p, r = true;
                if (g.allowRapidChange) {
                    h.$wrapper.add(h.$el).add(h.$items).stop(true, true)
                }
                if (!g.resizeContents) {
                    p = h.getDim(e);
                    m = {};
                    if (h.$wrapper.width() !== p[0]) {
                        m.width = p[0] || h.width;
                        r = false
                    }
                    if (h.$wrapper.height() !== p[1]) {
                        m.height = p[1] || h.height;
                        r = false
                    }
                    if (!r) {
                        h.$wrapper.filter(":not(:animated)").animate(m, {
                            queue: false,
                            duration: (d < 0 ? 0 : d),
                            easing: g.easing
                        })
                    }
                }
                if (g.mode === "fade") {
                    if (h.$lastPage[0] !== h.$targetPage[0]) {
                        h.fadeIt(h.$lastPage, 0, d);
                        h.fadeIt(h.$targetPage, 1, d, function () {
                            h.endAnimation(e, c, d)
                        })
                    } else {
                        h.endAnimation(e, c, d)
                    }
                } else {
                    m = {};
                    m[h.dir] = -h.panelSize[(g.infiniteSlides && h.pages > 1) ? e : e - 1][2];
                    h.$el.filter(":not(:animated)").animate(m, {
                        queue: false,
                        duration: d < 0 ? 0 : d,
                        easing: g.easing,
                        complete: function () {
                            h.endAnimation(e, c, d)
                        }
                    })
                }
            }, parseInt(g.delayBeforeAnimate, 10) || 0)
        };
        h.endAnimation = function (e, c, d) {
            if (e === 0) {
                h.$el.css(h.dir, g.mode === "fade" ? 0 : -h.panelSize[h.pages][2]);
                e = h.pages
            } else {
                if (e > h.pages) {
                    h.$el.css(h.dir, g.mode === "fade" ? 0 : -h.panelSize[1][2]);
                    e = 1
                }
            }
            h.exactPage = e;
            h.setCurrentPage(e, false);
            if (g.mode === "fade") {
                h.fadeIt(h.$items.not(":eq(" + (e - h.adj) + ")"), 0, 0)
            }
            if (!h.hovered) {
                h.slideControls(false)
            }
            if (g.hashTags) {
                h.setHash(e)
            }
            if (d >= 0) {
                h.$el.trigger("slide_complete", h)
            }
            if (typeof c === "function") {
                c(h)
            }
            if (g.autoPlayLocked && !h.playing) {
                setTimeout(function () {
                    h.startStop(true)
                }, g.resumeDelay - (g.autoPlayDelayed ? g.delay : 0))
            }
        };
        h.fadeIt = function (e, n, d, c) {
            var f = d < 0 ? 0 : d;
            if (g.resumeOnVisible) {
                e.filter(":not(:animated)").fadeTo(f, n, c)
            } else {
                e.filter(":not(:animated)")[n === 0 ? "fadeOut" : "fadeIn"](f, c)
            }
        };
        h.setCurrentPage = function (d, e) {
            d = parseInt(d, 10);
            if (h.pages < 1 || d === 0 || isNaN(d)) {
                return
            }
            if (d > h.pages + 1 - h.adj) {
                d = h.pages - h.adj
            }
            if (d < h.adj) {
                d = 1
            }
            if (g.buildArrows && !g.infiniteSlides && g.stopAtEnd) {
                h.$forward[d === h.pages - h.adjustMultiple ? "addClass" : "removeClass"]("disabled");
                h.$back[d === 1 ? "addClass" : "removeClass"]("disabled");
                if (d === h.pages && h.playing) {
                    h.startStop()
                }
            }
            if (!e) {
                var c = h.getDim(d);
                h.$wrapper.css({
                    width: c[0],
                    height: c[1]
                }).add(h.$window).scrollLeft(0).scrollTop(0);
                h.$el.css(h.dir, g.mode === "fade" ? 0 : -h.panelSize[(g.infiniteSlides && h.pages > 1) ? d : d - 1][2])
            }
            h.currentPage = d;
            h.$currentPage = h.$items.removeClass("activePage").eq(d - h.adj).addClass("activePage");
            if (g.buildNavigation) {
                h.setNavigation(d)
            }
        };
        h.setNavigation = function (c) {
            h.$nav.find(".cur").removeClass("cur").end().find("a").eq(c - 1).addClass("cur")
        };
        h.makeActive = function () {
            if (!h.$wrapper.hasClass("activeSlider")) {
                b(".activeSlider").removeClass("activeSlider");
                h.$wrapper.addClass("activeSlider")
            }
        };
        h.gotoHash = function () {
            var e = h.win.location.hash,
                    f = e.indexOf("&"),
                    c = e.match(h.regex);
            if (c === null && !/^#&/.test(e) && !/#!?\//.test(e)) {
                e = e.substring(0, (f >= 0 ? f : e.length));
                try {
                    c = (b(e).length && b(e).closest(".anythingBase")[0] === h.el) ? h.$items.index(b(e).closest(".panel")) + h.adj : null
                } catch (d) {
                    c = null
                }
            } else {
                if (c !== null) {
                    c = (g.hashTags) ? parseInt(c[1], 10) : null
                }
            }
            return c
        };
        h.setHash = function (c) {
            var d = "panel" + h.runTimes + "-",
                    e = h.win.location.hash;
            if (typeof e !== "undefined") {
                h.win.location.hash = (e.indexOf(d) > 0) ? e.replace(h.regex, d + c) : e + "&" + d + c
            }
        };
        h.slideControls = function (o) {
            var e = (o) ? "slideDown" : "slideUp",
                    c = (o) ? 0 : g.animationTime,
                    d = (o) ? g.animationTime : 0,
                    p = (o) ? 1 : 0,
                    f = (o) ? 0 : 1;
            if (g.toggleControls) {
                h.$controls.stop(true, true).delay(c)[e](g.animationTime / 2).delay(d)
            }
            if (g.buildArrows && g.toggleArrows) {
                if (!h.hovered && h.playing) {
                    f = 1;
                    p = 0
                }
                h.$forward.stop(true, true).delay(c).animate({
                    right: h.arrowRight + (f * h.arrowWidth),
                    opacity: p
                }, g.animationTime / 2);
                h.$back.stop(true, true).delay(c).animate({
                    left: h.arrowLeft + (f * h.arrowWidth),
                    opacity: p
                }, g.animationTime / 2)
            }
        };
        h.clearTimer = function (c) {
            if (h.timer) {
                h.win.clearInterval(h.timer);
                if (!c && h.slideshow) {
                    h.$el.trigger("slideshow_stop", h);
                    h.slideshow = false
                }
            }
        };
        h.startStop = function (c, d) {
            if (c !== true) {
                c = false
            }
            h.playing = c;
            if (c && !d) {
                h.$el.trigger("slideshow_start", h);
                h.slideshow = true
            }
            if (g.buildStartStop) {
                h.$startStop.toggleClass("playing", c).find("span").html(c ? g.stopText : g.startText);
                if (h.$startStop.find("span").css("visibility") === "hidden") {
                    h.$startStop.addClass(g.tooltipClass).attr("title", c ? g.stopText : g.startText)
                }
            }
            if (c) {
                h.clearTimer(true);
                h.timer = h.win.setInterval(function () {
                    if (!g.isVideoPlaying(h)) {
                        h.goForward(true)
                    } else {
                        if (!g.resumeOnVideoEnd) {
                            h.startStop()
                        }
                    }
                }, g.delay)
            } else {
                h.clearTimer()
            }
        };
        h.init()
    };
    b.anythingSlider.defaults = {
        theme: "default",
        mode: "horiz",
        expand: false,
        resizeContents: true,
        showMultiple: false,
        easing: "swing",
        buildArrows: true,
        buildNavigation: true,
        buildStartStop: true,
        toggleArrows: false,
        toggleControls: false,
        startText: "Start",
        stopText: "Stop",
        forwardText: "&raquo;",
        backText: "&laquo;",
        tooltipClass: "tooltip",
        enableArrows: true,
        enableNavigation: true,
        enableStartStop: true,
        enableKeyboard: true,
        startPanel: 1,
        changeBy: 1,
        hashTags: true,
        infiniteSlides: true,
        navigationFormatter: null,
        navigationSize: false,
        autoPlay: false,
        autoPlayLocked: false,
        autoPlayDelayed: false,
        pauseOnHover: true,
        stopAtEnd: false,
        playRtl: false,
        delay: 3000,
        resumeDelay: 15000,
        animationTime: 600,
        delayBeforeAnimate: 0,
        clickForwardArrow: "click",
        clickBackArrow: "click",
        clickControls: "click focusin",
        clickSlideshow: "click",
        allowRapidChange: false,
        resumeOnVideoEnd: true,
        resumeOnVisible: true,
        addWmodeToObject: "opaque",
        isVideoPlaying: function (a) {
            return false
        }
    };
    b.fn.anythingSlider = function (a, d) {
        return this.each(function () {
            var c, f = b(this).data("AnythingSlider");
            if ((typeof (a)).match("object|undefined")) {
                if (!f) {
                    (new b.anythingSlider(this, a))
                } else {
                    f.updateSlider()
                }
            } else {
                if (/\d/.test(a) && !isNaN(a) && f) {
                    c = (typeof (a) === "number") ? a : parseInt(b.trim(a), 10);
                    if (c >= 1 && c <= f.pages) {
                        f.gotoPage(c, false, d)
                    }
                } else {
                    if (/^[#|.]/.test(a) && b(a).length) {
                        f.gotoPage(a, false, d)
                    }
                }
            }
        })
    }
})(jQuery);