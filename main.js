var x=100;
function runBar(){
	setInterval( function (){
		if (x!=0) {
				x-=.1;
				document.getElementById("bar").innerHTML = x.toFixed(0) + "%";
				document.getElementById("bar").style.width = x + "%";
			}
		if (x==0) {
			document.getElementById("bar").innerHTML = "";
		}

	}, 10);
}