import React, { useState, useEffect } from 'react'; 
import { useCart } from '../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeItem, clearCart } = useCart();
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [isCustomizationOpen, setCustomizationOpen] = useState({});
  const [customizations, setCustomizations] = useState({});
  const [timer, setTimer] = useState(0); // Start timer at 0

  useEffect(() => {
    fetch('db.json')
      .then((res) => res.json())
      .then((data) => setSuggestedItems(data.foodItems)); // Assume foodItems is the array in db.json
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) updateItemQuantity(id, quantity);
  };

  const handleCustomizationToggle = (id) => {
    setCustomizationOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCustomizationChange = (id, value) => {
    setCustomizations((prev) => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = () => {
    generatePDF();
    clearCart();
    setTimer(600); // Start timer upon placing the order
    alert("Order placed successfully and sent to WhatsApp!");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Order Summary", 20, 20);
    cartItems.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.name} x ${item.quantity} - ₹${item.price}`, 20, 40 + index * 10);
    });
    doc.text(`Total: ₹${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}`, 20, 80);
    const pdfFileName = `Order_${format(new Date(), 'yyyyMMdd_HHmm')}.pdf`;
    doc.save(pdfFileName);

    // Redirect to WhatsApp with the PDF (backend logic required for WhatsApp API integration)
    sendToWhatsApp(pdfFileName);
  };

  const sendToWhatsApp = (pdfFileName) => {
    const adminWhatsAppNumber = '8668722207'; // e.g., '1234567890'
    const pdfFileUrl = `https://your-server.com/path/to/${pdfFileName}`; // URL where the PDF is hosted

    const message = `Order PDF: ${pdfFileUrl}`;
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank'); // Opens the WhatsApp chat with the message
  };


  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-3 text-slate-800">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-lg mb-4 p-4 relative">
                <img src={item.image} alt={item.name} className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0" />
                <div className="flex-grow pl-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between w-72 bg-gray-800 rounded-lg px-4 py-1 shadow-md text-gray-800">
                    {/* Price */}
                    <p className="text-md font-bold text-white">₹{item.price}</p>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 py-1 rounded-full text-white hover:text-red-600 transition font-bold text-xl mb-1"
                      >
                        -
                      </button>
                      <span className="text-md font-semibold text-white">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1  rounded-full text-white hover:text-green-600 transition font-bold text-xl mb-1"
                      >
                        +
                      </button>
                    </div>

                    {/* Spiciness Level (Only for Main Course) */}
                    {item.subCategory === "Main Course" && (
                      <div className="flex flex-col items-center ml-4">
                        <label className="text-xs font-semibold text-white mb-1">Spiciness</label>
                        <input
                          type="range"
                          min="1"
                          max="5"
                          defaultValue="3"
                          className="w-32 accent-gray-100"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-blue-600 cursor-pointer" onClick={() => handleCustomizationToggle(item.id)}>Customize more your food</p>
                    {isCustomizationOpen[item.id] && (
                      <textarea rows="3" cols="50" value={customizations[item.id] || ''} onChange={(e) => handleCustomizationChange(item.id, e.target.value)} className="w-full mt-2 p-2 border rounded-lg outline-0 shadow-xl" placeholder="Add your customization request..." />
                    )}
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 p-2 bg-slate-900 text-white rounded-full hover:bg-red-600">
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-xl font-bold">Amount to Pay: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
            <button onClick={handlePlaceOrder} className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">Place Order</button>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg overflow-x-auto whitespace-nowrap w-full">
            <h3 className="text-lg font-semibold mb-2">More items you may like</h3>
            <ul className="flex space-x-4">
              {suggestedItems.map((item) => (
                <li key={item.id} className="bg-white rounded-lg shadow-md p-4 min-w-[150px] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm font-bold text-green-600">₹{item.price}</p>
                  <button onClick={() => addItemToCart(item)} className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg">Add to Cart</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-center text-lg font-semibold text-red-500">
            {timer > 0 ? `Your order will arrive in ${minutes}m ${seconds}s` : timer === 0 && "Delivered!"}
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}

      {/* Floating back button to the menu */}
      <Link to="/">
        <div className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-gray-800 to-gray-500 text-white rounded-full shadow-lg cursor-pointer hover:scale-105 transition-all">
          <div className='flex items-center'>
            <p className='text-white font-semibold text-lg px-2'>Menu Card</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cart;