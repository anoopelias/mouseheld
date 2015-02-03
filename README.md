mouseheld [![Build Status](https://travis-ci.org/anoopelias/mouseheld.svg?branch=master)](https://travis-ci.org/anoopelias/mouseheld)
==========================

A jQuery plugin to handle mouseheld event.

Installation
-----
Download `dist/mouseheld.js` from the repo in raw and include it in your html using script tag,

    <script src='lib/mouseheld.js'></script>

or if you are using `bower` as your package manager, simply run

    $ bower install mouseheld

Usage
-----
Attach the event to a node as below,

    var i = 0;
    $('#link').mouseheld(function() {
      i++;
    });

The parameter is a step function which will get executed continuously till the mouse key is held. This [fiddle](http://jsfiddle.net/bnesu3h9/7/) will give an idea.

To unbind the event, use the `remove` function,

    $('#link').mouseheld('remove');

If you want to attach a different function than the current one, you will have to remove the current one first.

Credits
-----
The original idea of this plugin came from [this](http://stackoverflow.com/a/28127763/1328888) Stack Overflow answer.
