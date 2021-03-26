import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

// Set endpoint constants
const backend_ip = environment.backend_ip;
const backend_port = environment.backend_port;
const gamesEndpoint = `http://${backend_ip}:${backend_port}/games`;

let httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  }),
  params: new HttpParams({})
};

import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import {Game} from './game';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  gameData$: Observable<Game>;
  refreshInterval = 5000; // every 5 seconds

  constructor(private httpClient: HttpClient) {
    
    let gameId = 1; // TODO get from login component

    // POLLING GAME DATA EVERY 5 SECONDS
    this.gameData$ = timer(1, this.refreshInterval).pipe( 
      switchMap(() => httpClient.get<Game>(`${gamesEndpoint}/${gameId}`, httpOptions))
    );
  }
  
  public httpPostToBackend(context: string, payload?: {}, params?: any): Observable<any> {
    return this.httpClient.post(`${gamesEndpoint}${context}`, payload, httpOptions)
  }
}
