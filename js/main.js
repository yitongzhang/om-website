var distance = $("#contactForm").position().top;
var windowHeight = $(window).height();
var formDistance = distance - windowHeight;

$(document).ready(function () {

    // This is messing up scrolling on mobile.
    // TODO: Decide if necessary, or if we just disable for mobile.

    //$(window).scroll(function () {
    //    if ($(window).scrollTop() > formDistance) {
    //        console.log("entered!" + formDistance);
    //        focusInput($("#Name"));
    //    }
    //    else if ($(window).scrollTop() < formDistance) {
    //        console.log("exited!" + formDistance);
    //        $("#Name").blur();
    //    }
    //});

    $('.selected').on('click', function (e) {
        e.preventDefault();
    });
});

function focusInput(elem) {
    var x = window.scrollX, y = window.scrollY;
    elem.focus();
    window.scrollTo(x, y);
}

