FROM node:24-alpine3.22 AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . . 

RUN yarn prisma generate
RUN yarn build

FROM node:24-alpine3.22

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated

RUN yarn prisma migrate deploy

EXPOSE 5000

CMD ["yarn", "start"]
