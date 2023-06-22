import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Result } from 'src/app/interfaces/formulario';
import { PublicKey } from 'src/app/interfaces/key';
import { PublicKeyExample } from 'src/app/keys/public.key';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private aceptarSubject: Subject<void> = new Subject<void>();
  private publicKey: PublicKey = PublicKeyExample;
  private result: Result = {
    exitoso: false,
    mensaje: ''
  }

  constructor() { }

  public setPublicKey(publicKey: PublicKey) {
    this.publicKey = publicKey;
  }

  public getPublicKey(): PublicKey {
    return this.publicKey;
  }

  public setResult(result: Result) {
    this.result = result;
  }

  public getResult(): Result {
    return this.result;
  }

  public aceptar(): void {
    this.aceptarSubject.next();
  }

  public onAceptar(): Observable<void> {
    return this.aceptarSubject.asObservable();
  }

}
