import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../service/store/store';
import Login from '../pages/client/Login';
import Register from '../pages/client/Register';
import CategoryManagement from '../pages/StoreManager/CategoryManagement';
import Home from '../pages/client/Home';
import ProductDetails from '../components/Product/ProductDetails';
import ProductManagement from '../pages/StoreManager/ProductManagement';
import Profile from '../pages/Profile/Profile';
import ChangePassword from '../pages/Profile/ChangePassword';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Dashboard from '../pages/StoreManager/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import ViewCart from '../pages/client/Cart/ViewCart';
import ThankYou from '../components/Payment/ThankYou';
import OrderHistory from '../components/Payment/OrderHistory';
import ProductLineManagement from '../pages/StoreManager/ProductLineManagement';
import ThankyouforVnpay from '../components/Payment/ThankyouforVnpay';
import OrderManagement from '../pages/StoreManager/OrderManagerment';
import ProductPage from '../pages/client/ProductPage';
import Blog from '../pages/client/Blog/Blog';
import FAQ from '../pages/client/FAQ'
import Contact from '../pages/client/ContactUs';

const AppRouter = () => {
    const token = localStorage.getItem('suame88');
    const { account } = useAppSelector((state) => state.auth);

    // Check if account and userResult are defined before accessing role
    const isAdmin = account && account.user && account.user.role.includes('Admin');
    const isStoreOwner = account && account.user && account.user.role.includes('Staff');
    const isCustomer = account && account.user && account.user.role.includes('Customer');

    if (!token || !account) {
        return (
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
                <Route path="/product/:id" element={<ProductDetails />} />                            
                <Route path="/product-page" element={<ProductPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
        );
    }

    return (
        <Routes>
                 <Route path="/profile" element={<Profile />} />
                 <Route path="/change-password" element={<ChangePassword />} />
            {isStoreOwner && (
                <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/category-management" element={<CategoryManagement />} />
                    <Route path="/product-management" element={<ProductManagement />} />
                    <Route path="/product-line-management" element={<ProductLineManagement />} />
                    <Route path="/order-management" element={<OrderManagement />} />
                    <Route path="/voucher-management" element={<OrderManagement />} /> 

                </>
            )}
            {isCustomer && (
                <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/view-cart" element={<ViewCart />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/order-history" element={<OrderHistory />} />
                    <Route path="/payments" element={<ThankyouforVnpay />} />
                    <Route path="/product-page" element={<ProductPage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                </>
            )}
            {isAdmin && (
                <>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/product-management" element={<ProductManagement />} />
                    <Route path="/category-management" element={<CategoryManagement />} />
                    <Route path="/order-management" element={<OrderManagement />} />

                </>

            )}
            {/* Fallback route if none of the above matches */}
            {/* <Route path="*" element={<Navigate to={isCustomer ? "/home" : "/dashboard"} replace />} /> */}
        </Routes>
    );
};

export default AppRouter;
