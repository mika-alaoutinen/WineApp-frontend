# Container for development.
FROM node:lts-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8081
CMD ["npm", "run", "serve"]