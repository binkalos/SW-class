window.onload = initConrol;

var video, pbtn, curTime, curPos, curVol, mm, ss, arr;
var inter;

function initConrol() {
    video = document.getElementById("myVideo");

    pbtn = document.getElementById("playButton");

    curTime = document.getElementById("timePlayed");

    curPos = document.getElementById("currentPosition");
    curPos.max = video.duration; //전체 비디오 길이

    curVol = document.getElementById("currentVolume");
    curVol.innerHTML = "50%"
    video.volume = 0.5; //비디오 볼륨 : 0 ~ 1
}

var _play = function() {
    video.play();
    inter = setInterval(updateProgress, 1000);
    pbtn.value = "■";
};

var _pause = function() {
    video.pause();
    clearInterval(inter);
    pbtn.value = "▶";
};

var playPause = function() {
    if(video.paused){
        _play();
    }

    else {
        _pause();
    }
};

var updateProgress = function(ctrl) {
    if(ctrl) {
        video.currentTime = ctrl.value;
    }
    else {
        curPos.value = video.currentTime;

        mm = Math.floor(video.currentTime / 60.0);
        ss = parseInt(video.currentTime) % 60;
        curTime.innerHTML = mm + ':' + ss;
    }
};

var selectScene = function(ctrl) {
    arr = ctrl.value.split(":");
    video.currentTime = parseFloat(arr[0]*60)+(arr[1]*1);
    updateProgress();
    _play();
};

var adjustVolume = function(ctrl) {
    video.volume = ctrl.value;
    curVol.innerHTML = Math.round((ctrl.value*100))+"%";
    //curVol.innerHTML = (ctrl.value*100)+"%";
};

var mute = function(ctrl) {
    if(video.muted) {
        video.muted = false;
        ctrl.style.color = 'black';
    }

    else {
        video.muted = true;
        ctrl.style.color = 'gray';
    }
};