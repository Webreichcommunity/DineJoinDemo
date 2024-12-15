import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdMenu, MdShoppingCart, MdAccessTime } from "react-icons/md";
import { useCart } from "../context/CartContext";

const MainHeader = ({ onMenuToggle }) => {
    const { cartItems } = useCart();
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        const options = { weekday: "short", month: "short", day: "numeric" };
        return date.toLocaleDateString("en-US", options).toUpperCase();
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-right">
                    {/* Logo and Location */}
                    <div className="flex items-center space-x-2">
                        <MdLocationOn className="h-6 w-6 text-red-500" />
                        <h2 className="text-lg font-bold">
                            WebReich <span className="text-red-500">CAFE</span>
                        </h2>
                    </div>

                    {/* Date and Time */}
                    {/* <div className="mt-2 sm:mt-0 flex items-center space-x-2 bg-gray-800 rounded-full px-3 py-1">
            <MdAccessTime className="h-5 w-5 text-red-500" />
            <div className="text-xs font-medium text-gray-300">
              <p>{formatDate(dateTime)}</p>
            </div>
          </div>  */}
                </div>

                {/* Left Section: Menu and Cart */}
                <div className="flex items-center space-x-4">
                    {/* Menu Button */}
                    <Link to="/">
                        <button
                            onClick={onMenuToggle}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                            aria-label="Menu"
                        >
                            <MdMenu className="h-6 w-6 text-red-500" />
                        </button>
                    </Link>

                    {/* Cart Button */}
                    <Link
                        to="/cart"
                        className="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                        aria-label="Cart"
                    >
                        <MdShoppingCart className="h-6 w-6 text-red-500" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default MainHeader;
