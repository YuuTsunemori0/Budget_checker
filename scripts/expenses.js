let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let subtotals = { Logement: 0, Transport: 0, Nourriture: 0, Loisirs: 0 };

function ajouterDepense() {
    const libelle = document.getElementById("libelle").value;
    const montantStr = document.getElementById("montant").value.replace(/\s/g, "").replace(",", ".");
    const montant = parseFloat(montantStr);
    const categorie = document.getElementById("categorie").value;
    let valid = true;
    
    document.getElementById("errorLibelle").textContent = "";
    document.getElementById("errorMontant").textContent = "";
    
    if (!libelle) {
        document.getElementById("errorLibelle").textContent = "Veuillez saisir un libellé.";
        valid = false;
    }
    if (isNaN(montant) || montant <= 0) {
        document.getElementById("errorMontant").textContent = "Veuillez saisir un montant valide.";
        valid = false;
    }
    if (!valid) return;

    expenses.push({ libelle, montant, categorie });
    subtotals[categorie] += montant;
    total += montant;
    localStorage.setItem("expenses", JSON.stringify(expenses));
    afficherDepenses();
    
    document.getElementById("libelle").value = "";
    document.getElementById("montant").value = "";
    document.getElementById("categorie").selectedIndex = 0;
}
