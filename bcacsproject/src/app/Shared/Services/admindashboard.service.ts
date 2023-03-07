import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {
  apiUrl = "http://localhost:3000/user";
  constructor(private _http: HttpClient) { }


 

  getUsers() {
    return this._http.get<any>(this.apiUrl).pipe(map((result: any) => {
      return result;
    }));

  }
}
