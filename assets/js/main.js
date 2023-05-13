(function($) {
    window.onload = function() {
        $(document).ready(function() {
            menuMobile();
            elementor();
            css_select();
            openTab();
            uploadfile();
            load_explorer();
            overviewDropdown();
            updown();
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

// Làm phần dropdown của Overview
function overviewDropdown(){
    $(".Overview_filter_bg_select").each(function(index,value){
        value.addEventListener('click',function(){
            if(value.querySelector('.act')){
                $(".Overview_active").find('.Overview_filter_bg_content').removeClass('act').slideToggle();  
                $(".Overview_active").removeClass('Overview_active');
                return false;
            }
            if($(value).find(".Overview_active")){
                $(".Overview_active").find('.Overview_filter_bg_content').removeClass('act').slideToggle();  
                $(".Overview_active").removeClass('Overview_active');
            }
            $(value).toggleClass('Overview_active');
            $(value).find('.Overview_filter_bg_content').toggleClass('act').slideToggle();

            $test = value.querySelectorAll('.select_bg_item_content');
            $test.forEach(function(child_value,child_index){
                child_value.addEventListener("click",function(){
                    $vl = child_value.querySelector('.name').innerHTML;
                    value.querySelector('.extra_value').value = $vl.trim();
                    value.querySelector('.main_value').value = $vl.trim();
                });
            });
        });
    });

}

window.addEventListener("scroll", function(event) { 
    var scroll_y = this.scrollY; 
    var n = document.getElementById('event');
    if(n){
        if(scroll_y > n.offsetTop){
            document.getElementById("dinosaur").style.left = (scroll_y - n.offsetTop)/1.5+"px";
        }
    }
}); 

// Css select
function css_select(){
    var x, i, j, l, ll, selElmnt, a, b, c;
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        ll = selElmnt.length;
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < ll; j++) {
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                var y, i, k, s, h, sl, yl;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                sl = s.length;
                h = this.parentNode.previousSibling;
                for (i = 0; i < sl; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        yl = y.length;
                        for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < xl; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    document.addEventListener("click", closeAllSelect);
}


// Load explorer
function load_explorer(){
    $('.choose_tab>button:first-child').addClass('active');
    $('.tabcontent:first-child').css("display","block");
    $('.tabcontent_top:first-child').css("display","block");
}

// Css tab
function openTab(evt, cityName, cityNameTop) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tabcontent_top = document.getElementsByClassName("tabcontent_top");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent_top[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if( document.getElementById(cityName) && document.getElementById(cityNameTop) && evt){
        document.getElementById(cityName).style.display = "block";
        document.getElementById(cityNameTop).style.display = "block";
        evt.currentTarget.className += " active";  
    }
}

// Upload file image
function uploadfile(){
    const wrapper = document.querySelector(".wrapper");
    const fileName = document.querySelector(".file-name");
    const defaultBtn = document.querySelector("#default-btn");
    const customBtn = document.querySelector("#custom-btn");
    const cancelBtn = document.querySelector("#cancel-btn i");
    const img = document.querySelector(".uploadFile img");
    let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
    if(customBtn){
        customBtn.addEventListener("click",function(){
            defaultBtn.click();
            defaultBtn.addEventListener("change", function(){
                const file = this.files[0];
                if(file){
                    const reader = new FileReader();
                    reader.onload = function(){
                    const result = reader.result;
                    img.src = result;
                    wrapper.classList.add("active");
                    }
                    cancelBtn.addEventListener("click", function(){
                    img.src = "";
                    wrapper.classList.remove("active");
                    })
                    reader.readAsDataURL(file);
                }
                if(this.value){
                    let valueStore = this.value.match(regExp);
                    fileName.textContent = valueStore;
                }          
            });
        });
    }
}

// Tăng giảm số lượng
function updown(){
    if($('.reduce') && $('.increase')){
        $('.reduce').on("click",function(){
            if($("input[name=connect_detail_quantity]").val() == 0){
                return false;
            }
            $reduce = $("input[name=connect_detail_quantity]").val();
            $reduce--;
            $("input[name=connect_detail_quantity]").val($reduce);
        });

        $('.increase').on("click",function(){
            $increase = $("input[name=connect_detail_quantity]").val();
            $increase++;
            $("input[name=connect_detail_quantity]").val($increase);
        });
    }
}




