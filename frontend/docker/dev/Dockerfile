FROM node:17-alpine

RUN apk add --no-cache libc6-compat

RUN apk --no-cache add \
  bash \
  g++ \
  ca-certificates \
  lz4-dev \
  musl-dev \
  cyrus-sasl-dev \
  openssl-dev \
  make \
  python3

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

WORKDIR /app

COPY package*.json /app

EXPOSE 3001

CMD ["npm", "start"]
