import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const products = [
  {
    id: 1,
    name: 'Aloe Vera',
    price: '₹150',
    stock: 50,
    category: 'Indoor',
    description: 'Low-maintenance medicinal plant ideal for indoors.',
    wiki: 'https://en.wikipedia.org/wiki/Aloe_vera',
    image: 'https://horticulture.co.uk/wp-content/uploads/2023/04/aloeverawatering-header-2-1600x1066.jpg',
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: '₹250',
    stock: 30,
    category: 'Indoor',
    description: 'Air-purifying plant perfect for bedrooms and offices.',
    wiki: 'https://en.wikipedia.org/wiki/Dracaena_trifasciata',
    image: 'https://rukminim2.flixcart.com/image/850/1000/l2jcccw0/plant-sapling/1/6/o/yes-perennial-yes-snake-plant66-1-my-dream-nursery-original-imagdumqgatfc2at.jpeg?q=90&crop=false',
  },
  {
    id: 3,
    name: 'Peace Lily',
    price: '₹300',
    stock: 20,
    category: 'Indoor',
    description: 'Elegant flowering plant that thrives in low light.',
    wiki: 'https://en.wikipedia.org/wiki/Spathiphyllum',
    image: 'https://www.familytreenursery.com/uploads/1/0/1/8/101897330/peace-lily-care-5_orig.jpg',
  },
  {
    id: 4,
    name: 'Spider Plant',
    price: '₹180',
    stock: 40,
    category: 'Outdoor',
    description: 'Great beginner plant that’s easy to propagate.',
    wiki: 'https://en.wikipedia.org/wiki/Chlorophytum_comosum',
    image: 'https://gardenerspath.com/wp-content/uploads/2020/12/Spider-Plants-Growing-in-Hanging-Baskets-at-a-Plant-Nursery.jpg',
  },
];

const ProductCard = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart successfully!`);
  };

  const handleAddToWishlist = (product) => {
    const isWishlisted = wishlist.includes(product.id);
    if (isWishlisted) {
      setWishlist(wishlist.filter(id => id !== product.id));
      toast.error(`${product.name} removed from wishlist`);
    } else {
      setWishlist([...wishlist, product.id]);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  return (
    <div className="p-6 bg-green-50">
      <Toaster position="top-right" reverseOrder={false} />
       <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Top selling Plants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            
            {/* Plant name and wishlist heart inline */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
              <button
                onClick={() => handleAddToWishlist(product)}
                className={`ml-auto text-2xl cursor-pointer select-none ${
                  wishlist.includes(product.id) ? 'text-red-500' : 'text-gray-800'
                }`}
                title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {wishlist.includes(product.id) ? '♥' : '♡'}
              </button>
            </div>


            <p className="text-lg font-bold text-green-600">{product.price}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setSelectedPlant(product)}
                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                View Details
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Popup */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-20">
          <div className="bg-white p-6 pt-12 rounded-xl shadow-2xl max-w-md w-full relative">
            <button
              className="absolute top-1 right-3 text-3xl font-bold text-gray-700 hover:text-red-600 transition-colors"
              onClick={() => setSelectedPlant(null)}
            >
              ×
            </button>
            <img
              src={selectedPlant.image}
              alt={selectedPlant.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold text-green-700 mb-2">{selectedPlant.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{selectedPlant.description}</p>
            <p className="text-lg font-semibold text-green-600">Price: {selectedPlant.price}</p>
            <p className="text-sm text-gray-600">Stock: {selectedPlant.stock}</p>
            <p className="text-sm text-gray-600 mb-2">
              Category: <span className="font-medium">{selectedPlant.category}</span>
            </p>
            <a
              href={selectedPlant.wiki}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 text-sm"
            >
              View on Wikipedia
            </a>

            <button
              onClick={() => handleAddToCart(selectedPlant)}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
