$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    chrome.storage.sync.get('speed', function (result) {
        speed = result.speed;
        if (isNull(speed)) {
            speed = 100
        }
        $("#speed").val(speed);
    });

    $("#speed").bind("propertychange change click keyup input paste", function (event) {
        if (isNull(obj.val())) {
            obj.val(100)
        }
        if (parseInt(obj.val()) > max) {
            obj.val(100)
        }
        if (parseInt(obj.val()) < min) {
            obj.val(1)
        }

        chrome.storage.sync.set({
            'speed': $("#speed").val()
        }, function () {
        });
    });

    $("#stop").click(function () {
        stop();
    });

    $("#start").click(function () {
        start();
    });
});

function isNull(value) {
    if (value == null || value === "" || isNaN(value)) {
        return true;
    }
    return false;
}

function stop() {
    chrome.storage.sync.set({
        'running': false
    }, function () {
    });
}

function start() {
    chrome.storage.sync.set({
        'running': true
    }, function () {
    });
}

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-79436930-3']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
