import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../Interface/constant';
import { IorderDetails } from '../Interface/IorderDetails';

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

  getTotalOrderCount(){
    return this._http.get<any[]>(this.baseURL+'BooksOrder').pipe(map((data:any[])=>{
      return data;
    }))
  }

  placeNewOrder(inputParam:IorderDetails){
    return this._http.post<any>(this.baseURL+'BooksOrder', inputParam)
  }

  updateOrder(inputParam:IorderDetails){   
    return this._http.put(`${this.baseURL}BooksOrder/${inputParam.id}`, inputParam);
  }
  deleteOrder(id: number): Observable<any> {
    return this._http.delete(`${this.baseURL}BooksOrder/${id}`);
  }

  createDueEntry(inputParam :any){
    return this._http.post<any>(this.baseURL+'studentDue', inputParam)
  }


  getDueOrderHistoryByUserID(uid: any) {
    return this._http.get<any[]>(this.baseURL + 'studentDue?uid=' + uid)
      .pipe(map((data: any[]) => {
        return data;
      }))
  }

  deletePaidOrder(id: number): Observable<any> {
    return this._http.delete(`${this.baseURL}studentDue/${id}`);
  }

}
