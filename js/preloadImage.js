(function ($) {
    $.fn.preloadImage = function() {
        var image = new Image();
        var context = this;

        image.onload = function () {
           context.addClass('img-loaded');
           $('.section-lead-background').addClass('img-loaded');
        }

        image.onerror = function () {
           context.addClass('img-loaded');
           $('.section-lead-background').addClass('img-loaded');
        }

        image.src = this.data("img-src");
    };
}(jQuery));