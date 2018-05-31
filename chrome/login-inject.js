(function() {
//  console.log(localStorage);
  var loginInfo = JSON.parse(localStorage["persist:root"]);
//  console.log(loginInfo.login);
  var accessTokenInfo = JSON.parse(loginInfo.login);
//  console.log(accessTokenInfo);
  console.log(accessTokenInfo.userAccessToken);
  chrome.runtime.sendMessage({"token": accessTokenInfo.userAccessToken}, function(response) {
    console.log("Response recieved");
  });
})();
