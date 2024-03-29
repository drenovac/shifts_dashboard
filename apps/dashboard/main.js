// ==========================================================================
// Project:   Dashboard
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Dashboard */

function main() {

  (function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
      };

    window.performance = window.performance || {};
    performance.now = (function() {
      return performance.now       ||
          performance.mozNow    ||
          performance.msNow     ||
          performance.oNow      ||
          performance.webkitNow ||
          function() {
              //Doh! Crap browser!
              return Date.now(); 
          };
    })();
  }());

  document.title = "Shifts Dashboard";
  Dashboard.statechart.initStatechart();

}
