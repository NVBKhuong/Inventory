import { IProduct } from "./Produdct";

export interface ICartItem extends IProduct {
    cartId: number;
    quantity: number;
}