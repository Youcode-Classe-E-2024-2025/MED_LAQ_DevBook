document.addEventListener("DOMContentLoaded", () => {
  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const genreSelect = document.getElementById("genre");
      const filterGenreSelect = document.getElementById("filterGenre");
      genreSelect.innerHTML = '<option value="">Choisir une catégorie</option>';
      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        genreSelect.appendChild(option);
      });
      filterGenreSelect.innerHTML = '';
      const allOption = document.createElement("option");
      allOption.value = "";
      allOption.textContent = "Toutes les catégories";
      filterGenreSelect.appendChild(allOption);
      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        filterGenreSelect.appendChild(option);
      });
      genreSelect.value = "";
      filterGenreSelect.value = "";
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  }
  fetchCategories();
});