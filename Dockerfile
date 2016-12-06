FROM gcr.io/percy_dev/baseimage-web:2016-12-02-173224

# Configure nginx.
ADD config/nginx-main.conf /etc/nginx/nginx.conf
ADD config/nginx-default-site.conf /etc/nginx/sites-enabled/default

# Configure nginx to run automatically.
ADD config/run-nginx.sh /etc/service/nginx/run
ADD config/run-logger.sh /etc/service/nginx/log/run
RUN chmod +x /etc/service/*/run
RUN chmod +x /etc/service/*/log/run

# Global npm packages.
RUN yarn global add bower

# Global test/development packages.
# TODO: if these get much bigger, split out to separate Dockerfile so we don't bloat the prod image.
RUN yarn global add phantomjs-prebuilt

# Setup the app directory and build the ember app.
ADD package.json yarn.lock bower.json /app/src/
WORKDIR /app/src/
RUN yarn
RUN bower install --allow-root
# Setup the full app directory (do this after package install to speed up docker builds).
ADD . /app/src/
RUN npm run build-production
