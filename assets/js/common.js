/**
 * Main FullPage.js initialization and scroll logic
 */
function fullPage() {
    $("#js-fullpage").fullpage({
        easingcss3: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        scrollingSpeed: 1000,
        anchors: ["top", "works", "about", "contact"],
        navigation: true,
        navigationPosition: "left",
        controlArrows: false,
        animateAnchor: false,

        onLeave: function (index, nextIndex, direction) {
            // Handle 'Scroll Down' button visibility
            if (index == 1) {
                anime({
                    targets: ".scrollDown",
                    translateY: "180%",
                    duration: 500,
                    easing: "easeInOutCubic"
                });
            }
            if (nextIndex == 1) {
                anime({
                    targets: ".scrollDown",
                    translateY: ["180%", 0],
                    duration: 500,
                    easing: "easeInOutCubic"
                });
            }

            // Section animations if state is idle (0)
            if (state == 0) {
                var nextClass = ".fp-section-" + nextIndex;
                var timeline = anime.timeline();

                timeline
                    .add({
                        targets: nextClass + " .image",
                        scale: [0.85, 1],
                        translateX: ["10%", 0],
                        translateZ: 0,
                        easing: "easeOutCubic",
                        duration: 1500,
                        delay: 500
                    })
                    .add({
                        targets: nextClass + " .image__cover",
                        translateX: [0, "110%"],
                        translateZ: 0,
                        easing: "easeInOutQuart",
                        duration: function (el, i) { return 1200 - 200 * i; },
                        offset: "-=1700"
                    })
                    .add({
                        targets: nextClass + " .page-num p",
                        translateY: ["100%", 0],
                        translateZ: 0,
                        easing: "easeInOutCubic",
                        duration: 1000,
                        offset: "-=1200"
                    })
                    .add({
                        targets: nextClass + " .js-letter",
                        translateX: ["-105%", 0],
                        translateZ: 0,
                        easing: "easeInOutCubic",
                        duration: 800,
                        delay: function (el, i) { return 50 * i; },
                        offset: "-=1500"
                    });

                // Special "Moon" animation for top section
                if (index == 1) {
                    anime({
                        targets: ".js-moon",
                        translateX: [0, "100%"],
                        translateZ: 0,
                        opacity: [1, 0],
                        easing: "easeOutCubic",
                        duration: 800,
                        delay: function (el, i) { return 50 * i; }
                    });
                }
                if (nextIndex == 1) {
                    anime({
                        targets: ".js-moon",
                        translateX: ["100%", 0],
                        translateZ: 0,
                        opacity: [0, 1],
                        easing: "easeOutCubic",
                        duration: 800,
                        delay: function (el, i) { return 500 + 50 * i; }
                    });
                }
            }
        },
        afterRender: function () {
            // Add helper classes to sections
            $(".section").each(function (i) {
                var num = i + 1;
                $(this).addClass("fp-section-" + num);
            });
        }
    });
}

/**
 * Changes header color based on scroll position for sub-pages
 */
function headerColor() {
    var pageName = $(".barba-container").attr("data-namespace");
    $(window).on("scroll", function () {
        if (pageName !== "top" && $(window).scrollTop() > $(window).height()) {
            $("header").addClass("js-color");
            $(".back-arrow").addClass("js-color");
        } else {
            $("header").removeClass("js-color");
            $(".back-arrow").removeClass("js-color");
        }
    });
}

/**
 * Asset Preloading
 */
$('<img src="./assets/img/reile.jpg">');
$('<img src="./assets/img/about.jpg">');
$('<img src="./assets/img/contact.jpg">');

/**
 * Initial Page Load Animation
 */
$(window).on("load", function () {
    anime.timeline()
        .add({
            targets: ".loader",
            translateY: [0, "-100%"],
            translateZ: 0,
            easing: "easeInOutCubic",
            duration: 800,
            complete: function () {
                $(".loader").addClass(".js-hidden");
            }
        })
        .add({
            targets: ".js-moon",
            translateX: ["100%", 0],
            translateZ: 0,
            opacity: [0, 1],
            easing: "easeOutCubic",
            duration: 800,
            delay: function (el, i) { return 500 + 50 * i; },
            offset: "-=1000"
        })
        .add({
            targets: ".active .js-letter",
            translateX: ["-105%", 0],
            translateZ: 0,
            easing: "easeInOutCubic",
            duration: 800,
            delay: function (el, i) { return 50 * i; },
            offset: "-=1200"
        });
});

/**
 * Responsive Image and Layout Calculator
 */
var $win = $(window),
    fpnav = {},
    image = {},
    imageBig = {},
    isSp = false;

