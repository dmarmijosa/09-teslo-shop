import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { Product } from '@products/interfaces/product.interface';
import { FormUtils } from '@shared/utils/forms-utils';

import { ProductService } from '@products/services/product.service';
import { FormErrorLabelComponent } from '@shared/components/form-error-label/form-error-label.component';

@Component({
  selector: 'product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
    FormErrorLabelComponent,
  ],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  productService = inject(ProductService);
  product = input.required<Product>();
  isLoading = signal(false);
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  ngOnInit() {
    //this.productForm.reset(this.product() as any);
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(formLike as any);
    //this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  onSizeClick(size: string) {
    const currentSizes = this.productForm.get('sizes')?.value ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }
    this.productForm.patchValue({ sizes: currentSizes });
  }

  onSubmit() {
    const isValid = this.productForm.valid;
    const formValue = this.productForm.value;

    this.productForm.markAllAsTouched();
    if (!isValid) return;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags
        ?.toLowerCase()
        .split(',')
        .map((tag: string) => tag.trim() ?? []),
    };

    this.isLoading.set(true);
    this.productService
      .updateProduct(this.product().id, productLike)
      .subscribe({
        next: (product) => {
          console.log('Product updated', product);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
  }
}
