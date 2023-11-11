import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer/dealer.service';
import { PartService } from './part.service';

import { Dealer } from '../dealer/dealer';
import { Part } from './parts.model';
import { formatDate } from '../shared/utilities';


@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {
  parts: Part[] = [];
  part: Part = { id: 0, dealerId: 0, name: '', description: '', stockQuantity: 0, createdDate: '' };
  isEditing = false;
  dealers: Dealer[] = [];

  constructor(private dealerService: DealerService, private partService: PartService) { }

  ngOnInit(): void {
    this.loadParts();
    this.loadDealers();
  }

  loadParts() {
    this.partService.getParts().subscribe((data: Part[]) => {
      this.parts = data;
    });
  }

  loadDealers() {
    this.dealerService.getDealers().subscribe((data: Dealer[]) => {
      this.dealers = data;
    });
  }

 

  editPart(part: Part) {
    this.isEditing = true;
    this.part = { ...part };
  }

  deletePart(part: Part) {
      if (confirm('Are you sure you want to delete this part?')) {
        this.partService.deletePart(part.id).subscribe(() => {
          // Handle delete success
          this.loadParts(); // Refresh the part list after deletion
        }, (error) => {
          // Handle delete error
        });
      }
  }

  submitForm() {
    const formattedDate = formatDate(new Date());
    this.part.createdDate = formattedDate;
    if (this.isEditing) {
      this.partService.updatePart(this.part).subscribe(() => {
        // Handle update success
        this.resetForm();
        this.loadParts();
      }, (error) => {
        // Handle update error
      });
    } else {
      this.partService.addPart(this.part).subscribe(() => {
        // Handle add success
        this.resetForm();
        this.loadParts();
      }, (error) => {
        // Handle add error
      });
    }
  }

  resetForm() {
    this.part = { id: 0, dealerId: 0, name: '', description: '', stockQuantity: 0, createdDate: '' };
    this.isEditing = false;
  }

  getDealerName(dealerId: number): string {
    const dealer = this.dealers.find((d) => d.id == dealerId);
    return dealer ? dealer.name : 'Not Found';
  }

 
}
