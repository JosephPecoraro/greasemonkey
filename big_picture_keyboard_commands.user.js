//
// ==UserScript==
// @name          The Big Picture Keyboard Enhancements
// @namespace     http://blog.bogojoker.com
// @description   Keyboard Shortcut Enhancements
// @include       http://www.boston.com/bigpicture/*
// @version       1.1 - Added Back+Forth - Thursday February 12, 2009
//                1.0 - Initial Version - Monday February 9, 2009
//
//
//   This allows the user to type in numbers, and after about
//   a half second it will jump directly to that image.
//   For example:
//
//     Push '1'... '2'... User is taken directly to Image "12"
//     Push '9'... '9'... User is taken to the last picture.
//
//   Use 'esc' to jump back and forth between two positions.
//   For example if a comment mentions picture 4:
//
//     Push '4'...        User is taken directory to Image "4"
//     Push 'esc'         User is taken back to the comment!
//     Push 'esc'         User is taken back to Image "4"
//
// ==/UserScript==

(function() {
	
	// GreaseMonkey (Firefox - unsafeWindow) and GreaseKit (Safari - window)
	var w = ( /a/[-1]=='a') ? unsafeWindow : window;

	// Global States
	var x, y;
	var keypressnumber  = false;
	var builtupnumber   = '';
	var quicknumtimeout = null;
	var imgArr = document.getElementsByClassName("bpImage");
	
	// Keep the old and create a New Global Keypress listener on top of it
	document.addEventListener("keypress", function(e) {
		

		// Get the key
		if(!e) e=window.event;
		var key = e.keyCode ? e.keyCode : e.which;
		
		// Store the current x/y position
		function storePos() { 
			x = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			y = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		}
		
		// # Character => Jump to that image, Store Position
		if ( key >= 48 && key <= 57 ) {
			if ( e.target.nodeName.match(/TEXTAREA|INPUT/) ) return;
			clearTimeout(quicknumtimeout);
			keypressnumber = true;
			builtupnumber += (key - 0x30);
			quicknumtimeout = setTimeout(function() {
				w['currImg'] = parseInt(builtupnumber,10)-1;
				if (w['currImg'] >= imgArr.length) { w['currImg'] = imgArr.length-1; }
				storePos();				
				window.scrollTo(0,imgArr[ w['currImg'] ].offsetTop+174);
				keypressnumber = false;
				builtupnumber = '';
				quicknumtimeout = null;
			}, 300);
		}
		
		// Esc => Jump back to a Saved Position
		if ( key == 27 ) {
			var tempx = x; var tempy = y; storePos();
			window.scrollTo(tempx, tempy);
		}		

	}, true);

})();
