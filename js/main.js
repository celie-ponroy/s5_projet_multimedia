import { ajouterImages } from "./apprentissage.js";
import { afficherImagesJeu, startTimer } from "./jeu.js";

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
const themeSelect = document.getElementById("theme-select"); // Sélecteur de thème
const langSelect = document.getElementById("lang-select");//Sélecteur de langue

let currentTheme = themeSelect.value; // Valeur du thème sélectionné (par défaut = premier choix)
let currentLang = langSelect.value; //Valeur de la langue sélectionnée (par défaut = premier choix)

// Fonction pour charger les images par défaut
function loadDefaultImages() {
    ajouterImages(imagesContainerApprentissage, currentTheme, currentLang);
    afficherImagesJeu(imagesContainerJeu, currentTheme);
}

// Met à jour le thème en fonction de la sélection
themeSelect.addEventListener("change", () => {
    currentTheme = themeSelect.value;
    console.log(`Thème sélectionné : ${currentTheme}`);
    
    // Recharge les images si l'utilisateur change de thème sans quitter la section
    if (apprentissageSection.style.display === "block") {
        imagesContainerApprentissage.innerHTML = '';
        ajouterImages(imagesContainerApprentissage, currentTheme, currentLang);
    } else if (jeuSection.style.display === "block") {
        imagesContainerJeu.innerHTML = '';
        afficherImagesJeu(imagesContainerJeu, currentTheme);
    }
});

// Met à jour la langue en fonction de la sélection
langSelect.addEventListener("change", () => {
    currentLang = langSelect.value;
    console.log(`Langue sélectionnée : ${currentLang}`);
    
    // Recharge les images avec la nouvelle langue
    imagesContainerApprentissage.innerHTML = '';
    ajouterImages(imagesContainerApprentissage, currentTheme, currentLang);
    imagesContainerJeu.innerHTML = '';
    afficherImagesJeu(imagesContainerJeu, currentTheme);
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
        ajouterImages(imagesContainerApprentissage, currentTheme, currentLang);
    } else if (mode === "jeu") {
        appTitle.textContent = "Boite à bruits - Jeu";
        jeuSection.style.display = "block";
        apprentissageSection.style.display = "none";
        
        console.log("Ajout des images pour le jeu...");
        afficherImagesJeu(imagesContainerJeu, currentTheme);
    }
}

// Montre la page d'accueil
function showWelcome() {
    console.log("Retour à l'accueil.");
    appScreen.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    apprentissageSection.style.display = "none";
    jeuSection.style.display = "none";
    //arreter le jeu encours 
}

// Écouteurs d'événements
apprentissageBtn.addEventListener('click', () => showApp("apprentissage"));
jeuBtn.addEventListener('click', () => showApp("jeu"));
backBtn.addEventListener('click', showWelcome);
startGameBtn.addEventListener('click', startTimer);

// Charger les images par défaut lors du démarrage de l'application
loadDefaultImages();
