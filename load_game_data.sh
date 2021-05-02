#!/bin/bash

data=$(curl 'localhost:8080/games?playerName=Zach&charName=colonel%20mustard' -X POST)
gameId=$(echo $data | jq '.gameId')

curl "localhost:8080/games/${gameId}/players?playerName=Meera&charName=miss%20scarlet" -X POST
curl "localhost:8080/games/${gameId}/players?playerName=Charles&charName=mr.%20green" -X POST


# start game
curl "localhost:8080/games/${gameId}?playerName=Zach&charName=colonel%20mustard&activate=true" -X POST

# move players and complete turns
curl "localhost:8080/games/${gameId}/location?playerName=Meera&charName=miss%20scarlet&locName=hallway%2056" -X POST
curl "localhost:8080/games/${gameId}/complete-turn?playerName=Meera&charName=miss%20scarlet" -X POST
curl "localhost:8080/games/${gameId}/location?playerName=Zach&charName=colonel%20mustard&locName=hallway%2065" -X POST
curl "localhost:8080/games/${gameId}/complete-turn?playerName=Zach&charName=colonel%20mustard" -X POST
curl "localhost:8080/games/${gameId}/location?playerName=Charles&charName=mr.%20green&locName=hallway%2032" -X POST
curl "localhost:8080/games/${gameId}/complete-turn?playerName=Charles&charName=mr.%20green" -X POST

# move meera to Lounge
curl "localhost:8080/games/${gameId}/location?playerName=Meera&charName=miss%20scarlet&locName=lounge" -X POST
