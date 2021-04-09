var gamePattern = [];
var userClickedPattern = [];
var randomNumber;
var buttonColors = ["red","blue","green","yellow"];
var firstKey = false;
var level = 0;

$(document).keydown(function(){
	if(!firstKey)
		nextSequence();
	firstKey = true;
});

function nextSequence(){
	$("h1").text("Level " + level);
	randomNumber = Math.floor((Math.random()*4));
	var randomChosen = buttonColors[randomNumber];
	playAudio(randomChosen);
	$("#"+randomChosen).fadeOut(200).fadeIn(200);	//flashing
	gamePattern.push(randomChosen);
	level++;
}

$(".btn").click(function(event){
	playAudio($(this).attr("id"));
	animatePress($(this).attr("id"));
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	if(userClickedPattern.length === gamePattern.length)
		checkAnswer(userClickedPattern.length-1);
});

//check Answer function
function checkAnswer(currentIndex){
	var flag = true;
	for(var i = 0; i < gamePattern.length; i++){
		if(gamePattern[i] !== userClickedPattern[i])
			flag = false;
	}
	if(flag){
		for(var i = userClickedPattern.length; i >= 0; i--)
			userClickedPattern.pop();
		setTimeout(nextSequence,1000);
	}else{
		var wrong = new Audio("sounds/wrong.mp3");
		wrong.play();
		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},200);
		startOver();
	}
}

//Game over function
function startOver(){
	$("h1").text("Game Over, Press any key to restart");
	firstKey = false;
	level = 0;
	for(var i = gamePattern.length; i >= 0; i--)
		gamePattern.pop();
	for(var i = userClickedPattern.length; i >= 0; i--)
		userClickedPattern.pop();
}

//Animation function
function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	},300);
	//$("#"+currentColor).removeClass("pressed");
}

//Music player function
function playAudio(chosenColor){
	switch (chosenColor){
		case "red":
			var red = new Audio("sounds/red.mp3");
			red.play();
			break;

		case "blue":
			var blue = new Audio("sounds/blue.mp3");
			blue.play();
			break;

		case "green":
			var green = new Audio("sounds/green.mp3");
			green.play();
			break;

		case "yellow":
			var yellow = new Audio("sounds/yellow.mp3");
			yellow.play();
			break;
	}
}