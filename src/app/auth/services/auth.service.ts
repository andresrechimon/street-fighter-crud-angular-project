import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe, tap, of } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth:Auth | undefined;
  get auth():Auth{
    return {...this._auth!};
  }
  constructor(private http:HttpClient){}

  checkAuth():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`http://localhost:3000/usuarios/1`)
          .pipe(
            map(auth => {
              this._auth = auth;
              return true;
            })
          );
  }

  login(){
    return this.http.get<Auth>(`http://localhost:3000/usuarios/1`)
               .pipe(
                tap(auth => this._auth = auth),
                tap(auth => localStorage.setItem('token', auth.id))
               )
  }


}
