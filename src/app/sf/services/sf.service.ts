import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sf } from '../interfaces/sf.interface';

@Injectable({
  providedIn: 'root'
})
export class SfService {

  constructor(private http:HttpClient) { }

  getSf(){
    return this.http.get<Sf[]>('http://localhost:3000/sf')
  }

  getSfById(id:string):Observable<Sf>{
    return this.http.get<Sf>(`http://localhost:3000/sf/${id}`)
  }

  getSugerences(term:string):Observable<Sf[]>{
    return this.http.get<Sf[]>(`http://localhost:3000/sf?q=${term}&_limit=5`)
  }

  addSf(sfChar:Sf):Observable<Sf>{
    return this.http.post<Sf>(`http://localhost:3000/sf/`, sfChar)
  }

  updateSf(sfChar:Sf):Observable<Sf>{
    return this.http.put<Sf>(`http://localhost:3000/sf/${sfChar.id}`, sfChar)
  }

  deleteSf(id:string):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/sf/${id}`)
  }
}
