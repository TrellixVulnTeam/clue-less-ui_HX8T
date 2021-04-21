#!/bin/bash

curl localhost:8080/games?name=Zach -X POST
curl localhost:8080/games?name=Tim -X POST

curl localhost:8080/games/1/players?name=Alex -X POST
curl localhost:8080/games/1/players?name=Megan -X POST


curl localhost:8080/games?name=Roger -X POST
curl localhost:8080/games/3/players?name=Miles -X POST
curl localhost:8080/games/3/players?name=Meera -X POST