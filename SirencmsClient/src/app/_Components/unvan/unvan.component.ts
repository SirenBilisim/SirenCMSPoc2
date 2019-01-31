import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Unvan } from 'src/app/_Components/unvan/shared/unvan'
import { UnvanService } from './shared/unvan.service';
import { UnvanModalComponent } from './unvan-modal/unvan-modal.component';
import { DataTableDirective } from 'angular-datatables';
import { DataTableSelect } from '../../common/datatables-extensions/common/data-table-select.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Confirmation } from 'src/app/common/_enums/confirmation.enum';
import { ConfirmComponent } from './../confirm/confirm.component';
import { Action } from 'src/app/common/_enums/action.enum';
import { Mode } from 'src/app/common/_enums/mode.enum';

@Component({
  selector: 'app-unvan',
  templateUrl: './unvan.component.html',
  styleUrls: ['./unvan.component.css'],
  providers: [ DataTableSelect ]
})
export class UnvanComponent implements OnInit {
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public items: Unvan[] = [];
  public dtTrigger = new Subject();

  constructor(
    private itemService: UnvanService, 
    private modalService: NgbModal, 
    private toastr: ToastrService, 
    public select: DataTableSelect<Unvan>) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      serverSide: true,
      processing: true,
      searchDelay: 500,
      ajax: (dtParameters: any, callback) => {
        this.itemService.getDataTablesData(dtParameters).subscribe(resp => {
          this.items = resp.data as Unvan[];

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        }, err => this.toastr.error(err));
      },
      columns: [
        { data: "id" },
        { data: "adi" },
        { data: "parafUnvan" },
        {
          data: "status",
          searchable: false
        }
      ]
    }
  }

  public ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public realoadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
      this.select.clearRowSelection();
    });
  }

  public hadleDtButtonClick(action: Action): void {
    this.actionDispatcher(action, this.select.selectedItem);
  }

  public deleteItem(): void {
    this.modalService.open(ConfirmComponent).result.then((result) => {
      if (result === Confirmation.YES) {
        this.itemService.delete(this.select.selectedItem.id).subscribe(() => {
          this.reloadAndToastSuccess();
        }, error => this.toastr.error(error));
      }
    }, result => this.onAlternativeModalClose(result));
  }

  private openModal(item: Unvan, mode: Mode): void {
    const modalReference = this.modalService.open(UnvanModalComponent);
    modalReference.componentInstance.itemToEdit = item;
    modalReference.componentInstance.mode = mode;

    modalReference.result.then((result) => {
      if (result === "save") {
        this.reloadAndToastSuccess();
      }
    }, result => this.onAlternativeModalClose(result));
  }

  private reloadAndToastSuccess(): void {
    this.realoadTable();
    this.toastr.success("Success!");
  }

  private onAlternativeModalClose(reason: any): any {
    return reason === ModalDismissReasons.ESC || reason === ModalDismissReasons.BACKDROP_CLICK ? {} : this.toastr.error(reason);
  }

  private actionDispatcher = (action: Action, item: Unvan) => ({
    "ADD": () =>    this.openModal(null, Mode.ADD),
    "EDIT": () =>   this.openModal(item, Mode.EDIT),
    "VIEW": () =>   this.openModal(item, Mode.READONLY),
    "DELETE": () => this.deleteItem()
  })[action]()
}