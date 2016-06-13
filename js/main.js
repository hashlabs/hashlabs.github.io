$(document).ready(function () {
  var video = $('.fullscreen-video-object').get(0);
  $(video).css({display: 'none'});

  reproduceVideo = function(elementVideo) {
    $(elementVideo).css({display: 'block'});
    elementVideo.play();
  }

  if (video && video.readyState >= video.HAVE_ENOUGH_DATA) {
    reproduceVideo(video);
  } else if (video) {
    video.addEventListener('canplay', function() {
      reproduceVideo(video);
    });
  }

  new WOW({
    mobile: false
  }).init();

  $('#typed').typed({
    stringsElement: $('#typed-strings'),
    typeSpeed: 30,
    startDelay: 80,
    backSpeed: 5,
    backDelay: 1800,
    loop: false,
    loopCount: false,
    showCursor: false,
    contentType: 'html',
    onStringTyped: function () {
      this.stringsCount = this.stringsCount || 1;
      if (this.stringsCount === 1) {
        $('.leadtext.static').css({display: 'none'});
        $('.leadtext:not(.static)').css({display: 'block'});
      }
      this.stringsCount++;
    }
  });

  var navbarHeader = $('#site-nav');
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
