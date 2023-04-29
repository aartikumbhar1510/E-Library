import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../Interface/constant';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseURL = Constant.APIUrl;
  constructor(private _http:HttpClient) { }

  getAvailableBooks():Observable<any[]>
  {
    return this._http.get<any[]>(this.baseURL+'BooksOrder').pipe(map((data:any[])=>{
      return data;
    }))
  }

  getOrderHistoryByOrderID(odrid:any){
    return this._http.get<any>(this.baseURL + 'BooksOrder/' + odrid)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  getOrderHistoryByUserID(uid: any) {
    return this._http.get<any[]>(this.baseURL + 'BooksOrder?uid=' + uid)
      .pipe(map((data: any[]) => {
        return data;
      }))
  }
}
