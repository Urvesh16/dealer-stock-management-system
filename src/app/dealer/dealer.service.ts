import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dealer } from './dealer';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  private baseUrl = 'http://localhost:3000'; // Adjust this URL to match your JSON server's base URL

  constructor(private http: HttpClient) { }

  // Fetch all dealers from the JSON server
  getDealers(): Observable<Dealer[]> {
    return this.http.get<Dealer[]>(`${this.baseUrl}/dealers`);
  }

  // Add a new dealer to the JSON server
  addDealer(dealer: Dealer): Observable<Dealer> {
    return this.http.post<Dealer>(`${this.baseUrl}/dealers`, dealer);
  }

  // Update an existing dealer on the JSON server
  updateDealer(dealer: Dealer): Observable<Dealer> {
    return this.http.put<Dealer>(`${this.baseUrl}/dealers/${dealer.id}`, dealer);
  }

  // Delete a dealer from the JSON server
  deleteDealer(dealerId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/dealers/${dealerId}`);
  }
}
