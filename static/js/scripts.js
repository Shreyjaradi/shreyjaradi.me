$(document).ready(function(){

	// Smooth Scroll
	$('a').click(function(){
	    var top = $('html,body').find($(this).attr('href')).offset().top;
	    $('html, body').animate({
	        scrollTop: top
	    },1200, 'easeInOutCubic');
	
	    return false;
	});

	// Mobile Nav
	$('.menu, #nav-mobile a').on('click', function() {
        $('.menu').toggleClass('menu-open'); // Burger Animation
        $("body").toggleClass("js-menu__toggle"); // Toggle Scrollbars
        $('#nav-mobile').slideToggle(450); // Slide In
        $('#nav-mobile ul').toggleClass('js-menu__open'); // Fade in
    });
});

$('#extras').hide();
$('#view-more').click(function(event) {
    $('#extras').slideToggle(1200);
    event.stopPropagation();
    $('html,body').delay(100).animate({
            scrollTop: $("#extras").offset().top + 1
        }, 1200, function() {
        // Animation complete.
      });
    $( "#view-more-container" ).delay(750).velocity({
        width: "toggle",
        opacity: "0"
      }, 450, function() {
        // Animation complete.
      });
});

$(window).load(function() {

	// Preloader
	setTimeout(function(){
    $('#hola .loader_container').velocity({
        opacity : 0.1,
        translateY: "-100%"
    }, {
        duration: 350,
          complete: function(){
            $('#hola').velocity({
              translateY : "-100%"
            }, {
                duration: 900,
                easing: [0.7,0,0.3,1],
            })  
          }
    })
  },300)

	// Define Wow Options
	var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 100, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });

	// Start Wow
    setTimeout(function(){ 
    	wow.init(); 
    }, 300);

    // Rellax.js
    var rellax = new Rellax('.rellax');

    // Block Reveal
    (function() {
      setTimeout(init, 0);
    
      function init() {
        var rev1 = new RevealFx(document.querySelector("#rev-1"), {
          revealSettings: {
            backgroundColor: "#ffffff",
            delay: 1.6,
            onCover: function(contentEl, revealerEl) {
              contentEl.style.opacity = 1;
            }
          }
        });
        rev1.reveal();
    
        var rev2 = new RevealFx(document.querySelector("#rev-2"), {
          revealSettings: {
            backgroundColor: "#ffffff",
            delay: 1.9,
            onCover: function(contentEl, revealerEl) {
              contentEl.style.opacity = 1;
            }
          }
        });
        rev2.reveal();
      }
    })();

});

// Hide Down Arrow
$(window).scroll(function(){
	$("#scroll_down").css("opacity", 1 - $(window).scrollTop() / 350);
});

// Helper vars and functions.
function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function createDOMEl(type, className, content) {
  var el = document.createElement(type);
  el.className = className || "";
  el.innerHTML = content || "";
  return el;
}

// RevealFx obj.
function RevealFx(el, options) {
  this.el = el;
  this.options = extend({}, this.options);
  extend(this.options, options);
  this._init();
}

// RevealFx options.
RevealFx.prototype.options = {
  // If true, then the content will be hidden until it´s "revealed".
  isContentHidden: true,
  // The animation/reveal settings. This can be set initially or passed when calling the reveal method.
  revealSettings: {
    // Animation direction: left right (lr) || right left (rl) || top bottom (tb) || bottom top (bt).
    direction: "lr",
    // Revealer´s background color.
    backgroundColor: "#f0f0f0",
    // Animation speed. This is the speed to "cover" and also "uncover" the element (seperately, not the total time).
    duration: 0,
    // Animation easing. This is the easing to "cover" and also "uncover" the element.
    easing: "easeInOut",
    // percentage-based value representing how much of the area should be left covered.
    coverArea: 0,
    // Callback for when the revealer is covering the element (halfway through of the whole animation).
    onCover: function(contentEl, revealerEl) {
      return false;
    },
    // Callback for when the animation starts (animation start).
    onStart: function(contentEl, revealerEl) {
      return false;
    },
    // Callback for when the revealer has completed uncovering (animation end).
    onComplete: function(contentEl, revealerEl) {
      return false;
    }
  }
};

// Init.
RevealFx.prototype._init = function() {
  this._layout();
};

