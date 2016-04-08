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


/****************** function for menu hide and show ***************************/

var previousScroll = 0, // previous scroll position
menuOffset = 50, // height of menu (once scroll passed it, menu is hidden)
detachPoint = 560, // point of detach (after scroll passed it, menu is fixed)
hideShowOffset = 6; // scrolling value after which triggers hide/show menu
// on scroll hide/show menu
$(window).scroll(function() {
  if (!$('#site-nav').hasClass('expanded')) {
    var currentScroll = $(this).scrollTop(), // gets current scroll position
    scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling
    // if scrolled past menu
    if (currentScroll > menuOffset) {
      // if scrolled past detach point add class to fix menu
      if (currentScroll > detachPoint) {
        if (!$('#site-nav').hasClass('detached'))
        $('#site-nav').addClass('detached');
      }
      // if scrolling faster than hideShowOffset hide/show menu
      if (scrollDifference >= hideShowOffset) {
        if (currentScroll > previousScroll) {
          // scrolling down; hide menu
          if (!$('#site-nav').hasClass('invisible'))
          $('#site-nav').addClass('invisible');
        } else {
          // scrolling up; show menu
          if ($('#site-nav').hasClass('invisible'))
          $('#site-nav').removeClass('invisible');
        }
      }
    } else {
      // only remove “detached” class if user is at the top of document (menu jump fix)
      if (currentScroll <= 0){
        $('#site-nav').removeClass();
      }
    }
    // if user is at the bottom of document show menu
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      $('#site-nav').removeClass('invisible');
    }
    // replace previous scroll position with new one
    previousScroll = currentScroll;
  }
});
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
  $('#site-nav').removeClass('invisible').addClass('expanded');
  $('.mobile-toggle').addClass('is-active'); // menu toggle animation to X
  window.setTimeout(function(){$('body').addClass('no_scroll');}, 200); // Firefox hack. Hides scrollbar as soon as menu animation is done
  }
// hides the navigation’s popover
function hideNav() {
  window.setTimeout(function(){$('body').removeClass();}, 10); // allow animations to start before removing class (Firefox)
  $('#site-nav').removeClass('expanded');
  $('.mobile-toggle').removeClass('is-active'); // menu toggle animation to burger icon
}

// keyboard shortcuts
$('body').keydown(function(e) {
  // menu accessible via TAB as well
  if ($("#site-nav .icon").is(":focus")) {
    // if ENTER/SPACE show/hide menu
    if (e.keyCode === 13 || e.keyCode === 32) {
      showHideNav();
      e.preventDefault();
    }
  }
  // if ESC show/hide menu
  if (e.keyCode === 27 || e.keyCode === 77) {
    showHideNav();
    e.preventDefault();
  }

});

/* function to show animation in menu button*/
(function() {

  "use strict";

  var toggles = document.querySelectorAll('.mobile-toggle');

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  }

  function toggleHandler(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      (this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
    });
  }

})();
