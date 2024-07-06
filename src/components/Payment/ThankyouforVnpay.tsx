import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const ThankYouForVNPay = () => {
    const location = useLocation();
    const { search } = location;
    const queryParams = queryString.parse(search);

    return (
        <div className="container mx-auto py-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Payment Successful!</h2>
            <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
                <p><strong>Order: </strong>{queryParams['vnp_OrderInfo']}</p>
                <p><strong>Amount: </strong>{queryParams['vnp_Amount']} VNĐ</p>
                <p><strong>Status: </strong>{queryParams['vnp_TransactionStatus'] === '00' ? 'Success' : 'Failed'}</p>
                <p className="mt-4">Thank you for choosing our service. We hope you had a safe and enjoyable shopping experience.</p>
            </div>
        </div>
    );
};

export default ThankYouForVNPay;
