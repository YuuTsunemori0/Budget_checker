function ajouterDepense() {
    const libelle = document.getElementById("libelle").value;
    const montantStr = document.getElementById("montant").value.replace(/\s/g, "").replace(",", ".");
    const montant = parseFloat(montantStr);
    const categorie = document.getElementById("categorie").value;
    let valid = true;

    // Réinitialisation des erreurs
    document.getElementById("errorLibelle").textContent = "";
    document.getElementById("errorMontant").textContent = "";

    // Vérification des champs
    if (!libelle) {
        document.getElementById("errorLibelle").textContent = "Veuillez saisir un libellé.";
        valid = false;
    }
    if (isNaN(montant) || montant <= 0) {
        document.getElementById("errorMontant").textContent = "Veuillez saisir un montant valide.";
        valid = false;
    }
    if (!valid) return;

    // Ajout de la dépense
    expenses.push({ libelle, montant, categorie });
    subtotals[categorie] += montant;
    total += montant;
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Mise à jour de l'affichage
    afficherDepenses();
    mettreAJourTotal();

    // Réinitialisation des champs de saisie
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
    document.getElementById("categorie").selectedIndex = 0;
}
