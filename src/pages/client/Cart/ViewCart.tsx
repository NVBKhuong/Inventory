import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../service/store/store";
import { ICartItem } from "../../../models/CartItem";
import { decreaseQuantity, removeFromCart } from "../../../service/features/productSlice";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";

const ViewCart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.products.cart);

    useEffect(() => {
    }, []);

    const handleDecreaseQuantity = (cartItem: ICartItem) => {
        dispatch(decreaseQuantity(cartItem.id));
    };

    const handleRemoveFromCart = (cartItem: ICartItem) => {
        dispatch(removeFromCart(cartItem.id));
        toast.error(`Đã xóa ${cartItem.name} khỏi giỏ hàng.`);
    };

    return (
        <>
            <Header />
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="lg:w-1/4 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <div className="flex items-center justify-center shadow-lg rounded-lg">
                                        <img
                                            alt={item.name}
                                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                                            src="https://lzd-img-global.slatic.net/g/p/a76230e0f618381db919783fd72ac32c.jpg_320x320.jpg_550x550.jpg"
                                        />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h2 className="text-gray-900 text-lg title-font font-medium mb-1">{item.name}</h2>
                                        <p className="leading-relaxed mb-3">{item.description}</p>
                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                onClick={() => handleDecreaseQuantity(item)}
                                                className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2 text-lg font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => handleRemoveFromCart(item)}
                                                className="text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-700 rounded"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center w-full mt-8 text-lg font-semibold">Giỏ hàng của bạn đang trống.</p>
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full mt-12 mx-auto">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xl text-gray-900 mb-4">Tổng cộng: ${calculateTotal(cartItems)}</p>
                            <button
                                className="text-white bg-red-600 border-0 py-2 px-8 focus:outline-none hover:bg-red-700 rounded-lg"
                                onClick={() => {
                                    toast.success('Chuyển tiếp đến trang thanh toán hoặc mua hàng tiếp.');
                                }}
                            >
                                Tiếp tục mua hàng
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};
const calculateTotal = (cartItems: ICartItem[] | null): number => {
    if (!cartItems || cartItems.length === 0) {
        return 0;
    }
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
};

export default ViewCart;