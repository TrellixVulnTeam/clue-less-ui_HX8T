import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  gameId: any;
  charName: any;
  gameData$: Observable<any>;
  refreshInterval = 5000; // every 5 seconds

  constructor(private httpClient: HttpClient) {

    // POLLING GAME DATA EVERY 5 SECONDS
    this.gameData$ = timer(1, this.refreshInterval).pipe( 
      switchMap(() => httpClient.get<any>(`${gamesEndpoint}/${this.gameId}`, httpOptions))
    );
  }
  
  public httpPostToBackend(context: string, payload?: {}, params?: any): Observable<any> {
    return this.httpClient.post(`${gamesEndpoint}${context}`, payload, httpOptions)
  }

  public setPlayerService(gameId: any, charName: any): void {
    this.gameId = gameId;
    this.charName = charName;
  }
}