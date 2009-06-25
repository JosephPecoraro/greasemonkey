//
// ==UserScript==
// @name          Back and Forth
// @namespace     http://blog.bogojoker.com
// @description   Keyboard Shortcut to Jump back and forth on a page. (esc key).
// @include       *
// @version       1.1 - Regression - addEventListener failed in some browsers
//                1.0 - Initial Version - Sunday February 15, 2009
// ==/UserScript==

(function() {
	
	// Global States
	var x = null,
	    y = null,
	    old = null;

	// Add a new Global Key Listener for `esc`
	if (document.onkeydown) { old = document.onkeydown; }
	document.onkeydown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if ( key == 27 ) {
			var tempx = x, tempy = y;
			if ( e.shiftKey ) { tempx = null; tempy = null; }
			x = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			y = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			if ( tempx != null ) { // First time it should be null
				window.scrollTo(tempx, tempy);
			}
		}
		if ( old ) { old(e); }
	}

})();
