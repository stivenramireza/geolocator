FROM node:9.6.1

LABEL version="1.0"
LABEL description="App web Geolocator"
LABEL maintainer="Stiven Ramírez Arango - sramir70@eafit.edu.co"


ARG PORT=3000
ENV PORT $PORT

WORKDIR /nodeapp
COPY . ./

RUN npm install --test

EXPOSE 3000
CMD npm start