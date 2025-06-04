# Book Store Management System (CRUD)

## Overview
This **Book Store Management System** is a full-stack web application that allows users to perform **CRUD (Create, Read, Update, Delete)** operations on book records. Each book has essential information like **Title** and **Release Year**.

The system provides a user-friendly interface for managing books and is built using **ReactJS** for the frontend and **Django** with **SQLite** for the backend.

## Features
- Add new books (Title, Release Year)
- View a list of all books
- Update book information
- Delete books from the list
- Responsive UI for ease of use
- Django REST API integration with ReactJS frontend

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - ReactJS

- **Backend:**
  - Python
  - Django
  - Django REST Framework

- **Database:**
  - SQLite

## CRUD Operations

| Operation | Description                              |
|-----------|------------------------------------------|
| Create    | Add a new book with title and year       |
| Read      | View all books in the store              |
| Update    | Edit existing book details               |
| Delete    | Remove a book from the store             |

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sushmitha9380/bookstore-crud.git
cd bookstore-crud
```
### 2. Backend Setup (Django)
```bash
cd Server
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
### 3. Frontend Setup (React)
```bash
cd ../Client
npm install
npm start
```
---

## API Endpoints

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | `/api/books/`      | List all books     |
| POST   | `/api/books/create`| Add a new book     |
| PUT    | `/api/books/{id}/` | Update a book      |
| DELETE | `/api/books/{id}/` | Delete a book      |

---

## Sample Book JSON

```json
{
  "title": "The Great Gatsby",
  "release_year": 1925
}
```
---

## Contact
For any questions or suggestions, please contact:

Sushmitha

Email: sushmithars5992@gmail.com

GitHub: sushmitha9380


