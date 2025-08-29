import { Search, Loader2 } from 'lucide-react'

export default function SearchBar({ query, setQuery, loading }) {
  return (
    <div className="container-app mt-8 mb-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books by title, author, or subject…"
            className="w-full h-14 pl-14 pr-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-lg shadow-lg"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          {loading && (
            <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 animate-spin w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
          Try searching for "fantasy", "mystery", "science fiction", or specific titles
        </p>
      </div>
    </div>
  )
}
