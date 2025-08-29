# Book Finder

A React-based web application to search, save, and explore books using the Open Library API. The app features a modern UI with Dark/Light Mode toggle, responsive design, and smooth user experience.

---

## Features

- **Book Search:** Search millions of books by title, author, or subject with instant results.
- **Debounced Search:** Efficient search with debouncing to reduce API calls.
- **Save Favorites:** Save your favorite books for quick access later.
- **Saved Books Page:** View and manage your saved books with remove functionality.
- **Dark/Light Mode Toggle:** Switch between dark and light themes with smooth transitions.
- **Theme Persistence:** Your theme preference is saved and applied on return visits.
- **Responsive Design:** Fully responsive UI that works seamlessly on mobile, tablet, and desktop.
- **Accessible UI:** Keyboard accessible theme toggle and interactive elements.
- **Smooth Animations:** Subtle animations for loading states, buttons, and theme transitions.
- **Modern Tech Stack:** Built with React, Vite, Tailwind CSS, and React Router.

---

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd book-finder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

---

## Usage

- Use the search bar on the Home page to find books.
- Click on a book card to view details.
- Save books by clicking the "Save" button.
- Access your saved books on the "Saved Books" page.
- Toggle between dark and light modes using the button in the navbar.
- Your saved books and theme preference are stored locally.

---

## Project Structure

- `src/contexts/ThemeContext.jsx` - Theme state management and persistence.
- `src/components/ThemeToggle.jsx` - Reusable theme toggle button.
- `src/components/Navbar.jsx` - Navigation bar with theme toggle.
- `src/pages/Home.jsx` - Main search and book listing page.
- `src/pages/SavedBooks.jsx` - Saved books management page.
- `src/components/BookCard.jsx` - Book card UI component.
- `src/components/SearchBar.jsx` - Search input with loading indicator.
- `src/utils/storage.js` - LocalStorage utility for persistence.
- `src/index.css` - Tailwind CSS with custom styles and dark mode support.

---

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React (icons)
- Framer Motion (animations)

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- Open Library API for book data.
- Tailwind CSS for utility-first styling.
- Lucide React for icons.
