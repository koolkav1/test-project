import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: 'search-cities',
    loadComponent: () => import('./autocomplete/autocomplete.component').then(m => m.AutocompleteComponent)
  },
  {
    path: 'home', component: HomeComponent
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },


];
