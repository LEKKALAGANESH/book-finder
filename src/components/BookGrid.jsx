import BookCard from './BookCard'

export default function BookGrid({ books, onSelect, favorites, toggleFavorite }) {
  if (!books?.length) {
    return (
      <div className="container-app py-16 text-center text-gray-600 dark:text-gray-300">
        <p className="text-lg">Start by typing a book title in the search bar.</p>
      </div>
    )
  }

  return (
    <div className="container-app py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {books.map((b) => (
        <BookCard
          key={`${b.key}-${b.cover_i ?? ''}`}
          book={b}
          onSelect={onSelect}
          isFavorite={!!favorites.find(f => f.key === b.key)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}
