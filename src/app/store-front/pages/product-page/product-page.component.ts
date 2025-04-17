import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/product.service';
@Component({
  selector: 'product-page',
  imports: [],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  private activadedRouter = inject(ActivatedRoute);
  productService = inject(ProductService);

  productIdSlug = this.activadedRouter.snapshot.params['idSlug'];


  productResource = rxResource({
    request: () => ({ idSulg: this.productIdSlug }),
    loader: ({ request }) => {
      return this.productService.getProductByIdSlug(this.productIdSlug);
    },
  });
}
