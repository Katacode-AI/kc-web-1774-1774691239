import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Header({ currentPage, setCurrentPage, cartItemCount, searchTerm, setSearchTerm }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage('catalog')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">KataStore</span>
          </div>

          {/* Search Bar */}
          {currentPage === 'catalog' && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('catalog')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'catalog' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Katalog
            </button>
            
            <button
              onClick={() => setCurrentPage('cart')}
              className={`relative flex items-center space-x-1 text-sm font-medium transition-colors ${
                currentPage === 'cart' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Keranjang</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
