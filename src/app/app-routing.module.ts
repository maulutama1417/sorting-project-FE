import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './controller/login/login.component';
import { DashboardComponent } from './controller/dashboard/dashboard.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ProdukComponent } from './controller/produk/produk.component';
import { KomponenComponent } from './controller/komponen/komponen.component';
import { ProdukDetailComponent } from './controller/produk/produk-detail/produk-detail.component';
import { SortingComponent } from './controller/sorting/sorting.component';
import { AlatComponent } from './controller/pengaturan-aplikasi/alat/alat.component';
import { DetailAlatComponent } from './controller/pengaturan-aplikasi/alat/detail-alat/detail-alat.component';

const routes: Routes = [
  { path : '',redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: SchedulerComponent },
  { path: 'komponen', component: KomponenComponent },
  { path: 'produk', component: ProdukComponent },
  { path: 'detail-produk', component: ProdukDetailComponent},
  { path: 'sorting', component: SortingComponent },
  { path: 'alat', component: AlatComponent},
  { path: 'detail-alat', component: DetailAlatComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }