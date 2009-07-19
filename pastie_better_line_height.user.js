//
// Better Pastie Line Height
//
// --------------------------------------------------------------------
// Better Line Height for Coloring.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Better Pastie Line Height
// @namespace     http://blog.bogojoker.com
// @description   Better Line Height for Coloring
// @include       http://pastie.textmate.org/private/*
// @include       http://pastie.textmate.org/pastes/*
// @version       1.0 - Initial Version - Sunday July 19, 2009
// ==/UserScript==

var lst;
var lh = '19px';

lst = document.getElementsByClassName('source_diff');
for (var i=0, len=lst.length; i<len; ++i) {
  lst[i].style.lineHeight = lh;
}

lst = document.getElementsByClassName('textmate-source-numbers');
for (var i=0, len=lst.length; i<len; ++i) {
  lst[i].style.lineHeight = lh;
}
