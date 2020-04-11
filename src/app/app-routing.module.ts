import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './controller/login/login.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ProdukComponent } from './controller/produk/produk.component';
import { KomponenComponent } from './controller/komponen/komponen.component';

const routes: Routes = [
  { path : '',redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: SchedulerComponent },
  { path: 'komponen', component: KomponenComponent },
  { path: 'produk', component: ProdukComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }