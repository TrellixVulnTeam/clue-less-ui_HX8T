import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { PlayerService } from '../game/player.service';

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

  response: Observable<any> | undefined;

  backend_ip = environment.backend_ip;
  backendUrl = `http://${this.backend_ip}:8080/games`; // TODO include game identifier

  joinGameForm = this.formBuilder.group({
    playerName: '',
    gameId: ''
  });

  createGameForm = this.formBuilder.group({
    playerName: ''
  });

  constructor(private router: Router, private playerService: PlayerService, private formBuilder: FormBuilder) {
  }

  // action on join game
  createGameButtonClick=() => {
    // Create new game in backend
    this.response = this.playerService.postToBackend(`?name=${this.joinGameForm.controls['playerName'].value}`);
    
    // this.router.navigateByUrl('/game');
  };

  // action on join game
  joinGameButtonClick=() => {
    // Add player to game in backend
    this.response = this.playerService.postToBackend(`/${this.joinGameForm.controls['gameId'].value}/players?name=${this.joinGameForm.controls['playerName'].value}`);
    
    // TODO: redirect to /game passing playerId from response
    // this.router.navigateByUrl('/game');
  };

  ngOnInit(): void {
  }
  
}
