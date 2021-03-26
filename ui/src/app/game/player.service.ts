import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
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
export class PlayerService {
  
  backend_ip = environment.backend_ip;
  gamesEndpoint = `http://${this.backend_ip}:8080/games`;

  gameUrl: string;
  gameId: number;
  gameData$: Observable<Game>;
  refreshInterval = 5000; // every 5 seconds
  

  constructor(private httpClient: HttpClient) {
    

    this.gameId = 1; // TODO get from login component

    this.gameUrl = `${this.gamesEndpoint}/${this.gameId}`;

    this.gameData$ = timer(1, this.refreshInterval).pipe( // will constanctly check the backend for updates to game data
      switchMap(() => httpClient.get<Game>(this.gameUrl, httpOptions))
    );
  }
  
  public postToBackend(context: string): Observable<any> {
    return this.httpClient.post<any>(`${this.gamesEndpoint}${context}`, {}, httpOptions);
  }
}
