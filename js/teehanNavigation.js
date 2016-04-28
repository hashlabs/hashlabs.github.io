(function (root, factory) {
  root.TeehanLax = factory();
}(this, function() {
  'use strict';

  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer (callback) {
    this.callback = callback;
    this.ticking = false;
  }

  Debouncer.prototype = {
    constructor : Debouncer,

    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update : function() {
      this.callback && this.callback();
      this.ticking = false;
    },

    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick : function() {
      if(!this.ticking) {
        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
        this.ticking = true;
      }
    },

    /**
     * Attach this as the event listeners
     */
    handleEvent : function() {
      this.requestTick();
    }
  };

  /**
   * Check if object is part of the DOM
   * @constructor
   * @param {Object} obj element to check
   */
  function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
  }

  /**
   * Helper function for extending objects
   */
  function extend (object /*, objectN ... */) {
    if(arguments.length <= 0) {
      throw new Error('Missing arguments in extend function');
    }

    var result = object || {},
        key,
        i;

    for (i = 1; i < arguments.length; i++) {
      var replacement = arguments[i] || {};

      for (key in replacement) {
        // Recurse into object except if the object is a DOM element
        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
          result[key] = extend(result[key], replacement[key]);
        }
        else {
          result[key] = result[key] || replacement[key];
        }
      }
    }

    return result;
  }

  function TeehanLax(jqueryElement, options) {
    options = extend(options, TeehanLax.options);

    this.elem = jqueryElement;
    this.classes = options.classes;
    this.scroller = window;
    this.initialised = false;
    this.lastKnownScrollY = 0;
    this.menuOffset = options.menuOffset;
    this.detachPoint = options.detachPoint;
    this.hideShowOffset = options.hideShowOffset;
  }

  TeehanLax.prototype = {
    constructor: TeehanLax,

    init: function () {
      this.debouncer = new Debouncer(this.update.bind(this));

      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);

      return this;
    },

    attachEvent: function() {
      if(!this.initialised){
        this.initialised = true;
        this.lastKnownScrollY = this.getScrollY();

        this.scroller.addEventListener('scroll', this.debouncer, false);

        this.debouncer.handleEvent();
      }
    },

    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY: function() {
      return (this.scroller.pageYOffset !== undefined)
        ? this.scroller.pageYOffset
        : (this.scroller.scrollTop !== undefined)
          ? this.scroller.scrollTop
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },

    detach: function() {
      var classes = this.classes;

      if(!this.elem.hasClass(classes.detached)) {
        this.elem.addClass(classes.detached);
      }
    },

    top: function() {
      var classes = this.classes;

      this.elem.removeClass(classes.detached);
      this.elem.removeClass(classes.hidden);
    },

    bottom: function() {
      var classes = this.classes;

      if(this.elem.hasClass(classes.hidden)) {
        this.elem.removeClass(classes.hidden);
      }
    },

    showNav: function(movingUp) {
      var classes = this.classes;

      if(movingUp) {
        if(!this.elem.hasClass(classes.hidden)) {
          this.elem.addClass(classes.hidden);
        }
      } else {
        if(this.elem.hasClass(classes.hidden)) {
          this.elem.removeClass(classes.hidden);
        }
      }
    },

    shouldUpdateState: function(scrollDifference) {
      return scrollDifference >= this.hideShowOffset;
    },

    update: function() {
      var currentScrollY = this.getScrollY(),
      previousScrollY = this.lastKnownScrollY,
      scrollDifference = Math.abs(currentScrollY - previousScrollY);

      if(currentScrollY > this.menuOffset) {
        if(currentScrollY > this.detachPoint) {
          this.detach();
        }

        if(this.shouldUpdateState(scrollDifference)) {
          this.showNav(currentScrollY > previousScrollY);
        }
      } else {
        if(currentScrollY <= 0) {
          this.top();
        }
      }

      if((currentScrollY + window.innerHeight) >= document.body.offsetHeight) {
        this.bottom();
      }

      this.lastKnownScrollY = currentScrollY;
    }
  };

  TeehanLax.options = {
    menuOffset: 100,
    detachPoint: 600,
    hideShowOffset: 6,
    classes: {
      detached: "nav-detached",
      hidden: "nav-hidden"
    }
  }

  return TeehanLax;
}));