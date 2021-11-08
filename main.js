var x=100;
var time=10;
var i=time/100*2;
var questionPack = ["1+1=?","2+2=?","3+3=?",""];
var questionNumber = 0;
function onLoad(){
	changeQuestion();
	runBar();
}

function runBar(){
	var myTimer = setInterval( function (){
			x-=i;
			document.getElementById("bar").style.width = x + "%";
		if (x>50){
			document.getElementById("bar").style.backgroundColor = "green";
		} 
		if (x<50 && x>25){
			document.getElementById("bar").style.backgroundColor = "yellow";
		} 
		if (x<25){
			document.getElementById("bar").style.backgroundColor = "red";
		}
		if (x.toFixed(0)<0){
			alert("Hết giờ");
			clearInterval(myTimer);
		}
		console.log(x);
	}, time);
	document.getElementById("bar").style.transition = "background-color 1s";
}
function changeQuestion(){
	document.getElementById("question").innerHTML = questionPack[questionNumber];
	questionNumber += 1;
}
function checkAnswer(){
	document.getElementById("question").innerHTML = questionPack[questionNumber];
	questionNumber += 1;
	x=100;	
}