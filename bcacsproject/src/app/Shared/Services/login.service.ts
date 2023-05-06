import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = "http://localhost:3000/user";
  constructor(private _http: HttpClient) { }


  createuser(data: any) {
    return this._http.post<any>(this.apiUrl, data).pipe(map((res: any) => {
      return res;
    }))
  }

  getUsers() {
    return this._http.get<any>(this.apiUrl).pipe(map((result: any) => {
      return result;
    }));
  }

  getUserById(id :any) {
    return this._http.get<any[]>(this.apiUrl+'?id='+id).pipe(map((result: any[]) => {
      return result;
    }));
  }
}
