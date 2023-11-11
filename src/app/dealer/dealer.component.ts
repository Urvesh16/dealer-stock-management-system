import { Component, OnInit } from '@angular/core';
import { DealerService } from './dealer.service';
import { Dealer } from './dealer';
import { formatDate } from '../shared/utilities';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {
  dealers: Dealer[] = [];
  dealer: Dealer = { id: 0, name: '', address: '', contactNo: '', email: '', createdDate: '' };
  isEditing = false;

  constructor(private dealerService: DealerService) { }

  ngOnInit(): void {
    this.loadDealers();
  }

  loadDealers() {
    this.dealerService.getDealers().subscribe((data: Dealer[]) => {
      this.dealers = data;
    });
  }

  viewDealer(dealer: Dealer) {
    // Implement view functionality (if needed)
  }

  editDealer(dealer: Dealer) {
    this.isEditing = true;
    this.dealer = { ...dealer }; // Create a copy of the dealer to edit
  }

  submitForm() {
    const formattedDate = formatDate(new Date());
    this.dealer.createdDate = formattedDate;
    if (this.isEditing) {
      // Implement update functionality
      this.dealerService.updateDealer(this.dealer).subscribe(() => {
        this.loadDealers(); // Refresh the dealer list
        this.resetForm();
      });
    } else {
      // Add a new dealer
      this.dealerService.addDealer(this.dealer).subscribe((newDealer) => {
        this.dealers.push(newDealer); // Add the new dealer to the local list
        this.resetForm(); // Clear the form
      });
    }
  }

  resetForm() {
    this.dealer = { id: 0, name: '', address: '', contactNo: '', email: '', createdDate: '' };
    this.isEditing = false;
  }

  
}