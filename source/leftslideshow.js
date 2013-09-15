/*
 * leftslideshow - jQuery Plugin
 * version: 1.3 (Sun, 15 Sep 2013)
 * requires jQuery v1.4 or later
 * Homepage http://zzbaivong.blogspot.com/
 * Copyright 2013 baivong
 */

(function ($) {
    "use strict";
    $.fn.leftslideshow = function (opts) {
        var defaults = {
            itemsSelector: ".bv_img",
            appendTo: "",
            infoContent: "",
            effect: "slide",
            width: "640px",
            height: "480px",
            speed: 3000,
            slideRight: false,
            autoStart: false,
            autoPlay: false,
            controlRight: false,
            hideControl: false,
            infoBtn: false,
            noCopy: false,
            autoResize: true,
            closeBtn: true,
            hideItems: true,
            scrollTo: true,
            open: function () {},
            start: function () {},
            pause: function () {},
            close: function () {}
        };
        var options = $.extend({}, defaults, opts);
        return this.each(function () {
            var obj = $(this);
            var items = $(options.itemsSelector, obj);
            var speed = options.speed;
            if (speed < 500) {
                speed = 500;
            }
            items.click(function () {
                if (items.length > 1) {
                    options.open();
                    if (!$(".b_SideImg", obj).length) {
                        var effect = options.effect;
                        var info = "",
                            close = "",
                            copy = "",
                            appe = obj,
                            apobj = $(options.appendTo, obj);
                        if (options.infoBtn) {
                            info = '<div class="b_info"></div>';
                        }
                        if (options.closeBtn) {
                            close = '<div class="b_close"></div>';
                        }
                        if (options.noCopy) {
                            copy = '<div class="b_copy"></div>';
                        }
                        if (apobj.length) {
                            appe = apobj;
                        }
                        $('<div class="b_SideImg" style="width:' + options.width + '"><div class="b_content" style="height:' + options.height + '"><ul class="b_slides"></ul>' + info + close + '<div class="b_prev"></div><div class="b_next"></div>' + copy + '</div><div class="b_control"><div class="b_play"></div><div class="b_pause"></div><div class="b_paging"></div><div class="b_timebar"></div></div></div>').appendTo(appe);
                        if (options.hideControl) {
                            $(".b_control", obj).height(0).hover(function () {
                                $(this).height("auto");
                            }, function () {
                                $(this).animate({
                                    height: 0
                                }, 100);
                            });
                        }
                        if (options.controlRight) {
                            $(".b_paging", obj).css({
                                "padding-right": "32px",
                                    "padding-left": 0,
                                    "text-align": "left"
                            });
                            $(".b_play, .b_pause, .b_timebar", obj).css({
                                left: "auto",
                                right: 0
                            });
                        }
                        items.each(function (i) {
                            var tip = this.alt;
                            if (!tip.length) {
                                tip = "...";
                            }
                            if (options.infoContent.length) {
                                tip = options.infoContent;
                            }
                            $(".b_slides", obj).append('<li><img src="' + this.src + '" /><p>' + tip + '</p></li>');
                            $(".b_paging", obj).append('<a href="#">' + (i + 1) + '</a>');
                        });
                        if (options.autoResize) {
                            var owid = $(".b_SideImg", obj).width(),
                                ohei = $(".b_content", obj).height();
                            var wh = $(window).height(),
                                wrap = $(".b_SideImg", obj);
                            if (obj.width() - 20 < owid) {
                                wrap.width(obj.width() - 20);
                            }
                            if (wh < (ohei + $(".b_control", obj).height() + 40)) {
                                $(".b_content", obj).height(wh - $(".b_control", obj).height() - 60);
                            }
                            $(window).resize(function () {
                                if ((obj.width() - 20) < owid) {
                                    wrap.width(obj.width() - 20);
                                } else {
                                    wrap.width(owid);
                                }
                                if ($(window).height() < (ohei + $(".b_control", obj).height() + 40)) {
                                    $(".b_content", obj).height($(window).height() - $(".b_control", obj).height() - 60);
                                } else {
                                    $(".b_content", obj).height(ohei);
                                }
                            });
                        }
                        $(".b_next", obj).click(function () {
                            if (!$(this).hasClass("stop")) {
                                slideleft("last", "first", obj, effect);
                            }
                        });
                        $(".b_prev", obj).click(function () {
                            if (!$(this).hasClass("stop")) {
                                slideleft("first", "last", obj, effect);
                            }
                        });
                        $(".b_play", obj).click(function () {
                            options.start();
                            $(".b_play", obj).hide().next().show();
                            slideshow(obj, speed, options.slideRight, effect);
                        });
                        $(".b_pause, .b_prev, .b_next, .b_paging a, .b_close", obj).click(function () {
                            if ($(".b_play").is(":hidden")) {
                                stopslide(obj);
                            }
                        });
                        $(".b_pause", obj).click(function () {
                            options.pause();
                        });
                        $(".b_paging a", obj).click(function () {
                            $(".b_SideImg .selected", obj).removeClass("selected");
                            $(this).addClass("selected");
                            $(".b_slides li", obj).eq($(this).index()).addClass("selected");
                            return false;
                        });
                        $(".b_info", obj).click(function () {
                            $(".b_slides p", obj).toggleClass("show_info");
                        });
                        $(".b_close", obj).click(function () {
                            $(".b_SideImg", obj).hide();
                            items.show();
                            $("br", obj).show();
                            options.close();
                        });
                    } else {
                        $(".b_SideImg .selected", obj).removeClass("selected");
                        if ($(".b_SideImg", obj).is(":hidden")) {
                            $(".b_SideImg", obj).show();
                        }
                    }
                    if (options.hideItems) {
                        items.hide();
                        $("br", obj).hide();
                    }
                    var b_iimg = $(".b_slides img[src='" + this.src + "']", obj).parent().index();
                    $(".b_slides li:eq(" + b_iimg + "), .b_paging a:eq(" + b_iimg + ")", obj).addClass("selected");
                    if (options.scrollTo) {
                        $("body").scrollTop($(".b_SideImg", obj).offset().top);
                    }
                    if (options.autoPlay && $(".b_pause").is(":hidden")) {
                        $(".b_play", obj).click();
                    }
                }
                return false;
            });
            if (options.autoStart) {
                items.first().click();
            }
        });
    };
    function slideshow(z, s, r, e) {
        $(".b_timebar", z).animate({
            width: "100%"
        }, s, "linear", function () {
            $(".b_timebar", z).css("width", 0);
            if (r) {
                slideleft("first", "last", z, e);
            } else {
                slideleft("last", "first", z, e);
            }
            slideshow(z, s, r, e);
        });
    }
    function stopslide(z) {
        $(".b_play", z).show().next().hide();
        $(".b_timebar", z).css("width", 0).stop();
    }
    function slideleft(x, y, z, e) {
        var a = $(".b_slides li.selected", z),
            b;
        if (a.is("':" + x + "-child'")) {
            b = $(".b_slides li:" + y, z);
        } else {
            if (x == "last") {
                b = a.next();
            } else {
                b = a.prev();
            }
        }
        if (e == "fade") {
            $(".b_next, .b_prev", z).addClass("stop");
            a.removeClass("selected").fadeOut(400);
            b.fadeIn(400, function () {
                b.addClass("selected");
                $(".b_next, .b_prev", z).removeClass("stop");
            });
            setindex(z, b);
        } else if (e == "slide") {
            var k = "100%",
                p = "-100%";
            if (x == "last") {
                k = "-100%";
                p = "100%";
            }
            a.removeClass("selected").addClass("change").stop().animate({
                left: k
            }, 400, function () {
                reset(a);
            });
            b.addClass("change").css("left", p).stop().animate({
                left: 0
            }, 400, function () {
                reset(b);
                b.addClass("selected");
                setindex(z, b);
            });
        } else {
            console.error("Set effect, slide or fade");
        }
    }
    function setindex(z, b) {
        $(".b_paging .selected", z).removeClass("selected");
        $(".b_paging a", z).eq(b.index()).addClass("selected");
    }
    function reset(a) {
        a.css({
            left: 0
        }).removeClass("change");
    }
})(jQuery);
