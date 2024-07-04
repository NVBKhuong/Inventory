import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../service/store/store";
import { ICartItem } from "../../../models/CartItem";
import { decreaseQuantity, removeFromCart, increaseQuantity } from "../../../service/features/productSlice";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";
import { useNavigate } from 'react-router-dom';
import instance from "../../../service/api/customAxios";

interface IVoucher {
    id: string;
    code: string;
    name: string;
    thumbnailUrl: string;
    from: Date;
    to: Date;
    minOrderValue: number;
    value: number;
    quantity: number;
    createAt: Date;
    status: string;
}

const ViewCart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.products.cart);
    const navigate = useNavigate();
    const [receiver, setReceiver] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [selectedVoucherId, setSelectedVoucherId] = useState("");
    const [discountValue, setDiscountValue] = useState(0);
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);

    const calculateTotal = (cartItems: ICartItem[] | null): number => {
        if (!cartItems || cartItems.length === 0) {
            return 0;
        }
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const fetchVouchers = async () => {
        try {
            const response = await instance.post('/vouchers/filter', { status: 'active' });
            setVouchers(response.data.data);
        } catch (error) {
            console.error('Error fetching vouchers:', error);
        }
    };

    useEffect(() => {
        fetchVouchers();
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

    const getVoucher = async (id: string) => {
        try {
            const response = await instance.get(`/vouchers/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching voucher:', error);
            toast.error('Failed to fetch voucher.');
            return null;
        }
    };

    const handleApplyVoucher = async () => {
        const voucher = await getVoucher(selectedVoucherId);
        if (voucher && voucher.status === 'active') {
            setDiscountValue(voucher.value);
            toast.success(`Áp dụng mã giảm giá ${voucher.code} - ${voucher.name} thành công!`);
        } else {
            toast.error(`Mã giảm giá không hợp lệ hoặc đã hết hạn.`);
        }
    };

    const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const totalAmount = calculateTotal(cartItems);
        const finalAmount = totalAmount - discountValue;
    
        if (finalAmount <= 0) {
            toast.error('Total amount should be greater than zero.');
            return;
        }
    
        const orderPayload = {
            amount: finalAmount,
            discount: discountValue,
            receiver,
            address,
            phone,
            paymentMethod,
            orderVouchers: selectedVoucherId ? [{ voucherId: selectedVoucherId }] : [],
            orderDetails: cartItems ? cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })) : []
        };
    
        try {
            const response = await instance.post('/orders', orderPayload);
            const orderId = response.data.id; // Assume the order ID is in the response data
    
            // Clear the cart items
            cartItems && cartItems.forEach(item => dispatch(removeFromCart(item.id)));
    
            if (paymentMethod === "Cash") {
                navigate('/thank-you');
            } else if (paymentMethod === "VNPay") {
                const paymentResponse = await instance.post('/payments/request', {
                    amount: finalAmount,
                    orderId: orderId
                });
    
                const paymentUrl = paymentResponse.data; 
                if (paymentUrl) {
                    window.location.href = paymentUrl;
                } else {
                    toast.error('Failed to get payment URL.');
                    console.error('Payment URL is missing:', paymentResponse.data);
                }
            }
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
                                                    className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded font-bold"
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
                            <p className="text-xl text-gray-900 mb-4">Total: {calculateTotal(cartItems) - discountValue} VND</p>
                            <div className="flex flex-row space-x-4 mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={paymentMethod === "Cash"}
                                        onChange={() => setPaymentMethod("Cash")}
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
                            <form className="mt-8 w-full" onSubmit={handleCheckout}>
                                <h2 className="text-gray-900 text-lg font-medium mb-3">Shipping Information</h2>
                                <div className="flex flex-col mb-4">
                                    <input
                                        type="text"
                                        placeholder="Receiver Name"
                                        value={receiver}
                                        onChange={(e) => setReceiver(e.target.value)}
                                        required
                                        className="border-2 border-gray-200 mb-2 py-2 px-4 w-full rounded-lg focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="border-2 border-gray-200 mb-2 py-2 px-4 w-full rounded-lg focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="border-2 border-gray-200 mb-2 py-2 px-4 w-full rounded-lg focus:outline-none"
                                    />
                                    <div className="flex items-center mb-2">
                                        <select
                                            id="vouchers"
                                            value={selectedVoucherId}
                                            onChange={(e) => setSelectedVoucherId(e.target.value)}
                                            className="border-2 border-gray-200 py-2 px-4 w-full rounded-lg focus:outline-none mr-2"
                                        >
                                            <option value="">Select a voucher</option>
                                            {vouchers.length > 0 && vouchers.map((item) => (
                                                <option key={item.id} value={item.id}>{`${item.code} - ${item.name}`}</option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={handleApplyVoucher}
                                            className="text-white bg-blue-600 border-0 py-2 px-4 focus:outline-none hover:bg-blue-700 rounded-lg"
                                        >
                                            Apply
                                        </button>
                                    </div>
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
