//
// Better Bugzilla Links
//
// --------------------------------------------------------------------
// Links to the pretty diffs instead of the plain ones.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better Bugzilla Links
// @namespace     http://blog.bogojoker.com
// @description   Links to the pretty diffs instead of the plain ones.
// @include       https://bugs.webkit.org/show_bug.cgi*
// @version       1.0 - Initial Version - Friday July 17, 2009
// ==/UserScript==

// Very Simplistic URL Parse and Modify Class
var URL = function(str) {
    var prefixMatch = str.match(/^(.*?)[?#]/);
    if (!prefixMatch)
        return;

    var prefix = prefixMatch[1],
        search = str.match(/\?([^#]+)/),
        sets = (search) ? search[1].split('&') : [],
        params = {},
        hashMatch = str.match(/#.*/),
        hash = (hashMatch) ? hashMatch[0] : '',
        items = null,
        key = null,
        value = null;
    for (var i=0, len=sets.length; i<len; ++i) {
		items = sets[i].split('=');
		key = decodeURIComponent(items[0]);
		value = decodeURIComponent(items[1]);
		params[key]= value;
    }

    this.prefix = prefix;
    this.hash = hash;
    this.params = params;
}

URL.prototype = {
    setParam: function(key, value) {
        this.params[key] = value;
    },

    setParamIfNone: function(key, value) {
        if (!this.params[key]) {
            this.params[key] = value;
        }
    },

    toString: function() {
        var str = this.prefix;
        var first = true;
        for (var key in this.params) {
            if (first) {
                str += '?';
                first = false;
            } else {
                str += '&';
            }
            str += encodeURIComponent(key) + '=' + encodeURIComponent(this.params[key]);
        }
        return str + this.hash;
    }
}

// Before: https://bugs.webkit.org/attachment.cgi?id=32743
// After: https://bugs.webkit.org/attachment.cgi?id=32743&action=prettypatch
var lst = document.changeform.getElementsByTagName('a');
for (var i=0, len=lst.length; i<len; ++i) {
  var elem = lst[i];
  var url = new URL(elem.href);
  if (!url.prefix) continue;
  if ( elem.href.match(/attachment\.cgi/) ) {
      url.setParamIfNone('action', 'prettypatch');
  }
  elem.href = url.toString();
}
