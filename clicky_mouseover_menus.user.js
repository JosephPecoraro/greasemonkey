// Mouseover Clicky Menus
//
// --------------------------------------------------------------------
// This script will make the site and date popup windows appear onmouseover.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Mouseover Clicky Menus
// @namespace     http://bogojoker.com/weblog/
// @description   Enable the site and date popups to appear onmouseover.
// @include       http://getclicky.com*
// @version       1.1 - Updated on Sunday January 20, 2008 for changes in
//                Get Clicky.  This includes a hardcoded open/close code
//                but at the moment it is done the same as GetClicky's code.
// ==/UserScript==

var ClickyMouseover = {
	open: null,

	hover: function(elem) {
		ClickyMouseover.close();
		elem.nextSibling.nextSibling.nextSibling.style.display = 'block';
		ClickyMouseover.open = elem;
	},
	
	close: function() {
		if (ClickyMouseover.open) {
			ClickyMouseover.open.nextSibling.nextSibling.nextSibling.style.display = 'none';
		}
	},
	
	addMouseovers: function() {
		var allAnchors = document.getElementsByTagName('A');
		for (var i=0; i<allAnchors.length; i++) {
		  var a = allAnchors[i];
			if ( a.className.match( /\bcancel\b/ ) ) {
				a.addEventListener('click', function(){ ClickyMouseover.close() }, false);
			}
			if ( a.className.match( /\bdropdown-display\b/ ) ) {
				a.addEventListener('mouseover', function(){ ClickyMouseover.hover(this) }, false);
			}
		}
	}
	
}

window.addEventListener( 'load', function() { ClickyMouseover.addMouseovers() }, true );
