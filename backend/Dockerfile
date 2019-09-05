FROM node:alpine
WORKDIR /dir
COPY . /dir
RUN rm -rf /dir/node_modules
RUN apk add --no-cache --virtual .gyp python3 && \
    npm install && \
    chown node /dir/node_modules && \
    cd db && python3 init_database.py
EXPOSE 8000
CMD PORT=8000 NODE_ENV=production npm start
USER node
