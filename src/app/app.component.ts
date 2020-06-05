import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderService } from './_service/_common/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  route: string;
  showLoader: boolean

  constructor(
    private loaderService: LoaderService,
    location: Location,
    private router: Router,
    public vcr: ViewContainerRef
  ) {
    router.events.subscribe(val => {
      this.route = location.path();
    });
  }

  hideScreen() {
    this.loaderService.display(false);
  }

  logout() {
    localStorage.removeItem('isLogin')
    this.router.navigateByUrl('/login')
  }
}
