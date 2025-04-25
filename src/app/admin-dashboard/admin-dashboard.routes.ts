import { Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => AdminDashboardLayoutComponent,
    children: [
      {
        path: 'products',
        loadComponent: () => ProductAdminPageComponent,
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
