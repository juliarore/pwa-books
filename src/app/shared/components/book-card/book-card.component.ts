import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '../../../models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  @Input() book!: Book;
  stars = Array(5);
}
