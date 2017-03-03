var videoElement;
$(document).ready(function () {
  var mobileMenu = $('#mobile-nav');
  var siteNav = $('.site-navbar');
  var mobileMenuToggle = $('#mobile-nav-toggle');
  var video = $('#lead-video');
  videoElement = video[0];

  $('.site-navbar').headroom();
  $('p').widont();
  $('h2').widont();
  $('h3').widont();

  // jQuery(function($) {
  //   $('h1,h2,h3,li,p').each(function() {
  //     $(this).html($(this).html().replace(/\s([^\s<]{0,10})\s*$/,'&nbsp;$1'));
  //   });
  // });

  mobileMenuToggle.on('click', function(event) {
    mobileMenu.toggleClass('active');
    siteNav.toggleClass('active');
  });

  video.on('ended', function(event) {
    videoElement.currentTime = 10.064;
    videoElement.play();
  });
});
