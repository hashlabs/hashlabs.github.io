$(document).ready(function () {
  new WOW().init();

  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    typeSpeed: 30,
    startDelay: 80,
    backSpeed: 5,
    backDelay: 1800,
    loop: false,
    loopCount: false,
    showCursor: false,
    contentType: 'html',
  });

  var previousScroll = 0, // previous scroll position
  menuOffset = 100, // height of menu (once scroll passed it, menu is hidden)
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
          if (!$('#site-nav').hasClass('header-detached'))
          $('#site-nav').addClass('header-detached');
        }
        // if scrolling faster than hideShowOffset hide/show menu
        if (scrollDifference >= hideShowOffset) {
          if (currentScroll > previousScroll) {
            // scrolling down; hide menu
            if (!$('#site-nav').hasClass('header-hidden'))
            $('#site-nav').addClass('header-hidden');
          } else {
            // scrolling up; show menu
            if ($('#site-nav').hasClass('header-hidden'))
            $('#site-nav').removeClass('header-hidden');
          }
        }
      } else {
        // only remove “header-detached” class if user is at the top of document (menu jump fix)
        if (currentScroll <= 0){
          $('#site-nav').removeClass("header-hidden header-detached");
        }
      }
      // if user is at the bottom of document show menu
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        $('#site-nav').removeClass('header-hidden');
      }
      // replace previous scroll position with new one
      previousScroll = currentScroll;
    }
  });

  $('.mobile-toggle').on('click touchstart', function(event) {
    showHideNav();
    event.preventDefault();
  });

  $('#site-nav-mobile').on('click touchstart', function(event){
    event.stopPropagation();
  });

  function showHideNav() {
    if ($('#site-nav').hasClass('expanded')) {
      hideNav();
    } else {
      showNav();
    }
  }

  function showNav() {
    $('#site-nav').addClass('expanded');
    $('.mobile-toggle').addClass('is-active');
    $('body').addClass('no_scroll');
  }

  function hideNav() {
    $('#site-nav').removeClass('expanded');
    $('.mobile-toggle').removeClass('is-active');
    $('body').removeClass('no_scroll');
  }
});




