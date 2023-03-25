import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constant } from '../Interface/constant';
import { Ibooks } from '../Interface/Ibooks';

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
    return this._http.post<Ibooks>(this.baseURL + 'Books', dataParam).pipe(map((data: Ibooks) => {
      return data;
    }));
  }

  editBookDetails(dataParam: Ibooks, bookid: any) {
    return this._http.put<Ibooks>(this.baseURL + 'Books/' + bookid, dataParam)
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
}
