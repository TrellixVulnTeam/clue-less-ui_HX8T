#!/bin/bash

EC2_PUBLIC_IP=$(curl http://169.254.169.254/latest/meta-data/public-ipv4)
sed -i "s/__SERVER_IP__/${EC2_PUBLIC_IP}/g" ./src/app/game/game-backend.service.ts

ng serve --host 0.0.0.0 --port 4200