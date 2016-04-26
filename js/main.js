new WOW().init(); // Trigger for animation

// Typed.js function
$(function(){
  $("#typed").typed({
    // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
    stringsElement: $('#typed-strings'),
    // typing speed
    typeSpeed: 30,
    // time before typing starts
    startDelay: 80,
    // backspacing speed
    backSpeed: 5,
    // time before backspacing
    backDelay: 1800,
    // loop
    loop: false,
    // false = infinite
    loopCount: false,
    // show cursor
    showCursor: false,
    // either html or text
    contentType: 'html',
  });
});
