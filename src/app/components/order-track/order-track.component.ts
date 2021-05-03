import { Component, OnInit } from '@angular/core';
import { CheckoutCart } from 'src/app/models/CheckoutCart';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit {

  checkoutCartOrder: CheckoutCart = <CheckoutCart>{};
  ordersWithStatus: any[] = [];

  constructor(
    private orderService: OrdersService
  ) {
    const customerDetails = this.orderService.getCustomerDetails();

    if (customerDetails) {
      this.orderService.fetchCheckoutItems(customerDetails.customerId)
        .subscribe((res: CheckoutCart[]) => {
          if (res.length > 0) {
            this.checkoutCartOrder = res[0];

            if (this.checkoutCartOrder.id) {
              this.checkoutCartOrder.orders.forEach(order => {
                this.ordersWithStatus.push({
                  productName: order.product.productName,
                  quantity: order.quantity,
                  orderSteps: this.getOrderSteps(order.orderStatus)
                })
              })
            }
            
          }
        }, err => {
          alert(err.message)
        });
    }

  }

  ngOnInit(): void {
  }

  // ADDED_TO_CART,
  // ORDER_CONFIRMED
  // ORDER_PROCESSED,
  // QUALITY_CHECKED,
  // SHIPPED,
  // DELIVERED
  getOrderSteps(orderStatus: string) {
    switch (orderStatus) {
      default:
        return ['', '', '', '', ''];
      case 'ORDER_CONFIRMED':
        return ['completed', '', '', '', ''];
      case 'ORDER_PROCESSED':
        return ['completed', 'completed', '', '', ''];
      case 'QUALITY_CHECKED':
        return ['completed', 'completed', 'completed', '', ''];
      case 'SHIPPED':
        return ['completed', 'completed', 'completed', 'completed', ''];
      case 'DELIVERED':
        return ['completed', 'completed', 'completed', 'completed', 'completed'];
    }
  }

}
