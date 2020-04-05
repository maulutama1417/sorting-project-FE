import { Injectable, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SortingserviceService {

  constructor(
    private http: HttpClient
  ) { 
  }

  doSorting () {
    return this.http.post(environment.urlSorting+'/doSorting','');
  }

  getSorting () {
    return this.http.get(environment.urlSorting+'/getSorting');
  }

}
