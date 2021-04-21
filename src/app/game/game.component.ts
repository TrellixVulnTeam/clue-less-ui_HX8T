import { Component, OnInit } from '@angular/core';
// import { Game } from '../player-service/game';
import { PlayerService } from '../player-service/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  gameId: any | undefined;
  charName: any | undefined;
  playerName: any | undefined;
  playerData: any | undefined;

  game: any | undefined;

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {} 

  ngOnInit() {

    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.charName = this.route.snapshot.paramMap.get('charName');

    this.playerService.setPlayerService(this.gameId, this.playerName);

    this.playerService.gameData$
    .subscribe(data => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.game = data;
        this.playerData = data.characterMap.this.charName
    });
  }
}