import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";
@Component({
  selector: 'product-page',
  imports: [ProductCarouselComponent],
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
