//Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-79436930-3']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

var inputBox;

$(document).ready(function () {
    inits();
    setTimeout(delayedInits, 1000)
});

function inits() {
    $.supportsIsTrusted = () => {
        return false
    };
    inputBox = $(".js-input-box");

    $("button:contains('Skip Video')").trigger("click");

    $("button:contains('Continue')").trigger("click");

    const continueTo = $("a:contains('Continue To:')");
    if (continueTo.length)
        window.location.href = continueTo.get(0).href // Go to the continue to the next lesson link
}

function delayedInits() {
    setTimeout(start, 1000)
}

function start() {
    if (singleLetterSelector().length > 0)
        startSingleLetter();
    else if (screenIntroSelector().length > 0)
        startScreenIntro();
    else if (screenBasicSelector().length > 0)
        startScreenBasic();
    else if (screenFallingSelector().length > 0)
        startScreenFalling();
    else if (nitroTypeSelector().length > 0)
        startNitroType();
}

function singleLetterSelector() {
    return $(".structure-content").not(".hide").find(".frame")
}

function startSingleLetter() {
    typeLetter(singleLetterSelector().find(".key-label")[0].textContent)
    setTimeout(() => {
        pressEnter();
        setTimeout(start, 500)
    }, 500)
    _gaq.push(['trackEvent', 'site', 'single_letter']);
}

function screenIntroSelector() {
    return $(".structure-content").not(".hide").find(".screenIntro")
}

function startScreenIntro() {
    var letters = [];
    const letterObjects = screenIntroSelector().find(".letter");
    for (var i = 0; i < letterObjects.length; i++)
        letters.push(letterObjects[i].textContent);
    typeLetters(letters)
    _gaq.push(['trackEvent', 'site', 'screen_intro']);
}

function screenBasicSelector() {
    return $(".structure-content").not(".hide").find(".screenBasic")
}

function startScreenBasic() {
    var letters = [];
    const letterObjects = screenBasicSelector().find(".letter");
    for (var i = 0; i < letterObjects.length; i++)
        letters.push(letterObjects[i].textContent);
    typeLetters(letters)
    _gaq.push(['trackEvent', 'site', 'screen_basic']);
}

function screenFallingSelector() {
    return $(".structure-content").not(".hide").find(".screenFalling")
}

function startScreenFalling() {
    var letters = [];
    const letterObjects = screenFallingSelector().find(".letter");
    for (var i = 0; i < letterObjects.length; i++)
        letters.push(letterObjects[i].textContent.substring(1, 2));
    typeLetters(letters.reverse())
    _gaq.push(['trackEvent', 'site', 'screen_falling']);
}

function nitroTypeSelector() {
    return $("#race-track")
}

function startNitroType() {
    inputBox = $("body");
    String.prototype._wordwrap = String.prototype.wordwrap;
    String.prototype.wordwrap = function (number) {
        if (this !== "Please wait. Typing content will appear before the race begins") {
            setTimeout(() => {
                typeLetters(this)
            }, 4200)
        }
        return this._wordwrap(number)
    }
    _gaq.push(['trackEvent', 'site', 'nitro_type']);
}

function typeLetters(letterList) {
    var speed;
    var accuracy;
    var intervalRate;
    var interval;
    var letterIndex = 0; // The current letter in the array
    var running = false;

    const updateSettingsListener = (e) => {
        var data = e.detail;
        var newAccuracy = parseInt(data.accuracy);
        var newSpeed = parseInt(data.speed);

        if (newAccuracy !== accuracy || newSpeed !== speed) {
            speed = newSpeed;
            accuracy = newAccuracy;
            intervalRate = 60000 / ((4 + 1) * speed); // 4 is average word length that typing.com seems to use, +1 because of the space after the word
            stopInterval();
            interval = startInterval();
            running = true;
            _gaq.push(['trackEvent', 'typing', 'wpm_or_accuracy_change']);
        }
    };

    const updateStateListener = (e) => {
        var newRunning = e.detail;

        if (newRunning !== running) {
            running = newRunning;
            if (!running) {
                stopInterval();
                running = false;
                _gaq.push(['trackEvent', 'typing', 'paused']);
            } else {
                stopInterval();
                interval = startInterval();
                running = true;
                _gaq.push(['trackEvent', 'typing', 'started']);
            }
        }
    };

    document.addEventListener('updateSettings', updateSettingsListener);
    document.addEventListener('updateState', updateStateListener);

    const startInterval = function () {
        return setInterval(function () {
            if (letterIndex < letterList.length) {
                typeLetter(letterList[letterIndex]);

                letterIndex++
            } else {
                setTimeout(pressEnter, 500);
            }
        }, intervalRate);
    };

    const stopInterval = () => {
        clearInterval(interval);
    };
}

function pressEnter() {
    var e = jQuery.Event("keydown");
    e.which = 13;
    addEmptyEventFunctions(e);
    e.originalEvent = JSON.parse(JSON.stringify(e));
    addEmptyEventFunctions(e);
    inputBox.trigger(e);
}

var firstLetter = true;

function typeLetter(letter) {
    if (firstLetter) {
        _gaq.push(['trackEvent', 'typing', 'first_letter_typed']);
        firstLetter = false
    }
    var e = jQuery.Event("keypress");
    e.key = letter;
    e.which = letter.charCodeAt(0);
    e.keyCode = e.which;
    if (e.which === 160)
        e.key = " ";
    addEmptyEventFunctions(e);
    e.originalEvent = JSON.parse(JSON.stringify(e));
    addEmptyEventFunctions(e.originalEvent);
    inputBox.trigger(e);
}

function addEmptyEventFunctions(e) {
    e.preventDefault = () => {
    };
    e.stopPropagation = () => {
    };
}