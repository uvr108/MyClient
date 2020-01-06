import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campos } from '../campos';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface Presupuesto {
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Base url
  baseurl = 'http://localhost:3000';

 // Http Headers

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

  constructor(private http: HttpClient) { }

// POST
CreateIssue(data): Observable<{}> {
  return this.http.post<{}>(this.baseurl + '/api/presupuesto', JSON.stringify(data), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

// GET
GetIssue(table, id): Observable<[{}]> {
  return this.http.get<[{}]>(this.baseurl + '/api/presupuestos/' + id + '/items')
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

/*
GetIssues(table: string): Observable<Array<{}>> {
  return this.http.get<Array<{}>>(this.baseurl + '/api/' + table)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}
*/

getList(): Observable<Presupuesto[]> {
  return this.http.get<Presupuesto[]>(this.baseurl + '/api/presupuestos')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
}

adds(presu: Presupuesto): Observable<Presupuesto> {
  return this.http.post<Presupuesto>(this.baseurl + '/api/presupuesto', presu, this.httpOptions);
}

// PUT
UpdateIssue(id, data, table): Observable<any> {
  return this.http.put<any>(this.baseurl + '/api/presupuesto/' + id, data, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

// DELETE
DeleteIssue(id){
  return this.http.delete<Campos>(this.baseurl + '/api/' + id, this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

// Error handling
errorHandl(error) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     // Get client-side error
     errorMessage = error.error.message;
   } else {
     // Get server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   console.log(errorMessage);
   return throwError(errorMessage);
}

}
