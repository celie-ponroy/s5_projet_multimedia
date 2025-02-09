import { ajouterImages } from "./apprentissage.js";
import { ajouterImageJeu, startGame } from "./jeu.js";

// Sélection des éléments DOM
const welcomeScreen = document.getElementById('welcome-screen');
const appScreen = document.getElementById('app-screen');
const appTitle = document.getElementById('app-title');
const backBtn = document.getElementById('back-btn');
const apprentissageBtn = document.getElementById('apprentissage-btn');
const jeuBtn = document.getElementById('jeu-btn');
const startGameBtn = document.getElementById('start-game-btn');

// Sélection des sections et conteneurs d'images
const apprentissageSection = document.getElementById("apprentissage-section");
const jeuSection = document.getElementById("jeu-section");
const imagesContainerApprentissage = document.getElementById("images_apprentissage");
const imagesContainerJeu = document.getElementById("images_jeu");

// Sélecteur de thème
const themeSelect = document.getElementById("theme-select");

// Valeur du thème sélectionné (par défaut = premier choix)
let currentTheme = themeSelect.value;

// Met à jour le thème en fonction de la sélection
themeSelect.addEventListener("change", () => {
    currentTheme = themeSelect.value;
    console.log(`Thème sélectionné : ${currentTheme}`);
    
    // Recharge les images si l'utilisateur change de thème sans quitter la section
    if (apprentissageSection.style.display === "block") {
        imagesContainerApprentissage.innerHTML = '';
        ajouterImages(imagesContainerApprentissage, currentTheme);
    } else if (jeuSection.style.display === "block") {
        imagesContainerJeu.innerHTML = '';
        ajouterImageJeu(imagesContainerJeu, currentTheme);
    }
});

// Montre la bonne section en fonction du mode 
function showApp(mode) {
    console.log(`Mode sélectionné : ${mode}`);

    welcomeScreen.style.display = 'none';
    appScreen.style.display = 'block';

    imagesContainerApprentissage.innerHTML = '';
    imagesContainerJeu.innerHTML = '';

    if (mode === "apprentissage") {
        appTitle.textContent = "Boite à bruits - Apprentissage";
        apprentissageSection.style.display = "block";
        jeuSection.style.display = "none";
        
        console.log("Ajout des images d'apprentissage...");
        ajouterImages(imagesContainerApprentissage, currentTheme);
    } else if (mode === "jeu") {
        appTitle.textContent = "Boite à bruits - Jeu";
        jeuSection.style.display = "block";
        apprentissageSection.style.display = "none";
        
        console.log("Ajout des images pour le jeu...");
        ajouterImageJeu(imagesContainerJeu, currentTheme);
    }
}

// Montre la page d'accueil
function showWelcome() {
    console.log("Retour à l'accueil.");
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
