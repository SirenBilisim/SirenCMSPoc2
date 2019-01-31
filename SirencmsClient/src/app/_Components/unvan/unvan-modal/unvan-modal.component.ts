import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { Mode } from './../../../common/_enums/mode.enum';
import { ModalHelper } from './../../../common/_helpers/modal.helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnvanForManipulation } from './../shared/unvan-for-manipulation';
import { Unvan } from 'src/app/_Components/unvan/shared/unvan';
import { UnvanService } from './../shared/unvan.service';


@Component({
  selector: 'app-unvan-modal',
  templateUrl: './unvan-modal.component.html',
  styleUrls: ['./unvan-modal.component.css']
})
export class UnvanModalComponent implements OnInit {

  @Input() itemToEdit: Unvan = null;
  @Input() mode: Mode;
  public errors: any[];

  public itemForm: FormGroup;

  constructor(
    private itemService: UnvanService,
    public modal: NgbActiveModal
  ) { }


  ngOnInit() {
    this.buildForm();

  }

  private buildForm(): void {
    this.itemForm = new FormGroup({
      adi: new FormControl
        (
          { value: this.isInAddMode() ? "" : this.itemToEdit.adi, disabled: this.isReadOnly() },
          [Validators.required, Validators.maxLength(255)]
        ),
      parafUnvan: new FormControl
        (
          { value: this.isInAddMode() ? "" : this.itemToEdit.parafUnvan, disabled: this.isReadOnly() },
          [Validators.required, Validators.maxLength(155)]
        ),

    });
  }

  private isInAddMode(): boolean {
    return this.mode === Mode.ADD;
  }

  public isReadOnly(): boolean {
    return this.mode === Mode.READONLY;
  }

  public getModalTitle(): string {
    let title = this.itemToEdit ? this.itemToEdit.adi : null;
    return ModalHelper.getModalTitle(this.mode, title);
  }

  public saveItem(): void {
    if (this.itemForm.valid) {
      let item = this.mapToDto(this.itemForm.value);
      this.isInAddMode()
        ? this.itemService.add(item).subscribe(() => this.modal.close("save"), err => this.mapErrors(err))
        : this.itemService.update(this.itemToEdit.id, item).subscribe(() => this.modal.close("save"), err => this.mapErrors(err))
    }
  }

  private mapToDto(form: any): UnvanForManipulation {
    let item = new UnvanForManipulation();
    item.adi = form.adi;
    item.parafUnvan = form.parafUnvan;
    return item;
  }

  private mapErrors(errors: any): void {
    this.errors = [];
    this.errors = errors;
  }

}
