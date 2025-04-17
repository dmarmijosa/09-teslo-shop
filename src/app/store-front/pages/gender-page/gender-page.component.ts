import {Component, inject} from '@angular/core';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {ProductCardComponent} from '@products/components/product-card/product-card.component';
import {ProductService} from '@products/services/product.service';
import {map} from 'rxjs';
import {PaginationComponent} from '@shared/components/pagination/pagination.component';
import {PaginationService} from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private readonly router = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  readonly paginationService = inject(PaginationService);

  gender = toSignal(this.router.params.pipe(map(({ gender }) => gender)));

  genderResourse = rxResource({
    request: () => ({ gender: this.gender(), page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        gender: request.gender,
        offset: request.page * 9
      });
    },
  });

  get products(){
    return this.genderResourse.value()?.products;
  }
}
