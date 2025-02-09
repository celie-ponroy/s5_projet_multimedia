let taille_images = 9; // (3x3)
let timerDuration = 30; // Durée du jeu en secondes
let timer; // Variable pour stocker l'intervalle
let timeLeft; // Temps restant
let tableau = [
    ["tortue.jpg", "tortue"], ["chien.jpg", "chien"], ["coq.jpg", "coq"],
    ["pingouin.jpg", "pingouin"], ["chevre.jpg", "chevre"], ["chat.jpg", "chat"],
    ["cheval.jpg", "cheval"], ["grenouille.jpg", "grenouille"], ["lion.jpg", "lion"]
];

// Fonction pour ajouter les images du jeu
// Fonction pour ajouter les images du jeu avec un paramètre pour le conteneur
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


// Fonction pour lancer la synthèse vocale
export function speak(texte) {
    let msg = new SpeechSynthesisUtterance();
    msg.text = texte;
    msg.volume = 1;
    msg.rate = 0.3;
    msg.pitch = 0.5;
    msg.voice = speechSynthesis.getVoices()[0]; // Changer la voix si besoin
    window.speechSynthesis.speak(msg);
}

// Fonction pour démarrer le jeu
export function startGame() {
    ajouterImages(); // Charger les images
    timeLeft = timerDuration;
    document.getElementById("timer").textContent = `Temps restant : ${timeLeft}s`;

    // Démarrer le compte à rebours
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Temps restant : ${timeLeft}s`;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Fonction pour arrêter le jeu
function endGame() {
    clearInterval(timer);
    document.getElementById("timer").textContent = "Temps écoulé !";
}
