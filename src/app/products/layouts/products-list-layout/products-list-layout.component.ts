import { Component, computed, input, ResourceRef } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductResponse } from '@products/interfaces/product.interface';

@Component({
  selector: 'products-list-layout',
  imports: [ProductCardComponent],
  templateUrl: './products-list-layout.component.html',
})
export class ProductsListLayoutComponent {
  readonly productResource =
    input.required<ResourceRef<ProductResponse | undefined>>();

  products = computed(() => {
    if (this.productResource() && this.productResource().value()) {
      return this.productResource().value()!.products;
    }
    return [];
  });
}
