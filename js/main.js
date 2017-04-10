var distance = $("#contactForm").position().top;
var windowHeight = $(window).height();
var formDistance = distance - windowHeight;

$(document).ready(function(){
    $(window).scroll(function(){
        if ($(window).scrollTop() > formDistance){
            console.log("entered!"+formDistance);
            focusInput($("#Name"));
        }
        else if($(window).scrollTop() < formDistance){
            console.log("exited!"+formDistance);
            $("#Name").blur();
        }
    });
});

function focusInput(elem) {
  var x = window.scrollX, y = window.scrollY;
  elem.focus();
  window.scrollTo(x, y);
}
