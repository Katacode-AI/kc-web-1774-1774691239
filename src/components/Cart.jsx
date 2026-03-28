import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function Cart({ cart, updateCartQuantity, removeFromCart, getTotalPrice, setCurrentPage }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🛒</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Keranjang Kosong</h3>
        <p className="text-gray-600 mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
        <button
          onClick={() => setCurrentPage('catalog')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Mulai Belanja
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Keranjang Belanja</h2>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {cart.map(item => (
          <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-2">
                {formatPrice(item.price)}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="ml-6 text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total Belanja:</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(getTotalPrice())}
          </span>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentPage('catalog')}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Lanjut Belanja
          </button>
          <button
            onClick={() => setCurrentPage('checkout')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
