import  { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://suame88.azurewebsites.net/api';

const OrderReview = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 100 },
    { id: 2, name: 'Item 2', price: 200 },
    // Thêm các mặt hàng khác
  ]);

  const [shippingMethod, setShippingMethod] = useState('cod');

  const handleShippingMethodChange = (e) => {
    setShippingMethod(e.target.value);
  };

  const handleSubmit = async () => {
    const orderData = {
      items,
      shippingMethod,
      // Thêm các thông tin khác nếu cần
    };

    try {
      const response = await axios.post(`${BASE_URL}/orders`, orderData);
      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Order Items</h2>
          <ul className="list-disc pl-5">
            {items.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Choose Shipping Method</h2>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                value="cod"
                checked={shippingMethod === 'cod'}
                onChange={handleShippingMethodChange}
                className="mr-2"
              />
              COD
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                value="internetbanking"
                checked={shippingMethod === 'internetbanking'}
                onChange={handleShippingMethodChange}
                className="mr-2"
              />
              Internet Banking
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
