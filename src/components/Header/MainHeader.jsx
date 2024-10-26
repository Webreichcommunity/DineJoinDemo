import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { useCart } from '../context/CartContext';

const MainHeader = () => {
    const { cartItems } = useCart();

    return (
        <>
            <header className="bg-gray-100 text-black p-3 flex justify-between items-center shadow-lg sticky top-0 z-50">
                {/* sticky top-0 z-50 */}
                <div className="flex items-center space-x-4">
                    <div className="bg-opacity-35 rounded-md flex items-center">
                        <div className="animate-location-icon">
                            <MdLocationOn className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-2 font-bold text-gray-700">
                            <h2 className="text-lg leading-tight">WebReich <span className="text-red-500">CAFE'</span></h2>
                            {/* <h3 className="text-xs text-gray-400">Baker Street, London Underground station</h3> */}
                            <h4 className="text-xs text-gray-500">Powered by WebReich </h4>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4 p-2 content-center">
                    {/* <Link
                        to="/"
                        className="text-xl hover:text-red-500 transition-colors duration-200 opacity-80"
                    >
                        <FaHamburger className='h-6 w-6' />
                    </Link> */}
                    {/* <Link
                        to="/cart"
                        className="relative flex items-center hover:text-red-500 transition-colors duration-200 opacity-80"
                    >
                        <FaShoppingCart className='h-6 w-6' />
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white w-4 h-4 text-xs rounded-full flex items-center justify-center">
                                {cartItems.length}
                            </span>
                        )}
                    </Link> */}

                </div>
            </header>
            <style jsx>{`
                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes jump {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes colorChange {
                    0% { color: red; }
                    14% { color: orange; }
                    28% { color: yellow; }
                    42% { color: green; }
                    56% { color: blue; }
                    70% { color: indigo; }
                    84% { color: violet; }
                    100% { color: red; }
                }
                .animate-location-icon {
                    animation: rotate 1.5s linear infinite, jump 1.5s ease-in-out infinite, colorChange 7s linear infinite;
                }
            `}</style>
        </>
    );
};

export default MainHeader;
