var maxAccuracy = 100
var minAccuracy = 50
var maxSpeed = 1000
var minSpeed = 1

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  chrome.storage.sync.get('accuracy', function(result) {
    accuracy = result.accuracy;
    if (isNull(accuracy)) {
      accuracy = maxAccuracy
    }
    $("#accuracy").val(accuracy);
  });

  chrome.storage.sync.get('speed', function(result) {
    speed = result.speed;
    if (isNull(speed)) {
      speed = maxSpeed
    }
    $("#speed").val(speed);
  });

  $("#accuracy").bind("propertychange change click keyup input paste", function(event) {
    validate($("#accuracy"), minAccuracy, maxAccuracy)
    chrome.storage.sync.set({
      'accuracy': $("#accuracy").val()
    }, function() {});
  });

  $("#speed").bind("propertychange change click keyup input paste", function(event) {
    validate($("#speed"), minSpeed, maxSpeed)
    chrome.storage.sync.set({
      'speed': $("#speed").val()
    }, function() {});
  });

  $("#stop").click(function() {
    stop();
  });

  $("#start").click(function() {
    start();
  });
});

function validate(obj, min, max) {
  if (isNull(obj.val())) {
    obj.val(max.toString())
  }
  if (parseInt(obj.val()) > max) {
    obj.val(max.toString())
  }
  if (parseInt(obj.val()) < min) {
    obj.val(min.toString())
  }
}

function isNull(value) {
  if (value == null || value == "" || isNaN(value) || value == undefined) {
    return true;
  }
  return false;
}

function stop() {
  chrome.storage.sync.set({
    'running': false
  }, function() {});
}

function start() {
  chrome.storage.sync.set({
    'running': true
  }, function() {});
}

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-79436930-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
