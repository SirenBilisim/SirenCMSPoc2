import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AppComponent } from './app.component';
import { NavComponent } from './_Components/nav/nav.component';
import { FooterComponent } from './_Components/footer/footer.component';
import { UnvanComponent } from './_Components/unvan/unvan.component';
import { UnvanModalComponent } from './_Components/unvan/unvan-modal/unvan-modal.component';
import { UnvanService } from './_Components/unvan/shared/unvan.service';
import { ConfirmComponent } from './_Components/confirm/confirm.component';

import { DataTablesModule } from 'angular-datatables';
import { DataTablesExtensionsModule } from './common/datatables-extensions/datatables-extensions.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    UnvanComponent,
    UnvanModalComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    DataTablesExtensionsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UnvanModalComponent,
    ConfirmComponent
  ]
})
export class AppModule { }
