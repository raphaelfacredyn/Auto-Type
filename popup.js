var maxAccuracy = 100
var minAccuracy = 1
var maxSpeed = 100
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
});

function validate(obj, min, max) {
  if (obj.val() == null || obj.val() == "" || obj.val() == NaN || obj.val() == undefined) {
    obj.val(min.toString())
  }
  if (parseInt(obj.val()) > max) {
    obj.val(max.toString())
  }

  if (parseInt(obj.val()) < min) {
    obj.val(min.toString())
  }
}

function isNull(x) {
  if (accuracy == null || accuracy == "" || accuracy == NaN || accuracy == undefined) {
    return true;
  }
  return false;
}

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-79436930-3']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
