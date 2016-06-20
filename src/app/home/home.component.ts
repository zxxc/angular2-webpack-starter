import { Component } from '@angular/core';
import { AppState } from '../app.service';
import { AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { HTTP_PROVIDERS } from '@angular/http';
import { GitHubService} from './github.service'
import { GitHubRepository} from './githubrepository'
import { Http} from 'angular2/http';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf } from '@angular/common';
import { Observable }     from 'rxjs/Observable';
import { xTable, xTableColumnConfig, xTableSortingDirection } from './../xTable/';

@Component({
  selector: 'home',
  providers: [
    GitHubService
  ],

  directives: [
    AlertComponent,
    NG_TABLE_DIRECTIVES,
    PAGINATION_DIRECTIVES,
    NgClass,
    NgIf,
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    xTable
  ],

  pipes: [],
  styles: [require('./home.css')],
  template: require('./home.html')
})

export class Home {
  public errorMessage: string;
  public repositories: GitHubRepository[];

  public columns: Array<xTableColumnConfig> = [
    new xTableColumnConfig('Name', 'Name', true),
    new xTableColumnConfig('Forks Count', 'ForkCount', false, true, xTableSortingDirection.Descending)
  ];

  constructor(public gitHubService: GitHubService) {

  }

  public repositoriesResolver: Observable<GitHubRepository[]>;

  ngOnInit() {
    this.repositoriesResolver = this.gitHubService.getRepositories();
  }

}
