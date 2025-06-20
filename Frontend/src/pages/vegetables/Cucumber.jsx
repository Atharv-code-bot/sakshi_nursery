import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const cucumberVarieties = [
  {
    name: 'Fadia',
    description:
      'Early maturing hybrid with uniform, glossy green fruits. High yield potential and good resistance to common diseases.',
    price: 110,
    available: 30,
    images: [
      'https://media.istockphoto.com/id/1291778191/photo/zucchini-plants.jpg?s=612x612&w=0&k=20&c=riK76uwtCX0t49oIKnHqv094yKD9jyzgbR4dut5Bvmg=',
      'https://media.istockphoto.com/id/586369900/photo/cucumbers-in-greenhouse-growing-cucumbers.jpg?s=612x612&w=0&k=20&c=cyzH6GX3hcsFoGYQIWoqNGgT4g3xiGnhPkrHRfe7BUU=',
      'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg',
    ],
  },
  {
    name: 'Judosian',
    description:
      'Vigorous growth with dark green, slender cucumbers. Excellent for fresh consumption with a crisp texture.',
    price: 120,
    available: 25,
    images: [
      'https://media.istockphoto.com/id/1291778191/photo/zucchini-plants.jpg?s=612x612&w=0&k=20&c=riK76uwtCX0t49oIKnHqv094yKD9jyzgbR4dut5Bvmg=',
      'https://media.istockphoto.com/id/586369900/photo/cucumbers-in-greenhouse-growing-cucumbers.jpg?s=612x612&w=0&k=20&c=cyzH6GX3hcsFoGYQIWoqNGgT4g3xiGnhPkrHRfe7BUU=',
      'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg',
    ],
  },
  {
    name: 'Green Glory',
    description:
      'High-quality hybrid producing uniform fruits with good keeping quality. Performs well in various climates.',
    price: 130,
    available: 20,
    images: [
      'https://media.istockphoto.com/id/1291778191/photo/zucchini-plants.jpg?s=612x612&w=0&k=20&c=riK76uwtCX0t49oIKnHqv094yKD9jyzgbR4dut5Bvmg=',
      'https://media.istockphoto.com/id/586369900/photo/cucumbers-in-greenhouse-growing-cucumbers.jpg?s=612x612&w=0&k=20&c=cyzH6GX3hcsFoGYQIWoqNGgT4g3xiGnhPkrHRfe7BUU=',
      'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg',
    ],
  },
  {
    name: '3D',
    description:
      'Unique hybrid with excellent market appeal. Crunchy, tender fruits ideal for salads and fresh use.',
    price: 115,
    available: 28,
    images: [
      'https://media.istockphoto.com/id/1291778191/photo/zucchini-plants.jpg?s=612x612&w=0&k=20&c=riK76uwtCX0t49oIKnHqv094yKD9jyzgbR4dut5Bvmg=',
      'https://media.istockphoto.com/id/586369900/photo/cucumbers-in-greenhouse-growing-cucumbers.jpg?s=612x612&w=0&k=20&c=cyzH6GX3hcsFoGYQIWoqNGgT4g3xiGnhPkrHRfe7BUU=',
      'https://www.shutterstock.com/image-photo/organic-cucumbers-cultivation-closeup-fresh-600nw-2463149627.jpg',
    ],
  },
];






const cucumberImage = "https://www.allthatgrows.in/cdn/shop/articles/Feat_Image-Cucumbers_1024x1024.jpg?v=16215781636";


const Cucumber = () => {
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
            Cucumber
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={cucumberImage}
              alt="Cauliflower"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                Cucumber is a cool, crisp vegetable known for its refreshing taste and high water content, making it perfect for hydration and detoxification. With its light green skin and tender, juicy flesh, cucumber is low in calories but rich in vitamins K and C, antioxidants, and minerals like potassium and magnesium. It supports digestion, skin health, and helps regulate body temperature. Thriving in warm climates, cucumbers are easy to grow and are widely cultivated across the globe. Commonly enjoyed raw in salads, sandwiches, and juices, or pickled as a tangy snack, cucumber is a healthy and versatile addition to everyday meals.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these cucumber varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0 mb-4">
            {cucumberVarieties.map((variety, index) => (
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

export default Cucumber;
