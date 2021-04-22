// State variables
var is_playing = false;
var audio = document.querySelector("#audio");
var play_pause = document.querySelector(".play-pause");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");
var curr_time = document.querySelector(".current-time");
var total_time = document.querySelector(".total-time");
var songs = [
  { title: "Sweet Dreams", singer: "BatchBug", file: "batchbug" },
  { title: "Sparks", singer: "Chaël", file: "chael" },
];
var song_index = 0;
// DOM elements variabes
var title = document.querySelector(".title");
var singer = document.querySelector(".singer");
var circle_image = document.querySelector(".card-img");
var bg_image = document.querySelector(".circle-image img");
var progress = document.querySelector(".progress");
var progress_bar = document.querySelector(".progress-bar");
var waves = document.querySelector(".waves");

loadSong(songs[song_index]);

function loadSong(song) {
  title.innerHTML = song.title;
  singer.innerHTML = song.singer;
  audio.src = `songs/${song.file}.mp3`;
  circle_image.src = `images/${song.file}.jpg`;
  bg_image.src = `images/${song.file}.jpg`;
}

function playSong() {
  audio.play();
}
function pauseSong() {
  audio.pause();
}
function nextSong() {
  if (song_index === songs.length - 1) {
    pauseSong();
    song_index = 0;
    loadSong(songs[song_index]);
    playSong();
  } else {
    pauseSong();
    song_index++;
    loadSong(songs[song_index]);
    playSong();
  }
}
function prevSong() {
  if (song_index === 0) {
    pauseSong();
    song_index = songs.length - 1;
    loadSong(songs[song_index]);
    playSong();
  } else {
    pauseSong();
    song_index--;
    loadSong(songs[song_index]);
    playSong();
  }
}

play_pause.addEventListener("click", (e) => {
  var icon = e.target.querySelector("i");
  if (is_playing) {
    is_playing = false;
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    waves.style.opacity = "0";
    pauseSong();
  } else {
    playSong();
    is_playing = true;
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    waves.style.opacity = "0.3";
  }
});

prev.addEventListener("click", (e) => {
  prevSong();
});
next.addEventListener("click", (e) => {
  nextSong();
});

audio.addEventListener("timeupdate", (e) => {
  var { currentTime, duration } = e.target;
  if (duration) {
    curr_time.innerHTML = new Date(currentTime * 1000).toISOString().substr(14, 5);
    total_time.innerHTML = new Date(duration * 1000).toISOString().substr(14, 5);
    var progress_time = (currentTime * 100) / duration;
    progress.style.width = progress_time + "%";
  }
});

progress_bar.addEventListener("click", (e) => {
  var pos = (e.offsetX / progress_bar.clientWidth) * audio.duration;
  audio.currentTime = pos;
});
