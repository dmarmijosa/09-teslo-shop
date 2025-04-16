import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenderPageComponent } from './pages/gender-page/gender-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => HomePageComponent,
      },
      {
        path: 'gender/:gender',
        loadComponent: () => GenderPageComponent,
      },
      {
        path: 'product/:idSlug',
        loadComponent: () => ProductPageComponent,
      },
      {
        path: '**',
        loadComponent: () => NotFoundPageComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
export default storeFrontRoutes;
