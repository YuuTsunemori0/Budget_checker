// Fonction pour formater les montants en milliers avec espaces
function formatMontant(input) {
    let value = input.value.replace(/\D/g, "");
    if (value) {
        input.value = new Intl.NumberFormat("fr-FR").format(value);
    }
}

// Fonction pour mettre à jour l'affichage du total
function mettreAJourTotal() {
    document.getElementById("total").textContent = new Intl.NumberFormat("fr-FR").format(total);
}

// Fonction pour afficher les dépenses et leurs catégories
function afficherDepenses() {
    const categoriesContainer = document.getElementById("categories");
    categoriesContainer.innerHTML = "";
    total = 0;
    subtotals = { Logement: 0, Transport: 0, Nourriture: 0, Loisirs: 0 };

    let groupedExpenses = {};
    expenses.forEach((expense, index) => {
        if (!groupedExpenses[expense.categorie]) {
            groupedExpenses[expense.categorie] = [];
        }
        groupedExpenses[expense.categorie].push({ ...expense, index });
        total += expense.montant;
        subtotals[expense.categorie] += expense.montant;
    });

    Object.keys(groupedExpenses).forEach(category => {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("category-container");
        categoryElement.innerHTML = `<p class="category-header" onclick="toggleCategory('${category}')">${category} : ${new Intl.NumberFormat("fr-FR").format(subtotals[category])} € ▼</p>`;
        
        const detailsElement = document.createElement("div");
        detailsElement.classList.add("category-details");
        detailsElement.id = `details-${category}`;
        detailsElement.style.display = "none";
        groupedExpenses[category].forEach(expense => {
            const detail = document.createElement("p");
            detail.innerHTML = `${expense.libelle} : ${new Intl.NumberFormat("fr-FR").format(expense.montant)} € <button onclick="supprimerDepense(${expense.index})">🗑️</button>`;
            detailsElement.appendChild(detail);
        });
        categoryElement.appendChild(detailsElement);
        categoriesContainer.appendChild(categoryElement);
    });

    mettreAJourTotal();
}

// Fonction pour afficher ou masquer les détails des catégories
function toggleCategory(category) {
    const details = document.getElementById(`details-${category}`);
    details.style.display = details.style.display === "none" || details.style.display === "" ? "block" : "none";
}
