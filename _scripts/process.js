$(document).ready(function () {
  var HashLabsProcess = {
    init: function init() {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        this.binAnimationsEvents();
        this.setupSpecialVideos();
        this.startAnimations();
      }
    },
    binAnimationsEvents: function binAnimationsEvents() {
      var that = this;

      this.paths = $('.step-path').each(function traversePaths(i, p) { return p; });

      this.steps = $('video').each(function traverseVideos(i, v) {
        v.loop = false;

        v.onended = function afterStepEnded() {
          that.playNextStep(i);
        };

        return v;
      });
    },
    playNextStep: function playNextStep(currentStep) {
      var CSSAnimationKeyframeSpeed = 2000;
      var path = this.paths.get(currentStep);
      var step = this.steps.get(currentStep+1);

      if (path) {
        $(path).addClass('animated');
      }

      setTimeout(function () {
        if (step) {
          step.play();
        }
      }, CSSAnimationKeyframeSpeed);
    },
    setupSpecialVideos: function setupSpecialVideos() {
      /*
        analytics is the first video and we want the cloud
        gets filled with color as soon as we call the play method
        over this but keeping the video with equal gaps between
        icon transitions so the loop gets satisfied
       */
      var analyticsVideo = this.steps.filter('.video-analytics').get(0);
      analyticsVideo.loop = true;
      analyticsVideo.currentTime = 0.4;
    },
    startAnimations: function startAnimations() {
      var step = this.steps.get(0);

      if (step) {
        step.play();
      }
    }
  };

  HashLabsProcess.init();
});