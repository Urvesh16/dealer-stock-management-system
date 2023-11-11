export interface Part {
    id: number;
    dealerId: number; // Foreign key to associate with a dealer
    name: string;
    description: string;
    stockQuantity: number;
    createdDate: string;
    
  }