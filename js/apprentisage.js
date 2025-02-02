
//dans div images on ajoute les images
let taille_images = 9;//(3x3)

//garder un tableau des nom des image avec les images sur l'index qui la coresponds$
let tableau = [["tortue.jpg","tortue"],["chien.jpg","chien"],["coq.jpg","coq"],["pingouin.jpg","pingouin"],["chevre.jpeg","chevre"],["chat.jpg","chat"],["cheval.jpeg","cheval"],["grenouille.jpg","grenouille"],["lion.jpeg","lion"]]
export function ajouterImages(){
    let div = document.getElementById("images_jeu");
    for(let i = 0; i < taille_images; i++){
        var image = document.createElement("img");
        image.src = "/images/"+tableau[i][0];
        image.addEventListener("click",function(){speak(tableau[i][1])});
        div.appendChild(image);
        //ajouter un évenement qui dit le nom quand on apui

    }

}
export function speak(texte){
    var msg = new SpeechSynthesisUtterance();
        msg.text = texte;
        // Set les attributs
        msg.volume = parseFloat(1);
        msg.rate = parseFloat(0.3);
        msg.pitch = parseFloat(0.5);

        msg.voice = speechSynthesis.getVoices()[0];//changer la voix 
        
        window.speechSynthesis.speak(msg);
}