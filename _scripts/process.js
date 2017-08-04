$(document).ready(function () {
  var HashLabsProcess = {
    init: function init() {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        this.setupPaths();
        this.setupSteps();
        this.bindScrollToSteps();
        this.checkScrollToActivateStep();
      }
    },
    setupPaths: function setupPaths() {
      this.paths = $('.step-path').each(function traversePaths(i, p) { return p; });
    },
    setupSteps: function setupSteps() {
      var that = this;

      // save all steps bottom offsets to use them to active animations properly
      this.stepsBottomOffsets = [];
      this.steps = $('video').each(function traverseVideos(i, v) {
        v.loop = true;
        that.stepsBottomOffsets.push($(v).offset().top + $(v).height());
        return v;
      });

      this.setupSpecialSteps();
    },
    playStep: function playStep(step) {
      var CSSAnimationKeyframeSpeed = 2000;
      var path = (step === 0) ? undefined : this.paths.get(step - 1);
      var step = this.steps.get(step);

      if (path) {
        $(path).addClass('animated');
      }

      setTimeout(function () {
        if (step) {
          step.play();
        }
      }, CSSAnimationKeyframeSpeed);
    },
    setupSpecialSteps: function setupSpecialSteps() {
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
    checkScrollToActivateStep: function checkScrollToActivateStep() {
      var boundary = ($(window).scrollTop() + $(window).height());
      if (boundary > this.stepsBottomOffsets[0]) {
        this.playStep(0);
      }

      if (boundary > this.stepsBottomOffsets[1]) {
        this.playStep(1);
      }

      if (boundary > this.stepsBottomOffsets[2]) {
        this.playStep(2);
      }

      if (boundary > this.stepsBottomOffsets[3]) {
        this.playStep(3);
        // as all the videos has been activated remove listener
        $(window).off('scroll');
      }
    },
    bindScrollToSteps: function bindScrollToSteps() {
      var that = this;
      $(window).on('scroll', that.checkScrollToActivateStep.bind(that));
    }
  };

  HashLabsProcess.init();
});