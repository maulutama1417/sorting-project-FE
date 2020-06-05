import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlatService {

  itemDetail: any;

  constructor(
    private http: Http
  ) { }

  findAll() {
    let options = new RequestOptions()
    return this.http.post(environment.urlAlat + '/list', {
    })
  }

  findByMasterNamaAlat(item = this.itemDetail) {
    let options = new RequestOptions()
    return this.http.post(environment.urlAlat + '/list-detail', {
      "master_nama_alat":item
    })
  }

  editStatus (listItem, status) {
    let options = new RequestOptions()
    return this.http.post(environment.urlAlat + '/edit-pengerjaan', {
      "list_id":listItem,
      "status":status
    })
  }

  add (item) {
    let options = new RequestOptions()
    return this.http.post(environment.urlAlat + '/do-add', {
      "item":item    
    })
  }

}
