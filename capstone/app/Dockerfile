FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY index.js .
COPY test.js .

RUN adduser -D appuser
USER appuser

EXPOSE 3000
CMD ["node", "index.js"]
