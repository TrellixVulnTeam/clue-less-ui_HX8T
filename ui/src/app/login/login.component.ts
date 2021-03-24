import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Game} from '../game/game';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  }
  )
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  backend_ip = environment.backend_ip;
  backendUrl = `http://${this.backend_ip}:8080/games`; // TODO include game identifier

  constructor(private router: Router, private http: HttpClient) {
  }

  handleError(arg0: string, playerName: String): (err: any, caught: Observable<Game>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

  // action on join game
  createGameButtonClick=() => {
    // TODO: add player to game in backend
    this.http.post(`${this.backendUrl}?name=MILES`, httpOptions)
    this.router.navigateByUrl('/game');
  };

  // action on join game
  joinGameButtonClick=() => {
    // TODO: create new game in backend
    this.router.navigateByUrl('/game');
  };

  ngOnInit(): void {
  }
  
}
