import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IStockModel } from 'src/app/Shared/Interface/IStockModel';
import { Ibooks } from 'src/app/Shared/Interface/Ibooks';
import { AdmindashboardService } from 'src/app/Shared/Services/admindashboard.service';
import { BookService } from 'src/app/Shared/Services/book.service';


//const { exec } = require('child_process');
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;

  booksList: Ibooks[] | undefined;
  booksListData?: Ibooks[] | undefined;
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

  // sorting implementation
  title = "title";
  order = "desc";
  dateType = "string";

  stockModel: IStockModel[] | undefined;
  stockModelData: IStockModel = new IStockModel();
  viewBookData: Ibooks = new Ibooks();
  constructor(private _adservice: AdmindashboardService,
    private _booksService: BookService,
    private _fb: FormBuilder, private _rtr: Router, private _actRoute: ActivatedRoute) {
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

  OnAddBookAction() {
    this.IBookData.id = this.lastUpdatedCount + 1;
    this.IBookData.bookid = this.IBookData.id + 1;
    this.IBookData.title = this.frmBook.value.title;
    this.IBookData.author = this.frmBook.value.author;
    this.IBookData.edition = this.frmBook.value.edition;
    this.IBookData.genres = this.frmBook.value.genres;
    this.IBookData.qty =Number( this.frmBook.value.qty);
    this.IBookData.status = this.frmBook.value.status;

    this._booksService.addNewBookToLibrary(this.IBookData).subscribe(data => {
      if (data) {

        this.closeAndRedirect();        
        this.getAvailableBooks();

      }

    })

    console.warn(this.IBookData);
    console.warn(this.stockModel);

  }
  onAddNewClk() {
    this.isShow = true;
    this.isEdit = false;
  }
  onEditClk() {
    this.isShow = false;
    this.isEdit = true;
  }

  onEditBook(book: any) {
    this.isShow = false;
    this.isEdit = true;
    this.frmBook.controls['bookid'].setValue(book.bookid);
    this.frmBook.controls['title'].setValue(book.title);
    this.frmBook.controls['author'].setValue(book.author);
    this.frmBook.controls['edition'].setValue(book.edition);
    this.frmBook.controls['genres'].setValue(book.genres);
    this.frmBook.controls['qty'].setValue(book.qty);
    this.frmBook.controls['status'].setValue(book.status);

  }

  onUpdateAction() {

    this.IBookData.bookid = this.frmBook.value.bookid;
    this.IBookData.title = this.frmBook.value.title;
    this.IBookData.author = this.frmBook.value.author;
    this.IBookData.edition = this.frmBook.value.edition;
    this.IBookData.genres = this.frmBook.value.genres;
    this.IBookData.qty = Number(this.frmBook.value.qty);
    this.IBookData.status = this.frmBook.value.status;

    this._booksService.editBookDetails(this.IBookData, this.IBookData.bookid).subscribe(data => {
      if (data) {

        this.closebutton.nativeElement.click();       
        this.closeAndRedirect();
        this.getAvailableBooks();
      }

    })


  }


  closeAndRedirect() {
    this.resetForAndClearData();
    this._rtr.navigate(['/admin-dashboard']);
  }



  onViewDetailAction(selectedRowData: any) {
    this.viewBookData = selectedRowData;
    console.warn(this.viewBookData)

  }

  onDeleteAction(selectedRowData: any) {
    this._booksService.deleteOrder(selectedRowData.id).subscribe(data => {
      if (data) {

        this.closeAndRedirect();
        this.getAvailableBooks();
      }
    })
  }

  resetForAndClearData(){
    this.frmBook = this._fb.group({
      bookid: [''],
      title: [''],
      author: [''],
      edition: [''],
      genres: [''],
      qty: [''],
      status: ['']
    });
  }

}
