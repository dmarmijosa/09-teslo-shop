import { Component, inject } from '@angular/core';

import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductService } from '@products/services/product.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? params.get('page')! : 1) as number),
      map((page) => (isNaN(page) ? this.route.navigate([], {queryParams: {page:1}, queryParamsHandling: 'merge'}) : page))
    ),
    {
      initialValue: 1,
    }
  );

  productResource = rxResource({
    request: () => ({page: +this.currentPage()-1 }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * 9
      });
    },
  });

  get products() {
    return this.productResource.value()?.products;
  }
}
