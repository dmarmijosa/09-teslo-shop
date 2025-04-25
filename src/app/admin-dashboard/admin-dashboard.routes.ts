import { Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';
import { ProductsAdminPageComponent } from './pages/products-admin-page/products-admin-page.component';
import { isAdminGuard } from '@auth/guards/is-admin.guard';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => AdminDashboardLayoutComponent,
    canMatch: [isAdminGuard],
    children: [
      {
        path: 'products',
        loadComponent: () => ProductsAdminPageComponent,
      },
      {
        path: 'products/:id',
        loadComponent: () => ProductAdminPageComponent,
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

export default adminDashboardRoutes;
