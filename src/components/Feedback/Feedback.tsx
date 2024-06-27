import React, { useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import { FaStar, FaUser } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../service/store/store';
import { getAllFeedbacksByProductId } from '../../service/features/feedbackSlice';

type FeedbackProps = {
  productId: number | undefined;
};

const Feedback: React.FC<FeedbackProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const feedbacks = useAppSelector((state) => state.feedbacks.feedbacks);

  useEffect(() => {
    if (productId) {
      dispatch(getAllFeedbacksByProductId({ productId }));
    }
  }, [dispatch, productId]);

  return (
    <div className="container mx-auto">
      <h4 className="text-gray-900 text-3xl title-font font-medium mb-1">Feedback</h4>
      <div className="flex flex-row">
        <div className="mt-5 flex">
          <FeedbackForm productId={productId} />
        </div>
        <div className="ml-56 mt-5">
          <span className="text-2xl font-bold">Reviews</span>
          <div className="mt-4">
            {feedbacks ? (
              feedbacks.map(feedback => (
                <div key={feedback.id} className="bg-white shadow-lg rounded-lg p-4 flex gap-4 min-w-[700px] border-black border mb-4">
                  <FaUser className="text-2xl text-gray-700" />
                  <div className="flex flex-col justify-center">
                    <div className="mb-2">
                      <span className="text-lg font-semibold block">{feedback.customer.name}</span>
                      <div className="flex items-center text-xl gap-1">
                        <span className="text-gray-500">{feedback.rateStar}</span>
                        <FaStar size={24} color="#ffd700" />
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">{feedback.content}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No feedbacks available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
