var reactServiceLeadId = 'react-service-lead';
var reactServiceLead = $('#' + reactServiceLeadId);
var system;
var canvas;
var ctx;
var ParticleSystem;
var options = {
  minParticleSize: 4,
  maxParticleSize: 12,
  particlesCount: 10,
  distanceTolerance: 2,
  minMovementOffset: 20,
  maxMovementOffset: 50,
  minEasing: 0.01,
  maxEasing: 0.015,
  colors: ['#693F8F','#61DAFB', '#FFFFFF']
};

(function createParticleSystemClass() {
  var Particle = function() {
    this.originalPosition = createVector(random(width), random(height));
    this.position = this.originalPosition.copy();

    var computedSize = random(options.minParticleSize, options.maxParticleSize);
    this.originalSize = computedSize;
    this.size = computedSize;
    this.minSize = constrain(computedSize - random(4, 10), 3, options.maxParticleSize);
    this.radius = computedSize / 2.0;

    this.color = random(options.colors);
    this.goingLeft = random([true, false]);
    this.scalingSide = random([true, false]);
    this.easing = random(options.minEasing, options.maxEasing);

    this.speed = random(0.1, 0.5);

    this.targetLeft = this.originalPosition.copy().sub(
      random(options.minMovementOffset, options.maxMovementOffset)
    );
    this.targetRight = this.originalPosition.copy().add(
      random(options.minMovementOffset, options.maxMovementOffset)
    );
  };

  Particle.prototype.updateSize = function(newSize) {
    this.size = newSize;
    this.radius = newSize / 2.0;
  };

  Particle.prototype.update = function() {
    var targetX = this.goingLeft ? this.targetLeft : this.targetRight;
    var newSize = (this.scalingSide === this.goingLeft) ? this.minSize : this.originalSize;

    if (this.position.dist(targetX) <= options.distanceTolerance) {
      this.goingLeft = !this.goingLeft;
    }

    this.updateSize(lerp(this.size, newSize, this.easing));

    var movementX = this.speed * (this.goingLeft ? -1 : 1);
    this.position.x = this.position.x + movementX;
  };

  Particle.prototype.draw = function() {
    // this is for drawing an smooth circle, check the link below for more info:
    // https://stackoverflow.com/questions/21762534/how-to-smooth-out-edges-of-circles-drawn-in-canvas-with-arc
    ctx.clearRect(
      this.position.x - this.radius - ctx.lineWidth,
      this.position.y - this.radius - ctx.lineWidth,
      (this.radius * 2) + (ctx.lineWidth * 2),
      (this.radius * 2) + (ctx.lineWidth * 2)
    );

    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size);
  };

  Particle.prototype.reset = function() {
    this.position = createVector(random(width), random(height))
  };

  Particle.prototype.run = function() {
    this.update();
    this.draw();
  };

  ParticleSystem = function(particlesCount) {
    this.particles = [];
    for (var i = 0; i < particlesCount; i++) {
      this.particles.push(new Particle());
    }
    this.particles[0].debug = true;
  };

  ParticleSystem.prototype.run = function() {
    this.particles.forEach(function(particle) {
      particle.run();
    });
  };

  ParticleSystem.prototype.reset = function() {
    this.particles.forEach(function(particle) {
      particle.reset();
    });
  };
})();

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
