import '../_sass/main.scss';

$(document).ready(function() {
  var HashLabsNavbar = {
    init: function navbar() {
      // add class to navbar global container to handle further styles
      $('.navbar-toggler').on('click', function onClickNavbarToggler() {
        $('#navbar').toggleClass('expanded');
        $('body').toggleClass('navbar-expanded');
      });
    }
  };

  HashLabsNavbar.init();
});
