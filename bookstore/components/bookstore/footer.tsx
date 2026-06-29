export default function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-t from-black/20 to-transparent mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">BookVerse</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Your gateway to immersive 3D reading experiences with thousands of books.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Browse Books</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">New Releases</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 BookVerse. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-accent hover:text-secondary transition-colors">Twitter</a>
              <a href="#" className="text-accent hover:text-secondary transition-colors">Discord</a>
              <a href="#" className="text-accent hover:text-secondary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
