import { Part } from "../part/parts.model";

export interface CartItem {
    id: number; // Unique identifier for the cart item
    part: Part;
    mechanicId: number;
    dealerId: number; // Add the dealerId property
    quantity: number;
  }