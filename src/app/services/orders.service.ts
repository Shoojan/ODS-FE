import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Order } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/orders?customerId=${customerId}`)
  }

  // public getOrder(id: number): Observable<Order> {
  //   return this.http.get<Order>(`${this.apiServerUrl}/Orders/${id}`)
  // }

  // public addOrders(Order: Order): Observable<Order> {
  //   return this.http.post<Order>(`${this.apiServerUrl}/Orders`, Order)
  // }

  // public updateOrders(Order: Order): Observable<Order> {
  //   return this.http.put<Order>(`${this.apiServerUrl}/Orders`, Order)
  // }

  // public deleteOrders(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiServerUrl}/Orders/${id}`)
  // }
}
