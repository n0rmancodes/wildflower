if (localStorage.getItem("currentStream")) {
	const p = document.getElementById("player");
	if (Hls.isSupported()) {
		var hls = new Hls();
		hls.loadSource("https://weather-lh.akamaihd.net/i/twc_1@92006/master.m3u8");
		hls.attachMedia(p);
		hls.on(Hls.Events.MANIFEST_PARSED,function(){
			p.play();
		});
	}
} else {
	start();
}

p.addEventListener("loadeddata", function() {
	document.getElementById("load").style.display = "none";
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
	}
})

function start() {
	
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
	var xhr = new XMLHttpRequest();
	var url = "https://coorsproxyunlimited.herokuapp.com/" + url;
	xhr.open("GET", url)
	xhr.send();
	xhr.onload=function() {
		var d = xhr.responseText;
		var reader = new M3U8FileParser();
		reader.read(d);
		console.log(reader.getResult())
	}
}