import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const brinjalVarieties = [
  {
    name: 'Panchganga',
    description:
      'High yielding variety known for its medium-sized, glossy purple fruits. Adapted to various climates and resistant to common pests.',
    price: 110,
    available: 30,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Super Gaurav',
    description:
      'Popular hybrid variety producing large, deep purple fruits with good shelf life and excellent taste.',
    price: 130,
    available: 25,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Commander',
    description:
      'Vigorous plant with medium maturity and long fruits. Suitable for fresh market and processing.',
    price: 120,
    available: 20,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Deshi Ravaya',
    description:
      'Local variety known for its unique flavor and adaptability to traditional farming methods.',
    price: 100,
    available: 40,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Galan',
    description:
      'Early maturing variety with smooth, dark purple fruits and good disease resistance.',
    price: 115,
    available: 35,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Bartok',
    description:
      'Hybrid brinjal variety producing high-quality fruits with excellent color and firmness.',
    price: 125,
    available: 22,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Bharta',
    description:
      'Suitable for cooking and making traditional dishes; produces medium-sized, firm fruits.',
    price: 105,
    available: 28,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
  {
    name: 'Jalgoan',
    description:
      'Late season variety known for its large fruits and adaptability to different soil types.',
    price: 135,
    available: 18,
    images: [
      'https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg',
      'https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncGxhbnRzfGVufDB8fDB8fHww',
      'https://t3.ftcdn.net/jpg/05/24/02/16/360_F_524021631_QzfhezPbmDfC9eUk0mguC0tb6ThbUEJQ.jpg',
    ],
  },
];


const brinjalImage = "https://housing.com/news/wp-content/uploads/2022/11/brinjal-feature-compressed.jpg";


const Brinjal = () => {
  const [selectedVariety, setSelectedVariety] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const handleAddToCart = (varietyName) => {
    toast.success(`${varietyName} added to cart!`);
  };

  const toggleWishlist = (varietyName) => {
    if (wishlist.includes(varietyName)) {
      setWishlist(wishlist.filter((name) => name !== varietyName));
      toast(`${varietyName} removed from wishlist`, { icon: '❌' });
    } else {
      setWishlist([...wishlist, varietyName]);
      toast.success(`${varietyName} added to wishlist`);
    }
  };

  const nextSlide = () => {
    if (!selectedVariety) return;
    setSlideIndex((prev) => (prev + 1) % selectedVariety.images.length);
  };

  const prevSlide = () => {
    if (!selectedVariety) return;
    setSlideIndex((prev) => (prev - 1 + selectedVariety.images.length) % selectedVariety.images.length);
  };

  useEffect(() => {
    setSlideIndex(0);
  }, [selectedVariety]);

  useEffect(() => {
    if (!selectedVariety) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % selectedVariety.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedVariety, selectedVariety?.images.length]);

  return (
    <main className="px-4 sm:px-6 pt-6 pb-4 bg-green-50">
      <Toaster position="top-right" reverseOrder={false} />

      {selectedVariety ? (
        <section className="flex items-center justify-center py-2">
          <article className="max-w-7xl bg-white rounded-xl shadow-xl p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 relative">
              <img
                src={selectedVariety.images[slideIndex]}
                alt={`${selectedVariety.name} variety - image ${slideIndex + 1}`}
                className="w-full rounded-lg object-cover max-h-[400px]"
              />
              <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <button
                  onClick={prevSlide}
                  className="bg-green-600 text-white rounded-full px-3 py-1 hover:bg-green-700"
                >
                  ‹
                </button>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button
                  onClick={nextSlide}
                  className="bg-green-600 text-white rounded-full px-3 py-1 hover:bg-green-700"
                >
                  ›
                </button>
              </div>
              <div className="flex justify-center mt-2 gap-2">
                {selectedVariety.images.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full border-2 ${
                      slideIndex === i
                        ? 'bg-green-600 border-green-600'
                        : 'bg-white border-gray-400'
                    }`}
                    onClick={() => setSlideIndex(i)}
                  />
                ))}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-green-800 mb-2">{selectedVariety.name}</h2>
              <p className="text-green-700 text-xl font-semibold mb-2">₹{selectedVariety.price}</p>
              <p className="text-gray-700 mb-3">{selectedVariety.description}</p>
              <p className="text-md mb-1">
                <span className="font-semibold">Category:</span> Outdoor
              </p>
               <p className="text-md mb-1">
                <span className="font-semibold">Status:</span> Available
              </p>
              <p className="text-md mb-4 text-red-600">
                <span className="font-semibold">Available:</span> {selectedVariety.available} units
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleAddToCart(selectedVariety.name)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Add to Cart
                </button>
                <button
                  className="underline text-sm text-gray-500"
                  onClick={() => setSelectedVariety(null)}
                >
                  ← Back to All Varieties
                </button>
              </div>
            </div>
          </article>
        </section>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
            Brinjal
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={brinjalImage}
              alt="Cauliflower"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                 Brinjal, also known as eggplant or aubergine, is a widely cultivated vegetable in the nightshade family. It produces glossy purple fruits that vary in shape and size. Rich in dietary fiber, vitamins, and antioxidants, brinjal supports heart health and digestion. It thrives in warm climates and is a staple in many cuisines, used in curries, grilling, roasting, and frying. Numerous hybrid varieties have been developed to improve yield, pest resistance, and fruit quality.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these brinjal varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0 mb-4">
            {brinjalVarieties.map((variety, index) => (
              <article
                key={index}
                className="bg-white border border-green-200 rounded-xl shadow-md p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-green-900">{variety.name}</h3>
                    <button
                      onClick={() => toggleWishlist(variety.name)}
                      className={`text-2xl ${
                        wishlist.includes(variety.name)
                          ? 'text-red-500'
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      {wishlist.includes(variety.name) ? '♥' : '♡'}
                    </button>
                  </div>
                  <p className="text-gray-700 mb-4 text-justify">{variety.description}</p>
                  <p className="text-green-800 font-semibold text-lg mb-6">
                    Price: ₹{variety.price}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAddToCart(variety.name)}
                    className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 flex-1"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedVariety(variety)}
                    className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-md hover:bg-yellow-600 flex-1"
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
};

export default Brinjal;
