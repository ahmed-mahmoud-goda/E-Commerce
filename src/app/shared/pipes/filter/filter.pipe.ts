import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../interfaces/product';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(productList:Product[], searchTerm: string): Product[] {
    return productList.filter((p)=>{
      return p.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

}
