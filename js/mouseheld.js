// http://creativejs.com/resources/requestanimationframe/
//
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || 
      window[vendors[x]+'CancelRequestAnimationFrame'];
  }
 
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
 
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

  function Mouseheld(element, step, options) {
    this.element = element;
    this.step = step;
    this._defaults(options);
    this._setup();
  }

  Mouseheld.prototype.remove = function() {
    $(this.element).unbind('.mouseheld');
  };

  Mouseheld.prototype._defaults = function(options) {
    options = options || {};

    this.nextTime = 0;
    this.initialDelay = options.initialDelay || 500;
    this.delay = options.delay || 100;
    this.running = false;
  };

  Mouseheld.prototype._setup = function() {
    var start = (function() {
      this.running = true;
      this._firstStep();
    }).bind(this);

    var stop = function() {
      this.running = false;
    }.bind(this);

    $(this.element).bind('mousedown.mouseheld', start);
    $(this.element).bind('keydown.mouseheld', function(e) {
      if(e.which === 13 || e.which === 32) {
        start();
      }
    });
    $(document).bind('mouseup.mouseheld keyup.mouseheld', stop);
  };

  Mouseheld.prototype._firstStep = function() {
    this.step();

    // Wait for initial delay before firing animation
    setTimeout(
      function() {
        if(this.running) {
          requestAnimationFrame(this._runStep.bind(this));
        }
      }.bind(this), 
    this.initialDelay);
  };

  Mouseheld.prototype._runStep = function(time) {

    if(this.running) {

      if(time < this.nextTime) {
        requestAnimationFrame(this._runStep.bind(this));
        return;
      }

      this.nextTime = time + this.delay;
      this.step();
      requestAnimationFrame(this._runStep.bind(this));
    }

  };

  $.fn.mouseheld = function ( step, options ) {

    if(typeof step === 'function') {
      return this.each(function () {
        if (!$.data(this, 'plugin_mouseheld')) {
          $.data(this, 'plugin_mouseheld', new Mouseheld(this, step, options));
        }
      });
    } else if (typeof step === 'string' && step === 'remove') {
      return this.each(function () {
        var mouseheld = $.data(this, 'plugin_mouseheld');
        if(mouseheld) {
          mouseheld.remove();
        }
        $.data(this, 'plugin_mouseheld', null);
      });
    }
    
  };

})(jQuery);
