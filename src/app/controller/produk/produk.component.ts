import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdukService } from 'src/app/_service/_produkservice/produk.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.component.html',
  styleUrls: ['./produk.component.css']
})
export class ProdukComponent implements OnInit {

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
    "statusProduk":true
  };
  namaProduk: any;
  tanggalDeadline;
  jamDeadline;

  constructor(
    private produkService : ProdukService,
    private router : Router,
    private dp : DatePipe,
    private toastr: ToastrService
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
    this.router.navigateByUrl('/detail-produk')
  }

  changeAll () {
  
  }

  edit() {
    this.produkService.edit(this.itemModal.id, this.statusItemModal)
  }

  openModal(item) {
    this.itemModal = item;
    this.statusItemModal = item.statusProduk;
  }

  save() {
    console.log(this.tambahProduk)
    this.produkService.add(this.tambahProduk).subscribe
    (output => {
      this.toastr.success("Berhasil tambah data!")
    })
  }

}
