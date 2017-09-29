$(document).ready(function() {
  var speed;
  var accuracy;

  document.addEventListener('updateSettings', function(e) {
    var data = e.detail;
    accuracy = parseInt(data.split(',')[0])
    speed = 100 - parseInt(data.split(',')[1]) + 1
  });

  console.log("page load")
  var enter = jQuery.Event("keypress");
  enter.which = 13;
  $("a:contains('Continue »')" ).trigger("click")
  setTimeout(function() {
    var letterIndex;
    var interval;
    if ($(".screen-drop").length) {
      letterIndex = $(".key-letter").length - 1;
      interval = setInterval(function() {
        var e = jQuery.Event("keypress");
        e.which = $($(".key-letter")[letterIndex]).text().charCodeAt(0);
        if (e.which == 160) {
          e.which = 32;
        }
        if (e.which == 9166) {
          e.which = 71;
        }
        if ((Math.floor(100 * Math.random()) > accuracy)) {
          e.which = 100;
          $("#lesson-content").trigger(e);
        } else {
          $("#lesson-content").trigger(e);
        }
        if (letterIndex <= 0) {
          setTimeout(function() {
            $(document).trigger(enter);
            console.log("next")
          }, 1000)
          clearInterval(interval);
        }
        letterIndex--;
      }, speed * 10);
    } else {
      letterIndex = 0;
      interval = setInterval(function() {
        var e = jQuery.Event("keypress");
        e.which = $($(".letter")[letterIndex]).text().charCodeAt(0);
        if (e.which == 160) {
          e.which = 32;
        }
        if (e.which == 9166) {
          e.which = 13;
        }
        if ((Math.floor(100 * Math.random()) > accuracy)) {
          e.which = 100;
          $("#lesson-content").trigger(e);
        } else {
          $("#lesson-content").trigger(e);
        }
        if (letterIndex >= $(".letter").length) {
          setTimeout(function() {
            $(document).trigger(enter);
            console.log("next")
          }, 1000)
          clearInterval(interval);
        }
        letterIndex++;
      }, speed * 10);
    }
    window.location.href=$("a:contains('Continue To:')" ).get(0).href
  }, 1000);
});
