document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("heading").style.display="none";
	document.getElementById('note').value = localStorage['note'];
}, false);


document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('note').addEventListener('keydown', saveNote);
});

function saveNote () {
	var note = document.getElementById('note').value;
	localStorage['note'] = note;
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('searchbutton').addEventListener('click', swapper);
});
function swapper(){
	document.getElementById("heading").style.display="inline";
	var c = document.getElementById("search").value;
	var a = new Array();
	chrome.history.search({
		'text': c,               // Return every history item....
		'startTime': 1000000000,  // that was accessed less than one week ago.
		'maxResults': 100      // Optionally state a limit
	},
	function(historyItems) {
		for (var i = 0; i < historyItems.length; ++i){
			var date = (historyItems[i].lastVisitTime)+"";
			var d = new Date(parseInt(date, 10));
			var ds = d.toString('MM/dd/yy HH:mm:ss');
			a.push(historyItems[i].url+"     "+" Last Visited:-     "+ds);
		}
		for (var j=0; j<a.length; ++j){
			var z = document.createElement("P");
			z.innerText = a[j];
			document.body.appendChild(z);
		}
	})
}
