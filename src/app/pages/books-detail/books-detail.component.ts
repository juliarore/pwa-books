import { Component, OnInit, signal } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '../../models/book.model';

import { BooksService } from '../../services/books.service';

import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-books-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './books-detail.component.html',
  styleUrl: './books-detail.component.scss',
})
export class BooksDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
  ) {}

  book = signal<Book | null>(null);

  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.booksService.getBookById(id).subscribe({
        next: (book) => {
          this.book.set(book);

          this.loading.set(false);
        },

        error: (err) => {
          console.error(err);

          this.loading.set(false);
        },
      });
    } else {
      this.loading.set(false);
    }
  }
}
