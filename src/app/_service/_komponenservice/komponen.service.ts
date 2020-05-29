import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KomponenService {

  constructor(
    private http: Http
  ) { }

  findAllByProduk (item) {
    let options = new RequestOptions()
    return this.http.post(environment.urlKomponen + '/list', {
      "nama_produk":item
    })
  }

  edit (id) {
    let options = new RequestOptions()
    return this.http.post(environment.urlKomponen + '/edit', {
      "id":id
    })
  }

  uploadFile (itemList, produk) {
    let options = new RequestOptions()
    return this.http.post(environment.urlKomponen + '/upload', {
      "item":itemList,
      "produk":produk.id
    })
  }

  editPengerjaan (listItem, status) {
    let options = new RequestOptions()
    return this.http.post(environment.urlKomponen + '/edit-pengerjaan', {
      "list_id":listItem,
      "status":status
    })
  }

}
