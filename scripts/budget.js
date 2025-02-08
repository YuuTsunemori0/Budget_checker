let budgetTotal = 0;
let total = 0;

// Fonction pour mettre à jour le budget restant
function mettreAJourBudgetRestant() {
    const budgetInput = document.getElementById("budgetTotal").value.replace(/\s/g, "").replace(",", ".");
    budgetTotal = parseFloat(budgetInput) || 0; // Si vide, le budget est 0
    const budgetRestant = budgetTotal - total;

    // Afficher le budget restant formaté
    document.getElementById("budgetRestant").textContent = new Intl.NumberFormat("fr-FR").format(budgetRestant);
}

// Fonction pour réinitialiser toutes les dépenses et le budget
function reinitialiserDepenses() {
    if (confirm("Voulez-vous vraiment réinitialiser toutes les dépenses ?")) {
        expenses = [];
        localStorage.removeItem("expenses");
        total = 0;
        subtotals = { Logement: 0, Transport: 0, Nourriture: 0, Loisirs: 0 };

        document.getElementById("total").textContent = "0";
        document.getElementById("categories").innerHTML = "";

        // Mettre à jour le budget restant après réinitialisation
        mettreAJourBudgetRestant();
    }
}
