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

  // game data
  gameId: any | undefined;
  eventMessage: string | undefined
  suggestion: any | undefined;
  characters: any | undefined;
  active: boolean | undefined;

  // player data
  player: any | undefined;
  playerName: string | undefined;
  charName: any | undefined;

  constructor(private route: ActivatedRoute, private playerService: PlayerService) {
    this.gameId = route.snapshot.paramMap.get('gameId');
    this.charName = route.snapshot.paramMap.get('charName');
  }

  ngOnInit() {
    
    this.playerService.setPlayerService(this.gameId, this.playerName);

    this.playerService.gameData$
      .subscribe(data => { // sets up the subscription for game data (this is refreshed every 5 seconds in game-backend.service)
        this.eventMessage = data.eventMessage;
        this.active = data.active;
        this.suggestion = data.suggestionCards;
        this.characters = data.characters;

        data.characters.forEach((character: any) => {
          if (character.characterName == this.charName) {
            this.player = character;
            this.charName = this.player.characterName;
          }
        })

      });
  }
}