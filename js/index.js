var colorChoices = ["btn-green", "btn-red", "btn-yellow", "btn-blue"];

var generatedPattern = [];

var playerPattern = [];

var started = false;

var level = 0;

$(document).ready(function () {
    $(document).keypress(function (e) {
        if (level === 0) {
            nextSequence();
            started = true;
        }
    });

    $("button").click(function (e) {
        e.preventDefault();

        let btn = $(this).attr("class");

        animateButton(btn);

        playSound(btn.replace("btn-", ""));

        if (started) {
            playerPattern.push(btn);
            checkAnswer();
        }
    });
});

function checkAnswer() {
    if (playerPattern.length === generatedPattern.length) {
        if (playerPattern.join("") === generatedPattern.join("")) {
            playerPattern = [];
            nextSequence();
        } else {
            console.log(playerPattern);
            gameOver();
        }
    }
}

function nextSequence() {
    level++;
    $("h1").text("Level " + level.toString());
    var randomChoice =
        colorChoices[Math.floor(Math.random() * colorChoices.length)];
    generatedPattern.push(randomChoice);
    console.log(generatedPattern);
    setTimeout(() => {
        playSound(randomChoice.replace("btn-", ""));
        animateButton(randomChoice);
    }, 500);
}

function animateButton(btn) {
    $("." + btn).addClass("pressed");

    setTimeout(() => {
        $("." + btn).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("/sounds/" + name + ".mp3");
    audio.play();
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
}

function startOver() {
    generatedPattern = [];
    playerPattern = [];

    started = false;

    level = 0;
}
