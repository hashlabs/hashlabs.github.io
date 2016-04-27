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

  var menuOffset = 0;
  var myElement = document.querySelector("#site-nav");
  var headroom  = new Headroom(myElement, {
    offset: menuOffset,
    classes: {
      pinned: "slideInDown",
      unpinned: "slideOutUp",
      bottom: "site-nav-bottom",
      top: "site-nav-top",
      notTop: "site-nav-not-top"
    },
    tolerance: 3
  });

  headroom.init();

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
    $('body').removeClass();
  }
});




