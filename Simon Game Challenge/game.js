
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
  
    userClickedPattern.push(userChosenColor);
    sound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
    


})

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.random()
    randomNum = randomNum * 4;
    randomNum = Math.floor(randomNum);

    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomChosenColour);

    userClickedPattern = [];
}

function sound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout (function() {
        $("#" + currentColor).removeClass("pressed");

    }, 100)

}

function checkAnswer(currentLevel){
    if( userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("Success")

        if( userClickedPattern.length == gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 800);
        }
    }else{
        console.log("Fail");
        sound("wrong");
        $("body").addClass("game-over");

        setTimeout (function() {
            $("body").removeClass("game-over");
        }, 200)

        $("h1").text("Game Over Press Any Key To Start");
        startOver();

    }

}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}






