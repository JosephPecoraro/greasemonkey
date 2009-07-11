//
// Bugzilla Highlight Old Bugs
//
// --------------------------------------------------------------------
// Give old bugs a red background color.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Old Bug Indicator
// @namespace     http://blog.bogojoker.com
// @description   Give old bugs a red background color
// @include       https://bugs.webkit.org/request.cgi*
// @version       1.0 - Initial Version - Friday July 10, 2009
// ==/UserScript==

var OldBugIndicator = {

	getDateFromRow: function(tr) {
	  var date = tr.children[4].innerHTML;
	  return date.match(/^\s*$/) ?
	    null :
	    Date.parse(date.substring(0,10).replace(/-/g,'/'));
	},

	init: function() {
		var DAY   = 1000*60*60*24,
		    WEEK  = DAY*7,
		    MONTH = DAY*30,
		    TODAY = new Date(),
		    LAST_WEEK  = new Date( +TODAY - WEEK ),
		    LAST_MONTH = new Date( +TODAY - MONTH );
		    tbl = document.getElementsByClassName('requests')[0];
		    trs = tbl.children[0].children;
		for (var i=1, len=trs.length; i<len; ++i) {
		  var tr = trs[i],
		      date = OldBugIndicator.getDateFromRow(tr);
			if ( date ) {
				if ( date < LAST_MONTH ) {
					tr.style.backgroundColor = '#FF0033';
				} else if ( date < LAST_WEEK ) {
					tr.style.backgroundColor = '#CC6666';
				}
			}
		}
	}

};

// Run
OldBugIndicator.init();
