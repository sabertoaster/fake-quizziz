var bar=100, time=10, speed=time/100*1;
var questionPack = ["10+10=?","20+20=?","30+30=?","40+40=?","50+50=?","60+60=?","70+70=?","80+80=?","90+90=?","100+100=?","hết câu hỏi rồi uwu"];
var answerPack = [
	[17,15,20,10],
	[42,40,33,53],
	[36,26,16,60],
	[11,80,186,59],
	[97,100,181,80],
	[77,73,120,169],
	[134,175,56,140],
	[146,64,110,160],
	[171,180,41,106],
	[200,187,197,154]
]
var key = [	20,	40,	60, 80,100,120,140,160,180,200]
var colorLevel = ["lightblue","cyan","lightgreen","orange"]
var questionNumber = 0;
var correct = 0;
var onStreak = 0, streak=0;
var score=0,bonus=0;
//streak and point 
function visualizeStreak(){
	var x = streak%3;
	var y = Math.floor(streak/3);
	var level = x+y*3;
	var color = colorLevel[y];
	/*console.log(x);
	console.log(y);*/
	console.log(x);
	document.getElementById("streakBar").style.transition = "1s";
	document.getElementById("streakBar").style.backgroundColor = color;
	document.getElementById("streakBar").style.width = 33*x+'%';
	document.getElementById("streak").style.backgroundColor = colorLevel[y-1];
}
function checkStreak(){
	if (onStreak==0 && correct==1){
		newStreak();
		visualizeStreak();
	}
	if (onStreak==1 && correct==0){
		resetStreak();
		visualizeStreak();
	}
	if (onStreak==1 && correct==1){
		streak+=1;
		visualizeStreak();
	}
}
function newStreak(){
	onStreak=1;
}
function resetStreak(){
	onStreak=0;
	streak=0;
}
function showPoint(){
	let i = Math.floor(streak/3);
	switch (i) {
		case 0:
			i=0;
			break;
		case 1:
			i=1.25;
			break;
		case 2:
			i=1.5;
			break;
		case 3:
			i=1.75;
			break;
		case 4:
			i=2;
			break;
		default:
			i=2;
			break;
	}
	if (correct==1) {
		score += 100 + i*100 + bonus;
	}
	setTimeout(function (){document.getElementById("score").innerHTML = score;},1000);
}


function showRoundNumber(){
	let x = questionNumber+1;
	document.getElementById("roundNumber").innerHTML = x+"/"+questionPack.length
}
function onLoad(){
	changeQuestion();
	runBar();
	showRoundNumber();
	document.getElementById("score").innerHTML = score;
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
	bonus = parseInt(bar.toFixed(0));	
	showPoint();
	setTimeout(function (){
		questionNumber += 1;
		changeQuestion();
		checkStreak();
		showRoundNumber();
		document.getElementById("bar").style.transition = "background-color 0s";
		bar=100;
	},1000);
	transit();
}