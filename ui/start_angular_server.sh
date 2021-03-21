#!/bin/bash

EC2_PUBLIC_IP=$(curl http://169.254.169.254/latest/meta-data/public-ipv4)

sed -i "s/__BACKEND_IP__/${EC2_PUBLIC_IP}/g" ./src/environments/environment.ts