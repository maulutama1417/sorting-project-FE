import { Component, OnInit } from '@angular/core';
import { SortingserviceService } from 'src/app/_service/_sortingservice/sortingservice.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId : string;
  password : string;

  constructor(
    private sortingService : SortingserviceService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  doClick() {
  //  this.sortingService.sortingService().subscribe(success => {
  //   window.alert("SUKSES")
  // })
  window.alert(this.userId + ' ' + this.password)
    this.router.navigateByUrl('test')
  }

}
