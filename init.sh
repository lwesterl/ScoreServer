#!/usr/bin/env bash
printf "\nNote: docker and docker-compose need to be already installed\n"
echo "Build backend image:"
cd backend && ./build_docker.sh
echo "Build frontend image:"
cd ../frontend && ./build_docker.sh
printf "\nssl certificate initialization: https://dev.to/domysee/setting-up-a-reverse-proxy-with-nginx-and-docker-compose-29jg\n"
printf "\nNow run 'sudo docker-compose up -d'\n"
