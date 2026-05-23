import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { API } from '../api/api.constants';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http
      .get<any>(
        `${API.BASE_URL}${API.SEARCH_BOOKS}?q=brandon+sanderson&limit=20`,
      )
      .pipe(
        map((response) =>
          response.docs.map((book: any) => ({
            id: book.key.split('/').pop(),
            title: book.title,
            author: book.author_name?.[0] || 'Unknown',
            cover: book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : 'https://via.placeholder.com/300x450',
            year: book.first_publish_year || 0,
            genre: book.subject?.[0] || 'Unknown',
            rating: Math.floor(Math.random() * 5) + 1,
          })),
        ),
      );
  }
}
