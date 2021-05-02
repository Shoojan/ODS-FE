import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Order } from 'src/app/models/orders';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public orders: Order[] = [];
  public totalCost: number = 0;

  public cardDetails: Card = <Card>{};

  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit(): void {
    this.orderService.getOrderCheckoutItems().subscribe((data: Order[]) => {
      this.orders = data;
    })
    this.totalCost = this.orderService.getTotalCost();

    this.cardDetails = {
      name: "SUJAN MAHARJAN",
      cardNumber: "1234 4567 8946 2355",
      cvCode: 123,
      expirationDate: "11/10"
    };
  }

  public populateCardDetails() {

  }
}
