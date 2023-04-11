import { Route } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Route[] = [
  {
    title: 'Home',
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./app.component').then(m => m.AppComponent)
  }
]