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
  booksListData: Ibooks[] | undefined;
  searchText!: string;
  IsAdmin :boolean = false;
  constructor(private _booksService: BookService) {


  }
  ngOnInit(): void {
    this.getAvailableBooks();
  }

  getAvailableBooks() {
    this._booksService.getAvailableBooks().subscribe(data => {
      this.booksList = data;
      this.booksListData = data;
      console.warn(data);
    })
  }

  onSearchBooks(searchValue: string) {
    this.searchText = searchValue;
    this.booksListData = this.booksList?.filter((item)=>{
      const regex = new RegExp(this.searchText,"i");
      return regex.test(item.title)||regex.test(item.author)||regex.test(item.genres);
    })
  }
}
