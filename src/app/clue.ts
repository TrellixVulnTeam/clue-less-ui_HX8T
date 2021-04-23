import {LocationButton} from './location-button'
import { environment } from '../environments/environment';
import { ClueGameButton } from './clue-game-button';

export class Clue {

    MAP_ROWS = 7;
    MAP_COLS = 7;

    locationButtonArray:LocationButton[] = [
        
        new LocationButton(environment.LOCATION_NAME_BALL_ROOM, environment.LOCATION_TYPE_ROOM, 4, 2),
        new LocationButton(environment.LOCATION_NAME_BILLIARD_ROOM, environment.LOCATION_TYPE_ROOM, 4, 4 ),
        new LocationButton(environment.LOCATION_NAME_CONSERVATORY, environment.LOCATION_TYPE_ROOM, 2, 2 ),
        new LocationButton(environment.LOCATION_NAME_DINING_ROOM, environment.LOCATION_TYPE_ROOM, 6, 4 ),
        new LocationButton(environment.LOCATION_NAME_HALL, environment.LOCATION_TYPE_ROOM, 4, 6 ),
        new LocationButton(environment.LOCATION_NAME_KITCHEN, environment.LOCATION_TYPE_ROOM, 6, 2 ),
        new LocationButton(environment.LOCATION_NAME_LOUNGE, environment.LOCATION_TYPE_ROOM, 6, 6 ),
        new LocationButton(environment.LOCATION_NAME_LIBRARY, environment.LOCATION_TYPE_ROOM, 2, 4 ),
        new LocationButton(environment.LOCATION_NAME_STUDY, environment.LOCATION_TYPE_ROOM, 2, 6 ),
    
        // add homes
        new LocationButton(environment.LOCATION_NAME_MRS_WHITE_HOME, environment.LOCATION_TYPE_HOME, 5, 1 ),
        new LocationButton(environment.LOCATION_NAME_MR_GREEN_HOME, environment.LOCATION_TYPE_HOME, 3, 1 ),
        new LocationButton(environment.LOCATION_NAME_MRS_PEACOCK_HOME, environment.LOCATION_TYPE_HOME, 1, 3 ),
        new LocationButton(environment.LOCATION_NAME_PROF_PLUM_HOME, environment.LOCATION_TYPE_HOME, 1, 5 ),
        new LocationButton(environment.LOCATION_NAME_MISS_SCARLET_HOME, environment.LOCATION_TYPE_HOME, 5, 7 ),
        new LocationButton(environment.LOCATION_NAME_COLONEL_MUSTARD_HOME, environment.LOCATION_TYPE_HOME, 7, 5 ),
    
        // add hallways
        new LocationButton(environment.LOCATION_NAME_HALLWAY_32, environment.LOCATION_TYPE_HALLWAY, 3, 2 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_52, environment.LOCATION_TYPE_HALLWAY, 5, 2 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_23, environment.LOCATION_TYPE_HALLWAY, 2, 3 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_43, environment.LOCATION_TYPE_HALLWAY, 4, 3 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_63, environment.LOCATION_TYPE_HALLWAY, 6, 3 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_34, environment.LOCATION_TYPE_HALLWAY, 3, 4 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_54, environment.LOCATION_TYPE_HALLWAY, 5, 4 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_25, environment.LOCATION_TYPE_HALLWAY, 2, 5 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_45, environment.LOCATION_TYPE_HALLWAY, 4, 5 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_65, environment.LOCATION_TYPE_HALLWAY, 6, 5 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_36, environment.LOCATION_TYPE_HALLWAY, 3, 6 ),
        new LocationButton(environment.LOCATION_NAME_HALLWAY_56, environment.LOCATION_TYPE_HALLWAY, 5, 6 )
    ];
    locationButtons:LocationButton[] = this.initLocationButtonMap();

    suggestButton = new ClueGameButton('suggest');
    accuseButton = new ClueGameButton('accuse');

    initLocationButtonMap() {
        var locArr:LocationButton[] = [];
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

}
