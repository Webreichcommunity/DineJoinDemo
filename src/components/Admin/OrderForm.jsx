import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [order, setOrder] = useState({ name: '', phone: '', details: '', payment: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/orders', order);
      setOrder({ name: '', phone: '', details: '', payment: '' });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Name"
        value={order.name}
        onChange={(e) => setOrder({ ...order, name: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={order.phone}
        onChange={(e) => setOrder({ ...order, phone: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <textarea
        placeholder="Order Details"
        value={order.details}
        onChange={(e) => setOrder({ ...order, details: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      ></textarea>
      <input
        type="text"
        placeholder="Payment Details"
        value={order.payment}
        onChange={(e) => setOrder({ ...order, payment: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
