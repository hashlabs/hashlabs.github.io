$(document).ready(function () {
  var mobileMenu = $('#mobile-nav');
  var siteNav = $('.site-navbar');
  var mobileMenuToggle = $('#mobile-nav-toggle');
  $('.site-navbar').headroom();

  mobileMenuToggle.on('click', function(event) {
    mobileMenu.toggleClass('active');
    siteNav.toggleClass('active');
  });
});
