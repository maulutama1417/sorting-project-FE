import { Component, OnInit, ViewChild } from '@angular/core';
import { AlatService } from 'src/app/_service/_alatservice/alat.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/_service/_common/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-alat',
  templateUrl: './detail-alat.component.html',
  styleUrls: ['./detail-alat.component.css']
})
export class DetailAlatComponent implements OnInit {

  data : any[] = [];
  paging: number = 5;
  maxPage: number;
  page: number = 0;
  dataTemp: any [] = []
  eventsTemp: any[] = [];
  statusAll = false;
  itemModal : any = {};
  statusItemModal : boolean;
  tambahProduk: any = {
    "namaProduk":null,
    "tanggalProduk":null,
    "statusProduk":true,
    "kuantitas":null
  };
  namaProduk: any;
  tanggalDeadline;
  jamDeadline;
  namaProdukFilter: string;
  title: any;

  constructor(
    private alatService: AlatService,
   private router : Router,
    private dp : DatePipe,
    private loadService: LoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.title = this.alatService.itemDetail;
    this.alatService.findByMasterNamaAlat().subscribe(output => {
      let hasil = output.json();
      this.dataTemp = hasil.item;

      this.setPage();
    })
  }

  setPage(page = 0, paging=this.paging, sourceData=this.dataTemp) {
    this.data=[];
    this.maxPage = sourceData.length/paging;
    this.maxPage = this.maxPage < 1 ? 1 : (sourceData.length%paging) == 0 ? Math.round(this.maxPage) :  Math.round(this.maxPage) + 1;
    if (sourceData.length == 0) {
      this.page = 0;
      this.maxPage = 0
    } else {
      if (page==1){
        this.page++;
      } else if (page==-1) {
        this.page--;
      }
      // let items : any[] = [];
      if ((sourceData.length - (this.page*paging)) < paging) {
        console.log((this.page * paging) + (sourceData.length%paging));
        for (let i = (this.page * paging); i < (this.page * paging) + (sourceData.length%paging); i++) {
          this.data.push(sourceData[i]);
        }
      } else {
        for (let i = this.page * paging; i < (this.page +1) * paging; i++) {
          this.data.push(sourceData[i]);
        }
      }
    }
  }

  filter () {
    let FilteredData = [];
    for (let index = 0; index < this.dataTemp.length; index++) {
      if (this.dataTemp[index].namaProduk.includes(this.namaProdukFilter)) {
        FilteredData.push(this.dataTemp[index])
      }
    }
    this.setPage(0,this.paging, FilteredData)
  }

  ngOnChange() {
    this.filter()
  }

  setPaging (inp) {
    this.page = 0;
    this.paging = inp;
    this.setPage()
  }

  onDetailPage(item) {
    this.alatService.itemDetail = item;
    console.log(JSON.stringify(item))
    this.router.navigateByUrl('/detail-produk')
  } 

}
