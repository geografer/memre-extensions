(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var xhr = new XMLHttpRequest();
    const SAVE_URL = "https://localhost:3000/api/node/save/";
    console.log(url);

    xhr.open("POST", SAVE_URL, true);
    xhr.setRequestHeader("Authorization", "JWT "+message.userToken);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      console.log(xhr.responseText);
    };
    xhr.send("url=https://www.newyorker.com/news/news-desk/weighing-the-costs-of-speaking-out-about-harvey-weinstein");
  })
  /*var loginInfo = JSON.parse(localStorage["reduxPersist:login"]);
  console.log(loginInfo.userAccessToken); */
  //console.log(Window.localStorage);

  /*var th = document.getElementsByTagName("body")[0];
  var s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', chrome.extension.getURL('/process-login.js'));
  th.appendChild(s); */


})();
