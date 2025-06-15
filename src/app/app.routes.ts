import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {Optimum1Component} from './modules/optimum1/optimum1.component';
import {Optimum2Component} from './modules/optimum2/optimum2.component';
import {Optimum3Component} from './modules/optimum3/optimum3.component';
import {Optimum4Component} from './modules/optimum4/optimum4.component';
import {Optimum5Component} from './modules/optimum5/optimum5.component';
import {Optimum6Component} from './modules/optimum6/optimum6.component';
import {HomeDashboardComponent} from './pages/dashboard/home-dashboard/home-dashboard.component';
import {Optimum7Component} from './modules/optimum7/optimum7.component';
import {Optimum8Component} from './modules/optimum8/optimum8.component';
import {Optimum9Component} from './modules/optimum9/optimum9.component';
import {OptimumXComponent} from './modules/optimum-x/optimum-x.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {AuthGuard} from './auth.guard';
import {ProfileComponent} from './pages/profile/profile.component';
import {InfoComponent} from './pages/info/info.component';
import {SuccessPaymentComponent} from './pages/success-payment/success-payment.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'success', component: SuccessPaymentComponent },
  {path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'home', component: HomeDashboardComponent},
      { path: 'profile', component: ProfileComponent },
      { path: 'optima1', component:  Optimum1Component},
      { path: 'optimum2', component:  Optimum2Component},
      { path: 'optimum3', component:  Optimum3Component},
      { path: 'optimum4', component:  Optimum4Component},
      { path: 'optimum5', component:  Optimum5Component},
      { path: 'optimum6', component:  Optimum6Component},
      { path: 'optimum7', component:  Optimum7Component},
      { path: 'optimum8', component:  Optimum8Component},
      { path: 'optimum9', component:  Optimum9Component},
      { path: 'optimumX', component:  OptimumXComponent},
    ], canActivate: [AuthGuard]}
];
