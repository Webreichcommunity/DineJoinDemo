import React from 'react';
import { useCart } from '../context/CartContext';
import Body from '../Body/Body';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MainMenu = ({ menuItems }) => {
    const { addToCart } = useCart();
    const handleAddToCart = (item) => {
        addToCart(item);
        alert(`${item.name} has been added to your cart!`);
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">`${item.name} has been added to your cart!`</Alert>
        </Stack>
    };

    return (
        <div className="p-4">
            <Body />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border rounded shadow-lg transition-transform transform hover:scale-105"
                        >
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2 rounded" />
                            <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                            <p className="mb-2">Price:  ₹{item.price}</p>
                            <p className="mb-2">Rating: {item.rating}</p>
                            <button
                                className="bg-slate-900 text-white p-2 rounded hover:bg-slate-700 transition"
                                onClick={() => handleAddToCart(item)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default MainMenu;