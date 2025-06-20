import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const tomatoVarieties = [
  {
    name: 'Sahu',
    description: 'High-yielding hybrid variety suitable for various climates. Produces firm, red fruits with a long shelf life.',
    price: 110,
    available: 30,
    images: [
    'https://media.istockphoto.com/id/1545800730/photo/organic-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=o6QN6XbHKqIEpgTn7bQxNgtIOGe231Nhb-_zxz3LdZI=',
    'https://thumbs.dreamstime.com/b/sunlit-tomato-field-fresh-ripe-red-tomatoes-green-vines-summer-sunlit-tomato-field-fresh-ripe-red-tomatoes-357514223.jpg',
    'https://t4.ftcdn.net/jpg/06/47/42/41/360_F_647424157_gjcAdF1044lhsh4gQfWaHhjzzjMMAOcF.jpg',
    ],
  },
  {
    name: '2048',
    description: 'Hybrid tomato offering uniform fruit size and strong disease resistance. Great for fresh consumption and markets.',
    price: 120,
    available: 28,
     images: [
    'https://media.istockphoto.com/id/1545800730/photo/organic-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=o6QN6XbHKqIEpgTn7bQxNgtIOGe231Nhb-_zxz3LdZI=',
    'https://thumbs.dreamstime.com/b/sunlit-tomato-field-fresh-ripe-red-tomatoes-green-vines-summer-sunlit-tomato-field-fresh-ripe-red-tomatoes-357514223.jpg',
    'https://t4.ftcdn.net/jpg/06/47/42/41/360_F_647424157_gjcAdF1044lhsh4gQfWaHhjzzjMMAOcF.jpg',
    ],
  },
  {
    name: 'Aayman',
    description: 'Medium maturity variety known for its balanced flavor and smooth red fruits. Good adaptability to different soils.',
    price: 115,
    available: 25,
     images: [
    'https://media.istockphoto.com/id/1545800730/photo/organic-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=o6QN6XbHKqIEpgTn7bQxNgtIOGe231Nhb-_zxz3LdZI=',
    'https://thumbs.dreamstime.com/b/sunlit-tomato-field-fresh-ripe-red-tomatoes-green-vines-summer-sunlit-tomato-field-fresh-ripe-red-tomatoes-357514223.jpg',
    'https://t4.ftcdn.net/jpg/06/47/42/41/360_F_647424157_gjcAdF1044lhsh4gQfWaHhjzzjMMAOcF.jpg',
    ],
  },
  {
    name: '1517',
    description: 'Early harvest tomato variety with firm texture and bright color. Good for transport and market sale.',
    price: 130,
    available: 20,
     images: [
    'https://media.istockphoto.com/id/1545800730/photo/organic-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=o6QN6XbHKqIEpgTn7bQxNgtIOGe231Nhb-_zxz3LdZI=',
    'https://thumbs.dreamstime.com/b/sunlit-tomato-field-fresh-ripe-red-tomatoes-green-vines-summer-sunlit-tomato-field-fresh-ripe-red-tomatoes-357514223.jpg',
    'https://t4.ftcdn.net/jpg/06/47/42/41/360_F_647424157_gjcAdF1044lhsh4gQfWaHhjzzjMMAOcF.jpg',
    ],
  },
  {
    name: 'Yogi',
    description: 'Popular tomato variety with uniform fruiting and good shelf stability. Preferred in northern zones.',
    price: 135,
    available: 22,
     images: [
    'https://media.istockphoto.com/id/1545800730/photo/organic-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=o6QN6XbHKqIEpgTn7bQxNgtIOGe231Nhb-_zxz3LdZI=',
    'https://thumbs.dreamstime.com/b/sunlit-tomato-field-fresh-ripe-red-tomatoes-green-vines-summer-sunlit-tomato-field-fresh-ripe-red-tomatoes-357514223.jpg',
    'https://t4.ftcdn.net/jpg/06/47/42/41/360_F_647424157_gjcAdF1044lhsh4gQfWaHhjzzjMMAOcF.jpg',
    ],
  },
  {
    name: '225',
    description: 'Late-season tomato producing large, juicy fruits. Well-suited for both processing and fresh use.',
    price: 125,
    available: 18,
     images: [
    'https://media.istockphoto.com/id/1545800730/photo/organic-tomato-greenhouse.jpg?s=612x612&w=0&k=20&c=o6QN6XbHKqIEpgTn7bQxNgtIOGe231Nhb-_zxz3LdZI=',
    'https://thumbs.dreamstime.com/b/sunlit-tomato-field-fresh-ripe-red-tomatoes-green-vines-summer-sunlit-tomato-field-fresh-ripe-red-tomatoes-357514223.jpg',
    'https://t4.ftcdn.net/jpg/06/47/42/41/360_F_647424157_gjcAdF1044lhsh4gQfWaHhjzzjMMAOcF.jpg',
    ],
  },
];



const tomatoImage = "https://media.istockphoto.com/id/1132371208/photo/three-ripe-tomatoes-on-green-branch.jpg?s=612x612&w=0&k=20&c=qVjDb5Tk3-UccV-E9gqvoz97PTsP1QmBftw27qA9kEo=";


const Tomato = () => {
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
            Tomato
          </h1>

          <section className="flex flex-col md:flex-row items-center gap-8 mb-10 max-w-5xl mx-auto">
            <img
              src={tomatoImage}
              alt="Cauliflower"
              className="w-full md:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
            />
            <div className="md:w-1/2 text-gray-700 text-lg">
              <p className="text-justify">
                Tomato is a vibrant red fruit commonly used as a vegetable, known for its juicy texture and tangy-sweet flavor. Packed with essential nutrients like vitamin C, potassium, folate, and the powerful antioxidant lycopene, tomatoes support heart health, skin health, and immunity. Grown worldwide in a variety of climates, tomatoes thrive in warm, sunny conditions and are cultivated in gardens, farms, and greenhouses. This versatile ingredient is a staple in global cuisines, enjoyed raw in salads, cooked in sauces, soups, curries, and juices. With its rich flavor and high nutritional value, the tomato is both a kitchen favorite and a health booster.
              </p>
            </div>
          </section>

          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">
            We have these tomato varieties
          </h2>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0 mb-4">
            {tomatoVarieties.map((variety, index) => (
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

export default Tomato;
