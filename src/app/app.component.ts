/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';

import { AppState } from './app.service';
import { Home } from './home';
import { Contributions  } from './contributors';
import { RouterActive } from './router-active';
import './rxjs-operators';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive ],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.css')
  ],
  template: `
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <span router-active>
      <button [routerLink]=" ['Index'] " class="btn btn-primary">
        Repositories
      </button>
    </span>
    <span router-active>
      <button [routerLink]=" ['Contributors'] " class="btn btn-primary">
        Contributors
      </button>
    </span>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>
  `
})
@RouteConfig([
  { path: '/',             name: 'Index', component: Home, useAsDefault: true },
  { path: '/Contributors', name: 'Contributors', component: Contributions }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'X-Formation';
  url = 'https://x-formation.com';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}