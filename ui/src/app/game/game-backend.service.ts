import { HttpClient } from '@angular/common/http';
// import {Http, Headers, BaseRequestOptions, } from '@angular/http';
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
  refreshInterval = 3000; // every 3 seconds

  constructor(private http: HttpClient) {
    this.gameUrl = "http://localhost:8080/games/1/";
      this.gameData$ = timer(1, this.refreshInterval).pipe( // will constanctly check the backend for updates to game data
        switchMap(() => http.get<Game>(this.gameUrl))
      );
  }
}
