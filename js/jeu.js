// Importer les données
import { data } from "./data.js";

// Sélection des éléments du DOM
const themeSelect = document.getElementById("theme-select");
const imagesJeuContainer = document.getElementById("images_jeu");
const startGameBtn = document.getElementById("start-game-btn");

// Fonction pour afficher les images du thème sélectionné
export function afficherImagesJeu(theme) {
    imagesJeuContainer.innerHTML = "";
    if (data[theme]) {
        data[theme].forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image.url;
            imgElement.alt = image.nom;
            imgElement.classList.add("jeu-image");
            imagesJeuContainer.appendChild(imgElement);
        });
    } else {
        imagesJeuContainer.innerHTML = "<p>Aucune image disponible pour ce thème.</p>";
    }
}

// Détecter le changement de thème
themeSelect.addEventListener("change", (event) => {
    afficherImagesJeu(event.target.value);
});

// Démarrer la partie avec le thème sélectionné
startGameBtn.addEventListener("click", () => {
    const theme = themeSelect.value;
    afficherImagesJeu(theme);
});
