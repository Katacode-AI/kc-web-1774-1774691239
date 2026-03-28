import { useState } from 'react'
import Header from './components/Header'
import ProductCatalog from './components/ProductCatalog'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { products } from './data/products'

export default function App() {
  const [currentPage, setCurrentPage] = useState('catalog')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id))
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      )
    }
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemCount={getTotalItems()}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'catalog' && (
          <ProductCatalog
            products={filteredProducts}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
          />
        )}
        
        {currentPage === 'cart' && (
          <Cart
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
            setCurrentPage={setCurrentPage}
          />
        )}
        
        {currentPage === 'checkout' && (
          <Checkout
            cart={cart}
            getTotalPrice={getTotalPrice}
            setCurrentPage={setCurrentPage}
            setCart={setCart}
          />
        )}
      </main>
    </div>
  )
}
