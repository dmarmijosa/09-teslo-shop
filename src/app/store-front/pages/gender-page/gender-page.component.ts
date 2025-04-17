import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private readonly router = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  gender = toSignal(this.router.params.pipe(map(({ gender }) => gender)));

  genderResourse = rxResource({
    request: () => ({ gender: this.gender() }),
    loader: ({ request }) => {
      return this.productService.getProducts({ gender:request.gender });
    },
  });

  get products(){
    return this.genderResourse.value()?.products;
  }
}
