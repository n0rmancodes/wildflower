if (localStorage.getItem("read")) {
	const p = document.getElementById("player");
	if (Hls.isSupported()) {
		parseFromLs(localStorage.getItem("read"));
	}
} else {
	if (Hls.isSupported()) {
		start();
	} else {
		notSupported();
	}
}

document.getElementById("player").addEventListener("loadeddata", function() {
	document.getElementById("load").style.display = "none";
	document.getElementById("player").play();
})

document.getElementById("player").addEventListener("waiting", function() {
	document.getElementById("load").style.display = "";
})

document.addEventListener("keydown",function(event) {
	if (event.defaultPrevented) {
        return;
    }
	
	var key = event.keyCode;
	
	if (key == 75 | key == 32) {
		toggle();
	} else if (key == 70) {
		fullscreen();
	} else if (key == 79) {
		open();
	}
})

function start() {
	document.getElementById("load").style.display = "none";
	document.getElementById("start").style.display = "block";
}

function fullscreen() {
	var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);
	if (!isInFullScreen) {
		if (document.getElementById("player").requestFullscreen) {
			document.getElementById("player").requestFullscreen();
		} else if (document.getElementById("player").mozRequestFullScreen) {
			document.getElementById("player").mozRequestFullScreen();
		} else if (document.getElementById("player").webkitRequestFullScreen) {
			document.getElementById("player").webkitRequestFullScreen();
		} else if (document.getElementById("player").msRequestFullscreen) {
			document.getElementById("player").msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
}

function toggle() {
	if (!document.getElementById("player").paused) {
		document.getElementById("player").pause();
	} else {
		document.getElementById("player").play();
	}
}

function parse(url) {
	document.getElementById("load").style.display = "block";
	document.getElementById("start").style.display = "none";
	var xhr = new XMLHttpRequest();
	var url = "https://coorsproxyunlimited.herokuapp.com/" + url;
	xhr.open("GET", url);
	xhr.send();
	document.getElementById("l").innerHTML = "Loading data...";
	xhr.onload = function() {
		var d = xhr.responseText;
		localStorage.setItem("read", d.toString());
		document.getElementById("l").innerHTML = "Parsing data...";
		var reader = new M3U8FileParser();
		reader.read(d);
		var data = reader.result.segments;
		console.log(data);
		for (var c in data) {
			var chip = document.createElement("DIV");
			chip.classList.add("chip");
			chip.id = btoa(data[c].url);
			chip.onclick = function () {
				load(atob(this.id), data[c].inf.title);
			}
			var img = document.createElement("IMG");
			img.src = data[c].inf.tvgLogo;
			img.onerror = function () {this.src = "./error.jpg";};
			chip.appendChild(img);
			var div = document.createElement("DIV");
			var tit = document.createElement("H2");
			tit.innerHTML = 
			chip.appendChild(div);
			document.getElementById("streamContainer").appendChild(chip);
		}
		load(data[0].url);
		document.title = data[0].inf.title + " | Wildflower";
	}
}

function parseFromLs(data) {
	setTimeout(function () {
		var reader = new M3U8FileParser();
		reader.read(data);
		var d = reader.result.segments;
		console.log(d);
		for (var c in d) {
			var chip = document.createElement("DIV");
			chip.classList.add("chip");
			chip.id = btoa(d[c].url);
			chip.onclick = function () {
				load(atob(this.id), d[c].inf.title);
			}
			var img = document.createElement("IMG");
			img.src = d[c].inf.tvgLogo;
			img.onerror = function () {this.src = "./error.jpg";};
			chip.appendChild(img);
			var div = document.createElement("DIV");
			var tit = document.createElement("H2");
			tit.innerHTML = d[c].inf.title;
			div.appendChild(tit);
			var p = document.createElement("P");
			p.innerHTML = "Language: " + d[c].inf.tvgLanguage;
			div.appendChild(p);
			chip.appendChild(div);
			document.getElementById("streamContainer").appendChild(chip);
		}
		load(localStorage.getItem("currentStream"))
	}, 750)
}

function load(url, tit) {
	setTimeout(function() {
		document.getElementById("l").innerHTML = "Parsing stream...";
		var hls = new Hls();
		var p = document.getElementById("player");
		hls.loadSource(url);
		hls.attachMedia(p);
		hls.on(Hls.Events.MANIFEST_PARSED,function(){
			if (tit) {
				document.title = tit + " | Wildflower"; 
				localStorage.setItem("streamTitle", tit);
			}
			document.getElementById("l").innerHTML = "Loading stream...";
			localStorage.setItem("currentStream", url);
		});
	}, 750);
}

function open() {
	var s = document.getElementById("s").currentStyle || window.getComputedStyle(document.getElementById("s"));
	if (s.marginLeft.toString() == "0px") {
		document.getElementById("s").style = "margin-left: -37%;";
	} else {
		document.getElementById("s").style = "margin-left: 0%;";
	}
}