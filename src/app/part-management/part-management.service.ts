import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cartItem.model';
import { Part } from '../part/parts.model';
import { CartPartManagement } from './cart-part-management.model';

@Injectable({
  providedIn: 'root'
})
export class PartManagementService {
  private baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) { }

  // Fetch parts based on the dealerId
  getPartsByDealerId(dealerId: number): Observable<Part[]> {
    const url = `${this.baseUrl}/parts?dealerId=${dealerId}`;
    return this.http.get<Part[]>(url);
  }

  // Add a part to the cart
  addToCart(partId: number, mechanicId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/cart`;
    const data = { partId, mechanicId, quantity };
    return this.http.post(url, data);

    
  }

  // Fetch cart items
  getCartItems(): Observable<CartPartManagement[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<CartPartManagement[]>(url);
  }

  getCartItemsByDealer(dealerId: number): Observable<CartPartManagement[]> {
    const url = `${this.baseUrl}?dealerId=${dealerId}`;
    return this.http.get<CartPartManagement[]>(url);
  }

  // Remove an item from the cart
  removeFromCart(cartItemId: number): Observable<any> {
    const url = `${this.baseUrl}/${cartItemId}`;
    return this.http.delete(url);
  }

  saveCartItems(cartItems: CartPartManagement): Observable<any> {
    return this.http.post<CartPartManagement>(`${this.baseUrl}`, cartItems);
  }

  
}
