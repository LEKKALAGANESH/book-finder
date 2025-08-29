export default function BookCard({ book, onSelect, isFavorite, toggleFavorite, isSavedPage = false }) {
  const coverId = book.cover_i
  const img = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : `https://placehold.co/200x300?text=No+Cover`

  return (
    <div className="card overflow-hidden hover:-translate-y-0.5 hover:shadow-xl transition cursor-pointer">
      <div onClick={() => onSelect(book)}>
        <img src={img} alt={book.title} className="w-full h-56 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold leading-tight line-clamp-2 text-gray-900 dark:text-gray-100">{book.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{book.author_name?.[0] ?? 'Unknown author'}</p>
          <p className="text-xs text-gray-500 mt-1">{book.first_publish_year ?? '—'}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        {!isSavedPage && (
          <button
            onClick={() => toggleFavorite(book)}
            className={`w-full h-9 rounded-xl text-sm font-medium transition ${isFavorite ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            {isFavorite ? '★ Saved' : '☆ Save'}
          </button>
        )}
      </div>
    </div >
  )
}
