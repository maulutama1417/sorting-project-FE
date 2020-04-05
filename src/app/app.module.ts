import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KomponenComponent } from './controller/main/komponen/komponen.component';
import { MasterComponent } from './controller/main/master/master.component';
import { SortingComponent } from './controller/main/sorting/sorting.component';
import { LoginComponent } from './controller/main/login/login.component';
import { SidebarComponent } from './controller/sidebar/sidebar.component';
import { HeaderComponent } from './controller/header/header.component';
import { FooterComponent } from './controller/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './controller/main/home/home.component';
import { CalendarModule } from 'angular-calendar';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';  

@NgModule({
  declarations: [
    AppComponent,
    KomponenComponent,
    MasterComponent,
    SortingComponent,
    LoginComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    SchedulerModule,
    BrowserAnimationsModule,
    ToastrModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
