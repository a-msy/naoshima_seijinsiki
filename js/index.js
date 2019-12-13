$(document).ready(function() {

    var $slider = $(".slider"),
        $slideBGs = $(".slide__bg"),
        diff = 0,
        curSlide = 0,
        numOfSlides = $(".slide").length-1,
        animating = false,
        animTime = 500,
        autoSlideTimeout,
        autoSlideDelay= 6000,
        $pagination = $(".slider-pagi");

    function createBullets() {
        for (var i = 0; i < numOfSlides+1; i++) {
            var $li = $("<li class='slider-pagi__elem'></li>");
            $li.addClass("slider-pagi__elem-"+i).data("page", i);
            if (!i) $li.addClass("active");
            $pagination.append($li);
        }
    };

    createBullets();

    function manageControls() {
        $(".slider-control").removeClass("inactive");
        if (!curSlide) $(".slider-control.left").addClass("inactive");
        if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
    };

    function autoSlide() {
        autoSlideTimeout = setTimeout(function() {
            curSlide++;
            if (curSlide > numOfSlides) curSlide = 0;
            changeSlides();
        }, autoSlideDelay);
    };

    // autoSlide();

    function changeSlides(instant) {
        if (!instant) {
            animating = true;
            manageControls();
            $slider.addClass("animating");
            $slider.css("top");
            $(".slide").removeClass("active");
            $(".slide-"+curSlide).addClass("active");
            setTimeout(function() {
                $slider.removeClass("animating");
                animating = false;
            }, animTime);
        }
        window.clearTimeout(autoSlideTimeout);
        $(".slider-pagi__elem").removeClass("active");
        $(".slider-pagi__elem-"+curSlide).addClass("active");
        $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
        $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
        diff = 0;
        // autoSlide();
    }

    function navigateLeft() {
        if (animating) return;
        if (curSlide > 0) curSlide--;
        changeSlides();
    }

    function navigateRight() {
        if (animating) return;
        if (curSlide < numOfSlides) curSlide++;
        changeSlides();
    }

    $(document).on("mousedown touchstart", ".slider", function(e) {
        if (animating) return;
        window.clearTimeout(autoSlideTimeout);
        var startX = e.pageX || e.originalEvent.touches[0].pageX,
            winW = $(window).width();
        diff = 0;

        $(document).on("mousemove touchmove", function(e) {
            var x = e.pageX || e.originalEvent.touches[0].pageX;
            diff = (startX - x) / winW * 70;
            if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
            $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
            $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
        });
    });

    $(document).on("mouseup touchend", function(e) {
        $(document).off("mousemove touchmove");
        if (animating) return;
        if (!diff) {
            changeSlides(true);
            return;
        }
        if (diff > -8 && diff < 8) {
            changeSlides();
            return;
        }
        if (diff <= -8) {
            navigateLeft();
        }
        if (diff >= 8) {
            navigateRight();
        }
    });

    $(document).on("click", ".slider-control", function() {
        if ($(this).hasClass("left")) {
            navigateLeft();
        } else {
            navigateRight();
        }
    });

    $(document).on("click", ".slider-pagi__elem", function() {
        curSlide = $(this).data("page");
        changeSlides();
    });

});

var Expand = (function() {
    var tile = $('.strips__strip');
    var tileLink = $('.strips__strip > .strip__content');
    var tileText = tileLink.find('.strip__inner-text');
    var stripClose = $('.strip__close');

    var expanded  = false;

    var open = function() {

        var tile = $(this).parent();

        if (!expanded) {
            tile.addClass('strips__strip--expanded');
            // add delay to inner text
            tileText.css('transition', 'all .5s .3s cubic-bezier(0.23, 1, 0.32, 1)');
            stripClose.addClass('strip__close--show');
            stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
            expanded = true;
        }
    };

    var close = function() {
        if (expanded) {
            tile.removeClass('strips__strip--expanded');
            // remove delay from inner text
            tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
            stripClose.removeClass('strip__close--show');
            stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)')
            expanded = false;
        }
    }

    var bindActions = function() {
        tileLink.on('click', open);
        stripClose.on('click', close);
    };

    var init = function() {
        bindActions();
    };

    return {
        init: init
    };

}());

Expand.init();

$(document).ready(function(){

    (function($) {

        $('#header__icon').click(function(e){
            e.preventDefault();
            $('body').toggleClass('with--sidebar');
        });

        $('#site-cache').click(function(e){
            $('body').removeClass('with--sidebar');
        });

    })(jQuery);

});

$(document).ready(function() {

    // INITIATE THE FOOTER
    siteFooter();
    // COULD BE SIMPLIFIED FOR THIS PEN BUT I WANT TO MAKE IT AS EASY TO PUT INTO YOUR SITE AS POSSIBLE
    $(window).resize(function() {
        siteFooter();
    });

    function siteFooter() {
        var siteContent = $('#site-content');
        var siteContentHeight = siteContent.height();
        var siteContentWidth = siteContent.width();

        var siteFooter = $('#site-footer');
        var siteFooterHeight = siteFooter.height();
        var siteFooterWidth = siteFooter.width();

        console.log('Content Height = ' + siteContentHeight + 'px');
        console.log('Content Width = ' + siteContentWidth + 'px');
        console.log('Footer Height = ' + siteFooterHeight + 'px');
        console.log('Footer Width = ' + siteFooterWidth + 'px');

        siteContent.css({
            "margin-bottom" : siteFooterHeight + 50
        });
    };
});