import React, { useState } from 'react';

const PaymentOptions = ({ amount, userName, phoneNumber, cartItems, onSuccess, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [receiptContent, setReceiptContent] = useState('');

  const handlePayment = () => {
    const upiId = '8668722207@axl';
    if (paymentMethod === 'PhonePe' || paymentMethod === 'GPay' || paymentMethod === 'Paytm') {
      window.location.href = `upi://pay?pa=${upiId}&pn=${userName}&am=${amount}&cu=INR`;
    }

    const receipt = `
      ==========================
      ORDER RECEIPT
      ==========================
      Name: ${userName}
      Phone: ${phoneNumber}
      Date: ${new Date().toLocaleString()}
      --------------------------------
      ${cartItems.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}
      --------------------------------
      Amount Paid: ₹${amount.toFixed(2)}
      Payment Method: ${paymentMethod}
      ==========================
    `;
    setReceiptContent(receipt);
    setReceiptVisible(true);

    onSuccess(paymentMethod);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setPaymentMethod('PhonePe')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-purple-600"
          >
            PhonePe
          </button>
          <button
            onClick={() => setPaymentMethod('GPay')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-blue-600"
          >
            GPay
          </button>
          <button
            onClick={() => setPaymentMethod('Paytm')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-cyan-600"
          >
            Paytm
          </button>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Pay ₹{amount.toFixed(2)}
          </button>
        </div>
        {receiptVisible && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-2">Payment Receipt</h3>
            <pre className="text-sm font-mono text-gray-800">{receiptContent}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
