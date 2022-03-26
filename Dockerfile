FROM node:14-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8081
CMD ["npm", "run", "serve"]
