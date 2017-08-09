$(document).ready(function initProcessPage() {
  const HashLabsProcess = {
    init() {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        this.setupPaths();
        this.setupSteps();
        this.bindScrollToSteps();
        this.checkScrollToActivateStep();
      }
    },
    setupPaths() {
      const traversePaths = (i, p) => p;
      this.paths = $('.step-path').each(traversePaths);
    },
    setupSteps() {
      const that = this;

      // save all steps bottom offsets to use them to active animations properly
      this.stepsBottomOffsets = [];
      this.steps = $('video').each(function traverseVideos(i, v) {
        that.stepsBottomOffsets.push($(v).offset().top + $(v).height());
        return v;
      });

      this.setupSpecialSteps();
    },
    playStep(stepNumber) {
      const CSSAnimationKeyframeSpeed = 2000;
      const path = (stepNumber === 0) ? undefined : this.paths.get(stepNumber - 1);
      const step = this.steps.get(stepNumber);

      if (path) {
        $(path).addClass('animated');
      }

      setTimeout(function playStepTimeoutHandler() {
        if (step) {
          step.play();
          $(path).find('.default').hide();
        }
      }, CSSAnimationKeyframeSpeed);
    },
    setupSpecialSteps() {
      /*
        analytics is the first video and we want the cloud
        gets filled with color as soon as we call the play method
        over this but keeping the video with equal gaps between
        icon transitions so the loop gets satisfied
       */
      const analyticsVideo = this.steps.filter('.video-analytics').get(0);
      analyticsVideo.currentTime = 0.4;
    },
    checkScrollToActivateStep() {
      const boundary = ($(window).scrollTop() + $(window).height());

      if (!this.stepsBottomOffsets.length) {
        return;
      }

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
    bindScrollToSteps() {
      const that = this;
      $(window).on('scroll', that.checkScrollToActivateStep.bind(that));
    }
  };

  HashLabsProcess.init();
});
