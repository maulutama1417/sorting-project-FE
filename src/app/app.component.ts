import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  route: string;
  showLoader: boolean

  constructor(
    location: Location,
    router: Router,
    public vcr: ViewContainerRef
  ) {
    router.events.subscribe(val => {
      this.route = location.path();
    });
  }
}
