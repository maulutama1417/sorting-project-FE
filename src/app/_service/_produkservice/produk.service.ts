import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  produkDetail: any;

  constructor(
    private http: Http
  ) { }

  findAll () {
    let options = new RequestOptions()
    return this.http.post(environment.urlProduk + '/list', {
    })
  }

  findDetail (id : string) {
    let options = new RequestOptions()
    return this.http.post(environment.urlProduk + '/getDetailProduk', {
      "name":id
    })
  }

  edit (id, status) {
    let options = new RequestOptions()
    return this.http.post(environment.urlProduk + '/edit-status-produk', {
      "id":id,
      "status":status
    })
  }

  add (itemTambah) {
    let options = new RequestOptions()
    return this.http.post(environment.urlProduk + '/add', {
      // "namaProduk":itemTambah.namaProduk,
      // "tanggalProduk":itemTambah.tanggalProduk,
      // "statusProduk":itemTambah.statusProduk,
      // "kuantitas":itemTambah.kuantitas
      "itemTambah":itemTambah
    })
  }
}
