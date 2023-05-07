import { Component, OnInit } from '@angular/core';
import { Ibooks } from '../Shared/Interface/Ibooks';
import { BookService } from '../Shared/Services/book.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../Shared/Services/login.service';
import { ILoginInfo } from '../Shared/Interface/ILoginInfo';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { Constant } from '../Shared/Interface/constant';
import { OrderService } from '../Shared/Services/order.service';
import { Router } from '@angular/router';
import { IStockModel } from '../Shared/Interface/IStockModel';
import { ToastrService } from 'ngx-toastr';

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
  viewBookData: Ibooks = new Ibooks();
  OrderFrm!: FormGroup;
  loggedInUserId: any;
  loggedInUsername: any;
  OrderFormData: IorderDetails = new IorderDetails();
  lastUpdatedorderCount: number = 0;
  stockData: Ibooks = new Ibooks();
  selectedCurrentRecord: any;
  availableStock: Ibooks[] | undefined;
  latestStock!: Ibooks[] | undefined;
  defaultGrenes: string = 'Finance';
  stockCount: number = 0;
  constructor(private _booksService: BookService, private _fb: FormBuilder,
    private _loginService: LoginService, private _orderService: OrderService, private _rtr: Router
   ) {


  }
  ngOnInit(): void {
    this.loggedInUserId = localStorage.getItem('uid');

    this.BookOrderFrm = this._fb.group({
      bookid: [''],
      title: [''],
      author: [''],
      edition: [''],
      genres: [''],
      qty: [''],
      status: ['']
    });
    this.getLoggedInUsername(this.loggedInUserId);
    this.getLastUpdatedOrderCount();
    this.resetFormValues();
    this.getAvailableBooks();
    this.getStockByGenres();
   // this.showToasterSuccess();

  }

  getStockByGenres() {
    this._booksService.getStockByGenres().subscribe((data: Ibooks[]) => {
      this.availableStock = data;
    })
  }

  getLoggedInUsername(unsername: any) {
    this._loginService.getUserById(unsername).subscribe((data: ILoginInfo[]) => {
      this.loggedInUsername = data[0].name;

    })
  }
  getAvailableBooks() {
    this._booksService.getAvailableBooks().subscribe(data => {
      this.booksList = data;
      this.booksListData = data;

    })
  }

  getLastUpdatedOrderCount() {
    this._orderService.getTotalOrderCount().subscribe((data: any[]) => {
      this.lastUpdatedorderCount = data.length;
    })
  };




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

  onOrderBookAction(book: any) {
    this.selectedCurrentRecord = book;
    this.OrderFrm.controls['studentName'].setValue(this.loggedInUsername);
    this.OrderFrm.controls['bookName'].setValue(book.title);
    this.OrderFrm.controls['author'].setValue(book.author);
    this.OrderFrm.controls['uid'].setValue(Number(this.loggedInUserId));
    this.OrderFrm.controls['bookid'].setValue(book.bookid);
  }

  onOrderPlaceAction() {
    let todyasDate = new Date();
    this.OrderFormData.id = this.lastUpdatedorderCount + 1;    
    this.OrderFormData.bookid = this.OrderFrm.value.bookid;
    this.OrderFormData.uid = this.OrderFrm.value.uid;
    this.OrderFormData.studentName = this.OrderFrm.value.studentName;
    this.OrderFormData.bookName = this.OrderFrm.value.bookName;
    this.OrderFormData.orderId= this.OrderFormData.bookName.substring(0,3).toUpperCase()+Math.floor(Math.random() * 1000) + 1;
 
    this.OrderFormData.author = this.OrderFrm.value.author;
    this.OrderFormData.qty = Number(this.OrderFrm.value.qty);
    this.OrderFormData.status = Constant.CREATED
    this.OrderFormData.remark = Constant.DEFAULTCMT;
    this.OrderFormData.issueDate = new Date();
    this.OrderFormData.submittedDate = new Date(todyasDate.setDate(todyasDate.getDate() + 7));

    console.warn(this.OrderFormData)
    this._orderService.placeNewOrder(this.OrderFormData).subscribe((data: any) => {
      if (data) {
        this.resetFormValues();
        this.closeAndRedirect();        
      }
    })

  }

  resetFormValues() {
    this.OrderFrm = this._fb.group({
      id: [''],
      uid: [''],
      bookid: [''],
      studentName: [''],
      bookName: [''],
      author: [''],
      qty: [''],
      status: [''],
      remark: [''],
      issueDate: [''],
      submittedDate: [''],
      orderId:[]
    });
  }

  closeAndRedirect() {

    this._rtr.navigate(['/order-history']);
  }

 
}
