import { data } from "./data.js";
import { speak } from "./text_speech.js";

// Sélection des éléments du DOM
const themeSelect = document.getElementById("theme-select");
const langSelect = document.getElementById("lang-select");
const imagesJeuContainer = document.getElementById("images_jeu");
const startGameBtn = document.getElementById("start-game-btn");
const scoreDisplay = document.getElementById("score-display");
const highScoreDisplay = document.getElementById("high-score-display");

// Variables pour gérer le jeu
let score = 0;
let currentImage = null;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
let timerInterval = null; // Stockage du timer
let gameInProgress = false; // Vérifier si une partie est en cours
let contenerImages = null;



// Afficher le high score initial
highScoreDisplay.textContent = `High Score : ${highScore}`;

// Fonction pour afficher les images du thème sélectionné
export function afficherImagesJeu(container, theme, lang) {
    contenerImages = container;
    container.innerHTML = "";
    if (data[theme] && data[theme][lang]) {
        data[theme][lang].forEach((imageElement) => {
            const imgElement = document.createElement("img");
            imgElement.src = "images/" + theme + "/" + imageElement.image;
            imgElement.alt = imageElement.nom;
            imgElement.classList.add("jeu-image");
            imgElement.addEventListener("click", () => {
                checkImage(imgElement, imageElement);
            });
            container.appendChild(imgElement);
        });
    } else {
        container.innerHTML = "<p>Paramétrez et commencez la partie !</p>";
    }
}

// Fonction pour vérifier si l'image cliquée est correcte
function checkImage(imgElement) {
    if (imgElement.alt === currentImage.nom) {
        score++;
        speak("Bonne réponse");
    } else {
        speak("Incorrect");
    }
    updateScore();
    startNewRound();
}

// Fonction pour mettre à jour le score
function updateScore() {
    scoreDisplay.textContent = `Score : ${score}`;
}

// Fonction pour démarrer une nouvelle question (image aléatoire)
function startNewRound() {
    if(gameInProgress){
        const theme = themeSelect.value;
        const lang = langSelect.value;
        let origineVoix = "fr-FR"
        if(lang=="en") {
            origineVoix = "en-US"
        }

        if (data[theme] && data[theme][lang]) {
            const images = data[theme][lang];
            currentImage = images[Math.floor(Math.random() * images.length)];
            speak(currentImage.nom,origineVoix);
        }
    }
}

// Fonction pour démarrer le timer
export function startTimer() {
    clearInterval(timerInterval);
    let timer = 10;
    const timerDisplay = document.getElementById("timer");
    
    timerDisplay.textContent = `Temps restant : ${timer}s`;

    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = `Temps restant : ${timer}s`;

        if (timer == 0) {
            endGame();  // Le jeu se termine ici avec l'alerte
        }
    }, 1000);
}

// Fonction de fin de jeu
export function endGame() {
    clearInterval(timerInterval);
    gameInProgress = false;
    startGameBtn.disabled = false; // Réactiver le bouton

    console.log("Fin du jeu, timer arrêté");

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `High Score : ${highScore}`;
    }

    alert(`Le jeu est terminé ! Votre score est de ${score}`);
    score = 0;
    updateScore();
    document.getElementById("timer").textContent = `Temps écoulé : 0s`;
    contenerImages.innerHTML = "";
}



// Démarrer la partie
startGameBtn.addEventListener("click", () => {
    if (gameInProgress) {
        console.log("Une partie est déjà en cours !");
        return;
    }

    gameInProgress = true;
    score = 0;
    updateScore();
    startGameBtn.disabled = true;

    afficherImagesJeu(imagesJeuContainer, themeSelect.value, langSelect.value);

    setTimeout(() => {
        if (!gameInProgress) return; // Vérifier si le jeu est toujours en cours après 3s
        startNewRound();  // Choisir une image après le délai
        startTimer();  // Démarrer le timer après le délai
    }, 3000);
});


// Démarrer la partie
startGameBtn.addEventListener("click", () => {
    if (gameInProgress) {
        console.log("Une partie est déjà en cours !");
        return;
    }

    gameInProgress = true;
    score = 0;
    updateScore();
    startGameBtn.disabled = true;

    afficherImagesJeu(imagesJeuContainer, themeSelect.value, langSelect.value);

    setTimeout(() => {
        if (!gameInProgress) return; // Vérifier si le jeu est toujours en cours après 3s
        startNewRound();  // Choisir une image après le délai
        startTimer();  // Démarrer le timer après le délai
    }, 3000);
});