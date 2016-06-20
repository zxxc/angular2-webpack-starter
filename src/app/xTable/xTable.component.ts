import { Component, Input } from '@angular/core';

import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap';
import { HTTP_PROVIDERS } from '@angular/http';
import { Http } from 'angular2/http';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf } from '@angular/common';
import { Observable }     from 'rxjs/Observable';
import { xTableColumnConfig }     from './xTableColumnConfig';
import { xTableSortingDirection }     from './xTableSortingDirection';

@Component({
  selector: 'xTable',
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    AlertComponent,
    NG_TABLE_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    NgClass,
    NgIf,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES
  ],

  pipes: [],
  styles: [require('./xTable.css')],
  template: require('./xTable.html'),
  inputs: ['columns', 'dataService']
})

export class xTable{
  @Input() public columns: xTableColumnConfig[];
  @Input() public dataService: Observable<any[]>;

  public errorMessage: string; //message will be shown on screen

  public rows: Array<any> = [];

  public page: number = 1;
  public itemsPerPage: number = 3;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: {
        columns:this.columns
    },
    filtering: {
      filterString: ''      
    }
  };

  private data: Array<any> = [];

  ngOnInit() {
    this.config.sorting.columns = this.columns;
    this.dataService.subscribe(items => {
      return this.dataResolved(items)
    },
      error => this.errorMessage = <any>error);
  }


  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.columns || [];
    let columnName: string = void 0;
    let sort: xTableSortingDirection;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].Sortable) {
        columnName = columns[i].Name;
        sort = columns[i].SortDirection || xTableSortingDirection.Ascending;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === xTableSortingDirection.Descending ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === xTableSortingDirection.Ascending ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    if (!config.filtering) {
      return data;
    }

    let filteredData: Array<any> = data.filter((item: any) => {
      for (let i = 0; i < this.columns.length; i++) {
        var column = this.columns[i];

        if (column.Filterable && item[column.Name]) {
          console.log('XXX', this.config.filtering.filterString);
          return item[column.Name].match(this.config.filtering.filterString);
        }
      }
    });

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  private dataResolved(items: any): any {
    this.length = items.length;
    this.data = items;
    this.onChangeTable(this.config);
    return items;
  }


}
