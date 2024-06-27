export interface IProduct {
    id: number;
    name: string;
    origin: string;
    brand: string;
    ingredient: string;
    sweetLevel: string;
    flavour: string;
    sample: string | null;
    capacity: string;
    description: string;
    price: number;
    quantity: number;
    expireAt: string;
    createAt: string;
    status: string;
    productImages: any[];
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
