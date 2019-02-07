import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./common/_guards/auth-guard";
import { UnvanComponent } from './_Components/unvan/unvan.component';
import { LoginComponent } from "./_Components/login/login.component";
import { DashboardComponent } from "./_Components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'unvans', component: UnvanComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
