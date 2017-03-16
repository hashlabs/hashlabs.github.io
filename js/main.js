$(document).ready(function () {
  var mobileMenu = $('#mobile-nav');
  var siteNav = $('.site-navbar');
  var mobileMenuToggle = $('#mobile-nav-toggle');
  var toggleEl = $('.menu-toggle');
  var video = $('#lead-video');

  /*
    All of the videos used on the lead section, have a loop
    that starts at second 11, so we set that on this variable
  */
  var loopResetTime = 11;
  var videoElement = video[0];

  $('.site-navbar').headroom();

  /*
    We add a non breaking space (&nbsp;) between the last two
    words of the selected elements, to prevent orphan words.
  */
  $('.prevent-orphan').each(function() {
    $(this).html(
      $(this).html().replace(/\s([^\s<]+)\s*$/, '&nbsp;$1')
    );
  });

  mobileMenuToggle.on('click', function(event) {
    mobileMenu.toggleClass('active');
    siteNav.toggleClass('active');
    toggleEl.toggleClass('active');
  });

  // This resets the video to the loopResetTime
  // and starts reproducing it again.
  video.on('ended', function(event) {
    videoElement.currentTime = loopResetTime;
    videoElement.play();
  });
});
