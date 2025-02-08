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

    // Stocker dans le localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Mise à jour de l'affichage
    afficherDepenses();
    mettreAJourTotal();

    // Réinitialisation des champs après ajout
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
    document.getElementById("categorie").selectedIndex = 0;
}
