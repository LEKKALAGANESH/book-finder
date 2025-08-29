import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { storage } from "../utils/storage";
import SearchBar from "../components/SearchBar";
import BookGrid from "../components/BookGrid";
import BookModal from "../components/BookModal";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
    const { isDark } = useTheme();
    const [query, setQuery] = useState("");
    const debounced = useDebounce(query, 500);

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [favorites, setFavorites] = useState(() =>
        storage.get("bf_favs", [])
    );

    // Fetch books
    useEffect(() => {
        if (!debounced.trim()) {
            setBooks([]);
            setPage(1);
            setError(null);
            return;
        }
        let cancelled = false;
        async function fetchBooks() {
            try {
                setLoading(true);
                setError(null);
                const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
                    debounced
                )}&page=${page}`;
                const res = await axios.get(url);
                const docs = res.data?.docs ?? [];
                setBooks((prev) => (page === 1 ? docs : [...prev, ...docs]));
            } catch (e) {
                setError("Something went wrong while fetching books.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        fetchBooks();
        return () => {
            cancelled = true;
        };
    }, [debounced, page]);

    // Reset page when query changes
    useEffect(() => {
        setPage(1);
    }, [debounced]);

    const canLoadMore = useMemo(
        () => books.length > 0 && !loading,
        [books, loading]
    );

    function toggleFavorite(book) {
        setFavorites(prev => {
            const exists = prev.find(b => b.key === book.key)
            const next = exists ? prev.filter(b => b.key !== book.key) : [...prev, book]
            storage.set('bf_favs', next)
            return next
        })
    }

    return (
        <main className="pb-20 pt-6">
            <div className="container-app">
                {/* Hero section */}
                {!debounced && books.length === 0 && (
                    <div className="text-center py-12 md:py-20">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Discover Your Next <span className="text-gradient">Great Read</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                            Search through millions of books from the Open Library database. 
                            Find your next favorite book and save it for later.
                        </p>
                    </div>
                )}

                <SearchBar query={query} setQuery={setQuery} loading={loading} />

                {error && (
                    <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                        <p className="font-medium">Error</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                )}

                {loading && books.length === 0 && (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
                            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Searching for books...</p>
                    </div>
                )}

                <BookGrid
                    books={books}
                    onSelect={setSelected}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                />

                {canLoadMore && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="btn-primary px-8 py-3 text-base"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                'Load More Books'
                            )}
                        </button>
                    </div>
                )}

                {books.length === 0 && debounced && !loading && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📚</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No books found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try a different search term or check your spelling.
                        </p>
                    </div>
                )}
            </div>

            {selected && <BookModal book={selected} onClose={() => setSelected(null)} />}
        </main>
    );
}
