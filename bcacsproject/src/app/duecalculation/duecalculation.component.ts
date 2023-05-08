import { Component, OnInit } from '@angular/core';
import { IorderDetails } from '../Shared/Interface/IorderDetails';
import { OrderService } from '../Shared/Services/order.service';
import { Constant } from '../Shared/Interface/constant';

@Component({
  selector: 'app-duecalculation',
  templateUrl: './duecalculation.component.html',
  styleUrls: ['./duecalculation.component.scss']
})
export class DuecalculationComponent implements OnInit {

duecalaulationList:IorderDetails[]|undefined;
searchText :string='';
statusChangeValue:string='';
datalist!:IorderDetails[];
loginUserId:any;

constructor(private _orderService:OrderService) {
  
}

ngOnInit(): void {
  this.loginUserId = localStorage.getItem('uid');
  this.getOrderHistoryByUserID();
}

getOrderHistoryByUserID() {

  this._orderService.getDueOrderHistoryByUserID(this.loginUserId).subscribe((data: any[]) => {
    if (data) {
      this.datalist = data.filter(x => x.status == Constant.UNPAID || x.status == Constant.PAID );
      this.duecalaulationList = data.filter(x => x.status == Constant.UNPAID || x.status == Constant.PAID);
    
    } else {
      this.datalist = [];
    }
  })
}

onDueSearch(searchString :string){
  this.searchText = searchString;
  this.duecalaulationList = this.datalist?.filter((item) => {
    const regex = new RegExp(this.searchText, "i");
    return regex.test(item.studentName) || regex.test(item.bookName) || regex.test(item.author) || regex.test(item.status);
  })
}

onStatusChange(statusValue: string) {
  if (statusValue === Constant.PAID) {
    return this.statusChangeValue = "badge bg-warning";
  } else  {
    return this.statusChangeValue = "badge bg-danger";
  } 
}
}
