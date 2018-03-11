import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import { HttpModule } from '@angular/http';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiProvider {

  private apiurl = 'https://restcountries.eu/rest/v2/all';
  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  getCountries(): Observable<string[]> {
    return this.http.get(this.apiurl).pipe(
      map(this.extractData), 
      catchError(this.handleError))
  }

  private extractData(res: Response){
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any){
    let errMsg = error;
    if(error instanceof Response){
      const err = error || '';
      errMsg = '${error.status} - ${error.statusText || ""} ${err}';
    } else{
      errMsg = error.message ? error.message: error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
