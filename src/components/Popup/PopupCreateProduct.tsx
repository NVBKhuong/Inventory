import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../service/store/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaProduct } from "../../schema/schemaProduct";
import { createProduct } from "../../service/features/productSlice";
import { XMarkIcon } from "@heroicons/react/16/solid";

type ProductCreateState = {
    isPopupCreateProductOpen: boolean;
    closePopupCreateProduct: () => void;
};

type ProductCreateFormValues = {
    name: string;
    origin: string;
    brand: string;
    ingredient: string;
    sweetLevel: string;
    flavour: string;
    sample: string;
    capacity: string;
    description: string;
    price: number;
    quantity: number;
    storeId: number;
    expireAt: Date;
    status: string;
};

const PopupCreateProduct: React.FC<ProductCreateState> = ({
    isPopupCreateProductOpen,
    closePopupCreateProduct
}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const { account } = useAppSelector((state) => state.auth);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ProductCreateFormValues>({
        resolver: yupResolver(schemaProduct),
        defaultValues: {
            storeId: account?.userResult.storeId ? parseInt(account.userResult.storeId, 10) : undefined,
        }
    });

    useEffect(() => {
        // This ensures the storeId gets set whenever the account changes
        if (account?.userResult.storeId) {
            setValue('storeId', parseInt(account.userResult.storeId, 10));
        }
    }, [account, setValue]);

    const onSubmit = (data: ProductCreateFormValues) => {
        setIsLoading(true);
        dispatch(createProduct(data))
            .unwrap()
            .then(() => {
                closePopupCreateProduct();
            })
            .catch((error: any) => console.log(error))
            .finally(() => setIsLoading(false));
        reset();
    };

    return (
        isPopupCreateProductOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="relative p-6 bg-white border rounded-lg shadow-lg w-96">
                    <button
                        onClick={closePopupCreateProduct}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Create Product</h2>
                    </div>
                    <div className="overflow-y-scroll h-96 w-auto">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.name && <p className='text-red-500 text-xs mt-2'>* {errors.name.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
                                <input
                                    {...register('origin')}
                                    type="text"
                                    name="origin"
                                    id="origin"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.origin && <p className='text-red-500 text-xs mt-2'>* {errors.origin.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                                <input
                                    {...register('brand')}
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.brand && <p className='text-red-500 text-xs mt-2'>* {errors.brand.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700">Ingredient</label>
                                <input
                                    {...register('ingredient')}
                                    type="text"
                                    name="ingredient"
                                    id="ingredient"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.ingredient && <p className='text-red-500 text-xs mt-2'>* {errors.ingredient.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="sweetLevel" className="block text-sm font-medium text-gray-700">Sweet Level</label>
                                <input
                                    {...register('sweetLevel')}
                                    type="text"
                                    name="sweetLevel"
                                    id="sweetLevel"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.sweetLevel && <p className='text-red-500 text-xs mt-2'>* {errors.sweetLevel.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="flavour" className="block text-sm font-medium text-gray-700">Flavour</label>
                                <input
                                    {...register('flavour')}
                                    type="text"
                                    name="flavour"
                                    id="flavour"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.flavour && <p className='text-red-500 text-xs mt-2'>* {errors.flavour.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="sample" className="block text-sm font-medium text-gray-700">Sample</label>
                                <input
                                    {...register('sample')}
                                    type="text"
                                    name="sample"
                                    id="sample"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.sample && <p className='text-red-500 text-xs mt-2'>* {errors.sample.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                                <input
                                    {...register('capacity')}
                                    type="text"
                                    name="capacity"
                                    id="capacity"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.capacity && <p className='text-red-500 text-xs mt-2'>* {errors.capacity.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    {...register('description')}
                                    name="description"
                                    id="description"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.description && <p className='text-red-500 text-xs mt-2'>* {errors.description.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    {...register('price')}
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.price && <p className='text-red-500 text-xs mt-2'>* {errors.price.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    {...register('quantity')}
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.quantity && <p className='text-red-500 text-xs mt-2'>* {errors.quantity.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="storeId" className="block text-sm font-medium text-gray-700">Store ID</label>
                                <input
                                    {...register('storeId')}
                                    type="number"
                                    name="storeId"
                                    id="storeId"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    readOnly
                                />
                                {errors.storeId && <p className='text-red-500 text-xs mt-2'>* {errors.storeId.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="expireAt" className="block text-sm font-medium text-gray-700">Expire At</label>
                                <input
                                    {...register('expireAt')}
                                    type="date"
                                    name="expireAt"
                                    id="expireAt"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.expireAt && <p className='text-red-500 text-xs mt-2'>* {errors.expireAt.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                                <input
                                    {...register('status')}
                                    type="text"
                                    name="status"
                                    id="status"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                />
                                {errors.status && <p className='text-red-500 text-xs mt-2'>* {errors.status.message}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : (
                                        'Create'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default PopupCreateProduct;
