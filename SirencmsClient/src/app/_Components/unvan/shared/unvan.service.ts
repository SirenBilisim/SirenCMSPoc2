import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/common/_services/resource.service';

import { DataTablesOptions } from "../../../common/datatables-extensions/common/data-tables.options"
import { DataTablesResponse } from "../../../common/datatables-extensions/common/datatables.response"
import { UnvanBase } from './unvan-base';

@Injectable({
  providedIn: 'root'
})
export class UnvanService extends ResourceService<UnvanBase> {

  constructor(http: HttpClient) {
    super(http, "unvan");
  }

  public getDataTablesData(dtParameters: DataTablesOptions): Observable<DataTablesResponse> {
    return this.http.post<DataTablesResponse>(`${this.apiUrl}/${this.endpoint}/GetTableData`, dtParameters, {});
  }

  public checkExistItem(id: number, adi: string): Promise<boolean> {
    var item = {
      id: id, adi: adi
    }
    return this.http.post<boolean>(`${this.apiUrl}/${this.endpoint}/CheckDuplicate/`, item).toPromise();
  }

}
