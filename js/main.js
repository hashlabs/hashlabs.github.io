new WOW().init(); // Trigger for animation

// Typed.js function
$(function(){
  $("#typed").typed({
    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
    stringsElement: $('#typed-strings'),
    // typing speed
    typeSpeed: 30,
    // time before typing starts
    startDelay: 80,
    // backspacing speed
    backSpeed: 5,
    // time before backspacing
    backDelay: 1800,
    // loop
    loop: false,
    // false = infinite
    loopCount: false,
    // show cursor
    showCursor: false,
    // either html or text
    contentType: 'html',
  });
});

/****************** function for menu hide and show **************************
*/
var menuOffset = 50;

var myElement = document.querySelector("#site-nav");
var headroom  = new Headroom(myElement, {
    offset: menuOffset,
    classes: {
      initial: "animated",
      pinned: "detached", // scrolling up
      unpinned: "invisible", // scrolling down
      bottom: "fixed", // bottom of the page
      top: "default" // top of the page
    }
});
headroom.init();

// shows/hides navigation’s popover if class "expanded"
$('.mobile-toggle').on('click touchstart', function(event) {
  showHideNav();
  event.preventDefault();
});
// clicking anywhere inside navigation or heading won’t close navigation’s popover
$('#site-nav-mobile').on('click touchstart', function(event){
  event.stopPropagation();
});
// checks if navigation’s popover is shown
function showHideNav() {
  if ($('#site-nav').hasClass('expanded')) {
    hideNav();
  } else {
    showNav();
  }
}
// shows the navigation’s popover
function showNav() {
  $('#site-nav').addClass('expanded');
  $('.mobile-toggle').addClass('is-active'); // menu toggle animation to X
  $('body').addClass('no_scroll');
}
// hides the navigation’s popover
function hideNav() {
  $('#site-nav').removeClass('expanded');
  $('.mobile-toggle').removeClass('is-active'); // menu toggle animation to burger icon
  $('body').removeClass();
}
