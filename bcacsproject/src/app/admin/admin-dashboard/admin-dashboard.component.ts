import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Ibooks } from 'src/app/Shared/Interface/Ibooks';
import { AdmindashboardService } from 'src/app/Shared/Services/admindashboard.service';
import { BookService } from 'src/app/Shared/Services/book.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  booksList: Ibooks[] | undefined;
  booksListData: Ibooks[] | undefined;
  searchText!: string;
  loginUserRole: any;
  datalist!: any[];
  IsAdmin = false;
  IBookData: Ibooks = new Ibooks();
  lastUpdatedCount!: number;

  // form for adding new book
  frmBook!: FormGroup;
  isShow: boolean = true;
  isEdit: boolean = false;
  constructor(private _adservice: AdmindashboardService,
    private _booksService: BookService,
    private _fb: FormBuilder,private _rtr:Router,private _actRoute :ActivatedRoute) {
  }

  ngOnInit(): void {


    this.frmBook = this._fb.group({
      bookid: [''],
      title: [''],
      author: [''],
      edition: [''],
      genres: [''],
      qty: [''],
      status: ['']
    });


    this.loginUserRole = localStorage.getItem('role');
    if (this.loginUserRole == "admin") {
      this.IsAdmin = true;
    }

    this.getAvailableBooks();


  }

  getAvailableBooks() {
    this._booksService.getAvailableBooks().subscribe(data => {
      this.booksList = data;
      this.booksListData = data;
      this.lastUpdatedCount = data.length;
    })
  }

  onSearchBooks(searchValue: string) {
    this.searchText = searchValue;
    this.booksListData = this.booksList?.filter((item) => {
      const regex = new RegExp(this.searchText, "i");
      return regex.test(item.title) || regex.test(item.author) || regex.test(item.genres) || regex.test(item.status);
    })
  }

  OnAddBookClk() {
    this.IBookData.id = this.lastUpdatedCount + 1;
    this.IBookData.bookid = this.lastUpdatedCount + 1;
    this.IBookData.title = this.frmBook.value.title;
    this.IBookData.author = this.frmBook.value.author;
    this.IBookData.edition = this.frmBook.value.edition;
    this.IBookData.genres = this.frmBook.value.genres;
    this.IBookData.qty = this.frmBook.value.qty;
    this.IBookData.status = this.frmBook.value.status;

    this._booksService.addNewBookToLibrary(this.IBookData).subscribe(data => {
      this.getAvailableBooks();
      this.frmBook.reset();
      this.closeAndRedirect();
    })

    console.warn(this.IBookData);

  }
  onAddNewClk() {
    this.isShow = true;
    this.isEdit = false;
  }
  onEditClk() {
    this.isShow = false;
    this.isEdit = true;
  }
  OnEditBookDetailsClk() {

  }
  closeAndRedirect()
  {
    this._rtr.navigate(['/admin-dashboard']);
  }
}
