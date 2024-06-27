interface ICustomer {
    id: string;
    email: string;
    phone: string;
    name: string;
    avatarUrl: string | null;
    rank: string;
    status: boolean;
}

interface IProduct {
    id: number;
    name: string;
    origin: string;
    brand: string;
    ingredient: string;
    sweetLevel: string;
    flavour: string;
    sample: any;
    capacity: string;
    description: string;
    price: number;
    quantity: number;
    expireAt: string;
    createAt: string;
    status: string;
    productImages: any[];
}

export interface IFeedback {
    id: string;
    customer: ICustomer;
    product: IProduct;
    rateStar: number;
    content: string;
    productId: string;
}

export interface IFeedbackCreate {
    rateStar: number;
    content: string;
    productId: number;
}