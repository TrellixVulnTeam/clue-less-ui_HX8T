import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

const backend_url = `http://localhost:8080/games`;

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Origin': `http://localhost:4200`
  })
};

import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
import {Game} from './game';

@Injectable({
  providedIn: 'root'
})
export class GameBackendService {
  
  gameUrl: string;
  gameData$: Observable<Game>;
  refreshInterval = 5000; // every 5 seconds

  constructor(private http: HttpClient) {

    this.gameUrl = `${backend_url}/1/`; // TODO include game identifier

    this.gameData$ = timer(1, this.refreshInterval).pipe( // will constanctly check the backend for updates to game data
      switchMap(() => http.get<Game>(this.gameUrl, httpOptions))
    );

  }
}