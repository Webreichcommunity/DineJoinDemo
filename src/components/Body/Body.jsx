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
    {
      title: '🔥 Feast Frenzy Extravaganza!',
      description: 'Unlock 40% OFF on our chef\'s most exclusive gourmet creations',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: '🍕 Pizza Paradise Bonanza',
      description: 'Buy 2 Pizzas, Get 3rd FREE + Unlimited Garlic Bread!',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: '🍣 Sushi Lovers Delight',
      description: 'All-You-Can-Eat Sushi Night - 50% OFF Premium Rolls!',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: '🍔 Burger Blowout Weekend',
      description: 'Craft Burger Challenge: 5 Unique Burgers, Insane Discounts!',
      bg: 'bg-cover bg-center',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
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
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/6544243/pexels-photo-6544243.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/29148133/pexels-photo-29148133/free-photo-of-traditional-indian-thali-meal-with-naan-bread.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div className="relative flex flex-col items-center p-0 bg-gray-50">
      {/* Offers Banner */}
      {/* <div className="w-full overflow-x-hidden mb-6 mt-20 relative h-40">
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
      </div> */}
      <div className="w-full overflow-x-hidden mb-6 mt-28 relative h-96 rounded-xl shadow-2xl">
        <AnimatePresence>
          {offerCards.map((offer, index) => (
            index === currentOfferIndex && (
              <motion.div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center text-white p-6 rounded-xl overflow-hidden ${offer.bg}`}
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${offer.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="text-center max-w-xl px-4">
                  <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
                    {offer.title}
                  </h2>
                  <p className="text-2xl font-semibold drop-shadow-md">
                    {offer.description}
                  </p>
                  <button className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Claim Offer Now!
                  </button>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Filter Buttons */}
      <div 
      className="fixed top-16 right-0 w-full z-20"
      style={{
        background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(220,38,38,0.05))',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
    >
      <div className="container mx-auto">
        <div className="w-full flex space-x-3 overflow-x-auto no-scrollbar py-3 px-2">
          {/* All Category Button */}
          <motion.button
            className={`
              px-5 py-2 whitespace-nowrap rounded-full 
              transition-all duration-300 ease-in-out
              ${filter === '' 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600'}
            `}
            onClick={() => handleFilterChange('All')}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-semibold">All</span>
          </motion.button>

          {/* Category Buttons */}
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`
                px-5 py-2 whitespace-nowrap rounded-full 
                transition-all duration-300 ease-in-out
                ${filter === category 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600'}
              `}
              onClick={() => handleFilterChange(category)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold">{category}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gradient Border Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(220,38,38,0.3), transparent)'
        }}
      />
    </div>

      {/* Categories Filter */} 
      <h5 className='font-bold text-gray-900 text-xl mb-3 text-left'>What are you <span className='text-red-500 text-2xl'>craving</span> for?</h5>
      <div 
      className="w-full mb-6 py-4 flex overflow-x-auto space-x-4 no-scrollbar"
      style={{
        backdropFilter: 'blur(10px)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2))',
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)'
      }}
    >
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* All Food Items Card */}
      <motion.div 
        className="flex-shrink-0 transform transition-all duration-300 hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 
            ${filter === '' ? 'ring-4 ring-yellow-400' : 'hover:ring-2 hover:ring-white'}
            w-[130px] h-[160px] flex flex-col justify-end p-4`}
          onClick={() => handleFilterChange('All')}
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
            backdropFilter: 'blur(10px)',
            backgroundImage: 'url("https://images.pexels.com/photos/2180875/pexels-photo-2180875.jpeg?auto=compress&cs=tinysrgb&w=600")',
            backgroundSize: '100%',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <span className="text-lg font-bold drop-shadow-lg">
              All Food Items
            </span>
          </div>
        </motion.button>
      </motion.div>

      {/* Category Cards */}
      {[...subCategories, ...categories].map((category, index) => (
        <motion.div 
          key={index} 
          className="flex-shrink-0 transform transition-all duration-300 hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 
              ${filter === category ? 'ring-4 ring-yellow-400' : 'hover:ring-2 hover:ring-white'}
              w-[130px] h-[160px] flex flex-col justify-end p-4`}
            onClick={() => handleFilterChange(category)}
            style={{
              background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
              backdropFilter: 'blur(10px)',
              backgroundImage: `url(${imageLinks[index % imageLinks.length]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="relative z-10 text-white text-center">
              <span className="text-lg font-bold drop-shadow-lg">
                {category}
              </span>
            </div>
          </motion.button>
        </motion.div>
      ))}
    </div>


      {/* Search Bar */}
      <h5 className='font-bold text-gray-900 text-xl mb-3 text-left'>WebReich's <span className='text-red-500 text-2xl'>Menu</span></h5>
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
        {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Quality Picks</h2> */}
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
        className="fixed bottom-6 right-6 p-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
        onClick={handleCartClick}
      >
        <div className='flex items-center'>
          <FaShoppingCart size={24} />
          <p className='text-white font-semibold text-lg px-2'>view cart</p>
        </div>

        {cartCount > 0 && (
          <span className="absolute top-0 left-0 w-5 h-5 rounded-full border border-1-white bg-black flex items-center justify-center text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Body;
