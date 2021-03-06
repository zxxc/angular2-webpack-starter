import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { GitHubRepository }     from './GitHubRepository';

 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
 
@Injectable()
export class GitHubService {
  constructor (private http: Http) {}
  
  private repoUrl = 'https://api.github.com/orgs/x-formation/repos';  // URL to web API
  
  getRepositories (): Observable<GitHubRepository[]> {
    return this.http.get(this.repoUrl)                
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  private extractData(res: Response):GitHubRepository[] {
    let body = res.json();
   return body.map(function(repository){
      var rep = new GitHubRepository();
      rep.Name = repository.name;
      rep.ForkCount = repository.forks_count;
      return rep;
    });
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}