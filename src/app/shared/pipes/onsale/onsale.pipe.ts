import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onsale',
  standalone: true
})
export class OnsalePipe implements PipeTransform {

  transform(value: string): string {
    return "Onsale "+value;
  }

}
