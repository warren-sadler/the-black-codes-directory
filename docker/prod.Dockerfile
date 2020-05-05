FROM node:alpine AS build

COPY . .

RUN npm install

RUN npm run build

FROM node:alpine AS run

COPY --from=build . .

RUN ls -R

CMD npm run start
