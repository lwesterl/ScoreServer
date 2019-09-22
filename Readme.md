# ScoreServer

Server for TunnelEscape
- Contains database for the scores
- Visualizes the scores for each user
- Has general info relating to TunnelEscape


## backend
- Express backend API


## frontend
- React frontend
- Uses React bootstrap

## Requirements
1. [nodejs and npm](https://nodejs.org/en/download/package-manager/)
2. Install required modules by running both in backend and frontend:
```
npm install
```
3. For creating the database python3 is required

For production deployment also Docker is needed.
[Install docker for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

## Development

1. Create a test database
```
cd backend/db && python3 init_database.py && cd ../..
```
- Add some test entries to the database by executing backend/tables.sql
 - a sql editor / execution software of your choice is required
2. Run development build
```
cd backend && npm run dev
```

The command starts both frontend and backend. ScoreServer now available on:
http://localhost:3000/

## Production
1. Install docker
2. Create the production database
- Remove possible development database and run:
```
cd backend && python3 init_database.py && cd ..
```
- Note: this is needed because the backend docker image copies and mounts this database
3. Create Docker images using:
```
./init.sh
```
4. Set up appropriate ssl certificates
  - [More info on the setup](https://dev.to/domysee/setting-up-a-reverse-proxy-with-nginx-and-docker-compose-29jg)
5. Modify the nginx_conf.conf to include the valid certificates and hostname
6. Run whole server in detached mode:
```
sudo docker-compose up -d
```
7. Logs and the database are mounted outside the container
  - See the docker-compose file for more details
