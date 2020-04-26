import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  display(value: boolean, msg = '') {
    // this.status.next(value)
    if (value) {
      document.getElementById("msgOverlay").innerHTML = msg;
      document.getElementById("overlayItem").style.display = "block";
    } else {
      document.getElementById("overlayItem").style.display = "none";
    }
  }
  
}
