var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.onload = function() {
  this.remove();
};
(document.head || document.documentElement).appendChild(s);

setInterval(function() {
  var a, s;
  var dataPrev = {
    accuracy: undefined,
    speed: undefined,
    running: undefined
  };
  chrome.storage.sync.get('accuracy', function(result) {
    a = result.accuracy;
    chrome.storage.sync.get('speed', function(result) {
      s = result.speed;
      var data = {
        accuracy: a,
        speed: s
      };

      if (data.speed !== dataPrev.speed || data.accuracy !== dataPrev.accuracy) {
        // updated: this works with Chrome 30:
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("updateSettings", true, true, data);
        document.dispatchEvent(evt);
        dataPrev.speed = data.speed
        dataPrev.accuracy = data.accuracy
      }
    });
  });

  chrome.storage.sync.get('running', function(result) {
    var running = result.running;

    if (dataPrev.running !== running) {
      // updated: this works with Chrome 30:
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent("updateState", true, true, running);
      document.dispatchEvent(evt);
      dataPrev.running = running
    }
  });
}, 100);
