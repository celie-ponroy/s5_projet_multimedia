import { speak } from "./text_speech.js";

//dans div images on ajoute les images
let taille_images = 9;//(3x3)

//garder un tableau des nom des image avec les images sur l'index qui la coresponds$
let tableau = [["tortue.jpg","tortue"],["chien.jpg","chien"],["coq.jpg","coq"],["pingouin.jpg","pingouin"],["chevre.jpg","chevre"],["chat.jpg","chat"],["cheval.jpg","cheval"],["grenouille.jpg","grenouille"],["lion.jpg","lion"]]
export function ajouterImages(){
    let div = document.getElementById("images_jeu");
    for(let i = 0; i < taille_images; i++){
        var image = document.createElement("img");
        image.src = "/images/"+tableau[i][0];
        image.addEventListener("click",function(){speak(tableau[i][1])});
        div.appendChild(image);

    }

}
