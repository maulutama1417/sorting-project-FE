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
}
