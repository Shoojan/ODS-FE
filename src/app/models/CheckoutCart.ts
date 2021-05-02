import { Order } from './orders'

export interface CheckoutCart {
    id: number;
    customerId: string;
    product: Order[];
    paymentType: string;
    deliveryAddress: string;
    totalCost: number;
    orderDate: Date;
}