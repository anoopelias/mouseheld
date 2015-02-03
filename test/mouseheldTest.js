// To support bind on PhantomJS
// https://code.google.com/p/phantomjs/issues/detail?id=522
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP && oThis ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

describe("Mouseheld", function() {

  var counter;

  beforeEach(function() {
    var input = $('<a/>')
      .attr('href', '#')
      .attr('id', 'link');
    counter = 0;

    $('body').append(input);

    $('#link').mouseheld(function() {
      counter++;
    });
    
  });

  afterEach(function() {
    $('#link').remove();
  });

  it("should increment on 50ms click", function(done) {
    $('#link').mousedown();

    setTimeout(function() {
      $('#link').mouseup();
      expect(counter).toBe(1);

      // Has stopped incrementing
      setTimeout(function() {
        expect(counter).toBe(1);
        done();
      }, 100);

    }, 50);

  });
  it("should increment twice after initial delay of 500ms", function(done) {
    $('#link').mousedown();

    setTimeout(function() {
      $('#link').mouseup();
      expect(counter).toBe(2);
      
      // Has stopped incrementing
      setTimeout(function() {
        expect(counter).toBe(2);
        done();
      }, 200);

    }, 550);

  });

  it("should be 6 after 1 second mousedown", function(done) {
    $('#link').mousedown();

    setTimeout(function() {
      $('#link').mouseup();
      expect(counter).toBe(6);
      
      // Has stopped incrementing
      setTimeout(function() {
        expect(counter).toBe(6);
        done();
      }, 200);

    }, 1050);

  });

  it("should continue animation even after mouseup", function(done) {
    $('#link').mouseenter();
    $('#link').mousedown();

    setTimeout(function() {
      $('#link').mouseleave();
      expect(counter).toBe(2);
      
      setTimeout(function() {
        $('body').mouseup();
        expect(counter).toBe(4);
       
        // Has stopped incrementing
        setTimeout(function() {
          expect(counter).toBe(4);
          done();
        }, 200);

      }, 200);

    }, 550);

  });

  it('should increment on enter keydown', function(done) {

    var keydown = $.Event('keydown');
    keydown.which = 13;
    var keyup = $.Event('keyup');

    $('#link').trigger(keydown);
    setTimeout(function() {
      $('#link').trigger(keyup);
      expect(counter).toBe(2);
      
      // Has stopped incrementing
      setTimeout(function() {
        expect(counter).toBe(2);
        done();
      }, 200);

    }, 550);
  });

  it('should increment on space keydown', function(done) {

    var keydown = $.Event('keydown');
    keydown.which = 32;
    var keyup = $.Event('keyup');

    $('#link').trigger(keydown);
    setTimeout(function() {
      $('#link').trigger(keyup);
      expect(counter).toBe(2);
      
      // Has stopped incrementing
      setTimeout(function() {
        expect(counter).toBe(2);
        done();
      }, 200);

    }, 550);
  });


});

describe('Plugin', function() {
  
  it('should not attach two times', function() {
    var input = $('<a/>')
      .attr('href', '#')
      .attr('id', 'link');
    $('body').append(input);

    var i = 0;
    $('#link').mouseheld(function() {
      i = 1;
    });
    $('#link').mouseheld(function() {
      i = 2;
    });

    $('#link').mousedown().mouseup();
    expect(i).toBe(1);
    $('#link').remove();

  });
  it('should allow removal and then attachment', function() {
    var input = $('<a/>')
      .attr('href', '#')
      .attr('id', 'link');
    $('body').append(input);

    var i = 0;
    $('#link').mouseheld(function() {
      i = 1;
    });
    $('#link').mouseheld('remove');
    $('#link').mouseheld(function() {
      i = 2;
    });

    $('#link').mousedown().mouseup();
    expect(i).toBe(2);

  });
  it('should allow mouseheld on two links', function() {
    var input1 = $('<a/>')
      .attr('href', '#')
      .attr('id', 'link1')
      .addClass('linkclass');
    var input2 = $('<a/>')
      .attr('href', '#')
      .attr('id', 'link2')
      .addClass('linkclass');
    $('body').append(input1);
    $('body').append(input2);

    var i = 0;
    var result = $('.linkclass').mouseheld(function() {
      i++;
    });

    $('#link1').mousedown().mouseup();
    $('#link2').mousedown().mouseup();
    expect(i).toBe(2);
    expect(result.length).toBe(2);
    expect(result[0]).toBe($('#link1')[0]);
    expect(result[1]).toBe($('#link2')[0]);

  });

});
