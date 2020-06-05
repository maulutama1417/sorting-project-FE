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
  itemAdd: any = {
    "namaAlat":null,
    "deskripsi":null,
    "status":true
  };
  namaProduk: any;
  tanggalDeadline;
  jamDeadline;
  namaProdukFilter: string;
  title: any;
  itemEdit = [];
  status: any;
  errDuplicate = false;

  constructor(
    private alatService: AlatService,
   private router : Router,
    private dp : DatePipe,
    private loaderService: LoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.title = this.alatService.itemDetail;
    this.alatService.findByMasterNamaAlat().subscribe(output => {
      let hasil = output.json();
      if (hasil.success) {
        this.dataTemp = hasil.item;
        if (this.dataTemp.length != 0) {
          this.itemAdd.idMasterAlat = this.dataTemp[0].masterAlat.id;
        }
        for (let i = 0; i < this.dataTemp.length; i++) {
          this.dataTemp[i].checked = 0
        }
        this.setPage();
      } else {
        this.router.navigateByUrl('/alat')
      }
    }, error => {
      console.error(error);
      this.router.navigateByUrl('/alat')
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
    this.router.navigateByUrl('/detail-produk')
  } 

  putItem(item) {
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

  saveStatusAlat() {
    this.loaderService.display(true, 'Harap Tunggu...')
    this.alatService.editStatus(this.itemEdit, this.status)
    .subscribe( output => {
      let hasil = output.json()
      if (hasil.result) {
       this.ngOnInit()
        this.toastr.success(hasil.message)
      } else {
        this.toastr.error(hasil.message)
      }
    }, error  => {
      this.toastr.error("Gagal merubah status proses!")
      console.error(error)
    })
    this.loaderService.display(false)
  }

  addAlat() {
    this.alatService.add(this.itemAdd).subscribe(
      output => {
        let hasil = output.json()
        if (hasil.result) {
          this.toastr.success(hasil.message)
          this.ngOnInit()
        } else {
          this.toastr.error(hasil.message)
        }
      }
    )
  }

  checkNama () {
    let output = false;
   this.dataTemp.forEach(element => {
     if (element.namaAlat == this.itemAdd.namaAlat) {
      output = true;
     }
   });
   
   this.errDuplicate = output;

  }

}
