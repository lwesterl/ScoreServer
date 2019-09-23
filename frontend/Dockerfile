FROM node:alpine
WORKDIR /dir
COPY . /dir
RUN rm -rf /dir/node_modules /dir/build
RUN npm install -g serve && \
    npm install && \
    chown node /dir
EXPOSE 5000
CMD npm run build && serve -s build
USER node
