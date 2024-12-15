import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  FaTrashAlt, 
  FaShoppingCart, 
  FaPlus, 
  FaMinus, 
  FaCheckCircle,
  FaUtensils
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeItem, clearCart, addItem } = useCart();
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    tableNumber: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderStatus, setOrderStatus] = useState({
    placed: false,
    message: '',
    orderNumber: null
  });

  // Fetch suggested items from db.json
  useEffect(() => {
    const fetchSuggestedItems = async () => {
      try {
        const response = await fetch('/db.json');
        const data = await response.json();
        setSuggestedItems(data.foodItems || []);
      } catch (error) {
        console.error('Error fetching suggested items:', error);
      }
    };

    fetchSuggestedItems();
  }, []);

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!customerDetails.name.trim()) errors.name = 'Name is required';
    if (!customerDetails.tableNumber.trim()) errors.tableNumber = 'Table number is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (validateForm() && cartItems.length > 0) {
      // Generate a random 6-digit order number
      const orderNumber = Math.floor(100000 + Math.random() * 900000);

      const orderData = {
        customerName: customerDetails.name,
        tableNumber: customerDetails.tableNumber,
        orderNumber: orderNumber,
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: (item.price * item.quantity).toFixed(2)
        })),
        totalAmount: calculateTotal(),
        timestamp: new Date().toISOString()
      };

      try {
        // Web3Forms API integration
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: '49dfa941-0704-4a4a-9210-872f1bb719c0',
            subject: `New Order #${orderNumber} from ${customerDetails.name}`,
            html: `
              <h1>Order Details</h1>
              <p><strong>Customer Name:</strong> ${orderData.customerName}</p>
              <p><strong>Table Number:</strong> ${orderData.tableNumber}</p>
              <p><strong>Order Number:</strong> #${orderData.orderNumber}</p>
              <h2>Items Ordered:</h2>
              <table border="1">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                ${orderData.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price}</td>
                    <td>₹${item.total}</td>
                  </tr>
                `).join('')}
              </table>
              <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
            `
          })
        });

        const result = await response.json();

        if (result.success) {
          // Clear cart and customer details
          clearCart();
          setCustomerDetails({ name: '', tableNumber: '' });
          
          // Set order status
          setOrderStatus({
            placed: true,
            message: `Order #${orderNumber} Placed Successfully!`,
            orderNumber: orderNumber
          });

          // Automatically hide order status after 10 seconds
          setTimeout(() => {
            setOrderStatus({
              placed: false,
              message: '',
              orderNumber: null
            });
          }, 10000);
        }
      } catch (error) {
        console.error('Order submission error:', error);
        setOrderStatus({
          placed: false,
          message: 'Failed to place order. Please try again.',
          orderNumber: null
        });
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleAddItemToCart = (item) => {
    addItem({ ...item, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      {/* Order Status Notification */}
      {orderStatus.placed && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white p-6 rounded-2xl shadow-2xl flex items-center animate-bounce">
          <FaCheckCircle className="mr-3 text-3xl" />
          <div>
            <h3 className="text-2xl font-bold">{orderStatus.message}</h3>
            <p className="text-sm">Your order will be prepared shortly</p>
          </div>
        </div>
      )}

      {/* Main Cart Container */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
            <FaShoppingCart className="mr-3 text-blue-500" /> Your Cart
          </h2>

          {/* Customer Details Form */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={customerDetails.name}
                onChange={handleCustomerDetailsChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your name"
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Table Number</label>
              <input
                type="text"
                name="tableNumber"
                value={customerDetails.tableNumber}
                onChange={handleCustomerDetailsChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition ${formErrors.tableNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter table number"
              />
              {formErrors.tableNumber && <p className="text-red-500 text-sm mt-1">{formErrors.tableNumber}</p>}
            </div>
          </div>

          {/* Cart Items */}
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-2xl">
              <FaUtensils className="text-6xl text-gray-400 mb-4" />
              <p className="text-2xl text-gray-500 font-semibold mb-4">Your cart is empty</p>
              <Link 
                to="/" 
                className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-xl mr-4 shadow-md"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
                        <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-md">
                          <button 
                            onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                          >
                            <FaMinus className="text-gray-600" />
                          </button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
                          >
                            <FaPlus className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 bg-red-100 p-2 rounded-full"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total and Place Order */}
              <div className="bg-blue-50 p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-green-600">₹{calculateTotal()}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg text-lg font-bold"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>

        {/* Recommended Items */}
        {suggestedItems.length > 0 && (
          <div className="px-6 py-6 bg-gray-50">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">You Might Also Like</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {suggestedItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex-shrink-0 w-56 bg-white rounded-2xl shadow-lg p-4 transform hover:scale-105 transition-all"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-40 object-cover rounded-xl mb-3 shadow-md"
                  />
                  <h4 className="font-bold text-lg mb-2 text-gray-800">{item.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold text-lg">₹{item.price}</span>
                    <button
                      onClick={() => handleAddItemToCart(item)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-all shadow-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;