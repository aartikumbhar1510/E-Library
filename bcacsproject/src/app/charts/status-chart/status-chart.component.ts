import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js'
import { IStockModel } from 'src/app/Shared/Interface/IStockModel';
import { BookService } from 'src/app/Shared/Services/book.service';
import { OrderService } from 'src/app/Shared/Services/order.service';

@Component({
  selector: 'app-status-chart',
  templateUrl: './status-chart.component.html',
  styleUrls: ['./status-chart.component.scss']
})
export class StatusChartComponent implements OnInit {


  technologyCount?: IStockModel[];
  financeCount?: IStockModel[];
  geoCount?: IStockModel[];
  historyCount?: IStockModel[];

  booktechnologyCount: any = [];
  bookfinanceCount: any = [];
  bookgeoCount: any = [];
  bookhistoryCount: any = [];

  btCount: number = 0;
  bfCount: number = 0;
  bgCount: number = 0;
  bhCount: number = 0;

  ctx: any;
  config: any;

  piectx: any;
  pieconfig: any;
  chartData: number[] = [];

  // order section
  createdList: number = 0;
  approvedList: number = 0;
  rejectedList: number = 0;

  //onchange chart type
  chartTypeSelection:string='doughnut';
  

  constructor(private _bookService: BookService, private _orderService: OrderService) {

  }

  ngOnInit(): void {
    this.drawDoughnutChart(this.chartTypeSelection);
    this.drawPieChart(this.chartTypeSelection);

  }

 
  onBookStockSelectChange(stockChartType: string) {
    this.chartTypeSelection = stockChartType;
    //this.drawDoughnutChart(this.chartTypeSelection);
    //this.drawPieChart(this.chartTypeSelection);
  }

 

  drawDoughnutChart(chartType :string) {
    this.piectx = document.getElementById('mychart');
    this._bookService.getAvailableBookStock().subscribe(result => {


      this.technologyCount = result.filter(x => x.genres == 'Technology');
      this.booktechnologyCount = this.technologyCount.map(x => x.stock);
      this.btCount = this.booktechnologyCount[0];

      this.financeCount = result.filter(x => x.genres == 'Finance');
      this.bookfinanceCount = this.financeCount.map(x => x.stock);
      this.bfCount = this.bookfinanceCount[0];


      this.geoCount = result.filter(x => x.genres == 'Geo');
      this.bookgeoCount = this.geoCount.map(x => x.stock);
      this.bgCount = this.bookgeoCount[0];

      this.historyCount = result.filter(x => x.genres == 'History');
      this.bookhistoryCount = this.historyCount.map(x => x.stock);
      this.bhCount = this.bookhistoryCount[0];



   


    const data = {
      labels: ['Technology', 'Finance', 'Geo', 'History'],
      datasets: [
        {
          label: 'Book Stock',
          data: [this.btCount, this.bfCount, this.bgCount, this.bhCount],
          backgroundColor: ['#ff3f34', '#1dd1a1', '#ffd32a', 'blue'],
        }
      ]
    };

    this.pieconfig = {
      type: chartType,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',display:true
          },
          title: {
            display: true,
            text: 'Available Book Stock',
            align: 'center'
          }
        }
      },
    };
    const mychart = new Chart(this.piectx, this.pieconfig);
  })
  }




  drawPieChart(orderChartType :string) {
    this.ctx = document.getElementById('mychart1');

    this._orderService.getAvailableBooks().subscribe(result => {

      this.createdList = result.filter(x => x.status == "Created").length;
      this.approvedList = result.filter(x => x.status == "Approved").length;
      this.rejectedList = result.filter(x => x.status == "Rejected").length;

      const data = {
        labels: ['Created', 'Approved', 'Rejected'],
        datasets: [
          {
            label: 'Book Order',
            data: [this.createdList, this.approvedList, this.rejectedList],
            backgroundColor: ['#ffd32a', '#1dd1a1', '#ff3f34'],
          }
        ]
      };

      this.config = {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',display:false
            },
            title: {
              display: true,
              text: 'Student Order Status',
              align: 'center'
            }
          }
        },
      };
      const mychart1 = new Chart(this.ctx, this.config);
    })
  }









}
