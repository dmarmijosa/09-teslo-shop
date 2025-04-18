import {Component, inject} from '@angular/core';
import {ProductCardComponent} from '@products/components/product-card/product-card.component';
import {ProductService} from '@products/services/product.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {PaginationComponent} from '@shared/components/pagination/pagination.component';
import {PaginationService} from '@shared/components/pagination/pagination.service';
import { ProductsListLayoutComponent } from "../../../products/layouts/products-list-layout/products-list-layout.component";

@Component({
  selector: 'home-page',
  imports: [PaginationComponent, ProductsListLayoutComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productService = inject(ProductService);
  readonly paginationService = inject(PaginationService);

  productResource = rxResource({
    request: () => ({page: this.paginationService.currentPage() - 1}),
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
