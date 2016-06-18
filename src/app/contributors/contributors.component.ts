import { Component } from '@angular/core';

import { AppState } from '../app.service';

import {AlertComponent} from 'ng2-bootstrap/ng2-bootstrap';
import { HTTP_PROVIDERS } from '@angular/http';
import { JSONP_PROVIDERS } from '@angular/http';
import {Http} from 'angular2/http';
import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';
import {PAGINATION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgIf} from '@angular/common';
import { Observable }     from 'rxjs/Observable';
import { xTable } from './../xTable/'
import { Contributor } from './contributor'
import { ContributorsService } from './contributors.service'

@Component({

    selector: 'contributions',

    providers: [
        ContributorsService, JSONP_PROVIDERS
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

    // We need to tell Angular's compiler which custom pipes are in our template.
    pipes: [],
    // Our list of styles in our component. We may add more to compose many styles together

    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: require('./contributors.html')
})
export class Contributions {
    mode = 'Observable';

    constructor(public contributorsService: ContributorsService) {

    }

    public columns: Array<any> = [
        { title: 'Name', name: 'Name', sort: true },
        { title: 'Team', name: 'Team', sort: true },
        { title: 'Contributions', name: 'Contributions', sort: true },
    ];

    public contributorsResolver: Observable<Contributor[]>;
    ngOnInit() {
        this.contributorsResolver = this.contributorsService.getContributors();
    }


}



