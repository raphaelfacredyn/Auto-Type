$(document).ready(function() {
  $("a:contains('Continue »')").trigger("click") // Click the start button
  if ($("a:contains('Continue To:')").length) {
    window.location.href = $("a:contains('Continue To:')").get(0).href // Go to the continue to the next lesson link
  }


  var speed;
  var accuracy;
  var intervalRate;
  var interval

  document.addEventListener('updateSettings', function(e) {
    var data = e.detail;
    accuracy = parseInt(data.accuracy)
    speed = parseInt(data.speed)
    intervalRate = 60000 / ((4 + 1) * speed);
    stopInterval();
    interval = startInterval();
  });

  document.addEventListener('updateState', function(e) {
    var running = e.detail;

    if (!running) {
      stopInterval();
    } else {
      stopInterval();
      interval = startInterval();
    }
  });

  var enter = jQuery.Event("keypress"); // Enter keypress is often use so it is defined ahead of time
  enter.which = 13;

  var wrong = jQuery.Event("keypress");
  enter.which = 173; // Random symbol that it will never ask (�­)

  var letterIndex = 0; // The current letter in the array

  var screenDrop = false;
  if ($('.screen-drop').length) {
    screenDrop = true;
  }

  var letterList;
  if (screenDrop) {
    letterList = getLetterList($('.key-letter')).reverse(); // Letters are backwards in screen drop
  } else {
    letterList = getLetterList($('.letter'));
  }

  var canErr = true; // Don't get 2 wrong in a row

  var startInterval = function() {
    console.log("start")
    return setInterval(function() {
      if (letterIndex < letterList.length) {
        var e = jQuery.Event("keypress");
        e.which = letterList[letterIndex].charCodeAt(0);

        if (e.which == 160) {
          e.which = 32;
        }
        if (e.which == 9166) {
          e.which = 13;
        }

        if ((Math.floor(100 * Math.random()) > accuracy) && canErr) { // Should I Err
          triggerKeyPress(wrong);
          if (screenDrop) { // In screen drop you have to fix your mistakes
            triggerKeyPress(e);
          }
          canErr = false;
        } else {
          triggerKeyPress(e);
          canErr = true;
        }

        letterIndex++
      } else {
        setTimeout(function() {
          $("a:contains('Continue »')").trigger("click")
        }, 500);
      }
    }, intervalRate); // 4 is average word length that typing.com seems to use, +1 because of the space after the word
  }

  var stopInterval = function() {
    console.log("stop")
    clearInterval(interval);
  }

  setTimeout(function() {
    stopInterval();
    interval = startInterval();
  }, 1000);
});

function getLetterList(selector) {
  var list = [];
  for (var i = 0; i < selector.length; i++) {
    list.push(selector[i].textContent);
  }
  return list;
}

function triggerKeyPress(k) {
  $("#lesson-content").trigger(k);
}