// Build the necessary structure.
RevealFx.prototype._layout = function() {
  var position = getComputedStyle(this.el).position;
  if (
    position !== "fixed" &&
    position !== "absolute" &&
    position !== "relative"
  ) {
    this.el.style.position = "relative";
  }
  // Content element.
  this.content = createDOMEl(
    "div",
    "block-revealer__content",
    this.el.innerHTML
  );
  if (this.options.isContentHidden) {
    this.content.style.opacity = 0;
  }
  // Revealer element (the one that animates)
  this.revealer = createDOMEl("div", "block-revealer__element");
  this.el.classList.add("block-revealer");
  this.el.innerHTML = "";
  this.el.appendChild(this.content);
  this.el.appendChild(this.revealer);
};

// Gets the revealer element´s transform and transform origin.
RevealFx.prototype._getTransformSettings = function(direction) {
  var val, origin, origin_2;

  switch (direction) {
    case "lr":
      val = "scale3d(0,1,1)";
      origin = "0 50%";
      origin_2 = "100% 50%";
      break;
    case "rl":
      val = "scale3d(0,1,1)";
      origin = "100% 50%";
      origin_2 = "0 50%";
      break;
    case "tb":
      val = "scale3d(1,0,1)";
      origin = "50% 0";
      origin_2 = "50% 100%";
      break;
    case "bt":
      val = "scale3d(1,0,1)";
      origin = "50% 100%";
      origin_2 = "50% 0";
      break;
    default:
      val = "scale3d(0,1,1)";
      origin = "0 50%";
      origin_2 = "100% 50%";
      break;
  }

  return {
    // transform value.
    val: val,
    // initial and halfway/final transform origin.
    origin: { initial: origin, halfway: origin_2 }
  };
};

// Reveal animation. If revealSettings is passed, then it will overwrite the options.revealSettings.
RevealFx.prototype.reveal = function(revealSettings) {
  // Do nothing if currently animating.
  if (this.isAnimating) {
    return false;
  }
  this.isAnimating = true;

  // Set the revealer element´s transform and transform origin.
  var defaults = {
      // In case revealSettings is incomplete, its properties deafault to:
      duration: .63,
      easing: "easeInOut",
      delay: 0,
      backgroundColor: "#f0f0f0",
      direction: "lr",
      coverArea: 0
    },
    revealSettings = revealSettings || this.options.revealSettings,
    direction = revealSettings.direction || defaults.direction,
    transformSettings = this._getTransformSettings(direction);

  this.revealer.style.WebkitTransform = this.revealer.style.transform =
    transformSettings.val;
  this.revealer.style.WebkitTransformOrigin = this.revealer.style.transformOrigin =
    transformSettings.origin.initial;

  // Set the Revealer´s background color.
  this.revealer.style.backgroundColor =
    revealSettings.backgroundColor || defaults.backgroundColor;

  // Show it. By default the revealer element has opacity = 0 (CSS).
  this.revealer.style.opacity = 1;

  // Animate it.
  var self = this,
    duration = revealSettings.duration || defaults.duration,
    targets = this.revealer,
    from = {},
    from_2 = {},
    to = {
      delay: revealSettings.delay || defaults.delay,
      ease: revealSettings.easing || defaults.easing,
      onComplete: function() {
        self.revealer.style.WebkitTransformOrigin = self.revealer.style.transformOrigin =
          transformSettings.origin.halfway;
        if (typeof revealSettings.onCover === "function") {
          revealSettings.onCover(self.content, self.revealer);
        }
        TweenMax.fromTo(targets, duration, from_2, to_2);
        //anime(animationSettings_2);
      }
    },
    to_2 = {
      ease: revealSettings.easing || defaults.easing,
      onComplete: function() {
        self.isAnimating = false;
        if (typeof revealSettings.onComplete === "function") {
          revealSettings.onComplete(self.content, self.revealer);
        }
      }
    };

  var coverArea = revealSettings.coverArea || defaults.coverArea;
  if (direction === "lr" || direction === "rl") {
    from.scaleX = 0;
    to.scaleX = 1;
    from_2.scaleX = 1;
    to_2.scaleX = coverArea / 100;
  } else {
    from.scaleY = 0;
    to.scaleY = 1;
    from_2.scaleY = 1;
    to_2.scaleY = coverArea / 100;
  }

  if (typeof revealSettings.onStart === "function") {
    revealSettings.onStart(self.content, self.revealer);
  }
  TweenMax.fromTo(targets, duration, from, to);
  //anime(animationSettings);
};

window.RevealFx = RevealFx;


