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

  var navbarHeader = $("#site-nav");
  var teehanNav  = new TeehanLax(navbarHeader, {
    classes: {
      detached: "header-detached",
      hidden: "header-hidden",
      expanded: "expanded"
    }
  });

  teehanNav.init();

  // var previousScroll = 0,
  // menuOffset = 100,
  // detachPoint = 560,
  // hideShowOffset = 6;

  // $(window).scroll(function() {
  //   if (!$('#site-nav').hasClass('expanded')) {
  //     var currentScroll = $(this).scrollTop(),
  //     scrollDifference = Math.abs(currentScroll - previousScroll); //

  //     if (currentScroll > menuOffset) {

  //       if (currentScroll > detachPoint) {
  //         if (!$('#site-nav').hasClass('header-detached'))
  //         $('#site-nav').addClass('header-detached');
  //       }

  //       if (scrollDifference >= hideShowOffset) {
  //         if (currentScroll > previousScroll) {

  //           if (!$('#site-nav').hasClass('header-hidden'))
  //           $('#site-nav').addClass('header-hidden');
  //         } else {

  //           if ($('#site-nav').hasClass('header-hidden'))
  //           $('#site-nav').removeClass('header-hidden');
  //         }
  //       }
  //     } else {

  //       if (currentScroll <= 0){
  //         $('#site-nav').removeClass("header-hidden header-detached");
  //       }
  //     }

  //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //       $('#site-nav').removeClass('header-hidden');
  //     }

  //     previousScroll = currentScroll;
  //   }
  // });

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




