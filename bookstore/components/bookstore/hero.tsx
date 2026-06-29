export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                Read <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Beyond</span> the Page
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                Discover an immersive 3D reading experience with thousands of free and premium books. Transform how you read with cutting-edge interactive design.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-accent to-secondary rounded-lg font-semibold text-primary hover:shadow-lg hover:shadow-accent/50 transition-all hover:scale-105">
                Explore Now
              </button>
              <button className="px-8 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative h-96 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl backdrop-blur-xl border border-border p-8 transform hover:scale-105 transition-transform duration-500" style={{ perspective: '1000px' }}>
              <div className="h-full flex items-center justify-center">
                <div className="space-y-4 w-full">
                  <div className="h-48 bg-gradient-to-br from-accent/30 to-secondary/30 rounded-xl border border-border/50 animate-pulse" />
                  <div className="h-12 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg border border-border/50" />
                  <div className="h-8 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border border-border/50 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
