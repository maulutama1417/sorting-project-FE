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
    window.alert('Produk dengan id ' + id + ' status produknya ' + status)
    let options = new RequestOptions()
    return this.http.post(environment.urlProduk + '/add', {
      "name":id
    })
  }

  add (itemTambah) {
    let options = new RequestOptions()
    return this.http.post(environment.urlProduk + '/add', {
      "namaProduk":itemTambah.namaProduk,
      "tanggalProduk":itemTambah.tanggalProduk,
      "statusProduk":itemTambah.statusProduk
    })
  }
}
