let taille_images = 9; // (3x3)
let tableau = [
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

    container.innerHTML = ''; // Vider le conteneur avant d'ajouter les images

    for (let i = 0; i < taille_images; i++) {
        let image = document.createElement("img");
        image.src = "/images/" + tableau[i][0];
        image.addEventListener("click", function () { speak(tableau[i][1]); });
        container.appendChild(image);
    }
}


// Fonction pour activer la synthèse vocale
export function speak(texte) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = texte;

    // Attribuer les paramètres de la synthèse vocale
    msg.volume = 1;   // Volume de la voix
    msg.rate = 0.3;    // Vitesse de la voix
    msg.pitch = 0.5;   // Tonalité de la voix

    // Choisir la voix (par défaut la première voix disponible)
    msg.voice = speechSynthesis.getVoices()[0];

    // Lancer la lecture de la voix
    window.speechSynthesis.speak(msg);
}
