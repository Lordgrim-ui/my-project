'use client'

import { useState } from 'react'
import BookCard from './book-card'

interface BookGridProps {
  onAddToCart: () => void
}

const BOOKS = [
  {
    id: 1,
    title: 'Quantum Curiosity',
    author: 'A. Newton',
    category: 'Science',
    price: 0,
    rating: 4.5,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
    description: 'A playful dive into modern physics and quantum mechanics.',
  },
  {
    id: 2,
    title: 'The JS Grimoire',
    author: 'E. Script',
    category: 'Technology',
    price: 15,
    rating: 4.8,
    cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=400&fit=crop',
    description: 'Master JavaScript without frameworks. Pure coding excellence.',
  },
  {
    id: 3,
    title: 'Philosophy of Shadows',
    author: 'Plato X',
    category: 'Philosophy',
    price: 10,
    rating: 4.2,
    cover: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=300&h=400&fit=crop',
    description: 'Old questions, new light. A journey through philosophical thought.',
  },
  {
    id: 4,
    title: 'Digital Renaissance',
    author: 'M. Code',
    category: 'Technology',
    price: 0,
    rating: 4.6,
    cover: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=400&fit=crop',
    description: 'How technology is reshaping human creativity and art.',
  },
  {
    id: 5,
    title: 'The Mind Universe',
    author: 'Dr. Cosmic',
    category: 'Science',
    price: 12,
    rating: 4.7,
    cover: 'https://images.unsplash.com/photo-1543002588-d83cedbc4d60?w=300&h=400&fit=crop',
    description: 'Explore the deepest mysteries of consciousness and cosmos.',
  },
  {
    id: 6,
    title: 'Art of Thinking',
    author: 'L. Wisdom',
    category: 'Philosophy',
    price: 0,
    rating: 4.4,
    cover: 'https://images.unsplash.com/photo-1495446815901-a7297e45564e?w=300&h=400&fit=crop',
    description: 'Critical thinking skills for the modern world.',
  },
]

export default function BookGrid({ onAddToCart }: BookGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBooks = BOOKS.filter((book) => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ['all', ...new Set(BOOKS.map((b) => b.category))]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-8">
            Featured <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Collection</span>
          </h2>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-accent to-secondary text-primary shadow-lg shadow-accent/50'
                    : 'bg-input border border-border text-foreground hover:border-accent/50'
                }`}
              >
                {category === 'all' ? 'All Books' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} {...book} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No books found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
