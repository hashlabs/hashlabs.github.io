var reactServiceLeadId = 'react-service-lead';
var reactServiceLead = $('#' + reactServiceLeadId);
var system;
var canvas;
var ctx;

function getReactLeadHeight() {
  return parseInt(
    reactServiceLead
      .css('height')
      .replace('px', '')
  );
}

function getReactLeadWidth() {
  return parseInt(
    reactServiceLead
      .css('width')
      .replace('px', '')
  );
}

/*
  p5.js functions
 */
function setup() {
  canvas = createCanvas(getReactLeadWidth(), getReactLeadHeight());
  canvas.parent('react-service-lead');
  ctx = canvas.elt.getContext('2d');
  system = new ParticleSystem(options.particlesCount);
  noStroke();
}

function windowResized() {
  resizeCanvas(getReactLeadWidth(), getReactLeadHeight());
  system.reset();
}

function draw() {
  clear();
  background(color(0, 0));
  system.run();
}
