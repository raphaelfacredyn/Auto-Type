var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('script.js');
s.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

setInterval(function() {
  var a, s;
  chrome.storage.sync.get('accuracy', function(result) {
    a = result.accuracy;
    chrome.storage.sync.get('speed', function(result) {
      s = result.speed;
      var data = a + "," + s;

      // updated: this works with Chrome 30:
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("updateSettings", true, true, data);
      document.dispatchEvent(evt);
    });
  });



}, 50);
