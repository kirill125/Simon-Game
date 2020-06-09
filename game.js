let buttonColors = ["red","blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let isGameStarted = false;
let level = 0;

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + (++level));
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    $("#"+randomChosenColor).animate({opacity:0}).animate({opacity:1}, 500);
}


$(".btn").click(function() {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function playSound(name){
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(() => {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keydown(function(){
    if (!isGameStarted){
        isGameStarted = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[currentLevel] ) {
        console.log("right");
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(() => {
            nextSequence(); 
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;  

}