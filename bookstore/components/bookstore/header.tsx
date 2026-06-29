import Link from 'next/link'

interface HeaderProps {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              📚 BookVerse
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <input
              type="text"
              placeholder="Search books..."
              className="px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <select className="px-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all">
              <option>All Categories</option>
              <option>Science</option>
              <option>Technology</option>
              <option>Philosophy</option>
            </select>
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/profile" className="text-xl hover:text-accent transition-colors">
              👤
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
