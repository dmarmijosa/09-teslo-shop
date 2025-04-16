
import { Component, inject } from '@angular/core';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product.service';
import {rxResource} from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);

  productResource = rxResource({
    request: ()=>({}),
    loader: ({request})=> {
      return this.productService.getProducts({})
    }
  });

  get products(){
    return this.productResource.value()?.products;
  }
}
