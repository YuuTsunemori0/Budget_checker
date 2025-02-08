let budgetTotal = 0;
let total = 0;

// Fonction pour réinitialiser toutes les dépenses et le budget
function reinitialiserDepenses() {
    if (confirm("Voulez-vous vraiment réinitialiser toutes les dépenses ?")) {
        expenses = [];
        localStorage.removeItem("expenses");
        total = 0;
        subtotals = { Logement: 0, Transport: 0, Nourriture: 0, Loisirs: 0 };

        document.getElementById("total").textContent = "0";
        document.getElementById("categories").innerHTML = "";
    }
}
