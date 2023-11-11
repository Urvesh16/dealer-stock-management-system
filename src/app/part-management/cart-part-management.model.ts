import { Part } from '../part/parts.model';

export interface CartPartManagement {
  id: number; // Primary key
  part: Part;
  mechanicId: number;
  quantity: number;
  dealerId: number;
  createdDate: string;
}