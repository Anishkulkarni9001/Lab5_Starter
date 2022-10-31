// explore.js

window.addEventListener('DOMContentLoaded', init);
const synth = window.speechSynthesis;

function init() {
  // Declare objects
  const synth = window.speechSynthesis;
  const options = document.getElementById('voice-select');
  const textBox = document.getElementById('text-to-speak');
  const playButton = document.querySelector('button');
  const faceImg = document.querySelector('img');
  let voiceList = [];

  // Populate selection area
  setTimeout(() => {
    voiceList = synth.getVoices();
    for (let i = 0; i < voiceList.length ; i++) {
      const voiceOption = document.createElement('option');
      voiceOption.textContent = `${voiceList[i].name} (${voiceList[i].lang})`;
      if (voiceList[i].default)
        voiceOption.textContent += ' — DEFAULT';
      voiceOption.setAttribute('data-lang', voiceList[i].lang);
      voiceOption.setAttribute('data-name', voiceList[i].name);
      options.appendChild(voiceOption);
    }
  }, 1000);

  // Speak in voice
  playButton.addEventListener('click', (event) => {
    const dialogue = new SpeechSynthesisUtterance(textBox.value);
    const selectedVoice = options.selectedOptions[0].getAttribute('data-name');
    for (let i = 0; i < voiceList.length ; i++) {
      if (voiceList[i].name === selectedVoice){
        dialogue.voice = voiceList[i];
        break;
      }
    }
    faceImg.src = "assets/images/smiling-open.png";

    synth.speak(dialogue);
    let exitInterval = setInterval(function () {
      if(!synth.speaking) {
        faceImg.src = "assets/images/smiling.png";
        clearInterval(exitInterval);
      }
    }, 100);
  });
}