import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTableComponent } from '@products/components/product-table/product-table.component';

import { ProductService } from '@products/services/product.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);
  productPerPage = signal(10);

  productResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productPerPage(),
    }),
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * request.limit,
        limit: request.limit,
      });
    },
  });
}
