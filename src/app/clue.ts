import { LocationButton } from './location-button'
import { environment } from '../environments/environment';
import { ClueGameButton } from './clue-game-button';
import { FormBuilder } from '@angular/forms';
import { PlayerService } from './player-service/player.service';

export class Clue {

    // set guessing variables
    guessSuspect = ''
    guessWeapon = ''
    guessRoom = '';

    // set card type constants
    card_type_weapon = environment.CARD_TYPE_WEAPON;
    card_type_room = environment.CARD_TYPE_ROOM;
    card_type_suspect = environment.CARD_TYPE_SUSPECT;

    // Set character constants
    characterNamesList:string[] = [
        environment.CHARACTER_NAME_MRS_WHITE,
        environment.CHARACTER_NAME_MR_GREEN,
        environment.CHARACTER_NAME_MRS_PEACOCK,
        environment.CHARACTER_NAME_PROF_PLUM,
        environment.CHARACTER_NAME_MISS_SCARLET,
        environment.CHARACTER_NAME_COLONEL_MUSTARD
    ]

    char_name_mrs_white = environment.CHARACTER_NAME_MRS_WHITE;
    char_name_mr_green = environment.CHARACTER_NAME_MR_GREEN;
    char_name_mrs_peacock = environment.CHARACTER_NAME_MRS_PEACOCK;
    char_name_prof_plum = environment.CHARACTER_NAME_PROF_PLUM;
    char_name_miss_scarlet = environment.CHARACTER_NAME_MISS_SCARLET;
    char_name_col_mustard = environment.CHARACTER_NAME_COLONEL_MUSTARD;

    // Set weapon constants
    weaponNamesList:string[] = [
        environment.WEAPON_NAME_CANDLESTICK,
        environment.WEAPON_NAME_KNIFE,
        environment.WEAPON_NAME_LEADPIPE,
        environment.WEAPON_NAME_REVOLVER,
        environment.WEAPON_NAME_ROPE,
        environment.WEAPON_NAME_WRENCH
    ]
    weapon_name_candlestick = environment.WEAPON_NAME_CANDLESTICK;
    weapon_name_knife = environment.WEAPON_NAME_KNIFE;
    weapon_name_leadpipe = environment.WEAPON_NAME_LEADPIPE;
    weapon_name_revolver = environment.WEAPON_NAME_REVOLVER;
    weapon_name_rope = environment.WEAPON_NAME_ROPE;
    weapon_name_wrench = environment.WEAPON_NAME_WRENCH;

    // Set room constants
    roomNamesList:string[] = [
        environment.LOCATION_NAME_BALL_ROOM,
        environment.LOCATION_NAME_BILLIARD_ROOM,
        environment.LOCATION_NAME_CONSERVATORY,
        environment.LOCATION_NAME_DINING_ROOM,
        environment.LOCATION_NAME_HALL,
        environment.LOCATION_NAME_KITCHEN,
        environment.LOCATION_NAME_LIBRARY,
        environment.LOCATION_NAME_LOUNGE,
        environment.LOCATION_NAME_STUDY
    ]

    location_name_ball_room = environment.LOCATION_NAME_BALL_ROOM;
    location_name_billiard_room = environment.LOCATION_NAME_BILLIARD_ROOM;
    location_name_conservatory = environment.LOCATION_NAME_CONSERVATORY;
    location_name_dining_room = environment.LOCATION_NAME_DINING_ROOM;
    location_name_hall = environment.LOCATION_NAME_HALL;
    location_name_kitchen = environment.LOCATION_NAME_KITCHEN;
    location_name_library = environment.LOCATION_NAME_LIBRARY;
    location_name_lounge = environment.LOCATION_NAME_LOUNGE;
    location_name_study = environment.LOCATION_NAME_STUDY;


    // game data
    gameId: any | undefined;
    eventMessage: string | undefined;
    suggestionCards: any | undefined;
    characters: any | undefined;
    players: any | undefined;
    active: boolean | undefined;

