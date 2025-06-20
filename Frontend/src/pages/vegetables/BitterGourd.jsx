import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const bitterGourdVarieties = [
  {
    name: 'Rushan',
    description:
      'Early hybrid bitter gourd known for uniform, dark green fruits with ridges. Suitable for summer and rainy seasons with high productivity.',
    price: 110,
    available: 30,
    images: [
      'https://media.istockphoto.com/id/1134148023/photo/bitter-melon-bitter-gourd.jpg?s=612x612&w=0&k=20&c=DNQSOqbXM6eg2LiSRzgJm5D_6FTp_jmfY0P9eyTG5Ko=',
      'https://t4.ftcdn.net/jpg/04/89/23/57/360_F_489235725_bfNmQJNHKzCyScLGEIIhiX0PvUXEgd9Z.jpg',
      'https://t3.ftcdn.net/jpg/03/67/36/64/360_F_367366472_DTqDKS1gBMpmn4UfQvI4S0Pk7oAemZRq.jpg',
    ],
  },
  {
    name: 'Pragati-65',
    description:
      'Fast-growing variety with early maturity and high fruit set. Produces slender, light green fruits with excellent market value.',
    price: 115,
    available: 25,
   images: [
      'https://media.istockphoto.com/id/1134148023/photo/bitter-melon-bitter-gourd.jpg?s=612x612&w=0&k=20&c=DNQSOqbXM6eg2LiSRzgJm5D_6FTp_jmfY0P9eyTG5Ko=',
      'https://t4.ftcdn.net/jpg/04/89/23/57/360_F_489235725_bfNmQJNHKzCyScLGEIIhiX0PvUXEgd9Z.jpg',
      'https://t3.ftcdn.net/jpg/03/67/36/64/360_F_367366472_DTqDKS1gBMpmn4UfQvI4S0Pk7oAemZRq.jpg',
    ],
  },
  {
    name: 'Amanshri',
    description:
      'High yielding bitter gourd hybrid known for long, glossy fruits and disease resistance. Performs well in varied climates.',
    price: 125,
    available: 20,
    images: [
      'https://media.istockphoto.com/id/1134148023/photo/bitter-melon-bitter-gourd.jpg?s=612x612&w=0&k=20&c=DNQSOqbXM6eg2LiSRzgJm5D_6FTp_jmfY0P9eyTG5Ko=',
      'https://t4.ftcdn.net/jpg/04/89/23/57/360_F_489235725_bfNmQJNHKzCyScLGEIIhiX0PvUXEgd9Z.jpg',
      'https://t3.ftcdn.net/jpg/03/67/36/64/360_F_367366472_DTqDKS1gBMpmn4UfQvI4S0Pk7oAemZRq.jpg',
    ],
  },
  {
    name: 'Aryan',
    description:
      'Vigorous growing variety with thick, dark green fruits. Ideal for extended harvesting and suitable for commercial cultivation.',
    price: 130,
    available: 18,
   images: [
      'https://media.istockphoto.com/id/1134148023/photo/bitter-melon-bitter-gourd.jpg?s=612x612&w=0&k=20&c=DNQSOqbXM6eg2LiSRzgJm5D_6FTp_jmfY0P9eyTG5Ko=',
      'https://t4.ftcdn.net/jpg/04/89/23/57/360_F_489235725_bfNmQJNHKzCyScLGEIIhiX0PvUXEgd9Z.jpg',
      'https://t3.ftcdn.net/jpg/03/67/36/64/360_F_367366472_DTqDKS1gBMpmn4UfQvI4S0Pk7oAemZRq.jpg',
    ],
  },
];



const bitterGourdImage = "https://cdn.pixabay.com/photo/2021/08/09/21/49/bitter-gourd-6534410_640.jpg";


const bitterGourd = () => {
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
            Bitter Gourd
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={bitterGourdImage}
              alt="Cauliflower"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                 Bitter gourd, also known as bitter melon, is a distinct green vegetable recognized for its unique bitter flavor and rough, warty skin. Despite its taste, it is prized for its powerful health benefits. Rich in vitamins C and A, iron, and antioxidants, bitter gourd is especially valued for its blood-purifying properties and its ability to help regulate blood sugar levels, making it a popular choice for managing diabetes. Grown in tropical and subtropical regions, it thrives in warm climates. Commonly used in stir-fries, curries, juices, and traditional remedies, bitter gourd is a nutritional powerhouse celebrated in various cuisines for both its flavor and medicinal value.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these Bitter Gourd varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0 mb-4">
            {bitterGourdVarieties.map((variety, index) => (
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

export default bitterGourd;
