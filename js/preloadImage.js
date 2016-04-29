(function ($) {
    $.fn.preloadImage = function(backgroundElemSelector) {
        var image = new Image();
        var context = this;

        var $backgroundElem = $(backgroundElemSelector);

        image.onload = function () {
           context.addClass('img-loaded');
           $backgroundElem.addClass('img-loaded');
        }

        image.onerror = function () {
           context.addClass('img-loaded');
           $backgroundElem.addClass('img-loaded');
        }

        image.src = this.data("img-src");
    };
}(jQuery));