FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

RUN npm run build
FROM httpd
COPY --from=0 /usr/src/app/dist/ /usr/local/apache2/htdocs/
EXPOSE 80

ENTRYPOINT /usr/local/apache2/bin/httpd -DFOREGROUND