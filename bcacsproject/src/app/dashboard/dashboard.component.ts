import { Component, OnInit } from '@angular/core';
import { Ibooks } from '../Shared/Interface/Ibooks';
import { BookService } from '../Shared/Services/book.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  booksList: Ibooks[] | undefined;
  booksListData: Ibooks[] | undefined;
  searchText!: string;
  IsAdmin: boolean = false;
  BookOrderFrm!: FormGroup;
  isShow: boolean = true;
  isEdit: boolean = false;
  viewBookData : Ibooks= new Ibooks();
  OrderFrm! :FormGroup;
  constructor(private _booksService: BookService, private _fb: FormBuilder) {


  }
  ngOnInit(): void {
    this.BookOrderFrm = this._fb.group({
      bookid: [''],
      title: [''],
      author: [''],
      edition: [''],
      genres: [''],
      qty: [''],
      status: ['']
    });

    this.resetFormValues();
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
    this.booksListData = this.booksList?.filter((item) => {
      const regex = new RegExp(this.searchText, "i");
      return regex.test(item.title) || regex.test(item.author) || regex.test(item.genres);
    })
  }

  onViewBookDeatils(book: any) {
    this.viewBookData = book;    
  }

  onOrderBookAction(book : any){
    this.OrderFrm.controls['bookName'].setValue(book.title);
    this.OrderFrm.controls['author'].setValue(book.author);
    this.OrderFrm.controls['bookid'].setValue(book.bookid);
    this.OrderFrm.controls['bookid'].setValue(book.bookid);
    console.warn(book)
  }


  resetFormValues(){
    this.OrderFrm= this._fb.group({
      odrid: [''],
      uid: [''],
      bookid: [''],
      studentName: [''],
      bookName: [''],
      author: [''],
      qty: [''],
      status: [''],
      issueDate: [''],
      submittedDate: [''],
    });
  }
}
