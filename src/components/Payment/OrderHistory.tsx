import { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import instance from "../../service/api/customAxios";

interface Customer {
  id: string;
  username: string;
  name: string;
  phone: string | null;
  address: string | null;
  point: number;
  status: string;
  createAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  origin: string;
  thumbnailUrl: string;
  brand: string;
  price: number;
  promotionPrice: number;
  inStock: number;
  sold: number;
  status: string;
 
}

interface OrderDetail {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: Customer;
  amount: number;
  receiver: string;
  address: string;
  phone: string;
  paymentMethod: string;
  isPayment: boolean;
  status: string;
  createAt: string;
  discount: number;
  orderDetails: OrderDetail[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const customerId = localStorage.getItem("customerId"); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await instance.post('/orders/filter?pageSize=100', { customerId });
        console.log("API Response:", response.data.data);
          const sortedOrders = response.data.data.sort((a: Order, b: Order) => {
          return new Date(b.createAt).getTime() - new Date(a.createAt).getTime();
        });
          
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, []);


  return (
    <>
      <Header />
      <section className="text-gray-700 body-font overflow-hidden bg-white">
  <div className="container px-5 py-24 mx-auto">
    <h1 className="text-3xl font-bold text-center mb-12">Order History</h1>
    <div className="lg:w-4/5 mx-auto">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="lg:w-3/4 w-full mb-6 p-6 border border-gray-200 rounded-lg shadow-md mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
              <div className="w-full lg:w-1/2 pr-0 lg:pr-4 mb-4 lg:mb-0">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Order Details:</h3>
                {order.orderDetails.map((detail) => (
                  <div key={detail.id} className="mt-2">
                    <p className="text-gray-600"><span className="font-semibold">Product:</span> {detail.product.name}</p>
                    <p className="text-gray-600"><span className="font-semibold">Quantity:</span> {detail.quantity}</p>
                    <p className="text-gray-600"><span className="font-semibold">Price:</span> {detail.price} VND</p>
                  </div>
                ))}
              </div>
              <div className="w-full lg:w-1/2 pl-0 lg:pl-4">
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{order.receiver}</h2>
                  <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.phone}</p>
                  <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.address}</p>
                  <p className="text-gray-600"><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
                </div>
                <div className="mb-2">
                <p className={`text-sm font-medium ${order.status === "Paid" ? "text-green-600" : order.status === "Canceled" ? "text-red-600" : "text-yellow-600"}`}>
                    <span className="font-semibold">Status:</span> {order.status}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600"><span className="font-semibold">Discount:</span> {order.discount} VND</p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-600"><span className="font-semibold">Date:</span> {new Date(order.createAt).toLocaleString()}</p>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xl font-semibold text-gray-800">Order Total: {order.amount} VND</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center w-full mt-8 text-lg font-semibold">No orders found.</p>
      )}
    </div>
  </div>
</section>

      <Footer />
    </>
  );
};

export default OrderHistory;
