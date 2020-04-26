import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProdukService } from 'src/app/_service/_produkservice/produk.service';
import { KomponenService } from 'src/app/_service/_komponenservice/komponen.service';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.component.html',
  styleUrls: ['./produk-detail.component.css']
})
export class ProdukDetailComponent implements OnInit, OnDestroy {

  @ViewChild(ModalDirective) modal: ModalDirective
  @ViewChild(ModalDirective) modalLogin: ModalDirective


  produkDetail: any;
  prosesKomponen: any[] = [];
  prosesKomponenTemp: any[] = []
  paging: number = 5;
  data: any[] = [];
  dataExcel: any[] = [];
  maxPage: any;
  dataTemp: any[] = [];
  page: number = 0;
  isClickDetail = false;
  metode:any;
  username:string;
  password:string;
  errorUpload = false;
  pesanErrorUpload : string;
  itemSaved: any[] = [];

  constructor(
    private produkService: ProdukService,
    private komponenService: KomponenService,
    private router: Router,
    private toastr: ToastrService
  ) { }



  ngOnInit(): void {
    if (!this.produkService.produkDetail) {
      this.router.navigateByUrl('/produk')
    } else {
      this.toastr.success("Sukses","Berhasil mendapatkan data!")
    }
    this.produkDetail = this.produkService.produkDetail;
    this.komponenService.findAllByProduk(this.produkDetail.namaProduk).subscribe(
      output => {
        let hasil = output.json();
        this.prosesKomponenTemp = hasil.prosesKompList;
        this.dataTemp = hasil.komponen;
        this.page = 0;
        this.setPage()
      }
    )
  }

  ngOnDestroy() {
    this.produkService.produkDetail = null;
    this.isClickDetail = false;
    this.errorUpload = false;
  }

  onDetailPage(namaKomponen) {
    this.prosesKomponen = [];
    this.isClickDetail = true;
    for(let i=0; i<this.prosesKomponenTemp.length; i++) {
      let objectCompare = this.prosesKomponenTemp[i];
      if (namaKomponen==objectCompare.komponen.namaKomponen) {
        this.prosesKomponen.push(objectCompare);
      }
    }
    
  }

  setPage(page = 0, paging = this.paging) {
    this.data = [];
    this.maxPage = this.dataTemp.length / paging;
    this.maxPage = (this.dataTemp.length % paging) == 0 ? Math.round(this.maxPage) : Math.round(this.maxPage) + 1;
    if (this.dataTemp.length == 0) {
      this.page = 0;
      this.maxPage = 0
    } else {
      if (page == 1) {
        this.page++;
      } else if (page == -1) {
        this.page--;
      }
      // let items : any[] = [];
      if ((this.dataTemp.length - (this.page * paging)) < paging) {
        console.log((this.page * paging) + (this.dataTemp.length % paging));
        for (let i = (this.page * paging); i < (this.page * paging) + (this.dataTemp.length % paging); i++) {
          this.data.push(this.dataTemp[i]);
        }
      } else {
        for (let i = this.page * paging; i < (this.page + 1) * paging; i++) {
          this.data.push(this.dataTemp[i]);
        }
      }
      // this.config.resources = items;
    }
  }

  setPaging(inp) {
    this.page = 0;
    this.paging = inp;
    this.setPage()
  }

  handlerModal(type: string, $event: ModalDirective) {
    if (type == "save" && $event.dismissReason == null) {
      this.modal.hide()
    } else if (type == "onHidden" && ($event.dismissReason == "esc" || $event.dismissReason == "backdrop-click")) {
      this.modal.hide()
    } else if (type == "onHidden") {
      this.modal.hide()
    }
  }

  loadLogin() {
    if (this.username == null || this.password == null) {
      this.toastr.warning( 'Username / Password tidak boleh kosong!','Peringatan')
    } else {
      this.komponenService.edit(this.prosesKomponen[0].komponen.id)
      .subscribe(
        output => {
          let hasil = output.json()
          if (hasil.result) {
            this.toastr.success(hasil.message,'Sukses!')
            this.komponenService.findAllByProduk(this.produkDetail.namaProduk).subscribe(
              output => {
                let hasil = output.json();
                this.prosesKomponenTemp = hasil.prosesKompList;
                this.dataTemp = hasil.komponen;
                this.page = 0;
                this.setPage()
                this.modalLogin.hide()
              }
            )
          } else {
            this.toastr.success(hasil.message,'Gagal!')
          }


        },
        error => {

        }
      )
    }
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.dataExcel = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      for (let i = 3; i < this.dataExcel.length; i++) {
        if (this.dataExcel[i][3] == null || this.dataExcel[i][12] == null) { //kuantitas atau prioritasnya null
          continue;
        }
        
        let item : any = {};
        item.namaKomponen = this.dataExcel[i][1]
        item.namaBagian = this.dataExcel[i][2]
        item.kuantitas = this.dataExcel[i][3]
        item.bahan = this.dataExcel[i][4]
        item.panjang = this.dataExcel[i][5]
        item.lebar = this.dataExcel[i][6]
        item.tinggi = this.dataExcel[i][7]
        item.prioritas = this.dataExcel[i][12]
        
        for (let j = 13; j < 29; j++) {
          switch (j) {
            case 13:
                item.plm = this.dataExcel[i][j]  
              break;
              case 14:
                item.et = this.dataExcel[i][j]  
              break;
              case 15:
                item.sgc = this.dataExcel[i][j]  
              break;
              case 16:
                item.bvl = this.dataExcel[i][j]  
              break;
              case 17:
                item.bs = this.dataExcel[i][j]
              break;
              case 18:
                item.hgc = this.dataExcel[i][j]
              break;
              case 19:
                item.agc = this.dataExcel[i][j]
              break;
              case 20:
                item.stp = this.dataExcel[i][j]
              break;
              case 21:
                item.hpp = this.dataExcel[i][j]
              break;
              case 22:
                item.bpb = this.dataExcel[i][j]
              break;
              case 23:
                item.rb = this.dataExcel[i][j]
              break;
              case 24:
                item.rd = this.dataExcel[i][j]
              break;
              case 25:
                item.td = this.dataExcel[i][j]
              break;
              case 26:
                item.hb = this.dataExcel[i][j]
              break;
              case 27:
                item.gl = this.dataExcel[i][j]
              break;
              case 28:
                item.lb = this.dataExcel[i][j]
              break;
              case 29:
                item.gr = this.dataExcel[i][j]
              break;
            default:
              break;
          }
        }

        if (i == 0 ) {
          this.itemSaved.push(item);
        } else {
          this.itemSaved.forEach(element => {
            if (element.namaKomponen == item.namaKomponen) {
              this.errorUpload = true;
            }
          });
          
          if (!this.errorUpload) {
            this.itemSaved.push(item);
          } else {
            this.itemSaved = []
            this.pesanErrorUpload = 'Kesalahan pada file upload, terdapat komponen ' + item.namaKomponen + ' yang sama!';
            break;
          }

        }

      }
      console.log(this.dataExcel);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  save() {
    if (this.metode == 'UPLOAD') {
      this.komponenService.uploadFile(this.itemSaved, this.produkDetail).subscribe(
        output => {
          let hasil = output.json()
          if (hasil.result) {
            this.toastr.success(hasil.message, 'Sukses!')
            this.modal.hide()
          } else {
            this.toastr.error(hasil.message,'Gagal!')
          }
        },
        error => {
          
        }
      )
    }
  }

}
