var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

var dataPrev = undefined;

var runningPrev = undefined;

setInterval(function () {
    chrome.storage.sync.get('accuracy', function (result) {
        var a = result.accuracy;
        chrome.storage.sync.get('speed', function (result) {
            var s = result.speed;
            var data = {
                accuracy: a || 100,
                speed: s || 100
            };

            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent("updateSettings", true, true, data);
            document.dispatchEvent(evt);
            dataPrev = JSON.parse(JSON.stringify(data))
        });
    });

    chrome.storage.sync.get('running', function (result) {
        var running = result.running;
        if (running === undefined)
            running = true;

        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent("updateState", true, true, running);
        document.dispatchEvent(evt);
        runningPrev = running
    });
}, 100);
