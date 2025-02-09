import { speak } from "./text_speech.js";
import { data } from "./data.js";

let langue = "fr"; 
let theme = "pays"; 

export function initiliser_page(){
    //boutton en haut qui permets de choisir sa langue et son thème
    ajouterImages();
    //boutton en bas pour quitter
}
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

