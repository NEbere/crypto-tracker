import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
// import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// import { User } from './user';
// import { Inventory } from './inventory'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class APIUtilService {

  private baseUrl = 'http://localhost:5000';  // Users URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET products from the server */
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`)
      .pipe(
        tap(products => console.log(products, `fetched products`)),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProductPrices(productId): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${productId}/prices`)
      .pipe(
        tap(product => console.log(product, `fetched product`)),
        catchError(this.handleError('getProductPrices', []))
      );
  }


  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl)
  //     .pipe(
  //       tap(users => console.log(`fetched users`)),
  //       catchError(this.handleError('getUsers', []))
  //     );
  // }

  /** GET user by id. Return `undefined` when id not found */
  // getUserNo404<Data>(id: number): Observable<User> {
  //   const url = `${this.usersUrl}/?id=${id}`;
  //   return this.http.get<User[]>(url)
  //     .pipe(
  //       map(users => users[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         console.log(`${outcome} hero id=${id}`);
  //       }),
  //       catchError(this.handleError<User>(`getUser id=${id}`))
  //     );
  // }

  /** GET user by id. Will 404 if id not found */
  // getUser(id: number): Observable<User> {
  //   const url = `${this.usersUrl}/${id}`;
  //   return this.http.get<User>(url).pipe(
  //     tap(_ => console.log(`fetched user id=${id}`)),
  //     catchError(this.handleError<User>(`getUser id=${id}`))
  //   );
  // }

  //////// Save methods //////////

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}