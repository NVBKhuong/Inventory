export interface IProduct {
    id: number;
    name: string;
    origin: string;
    brand: string;
    description: string;
    price: number;
    promotionPrice: number;
    rating: number;
    inStock : number;
    sold: number;
    quantity: number;
    expireAt: string;
    thumbnailUrl?: string | File | null ;
    thumbnail: string | File | null;
    createAt: string;
    status: string;
    feedbacks: IFeedback[];
}
export interface IFeedback {
    id: number;
    message: string;
    star: number;
    productId: number;
    createAt: string;
    status: string;
    customer: ICustomer;
}
export interface ICustomer {
    id: number;
    username: string;
    name: string;
    phone: string;
    address: string;
    createAt: string;
    status: string;
}
export interface IProductCreate {
    id: number;
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
    expireAt: string;
    storeId: number;
    createAt: string;
    status: string;
}
