$(document).ready(function() {
  var HashLabsWork = {
    init: function init() {
      this.bindVideoClientAnimation();
    },
    bindVideoClientAnimation: function bindVideoClientAnimation() {
      var playVideo = function playVideo() {
        var video = $(this).find('video').get(0);
        video.play();
      };

      var stopVideo = function stopVideo() {
        var video = $(this).find('video').get(0);
        video.pause();
        video.currentTime = 0;
      };

      if (window.matchMedia("(min-width: 1200px)").matches) {
        $('.client').mouseenter(playVideo).mouseleave(stopVideo);
      }
    }
  };

  HashLabsWork.init();
});
