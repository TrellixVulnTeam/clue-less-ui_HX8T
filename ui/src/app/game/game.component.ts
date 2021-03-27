import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { PlayerService } from './player.service';
import { Player } from './player';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  playerId: any | undefined;
  gameId: any | undefined;
  game: any | undefined;

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {} 

  ngOnInit() {

    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.playerId = this.route.snapshot.paramMap.get('playerId');

    this.playerService.setPlayerService(this.gameId, this.playerId);

    this.playerService.gameData$
    .subscribe((data: Game) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.game = data;
    });
  }
}