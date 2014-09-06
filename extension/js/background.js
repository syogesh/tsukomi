// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Called when the user clicks on the browser action.
chrome.tabs.executeScript(null, {file: "js/auto.js"
});

chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "js/jquery.js"}, function() {
  	chrome.tabs.executeScript(null, {file: "js/content.js"
  	});
  });

  chrome.tabs.insertCSS(null, {
  	code: ".placeddiv{background-color: transparent; height: 100px; width: 100px; position: absolute; z-index: 999;}"
  });
  chrome.tabs.insertCSS(null, {
  	code: ".comment{background-color: transparent; height: 100px; width: 100px; position: absolute; z-index: 999;}"
  });
});


