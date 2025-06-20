import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const capsicumVarieties = [
  {
    name: 'Paledian',
    description:
      'High-yielding hybrid capsicum with blocky, glossy green fruits. Excellent fruit setting and disease resistance.',
    price: 140,
    available: 25,
    images: [
      'https://www.asiafarming.com/wp-content/uploads/2016/09/Capsicum-Cultivation.jpg',
      'https://static.wixstatic.com/media/5dafd8_bedd5cf410a948c788bbbd93dc5a1ac1~mv2.jpg/v1/crop/x_235,y_0,w_4037,h_2848/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/bell%20pepper%20in%20the%20garden.jpg',
      'https://info.moleaer.com/hubfs/Bell%20Peppers.jpg',
    ],
  },
  {
    name: 'Asha',
    description:
      'Early maturing capsicum variety with uniform fruits and good firmness. Ideal for open field and polyhouse cultivation.',
    price: 130,
    available: 30,
    images: [
      'https://www.asiafarming.com/wp-content/uploads/2016/09/Capsicum-Cultivation.jpg',
      'https://static.wixstatic.com/media/5dafd8_bedd5cf410a948c788bbbd93dc5a1ac1~mv2.jpg/v1/crop/x_235,y_0,w_4037,h_2848/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/bell%20pepper%20in%20the%20garden.jpg',
      'https://info.moleaer.com/hubfs/Bell%20Peppers.jpg',
    ],
  },
  {
    name: 'Hungtingtun',
    description:
      'Premium hybrid producing thick-walled, attractive green bell peppers. Good shelf life and market demand.',
    price: 150,
    available: 20,
    images: [
      'https://www.asiafarming.com/wp-content/uploads/2016/09/Capsicum-Cultivation.jpg',
      'https://static.wixstatic.com/media/5dafd8_bedd5cf410a948c788bbbd93dc5a1ac1~mv2.jpg/v1/crop/x_235,y_0,w_4037,h_2848/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/bell%20pepper%20in%20the%20garden.jpg',
      'https://info.moleaer.com/hubfs/Bell%20Peppers.jpg',
    ],
  },
  {
    name: 'Indus-11',
    description:
      'Mid-season hybrid with uniform fruit size and smooth texture. Resistant to common pests and diseases.',
    price: 135,
    available: 28,
    images: [
      'https://www.asiafarming.com/wp-content/uploads/2016/09/Capsicum-Cultivation.jpg',
      'https://static.wixstatic.com/media/5dafd8_bedd5cf410a948c788bbbd93dc5a1ac1~mv2.jpg/v1/crop/x_235,y_0,w_4037,h_2848/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/bell%20pepper%20in%20the%20garden.jpg',
      'https://info.moleaer.com/hubfs/Bell%20Peppers.jpg',
    ],
  },
];




const capsicumImage = "https://www.netafimindia.com/bynder/00E33388-6E92-485B-8EEFAAAF53AB8652-capsicum-grown-in-greenhouse-close-up-photo-.jpg?width=1200&height=630&rmode=Min";


const capsicum = () => {
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
            Capsicum
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={capsicumImage}
              alt="Cauliflower"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                Capsicum, also known as bell pepper, is a colorful and crisp vegetable enjoyed for its sweet, mildly tangy flavor and crunchy texture. It comes in vibrant shades of green, red, yellow, and orange, each offering a slightly different taste and nutritional profile. Rich in vitamin C, vitamin A, and antioxidants like beta-carotene and lutein, capsicum supports immune health, eye health, and skin vitality. Grown in warm, sunny climates, it thrives in well-drained soil and is harvested in various seasons. Versatile in the kitchen, capsicum is used in salads, stir-fries, pizzas, curries, and stuffed dishes, making it a nutritious and flavorful favorite in global cuisine.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these capsicum varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0 mb-4">
            {capsicumVarieties.map((variety, index) => (
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

export default capsicum;
