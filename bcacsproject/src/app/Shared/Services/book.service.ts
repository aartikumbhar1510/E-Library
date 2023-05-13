import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../Interface/constant';
import { Ibooks } from '../Interface/Ibooks';
import { IStockModel } from '../Interface/IStockModel';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseURL = Constant.APIUrl;
  constructor(private _http: HttpClient) { }

  getAvailableBooks(): Observable<any[]> {
    return this._http.get<any[]>(this.baseURL + 'Books').pipe(map((data: any[]) => {
      return data;
    }))
  }

  addNewBookToLibrary(dataParam: Ibooks): Observable<Ibooks> {
    return this._http.post<Ibooks>(`${this.baseURL}Books`, dataParam).pipe(map((data: Ibooks) => {
      return data;
    }));
  }

  editBookDetails(dataParam: Ibooks) {
    return this._http.put<Ibooks>(this.baseURL + 'Books/' + dataParam.id, dataParam)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  editBookDetailsByBookId(bookid: any) {
    return this._http.get<Ibooks>(this.baseURL + 'Books/' + bookid)
      .pipe(map((data: Ibooks) => {
        return data;
      }))
  }

  deleteBookById(bookid: any) {
    return this._http.delete<any>(this.baseURL + 'Books/' + bookid)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  getAvailableBookStock(): Observable<IStockModel[]> {
    return this._http.get<IStockModel[]>(this.baseURL + 'stock').pipe(map((data: IStockModel[]) => {
      return data;
    }))
  }

  getBookById(bookid: any) {
    return this._http.get<any>(this.baseURL + 'Books/' + bookid)
      .pipe(map((data: any) => {
        return data;
      }))
  }


  updateBookStock(dataParam: Ibooks) {
    return this._http.put<Ibooks>(this.baseURL + 'Books?id=' + dataParam.id, dataParam.qty)
      .pipe(map((data: any) => {
        return data;
      }))
  }

  getAvailableBookStockByGenres(dataParam: string): Observable<IStockModel> {
    return this._http.get<IStockModel>(this.baseURL + 'stock/' + dataParam).pipe(map((data: IStockModel) => {
      return data;
    }))
  }

  getAvailableBooksStock(): Observable<IStockModel[]> {
    return this._http.get<IStockModel[]>(this.baseURL + 'stock').pipe(map((data: IStockModel[]) => {
      return data;
    }))
  }

  getStockByGenres(): Observable<any[]>{
    return this._http.get<any[]>(this.baseURL + 'Books' ).pipe(map((data: any[]) => {
      return data;
    }))
  }

  getStockByBookId(bookid:any){
    return this._http.get<any>(`${this.baseURL}Books?bookid=${bookid}`).pipe(map((data:Ibooks)=>{
      return data;
    }))
  }

  updateStock(inputParam:Ibooks){   
    return this._http.put(`${this.baseURL}Books/${inputParam.id}`, inputParam);
  }
  deleteOrder(id: number): Observable<any> {
    return this._http.delete(`${this.baseURL}Books/${id}`);
  }
}
