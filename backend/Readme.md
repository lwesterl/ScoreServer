# backend
- API for ScoreServer
- Uses Express

## Install
```
npm install
```

## Commands
| Command | Description |
|--------|-----------|
| npm run dev | Start both backend and frontend in development mode: http://localhost:3000/ |
| npm start / npm run server | Start backend to http://localhost:5000/ |
| npm run client | Start frontend to http://localhost:3000/ |

## Info

Dockerfile contains the production environment for the backend.
Docker image (named backend) can be created by running:
```
./build_docker.sh
```
See the parent directory Readme.md for details about builds and how to create
the database
