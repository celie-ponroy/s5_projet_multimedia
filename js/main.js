var supportMsg = document.getElementById('msg');
if ('speechSynthesis' in window) {
supportMsg.innerHTML = 'Votre navigateur supporte la synthese de parole.';
} else {
supportMsg.innerHTML = 'Desole, votre navigateur ne supporte pas la synthesede la parole.';}
var voiceSelect = document.getElementById('voice');
var button = document.getElementById('speak');
var speechMsgInput = document.getElementById('speech-msg');
// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');

function loadVoices() {
    var voices = speechSynthesis.getVoices();
    // parcourir la liste des voix.
    voices.forEach(function(voice, i) {
    var option = document.createElement('option');
    option.value = voice.name;
    option.innerHTML = voice.name;
    // Add the option to the voice selector.
    voiceSelect.appendChild(option);
    });
    }
loadVoices();


function speak(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    // Set les attributs
    msg.volume = parseFloat(volumeInput.value);
    msg.rate = parseFloat(rateInput.value);
    msg.pitch = parseFloat(pitchInput.value);
    // Si une voix a été sélectionnée, faire les modifications nécessaires.
    if (voiceSelect.value) {
    msg.voice = speechSynthesis.getVoices().filter(function(voice)
    { return voice.name == voiceSelect.value; })[0];
    }
    // Ajouter ce texte (parole) à la liste de synthèse.
    window.speechSynthesis.speak(msg);
}
button.addEventListener("click",function(){speak(speechMsgInput.value)});