// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SavedBooks from "./pages/SavedBooks";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedBooks />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
