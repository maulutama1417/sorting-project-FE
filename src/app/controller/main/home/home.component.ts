import { Component, OnInit, ViewChild } from '@angular/core';
import { SortingserviceService } from 'src/app/_service/_sortingservice/sortingservice.service';
import {DayPilotSchedulerComponent} from "daypilot-pro-angular";
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasilSorting : any[] = []

  @ViewChild("scheduler", {static: false})
  scheduler: DayPilotSchedulerComponent;
  events: any;

  config: any = {
    timeHeaders : [
      {groupBy: "Month", format: "MMMM yyyy"},
      {groupBy: "Day", format: "d"}
    ],
    days: 31,
    startDate: new Date().toString,
    scale: "Day"
  };

  constructor(
    private sortingService: SortingserviceService,
    // private toastr : ToastrService
  ) { }

  ngOnInit() {
  
  }

}
