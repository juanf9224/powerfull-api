FROM node:10

MAINTAINER juanfh.24.6@gmail.com

# Create app directory
RUN mkdir -p /usr/src/app

# Specify working directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "/wait", "npm", "start" ]