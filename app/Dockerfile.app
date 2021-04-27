FROM node:12.20.2-alpine3.12

ENV NODE_ENV=production
ENV PATH /usr/src/app/frontend/node_modules/.bin:$PATH
ENV PATH /usr/src/app/backend/node_modules/.bin:$PATH
ENV NODE_API alqueva/api
ENV REACT_APP_NODE_API alqueva/api

# Create app directory
WORKDIR /usr/src/app
RUN mkdir -p frontend/public frontend/src && mkdir backend

#backend
WORKDIR /usr/src/app/backend
COPY ./backend/package.*json ./
RUN npm install --only=production --silent
COPY ./backend/server.js ./

#frontend
WORKDIR /usr/src/app/frontend
COPY ./frontend/package.*json ./
RUN npm install --silent
#--only=dev --no-shrinkwrap
COPY ./frontend ./
RUN npm run build

WORKDIR /usr/src/app/backend
ENTRYPOINT ["npm", "run", "server"]