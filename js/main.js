$(document).ready(function () {

  $(window).on('beforeunload', function() {
      $(window).scrollTop(0);
  });

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  if(!isMobile) {
    new WOW().init();
  }

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

  var navbarHeader = $("#site-nav");
  var teehanNav  = new TeehanLax(navbarHeader, {
    menuOffset: 100,
    hideShowOffset: 6,
    detachPoint: 500,
    classes: {
      detached: "header-detached",
      hidden: "header-hidden"
    }
  });

  teehanNav.init();

  $('.mobile-toggle').on('click touchstart', function(event) {
    showHideNav();
    event.preventDefault();
  });

  $('#site-nav-mobile').on('click touchstart', function(event){
    event.stopPropagation();
  });

  function showHideNav() {
    if ($('#site-nav-mobile').hasClass('expanded')) {
      hideNav();
    } else {
      showNav();
    }
  }

  function showNav() {
    $('#site-nav-mobile').addClass('expanded');
    $('.mobile-toggle').addClass('is-active');
    $('body').addClass('no_scroll');
  }

  function hideNav() {
    $('#site-nav-mobile').removeClass('expanded');
    $('.mobile-toggle').removeClass('is-active');
    $('body').removeClass('no_scroll');
  }

  $.lazyLoadXT.onerror = null;

  $.lazyLoadXT.onload = function() {
    var $el = $(this);
    $el
      .removeClass('lazy-hidden')
      .addClass('animated ' + $el.attr('data-effect'));
  };
});
