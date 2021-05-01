import { Product } from './product'

export interface Order {
    id: number;
    customerId: string;
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    orderedAt: Date;
    orderStatus: string;
}