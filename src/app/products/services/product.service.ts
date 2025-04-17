import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ProductResponse } from '@products/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const baseUrl = environment.baseUrl;
interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;
    return this.http.get<ProductResponse>(`${baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender,
      },
    });
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
  }
}
