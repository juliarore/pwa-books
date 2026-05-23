import { Routes } from '@angular/router';

import { BooksDetailComponent } from './pages/books-detail/books-detail.component';
import { BooksListComponent } from './pages/books-list/books-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    component: BooksListComponent,
  },
  {
    path: 'books/:id',
    component: BooksDetailComponent,
  },
];
