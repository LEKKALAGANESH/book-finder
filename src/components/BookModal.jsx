import { useEffect, useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'

export default function BookModal({ book, onClose }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function fetchDetails() {
      try {
        setLoading(true)
        const res = await axios.get(`https://openlibrary.org${book.key}.json`)
        if (!cancelled) setDetails(res.data)
      } catch {
        if (!cancelled) setDetails(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchDetails()
    return () => { cancelled = true }
  }, [book.key])

  const coverId = book.cover_i
  const img = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : `https://placehold.co/600x800?text=No+Cover`
  const authors = book.author_name?.join(', ') ?? 'Unknown'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div className="card max-w-3xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100">Book Details</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <img src={img} alt={book.title} className="w-full rounded-xl object-cover" />
          <div>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">{book.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-1">By {authors}</p>
            <p className="text-sm text-gray-500 mt-1">First published: {book.first_publish_year ?? '—'}</p>

            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Description</h4>
              {loading ? (
                <p className="text-sm text-gray-500">Loading description…</p>
              ) : details?.description ? (
                <p className="text-sm text-gray-700 dark:text-gray-300">{typeof details.description === 'string' ? details.description : details.description.value}</p>
              ) : (
                <p className="text-sm text-gray-500">No description available.</p>
              )}
            </div>

            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center mt-6 h-10 px-4 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              View on Open Library →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
