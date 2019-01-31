import { Component, OnInit } from '@angular/core';

import { Confirmation } from './../../common/_enums/confirmation.enum';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() { }

  public confirm(): void {
    this.modal.close(Confirmation.YES);
  }

  public reject(): void {
    this.modal.close(Confirmation.NO);
  }
}
