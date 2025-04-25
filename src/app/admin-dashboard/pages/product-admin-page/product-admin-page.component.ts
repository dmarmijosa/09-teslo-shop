import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-admin-page',
  imports: [],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {
  router = inject(Router);
  productService = inject(ProductService);
  activatedRouter = inject(ActivatedRoute);
  productId = toSignal(
    this.activatedRouter.params.pipe(map((params) => params['id']))
  );

  productResource = rxResource({
    request: () => ({ id: this.productId() }),
    loader: ({ request }) => {
      return this.productService.getProductById(request.id);
    },
  });

  redireectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products']);
    }
  });
}
