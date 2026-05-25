import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterLink],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.scss',
})
export class BooksTableComponent {
  @Input() books: Book[] = [];

  displayedColumns: string[] = ['cover', 'title', 'author', 'year', 'rating'];

  stars = Array(5);
}
