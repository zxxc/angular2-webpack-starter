import { Injectable }     from '@angular/core';
import { Jsonp,Http, Response,Headers,BaseRequestOptions } from '@angular/http';
import { JSONP_PROVIDERS } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Contributor }     from './Contributor';

 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
 
@Injectable()
export class ContributorsService {
  constructor (private http: Http, private jsonp:Jsonp) {}
  
  private contributorsFile = 'https://www.x-formation.com/wp-content/uploads/2014/09/contributors.json?callback=JSONP_CALLBACK'; 
  
  getContributors (): Observable<Contributor[]> {

 return this.jsonp.get(this.contributorsFile)                
                    .map(this.extractData)
                    
                                        .catch(this.handleError)


                                        ;

    // var headers = new Headers();
    // console.log('h1',this. http);
    // headers.append("Origin",'http://localhost:3001');
    // //headers.delete("Origin");
    // console.log('h2', headers);
    // this.http.
    // return this.http.get(this.contributorsFile,{
    //   headers    
    // })                
    //                 .map(this.extractData)
    //                 .catch(this.handleError);
  }
  
  private extractData(res: Response):Contributor[] {
    let body = res.json();
    console.log('cont',body);
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
    console.error(errMsg, error); // log to console instead
    return Observable.throw(errMsg);
  }
}