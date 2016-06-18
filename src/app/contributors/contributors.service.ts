import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Contributor }     from './Contributor';

 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
 
@Injectable()
export class ContributorsService {
  constructor (private http: Http) {}
  
  private contributorsFile = 'https://www.x-formation.com/wp-content/uploads/2014/09/contributors.json'; 
  
  getRepositories (): Observable<Contributor[]> {
    return this.http.get(this.contributorsFile)                
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  private extractData(res: Response):Contributor[] {
    let body = res.json();
    console.log(body);
   return body.map(function(item){
      var contributor = new Contributor();
      contributor.Name = item.nickname;
      contributor.Team = item.team;
      contributor.Contributions = item.contributions;
      return contributor;
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