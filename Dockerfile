FROM node:11
WORKDIR /code
COPY src /code/src
COPY assets /code/assets
COPY package.json /code/
COPY tsconfig.json /code/
COPY spec /code/spec
RUN npm install
RUN npm run build
EXPOSE 5000
ENTRYPOINT ["node", "dist/index.js"]
