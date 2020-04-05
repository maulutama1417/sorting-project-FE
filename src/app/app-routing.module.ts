import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './controller/main/master/master.component';
import { LoginComponent } from './controller/main/login/login.component';
import { HomeComponent } from './controller/main/home/home.component';
import { SortingComponent } from './controller/main/sorting/sorting.component';
import { KomponenComponent } from './controller/main/komponen/komponen.component';


const routes: Routes = [
  {path : '', component: LoginComponent},
  {path : 'master', component: MasterComponent},
  {path : 'login', component: LoginComponent},
  {path : 'home', component: HomeComponent},
  {path : 'sorting', component: SortingComponent},
  {path : 'komponen', component: KomponenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
