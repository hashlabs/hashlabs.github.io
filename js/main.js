var HashLabs = {
  init: function init() {
    this._bindElements();
    this._createFlags();
    this._bindEvents();
  },

  _bindElements: function _bindElements() {
    this.mobileMenuElements = $('#mobile-nav, .site-navbar, #mobile-nav-toggle');
    this.mobileMenuToggle = $('#mobile-nav-toggle');
    this.mobileNavLinks = $('.nav-mobile-link');
    this.navBar = $('.site-navbar');
    this.video = $('#lead-video');
    this.videoElement = this.video.get(0);
  },

  _createFlags: function _createFlags() {
    /*
      All of the videos used on the lead section, have a loop
      that starts at second 11, so we set that on this variable
    */
    this.loopResetTime = 11;
    this.linkWasClicked = false;
  },

  _bindEvents: function _bindEvents() {
    this._handleNavBarEvents();
    this._handleMobileNavEvents();
    this._handleVideoLoop();
    this._preventOrphans();
  },

  _handleNavBarEvents: function _handleNavBarEvents() {
    var that = this;

    this.navBar.headroom({
      onUnpin: function() {
        $(this).toggleClass(this.classes.unpinned, !that.linkWasClicked);
        $(this).toggleClass(this.classes.pinned, that.linkWasClicked);
        that.linkWasClicked = false;

        return;
      }
    });
  },

  _preventOrphans: function _preventOrphans() {
    /*
      We add a non breaking space (&nbsp;) between the last two
      words of the selected elements, to prevent orphan words.
    */
    $('.prevent-orphan').each(function() {
      $(this).html($(this).html().replace(/\s([^\s<]+)\s*$/, '&nbsp;$1'));
    });
  },

  _handleVideoLoop: function _handleVideoLoop() {
    var that = this;
    // This resets the video to the loopResetTime
    // and starts reproducing it again.
    this.video.on('ended', function(event) {
      that.videoElement.currentTime = that.loopResetTime;
      that.videoElement.play();
    });
  },

  _handleMobileNavEvents: function _handleMobileNavEvents() {
    var that = this;

    this.mobileMenuToggle.on('click', function(event) {
      that.mobileMenuElements.toggleClass('active');
    });

    this.mobileNavLinks.on('click', function(event) {
      that.mobileMenuElements.removeClass('active');
      that.linkWasClicked = true;
    });
  }
};

$(document).ready(function () {
  HashLabs.init();
});