    // player data
    revealedClue: string | undefined;
    player: any | undefined;
    playerMessage: any | undefined;
    playerName: string | undefined;
    charName: any | undefined;

    MAP_ROWS = 7;
    MAP_COLS = 7;

    locationButtonArray: LocationButton[] = [

        new LocationButton(environment.LOCATION_NAME_BALL_ROOM, environment.LOCATION_TYPE_ROOM, 4, 2),
        new LocationButton(environment.LOCATION_NAME_BILLIARD_ROOM, environment.LOCATION_TYPE_ROOM, 4, 4),
        new LocationButton(environment.LOCATION_NAME_CONSERVATORY, environment.LOCATION_TYPE_ROOM, 2, 2),
        new LocationButton(environment.LOCATION_NAME_DINING_ROOM, environment.LOCATION_TYPE_ROOM, 6, 4),
        new LocationButton(environment.LOCATION_NAME_HALL, environment.LOCATION_TYPE_ROOM, 4, 6),
        new LocationButton(environment.LOCATION_NAME_KITCHEN, environment.LOCATION_TYPE_ROOM, 6, 2),
        new LocationButton(environment.LOCATION_NAME_LOUNGE, environment.LOCATION_TYPE_ROOM, 6, 6),
        new LocationButton(environment.LOCATION_NAME_LIBRARY, environment.LOCATION_TYPE_ROOM, 2, 4),
        new LocationButton(environment.LOCATION_NAME_STUDY, environment.LOCATION_TYPE_ROOM, 2, 6),

        // add homes
        new LocationButton(environment.LOCATION_NAME_MRS_WHITE_HOME, environment.LOCATION_TYPE_HOME, 5, 1),
        new LocationButton(environment.LOCATION_NAME_MR_GREEN_HOME, environment.LOCATION_TYPE_HOME, 3, 1),
        new LocationButton(environment.LOCATION_NAME_MRS_PEACOCK_HOME, environment.LOCATION_TYPE_HOME, 1, 3),
        new LocationButton(environment.LOCATION_NAME_PROF_PLUM_HOME, environment.LOCATION_TYPE_HOME, 1, 5),
        new LocationButton(environment.LOCATION_NAME_MISS_SCARLET_HOME, environment.LOCATION_TYPE_HOME, 5, 7),
        new LocationButton(environment.LOCATION_NAME_COLONEL_MUSTARD_HOME, environment.LOCATION_TYPE_HOME, 7, 5),

        // add hallways
        new LocationButton(environment.LOCATION_NAME_HALLWAY_32, environment.LOCATION_TYPE_HALLWAY, 3, 2),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_52, environment.LOCATION_TYPE_HALLWAY, 5, 2),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_23, environment.LOCATION_TYPE_HALLWAY, 2, 3),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_43, environment.LOCATION_TYPE_HALLWAY, 4, 3),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_63, environment.LOCATION_TYPE_HALLWAY, 6, 3),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_34, environment.LOCATION_TYPE_HALLWAY, 3, 4),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_54, environment.LOCATION_TYPE_HALLWAY, 5, 4),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_25, environment.LOCATION_TYPE_HALLWAY, 2, 5),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_45, environment.LOCATION_TYPE_HALLWAY, 4, 5),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_65, environment.LOCATION_TYPE_HALLWAY, 6, 5),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_36, environment.LOCATION_TYPE_HALLWAY, 3, 6),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_56, environment.LOCATION_TYPE_HALLWAY, 5, 6)
    ];
    locationButtons: LocationButton[] = this.initLocationButtonMap();

    completeTurnButton = new ClueGameButton('complete-turn');
    suggestButton = new ClueGameButton('suggest');
    accuseButton = new ClueGameButton('accuse');
    openRevealClueDialogButton = new ClueGameButton('reveal-clue');
    openAcceptClueDialogButton = new ClueGameButton('accept-clue');
    acceptClueNotification = ""
    

    // set player state constants
    player_state_wait: string = environment.PLAYER_STATE_WAIT;
    player_state_move: string = environment.PLAYER_STATE_MOVE;
    player_state_suggest: string = environment.PLAYER_STATE_SUGGEST;
    player_state_reveal: string = environment.PLAYER_STATE_REVEAL;
    player_state_await_reveal: string = environment.PLAYER_STATE_AWAIT_REVEAL;
    player_state_accept_reveal: string = environment.PLAYER_STATE_ACCEPT_REVEAL;
    player_state_complete_turn: string = environment.PLAYER_STATE_COMPLETE_TURN;
    player_state_win: string = environment.PLAYER_STATE_WIN;
    player_state_lose: string = environment.PLAYER_STATE_LOSE;

    initLocationButtonMap() {
        var locArr: LocationButton[] = [];
        var spaces_from_finished_rows;
        var spaces_from_unfinished_row;
        var index;

        for (var i = 0; i < this.MAP_ROWS * this.MAP_COLS; i++) {
            locArr[i] = new LocationButton();
        }

        // add each locationButton to correct index of locArr for use in mat-grid-list in game.component.html
        for (var loc of this.locationButtonArray) {

            // exmaple (2, 2) should get placed at 8th index
            spaces_from_finished_rows = (this.MAP_ROWS - loc.y) * this.MAP_COLS;
            spaces_from_unfinished_row = (loc.x)
            index = spaces_from_finished_rows + spaces_from_unfinished_row - 1;

            locArr[index] = loc;
        }

        return locArr;
    }

    // refresh frontend data 
    refreshData(data: any) {

        this.eventMessage = data.eventMessage;
        this.active = data.active;
        this.suggestionCards = data.suggestionCards;
        this.characters = data.characters;

        let players:any = [];

        data.characters.forEach((character: any) => {

            if (character.characterName == this.charName) {
                this.player = character;
                this.charName = this.player.characterName;
                this.playerName = this.player.playerName;
                this.playerMessage = this.player.eventMessage;
            }

            if (character.hasOwnProperty('playerName')) {
                players.push(character);
            }
        })

        this.players = players;
        console.log(this.players)

        this.updateEnabledButtons();
    }

    // enable/disable buttons given updated data
    updateEnabledButtons() {
        // complete-turn button
        if (this.player.state == this.player_state_complete_turn) {
            this.completeTurnButton.enable();
        } else {
            this.completeTurnButton.disable();
        }

        // TODO: make-accusation button
        // if it's your turn

        // make-suggestion button
        if (this.player.state == this.player_state_suggest) {
            this.suggestButton.enable();
        } else if ( 
            (this.player.state == this.player_state_move) &&
            (this.player.wasMovedToRoom || this.player.wasMovedToRoom == "true") ) { // if player was previously moved to room
            this.suggestButton.enable();
        } else {
            this.suggestButton.disable();
        }

        // reveal-clue button
        if (this.player.state == this.player_state_reveal) {
            this.openRevealClueDialogButton.enable();
        } else {
            this.openRevealClueDialogButton.disable();
        }

        // accept-clue button
        if (this.player.state == this.player_state_accept_reveal) {
            this.openAcceptClueDialogButton.enable();
            this.acceptClueNotification = "1";
        } else {
            this.openAcceptClueDialogButton.disable();
            this.acceptClueNotification = "";
        }

        // location buttons
        for (let locButton of this.locationButtons) {
            if (this.player.state == 'move') { // begin enabling possible location buttons if in 'move' state
                var isPossibleMove = false;
                this.player.possibleMoves.forEach((location: any) => {
                    if (locButton.label == location.name) {
                        isPossibleMove = true;
                    }
                });

                if (isPossibleMove) {
                    // console.log(`enabling button: ${locButton.label}`)
                    locButton.enable()
                } else {
                    // console.log(`disabling button: ${locButton.label}`)
                    locButton.disable()
                }
            } else { // disable all location buttons if not in 'move' state
                locButton.disable();
            }

        }
    }

}
