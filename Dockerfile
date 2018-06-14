FROM node:8-alpine

#create app directory
WORKDIR /usr/src/app


#install dependencies - both package.json AND package-lock.json are copied.
COPY package*.json ./

RUN npm install --only=production

# Bundle app source
COPY db ./db
COPY frontEnd ./frontEnd
COPY index.js ./

EXPOSE 3000
CMD [ "npm", "start" ]

