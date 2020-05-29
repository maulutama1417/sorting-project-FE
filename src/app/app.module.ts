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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SortingComponent } from './controller/sorting/sorting.component';
import { LoaderService } from './_service/_common/loader.service';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { Formatter } from './_libs/formatter';
import { AlatComponent } from './controller/pengaturan-aplikasi/alat/alat.component';
import { DetailAlatComponent } from './controller/pengaturan-aplikasi/alat/detail-alat/detail-alat.component';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    LoginComponent,
    DashboardComponent,
    KomponenComponent,
    ProdukComponent,
    ProdukDetailComponent,
    SortingComponent,
    AlatComponent,
    DetailAlatComponent
  ],
  imports: [
    BrowserModule,
    SchedulerModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule

    
   
  ],
  providers: [
    DatePipe,
    SortingService,
    LoginService,
    ProdukService,
    KomponenService,
    PagingService,
    LoaderService,
    Formatter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
