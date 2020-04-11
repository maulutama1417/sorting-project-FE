import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  isLogin: boolean = false
  messageError: string = ''
  selectJabatan: string
  version: string;
  year: number = new Date().getFullYear();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('isLogin')){
      location.href = '/dashboard';
    }
    this.document.body.classList.add("login");
    this.document.body.classList.remove("page-container-bg-solid");
    this.document.body.classList.remove("page-header-fixed");
    this.document.body.classList.remove("page-sidebar-closed-hide-logo");
  }

  onLogin() {
    localStorage.setItem('isLogin','1');
    location.href = '/dashboard';
  }

  getRoute() {
    
  }

}

