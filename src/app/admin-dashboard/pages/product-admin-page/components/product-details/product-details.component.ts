import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { Product } from '@products/interfaces/product.interface';
import { FormUtils } from '@shared/utils/forms-utils';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  product = input.required<Product>();
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  fb = inject(FormBuilder);

  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)],
    ],
    price: ['', [Validators.required, Validators.min(0)]],
    stock: ['', [Validators.required, Validators.min(0)]],
    size: [['']],
    images: [[]],
    tags: [''],
    gener: [
      'men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)],
    ],
  });

  ngOnInit() {
    //this.productForm.reset(this.product() as any);
    this.setFormValue(this.product());

  }

  setFormValue(formLike: Partial<Product>){
    this.productForm.reset(formLike as any);
    //this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({tags: formLike.tags?.join(',')});
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
