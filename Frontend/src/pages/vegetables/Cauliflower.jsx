import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const cauliflowerVarieties = [
  {
    name: '1522',
    description:
      'Early hybrid with good yield and compact curds. Ideal for spring planting with consistent harvest quality and moderate resistance to common pests.',
    price: 120,
    available: 30,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
  {
    name: 'Dhawal',
    description:
      'Tropical variety, heat-tolerant and widely grown in India. Performs well in warmer climates and produces large white heads with excellent flavor.',
    price: 150,
    available: 20,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
  {
    name: '6099',
    description:
      'Mid-season variety with uniform growth and high resistance. Suitable for both fresh market and processing, offering good shelf life.',
    price: 130,
    available: 40,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
  {
    name: 'Supershigra',
    description:
      'Super-fast maturity with excellent white curds. Great choice for early harvest and quick turnaround in short growing seasons.',
    price: 140,
    available: 15,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
  {
    name: '764',
    description:
      'Strong plant with medium maturity and firm heads. Resistant to many diseases and adaptable to various soil types.',
    price: 110,
    available: 25,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
  {
    name: '447',
    description:
      'Popular hybrid, known for high productivity and disease tolerance. Produces uniform heads and maintains quality under storage.',
    price: 125,
    available: 35,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
  {
    name: '936',
    description:
      'Late-season variety suitable for winter harvesting. Known for large curds and excellent taste, perfect for cold climates.',
    price: 135,
    available: 18,
    images: [
      'https://swirlsofflavor.com/wp-content/uploads/2022/03/cauliflower-heads-cva-700x521.jpg.webp',
      'https://www.marthastewart.com/thmb/vaYxsIZB6TKJpWPW8cp6ca7-5ys=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cauliflower-med108019_horiz-0622-d111be16021545ae8d216be6e477fae4.jpg',
      'https://cdn.britannica.com/24/140624-050-A8237BB9/Cauliflower-plant-form-cauliflower-cabbage-flower-structures.jpg',
    ],
  },
];

const cauliflowerImage =
  'https://hub.suttons.co.uk/wp-content/uploads/2024/08/cauliflower-skywalker-f1-organic.jpg';

const Cauliflower = () => {
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
            Cauliflower
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={cauliflowerImage}
              alt="Cauliflower"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                Cauliflower is a nutritious vegetable known for its versatility and health benefits. It is rich in fiber, vitamins C and K, and antioxidants. Cauliflower is widely grown in temperate and tropical regions and is used in a variety of dishes including curries, salads, and roasted preparations.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these cauliflower varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0 mb-4">
            {cauliflowerVarieties.map((variety, index) => (
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

export default Cauliflower;
