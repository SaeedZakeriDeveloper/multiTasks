import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/tasks/task2/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }
  URL: string = "https://jsonplaceholder.typicode.com/users"

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.URL)
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.URL + "/" + id)
  }

  add(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.URL, user)
  }

  upDate(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.URL + "/"  + user.id, user)
  }

  remove(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.URL + "/" + id);
  }

}
