import {Injectable} from '@angular/core';
import {Part} from '../../models/part.model';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  private partsUrl = '/api/parts';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET parts from the server */
  getParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.partsUrl)
      .pipe(
        tap(() => this.log('fetched parts')),
        catchError(this.handleError('getParts', []))
      );
  }

  /** POST: add a new part to the server */
  addPart(part: Part): Observable<Part> {
    return this.http.post<Part>(this.partsUrl, part, httpOptions).pipe(
      tap(() => this.log(`added part w/ id=${part.id}`)),
      catchError(this.handleError<Part>('addPart'))
    );
  }

  /** GET part by id. Will 404 if id not found */
  getPartById(id: number): Observable<Part> {
    const url = `${this.partsUrl}/${id}`;
    return this.http.get<Part>(url)
      .pipe(
        tap(() => this.log(`fetched part id=${id}`)),
        catchError(this.handleError<Part>(`getPart id=${id}`))
      );
  }

  /** PUT: update the part on the server */
  updatePart(part: Part): Observable<any> {
    console.log('updatePart: ', part);
    console.log('updatePart/id: ', part.id);
    const url = `${this.partsUrl}/${part.id}`;
    console.log('Put URL - ', url);
    return this.http.put(url, part, httpOptions)
      .pipe(
        tap(() => this.log(`updated part id=${part.id}`)),
        catchError(this.handleError<any>('updatePart'))
      );
  }

  /** DELETE: delete the part from the server */
  removePart(part: Part | number): Observable<Part> {
    const id = typeof part === 'number' ? part : part.id;
    const url = `${this.partsUrl}/${id}`;
    return this.http.delete<Part>(url, httpOptions)
      .pipe(
        tap(() => this.log(`deleted part id=${id}`)),
        catchError(this.handleError<Part>('deletePart'))
      );
  }

  /** Log a PartService messages */
  private log(message: string) {
    console.log(`[PartService] ${message}`);
  }

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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
