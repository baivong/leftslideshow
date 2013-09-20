/*!
 * leftslideshow - jQuery Plugin
 * version: 2.0 (Thursday, September 19, 2013)
 * requires jQuery v1.4 or later
 * Homepage http://zzbaivong.blogspot.com/
 * Copyright 2013 baivong
 */

(function ($) {
    "use strict";
    function slideshow(z, s, e) {
        $(".b_timebar", z).animate({
            width: "100%"
        }, s, "linear", function () {
            $(".b_timebar", z).css("width", 0);
            slideleft("last", "first", z, e);
            slideshow(z, s, e);
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
            a.removeClass("selected");
            b.addClass("selected");
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
        }
    }

    function reset(a) {
        a.css({
            left: 0
        }).removeClass("change");
    }

    function setindex(z, b) {
        $(".b_paging .selected", z).removeClass("selected");
        $(".b_paging a", z).eq(b.index()).addClass("selected");
    }

    function enterFS(e, z) {
        if (e.requestFullscreen) {
            e.requestFullscreen();
        } else if (e.msRequestFullscreen) {
            e.msRequestFullscreen();
        } else if (e.mozRequestFullScreen) {
            e.mozRequestFullScreen();
        } else if (e.webkitRequestFullScreen) {
            e.webkitRequestFullScreen();
        } else {
            $(".b_SideImg", z).css({
                position: "fixed"
            }).width($(window).width() - 10);
            $(".b_content", z).height($(window).height() - $(".b_control", z).height() - 10);
        }
    }

    function exitFS(z, w) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else {
            $(".b_SideImg", z).removeAttr("style");
            w.resize();
        }
    }

    $.fn.leftslideshow = function (opts) {
        var defaults = {
            itemsSelector: ".bv_img",
            effect: "slide",
            width: "640px",
            height: "480px",
            speed: 3000,
            autoPlay: false,
            hideControl: false,
            infoBtn: true,
            infoShow: false,
            infoContent: "",
            noCopy: false,
            autoResize: true,
            fullScreen: true,
            scrollTo: true,
            open: function () {},
            start: function () {},
            pause: function () {}
        };
        var options = $.extend({}, defaults, opts);
        return this.each(function () {
            var obj = $(this);
            var items = $(options.itemsSelector, obj);
            var speed = options.speed;
            if (speed < 500) {
                speed = 500;
            }
            if (items.length > 1) {
                options.open();
                var effect = options.effect;
                $('<div class="b_SideImg" style="width:' + options.width + '"><div class="b_content" style="height:' + options.height + '"><div class="b_timebar"></div><ul class="b_slides"></ul><div class="b_prev"></div><div class="b_next"></div><div class="b_load"></div></div><div class="b_control"><div class="b_play"></div><div class="b_pause"></div><div class="b_paging"></div></div></div>').insertAfter(items.last());
                $(".b_slides", obj).addClass(function () {
                    if (effect == "fade") {
                        return "faded";
                    } else if (effect == "slide") {
                        return "slided";
                    } else {
                        console.error("Set effect, slide or fade.");
                    }
                });
                if (options.hideControl) {
                    $(".b_control", obj).addClass("hidden");
                }
                if (options.infoBtn) {
                    $(".b_content", obj).append('<div class="b_info"></div>');
                    $(".b_info", obj).click(function () {
                        $(".b_slides p", obj).toggleClass("show_info");
                    });
                }
                if (options.noCopy) {
                    $(".b_content", obj).append('<div class="b_copy"></div>');
                }
                if (options.fullScreen) {
                    $(".b_content", obj).append('<div class="b_fullscreen"></div>');
                    $(".b_fullscreen", obj).toggle(function () {
                        enterFS($(".b_SideImg", obj)[0], obj);
                    }, function () {
                        exitFS(obj, $(window));
                    });
                }
                var nload = 0;
                items.each(function (i) {
                    var url, tip, tag = this.tagName;
                    if (tag == "A") {
                        url = this.href;
                        tip = this.innerHTML;
                    } else if (tag == "IMG") {
                        url = this.src;
                        tip = this.alt;
                    } else {
                        console.error("Does not support " + tag + " tag.");
                    }
                    if (!tip) {
                        tip = "...";
                    }
                    if (options.infoContent.length) {
                        tip = options.infoContent;
                    }
                    $(".b_paging", obj).append('<a class="b_wait" href="#">' + (i + 1) + '</a>');
                    $(".b_slides", obj).append('<li><img src="' + url + '" alt="Please wait..." /><p>' + tip + '</p></li>');
                    $(".b_slides img", obj).eq(i).bind("load error", function (e) {
                        if (e.type == "error") {
                            $(".b_slides p", obj).eq(i).html("<strong style='color:red'>Image not found</strong><br />" + this.src);
                            this.alt = "Image not found";
                            this.src = "http://a.servimg.com/u/f75/17/70/81/78/galler10.png";
                        }
                        var mload = nload++,
                            iload = items.length - 1;
                        $(".b_paging a", obj).eq(i).removeClass("b_wait");
                        $(".b_load", obj).text(Math.floor(mload * 100 / iload) + "%");
                        if (mload == iload) {
                            $(".b_load", obj).delay(100).fadeOut(500);
                        }
                    });
                });
                if (options.infoShow) {
                    $(".b_slides li p", obj).addClass("show_info");
                }
                if (options.autoResize) {
                    var sswidth = $(".b_SideImg", obj).width();
                    var ssheight = $(".b_content", obj).height();
                    $(window).resize(function () {
                        $(".b_SideImg", obj).css("position", "fixed").width(function () {
                            if (obj.width() < sswidth + 10) {
                                return obj.width() - 10;
                            } else {
                                return sswidth;
                            }
                        }).css("position", "relative");
                        $(".b_content", obj).height(function () {
                            var hctrl = $(".b_control", obj).height();
                            if (options.hideControl) {
                                hctrl = 0;
                            }
                            if ($(window).height() < ssheight + hctrl + 10) {
                                return $(window).height() - hctrl - 10;
                            } else {
                                return ssheight;
                            }
                        });
                    });
                    $(window).resize();
                }
                $(".b_next", obj).click(function () {
                    slideleft("last", "first", obj, effect);
                });
                $(".b_prev", obj).click(function () {
                    slideleft("first", "last", obj, effect);
                });
                $(".b_play", obj).click(function () {
                    options.start();
                    $(".b_play", obj).hide().next().show();
                    slideshow(obj, speed, effect);
                });
                $(".b_pause, .b_prev, .b_next, .b_paging a", obj).click(function () {
                    if ($(".b_play", obj).is(":hidden")) {
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
                $(".b_slides li:first, .b_paging a:first", obj).addClass("selected");
                if (options.scrollTo) {
                    $("body").scrollTop($(".b_SideImg", obj).offset().top);
                }
                if (options.autoPlay) {
                    $(".b_play", obj).click();
                }
                items.remove();
                $("br", obj).remove();
            }
        });
    };
})(jQuery);
