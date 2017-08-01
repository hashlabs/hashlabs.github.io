$(document).ready(function() {
  function getParticlesCount() {
    var width = window.innerWidth;
    if (width <= 767) {
      return 20;
    } else if (width <= 1023) {
      return 40;
    } else {
      return 50;
    }
  }

  /*
    configuration for particles.js
    Check this page for the available options:
    https://github.com/VincentGarreau/particles.js/
   */
  var particleJSOptions = {
    "particles": {
      "number": {
        "value": getParticlesCount(),
        "density": {
          "enable": false,
          "value_area": 800
        }
      },
      "color": {
        "value": "#717171"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.8,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.8,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 250,
        "color": "#717171",
        "opacity": 1,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "bounce",
        "bounce": false,
        "attract": {
          "enable": false
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 150,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 1
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };

  particlesJS('react-native-service-lead', particleJSOptions);
});
