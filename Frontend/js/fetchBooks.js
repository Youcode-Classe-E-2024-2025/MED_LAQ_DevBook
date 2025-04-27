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
      const books = await response.json();
      booksList.innerHTML = "";

      if (!books.length) {
        emptyMessage.style.display = "block";
        bookCount.textContent = "0 livres au total";
      } else {
        emptyMessage.style.display = "none";
        books.forEach((book) => {
          const row = document.createElement("tr");
            const publishedDate = new Date(book.published_date);
            const day = String(publishedDate.getDate()).padStart(2, '0');
            const month = String(publishedDate.getMonth() + 1).padStart(2, '0');
            const year = String(publishedDate.getFullYear());
            row.innerHTML = `
              <td class="px-6 py-4">${book.title}</td>
              <td class="px-6 py-4">${book.author}</td>
              <td class="px-6 py-4">${book.category_name}</td>
              <td class="px-6 py-4">${day}-${month}-${year}</td>
              <td class="px-6 py-4">${book.isbn}</td>
              <td class="px-6 py-4">
              <button class="edit-btn bg-blue-500 text-white px-2 py-1 rounded mr-2" data-id="${book.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded mr-2" data-id="${book.id}">
                <i class="fas fa-trash-alt"></i>
              </button>
              <button class="borrow-btn bg-green-500 text-white px-2 py-1 rounded" data-id="${book.id}">
                <i class="fas fa-book-reader"></i>
              </button>
              </td>
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
