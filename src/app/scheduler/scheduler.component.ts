import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import {DataService} from './data.service';
import { DatePipe } from '@angular/common';
import { SortingService } from '../_service/_sortingservice/sorting.service';
import { Formatter } from '../_libs/formatter';
import { utils } from 'protractor';
import { FormControl } from '@angular/forms';
import { PagingService } from '../_service/_common/paging.service';

@Component({
  selector: 'scheduler-component',
  templateUrl: './scheduler.component.html',
  styles: ['']
})
export class SchedulerComponent implements AfterViewInit {

  @ViewChild('scheduler', {static: false})
  scheduler: DayPilotSchedulerComponent;

  events: any[] = [];
  item: DayPilot.Date;
  startDate = new Date(1990, 0, 1);
  beginDate = DayPilot.Date.today();
  format : Formatter = new Formatter();
  rowsOnPage: number = 10
  pager: any = {}
  totalData: number;
  data: any[] = [];
  myControl: FormControl = new FormControl
  myCTRL: FormControl = new FormControl
  flagSearch: boolean
  flagLoad: boolean;
  paging: number = 5;
  maxPage: number;
  page: number;
  displayItem: any [] = []


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
    startDate: this.beginDate,
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

  constructor(
    private ds: DataService,
    private dp : DatePipe,
    private sortingService: SortingService,
    private pagingService : PagingService
    ) {
  }

  ngAfterViewInit(): void {
    // window.alert( DayPilot.Date.parse('2020-04-08T00:00:00','yyyy-MM-ddTHH:mm:ss'));
    this.ds.getResources().subscribe(result => this.config.resources = result);

    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe(result => {
      this.events = result;
    });
  }

  changeDay(inp = '2') {
    let now = new Date(this.config.startDate.toString())
    if (inp=='0'){
      now.setDate(now.getDate()-1)
    } else if (inp=='1'){
      now.setDate(now.getDate()+1)
    }
    this.config.startDate = DayPilot.Date.parse(this.dp.transform(now,'yyyy-MM-ddTHH:mm:ss').toString()
      ,'yyyy-MM-ddTHH:mm:ss').getDatePart();

    this.sortingService.findAll(false,this.format.setTanggalToStr(now,2),this.format.setTanggalToStr(now,2))
    .subscribe( output => {
      let hasil = output.json();
      this.events = hasil.events;
      this.config.resources = hasil.resource;
      this.data = hasil.hasilSorting;
      this.setPage()
    })
  }

  setPage(page = 1) {
    if (this.data.length == 0) {
      this.page = 0;
      this.maxPage = 0
    } else {
      this.page = page;
      this.maxPage = this.data.length
    }
  }


}

