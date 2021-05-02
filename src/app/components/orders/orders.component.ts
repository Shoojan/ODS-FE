import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];
  public tempOrders: Order[] = [];
  public totalCost: number = 0;
  public tempTotalCost: number = 0;

  constructor(
    private orderService: OrdersService,
    private router: Router) { }

  ngOnInit(): void {
    this.getOrders(1);
  }

  public getOrders(customerId: number): void {
    this.orderService.getOrders(customerId).subscribe(
      (res: Order[]) => {
        this.orders = res;
        this.tempOrders = this.orders;
        this.totalCost = this.orders.reduce((acc, cv) => acc + cv.totalPrice, 0);
        this.tempTotalCost = this.totalCost;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    )
  }

  public updatePrice(event: any, orderId: number) {
    this.tempOrders.forEach(order => {
      if (order.id == orderId) {
        order.quantity = event.target.value;
        const previousTotalCost = order.totalPrice;
        order.totalPrice = order.quantity * order.unitPrice;
        this.tempTotalCost = this.tempTotalCost - previousTotalCost + order.totalPrice;
      }
    })
  }

  public removeOrder(orderId: number) {
    if (confirm("Are you sure you want to remove?")) {
      const order = this.tempOrders.find(x => x.id == orderId);
      if (order) {
        const index = this.tempOrders.indexOf(order);
        if (index > -1) {
          this.tempOrders.splice(index, 1);
          this.tempTotalCost = this.tempTotalCost - order.totalPrice;
        }
      }
    }
  }

  public checkout() {
    this.orderService.setOrderCheckoutItems(this.tempOrders);
    // this.orderService.setTotalCost
    this.router.navigate(['/checkout']);
  }

}
