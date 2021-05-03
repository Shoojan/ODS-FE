import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Order } from '../../models/orders';
import { CheckoutCart } from 'src/app/models/CheckoutCart';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private totalCost: number = 0;

  private apiServerUrl = environment.apiBaseUrl;

  public orderCheckoutItems = new BehaviorSubject<Order[]>([]);

  constructor(private authService: AuthService) { }

  //----------------------------- Getter and Setter ----------------------------- 

  public getOrderCheckoutItems() {
    return this.orderCheckoutItems.asObservable()
  }

  public setOrderCheckoutItems(orders: Order[]) {
    this.setTotalCost(orders.reduce((acc, cv) => acc + cv.totalPrice, 0));
    this.orderCheckoutItems.next(orders);
  }

  public getTotalCost() { return this.totalCost; }

  public setTotalCost(totalCost: number) { this.totalCost = totalCost; }


  //----------------------------- Methods ----------------------------- 


  //----------------------------- API Endpoints Call ----------------------------- 

  public getOrders(customerId: number): Observable<Order[]> {
    // return this.http.get<Order[]>(`${this.apiServerUrl}/orders?customerId=${customerId}`)
    return this.authService.getAllData(`/orders?customerId=${customerId}`);
  }

  // public getOrder(id: number): Observable<Order> {
  //   return this.http.get<Order>(`${this.apiServerUrl}/Orders/${id}`)
  // }

  // public addOrders(Order: Order): Observable<Order> {
  //   return this.http.post<Order>(`${this.apiServerUrl}/Orders`, Order)
  // }

  public updateOrders(order: Order): Observable<Order> {
    // return this.http.put<Order>(`${this.apiServerUrl}/orders`, order);
    return this.authService.postRequest(`/orders`, order);
  }

  public deleteOrders(id: number): Observable<void> {
    // return this.http.delete<void>(`${this.apiServerUrl}/orders/${id}`);
    return this.authService.deleteData(`/orders/${id}`);
  }

  public checkoutOrders(checkoutCart: any): Observable<CheckoutCart> {
    // return this.http.post<CheckoutCart>(`${this.apiServerUrl}/orders/checkout`, checkoutCart);
    return this.authService.postRequest(`/orders/checkout`, checkoutCart);

  }
}
