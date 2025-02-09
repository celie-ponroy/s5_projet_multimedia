import { speak } from "./text_speech.js";
import { data } from "./data.js";

let langue = "fr"; 
let theme = "pays"; 
  

export function ajouterImages(container){
    // Vérifier si le conteneur est bien fourni
    if (!container) {
        console.error("Erreur : Le conteneur est introuvable !");
        return;
    }

    container.innerHTML = ''; // Vide le conteneur 

    let elements = data[theme][langue]; 

    elements.forEach((element) => {
        let image = document.createElement("img");
        image.src = "images/" + element.image;
        image.alt = element.nom;
        image.addEventListener("click", () => speak(element.nom));
        container.appendChild(image);
        
    });  
}

