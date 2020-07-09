AOS.init();
$(function() { // Shorthand for $( document ).ready()
    $('.dropdown-trigger').dropdown({
        hover: true
    });
    $('.sidenav').sidenav();
    $('.parallax').parallax()
})