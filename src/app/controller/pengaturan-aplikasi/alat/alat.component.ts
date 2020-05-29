import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/public_api';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/_service/_common/loader.service';
import { ToastrService } from 'ngx-toastr';
import { ProdukService } from 'src/app/_service/_produkservice/produk.service';
import { AlatService } from 'src/app/_service/_alatservice/alat.service';

@Component({
  selector: 'app-alat',
  templateUrl: './alat.component.html',
  styleUrls: ['./alat.component.css']
})
export class AlatComponent implements OnInit {

  
  @ViewChild('modalEdit') modalEdit: ModalDirective

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

  constructor(
    private alatService: AlatService,
    private produkService: ProdukService,
   private router : Router,
    private dp : DatePipe,
    private loadService: LoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.alatService.findAll().subscribe(output => {
      let hasil = output.json();
      let temp = hasil.item;

      for (let i = 0;  i < temp.length; i++) {
        let itemAdd;
        if (i == 0 ) {
          itemAdd = {
            "namaMasterAlat":temp[i].masterAlat.namaMasterAlat,
            "proses": temp[i].masterAlat.proses.masterProses.namaProses
          }    
          this.dataTemp.push(itemAdd)      
        } else {
          let counter = 0;
          for (let j = 0; j <  this.dataTemp.length; j++) {
            if (temp[i].masterAlat.namaMasterAlat == this.dataTemp[j].namaMasterAlat) {
              counter++;
            }
          }
          if (counter == 0) {
            itemAdd = {
              "namaMasterAlat":temp[i].masterAlat.namaMasterAlat,
              "proses": temp[i].masterAlat.proses.masterProses.namaProses
            }  
            this.dataTemp.push(itemAdd);
          }
        }
      }
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
    this.router.navigateByUrl('/detail-alat')
  } 

}
