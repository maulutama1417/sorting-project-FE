import { Component, OnInit, ViewChild } from '@angular/core';
import { DayPilotSchedulerComponent, DayPilot } from 'daypilot-pro-angular';
import { DataService } from 'src/app/scheduler/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  @ViewChild('scheduler', {static: false})
  scheduler: DayPilotSchedulerComponent;

  events: any[] = [];

  config: DayPilot.SchedulerConfig = {
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
    startDate: DayPilot.Date.parse('2020-04-07T00:00:00','yyyy-MM-ddTHH:mm:ss'),
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: function (args) {
      var dp = this;
      DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add(new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          resource: args.resource,
          text: modal.result
        }));
      });
    },
    eventMoveHandling: "Update",
    onEventMoved: function (args) {
      this.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: function (args) {
      this.message("Event resized: " + args.e.text());
    },
    eventDeleteHandling: "Update",
    onEventDeleted: function (args) {
      this.message("Event deleted: " + args.e.text());
    },
    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: function(args) {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    }),
    treeEnabled: true,
  };

  constructor(private ds: DataService) {
  }

  ngAfterViewInit(): void {
    window.alert( DayPilot.Date.parse('2020-04-08T00:00:00','yyyy-MM-ddTHH:mm:ss'));
    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  ngOnInit() {

  }

}
