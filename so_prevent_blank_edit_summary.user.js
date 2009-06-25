//
// ==UserScript==
// @name          Stack Overflow Prevent Blank Edit Summary
// @namespace     http://blog.bogojoker.com
// @description   Makes sure the edit summary isn't empty (or whitespace).
// @include       http://stackoverflow.com/*/edit/*
// @version       1.1 - Glowing Indication - Thursday October 30, 2008
//                1.0 - Initial Version - Thursday October 30, 2008
//
// ==/UserScript==

(function() {
	document.getElementById('submit-button').addEventListener('click', function(event) {
		var editSummary = document.getElementById('edit-comment');
		if ( editSummary.value.match(/^\s*$/) ) {
			
			// Stop the submission stubbornly (this is a strong way to do it)
			event.preventDefault();
			event.stopPropagation();
			editSummary.select();
			
			// Glow Animation (prevent overlaping animations)
			var color = editSummary.style.backgroundColor;
			if (color == '' || color == 'rgb(255, 255, 255)') {
				(function recolor(a,b,c) {
					if (a != 255) {
						a+=1; b+=2; c+=2;
						editSummary.style.backgroundColor = 'rgb('+a+', '+b+', '+c+')';
						setTimeout( function(){recolor(a,b,c)}, 5 );
					}
				})(155,55,55);
			}
		
			// Another way to indicate we want to stop
			return false;
	
		}
	}, true);
})();
