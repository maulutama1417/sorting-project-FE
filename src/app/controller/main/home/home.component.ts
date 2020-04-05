import { Component, OnInit, ViewChild } from '@angular/core';
import { SortingserviceService } from 'src/app/_service/_sortingservice/sortingservice.service';
import {DayPilotSchedulerComponent, DayPilot} from "daypilot-pro-angular";
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
  dp : any = new DayPilot.Scheduler("dp");

  config: any = {
    cellWidthSpec: "Fixed",
  cellWidth: 20,
  timeHeaders: [
    {
      "groupBy": "Day",
      "format": "dddd, d MMMM yyyy"
    },
    {
      "groupBy": "Hour"
    },
    {
      "groupBy": "Cell",
      "format": "mm"
    }
  ],
  scale: "CellDuration",
  cellDuration: 1,
  days: 1,
  startDate: DayPilot.Date.today(),
  businessBeginsHour: 5,
  businessEndsHour: 8,
  timeRangeSelectedHandling: "Disabled",
  eventMoveHandling: "Disabled",
  eventResizeHandling: "Disabled",
  eventDeleteHandling: "Disabled",
  eventClickHandling: "Enabled",
  onEventClicked: function (args) {
    this.message("Event clicked: " + args.e.text());
  },
  eventHoverHandling: "Bubble",
  bubble: new DayPilot.Bubble({
    onLoad: function(args) {
      // if event object doesn't specify "bubbleHtml" property 
      // this onLoad handler will be called to provide the bubble HTML
      args.html = "Event details";
    }
  }),
  contextMenu: new DayPilot.Menu({
    items: [
      { text: "Delete", onClick: function(args) { var dp = args.source.calendar; dp.events.remove(args.source); } }
    ]
  }),
  treeEnabled: true,
  };

  constructor(
    private sortingService: SortingserviceService,
    // private toastr : ToastrService
  ) { }

  ngOnInit() {
    let item: any[] = [
      {
        "id": 1,
        "resource": "R1",
        "start": "2020-04-05T06:30:00",
        "end": "2020-04-05T07:30:00",
        "text": "Event 1"
      }
    ];

      this.dp.events.add (new DayPilot.Event(item[0]));
  }

}
