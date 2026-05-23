import { Component, inject, OnInit, signal } from '@angular/core';

import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent implements OnInit {
  private booksService = inject(BooksService);

  books = signal<Book[]>([]);

  ngOnInit(): void {
    this.booksService.getBooks().subscribe({
      next: (books) => {
        this.books.set(books);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
