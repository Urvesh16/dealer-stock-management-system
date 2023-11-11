export interface Mechanic {
    id: number;
    dealerId: number; // Foreign key to associate with a dealer
    name: string;
    mobileNo: string;
    email: string;
    birthDate: string;
    createdDate: string;
  }
  