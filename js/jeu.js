// Importer les données
import { data } from "./data.js";
import { speak } from "./text_speech.js";

// Sélection des éléments du DOM
const themeSelect = document.getElementById("theme-select");
const langSelect = document.getElementById("lang-select"); // Sélecteur de langue
const imagesJeuContainer = document.getElementById("images_jeu");
const startGameBtn = document.getElementById("start-game-btn");
const scoreDisplay = document.getElementById("score-display"); // Affichage du score
const highScoreDisplay = document.getElementById("high-score-display"); // Affichage du high score

// Variables pour gérer le jeu
let score = 0;
let currentImage = null; // Contiendra les infos de l'image à deviner
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0; //recupere le high score 

// Afficher le high score initial
highScoreDisplay.textContent = `High Score : ${highScore}`;

// Fonction pour afficher les images du thème sélectionné et de la langue
export function afficherImagesJeu(container, theme, lang) {
    container.innerHTML = "";  // vide le conteneur des images
    console.log(data); //debug

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
        // Si l'image correspond, on incrémente le score et on dit "correct"
        score++;
        speak("Bonne réponse");
    } else {
        // Si l'image ne correspond pas, on dit "incorrect"
        speak("Incorrect");
    }
    updateScore();  // Met à jour le score
    startNewRound();  // Envoie une nouvelle question
}

// Fonction pour mettre à jour le score
function updateScore() {
    scoreDisplay.textContent = `Score : ${score}`; // Met à jour le score
}

// Fonction pour démarrer une nouvelle question (image aléatoire)
function startNewRound() {
    const theme = themeSelect.value;
    const lang = langSelect.value;

    if (data[theme] && data[theme][lang]) {
        // Choisir une image aléatoire parmi celles du thème et de la langue
        const images = data[theme][lang];
        currentImage = images[Math.floor(Math.random() * images.length)]; //prend une image aléatoire
        speak(currentImage.nom); // Dit le nom de l'image à deviner
    }
}

// Détecter le changement de thème dans le sélecteur
themeSelect.addEventListener("change", () => {
    const theme = themeSelect.value;
    const lang = langSelect.value; // Récupère la langue sélectionnée
    afficherImagesJeu(imagesJeuContainer, theme, lang);
});

// Détecter le changement de langue dans le sélecteur
langSelect.addEventListener("change", () => {
    const theme = themeSelect.value; // Récupère le thème sélectionné
    const lang = langSelect.value; // Récupère la langue sélectionnée
    afficherImagesJeu(imagesJeuContainer, theme, lang);
});

// Démarrer la partie avec le thème et la langue sélectionnés
startGameBtn.addEventListener("click", () => {
    score = 0;  // Réinitialise le score
    updateScore();  // Met à jour l'affichage du score
    afficherImagesJeu(imagesJeuContainer, themeSelect.value, langSelect.value); // Affiche les images du thème et de la langue sélectionnés
    startGameBtn.disabled = true; // Désactive le bouton pour éviter de redémarrer avant la fin
    // attend 3 secondes avant de commencer
    setTimeout(() => {
        startNewRound();  // Commence la première question
        startTimer(); // Démarre le timer
    }, 3000);
});


// Démarre le timer pour le jeu
let timerInterval; // Pour stocker l'intervalle
let timer = 10; // Durée du timer en secondes
// Fonction pour démarrer le timer
export function startTimer() {
    // Réinitialisation du timer à chaque début de jeu
    timer = 10;
    const timerDisplay = document.getElementById("timer");

    // Met à jour l'affichage du timer initial
    timerDisplay.textContent = `Temps restant : ${timer}s`;

    // Démarrer l'intervalle
    timerInterval = setInterval(() => {
        console.log(`Timer avant décrément : ${timer}`); // debug: Affiche la valeur avant décrément

        timer--; // Décrémente le timer

        console.log(`Timer après décrément : ${timer}`); // debug: Affiche la valeur après décrément

        // Mise à jour de l'affichage
        timerDisplay.textContent = `Temps restant : ${timer}s`;

        if (timer === 0) {
            // Quand le timer atteint 0, on arrête le jeu
            endGame();
        }
    }, 1000); // Répéter toutes les secondes
}

// Fonction de fin de jeu
function endGame() {
    // Arrêter l'intervalle
    clearInterval(timerInterval);

    console.log("Fin du jeu, timer arrêté");

    // Mettre à jour le high score si nécessaire
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); // Sauvegarder le high score dans le localStorage
        highScoreDisplay.textContent = `High Score : ${highScore}`; // Afficher le high score mis à jour
    }

    // Affichage de l'alerte de fin de jeu
    alert(`Le jeu est terminé ! Votre score est de ${score}`);

    // Réinitialiser les valeurs pour une nouvelle partie
    score = 0;
    updateScore();  // Réinitialiser l'affichage du score à 0
    startGameBtn.disabled = false; // Réactiver le bouton de démarrage

    // Afficher "Temps écoulé" dans l'affichage du timer
    document.getElementById("timer").textContent = `Temps écoulé : 0s`;
}








