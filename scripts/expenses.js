let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let subtotals = { Logement: 0, Transport: 0, Nourriture: 0, Loisirs: 0 };

// Fonction pour ajouter une nouvelle dépense
function ajouterDepense() {
    const libelle = document.getElementById("libelle").value.trim();
    const montantStr = document.getElementById("montant").value.replace(/\s/g, "").replace(",", ".");
    const montant = parseFloat(montantStr);
    const categorie = document.getElementById("categorie").value;
    let valid = true;

    // Réinitialisation des erreurs
    document.getElementById("errorLibelle").textContent = "";
    document.getElementById("errorMontant").textContent = "";

    // Vérification des champs obligatoires
    if (!libelle) {
        document.getElementById("errorLibelle").textContent = "Veuillez saisir un libellé.";
        valid = false;
    }
    if (isNaN(montant) || montant <= 0) {
        document.getElementById("errorMontant").textContent = "Veuillez saisir un montant valide.";
        valid = false;
    }
    if (!categorie) {
        alert("Veuillez sélectionner une catégorie.");
        valid = false;
    }
    if (!valid) return;

    // Ajout de la dépense
    const nouvelleDepense = { libelle, montant, categorie };
    expenses.push(nouvelleDepense);
    subtotals[categorie] += montant;
    total += montant;

    // Stockage dans le localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Mise à jour de l'affichage et du budget restant
    afficherDepenses();
    mettreAJourTotal();
    mettreAJourBudgetRestant();

    // Réinitialisation des champs après ajout
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
    document.getElementById("categorie").selectedIndex = 0;
}

// Fonction pour supprimer une dépense
function supprimerDepense(index) {
    const expense = expenses[index];
    subtotals[expense.categorie] -= expense.montant;
    total -= expense.montant;
    
    // Suppression de la dépense
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Mise à jour de l'affichage et du budget restant
    afficherDepenses();
    mettreAJourTotal();
    mettreAJourBudgetRestant();
}
