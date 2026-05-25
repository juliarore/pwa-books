import { Component, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '../../models/book.model';

import { BooksService } from '../../services/books.service';

import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { BooksTableComponent } from '../../shared/components/books-table/books-table.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    BookCardComponent,
    LoadingSpinnerComponent,
    MatButtonModule,
    MatIconModule,
    BooksTableComponent,
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent implements OnInit {
  books = signal<Book[]>([]);

  loading = signal(true);

  viewMode = signal<'cards' | 'table'>('cards');

  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'cards' ? 'table' : 'cards');
  }

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: (books) => {
        this.books.set(books);

        this.loading.set(false);
      },

      error: (error) => {
        console.error(error);

        this.loading.set(false);
      },
    });
  }
}
