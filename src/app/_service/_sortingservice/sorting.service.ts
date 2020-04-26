import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor(
    private http: Http
  ) { }

  findAll (status: any = '0', awal: any, akhir: any) {
    let options = new RequestOptions()
    return this.http.post(environment.urlSorting + '/getSorting', {
      "status": status,
	    "start":awal,
    	"end":akhir
    })
  }

  doSorting(item, jam) {
    let options = new RequestOptions()
    return this.http.post(environment.urlSorting + '/doSorting', {
        "tanggal_mulai":item,
        "jam_mulai": jam
    })
  }

  doNestSorting() {
    let options = new RequestOptions()
    return this.http.post(environment.urlSorting + '/do-nest-sorting', {
      
    })
  }

}
