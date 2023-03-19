import { Component, OnInit } from '@angular/core';
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
  constructor(private _adservice: AdmindashboardService,
    private _booksService: BookService) {
  }

  ngOnInit(): void {
    this.loginUserRole = localStorage.getItem('role');
    if (this.loginUserRole == "admin") {
      this.IsAdmin = true;
    }
    this._adservice.getUsers().subscribe(userdata => {

      console.warn(userdata)
      if (userdata) {
        this.datalist = userdata;
      }else{
        this.datalist=[];
      }
    });

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
