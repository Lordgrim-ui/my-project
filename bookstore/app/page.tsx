'use client'

import { useState } from 'react'
import Header from '@/components/bookstore/header'
import Hero from '@/components/bookstore/hero'
import BookGrid from '@/components/bookstore/book-grid'
import Footer from '@/components/bookstore/footer'

export default function Page() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header cartCount={cartCount} />
      <Hero />
      <BookGrid onAddToCart={() => setCartCount(c => c + 1)} />
      <Footer />
    </main>
  )
}
