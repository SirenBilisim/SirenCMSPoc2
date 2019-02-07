import { Component, OnInit } from '@angular/core';
import { LocalUser } from "./common/_models/local.user";
import { AuthenticationService } from "./common/_services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: LocalUser;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

 
  ngOnInit() {
  }
}
