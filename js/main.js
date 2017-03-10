var videoElement;
$(document).ready(function () {
  var mobileMenu = $('#mobile-nav');
  var siteNav = $('.site-navbar');
  var mobileMenuToggle = $('#mobile-nav-toggle');
  var toggleEl = $('.menu-toggle');
  var video = $('#lead-video');

  videoElement = video[0];

  $('.site-navbar').headroom();

  // Stop automatic widont initialisation
  // Without this h1 to h6 tags would get
  // widont applied.
  $.jqwidont.auto(false);
  $('.widont').widont();

  mobileMenuToggle.on('click', function(event) {
    mobileMenu.toggleClass('active');
    siteNav.toggleClass('active');
    toggleEl.toggleClass('active');
  });

  video.on('ended', function(event) {
    videoElement.currentTime = 10.064;
    videoElement.play();
  });
});
