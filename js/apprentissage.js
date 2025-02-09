import { speak } from "./text_speech.js";
import { data } from "./data.js";

let langue = "fr"; 
let theme = "pays"; 
let taille_images = 9; // (3x3)
let reponse_vrais;

/*let tableau = [
    ["tortue.jpg", "tortue"],
    ["chien.jpg", "chien"],
    ["coq.jpg", "coq"],
    ["pingouin.jpg", "pingouin"],
    ["chevre.jpg", "chevre"],
    ["chat.jpg", "chat"],
    ["cheval.jpg", "cheval"],
    ["grenouille.jpg", "grenouille"],
    ["lion.jpg", "lion"]
];

// Fonction pour ajouter les images dans un conteneur spécifié
export function ajouterImages(container) {
    // Vérifier si le conteneur est bien fourni
    if (!container) {
        console.error("Erreur : Le conteneur est introuvable !");
        return;
    }

    container.innerHTML = ''; // Vide le conteneur 

    for (let i = 0; i < taille_images; i++) {
        let image = document.createElement("img");
        image.src = "/images/animaux/" + tableau[i][0];
        image.addEventListener("click", function () { speak(tableau[i][1]); });
        container.appendChild(image);
    }
}*/

export function ajouterImages(){
    let div = document.getElementById("images_jeu");
    let elements = data[theme][langue]; 

    elements.forEach((element) => {
        let image = document.createElement("img");
        image.src = "images/" + element.image;
        image.alt = element.nom;
        image.addEventListener("click", () => speak(element.nom));
        div.appendChild(image);
        
    });  
}


export function initiliser_page(){
    //bouton en haut qui permets de choisir sa langue et son thème
    ajouterImages();
    //boutton en bas pour quitter
}

