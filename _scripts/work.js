$(document).ready(function initWorkPage() {
  const HashLabsWork = {
    init() {
      this.bindVideoClientAnimation();
    },
    bindVideoClientAnimation() {
      const playVideo = () => {
        const video = $(this).find('video').get(0);
        video.play();
      };

      const stopVideo = () => {
        const video = $(this).find('video').get(0);
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
