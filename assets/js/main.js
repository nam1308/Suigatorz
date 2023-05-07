(function($) {
    window.onload = function() {
        $(document).ready(function() {
            menuMobile();
            elementor();
        });
    };
})(jQuery);

// Menu mobile
function menuMobile() {
    $(".header__bars").click(function() {
        $(".overlay").addClass("overlay-active");
        $(".menu-mobile").addClass("menu-mobile-active");
    });
    $(".overlay").click(function() {
        $(".overlay").removeClass("overlay-active");
        $(".menu-mobile").removeClass("menu-mobile-active");
    });
    $(".menu-mobile-close").click(function() {
        $(".overlay").removeClass("overlay-active");
        $(".menu-mobile").removeClass("menu-mobile-active");
    });
    $('.menu-mobile').show();
    $(".menu-mobile ul li.menu-item-has-children>ul").before(`<span class="li-plus"></span>`);
    $(".menu-mobile ul li.current-menu-parent.menu-item-has-children .li-plus").addClass("clicked");
    if ($(".li-plus").length) {
        $(".li-plus").click(function(e) {
            if ($(this).hasClass("clicked")) {
                $(this).removeClass('clicked').siblings('ul').slideUp();
            } else {
                $(this).parent().siblings('li').find('.li-plus').removeClass('clicked').find("ul").slideUp();
                $(this).parent().siblings().find("ul").slideUp();
                $(this).addClass('clicked').siblings('ul').slideDown();
            }
        });
    }

}

// Làm slick slider trang giới thiệu
$('.sec_history_main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.sec_history_nav'
});
$('.sec_history_nav').slick({
    // slidesToShow: 7,
    slidesToScroll: 1,
    asNavFor: '.sec_history_main',
    dots: true,
    centerMode: true,
    focusOnSelect: true
});


// Backtoptop
(function($) { "use strict";

$(document).ready(function(){"use strict";
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';    
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress); 
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > offset) {
        jQuery('.progress-wrap').addClass('active-progress');
        } else {
        jQuery('.progress-wrap').removeClass('active-progress');
        }
    });       
    jQuery('.progress-wrap').on('click', function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});

})(jQuery); 

// Làm phần drop
function elementor(){
    $(".elementor-accordion-item").each(function(index,value){
        value.addEventListener('click',function(){
            if(value.querySelector('.act')){
                $(".elementor-active").find('.elementor-tab-content').removeClass('act').slideToggle();  
                $(".elementor-active").removeClass('elementor-active');
                return false;
            }
            if($(value).parent().find(".elementor-active")){
                $(".elementor-active").find('.elementor-tab-content').removeClass('act').slideToggle();  
                $(".elementor-active").removeClass('elementor-active');
            }
            $(value).toggleClass('elementor-active');
            $(value).find('.elementor-tab-content').toggleClass('act').slideToggle();
        }); 
    });
}

window.addEventListener("scroll", function(event) { 
    var scroll_y = this.scrollY; 
    var n = document.getElementById('event');
    if(scroll_y > n.offsetTop){
        document.getElementById("dinosaur").style.left = (scroll_y - n.offsetTop)/1.5+"px";
    }
}); 