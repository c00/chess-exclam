# -- Compiler --
FROM node:14.15-alpine as compiler

# Update npm
RUN npm -g i npm@7

# Add Python to build node dependencies.
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

WORKDIR /app
COPY package*.json ./
# Build deps
RUN npm install
COPY . .

ARG config_name=production
RUN npm run build -- -c $config_name

# -- Release build --
FROM nginx:1.17-alpine
COPY --from=compiler /app/dist/chess-exclam /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./deploy/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]