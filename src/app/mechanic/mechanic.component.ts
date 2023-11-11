import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer/dealer.service';
import { MechanicService } from './mechanic.service';
import { Mechanic } from './mechanic.model';
import { Dealer } from '../dealer/dealer';

import { formatDate } from '../shared/utilities';


@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.component.html',
  styleUrls: ['./mechanic.component.css']
})
export class MechanicComponent implements OnInit {
  mechanics: Mechanic[] = [];
  mechanic: Mechanic = { id: 0, dealerId: 0, name: '', mobileNo: '', email: '', birthDate:  this.getCurrentDate(), createdDate:  '' };
  isEditing = false;
  dealers: Dealer[] = [];

  constructor(private dealerService: DealerService, private mechanicService: MechanicService) { }

  ngOnInit(): void {
    this.loadMechanics();
    this.loadDealers();
  }

  loadMechanics() {
    this.mechanicService.getMechanics().subscribe((data: Mechanic[]) => {
      this.mechanics = data;
    });
  }

  loadDealers() {
    this.dealerService.getDealers().subscribe((data: Dealer[]) => {
      this.dealers = data;
    });
  }

  viewMechanic(mechanic: Mechanic) {
    // Implement view functionality
  }

  editMechanic(mechanic: Mechanic) {
    this.isEditing = true;
    this.mechanic = { ...mechanic };
  }

  deleteMechanic(mechanic: Mechanic) {
    if (confirm('Are you sure you want to delete this mechanic?')) {
      this.mechanicService.deleteMechanic(mechanic.id).subscribe(() => {
        // Handle delete success
        this.loadMechanics(); // Refresh the mechanic list after deletion
      }, (error) => {
        // Handle delete error
      });
    }
  }

  submitForm() {
    const formattedDate = formatDate(new Date());
    this.mechanic.createdDate = formattedDate;
    if (this.isEditing) {
      this.mechanicService.updateMechanic(this.mechanic).subscribe(() => {
        // Handle update success
        this.resetForm();
        this.loadMechanics();
      }, (error) => {
        // Handle update error
      });
    } else {
      this.mechanicService.addMechanic(this.mechanic).subscribe(() => {
        // Handle add success
        this.resetForm();
        this.loadMechanics();
      }, (error) => {
        // Handle add error
      });
    }
  }

  resetForm() {
    this.mechanic = { id: 0, dealerId: 0, name: '', mobileNo: '', email: '', birthDate: this.getCurrentDate(), createdDate: '' };
    this.isEditing = false;
  }

  getDealerName(dealerId: number): string {
    const dealer = this.dealers.find((d) => d.id == dealerId);
    return dealer ? dealer.name : 'Not Found';
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    return formattedDate;
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  
}