import { speak } from "./text_speech.js";
import { data } from "./data.js";
  

export function ajouterImages(container, theme, lang) {
    // Vérifier si le conteneur est bien fourni
    if (!container) {
        console.error("Erreur : Le conteneur est introuvable !");
        return;
    }

    container.innerHTML = ''; // Vide le conteneur 

    let elements = data[theme][lang]; 
    console.log(lang);
    let origineVoix = "fr-FR"
    if(lang=="en") {
        origineVoix = "en-US"
    }

    elements.forEach((element) => {
        let image = document.createElement("img");
        console.log(element.image);
        image.src = "images/" + theme + "/" + element.image;
        image.alt = element.nom;
        image.addEventListener("click", () => speak(element.nom,origineVoix));
        container.appendChild(image);
        
    });  
}

