<<<<<<< HEAD
FROM node:18

WORKDIR /srv/app
=======
FROM node:22

WORKDIR /srv/node/app

RUN npm install -g nodemon
>>>>>>> 3fc1a63 (test)

COPY package*.json ./

RUN npm install

COPY . .

<<<<<<< HEAD
EXPOSE 3000

CMD ["node", "app.js"]
=======
RUN chown -R node /srv/node/app

USER node

EXPOSE 3000

EXPOSE 9229

CMD ["nodemon", "--inspect=0.0.0.0:9229", "server.js"]
>>>>>>> 3fc1a63 (test)
