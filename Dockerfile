FROM node:20.3.1-alpine

RUN apk --no-cache add curl

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm ci 


COPY prisma ./prisma
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]