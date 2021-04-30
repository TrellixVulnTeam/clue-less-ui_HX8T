#!/bin/bash

data=$(curl 'localhost:8080/games?playerName=Zach&charName=colonel%20mustard' -X POST)
gameId=$(echo $data | jq '.gameId')

curl "localhost:8080/games/${gameId}/players?playerName=Meera&charName=miss%20scarlet" -X POST
curl "localhost:8080/games/${gameId}/players?playerName=Charles&charName=mr.%20green" -X POST