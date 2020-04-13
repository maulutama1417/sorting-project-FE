import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SchedulerModule} from "./scheduler/scheduler.module";
import { SideBarComponent } from './controller/side-bar/side-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './controller/login/login.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { KomponenComponent } from './controller/komponen/komponen.component';
import { ProdukComponent } from './controller/produk/produk.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { SortingService } from './_service/_sortingservice/sorting.service';
import { LoginService } from './_service/_loginservice/login.service';
import { KomponenService } from './_service/_komponenservice/komponen.service';
import { ProdukService } from './_service/_produkservice/produk.service';
import { HttpModule } from '@angular/http'
import { PagingService } from './_service/_common/paging.service';
import { ProdukDetailComponent } from './controller/produk/produk-detail/produk-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LoginComponent,
    DashboardComponent,
    KomponenComponent,
    ProdukComponent,
    ProdukDetailComponent
  ],
  imports: [
    BrowserModule,
    SchedulerModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
    
   
  ],
  providers: [
    DatePipe,
    SortingService,
    LoginService,
    ProdukService,
    KomponenService,
    PagingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
