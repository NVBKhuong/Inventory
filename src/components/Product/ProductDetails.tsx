import { useParams } from "react-router-dom";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { addToCart, getProductById, increaseQuantity, decreaseQuantity } from "../../service/features/productSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Feedback from "../Feedback/Feedback";
import { Link } from "react-router-dom";
//import { string } from "yup";

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { product, cart } = useAppSelector((state) => state.products);
    const productId = params.id ? params.id : "";
    const { account } = useAppSelector((state) => state.auth);
    const isCustomer = account && account.user && account.user.role.includes('Customer');

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productId) {
            dispatch(getProductById({ id: productId }));
        }
    }, [dispatch, productId]);

    const handleAddToCart = () => {
        if (product) {
            // Tạo cartId mới bằng cách lấy độ dài của cart hiện tại + 1
            const newCartId = (cart ? cart.length : 0) + 1;

            dispatch(addToCart({
                ...product,
                quantity,
                cartId: newCartId
            }));
            toast.success(`Added ${product.name} to cart.`);
        }
    };

    const handleIncreaseQuantity = () => {
        if (product) {
            setQuantity(quantity + 1);
            dispatch(increaseQuantity(product.id));
        }
    };

    const handleDecreaseQuantity = () => {
        if (product && quantity > 1) {
            setQuantity(quantity - 1);
            dispatch(decreaseQuantity(product.id));
        }
    };

    return (
        <>
            <section>
                <Header />
            </section>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                            src="https://firebasestorage.googleapis.com/v0/b/happy-milk-1b780.appspot.com/o/suame88%2Fc0a1440d-86d6-4395-84b8-ed2e12c123c3.png?alt=media"
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.brand}</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
                            <div className="flex flex-row gap-8">
                                <span className="title-font font-medium text-base text-gray-900">Sold: {product?.sold} </span>
                                <span className="title-font font-medium text-base text-gray-900">Quantity: {product?.inStock} </span>
                                {product?.inStock === 0 && (
                                    <span className="title-font font-medium text-base text-red-500">Out of Stock</span>
                                )}
                            </div>

                            <div className="flex mt-10">
                                <span className="title-font font-medium text-2xl text-gray-900">$ {product?.price}</span>
                                {product && product.inStock > 0 && (
                                    <>
                                        <div className="ml-auto flex items-center">
                                            <button
                                                onClick={handleDecreaseQuantity}
                                                className="flex items-center justify-center text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2 text-sm">{quantity}</span>
                                            {product && product?.inStock > quantity ? (
                                                <button
                                                    onClick={handleIncreaseQuantity}
                                                    className="flex items-center justify-center text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded"
                                                >
                                                    +
                                                </button>) : <span className="mx-2 text-sm text-red-500">Out of stock</span>}
                                        </div>
                                        {isCustomer ? (<button
                                            onClick={handleAddToCart}
                                            className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                        >
                                            Add To Cart
                                        </button>) : (<Link to="/login"
                                            className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                        >
                                            Add To Cart
                                        </Link>
                                        )}
                                    </>
                                )}

                            </div>
                            <div className="w-auto h-auto">
                                {product?.description ? (
                                    <p className="leading-relaxed mt-4">{product?.description}</p>
                                ) : (
                                    <p className="leading-relaxed mt-4">No description</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <section className="text-gray-700 body-font overflow-hidden bg-white border-t-4 w-full">
                <div className="m-10">
                    <Feedback
                        productId={productId}
                        feedbacks={product?.feedbacks}
                    />
                </div>
            </section>
            <section>
                <Footer />
            </section>

        </>
    );
};

export default ProductDetails;