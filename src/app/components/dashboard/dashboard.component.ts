import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  activeOrders: Order[] = [];
  totalCost: number = 0;

  deletedOrders: Order[] = [];
  lastDeletedAt: Date = new Date();
  customerDetails: any;

  constructor(
    private orderService: OrdersService,
    private router: Router
  ) {
    this.customerDetails = this.orderService.getCustomerDetails();

    if (this.customerDetails) {
      this.orderService.getOrders(this.customerDetails.customerId).subscribe(
        (res: Order[]) => {
          this.activeOrders = res;
          this.totalCost = this.activeOrders.reduce((acc, cv) => acc + cv.totalPrice, 0);
        },
        (err: HttpErrorResponse) => {
          alert(err.message);
        }
      )

      this.orderService.getDeletedOrders(this.customerDetails.customerId).subscribe(
        (res: Order[]) => {
          this.deletedOrders = res;
          this.lastDeletedAt = this.deletedOrders.map(function (e) { return e.deletedAt; }).sort().reverse()[0]

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
    this.activeOrders = [];
    this.deletedOrders = [];
    this.router.navigateByUrl("/orders");
  }

}
