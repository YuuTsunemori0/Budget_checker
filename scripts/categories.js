// Chargement des catégories depuis localStorage ou valeurs par défaut
let categories = JSON.parse(localStorage.getItem("categories")) || [
    { nom: "Logement", emoji: "🏠" },
    { nom: "Transport", emoji: "🚕" },
    { nom: "Nourriture", emoji: "🍔" },
    { nom: "Loisirs", emoji: "🎟️" }
];

// Met à jour le menu déroulant des catégories
function mettreAJourMenuCategories() {
    const selectCategorie = document.getElementById("categorie");
    selectCategorie.innerHTML = '<option value="" disabled selected>Type de dépense</option>';
    
    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.nom;
        option.textContent = `${categorie.emoji} ${categorie.nom}`;
        selectCategorie.appendChild(option);
    });

    localStorage.setItem("categories", JSON.stringify(categories));
}

// Ouvre la gestion des catégories
function ouvrirGestionCategories() {
    document.getElementById("modalCategories").style.display = "block";
    afficherCategories();
}

// Ferme la gestion des catégories
function fermerGestionCategories() {
    document.getElementById("modalCategories").style.display = "none";
}

// Ajoute une nouvelle catégorie
function ajouterCategorie() {
    const nom = document.getElementById("nouvelleCategorie").value.trim();
    const emoji = document.getElementById("emojiCategorie").value.trim();

    if (!nom || !emoji) {
        alert("Veuillez renseigner un nom et un emoji !");
        return;
    }

    categories.push({ nom, emoji });
    mettreAJourMenuCategories();
    afficherCategories();
}

// Supprime une catégorie
function supprimerCategorie(index) {
    categories.splice(index, 1);
    mettreAJourMenuCategories();
    afficherCategories();
}

// Modifie une catégorie
function modifierCategorie(index) {
    const nouveauNom = prompt("Nouveau nom de la catégorie :", categories[index].nom);
    const nouvelEmoji = prompt("Nouvel emoji :", categories[index].emoji);

    if (nouveauNom && nouvelEmoji) {
        categories[index].nom = nouveauNom;
        categories[index].emoji = nouvelEmoji;
        mettreAJourMenuCategories();
        afficherCategories();
    }
}

// Affiche la liste des catégories dans la fenêtre modale
function afficherCategories() {
    const liste = document.getElementById("listeCategories");
    liste.innerHTML = "";

    categories.forEach((categorie, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${categorie.emoji} ${categorie.nom} 
            <button onclick="modifierCategorie(${index})">✏️</button> 
            <button onclick="supprimerCategorie(${index})">🗑️</button>`;
        liste.appendChild(li);
    });
}

// Charger les catégories au démarrage
document.addEventListener("DOMContentLoaded", mettreAJourMenuCategories);
