#!/bin/bash

EC2_PUBLIC_IP=$(curl http://169.254.169.254/latest/meta-data/public-ipv4)

sed -i "s/localhost/${EC2_PUBLIC_IP}/g" ./src/environments/environment.ts
sed -i "s/localhost/${EC2_PUBLIC_IP}/g" ./src/environments/environment.prod.ts

ng serve --host 0.0.0.0 --port 4200