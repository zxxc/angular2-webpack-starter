import { Component, Input } from '@angular/core';

import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { HTTP_PROVIDERS } from '@angular/http';
import {Http} from 'angular2/http';
 import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';
import { Observable }     from 'rxjs/Observable';
@Component({
  selector: 'xTable', 
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [  ],
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
  
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  styles: [ require('./xTable.css') ],
  template: require('./xTable.html'),
  inputs:[ 'columns','dataService']
})
export class xTable{
  errorMessage: string;
  mode = 'Observable';
    
  public rows:Array<any> = [];
  @Input() public columns;
  @Input() public dataService:Observable<any[]>;

  public page:number = 1;
  public itemsPerPage:number = 3;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {
        columns: this.columns
    },
    filtering: {
        filterString: '', 
        columnName: 'Name',//this.columns[0].name
    }
  };

  private data:Array<any> = [];

  ngOnInit() {
    console.log('dataService',this.dataService);
    this.dataService.subscribe(items=>{
                     return this.dataResolved(items)},
                     error =>  this.errorMessage = <any>error);  
                     
    
    // this.title.getData().subscribe(data => this.data = data);
  }
 
 
  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    console.log(page);
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '') {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    if (!config.filtering) {
      return data;
    }

    let filteredData:Array<any> = data.filter((item:any) =>
      item[config.filtering.columnName].match(this.config.filtering.filterString));

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
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

 private  dataResolved(items:any):any{
                       console.info('items',items);
                       this.length = items.length;
                       this.data=items;
                       this.onChangeTable(this.config);
                       return items;
  }
  
 
}
