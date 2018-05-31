/** Define key URLs for API requests and login status checks */
const SAVE_URL = "https://memreapp.herokuapp.com/api/node/save/";
const LOGIN_URL = "https://memreapp.herokuapp.com/login";
const LOGIN_COMPLETE_URL = "https://memreapp.herokuapp.com/"


/** Handle click event */
chrome.browserAction.onClicked.addListener(function (tab) {

    /** Determine if user has logged in */
    chrome.storage.local.get("userToken", function(tokenValue) {

      if(!tokenValue || (Object.keys(tokenValue).length===0 && tokenValue.constructor === Object)) {
        chrome.tabs.onUpdated.addListener(function listenForLoginComplete(loginTabID, changeInfo, loginTab) {

          /** If login has completed, inject the token capture script */
          if (changeInfo.status === "complete" && loginTab.url === LOGIN_COMPLETE_URL) {
            console.log("We logged in "+loginTabID+" "+tab.id);

            chrome.tabs.executeScript(tab.id, {
              "file": "login-inject.js"
            }, function() {
              console.log("Ran login script");
              chrome.tabs.onUpdated.removeListener(listenForLoginComplete);
            });

          }

        });

        /* If not logged in, redirect to login page */
        var objProperties = new Object();
        objProperties.url=LOGIN_URL
        chrome.tabs.update(tab.id, objProperties, function() {
          console.log("Redirecting...");
        })

      }
      /*  console.log(tab.url);

        if (tab.url === "https://localhost:3000/login") {
          chrome.tabs.executeScript(tab.id, {
            "file": "login-inject.js"
          }, function() {
            console.log("Ran login script");
          });
        }
        else {

        } */

      /** If we are logged in, begin the save request */
      else {
        chrome.tabs.executeScript(tab.id, {
          "file": "bookmark-inject.js"
        }, function() {
          console.log("Ran bookmark script");
        });

        var xhr = new XMLHttpRequest();

        xhr.open("POST", SAVE_URL, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "JWT "+tokenValue.userToken);
        xhr.onreadystatechange = function() {
          chrome.tabs.sendMessage(tab.id, {"status": "saved", "id": null}, function() {

          });
          console.log(xhr.responseText);
        };
        xhr.send("url="+tab.url);
      }
    });
});

/** Listen for return of token via token capture script */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.storage.local.set({"userToken": request.token}, function() {
    console.log("User Token");
    sendResponse();
  });
});
