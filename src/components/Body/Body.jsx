import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaSearch, FaShoppingCart } from 'react-icons/fa';
import foodItemsData from '../../../db.json';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';


const Body = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { addToCart, cartItems, updateItemQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const foodItems = foodItemsData.foodItems || [];
  const categories = [...new Set(foodItems.map(item => item.category))];
  const subCategories = [...new Set(foodItems.map(item => item.subCategory))];

  // Offer cards
  const offerCards = [
    { title: 'Limited Time Offers!', description: 'Get up to 30% OFF on your favorite meals', bg: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { title: 'Weekend Specials!', description: 'Enjoy 20% OFF on orders above ₹500', bg: 'bg-gradient-to-r from-yellow-500 to-red-500' },
    { title: 'Family Meals', description: 'Get a 15% discount on family combos', bg: 'bg-gradient-to-r from-orange-500 to-yellow-400' },
    { title: 'Happy Hours!', description: 'Buy 1 Get 1 Free on select items', bg: 'bg-gradient-to-r from-red-600 to-yellow-500' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex(prevIndex => (prevIndex + 1) % offerCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, [cartItems]);

  const handleFilterChange = (category) => {
    setFilter(category === 'All' ? '' : category);
  };

  const filteredItems = foodItems.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.subCategory.toLowerCase().includes(query) ||
      item.price.toString().includes(query);

    const matchesFilter = filter === '' || item.category === filter || item.subCategory === filter || (filter === 'under100' && item.price < 100);
    return matchesSearch && matchesFilter;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1000);
  };

  const handleRemoveFromCart = (item) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id); // Find the item in the cart

    if (cartItem && cartItem.quantity > 1) {
      updateItemQuantity(item.id, cartItem.quantity - 1);
    } else if (cartItem && cartItem.quantity === 1) {
      removeItem(item.id); // Remove the item from the cart if quantity reaches zero
    }
  };


  const handleSearchChange = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleCartClick = () => navigate('/cart');

  const imageLinks = [
    "https://cdn-icons-png.flaticon.com/128/628/628193.png",
    "https://cdn-icons-png.flaticon.com/128/11939/11939888.png",
    "https://cdn-icons-png.flaticon.com/128/2276/2276941.png",
    "https://cdn-icons-png.flaticon.com/128/1531/1531385.png",
    "https://cdn-icons-png.flaticon.com/128/5876/5876354.png",
    "https://cdn-icons-png.flaticon.com/128/2812/2812276.png",
    "https://cdn-icons-png.flaticon.com/128/9487/9487332.png",
  ];

  return (
    <div className="relative flex flex-col items-center p-0 bg-gray-50">
      {/* Offers Banner */}
      <div className="w-full overflow-x-hidden mb-6 mt-20 relative h-40">
        <AnimatePresence>
          {offerCards.map((offer, index) => (
            index === currentOfferIndex && (
              <motion.div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center text-white p-4 rounded-lg shadow-lg ${offer.bg}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-3xl font-bold mb-2">{offer.title}</h2>
                <p className="text-lg">{offer.description}</p>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Filter Buttons */}
      <div className="fixed top-14 right-0 w-full bg-gray-900/20 bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg px-4 py-2 z-20 border border-opacity-30 border-white">
        <div className="w-full flex space-x-3 overflow-x-auto no-scrollbar p-2">
          <motion.button
            className={`px-4 py-2 whitespace-nowrap rounded-full ${filter === '' ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-200 text-gray-700'} transition-all transform hover:scale-105 focus:outline-none`}
            onClick={() => handleFilterChange('All')}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium">All</span>
          </motion.button>
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 whitespace-nowrap rounded-full ${filter === category ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-200 text-gray-700'} transition-all transform hover:scale-105 focus:outline-none`}
              onClick={() => handleFilterChange(category)}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium">{category}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories Filter */}
      <div
        className="w-full mb-6 flex overflow-x-auto rounded-lg bg-gradient-to-r from-red/60 to-red-800/60 backdrop-blur-md m-auto shadow-lg items-center content-center"
        style={{
          scrollbarColor: "#ef4444 transparent", // Scrollbar color for Firefox
          scrollbarWidth: "thin", // Set to thin for Firefox
        }}
      >
        {/* Scrollbar styling for Webkit browsers (Chrome, Safari) */}
        <style jsx>{`
    ::-webkit-scrollbar {
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ef4444; // Red scrollbar thumb
      border-radius: 20px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
  `}</style>

        <motion.button
          className={`flex flex-col items-center p-4 rounded-lg bg-white ${filter === '' ? 'bg-yellow-100' : ''
            } shadow-lg transition-all mx-2`}
          onClick={() => handleFilterChange('All')}
          style={{ minWidth: '100px', minHeight: '150px' }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/11790/11790471.png"
            alt="All Food Items"
            className="h-20 w-20 mb-2"
          />
          <span className="text-sm font-medium text-gray-700">All Food Items</span>
        </motion.button>

        {[...subCategories, ...categories].map((category, index) => (
          <motion.button
            key={index}
            className={`flex flex-col items-center p-4 rounded-lg bg-white ${filter === category ? 'bg-yellow-100 text-black' : ''
              } shadow-lg transition-all mx-2`}
            onClick={() => handleFilterChange(category)}
            style={{ minWidth: '100px', minHeight: '150px' }}
          >
            <img
              src={imageLinks[index % imageLinks.length]} // Cycle through images based on index
              alt={category}
              className="h-20 w-20 mb-2"
            />
            <span className="text-sm font-medium text-gray-700">{category}</span>
          </motion.button>
        ))}
      </div>


      {/* Search Bar */}
      <div className="w-full max-w-md flex items-center bg-white rounded-full shadow-md p-3 mb-2">
        <FaSearch className="text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search by name, category, price, or tag"
          className="flex-grow focus:outline-none px-4 text-gray-700"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Food Items Grid */}
      <motion.div className="w-full max-w-6xl p-5 mb-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Quality Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
            const itemQuantity = itemInCart ? itemInCart.quantity : 0;

            return (
              // <div 
              // key={item.id} 
              // className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
              //   <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-2 rounded-lg" />
              //   <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              //   <p className='bg-red-300/20 px-4 py-1 rounded-xl w-auto text-sm font-semibold text-red-800 mx-0 my-2'>{item.tag}</p>
              //   <p className="text-gray-600 mb-2">{item.description}</p>
              //   <div className="flex items-center justify-between">
              //     <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
              //     <div className="flex items-center">
              //       {itemQuantity > 0 ? (
              //         <>
              //           <button
              //             className="text-gray-700 hover:text-red-500 focus:outline-none"
              //             onClick={() => handleRemoveFromCart(item)}
              //           >
              //             <FaMinus />
              //           </button>
              //           <span className="mx-2">{itemQuantity}</span>
              //           <button
              //             className="text-gray-700 hover:text-green-500 focus:outline-none"
              //             onClick={() => handleAddToCart(item)}
              //           >
              //             <FaPlus />
              //           </button>
              //         </>
              //       ) : (
              //         <button
              //           className="mt-2 px-4 py-2 text-white bg-yellow-400 rounded-lg hover:bg-yellow-600 focus:outline-none transition-colors duration-300"
              //           onClick={() => handleAddToCart(item)}
              //         >
              //           Add to Cart
              //         </button>
              //       )}
              //     </div>
              //   </div>
              // </div>
              <div
                key={item.id}
                className="relative rounded-lg shadow-lg overflow-hidden group h-96 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 transition-opacity duration-300"></div>

                {/* Bottom Glass Effect Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/20 bg-opacity-70 backdrop-blur-md text-white">
                  <h3 className="text-lg font-semibold mb-1 flex justify-between">{item.name}
                    <Link to="/cart">
                      <span className='font-semibold text-blue-100 bg-blue-200/15 px-4 rounded-xl font-sans text-sm'>customised</span>
                    </Link>
                  </h3>
                  <div className="flex justify-between items-center w-full p-2">
                    {item.tag && (
                      <p className="bg-red-600 px-2 py-1 text-xs font-semibold text-white rounded-lg inline-block mb-1">
                        #{item.tag}
                      </p>
                    )}
                    <p
                      className={`px-2 py-1 text-xs font-semibold bg-white/65 rounded-full ${item.subCategory === 'Veg' ? 'text-green-500' : 'text-red-500'
                        } ml-auto`}
                    >
                      {item.subCategory}
                    </p>
                  </div>
                  <p className="text-sm text-gray-200 mb-2 line-clamp-2">{item.description}</p>

                  {/* Price and Add to Cart Button */}
                  <div className="flex justify-between items-center">
                    {/* Discounted Price */}
                    {item.discountPrice ? (
                      <div className="flex items-center">
                        <span className="text-lg font-bold">₹{item.discountPrice}</span>
                        <span className="line-through ml-2 text-gray-300">₹{item.price}</span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">₹{item.price}</span>
                    )}

                    {/* Add to Cart Buttons */}
                    <div className="flex items-center">
                      {itemQuantity > 0 ? (
                        <>
                          <button
                            className="text-white hover:text-red-500 focus:outline-none"
                            onClick={() => handleRemoveFromCart(item)}
                          >
                            <FaMinus />
                          </button>
                          <span className="mx-2 text-white">{itemQuantity}</span>
                          <button
                            className="text-white hover:text-green-500 focus:outline-none"
                            onClick={() => handleAddToCart(item)}
                          >
                            <FaPlus />
                          </button>
                        </>
                      ) : (
                        <button
                          className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Cart Notification */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed top-36 right-5"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 20 }}
          >
            <Alert severity="error">Item added to cart!</Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      <div
        className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all"
        onClick={handleCartClick}
      >
        <div className='flex items-center'>
          <p className='text-white font-semibold text-lg px-2'>view cart</p>
          <FaShoppingCart size={24} />
        </div>

        {cartCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Body;
