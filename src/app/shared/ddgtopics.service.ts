import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DDGTopicsResponse } from './model/ddg-topics-response';

@Injectable({
  providedIn: 'root'
})
export class DdgtopicsService {
  constructor(private http: HttpClient) { }
  ddgTopicsBaseUrl = 'https://api.duckduckgo.com/?';


  getTopicSummary(currentSearch: string): Observable<DDGTopicsResponse> {
    const format = 'json';
    const formatOption: string = 'format=' + format;
    const httpoptions = {

    };
    // const httpparams = new HttpParams();
    // httpparams.set

    const pretty = 0;
    const prettyOption: string = 'pretty=' + pretty;

    const searchQuery: string = 'q=' + currentSearch;

    const callURL = this.ddgTopicsBaseUrl
                    + searchQuery
                    + '&' + formatOption
                    + '&' + prettyOption;

    return this.http.get(callURL, httpoptions).pipe(catchError(this.HandleError<any>('getEvents', [])));
  }

  private HandleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error('An error occured');
      console.error(error);
      console.error(operation);
      return of(result as T);
    };
  }
}
