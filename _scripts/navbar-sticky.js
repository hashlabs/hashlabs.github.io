$(document).ready(function() {
  const HashLabsNavbar = {
    init() {
      // detect user has scrolled
      $(window).scroll(function stickyNavbar() {
        const scrollTop = $(window).scrollTop();
        const scrolled = $('body').hasClass('scrolled');

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
