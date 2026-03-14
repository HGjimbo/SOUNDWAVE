// ==========================================
// LOGIQUE DU LECTEUR -- Projet SoundWave
// ==========================================

// Variables d'état
let indexActuel = 0;
let enLecture = false;
let modeAleatoire = false;
let modeRepetir = false;
let volumeSons = 0.75;
let timerMusique = null; // Pour le tick de progression

// Objet Audio natif de JS
const monAudio = new Audio();

// Initialisation au chargement
function init() {
    creerPlaylist();
    chargerPiste(0, false);
    initBarreVolume();
    initBarreProgression();
}

// 1. Génération de la liste dans le menu
function creerPlaylist() {
    const conteneur = document.getElementById('listeChansons');
    conteneur.innerHTML = ""; 

    for (let i = 0; i < MUSIQUES_DISPO.length; i++) {
        const m = MUSIQUES_DISPO[i];
        
        // Création manuelle des éléments pour faire moins "IA"
        const div = document.createElement('div');
        div.className = "item-musique";
        div.id = "musique-" + i;
        
        div.innerHTML = `
            <div class="item-info">
                <strong>${m.titre}</strong>
                <span>${m.artiste}</span>
            </div>
        `;
        
        div.onclick = function() {
            chargerPiste(i, true);
        };
        
        conteneur.appendChild(div);
    }
}

// 2. Charger une musique
function chargerPiste(index, lancerAuto) {
    indexActuel = index;
    const m = MUSIQUES_DISPO[index];

    // Mise à jour des textes
    document.getElementById('titreMusique').textContent = m.titre;
    document.getElementById('artisteMusique').textContent = m.artiste;
    document.getElementById('iconeMusique').textContent = m.icone;

    // Fichier source
    monAudio.src = m.fichier;
    monAudio.volume = volumeSons;

    // Mise à jour visuelle (pochette et fond)
    const pochette = document.getElementById('pochette');
    pochette.style.background = `linear-gradient(135deg, ${m.couleurs[0]}, ${m.couleurs[1]})`;
    
    document.getElementById('cercle1').style.background = m.couleurs[0];
    document.getElementById('cercle2').style.background = m.couleurs[1];

    // On gère la classe "active" dans la liste
    const tousLesItems = document.querySelectorAll('.item-musique');
    for (let item of tousLesItems) {
        item.classList.remove('active');
    }
    document.getElementById('musique-' + index).classList.add('active');

    if (lancerAuto) {
        jouer();
    }
}

// 3. Contrôles de lecture
function gererLecture() {
    if (enLecture) {
        pauser();
    } else {
        jouer();
    }
}

function jouer() {
    enLecture = true;
    monAudio.play();
    document.getElementById('boutonPlay').textContent = "⏸";
    document.getElementById('pochette').classList.add('tourne');
    
    // On lance le compteur de progression
    clearInterval(timerMusique);
    timerMusique = setInterval(mettreAJourProgression, 500);
}

function pauser() {
    enLecture = false;
    monAudio.pause();
    document.getElementById('boutonPlay').textContent = "▶";
    document.getElementById('pochette').classList.remove('tourne');
    clearInterval(timerMusique);
}

// 4. Progression et Temps
function mettreAJourProgression() {
    if (monAudio.duration) {
        const pourcentage = (monAudio.currentTime / monAudio.duration) * 100;
        document.getElementById('barreRemplissage').style.width = pourcentage + "%";
        
        // Affichage des chiffres
        document.getElementById('tempsEcoule').textContent = formaterTemps(monAudio.currentTime);
        document.getElementById('tempsTotal').textContent = formaterTemps(monAudio.duration);
    }
}

// Formater les secondes en 0:00
function formaterTemps(secondes) {
    let min = Math.floor(secondes / 60);
    let sec = Math.floor(secondes % 60);
    if (sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}

// 5. Navigation
function musiqueSuivante() {
    if (modeAleatoire) {
        indexActuel = Math.floor(Math.random() * MUSIQUES_DISPO.length);
    } else {
        indexActuel = (indexActuel + 1) % MUSIQUES_DISPO.length;
    }
    chargerPiste(indexActuel, true);
}

function musiquePrecedente() {
    // Si on a écouté plus de 3 sec, on revient juste au début
    if (monAudio.currentTime > 3) {
        monAudio.currentTime = 0;
    } else {
        indexActuel = (indexActuel - 1 + MUSIQUES_DISPO.length) % MUSIQUES_DISPO.length;
        chargerPiste(indexActuel, true);
    }
}

// 6. Interaction avec les barres (Clic)
function initBarreProgression() {
    const barre = document.getElementById('barreFond');
    barre.onclick = function(e) {
        const largeurTotale = barre.clientWidth;
        const clicX = e.offsetX;
        const pourcentage = clicX / largeurTotale;
        monAudio.currentTime = pourcentage * monAudio.duration;
    };
}

function initBarreVolume() {
    const barreVol = document.getElementById('barreVolume');
    barreVol.onclick = function(e) {
        const largeur = barreVol.clientWidth;
        const clicX = e.offsetX;
        volumeSons = clicX / largeur;
        monAudio.volume = volumeSons;
        document.getElementById('remplissageVolume').style.width = (volumeSons * 100) + "%";
        
        // Icône dynamique
        const icone = document.getElementById('iconeVolume');
        if (volumeSons === 0) icone.textContent = "🔇";
        else if (volumeSons < 0.5) icone.textContent = "🔉";
        else icone.textContent = "🔊";
    };
}

// 7. Modes Shuffle et Repeat
function basculerAleatoire() {
    modeAleatoire = !modeAleatoire;
    const btn = document.getElementById('btnAleatoire');
    btn.style.opacity = modeAleatoire ? "1" : "0.5";
    btn.style.color = modeAleatoire ? "#7c6aff" : "white";
}

function basculerRepetition() {
    modeRepetir = !modeRepetir;
    const btn = document.getElementById('btnRepeter');
    btn.style.opacity = modeRepetir ? "1" : "0.5";
    btn.style.color = modeRepetir ? "#7c6aff" : "white";
}

// Fin de musique automatique
monAudio.onended = function() {
    if (modeRepetir) {
        monAudio.currentTime = 0;
        jouer();
    } else {
        musiqueSuivante();
    }
};

// Démarrage
init();