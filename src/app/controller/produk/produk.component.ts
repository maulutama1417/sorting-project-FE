import { Component, OnInit } from '@angular/core';
import { ProdukService } from 'src/app/_service/_produkservice/produk.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.component.html',
  styleUrls: ['./produk.component.css']
})
export class ProdukComponent implements OnInit {

  data : any[] = [];
  paging: number = 5;
  maxPage: number;
  page: number = 0;
  dataTemp: any [] = []
  eventsTemp: any[] = [];

  constructor(
    private produkService : ProdukService,
    private dp : DatePipe,
  ) { }

  ngOnInit(): void {
    this.produkService.findAll().subscribe(output => {
      let hasil = output.json();
      this.dataTemp=hasil.item;
      this.setPage();
    })
  }

  setPage(page = 0, paging=this.paging) {
    this.data=[];
    this.maxPage = this.dataTemp.length/paging;
    this.maxPage = (this.dataTemp.length%paging) == 0? Math.round(this.maxPage) :  Math.round(this.maxPage) + 1;
    if (this.dataTemp.length == 0) {
      this.page = 0;
      this.maxPage = 0
    } else {
      if (page==1){
        this.page++;
      } else if (page==-1) {
        this.page--;
      }
      // let items : any[] = [];
      if ((this.dataTemp.length - (this.page*paging)) < paging) {
        console.log((this.page * paging) + (this.dataTemp.length%paging));
        for (let i = (this.page * paging); i < (this.page * paging) + (this.dataTemp.length%paging); i++) {
          this.data.push(this.dataTemp[i]);
        }
      } else {
        for (let i = this.page * paging; i < (this.page +1) * paging; i++) {
          this.data.push(this.dataTemp[i]);
        }
      }
    }
  }

  setPaging (inp) {
    this.page = 0;
    this.paging = inp;
    this.setPage()
  }

  onDetailPage(item) {
    this.produkService.produkDetail = item;
    console.log(JSON.stringify(item))
  }

}
