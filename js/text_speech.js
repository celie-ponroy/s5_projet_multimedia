'use strict';

var supportMsg = document.getElementById('msg');
var voiceSelect = document.getElementById('voice');
var button = document.getElementById('speak');
var speechMsgInput = document.getElementById('speech-msg');

// Get the attribute controls.
var volumeInput = document.getElementById('volume');
var rateInput = document.getElementById('rate');
var pitchInput = document.getElementById('pitch');

let voices = [];
let defaultVoice = null;

// Fonction d'initialisation
export function init() {
    if ('speechSynthesis' in window) {
        supportMsg.innerHTML = 'Votre navigateur supporte la synthèse vocale.';
        loadVoices();

        // Écoute l'événement pour charger les voix dès qu'elles sont disponibles
        window.speechSynthesis.onvoiceschanged = loadVoices;

        button.addEventListener("click", function() {
            speakInput(speechMsgInput.value);
        });
    } else {
        supportMsg.innerHTML = 'Désolé, votre navigateur ne supporte pas la synthèse vocale.';
    }
}

// Charger les voix disponibles et forcer une voix française
function loadVoices() {
    voices = speechSynthesis.getVoices();

    // Effacer les options précédentes
    voiceSelect.innerHTML = '';

    voices.forEach((voice) => {
        var option = document.createElement('option');
        option.value = voice.name;
        option.innerHTML = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });

    // Sélectionner une voix française par défaut
    defaultVoice = voices.find(voice => voice.lang === 'fr-FR') || voices.find(voice => voice.lang.startsWith('fr')) || voices[0];

    if (defaultVoice) {
        voiceSelect.value = defaultVoice.name;
    }
}

// Fonction pour parler avec le texte de l'input
function speakInput(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = parseFloat(volumeInput.value);
    msg.rate = parseFloat(rateInput.value);
    msg.pitch = parseFloat(pitchInput.value);

    let selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
    if (selectedVoice) {
        msg.voice = selectedVoice;
    } else if (defaultVoice) {
        msg.voice = defaultVoice;
    }

    window.speechSynthesis.speak(msg);
}


export function speak(texte,language = "en-US"){
    var msg = new SpeechSynthesisUtterance();
        msg.text = texte;
        
        // Si une voix a été sélectionnée, faire les modifications nécessaires.
        msg.lang = language;

        msg.voice = speechSynthesis.getVoices().filter(voice => voice.lang === language)[0];
        console.log("voix: "+msg.voice.name);
        // Ajouter ce texte (parole) à la liste de synthèse.
        window.speechSynthesis.speak(msg);

}