$(function () {
    $win.on("load resize", function () {
        var _vw = window.innerWidth,
            _spImgH = Math.round(_vw * 0.80 / 1.76) + "px",
            _pcImgH = Math.round(_vw * 0.53125 / 1.76) + "px";

        // Mobile defaults (Smartphone)
        isSp = true;
        fpnav = { y: "100%", x: 0 };
        image = { width: "80%", height: _spImgH, top: 0, marginRight: "10%", marginLeft: "10%" };
        imageBig = { width: "100%", height: "65.492%", marginLeft: 0, top: 0 };

        // For PC screens
        if (window.matchMedia("(min-width: 801px)").matches) {
            isSp = !1;
            fpnav = { y: 0, x: "-100%" };
            // width: 53.125% of viewport
            image = {
                width: "53.125%",
                height: Math.round(window.innerWidth * 0.53125 / 1.76) + "px", // Calculate height based on 1.76 ratio
                top: "auto",
                marginRight: "8%",
                marginLeft: "auto"
            };
            imageBig = {
                width: "60.677%",
                height: "100vh", // Amplified to full screen height
                marginLeft: "auto",
                top: "auto"
            };
        }
        // Tablet break-point
        else if (window.matchMedia("(min-width: 421px)").matches) {
            isSp = false;
            fpnav = { y: "100%", x: 0 };
            image = { width: "53.125%", height: _pcImgH, marginRight: 40, marginLeft: "auto" };
            imageBig = { width: "60.677%", height: "100vh", top: "auto", marginLeft: "auto" };
        }
    });
});

/**
 * Barba.js PJAX Configuration
 */
Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
Barba.Pjax.preventCheck = function (evt, element) {
    if (element && element.href && element.href.indexOf("#") > -1) {
        var currentURL = window.location.href.split("#")[0].replace(/\/$/, "");
        var targetURL = element.href.split("#")[0].replace(/\/$/, "");
        if (currentURL === targetURL) return false;
    }
    return Barba.Pjax.originalPreventCheck(evt, element);
};

var state = 0;

Barba.Dispatcher.on("newPageReady", function () {
    // Parallax effects
    if ($("#js-fullpage").length) {
        new Parallax($(".js-parallax-moon").get(0));
        new Parallax($(".js-parallax-moonlight").get(0));
        new Parallax($(".js-parallax-star").get(0));
    }
    if (isSp) {
        $(".page-top").height($(window).height());
    }
    // Google Analytics track
    ga("send", "pageview", window.location.pathname.replace(/^\/?/, "/") + window.location.search);
});

/**
 * Global Menu and Navigation Interaction
 */
$(function () {
    fullPage();
    var winHeight = $(window).height();

    $(".js-menuBtn").on("click", function () {
        $(".menuIcon").toggleClass("js-menuOpen");
        $(".global-nav").toggleClass("js-open");

        if ($(window).scrollTop() > winHeight) {
            $("header").toggleClass("js-color");
        }

        // Determine which transition to use based on current page/state
        if ($(this).hasClass("js-menuOpen")) {
            Barba.Pjax.getTransition = function () { return PageTransitionCurtain; };
        } else if ($("#js-fullpage").length) {
            Barba.Pjax.getTransition = function () { return PageTransitionTop; };
        } else {
            Barba.Pjax.getTransition = function () { return PageTransitionUnder; };
        }
    });
});

/**
 * Barba Views (Life-cycle hooks)
 */
var topTransition = Barba.BaseView.extend({
    namespace: "top",
    onEnter: function () {
        Barba.Pjax.getTransition = function () { return PageTransitionTop; };
        $(".js-contact").on("click", function () {
            $(".menuIcon").removeClass("js-menuOpen");
            $(".global-nav").removeClass("js-open");
            $.fn.fullpage.moveTo("contact");
            Barba.Pjax.getTransition = function () { return PageTransitionTop; };
        });
    },
    onLeaveCompleted: function () {
        $.fn.fullpage.destroy("all");
    }
});
topTransition.init();

