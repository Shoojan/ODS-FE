import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];
  public totalCost: number = 0;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders(1);

  }

  public getOrders(customerId: number): void {
    this.orderService.getOrders(customerId).subscribe(
      (res: Order[]) => {
        this.orders = res;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    )
  }
}
