import { XMarkIcon } from '@heroicons/react/16/solid';
import { ICategory } from '../../models/Category';

type PopupCategoryDetailProps = {
    cate: ICategory | null;
    onPopupDetail: boolean;
    setOnPopupDetail: React.Dispatch<React.SetStateAction<boolean>>;
    onUpdate: () => void;
}
const PopupCategoryDetail: React.FC<PopupCategoryDetailProps> = ({
    cate,
    onPopupDetail,
    setOnPopupDetail,
    onUpdate,
}) => {
    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${onPopupDetail ? '' : 'hidden'
                }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="bg-white-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pb-2">
                                <div className="flex">
                                    <h3
                                        className="text-lg leading-6 w-full font-medium text-gray-900"
                                        id="modal-title"
                                    >
                                        Category Detail
                                    </h3>
                                    <XMarkIcon
                                        width={16}
                                        height={16}
                                        className="h-6 w-6 ml-auto cursor-pointer"
                                        onClick={() => setOnPopupDetail(false)}
                                    />
                                    <hr className="mt-2 text-black-700" />
                                </div>
                                <div className="mt-4 border-t grid grid-cols-2 gap-4 p-8">
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Name
                                        </span>
                                    </div>
                                    <div>
                                        <span>{cate?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Target Audience
                                        </span>
                                    </div>
                                    <div>
                                        <span>{cate?.targetAudience}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Age Range
                                        </span>
                                    </div>
                                    <div>
                                        <span>{cate?.ageRange}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Milk Type
                                        </span>
                                    </div>
                                    <div>
                                        <span>{cate?.milkType}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Action
                                        </span>
                                    </div>
                                    <div className="w-auto flex gap-4">
                                        <button
                                            onClick={onUpdate}
                                            className="text-xs w-24 border border-blue-500p-1 bg-blue-500 text-white-900 font-bold rounded-lg"
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="text-xs w-24 border border-blue-500p-1 bg-red-500 text-white font-bold rounded-lg"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupCategoryDetail;
