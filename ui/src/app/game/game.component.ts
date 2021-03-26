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

    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     this.playerId = Number(params.get('playerId'));
    //   })
    // );

    this.route.queryParams.subscribe(params => {
      this.playerId = params.get('playerId');
      this.gameId = params.get('gameId')
    });

    this.playerService.gameData$
      .subscribe((data: Game) => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
          this.game = data;
      });
  }
}