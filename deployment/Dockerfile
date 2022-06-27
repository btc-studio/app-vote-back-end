FROM node:16 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND yarn.lock are copied
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install

COPY . .

FROM node:16
EXPOSE 3000

COPY --from=builder /app ./

CMD [ "yarn", "run", "production" ]
