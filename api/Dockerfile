FROM node:20-alpine AS builder

WORKDIR /app

COPY api/package.json api/package-lock.json api/tsconfig.json ./
RUN npm install

COPY api/src ./src

RUN npm run build

COPY api/prisma ./prisma
RUN npx prisma generate

# Expose the API port
EXPOSE 4000

# Command to run the API
CMD ["node", "dist/index.js"]
