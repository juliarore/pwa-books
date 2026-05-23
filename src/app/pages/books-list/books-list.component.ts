import { Component, OnInit, signal } from '@angular/core';
import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [BookCardComponent, LoadingSpinnerComponent],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent implements OnInit {
  books = signal<Book[]>([]);
  loading = signal(false);

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.loading.set(true);
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
