//
// Stack Overflow Edit Summary Quicklinks
//
// --------------------------------------------------------------------
// This script will make the edit summary suggestions clickable.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Stack Overflow Edit Summary Quicklinks
// @namespace     http://blog.bogojoker.com
// @description   Make the edit summary suggestions clickable.
// @include       http://*.stackoverflow.com/*/edit/*
// @include       http://stackoverflow.com/*/edit/*
// @version       1.1 - Better include URLs thanks to keng - Friday September 5, 2008
//                1.0 - Initial Version - Wednesday September 3, 2008
//
// ==/UserScript==

// Classic (simplified, uses == instead of \b...\b)
document.getElementsByClassName = function( className ) {
	var potential = this.getElementsByTagName('*');
	var results = new Array();
	for (var i=0; i < potential.length; i++ ) {
		if ( potential[i].className == className ) {
			results.push( potential[i] );
		}
	}
	return results;
}


var StackOverflowEditQuicklinks = {

	// Handles appending strings to the textfield
	addToSummary: function(elem) {

		// Grab the textfield and the content we will put in
		var textfield = document.getElementById('edit-comment');
		var existing = textfield.value;
		var strToAdd = elem.innerHTML;
		var regex = new RegExp(strToAdd, "i");

		// Only put the string in if it isn't already there
		// Format it nicely with a comma separated list
		if ( !existing.match(regex) ) {
			existing = existing.replace(/(^\s+)|(\s+$)/g, '');
			if ( existing.length > 0 && existing.charAt(existing.length-1) != ',') existing += ', '
			textfield.value = existing + strToAdd;
		}

	},

	init: function() {
		try {

			// 1. Grab the existing strings
			var elem = document.getElementsByClassName('form-item-info')[0];
			var regex = /\((.*?)\)/;
			var suggestions = regex.exec(elem.innerHTML)[1].split(/,\s*/);

			// 2. Add in my extra strings
			suggestions.push('improved content');
			suggestions.push('provided links');

			// 3. Turn all strings into pseudo-links
			for (var i=0; i<suggestions.length; i++) {
				suggestions[i] = '<a href="#edit-comment">' + suggestions[i] + '</a>';
			}

			// 4. Replace the old content with the new
			elem.innerHTML = elem.innerHTML.replace( regex, "(" + suggestions.join(', ') + ")" );

			// 5. Add an onclick function on all the links to call the special function above
			for (var i=0; i<elem.childNodes.length; i++) {
				var child = elem.childNodes[i];
				if ( child.nodeName.match(/a/i) ) {
					child.addEventListener('click', function(){
						StackOverflowEditQuicklinks.addToSummary(this);
						return false;
					}, false);
				}
			}

		} catch(e) {
			// alert('GreaseMonkey script no longer works.	It either already ran or the HTML changed.');
		}

	}

};

window.addEventListener( 'load', function() { StackOverflowEditQuicklinks.init() }, true );
