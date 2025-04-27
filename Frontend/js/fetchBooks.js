document.addEventListener("DOMContentLoaded", function () {
  const booksList = document.querySelector("#booksList tbody");
  const emptyMessage = document.querySelector("#emptyMessage");
  const bookCount = document.querySelector("#bookCount");

  async function fetchBooks() {
    try {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des livres: " + response.statusText
        );
      }

      const books = await response.json();
      booksList.innerHTML = "";

      if (!books.length) {
        emptyMessage.style.display = "block";
        bookCount.textContent = "0 livres au total";
      } else {
        emptyMessage.style.display = "none";
        books.forEach((book) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td class="px-6 py-4">${book.title}</td>
                        <td class="px-6 py-4">${book.author}</td>
                        <td class="px-6 py-4">${book.category_name}</td>
                        <td class="px-6 py-4">${book.published_date}</td>
                        <td class="px-6 py-4">${book.isbn}</td>
                        <td class="px-6 py-4"></td>
                    `;
          booksList.appendChild(row);
        });
        bookCount.textContent = `${books.length} livres au total`;
      }
    } catch (error) {
      emptyMessage.textContent =
        "Erreur: Impossible de récupérer les livres. Veuillez réessayer plus tard.";
      emptyMessage.style.display = "block";
      booksList.innerHTML = "";
      bookCount.textContent = "0 livres au total";
    }
  }

  fetchBooks();
});
