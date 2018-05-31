(function() {
  var div = document.createElement('div');
  div.style.position='fixed';
  div.style.top=0;
  div.style.left=0;
  div.style.width='100%';
  div.style.height="30px";
  div.style.background='#FFF';
  div.style.zIndex=9999;
  div.style.color='#000';
  div.style.textAlign='center';
  div.style.size='22pt';
  div.style.boxShadow='0px 3px 3px #888';
  div.style.padding='14px 10px';

  div.textContent='Saving...';

  document.body.appendChild(div);

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    div.textContent='Saved';

    setTimeout(function() {
      div.display='none';
    }, 2000);

    sendResponse();
  });
})();
