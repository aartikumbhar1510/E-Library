import { Component, OnInit } from '@angular/core';
import { Ibooks } from '../Shared/Interface/Ibooks';
import { BookService } from '../Shared/Services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  booksList: Ibooks[] | undefined;
  constructor(private _booksService :BookService) {


  }
  ngOnInit(): void {
   this.getAvailableBooks();
  }

  getAvailableBooks()
  {
    this._booksService.getAvailableBooks().subscribe(data=>{
      this.booksList=data;
      console.warn(data);
    })
  }
}
