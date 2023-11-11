// part-management.component.ts
import { Component, OnInit } from '@angular/core';
import { DealerService } from '../dealer/dealer.service';
import { PartService } from '../part/part.service';
import { MechanicService } from '../mechanic/mechanic.service';
import { PartManagementService } from './part-management.service';
import { Mechanic } from '../mechanic/mechanic.model';
import { Dealer } from '../dealer/dealer';
import { Part } from '../part/parts.model';
import { CartPartManagement } from './cart-part-management.model';
import { formatDate } from '../shared/utilities';

@Component({
  selector: 'app-part-management',
  templateUrl: './part-management.component.html',
  styleUrls: ['./part-management.component.css']
})
export class PartManagementComponent implements OnInit {
  dealers: Dealer[] = [];
  parts: Part[] = [];
  mechanics: Mechanic[] = [];
  filteredParts: Part[] = [];
  selectedMechanic: number | null = null;
  selectedQuantity: number | null = null;
  selectedPart: Part | null = null;
  cart: CartPartManagement[] = [];
  selectedDealerId = 0;
  cartManagement: CartPartManagement[] = [];

  constructor(
    private dealerService: DealerService,
    private partService: PartService,
    private mechanicService: MechanicService,
    private partManagementService: PartManagementService
  ) { }

  ngOnInit(): void {
    this.loadDealers();
    this.loadParts();
    this.loadMechanics();
  }

  loadDealers() {
    this.dealerService.getDealers().subscribe((data: Dealer[]) => {
      this.dealers = data;
    });
  }

  loadParts() {
    this.partService.getParts().subscribe((data: Part[]) => {
      this.parts = data;
    });
  }

  loadMechanics() {
    this.mechanicService.getMechanics().subscribe((data: Mechanic[]) => {
      this.mechanics = data;
    });
  }

  onDealerChange(event: any) {
    this.selectedDealerId = event.target.value;
    this.filteredParts = this.parts.filter(part => part.dealerId == this.selectedDealerId);
 // Clear existing cartManagement
  this.cartManagement = [];

  this.clearCart();
  this.loadCartItems();

    
  }

  addToCart(cartPartManagement: CartPartManagement) {
    if (cartPartManagement && cartPartManagement.mechanicId>0  && cartPartManagement.quantity > 0) {
      // Clear selection
      this.selectedMechanic = null;
      this.selectedQuantity = null;
      this.selectedPart = null;
      const currentDate = new Date();
      const formattedDate = formatDate(new Date());
      cartPartManagement.createdDate = formattedDate;
  
      // Save cart items to the database
      this.partManagementService.saveCartItems(cartPartManagement).subscribe(
        response => {
          this.loadCartItems();

        this.cartManagement = [];

  this.clearCart();
        },
        error => {
          // Handle error
        }
      );
    }
  }

  getMechanicName(mechanicId: number): string {
    const mechanic = this.mechanics.find(m => m.id == mechanicId);
    return mechanic ? mechanic.name : '';
  }

  getDealerName(dealerId: number): string {
    const dealer = this.dealers.find(m => m.id == dealerId);
    return dealer ? dealer.name : '';
  }


  


  clearCart(){
   
      this.filteredParts = this.parts.filter(part => part.dealerId == this.selectedDealerId);
   // Clear existing cartManagement
    this.cartManagement = [];
  
   this.filteredParts.forEach(part => {
     let cartManagement = {
       part: part, // Push each individual part
       mechanicId: 0,
       dealerId: this.selectedDealerId,
       quantity: 0
     } as CartPartManagement;
  
     this.cartManagement.push(cartManagement);
   })
  }

  loadCartItems(): void {
    this.cart =[];
    this.partManagementService.getCartItemsByDealer(this.selectedDealerId).subscribe(
      (data: CartPartManagement[]) => {
        this.cart = data;
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  deleteCartItem(cartItem: CartPartManagement): void {
    const index = this.cart.indexOf(cartItem);
    if (index !== -1) {
      this.cart.splice(index, 1);

      // Delete the item from the server/database
      this.partManagementService.removeFromCart(cartItem.id).subscribe(
        response => {
          // Handle success response from the server
        },
        error => {
          // Handle error
        }
      );
    }
  }

  incrementQuantity(cartItem: CartPartManagement) {
    if (cartItem.quantity < cartItem.part.stockQuantity) {
      cartItem.quantity++;
    }
  }

  decrementQuantity(cartItem: CartPartManagement) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    }
  }




}
