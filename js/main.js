$(document).ready(function () {
  var mobileMenuElements = $('#mobile-nav, .site-navbar, #mobile-nav-toggle');
  var mobileMenuToggle = $('#mobile-nav-toggle');
  var mobileNavLinks = $('.nav-mobile-link');
  var navBar = $('.site-navbar');
  var video = $('#lead-video');
  var linkWasClicked = false;

  /*
    All of the videos used on the lead section, have a loop
    that starts at second 11, so we set that on this variable
  */
  var loopResetTime = 11;
  var videoElement = video[0];

  /*
    This makes sure headroom stays open when we click a nav link
  */
  $('.site-navbar').headroom({
    onUnpin: function() {
      $(this).toggleClass(this.classes.unpinned, !linkWasClicked);
      $(this).toggleClass(this.classes.pinned, linkWasClicked);

      linkWasClicked = false;

      return false;
    }
  });

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
    mobileMenuElements.toggleClass('active');
  });

  mobileNavLinks.on('click', function(event) {
    event.preventDefault();
    mobileMenuElements.removeClass('active');
    linkWasClicked = true;
    console.log(this.getAttribute('href'));
  });

  // This resets the video to the loopResetTime
  // and starts reproducing it again.
  video.on('ended', function(event) {
    videoElement.currentTime = loopResetTime;
    videoElement.play();
  });
});
