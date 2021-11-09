var bar=100;
var time=10;
var speed=time/100*1;
var questionPack = ["10+10=?","20+20=?","30+30=?","Bao giờ thì bán được một tỉ gói mè ?"];
var answerPack = [
	[17,15,20,10],
	[42,40,33,53],
	[36,26,16,60],
	["50 năm","1100 năm","em bán kem đánh răng","ko biết"]
]
var key = [	20,	40,	60,"em bán kem đánh răng"]
var questionNumber = 0;
var correct = 0;

function checkStreak(){

}
function showRoundNumber(){
	let x = questionNumber+1;
	document.getElementById("roundNumber").innerHTML = x+"/"+questionPack.length
}
function onLoad(){
	changeQuestion();
	runBar();
	checkStreak();
	showRoundNumber();
}

function reset(){
	location.reload();
}

function runBar(){
	clearInterval(myTimer);
	var myTimer = setInterval( function (){
			bar-=speed;
			document.getElementById("bar").style.width = bar + "%";
		if (bar>50){
			document.getElementById("bar").style.backgroundColor = "green";
		} 
		if (bar<50 && bar>25){
			document.getElementById("bar").style.backgroundColor = "yellow";
		} 
		if (bar<25 && bar.toFixed(0)>=0){
			document.getElementById("bar").style.backgroundColor = "red";
		}
		if (bar.toFixed(0)<0){
			document.getElementById("bar").style.backgroundColor = "black";
			//alert("Hết giờ");
		}
	}, time);
	document.getElementById("bar").style.transition = "background-color 1s";
}

function changeQuestion(){
	document.getElementById("question").innerHTML = questionPack[questionNumber];
	for (let i=0;i<4;i++){
		let string="answer"+i;
		document.getElementById(string).innerHTML = answerPack[questionNumber][i];
	}
}

function transit(){
	
	let i;
	let html = document.querySelectorAll("body *");
	let body = document.querySelector("body");
	//transit from question to notif
	for (i = 0;i<html.length;i++) {
		html[i].style.transition = 'opacity 0.5s';
		html[i].style.opacity = "0";
	}
	body.style.backgroundSize = 'cover';
	if (correct == 1) {
		body.style.backgroundImage = 'url("Right.png")';
	} else body.style.backgroundImage = 'url("Wrong.png")';
	body.style.transition = 'opacity 0s';
	body.style.opacity = "1";

	//transit from notif to question 
	setTimeout(function () {
	body.style.backgroundSize = '';
	body.style.backgroundImage = 'none';
	for (i = 0;i<html.length;i++) {
		html[i].style.transition = 'opacity 0.5s';
		html[i].style.opacity = "1";
	}
	},1000);
}

function checkAnswer(id){
	let i;
	// bug
	if (key[questionNumber].toString()==document.getElementById(id).innerHTML)
		{
			correct = 1;
		} else correct = 0;
	setTimeout(function (){
		questionNumber += 1;
		changeQuestion();
		showRoundNumber();
		document.getElementById("bar").style.transition = "background-color 0s";
		bar=100;
	},1000);
	transit();
}