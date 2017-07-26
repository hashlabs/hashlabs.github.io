import '../_sass/main.scss';

/*
  Imports all .yml files so webpack can watch any changes.
  A loader is being used to ignore bundling these files.
 */
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../_data/', true, /\.yml$/));

$(document).ready(function initNavbar() {
  const HashLabsNavbar = {
    init() {
      // add class to navbar global container to handle further styles
      $('.navbar-toggler').on('click', function onClickNavbarToggler() {
        $('#navbar').toggleClass('expanded');
        $('body').toggleClass('navbar-expanded');
      });
    }
  };

  HashLabsNavbar.init();
});
