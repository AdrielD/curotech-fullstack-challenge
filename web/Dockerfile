FROM node:20-alpine AS builder

WORKDIR /app

COPY web/package.json web/package-lock.json web/server.js web/index.html ./
COPY web/tsconfig.json web/tsconfig.app.json web/tsconfig.node.json web/vite.config.ts ./
RUN npm install
COPY web/src ./src
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
