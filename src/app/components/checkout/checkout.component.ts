import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from 'src/app/models/card';
import { CheckoutCart } from 'src/app/models/CheckoutCart';
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
  public customerDetails: any;

  public formGroup: FormGroup;

  private paymentTypes = { delivery: "CASH_ON_DELIVERY", card: "VISA_CARD_PAYMENT" };

  constructor(
    private orderService: OrdersService,
    private formBuilder: FormBuilder
  ) {

    this.cardDetails = {
      cardName: "SUJAN MAHARJAN",
      cardNumber: "1234 4567 8946 2355",
      cvCode: 123,
      expirationDate: "11/10"
    };

    this.formGroup = this.formBuilder.group({
      cardName: [null, Validators.required],
      cardNumber: [null, Validators.required],
      cvCode: [null, Validators.required],
      expirationDate: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.orderService.getOrderCheckoutItems()
      .subscribe((data: Order[]) => {
        this.orders = data;
      })
    this.totalCost = this.orderService.getTotalCost();
    this.customerDetails = this.orderService.getCustomerDetails();
    console.log(this.customerDetails)
  }

  public populateCardDetails() {
    this.formGroup.patchValue(this.cardDetails)
  }

  public makePayment() {
    console.log(this.formGroup.value)
    //Assuming that the card payment is successful, updating the database only.
    let checkoutCart = {
      customerId: this.customerDetails.customerId,
      orders: this.orders,
      paymentType: this.paymentTypes.card,
      deliveryAddress: this.customerDetails.address,
      totalCost: this.totalCost,
      orderDate: new Date()
    }
    this.orderService.checkoutOrders(checkoutCart).subscribe((res: CheckoutCart) => {
      if (res) {
        console.log(res);
        alert('Thank you for your payment. The orders have been placed!')
      }
    });
  }
}
