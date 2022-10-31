// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const audio = document.querySelector('audio');
  const hornChoiceBar = document.getElementById('horn-select');
  const volumeBar = document.getElementById('volume');
  const playButton = document.querySelector('button')
  const jsConfetti = new JSConfetti();

  // Set default audio
  audio.volume = 0.5;

  // Change horn image when selected
  hornChoiceBar.addEventListener('change', (event) => {
    const img = document.querySelector('header~img');
    img.src = "assets/images/" + `${event.target.value}` + ".svg";
    audio.src = "assets/audio/" + `${event.target.value}` + ".mp3";
  });

  // Change volume and volume image
  volumeBar.addEventListener('change', (event) => {
    const soundVal = `${event.target.value}`;
    const img = document.querySelector('#volume-controls > img');
    if(soundVal == 0)
      img.src = "assets/icons/volume-level-0.svg";
    else if(soundVal < 33)
      img.src = "assets/icons/volume-level-1.svg";
    else if(soundVal < 67)
      img.src = "assets/icons/volume-level-2.svg";
    else
      img.src = "assets/icons/volume-level-3.svg";
    audio.volume = soundVal * 1.0 / 100;
  });

  // Play audio
  playButton.addEventListener('click', (event) => {
    if(hornChoiceBar.value == "select")
      return;
    if(hornChoiceBar.value == "party-horn") {
      jsConfetti.addConfetti({confettiNumber: 1000, emojis: ['🎉'],});
    }
    audio.play();
  });
}
