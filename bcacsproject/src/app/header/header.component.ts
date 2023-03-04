import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAdmin=true ;
  sidebarExpanded = true;
  LoggedInUser :any|undefined;
  constructor(private _rtr: Router) { }

  ngOnInit(): void {
    this.LoggedInUser = localStorage.getItem('username');
    
    console.warn(this.LoggedInUser);
  }

  onSearchBtnClick(_searchText: String) {
    console.warn(_searchText);
    if (_searchText != null) {
      alert(_searchText);
    }
  }

  Logout() {
    console.warn(this._rtr);
    this._rtr.navigate(['account/login']);
    
  }
}
