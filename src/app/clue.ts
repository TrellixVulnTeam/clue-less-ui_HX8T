import {LocationButton} from './location-button'
import { environment } from '../environments/environment';

export class Clue {

    LOCATION_ARRAY:LocationButton[] = [
        new LocationButton(environment.LOCATION_NAME_BALL_ROOM, environment.LOCATION_TYPE_ROOM, 4, 2 ),
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
    
    LOCATION_MAP = this.initLocationMap();

    initLocationMap() {
        var location_map:any = {};
        var location_name:any;
    
        for (var loc of this.LOCATION_ARRAY) {
            location_name = loc.name;
            location_map.location_name = loc;
        }
    
        return location_map;
    }
}
