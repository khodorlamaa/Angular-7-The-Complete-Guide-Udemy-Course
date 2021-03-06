import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  storeServers(servers: Array<any>): Observable<any> {
    // return this.http.post('https://udemy-ng-http-96827.firebaseio.com/data.json', 
    //   servers, { headers: this.headers });

    return this.http.put('https://udemy-ng-http-96827.firebaseio.com/data.json', 
      servers, { headers: this.headers });
  }

  getServers(): Observable<any> {
    return this.http.get('https://udemy-ng-http-96827.firebaseio.com/dat')
      .pipe( map((response: Response) => {
        const data = response.json();

        for (const server of data) {
          server.name = 'FETCHED_' + server.name;
        }

        return data;
      }),
      catchError((error: Response) => {
        return throwError('Something went wrong!');
      }) );      
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-96827.firebaseio.com/data/appName.json')
      .pipe(
        map((response: Response) => {
          return response.json();
        })
      );
  }

}