var underLayer = Barba.BaseView.extend({
    namespace: "under",
    onEnter: function () {
        Barba.Pjax.getTransition = function () { return PageTransitionUnder; };
        $(window).scroll(function () {
            $(".js-scroll").each(function () {
                if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
                    $(this).addClass("in");
                }
            });
        });
        if (isSp) $(".page-top").height($(window).height());
    },
    onEnterCompleted: function () {
        headerColor();
        anime.timeline({ duration: 500, easing: "easeInOutCubic" })
            .add({ targets: ".btn-wrap", translateY: ["110%", 0] })
            .add({ targets: ".back-arrow svg", translateX: ["100%", 0], offset: "-=500" })
            .add({ targets: ".scrollDown", translateY: ["180%", 0], offset: "-=500" });
    },
    onLeave: function () {
        state = 1;
        anime.timeline({ duration: 500, easing: "easeInOutCubic" })
            .add({ targets: ".btn-wrap", translateY: [0, "110%"] })
            .add({ targets: ".back-arrow svg", translateX: [0, "-100%"], offset: "-=500" });
    },
    onLeaveCompleted: function () {
        fullPage();
        state = 0;
        anime.timeline({ duration: 500, easing: "easeInOutCubic" })
            .add({ targets: ".active .page-num p", translateY: ["100%", 0], translateZ: 0 })
            .add({ targets: "#fp-nav ul", translateY: [fpnav.y, 0], translateX: [fpnav.x, 0], translateZ: 0, offset: "-=500" })
            .add({ targets: ".fullpage__slide", background: ["#020b16", "rgba(0,0,0,0)"], offset: "-=500" })
            .add({ targets: ".active .btn-wrap", translateY: ["110%", 0], translateZ: 0, offset: "-=500" });
    }
});
underLayer.init();

/**
 * Custom Transitions Definition
 */
var PageTransitionTop = Barba.BaseTransition.extend({
    start: function () {
        this.open().then(this.newContainerLoading).then(this.finish.bind(this))
    },
    open: function () {
        return new Promise(function (resolve) {
            anime.timeline({ duration: 500, easing: "easeInOutCubic", complete: function () { resolve() } })
                .add({
                    targets: ".active .image", // The homepage image
                    width: [image.width, imageBig.width],
                    height: [image.height, imageBig.height],
                    marginRight: [image.marginRight, 0],
                    marginLeft: [image.marginLeft, imageBig.marginLeft],
                    top: [image.top, imageBig.top]
                })
                .add({ targets: ".fullpage__slide", background: ["rgba(0,0,0,0)", "#020b16"], offset: "-=500" })
                .add({ targets: ".page-num p", translateY: [0, "100%"], translateZ: 0, offset: "-=500" })
                .add({ targets: "#fp-nav ul", translateY: [0, fpnav.y], translateX: [0, fpnav.x], translateZ: 0, offset: "-=500" })
                .add({ targets: ".active .btn-wrap", translateY: [0, "110%"], translateZ: 0, offset: "-=500" })
                .play()
        })
    },
    finish: function () { this.done() } // Simple finish logic from common2.min.js
});

var PageTransitionUnder = Barba.BaseTransition.extend({
    start: function () {
        this.close().then(this.newContainerLoading).then(this.finish.bind(this))
    },
    close: function () {
        return new Promise(function (resolve) {
            var closeAnime = anime.timeline({ duration: 500, easing: "easeInOutCubic", autoplay: !1, complete: function () { resolve() } })
                .add({
                    targets: ".page-top .image", // Shrinks back to homepage size
                    width: [imageBig.width, image.width],
                    height: [imageBig.height, image.height],
                    marginRight: [0, image.marginRight],
                    marginLeft: [imageBig.marginLeft, image.marginLeft],
                    top: [imageBig.top, image.top]
                });
            0 !== $(window).scrollTop() ? $("body,html").animate({ scrollTop: 0 }, 500, "swing", closeAnime.play) : closeAnime.play()
        })
    },
    finish: function () { this.done() }
});

var PageTransitionUnder = Barba.BaseTransition.extend({
    start: function () {
        this.close().then(this.newContainerLoading).then(this.finish.bind(this));
    },
    close: function () {
        return new Promise(function (resolve) {
            var closeAnime = anime.timeline({
                duration: 500,
                easing: "easeInOutCubic",
                autoplay: false,
                complete: function () { resolve(); }
            }).add({
                targets: ".page-top .image",
                width: [imageBig.width, image.width],
                height: [imageBig.height, image.height],
                marginRight: [0, image.marginRight],
                marginLeft: [imageBig.marginLeft, image.marginLeft],
                top: [imageBig.top, image.top]
            });

            if ($(window).scrollTop() !== 0) {
                $("body,html").animate({ scrollTop: 0 }, 500, "swing", closeAnime.play);
            } else {
                closeAnime.play();
            }
        });
    },
    finish: function () {
        var _this = this;
        anime({
            targets: ".page-top .image",
            opacity: [1, 0],
            duration: 200,
            easing: "linear",
            complete: function () {
                _this.done();
                anime({
                    targets: ".active .image",
                    opacity: [0, 1],
                    duration: 400,
                    easing: "easeOutCubic"
                });
            }
        });
    }
});

/**
 * Barba.js Initialization
 */
$(function () {
    Barba.Pjax.start();
    Barba.Prefetch.init();
    Barba.Utils.xhrTimeout = 10000;
});