import { ajouterImages } from "./apprentissage.js";
import { ajouterImages as ajouterImageJeu } from "./jeu.js";
import { startGame } from "./jeu.js";

// Sélection des éléments DOM
const welcomeScreen = document.getElementById('welcome-screen');
const appScreen = document.getElementById('app-screen');
const appTitle = document.getElementById('app-title');
const backBtn = document.getElementById('back-btn');
const apprentissageBtn = document.getElementById('apprentissage-btn');
const jeuBtn = document.getElementById('jeu-btn');
const startGameBtn = document.getElementById('start-game-btn');

// Sélection des sections et conteneurs des images
const apprentissageSection = document.getElementById("apprentissage-section");
const jeuSection = document.getElementById("jeu-section");
const imagesContainerApprentissage = document.getElementById("images_apprentissage");
const imagesContainerJeu = document.getElementById("images_jeu");

// Montre la bonne section en fonction du mode 
function showApp(mode) {
    console.log(`Mode sélectionné : ${mode}`); //debug

    welcomeScreen.style.display = 'none';
    appScreen.style.display = 'block';

    // On vide les conteneurs d'images
    imagesContainerApprentissage.innerHTML = '';
    imagesContainerJeu.innerHTML = '';

    if (mode === "apprentissage") {
        appTitle.textContent = "Boite à bruits - Apprentissage";
        apprentissageSection.style.display = "block";
        jeuSection.style.display = "none";
        
        console.log("Ajout des images d'apprentissage..."); //debug
        ajouterImages(imagesContainerApprentissage);
    } else if (mode === "jeu") {
        appTitle.textContent = "Boite à bruits - Jeu";
        jeuSection.style.display = "block";
        apprentissageSection.style.display = "none";
        

        console.log("Ajout des images pour le jeu..."); //debug
        ajouterImageJeu(imagesContainerJeu);
    }
}

// Montre la page d'accueil
function showWelcome() {
    console.log("Retour à l'accueil."); //debug
    appScreen.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    apprentissageSection.style.display = "none";
    jeuSection.style.display = "none";
}

// Écouteurs d'événements
apprentissageBtn.addEventListener('click', () => showApp("apprentissage"));
jeuBtn.addEventListener('click', () => showApp("jeu"));
backBtn.addEventListener('click', showWelcome);
startGameBtn.addEventListener('click', startGame);
