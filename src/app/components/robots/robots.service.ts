import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {catchError, tap} from 'rxjs/operators';
import {Robot} from '../../models/robot.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RobotsService {

  private robotsUrl = '/api/robots';  // URL to web api
  lastId: number;

  constructor(private http: HttpClient) {
  }

  /** GET robots from the server */
  getRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.robotsUrl)
      .pipe(
        tap(() => this.log('fetched robots')),
        catchError(this.handleError('getRobots', []))
      );
  }

  /** POST: add a new robot to the server */
  addRobot(robot: Robot): Observable<Robot> {
    return this.http.post<Robot>(this.robotsUrl, robot, httpOptions)
      .pipe(
        tap(() => this.log(`added robot w/ id=${robot.id}`)),
        catchError(this.handleError<Robot>('addRobot'))
      );
  }

  /** GET robot by id. Will 404 if id not found */
  getRobotById(id: number): Observable<Robot> {
    const url = `${this.robotsUrl}/${id}`;
    return this.http.get<Robot>(url)
      .pipe(
        tap(() => this.log(`fetched robot id=${id}`)),
        catchError(this.handleError<Robot>(`getRobot id=${id}`))
      );
  }

  /** PUT: update the robot on the server */
  updateRobot(robot: Robot): Observable<any> {
    const url = `${this.robotsUrl}/${robot.id}`;
    return this.http.put(url, robot, httpOptions)
      .pipe(
        tap(() => this.log(`updated robot id=${robot.id}`)),
        catchError(this.handleError<any>('updateRobot'))
      );
  }

  /** DELETE: delete the robot from the server */
  deleteRobot(robot: Robot | number): Observable<Robot> {
    const id = typeof robot === 'number' ? robot : robot.id;
    const url = `${this.robotsUrl}/${id}`;
    return this.http.delete<Robot>(url, httpOptions)
      .pipe(
        tap(() => this.log(`deleted robot id=${id}`)),
        catchError(this.handleError<Robot>('deleteRobot'))
      );
  }

  /** Log a RobotService messages */
  private log(message: string) {
    console.log(`[RobotService] ${message}`);
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
