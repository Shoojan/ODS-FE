import { Order } from './orders'

export interface CheckoutCart {
    id: number;
    customerId: number;
    orders: Order[];
    paymentType: string;
    deliveryAddress: string;
    totalPayment: number;
    orderDate: Date;
    expectedDate: Date;
}