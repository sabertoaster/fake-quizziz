var x=100;
function runBar(){
	setInterval( function (){
		if (x!=0) {
				x-=.1;
				document.getElementById("bar").style.width = x + "%";
			}
		if (x==0) {
			document.getElementById("bar").innerHTML = "";
		}
		if (x>50){
			document.getElementById("bar").style.backgroundColor = "green";
		}
		if (x<50 && x>25){
			document.getElementById("bar").style.backgroundColor = "yellow";
		}
		if (x<25){
			document.getElementById("bar").style.backgroundColor = "red";
		}
	}, 10);
	document.getElementById("bar").style.transition = ".5s";
}