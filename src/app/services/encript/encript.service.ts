import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicKey } from 'src/app/interfaces/key';
import { Flujo, FormWithOnlyFlujo, Formulario, Result } from 'src/app/interfaces/formulario';

@Injectable({
  providedIn: 'root'
})
export class EncriptService {

  private llavesUrl = 'http://localhost:3000/llaves';  // URL to web api
  private escenarioUrl = 'http://localhost:3000/escenario';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getKey(): Observable<PublicKey> {
    return this.http.get<PublicKey>(this.llavesUrl)
      .pipe(
        tap(key => console.log('key received: ', key)),
        catchError((error) => {
          console.error('Error occurred:', error);
          throw error;
        })
      );
  }

  public sendForm(formulario: Formulario): Observable<Result> {

    return this.http.post<Result>(this.escenarioUrl, formulario)
      .pipe(
        tap(_ => console.log('formulario response received')),
        catchError((error) => {
          console.error('Error occurred:', error);
          throw error;
        })
      );
  }

  public sendEscenarioInicial(): Observable<FormWithOnlyFlujo> {
    const formWithOnlyFlujo: FormWithOnlyFlujo = {
      flujo: Flujo.Inicio
    };
    return this.http.post<FormWithOnlyFlujo>(this.escenarioUrl, formWithOnlyFlujo)
      .pipe(
        tap(res => console.log('formulario received', res)),
        catchError((error) => {
          console.error('Error occurred:', error);
          throw error;
        })
      );
  }
}
