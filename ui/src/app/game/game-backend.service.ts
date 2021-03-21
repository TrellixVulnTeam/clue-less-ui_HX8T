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
  refreshInterval = 5000; // every 5 seconds

  constructor(private http: HttpClient) {
    const publicIp = require('public-ip');

    (async () => {
      console.log(await publicIp.v4());
      //=> '46.5.21.123'
  
      console.log(await publicIp.v6());
      //=> 'fe80::200:f8ff:fe21:67cf'
    })();

    this.gameUrl = `http://${publicIp.v4()}:8080/games/1/`; // TODO include game identifier

    this.gameData$ = timer(1, this.refreshInterval).pipe( // will constanctly check the backend for updates to game data
      switchMap(() => http.get<Game>(this.gameUrl))
    );

  }
}