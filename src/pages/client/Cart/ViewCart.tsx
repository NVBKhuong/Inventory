import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../service/store/store";
import { ICartItem } from "../../../models/CartItem";
import { decreaseQuantity, removeFromCart, increaseQuantity } from "../../../service/features/productSlice";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import instance  from "../../../service/api/customAxios";

const ViewCart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.products.cart);
    const navigate = useNavigate();

    const [receiver, setReceiver] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [phone, setPhone] = useState(""); 
    const [paymentMethod, setPaymentMethod] = useState("COD"); 

    const calculateTotal = (cartItems: ICartItem[] | null): number => {
        if (!cartItems || cartItems.length === 0) {
            return 0;
        }
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    useEffect(() => {
    }, []);

    const handleDecreaseQuantity = (cartItem: ICartItem) => {
        dispatch(decreaseQuantity(cartItem.id));
    };

    const handleIncreaseQuantity = (cartItem: ICartItem) => {
        dispatch(increaseQuantity(cartItem.id));
    };

    const handleRemoveFromCart = (cartItem: ICartItem) => {
        dispatch(removeFromCart(cartItem.id));
        toast.error(`Đã xóa ${cartItem.name} khỏi giỏ hàng.`);
    };

    const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

      
        const orderPayload = {
            amount: calculateTotal(cartItems), 
            discount: 0,
            receiver,
            address,
            phone,
            paymentMethod,
            orderVouchers: [], // chưa có voucher
            orderDetails: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };

        try {
            
            const response = await instance.post('/orders', orderPayload);
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            
            cartItems.forEach(item => dispatch(removeFromCart(item.id)));

            // Chuyển hướng tới trang Order Review hoặc trang cảm ơn
            navigate('/order-review');
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to create order.');
        }
    };

    return (
        <>
            <Header />
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <div className="flex items-center justify-center shadow-lg rounded-lg">
                                        <img
                                            alt={item.name}
                                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                            src="https://lzd-img-global.slatic.net/g/p/a76230e0f618381db919783fd72ac32c.jpg_320x320.jpg_550x550.jpg"
                                        />
                                        <div className="text-center mt-4">
                                            <h2 className="text-gray-900 text-lg title-font font-medium mb-1">{item.name}</h2>
                                            <p className="leading-relaxed mb-3">{item.description}</p>
                                            <div className="flex items-center justify-center gap-4">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item)}
                                                    className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded font-bold "
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() => handleIncreaseQuantity(item)}
                                                    className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded"
                                                >
                                                    +
                                                </button>
                                                <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleRemoveFromCart(item)}
                                                    className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-full mt-8 text-lg font-semibold">Your shopping cart is empty.</p>
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full mt-12 mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl text-gray-900 mb-4">Total: ${calculateTotal(cartItems)}</p>
                            <div className="flex flex-row space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={() => setPaymentMethod("COD")}
                                        className="mr-2"
                                    />
                                    COD
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="VNPay"
                                        checked={paymentMethod === "VNPay"}
                                        onChange={() => setPaymentMethod("VNPay")}
                                        className="mr-2"
                                    />
                                    VNPay
                                </label>
                            </div>
                            <form className="mt-8" onSubmit={handleCheckout}>
                                <h2 className="text-gray-900 text-lg font-medium mb-3">Shipping Information</h2>
                                <div className="flex flex-col sm:flex-row">
                                    <input
                                        type="text"
                                        placeholder="Receiver Name"
                                        value={receiver}
                                        onChange={(e) => setReceiver(e.target.value)}
                                        required
                                        className="border-2 border-gray-200 mb-2 sm:mb-0 sm:mr-2 py-2 px-4 w-full rounded-lg focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="border-2 border-gray-200 mb-2 sm:mb-0 sm:mr-2 py-2 px-4 w-full rounded-lg focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="border-2 border-gray-200 mb-2 sm:mb-0 py-2 px-4 w-full rounded-lg focus:outline-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-red-600 border-0 py-2 px-8 mt-4 focus:outline-none hover:bg-red-700 rounded-lg"
                                >
                                    Submit Order
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ViewCart;
