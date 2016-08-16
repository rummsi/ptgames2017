/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function (m, q, u) {
    var s = "hashchange",
            n = document,
            p, o = m.event.special,
            l = n.documentMode,
            r = "on" + s in q && (l === u || l > 7);

    function v(a) {
        a = a || location.href;
        return "#" + a.replace(/^[^#]*#?(.*)$/, "$1")
    }
    m.fn[s] = function (a) {
        return a ? this.bind(s, a) : this.trigger(s)
    };
    m.fn[s].delay = 50;
    o[s] = m.extend(o[s], {
        setup: function () {
            if (r) {
                return false
            }
            m(p.start)
        },
        teardown: function () {
            if (r) {
                return false
            }
            m(p.stop)
        }
    });
    p = (function () {
        var b = {},
                c, f = v(),
                a = function (h) {
                    return h
                },
                g = a,
                d = a;
        b.start = function () {
            c || e()
        };
        b.stop = function () {
            c && clearTimeout(c);
            c = u
        };

        function e() {
            var h = v(),
                    k = d(f);
            if (h !== f) {
                g(f = h, k);
                m(q).trigger(s)
            } else {
                if (k !== f) {
                    location.href = location.href.replace(/#.*/, "") + k
                }
            }
            c = setTimeout(e, m.fn[s].delay)
        }
        (navigator.userAgent.match(/MSIE/i) !== null) && !r && (function () {
            var k, h;
            b.start = function () {
                if (!k) {
                    h = m.fn[s].src;
                    h = h && h + v();
                    k = m('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        h || g(v());
                        e()
                    }).attr("src", h || "javascript:0").insertAfter("body")[0].contentWindow;
                    n.onpropertychange = function () {
                        try {
                            if (event.propertyName === "title") {
                                k.document.title = n.title
                            }
                        } catch (w) {
                        }
                    }
                }
            };
            b.stop = a;
            d = function () {
                return v(k.location.href)
            };
            g = function (D, C) {
                var A = k.document,
                        B = m.fn[s].domain;
                if (D !== C) {
                    A.title = n.title;
                    A.open();
                    B && A.write('<script>document.domain="' + B + '"<\/script>');
                    A.close();
                    k.location.hash = D
                }
            }
        })();
        return b
    })()
})(jQuery, this);
(function (h) {
    var k = !!h.Tween;
    if (k) {
        h.Tween.propHooks.backgroundPosition = {
            get: function (a) {
                return f(h(a.elem).css(a.prop))
            },
            set: l
        }
    } else {
        h.fx.step.backgroundPosition = l
    }

    function f(a) {
        var b = (a || "").split(/ /);
        var c = {
            center: "50%",
            left: "0%",
            right: "100%",
            top: "0%",
            bottom: "100%"
        };
        var d = function (e) {
            var n = (c[b[e]] || b[e] || "50%").match(/^([+-]=)?([+-]?\d+(\.\d*)?)(.*)$/);
            b[e] = [n[1], parseFloat(n[2]), n[4] || "px"]
        };
        if (b.length == 1 && h.inArray(b[0], ["top", "bottom"]) > -1) {
            b[1] = b[0];
            b[0] = "50%"
        }
        d(0);
        d(1);
        return b
    }

    function l(a) {
        if (!a.set) {
            g(a)
        }
        h(a.elem).css("background-position", ((a.pos * (a.end[0][1] - a.start[0][1]) + a.start[0][1]) + a.end[0][2]) + " " + ((a.pos * (a.end[1][1] - a.start[1][1]) + a.start[1][1]) + a.end[1][2]))
    }

    function g(b) {
        b.start = f(h(b.elem).css("backgroundPosition"));
        b.end = f(b.end);
        for (var a = 0; a < b.end.length; a++) {
            if (b.end[a][0]) {
                b.end[a][1] = b.start[a][1] + (b.end[a][0] == "-=" ? -1 : +1) * b.end[a][1]
            }
        }
        b.set = true
    }
})(jQuery);
(function (v) {
    v.colorpicker = new function () {
        this.regional = [];
        this.regional[""] = {
            ok: "OK",
            cancel: "Cancel",
            none: "None",
            button: "Color",
            title: "Pick a color",
            transparent: "Transparent",
            hsvH: "H",
            hsvS: "S",
            hsvV: "V",
            rgbR: "R",
            rgbG: "G",
            rgbB: "B",
            labL: "L",
            labA: "a",
            labB: "b",
            hslH: "H",
            hslS: "S",
            hslL: "L",
            cmykC: "C",
            cmykM: "M",
            cmykY: "Y",
            cmykK: "K",
            alphaA: "A"
        };
        this.swatches = [];
        this.swatches.html = {
            black: {
                r: 0,
                g: 0,
                b: 0
            },
            dimgray: {
                r: 0.4117647058823529,
                g: 0.4117647058823529,
                b: 0.4117647058823529
            },
            gray: {
                r: 0.5019607843137255,
                g: 0.5019607843137255,
                b: 0.5019607843137255
            },
            darkgray: {
                r: 0.6627450980392157,
                g: 0.6627450980392157,
                b: 0.6627450980392157
            },
            silver: {
                r: 0.7529411764705882,
                g: 0.7529411764705882,
                b: 0.7529411764705882
            },
            lightgrey: {
                r: 0.8274509803921568,
                g: 0.8274509803921568,
                b: 0.8274509803921568
            },
            gainsboro: {
                r: 0.8627450980392157,
                g: 0.8627450980392157,
                b: 0.8627450980392157
            },
            whitesmoke: {
                r: 0.9607843137254902,
                g: 0.9607843137254902,
                b: 0.9607843137254902
            },
            white: {
                r: 1,
                g: 1,
                b: 1
            },
            rosybrown: {
                r: 0.7372549019607844,
                g: 0.5607843137254902,
                b: 0.5607843137254902
            },
            indianred: {
                r: 0.803921568627451,
                g: 0.3607843137254902,
                b: 0.3607843137254902
            },
            brown: {
                r: 0.6470588235294118,
                g: 0.16470588235294117,
                b: 0.16470588235294117
            },
            firebrick: {
                r: 0.6980392156862745,
                g: 0.13333333333333333,
                b: 0.13333333333333333
            },
            lightcoral: {
                r: 0.9411764705882353,
                g: 0.5019607843137255,
                b: 0.5019607843137255
            },
            maroon: {
                r: 0.5019607843137255,
                g: 0,
                b: 0
            },
            darkred: {
                r: 0.5450980392156862,
                g: 0,
                b: 0
            },
            red: {
                r: 1,
                g: 0,
                b: 0
            },
            snow: {
                r: 1,
                g: 0.9803921568627451,
                b: 0.9803921568627451
            },
            salmon: {
                r: 0.9803921568627451,
                g: 0.5019607843137255,
                b: 0.4470588235294118
            },
            mistyrose: {
                r: 1,
                g: 0.8941176470588236,
                b: 0.8823529411764706
            },
            tomato: {
                r: 1,
                g: 0.38823529411764707,
                b: 0.2784313725490196
            },
            darksalmon: {
                r: 0.9137254901960784,
                g: 0.5882352941176471,
                b: 0.47843137254901963
            },
            orangered: {
                r: 1,
                g: 0.27058823529411763,
                b: 0
            },
            coral: {
                r: 1,
                g: 0.4980392156862745,
                b: 0.3137254901960784
            },
            lightsalmon: {
                r: 1,
                g: 0.6274509803921569,
                b: 0.47843137254901963
            },
            sienna: {
                r: 0.6274509803921569,
                g: 0.3215686274509804,
                b: 0.17647058823529413
            },
            seashell: {
                r: 1,
                g: 0.9607843137254902,
                b: 0.9333333333333333
            },
            chocolate: {
                r: 0.8235294117647058,
                g: 0.4117647058823529,
                b: 0.11764705882352941
            },
            saddlebrown: {
                r: 0.5450980392156862,
                g: 0.27058823529411763,
                b: 0.07450980392156863
            },
            sandybrown: {
                r: 0.9568627450980393,
                g: 0.6431372549019608,
                b: 0.3764705882352941
            },
            peachpuff: {
                r: 1,
                g: 0.8549019607843137,
                b: 0.7254901960784313
            },
            peru: {
                r: 0.803921568627451,
                g: 0.5215686274509804,
                b: 0.24705882352941178
            },
            linen: {
                r: 0.9803921568627451,
                g: 0.9411764705882353,
                b: 0.9019607843137255
            },
            darkorange: {
                r: 1,
                g: 0.5490196078431373,
                b: 0
            },
            bisque: {
                r: 1,
                g: 0.8941176470588236,
                b: 0.7686274509803922
            },
            burlywood: {
                r: 0.8705882352941177,
                g: 0.7215686274509804,
                b: 0.5294117647058824
            },
            tan: {
                r: 0.8235294117647058,
                g: 0.7058823529411765,
                b: 0.5490196078431373
            },
            antiquewhite: {
                r: 0.9803921568627451,
                g: 0.9215686274509803,
                b: 0.8431372549019608
            },
            navajowhite: {
                r: 1,
                g: 0.8705882352941177,
                b: 0.6784313725490196
            },
            blanchedalmond: {
                r: 1,
                g: 0.9215686274509803,
                b: 0.803921568627451
            },
            papayawhip: {
                r: 1,
                g: 0.9372549019607843,
                b: 0.8352941176470589
            },
            orange: {
                r: 1,
                g: 0.6470588235294118,
                b: 0
            },
            moccasin: {
                r: 1,
                g: 0.8941176470588236,
                b: 0.7098039215686275
            },
            wheat: {
                r: 0.9607843137254902,
                g: 0.8705882352941177,
                b: 0.7019607843137254
            },
            oldlace: {
                r: 0.9921568627450981,
                g: 0.9607843137254902,
                b: 0.9019607843137255
            },
            floralwhite: {
                r: 1,
                g: 0.9803921568627451,
                b: 0.9411764705882353
            },
            goldenrod: {
                r: 0.8549019607843137,
                g: 0.6470588235294118,
                b: 0.12549019607843137
            },
            darkgoldenrod: {
                r: 0.7215686274509804,
                g: 0.5254901960784314,
                b: 0.043137254901960784
            },
            cornsilk: {
                r: 1,
                g: 0.9725490196078431,
                b: 0.8627450980392157
            },
            gold: {
                r: 1,
                g: 0.8431372549019608,
                b: 0
            },
            palegoldenrod: {
                r: 0.9333333333333333,
                g: 0.9098039215686274,
                b: 0.6666666666666666
            },
            khaki: {
                r: 0.9411764705882353,
                g: 0.9019607843137255,
                b: 0.5490196078431373
            },
            lemonchiffon: {
                r: 1,
                g: 0.9803921568627451,
                b: 0.803921568627451
            },
            darkkhaki: {
                r: 0.7411764705882353,
                g: 0.7176470588235294,
                b: 0.4196078431372549
            },
            beige: {
                r: 0.9607843137254902,
                g: 0.9607843137254902,
                b: 0.8627450980392157
            },
            lightgoldenrodyellow: {
                r: 0.9803921568627451,
                g: 0.9803921568627451,
                b: 0.8235294117647058
            },
            olive: {
                r: 0.5019607843137255,
                g: 0.5019607843137255,
                b: 0
            },
            yellow: {
                r: 1,
                g: 1,
                b: 0
            },
            lightyellow: {
                r: 1,
                g: 1,
                b: 0.8784313725490196
            },
            ivory: {
                r: 1,
                g: 1,
                b: 0.9411764705882353
            },
            olivedrab: {
                r: 0.4196078431372549,
                g: 0.5568627450980392,
                b: 0.13725490196078433
            },
            yellowgreen: {
                r: 0.6039215686274509,
                g: 0.803921568627451,
                b: 0.19607843137254902
            },
            darkolivegreen: {
                r: 0.3333333333333333,
                g: 0.4196078431372549,
                b: 0.1843137254901961
            },
            greenyellow: {
                r: 0.6784313725490196,
                g: 1,
                b: 0.1843137254901961
            },
            lawngreen: {
                r: 0.48627450980392156,
                g: 0.9882352941176471,
                b: 0
            },
            chartreuse: {
                r: 0.4980392156862745,
                g: 1,
                b: 0
            },
            darkseagreen: {
                r: 0.5607843137254902,
                g: 0.7372549019607844,
                b: 0.5607843137254902
            },
            forestgreen: {
                r: 0.13333333333333333,
                g: 0.5450980392156862,
                b: 0.13333333333333333
            },
            limegreen: {
                r: 0.19607843137254902,
                g: 0.803921568627451,
                b: 0.19607843137254902
            },
            lightgreen: {
                r: 0.5647058823529412,
                g: 0.9333333333333333,
                b: 0.5647058823529412
            },
            palegreen: {
                r: 0.596078431372549,
                g: 0.984313725490196,
                b: 0.596078431372549
            },
            darkgreen: {
                r: 0,
                g: 0.39215686274509803,
                b: 0
            },
            green: {
                r: 0,
                g: 0.5019607843137255,
                b: 0
            },
            lime: {
                r: 0,
                g: 1,
                b: 0
            },
            honeydew: {
                r: 0.9411764705882353,
                g: 1,
                b: 0.9411764705882353
            },
            mediumseagreen: {
                r: 0.23529411764705882,
                g: 0.7019607843137254,
                b: 0.44313725490196076
            },
            seagreen: {
                r: 0.1803921568627451,
                g: 0.5450980392156862,
                b: 0.3411764705882353
            },
            springgreen: {
                r: 0,
                g: 1,
                b: 0.4980392156862745
            },
            mintcream: {
                r: 0.9607843137254902,
                g: 1,
                b: 0.9803921568627451
            },
            mediumspringgreen: {
                r: 0,
                g: 0.9803921568627451,
                b: 0.6039215686274509
            },
            mediumaquamarine: {
                r: 0.4,
                g: 0.803921568627451,
                b: 0.6666666666666666
            },
            aquamarine: {
                r: 0.4980392156862745,
                g: 1,
                b: 0.8313725490196079
            },
            turquoise: {
                r: 0.25098039215686274,
                g: 0.8784313725490196,
                b: 0.8156862745098039
            },
            lightseagreen: {
                r: 0.12549019607843137,
                g: 0.6980392156862745,
                b: 0.6666666666666666
            },
            mediumturquoise: {
                r: 0.2823529411764706,
                g: 0.8196078431372549,
                b: 0.8
            },
            darkslategray: {
                r: 0.1843137254901961,
                g: 0.30980392156862746,
                b: 0.30980392156862746
            },
            paleturquoise: {
                r: 0.6862745098039216,
                g: 0.9333333333333333,
                b: 0.9333333333333333
            },
            teal: {
                r: 0,
                g: 0.5019607843137255,
                b: 0.5019607843137255
            },
            darkcyan: {
                r: 0,
                g: 0.5450980392156862,
                b: 0.5450980392156862
            },
            darkturquoise: {
                r: 0,
                g: 0.807843137254902,
                b: 0.8196078431372549
            },
            aqua: {
                r: 0,
                g: 1,
                b: 1
            },
            cyan: {
                r: 0,
                g: 1,
                b: 1
            },
            lightcyan: {
                r: 0.8784313725490196,
                g: 1,
                b: 1
            },
            azure: {
                r: 0.9411764705882353,
                g: 1,
                b: 1
            },
            cadetblue: {
                r: 0.37254901960784315,
                g: 0.6196078431372549,
                b: 0.6274509803921569
            },
            powderblue: {
                r: 0.6901960784313725,
                g: 0.8784313725490196,
                b: 0.9019607843137255
            },
            lightblue: {
                r: 0.6784313725490196,
                g: 0.8470588235294118,
                b: 0.9019607843137255
            },
            deepskyblue: {
                r: 0,
                g: 0.7490196078431373,
                b: 1
            },
            skyblue: {
                r: 0.5294117647058824,
                g: 0.807843137254902,
                b: 0.9215686274509803
            },
            lightskyblue: {
                r: 0.5294117647058824,
                g: 0.807843137254902,
                b: 0.9803921568627451
            },
            steelblue: {
                r: 0.27450980392156865,
                g: 0.5098039215686274,
                b: 0.7058823529411765
            },
            aliceblue: {
                r: 0.9411764705882353,
                g: 0.9725490196078431,
                b: 1
            },
            dodgerblue: {
                r: 0.11764705882352941,
                g: 0.5647058823529412,
                b: 1
            },
            slategray: {
                r: 0.4392156862745098,
                g: 0.5019607843137255,
                b: 0.5647058823529412
            },
            lightslategray: {
                r: 0.4666666666666667,
                g: 0.5333333333333333,
                b: 0.6
            },
            lightsteelblue: {
                r: 0.6901960784313725,
                g: 0.7686274509803922,
                b: 0.8705882352941177
            },
            cornflowerblue: {
                r: 0.39215686274509803,
                g: 0.5843137254901961,
                b: 0.9294117647058824
            },
            royalblue: {
                r: 0.2549019607843137,
                g: 0.4117647058823529,
                b: 0.8823529411764706
            },
            midnightblue: {
                r: 0.09803921568627451,
                g: 0.09803921568627451,
                b: 0.4392156862745098
            },
            lavender: {
                r: 0.9019607843137255,
                g: 0.9019607843137255,
                b: 0.9803921568627451
            },
            navy: {
                r: 0,
                g: 0,
                b: 0.5019607843137255
            },
            darkblue: {
                r: 0,
                g: 0,
                b: 0.5450980392156862
            },
            mediumblue: {
                r: 0,
                g: 0,
                b: 0.803921568627451
            },
            blue: {
                r: 0,
                g: 0,
                b: 1
            },
            ghostwhite: {
                r: 0.9725490196078431,
                g: 0.9725490196078431,
                b: 1
            },
            darkslateblue: {
                r: 0.2823529411764706,
                g: 0.23921568627450981,
                b: 0.5450980392156862
            },
            slateblue: {
                r: 0.41568627450980394,
                g: 0.35294117647058826,
                b: 0.803921568627451
            },
            mediumslateblue: {
                r: 0.4823529411764706,
                g: 0.40784313725490196,
                b: 0.9333333333333333
            },
            mediumpurple: {
                r: 0.5764705882352941,
                g: 0.4392156862745098,
                b: 0.8588235294117647
            },
            blueviolet: {
                r: 0.5411764705882353,
                g: 0.16862745098039217,
                b: 0.8862745098039215
            },
            indigo: {
                r: 0.29411764705882354,
                g: 0,
                b: 0.5098039215686274
            },
            darkorchid: {
                r: 0.6,
                g: 0.19607843137254902,
                b: 0.8
            },
            darkviolet: {
                r: 0.5803921568627451,
                g: 0,
                b: 0.8274509803921568
            },
            mediumorchid: {
                r: 0.7294117647058823,
                g: 0.3333333333333333,
                b: 0.8274509803921568
            },
            thistle: {
                r: 0.8470588235294118,
                g: 0.7490196078431373,
                b: 0.8470588235294118
            },
            plum: {
                r: 0.8666666666666667,
                g: 0.6274509803921569,
                b: 0.8666666666666667
            },
            violet: {
                r: 0.9333333333333333,
                g: 0.5098039215686274,
                b: 0.9333333333333333
            },
            purple: {
                r: 0.5019607843137255,
                g: 0,
                b: 0.5019607843137255
            },
            darkmagenta: {
                r: 0.5450980392156862,
                g: 0,
                b: 0.5450980392156862
            },
            magenta: {
                r: 1,
                g: 0,
                b: 1
            },
            fuchsia: {
                r: 1,
                g: 0,
                b: 1
            },
            orchid: {
                r: 0.8549019607843137,
                g: 0.4392156862745098,
                b: 0.8392156862745098
            },
            mediumvioletred: {
                r: 0.7803921568627451,
                g: 0.08235294117647059,
                b: 0.5215686274509804
            },
            deeppink: {
                r: 1,
                g: 0.0784313725490196,
                b: 0.5764705882352941
            },
            hotpink: {
                r: 1,
                g: 0.4117647058823529,
                b: 0.7058823529411765
            },
            palevioletred: {
                r: 0.8588235294117647,
                g: 0.4392156862745098,
                b: 0.5764705882352941
            },
            lavenderblush: {
                r: 1,
                g: 0.9411764705882353,
                b: 0.9607843137254902
            },
            crimson: {
                r: 0.8627450980392157,
                g: 0.0784313725490196,
                b: 0.23529411764705882
            },
            pink: {
                r: 1,
                g: 0.7529411764705882,
                b: 0.796078431372549
            },
            lightpink: {
                r: 1,
                g: 0.7137254901960784,
                b: 0.7568627450980392
            }
        }
    };
    var m = 0,
            u = '<div class="ui-colorpicker ui-colorpicker-dialog ui-dialog ui-widget ui-widget-content ui-corner-all" style="display: none;"></div>',
            s = '<div class="ui-colorpicker ui-colorpicker-inline ui-dialog ui-widget ui-widget-content ui-corner-all"></div>',
            p = {
                full: ["header", "map", "bar", "hex", "hsv", "rgb", "alpha", "lab", "cmyk", "preview", "swatches", "footer"],
                popup: ["map", "bar", "hex", "hsv", "rgb", "alpha", "preview", "footer"],
                draggable: ["header", "map", "bar", "hex", "hsv", "rgb", "alpha", "preview", "footer"],
                inline: ["map", "bar", "hex", "hsv", "rgb", "alpha", "preview"]
            },
    o = function (b) {
        var a = Math.round(b).toString(16);
        if (a.length === 1) {
            a = ("0" + a)
        }
        return a.toLowerCase()
    },
            r = function (b) {
                var a, c;
                c = /^#?([a-fA-F0-9]{1,6})$/.exec(b);
                if (c) {
                    a = parseInt(c[1], 16);
                    return new w(((a >> 16) & 255) / 255, ((a >> 8) & 255) / 255, (a & 255) / 255)
                }
                return new w()
            },
            n = function (b, K) {
                var h, f, x, l, I, g, H, J, a, d, c, e, k, y;
                b.sort(function (A, B) {
                    if (A.pos[1] == B.pos[1]) {
                        return A.pos[0] - B.pos[0]
                    }
                    return A.pos[1] - B.pos[1]
                });
                l = 0;
                I = 0;
                v.each(b, function (A, B) {
                    l = Math.max(l, B.pos[0] + B.pos[2]);
                    I = Math.max(I, B.pos[1] + B.pos[3])
                });
                h = [];
                for (f = 0; f < l; ++f) {
                    h.push([])
                }
                H = [];
                g = [];
                v.each(b, function (A, B) {
                    for (f = 0; f < B.pos[2]; f += 1) {
                        g[B.pos[0] + f] = true
                    }
                    for (x = 0; x < B.pos[3]; x += 1) {
                        H[B.pos[1] + x] = true
                    }
                });
                d = "";
                a = b[J = 0];
                for (x = 0; x < I; ++x) {
                    d += "<tr>";
                    for (f = 0; f < l; f) {
                        if (typeof a !== "undefined" && f == a.pos[0] && x == a.pos[1]) {
                            d += K(a, f, x);
                            for (e = 0; e < a.pos[3]; e += 1) {
                                for (c = 0; c < a.pos[2]; c += 1) {
                                    h[f + c][x + e] = true
                                }
                            }
                            f += a.pos[2];
                            a = b[++J]
                        } else {
                            k = 0;
                            y = false;
                            while (f < l && h[f][x] === undefined && (a === undefined || x < a.pos[1] || (x == a.pos[1] && f < a.pos[0]))) {
                                if (g[f] === true) {
                                    k += 1
                                }
                                y = true;
                                f += 1
                            }
                            if (k > 0) {
                                d += '<td colspan="' + k + '"></td>'
                            } else {
                                if (!y) {
                                    f += 1
                                }
                            }
                        }
                    }
                    d += "</tr>"
                }
                return '<table cellspacing="0" cellpadding="0" border="0"><tbody>' + d + "</tbody></table>"
            },
            q = {
                header: function (c) {
                    var d = this,
                            b = null,
                            a = function () {
                                var e = c.options.title || c._getRegional("title"),
                                        f = '<span class="ui-dialog-title">' + e + "</span>";
                                if (!c.inline && c.options.showCloseButton) {
                                    f += '<a href="#" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></a>'
                                }
                                return '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">' + f + "</div>"
                            };
                    this.init = function () {
                        b = v(a()).prependTo(c.dialog);
                        var e = v(".ui-dialog-titlebar-close", b);
                        c._hoverable(e);
                        c._focusable(e);
                        e.click(function (f) {
                            f.preventDefault();
                            c.close()
                        });
                        if (!c.inline && c.options.draggable) {
                            c.dialog.draggable({
                                handle: b
                            })
                        }
                    }
                },
                map: function (c) {
                    var e = this,
                            b = null,
                            d = null,
                            h, f, g, a;
                    h = function (H) {
                        if (!c.opened) {
                            return
                        }
                        var y = v(".ui-colorpicker-map-layer-pointer", b),
                                G = y.offset(),
                                k = y.width(),
                                l = y.height(),
                                x = H.pageX - G.left,
                                F = H.pageY - G.top;
                        if (x >= 0 && x < k && F >= 0 && F < l) {
                            H.stopImmediatePropagation();
                            H.preventDefault();
                            b.unbind("mousedown", h);
                            v(document).bind("mouseup", f);
                            v(document).bind("mousemove", g);
                            g(H)
                        }
                    };
                    f = function (k) {
                        k.stopImmediatePropagation();
                        k.preventDefault();
                        v(document).unbind("mouseup", f);
                        v(document).unbind("mousemove", g);
                        b.bind("mousedown", h)
                    };
                    g = function (H) {
                        H.stopImmediatePropagation();
                        H.preventDefault();
                        if (H.pageX === e.x && H.pageY === e.y) {
                            return
                        }
                        e.x = H.pageX;
                        e.y = H.pageY;
                        var y = v(".ui-colorpicker-map-layer-pointer", b),
                                G = y.offset(),
                                k = y.width(),
                                l = y.height(),
                                x = H.pageX - G.left,
                                F = H.pageY - G.top;
                        x = Math.max(0, Math.min(x / k, 1));
                        F = Math.max(0, Math.min(F / l, 1));
                        switch (c.mode) {
                            case "h":
                                c.color.setHSV(null, x, 1 - F);
                                break;
                            case "s":
                            case "a":
                                c.color.setHSV(x, null, 1 - F);
                                break;
                            case "v":
                                c.color.setHSV(x, 1 - F, null);
                                break;
                            case "r":
                                c.color.setRGB(null, 1 - F, x);
                                break;
                            case "g":
                                c.color.setRGB(1 - F, null, x);
                                break;
                            case "b":
                                c.color.setRGB(x, 1 - F, null);
                                break
                        }
                        c._change()
                    };
                    a = function () {
                        var k = '<div class="ui-colorpicker-map ui-colorpicker-border"><span class="ui-colorpicker-map-layer-1">&nbsp;</span><span class="ui-colorpicker-map-layer-2">&nbsp;</span>' + (c.options.alpha ? '<span class="ui-colorpicker-map-layer-alpha">&nbsp;</span>' : "") + '<span class="ui-colorpicker-map-layer-pointer"><span class="ui-colorpicker-map-pointer"></span></span></div>';
                        return k
                    };
                    this.update = function () {
                        switch (c.mode) {
                            case "h":
                                v(".ui-colorpicker-map-layer-1", b).css({
                                    "background-position": "0 0",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-map-layer-2", b).hide();
                                break;
                            case "s":
                            case "a":
                                v(".ui-colorpicker-map-layer-1", b).css({
                                    "background-position": "0 -260px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-map-layer-2", b).css({
                                    "background-position": "0 -520px",
                                    opacity: ""
                                }).show();
                                break;
                            case "v":
                                v(b).css("background-color", "black");
                                v(".ui-colorpicker-map-layer-1", b).css({
                                    "background-position": "0 -780px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-map-layer-2", b).hide();
                                break;
                            case "r":
                                v(".ui-colorpicker-map-layer-1", b).css({
                                    "background-position": "0 -1040px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-map-layer-2", b).css({
                                    "background-position": "0 -1300px",
                                    opacity: ""
                                }).show();
                                break;
                            case "g":
                                v(".ui-colorpicker-map-layer-1", b).css({
                                    "background-position": "0 -1560px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-map-layer-2", b).css({
                                    "background-position": "0 -1820px",
                                    opacity: ""
                                }).show();
                                break;
                            case "b":
                                v(".ui-colorpicker-map-layer-1", b).css({
                                    "background-position": "0 -2080px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-map-layer-2", b).css({
                                    "background-position": "0 -2340px",
                                    opacity: ""
                                }).show();
                                break
                        }
                        e.repaint()
                    };
                    this.repaint = function () {
                        var k = v(".ui-colorpicker-map-layer-pointer", b),
                                x = 0,
                                l = 0;
                        switch (c.mode) {
                            case "h":
                                x = c.color.getHSV().s * k.width();
                                l = (1 - c.color.getHSV().v) * k.width();
                                v(b).css("background-color", c.color.copy().normalize().toCSS());
                                break;
                            case "s":
                            case "a":
                                x = c.color.getHSV().h * k.width();
                                l = (1 - c.color.getHSV().v) * k.width();
                                v(".ui-colorpicker-map-layer-2", b).css("opacity", 1 - c.color.getHSV().s);
                                break;
                            case "v":
                                x = c.color.getHSV().h * k.width();
                                l = (1 - c.color.getHSV().s) * k.width();
                                v(".ui-colorpicker-map-layer-1", b).css("opacity", c.color.getHSV().v);
                                break;
                            case "r":
                                x = c.color.getRGB().b * k.width();
                                l = (1 - c.color.getRGB().g) * k.width();
                                v(".ui-colorpicker-map-layer-2", b).css("opacity", c.color.getRGB().r);
                                break;
                            case "g":
                                x = c.color.getRGB().b * k.width();
                                l = (1 - c.color.getRGB().r) * k.width();
                                v(".ui-colorpicker-map-layer-2", b).css("opacity", c.color.getRGB().g);
                                break;
                            case "b":
                                x = c.color.getRGB().r * k.width();
                                l = (1 - c.color.getRGB().g) * k.width();
                                v(".ui-colorpicker-map-layer-2", b).css("opacity", c.color.getRGB().b);
                                break
                        }
                        if (c.options.alpha) {
                            v(".ui-colorpicker-map-layer-alpha", b).css("opacity", 1 - c.color.getAlpha())
                        }
                        v(".ui-colorpicker-map-pointer", b).css({
                            left: x - 7,
                            top: l - 7
                        })
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-map-container", c.dialog));
                        b.bind("mousedown", h)
                    }
                },
                bar: function (c) {
                    var d = this,
                            b = null,
                            g, e, f, a;
                    g = function (h) {
                        if (!c.opened) {
                            return
                        }
                        var y = v(".ui-colorpicker-bar-layer-pointer", b),
                                F = y.offset(),
                                k = y.width(),
                                l = y.height(),
                                x = h.pageX - F.left,
                                E = h.pageY - F.top;
                        if (x >= 0 && x < k && E >= 0 && E < l) {
                            h.stopImmediatePropagation();
                            h.preventDefault();
                            b.unbind("mousedown", g);
                            v(document).bind("mouseup", e);
                            v(document).bind("mousemove", f);
                            f(h)
                        }
                    };
                    e = function (h) {
                        h.stopImmediatePropagation();
                        h.preventDefault();
                        v(document).unbind("mouseup", e);
                        v(document).unbind("mousemove", f);
                        b.bind("mousedown", g)
                    };
                    f = function (y) {
                        y.stopImmediatePropagation();
                        y.preventDefault();
                        if (y.pageY === d.y) {
                            return
                        }
                        d.y = y.pageY;
                        var k = v(".ui-colorpicker-bar-layer-pointer", b),
                                l = k.offset(),
                                B = k.height(),
                                h = y.pageY - l.top;
                        h = Math.max(0, Math.min(h / B, 1));
                        switch (c.mode) {
                            case "h":
                                c.color.setHSV(1 - h, null, null);
                                break;
                            case "s":
                                c.color.setHSV(null, 1 - h, null);
                                break;
                            case "v":
                                c.color.setHSV(null, null, 1 - h);
                                break;
                            case "r":
                                c.color.setRGB(1 - h, null, null);
                                break;
                            case "g":
                                c.color.setRGB(null, 1 - h, null);
                                break;
                            case "b":
                                c.color.setRGB(null, null, 1 - h);
                                break;
                            case "a":
                                c.color.setAlpha(1 - h);
                                break
                        }
                        c._change()
                    };
                    a = function () {
                        var h = '<div class="ui-colorpicker-bar ui-colorpicker-border"><span class="ui-colorpicker-bar-layer-1">&nbsp;</span><span class="ui-colorpicker-bar-layer-2">&nbsp;</span><span class="ui-colorpicker-bar-layer-3">&nbsp;</span><span class="ui-colorpicker-bar-layer-4">&nbsp;</span>';
                        if (c.options.alpha) {
                            h += '<span class="ui-colorpicker-bar-layer-alpha">&nbsp;</span><span class="ui-colorpicker-bar-layer-alphabar">&nbsp;</span>'
                        }
                        h += '<span class="ui-colorpicker-bar-layer-pointer"><span class="ui-colorpicker-bar-pointer"></span></span></div>';
                        return h
                    };
                    this.update = function () {
                        switch (c.mode) {
                            case "h":
                            case "s":
                            case "v":
                            case "r":
                            case "g":
                            case "b":
                                v(".ui-colorpicker-bar-layer-alpha", b).show();
                                v(".ui-colorpicker-bar-layer-alphabar", b).hide();
                                break;
                            case "a":
                                v(".ui-colorpicker-bar-layer-alpha", b).hide();
                                v(".ui-colorpicker-bar-layer-alphabar", b).show();
                                break
                        }
                        switch (c.mode) {
                            case "h":
                                v(".ui-colorpicker-bar-layer-1", b).css({
                                    "background-position": "0 0",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-2", b).hide();
                                v(".ui-colorpicker-bar-layer-3", b).hide();
                                v(".ui-colorpicker-bar-layer-4", b).hide();
                                break;
                            case "s":
                                v(".ui-colorpicker-bar-layer-1", b).css({
                                    "background-position": "0 -260px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-2", b).css({
                                    "background-position": "0 -520px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-3", b).hide();
                                v(".ui-colorpicker-bar-layer-4", b).hide();
                                break;
                            case "v":
                                v(".ui-colorpicker-bar-layer-1", b).css({
                                    "background-position": "0 -520px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-2", b).hide();
                                v(".ui-colorpicker-bar-layer-3", b).hide();
                                v(".ui-colorpicker-bar-layer-4", b).hide();
                                break;
                            case "r":
                                v(".ui-colorpicker-bar-layer-1", b).css({
                                    "background-position": "0 -1560px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-2", b).css({
                                    "background-position": "0 -1300px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-3", b).css({
                                    "background-position": "0 -780px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-4", b).css({
                                    "background-position": "0 -1040px",
                                    opacity: ""
                                }).show();
                                break;
                            case "g":
                                v(".ui-colorpicker-bar-layer-1", b).css({
                                    "background-position": "0 -2600px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-2", b).css({
                                    "background-position": "0 -2340px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-3", b).css({
                                    "background-position": "0 -1820px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-4", b).css({
                                    "background-position": "0 -2080px",
                                    opacity: ""
                                }).show();
                                break;
                            case "b":
                                v(".ui-colorpicker-bar-layer-1", b).css({
                                    "background-position": "0 -3640px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-2", b).css({
                                    "background-position": "0 -3380px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-3", b).css({
                                    "background-position": "0 -2860px",
                                    opacity: ""
                                }).show();
                                v(".ui-colorpicker-bar-layer-4", b).css({
                                    "background-position": "0 -3120px",
                                    opacity: ""
                                }).show();
                                break;
                            case "a":
                                v(".ui-colorpicker-bar-layer-1", b).hide();
                                v(".ui-colorpicker-bar-layer-2", b).hide();
                                v(".ui-colorpicker-bar-layer-3", b).hide();
                                v(".ui-colorpicker-bar-layer-4", b).hide();
                                break
                        }
                        d.repaint()
                    };
                    this.repaint = function () {
                        var h = v(".ui-colorpicker-bar-layer-pointer", b),
                                k = 0;
                        switch (c.mode) {
                            case "h":
                                k = (1 - c.color.getHSV().h) * h.height();
                                break;
                            case "s":
                                k = (1 - c.color.getHSV().s) * h.height();
                                v(".ui-colorpicker-bar-layer-2", b).css("opacity", 1 - c.color.getHSV().v);
                                v(b).css("background-color", c.color.copy().normalize().toCSS());
                                break;
                            case "v":
                                k = (1 - c.color.getHSV().v) * h.height();
                                v(b).css("background-color", c.color.copy().normalize().toCSS());
                                break;
                            case "r":
                                k = (1 - c.color.getRGB().r) * h.height();
                                v(".ui-colorpicker-bar-layer-2", b).css("opacity", Math.max(0, (c.color.getRGB().b - c.color.getRGB().g)));
                                v(".ui-colorpicker-bar-layer-3", b).css("opacity", Math.max(0, (c.color.getRGB().g - c.color.getRGB().b)));
                                v(".ui-colorpicker-bar-layer-4", b).css("opacity", Math.min(c.color.getRGB().b, c.color.getRGB().g));
                                break;
                            case "g":
                                k = (1 - c.color.getRGB().g) * h.height();
                                v(".ui-colorpicker-bar-layer-2", b).css("opacity", Math.max(0, (c.color.getRGB().b - c.color.getRGB().r)));
                                v(".ui-colorpicker-bar-layer-3", b).css("opacity", Math.max(0, (c.color.getRGB().r - c.color.getRGB().b)));
                                v(".ui-colorpicker-bar-layer-4", b).css("opacity", Math.min(c.color.getRGB().r, c.color.getRGB().b));
                                break;
                            case "b":
                                k = (1 - c.color.getRGB().b) * h.height();
                                v(".ui-colorpicker-bar-layer-2", b).css("opacity", Math.max(0, (c.color.getRGB().r - c.color.getRGB().g)));
                                v(".ui-colorpicker-bar-layer-3", b).css("opacity", Math.max(0, (c.color.getRGB().g - c.color.getRGB().r)));
                                v(".ui-colorpicker-bar-layer-4", b).css("opacity", Math.min(c.color.getRGB().r, c.color.getRGB().g));
                                break;
                            case "a":
                                k = (1 - c.color.getAlpha()) * h.height();
                                v(b).css("background-color", c.color.copy().normalize().toCSS());
                                break
                        }
                        if (c.mode !== "a") {
                            v(".ui-colorpicker-bar-layer-alpha", b).css("opacity", 1 - c.color.getAlpha())
                        }
                        v(".ui-colorpicker-bar-pointer", b).css("top", k - 3)
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-bar-container", c.dialog));
                        b.bind("mousedown", g)
                    }
                },
                preview: function (c) {
                    var d = this,
                            b = null,
                            a;
                    a = function () {
                        return '<div class="ui-colorpicker-preview ui-colorpicker-border"><div class="ui-colorpicker-preview-initial"><div class="ui-colorpicker-preview-initial-alpha"></div></div><div class="ui-colorpicker-preview-current"><div class="ui-colorpicker-preview-current-alpha"></div></div></div>'
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-preview-container", c.dialog));
                        v(".ui-colorpicker-preview-initial", b).click(function () {
                            c.color = c.currentColor.copy();
                            c._change()
                        })
                    };
                    this.update = function () {
                        if (c.options.alpha) {
                            v(".ui-colorpicker-preview-initial-alpha, .ui-colorpicker-preview-current-alpha", b).show()
                        } else {
                            v(".ui-colorpicker-preview-initial-alpha, .ui-colorpicker-preview-current-alpha", b).hide()
                        }
                        this.repaint()
                    };
                    this.repaint = function () {
                        v(".ui-colorpicker-preview-initial", b).css("background-color", c.currentColor.toCSS()).attr("title", c.currentColor.toHex());
                        v(".ui-colorpicker-preview-initial-alpha", b).css("opacity", 1 - c.currentColor.getAlpha());
                        v(".ui-colorpicker-preview-current", b).css("background-color", c.color.toCSS()).attr("title", c.color.toHex());
                        v(".ui-colorpicker-preview-current-alpha", b).css("opacity", 1 - c.color.getAlpha())
                    }
                },
                hsv: function (c) {
                    var d = this,
                            b = null,
                            a;
                    a = function () {
                        var e = "";
                        if (c.options.hsv) {
                            e += '<div class="ui-colorpicker-hsv-h"><input class="ui-colorpicker-mode" type="radio" value="h"/><label>' + c._getRegional("hsvH") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="360" size="10"/><span class="ui-colorpicker-unit">&deg;</span></div><div class="ui-colorpicker-hsv-s"><input class="ui-colorpicker-mode" type="radio" value="s"/><label>' + c._getRegional("hsvS") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100" size="10"/><span class="ui-colorpicker-unit">%</span></div><div class="ui-colorpicker-hsv-v"><input class="ui-colorpicker-mode" type="radio" value="v"/><label>' + c._getRegional("hsvV") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100" size="10"/><span class="ui-colorpicker-unit">%</span></div>'
                        }
                        return '<div class="ui-colorpicker-hsv">' + e + "</div>"
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-hsv-container", c.dialog));
                        v(".ui-colorpicker-mode", b).click(function () {
                            c.mode = v(this).val();
                            c._updateAllParts()
                        });
                        v(".ui-colorpicker-number", b).bind("change keyup", function () {
                            c.color.setHSV(v(".ui-colorpicker-hsv-h .ui-colorpicker-number", b).val() / 360, v(".ui-colorpicker-hsv-s .ui-colorpicker-number", b).val() / 100, v(".ui-colorpicker-hsv-v .ui-colorpicker-number", b).val() / 100);
                            c._change()
                        })
                    };
                    this.repaint = function () {
                        var e = c.color.getHSV();
                        e.h *= 360;
                        e.s *= 100;
                        e.v *= 100;
                        v.each(e, function (g, f) {
                            var h = v(".ui-colorpicker-hsv-" + g + " .ui-colorpicker-number", b);
                            f = Math.round(f);
                            if (h.val() !== f) {
                                h.val(f)
                            }
                        })
                    };
                    this.update = function () {
                        v(".ui-colorpicker-mode", b).each(function () {
                            v(this).attr("checked", v(this).val() === c.mode)
                        });
                        this.repaint()
                    }
                },
                rgb: function (c) {
                    var d = this,
                            b = null,
                            a;
                    a = function () {
                        var e = "";
                        if (c.options.rgb) {
                            e += '<div class="ui-colorpicker-rgb-r"><input class="ui-colorpicker-mode" type="radio" value="r"/><label>' + c._getRegional("rgbR") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div><div class="ui-colorpicker-rgb-g"><input class="ui-colorpicker-mode" type="radio" value="g"/><label>' + c._getRegional("rgbG") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div><div class="ui-colorpicker-rgb-b"><input class="ui-colorpicker-mode" type="radio" value="b"/><label>' + c._getRegional("rgbB") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="255"/></div>'
                        }
                        return '<div class="ui-colorpicker-rgb">' + e + "</div>"
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-rgb-container", c.dialog));
                        v(".ui-colorpicker-mode", b).click(function () {
                            c.mode = v(this).val();
                            c._updateAllParts()
                        });
                        v(".ui-colorpicker-number", b).bind("change keyup", function () {
                            c.color.setRGB(v(".ui-colorpicker-rgb-r .ui-colorpicker-number", b).val() / 255, v(".ui-colorpicker-rgb-g .ui-colorpicker-number", b).val() / 255, v(".ui-colorpicker-rgb-b .ui-colorpicker-number", b).val() / 255);
                            c._change()
                        })
                    };
                    this.repaint = function () {
                        v.each(c.color.getRGB(), function (f, e) {
                            var g = v(".ui-colorpicker-rgb-" + f + " .ui-colorpicker-number", b);
                            e = Math.round(e * 255);
                            if (g.val() !== e) {
                                g.val(e)
                            }
                        })
                    };
                    this.update = function () {
                        v(".ui-colorpicker-mode", b).each(function () {
                            v(this).attr("checked", v(this).val() === c.mode)
                        });
                        this.repaint()
                    }
                },
                lab: function (b) {
                    var c = this,
                            a = null,
                            d = function () {
                                var e = "";
                                if (b.options.hsv) {
                                    e += '<div class="ui-colorpicker-lab-l"><label>' + b._getRegional("labL") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/></div><div class="ui-colorpicker-lab-a"><label>' + b._getRegional("labA") + '</label><input class="ui-colorpicker-number" type="number" min="-128" max="127"/></div><div class="ui-colorpicker-lab-b"><label>' + b._getRegional("labB") + '</label><input class="ui-colorpicker-number" type="number" min="-128" max="127"/></div>'
                                }
                                return '<div class="ui-colorpicker-lab">' + e + "</div>"
                            };
                    this.init = function () {
                        var e = 0;
                        a = v(d()).appendTo(v(".ui-colorpicker-lab-container", b.dialog));
                        v(".ui-colorpicker-number", a).on("change keyup", function (f) {
                            b.color.setLAB(parseInt(v(".ui-colorpicker-lab-l .ui-colorpicker-number", a).val(), 10) / 100, (parseInt(v(".ui-colorpicker-lab-a .ui-colorpicker-number", a).val(), 10) + 128) / 255, (parseInt(v(".ui-colorpicker-lab-b .ui-colorpicker-number", a).val(), 10) + 128) / 255);
                            b._change()
                        })
                    };
                    this.repaint = function () {
                        var e = b.color.getLAB();
                        e.l *= 100;
                        e.a = (e.a * 255) - 128;
                        e.b = (e.b * 255) - 128;
                        v.each(e, function (g, f) {
                            var h = v(".ui-colorpicker-lab-" + g + " .ui-colorpicker-number", a);
                            f = Math.round(f);
                            if (h.val() !== f) {
                                h.val(f)
                            }
                        })
                    };
                    this.update = function () {
                        this.repaint()
                    }
                },
                cmyk: function (b) {
                    var c = this,
                            a = null,
                            d = function () {
                                var e = "";
                                if (b.options.hsv) {
                                    e += '<div class="ui-colorpicker-cmyk-c"><label>' + b._getRegional("cmykC") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div><div class="ui-colorpicker-cmyk-m"><label>' + b._getRegional("cmykM") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div><div class="ui-colorpicker-cmyk-y"><label>' + b._getRegional("cmykY") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div><div class="ui-colorpicker-cmyk-k"><label>' + b._getRegional("cmykK") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'
                                }
                                return '<div class="ui-colorpicker-cmyk">' + e + "</div>"
                            };
                    this.init = function () {
                        a = v(d()).appendTo(v(".ui-colorpicker-cmyk-container", b.dialog));
                        v(".ui-colorpicker-number", a).on("change keyup", function (e) {
                            b.color.setCMYK(parseInt(v(".ui-colorpicker-cmyk-c .ui-colorpicker-number", a).val(), 10) / 100, parseInt(v(".ui-colorpicker-cmyk-m .ui-colorpicker-number", a).val(), 10) / 100, parseInt(v(".ui-colorpicker-cmyk-y .ui-colorpicker-number", a).val(), 10) / 100, parseInt(v(".ui-colorpicker-cmyk-k .ui-colorpicker-number", a).val(), 10) / 100);
                            b._change()
                        })
                    };
                    this.repaint = function () {
                        v.each(b.color.getCMYK(), function (f, e) {
                            var g = v(".ui-colorpicker-cmyk-" + f + " .ui-colorpicker-number", a);
                            e = Math.round(e * 100);
                            if (g.val() !== e) {
                                g.val(e)
                            }
                        })
                    };
                    this.update = function () {
                        this.repaint()
                    }
                },
                alpha: function (c) {
                    var d = this,
                            b = null,
                            a;
                    a = function () {
                        var e = "";
                        if (c.options.alpha) {
                            e += '<div class="ui-colorpicker-a"><input class="ui-colorpicker-mode" name="mode" type="radio" value="a"/><label>' + c._getRegional("alphaA") + '</label><input class="ui-colorpicker-number" type="number" min="0" max="100"/><span class="ui-colorpicker-unit">%</span></div>'
                        }
                        return '<div class="ui-colorpicker-alpha">' + e + "</div>"
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-alpha-container", c.dialog));
                        v(".ui-colorpicker-mode", b).click(function () {
                            c.mode = v(this).val();
                            c._updateAllParts()
                        });
                        v(".ui-colorpicker-number", b).bind("change keyup", function () {
                            c.color.setAlpha(v(".ui-colorpicker-a .ui-colorpicker-number", b).val() / 100);
                            c._change()
                        })
                    };
                    this.update = function () {
                        v(".ui-colorpicker-mode", b).each(function () {
                            v(this).attr("checked", v(this).val() === c.mode)
                        });
                        this.repaint()
                    };
                    this.repaint = function () {
                        var f = v(".ui-colorpicker-a .ui-colorpicker-number", b),
                                e = Math.round(c.color.getAlpha() * 100);
                        if (!f.is(":focus") && f.val() !== e) {
                            f.val(e)
                        }
                    }
                },
                hex: function (c) {
                    var d = this,
                            b = null,
                            a;
                    a = function () {
                        var e = "";
                        if (c.options.alpha) {
                            e += '<input class="ui-colorpicker-hex-alpha" type="text" maxlength="2" size="2"/>'
                        }
                        e += '<input class="ui-colorpicker-hex-input" type="text" maxlength="6" size="6"/>';
                        return '<div class="ui-colorpicker-hex"><label>#</label>' + e + "</div>"
                    };
                    this.init = function () {
                        b = v(a()).appendTo(v(".ui-colorpicker-hex-container", c.dialog));
                        v(".ui-colorpicker-hex-input", b).bind("change keydown keyup", function (f, g, e) {
                            if (/[^a-fA-F0-9]/.test(v(this).val())) {
                                v(this).val(v(this).val().replace(/[^a-fA-F0-9]/, ""))
                            }
                        });
                        v(".ui-colorpicker-hex-input", b).bind("change keyup", function () {
                            c.color = r(v(this).val()).setAlpha(c.color.getAlpha());
                            c._change()
                        });
                        v(".ui-colorpicker-hex-alpha", b).bind("change keydown keyup", function () {
                            if (/[^a-fA-F0-9]/.test(v(this).val())) {
                                v(this).val(v(this).val().replace(/[^a-fA-F0-9]/, ""))
                            }
                        });
                        v(".ui-colorpicker-hex-alpha", b).bind("change keyup", function () {
                            c.color.setAlpha(parseInt(v(".ui-colorpicker-hex-alpha", b).val(), 16) / 255);
                            c._change()
                        })
                    };
                    this.update = function () {
                        this.repaint()
                    };
                    this.repaint = function () {
                        if (!v(".ui-colorpicker-hex-input", b).is(":focus")) {
                            v(".ui-colorpicker-hex-input", b).val(c.color.toHex(true))
                        }
                        if (!v(".ui-colorpicker-hex-alpha", b).is(":focus")) {
                            v(".ui-colorpicker-hex-alpha", b).val(o(c.color.getAlpha() * 255))
                        }
                    }
                },
                swatches: function (b) {
                    var c = this,
                            a = null,
                            d = function () {
                                var e = "";
                                v.each(b._getSwatches(), function (h, k) {
                                    var f = new w(k.r, k.g, k.b),
                                            g = f.toCSS();
                                    e += '<div class="ui-colorpicker-swatch" style="background-color:' + g + '" title="' + h + '"></div>'
                                });
                                return '<div class="ui-colorpicker-swatches ui-colorpicker-border" style="width:' + b.options.swatchesWidth + 'px">' + e + "</div>"
                            };
                    this.init = function () {
                        a = v(d()).appendTo(v(".ui-colorpicker-swatches-container", b.dialog));
                        v(".ui-colorpicker-swatch", a).click(function () {
                            b.color = b._parseColor(v(this).css("background-color"));
                            b._change()
                        })
                    }
                },
                footer: function (b) {
                    var c = this,
                            e = null,
                            a = "ui-colorpicker-special-transparent-" + m,
                            f = "ui-colorpicker-special-none-" + m,
                            d = function () {
                                var g = "";
                                if (b.options.alpha || (!b.inline && b.options.showNoneButton)) {
                                    g += '<div class="ui-colorpicker-buttonset">';
                                    if (b.options.alpha) {
                                        g += '<input type="radio" name="ui-colorpicker-special" id="' + a + '" class="ui-colorpicker-special-transparent"/><label for="' + a + '">' + b._getRegional("transparent") + "</label>"
                                    }
                                    if (!b.inline && b.options.showNoneButton) {
                                        g += '<input type="radio" name="ui-colorpicker-special" id="' + f + '" class="ui-colorpicker-special-none"><label for="' + f + '">' + b._getRegional("none") + "</label>"
                                    }
                                    g += "</div>"
                                }
                                if (!b.inline) {
                                    g += '<div class="ui-dialog-buttonset">';
                                    if (b.options.showCancelButton) {
                                        g += '<button class="ui-colorpicker-cancel">' + b._getRegional("cancel") + "</button>"
                                    }
                                    g += '<button class="ui-colorpicker-ok">' + b._getRegional("ok") + "</button>";
                                    g += "</div>"
                                }
                                return '<div class="ui-dialog-buttonpane ui-widget-content">' + g + "</div>"
                            };
                    this.init = function () {
                        e = v(d()).appendTo(b.dialog);
                        v(".ui-colorpicker-ok", e).button().click(function () {
                            b.close()
                        });
                        v(".ui-colorpicker-cancel", e).button().click(function () {
                            b.color = b.currentColor.copy();
                            b._change(b.color.set);
                            b.close()
                        });
                        v(".ui-colorpicker-buttonset", e).buttonset();
                        v(".ui-colorpicker-special-color", e).click(function () {
                            b._change()
                        });
                        v("#" + f, e).click(function () {
                            b._change(false)
                        });
                        v("#" + a, e).click(function () {
                            b.color.setAlpha(0);
                            b._change()
                        })
                    };
                    this.repaint = function () {
                        if (!b.color.set) {
                            v(".ui-colorpicker-special-none", e).attr("checked", true).button("refresh")
                        } else {
                            if (b.color.getAlpha() == 0) {
                                v(".ui-colorpicker-special-transparent", e).attr("checked", true).button("refresh")
                            } else {
                                v("input", e).attr("checked", false).button("refresh")
                            }
                        }
                        v(".ui-colorpicker-cancel", e).button(b.changed ? "enable" : "disable")
                    };
                    this.update = function () {}
                }
            },
    w = function () {
        var F = {
            rgb: {
                r: 0,
                g: 0,
                b: 0
            },
            hsv: {
                h: 0,
                s: 0,
                v: 0
            },
            hsl: {
                h: 0,
                s: 0,
                l: 0
            },
            lab: {
                l: 0,
                a: 0,
                b: 0
            },
            cmyk: {
                c: 0,
                m: 0,
                y: 0,
                k: 1
            }
        },
        c = 1,
                h = arguments,
                L = function (x) {
                    if (isNaN(x) || x === null) {
                        return 0
                    }
                    if (typeof x == "string") {
                        x = parseInt(x, 10)
                    }
                    return Math.max(0, Math.min(x, 1))
                },
                J = function (y) {
                    var x = "0123456789abcdef",
                            A = y % 16,
                            B = (y - A) / 16,
                            C = x.charAt(B) + x.charAt(A);
                    return C
                },
                b = function (A) {
                    var x = (A.r > 0.04045) ? Math.pow((A.r + 0.055) / 1.055, 2.4) : A.r / 12.92,
                            y = (A.g > 0.04045) ? Math.pow((A.g + 0.055) / 1.055, 2.4) : A.g / 12.92,
                            B = (A.b > 0.04045) ? Math.pow((A.b + 0.055) / 1.055, 2.4) : A.b / 12.92;
                    return {
                        x: x * 0.4124 + y * 0.3576 + B * 0.1805,
                        y: x * 0.2126 + y * 0.7152 + B * 0.0722,
                        z: x * 0.0193 + y * 0.1192 + B * 0.9505
                    }
                },
                d = function (y) {
                    var x = {
                        r: y.x * 3.2406 + y.y * -1.5372 + y.z * -0.4986,
                        g: y.x * -0.9689 + y.y * 1.8758 + y.z * 0.0415,
                        b: y.x * 0.0557 + y.y * -0.204 + y.z * 1.057
                    };
                    x.r = (x.r > 0.0031308) ? 1.055 * Math.pow(x.r, (1 / 2.4)) - 0.055 : 12.92 * x.r;
                    x.g = (x.g > 0.0031308) ? 1.055 * Math.pow(x.g, (1 / 2.4)) - 0.055 : 12.92 * x.g;
                    x.b = (x.b > 0.0031308) ? 1.055 * Math.pow(x.b, (1 / 2.4)) - 0.055 : 12.92 * x.b;
                    return x
                },
                k = function (C) {
                    var E = Math.min(C.r, C.g, C.b),
                            N = Math.max(C.r, C.g, C.b),
                            x = N - E,
                            A, B, y, D = {
                                h: 0,
                                s: 0,
                                v: N
                            };
                    if (x === 0) {
                        D.h = 0;
                        D.s = 0
                    } else {
                        D.s = x / N;
                        A = (((N - C.r) / 6) + (x / 2)) / x;
                        B = (((N - C.g) / 6) + (x / 2)) / x;
                        y = (((N - C.b) / 6) + (x / 2)) / x;
                        if (C.r === N) {
                            D.h = y - B
                        } else {
                            if (C.g === N) {
                                D.h = (1 / 3) + A - y
                            } else {
                                if (C.b === N) {
                                    D.h = (2 / 3) + B - A
                                }
                            }
                        }
                        if (D.h < 0) {
                            D.h += 1
                        } else {
                            if (D.h > 1) {
                                D.h -= 1
                            }
                        }
                    }
                    return D
                },
                f = function (x) {
                    var y = {
                        r: 0,
                        g: 0,
                        b: 0
                    },
                    A, C, B, D, E;
                    if (x.s === 0) {
                        y.r = y.g = y.b = x.v
                    } else {
                        A = x.h === 1 ? 0 : x.h * 6;
                        C = Math.floor(A);
                        B = x.v * (1 - x.s);
                        D = x.v * (1 - x.s * (A - C));
                        E = x.v * (1 - x.s * (1 - (A - C)));
                        if (C === 0) {
                            y.r = x.v;
                            y.g = E;
                            y.b = B
                        } else {
                            if (C === 1) {
                                y.r = D;
                                y.g = x.v;
                                y.b = B
                            } else {
                                if (C === 2) {
                                    y.r = B;
                                    y.g = x.v;
                                    y.b = E
                                } else {
                                    if (C === 3) {
                                        y.r = B;
                                        y.g = D;
                                        y.b = x.v
                                    } else {
                                        if (C === 4) {
                                            y.r = E;
                                            y.g = B;
                                            y.b = x.v
                                        } else {
                                            y.r = x.v;
                                            y.g = B;
                                            y.b = D
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return y
                },
                I = function (C) {
                    var E = Math.min(C.r, C.g, C.b),
                            N = Math.max(C.r, C.g, C.b),
                            x = N - E,
                            A, B, y, D = {
                                h: 0,
                                s: 0,
                                l: (N + E) / 2
                            };
                    if (x === 0) {
                        D.h = 0;
                        D.s = 0
                    } else {
                        D.s = D.l < 0.5 ? x / (N + E) : x / (2 - N - E);
                        A = (((N - C.r) / 6) + (x / 2)) / x;
                        B = (((N - C.g) / 6) + (x / 2)) / x;
                        y = (((N - C.b) / 6) + (x / 2)) / x;
                        if (C.r === N) {
                            D.h = y - B
                        } else {
                            if (C.g === N) {
                                D.h = (1 / 3) + A - y
                            } else {
                                if (C.b === N) {
                                    D.h = (2 / 3) + B - A
                                }
                            }
                        }
                        if (D.h < 0) {
                            D.h += 1
                        } else {
                            if (D.h > 1) {
                                D.h -= 1
                            }
                        }
                    }
                    return D
                },
                G = function (y) {
                    var A, B, x = function (C, D, E) {
                        if (E < 0) {
                            E += 1
                        }
                        if (E > 1) {
                            E -= 1
                        }
                        if ((6 * E) < 1) {
                            return C + (D - C) * 6 * E
                        }
                        if ((2 * E) < 1) {
                            return D
                        }
                        if ((3 * E) < 2) {
                            return C + (D - C) * ((2 / 3) - E) * 6
                        }
                        return C
                    };
                    if (y.s === 0) {
                        return {
                            r: y.l,
                            g: y.l,
                            b: y.l
                        }
                    }
                    B = (y.l < 0.5) ? y.l * (1 + y.s) : (y.l + y.s) - (y.s * y.l);
                    A = 2 * y.l - B;
                    return {
                        r: x(A, B, y.h + (1 / 3)),
                        g: x(A, B, y.h),
                        b: x(A, B, y.h - (1 / 3))
                    }
                },
                l = function (A) {
                    var B = A.x / 0.95047,
                            x = A.y,
                            y = A.z / 1.08883;
                    B = (B > 0.008856) ? Math.pow(B, (1 / 3)) : (7.787 * B) + (16 / 116);
                    x = (x > 0.008856) ? Math.pow(x, (1 / 3)) : (7.787 * x) + (16 / 116);
                    y = (y > 0.008856) ? Math.pow(y, (1 / 3)) : (7.787 * y) + (16 / 116);
                    return {
                        l: ((116 * x) - 16) / 100,
                        a: ((500 * (B - x)) + 128) / 255,
                        b: ((200 * (x - y)) + 128) / 255
                    }
                },
                K = function (y) {
                    var x = {
                        l: y.l * 100,
                        a: (y.a * 255) - 128,
                        b: (y.b * 255) - 128
                    },
                    A = {
                        x: 0,
                        y: (x.l + 16) / 116,
                        z: 0
                    };
                    A.x = x.a / 500 + A.y;
                    A.z = A.y - x.b / 200;
                    A.x = (Math.pow(A.x, 3) > 0.008856) ? Math.pow(A.x, 3) : (A.x - 16 / 116) / 7.787;
                    A.y = (Math.pow(A.y, 3) > 0.008856) ? Math.pow(A.y, 3) : (A.y - 16 / 116) / 7.787;
                    A.z = (Math.pow(A.z, 3) > 0.008856) ? Math.pow(A.z, 3) : (A.z - 16 / 116) / 7.787;
                    A.x *= 0.95047;
                    A.y *= 1;
                    A.z *= 1.08883;
                    return A
                },
                a = function (x) {
                    return {
                        c: 1 - (x.r),
                        m: 1 - (x.g),
                        y: 1 - (x.b)
                    }
                },
                H = function (x) {
                    return {
                        r: 1 - (x.c),
                        g: 1 - (x.m),
                        b: 1 - (x.y)
                    }
                },
                e = function (x) {
                    var y = 1;
                    if (x.c < y) {
                        y = x.c
                    }
                    if (x.m < y) {
                        y = x.m
                    }
                    if (x.y < y) {
                        y = x.y
                    }
                    if (y == 1) {
                        return {
                            c: 0,
                            m: 0,
                            y: 0,
                            k: 1
                        }
                    }
                    return {
                        c: (x.c - y) / (1 - y),
                        m: (x.m - y) / (1 - y),
                        y: (x.y - y) / (1 - y),
                        k: y
                    }
                },
                g = function (x) {
                    return {
                        c: x.c * (1 - x.k) + x.k,
                        m: x.m * (1 - x.k) + x.k,
                        y: x.y * (1 - x.k) + x.k
                    }
                };
        this.set = true;
        this.setAlpha = function (x) {
            if (x !== null) {
                c = L(x)
            }
            return this
        };
        this.getAlpha = function () {
            return c
        };
        this.setRGB = function (x, y, A) {
            F = {
                rgb: this.getRGB()
            };
            if (x !== null) {
                F.rgb.r = L(x)
            }
            if (y !== null) {
                F.rgb.g = L(y)
            }
            if (A !== null) {
                F.rgb.b = L(A)
            }
            return this
        };
        this.setHSV = function (x, y, A) {
            F = {
                hsv: this.getHSV()
            };
            if (x !== null) {
                F.hsv.h = L(x)
            }
            if (y !== null) {
                F.hsv.s = L(y)
            }
            if (A !== null) {
                F.hsv.v = L(A)
            }
            return this
        };
        this.setHSL = function (x, y, A) {
            F = {
                hsl: this.getHSL()
            };
            if (x !== null) {
                F.hsl.h = L(x)
            }
            if (y !== null) {
                F.hsl.s = L(y)
            }
            if (A !== null) {
                F.hsl.l = L(A)
            }
            return this
        };
        this.setLAB = function (x, y, A) {
            F = {
                lab: this.getLAB()
            };
            if (x !== null) {
                F.lab.l = L(x)
            }
            if (y !== null) {
                F.lab.a = L(y)
            }
            if (A !== null) {
                F.lab.b = L(A)
            }
            return this
        };
        this.setCMYK = function (x, B, y, A) {
            F = {
                cmyk: this.getCMYK()
            };
            if (x !== null) {
                F.cmyk.c = L(x)
            }
            if (B !== null) {
                F.cmyk.m = L(B)
            }
            if (y !== null) {
                F.cmyk.y = L(y)
            }
            if (A !== null) {
                F.cmyk.k = L(A)
            }
            return this
        };
        this.getRGB = function () {
            if (!F.rgb) {
                F.rgb = F.lab ? d(K(F.lab)) : F.hsv ? f(F.hsv) : F.hsl ? G(F.hsl) : F.cmyk ? H(g(F.cmyk)) : {
                    r: 0,
                    g: 0,
                    b: 0
                };
                F.rgb.r = L(F.rgb.r);
                F.rgb.g = L(F.rgb.g);
                F.rgb.b = L(F.rgb.b)
            }
            return v.extend({}, F.rgb)
        };
        this.getHSV = function () {
            if (!F.hsv) {
                F.hsv = F.lab ? k(this.getRGB()) : F.rgb ? k(F.rgb) : F.hsl ? k(this.getRGB()) : F.cmyk ? k(this.getRGB()) : {
                    h: 0,
                    s: 0,
                    v: 0
                };
                F.hsv.h = L(F.hsv.h);
                F.hsv.s = L(F.hsv.s);
                F.hsv.v = L(F.hsv.v)
            }
            return v.extend({}, F.hsv)
        };
        this.getHSL = function () {
            if (!F.hsl) {
                F.hsl = F.rgb ? I(F.rgb) : F.hsv ? I(this.getRGB()) : F.cmyk ? I(this.getRGB()) : F.hsv ? I(this.getRGB()) : {
                    h: 0,
                    s: 0,
                    l: 0
                };
                F.hsl.h = L(F.hsl.h);
                F.hsl.s = L(F.hsl.s);
                F.hsl.l = L(F.hsl.l)
            }
            return v.extend({}, F.hsl)
        };
        this.getCMYK = function () {
            if (!F.cmyk) {
                F.cmyk = F.rgb ? e(a(F.rgb)) : F.hsv ? e(a(this.getRGB())) : F.hsl ? e(a(this.getRGB())) : F.lab ? e(a(this.getRGB())) : {
                    c: 0,
                    m: 0,
                    y: 0,
                    k: 1
                };
                F.cmyk.c = L(F.cmyk.c);
                F.cmyk.m = L(F.cmyk.m);
                F.cmyk.y = L(F.cmyk.y);
                F.cmyk.k = L(F.cmyk.k)
            }
            return v.extend({}, F.cmyk)
        };
        this.getLAB = function () {
            if (!F.lab) {
                F.lab = F.rgb ? l(b(F.rgb)) : F.hsv ? l(b(this.getRGB())) : F.hsl ? l(b(this.getRGB())) : F.cmyk ? l(b(this.getRGB())) : {
                    l: 0,
                    a: 0,
                    b: 0
                };
                F.lab.l = L(F.lab.l);
                F.lab.a = L(F.lab.a);
                F.lab.b = L(F.lab.b)
            }
            return v.extend({}, F.lab)
        };
        this.getChannels = function () {
            return {
                r: this.getRGB().r,
                g: this.getRGB().g,
                b: this.getRGB().b,
                a: this.getAlpha(),
                h: this.getHSV().h,
                s: this.getHSV().s,
                v: this.getHSV().v,
                c: this.getCMYK().c,
                m: this.getCMYK().m,
                y: this.getCMYK().y,
                k: this.getCMYK().k,
                L: this.getLAB().l,
                A: this.getLAB().a,
                B: this.getLAB().b
            }
        };
        this.getSpaces = function () {
            return v.extend(true, {}, F)
        };
        this.setSpaces = function (x) {
            F = x;
            return this
        };
        this.distance = function (B) {
            var y = "lab",
                    D = "get" + y.toUpperCase(),
                    C = this[D](),
                    E = B[D](),
                    x = 0,
                    A;
            for (A in C) {
                x += Math.pow(C[A] - E[A], 2)
            }
            return x
        };
        this.equals = function (x) {
            var y = this.getRGB(),
                    A = x.getRGB();
            return this.getAlpha() == x.getAlpha() && y.r == A.r && y.g == A.g && y.b == A.b
        };
        this.limit = function (y) {
            y -= 1;
            var x = this.getRGB();
            this.setRGB(Math.round(x.r * y) / y, Math.round(x.g * y) / y, Math.round(x.b * y) / y)
        };
        this.toHex = function () {
            var x = this.getRGB();
            return J(x.r * 255) + J(x.g * 255) + J(x.b * 255)
        };
        this.toCSS = function () {
            return "#" + this.toHex()
        };
        this.normalize = function () {
            this.setHSV(null, 1, 1);
            return this
        };
        this.copy = function () {
            var x = this.getSpaces(),
                    y = this.getAlpha();
            return new w(x, y)
        };
        if (h.length == 2) {
            this.setSpaces(h[0]);
            this.setAlpha(h[1] === 0 ? 0 : h[1] || 1)
        }
        if (h.length > 2) {
            this.setRGB(h[0], h[1], h[2]);
            this.setAlpha(h[3] === 0 ? 0 : h[3] || 1)
        }
    };
    v.widget("vanderlee.colorpicker", {
        options: {
            alpha: false,
            altAlpha: true,
            altField: "",
            altOnChange: true,
            altProperties: "background-color",
            autoOpen: false,
            buttonColorize: false,
            buttonImage: "images/ui-colorpicker.png",
            buttonImageOnly: false,
            buttonText: null,
            closeOnEscape: true,
            closeOnOutside: true,
            color: "#00FF00",
            colorFormat: "HEX",
            draggable: true,
            duration: "fast",
            hsv: true,
            inline: true,
            layout: {
                map: [0, 0, 1, 5],
                bar: [1, 0, 1, 5],
                preview: [2, 0, 1, 1],
                hsv: [2, 1, 1, 1],
                rgb: [2, 2, 1, 1],
                alpha: [2, 3, 1, 1],
                hex: [2, 4, 1, 1],
                lab: [3, 1, 1, 1],
                cmyk: [3, 2, 1, 2],
                swatches: [4, 0, 1, 5]
            },
            limit: "",
            modal: false,
            mode: "h",
            parts: "",
            regional: "",
            rgb: true,
            showAnim: "fadeIn",
            showCancelButton: true,
            showNoneButton: false,
            showCloseButton: true,
            showOn: "focus",
            showOptions: {},
            swatches: null,
            swatchesWidth: 84,
            title: null,
            close: null,
            init: null,
            select: null,
            open: null
        },
        _create: function () {
            var a = this,
                    b;
            ++m;
            a.widgetEventPrefix = "color";
            a.opened = false;
            a.generated = false;
            a.inline = false;
            a.changed = false;
            a.dialog = null;
            a.button = null;
            a.image = null;
            a.overlay = null;
            a.mode = a.options.mode;
            if (this.element[0].nodeName.toLowerCase() === "input" || !a.options.inline) {
                a._setColor(a.element.val());
                this._callback("init");
                v("body").append(u);
                a.dialog = v(".ui-colorpicker:last");
                v(document).delegate("html", "touchstart click", function (d) {
                    if (!a.opened || d.target === a.element[0] || a.overlay) {
                        return
                    }
                    if (a.dialog.is(d.target) || a.dialog.has(d.target).length > 0) {
                        a.element.blur();
                        return
                    }
                    var c, e = v(d.target).parents();
                    for (c = 0; c <= e.length; ++c) {
                        if (a.button !== null && e[c] === a.button[0]) {
                            return
                        }
                    }
                    if (!a.options.closeOnOutside) {
                        return
                    }
                    a.close()
                });
                v(document).keydown(function (c) {
                    if (c.keyCode == 27 && a.opened && a.options.closeOnEscape) {
                        a.close()
                    }
                });
                if (a.options.showOn === "focus" || a.options.showOn === "both") {
                    a.element.on("focus click", function () {
                        a.open()
                    })
                }
                if (a.options.showOn === "button" || a.options.showOn === "both") {
                    if (a.options.buttonImage !== "") {
                        b = a.options.buttonText || a._getRegional("button");
                        a.image = v("<img/>").attr({
                            src: a.options.buttonImage,
                            alt: b,
                            title: b
                        });
                        a._setImageBackground()
                    }
                    if (a.options.buttonImageOnly && a.image) {
                        a.button = a.image
                    } else {
                        a.button = v('<button type="button"></button>').html(a.image || a.options.buttonText).button();
                        a.image = a.image ? v("img", a.button).first() : null
                    }
                    a.button.insertAfter(a.element).click(function () {
                        a[a.opened ? "close" : "open"]()
                    })
                }
                if (a.options.autoOpen) {
                    a.open()
                }
                a.element.keydown(function (c) {
                    if (c.keyCode === 9) {
                        a.close()
                    }
                }).keyup(function (c) {
                    var d = a._parseColor(a.element.val());
                    if (!a.color.equals(d)) {
                        a.color = d;
                        a._change()
                    }
                })
            } else {
                a.inline = true;
                v(this.element).html(s);
                a.dialog = v(".ui-colorpicker", this.element);
                a._generate();
                a.opened = true
            }
            return this
        },
        _setOption: function (a, b) {
            var c = this;
            switch (a) {
                case "disabled":
                    if (b) {
                        c.dialog.addClass("ui-colorpicker-disabled")
                    } else {
                        c.dialog.removeClass("ui-colorpicker-disabled")
                    }
                    break
            }
            v.Widget.prototype._setOption.apply(c, arguments)
        },
        _setImageBackground: function () {
            if (this.image && this.options.buttonColorize) {
                this.image.css("background-color", this.color.set ? this._formatColor("RGBA", this.color) : "")
            }
        },
        _setAltField: function () {
            if (this.options.altOnChange && this.options.altField && this.options.altProperties) {
                var a, b, c = this.options.altProperties.split(",");
                for (a = 0; a <= c.length; ++a) {
                    b = v.trim(c[a]);
                    switch (b) {
                        case "color":
                        case "background-color":
                        case "outline-color":
                        case "border-color":
                            v(this.options.altField).css(b, this.color.set ? this.color.toCSS() : "");
                            break
                    }
                }
                if (this.options.altAlpha) {
                    v(this.options.altField).css("opacity", this.color.set ? this.color.getAlpha() : "")
                }
            }
        },
        _setColor: function (a) {
            this.color = this._parseColor(a);
            this.currentColor = this.color.copy();
            this._setImageBackground();
            this._setAltField()
        },
        setColor: function (a) {
            this._setColor(a);
            this._change(this.color.set)
        },
        _generate: function () {
            var b = this,
                    d, e, c, a;
            b._setColor(b.inline ? b.options.color : b.element.val());
            if (typeof b.options.parts === "string") {
                if (p[b.options.parts]) {
                    c = p[b.options.parts]
                } else {
                    c = p[b.inline ? "inline" : "popup"]
                }
            } else {
                c = b.options.parts
            }
            b.parts = {};
            v.each(c, function (f, g) {
                if (q[g]) {
                    b.parts[g] = new q[g](b)
                }
            });
            if (!b.generated) {
                a = [];
                v.each(b.options.layout, function (g, f) {
                    if (b.parts[g]) {
                        a.push({
                            part: g,
                            pos: f
                        })
                    }
                });
                v(n(a, function (h, k, f) {
                    var g = ["ui-colorpicker-" + h.part + "-container"];
                    if (k > 0) {
                        g.push("ui-colorpicker-padding-left")
                    }
                    if (f > 0) {
                        g.push("ui-colorpicker-padding-top")
                    }
                    return '<td  class="' + g.join(" ") + '"' + (h.pos[2] > 1 ? ' colspan="' + h.pos[2] + '"' : "") + (h.pos[3] > 1 ? ' rowspan="' + h.pos[3] + '"' : "") + ' valign="top"></td>'
                })).appendTo(b.dialog).addClass("ui-dialog-content ui-widget-content");
                b._initAllParts();
                b._updateAllParts();
                b.generated = true
            }
        },
        _effectGeneric: function (e, f, a, c, b) {
            var d = this;
            if (v.effects && v.effects[d.options.showAnim]) {
                e[f](d.options.showAnim, d.options.showOptions, d.options.duration, b)
            } else {
                e[(d.options.showAnim === "slideDown" ? a : (d.options.showAnim === "fadeIn" ? c : f))]((d.options.showAnim ? d.options.duration : null), b);
                if (!d.options.showAnim || !d.options.duration) {
                    b()
                }
            }
        },
        _effectShow: function (a, b) {
            this._effectGeneric(a, "show", "slideDown", "fadeIn", b)
        },
        _effectHide: function (a, b) {
            this._effectGeneric(a, "hide", "slideUp", "fadeOut", b)
        },
        open: function () {
            var c = this,
                    d, f, h, g, e, k, a, b;
            if (!c.opened) {
                c._generate();
                d = c.element.offset();
                f = v(window).height() + v(window).scrollTop();
                h = v(window).width() + v(window).scrollLeft();
                g = c.dialog.outerHeight();
                e = c.dialog.outerWidth();
                k = d.left;
                a = d.top + c.element.outerHeight();
                if (k + e > h) {
                    k = Math.max(0, h - e)
                }
                if (a + g > f) {
                    if (d.top - g >= v(window).scrollTop()) {
                        a = d.top - g
                    } else {
                        a = Math.max(0, f - g)
                    }
                }
                c.dialog.css({
                    left: k,
                    top: a
                });
                b = 0;
                v(c.element[0]).parents().each(function () {
                    var l = v(this).css("z-index");
                    if ((typeof (l) === "number" || typeof (l) === "string") && l !== "" && !isNaN(l)) {
                        b = parseInt(l);
                        return false
                    }
                });
                c.dialog.css("z-index", b += 2);
                c.overlay = c.options.modal ? new v.ui.dialog.overlay(c) : null;
                c._effectShow(this.dialog);
                c.opened = true;
                c._callback("open", true);
                v(function () {
                    c._repaintAllParts()
                })
            }
        },
        close: function () {
            var a = this;
            a.currentColor = a.color.copy();
            a.changed = false;
            a._effectHide(a.dialog, function () {
                a.dialog.empty();
                a.generated = false;
                a.opened = false;
                a._callback("close", true)
            });
            if (a.overlay) {
                a.overlay.destroy()
            }
        },
        destroy: function () {
            this.element.unbind();
            if (this.image !== null) {
                this.image.remove()
            }
            if (this.button !== null) {
                this.button.remove()
            }
            if (this.dialog !== null) {
                this.dialog.remove()
            }
            if (this.overlay) {
                this.overlay.destroy()
            }
        },
        _callback: function (b, a) {
            var d = this,
                    c, e;
            if (d.color.set) {
                c = {
                    formatted: d._formatColor(d.options.colorFormat, d.color)
                };
                e = d.color.getLAB();
                e.a = (e.a * 2) - 1;
                e.b = (e.b * 2) - 1;
                if (a === true) {
                    c.a = d.color.getAlpha();
                    c.rgb = d.color.getRGB();
                    c.hsv = d.color.getHSV();
                    c.cmyk = d.color.getCMYK();
                    c.hsl = d.color.getHSL();
                    c.lab = e
                }
                return d._trigger(b, null, c)
            } else {
                return d._trigger(b, null, {
                    formatted: ""
                })
            }
        },
        _initAllParts: function () {
            v.each(this.parts, function (b, a) {
                if (a.init) {
                    a.init()
                }
            })
        },
        _updateAllParts: function () {
            v.each(this.parts, function (b, a) {
                if (a.update) {
                    a.update()
                }
            })
        },
        _repaintAllParts: function () {
            v.each(this.parts, function (b, a) {
                if (a.repaint) {
                    a.repaint()
                }
            })
        },
        _change: function (b) {
            this.color.set = (b !== false);
            this.changed = true;
            switch (this.options.limit) {
                case "websafe":
                    this.color.limit(6);
                    break;
                case "nibble":
                    this.color.limit(16);
                    break;
                case "binary":
                    this.color.limit(2);
                    break;
                case "name":
                    var a = this._getSwatch(this._closestName(this.color));
                    this.color.setRGB(a.r, a.g, a.b);
                    break
            }
            if (!this.inline) {
                if (!this.color.set) {
                    this.element.val("")
                } else {
                    if (!this.color.equals(this._parseColor(this.element.val()))) {
                        this.element.val(this._formatColor(this.options.colorFormat, this.color))
                    }
                }
                this._setImageBackground();
                this._setAltField()
            }
            if (this.opened) {
                this._repaintAllParts()
            }
            this._callback("select")
        },
        _hoverable: function (a) {
            a.hover(function () {
                a.addClass("ui-state-hover")
            }, function () {
                a.removeClass("ui-state-hover")
            })
        },
        _focusable: function (a) {
            a.focus(function () {
                a.addClass("ui-state-focus")
            }).blur(function () {
                a.removeClass("ui-state-focus")
            })
        },
        _getRegional: function (a) {
            return v.colorpicker.regional[this.options.regional][a] !== undefined ? v.colorpicker.regional[this.options.regional][a] : v.colorpicker.regional[""][a]
        },
        _getSwatches: function () {
            if (typeof (this.options.swatches) === "string") {
                return v.colorpicker.swatches[this.options.swatches]
            }
            if (v.isPlainObject(this.options.swatches)) {
                return v.colorpicker.swatches
            }
            return v.colorpicker.swatches.html
        },
        _getSwatch: function (c) {
            var a = this._getSwatches(),
                    b = false;
            if (a[c] !== undefined) {
                return a[c]
            }
            v.each(a, function (e, d) {
                if (e.toLowerCase() == c.toLowerCase()) {
                    b = d;
                    return false
                }
                return true
            });
            return b
        },
        _parseColor: function (b) {
            var a, c;
            if (b == "") {
                return new w()
            }
            a = this._getSwatch(v.trim(b));
            if (a) {
                return new w(a.r, a.g, a.b)
            }
            c = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(b);
            if (c) {
                return new w(c[1] / 255, c[2] / 255, c[3] / 255, parseFloat(c[4]))
            }
            c = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(b);
            if (c) {
                return (new w()).setHSL(c[1] / 255, c[2] / 255, c[3] / 255).setAlpha(parseFloat(c[4]))
            }
            c = /^rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(b);
            if (c) {
                return new w(c[1] / 100, c[2] / 100, c[3] / 100, c[4] / 100)
            }
            c = /^hsla?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/.exec(b);
            if (c) {
                return (new w()).setHSL(c[1] / 100, c[2] / 100, c[3] / 100).setAlpha(c[4] / 100)
            }
            c = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(b);
            if (c) {
                return new w(parseInt(c[1], 16) / 255, parseInt(c[2], 16) / 255, parseInt(c[3], 16) / 255)
            }
            c = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/.exec(b);
            if (c) {
                return new w(parseInt(c[1] + c[1], 16) / 255, parseInt(c[2] + c[2], 16) / 255, parseInt(c[3] + c[3], 16) / 255)
            }
            return r(b)
        },
        _exactName: function (a) {
            var b = false;
            v.each(this._getSwatches(), function (c, d) {
                if (a.equals(new w(d.r, d.g, d.b))) {
                    b = c;
                    return false
                }
                return true
            });
            return b
        },
        _closestName: function (a) {
            var d = a.getRGB(),
                    b = null,
                    e = false,
                    c;
            v.each(this._getSwatches(), function (f, g) {
                c = a.distance(new w(g.r, g.g, g.b));
                if (c < b || b === null) {
                    e = f;
                    if (c == 0) {
                        return false
                    }
                    b = c
                }
                return true
            });
            return e
        },
        _formatColor: function (f, e) {
            var c = this,
                    b = null,
                    d = {
                        x: function (g) {
                            return o(g * 255)
                        },
                        d: function (g) {
                            return Math.round(g * 255)
                        },
                        f: function (g) {
                            return g
                        },
                        p: function (g) {
                            return g * 100
                        }
                    },
            a = e.getChannels();
            if (!v.isArray(f)) {
                f = [f]
            }
            v.each(f, function (h, g) {
                if (c._formats[g]) {
                    b = c._formats[g](e, c);
                    return (b === false)
                } else {
                    b = g.replace(/\\?[argbhsvcmykLAB][xdfp]/g, function (k) {
                        if (k.match(/^\\/)) {
                            return k.slice(1)
                        }
                        return d[k.charAt(1)](a[k.charAt(0)])
                    });
                    return false
                }
            });
            return b
        },
        _formats: {
            "#HEX": function (a, b) {
                return b._formatColor("#rxgxbx", a)
            },
            "#HEX3": function (c, b) {
                var a = b._formats.HEX3(c);
                return a === false ? false : "#" + a
            },
            HEX: function (a, b) {
                return b._formatColor("rxgxbx", a)
            },
            HEX3: function (f, b) {
                var e = f.getRGB(),
                        c = Math.round(e.r * 255),
                        d = Math.round(e.g * 255),
                        a = Math.round(e.b * 255);
                if (((c >>> 4) == (c &= 15)) && ((d >>> 4) == (d &= 15)) && ((a >>> 4) == (a &= 15))) {
                    return c.toString(16) + d.toString(16) + a.toString(16)
                }
                return false
            },
            RGB: function (a, b) {
                return a.getAlpha() >= 1 ? b._formatColor("rgb(rd,gd,bd)", a) : false
            },
            RGBA: function (a, b) {
                return b._formatColor("rgba(rd,gd,bd,af)", a)
            },
            "RGB%": function (a, b) {
                return a.getAlpha() >= 1 ? b._formatColor("rgb(rp%,gp%,bp%)", a) : false
            },
            "RGBA%": function (a, b) {
                return b._formatColor("rgba(rp%,gp%,bp%,af)", a)
            },
            HSL: function (a, b) {
                return a.getAlpha() >= 1 ? b._formatColor("hsl(hd,sd,vd)", a) : false
            },
            HSLA: function (a, b) {
                return b._formatColor("hsla(hd,sd,vd,af)", a)
            },
            "HSL%": function (a, b) {
                return a.getAlpha() >= 1 ? b._formatColor("hsl(hp%,sp%,vp%)", a) : false
            },
            "HSLA%": function (a, b) {
                return b._formatColor("hsla(hp%,sp%,vp%,af)", a)
            },
            NAME: function (a, b) {
                return b._closestName(a)
            },
            EXACT: function (a, b) {
                return b._exactName(a)
            }
        }
    })
}(jQuery));