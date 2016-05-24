// ==UserScript==
// @name        GithubPRLink
// @namespace   MG
// @description Adds a hyperlink to the head branch.
// @include     *github.com/*
// @version     1.0.1
// @grant       none
// @updateURL   https://github.com/MaxGroenenboom/userscript-github-pr-link/raw/master/GithubPRLink.meta.js
// @downloadURL https://github.com/MaxGroenenboom/userscript-github-pr-link/raw/master/GithubPRLink.user.js
// ==/UserScript==

function createLinks() {
	var fields = document.getElementsByClassName("commit-ref");
	var baseLink = location.protocol + "//" + location.hostname + "/";
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var url = baseLink + field.title;
		var colonIndex = url.lastIndexOf(":");
		var branch = url.substring(colonIndex + 1);
		url = url.substring(0, colonIndex);
		url += "/tree/" + branch;

		var newElement = document.createElement("a");
		newElement.href = url;
		var fieldElements = field.childNodes;
		newElement.innerHTML = field.innerHTML;
		field.innerHTML = newElement.outerHTML;
	}
}

onload = function() {
	setTimeout(createLinks, 10);
};