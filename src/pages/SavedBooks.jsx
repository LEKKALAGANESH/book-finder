import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { storage } from "../utils/storage";

const SavedBooks = () => {
    const [savedBooks, setSavedBooks] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const favs = storage.get("bf_favs", []);
        setSavedBooks(favs);
    }, []);

    // Remove from favorites
    const removeBook = (bookKey) => {
        const updated = savedBooks.filter((b) => b.key !== bookKey);
        setSavedBooks(updated);
        storage.set("bf_favs", updated); // ✅ update storage too
    };

    return (
        <div className="p-6 container-app">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">📚 Saved Books</h1>
            {savedBooks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No books saved yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {savedBooks.map((book) => (
                        <div key={book.key} className="relative">
                            <BookCard book={book} isSavedPage={true} />
                            <button
                                onClick={() => removeBook(book.key)}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded shadow-md transition-colors duration-300"
                                aria-label={`Remove ${book.title} from saved books`}
                            >
                                ❌ Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedBooks;
