$(document).ready(function() {
  var HashLabsNavbar = {
    init: function navbar() {
      // detect user has scrolled
      $(window).scroll(function stickyNavbar() {
        var scrollTop = $(window).scrollTop();
        var scrolled = $('body').hasClass('scrolled');

        if (!scrolled && (scrollTop > 0)) {
          $('body').addClass('scrolled');
        }

        if (scrolled && (scrollTop === 0)) {
          $('body').removeClass('scrolled');
        }
      });
    }
  };

  HashLabsNavbar.init();
});
