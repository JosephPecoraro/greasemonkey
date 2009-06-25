//
// ==UserScript==
// @name          Remove Facebook Rounded Corners
// @namespace     http://blog.bogojoker.com
// @description   Remove the unwanted rounded corners in the new Facebook design.
// @include       http://www.facebook.com/*
// @version       1.0 - Initial Version - Saturday March 14, 2009
// ==/UserScript==

// Lets face it... they are ugly.
var lst = document.getElementsByClassName('UIRoundedImage_Corners');
for (var i=0; i<lst.length; ++i) {
	lst[i].style.display = 'none';
}
