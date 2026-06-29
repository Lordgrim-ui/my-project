'use client'

interface BookCardProps {
  id: number
  title: string
  author: string
  category: string
  price: number
  rating: number
  cover: string
  description: string
  onAddToCart: () => void
}

export default function BookCard({
  id,
  title,
  author,
  category,
  price,
  rating,
  cover,
  description,
  onAddToCart,
}: BookCardProps) {
  return (
    <div className="group h-full">
      <div
        className="relative overflow-hidden rounded-2xl bg-card border border-border p-4 backdrop-filter backdrop-blur-xl hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 cursor-pointer h-full flex flex-col"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating background orb */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent to-secondary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-3xl" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Book Cover */}
          <div className="relative overflow-hidden rounded-xl mb-4 aspect-[3/4] bg-gradient-to-br from-accent/20 to-secondary/20 border border-border/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            {price === 0 && (
              <div className="absolute top-3 right-3 bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold">
                Free
              </div>
            )}
          </div>

          {/* Book Info */}
          <div className="flex-1 flex flex-col">
            <div className="mb-2">
              <span className="inline-block text-xs font-semibold text-accent bg-accent/20 px-2 py-1 rounded-full mb-2">
                {category}
              </span>
              <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                {title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{author}</p>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < Math.floor(rating) ? 'text-accent' : 'text-muted'}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{rating}</span>
            </div>

            {/* Price & Button */}
            <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border">
              <div>
                {price > 0 ? (
                  <span className="font-bold text-accent">${price}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">Access Free</span>
                )}
              </div>
              <button
                onClick={onAddToCart}
                className="px-4 py-2 bg-gradient-to-r from-accent to-secondary text-primary rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-accent/50 transition-all hover:scale-105 whitespace-nowrap"
              >
                {price === 0 ? 'Read Now' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
