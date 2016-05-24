// ==UserScript==
// @name        GithubPRLink
// @namespace   MG
// @description Adds a hyperlink to the head branch.
// @include     *github.com/*
// @version     1.0.2
// @grant       none
// @updateURL   https://github.com/MaxGroenenboom/userscript-github-pr-link/raw/master/GithubPRLink.meta.js
// @downloadURL https://github.com/MaxGroenenboom/userscript-github-pr-link/raw/master/GithubPRLink.user.js
// ==/UserScript==

function createLinks() {
	var fields = document.getElementsByClassName("commit-ref");
	var baseLink = location.protocol + "//" + location.hostname + "/";
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];

		// Only add a link if it hasn't been added already.
		if (field.classList.contains("mg-hyperlink-added")) {
			continue;
		}
		field.classList.add("mg-hyperlink-added");

		// If the span has no title field, use the inner span.
		// Necessary because of an inconsistency in Github.
		if (!field.title) {
			field = field.childNodes[0];
		}

		// Create the href to the reference.
		var url = baseLink + field.title;
		var colonIndex = url.lastIndexOf(":");
		var branch = url.substring(colonIndex + 1);
		url = url.substring(0, colonIndex);
		url += "/tree/" + branch;

		// Create the element and wrap the original contents inside it.
		var newElement = document.createElement("a");
		newElement.href = url;
		var fieldElements = field.childNodes;
		newElement.innerHTML = field.innerHTML;
		field.innerHTML = newElement.outerHTML;
	}

	// Retry in 250 milliseconds.
	setTimeout(createLinks, 250);
}

createLinks();