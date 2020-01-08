import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Tabla } from '../tabla';

export interface Hijo {
  nombre: string;
  monto: number;
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

// GET

GetIssue(padre: string, hijo: string, id: number): Observable<[{}]> {
  return this.http.get<[{}]>(this.baseurl + '/api/' + padre + '/' + id + '/' +  hijo)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

getList(): Observable<Tabla[]> {
  return this.http.get<Tabla[]>(this.baseurl + '/api/presupuestos')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
}

adds(tabla: Tabla, table: string): Observable<Tabla> {
  return this.http.post<Tabla>(this.baseurl + '/api/' + table.slice(0, -1), tabla, this.httpOptions);
}

adds_hijo(padre: string, hijo: string, id: number,  hjo: Hijo): Observable<Hijo> {
  return this.http.post<Hijo>(this.baseurl + '/api/' + padre + '/' + id + '/' + hijo, hjo , this.httpOptions);

}

// PUT
Update(id: number, tab: Tabla, table: string): Observable<Tabla> {
  return this.http.put<Tabla>(this.baseurl + '/api/' + table.slice(0, -1) + '/' + id, tab, this.httpOptions);
}

// DELETE
Delete(id: number, table: string) {
  return this.http.delete<Tabla>(this.baseurl + '/api/'  + table.slice(0, -1) + '/' + id, this.httpOptions);
  /*
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
  */
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
