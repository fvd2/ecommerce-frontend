FROM node:latest
WORKDIR /server
COPY ["./build", "package.json", "index.js", "./"]
RUN yarn install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
