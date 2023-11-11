import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalSpace'
})
export class DecimalSpacePipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      const parts = value.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join(' ');
    }
    return value;
  }
}