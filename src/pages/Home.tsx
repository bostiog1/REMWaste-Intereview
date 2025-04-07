import SkipSizeSelector from "../components/SkipSizeSelector";

function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl">SkipHire</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-500 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <SkipSizeSelector />
      </div>

      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            © 2025 SkipHire. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;
