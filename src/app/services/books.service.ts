import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { API } from '../api/api.constants';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  private getStableRating(id: string): number {
    /*
    NOTA: L'API d'OpenLibrary no proporciona una puntuació (rating) dels llibres, així que hem generat una manualment per poder mostrar-la a la interfície.
    Inicialment es va utilitzar Math.random(), però això feia que el valor canviés cada vegada que es navegava entre la llista i el detall del llibre.
    Per evitar aquest comportament, s'ha implementat una funció pseudo-hash que genera un valor fix a partir de l'identificador únic (id) del llibre.
    La funció recorre els caràcters de l'id i aplica operacions matemàtiques per obtenir un número entre 1 i 5. D'aquesta manera, cada llibre manté sempre la mateixa puntuació independentment de la vista o la navegació dins l'aplicació.
    */
    let hash = 0;

    for (const char of id) {
      hash = (hash * 31 + char.charCodeAt(0)) % 5;
    }

    return hash + 1;
  }

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
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : 'https://via.placeholder.com/300x450',
            year: book.first_publish_year || 0,
            language:
              book.language?.map((l: string) => l.toUpperCase()).join(', ') ||
              'ENG',
            rating: this.getStableRating(book.key),
          })),
        ),
      );
  }

  getBookById(id: string): Observable<Book | null> {
    return this.getBooks().pipe(
      map((books) => books.find((book) => book.id === id) || null),
    );
  }
}
