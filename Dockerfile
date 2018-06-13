FROM node:carbon

#create app directory
WORKDIR /usr/src/app


#install dependencies - both package.json AND package-lock.json are copied.
COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

