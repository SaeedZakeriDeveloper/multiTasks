import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { IContact } from '../interfaces/IContact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  URL: string = "http://localhost:3000/contacts"
  
  getAllUsers(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.URL)
  }

  getUserById(id: number): Observable<IContact> {
    return this.http.get<IContact>(this.URL + "/" + id)
  }

  add(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.URL, contact)
  }

  upDate(contact: IContact): Observable<IContact> {
    return this.http.put<IContact>(this.URL + "/" + contact.id, contact)
  }

  remove(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.URL  + "/" + id)
  }
}
