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
// @include       http://pastie.org/private/*
// @include       http://pastie.org/pastes/*
// @version       1.0 - Initial Version - Sunday July 19, 2009
// ==/UserScript==

var pres = document.getElementsByTagName('pre');
for (var i=0, len=pres.length; i<len; ++i) {
  pres[i].style.lineHeight = '19px';
}
