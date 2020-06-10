import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ProdukService } from 'src/app/_service/_produkservice/produk.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/_service/_common/loader.service';
import { environment } from 'src/environments/environment';

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
    "statusProduk":true,
    "kuantitas":null
  };
  namaProduk: any;
  tanggalDeadline;
  jamDeadline;
  namaProdukFilter: string;
  itemEdit = [];
  status = false;

  constructor(
    private produkService : ProdukService,
    private router : Router,
    private dp : DatePipe,
    private loadService: LoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.produkService.findAll().subscribe(output => {
      let hasil = output.json();
      this.dataTemp=hasil.item;
      for (let index = 0; index < this.dataTemp.length; index++) {
        this.dataTemp[index].checked = 0;

      }
      this.setPage();
    })
  }

  setPage(page = 0, paging=this.paging, sourceData=this.dataTemp) {
    this.data=[];
    this.maxPage = sourceData.length/paging;
    this.maxPage = (sourceData.length%paging) == 0? Math.round(this.maxPage) :  Math.round(this.maxPage) + 1;
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
    this.produkService.produkDetail = item;
    console.log(JSON.stringify(item))
    this.router.navigateByUrl('/detail-produk')
  }

  changeAll () {
  
  }

  edit() {
    this.produkService.edit(this.itemEdit, this.status)
    .subscribe(
      output => {
        let hasil = output.json()
        if (hasil.success) {
          this.toastr.success(hasil.message)
        } else {
          this.toastr.error(hasil.message)
        }
      }
      ,error => {
        this.toastr.error(environment._500)
        console.error(error)
      }
      , () => {
        this.itemEdit = [];
        this.statusAll = false;
        this.ngOnInit()
      }
    )
  }


  save() {
    console.log(this.tambahProduk)
    this.loadService.display(true, "Mohon tunggu....")
    this.produkService.add(this.tambahProduk).subscribe
    (output => {
      let hasil = output.json()
      if (hasil.success) {
        this.toastr.success(hasil.message)
      } else {
        this.toastr.error(hasil.message)
      }
      this.setPage()
      this.loadService.display(false)
    }, error => {
      console.error(error)
      this.toastr.error("Gagal simpan data")
      this.loadService.display(false)
    })
  }

  putAll() {
    if (this.statusAll) {
      this.statusAll = false;
      this.itemEdit = [];
    } else {
      this.statusAll = true;
    }
      for (let index = 0; index < this.dataTemp.length; index++) {
        let item  = this.dataTemp[index];
        item.checked = this.statusAll;
         if (this.statusAll) {
          this.itemEdit = this.itemEdit.filter(function(x) {
            return x!=item.id
          })
          this.itemEdit.push(item.id);
         }
        this.dataTemp[index] = item;
      }
      this.setPage()
  }

  putSingle(item) {
    if (item.checked == 1)  {
      item.checked = 0;
      this.itemEdit = this.itemEdit.filter(function(x) {
        return x!=item.id
      })
    } else {
      item.checked = 1;
      this.itemEdit.push(item.id)
    }
  }

}
