import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [newTitle, setNewTitle] = useState("");

  // Read API base URL from environment variable
  const REACT_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    console.log("Fetching books...");
    try {
      const response = await fetch(`${REACT_API_BASE_URL}/api/books/`);
      const data = await response.json();
      setBooks(data); // Update state
    } catch (err) {
      console.log("Error fetching books:", err);
    }
  };

  const addBook = async () => {
    if (!title || !releaseYear) {
      alert("Please enter both title and release year");
      return;
    }

    const bookData = {
      title,
      release_year: parseInt(releaseYear, 10),
    };
    try {
      const response = await fetch(`${REACT_API_BASE_URL}/api/books/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
      setTitle("");         // Clear input fields
      setReleaseYear("");
      // Optionally refetch all books:
      // fetchBooks();
    } catch (err) {
      console.log("Error adding book:", err);
    }
  };

  const updateTitle = async (pk, release_year) => {
    if (!newTitle) {
      alert("Please enter a new title");
      return;
    }

    const bookData = {
      title: newTitle,
      release_year,
    };
    try {
      const response = await fetch(`${REACT_API_BASE_URL}/api/books/${pk}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => (book.id === pk ? data : book))
      );
      setNewTitle("");  // Clear input after updating
      // Optionally refetch all books:
      // fetchBooks();
    } catch (err) {
      console.log("Error updating book:", err);
    }
  };

  const deleteBook = async (pk) => {
    try {
      const response = await fetch(`${REACT_API_BASE_URL}/api/books/${pk}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      setBooks((prev) => prev.filter((book) => book.id !== pk)); // Update state after delete
      // Optionally refetch all books:
      // fetchBooks();
    } catch (err) {
      console.log("Error deleting book:", err);
    }
  };

  return (
    <div className="container">
      <h1>Bookstore</h1>

      <div className="book-form">
        <input
          type="text"
          placeholder="Book Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Year..."
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <div className="book-list">
        {books.length === 0 ? (
          <p>No books available</p>
        ) : (
          books.map((book) => (
            <div key={book.id} className="book-item">
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Release Year:</strong> {book.release_year}</p>
              
              <input
                type="text"
                placeholder="New Title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => updateTitle(book.id, book.release_year)}>
                Change Title
              </button>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
