import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutCart } from 'src/app/models/CheckoutCart';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  checkoutCartOrder: CheckoutCart = <CheckoutCart>{};
  orders: Order[] = [];
  customerDetails: any;
  totalCost: number = 0;

  constructor(
    private orderService: OrdersService,
    private router: Router
  ) {
    this.customerDetails = this.orderService.getCustomerDetails();

    if (this.customerDetails) {
      this.orderService.fetchCheckoutItems(this.customerDetails.customerId)
        .subscribe((res: CheckoutCart[]) => {
          if (res.length > 0) {
            this.checkoutCartOrder = res[0];
          }
        }, err => {
          alert(err.message)
        });

      this.orderService.getOrders(this.customerDetails.customerId).subscribe(
        (res: Order[]) => {
          this.orders = res;
          this.totalCost = this.orders.reduce((acc, cv) => acc + cv.totalPrice, 0);
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        }
      )
    }

  }

  ngOnInit(): void {

  }

  public goToOrders() {
    this.orders = [];
    this.checkoutCartOrder = <CheckoutCart>{};
    this.router.navigateByUrl("/orders");
  }

}
