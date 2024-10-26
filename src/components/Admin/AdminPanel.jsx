import React, { useState, useEffect } from 'react';

// Function to load data from local storage
const loadFoodItems = () => {
  const data = localStorage.getItem('foodItems');
  return data ? JSON.parse(data) : [];
};

// Function to save data to local storage
const saveFoodItems = (items) => {
  localStorage.setItem('foodItems', JSON.stringify(items));
};

const AdminPanel = () => {
  const [foodItems, setFoodItems] = useState(loadFoodItems());
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    // Load food items from local storage when the component mounts
    setFoodItems(loadFoodItems());
  }, []);

  const handleDeleteItem = (itemId) => {
    const updatedItems = foodItems.filter((item) => item.id !== itemId);
    setFoodItems(updatedItems);
    saveFoodItems(updatedItems); // Save the updated list to local storage
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = foodItems.find((item) => item.id === itemId);
    setNewItem(itemToEdit);
  };

  const handleSaveEdit = () => {
    const updatedItems = foodItems.map((item) =>
      item.id === newItem.id ? newItem : item
    );
    setFoodItems(updatedItems);
    saveFoodItems(updatedItems); // Save the updated list to local storage
    setNewItem({ name: '', price: '', category: '' });
  };

  const handleAddItem = () => {
    const newItemWithId = { ...newItem, id: Date.now() };
    const updatedItems = [...foodItems, newItemWithId];
    setFoodItems(updatedItems);
    saveFoodItems(updatedItems); // Save the updated list to local storage
    setNewItem({ name: '', price: '', category: '' });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Admin Panel - Manage Food Items</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Add/Edit Food Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="p-2 border rounded-lg w-full mb-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="p-2 border rounded-lg w-full mb-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="p-2 border rounded-lg w-full mb-4"
        />
        {newItem.id ? (
          <button
            onClick={handleSaveEdit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
          >
            Save Edit
          </button>
        ) : (
          <button
            onClick={handleAddItem}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full"
          >
            Add Item
          </button>
        )}
      </div>

      <ul className="space-y-4">
        {foodItems.map((item) => (
          <li key={item.id} className="p-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="mb-2"><strong>Price:</strong> ₹{item.price}</p>
            <p className="mb-2"><strong>Category:</strong> {item.category}</p>
            <button
              onClick={() => handleEditItem(item.id)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteItem(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
