import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const bottleGourdVarieties = [
  {
    name: 'Naga',
    description:
      'Early maturing bottle gourd variety with long, uniform fruits. High yield and suitable for both fresh consumption and cooking.',
    price: 110,
    available: 30,
    images: [
      'https://static.vecteezy.com/system/resources/thumbnails/011/361/885/small/calabash-lagenaria-sacraria-fruit-from-vegetable-garden-locally-known-as-bottle-gourd-white-flowered-gourd-long-melon-new-guinea-bean-tasmania-bean-crop-planted-and-cultivated-at-farm-photo.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGr_FPmNw6QYx7xD3Nqg3YSn64PlsMlxbgrcIIzUV4D1no_VwmpYKXo_s4SHvxf9ulrxU&usqp=CAU',
      'https://t4.ftcdn.net/jpg/07/22/56/85/360_F_722568536_IqaAvDxx5UDGi3jFVOsqlOANiA1sFByC.jpg',
    ],
  },
  {
    name: 'Navin',
    description:
      'High yielding hybrid variety producing tender, light green fruits. Good resistance to major diseases and suitable for long-distance transport.',
    price: 120,
    available: 25,
    images: [
      'https://static.vecteezy.com/system/resources/thumbnails/011/361/885/small/calabash-lagenaria-sacraria-fruit-from-vegetable-garden-locally-known-as-bottle-gourd-white-flowered-gourd-long-melon-new-guinea-bean-tasmania-bean-crop-planted-and-cultivated-at-farm-photo.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGr_FPmNw6QYx7xD3Nqg3YSn64PlsMlxbgrcIIzUV4D1no_VwmpYKXo_s4SHvxf9ulrxU&usqp=CAU',
      'https://t4.ftcdn.net/jpg/07/22/56/85/360_F_722568536_IqaAvDxx5UDGi3jFVOsqlOANiA1sFByC.jpg',
    ],
  },
  {
    name: 'Dhruwa',
    description:
      'Popular variety known for cylindrical, smooth fruits and uniform shape. Performs well in multiple seasons and offers consistent yield.',
    price: 130,
    available: 20,
    images: [
      'https://static.vecteezy.com/system/resources/thumbnails/011/361/885/small/calabash-lagenaria-sacraria-fruit-from-vegetable-garden-locally-known-as-bottle-gourd-white-flowered-gourd-long-melon-new-guinea-bean-tasmania-bean-crop-planted-and-cultivated-at-farm-photo.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGr_FPmNw6QYx7xD3Nqg3YSn64PlsMlxbgrcIIzUV4D1no_VwmpYKXo_s4SHvxf9ulrxU&usqp=CAU',
      'https://t4.ftcdn.net/jpg/07/22/56/85/360_F_722568536_IqaAvDxx5UDGi3jFVOsqlOANiA1sFByC.jpg',
    ],
  },
];


const bottleGourdImage =
  'https://st4.depositphotos.com/4243035/31462/i/450/depositphotos_314626368-stock-photo-bottle-gourd-or-calabash-gourd.jpg';

const bottleGourd = () => {
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
    setSlideIndex(
      (prev) => (prev - 1 + selectedVariety.images.length) % selectedVariety.images.length
    );
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
        <section className="flex items-center justify-center py-4">
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
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                {selectedVariety.name}
              </h2>
              <p className="text-green-700 text-xl font-semibold mb-2">
                ₹{selectedVariety.price}
              </p>
              <p className="text-gray-700 mb-3">{selectedVariety.description}</p>
              <p className="text-md mb-1">
                <span className="font-semibold">Category:</span> Indoor
              </p>
               <p className="text-md mb-1">
                <span className="font-semibold">Status:</span> Available
              </p>
              <p className="text-md mb-4 text-red-600">
                <span className="font-semibold">Available:</span>{' '}
                {selectedVariety.available} units
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
            Bottle gourd 
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={bottleGourdImage}
              alt="Papaya"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                Bottle gourd is a versatile vegetable known for its light green skin, tender white flesh, and mild, slightly sweet flavor. It is low in calories and high in dietary fiber, making it an excellent choice for a healthy diet. Rich in vitamins C and B, as well as minerals like calcium and magnesium, bottle gourd supports digestion, hydration, and heart health. Grown in warm and tropical climates, this climber thrives during summer and monsoon seasons. Whether cooked in curries, stir-fries, soups, or used in desserts and juices, bottle gourd is a nutritious and widely cherished ingredient in many cuisines.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these Bottle gourd  varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 sm:px-0 max-w-5xl mx-auto mb-8">
            {bottleGourdVarieties.map((variety, index) => (
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

export default bottleGourd;
