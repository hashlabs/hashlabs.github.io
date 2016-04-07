new WOW().init(); // Trigger for animation

// Typed.js function
$(function(){
  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    typeSpeed: 40,
    backDelay: 500,
    loop: true,
    contentType: 'html',
    loopCount: 2,
  });
});
