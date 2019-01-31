import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnvanComponent } from './_Components/unvan/unvan.component';
const routes: Routes = [
  { path: "unvans", component: UnvanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
