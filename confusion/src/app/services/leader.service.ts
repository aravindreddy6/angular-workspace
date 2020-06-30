import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/Operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { map,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

  getLeader(id: string): Observable<Leader> {
    return of(Leaders.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
}  

  getFeaturedLeader(): Observable<Leader> {
    return  this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
     .pipe(map(leaders => leaders[0]))
     .pipe(catchError(this.processHTTPMsgService.handleError));
}  
}

