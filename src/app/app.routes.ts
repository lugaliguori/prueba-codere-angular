import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'show/:id',
    loadComponent: () => import('./pages/show-info-page/show-info-page.page').then( m => m.ShowInfoPagePage)
  },
];
