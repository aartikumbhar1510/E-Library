import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../Interface/constant';

@Injectable({
  providedIn: 'root'
})
export class BookService {
baseURL = Constant.APIUrl;
  constructor(private _http:HttpClient) { }

  getAvailableBooks():Observable<any[]>
  {
    return this._http.get<any[]>(this.baseURL+'Books').pipe(map((data:any[])=>{
      return data;
    }))
  }
}
